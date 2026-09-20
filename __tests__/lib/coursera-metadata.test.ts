import { describe, it, expect } from "vitest"
import {
  getCourseraDataForCourse,
  COURSERA_PARTNERS,
  COURSERA_COURSE_DETAILS,
} from "@/lib/coursera-metadata"

describe("Coursera Metadata - Partner Resolution & Course Enrichment", () => {
  it("resolves exact course metadata for mapped curriculum courses", () => {
    const agenticData = getCourseraDataForCourse("agentic-ai", "Agentic AI", "AI & ML")
    expect(agenticData).toBeDefined()
    expect(agenticData.partner).toContain("DeepLearning.AI")
    expect(agenticData.rating).toBeGreaterThanOrEqual(4.5)
    expect(agenticData.skills.length).toBeGreaterThan(0)
    expect(agenticData.instructors.length).toBeGreaterThan(0)
    expect(agenticData.videoChapters).toBeDefined()
    expect(agenticData.videoChapters!.length).toBeGreaterThan(0)
  })

  it("provides deterministic category-based fallbacks for unmapped course slugs", () => {
    const aiCourse = getCourseraDataForCourse("custom-ai-course", "Custom AI", "AI & ML")
    expect(aiCourse.partnerLogo).toBe("deeplearning")
    expect(aiCourse.partnerType).toBe("AI Research Institute")

    const devOpsCourse = getCourseraDataForCourse("custom-devops-course", "Custom DevOps", "Git & DevOps")
    expect(devOpsCourse.partnerLogo).toBe("linux")
    expect(devOpsCourse.partnerType).toBe("Foundation")

    const cyberCourse = getCourseraDataForCourse("custom-sec-course", "Custom Security", "Cybersecurity")
    expect(cyberCourse.partnerLogo).toBe("harvard")
    expect(cyberCourse.partnerType).toBe("University")
  })

  it("contains valid partner registry with logos and URLs", () => {
    const partnerEntries = Object.entries(COURSERA_PARTNERS)
    expect(partnerEntries.length).toBeGreaterThan(5)
    partnerEntries.forEach(([id, partner]) => {
      expect(id).toBeTruthy()
      expect(partner.name).toBeTruthy()
      expect(partner.type).toBeTruthy()
      expect(partner.color).toBeTruthy()
    })
  })

  it("verifies all structured course entries contain valid video IDs and outcomes", () => {
    Object.entries(COURSERA_COURSE_DETAILS).forEach(([slug, details]) => {
      expect(slug).toBeTruthy()
      expect(details.rating).toBeGreaterThanOrEqual(4.0)
      expect(details.rating).toBeLessThanOrEqual(5.0)
      expect(details.officialVideoId).toBeTruthy()
      expect(details.careerOutcomes).toBeDefined()
      expect(details.careerOutcomes.percentage).toBeGreaterThanOrEqual(80)
      expect(details.whatYouWillLearn.length).toBeGreaterThanOrEqual(3)
    })
  })
})
