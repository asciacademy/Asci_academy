import { describe, it, expect, beforeEach } from "vitest"
import {
  getBaseCatalog,
  getUnifiedCourses,
  invalidateCoursesCache,
} from "@/lib/courses-store"

describe("Courses Store - Unified Catalog & Data Normalization", () => {
  beforeEach(() => {
    invalidateCoursesCache()
  })

  it("generates complete base catalog from static curriculum and metadata", () => {
    const catalog = getBaseCatalog()
    expect(catalog.length).toBeGreaterThanOrEqual(40)

    catalog.forEach((course) => {
      expect(course.id).toBeTruthy()
      expect(course.title).toBeTruthy()
      expect(course.slug).toBeTruthy()
      expect(course.category).toBeTruthy()
      expect(course.level).toBeTruthy()
      expect(typeof course.duration_hours).toBe("number")
      expect(typeof course.lessons).toBe("number")
      expect(typeof course.modules).toBe("number")
      expect(typeof course.projects).toBe("number")
      expect(course.certificate).toBeTruthy()
      expect(Array.isArray(course.tools)).toBe(true)
      expect(course.isCustom).toBe(false)
      expect(course.is_published).toBe(true)

      // Verify enriched Coursera partner and metadata
      expect(course.courseraData).toBeDefined()
      expect(course.courseraData.partner).toBeTruthy()
      expect(course.courseraData.rating).toBeGreaterThanOrEqual(4.0)
      expect(course.courseraData.skills.length).toBeGreaterThan(0)
    })
  })

  it("safely handles SSR environment where window/localStorage are absent", () => {
    const courses = getUnifiedCourses()
    expect(courses).toBeDefined()
    expect(courses.length).toBeGreaterThanOrEqual(40)
  })

  it("invalidates cache properly when requested", () => {
    const firstCall = getBaseCatalog()
    expect(firstCall).toBeDefined()

    invalidateCoursesCache()
    const secondCall = getUnifiedCourses()
    expect(secondCall).toBeDefined()
    expect(secondCall.length).toBe(firstCall.length)
  })
})
