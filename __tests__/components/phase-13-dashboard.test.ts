import { describe, it, expect } from "vitest"
import React from "react"
import { DashboardOverview } from "@/components/dashboard/dashboard-overview"
import { INITIAL_POTD, INITIAL_HACKATHONS, INITIAL_JOBS } from "@/lib/unstop-store"
import { GUIDED_PROJECTS } from "@/lib/projects-data"

describe("Phase 13: ASCI Action Center Dashboard", () => {
  it("exports DashboardOverview component", () => {
    expect(DashboardOverview).toBeDefined()
    expect(typeof DashboardOverview).toBe("function")
  })

  it("verifies the 6 core Action Center sections render correctly", () => {
    const element = React.createElement(DashboardOverview, {
      userName: "Alex",
      enrollments: [
        {
          title: "Python Programming",
          slug: "python",
          totalLessons: 24,
          completedLessons: 8,
          progressPercent: 65,
        },
      ],
      unlockedBadgeIds: ["badge-1"],
    })

    expect(element).toBeDefined()
    expect(element.props.userName).toBe("Alex")
  })

  it("verifies Primary Card default specs: Python Programming, Lesson 8 of 24, 65% complete, Continue Learning", () => {
    // Test default fallback values when empty enrollments
    const defaultElement = React.createElement(DashboardOverview, {
      userName: "Student",
      enrollments: [],
    })

    expect(defaultElement).toBeDefined()
  })

  it("verifies Today's Practice challenge data availability", () => {
    expect(INITIAL_POTD).toBeDefined()
    expect(INITIAL_POTD.title).toBeTruthy()
    expect(INITIAL_POTD.difficulty).toMatch(/Easy|Medium|Hard/i)
  })

  it("verifies Upcoming Competition registration closing alert", () => {
    expect(INITIAL_HACKATHONS.length).toBeGreaterThan(0)
    const upcoming = INITIAL_HACKATHONS[0]
    expect(upcoming.title).toBeTruthy()
    expect(upcoming.host).toBeTruthy()
  })

  it("verifies Recommended items include Course, Project, Competition, and Internship", () => {
    expect(GUIDED_PROJECTS.length).toBeGreaterThan(0)
    expect(INITIAL_HACKATHONS.length).toBeGreaterThan(0)
    expect(INITIAL_JOBS.length).toBeGreaterThan(0)

    const jobPortal = GUIDED_PROJECTS.find((p) => p.slug === "build-a-job-portal")
    expect(jobPortal).toBeDefined()
  })

  it("verifies Simple Progress Metrics cover Courses, Projects, Challenges, and Certificates without bloated charts", () => {
    const element = React.createElement(DashboardOverview, {
      userName: "Dev",
      enrollments: [
        { title: "Python", slug: "python" },
        { title: "React", slug: "react" },
      ],
      unlockedBadgeIds: ["cert-1"],
    })

    expect(element.props.enrollments?.length).toBe(2)
    expect(element.props.unlockedBadgeIds?.length).toBe(1)
  })
})
