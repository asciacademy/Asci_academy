import { describe, it, expect, beforeEach, vi } from "vitest"
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  isInWishlist,
  toggleWishlist,
  getLearningHistory,
  recordCourseHistory,
  removeHistoryItem,
  clearLearningHistory,
  getEnrollments,
  enrollCourse,
  unenrollCourse,
  isCourseEnrolled,
  updateCourseProgress,
  WishlistItem,
} from "@/lib/user-learning-store"

describe("User Learning Store - Wishlist", () => {
  const store = new Map<string, string>()

  beforeEach(() => {
    store.clear()

    const mockStorage = {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, val: string) => store.set(key, String(val)),
      removeItem: (key: string) => store.delete(key),
      clear: () => store.clear(),
      length: 0,
      key: () => null,
    }

    // Setup global window and localStorage
    vi.stubGlobal("window", {
      localStorage: mockStorage,
      dispatchEvent: vi.fn(),
    })
    vi.stubGlobal("localStorage", mockStorage)
    vi.stubGlobal(
      "CustomEvent",
      class CustomEvent {
        constructor(public type: string, public detail?: any) {}
      }
    )
  })

  it("starts with empty wishlist", () => {
    expect(getWishlist()).toEqual([])
    expect(isInWishlist("python-foundations")).toBe(false)
  })

  it("adds an item to wishlist and prevents duplicate additions", () => {
    const item: Omit<WishlistItem, "id" | "addedAt"> = {
      courseSlug: "python-architect",
      title: "Python for Z — Architect Edition",
      category: "Programming",
      level: "Intermediate",
    }

    const res1 = addToWishlist(item)
    expect(res1.success).toBe(true)
    expect(res1.wishlist.length).toBe(1)
    expect(res1.wishlist[0].courseSlug).toBe("python-architect")
    expect(isInWishlist("python-architect")).toBe(true)

    // Attempt duplicate addition
    const res2 = addToWishlist(item)
    expect(res2.success).toBe(true)
    expect(res2.wishlist.length).toBe(1)
  })

  it("removes an item from wishlist by courseSlug", () => {
    addToWishlist({ courseSlug: "dsa-java", title: "DSA in Java" })
    addToWishlist({ courseSlug: "fullstack-react", title: "Fullstack React 19" })

    expect(getWishlist().length).toBe(2)

    const res = removeFromWishlist("dsa-java")
    expect(res.success).toBe(true)
    expect(res.wishlist.length).toBe(1)
    expect(isInWishlist("dsa-java")).toBe(false)
    expect(isInWishlist("fullstack-react")).toBe(true)
  })

  it("toggles wishlist status correctly", () => {
    const course = { courseSlug: "ai-systems", title: "Autonomous AI Systems" }

    // Toggle on
    const resOn = toggleWishlist(course)
    expect(resOn.isSaved).toBe(true)
    expect(isInWishlist("ai-systems")).toBe(true)

    // Toggle off
    const resOff = toggleWishlist(course)
    expect(resOff.isSaved).toBe(false)
    expect(isInWishlist("ai-systems")).toBe(false)
  })

  it("clears the entire wishlist", () => {
    addToWishlist({ courseSlug: "c1", title: "Course 1" })
    addToWishlist({ courseSlug: "c2", title: "Course 2" })
    expect(getWishlist().length).toBe(2)

    const clearRes = clearWishlist()
    expect(clearRes.success).toBe(true)
    expect(getWishlist().length).toBe(0)
  })
})

