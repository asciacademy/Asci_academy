import { describe, it, expect, vi } from "vitest"

vi.mock("@/lib/user-learning-store", () => ({
  useWishlist: () => ({
    isSaved: () => false,
    toggle: () => {},
    wishlist: [],
    remove: () => {},
  }),
}))

import { CourseCard } from "@/components/cards/course-card"
import { CompetitionCard } from "@/components/cards/competition-card"
import { OpportunityCard } from "@/components/cards/opportunity-card"
import { ProjectCard } from "@/components/cards/project-card"
import { ChallengeCard } from "@/components/cards/challenge-card"
import { CertificateCard } from "@/components/cards/certificate-card"

describe("Atomic Redesigned Cards", () => {
  it("renders CourseCard in both card and row variants", () => {
    const cardEl = CourseCard({
      id: "course-1",
      slug: "python",
      title: "Python Programming",
      description: "Learn Python through practical lessons and projects.",
      variant: "card",
    })
    expect(cardEl).toBeDefined()

    const rowEl = CourseCard({
      id: "course-1",
      slug: "python",
      title: "Python Programming",
      variant: "row",
    })
    expect(rowEl).toBeDefined()
  })

  it("renders CompetitionCard in both card and row variants", () => {
    const cardEl = CompetitionCard({
      id: "comp-1",
      slug: "algorithm-sprint",
      title: "Algorithm Sprint",
      organizer: "Google",
      variant: "card",
    })
    expect(cardEl).toBeDefined()

    const rowEl = CompetitionCard({
      id: "comp-1",
      slug: "algorithm-sprint",
      title: "Algorithm Sprint",
      organizer: "Google",
      variant: "row",
    })
    expect(rowEl).toBeDefined()
  })

  it("renders OpportunityCard in both card and row variants", () => {
    const cardEl = OpportunityCard({
      id: "job-1",
      title: "Software Engineer Intern",
      company: "Google",
      variant: "card",
    })
    expect(cardEl).toBeDefined()

    const rowEl = OpportunityCard({
      id: "job-1",
      title: "Software Engineer Intern",
      company: "Google",
      variant: "row",
    })
    expect(rowEl).toBeDefined()
  })

  it("renders ProjectCard in both card and row variants", () => {
    const cardEl = ProjectCard({
      id: "proj-1",
      slug: "kv-store",
      title: "Distributed KV Store",
      technologies: ["Go", "Docker"],
      variant: "card",
    })
    expect(cardEl).toBeDefined()

    const rowEl = ProjectCard({
      id: "proj-1",
      slug: "kv-store",
      title: "Distributed KV Store",
      technologies: ["Go", "Docker"],
      variant: "row",
    })
    expect(rowEl).toBeDefined()
  })

  it("renders ChallengeCard in both card and row variants", () => {
    const cardEl = ChallengeCard({
      id: "ch-1",
      slug: "two-sum",
      title: "Two Sum",
      difficulty: "Easy",
      topic: "Arrays",
      variant: "card",
    })
    expect(cardEl).toBeDefined()

    const rowEl = ChallengeCard({
      id: "ch-1",
      slug: "two-sum",
      title: "Two Sum",
      difficulty: "Easy",
      topic: "Arrays",
      variant: "row",
    })
    expect(rowEl).toBeDefined()
  })

  it("renders CertificateCard in both card and row variants", () => {
    const cardEl = CertificateCard({
      id: "cert-1",
      certificateId: "ASCI-PY-2026",
      title: "Python Systems",
      variant: "card",
    })
    expect(cardEl).toBeDefined()

    const rowEl = CertificateCard({
      id: "cert-1",
      certificateId: "ASCI-PY-2026",
      title: "Python Systems",
      variant: "row",
    })
    expect(rowEl).toBeDefined()
  })
})
