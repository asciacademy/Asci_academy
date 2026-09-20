import crypto from "node:crypto"

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

/**
 * Validates if the given input is a valid standard UUID string format.
 */
export function isUuid(val: unknown): boolean {
  if (typeof val !== "string") return false
  return UUID_REGEX.test(val.trim())
}

/**
 * Deterministically maps any arbitrary string key/slug to a valid RFC-compliant UUID v4/v5 format.
 * If the input is already a valid UUID, returns it in lowercase without re-hashing.
 * If the input is empty or nullish, returns standard nil UUID ("00000000-0000-0000-0000-000000000000").
 */
export function stringToUuid(input: string, namespace = ""): string {
  if (!input || typeof input !== "string" || !input.trim()) {
    return "00000000-0000-0000-0000-000000000000"
  }

  const trimmed = input.trim().toLowerCase()
  if (isUuid(trimmed)) {
    return trimmed
  }

  const payload = namespace ? `${namespace.toLowerCase().trim()}:${trimmed}` : trimmed
  const hash = crypto.createHash("sha256").update(payload).digest("hex")

  // Format as 8-4-4-4-12 RFC 4122 variant compliant
  const p1 = hash.substring(0, 8)
  const p2 = hash.substring(8, 12)
  const p3 = "4" + hash.substring(13, 16) // version 4 indicator
  const p4Hex = parseInt(hash.substring(16, 18), 16)
  const p4 = ((p4Hex & 0x3f) | 0x80).toString(16).padStart(2, "0") + hash.substring(18, 20)
  const p5 = hash.substring(20, 32)

  return `${p1}-${p2}-${p3}-${p4}-${p5}`
}

/**
 * Deterministically maps a course slug into a repeatable, namespace-isolated UUID.
 */
export function courseSlugToUuid(slug: string): string {
  return stringToUuid(slug, "course")
}

/**
 * Deterministically maps a lesson identifier into a repeatable, namespace-isolated UUID.
 */
export function lessonIdToUuid(lessonId: string): string {
  return stringToUuid(lessonId, "lesson")
}

/**
 * Deterministically maps a module identifier into a repeatable, namespace-isolated UUID.
 */
export function moduleIdToUuid(moduleId: string): string {
  return stringToUuid(moduleId, "module")
}
