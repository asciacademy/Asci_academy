"use server"

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"
import { createModule, createLesson } from "./curriculum"

// ─── Admin Authorization Guard ────────────────────────────────
/**
 * Server-side admin guard. Must be called at the top of every admin mutation.
 * Returns the Supabase client if the caller is an admin/super_admin, throws otherwise.
 */
async function requireAdmin() {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) throw new Error("Unauthorized: Not authenticated")

    const { data: profile, error: profileErr } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .maybeSingle()

    if (profileErr || !profile) throw new Error("Unauthorized: Profile not found")
    if (profile.role !== "admin" && profile.role !== "super_admin") {
        throw new Error("Unauthorized: Insufficient permissions")
    }
    return supabase
}

// ─── Users ───────────────────────────────────────────────────
export async function getAllUsers() {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from("profiles")
        .select("id, name, email, role, rank, xp, created_at, bio, avatar_url, is_banned")
        .order("created_at", { ascending: false })
    if (error) return { success: false, error: error.message }

    // Fetch auth users to get last_sign_in_at
    try {
        const { data: authData } = await supabase.auth.admin.listUsers({ perPage: 1000 })
        const authMap = new Map(authData?.users?.map(u => [u.id, u.last_sign_in_at]) ?? [])
        const users = (data || []).map(p => ({
            ...p,
            last_sign_in_at: authMap.get(p.id) ?? null,
        }))
        return { success: true, users }
    } catch {
        return { success: true, users: data || [] }
    }
}

export async function updateUserRole(userId: string, role: "user" | "admin" | "super_admin") {
    try {
        const supabase = await requireAdmin()
        const { error } = await supabase.from("profiles").update({ role }).eq("id", userId)
        if (error) return { success: false, error: error.message }
        revalidatePath("/admin/users")
        return { success: true }
    } catch (e: any) {
        return { success: false, error: e.message || "Unauthorized" }
    }
}

export async function updateUserXP(userId: string, xp: number) {
    try {
        const supabase = await requireAdmin()
        const { error } = await supabase.from("profiles").update({ xp }).eq("id", userId)
        if (error) return { success: false, error: error.message }
        revalidatePath("/admin/users")
        return { success: true }
    } catch (e: any) {
        return { success: false, error: e.message || "Unauthorized" }
    }
}

export async function deleteUser(userId: string) {
    try {
        const supabase = await requireAdmin()
        const { error } = await supabase.from("profiles").delete().eq("id", userId)
        if (error) return { success: false, error: error.message }
        revalidatePath("/admin/users")
        return { success: true }
    } catch (e: any) {
        return { success: false, error: e.message || "Unauthorized" }
    }
}

export async function banUser(userId: string, banned: boolean) {
    try {
        const supabase = await requireAdmin()
        const { error } = await supabase.from("profiles").update({ is_banned: banned }).eq("id", userId)
        if (error) return { success: false, error: error.message }
        revalidatePath("/admin/users")
        return { success: true }
    } catch (e: any) {
        return { success: false, error: e.message || "Unauthorized" }
    }
}

// ─── Courses ─────────────────────────────────────────────────
export async function getAdminCourses() {
    const supabase = await createClient()
    
    // Fetch base courses
    let { data, error } = await supabase
        .from("courses")
        .select(`
            id, title, description, slug, is_published, is_premium,
            thumbnail_url, difficulty, duration_hours, created_at,
            modules:modules(count)
        `)
        .order("created_at", { ascending: false })

    if (error) {
        const fallback = await supabase
            .from("courses")
            .select(`id, title, description, is_published, is_premium, created_at, modules:modules(count)`)
            .order("created_at", { ascending: false })
        if (fallback.error) return { success: false, error: fallback.error.message }
        data = fallback.data as any
    }

    // Fetch enrollments count for each course
    const coursesWithStats = await Promise.all((data || []).map(async (c: any) => {
        const { count } = await supabase
            .from("enrollments")
            .select("*", { count: "exact", head: true })
            .eq("course_id", c.id)

        return {
            ...c,
            module_count: c.modules?.[0]?.count ?? 0,
            lesson_count: 0, 
            enrollment_count: count ?? 0
        }
    }))

    return { success: true, courses: coursesWithStats }
}

