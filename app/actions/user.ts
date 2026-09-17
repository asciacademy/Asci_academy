"use server"

import { createClient } from "@/utils/supabase/server"
import {
  BADGES_REGISTRY,
  UserGamificationStats,
  calculateLevel,
  calculateRank
} from "@/lib/gamification"
import { CURRICULUM_COURSES } from "@/lib/curriculum-data"


// ==========================================
// USER PROFILE FETCHING LOGIC
// ==========================================

export async function getUserProfile() {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    const { data: profile, error } = await supabase
        .from('profiles')
        .select('id, name, email, xp, streak, streak_count, last_active_date, avatar_url, bio, role, rank')
        .eq('id', user.id)
        .maybeSingle()

    if (error || !profile) {
        if (error) console.error("Error fetching user profile:", error)
        return null
    }

    const currentXp = profile.xp ?? 0
    let rank = profile.rank || "Recruit"
    if (currentXp >= 10000) rank = "Prime Master"
    else if (currentXp >= 5000) rank = "Architect"
    else if (currentXp >= 2000) rank = "Specialist"
    else if (currentXp >= 500) rank = "Operative"
    else if (currentXp > 0) rank = "Initiate"

    return {
        ...profile,
        xp: currentXp,
        streak_count: profile.streak_count ?? profile.streak ?? 0,
        rank
    }
}

export async function updateUserProfile(data: { name?: string; avatar_url?: string; bio?: string }) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: "Unauthorized" }

    const updatePayload: Record<string, any> = {
        updated_at: new Date().toISOString(),
    }
    if (data.name !== undefined) updatePayload.name = data.name.trim()
    if (data.avatar_url !== undefined) updatePayload.avatar_url = data.avatar_url
    if (data.bio !== undefined) updatePayload.bio = data.bio

    const { data: updated, error } = await supabase
        .from('profiles')
        .update(updatePayload)
        .eq('id', user.id)
        .select()
        .single()

    if (error) {
        console.error("Error updating user profile:", error)
        return { error: error.message }
    }

    return { success: true, profile: updated }
}

export async function getUserEnrollmentsWithProgress() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return []

    // Fetch enrollments, the course details, and calculate progress based on lesson_progress
    const { data: enrollments, error } = await supabase
        .from('enrollments')
        .select(`
            id, status,
            course:courses (
                id, title, slug, thumbnail, is_premium, premium_tier,
                modules (
                    id, is_deleted,
                    lessons (id, is_deleted)
                )
            )
        `)
        .eq('user_id', user.id)

    if (error || !enrollments) {
        console.error("Error fetching enrollments:", error)
        return []
    }

    // Fetch user's completed lessons
    const { data: progress } = await supabase
        .from('lesson_progress')
        .select('lesson_id')
        .eq('user_id', user.id)
        .eq('status', 'completed')

    const completedLessonIds = new Set(progress?.map(p => p.lesson_id) || [])

    // Process each enrollment to calculate progress percentage
    const processedEnrollments = enrollments.map((enr: any) => {
        const course = enr.course
        let totalLessons = 0
        let completedLessonsForCourse = 0

        if (course && Array.isArray(course.modules)) {
            course.modules.filter((m: any) => !m.is_deleted).forEach((module: any) => {
                if (Array.isArray(module.lessons)) {
                    module.lessons.filter((l: any) => !l.is_deleted).forEach((lesson: any) => {
                        totalLessons++
                        if (completedLessonIds.has(lesson.id)) {
                            completedLessonsForCourse++
                        }
                    })
                }
            })
        }

        const progressPercent = totalLessons === 0 ? 0 : Math.round((completedLessonsForCourse / totalLessons) * 100)
        const isFullyCompleted = totalLessons > 0 && completedLessonsForCourse >= totalLessons
        const effectiveStatus = isFullyCompleted ? "completed" : enr.status

        return {
            enrollmentId: enr.id,
            status: effectiveStatus,
            courseId: course.id,
            slug: course.slug,
            title: course.title,
            thumbnail: course.thumbnail,
            isPremium: course.is_premium,
            totalLessons,
            completedLessons: completedLessonsForCourse,
            progressPercent: isFullyCompleted ? 100 : progressPercent
        }
    })

    return processedEnrollments
}
export async function getPublicProfile(username: string) {
    const supabase = await createClient()

    // Fetch profile by username
    const { data: profile, error } = await supabase
        .from('profiles')
        .select('id, name, bio, xp, avatar_url, is_public, streak_count, created_at')
        .eq('username', username)
        .eq('is_public', true)
        .maybeSingle()

    if (error || !profile) {
        console.error("Public profile not found or private:", error)
        return null
    }

    // Determine Rank
    let rank = "Initiate"
    if (profile.xp >= 500) rank = "Operative"
    if (profile.xp >= 2000) rank = "Specialist"
    if (profile.xp >= 5000) rank = "Architect"
    if (profile.xp >= 10000) rank = "Prime"

    // Fetch completed courses for this user
    const { data: progress } = await supabase
        .from('lesson_progress')
        .select(`
            lesson:lessons (
                module:modules (
                    course:courses (id, title, slug, thumbnail_url, difficulty)
                )
            )
        `)
        .eq('user_id', profile.id)
        .eq('status', 'completed')

    // Extract unique courses from progress
    const coursesMap = new Map()
    progress?.forEach((p: any) => {
        const course = p.lesson?.module?.course
        if (course && !coursesMap.has(course.id)) {
            coursesMap.set(course.id, course)
        }
    })

    return {
        ...profile,
        rank,
        completedCourses: Array.from(coursesMap.values())
    }
}

