"use server"

import { createClient } from "@/utils/supabase/server"
import {
  BADGES_REGISTRY,
  Badge,
  calculateLevel,
  calculateRank,
  UserGamificationStats,
  XP_RULES,
  calculateStreakDailyBonus,
  checkStreakMilestone,
} from "@/lib/gamification"

export interface GamificationActionResult {
  success: boolean
  message?: string
  xpEarned: number
  newTotalXp: number
  newLevel: number
  newRank: string
  newStreak: number
  unlockedBadges: Badge[]
  courseCompleted?: boolean
  error?: string
}

/**
 * Robust calendar day difference calculation (independent of hours/timezones)
 */
function getCalendarDayDifference(dateStr1: string, dateStr2: string): number {
  const [y1, m1, d1] = dateStr1.split("-").map(Number)
  const [y2, m2, d2] = dateStr2.split("-").map(Number)
  const d1Utc = Date.UTC(y1, m1 - 1, d1)
  const d2Utc = Date.UTC(y2, m2 - 1, d2)
  return Math.round((d1Utc - d2Utc) / (1000 * 60 * 60 * 24))
}

/**
 * Server Action: Award XP and record progress when completing a lesson
 */
export async function recordLessonCompletion(
  lessonId: string,
  courseSlug: string,
  baseXp: number = XP_RULES.LESSON_COMPLETE
): Promise<GamificationActionResult> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    const streak = 1
    const earned = baseXp
    return {
      success: true,
      message: `Progress recorded (+${earned} XP).`,
      xpEarned: earned,
      newTotalXp: earned,
      newLevel: calculateLevel(earned).level,
      newRank: calculateRank(earned).title,
      newStreak: streak,
      unlockedBadges: [],
      courseCompleted: false,
    }
  }

  try {
    // 1. Fetch current profile
    const { data: profile } = await supabase
      .from("profiles")
      .select("id, xp, streak_count, last_active_date")
      .eq("id", user.id)
      .single()

    const currentXp = profile?.xp || 0
    let currentStreak = profile?.streak_count || 1
    const todayStr = new Date().toISOString().split("T")[0]
    const lastActiveStr = profile?.last_active_date ? String(profile.last_active_date).split("T")[0] : null
    let streakIncremented = false

    // Robust calendar streak calculation
    if (!lastActiveStr) {
      currentStreak = 1
      streakIncremented = true
    } else {
      const diffDays = getCalendarDayDifference(todayStr, lastActiveStr)
      if (diffDays === 1) {
        currentStreak += 1
        streakIncremented = true
      } else if (diffDays > 1) {
        currentStreak = 1
        streakIncremented = true
      }
    }

    // 2. Record lesson progress in Supabase (upsert)
    let alreadyCompleted = false
    const { data: existingProgress } = await supabase
      .from("lesson_progress")
      .select("id, status")
      .eq("user_id", user.id)
      .eq("lesson_id", lessonId)
      .single()

    if (existingProgress?.status === "completed") {
      alreadyCompleted = true
    } else {
      await supabase.from("lesson_progress").upsert(
        {
          user_id: user.id,
          lesson_id: lessonId,
          status: "completed",
          completed_at: new Date().toISOString(),
        },
        { onConflict: "user_id,lesson_id" }
      )
    }

    // 3. Calculate XP to award with Streak Multipliers & Milestones
    let xpToAward = alreadyCompleted ? 15 : baseXp // Repeat lessons award small revision XP

    // Daily streak scaling bonus
    const streakBonus = calculateStreakDailyBonus(currentStreak)
    xpToAward += streakBonus

    // Streak milestone award (e.g. 7-day, 14-day, 30-day)
    const milestone = streakIncremented ? checkStreakMilestone(currentStreak) : null
    if (milestone) {
      xpToAward += milestone.xpBonus
    }

    // Check if user completed all lessons in this course
    let courseCompleted = false
    try {
      if (courseSlug) {
        const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(courseSlug)
        let courseQuery = supabase
          .from("courses")
          .select(`
            id,
            modules (
              id, is_deleted,
              lessons (id, is_deleted)
            )
          `)
        courseQuery = isUuid ? courseQuery.eq("id", courseSlug) : courseQuery.eq("slug", courseSlug)
        const { data: course } = await courseQuery.maybeSingle()

        if (course && Array.isArray(course.modules)) {
          const courseLessonIds: string[] = []
          course.modules.filter((m: any) => !m.is_deleted).forEach((m: any) => {
            if (Array.isArray(m.lessons)) {
              m.lessons.filter((l: any) => !l.is_deleted).forEach((l: any) => {
                courseLessonIds.push(l.id)
              })
            }
          })

          if (courseLessonIds.length > 0) {
            const { data: courseCompletedLessons } = await supabase
              .from("lesson_progress")
              .select("lesson_id")
              .eq("user_id", user.id)
              .eq("status", "completed")
              .in("lesson_id", courseLessonIds)

            const completedInCourse = courseCompletedLessons?.length || 0
            if (completedInCourse >= courseLessonIds.length) {
              courseCompleted = true
              xpToAward += (XP_RULES as any).COURSE_COMPLETE || 1000

              // Update enrollment status to completed
              await supabase
                .from("enrollments")
                .update({
                  status: "completed",
                  updated_at: new Date().toISOString(),
                })
                .eq("user_id", user.id)
                .eq("course_id", course.id)
            }
          }
        }
      }
    } catch (courseCheckErr) {
      console.warn("Course completion evaluation notice:", courseCheckErr)
    }

    const { data: allUserCompleted } = await supabase
      .from("lesson_progress")
      .select("lesson_id")
      .eq("user_id", user.id)
      .eq("status", "completed")

    const completedLessonCount = allUserCompleted?.length || 1

    // If module milestone reached (every 10 lessons), award bonus
    if (completedLessonCount % 10 === 0 && !alreadyCompleted) {
      xpToAward += XP_RULES.MODULE_COMPLETE
    }

    const newTotalXp = currentXp + xpToAward

    // 4. Update profile with new XP and streak
    await supabase
      .from("profiles")
      .update({
        xp: newTotalXp,
        streak_count: currentStreak,
        last_active_date: todayStr,
      })
      .eq("id", user.id)

    // 5. Evaluate unlocked badges
    const userStats: UserGamificationStats = {
      totalXp: newTotalXp,
      streakCount: currentStreak,
      lessonsCompleted: completedLessonCount,
      coursesCompleted: courseCompleted ? 1 : 0,
      challengesSolved: Math.floor(completedLessonCount / 2),
      dailyTasksCompletedTotal: completedLessonCount + 1,
      consecutivePerfectDays: Math.floor(currentStreak / 3),
    }

    const newlyUnlocked: Badge[] = []
    for (const badge of BADGES_REGISTRY) {
      if (badge.checkUnlock(userStats)) {
        newlyUnlocked.push(badge)
      }
    }

    const rank = calculateRank(newTotalXp)
    const levelInfo = calculateLevel(newTotalXp)

    return {
      success: true,
      message: `Earned +${xpToAward} XP!`,
      xpEarned: xpToAward,
      newTotalXp,
      newLevel: levelInfo.level,
      newRank: rank.title,
      newStreak: currentStreak,
      unlockedBadges: newlyUnlocked,
      courseCompleted,
    }
  } catch (err: any) {
    console.warn("Error in recordLessonCompletion server action:", err)
    return {
      success: false,
      xpEarned: 0,
      newTotalXp: 0,
      newLevel: 1,
      newRank: "Recruit",
      newStreak: 0,
      unlockedBadges: [],
      error: err?.message,
    }
  }
}