export async function toggleCoursePublish(courseId: string, isPublished: boolean) {
    try {
        const supabase = await requireAdmin()
        const { error } = await supabase.from("courses").update({ is_published: !isPublished }).eq("id", courseId)
        if (error) return { success: false, error: error.message }
        revalidatePath("/admin/courses")
        revalidatePath("/courses")
        return { success: true }
    } catch (e: any) {
        return { success: false, error: e.message || "Unauthorized" }
    }
}

export async function toggleCoursePremium(courseId: string, isPremium: boolean) {
    try {
        const supabase = await requireAdmin()
        const { error } = await supabase.from("courses").update({ is_premium: !isPremium }).eq("id", courseId)
        if (error) return { success: false, error: error.message }
        revalidatePath("/admin/courses")
        revalidatePath("/courses")
        return { success: true }
    } catch (e: any) {
        return { success: false, error: e.message || "Unauthorized" }
    }
}

export async function updateCourseDetails(courseId: string, values: {
    title?: string; description?: string; difficulty?: string; duration_hours?: number; thumbnail_url?: string; category?: string
}) {
    try {
        const supabase = await requireAdmin()
        const updateData: any = { updated_at: new Date().toISOString() }
        if (values.title !== undefined) updateData.title = values.title
        if (values.description !== undefined) updateData.description = values.description
        if (values.difficulty !== undefined) updateData.difficulty = values.difficulty
        if (values.duration_hours !== undefined) updateData.duration_hours = values.duration_hours
        if (values.thumbnail_url !== undefined) updateData.thumbnail_url = values.thumbnail_url
        if (values.category !== undefined) updateData.category = values.category
        
        const { error } = await supabase.from("courses").update(updateData).eq("id", courseId)
        if (error) {
            await supabase.from("courses").update(updateData).eq("slug", courseId)
        }
        revalidatePath("/admin/courses")
        revalidatePath("/courses")
        revalidatePath("/dashboard")
        return { success: true }
    } catch (e: any) {
        return { success: false, error: e.message || "Unauthorized" }
    }
}

export async function createCourse(values: {
    title: string; description: string; slug: string; difficulty: string; duration_hours: number; is_premium: boolean; template?: string
}) {
    try {
        const supabase = await requireAdmin()
        // Try with all fields first; fall back to just base fields if migration hasn't run
        const fullInsert = await supabase.from("courses").insert({
            title: values.title,
            description: values.description,
            slug: values.slug,
            difficulty: values.difficulty,
            duration_hours: values.duration_hours,
            is_premium: values.is_premium,
            is_published: false
        }).select("id").maybeSingle()

        if (fullInsert.error || !fullInsert.data) {
            // Fallback: insert only base columns (without slug/difficulty/duration_hours)
            const { error } = await supabase.from("courses").insert({
                title: values.title,
                description: values.description,
                is_premium: values.is_premium,
                is_published: false,
            })
            if (error) return { success: false, error: `Migration required: Run add_course_columns.sql in Supabase, then retry. (${error.message})` }
            revalidatePath("/admin/courses")
            revalidatePath("/courses")
            revalidatePath("/dashboard")
            return { success: true }
        }

        const courseId = fullInsert.data.id

        // Apply Templates
        if (values.template === "crash_course") {
            const modRes = await createModule(courseId, "Complete Course", 1)
            if (modRes.success && modRes.moduleId) {
                await createLesson(modRes.moduleId, { title: "Introduction", sequence_order: 1, content_type: "text" })
                await createLesson(modRes.moduleId, { title: "Core Concepts", sequence_order: 2, content_type: "text" })
                await createLesson(modRes.moduleId, { title: "Final Exam", sequence_order: 3, content_type: "text" })
            }
        } else if (values.template === "masterclass") {
            const modules = [
                { title: "Beginner Basics", lessons: ["Welcome & Setup", "Syntax Crash Course", "Writing Your First Script"] },
                { title: "Intermediate Deep Dive", lessons: ["Data Structures", "Functions & Scope", "Error Handling"] },
                { title: "Advanced Patterns", lessons: ["Object Oriented Programming", "Async & Concurrency", "Design Patterns"] },
                { title: "Capstone Project", lessons: ["Project Overview", "Building the Core", "Deployment & Wrap Up"] },
            ]
            for (let i = 0; i < modules.length; i++) {
                const modRes = await createModule(courseId, modules[i].title, i + 1)
                if (modRes.success && modRes.moduleId) {
                    for (let j = 0; j < modules[i].lessons.length; j++) {
                        await createLesson(modRes.moduleId, { title: modules[i].lessons[j], sequence_order: j + 1, content_type: "text" })
                    }
                }
            }
        }

        revalidatePath("/admin/courses")
        revalidatePath("/courses")
        revalidatePath("/dashboard")
        return { success: true }
    } catch (e: any) {
        return { success: false, error: e.message || "Unauthorized" }
    }
}

