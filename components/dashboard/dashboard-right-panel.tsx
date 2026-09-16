"use client"

import React, { useState } from "react"
import {
  Flame, Target, Trophy, BookOpen, CheckCircle,
  ChevronLeft, ChevronRight, Info, Clock, Sparkles, Zap
} from "lucide-react"

interface DashboardRightPanelProps {
  userName: string
  effectiveAvatar?: string | null
  rank: string
  totalXP: number
  streak: number
  currentLevel: number
  weeklyActivity: { day: string; minutes: number; solved: number }[]
  coursesInProgressCount?: number
  coursesCompletedCount?: number
  isEditingName?: boolean
  setIsEditingName?: (val: boolean) => void
  editedName?: string
  setEditedName?: (val: string) => void
  handleSaveName?: (e?: React.FormEvent) => Promise<void>
  isSavingName?: boolean
  setShowAvatarPicker?: (val: boolean) => void
  onClosePanel?: () => void
  showCloseButton?: boolean
}

export function DashboardRightPanel({
  userName,
  effectiveAvatar,
  rank,
  totalXP,
  streak,
  currentLevel,
  weeklyActivity = [],
  coursesInProgressCount = 0,
  coursesCompletedCount = 0,
}: DashboardRightPanelProps) {

  const currentMonthYear = new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" })
  const [selectedMonth] = useState(currentMonthYear)
  const [currentWeekIndex, setCurrentWeekIndex] = useState(4)

  // Build 7-day streak pills
  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  const today = new Date()
  const currentDayOfWeek = (today.getDay() + 6) % 7

  const streakDays = dayNames.map((name, index) => {
    const diff = index - currentDayOfWeek
    const d = new Date(today)
    d.setDate(today.getDate() + diff)
    const dayDate = d.getDate().toString()
    const matchingActivity = weeklyActivity.find((w) =>
      w.day.toLowerCase().startsWith(name.toLowerCase())
    )
    const isActive = matchingActivity
      ? matchingActivity.minutes > 0 || matchingActivity.solved > 0
      : index <= currentDayOfWeek && streak > 0
    return { name, date: dayDate, active: isActive }
  })

  // Build bar chart data
  const maxWatchMinutes = Math.max(60, ...weeklyActivity.map((w) => w.minutes || 0))
  const watchTimeData = dayNames.map((day) => {
    const act = weeklyActivity.find((w) => w.day.toLowerCase().startsWith(day.toLowerCase()))
    const mins = act ? act.minutes || 0 : 0
    const hrs = mins / 60
    const hrStr = Math.floor(hrs)
    const minStr = Math.round(mins % 60)
    const label = `${hrStr}h ${minStr}m`
    const isPeak = maxWatchMinutes > 0 && mins === maxWatchMinutes && mins > 0
    return { day, hours: hrs, minutes: mins, label, isPeak }
  })
  const maxHours = Math.max(4, Math.ceil(maxWatchMinutes / 60) + 1)
  const totalWeekMinutes = weeklyActivity.reduce((acc, w) => acc + (w.minutes || 0), 0)
  const totalWeekHrs = Math.floor(totalWeekMinutes / 60)
  const totalWeekMins = totalWeekMinutes % 60
  const totalSolved = weeklyActivity.reduce((acc, w) => acc + (w.solved || 0), 0)

  return (
    <aside className="w-full space-y-4">

      {/* ── 1. Weekly Streak Card ── */}
      <div className="rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900/60 p-5 shadow-xs space-y-4">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-bold text-foreground">Weekly Streak</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="font-mono bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded-lg border border-stone-200 dark:border-stone-700">
              {selectedMonth}
            </span>
          </div>
        </div>

        {/* Week nav */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">Week {currentWeekIndex} of 4</span>
          <div className="flex items-center gap-0.5">
            <button
              onClick={() => setCurrentWeekIndex(Math.max(1, currentWeekIndex - 1))}
              className="p-1 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setCurrentWeekIndex(Math.min(4, currentWeekIndex + 1))}
              className="p-1 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 7-day pill strip */}
        <div className="grid grid-cols-7 gap-1">
          {streakDays.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col items-center py-2 px-0.5 rounded-xl transition-all ${
                item.active
                  ? "bg-gradient-to-b from-amber-500 to-orange-500 text-white shadow-sm shadow-orange-500/20"
                  : "bg-stone-100 dark:bg-stone-800/60 text-foreground"
              }`}
            >
              <span className={`text-[9px] font-medium mb-1 ${item.active ? "text-amber-100" : "text-muted-foreground"}`}>
                {item.name}
              </span>
              <span className={`text-[11px] font-bold ${item.active ? "text-white" : "text-foreground"}`}>
                {item.date}
              </span>
              {item.active && (
                <span className="text-[8px] mt-0.5">🔥</span>
              )}
            </div>
          ))}
        </div>

        {/* 2 mini stat boxes */}
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-100 dark:border-stone-700/60 space-y-1">
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-xs font-bold text-foreground">{coursesInProgressCount}</span>
            </div>
            <div className="text-[10px] text-muted-foreground">In Progress</div>
          </div>
          <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-100 dark:border-stone-700/60 space-y-1">
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-xs font-bold text-foreground">{coursesCompletedCount}</span>
            </div>
            <div className="text-[10px] text-muted-foreground">Completed</div>
          </div>
        </div>
      </div>

      {/* ── 2. Weekly Study Time Chart ── */}
      <div className="rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900/60 p-5 shadow-xs space-y-4">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-sky-500" />
            <span className="text-sm font-bold text-foreground">Study Time</span>
          </div>
          <span className="text-xs font-mono text-muted-foreground bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded-lg border border-stone-200 dark:border-stone-700">
            This Week
          </span>
        </div>

        {/* Summary row */}
        <div className="flex items-center gap-4">
          <div>
            <div className="text-xl font-bold text-foreground tabular-nums">
              {totalWeekHrs}h {totalWeekMins}m
            </div>
            <div className="text-[11px] text-muted-foreground">Total this week</div>
          </div>
          {totalSolved > 0 && (
            <>
              <div className="w-px h-8 bg-stone-200 dark:bg-stone-700" />
              <div>
                <div className="text-xl font-bold text-foreground tabular-nums">{totalSolved}</div>
                <div className="text-[11px] text-muted-foreground">Problems solved</div>
              </div>
            </>
          )}
        </div>

        {/* Bar chart */}
        <div className="relative pt-2">
          {/* Grid lines */}
          <div className="space-y-5 text-[10px] text-muted-foreground/60 font-mono">
            {[maxHours, Math.round(maxHours / 2), 0].map((label) => (
              <div key={label} className="flex items-center gap-2">
                <span className="w-5 text-right shrink-0">{label}h</span>
                <div className="flex-1 border-b border-stone-100 dark:border-stone-800" />
              </div>
            ))}
          </div>

          {/* Bars */}
          <div className="absolute inset-x-0 bottom-5 pl-8 pr-1 h-24 flex items-end justify-between gap-1">
            {watchTimeData.map((item) => {
              const heightPct = item.hours > 0
                ? Math.max(6, Math.min(100, Math.round((item.hours / maxHours) * 100)))
                : 3
              return (
                <div key={item.day} className="flex flex-col items-center gap-0 relative group flex-1">
                  {/* Peak tooltip */}
                  {item.isPeak && (
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-10 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-[9px] font-bold px-1.5 py-0.5 rounded-md shadow whitespace-nowrap">
                      {item.label}
                    </div>
                  )}
                  <div
                    className={`w-full max-w-[18px] rounded-t-lg rounded-b-sm transition-all duration-500 ${
                      item.isPeak
                        ? "bg-gradient-to-t from-orange-500 to-amber-400 shadow-sm shadow-amber-500/30"
                        : "bg-stone-200 dark:bg-stone-700 group-hover:bg-amber-300 dark:group-hover:bg-amber-600"
                    }`}
                    style={{ height: `${heightPct}%` }}
                    title={`${item.day}: ${item.label}`}
                  />
                </div>
              )
            })}
          </div>

          {/* X-axis labels */}
          <div className="flex justify-between pl-8 pr-1 pt-2 gap-1">
            {watchTimeData.map((item) => (
              <span key={item.day} className="flex-1 text-center text-[9px] font-medium text-muted-foreground truncate">
                {item.day}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── 3. Quick Stats Row ── */}
      <div className="grid grid-cols-3 gap-2.5">
        <div className="rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900/60 p-3 text-center shadow-xs space-y-1">
          <div className="flex items-center justify-center gap-1 text-orange-500">
            <Flame className="w-3.5 h-3.5" />
            <span className="text-sm font-bold text-foreground tabular-nums">
              {streak > 0 ? streak : 0}
            </span>
          </div>
          <div className="text-[10px] text-muted-foreground">Day Streak</div>
        </div>

        <div className="rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900/60 p-3 text-center shadow-xs space-y-1">
          <div className="flex items-center justify-center gap-1 text-amber-500">
            <Zap className="w-3.5 h-3.5" />
            <span className="text-sm font-bold text-foreground tabular-nums">
              L{currentLevel}
            </span>
          </div>
          <div className="text-[10px] text-muted-foreground">Level</div>
        </div>

        <div className="rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900/60 p-3 text-center shadow-xs space-y-1">
          <div className="flex items-center justify-center gap-1 text-[#D4B872]">
            <Trophy className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold text-foreground truncate max-w-[48px]">
              {rank.split(" ")[0]}
            </span>
          </div>
          <div className="text-[10px] text-muted-foreground">Rank</div>
        </div>
      </div>

    </aside>
  )
}