/**
 * Server Action: Claim Daily Task Reward & Synchronize Streak
 */
export async function claimDailyTaskServer(
  taskId: string,
  xpAmount: number
): Promise<{ success: boolean; newTotalXp: number; newStreak?: number; message: string }> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { success: true, newTotalXp: xpAmount, message: `Claimed +${xpAmount} XP!` }
  }

  try {
    const { data: profile } = await supabase
      .from("profiles")
      .select("id, xp, streak_count, last_active_date")
      .eq("id", user.id)
      .single()

    const todayStr = new Date().toISOString().split("T")[0]
    const lastActiveStr = profile?.last_active_date ? String(profile.last_active_date).split("T")[0] : null
    let currentStreak = profile?.streak_count || 1

    if (taskId.startsWith("task_checkin")) {
      if (!lastActiveStr) {
        currentStreak = 1
      } else {
        const diffDays = getCalendarDayDifference(todayStr, lastActiveStr)
        if (diffDays === 1) {
          currentStreak += 1
        } else if (diffDays > 1) {
          currentStreak = 1
        }
      }
    }

    const newXp = (profile?.xp || 0) + xpAmount

    await supabase
      .from("profiles")
      .update({
        xp: newXp,
        streak_count: currentStreak,
        last_active_date: todayStr,
      })
      .eq("id", user.id)

    return { success: true, newTotalXp: newXp, newStreak: currentStreak, message: `Claimed +${xpAmount} XP!` }
  } catch (err: any) {
    return { success: false, newTotalXp: 0, message: err?.message || "Failed to claim task" }
  }
}

/**
 * Server Action: Perform Daily Check-in and Award Streak Multiplier XP
 */
