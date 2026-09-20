import { describe, it, expect } from "vitest"
import { generateAxelResponse } from "@/lib/ai/axel-agent"
import { StudentContext } from "@/types/axel"

describe("Axel 3D Companion - Mentorship Engine & Fallback Intelligence", () => {
  const baseContext: StudentContext = {
    pathname: "/courses",
    activeSection: "hero",
    topic: "Full Stack & DSA",
    streak: 7,
    enrolledCount: 3,
  }

  it("generates a structured 3-stage study plan when student mentions study time", async () => {
    const response = await generateAxelResponse("I have 30 minutes to study today", baseContext)

    expect(response).toBeDefined()
    expect(response.message).toBeTruthy()
    expect(response.plan).toBeDefined()
    expect(response.plan?.title).toBeTruthy()
    expect(response.plan?.items.length).toBe(3)
    expect(response.action).toBeDefined()
    expect(response.suggestions?.length).toBeGreaterThan(0)
  })

  it("explains BFS and Queue intuition with technical accuracy", async () => {
    const response = await generateAxelResponse("Why do we use a queue in BFS?", {
      ...baseContext,
      pathname: "/programs/dsa",
    })

    expect(response.message).toContain("FIFO")
    expect(response.message).toContain("Breadth-First Search")
    expect(["happy", "cute", "normal"]).toContain(response.emotion)
    expect(response.suggestions?.length).toBeGreaterThanOrEqual(2)
  })

  it("explains Dynamic Programming memoization correctly", async () => {
    const response = await generateAxelResponse("How does DP memoization work?", {
      ...baseContext,
      pathname: "/programs/dsa-advanced",
    })

    expect(response.message.toLowerCase()).toContain("subproblem")
    expect(response.action?.type).toBe("open_course")
    expect(response.action?.target).toContain("/programs/dsa")
  })

  it("celebrates learning streaks and guides student to dashboard", async () => {
    const response = await generateAxelResponse("How is my streak doing?", {
      ...baseContext,
      streak: 14,
    })

    expect(response.message).toContain("14-day")
    expect(response.emotion).toBe("heart")
    expect(response.state).toBe("celebrating")
    expect(response.action?.target).toBe("/dashboard")
  })

  it("provides general friendly greeting when prompt is conversational", async () => {
    const response = await generateAxelResponse("Hello Axel!", { ...baseContext, pathname: "/" })

    expect(response.message).toContain("Axel")
    expect(response.suggestions?.length).toBeGreaterThanOrEqual(3)
  })
})
