"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  Flame,
  CheckCircle2,
  Clock,
  ArrowRight,
  Gift,
  Check,
  Zap,
  X,
  Trophy,
  Shield,
  ChevronRight,
} from "lucide-react"
import {
  DailyTask,
  DailyTasksState,
  getLocalDailyTasksState,
  claimDailyTaskReward,
  getTimeUntilDailyReset,
  getTodayDateString,
} from "@/lib/daily-tasks"
import {
  XP_RULES,
  calculateStreakDailyBonus,
  checkStreakMilestone,
  BADGES_REGISTRY,
} from "@/lib/gamification"
import { OfficialBadgeEmblem } from "./official-badge-emblem"
import { claimDailyTaskServer } from "@/app/actions/gamification"

interface DailyTasksCardProps {
  onXpAwarded?: (amount: number, reason: string) => void
  className?: string
}

// 7-day week generator (Mon -> Sun)
function getWeekDays(activeDates: string[], streakCount: number, todayStr: string) {
  const now = new Date()
  const currentDayIndex = (now.getDay() + 6) % 7 // 0 = Mon, 6 = Sun
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

  return weekDays.map((dayLabel, index) => {
    const diff = index - currentDayIndex
    const d = new Date()
    d.setDate(now.getDate() + diff)
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, "0")
    const dayNum = String(d.getDate()).padStart(2, "0")
    const dateStr = `${y}-${m}-${dayNum}`

    const isToday = index === currentDayIndex
    const isPast = index < currentDayIndex
    const isFuture = index > currentDayIndex

    // Considered active if in activeDates or within current streak chain
    const isActive =
      activeDates.includes(dateStr) ||
      (isToday && streakCount > 0) ||
      (isPast && currentDayIndex - index < streakCount)

    return {
      label: dayLabel[0],
      fullLabel: dayLabel,
      dateStr,
      dayNumber: d.getDate(),
      isToday,
      isPast,
      isFuture,
      isActive,
    }
  })
}

