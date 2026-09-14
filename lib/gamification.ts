// ==============================================================================
// SSVEMHS / ASCI Gamification Engine: XP, Ranks, Badges & Achievements
// Aesthetic: Emerald & Pearl editorial styling
// ==============================================================================

export type BadgeCategory = "curriculum" | "mastery" | "streak" | "quests"
export type BadgeTier = "bronze" | "silver" | "gold" | "emerald"

export interface Badge {
  id: string
  title: string
  description: string
  category: BadgeCategory
  tier: BadgeTier
  xpReward: number
  icon: string
  criteriaDescription: string
  checkUnlock: (stats: UserGamificationStats) => boolean
}

export interface UserGamificationStats {
  totalXp: number
  streakCount: number
  lessonsCompleted: number
  coursesCompleted: number
  challengesSolved: number
  dailyTasksCompletedTotal: number
  consecutivePerfectDays: number
}

export interface UnlockedBadge {
  badgeId: string
  unlockedAt: string
}

export interface XpRewardRule {
  key: string
  amount: number
  label: string
}

// Points & XP Rules
export const XP_RULES = {
  DAILY_LOGIN: 25,
  LESSON_COMPLETE: 100,
  CHALLENGE_SOLVE: 150,
  CONCEPT_QUIZ_PASS: 50,
  MODULE_COMPLETE: 200,
  COURSE_GRADUATE: 500,
  DAILY_TASK_ITEM: 50,
  DAILY_MASTERY_BONUS: 100,
  STREAK_DAILY_BONUS_PER_DAY: 10,
  STREAK_1_DAY: 50,
  STREAK_3_DAYS: 100,
  STREAK_7_DAYS: 250,
  STREAK_14_DAYS: 500,
  STREAK_30_DAYS: 1000,
  STREAK_60_DAYS: 2500,
  STREAK_100_DAYS: 5000,
} as const

export function calculateStreakDailyBonus(streakCount: number): number {
  return Math.min(Math.max(1, streakCount) * XP_RULES.STREAK_DAILY_BONUS_PER_DAY, 100)
}

export function checkStreakMilestone(streakCount: number): {
  isMilestone: boolean
  xpBonus: number
  badgeId: string
  label: string
} | null {
  switch (streakCount) {
    case 1:
      return { isMilestone: true, xpBonus: XP_RULES.STREAK_1_DAY, badgeId: "streak_spark", label: "Day 1: First Spark!" }
    case 3:
      return { isMilestone: true, xpBonus: XP_RULES.STREAK_3_DAYS, badgeId: "streak_habit", label: "3-Day Streak: Three's a Habit!" }
    case 7:
      return { isMilestone: true, xpBonus: XP_RULES.STREAK_7_DAYS, badgeId: "week_on_fire", label: "7-Day Streak: Week on Fire!" }
    case 14:
      return { isMilestone: true, xpBonus: XP_RULES.STREAK_14_DAYS, badgeId: "fortnight_titan", label: "14-Day Streak: Fortnight Titan!" }
    case 30:
      return { isMilestone: true, xpBonus: XP_RULES.STREAK_30_DAYS, badgeId: "thirty_suns", label: "30-Day Streak: Thirty Suns Reached!" }
    case 60:
      return { isMilestone: true, xpBonus: XP_RULES.STREAK_60_DAYS, badgeId: "relentless_force", label: "60-Day Streak: Relentless Force!" }
    case 100:
      return { isMilestone: true, xpBonus: XP_RULES.STREAK_100_DAYS, badgeId: "centurion_immortal", label: "100-Day Streak: Centurion Immortal!" }
    default:
      return null
  }
}

// Rank Tier System
export interface RankInfo {
  title: string
  minXp: number
  tierLevel: number
  badgeColor: string
  description: string
}

export const RANKS: RankInfo[] = [
  {
    title: "Initiate",
    minXp: 0,
    tierLevel: 1,
    badgeColor: "bg-zinc-500/15 text-zinc-400 border-zinc-500/30",
    description: "Foundational scholar discovering core algorithmic principles.",
  },
  {
    title: "Operative",
    minXp: 500,
    tierLevel: 2,
    badgeColor: "bg-amber-500/15 text-amber-500 border-amber-500/30",
    description: "Active practitioner solving real-world code structures.",
  },
  {
    title: "Specialist",
    minXp: 2000,
    tierLevel: 3,
    badgeColor: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30",
    description: "Experienced engineer mastering frameworks and scalable patterns.",
  },
  {
    title: "Architect",
    minXp: 5000,
    tierLevel: 4,
    badgeColor: "bg-teal-500/15 text-teal-400 border-teal-500/30",
    description: "Advanced systems designer architecting high-throughput workloads.",
  },
  {
    title: "Prime Master",
    minXp: 10000,
    tierLevel: 5,
    badgeColor: "bg-[#D4B872]/20 text-[#D4B872] border-[#D4B872]/40",
    description: "Top-tier engineering fellow possessing deep algorithmic mastery.",
  },
]

