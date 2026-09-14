"use server"

import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"
import crypto from "crypto"
import { Certificate, CertificateGenerationPayload } from "@/lib/certificate-types"

function generateCertificateId(): string {
  const num = Math.floor(1000 + Math.random() * 9000)
  return `ASCI-2026-GRV-${num}`
}

function generateVerificationCode(): string {
  return crypto.randomBytes(6).toString("hex").toUpperCase()
}

/**
 * Generate a new Gravit x ASCI Certificate for a user & course
 */
export async function generateCertificateAction(
  payload: CertificateGenerationPayload
): Promise<{ success: boolean; certificate?: Certificate; error?: string }> {
  try {
    const supabase = await createClient()
    const cookieStore = await cookies()
    const isDemoBypass = Boolean(cookieStore.get("demo_bypass")?.value)

    let userId: string | undefined
    let userName: string = payload.recipientName || "Distinguished Scholar"
    let userEmail: string = "student@asci.academy"

    // Authenticated user check
    const { data: authData } = await supabase.auth.getUser()
    const user = authData?.user

    if (user) {
      userId = user.id
      userEmail = user.email || userEmail

      // Fetch profile name if not passed
      const { data: profile } = await supabase
        .from("profiles")
        .select("name, email")
        .eq("id", user.id)
        .single()

      if (profile?.name) {
        userName = payload.recipientName || profile.name
      }
      if (profile?.email) {
        userEmail = profile.email
      }
    } else if (isDemoBypass) {
      userId = "demo-user-id"
      userName = payload.recipientName || "Alex Thorne"
      userEmail = "demo@example.com"
    } else if (!payload.recipientName) {
      return { success: false, error: "Please log in or provide recipient name to generate a certificate." }
    }

    // Check if certificate already exists for this user and course
    if (userId && userId !== "demo-user-id") {
      const isCourseUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(payload.courseId)
      const targetSlug = payload.courseSlug || payload.courseId

      const { data: existing } = await supabase
        .from("certificates")
        .select("*")
        .eq("user_id", userId)
        .or(`course_id.eq.${payload.courseId},course_slug.eq.${targetSlug}`)
        .maybeSingle()

      if (existing) {
        return { success: true, certificate: existing as Certificate }
      }

      // STRICT VALIDATION: Check if user has completed 100% of the lessons in this course
      try {
        let courseQuery = supabase
          .from("courses")
          .select(`
            id,
            modules (
              id, is_deleted,
              lessons (id, is_deleted)
            )
          `)

        courseQuery = isCourseUuid ? courseQuery.eq("id", payload.courseId) : courseQuery.eq("slug", targetSlug)
        const { data: courseData } = await courseQuery.maybeSingle()

        if (courseData && Array.isArray(courseData.modules)) {
          let totalLessons = 0
          const lessonIds: string[] = []
          courseData.modules.filter((m: any) => !m.is_deleted).forEach((m: any) => {
            if (Array.isArray(m.lessons)) {
              m.lessons.filter((l: any) => !l.is_deleted).forEach((l: any) => {
                totalLessons++
                lessonIds.push(l.id)
              })
            }
          })

          if (totalLessons > 0) {
            const { data: userProgress } = await supabase
              .from("lesson_progress")
              .select("lesson_id")
              .eq("user_id", userId)
              .eq("status", "completed")
              .in("lesson_id", lessonIds)

            const completedCount = userProgress?.length || 0
            const percent = Math.round((completedCount / totalLessons) * 100)

            const courseUuid = isCourseUuid ? payload.courseId : courseData.id
            let isEnrollmentCompleted = false
            if (courseUuid) {
              const { data: enrollment } = await supabase
                .from("enrollments")
                .select("status")
                .eq("user_id", userId)
                .eq("course_id", courseUuid)
                .maybeSingle()
              isEnrollmentCompleted = enrollment?.status === "completed"
            }

            if (percent < 100 && !isEnrollmentCompleted) {
              return {
                success: false,
                error: `Course incomplete (${completedCount}/${totalLessons} lessons completed, ${percent}%). Certificates are strictly awarded upon 100% course completion, not merely upon enrollment.`
              }
            }
          }
        } else {
          // Fallback check if course row is unavailable
          const fallbackPercent = payload.progressPercent ?? 0
          if (fallbackPercent < 100 && !payload.isCompleted) {
            return {
              success: false,
              error: `Course incomplete (${fallbackPercent}%). Certificates are strictly awarded upon 100% course completion.`
            }
          }
        }
      } catch (err) {
        console.warn("Notice: Course progress check fallback:", err)
      }
    } else {
      // Demo / Guest mode strict completion verification
      const progress = payload.progressPercent ?? (payload.isCompleted ? 100 : 0)
      if (progress < 100 && !payload.isCompleted) {
        return {
          success: false,
          error: `Course incomplete (${progress}%). Certificates are strictly conferred upon 100% full curriculum completion.`
        }
      }
    }

    const certificateId = generateCertificateId()
    const verificationCode = generateVerificationCode()
    const now = new Date().toISOString()

    const newCertificate: Certificate = {
      id: crypto.randomUUID(),
      certificate_id: certificateId,
      user_id: userId,
      recipient_name: userName,
      recipient_email: userEmail,
      course_id: payload.courseId,
      course_title: payload.courseTitle,
      course_slug: payload.courseSlug || payload.courseId,
      issuer_name: "Gravit Engineering & ASCI Academy",
      issued_at: now,
      verification_code: verificationCode,
      grade: payload.grade || "Mastery with Distinction",
      skills: payload.skills && payload.skills.length > 0 ? payload.skills : [
        "Data Structures & Algorithms",
        "Algorithmic Complexity & Optimization",
        "System Implementation",
        "Production Software Engineering"
      ],
      metadata: {
        instructor: "C. Mokshagna Theja",
        signer_title: "CEO, GRAVIT",
        track_code: "GRAVIT-ASCI-ACCREDITED",
        hours_estimated: 40,
        verification_hash: crypto
          .createHash("sha256")
          .update(`${certificateId}:${userName}:${payload.courseId}:${now}`)
          .digest("hex")
          .substring(0, 16)
          .toUpperCase(),
      },
      created_at: now,
    }

    // Try persisting to Supabase
    if (userId && userId !== "demo-user-id") {
      const { data, error } = await supabase
        .from("certificates")
        .insert({
          id: newCertificate.id,
          certificate_id: newCertificate.certificate_id,
          user_id: newCertificate.user_id,
          recipient_name: newCertificate.recipient_name,
          recipient_email: newCertificate.recipient_email,
          course_id: newCertificate.course_id,
          course_title: newCertificate.course_title,
          course_slug: newCertificate.course_slug,
          issuer_name: newCertificate.issuer_name,
          issued_at: newCertificate.issued_at,
          verification_code: newCertificate.verification_code,
          grade: newCertificate.grade,
          skills: newCertificate.skills,
          metadata: newCertificate.metadata,
        })
        .select()
        .single()

      if (error) {
        console.warn("Supabase certificate insert notice (using memory/fallback):", error.message)
      } else if (data) {
        return { success: true, certificate: data as Certificate }
      }
    }

    return { success: true, certificate: newCertificate }
  } catch (err: any) {
    console.error("Error in generateCertificateAction:", err)
    return { success: false, error: err?.message || "Failed to generate certificate." }
  }
}

