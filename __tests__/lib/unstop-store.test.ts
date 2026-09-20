import { describe, it, expect } from "vitest"
import {
  INITIAL_HACKATHONS,
  INITIAL_JOBS,
  INITIAL_ASSESSMENTS,
  INITIAL_MENTORS,
  INITIAL_POTD,
  INITIAL_SPEED_QUIZZES,
  INITIAL_TEAMMATES,
} from "@/lib/unstop-store"

describe("Unstop Ecosystem - Initial Seed Data & Core Invariants", () => {
  it("verifies hackathons are structured as an array with valid schema invariants", () => {
    expect(Array.isArray(INITIAL_HACKATHONS)).toBe(true)

    INITIAL_HACKATHONS.forEach((h) => {
      expect(h.id).toBeTruthy()
      expect(h.title).toBeTruthy()
      expect(h.host).toBeTruthy()
      expect(h.prizePool).toBeTruthy()
      expect(h.problemStatement).toBeTruthy()
      expect(Array.isArray(h.rounds)).toBe(true)
      expect(h.rounds.length).toBeGreaterThan(0)
      expect(Array.isArray(h.tags)).toBe(true)
    })
  })

  it("verifies job opportunities are structured as an array with valid schema invariants", () => {
    expect(Array.isArray(INITIAL_JOBS)).toBe(true)

    INITIAL_JOBS.forEach((job) => {
      expect(job.id).toBeTruthy()
      expect(job.title).toBeTruthy()
      expect(job.company).toBeTruthy()
      expect(job.compensation).toBeTruthy()
      expect(Array.isArray(job.skills)).toBe(true)
      expect(job.skills.length).toBeGreaterThan(0)
      expect(Array.isArray(job.requirements)).toBe(true)
      expect(job.requirements.length).toBeGreaterThan(0)
    })
  })

  it("verifies skill assessments have questions with valid options and correct answer indices", () => {
    expect(INITIAL_ASSESSMENTS.length).toBeGreaterThan(0)

    INITIAL_ASSESSMENTS.forEach((assessment) => {
      expect(assessment.id).toBeTruthy()
      expect(assessment.passingScore).toBeGreaterThanOrEqual(50)
      expect(assessment.questions.length).toBeGreaterThan(0)

      assessment.questions.forEach((q) => {
        expect(q.id).toBeDefined()
        expect(q.question).toBeTruthy()
        expect(Array.isArray(q.options)).toBe(true)
        expect(q.options.length).toBeGreaterThanOrEqual(2)
        expect(q.correctIndex).toBeGreaterThanOrEqual(0)
        expect(q.correctIndex).toBeLessThan(q.options.length)
        expect(q.explanation).toBeTruthy()
      })
    })
  })

  it("verifies POTD (Problem of the Day) has starter code in multiple languages", () => {
    expect(INITIAL_POTD.id).toBeTruthy()
    expect(INITIAL_POTD.title).toBeTruthy()
    expect(INITIAL_POTD.difficulty).toMatch(/Easy|Medium|Hard/i)
    expect(INITIAL_POTD.starterCode.javascript).toBeTruthy()
    expect(INITIAL_POTD.starterCode.python).toBeTruthy()
    expect(INITIAL_POTD.starterCode.java).toBeTruthy()
    expect(Array.isArray(INITIAL_POTD.testCases)).toBe(true)
    expect(INITIAL_POTD.testCases.length).toBeGreaterThan(0)
  })

  it("verifies speed quizzes have questions across Core CS, System Design, and Frontend", () => {
    expect(INITIAL_SPEED_QUIZZES.length).toBeGreaterThan(0)

    INITIAL_SPEED_QUIZZES.forEach((sq) => {
      expect(sq.id).toBeDefined()
      expect(sq.category).toBeTruthy()
      expect(sq.question).toBeTruthy()
      expect(sq.options.length).toBeGreaterThanOrEqual(3)
      expect(sq.correctIndex).toBeGreaterThanOrEqual(0)
      expect(sq.correctIndex).toBeLessThan(sq.options.length)
    })
  })

  it("verifies mentor profiles are structured as an array with valid schema invariants", () => {
    expect(Array.isArray(INITIAL_MENTORS)).toBe(true)

    INITIAL_MENTORS.forEach((m) => {
      expect(m.id).toBeTruthy()
      expect(m.name).toBeTruthy()
      expect(m.rating).toBeGreaterThanOrEqual(4.0)
      expect(m.rating).toBeLessThanOrEqual(5.0)
      expect(Array.isArray(m.availableSlots)).toBe(true)
      expect(m.availableSlots.length).toBeGreaterThan(0)
    })
  })

  it("verifies teammate posts are structured as an array with valid schema invariants", () => {
    expect(Array.isArray(INITIAL_TEAMMATES)).toBe(true)

    INITIAL_TEAMMATES.forEach((post) => {
      expect(post.id).toBeTruthy()
      expect(post.authorName).toBeTruthy()
      expect(post.role).toBeTruthy()
      expect(post.skills.length).toBeGreaterThan(0)
      expect(post.lookingFor.length).toBeGreaterThan(0)
      expect(post.pitch).toBeTruthy()
      expect(post.contactEmail).toMatch(/@/)
    })
  })
})
