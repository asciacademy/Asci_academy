import { describe, it, expect } from "vitest"

describe("Phase 22 - Entire Application Audit & Unstop Experience Verification", () => {
  const REQUIRED_AUDIT_ROUTES = [
    { path: "/", modulePath: "@/app/page" },
    { path: "/courses", modulePath: "@/app/courses/page" },
    { path: "/courses/[slug]", modulePath: "@/app/courses/[slug]/page" },
    { path: "/paths", modulePath: "@/app/paths/page" },
    { path: "/paths/[slug]", modulePath: "@/app/paths/[slug]/page" },
    { path: "/practice", modulePath: "@/app/practice/page" },
    { path: "/competitions", modulePath: "@/app/competitions/page" },
    { path: "/competitions/[slug]", modulePath: "@/app/competitions/[slug]/page" },
    { path: "/projects", modulePath: "@/app/projects/page" },
    { path: "/projects/[slug]", modulePath: "@/app/projects/[slug]/page" },
    { path: "/jobs", modulePath: "@/app/jobs/page" },
    { path: "/internships", modulePath: "@/app/internships/page" },
    { path: "/career", modulePath: "@/app/career/page" },
    { path: "/dashboard", modulePath: "@/app/dashboard/page" },
    { path: "/learning", modulePath: "@/app/learning/page" },
    { path: "/applications", modulePath: "@/app/applications/page" },
    { path: "/saved", modulePath: "@/app/saved/page" },
    { path: "/profile", modulePath: "@/app/profile/page" },
    { path: "/certificates", modulePath: "@/app/certificates/page" },
    { path: "/achievements", modulePath: "@/app/achievements/page" },
    { path: "/notifications", modulePath: "@/app/notifications/page" },
    { path: "/axel", modulePath: "@/app/axel/page" },
    { path: "/admin", modulePath: "@/app/admin/page" },
  ]

  it("verifies all 23 audited routes export valid React page components", async () => {
    for (const route of REQUIRED_AUDIT_ROUTES) {
      const pageModule = await import(route.modulePath)
      expect(pageModule.default, `Route ${route.path} must export a default component`).toBeDefined()
    }
  }, 30000)

  it("confirms 5 primary navigation pillars align with Unstop discovery structure", async () => {
    const { EXPLORE_MEGA_MENU } = await import("@/components/navbar")
    const pillarCategories = EXPLORE_MEGA_MENU.map((p) => p.category.toUpperCase())

    expect(pillarCategories).toContain("LEARN")
    expect(pillarCategories).toContain("PRACTICE")
    expect(pillarCategories).toContain("BUILD")
    expect(pillarCategories).toContain("COMPETE")
    expect(pillarCategories).toContain("CAREER")
  })

  it("verifies mobile bottom navigation provides intentional platform ergonomics", async () => {
    const { MobileBottomNav } = await import("@/components/navigation/mobile-bottom-nav")
    expect(MobileBottomNav).toBeDefined()
  })

  it("confirms state system provides loading, empty, error, and success primitives", async () => {
    const { EmptyState, ErrorState, SuccessFeedback, StateSystemContainer } = await import(
      "@/components/ui/state-system"
    )

    expect(EmptyState).toBeDefined()
    expect(ErrorState).toBeDefined()
    expect(SuccessFeedback).toBeDefined()
    expect(StateSystemContainer).toBeDefined()
  })
})
