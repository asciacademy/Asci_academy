import { describe, it, expect } from "vitest"
import { INITIAL_JOBS } from "@/lib/unstop-store"
import { JobCard } from "@/components/cards/job-card"
import { InternshipCard } from "@/components/cards/internship-card"

describe("Phase 11: Career Opportunity Ecosystem", () => {
  it("verifies job opportunities exist with required metadata", () => {
    expect(INITIAL_JOBS.length).toBeGreaterThan(0)
    const googleJob = INITIAL_JOBS.find((j) => j.company.toLowerCase().includes("google"))
    expect(googleJob).toBeDefined()
    expect(googleJob?.skills).toBeDefined()
    expect(googleJob?.location).toBeDefined()
    expect(googleJob?.compensation).toBeDefined()
  })

  it("verifies JobCard and InternshipCard components are exported", () => {
    expect(JobCard).toBeDefined()
    expect(InternshipCard).toBeDefined()
  })

  it("verifies full-time jobs and internships separation", () => {
    const fullTimeJobs = INITIAL_JOBS.filter((j) => j.roleType === "Full-Time")
    const internships = INITIAL_JOBS.filter((j) => j.roleType === "Internship")
    expect(fullTimeJobs.length).toBeGreaterThan(0)
    expect(internships.length).toBeGreaterThan(0)
  })
})