export async function deleteCourse(courseId: string) {
    try {
        const supabase = await requireAdmin()
        const { error } = await supabase.from("courses").delete().eq("id", courseId)
        if (error) {
            await supabase.from("courses").delete().eq("slug", courseId)
        }
        revalidatePath("/admin/courses")
        revalidatePath("/courses")
        revalidatePath("/dashboard")
        return { success: true }
    } catch (e: any) {
        return { success: false, error: e.message || "Unauthorized" }
    }
}

export async function duplicateCourse(courseId: string) {
    try {
        const supabase = await requireAdmin()
        // 1. Fetch original course
        const { data: original, error: origErr } = await supabase
            .from("courses")
            .select(`*, modules:modules(*, lessons:lessons(*))`)
            .eq("id", courseId)
            .maybeSingle()

        let target = original
        if (!target) {
            const { data: bySlug } = await supabase
                .from("courses")
                .select(`*, modules:modules(*, lessons:lessons(*))`)
                .eq("slug", courseId)
                .maybeSingle()
            target = bySlug
        }

        if (!target) return { success: false, error: "Original course not found" }

        const randSuffix = Math.floor(1000 + Math.random() * 9000).toString()
        const newSlug = `${(target.slug || "course").replace(/-copy-\d+$/, "")}-copy-${randSuffix}`
        const newTitle = `${target.title} (Clone)`

        const { data: newCourse, error: insertErr } = await supabase.from("courses").insert({
            title: newTitle,
            slug: newSlug,
            description: target.description,
            difficulty: target.difficulty || "Intermediate",
            duration_hours: target.duration_hours || 40,
            thumbnail_url: target.thumbnail_url,
            is_premium: target.is_premium || false,
            is_published: false
        }).select("id").single()

        if (insertErr || !newCourse) return { success: false, error: insertErr?.message || "Failed to duplicate course" }

        // Clone modules and lessons if any exist
        if (target.modules && Array.isArray(target.modules)) {
            for (const mod of target.modules) {
                const { data: newMod } = await supabase.from("modules").insert({
                    course_id: newCourse.id,
                    title: mod.title,
                    sequence_order: mod.sequence_order
                }).select("id").single()

                if (newMod && mod.lessons && Array.isArray(mod.lessons)) {
                    for (const les of mod.lessons) {
                        await supabase.from("lessons").insert({
                            module_id: newMod.id,
                            title: les.title,
                            description: les.description,
                            content: les.content,
                            content_type: les.content_type || "text",
                            sequence_order: les.sequence_order,
                            xp_reward: les.xp_reward || 50
                        })
                    }
                }
            }
        }

        revalidatePath("/admin/courses")
        revalidatePath("/courses")
        return { success: true, newCourseId: newCourse.id }
    } catch (e: any) {
        return { success: false, error: e.message || "Failed to duplicate course" }
    }
}

export async function batchUpdateCoursesPublish(courseIds: string[], isPublished: boolean) {
    try {
        const supabase = await requireAdmin()
        const { error } = await supabase.from("courses").update({ is_published: isPublished }).in("id", courseIds)
        if (error) return { success: false, error: error.message }
        revalidatePath("/admin/courses")
        revalidatePath("/courses")
        return { success: true }
    } catch (e: any) {
        return { success: false, error: e.message || "Unauthorized" }
    }
}

export async function batchUpdateCoursesPremium(courseIds: string[], isPremium: boolean) {
    try {
        const supabase = await requireAdmin()
        const { error } = await supabase.from("courses").update({ is_premium: isPremium }).in("id", courseIds)
        if (error) return { success: false, error: error.message }
        revalidatePath("/admin/courses")
        revalidatePath("/courses")
        return { success: true }
    } catch (e: any) {
        return { success: false, error: e.message || "Unauthorized" }
    }
}

