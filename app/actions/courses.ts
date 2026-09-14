"use server"

import { createClient } from "@/utils/supabase/server"
import { CURRICULUM_COURSES, getCurriculumCourseBySlug } from "@/lib/curriculum-data"

// ==========================================
// COURSE FETCHING & ENROLLMENT LOGIC
// ==========================================

export async function getAllCourses() {
    const supabase = await createClient()

    let dbCourses: any[] = []
    try {
        const { data, error } = await supabase
            .from('courses')
            .select('*')
            .eq('is_deleted', false)
            .order('created_at', { ascending: false })

        if (!error && data) {
            dbCourses = data
        }
    } catch (err) {
        console.error("Error fetching courses from DB, falling back to curriculum data:", err)
    }

    // Merge database courses with curriculum courses (avoiding duplicates by slug/id)
    const existingSlugs = new Set(dbCourses.map((c: any) => c.slug || c.id))
    const mappedCurriculum = CURRICULUM_COURSES.filter(c => !existingSlugs.has(c.slug) && !existingSlugs.has(c.id)).map(c => ({
        id: c.id,
        title: c.title,
        slug: c.slug,
        description: c.description,
        difficulty: c.level,
        duration_hours: c.duration_hours,
        category: c.category,
        certificate: c.certificate,
        is_published: true,
        is_premium: c.is_premium,
        lessons: c.lessons,
        projects: c.projects,
        created_at: new Date().toISOString()
    }))

    return [...dbCourses, ...mappedCurriculum]
}

export async function getCourseContent(courseIdOrSlug: string) {
    const supabase = await createClient()

    // 1. Try fetching from Supabase by UUID or slug
    try {
        const query = supabase
            .from('courses')
            .select(`
                id, title, slug, description, thumbnail_url, difficulty, duration_hours, is_published, is_premium, premium_tier,
                modules (
                    id, title, sequence_order,
                    lessons (
                        id, title, sequence_order, content_type, xp_reward, content, challenge_data, description
                    )
                )
            `)
            .eq('is_deleted', false)
            .eq('modules.is_deleted', false)
            .eq('modules.lessons.is_deleted', false)

        const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(courseIdOrSlug)
        const { data: course, error } = isUuid 
            ? await query.eq('id', courseIdOrSlug).single()
            : await query.eq('slug', courseIdOrSlug).single()

        if (!error && course && course.modules && course.modules.length > 0) {
            course.modules.sort((a: any, b: any) => a.sequence_order - b.sequence_order)
            course.modules.forEach((module: any) => {
                module.lessons.sort((a: any, b: any) => a.sequence_order - b.sequence_order)
            })
            return course
        }
    } catch (err) {
        console.warn("DB course fetch failed, checking curriculum catalog", err)
    }

    // 2. Fallback to curriculum catalog
    const staticCourse = getCurriculumCourseBySlug(courseIdOrSlug)
    if (staticCourse) {
        return {
            id: staticCourse.id,
            title: staticCourse.title,
            slug: staticCourse.slug,
            description: staticCourse.description,
            thumbnail_url: staticCourse.thumbnail_url || null,
            difficulty: staticCourse.level,
            duration_hours: staticCourse.duration_hours,
            is_published: true,
            is_premium: staticCourse.is_premium,
            certificate: staticCourse.certificate,
            category: staticCourse.category,
            modules: staticCourse.modules
        }
    }

    return null
}

export async function checkEnrollment(courseId: string) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return false

    const { data, error } = await supabase
        .from('enrollments')
        .select('id')
        .eq('user_id', user.id)
        .eq('course_id', courseId)
        .single()

    return !!data
}

export async function enrollInCourse(courseId: string) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'You must be logged in to enroll.' }

    const { error } = await supabase
        .from('enrollments')
        .insert({
            user_id: user.id,
            course_id: courseId,
            status: 'active'
        })

    if (error && error.code !== '23505') { // 23505 is unique violation (already enrolled)
        console.error("Enrollment error:", error)
        return { error: 'Failed to enroll in course.' }
    }

    return { success: true }
}

export async function getLessonContent(lessonId: string) {
    const supabase = await createClient()

    // Fetch lesson with specific columns
    const { data: lesson, error } = await supabase
        .from('lessons')
        .select(`
            id, title, description, content_type, content, challenge_data, sequence_order, xp_reward,
            modules (
                id, title, sequence_order,
                courses ( id, title )
            )
        `)
        .eq('id', lessonId)
        .eq('is_deleted', false)
        .single()

    if (error || !lesson) {
        // Fallback to curriculum data
        for (const course of CURRICULUM_COURSES) {
            for (const module of course.modules) {
                const found = module.lessons.find(l => l.id === lessonId)
                if (found) {
                    return {
                        id: found.id,
                        title: found.title,
                        description: found.description,
                        content_type: found.content_type,
                        content: found.content,
                        challenge_data: found.challenge_data,
                        sequence_order: found.sequence_order,
                        xp_reward: found.xp_reward,
                        modules: {
                            id: module.id,
                            title: module.title,
                            sequence_order: module.sequence_order,
                            courses: { id: course.id, title: course.title, slug: course.slug }
                        }
                    }
                }
            }
        }
        console.error("Error fetching lesson content:", error, lessonId)
        return null
    }

    if (lesson.challenge_data && typeof lesson.challenge_data === "string") {
        try {
            lesson.challenge_data = JSON.parse(lesson.challenge_data);
        } catch (e) {
            console.error("Failed to parse challenge_data:", e);
        }
    }

    return lesson
}