export async function getUserWeeklyActivity(): Promise<{ day: string; minutes: number; solved: number }[]> {
    const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    const now = new Date()

    // Generate past 7 days up to today
    const days: { dateStr: string; day: string; minutes: number; solved: number }[] = []
    for (let i = 6; i >= 0; i--) {
        const d = new Date()
        d.setDate(now.getDate() - i)
        const year = d.getFullYear()
        const month = String(d.getMonth() + 1).padStart(2, '0')
        const day = String(d.getDate()).padStart(2, '0')
        const dateStr = `${year}-${month}-${day}`
        days.push({
            dateStr,
            day: dayLabels[d.getDay()],
            minutes: 0,
            solved: 0,
        })
    }

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        return days.map(({ day, minutes, solved }) => ({ day, minutes, solved }))
    }

    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(now.getDate() - 7)

    const { data: progress } = await supabase
        .from('lesson_progress')
        .select('completed_at, time_spent, status')
        .eq('user_id', user.id)
        .eq('status', 'completed')
        .gte('completed_at', sevenDaysAgo.toISOString())

    if (progress && progress.length > 0) {
        progress.forEach((p: any) => {
            if (!p.completed_at) return
            const pD = new Date(p.completed_at)
            const pDate = `${pD.getFullYear()}-${String(pD.getMonth() + 1).padStart(2, '0')}-${String(pD.getDate()).padStart(2, '0')}`
            const target = days.find(d => d.dateStr === pDate)
            if (target) {
                target.minutes += p.time_spent ? Math.round(p.time_spent / 60) : 15
                target.solved += 1
            }
        })
    }

    return days.map(({ day, minutes, solved }) => ({ day, minutes, solved }))
}

export async function getUserRecentActivityLogs(): Promise<{ title: string; category: string; time: string; xp: string }[]> {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return []

    const { data: logs, error } = await supabase
        .from('lesson_progress')
        .select(`
            id, completed_at, status,
            lesson:lessons (
                id, title,
                module:modules (
                    id, title,
                    course:courses (id, title)
                )
            )
        `)
        .eq('user_id', user.id)
        .eq('status', 'completed')
        .order('completed_at', { ascending: false })
        .limit(5)

    if (error || !logs || logs.length === 0) {
        return []
    }

    return logs.map((log: any) => {
        const lessonTitle = log.lesson?.title || "Lesson Completion"
        const courseTitle = log.lesson?.module?.course?.title || "Curriculum Track"
        const completedAt = log.completed_at ? new Date(log.completed_at) : new Date()
        const diffMs = Date.now() - completedAt.getTime()
        const mins = Math.floor(diffMs / (1000 * 60))
        let timeStr = "Just now"
        if (mins >= 1440) timeStr = `${Math.floor(mins / 1440)}d ago`
        else if (mins >= 60) timeStr = `${Math.floor(mins / 60)}h ago`
        else if (mins > 0) timeStr = `${mins}m ago`

        return {
            title: `Completed: ${lessonTitle}`,
            category: courseTitle,
            time: timeStr,
            xp: "+100 XP"
        }
    })
}