/**
 * Public action to retrieve certificate by unique certificate_id or uuid for verification
 */
export async function getCertificateByUniqueIdAction(
  certificateId: string
): Promise<{ success: boolean; certificate?: Certificate; error?: string }> {
  try {
    const supabase = await createClient()
    const trimmedId = certificateId.trim()
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(trimmedId)

    // ponytail: query id.eq only when UUID to avoid postgres invalid input syntax errors on text serials
    const query = supabase.from("certificates").select("*")
    const { data, error } = await (isUuid
      ? query.or(`certificate_id.ilike.${trimmedId},id.eq.${trimmedId}`)
      : query.ilike("certificate_id", trimmedId)
    ).maybeSingle()

    if (error) {
      console.warn("Error looking up certificate in Supabase:", error.message)
    }

    if (data) {
      return { success: true, certificate: data as Certificate }
    }

    return { success: false, error: "Certificate not found or pending synchronization." }
  } catch (err: any) {
    return { success: false, error: err?.message || "Error validating certificate." }
  }
}

/**
 * Get all certificates for the currently logged in user
 */
export async function getUserCertificatesAction(): Promise<Certificate[]> {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return []

    const { data, error } = await supabase
      .from("certificates")
      .select("*")
      .eq("user_id", user.id)
      .order("issued_at", { ascending: false })

    if (error || !data) {
      return []
    }

    return data as Certificate[]
  } catch (e) {
    console.error("Error fetching user certificates:", e)
    return []
  }
}