export function calculateRank(xp: number): RankInfo {
  for (let i = RANKS.length - 1; i >= 0; i--) {
    if (xp >= RANKS[i].minXp) {
      return RANKS[i]
    }
  }
  return RANKS[0]
}

export function calculateLevel(xp: number): {
  level: number
  currentLevelXp: number
  xpToNextLevel: number
  progressPercent: number
} {
  const XP_PER_LEVEL = 1000
  const level = Math.floor(xp / XP_PER_LEVEL) + 1
  const currentLevelXp = xp % XP_PER_LEVEL
  const xpToNextLevel = XP_PER_LEVEL
  const progressPercent = Math.min(100, Math.round((currentLevelXp / xpToNextLevel) * 100))

  return {
    level,
    currentLevelXp,
    xpToNextLevel,
    progressPercent,
  }
}

// 16 Collectible Badges Registry
export const BADGES_REGISTRY: Badge[] = [
  // --- Category 1: Curriculum & Progress ---
  {
    id: "first_byte",
    title: "First Byte",
    description: "Completed your first interactive lesson on the ASCI portal.",
    category: "curriculum",
    tier: "bronze",
    xpReward: 50,
    icon: "Sparkles",
    criteriaDescription: "Complete 1 lesson",
    checkUnlock: (s) => s.lessonsCompleted >= 1,
  },
  {
    id: "curriculum_initiate",
    title: "Curriculum Initiate",
    description: "Demonstrated early momentum with 5 completed lessons.",
    category: "curriculum",
    tier: "bronze",
    xpReward: 100,
    icon: "BookOpen",
    criteriaDescription: "Complete 5 lessons",
    checkUnlock: (s) => s.lessonsCompleted >= 5,
  },
  {
    id: "knowledge_seeker",
    title: "Knowledge Seeker",
    description: "Surpassed 15 curriculum lessons across our specialized tracks.",
    category: "curriculum",
    tier: "silver",
    xpReward: 200,
    icon: "Layers",
    criteriaDescription: "Complete 15 lessons",
    checkUnlock: (s) => s.lessonsCompleted >= 15,
  },
  {
    id: "code_architect",
    title: "Code Architect",
    description: "Completed 30 comprehensive lessons with high technical rigor.",
    category: "curriculum",
    tier: "gold",
    xpReward: 350,
    icon: "Cpu",
    criteriaDescription: "Complete 30 lessons",
    checkUnlock: (s) => s.lessonsCompleted >= 30,
  },
  {
    id: "track_graduate",
    title: "Track Graduate",
    description: "Achieved 100% completion in a master engineering track.",
    category: "curriculum",
    tier: "gold",
    xpReward: 500,
    icon: "GraduationCap",
    criteriaDescription: "Complete 1 full course",
    checkUnlock: (s) => s.coursesCompleted >= 1,
  },
  {
    id: "polymath",
    title: "Polymath Scholar",
    description: "Graduated from 3 complete courses across DSA and systems.",
    category: "curriculum",
    tier: "emerald",
    xpReward: 1000,
    icon: "Award",
    criteriaDescription: "Complete 3 full courses",
    checkUnlock: (s) => s.coursesCompleted >= 3,
  },

  // --- Category 2: Algorithmic & Code Mastery ---
  {
    id: "algorithm_solver",
    title: "Algorithm Solver",
    description: "Solved your first in-browser code compilation challenge.",
    category: "mastery",
    tier: "bronze",
    xpReward: 100,
    icon: "Terminal",
    criteriaDescription: "Solve 1 code challenge",
    checkUnlock: (s) => s.challengesSolved >= 1,
  },
  {
    id: "binary_samurai",
    title: "Binary Samurai",
    description: "Successfully passed test cases on 10 algorithmic problems.",
    category: "mastery",
    tier: "silver",
    xpReward: 250,
    icon: "Code2",
    criteriaDescription: "Solve 10 code challenges",
    checkUnlock: (s) => s.challengesSolved >= 10,
  },
  {
    id: "runtime_optimizer",
    title: "Runtime Optimizer",
    description: "Demonstrated mastery over time and space complexity.",
    category: "mastery",
    tier: "gold",
    xpReward: 400,
    icon: "Zap",
    criteriaDescription: "Solve 25 code challenges",
    checkUnlock: (s) => s.challengesSolved >= 25,
  },

  // --- Category 3: Consistency & Streaks ---
  {
    id: "streak_spark",
    title: "First Spark",
    description: "Ignited your engineering momentum with your first active day.",
    category: "streak",
    tier: "bronze",
    xpReward: 50,
    icon: "Flame",
    criteriaDescription: "1-day study streak",
    checkUnlock: (s) => s.streakCount >= 1,
  },
  {
    id: "streak_habit",
    title: "Three's a Habit",
    description: "Maintained a continuous 3-day study and practice streak.",
    category: "streak",
    tier: "bronze",
    xpReward: 100,
    icon: "Flame",
    criteriaDescription: "3-day study streak",
    checkUnlock: (s) => s.streakCount >= 3,
  },
  {
    id: "week_on_fire",
    title: "Week on Fire",
    description: "Logged in and completed curriculum tasks 7 days consecutively.",
    category: "streak",
    tier: "silver",
    xpReward: 250,
    icon: "Flame",
    criteriaDescription: "7-day study streak",
    checkUnlock: (s) => s.streakCount >= 7,
  },
  {
    id: "fortnight_titan",
    title: "Fortnight Titan",
    description: "Unbroken 14-day study streak of continuous engineering momentum.",
    category: "streak",
    tier: "gold",
    xpReward: 500,
    icon: "Shield",
    criteriaDescription: "14-day study streak",
    checkUnlock: (s) => s.streakCount >= 14,
  },
  {
    id: "thirty_suns",
    title: "Thirty Suns",
    description: "Achieved a legendary 30-day streak of algorithmic discipline.",
    category: "streak",
    tier: "gold",
    xpReward: 1000,
    icon: "Trophy",
    criteriaDescription: "30-day study streak",
    checkUnlock: (s) => s.streakCount >= 30,
  },
  {
    id: "century_legend",
    title: "Century Legend",
    description: "Honoring 30 days of unbroken algorithmic focus and coding practice.",
    category: "streak",
    tier: "gold",
    xpReward: 1000,
    icon: "Trophy",
    criteriaDescription: "30-day study streak",
    checkUnlock: (s) => s.streakCount >= 30,
  },
  {
    id: "relentless_force",
    title: "Relentless Force",
    description: "Completed 60 consecutive days of daily software engineering practice.",
    category: "streak",
    tier: "emerald",
    xpReward: 2500,
    icon: "Flame",
    criteriaDescription: "60-day study streak",
    checkUnlock: (s) => s.streakCount >= 60,
  },
  {
    id: "centurion_immortal",
    title: "Centurion Immortal",
    description: "Ascended into legend with 100 continuous days of code mastery.",
    category: "streak",
    tier: "emerald",
    xpReward: 5000,
    icon: "Award",
    criteriaDescription: "100-day study streak",
    checkUnlock: (s) => s.streakCount >= 100,
  },

  // --- Category 4: Daily Quests & Mastery ---
  {
    id: "daily_striver",
    title: "Daily Striver",
    description: "Completed all 3 daily tasks in a single day.",
    category: "quests",
    tier: "bronze",
    xpReward: 100,
    icon: "CheckCircle2",
    criteriaDescription: "Complete all daily quests once",
    checkUnlock: (s) => s.dailyTasksCompletedTotal >= 3,
  },
  {
    id: "quest_champion",
    title: "Quest Champion",
    description: "Finished all daily tasks across 5 separate calendar days.",
    category: "quests",
    tier: "silver",
    xpReward: 300,
    icon: "Compass",
    criteriaDescription: "Complete daily quests on 5 days",
    checkUnlock: (s) => s.dailyTasksCompletedTotal >= 15,
  },
  {
    id: "grand_master_prime",
    title: "Grand Master: Prime",
    description: "Amassed over 10,000 verified XP on the academic portal.",
    category: "quests",
    tier: "emerald",
    xpReward: 1000,
    icon: "Award",
    criteriaDescription: "Reach 10,000 XP (Prime Clearance)",
    checkUnlock: (s) => s.totalXp >= 10000,
  },
]

export const BADGE_TIER_STYLES = {
  bronze: {
    badge: "border-amber-700/40 bg-amber-950/20 text-amber-500",
    glow: "rgba(180, 83, 9, 0.2)",
    label: "Bronze",
  },
  silver: {
    badge: "border-zinc-400/40 bg-zinc-900/30 text-zinc-300",
    glow: "rgba(212, 212, 216, 0.2)",
    label: "Silver",
  },
  gold: {
    badge: "border-[#D4B872]/50 bg-[#D4B872]/10 text-[#D4B872]",
    glow: "rgba(212, 184, 114, 0.25)",
    label: "Gold",
  },
  emerald: {
    badge: "border-emerald-500/50 bg-emerald-950/30 text-emerald-400",
    glow: "rgba(16, 185, 129, 0.3)",
    label: "Emerald",
  },
}
