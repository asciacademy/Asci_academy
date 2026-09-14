// ==============================================================================
// SSVEMHS / ASCI Daily Tasks Engine
// Generates fresh daily quests every calendar day with instant feedback & sync
// ==============================================================================

import { XP_RULES, calculateStreakDailyBonus } from "./gamification"

export interface DailyTask {
  id: string
  title: string
  description: string
  xpReward: number
  category: "checkin" | "lesson" | "challenge" | "review"
  targetCount: number
  currentCount: number
  completed: boolean
  claimed: boolean
  actionUrl?: string
  actionLabel?: string
}

export interface DailyTasksState {
  date: string // YYYY-MM-DD
  tasks: DailyTask[]
  allClaimed: boolean
  masteryBonusClaimed: boolean
  streakCount: number
  longestStreak: number
  lastActiveDate: string
  activeDates: string[] // List of recent active dates YYYY-MM-DD
}

const STORAGE_KEY = "asci_daily_tasks_v1"

export function getTodayDateString(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, "0")
  const day = String(now.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

/**
 * Robust calendar day difference calculation (independent of hours or timezones)
 */
export function getCalendarDayDifference(dateStr1: string, dateStr2: string): number {
  const [y1, m1, d1] = dateStr1.split("-").map(Number)
  const [y2, m2, d2] = dateStr2.split("-").map(Number)
  const d1Utc = Date.UTC(y1, m1 - 1, d1)
  const d2Utc = Date.UTC(y2, m2 - 1, d2)
  return Math.round((d1Utc - d2Utc) / (1000 * 60 * 60 * 24))
}

/**
 * Returns the pool of possible tasks for a given date and streak count
 */
export function generateDailyTasksForDate(dateStr: string, streakCount: number = 1): DailyTask[] {
  // Use simple deterministic pseudo-hash from the date string
  const seed = dateStr.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)

  const algorithmicChallenges = [
    {
      title: "Container With Most Water",
      desc: "Solve or test a two-pointer area scan in the code sandbox.",
      url: "/dsa/problems/1",
    },
    {
      title: "Two Sum & Hash Map Lookup",
      desc: "Implement optimal O(n) key-value complement search.",
      url: "/dsa/problems/425",
    },
    {
      title: "Binary Tree Level Order Traversal",
      desc: "Execute breadth-first queue exploration in Java or Python.",
      url: "/dsa",
    },
    {
      title: "Reverse Linked List in Memory",
      desc: "Trace pointer manipulation and avoid cycles.",
      url: "/dsa",
    },
  ]

  const challengeIndex = seed % algorithmicChallenges.length
  const todayChallenge = algorithmicChallenges[challengeIndex]

  const streakBonus = calculateStreakDailyBonus(streakCount)
  const checkinReward = XP_RULES.DAILY_LOGIN + streakBonus

  return [
    {
      id: `task_checkin_${dateStr}`,
      title: "Daily Scholar Check-in",
      description: streakBonus > 0
        ? `Log in and access workspace (+${streakBonus} XP Streak Multiplier).`
        : "Log in and access your engineering workspace.",
      xpReward: checkinReward,
      category: "checkin",
      targetCount: 1,
      currentCount: 1, // Automatically completed upon opening workspace
      completed: true,
      claimed: false,
      actionLabel: "Claim Check-in",
    },
    {
      id: `task_lesson_${dateStr}`,
      title: "Curriculum Advancement",
      description: "Complete at least 1 interactive curriculum lesson today.",
      xpReward: XP_RULES.LESSON_COMPLETE,
      category: "lesson",
      targetCount: 1,
      currentCount: 0,
      completed: false,
      claimed: false,
      actionUrl: "/programs",
      actionLabel: "Go to Lessons",
    },
    {
      id: `task_algorithm_${dateStr}`,
      title: `Daily Algorithm: ${todayChallenge.title}`,
      description: todayChallenge.desc,
      xpReward: XP_RULES.CHALLENGE_SOLVE,
      category: "challenge",
      targetCount: 1,
      currentCount: 0,
      completed: false,
      claimed: false,
      actionUrl: todayChallenge.url,
      actionLabel: "Open Problem",
    },
  ]
}

/**
 * Get or initialize daily tasks from local storage with robust calendar streak logic
 */
