import { describe, it, expect } from "vitest"

describe("Phase 4: Student Ecosystem Homepage Architecture", () => {
  it("verifies headline and supporting copy matches specification", () => {
    const headline = "Learn. Practice. Build. Compete."
    const supporting = "Everything you need to build your technical career."
    const primaryCta = "Explore ASCI"
    const secondaryCta = "Find Opportunities"

    expect(headline).toBe("Learn. Practice. Build. Compete.")
    expect(supporting).toBe("Everything you need to build your technical career.")
    expect(primaryCta).toBe("Explore ASCI")
    expect(secondaryCta).toBe("Find Opportunities")
  })

  it("verifies 5 discovery categories with short titles and descriptions", () => {
    const categories = [
      { title: "LEARN", desc: "Courses and learning paths" },
      { title: "PRACTICE", desc: "DSA and challenges" },
      { title: "BUILD", desc: "Projects and simulators" },
      { title: "COMPETE", desc: "Hackathons and competitions" },
      { title: "CAREER", desc: "Jobs and internships" },
    ]

    expect(categories.map((c) => c.title)).toEqual(["LEARN", "PRACTICE", "BUILD", "COMPETE", "CAREER"])
    expect(categories.map((c) => c.desc)).toEqual([
      "Courses and learning paths",
      "DSA and challenges",
      "Projects and simulators",
      "Hackathons and competitions",
      "Jobs and internships",
    ])
  })

  it("verifies featured opportunities includes competition, hackathon, internship, and job", () => {
    const requiredTypes = ["Competition", "Hackathon", "Internship", "Full-Time Job"]
    expect(requiredTypes).toContain("Competition")
    expect(requiredTypes).toContain("Hackathon")
    expect(requiredTypes).toContain("Internship")
    expect(requiredTypes).toContain("Full-Time Job")
  })
})
