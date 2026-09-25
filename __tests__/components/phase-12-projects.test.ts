import { describe, it, expect } from "vitest"
import { GUIDED_PROJECTS, getProjectBySlug } from "@/lib/projects-data"
import { ProjectCard } from "@/components/cards/project-card"

describe("Phase 12: Projects as a First-Class Ecosystem", () => {
  it("includes guided projects across all 8 requested categories", () => {
    const categories = Array.from(new Set(GUIDED_PROJECTS.map((p) => p.category)))
    expect(categories).toContain("Frontend")
    expect(categories).toContain("Backend")
    expect(categories).toContain("AI")
    expect(categories).toContain("ML")
    expect(categories).toContain("Data")
    expect(categories).toContain("Mobile")
    expect(categories).toContain("Cloud")
    expect(categories).toContain("DevOps")
  })

  it("verifies the canonical 'Build a Job Portal' project", () => {
    const jobPortal = getProjectBySlug("build-a-job-portal")
    expect(jobPortal).toBeDefined()
    expect(jobPortal?.title).toBe("Build a Job Portal")
    expect(jobPortal?.difficulty).toBe("Intermediate")
    expect(jobPortal?.technologies).toContain("React")
    expect(jobPortal?.technologies).toContain("Node.js")
    expect(jobPortal?.technologies).toContain("PostgreSQL")
    expect(jobPortal?.estimatedHours).toBe("4–6 hours")
  })

  it("verifies structured project detail sections exist", () => {
    const project = GUIDED_PROJECTS[0]
    expect(project.problemStatement).toBeDefined()
    expect(project.whatYoullBuild).toBeDefined()
    expect(project.technologies.length).toBeGreaterThan(0)
    expect(project.skills.length).toBeGreaterThan(0)
    expect(project.requirements.length).toBeGreaterThan(0)
    expect(project.milestones.length).toBeGreaterThan(0)
    expect(project.submissionRequirements).toBeDefined()
    expect(project.portfolioShowcase).toBeDefined()
  })

  it("verifies ProjectCard component export", () => {
    expect(ProjectCard).toBeDefined()
  })
})