export function getLocalDailyTasksState(): DailyTasksState {
  const today = getTodayDateString()

  if (typeof window === "undefined") {
    return {
      date: today,
      tasks: generateDailyTasksForDate(today, 0),
      allClaimed: false,
      masteryBonusClaimed: false,
      streakCount: 0,
      longestStreak: 0,
      lastActiveDate: today,
      activeDates: [],
    }
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed: DailyTasksState = JSON.parse(raw)
      const prevActiveDates = Array.isArray(parsed.activeDates) ? parsed.activeDates : []
      const activeDates = prevActiveDates.includes(today) ? prevActiveDates : [...prevActiveDates, today].slice(-30)

      if (parsed.date === today) {
        return {
          ...parsed,
          activeDates,
        }
      }

      // Calculate streak change for a new calendar day
      const diffDays = getCalendarDayDifference(today, parsed.lastActiveDate || parsed.date)
      let newStreak = parsed.streakCount || 0

      if (diffDays === 1) {
        // Consecutive calendar day: streak increments
        newStreak += 1
      } else if (diffDays > 1) {
        // Gap of 1 or more full days: streak resets to 1
        newStreak = 1
      }
      // If diffDays === 0, maintain current streak

      const longestStreak = Math.max(parsed.longestStreak || 0, newStreak)

      const newState: DailyTasksState = {
        date: today,
        tasks: generateDailyTasksForDate(today, newStreak),
        allClaimed: false,
        masteryBonusClaimed: false,
        streakCount: newStreak,
        longestStreak,
        lastActiveDate: today,
        activeDates,
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newState))
      return newState
    }
  } catch (e) {
    console.warn("Failed to read daily tasks from storage:", e)
  }

  const initial: DailyTasksState = {
    date: today,
    tasks: generateDailyTasksForDate(today, 0),
    allClaimed: false,
    masteryBonusClaimed: false,
    streakCount: 0,
    longestStreak: 0,
    lastActiveDate: today,
    activeDates: [],
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initial))
  } catch {}
  return initial
}

/**
 * Save daily tasks state
 */
export function saveLocalDailyTasksState(state: DailyTasksState): void {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    // Dispatch event so other components update instantaneously
    window.dispatchEvent(new CustomEvent("asci-gamification-update", { detail: state }))
  } catch (e) {
    console.warn("Failed to persist daily tasks:", e)
  }
}

/**
 * Marks a task completed by category or ID
 */
export function recordDailyTaskProgress(
  category: "checkin" | "lesson" | "challenge" | "review",
  countIncrement = 1
): { state: DailyTasksState; completedJustNow: boolean } {
  const state = getLocalDailyTasksState()
  let completedJustNow = false

  state.tasks = state.tasks.map((task) => {
    if (task.category === category && !task.completed) {
      const newCount = Math.min(task.targetCount, task.currentCount + countIncrement)
      const isDone = newCount >= task.targetCount
      if (isDone) completedJustNow = true
      return {
        ...task,
        currentCount: newCount,
        completed: isDone,
      }
    }
    return task
  })

  saveLocalDailyTasksState(state)
  return { state, completedJustNow }
}

/**
 * Claims reward for a completed daily task
 */
export function claimDailyTaskReward(taskId: string): {
  success: boolean
  xpEarned: number
  allCompleted: boolean
  bonusEarned: number
} {
  const state = getLocalDailyTasksState()
  let xpEarned = 0
  let bonusEarned = 0

  state.tasks = state.tasks.map((task) => {
    if (task.id === taskId && task.completed && !task.claimed) {
      xpEarned = task.xpReward
      return { ...task, claimed: true }
    }
    return task
  })

  const allCompleted = state.tasks.every((t) => t.completed)
  const allClaimed = state.tasks.every((t) => t.claimed)

  if (allCompleted && !state.masteryBonusClaimed) {
    bonusEarned = XP_RULES.DAILY_MASTERY_BONUS
    state.masteryBonusClaimed = true
  }

  state.allClaimed = allClaimed
  saveLocalDailyTasksState(state)

  return {
    success: xpEarned > 0 || bonusEarned > 0,
    xpEarned,
    allCompleted,
    bonusEarned,
  }
}

/**
 * Calculates hours and minutes left until midnight reset
 */
export function getTimeUntilDailyReset(): { hours: number; minutes: number } {
  const now = new Date()
  const midnight = new Date()
  midnight.setHours(24, 0, 0, 0)
  const diffMs = midnight.getTime() - now.getTime()
  const hours = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60)))
  const minutes = Math.max(0, Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60)))
  return { hours, minutes }
}