export async function batchDeleteCourses(courseIds: string[]) {
    try {
        const supabase = await requireAdmin()
        const { error } = await supabase.from("courses").delete().in("id", courseIds)
        if (error) return { success: false, error: error.message }
        revalidatePath("/admin/courses")
        revalidatePath("/courses")
        return { success: true }
    } catch (e: any) {
        return { success: false, error: e.message || "Unauthorized" }
    }
}

// ─── Testimonials ─────────────────────────────────────────────
export async function getAllTestimonialsAdmin() {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from("testimonials")
        .select("*, profiles(name, email)")
        .order("created_at", { ascending: false })
    if (error) return { success: false, error: error.message }
    return { success: true, testimonials: data }
}

export async function approveTestimonial(id: string, approve: boolean) {
    try {
        const supabase = await requireAdmin()
        const { error } = await supabase.from("testimonials").update({ is_approved: approve }).eq("id", id)
        if (error) return { success: false, error: error.message }
        revalidatePath("/admin/testimonials")
        revalidatePath("/")
        return { success: true }
    } catch (e: any) {
        return { success: false, error: e.message || "Unauthorized" }
    }
}

export async function deleteTestimonial(id: string) {
    try {
        const supabase = await requireAdmin()
        const { error } = await supabase.from("testimonials").delete().eq("id", id)
        if (error) return { success: false, error: error.message }
        revalidatePath("/admin/testimonials")
        revalidatePath("/")
        return { success: true }
    } catch (e: any) {
        return { success: false, error: e.message || "Unauthorized" }
    }
}

// ─── Stats ────────────────────────────────────────────────────
export async function getAdminStats() {
    const supabase = await createClient()
    const [usersRes, coursesRes, testimonialsRes, enrollRes, jobsRes, applicationsRes] = await Promise.all([
        supabase.from("profiles").select("id", { count: "exact", head: true }),
        supabase.from("courses").select("id", { count: "exact", head: true }),
        supabase.from("testimonials").select("id", { count: "exact", head: true }),
        supabase.from("enrollments").select("id", { count: "exact", head: true }),
        supabase.from("jobs").select("id", { count: "exact", head: true }),
        supabase.from("job_applications").select("id", { count: "exact", head: true }),
    ])

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const { count: newToday } = await supabase
        .from("profiles")
        .select("id", { count: "exact", head: true })
        .gte("created_at", today.toISOString())

    return {
        success: true,
        stats: {
            totalUsers: usersRes.count ?? 0,
            totalCourses: coursesRes.count ?? 0,
            totalTestimonials: testimonialsRes.count ?? 0,
            totalEnrollments: enrollRes.count ?? 0,
            totalOpportunities: jobsRes.count ?? 0,
            totalApplications: applicationsRes.count ?? 0,
            newUsersToday: newToday ?? 0,
        },
    }
}

// ─── Recent Activity ──────────────────────────────────────────
export async function getRecentActivity() {
    const supabase = await createClient()
    const { data } = await supabase
        .from("profiles")
        .select("id, name, email, role, created_at")
        .order("created_at", { ascending: false })
        .limit(8)
    return { success: true, users: data ?? [] }
}

// ─── Announcements ────────────────────────────────────────────
export async function getAnnouncements() {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from("announcements")
        .select("*")
        .order("created_at", { ascending: false })
    if (error) return { success: false, announcements: [] }
    return { success: true, announcements: data ?? [] }
}

export async function createAnnouncement(values: { title: string; content: string; type: string; is_active: boolean }) {
    try {
        const supabase = await requireAdmin()
        const { error } = await supabase.from("announcements").insert(values)
        if (error) return { success: false, error: error.message }
        revalidatePath("/admin/announcements")
        revalidatePath("/dashboard")
        return { success: true }
    } catch (e: any) {
        return { success: false, error: e.message || "Unauthorized" }
    }
}

export async function deleteAnnouncement(id: string) {
    try {
        const supabase = await requireAdmin()
        const { error } = await supabase.from("announcements").delete().eq("id", id)
        if (error) return { success: false, error: error.message }
        revalidatePath("/admin/announcements")
        revalidatePath("/dashboard")
        return { success: true }
    } catch (e: any) {
        return { success: false, error: e.message || "Unauthorized" }
    }
}

