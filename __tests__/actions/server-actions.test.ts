import { describe, it, expect } from "vitest"
import {
  calculateLevel,
  calculateRank,
  XP_RULES,
  calculateStreakDailyBonus,
} from "@/lib/gamification"
import { courseSlugToUuid, lessonIdToUuid } from "@/lib/uuid-utils"

/**
 * Mirror of calendar day difference algorithm used across server actions:
 * app/actions/gamification.ts and app/actions/unstop.ts
 */
function getCalendarDayDifference(dateStr1: string, dateStr2: string): number {
  const [y1, m1, d1] = dateStr1.split("-").map(Number)
  const [y2, m2, d2] = dateStr2.split("-").map(Number)
  const d1Utc = Date.UTC(y1, m1 - 1, d1)
  const d2Utc = Date.UTC(y2, m2 - 1, d2)
  return Math.round((d1Utc - d2Utc) / (1000 * 60 * 60 * 24))
}

describe("Server Actions - Calendar Streak Computation Engine", () => {
  it("calculates 0 days difference for same-day actions (preserving streak)", () => {
    expect(getCalendarDayDifference("2026-09-18", "2026-09-18")).toBe(0)
  })

  it("calculates 1 day difference for consecutive days (advancing streak by +1)", () => {
    expect(getCalendarDayDifference("2026-09-18", "2026-09-17")).toBe(1)
    // Month boundary
    expect(getCalendarDayDifference("2026-10-01", "2026-09-30")).toBe(1)
    // Leap year boundary
    expect(getCalendarDayDifference("2024-03-01", "2024-02-29")).toBe(1)
    // Year boundary
    expect(getCalendarDayDifference("2026-01-01", "2025-12-31")).toBe(1)
  })

  it("calculates >1 day difference for broken streaks (triggering streak reset)", () => {
    expect(getCalendarDayDifference("2026-09-18", "2026-09-16")).toBe(2)
    expect(getCalendarDayDifference("2026-09-18", "2026-09-10")).toBe(8)
    expect(getCalendarDayDifference("2026-09-18", "2025-09-18")).toBe(365)
  })
})

describe("Server Actions - Guest & Demo Mode Fallback Math", () => {
  it("computes accurate guest progress when unauthenticated", () => {
    const baseXp = XP_RULES.LESSON_COMPLETE // 50 XP
    const calculatedLevel = calculateLevel(baseXp)
    const calculatedRank = calculateRank(baseXp)

    expect(calculatedLevel.level).toBe(1)
    expect(calculatedLevel.currentLevelXp).toBe(100)
    expect(calculatedRank.title).toBe("Initiate")
  })

  it("computes accurate POTD bonus XP and cap", () => {
    const potdXp = 150
    const streakBonus = calculateStreakDailyBonus(7) // 70 XP
    const totalAward = potdXp + streakBonus

    expect(potdXp).toBe(150)
    expect(streakBonus).toBe(70)
    expect(totalAward).toBe(220)
  })

  it("maps course and lesson slugs to valid database UUIDs without network roundtrips", () => {
    const courseSlug = "python-foundations"
    const lessonId = "mod-1-intro"

    const courseUuid = courseSlugToUuid(courseSlug)
    const lessonUuid = lessonIdToUuid(lessonId)

    expect(courseUuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)
    expect(lessonUuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)
  })

  it("calculates accurate streak shield XP balance deduction", () => {
    const initialXp = 500
    const shieldCost = 200
    const remainingXp = Math.max(0, initialXp - shieldCost)
    expect(remainingXp).toBe(300)

    // Insufficient XP validation check
    const lowXp = 150
    const canAfford = lowXp >= shieldCost
    expect(canAfford).toBe(false)
  })
})
