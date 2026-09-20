import { describe, it, expect } from "vitest"
import {
  calculateLevel,
  calculateRank,
  calculateStreakDailyBonus,
  checkStreakMilestone,
  BADGES_REGISTRY,
  XP_RULES,
  UserGamificationStats,
} from "@/lib/gamification"

describe("Gamification Engine - Level & Rank Logic", () => {
  it("calculates level 1 for 0 XP with 0% progress", () => {
    const result = calculateLevel(0)
    expect(result.level).toBe(1)
    expect(result.currentLevelXp).toBe(0)
    expect(result.xpToNextLevel).toBe(1000)
    expect(result.progressPercent).toBe(0)
  })

  it("calculates level 1 for 999 XP with 99% or 100% progress", () => {
    const result = calculateLevel(999)
    expect(result.level).toBe(1)
    expect(result.currentLevelXp).toBe(999)
    expect(result.progressPercent).toBe(100)
  })

  it("advances to level 2 at exactly 1000 XP with 0% level 2 progress", () => {
    const result = calculateLevel(1000)
    expect(result.level).toBe(2)
    expect(result.currentLevelXp).toBe(0)
    expect(result.progressPercent).toBe(0)
  })

  it("calculates high levels accurately (e.g., 10,500 XP is level 11)", () => {
    const result = calculateLevel(10500)
    expect(result.level).toBe(11)
    expect(result.currentLevelXp).toBe(500)
    expect(result.progressPercent).toBe(50)
  })

  it("assigns ranks correctly based on XP thresholds", () => {
    expect(calculateRank(0).title).toBe("Initiate")
    expect(calculateRank(499).title).toBe("Initiate")
    expect(calculateRank(500).title).toBe("Operative")
    expect(calculateRank(1999).title).toBe("Operative")
    expect(calculateRank(2000).title).toBe("Specialist")
    expect(calculateRank(4999).title).toBe("Specialist")
    expect(calculateRank(5000).title).toBe("Architect")
    expect(calculateRank(9999).title).toBe("Architect")
    expect(calculateRank(10000).title).toBe("Prime Master")
    expect(calculateRank(50000).title).toBe("Prime Master")
  })
})

describe("Gamification Engine - Streak Multipliers & Milestones", () => {
  it("calculates daily streak bonuses scaled linearly up to 100 XP cap", () => {
    expect(calculateStreakDailyBonus(1)).toBe(10)
    expect(calculateStreakDailyBonus(5)).toBe(50)
    expect(calculateStreakDailyBonus(10)).toBe(100)
    expect(calculateStreakDailyBonus(30)).toBe(100) // capped at 100
  })

  it("identifies official streak milestones", () => {
    const day1 = checkStreakMilestone(1)
    expect(day1).not.toBeNull()
    expect(day1?.badgeId).toBe("streak_spark")
    expect(day1?.xpBonus).toBe(XP_RULES.STREAK_1_DAY)

    const day3 = checkStreakMilestone(3)
    expect(day3?.badgeId).toBe("streak_habit")

    const day7 = checkStreakMilestone(7)
    expect(day7?.badgeId).toBe("week_on_fire")

    const day14 = checkStreakMilestone(14)
    expect(day14?.badgeId).toBe("fortnight_titan")

    const day30 = checkStreakMilestone(30)
    expect(day30?.badgeId).toBe("thirty_suns")

    const day60 = checkStreakMilestone(60)
    expect(day60?.badgeId).toBe("relentless_force")

    const day100 = checkStreakMilestone(100)
    expect(day100?.badgeId).toBe("centurion_immortal")

    // Non-milestone days return null
    expect(checkStreakMilestone(2)).toBeNull()
    expect(checkStreakMilestone(4)).toBeNull()
    expect(checkStreakMilestone(15)).toBeNull()
  })
})

describe("Gamification Engine - Badge Registry Unlocks", () => {
  it("has exactly 20 registered badges across curriculum, mastery, streaks, and quests", () => {
    expect(BADGES_REGISTRY.length).toBe(20)
  })

  it("verifies badge criteria checks against realistic stats", () => {
    const beginnerStats: UserGamificationStats = {
      totalXp: 150,
      streakCount: 1,
      lessonsCompleted: 1,
      coursesCompleted: 0,
      challengesSolved: 0,
      dailyTasksCompletedTotal: 0,
      consecutivePerfectDays: 0,
    }

    const firstByteBadge = BADGES_REGISTRY.find((b) => b.id === "first_byte")
    expect(firstByteBadge).toBeDefined()
    expect(firstByteBadge?.checkUnlock(beginnerStats)).toBe(true)

    const curriculumInitiateBadge = BADGES_REGISTRY.find((b) => b.id === "curriculum_initiate")
    expect(curriculumInitiateBadge?.checkUnlock(beginnerStats)).toBe(false)

    // Upgraded stats
    const advancedStats: UserGamificationStats = {
      totalXp: 12000,
      streakCount: 35,
      lessonsCompleted: 55,
      coursesCompleted: 3,
      challengesSolved: 50,
      dailyTasksCompletedTotal: 30,
      consecutivePerfectDays: 7,
    }

    expect(curriculumInitiateBadge?.checkUnlock(advancedStats)).toBe(true)
    const polymathBadge = BADGES_REGISTRY.find((b) => b.id === "polymath")
    expect(polymathBadge?.checkUnlock(advancedStats)).toBe(true) // >= 3 courses completed
  })
})
