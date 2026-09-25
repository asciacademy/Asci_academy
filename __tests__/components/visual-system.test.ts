import { describe, it, expect } from "vitest"
import React from "react"
import {
  BrandLogo,
  TechnologyLogo,
  CompanyLogo,
  OrganizationLogo,
  CategoryIcon,
  CategoryIllustration,
} from "@/components/ui/brand-ecosystem"

describe("ASCI Visual Asset Architecture (Phase 2)", () => {
  it("renders all required TechnologyLogo variants", () => {
    const techStacks = [
      "python", "java", "javascript", "typescript", "c", "cpp", "go", "rust",
      "react", "nextjs", "nodejs", "express", "html", "css", "tailwind",
      "git", "github", "docker", "kubernetes", "aws", "azure", "googlecloud",
      "supabase", "postgresql", "mongodb", "redis", "openai", "gemini",
      "machine-learning", "tensorflow", "pytorch",
    ]

    for (const tech of techStacks) {
      const element = TechnologyLogo({ technology: tech, size: 24 })
      expect(element).toBeDefined()
    }
  })

  it("renders all required CompanyLogo variants", () => {
    const companies = [
      "google", "microsoft", "amazon", "meta", "apple", "adobe",
      "tcs", "infosys", "razorpay", "zerodha", "netflix", "uber", "ibm",
    ]

    for (const company of companies) {
      const element = CompanyLogo({ company, size: 28, showDock: true })
      expect(element).toBeDefined()
    }
  })

  it("renders OrganizationLogo variants", () => {
    const orgs = ["harvard", "mit", "stanford", "iit", "asci"]

    for (const org of orgs) {
      const element = OrganizationLogo({ organization: org, size: 28, showDock: true })
      expect(element).toBeDefined()
    }
  })

  it("renders all CategoryIcon types", () => {
    const categories = [
      "competitions", "hackathons", "jobs", "internships", "career",
      "courses", "learning", "practice", "dsa", "projects", "build",
      "certificates", "achievements", "mentors", "community",
    ]

    for (const cat of categories) {
      const element = CategoryIcon({ type: cat, size: 20, showDock: true })
      expect(element).toBeDefined()
    }
  })

  it("renders all 8 CategoryIllustration variants as pure SVGs", () => {
    const illustrations = [
      "learning",
      "practice",
      "projects",
      "competitions",
      "career",
      "certificates",
      "achievements",
      "community",
    ]

    for (const ill of illustrations) {
      const element = CategoryIllustration({ category: ill, size: 64 })
      expect(element).toBeDefined()
      expect(element.type).toBe("svg")
      expect(element.props.width).toBe(64)
      expect(element.props.height).toBe(64)
    }
  })
})
