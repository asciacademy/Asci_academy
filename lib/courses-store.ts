"use client"

import { useState, useEffect, useCallback } from "react"
import { CURRICULUM_COURSES, CurriculumCourse } from "@/lib/curriculum-data"
import { getCourseraDataForCourse, CourseraExtraData, COURSERA_PARTNERS } from "@/lib/coursera-metadata"
import { createCourse, updateCourseDetails, deleteCourse as deleteCourseAction } from "@/app/actions/admin"

export interface UnifiedCourse {
  id: string
  title: string
  slug: string
  description: string
  category: string
  level: "Beginner" | "Intermediate" | "Advanced" | "All Levels" | string
  weeks: string
  duration_hours: number
  lessons: number
  modules: number
  projects: number
  certificate: string
  is_premium: boolean
  is_published: boolean
  thumbnail_url?: string
  tools: string[]
  courseraData: CourseraExtraData
  createdAt?: string
  updatedAt?: string
  isCustom?: boolean
}

export type CourseUpdatePayload = Partial<Omit<UnifiedCourse, "id" | "courseraData">> & {
  partner?: string
  partnerType?: string
  partnerLogo?: string
  credentialType?: "Specialization" | "Professional Certificate" | "Course" | "Degree Pathway"
  rating?: number
  ratingCount?: string
  enrolledCount?: string
  skills?: string[]
  whatYouWillLearn?: string[]
  thumbnail?: string
}

const STORAGE_KEYS = {
  CUSTOM_COURSES: "asci_custom_courses_v1",
  COURSE_EDITS: "asci_course_edits_v1",
  DELETED_IDS: "asci_deleted_course_ids_v1",
}

const COURSES_UPDATE_EVENT = "asci-courses-update"

let _cachedBaseCatalog: UnifiedCourse[] | null = null
let _cachedUnifiedCourses: UnifiedCourse[] | null = null

export function invalidateCoursesCache(): void {
  _cachedUnifiedCourses = null
}

/**
 * Generate default base catalog from static curriculum + enriched Coursera metadata (cached)
 */
export function getBaseCatalog(): UnifiedCourse[] {
  if (_cachedBaseCatalog) return _cachedBaseCatalog

  _cachedBaseCatalog = CURRICULUM_COURSES.map((c) => {
    const slug = c.slug || c.id
    const meta = getCourseraDataForCourse(slug, c.title, c.category)
    const modulesCount = c.modules?.length || Math.max(3, Math.ceil(c.lessons / 4))

    return {
      id: c.id,
      title: c.title,
      slug,
      description: c.description,
      category: c.category,
      level: c.level,
      weeks: c.weeks || "6 Weeks",
      duration_hours: c.duration_hours || 40,
      lessons: c.lessons || 12,
      modules: modulesCount,
      projects: c.projects || 2,
      certificate: c.certificate || "Verified Professional Credential",
      is_premium: Boolean(c.is_premium),
      is_published: true,
      thumbnail_url: c.thumbnail_url || meta.thumbnail,
      tools: c.tools || meta.skills,
      courseraData: meta,
      isCustom: false,
    }
  })

  return _cachedBaseCatalog
}

function getStoredJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    const parsed = JSON.parse(raw)
    return parsed !== null && parsed !== undefined ? parsed : fallback
  } catch (err) {
    console.warn(`Failed reading storage key "${key}":`, err)
    return fallback
  }
}

function setStoredJson<T>(key: string, data: T): void {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (err) {
    console.warn(`Failed writing storage key "${key}":`, err)
  }
}

/**
 * Compute the live unified list of courses by applying custom additions, edits, and deletions
 */
export function getUnifiedCourses(): UnifiedCourse[] {
  if (_cachedUnifiedCourses) return _cachedUnifiedCourses

  const baseList = getBaseCatalog()
  if (typeof window === "undefined") {
    return baseList
  }

  const customCourses = getStoredJson<UnifiedCourse[]>(STORAGE_KEYS.CUSTOM_COURSES, [])
  const editsMap = getStoredJson<Record<string, CourseUpdatePayload>>(STORAGE_KEYS.COURSE_EDITS, {})
  const deletedIdsList = getStoredJson<string[]>(STORAGE_KEYS.DELETED_IDS, [])

  // Fast path: if no custom courses, no edits, and no deleted IDs, return baseList directly
  if (customCourses.length === 0 && Object.keys(editsMap).length === 0 && deletedIdsList.length === 0) {
    _cachedUnifiedCourses = baseList
    return baseList
  }

  const deletedIds = new Set(deletedIdsList.map((id) => id.toLowerCase()))

  // 1. Combine base + custom
  const allCourses: UnifiedCourse[] = [...customCourses, ...baseList]

  // 2. Filter out deleted & deduplicate by slug/id
  const seenKeys = new Set<string>()
  const result: UnifiedCourse[] = []

  for (const course of allCourses) {
    const primaryKey = (course.slug || course.id).toLowerCase()
    const idKey = course.id.toLowerCase()

    if (deletedIds.has(primaryKey) || deletedIds.has(idKey)) {
      continue
    }

    if (seenKeys.has(primaryKey)) {
      continue
    }
    seenKeys.add(primaryKey)

    // 3. Apply any field edits
    const edit = editsMap[primaryKey] || editsMap[idKey]
    if (edit) {
      const mergedCourseraData: CourseraExtraData = {
        ...course.courseraData,
        partner: edit.partner ?? course.courseraData.partner,
        partnerType: (edit.partnerType as any) ?? course.courseraData.partnerType,
        partnerLogo: edit.partnerLogo ?? course.courseraData.partnerLogo,
        credentialType: (edit.credentialType as any) ?? course.courseraData.credentialType,
        rating: edit.rating ?? course.courseraData.rating,
        ratingCount: edit.ratingCount ?? course.courseraData.ratingCount,
        enrolledCount: edit.enrolledCount ?? course.courseraData.enrolledCount,
        skills: edit.skills ?? course.courseraData.skills,
        whatYouWillLearn: edit.whatYouWillLearn ?? course.courseraData.whatYouWillLearn,
        thumbnail: edit.thumbnail ?? edit.thumbnail_url ?? course.courseraData.thumbnail,
      }

      result.push({
        ...course,
        ...edit,
        thumbnail_url: edit.thumbnail_url ?? edit.thumbnail ?? course.thumbnail_url,
        courseraData: mergedCourseraData,
        updatedAt: new Date().toISOString(),
      })
    } else {
      result.push(course)
    }
  }

  _cachedUnifiedCourses = result
  return result
}

