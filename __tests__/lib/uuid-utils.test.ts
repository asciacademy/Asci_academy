import { describe, it, expect } from "vitest"
import {
  isUuid,
  stringToUuid,
  courseSlugToUuid,
  lessonIdToUuid,
  moduleIdToUuid,
} from "@/lib/uuid-utils"

describe("UUID Utility - Deterministic Mappings & Validation", () => {
  it("correctly identifies valid and invalid UUIDs", () => {
    // Valid UUID v4
    expect(isUuid("123e4567-e89b-12d3-a456-426614174000")).toBe(true)
    expect(isUuid("d3b07384-d113-40bf-bfb4-106596e74b33")).toBe(true)

    // Invalid UUIDs
    expect(isUuid("")).toBe(false)
    expect(isUuid("not-a-uuid")).toBe(false)
    expect(isUuid("12345678-1234-1234-1234-12345678901")).toBe(false) // too short
    expect(isUuid(12345)).toBe(false)
    expect(isUuid(null)).toBe(false)
    expect(isUuid(undefined)).toBe(false)
  })

  it("returns fallback nil UUID for empty string input", () => {
    expect(stringToUuid("")).toBe("00000000-0000-0000-0000-000000000000")
  })

  it("returns existing UUID unchanged if already valid", () => {
    const valid = "123e4567-e89b-12d3-a456-426614174000"
    expect(stringToUuid(valid)).toBe(valid.toLowerCase())
  })

  it("deterministically hashes strings to valid UUIDs with 100% repeatability", () => {
    const slug = "python-for-z"
    const uuid1 = courseSlugToUuid(slug)
    const uuid2 = courseSlugToUuid(slug)

    expect(uuid1).toBe(uuid2)
    expect(isUuid(uuid1)).toBe(true)
  })

  it("produces distinct UUIDs for different namespaces on the same input", () => {
    const input = "intro-module-1"
    const courseUuid = courseSlugToUuid(input)
    const lessonUuid = lessonIdToUuid(input)
    const moduleUuid = moduleIdToUuid(input)

    expect(courseUuid).not.toBe(lessonUuid)
    expect(lessonUuid).not.toBe(moduleUuid)
    expect(courseUuid).not.toBe(moduleUuid)

    expect(isUuid(courseUuid)).toBe(true)
    expect(isUuid(lessonUuid)).toBe(true)
    expect(isUuid(moduleUuid)).toBe(true)
  })

  it("normalizes case and whitespace when hashing", () => {
    const uuid1 = courseSlugToUuid("  React-19-Foundations  ")
    const uuid2 = courseSlugToUuid("react-19-foundations")

    expect(uuid1).toBe(uuid2)
  })
})
