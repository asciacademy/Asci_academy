import { describe, it, expect } from "vitest"
import {
  CURRICULUM_COURSES,
  getAllCurriculumCourses,
  getCurriculumCourseBySlug,
  getCurriculumLessonInfo,
} from "@/lib/curriculum-data"

describe("Curriculum Engine - Courses & Lessons Data Integrity", () => {
  it("loads all curriculum courses without nulls or undefined elements", () => {
    const courses = getAllCurriculumCourses()
    expect(courses.length).toBeGreaterThanOrEqual(40)
    expect(courses).toBe(CURRICULUM_COURSES)

    courses.forEach((c) => {
      expect(c.id).toBeDefined()
      expect(c.title).toBeTruthy()
      expect(c.slug).toBeTruthy()
      expect(c.category).toBeTruthy()
      expect(c.level).toBeTruthy()
      expect(Array.isArray(c.modules)).toBe(true)
      expect(c.modules.length).toBeGreaterThan(0)
    })
  })

  it("verifies module sequence orders and lesson structure", () => {
    CURRICULUM_COURSES.forEach((course) => {
      course.modules.forEach((mod, modIdx) => {
        expect(mod.id).toBeTruthy()
        expect(mod.title).toBeTruthy()
        expect(Array.isArray(mod.lessons)).toBe(true)
        expect(mod.lessons.length).toBeGreaterThan(0)

        mod.lessons.forEach((lesson) => {
          expect(lesson.id).toBeTruthy()
          expect(lesson.title).toBeTruthy()
          expect(lesson.xp_reward).toBeGreaterThanOrEqual(10)
          expect(["text", "challenge"]).toContain(lesson.content_type)
        })
      })
    })
  })

  it("finds courses by slug case-insensitively and with hyphen/underscore tolerance", () => {
    const firstCourse = CURRICULUM_COURSES[0]
    expect(firstCourse).toBeDefined()

    const exactMatch = getCurriculumCourseBySlug(firstCourse.slug)
    expect(exactMatch).toBeDefined()
    expect(exactMatch?.id).toBe(firstCourse.id)

    // Uppercase slug
    const upperMatch = getCurriculumCourseBySlug(firstCourse.slug.toUpperCase())
    expect(upperMatch?.id).toBe(firstCourse.id)

    // Match by ID
    const idMatch = getCurriculumCourseBySlug(firstCourse.id)
    expect(idMatch?.id).toBe(firstCourse.id)

    // Nonexistent slug
    expect(getCurriculumCourseBySlug("non-existent-course-slug-12345")).toBeUndefined()
  })

  it("resolves lesson info by lesson ID", () => {
    const firstCourse = CURRICULUM_COURSES[0]
    const firstMod = firstCourse.modules[0]
    const firstLesson = firstMod.lessons[0]

    const info = getCurriculumLessonInfo(firstLesson.id)
    expect(info).toBeDefined()
    expect(info?.course.id).toBe(firstCourse.id)
    expect(info?.module.id).toBe(firstMod.id)
    expect(info?.lesson.id).toBe(firstLesson.id)

    // Case-insensitive lesson lookup
    const upperInfo = getCurriculumLessonInfo(firstLesson.id.toUpperCase())
    expect(upperInfo?.lesson.id).toBe(firstLesson.id)

    // Invalid ID returns undefined
    expect(getCurriculumLessonInfo("invalid_unknown_lesson_999999")).toBeUndefined()
  })

  it("ensures no duplicate course slugs exist in the curriculum", () => {
    const slugs = new Set<string>()
    const duplicates: string[] = []

    CURRICULUM_COURSES.forEach((course) => {
      const normalized = course.slug.toLowerCase()
      if (slugs.has(normalized)) {
        duplicates.push(normalized)
      }
      slugs.add(normalized)
    })

    expect(duplicates).toEqual([])
  })

  describe("Flagship Course: Agentic AI & Generative Systems", () => {
    const course = getCurriculumCourseBySlug("agentic-ai")

    it("registers Course with proper attribution, level, and metadata", () => {
      expect(course).toBeDefined()
      expect(course?.title).toBe("Agentic AI Full Course 2026")
      expect(course?.certificate).toContain("Microsoft")
      expect(course?.category).toBe("AI & ML")
      expect(course?.level).toBe("Advanced")
      expect(course?.modules.length).toBeGreaterThanOrEqual(4)
      expect(course?.lessons).toBeGreaterThanOrEqual(20)
    })

    it("verifies modules have valid sequence orders and lessons", () => {
      expect(course).toBeDefined()
      let lessonCount = 0

      course!.modules.forEach((mod) => {
        mod.lessons.forEach((lesson) => {
          lessonCount++
          expect(lesson.id).toBeTruthy()
          expect(lesson.title).toBeTruthy()
          expect(lesson.description).toBeTruthy()
          expect(lesson.content).toBeTruthy()
        })
      })

      expect(lessonCount).toBeGreaterThan(0)
    })

    it("verifies interactive challenge data when content_type is challenge", () => {
      expect(course).toBeDefined()
      course!.modules.forEach((mod) => {
        mod.lessons.forEach((lesson) => {
          if (lesson.content_type === "challenge") {
            expect(lesson.challenge_data).toBeDefined()
            expect(lesson.challenge_data?.initialCode).toBeTruthy()
            expect(lesson.challenge_data?.expectedOutput).toBeTruthy()
            expect(lesson.challenge_data?.instructions).toBeTruthy()
          }
        })
      })
    })

    it("verifies two-part division and premium gating via getCourseParts and isLessonLocked", async () => {
      const { getCourseParts, isLessonLocked } = await import("@/lib/curriculum-data")
      expect(course).toBeDefined()
      const parts = getCourseParts(course!)

      expect(parts.beginnerModules.length).toBeGreaterThan(0)
      expect(parts.advancedModules.length).toBeGreaterThan(0)
      expect(parts.advancedModules.every((m) => m.is_premium === true)).toBe(true)

      const beginnerMod = parts.beginnerModules[0]
      const advancedMod = parts.advancedModules[0]

      // Beginner is never locked
      expect(isLessonLocked(course!, beginnerMod, "free")).toBe(false)
      expect(isLessonLocked(course!, beginnerMod, "architect")).toBe(false)

      // Advanced is locked for free/unauthenticated users
      expect(isLessonLocked(course!, advancedMod, "free")).toBe(true)
      expect(isLessonLocked(course!, advancedMod, undefined)).toBe(true)

      // Advanced is unlocked for pro/architect subscribers
      expect(isLessonLocked(course!, advancedMod, "architect")).toBe(false)
      expect(isLessonLocked(course!, advancedMod, "pro")).toBe(false)

      // Advanced is unlocked with local override (Test Drive Preview)
      expect(isLessonLocked(course!, advancedMod, "free", true)).toBe(false)
    })
  })

  it("automatically partitions any standard curriculum course without explicit tags into 2 parts", async () => {
    const { getCourseParts } = await import("@/lib/curriculum-data")
    const courses = getAllCurriculumCourses()
    courses.forEach((c) => {
      const parts = getCourseParts(c)
      expect(parts.beginnerModules.length).toBeGreaterThan(0)
      if (c.modules.length > 1) {
        expect(parts.advancedModules.length).toBeGreaterThan(0)
      }
      expect(parts.beginnerModules.length + parts.advancedModules.length).toBe(c.modules.length)
    })
  })
})

