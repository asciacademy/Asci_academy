import { describe, it, expect } from "vitest"
import { LEARNING_PATHS, getLearningPathBySlug } from "@/lib/learning-paths-data"
import { detectOrganizerIcon } from "@/components/cards/competition-card"

describe("Phase 7: Learning Paths as a First-Class Product", () => {
  it("includes all 7 canonical career learning tracks", () => {
    const titles = LEARNING_PATHS.map((p) => p.title)
    expect(titles).toContain("AI Engineer")
    expect(titles).toContain("Full Stack Developer")
    expect(titles).toContain("Backend Engineer")
    expect(titles).toContain("Data Scientist")
    expect(titles).toContain("ML Engineer")
    expect(titles).toContain("Frontend Engineer")
    expect(titles).toContain("Cloud Engineer")
  })

  it("verifies AI Engineer path contains linear roadmap milestones", () => {
    const aiPath = getLearningPathBySlug("ai-engineer")
    expect(aiPath).toBeDefined()
    expect(aiPath?.coursesCount).toBe(7)
    expect(aiPath?.projectsCount).toBe(6)
    expect(aiPath?.challengesCount).toBe(12)

    const milestoneTitles = aiPath?.milestones.map((m) => m.title)
    expect(milestoneTitles).toContain("Python")
    expect(milestoneTitles).toContain("Machine Learning")
    expect(milestoneTitles).toContain("Deep Learning")
    expect(milestoneTitles).toContain("LLMs")
    expect(milestoneTitles).toContain("AI Agents")
    expect(milestoneTitles).toContain("Projects")
  })
})

describe("Phase 8: Practice Ecosystem & A2Z Roadmap", () => {
  it("verifies canonical A2Z DSA progression topics", () => {
    const expectedRoadmap = [
      "Arrays",
      "Strings",
      "Linked List",
      "Stack",
      "Queue",
      "Trees",
      "Graphs",
      "DP",
    ]
    expect(expectedRoadmap.length).toBe(8)
    expect(expectedRoadmap[0]).toBe("Arrays")
    expect(expectedRoadmap[7]).toBe("DP")
  })
})

describe("Phase 9 & 10: Competitions & Organizer Brand System", () => {
  it("detects and maps official organizer logos correctly", () => {
    expect(detectOrganizerIcon("Google Cloud")).toBe("google")
    expect(detectOrganizerIcon("Microsoft Azure")).toBe("microsoft")
    expect(detectOrganizerIcon("Amazon Web Services")).toBe("aws")
    expect(detectOrganizerIcon("AWS")).toBe("aws")
    expect(detectOrganizerIcon("Meta AI")).toBe("meta")
    expect(detectOrganizerIcon("Apple Inc")).toBe("apple")
    expect(detectOrganizerIcon("Adobe Systems")).toBe("adobe")
    expect(detectOrganizerIcon("TCS CodeVita")).toBe("tcs")
    expect(detectOrganizerIcon("Infosys Springboard")).toBe("infosys")
    expect(detectOrganizerIcon("Razorpay")).toBe("razorpay")
    expect(detectOrganizerIcon("Zerodha")).toBe("zerodha")
    expect(detectOrganizerIcon("ASCI Academy")).toBe("asci")
  })
})