function broadcastCoursesUpdate(courses: UnifiedCourse[]): void {
  _cachedUnifiedCourses = courses
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(COURSES_UPDATE_EVENT, { detail: courses }))
  }
}

/**
 * Add a new course to the catalog
 */
export async function addUnifiedCourse(
  payload: Omit<UnifiedCourse, "id"> & { id?: string }
): Promise<UnifiedCourse> {
  const courseSlug = (payload.slug || payload.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")).replace(/(^-|-$)/g, "")
  const courseId = payload.id || `course_${courseSlug}_${Date.now()}`

  const newCourse: UnifiedCourse = {
    ...payload,
    id: courseId,
    slug: courseSlug,
    isCustom: true,
    is_published: payload.is_published ?? true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  const existingCustom = getStoredJson<UnifiedCourse[]>(STORAGE_KEYS.CUSTOM_COURSES, [])
  const updatedCustom = [newCourse, ...existingCustom.filter((c) => c.slug !== courseSlug && c.id !== courseId)]
  setStoredJson(STORAGE_KEYS.CUSTOM_COURSES, updatedCustom)

  // Remove from deleted if previously deleted
  const deletedIds = getStoredJson<string[]>(STORAGE_KEYS.DELETED_IDS, [])
  const filteredDeleted = deletedIds.filter((id) => id.toLowerCase() !== courseSlug.toLowerCase() && id.toLowerCase() !== courseId.toLowerCase())
  setStoredJson(STORAGE_KEYS.DELETED_IDS, filteredDeleted)

  invalidateCoursesCache()
  const liveList = getUnifiedCourses()
  broadcastCoursesUpdate(liveList)

  // Sync to Supabase in background
  try {
    await createCourse({
      title: newCourse.title,
      description: newCourse.description,
      slug: newCourse.slug,
      difficulty: newCourse.level,
      duration_hours: newCourse.duration_hours,
      is_premium: newCourse.is_premium,
      template: "crash_course",
    })
  } catch (err) {
    console.warn("Background course creation sync to Supabase:", err)
  }

  return newCourse
}

/**
 * Update an existing course by id or slug
 */
export async function updateUnifiedCourse(
  idOrSlug: string,
  updates: CourseUpdatePayload
): Promise<UnifiedCourse | null> {
  const key = idOrSlug.toLowerCase()

  // 1. Check if it's in custom courses
  const customCourses = getStoredJson<UnifiedCourse[]>(STORAGE_KEYS.CUSTOM_COURSES, [])
  const customIndex = customCourses.findIndex(
    (c) => c.id.toLowerCase() === key || c.slug.toLowerCase() === key
  )

  if (customIndex !== -1) {
    const existing = customCourses[customIndex]
    const updatedCourseraData: CourseraExtraData = {
      ...existing.courseraData,
      partner: updates.partner ?? existing.courseraData.partner,
      partnerType: (updates.partnerType as any) ?? existing.courseraData.partnerType,
      credentialType: (updates.credentialType as any) ?? existing.courseraData.credentialType,
      rating: updates.rating ?? existing.courseraData.rating,
      ratingCount: updates.ratingCount ?? existing.courseraData.ratingCount,
      enrolledCount: updates.enrolledCount ?? existing.courseraData.enrolledCount,
      skills: updates.skills ?? existing.courseraData.skills,
      thumbnail: updates.thumbnail ?? updates.thumbnail_url ?? existing.courseraData.thumbnail,
    }

    const updatedCustomCourse: UnifiedCourse = {
      ...existing,
      ...updates,
      thumbnail_url: updates.thumbnail_url ?? updates.thumbnail ?? existing.thumbnail_url,
      courseraData: updatedCourseraData,
      updatedAt: new Date().toISOString(),
    }

    customCourses[customIndex] = updatedCustomCourse
    setStoredJson(STORAGE_KEYS.CUSTOM_COURSES, customCourses)
  } else {
    // 2. Record edit in edits map for base courses
    const editsMap = getStoredJson<Record<string, CourseUpdatePayload>>(STORAGE_KEYS.COURSE_EDITS, {})
    const existingEdit = editsMap[key] || {}
    editsMap[key] = {
      ...existingEdit,
      ...updates,
    }
    setStoredJson(STORAGE_KEYS.COURSE_EDITS, editsMap)
  }

  invalidateCoursesCache()
  const liveList = getUnifiedCourses()
  broadcastCoursesUpdate(liveList)

  // Sync to Supabase in background
  try {
    await updateCourseDetails(idOrSlug, {
      title: updates.title,
      description: updates.description,
      difficulty: updates.level,
      duration_hours: updates.duration_hours,
      thumbnail_url: updates.thumbnail_url ?? updates.thumbnail,
    })
  } catch (err) {
    console.warn("Background course update sync to Supabase:", err)
  }

  const updatedItem = liveList.find(
    (c) => c.id.toLowerCase() === key || c.slug.toLowerCase() === key
  )
  return updatedItem || null
}

/**
 * Delete a course from the catalog
 */
export async function deleteUnifiedCourse(idOrSlug: string): Promise<boolean> {
  const key = idOrSlug.toLowerCase()

  // 1. Remove from custom courses if present
  const customCourses = getStoredJson<UnifiedCourse[]>(STORAGE_KEYS.CUSTOM_COURSES, [])
  const filteredCustom = customCourses.filter(
    (c) => c.id.toLowerCase() !== key && c.slug.toLowerCase() !== key
  )
  setStoredJson(STORAGE_KEYS.CUSTOM_COURSES, filteredCustom)

  // 2. Add to deleted IDs
  const deletedIds = getStoredJson<string[]>(STORAGE_KEYS.DELETED_IDS, [])
  if (!deletedIds.map((d) => d.toLowerCase()).includes(key)) {
    deletedIds.push(idOrSlug)
    setStoredJson(STORAGE_KEYS.DELETED_IDS, deletedIds)
  }

  // 3. Remove any saved edits
  const editsMap = getStoredJson<Record<string, CourseUpdatePayload>>(STORAGE_KEYS.COURSE_EDITS, {})
  delete editsMap[key]
  setStoredJson(STORAGE_KEYS.COURSE_EDITS, editsMap)

  invalidateCoursesCache()
  const liveList = getUnifiedCourses()
  broadcastCoursesUpdate(liveList)

  // Sync to Supabase in background
  try {
    await deleteCourseAction(idOrSlug)
  } catch (err) {
    console.warn("Background course delete sync to Supabase:", err)
  }

  return true
}

/**
 * Reset all local edits and restore the base academic catalog
 */
export function resetUnifiedCourses(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem(STORAGE_KEYS.CUSTOM_COURSES)
  localStorage.removeItem(STORAGE_KEYS.COURSE_EDITS)
  localStorage.removeItem(STORAGE_KEYS.DELETED_IDS)
  invalidateCoursesCache()
  const base = getBaseCatalog()
  broadcastCoursesUpdate(base)
}

/**
 * React Hook providing synchronized live course state
 */
export function useCoursesStore() {
  const [courses, setCourses] = useState<UnifiedCourse[]>(() => {
    return _cachedUnifiedCourses || getBaseCatalog()
  })
  const [isLoaded, setIsLoaded] = useState(false)

  const refresh = useCallback(() => {
    invalidateCoursesCache()
    const list = getUnifiedCourses()
    setCourses(list)
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      const list = getUnifiedCourses()
      setCourses(list)
      setIsLoaded(true)
    }, 150)

    const handleUpdate = (e: any) => {
      if (e.detail && Array.isArray(e.detail)) {
        _cachedUnifiedCourses = e.detail
        setCourses(e.detail)
        setIsLoaded(true)
      } else {
        refresh()
      }
    }

    window.addEventListener(COURSES_UPDATE_EVENT, handleUpdate)
    return () => {
      clearTimeout(timer)
      window.removeEventListener(COURSES_UPDATE_EVENT, handleUpdate)
    }
  }, [refresh])

  const addCourse = useCallback(async (payload: Omit<UnifiedCourse, "id"> & { id?: string }) => {
    return await addUnifiedCourse(payload)
  }, [])

  const updateCourse = useCallback(async (idOrSlug: string, updates: CourseUpdatePayload) => {
    return await updateUnifiedCourse(idOrSlug, updates)
  }, [])

  const deleteCourse = useCallback(async (idOrSlug: string) => {
    return await deleteUnifiedCourse(idOrSlug)
  }, [])

  const resetAll = useCallback(() => {
    resetUnifiedCourses()
  }, [])

  return {
    courses,
    totalCount: courses.length,
    isLoaded,
    addCourse,
    updateCourse,
    deleteCourse,
    resetAll,
    refresh,
  }
}
