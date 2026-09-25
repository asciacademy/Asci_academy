import { describe, it, expect } from "vitest"
import { PRIMARY_NAV, EXPLORE_MEGA_MENU } from "@/components/navbar"
import {
  ALL_SEARCH_ITEMS,
  SEARCH_COURSES,
  SEARCH_SKILLS,
  SEARCH_PROJECTS,
  SEARCH_COMPETITIONS,
  SEARCH_JOBS,
  SEARCH_INTERNSHIPS,
  SEARCH_USERS,
} from "@/lib/search-dataset"

describe("Phase 3: Global Application Shell Verification", () => {
  describe("Desktop Header & Primary Navigation", () => {
    it("primary navigation contains only the designated core pillars", () => {
      const labels = PRIMARY_NAV.map((n) => n.label)
      expect(labels).toEqual(["Learn", "Practice", "Compete", "Career"])
      // Explore is handled as the dedicated Mega Menu dropdown trigger
      expect(labels).not.toContain("Build")
      expect(labels).not.toContain("Community")
      expect(labels).not.toContain("Degrees")
    })

    it("explore mega menu has exactly 5 pillars: LEARN, PRACTICE, BUILD, COMPETE, CAREER", () => {
      const categories = EXPLORE_MEGA_MENU.map((p) => p.category)
      expect(categories).toEqual(["LEARN", "PRACTICE", "BUILD", "COMPETE", "CAREER"])
    })

    it("explore mega menu LEARN pillar contains Courses, Learning Paths, Tutorials", () => {
      const learn = EXPLORE_MEGA_MENU.find((p) => p.category === "LEARN")
      expect(learn).toBeDefined()
      const labels = learn!.items.map((i) => i.label)
      expect(labels).toContain("Courses")
      expect(labels).toContain("Learning Paths")
      expect(labels).toContain("Tutorials")
    })

    it("explore mega menu PRACTICE pillar contains DSA, Challenges, Assessments", () => {
      const practice = EXPLORE_MEGA_MENU.find((p) => p.category === "PRACTICE")
      expect(practice).toBeDefined()
      const labels = practice!.items.map((i) => i.label)
      expect(labels).toContain("DSA")
      expect(labels).toContain("Challenges")
      expect(labels).toContain("Assessments")
    })

    it("explore mega menu BUILD pillar contains Projects, Simulators", () => {
      const build = EXPLORE_MEGA_MENU.find((p) => p.category === "BUILD")
      expect(build).toBeDefined()
      const labels = build!.items.map((i) => i.label)
      expect(labels).toContain("Projects")
      expect(labels).toContain("Simulators")
    })

    it("explore mega menu COMPETE pillar contains Hackathons, Competitions, Quizzes", () => {
      const compete = EXPLORE_MEGA_MENU.find((p) => p.category === "COMPETE")
      expect(compete).toBeDefined()
      const labels = compete!.items.map((i) => i.label)
      expect(labels).toContain("Hackathons")
      expect(labels).toContain("Competitions")
      expect(labels).toContain("Quizzes")
    })

    it("explore mega menu CAREER pillar contains Jobs, Internships, Hiring Challenges, Mentorship", () => {
      const career = EXPLORE_MEGA_MENU.find((p) => p.category === "CAREER")
      expect(career).toBeDefined()
      const labels = career!.items.map((i) => i.label)
      expect(labels).toContain("Jobs")
      expect(labels).toContain("Internships")
      expect(labels).toContain("Hiring Challenges")
      expect(labels).toContain("Mentorship")
    })
  })

  describe("Global Search Capabilities across 7 Domains", () => {
    it("supports search across courses, skills, projects, competitions, jobs, internships, users", () => {
      expect(SEARCH_COURSES.length).toBeGreaterThan(0)
      expect(SEARCH_SKILLS.length).toBeGreaterThan(0)
      expect(SEARCH_PROJECTS.length).toBeGreaterThan(0)
      expect(SEARCH_COMPETITIONS.length).toBeGreaterThan(0)
      expect(SEARCH_JOBS.length).toBeGreaterThan(0)
      expect(SEARCH_INTERNSHIPS.length).toBeGreaterThan(0)
      expect(SEARCH_USERS.length).toBeGreaterThan(0)

      expect(ALL_SEARCH_ITEMS.length).toBeGreaterThanOrEqual(30)
    })

    it("all search items have visual representations (brand, company, avatar, or icon)", () => {
      for (const item of ALL_SEARCH_ITEMS) {
        expect(["brand", "company", "avatar", "lucide"]).toContain(item.iconType)
        expect(item.iconValue).toBeTruthy()
        expect(item.title).toBeTruthy()
        expect(item.subtitle).toBeTruthy()
        expect(item.href).toBeTruthy()
      }
    })
  })
})