export async function toggleAnnouncement(id: string, isActive: boolean) {
    try {
        const supabase = await requireAdmin()
        const { error } = await supabase.from("announcements").update({ is_active: !isActive }).eq("id", id)
        if (error) return { success: false, error: error.message }
        revalidatePath("/admin/announcements")
        revalidatePath("/dashboard")
        return { success: true }
    } catch (e: any) {
        return { success: false, error: e.message || "Unauthorized" }
    }
}

// ─── Opportunities / Hiring Drives ─────────────────────────────
export async function getAdminOpportunities() {
    const supabase = await createClient()
    const { data: rawJobs, error } = await supabase
        .from("jobs")
        .select("*")
        .order("created_at", { ascending: false })

    if (error) return { success: false, error: error.message, opportunities: [] }

    // Fetch application count per job
    const { data: appCounts } = await supabase
        .from("job_applications")
        .select("job_id")

    const countsMap: Record<string, number> = {}
    if (appCounts) {
        appCounts.forEach((a: any) => {
            countsMap[a.job_id] = (countsMap[a.job_id] || 0) + 1
        })
    }

    const opportunities = (rawJobs || []).map((j: any) => ({
        id: j.id,
        title: j.title,
        company: j.company,
        companyLogo: j.company_logo || undefined,
        roleType: j.role_type || "Full-Time",
        location: j.location,
        workMode: j.work_mode || "Hybrid",
        compensation: j.compensation,
        batchEligibility: j.batch_eligibility,
        experience: j.experience,
        skills: j.skills || [],
        closingInDays: j.closing_in_days,
        featured: Boolean(j.featured),
        description: j.description,
        requirements: j.requirements || [],
        perks: j.perks || [],
        applicationsCount: countsMap[j.id] || 0,
        createdAt: j.created_at,
    }))

    return { success: true, opportunities }
}

export async function createAdminOpportunity(values: {
    title: string
    company: string
    companyLogo?: string
    roleType: "Full-Time" | "Internship" | "Apprenticeship"
    location: string
    workMode: "Remote" | "Hybrid" | "On-site"
    compensation: string
    batchEligibility: string
    experience: string
    skills: string[]
    closingInDays: number
    featured?: boolean
    description: string
    requirements?: string[]
    perks?: string[]
}) {
    try {
        const supabase = await requireAdmin()
        const id = `job-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`

        const { data, error } = await supabase.from("jobs").insert({
            id,
            title: values.title.trim(),
            company: values.company.trim(),
            company_logo: values.companyLogo?.trim() || null,
            role_type: values.roleType,
            location: values.location.trim(),
            work_mode: values.workMode,
            compensation: values.compensation.trim(),
            batch_eligibility: values.batchEligibility.trim(),
            experience: values.experience.trim(),
            skills: values.skills,
            closing_in_days: values.closingInDays || 7,
            featured: Boolean(values.featured),
            description: values.description.trim(),
            requirements: values.requirements || [],
            perks: values.perks || [],
        }).select().single()

        if (error) return { success: false, error: error.message }
        revalidatePath("/admin/opportunities")
        revalidatePath("/dashboard")
        return { success: true, opportunity: data }
    } catch (e: any) {
        return { success: false, error: e.message || "Unauthorized" }
    }
}

export async function updateAdminOpportunity(jobId: string, values: Partial<{
    title: string
    company: string
    companyLogo: string
    roleType: "Full-Time" | "Internship" | "Apprenticeship"
    location: string
    workMode: "Remote" | "Hybrid" | "On-site"
    compensation: string
    batchEligibility: string
    experience: string
    skills: string[]
    closingInDays: number
    featured: boolean
    description: string
    requirements: string[]
    perks: string[]
}>) {
    try {
        const supabase = await requireAdmin()
        const updatePayload: Record<string, any> = {}

        if (values.title !== undefined) updatePayload.title = values.title.trim()
        if (values.company !== undefined) updatePayload.company = values.company.trim()
        if (values.companyLogo !== undefined) updatePayload.company_logo = values.companyLogo.trim() || null
        if (values.roleType !== undefined) updatePayload.role_type = values.roleType
        if (values.location !== undefined) updatePayload.location = values.location.trim()
        if (values.workMode !== undefined) updatePayload.work_mode = values.workMode
        if (values.compensation !== undefined) updatePayload.compensation = values.compensation.trim()
        if (values.batchEligibility !== undefined) updatePayload.batch_eligibility = values.batchEligibility.trim()
        if (values.experience !== undefined) updatePayload.experience = values.experience.trim()
        if (values.skills !== undefined) updatePayload.skills = values.skills
        if (values.closingInDays !== undefined) updatePayload.closing_in_days = values.closingInDays
        if (values.featured !== undefined) updatePayload.featured = Boolean(values.featured)
        if (values.description !== undefined) updatePayload.description = values.description.trim()
        if (values.requirements !== undefined) updatePayload.requirements = values.requirements
        if (values.perks !== undefined) updatePayload.perks = values.perks

        const { error } = await supabase.from("jobs").update(updatePayload).eq("id", jobId)
        if (error) return { success: false, error: error.message }
        revalidatePath("/admin/opportunities")
        revalidatePath("/dashboard")
        return { success: true }
    } catch (e: any) {
        return { success: false, error: e.message || "Unauthorized" }
    }
}