export function DailyTasksCard({ onXpAwarded, className = "" }: DailyTasksCardProps) {
  const [tasksState, setTasksState] = useState<DailyTasksState | null>(null)
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number }>({ hours: 0, minutes: 0 })
  const [claimedNotice, setClaimedNotice] = useState<string | null>(null)
  const [showStreakModal, setShowStreakModal] = useState<boolean>(false)

  useEffect(() => {
    // Load initial state
    const state = getLocalDailyTasksState()
    setTasksState(state)
    setTimeLeft(getTimeUntilDailyReset())

    // Update timer every minute
    const timer = setInterval(() => {
      setTimeLeft(getTimeUntilDailyReset())
    }, 60000)

    // Listen for cross-component updates
    const handleUpdate = (e: any) => {
      if (e.detail) setTasksState(e.detail)
    }
    window.addEventListener("asci-gamification-update", handleUpdate)

    return () => {
      clearInterval(timer)
      window.removeEventListener("asci-gamification-update", handleUpdate)
    }
  }, [])

  if (!tasksState) return null

  const { tasks, streakCount, longestStreak, activeDates = [], masteryBonusClaimed } = tasksState
  const completedCount = tasks.filter((t) => t.completed).length
  const totalTasks = tasks.length
  const allCompleted = completedCount === totalTasks
  const todayStr = getTodayDateString()
  const weekDays = getWeekDays(activeDates, streakCount, todayStr)

  // Streak Badge targets
  const streakBadges = BADGES_REGISTRY.filter((b) => b.category === "streak")
  const nextMilestoneBadge = streakBadges.find((b) => {
    // Parse target from criteriaDescription (e.g. "7-day study streak")
    const match = b.criteriaDescription.match(/(\d+)/)
    const target = match ? parseInt(match[1], 10) : 100
    return streakCount < target
  })

  const nextTargetDays = nextMilestoneBadge
    ? parseInt(nextMilestoneBadge.criteriaDescription.match(/(\d+)/)?.[1] || "30", 10)
    : 100

  const handleClaim = async (taskId: string) => {
    const result = claimDailyTaskReward(taskId)
    if (result.success) {
      const updated = getLocalDailyTasksState()
      setTasksState(updated)

      const totalEarned = result.xpEarned + result.bonusEarned
      const reason =
        result.bonusEarned > 0
          ? `Daily Task + Mastery Bonus (+${totalEarned} XP)`
          : `Daily Task (+${result.xpEarned} XP)`

      setClaimedNotice(`+${totalEarned} XP Claimed!`)
      setTimeout(() => setClaimedNotice(null), 3000)

      onXpAwarded?.(totalEarned, reason)

      // Dispatch global event for celebration toast
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("asci-award-xp", {
            detail: { amount: totalEarned, reason },
          })
        )
      }

      // Sync with Supabase in background
      try {
        await claimDailyTaskServer(taskId, totalEarned)
      } catch (err) {
        console.warn("Background cloud sync for daily task:", err)
      }
    }
  }

  return (
    <>
      <div
        className={`rounded-2xl border border-hairline bg-card p-6 shadow-xs flex flex-col justify-between relative overflow-hidden ${className}`}
      >
        <div>
          {/* Header with Title, Streak, & Reset Countdown */}
          <div className="flex items-center justify-between pb-3 border-b border-hairline mb-4">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20">
                <Trophy className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-normal text-foreground leading-none">
                  Daily Quests
                </h3>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  Resets in {timeLeft.hours}h {timeLeft.minutes}m
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowStreakModal(true)}
                className="flex items-center gap-1.5 text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 border border-blue-500/30 transition-all cursor-pointer active:scale-95 group"
                title="View Streak Badges & Multipliers"
              >
                <Flame className="h-3.5 w-3.5 fill-blue-500 text-blue-500 group-hover:scale-110 transition-transform" />
                <span>{streakCount}d Streak</span>
                <ChevronRight className="h-3 w-3 opacity-60 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Progress Tracker Bar */}
          <div className="mb-3.5">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
                Today's Completion
              </span>
              <span className="text-xs font-mono font-semibold text-primary">
                {completedCount} of {totalTasks} Tasks
              </span>
            </div>
            <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden border border-hairline">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(completedCount / totalTasks) * 100}%` }}
              />
            </div>
          </div>

          {/* 7-Day Flame Week Activity Strip */}
          <div className="mb-4 p-2.5 rounded-xl bg-secondary/40 border border-hairline">
            <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground mb-2">
              <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-semibold">
                <Flame className="h-3 w-3 text-blue-500 fill-blue-500" />
                <span>Week Momentum</span>
              </span>
              <span className="text-[10px] text-blue-500 font-mono font-semibold">
                +{calculateStreakDailyBonus(streakCount)} XP Multiplier
              </span>
            </div>
            <div className="grid grid-cols-7 gap-1.5">
              {weekDays.map((day, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col items-center justify-center py-1.5 px-0.5 rounded-lg transition-all text-center ${
                    day.isToday
                      ? "bg-gradient-to-b from-blue-500/15 to-indigo-500/10 border border-blue-500/40 shadow-xs"
                      : day.isActive
                      ? "bg-blue-500/10 border border-blue-500/20"
                      : "bg-background/40 border border-hairline opacity-60"
                  }`}
                >
                  <span className="text-[9px] font-mono text-muted-foreground uppercase font-semibold">
                    {day.label}
                  </span>
                  <div className="my-1 flex items-center justify-center">
                    {day.isActive ? (
                      <Flame
                        className={`h-3.5 w-3.5 fill-blue-500 text-blue-500 ${
                          day.isToday ? "animate-bounce" : ""
                        }`}
                      />
                    ) : day.isFuture ? (
                      <div className="h-2 w-2 rounded-full border border-muted-foreground/30" />
                    ) : (
                      <div className="h-2 w-2 rounded-full bg-muted-foreground/20" />
                    )}
                  </div>
                  <span className="text-[9px] font-mono text-muted-foreground/80">
                    {day.dayNumber}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* List of Tasks */}
          <div className="space-y-2.5">
            {tasks.map((task) => {
              return (
                <div
                  key={task.id}
                  className={`p-3 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                    task.claimed
                      ? "bg-secondary/40 border-hairline opacity-70"
                      : task.completed
                      ? "bg-primary/5 border-primary/30"
                      : "bg-secondary/70 border-hairline hover:border-foreground/20"
                  }`}
                >
                  <div className="flex items-start gap-2.5 min-w-0">
                    <div
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full mt-0.5 border text-[10px] ${
                        task.claimed
                          ? "bg-emerald-500 text-white border-emerald-600"
                          : task.completed
                          ? "bg-primary/20 text-primary border-primary/40 animate-pulse"
                          : "border-muted-foreground/30 text-transparent"
                      }`}
                    >
                      <Check className="h-3 w-3 stroke-[3]" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className="text-xs font-semibold text-foreground truncate">
                          {task.title}
                        </p>
                        <span className="text-[10px] font-mono font-medium text-primary px-1.5 rounded bg-primary/10 shrink-0">
                          +{task.xpReward} XP
                        </span>
                      </div>
                      <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">
                        {task.description}
                      </p>
                    </div>
                  </div>

                  {/* Task Action Button */}
                  <div className="shrink-0">
                    {task.claimed ? (
                      <span className="text-[10px] font-mono text-muted-foreground uppercase">
                        Claimed
                      </span>
                    ) : task.completed ? (
                      <button
                        type="button"
                        onClick={() => handleClaim(task.id)}
                        className="px-3 py-1 rounded-lg bg-primary hover:bg-primary-active text-primary-foreground text-xs font-semibold shadow-xs cursor-pointer transition-all active:scale-95"
                      >
                        Claim
                      </button>
                    ) : task.actionUrl ? (
                      <Link
                        href={task.actionUrl}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-hairline bg-background hover:bg-secondary text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <span>Start</span>
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    ) : (
                      <span className="text-[10px] font-mono text-muted-foreground">In progress</span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Daily Mastery Bonus Footer */}
        <div className="mt-4 pt-3 border-t border-hairline">
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-secondary/50 border border-hairline">
            <div className="flex items-center gap-2">
              <Gift className="h-4 w-4 text-[#D4B872]" />
              <div>
                <span className="text-xs font-medium text-foreground block">
                  Daily Mastery Bonus
                </span>
                <span className="text-[10px] text-muted-foreground">
                  Finish all 3 quests for +{XP_RULES.DAILY_MASTERY_BONUS} extra XP
                </span>
              </div>
            </div>
            <span
              className={`text-xs font-mono font-semibold px-2 py-0.5 rounded-full ${
                allCompleted
                  ? "bg-emerald-500/15 text-emerald-500 border border-emerald-500/30"
                  : "text-muted-foreground"
              }`}
            >
              {allCompleted ? "Completed" : `${completedCount}/3`}
            </span>
          </div>
        </div>
      </div>

      {/* Streak Journey & Badges Modal */}
      <AnimatePresence>
        {showStreakModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-card border border-border shadow-2xl p-6 text-foreground"
            >
              {/* Top Accent Line */}
              <div className="absolute inset-x-0 top-0 h-1 bg-primary rounded-t-3xl" />

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setShowStreakModal(false)}
                className="absolute top-5 right-5 h-8 w-8 rounded-full bg-secondary hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-500/15 to-indigo-500/15 border border-blue-500/30 flex items-center justify-center">
                  <Flame className="h-7 w-7 text-blue-500 fill-blue-500" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-normal text-foreground">
                    Streak Journey & Badges
                  </h3>
                  <p className="text-xs font-mono text-muted-foreground">
                    Continuous Engineering Momentum · Daily XP Scaling
                  </p>
                </div>
              </div>

              {/* Active Momentum Bento Card */}
              <div className="p-4 rounded-2xl bg-secondary/40 border border-border/80 mb-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-3 rounded-xl bg-card border border-border/60 shadow-2xs">
                    <span className="text-[10px] font-mono text-muted-foreground uppercase block mb-1">
                      Current Streak
                    </span>
                    <span className="font-mono text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {streakCount} <span className="text-xs font-normal text-muted-foreground">Days</span>
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-card border border-border/60 shadow-2xs">
                    <span className="text-[10px] font-mono text-muted-foreground uppercase block mb-1">
                      Longest Streak
                    </span>
                    <span className="font-mono text-2xl font-bold text-foreground">
                      {longestStreak || streakCount}{" "}
                      <span className="text-xs font-normal text-muted-foreground">Days</span>
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-card border border-border/60 shadow-2xs">
                    <span className="text-[10px] font-mono text-muted-foreground uppercase block mb-1">
                      Daily Bonus
                    </span>
                    <span className="font-mono text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                      +{calculateStreakDailyBonus(streakCount)}{" "}
                      <span className="text-xs font-normal text-muted-foreground">XP/d</span>
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-card border border-border/60 shadow-2xs">
                    <span className="text-[10px] font-mono text-muted-foreground uppercase block mb-1">
                      Next Target
                    </span>
                    <span className="font-mono text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                      {nextTargetDays} <span className="text-xs font-normal text-muted-foreground">Days</span>
                    </span>
                  </div>
                </div>

                {/* Progress to Next Milestone */}
                {nextMilestoneBadge && (
                  <div className="mt-4 pt-4 border-t border-border/60">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-foreground font-medium flex items-center gap-1.5">
                        <Trophy className="h-3.5 w-3.5 text-primary" />
                        <span>Next Milestone: {nextMilestoneBadge.title}</span>
                      </span>
                      <span className="font-mono text-primary font-semibold">
                        {streakCount} / {nextTargetDays} Days (+{nextMilestoneBadge.xpReward} XP)
                      </span>
                    </div>
                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden border border-border/40">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min(100, Math.round((streakCount / nextTargetDays) * 100))}%`,
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* All Streak Badges Showcase */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-serif text-base text-foreground">
                    Official Streak Badges
                  </h4>
                  <span className="text-xs font-mono text-muted-foreground">
                    {streakBadges.filter((b) => streakCount >= parseInt(b.criteriaDescription.match(/(\d+)/)?.[1] || "0", 10)).length} of {streakBadges.length} Unlocked
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {streakBadges.map((badge) => {
                    const match = badge.criteriaDescription.match(/(\d+)/)
                    const requiredDays = match ? parseInt(match[1], 10) : 1
                    const isUnlocked = streakCount >= requiredDays

                    return (
                      <div
                        key={badge.id}
                        className={`p-3 rounded-2xl border transition-all flex items-center gap-3.5 ${
                          isUnlocked
                            ? "bg-blue-500/5 border-blue-500/30 shadow-xs"
                            : "bg-secondary/30 border-border/40 opacity-60"
                        }`}
                      >
                        <div className="shrink-0">
                          <OfficialBadgeEmblem
                            badgeId={badge.id}
                            title={badge.title}
                            category="streak"
                            tier={badge.tier}
                            isUnlocked={isUnlocked}
                            size="sm"
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-0.5">
                            <h5 className="font-serif text-sm font-medium text-foreground truncate">
                              {badge.title}
                            </h5>
                            <span
                              className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${
                                badge.tier === "emerald"
                                  ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                                  : badge.tier === "gold"
                                  ? "bg-yellow-500/15 text-yellow-600 dark:text-yellow-400 border border-yellow-500/30"
                                  : badge.tier === "silver"
                                  ? "bg-slate-500/15 text-slate-600 dark:text-slate-400 border border-slate-500/30"
                                  : "bg-blue-600/15 text-blue-600 dark:text-blue-400 border border-blue-600/30"
                              }`}
                            >
                              {badge.tier}
                            </span>
                          </div>
                          <p className="text-[11px] text-muted-foreground line-clamp-1 mb-1">
                            {badge.description}
                          </p>
                          <div className="flex items-center justify-between text-[10px] font-mono">
                            <span className="text-blue-600 dark:text-blue-400 font-semibold">+{badge.xpReward} XP</span>
                            <span className={isUnlocked ? "text-emerald-600 dark:text-emerald-400 font-semibold" : "text-muted-foreground/60"}>
                              {isUnlocked ? "Unlocked ✓" : `${streakCount}/${requiredDays}d`}
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Streak Rules Callout */}
              <div className="p-3.5 rounded-xl bg-secondary/50 border border-border/60 text-xs text-muted-foreground space-y-1">
                <p className="font-semibold text-foreground flex items-center gap-1.5">
                  <Shield className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                  <span>Streak Rules & Multipliers</span>
                </p>
                <p className="text-[11px]">
                  • Log in or complete any lesson/problem before midnight to maintain your streak.
                </p>
                <p className="text-[11px]">
                  • Every consecutive day awards +10 XP per day on daily check-in (up to +100 XP daily bonus).
                </p>
                <p className="text-[11px]">
                  • Unlocking streak milestones awards up to +5,000 XP in bonus rewards.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