describe("User Learning Store - History", () => {
  const store = new Map<string, string>()

  beforeEach(() => {
    store.clear()

    const mockStorage = {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, val: string) => store.set(key, String(val)),
      removeItem: (key: string) => store.delete(key),
      clear: () => store.clear(),
      length: 0,
      key: () => null,
    }

    vi.stubGlobal("window", {
      localStorage: mockStorage,
      dispatchEvent: vi.fn(),
    })
    vi.stubGlobal("localStorage", mockStorage)
    vi.stubGlobal(
      "CustomEvent",
      class CustomEvent {
        constructor(public type: string, public detail?: any) {}
      }
    )
  })

  it("records history items and bubbles recent accesses to index 0", () => {
    recordCourseHistory({
      courseSlug: "react-core",
      courseTitle: "React 19 Foundations",
      playerUrl: "/courses/react-core/learn",
    })

    recordCourseHistory({
      courseSlug: "sql-deepdive",
      courseTitle: "PostgreSQL Architecture",
      playerUrl: "/courses/sql-deepdive/learn",
    })

    let history = getLearningHistory()
    expect(history.length).toBe(2)
    expect(history[0].courseSlug).toBe("sql-deepdive")

    // Access react-core again -> should move to index 0
    recordCourseHistory({
      courseSlug: "react-core",
      courseTitle: "React 19 Foundations",
      playerUrl: "/courses/react-core/learn",
    })

    history = getLearningHistory()
    expect(history.length).toBe(2)
    expect(history[0].courseSlug).toBe("react-core")
    expect(history[1].courseSlug).toBe("sql-deepdive")
  })

  it("enforces max limit of 25 history items", () => {
    for (let i = 1; i <= 30; i++) {
      recordCourseHistory({
        courseSlug: `course-${i}`,
        courseTitle: `Course Title ${i}`,
        playerUrl: `/courses/course-${i}`,
      })
    }

    const history = getLearningHistory()
    expect(history.length).toBe(25)
    // Most recent is course-30
    expect(history[0].courseSlug).toBe("course-30")
  })

  it("removes single history item and clears all history", () => {
    recordCourseHistory({ courseSlug: "c1", courseTitle: "C1", playerUrl: "/c1" })
    recordCourseHistory({ courseSlug: "c2", courseTitle: "C2", playerUrl: "/c2" })

    removeHistoryItem("c1")
    expect(getLearningHistory().length).toBe(1)
    expect(getLearningHistory()[0].courseSlug).toBe("c2")

    clearLearningHistory()
    expect(getLearningHistory().length).toBe(0)
  })
})

describe("User Learning Store - Enrollments", () => {
  const store = new Map<string, string>()

  beforeEach(() => {
    store.clear()

    const mockStorage = {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, val: string) => store.set(key, String(val)),
      removeItem: (key: string) => store.delete(key),
      clear: () => store.clear(),
      length: 0,
      key: () => null,
    }

    vi.stubGlobal("window", {
      localStorage: mockStorage,
      dispatchEvent: vi.fn(),
    })
    vi.stubGlobal("localStorage", mockStorage)
    vi.stubGlobal(
      "CustomEvent",
      class CustomEvent {
        constructor(public type: string, public detail?: any) {}
      }
    )
  })

  it("enrolls course, computes total lessons, and prevents duplicates", () => {
    expect(isCourseEnrolled("dsa-mastery")).toBe(false)

    const res = enrollCourse({
      slug: "dsa-mastery",
      title: "DSA Mastery Track",
      modules: 5,
    })

    expect(res.success).toBe(true)
    expect(res.enrollments.length).toBe(1)
    expect(res.enrollments[0].totalLessons).toBe(15) // 5 modules * 3 lessons default
    expect(isCourseEnrolled("dsa-mastery")).toBe(true)
    expect(isCourseEnrolled("DSA-MASTERY")).toBe(true) // case-insensitive check

    // Duplicate enrollment check
    const dupRes = enrollCourse({
      slug: "dsa-mastery",
      title: "DSA Mastery Track",
    })
    expect(dupRes.enrollments.length).toBe(1)
  })

  it("updates course progress accurately", () => {
    enrollCourse({
      slug: "cloud-devops",
      title: "Cloud & DevOps",
      modules: 4,
    })

    const updated = updateCourseProgress("cloud-devops", 66, 8)
    expect(updated.success).toBe(true)
    const item = updated.enrollments.find((e) => e.slug === "cloud-devops")
    expect(item?.progressPercent).toBe(66)
    expect(item?.lessonsCompleted).toBe(8)
  })

  it("unenrolls course properly", () => {
    enrollCourse({ slug: "cyber-defense", title: "Cyber Defense" })
    expect(isCourseEnrolled("cyber-defense")).toBe(true)

    const res = unenrollCourse("cyber-defense")
    expect(res.success).toBe(true)
    expect(isCourseEnrolled("cyber-defense")).toBe(false)
  })
})
