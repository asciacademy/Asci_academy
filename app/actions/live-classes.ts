"use server"

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"
import { LiveClass, LiveClassFormData, LiveClassStatus } from "@/lib/live-classes-types"
import { SEED_LIVE_CLASSES } from "@/lib/live-classes-data"

/**
 * Server-side admin guard. Must be called at the top of every admin mutation.
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

/**
 * Fetch all live classes, ordered by start time
 */
export async function getLiveClasses(): Promise<{ success: boolean; classes: LiveClass[]; error?: string }> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("live_classes")
      .select("*")
      .order("start_time", { ascending: true })

    if (error || !data || data.length === 0) {
      return { success: true, classes: SEED_LIVE_CLASSES }
    }

    return { success: true, classes: data as LiveClass[] }
  } catch (err: any) {
    return { success: true, classes: SEED_LIVE_CLASSES }
  }
}

/**
 * Fetch single live class by ID
 */
export async function getLiveClassById(id: string): Promise<{ success: boolean; liveClass?: LiveClass; error?: string }> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("live_classes")
      .select("*")
      .eq("id", id)
      .maybeSingle()

    if (error || !data) {
      const fallback = SEED_LIVE_CLASSES.find(c => c.id === id)
      if (fallback) return { success: true, liveClass: fallback }
      return { success: false, error: "Class not found" }
    }

    return { success: true, liveClass: data as LiveClass }
  } catch (err: any) {
    const fallback = SEED_LIVE_CLASSES.find(c => c.id === id)
    if (fallback) return { success: true, liveClass: fallback }
    return { success: false, error: err.message || "Failed to load class" }
  }
}

/**
 * Admin: Create a new Live Class & Zoom Meeting
 */
export async function createAdminLiveClass(formData: LiveClassFormData) {
  try {
    const supabase = await requireAdmin()
    const payload = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      topic: formData.topic.trim(),
      instructor_name: formData.instructor_name.trim(),
      instructor_role: formData.instructor_role.trim(),
      instructor_avatar: formData.instructor_avatar?.trim() || null,
      start_time: formData.start_time,
      duration_minutes: Number(formData.duration_minutes) || 60,
      status: formData.status || "upcoming",
      zoom_meeting_url: formData.zoom_meeting_url.trim(),
      zoom_meeting_id: formData.zoom_meeting_id?.trim() || null,
      zoom_passcode: formData.zoom_passcode?.trim() || null,
      recording_url: formData.recording_url?.trim() || null,
      banner_image: formData.banner_image?.trim() || null,
      max_attendees: Number(formData.max_attendees) || 250,
      attendees_count: 0,
      tags: formData.tags || [],
      is_featured: Boolean(formData.is_featured),
    }

    const { data, error } = await supabase
      .from("live_classes")
      .insert(payload)
      .select()
      .single()

    if (error) {
      return { success: false, error: error.message }
    }

    revalidatePath("/live-classes")
    revalidatePath("/admin/live-classes")
    revalidatePath("/dashboard")
    return { success: true, liveClass: data }
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to create live class" }
  }
}

/**
 * Admin: Update an existing Live Class
 */
export async function updateAdminLiveClass(id: string, formData: Partial<LiveClassFormData>) {
  try {
    const supabase = await requireAdmin()
    const payload: Record<string, any> = {}

    if (formData.title !== undefined) payload.title = formData.title.trim()
    if (formData.description !== undefined) payload.description = formData.description.trim()
    if (formData.topic !== undefined) payload.topic = formData.topic.trim()
    if (formData.instructor_name !== undefined) payload.instructor_name = formData.instructor_name.trim()
    if (formData.instructor_role !== undefined) payload.instructor_role = formData.instructor_role.trim()
    if (formData.instructor_avatar !== undefined) payload.instructor_avatar = formData.instructor_avatar?.trim() || null
    if (formData.start_time !== undefined) payload.start_time = formData.start_time
    if (formData.duration_minutes !== undefined) payload.duration_minutes = Number(formData.duration_minutes)
    if (formData.status !== undefined) payload.status = formData.status
    if (formData.zoom_meeting_url !== undefined) payload.zoom_meeting_url = formData.zoom_meeting_url.trim()
    if (formData.zoom_meeting_id !== undefined) payload.zoom_meeting_id = formData.zoom_meeting_id?.trim() || null
    if (formData.zoom_passcode !== undefined) payload.zoom_passcode = formData.zoom_passcode?.trim() || null
    if (formData.recording_url !== undefined) payload.recording_url = formData.recording_url?.trim() || null
    if (formData.banner_image !== undefined) payload.banner_image = formData.banner_image?.trim() || null
    if (formData.max_attendees !== undefined) payload.max_attendees = Number(formData.max_attendees)
    if (formData.tags !== undefined) payload.tags = formData.tags
    if (formData.is_featured !== undefined) payload.is_featured = Boolean(formData.is_featured)

    const { data, error } = await supabase
      .from("live_classes")
      .update(payload)
      .eq("id", id)
      .select()
      .single()

    if (error) {
      return { success: false, error: error.message }
    }

    revalidatePath("/live-classes")
    revalidatePath("/admin/live-classes")
    revalidatePath("/dashboard")
    return { success: true, liveClass: data }
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to update live class" }
  }
}

/**
 * Admin: 1-Click Status Toggle (e.g. Go Live Now or Mark Completed)
 */
export async function toggleLiveClassStatus(id: string, newStatus: LiveClassStatus) {
  try {
    const supabase = await requireAdmin()
    const { error } = await supabase
      .from("live_classes")
      .update({ status: newStatus })
      .eq("id", id)

    if (error) return { success: false, error: error.message }

    revalidatePath("/live-classes")
    revalidatePath("/admin/live-classes")
    revalidatePath("/dashboard")
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to toggle status" }
  }
}

/**
 * Admin: Delete a Live Class
 */
export async function deleteAdminLiveClass(id: string) {
  try {
    const supabase = await requireAdmin()
    const { error } = await supabase
      .from("live_classes")
      .delete()
      .eq("id", id)

    if (error) return { success: false, error: error.message }

    revalidatePath("/live-classes")
    revalidatePath("/admin/live-classes")
    revalidatePath("/dashboard")
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to delete live class" }
  }
}

/**
 * Student: Register for a Live Class
 */
export async function registerForLiveClass(classId: string) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    // Increment attendee count in live_classes table
    const { data, error } = await supabase
      .from("live_classes")
      .select("attendees_count")
      .eq("id", classId)
      .maybeSingle()

    if (!error && data) {
      await supabase
        .from("live_classes")
        .update({ attendees_count: (data.attendees_count || 0) + 1 })
        .eq("id", classId)
    }

    revalidatePath("/live-classes")
    revalidatePath("/dashboard")
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to register" }
  }
}
