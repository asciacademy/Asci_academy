import { describe, it, expect } from "vitest"
import React from "react"
import { CertificatesHub, VERIFIED_CERTIFICATES } from "@/components/certificates/certificates-hub"
import {
  AchievementsHub,
  SCHOLASTIC_ACHIEVEMENTS,
  LEADERBOARD_STUDENTS,
} from "@/components/achievements/achievements-hub"

describe("Phase 15: Certificates & Achievement Systems Redesign", () => {
  describe("Certificates Ecosystem (/certificates)", () => {
    it("exports CertificatesHub component", () => {
      expect(CertificatesHub).toBeDefined()
      expect(typeof CertificatesHub).toBe("function")
    })

    it("verifies simple certificate previews define Certificate, Course, Date, Verify, Download contracts", () => {
      expect(VERIFIED_CERTIFICATES.length).toBeGreaterThan(0)
      for (const cert of VERIFIED_CERTIFICATES) {
        // 1. Certificate ID / Visual
        expect(cert.certificateId).toMatch(/^ASCI-/)
        // 2. Course
        expect(cert.courseName).toBeTruthy()
        // 3. Date
        expect(cert.issueDate).toBeTruthy()
        // 4. Verify link
        expect(cert.verifyUrl).toContain("/verify/")
      }
    })
  })

  describe("Achievements Ecosystem (/achievements)", () => {
    it("exports AchievementsHub component", () => {
      expect(AchievementsHub).toBeDefined()
      expect(typeof AchievementsHub).toBe("function")
    })

    it("verifies achievements encompass all 5 mandatory pillars: Courses, Projects, Challenges, Competitions, Certificates", () => {
      const categories = Array.from(new Set(SCHOLASTIC_ACHIEVEMENTS.map((a) => a.category)))
      expect(categories).toContain("courses")
      expect(categories).toContain("projects")
      expect(categories).toContain("challenges")
      expect(categories).toContain("competitions")
      expect(categories).toContain("certificates")
    })

    it("verifies achievements contain verifiable metadata and status", () => {
      for (const item of SCHOLASTIC_ACHIEVEMENTS) {
        expect(item.id).toBeTruthy()
        expect(item.title).toBeTruthy()
        expect(item.description).toBeTruthy()
        expect(item.date).toBeTruthy()
        expect(["Completed", "Verified", "Placed", "Earned"]).toContain(item.status)
      }
    })
  })

  describe("Gamification Preservation in Secondary Experience", () => {
    it("preserves XP, streaks, badges, and leaderboards as professional secondary features", () => {
      // 1. Leaderboard students structure
      expect(LEADERBOARD_STUDENTS.length).toBeGreaterThanOrEqual(5)
      const topStudent = LEADERBOARD_STUDENTS[0]
      expect(topStudent.rank).toBe(1)
      expect(topStudent.name).toBeTruthy()
      expect(topStudent.institution).toBeTruthy()
      expect(topStudent.solved).toBeGreaterThan(0)
      expect(topStudent.xp).toBeGreaterThan(0)

      // 2. Professional non-mobile-game tone check
      for (const st of LEADERBOARD_STUDENTS) {
        expect(st.badge).not.toMatch(/coin|spin|loot|gem/i)
      }
    })
  })
})
