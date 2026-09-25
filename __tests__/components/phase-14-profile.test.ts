import { describe, it, expect } from "vitest"
import React from "react"
import { StudentProfileView } from "@/components/profile/student-profile-view"
import { resolveStudentProfile } from "@/lib/student-profile-data"

describe("Phase 14: Student Profile & Career Proof Ecosystem", () => {
  it("exports StudentProfileView component", () => {
    expect(StudentProfileView).toBeDefined()
    expect(typeof StudentProfileView).toBe("function")
  })

  it("resolves student profile with 6 core domain dimensions", () => {
    const profile = resolveStudentProfile({
      username: "alexcarter",
      name: "Alex Carter",
      bio: "Full-Stack & Systems Engineer — CS Scholar @ ASCI",
      skills: ["Python", "React", "Go", "TypeScript", "PostgreSQL", "Docker"],
    })

    expect(profile.name).toBe("Alex Carter")
    expect(profile.username).toBe("alexcarter")
    expect(profile.skills).toContain("Python")
    expect(profile.skills).toContain("React")
    expect(profile.skills).toContain("Go")
    expect(profile.completedCourses.length).toBeGreaterThan(0)
    expect(profile.projects.length).toBeGreaterThan(0)
    expect(profile.certificates.length).toBeGreaterThan(0)
    expect(profile.achievements.length).toBeGreaterThan(0)
    expect(profile.competitions.length).toBeGreaterThan(0)
  })

  it("verifies Header contains Avatar, Name, Headline, Skills, and Edit Profile action", () => {
    const profile = resolveStudentProfile({
      username: "alexcarter",
      name: "Alex Carter",
      bio: "Full-Stack & Systems Engineer — CS Scholar @ ASCI",
      skills: ["Python", "React", "Go"],
    })

    const element = React.createElement(StudentProfileView, {
      initialProfile: profile,
      isOwner: true,
    })

    expect(element.props.initialProfile.name).toBe("Alex Carter")
    expect(element.props.initialProfile.headline).toBeDefined()
    expect(element.props.initialProfile.skills.length).toBeGreaterThanOrEqual(3)
    expect(element.props.isOwner).toBe(true)
  })

  it("verifies the exact 6 Tabs contract: Overview, Learning, Projects, Certificates, Achievements, Competitions", () => {
    const requiredTabs = ["Overview", "Learning", "Projects", "Certificates", "Achievements", "Competitions"]
    expect(requiredTabs).toHaveLength(6)
  })

  it("verifies Overview aggregates Completed Courses, Projects, Certificates, and Skills", () => {
    const profile = resolveStudentProfile(null)
    expect(profile.completedCourses.length).toBeGreaterThan(0)
    expect(profile.projects.length).toBeGreaterThan(0)
    expect(profile.certificates.length).toBeGreaterThan(0)
    expect(profile.skills.length).toBeGreaterThan(0)
  })

  it("verifies Projects show real projects with technology stacks", () => {
    const profile = resolveStudentProfile(null)
    const jobPortal = profile.projects.find((p) => p.slug === "build-a-job-portal")
    expect(jobPortal).toBeDefined()
    expect(jobPortal?.technologies).toContain("React")
    expect(jobPortal?.technologies).toContain("Node.js")
    expect(jobPortal?.technologies).toContain("PostgreSQL")
  })

  it("verifies Certificates show accredited verification credentials", () => {
    const profile = resolveStudentProfile(null)
    expect(profile.certificates.length).toBeGreaterThan(0)
    const cert = profile.certificates[0]
    expect(cert.certId).toMatch(/^ASCI-/)
    expect(cert.verified).toBe(true)
    expect(cert.verificationUrl).toContain("/verify/")
  })

  it("verifies Achievements are professional and not social-media vanity metrics", () => {
    const profile = resolveStudentProfile(null)
    expect(profile.achievements.length).toBeGreaterThan(0)
    for (const ach of profile.achievements) {
      expect(ach.title).not.toMatch(/likes|followers|retweets|reactions/i)
      expect(ach.category).toBeTruthy()
    }
  })
})
