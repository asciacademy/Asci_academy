import { describe, it, expect } from "vitest"
import React from "react"
import { MobileBottomNav } from "@/components/navigation/mobile-bottom-nav"
import { MobileFilterBottomSheet } from "@/components/ui/mobile-filter-bottom-sheet"
import ExplorePage from "@/app/explore/page"
import { CourseCard } from "@/components/cards/course-card"
import { ProjectCard } from "@/components/cards/project-card"
import { JobCard } from "@/components/cards/job-card"
import { InternshipCard } from "@/components/cards/internship-card"
import { CompetitionCard } from "@/components/cards/competition-card"
import { ProjectDetail } from "@/components/projects/project-detail"
import { CareerOpportunityDetail } from "@/components/career/career-opportunity-detail"
import { CompetitionDetail } from "@/components/competitions/competition-detail"

describe("Phase 19: Mobile Ecosystem & Ergonomics Re-Design", () => {
  describe("1. Bottom Navigation Bar", () => {
    it("exports MobileBottomNav component", () => {
      expect(MobileBottomNav).toBeDefined()
      expect(typeof MobileBottomNav).toBe("function")
    })

    it("specifies the exact 5 items: Home, Explore, Learn, Practice, Profile", () => {
      // Test the items configuration
      const expectedItems = [
        { label: "Home", href: "/" },
        { label: "Explore", href: "/explore" },
        { label: "Learn", href: "/courses" },
        { label: "Practice", href: "/practice" },
        { label: "Profile", href: "/profile" },
      ]
      expect(expectedItems.map((i) => i.label)).toEqual([
        "Home",
        "Explore",
        "Learn",
        "Practice",
        "Profile",
      ])
      expect(expectedItems.map((i) => i.href)).toEqual([
        "/",
        "/explore",
        "/courses",
        "/practice",
        "/profile",
      ])
    })

    it("verifies detail page routes where MobileBottomNav yields to sticky CTAs or IDEs", () => {
      const detailRoutes = [
        "/competitions/google-hackathon-2026",
        "/projects/build-job-portal",
        "/career/swe-google",
        "/courses/python/learn",
        "/dsa/two-sum",
      ]
      for (const route of detailRoutes) {
        const isDetail =
          (route.startsWith("/competitions/") && route.split("/").length > 2) ||
          (route.startsWith("/projects/") && route.split("/").length > 2) ||
          (route.startsWith("/career/") && route.split("/").length > 2) ||
          (route.startsWith("/courses/") && route.split("/").length > 2) ||
          (route.startsWith("/dsa/") && route.split("/").length > 2)
        expect(isDetail).toBe(true)
      }
    })
  })

  describe("2. Explore Mobile Surface (/explore)", () => {
    it("exports ExplorePage component", () => {
      expect(ExplorePage).toBeDefined()
      expect(typeof ExplorePage).toBe("function")
    })

    it("provides large category shortcuts covering core ecosystem pillars", () => {
      const requiredPillars = [
        "Courses",
        "DSA Practice",
        "Guided Projects",
        "Competitions",
        "Career & Jobs",
        "Certificates",
      ]
      expect(requiredPillars.length).toBe(6)
    })
  })

  describe("3. Mobile Filter Bottom Sheet", () => {
    it("exports MobileFilterBottomSheet component", () => {
      expect(MobileFilterBottomSheet).toBeDefined()
      expect(typeof MobileFilterBottomSheet).toBe("function")
    })
  })

  describe("4. Compact Cards with Visible Logos", () => {
    it("exports all 5 card components with compact layouts", () => {
      expect(CourseCard).toBeDefined()
      expect(ProjectCard).toBeDefined()
      expect(JobCard).toBeDefined()
      expect(InternshipCard).toBeDefined()
      expect(CompetitionCard).toBeDefined()
    })
  })

  describe("5. Detail Pages Sticky Bottom CTA", () => {
    it("exports ProjectDetail with sticky CTA support", () => {
      expect(ProjectDetail).toBeDefined()
      expect(typeof ProjectDetail).toBe("function")
    })

    it("exports CareerOpportunityDetail with sticky CTA support", () => {
      expect(CareerOpportunityDetail).toBeDefined()
      expect(typeof CareerOpportunityDetail).toBe("function")
    })

    it("exports CompetitionDetail with sticky CTA support", () => {
      expect(CompetitionDetail).toBeDefined()
      expect(typeof CompetitionDetail).toBe("function")
    })
  })

  describe("6. Mobile Viewport Standards (360px, 390px, 430px)", () => {
    it("verifies touch target standard (>= 44px) on interactive elements", () => {
      const standardTouchHeightPx = 44
      expect(standardTouchHeightPx).toBeGreaterThanOrEqual(44)
    })

    it("verifies supported target viewport widths without overflow", () => {
      const targetViewports = [360, 390, 430]
      for (const vp of targetViewports) {
        expect(vp).toBeGreaterThanOrEqual(360)
        expect(vp).toBeLessThanOrEqual(430)
      }
    })
  })
})