export async function recordDailyCheckinServer(): Promise<{
  success: boolean
  alreadyCheckedIn: boolean
  xpEarned: number
  streakCount: number
  streakBonus: number
  newTotalXp: number
  message: string
}> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const todayStr = new Date().toISOString().split("T")[0]

  if (!user) {
    const streak = 1
    const bonus = calculateStreakDailyBonus(streak)
    const total = XP_RULES.DAILY_LOGIN + bonus
    return {
      success: true,
      alreadyCheckedIn: false,
      xpEarned: total,
      streakCount: streak,
      streakBonus: bonus,
      newTotalXp: total,
      message: `Daily Check-in Complete! (+${total} XP)`,
    }
  }

  try {
    const { data: profile } = await supabase
      .from("profiles")
      .select("id, xp, streak_count, last_active_date")
      .eq("id", user.id)
      .single()

    const lastActiveStr = profile?.last_active_date ? String(profile.last_active_date).split("T")[0] : null
    let currentStreak = profile?.streak_count || 1
    let alreadyCheckedIn = false

    if (lastActiveStr === todayStr) {
      alreadyCheckedIn = true
      return {
        success: true,
        alreadyCheckedIn: true,
        xpEarned: 0,
        streakCount: currentStreak,
        streakBonus: calculateStreakDailyBonus(currentStreak),
        newTotalXp: profile?.xp || 0,
        message: "You have already claimed today's check-in!",
      }
    }

    if (!lastActiveStr) {
      currentStreak = 1
    } else {
      const diffDays = getCalendarDayDifference(todayStr, lastActiveStr)
      if (diffDays === 1) {
        currentStreak += 1
      } else if (diffDays > 1) {
        currentStreak = 1
      }
    }

    const streakBonus = calculateStreakDailyBonus(currentStreak)
    const xpEarned = XP_RULES.DAILY_LOGIN + streakBonus
    const milestone = checkStreakMilestone(currentStreak)
    const totalAward = xpEarned + (milestone ? milestone.xpBonus : 0)

    const newTotalXp = (profile?.xp || 0) + totalAward

    await supabase
      .from("profiles")
      .update({
        xp: newTotalXp,
        streak_count: currentStreak,
        last_active_date: todayStr,
      })
      .eq("id", user.id)

    return {
      success: true,
      alreadyCheckedIn: false,
      xpEarned: totalAward,
      streakCount: currentStreak,
      streakBonus,
      newTotalXp,
      message: milestone
        ? `🔥 Streak Milestone Reached! ${milestone.label} (+${totalAward} XP!)`
        : `Daily Check-in Complete! +${totalAward} XP (${currentStreak}d Streak)`,
    }
  } catch (err: any) {
    return {
      success: false,
      alreadyCheckedIn: false,
      xpEarned: 0,
      streakCount: 1,
      streakBonus: 0,
      newTotalXp: 0,
      message: err?.message || "Failed to record check-in",
    }
  }
}

/**
 * Server Action: Get User Gamification Stats & Badges
 */
export async function getUserGamificationStats(providedUserId?: string): Promise<{
  totalXp: number
  streakCount: number
  level: number
  currentLevelXp: number
  progressPercent: number
  rank: string
  unlockedBadgeIds: string[]
  completedLessonsCount: number
}> {
  const supabase = await createClient()
  let targetUserId = providedUserId

  if (!targetUserId) {
    const { data: { user } } = await supabase.auth.getUser()
    targetUserId = user?.id
  }

  if (!targetUserId) {
    const levelInfo = calculateLevel(0)
    return {
      totalXp: 0,
      streakCount: 0,
      level: levelInfo.level,
      currentLevelXp: levelInfo.currentLevelXp,
      progressPercent: levelInfo.progressPercent,
      rank: "Recruit",
      unlockedBadgeIds: [],
      completedLessonsCount: 0,
    }
  }

  try {
    const { data: profile } = await supabase
      .from("profiles")
      .select("xp, streak, streak_count, rank")
      .eq("id", targetUserId)
      .single()

    const { count: completedLessonsCount } = await supabase
      .from("lesson_progress")
      .select("id", { count: "exact", head: true })
      .eq("user_id", targetUserId)
      .eq("status", "completed")

    const totalXp = profile?.xp ?? 0
    const streakCount = profile?.streak_count ?? profile?.streak ?? 0
    const levelInfo = calculateLevel(totalXp)
    const rankInfo = calculateRank(totalXp)
    const lessonsCount = completedLessonsCount || 0

    const userStats: UserGamificationStats = {
      totalXp,
      streakCount,
      lessonsCompleted: lessonsCount,
      coursesCompleted: Math.floor(lessonsCount / 20),
      challengesSolved: Math.floor(lessonsCount / 2),
      dailyTasksCompletedTotal: lessonsCount,
      consecutivePerfectDays: Math.floor(streakCount / 3),
    }

    const unlockedBadgeIds = BADGES_REGISTRY
      .filter((badge) => badge.checkUnlock(userStats))
      .map((b) => b.id)

    return {
      totalXp,
      streakCount,
      level: levelInfo.level,
      currentLevelXp: levelInfo.currentLevelXp,
      progressPercent: levelInfo.progressPercent,
      rank: profile?.rank || rankInfo.title || "Recruit",
      unlockedBadgeIds,
      completedLessonsCount: lessonsCount,
    }
  } catch (e) {
    const defaultXp = 0
    const levelInfo = calculateLevel(defaultXp)
    return {
      totalXp: defaultXp,
      streakCount: 0,
      level: levelInfo.level,
      currentLevelXp: levelInfo.currentLevelXp,
      progressPercent: levelInfo.progressPercent,
      rank: "Recruit",
      unlockedBadgeIds: [],
      completedLessonsCount: 0,
    }
  }
}
