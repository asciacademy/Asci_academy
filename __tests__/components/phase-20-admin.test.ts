import { describe, it, expect } from "vitest"
import { ADMIN_NAV_LINKS } from "@/components/admin/admin-sidebar"

describe("Phase 20 - Dense Administrative Infrastructure", () => {
  it("defines all 13 mandatory admin sections in the side navigation hierarchy", () => {
    const requiredSections = [
      "Overview",
      "Users",
      "Courses",
      "Lessons",
      "Competitions",
      "Projects",
      "Jobs",
      "Internships",
      "Certificates",
      "Live Classes",
      "Payments",
      "Announcements",
      "Analytics",
    ]

    const navTitles = ADMIN_NAV_LINKS.map((link) => link.name)

    requiredSections.forEach((section) => {
      expect(navTitles).toContain(section)
    })
  })

  it("verifies accurate href route paths for each admin section", () => {
    const linkMap = new Map(ADMIN_NAV_LINKS.map((l) => [l.name, l.href]))

    expect(linkMap.get("Overview")).toBe("/admin")
    expect(linkMap.get("Users")).toBe("/admin/users")
    expect(linkMap.get("Courses")).toBe("/admin/courses")
    expect(linkMap.get("Lessons")).toBe("/admin/lessons")
    expect(linkMap.get("Competitions")).toBe("/admin/competitions")
    expect(linkMap.get("Projects")).toBe("/admin/projects")
    expect(linkMap.get("Jobs")).toBe("/admin/jobs")
    expect(linkMap.get("Internships")).toBe("/admin/internships")
    expect(linkMap.get("Certificates")).toBe("/admin/certificates")
    expect(linkMap.get("Live Classes")).toBe("/admin/live-classes")
    expect(linkMap.get("Payments")).toBe("/admin/payments")
    expect(linkMap.get("Announcements")).toBe("/admin/announcements")
    expect(linkMap.get("Analytics")).toBe("/admin/analytics")
  })

  it("imports valid page component definitions for new dense admin sections", async () => {
    const lessonsPage = await import("@/app/admin/lessons/page")
    expect(lessonsPage.default).toBeDefined()

    const competitionsPage = await import("@/app/admin/competitions/page")
    expect(competitionsPage.default).toBeDefined()

    const projectsPage = await import("@/app/admin/projects/page")
    expect(projectsPage.default).toBeDefined()

    const jobsPage = await import("@/app/admin/jobs/page")
    expect(jobsPage.default).toBeDefined()

    const internshipsPage = await import("@/app/admin/internships/page")
    expect(internshipsPage.default).toBeDefined()

    const certificatesPage = await import("@/app/admin/certificates/page")
    expect(certificatesPage.default).toBeDefined()

    const analyticsPage = await import("@/app/admin/analytics/page")
    expect(analyticsPage.default).toBeDefined()
  })
})