export async function getUserActivityEvents(): Promise<any[]> {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return []

    const { data: logs, error } = await supabase
        .from('lesson_progress')
        .select(`
            id, completed_at, time_spent, status,
            lesson:lessons (
                id, title,
                module:modules (
                    id, title,
                    course:courses (id, title)
                )
            )
        `)
        .eq('user_id', user.id)
        .eq('status', 'completed')
        .order('completed_at', { ascending: false })
        .limit(30)

    if (error || !logs || logs.length === 0) {
        return []
    }

    return logs.map((log: any) => {
        const lessonTitle = log.lesson?.title || "Interactive Lesson"
        const courseTitle = log.lesson?.module?.course?.title || "Foundational Track"
        const completedAt = log.completed_at ? new Date(log.completed_at) : new Date()

        return {
            id: log.id,
            title: `Completed ${lessonTitle}`,
            module: courseTitle,
            type: "lesson",
            category: "Curriculum",
            timestamp: completedAt.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            }),
            xp: "+100 XP",
            status: "Completed",
            assertions: "Verified Pass"
        }
    })
}

/**
 * Fast unified dashboard bundle
 * Performs all data fetching in 1 roundtrip in parallel on the server
 */
export async function getDashboardBundle(passedUser?: any) {
    const supabase = await createClient()
    let user = passedUser
    if (!user) {
        const { data } = await supabase.auth.getUser()
        user = data?.user
    }
    if (!user) return null

    const now = new Date()

    // Parallel queries using the single authenticated client
    const [profileRes, enrollmentsRes, progressRes, coursesRes] = await Promise.all([
        supabase
            .from('profiles')
            .select('id, name, email, xp, streak, streak_count, last_active_date, avatar_url, bio, role, rank')
            .eq('id', user.id)
            .maybeSingle(),
        supabase
            .from('enrollments')
            .select(`
                id, status,
                course:courses (
                    id, title, slug, thumbnail, is_premium, premium_tier,
                    modules (
                        id, is_deleted,
                        lessons (id, is_deleted)
                    )
                )
            `)
            .eq('user_id', user.id),
        supabase
            .from('lesson_progress')
            .select(`
                id, lesson_id, completed_at, time_spent, status,
                lesson:lessons (
                    id, title,
                    module:modules (
                        id, title,
                        course:courses (id, title)
                    )
                )
            `)
            .eq('user_id', user.id)
            .eq('status', 'completed')
            .order('completed_at', { ascending: false })
            .limit(50),
        supabase
            .from('courses')
            .select(`
                id, title, slug, category, difficulty, duration_hours, description, is_premium, thumbnail_url,
                modules (id, is_deleted)
            `)
            .eq('is_published', true)
            .order('created_at', { ascending: false })
    ])

    const profile = profileRes.data
    const currentXp = profile?.xp ?? 0
    let rank = profile?.rank || "Recruit"
    if (currentXp >= 10000) rank = "Prime Master"
    else if (currentXp >= 5000) rank = "Architect"
    else if (currentXp >= 2000) rank = "Specialist"
    else if (currentXp >= 500) rank = "Operative"
    else if (currentXp > 0) rank = "Initiate"

    const resolvedProfile = profile ? {
        ...profile,
        xp: currentXp,
        streak_count: profile.streak_count ?? profile.streak ?? 0,
        rank
    } : {
        id: user.id,
        name: user.user_metadata?.full_name || user.email?.split('@')[0] || "Student",
        email: user.email,
        xp: 0,
        streak_count: 0,
        rank: "Recruit",
        role: "user"
    }

    const progressList = progressRes.data || []
    const completedLessonIds = new Set(progressList.map((p: any) => p.lesson_id))
    const completedLessonsCount = progressList.length

    // Process Enrollments
    const enrollments = enrollmentsRes.data || []
    const processedEnrollments = enrollments.map((enr: any) => {
        const course = enr.course
        let totalLessons = 0
        let completedLessonsForCourse = 0

        if (course && Array.isArray(course.modules)) {
            course.modules.filter((m: any) => !m.is_deleted).forEach((module: any) => {
                if (Array.isArray(module.lessons)) {
                    module.lessons.filter((l: any) => !l.is_deleted).forEach((lesson: any) => {
                        totalLessons++
                        if (completedLessonIds.has(lesson.id)) {
                            completedLessonsForCourse++
                        }
                    })
                }
            })
        }

        // Fallback to static curriculum courses if DB has no modules/lessons
        const effectiveSlug = course?.slug || enr.course_slug
        if (totalLessons === 0 && effectiveSlug) {
            const staticCourse = CURRICULUM_COURSES.find(c => c.slug.toLowerCase() === String(effectiveSlug).toLowerCase())
            if (staticCourse && Array.isArray(staticCourse.modules)) {
                staticCourse.modules.forEach((module) => {
                    if (Array.isArray(module.lessons)) {
                        module.lessons.forEach((lesson) => {
                            totalLessons++
                            if (completedLessonIds.has(lesson.id)) {
                                completedLessonsForCourse++
                            }
                        })
                    }
                })
            }
        }

        const staticMatch = effectiveSlug ? CURRICULUM_COURSES.find(c => c.slug.toLowerCase() === String(effectiveSlug).toLowerCase()) : null
        const courseTitle = course?.title || staticMatch?.title || enr.course_title || "Course Track"
        const courseSlug = course?.slug || staticMatch?.slug || enr.course_slug || ""

        const progressPercent = totalLessons === 0 ? 0 : Math.round((completedLessonsForCourse / totalLessons) * 100)
        const isFullyCompleted = totalLessons > 0 && completedLessonsForCourse >= totalLessons

        return {
            enrollmentId: enr.id,
            status: isFullyCompleted ? "completed" : enr.status,
            courseId: course?.id || staticMatch?.id || enr.course_id,
            slug: courseSlug,
            title: courseTitle,
            thumbnail: course?.thumbnail || staticMatch?.thumbnail_url,
            isPremium: course?.is_premium ?? staticMatch?.is_premium ?? false,
            totalLessons,
            completedLessons: completedLessonsForCourse,
            progressPercent: isFullyCompleted ? 100 : progressPercent
        }
    })

    // Compute Weekly Activity (Last 7 days)
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    const days: { day: string; dateStr: string; minutes: number; solved: number }[] = []
    for (let i = 6; i >= 0; i--) {
        const d = new Date()
        d.setDate(now.getDate() - i)
        const year = d.getFullYear()
        const month = String(d.getMonth() + 1).padStart(2, '0')
        const day = String(d.getDate()).padStart(2, '0')
        const dateStr = `${year}-${month}-${day}`
        days.push({
            day: dayNames[d.getDay()],
            dateStr,
            minutes: 0,
            solved: 0,
        })
    }

    progressList.forEach((p: any) => {
        if (!p.completed_at) return
        const pD = new Date(p.completed_at)
        const pDate = `${pD.getFullYear()}-${String(pD.getMonth() + 1).padStart(2, '0')}-${String(pD.getDate()).padStart(2, '0')}`
        const target = days.find(d => d.dateStr === pDate)
        if (target) {
            target.minutes += p.time_spent ? Math.round(p.time_spent / 60) : 15
            target.solved += 1
        }
    })
    const weeklyActivity = days.map(({ day, minutes, solved }) => ({ day, minutes, solved }))

    // Compute Recent Logs
    const recentLogs = progressList.slice(0, 5).map((log: any) => {
        const lessonTitle = log.lesson?.title || "Lesson Completion"
        const courseTitle = log.lesson?.module?.course?.title || "Curriculum Track"
        const completedAt = log.completed_at ? new Date(log.completed_at) : new Date()
        const diffMs = Date.now() - completedAt.getTime()
        const mins = Math.floor(diffMs / (1000 * 60))
        let timeStr = "Just now"
        if (mins >= 1440) timeStr = `${Math.floor(mins / 1440)}d ago`
        else if (mins >= 60) timeStr = `${Math.floor(mins / 60)}h ago`
        else if (mins > 0) timeStr = `${mins}m ago`

        return {
            title: `Completed: ${lessonTitle}`,
            category: courseTitle,
            time: timeStr,
            xp: "+100 XP"
        }
    })

    // Compute Activity Events
    const activityEvents = progressList.slice(0, 30).map((log: any) => {
        const lessonTitle = log.lesson?.title || "Interactive Lesson"
        const courseTitle = log.lesson?.module?.course?.title || "Foundational Track"
        const completedAt = log.completed_at ? new Date(log.completed_at) : new Date()

        return {
            id: log.id,
            title: `Completed ${lessonTitle}`,
            module: courseTitle,
            type: "lesson",
            category: "Curriculum",
            timestamp: completedAt.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            }),
            xp: "+100 XP",
            status: "Completed",
            assertions: "Verified Pass"
        }
    })

    // Compute Gamification Stats & Badges
    const levelInfo = calculateLevel(currentXp)
    const rankInfo = calculateRank(currentXp)
    const streakCount = resolvedProfile.streak_count

    const userStats: UserGamificationStats = {
        totalXp: currentXp,
        streakCount,
        lessonsCompleted: completedLessonsCount,
        coursesCompleted: Math.floor(completedLessonsCount / 20),
        challengesSolved: Math.floor(completedLessonsCount / 2),
        dailyTasksCompletedTotal: completedLessonsCount,
        consecutivePerfectDays: Math.floor(streakCount / 3),
    }

    const unlockedBadgeIds = BADGES_REGISTRY
        .filter((badge) => badge.checkUnlock(userStats))
        .map((b) => b.id)

    const gamificationStats = {
        totalXp: currentXp,
        streakCount,
        level: levelInfo.level,
        currentLevelXp: levelInfo.currentLevelXp,
        progressPercent: levelInfo.progressPercent,
        rank: resolvedProfile.rank || rankInfo.title || "Recruit",
        unlockedBadgeIds,
        completedLessonsCount
    }

    const rawCourses = coursesRes.data || []
    const existingKeys = new Set(rawCourses.map((c: any) => (c.slug || c.id || "").toLowerCase()))

    // Merge any courses from CURRICULUM_COURSES that aren't already fetched from DB
    const missingCurriculum = CURRICULUM_COURSES.filter(
        c => !existingKeys.has(c.slug.toLowerCase()) && !existingKeys.has(c.id.toLowerCase())
    ).map(c => ({
        id: c.id,
        slug: c.slug,
        title: c.title,
        category: c.category,
        difficulty: c.level,
        duration_hours: c.duration_hours,
        weeks: c.weeks,
        description: c.description,
        is_premium: c.is_premium,
        thumbnail_url: c.thumbnail_url,
        modules: c.modules.map(m => ({ id: m.id, is_deleted: false }))
    }))

    const allCoursesCombined = [...rawCourses, ...missingCurriculum]

    const catalogTracks = allCoursesCombined.map((c: any) => {
        const activeModules = Array.isArray(c.modules) ? c.modules.filter((m: any) => !m.is_deleted).length : 4
        const isEnrolled = (enrollmentsRes.data || []).some((e: any) => 
            (e.course?.id && (e.course.id === c.id || e.course.id === c.slug)) ||
            (e.course?.slug && (e.course.slug === c.slug || e.course.slug === c.id))
        )
        return {
            id: c.slug || c.id,
            slug: c.slug || c.id,
            title: c.title,
            category: c.category || "Engineering",
            difficulty: c.difficulty || c.level || "Intermediate",
            modules: activeModules || 4,
            duration: c.duration_hours ? `${c.duration_hours}h` : (c.weeks || "Self-Paced"),
            duration_hours: c.duration_hours,
            desc: c.description || "Production-grade engineering curriculum built for top-tier software engineers.",
            href: `/courses/${c.slug || c.id}/learn`,
            exploreHref: `/courses/${c.slug || c.id}`,
            enrolled: isEnrolled,
            is_premium: c.is_premium,
            thumbnail_url: c.thumbnail_url,
        }
    })

    return {
        profile: resolvedProfile,
        enrollments: processedEnrollments,
        weeklyActivity,
        recentLogs,
        activityEvents,
        gamificationStats,
        catalogTracks
    }
}
