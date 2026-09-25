import { describe, it, expect } from "vitest"
import React from "react"
import {
  ALL_SEARCH_ITEMS,
  SEARCH_COURSES,
  SEARCH_LESSONS,
  SEARCH_SKILLS,
  SEARCH_PROJECTS,
  SEARCH_CHALLENGES,
  SEARCH_COMPETITIONS,
  SEARCH_JOBS,
  SEARCH_INTERNSHIPS,
  SEARCH_USERS,
  TRENDING_SEARCHES,
  SEARCH_CATEGORY_CONFIGS,
  calculateRelevanceScore,
  executeUniversalSearch,
  getStoredRecentSearches,
  saveRecentSearch,
  clearRecentSearches,
  SearchCategory,
} from "@/lib/search-dataset"
import { SearchResultCard } from "@/components/search/search-result-card"
import { SearchCommandDialog } from "@/components/search-command-dialog"
import SearchPage from "@/app/search/page"

describe("Phase 18: ASCI Universal Search", () => {
  describe("1. 9 Unified Entities Indexed", () => {
    it("indexes all 9 required entities", () => {
      const requiredEntities = [
        "courses",
        "lessons",
        "skills",
        "projects",
        "challenges",
        "competitions",
        "jobs",
        "internships",
        "users",
      ]
      const categoriesInConfigs = SEARCH_CATEGORY_CONFIGS.map((c) => c.id).filter((c) => c !== "all")
      expect(categoriesInConfigs).toEqual(requiredEntities)
    })

    it("verifies items exist across all 9 individual entity datasets", () => {
      expect(SEARCH_COURSES.length).toBeGreaterThan(0)
      expect(SEARCH_LESSONS.length).toBeGreaterThan(0)
      expect(SEARCH_SKILLS.length).toBeGreaterThan(0)
      expect(SEARCH_PROJECTS.length).toBeGreaterThan(0)
      expect(SEARCH_CHALLENGES.length).toBeGreaterThan(0)
      expect(SEARCH_COMPETITIONS.length).toBeGreaterThan(0)
      expect(SEARCH_JOBS.length).toBeGreaterThan(0)
      expect(SEARCH_INTERNSHIPS.length).toBeGreaterThan(0)
      expect(SEARCH_USERS.length).toBeGreaterThan(0)
    })

    it("verifies every item specifies required contract fields (id, title, subtitle, type, category, href, keywords)", () => {
      for (const item of ALL_SEARCH_ITEMS) {
        expect(item.id).toBeTruthy()
        expect(item.title).toBeTruthy()
        expect(item.subtitle).toBeTruthy()
        expect(item.type).toBeTruthy()
        expect(item.category).toBeTruthy()
        expect(item.href).toBeTruthy()
        expect(item.keywords.length).toBeGreaterThan(0)
      }
    })
  })

  describe("2. Search Overlay (Recent, Trending, Categories)", () => {
    it("provides Trending Searches list", () => {
      expect(TRENDING_SEARCHES.length).toBeGreaterThan(0)
      expect(TRENDING_SEARCHES).toContain("Python Programming")
      expect(TRENDING_SEARCHES).toContain("Sliding Window Maximum")
      expect(TRENDING_SEARCHES).toContain("Python Developer Internship")
    })

    it("supports recent searches retrieval", () => {
      const recents = getStoredRecentSearches()
      expect(Array.isArray(recents)).toBe(true)
    })
  })

  describe("3. Result Item Layout (Matches Phase 18 Examples)", () => {
    it("exports SearchResultCard component", () => {
      expect(SearchResultCard).toBeDefined()
      expect(typeof SearchResultCard).toBe("function")
    })

    it("verifies Python Programming resolves to Course", () => {
      const pythonCourse = SEARCH_COURSES.find((c) => c.title === "Python Programming")
      expect(pythonCourse).toBeDefined()
      expect(pythonCourse?.type).toBe("Course")
      expect(pythonCourse?.iconValue).toBe("python")
    })

    it("verifies Python Projects resolves to Project", () => {
      const pythonProject = SEARCH_PROJECTS.find((p) => p.title.includes("Python Projects"))
      expect(pythonProject).toBeDefined()
      expect(pythonProject?.type).toBe("Project")
      expect(pythonProject?.iconValue).toBe("python")
    })

    it("verifies Python Developer Internship resolves to Internship", () => {
      const pythonInternship = SEARCH_INTERNSHIPS.find((i) => i.title === "Python Developer Internship")
      expect(pythonInternship).toBeDefined()
      expect(pythonInternship?.type).toBe("Internship")
      expect(pythonInternship?.iconType).toBe("company")
    })
  })

  describe("4. Search Engine: Category Filters, Sorting & Relevance", () => {
    it("filters results by category", () => {
      const onlyCourses = executeUniversalSearch("", "courses")
      expect(onlyCourses.length).toBeGreaterThan(0)
      expect(onlyCourses.every((item) => item.category === "courses")).toBe(true)

      const onlyJobs = executeUniversalSearch("", "jobs")
      expect(onlyJobs.length).toBeGreaterThan(0)
      expect(onlyJobs.every((item) => item.category === "jobs")).toBe(true)
    })

    it("supports multiple sorting modes: relevance, newest, title, popularity", () => {
      const byTitle = executeUniversalSearch("python", "all", "title")
      for (let i = 0; i < byTitle.length - 1; i++) {
        expect(byTitle[i].title.localeCompare(byTitle[i + 1].title)).toBeLessThanOrEqual(0)
      }

      const byPopularity = executeUniversalSearch("python", "all", "popularity")
      for (let i = 0; i < byPopularity.length - 1; i++) {
        expect(byPopularity[i].popularity).toBeGreaterThanOrEqual(byPopularity[i + 1].popularity)
      }
    })

    it("ranks exact title match higher in relevance score", () => {
      const exactCourse = SEARCH_COURSES.find((c) => c.title === "Python Programming")!
      const generalSkill = SEARCH_SKILLS.find((s) => s.title === "Python")!

      const scoreForExact = calculateRelevanceScore(exactCourse, "Python Programming")
      const scoreForOther = calculateRelevanceScore(generalSkill, "Python Programming")

      expect(scoreForExact).toBeGreaterThan(scoreForOther)
    })
  })

  describe("5. Universal Search Product Surfaces", () => {
    it("exports SearchCommandDialog overlay", () => {
      expect(SearchCommandDialog).toBeDefined()
      expect(typeof SearchCommandDialog).toBe("function")
    })

    it("exports dedicated SearchPage component at /search", () => {
      expect(SearchPage).toBeDefined()
      expect(typeof SearchPage).toBe("function")
    })
  })
})
