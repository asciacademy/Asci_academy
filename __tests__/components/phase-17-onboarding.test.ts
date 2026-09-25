import { describe, it, expect } from "vitest"
import React from "react"
import OnboardingPage from "@/app/onboarding/page"
import {
  ONBOARDING_GOALS,
  ONBOARDING_LEVELS,
  ONBOARDING_TOPICS,
  PERSONA_CONFIGS,
  mapGoalToPersona,
  saveOnboardingPreferences,
  UserPersona,
} from "@/lib/onboarding-persona"
import { StudentEcosystemHome } from "@/components/home/student-ecosystem-home"
import { PracticeSpotlightRail } from "@/components/home/practice-spotlight-rail"

describe("Phase 17: Simple Onboarding & Personalized Home", () => {
  describe("Simple 3-Question Onboarding Specification", () => {
    it("exports OnboardingPage component", () => {
      expect(OnboardingPage).toBeDefined()
      expect(typeof OnboardingPage).toBe("function")
    })

    it("Question 1: defines technical topics", () => {
      expect(ONBOARDING_TOPICS.length).toBeGreaterThan(0)
      const ids = ONBOARDING_TOPICS.map((t) => t.id)
      expect(ids).toContain("dsa")
      expect(ids).toContain("web")
      expect(ids).toContain("python")
    })

    it("Question 2: defines the 3 level tiers", () => {
      const levels = ONBOARDING_LEVELS.map((l) => l.id)
      expect(levels).toEqual(["Beginner", "Intermediate", "Advanced"])
    })

    it("Question 3: strictly defines the 7 canonical goals", () => {
      const canonicalGoals = [
        "Learn",
        "Get internship",
        "Get job",
        "Build projects",
        "Prepare for interviews",
        "Master DSA",
        "Learn AI",
      ]
      const definedGoalIds = ONBOARDING_GOALS.map((g) => g.id)
      expect(definedGoalIds).toEqual(canonicalGoals)
    })
  })

  describe("Persona Mapping & Personalized Home Directives", () => {
    it("maps New student -> Explore courses", () => {
      const persona = mapGoalToPersona("Learn", "Beginner")
      expect(persona).toBe("new_student")
      expect(PERSONA_CONFIGS[persona].primaryFocus).toBe("Explore courses")
    })

    it("maps Learner -> Continue learning", () => {
      const persona = mapGoalToPersona("Learn", "Intermediate")
      expect(persona).toBe("learner")
      expect(PERSONA_CONFIGS[persona].primaryFocus).toBe("Continue learning")
    })

    it("maps DSA learner -> Practice", () => {
      const persona1 = mapGoalToPersona("Master DSA")
      const persona2 = mapGoalToPersona("Prepare for interviews")
      expect(persona1).toBe("dsa_learner")
      expect(persona2).toBe("dsa_learner")
      expect(PERSONA_CONFIGS["dsa_learner"].primaryFocus).toBe("Practice")
    })

    it("maps Project-focused -> Projects", () => {
      const persona = mapGoalToPersona("Build projects")
      expect(persona).toBe("project_focused")
      expect(PERSONA_CONFIGS[persona].primaryFocus).toBe("Projects")
    })

    it("maps Job seeker -> Career opportunities", () => {
      const persona1 = mapGoalToPersona("Get internship")
      const persona2 = mapGoalToPersona("Get job")
      expect(persona1).toBe("job_seeker")
      expect(persona2).toBe("job_seeker")
      expect(PERSONA_CONFIGS["job_seeker"].primaryFocus).toBe("Career opportunities")
    })
  })

  describe("Personalized Home & Progressive Ecosystem Disclosure", () => {
    it("exports StudentEcosystemHome and PracticeSpotlightRail", () => {
      expect(StudentEcosystemHome).toBeDefined()
      expect(typeof StudentEcosystemHome).toBe("function")
      expect(PracticeSpotlightRail).toBeDefined()
      expect(typeof PracticeSpotlightRail).toBe("function")
    })

    it("all 5 personas have defined primary and secondary progressive disclosure rails", () => {
      const personas: UserPersona[] = [
        "new_student",
        "learner",
        "dsa_learner",
        "project_focused",
        "job_seeker",
      ]

      for (const p of personas) {
        const meta = PERSONA_CONFIGS[p]
        expect(meta.primaryRails.length).toBeGreaterThan(0)
        expect(meta.secondaryRails.length).toBeGreaterThan(0)
      }
    })
  })
})