export async function deleteAdminOpportunity(jobId: string) {
    try {
        const supabase = await requireAdmin()
        const { error } = await supabase.from("jobs").delete().eq("id", jobId)
        if (error) return { success: false, error: error.message }
        revalidatePath("/admin/opportunities")
        revalidatePath("/dashboard")
        return { success: true }
    } catch (e: any) {
        return { success: false, error: e.message || "Unauthorized" }
    }
}

export async function toggleOpportunityFeatured(jobId: string, currentFeatured: boolean) {
    try {
        const supabase = await requireAdmin()
        const { error } = await supabase.from("jobs").update({ featured: !currentFeatured }).eq("id", jobId)
        if (error) return { success: false, error: error.message }
        revalidatePath("/admin/opportunities")
        revalidatePath("/dashboard")
        return { success: true }
    } catch (e: any) {
        return { success: false, error: e.message || "Unauthorized" }
    }
}

// ═══════════════════════════════════════════════════════════════════
// HACKATHONS ADMIN ACTIONS
// ═══════════════════════════════════════════════════════════════════

export async function createAdminHackathon(values: {
    title: string
    host: string
    hostLogo?: string
    prizePool: string
    firstPrize: string
    deadline: string
    teamSize: string
    mode: "Online" | "Hybrid" | "In-Person"
    difficulty: "All Welcome" | "Intermediate" | "Advanced"
    tags: string[]
    problemStatement: string
    bannerTag?: string
}) {
    try {
        const supabase = await requireAdmin()
        const slug = values.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") + "-" + Date.now()
        const id = `hack-${Date.now()}`

        const { data, error } = await supabase.from("hackathons").insert({
            id,
            slug,
            title: values.title.trim(),
            host: values.host.trim(),
            host_logo: values.hostLogo?.trim() || null,
            prize_pool: values.prizePool.trim(),
            deadline: values.deadline.trim(),
            team_size: values.teamSize.trim(),
            description: values.problemStatement.trim(),
            tags: values.tags,
            banner_tag: values.bannerTag || "Open Challenge",
            stages: [
                { id: "r1", name: "Registration & Ideation", type: "prototype", date: values.deadline, status: "active" },
                { id: "r2", name: "Grand Finale Showcase", type: "presentation", date: "TBA", status: "upcoming" }
            ],
            prizes: [{ rank: 1, title: "Grand Champion", amount: values.firstPrize }]
        }).select().single()

        if (error) return { success: false, error: error.message }
        revalidatePath("/dashboard")
        return { success: true, hackathon: data }
    } catch (e: any) {
        return { success: false, error: e.message || "Unauthorized" }
    }
}

export async function updateAdminHackathon(hackathonId: string, updates: Partial<{
    title: string
    host: string
    hostLogo?: string
    prizePool: string
    firstPrize: string
    deadline: string
    teamSize: string
    mode: "Online" | "Hybrid" | "In-Person"
    difficulty: "All Welcome" | "Intermediate" | "Advanced"
    tags: string[]
    problemStatement: string
    bannerTag?: string
}>) {
    try {
        const supabase = await requireAdmin()
        const payload: Record<string, any> = {}

        if (updates.title !== undefined) payload.title = updates.title.trim()
        if (updates.host !== undefined) payload.host = updates.host.trim()
        if (updates.hostLogo !== undefined) payload.host_logo = updates.hostLogo.trim() || null
        if (updates.prizePool !== undefined) payload.prize_pool = updates.prizePool.trim()
        if (updates.deadline !== undefined) payload.deadline = updates.deadline.trim()
        if (updates.teamSize !== undefined) payload.team_size = updates.teamSize.trim()
        if (updates.problemStatement !== undefined) payload.description = updates.problemStatement.trim()
        if (updates.tags !== undefined) payload.tags = updates.tags
        if (updates.bannerTag !== undefined) payload.banner_tag = updates.bannerTag

        const { error } = await supabase.from("hackathons").update(payload).eq("id", hackathonId)
        if (error) return { success: false, error: error.message }
        revalidatePath("/dashboard")
        return { success: true }
    } catch (e: any) {
        return { success: false, error: e.message || "Unauthorized" }
    }
}

