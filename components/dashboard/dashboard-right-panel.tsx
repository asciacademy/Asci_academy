"use client"

import React, { useState } from "react"
import {
  Flame, Target, Trophy, BookOpen, CheckCircle, ChevronLeft,
  ChevronRight, Info, ChevronDown, Camera, Pencil, Check, X,
  Clock, Sparkles
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
  coursesInProgressCount = 3,
  coursesCompletedCount = 17,
  isEditingName,
  setIsEditingName,
  editedName = userName,
  setEditedName,
  handleSaveName,
  isSavingName,
  setShowAvatarPicker,
  onClosePanel,
  showCloseButton = true,
}: DashboardRightPanelProps) {
  // Current month dynamic display (e.g. "Sep 2026" or user's local date)
  const currentMonthYear = new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" })
  const [selectedMonth, setSelectedMonth] = useState(currentMonthYear)
  const [currentWeekIndex, setCurrentWeekIndex] = useState(4) // 4/4

  // Map real weeklyActivity (or fallback with live days)
  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  
  // Calculate dynamic streak calendar days based on current week
  const today = new Date()
  const currentDayOfWeek = (today.getDay() + 6) % 7 // 0 for Mon, 6 for Sun
  const weekOffset = (currentWeekIndex - 4) * 7
  
  const streakDays = dayNames.map((name, index) => {
    // Generate dates for selected week
    const diff = index - currentDayOfWeek + weekOffset
    const d = new Date(today)
    d.setDate(today.getDate() + diff)
    const dayDate = d.getDate().toString()
    
    // Check if day is active from weeklyActivity or streak
    const matchingActivity = weeklyActivity.find((w) => w.day.toLowerCase().startsWith(name.toLowerCase()))
    const hasActivity = Boolean(matchingActivity && ((matchingActivity.minutes || 0) > 0 || (matchingActivity.solved || 0) > 0))
    const isWithinCurrentStreak = currentWeekIndex === 4 && index <= currentDayOfWeek && index > currentDayOfWeek - streak && streak > 0

    return {
      name,
      date: dayDate,
      active: hasActivity || isWithinCurrentStreak,
    }
  })

  // Calculate dynamic daily learning watch times from real weeklyActivity
  const maxWatchMinutes = Math.max(
    60,
    ...weeklyActivity.map((w) => w.minutes || 0)
  )

  const watchTimeData = dayNames.map((day) => {
    const act = weeklyActivity.find((w) => w.day.toLowerCase().startsWith(day.toLowerCase()))
    const mins = act ? (act.minutes || 0) : 0
    const hrs = mins / 60
    const hrStr = Math.floor(hrs)
    const minStr = Math.round(mins % 60)
    const label = `${hrStr}h ${minStr}m`
    const isPeak = maxWatchMinutes > 0 && mins === maxWatchMinutes && mins > 0

    return {
      day,
      hours: hrs,
      minutes: mins,
      label,
      isPeak,
    }
  })

  const maxHours = Math.max(4, Math.ceil(maxWatchMinutes / 60) + 1)

  return (
    <aside className="w-full space-y-4 sm:space-y-5 flex flex-col">
      {/* ── Top Bar: Close Details Action ── */}
      {showCloseButton && onClosePanel && (
        <div className="flex items-center justify-between pt-0.5">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground/80">
            Student Identity &amp; Cadence
          </span>
          <button
            onClick={onClosePanel}
            className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors cursor-pointer group"
          >
            <span className="w-4 h-4 rounded-full border border-blue-500/40 flex items-center justify-center text-[10px] group-hover:bg-blue-500/10">
              ✕
            </span>
            <span>Close Details</span>
          </button>
        </div>
      )}

      {/* Cards Grid: 1 col on mobile, 3 cols on tablet, 1 col in desktop sidebar */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-1 gap-4 sm:gap-5">
        {/* ── 1. Real ASCI Student Profile Card ── */}
        <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-card p-5 shadow-xs transition-all flex flex-col justify-between">
        <div className="flex items-start gap-4">
          {/* Avatar with edit trigger */}
          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => setShowAvatarPicker && setShowAvatarPicker(true)}
              className="w-16 h-16 rounded-lg overflow-hidden bg-blue-50/50 dark:bg-stone-800 border-2 border-blue-500/25 hover:border-blue-500 transition-all flex items-center justify-center relative group cursor-pointer shadow-2xs"
              title="Change Profile Avatar"
            >
              {effectiveAvatar ? (
                <img src={effectiveAvatar} alt={userName} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-blue-500 flex items-center justify-center text-xl font-bold text-white shadow-sm">
                  {userName ? userName.charAt(0).toUpperCase() : "A"}
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <Camera className="w-4 h-4" />
              </div>
            </button>
          </div>

          {/* User Info & Points */}
          <div className="flex-1 min-w-0">
            {isEditingName && setIsEditingName && handleSaveName ? (
              <form onSubmit={handleSaveName} className="flex items-center gap-1.5 mb-1">
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName && setEditedName(e.target.value)}
                  autoFocus
                  className="text-sm font-bold text-foreground bg-secondary border border-blue-500 rounded-md px-2 py-0.5 w-32 focus:outline-none"
                  disabled={isSavingName}
                />
                <button
                  type="submit"
                  className="p-1 rounded bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:opacity-90 transition-opacity shadow-xs"
                  title="Save Name"
                >
                  <Check className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditingName(false)}
                  className="p-1 rounded bg-secondary text-muted-foreground"
                  title="Cancel"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </form>
            ) : (
              <div className="flex items-center gap-1.5 mb-0.5">
                <h3 className="font-bold text-base text-foreground truncate">
                  {userName || "Student Engineer"}
                </h3>
                {setIsEditingName && (
                  <button
                    type="button"
                    onClick={() => setIsEditingName(true)}
                    className="text-muted-foreground hover:text-foreground p-0.5 cursor-pointer"
                    title="Edit name"
                  >
                    <Pencil className="w-3 h-3" />
                  </button>
                )}
              </div>
            )}

            <p className="text-xs text-muted-foreground truncate mb-2">
              ASCI Fellow · Engineering Cohort
            </p>

            {/* Real Points / XP Badge */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/20 text-xs font-semibold">
              <span className="text-blue-500">🪙</span>
              <span>{totalXP ? totalXP.toLocaleString() : "0"} XP</span>
            </div>
          </div>
        </div>

        {/* 3 Real Quick Metrics Row (Streak, Goals, Rank) */}
        <div className="grid grid-cols-3 gap-1.5 sm:gap-2 mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-border/80">
          <div className="flex flex-col items-center text-center p-2 rounded-lg bg-secondary/60">
            <div className="flex items-center gap-1 text-primary mb-0.5">
              <Flame className="w-3.5 h-3.5 fill-blue-500/20 text-primary shrink-0" />
              <span className="font-bold text-xs sm:text-sm font-mono">{streak > 0 ? (streak < 10 ? `0${streak}` : streak) : "00"}</span>
            </div>
            <span className="text-[10px] font-medium text-muted-foreground whitespace-nowrap">Streak</span>
          </div>

          <div className="flex flex-col items-center text-center p-2 rounded-lg bg-secondary/60">
            <div className="flex items-center gap-1 text-accent mb-0.5">
              <Target className="w-3.5 h-3.5 text-accent shrink-0" />
              <span className="font-bold text-xs sm:text-sm font-mono">
                {(() => {
                  const solved = weeklyActivity.reduce((acc, w) => acc + (w.solved || 0), 0) + coursesCompletedCount
                  return solved > 0 ? (solved < 10 ? `0${solved}` : solved) : "00"
                })()}
              </span>
            </div>
            <span className="text-[10px] font-medium text-muted-foreground whitespace-nowrap">Solved</span>
          </div>

          <div className="flex flex-col items-center text-center p-2 rounded-lg bg-secondary/60">
            <div className="flex items-center gap-1 text-accent mb-0.5">
              <Trophy className="w-3.5 h-3.5 text-accent shrink-0" />
              <span className="font-bold text-xs sm:text-sm truncate max-w-[80px]">{rank || "L1"}</span>
            </div>
            <span className="text-[10px] font-medium text-muted-foreground whitespace-nowrap">Rank</span>
          </div>
        </div>
      </div>

      {/* ── 2. Real Weekly Streak Card ── */}
      <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-card p-4 sm:p-5 shadow-xs space-y-3 sm:space-y-4 flex flex-col justify-between">
        {/* Header with Title and Month selector */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-sm font-bold text-foreground">
            <span>Weekly Streak</span>
            <Info className="w-3.5 h-3.5 text-muted-foreground/60 cursor-pointer" />
          </div>

          <div className="relative">
            <div className="flex items-center gap-1 text-xs text-muted-foreground font-medium px-2 py-1 rounded-md border border-border bg-secondary/50">
              <span>{selectedMonth}</span>
            </div>
          </div>
        </div>

        {/* Subheader with 4/4 Weeks navigation */}
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-0.5 sm:pt-1">
          <span className="font-semibold text-foreground">Week {currentWeekIndex} of 4</span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentWeekIndex(Math.max(1, currentWeekIndex - 1))}
              className="p-1 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              title="Previous Week"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setCurrentWeekIndex(Math.min(4, currentWeekIndex + 1))}
              className="p-1 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              title="Next Week"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 7-Day Pill Strip */}
        <div className="grid grid-cols-7 gap-1 sm:gap-1.5 pt-1">
          {streakDays.map((item, index) => {
            const isActive = item.active
            return (
              <div
                key={index}
                className={`flex flex-col items-center py-2 sm:py-2.5 px-0.5 sm:px-1 rounded-lg transition-all min-w-0 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm shadow-blue-500/25"
                    : "bg-secondary/60 text-foreground hover:bg-secondary"
                }`}
              >
                <span className={`text-[9px] sm:text-[10px] font-medium mb-0.5 sm:mb-1 truncate ${isActive ? "text-blue-100" : "text-muted-foreground"}`}>
                  {item.name}
                </span>
                <span className={`text-[11px] sm:text-xs font-bold ${isActive ? "text-white" : "text-foreground"}`}>
                  {item.date}
                </span>
              </div>
            )
          })}
        </div>

        {/* 2 Summary Stat Boxes */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 pt-2">
          {/* Courses In Progress */}
          <div className="p-3 sm:p-3.5 rounded-lg bg-secondary/50 border border-border flex flex-col justify-between">
            <div className="w-7 h-7 rounded-md bg-blue-500/10 text-blue-600 border border-blue-500/20 flex items-center justify-center mb-2.5 sm:mb-3">
              <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />
            </div>
            <div>
              <div className="text-sm sm:text-base font-bold text-foreground">
                {coursesInProgressCount} {coursesInProgressCount === 1 ? "Track" : "Tracks"}
              </div>
              <div className="text-[10px] sm:text-[11px] text-muted-foreground">
                In Progress
              </div>
            </div>
          </div>

          {/* Courses Completed */}
          <div className="p-3 sm:p-3.5 rounded-lg bg-secondary/50 border border-border flex flex-col justify-between">
            <div className="w-7 h-7 rounded-md bg-blue-500/10 text-blue-600 border border-blue-500/20 flex items-center justify-center mb-2.5 sm:mb-3">
              <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />
            </div>
            <div>
              <div className="text-sm sm:text-base font-bold text-foreground">
                {coursesCompletedCount} Completed
              </div>
              <div className="text-[10px] sm:text-[11px] text-muted-foreground">
                Modules Finished
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. Real Weekly Watch / Learning Time Card ── */}
      <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-card p-5 shadow-xs space-y-4 md:col-span-2 lg:col-span-1 flex flex-col justify-between">
        {/* Header with Title and Month selector */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-sm font-bold text-foreground">
            <span>Weekly Study Time</span>
            <Info className="w-3.5 h-3.5 text-muted-foreground/60 cursor-pointer" />
          </div>

          <div className="relative">
            <div className="flex items-center gap-1 text-xs text-muted-foreground font-medium px-2 py-1 rounded-lg border border-border bg-secondary/50">
              <span>{selectedMonth}</span>
            </div>
          </div>
        </div>

        {/* Subheader with 4/4 Weeks navigation */}
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
          <span className="font-semibold text-foreground">Week {currentWeekIndex} of 4</span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentWeekIndex(Math.max(1, currentWeekIndex - 1))}
              className="p-1 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              title="Previous Week"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setCurrentWeekIndex(Math.min(4, currentWeekIndex + 1))}
              className="p-1 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              title="Next Week"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bar Chart Container */}
        <div className="pt-6 pb-2 relative">
          {/* Y-axis background grid lines */}
          <div className="space-y-4 text-[10px] text-muted-foreground/70 font-mono">
            <div className="flex items-center gap-3">
              <span className="w-6 text-right">{maxHours}h</span>
              <div className="flex-1 border-b border-border/60" />
            </div>
            <div className="flex items-center gap-3">
              <span className="w-6 text-right">{Math.round(maxHours / 2)}h</span>
              <div className="flex-1 border-b border-border/60" />
            </div>
            <div className="flex items-center gap-3">
              <span className="w-6 text-right">0h</span>
              <div className="flex-1 border-b border-border/60" />
            </div>
          </div>

          {/* Vertical Bars Overlay */}
          <div className="absolute inset-x-0 bottom-6 pl-9 pr-2 h-24 flex items-end justify-between">
            {watchTimeData.map((item) => {
              const heightPercent = item.hours > 0 ? Math.max(10, Math.min(100, Math.round((item.hours / maxHours) * 100))) : 4
              const isPeak = item.isPeak

              return (
                <div key={item.day} className="flex flex-col items-center relative group w-6">
                  {/* Floating tooltip badge */}
                  {isPeak && (
                    <div className="absolute -top-6 z-10 bg-foreground text-background text-[9px] font-mono font-bold px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap pointer-events-none">
                      {item.label}
                    </div>
                  )}

                  {/* Vertical bar */}
                  <div
                    className={`w-3 sm:w-3.5 rounded-full transition-all duration-300 ${
                      isPeak
                        ? "bg-gradient-to-t from-blue-600 via-indigo-500 to-cyan-400 shadow-md shadow-blue-500/30"
                        : "bg-muted-foreground/20 hover:bg-blue-400/60"
                    }`}
                    style={{ height: `${heightPercent}%` }}
                    title={`${item.day}: ${item.label}`}
                  />
                </div>
              )
            })}
          </div>

          {/* X-axis day labels */}
          <div className="flex justify-between pl-9 pr-2 pt-3 text-[10px] font-medium text-muted-foreground">
            {watchTimeData.map((item) => (
              <span key={item.day} className="w-6 text-center">
                {item.day}
              </span>
            ))}
          </div>
        </div>
      </div>
      </div>
    </aside>
  )
}