export async function deleteAdminHackathon(hackathonId: string) {
    try {
        const supabase = await requireAdmin()
        const { error } = await supabase.from("hackathons").delete().eq("id", hackathonId)
        if (error) return { success: false, error: error.message }
        revalidatePath("/dashboard")
        return { success: true }
    } catch (e: any) {
        return { success: false, error: e.message || "Unauthorized" }
    }
}

// ═══════════════════════════════════════════════════════════════════
// MENTORS ADMIN ACTIONS
// ═══════════════════════════════════════════════════════════════════

export async function createAdminMentor(values: {
    name: string
    role: string
    company: string
    avatar?: string
    experienceYears: number
    rating?: number
    reviewsCount?: number
    specialties: string[]
    bio: string
    sessionDuration?: string
}) {
    try {
        const supabase = await requireAdmin()
        const id = `mentor-${Date.now()}`

        const { data, error } = await supabase.from("mentors").insert({
            id,
            name: values.name.trim(),
            role: values.role.trim(),
            company: values.company.trim(),
            avatar: values.avatar?.trim() || null,
            experience_years: values.experienceYears,
            rating: values.rating || 4.9,
            reviews_count: values.reviewsCount || 1,
            specialties: values.specialties,
            bio: values.bio.trim(),
            session_duration: values.sessionDuration || "45 Mins",
            available_slots: [
                { date: "This Thursday", slots: ["6:00 PM - 6:45 PM", "7:00 PM - 7:45 PM"] },
                { date: "This Saturday", slots: ["11:00 AM - 11:45 AM", "4:00 PM - 4:45 PM"] }
            ]
        }).select().single()

        if (error) return { success: false, error: error.message }
        revalidatePath("/dashboard")
        return { success: true, mentor: data }
    } catch (e: any) {
        return { success: false, error: e.message || "Unauthorized" }
    }
}

export async function updateAdminMentor(mentorId: string, updates: Partial<{
    name: string
    role: string
    company: string
    avatar?: string
    experienceYears: number
    rating?: number
    reviewsCount?: number
    specialties: string[]
    bio: string
    sessionDuration?: string
}>) {
    try {
        const supabase = await requireAdmin()
        const payload: Record<string, any> = {}

        if (updates.name !== undefined) payload.name = updates.name.trim()
        if (updates.role !== undefined) payload.role = updates.role.trim()
        if (updates.company !== undefined) payload.company = updates.company.trim()
        if (updates.avatar !== undefined) payload.avatar = updates.avatar.trim() || null
        if (updates.experienceYears !== undefined) payload.experience_years = updates.experienceYears
        if (updates.rating !== undefined) payload.rating = updates.rating
        if (updates.reviewsCount !== undefined) payload.reviews_count = updates.reviewsCount
        if (updates.specialties !== undefined) payload.specialties = updates.specialties
        if (updates.bio !== undefined) payload.bio = updates.bio.trim()
        if (updates.sessionDuration !== undefined) payload.session_duration = updates.sessionDuration

        const { error } = await supabase.from("mentors").update(payload).eq("id", mentorId)
        if (error) return { success: false, error: error.message }
        revalidatePath("/dashboard")
        return { success: true }
    } catch (e: any) {
        return { success: false, error: e.message || "Unauthorized" }
    }
}

export async function deleteAdminMentor(mentorId: string) {
    try {
        const supabase = await requireAdmin()
        const { error } = await supabase.from("mentors").delete().eq("id", mentorId)
        if (error) return { success: false, error: error.message }
        revalidatePath("/dashboard")
        return { success: true }
    } catch (e: any) {
        return { success: false, error: e.message || "Unauthorized" }
    }
}

