"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import {
  CheckCircle2, Circle, ExternalLink, Youtube, BookOpen,
  Search, Filter, ChevronDown, ChevronRight, Activity,
  Trophy, RotateCcw, Code2, Layers, Check, Share2, HelpCircle,
  Terminal, Play
} from "lucide-react"
import {
  A2Z_SHEET_STEPS,
  A2Z_SHEET_STATS,
  AsciDsaStep,
  AsciDsaProblem,
  ProblemDifficulty
} from "@/lib/dsa/a2z-sheet-data"
import { cn } from "@/lib/utils"


const STORAGE_KEY = "asci_a2z_solved_v1"

export function A2ZSheetViewer() {
  const [solvedIds, setSolvedIds] = useState<Set<string>>(new Set())
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDifficulty, setSelectedDifficulty] = useState<ProblemDifficulty | "All">("All")
  const [statusFilter, setStatusFilter] = useState<"all" | "completed" | "pending">("all")
  const [expandedSteps, setExpandedSteps] = useState<Record<number, boolean>>({ 1: true })
  const [isClient, setIsClient] = useState(false)

  // Load solved state from localStorage and listen to updates
  useEffect(() => {
    setIsClient(true)
    const loadSolved = () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved) {
          const parsed = JSON.parse(saved)
          if (Array.isArray(parsed)) {
            setSolvedIds(new Set(parsed))
          }
        }
      } catch {
        // ignore
      }
    }

    loadSolved()
    window.addEventListener("storage", loadSolved)
    window.addEventListener("focus", loadSolved)
    return () => {
      window.removeEventListener("storage", loadSolved)
      window.removeEventListener("focus", loadSolved)
    }
  }, [])

  // Save solved state
  const toggleSolved = (id: string) => {
    setSolvedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(next)))
      } catch {
        // ignore
      }
      return next
    })
  }

  const resetProgress = () => {
    if (window.confirm("Are you sure you want to reset your ASCI A2Z DSA Sheet progress?")) {
      setSolvedIds(new Set())
      try {
        localStorage.removeItem(STORAGE_KEY)
      } catch {
        // ignore
      }
    }
  }


  const toggleStep = (stepNum: number) => {
    setExpandedSteps(prev => ({
      ...prev,
      [stepNum]: !prev[stepNum]
    }))
  }

  const expandAll = () => {
    const all: Record<number, boolean> = {}
    A2Z_SHEET_STEPS.forEach(s => { all[s.stepNumber] = true })
    setExpandedSteps(all)
  }

  const collapseAll = () => {
    setExpandedSteps({})
  }

  // Filter problems
  const filteredSteps = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()

    return A2Z_SHEET_STEPS.map(step => {
      const filteredSubcats = step.subcategories.map(sub => {
        const filteredProblems = sub.problems.filter(prob => {
          // Search query
          if (q) {
            const matchesTitle = prob.title.toLowerCase().includes(q)
            const matchesSub = sub.title.toLowerCase().includes(q)
            const matchesStep = step.title.toLowerCase().includes(q)
            if (!matchesTitle && !matchesSub && !matchesStep) return false
          }

          // Difficulty
          if (selectedDifficulty !== "All" && prob.difficulty !== selectedDifficulty) {
            return false
          }

          // Status filter
          const isSolved = solvedIds.has(prob.id)
          if (statusFilter === "completed" && !isSolved) return false
          if (statusFilter === "pending" && isSolved) return false

          return true
        })

        return {
          ...sub,
          problems: filteredProblems
        }
      }).filter(sub => sub.problems.length > 0)

      const visibleProblems = filteredSubcats.reduce((acc, s) => acc + s.problems.length, 0)

      return {
        ...step,
        subcategories: filteredSubcats,
        visibleProblems
      }
    }).filter(step => step.visibleProblems > 0)
  }, [searchQuery, selectedDifficulty, statusFilter, solvedIds])

  // Aggregate stats
  const totalSolved = solvedIds.size
  const progressPercent = Math.round((totalSolved / A2Z_SHEET_STATS.totalProblems) * 100) || 0

  return (
    <div className="w-full space-y-8">
      {/* Top Metrics Banner */}
      <div className="rounded-2xl border border-hairline bg-card/70 p-6 backdrop-blur-xl shadow-sm">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-0.5 text-xs font-medium text-primary">
              <Activity className="h-3 w-3" />
              <span>Interactive Progress Tracker</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-foreground">
              Your Learning Journey
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {totalSolved} of {A2Z_SHEET_STATS.totalProblems} problems solved ({progressPercent}%)
            </p>
          </div>

          {/* Difficulty Counters */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-xl border border-primary/20 bg-primary/5 px-4 py-2 text-center">
              <span className="text-[10px] font-mono uppercase tracking-wider text-primary block">Easy</span>
              <span className="text-base font-semibold text-foreground">
                {A2Z_SHEET_STATS.easyCount}
              </span>
            </div>
            <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-2 text-center">
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400 block">Medium</span>
              <span className="text-base font-semibold text-amber-700 dark:text-amber-300">
                {A2Z_SHEET_STATS.mediumCount}
              </span>
            </div>
            <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 px-4 py-2 text-center">
              <span className="text-[10px] font-mono uppercase tracking-wider text-rose-600 dark:text-rose-400 block">Hard</span>
              <span className="text-base font-semibold text-rose-700 dark:text-rose-300">
                {A2Z_SHEET_STATS.hardCount}
              </span>
            </div>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="mt-5 space-y-1.5">
          <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-muted-foreground font-mono">
            <span>Step 01 • Basics</span>
            <span>{progressPercent}% Complete</span>
            <span>Step 18 • Strings Advanced</span>
          </div>
        </div>
      </div>

      {/* Search, Filter and Actions Toolbar */}
      <div className="rounded-2xl border border-hairline bg-card/50 p-4 backdrop-blur-md">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search problems by name, topic, or keyword (e.g. 2Sum, Binary Search, DP)..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-hairline bg-background pl-10 pr-4 py-2 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
              >
                Clear
              </button>
            )}
          </div>

          {/* Difficulty Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {(["All", "Easy", "Medium", "Hard"] as const).map(diff => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-medium transition-all whitespace-nowrap cursor-pointer",
                  selectedDifficulty === diff
                    ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                    : "border border-hairline bg-card hover:bg-secondary text-muted-foreground hover:text-foreground"
                )}
              >
                {diff === "All" ? `All (${A2Z_SHEET_STATS.totalProblems})` : diff}
              </button>
            ))}
          </div>
        </div>

        {/* Secondary Row: Status & Accordion Controls */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-hairline text-xs">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Status:</span>
            <button
              onClick={() => setStatusFilter("all")}
              className={cn(
                "px-2.5 py-1 rounded-md transition-colors",
                statusFilter === "all" ? "bg-secondary text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
              )}
            >
              All
            </button>
            <button
              onClick={() => setStatusFilter("completed")}
              className={cn(
                "px-2.5 py-1 rounded-md transition-colors",
                statusFilter === "completed" ? "bg-secondary text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
              )}
            >
              Solved ({totalSolved})
            </button>
            <button
              onClick={() => setStatusFilter("pending")}
              className={cn(
                "px-2.5 py-1 rounded-md transition-colors",
                statusFilter === "pending" ? "bg-secondary text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
              )}
            >
              Unsolved ({A2Z_SHEET_STATS.totalProblems - totalSolved})
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={expandAll}
              className="text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md border border-hairline bg-card hover:bg-secondary"
            >
              Expand All
            </button>
            <button
              onClick={collapseAll}
              className="text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md border border-hairline bg-card hover:bg-secondary"
            >
              Collapse All
            </button>
            {totalSolved > 0 && (
              <button
                onClick={resetProgress}
                className="text-rose-600 hover:text-rose-700 dark:text-rose-400 transition-colors px-2 py-1 rounded-md flex items-center gap-1"
                title="Reset progress"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Steps List */}
      <div className="space-y-4">
        {filteredSteps.length === 0 ? (
          <div className="rounded-2xl border border-hairline bg-card/40 p-12 text-center">
            <Search className="mx-auto h-8 w-8 text-muted-foreground mb-3 opacity-50" />
            <h3 className="text-base font-medium text-foreground">No matching problems found</h3>
            <p className="mt-1 text-xs text-muted-foreground max-w-sm mx-auto">
              Try adjusting your search query or reset the difficulty and status filters to see all 474 problems.
            </p>
            <button
              onClick={() => { setSearchQuery(""); setSelectedDifficulty("All"); setStatusFilter("all"); }}
              className="mt-4 rounded-lg bg-primary px-4 py-2 text-xs font-medium text-primary-foreground"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredSteps.map(step => {
            const isExpanded = expandedSteps[step.stepNumber]
            // Calculate step completed count
            let stepTotal = 0
            let stepSolved = 0
            step.subcategories.forEach(sub => {
              sub.problems.forEach(p => {
                stepTotal++
                if (solvedIds.has(p.id)) stepSolved++
              })
            })
            const stepPercent = stepTotal > 0 ? Math.round((stepSolved / stepTotal) * 100) : 0

            return (
              <div
                key={step.id}
                className="rounded-2xl border border-hairline bg-card transition-all overflow-hidden shadow-xs hover:border-hairline/80"
              >
                {/* Step Header Accordion Trigger */}
                <button
                  onClick={() => toggleStep(step.stepNumber)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left transition-colors hover:bg-secondary/40"
                >
                  <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0 pr-4">
                    <span className="flex h-7 sm:h-8 px-2 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 text-primary font-mono text-[11px] sm:text-xs font-bold whitespace-nowrap">
                      Step {String(step.stepNumber).padStart(2, '0')}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-serif text-base sm:text-lg font-medium text-foreground truncate">
                        {step.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 mt-0.5 text-xs text-muted-foreground">
                        <span>{step.subcategories.length} Topics</span>
                        <span>•</span>
                        <span>{stepSolved}/{stepTotal} Solved ({stepPercent}%)</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {/* Step Mini Progress Bar */}
                    <div className="hidden sm:block w-24 h-1.5 rounded-full bg-secondary overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary transition-all duration-300"
                        style={{ width: `${stepPercent}%` }}
                      />
                    </div>
                    <div className="flex h-7 w-7 items-center justify-center rounded-full border border-hairline bg-background text-muted-foreground">
                      {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </div>
                  </div>
                </button>

                {/* Step Content */}
                {isExpanded && (
                  <div className="border-t border-hairline bg-background/50 p-4 sm:p-6 space-y-6">
                    {step.subcategories.map(sub => (
                      <div key={sub.id} className="space-y-3">
                        <div className="flex items-center justify-between pb-1.5 border-b border-hairline/60">
                          <h4 className="font-medium text-sm text-foreground flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                            <span>{sub.title}</span>
                          </h4>
                          <span className="text-[11px] font-mono text-muted-foreground">
                            {sub.problems.filter(p => solvedIds.has(p.id)).length}/{sub.problems.length} solved
                          </span>
                        </div>

                        {/* Problems Table / List */}
                        <div className="space-y-1.5">
                          {sub.problems.map(prob => {
                            const isSolved = solvedIds.has(prob.id)

                            return (
                              <div
                                key={prob.id}
                                className={cn(
                                  "group flex items-center justify-between gap-3 p-2.5 sm:p-3 rounded-xl border transition-all",
                                  isSolved
                                    ? "border-primary/20 bg-primary/5 text-foreground"
                                    : "border-hairline bg-card hover:bg-secondary/40 text-foreground"
                                )}
                              >
                                {/* Left: Checkbox & Title */}
                                <div className="flex items-center gap-3 min-w-0 flex-1">
                                  <button
                                    onClick={() => toggleSolved(prob.id)}
                                    className="text-muted-foreground hover:text-primary transition-colors cursor-pointer shrink-0"
                                    aria-label={isSolved ? "Mark unsolved" : "Mark solved"}
                                  >
                                    {isSolved ? (
                                      <CheckCircle2 className="h-5 w-5 text-primary" />
                                    ) : (
                                      <Circle className="h-5 w-5 text-muted-foreground/60 hover:text-primary" />
                                    )}
                                  </button>

                                  <Link
                                    href={`/dsa/problems/${prob.id}`}
                                    className={cn(
                                      "text-xs sm:text-sm font-medium truncate hover:text-primary hover:underline transition-colors",
                                      isSolved && "text-muted-foreground line-through hover:text-foreground"
                                    )}
                                    title={`Solve ${prob.title} in ASCI Compiler Workspace`}
                                  >
                                    {prob.title}
                                  </Link>
                                </div>

                                {/* Right: Difficulty & Resource Actions */}
                                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                                  {/* Solve in Workspace Button */}
                                  <Link
                                    href={`/dsa/problems/${prob.id}`}
                                    className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground border border-primary/20 transition-all shadow-2xs"
                                    title="Open interactive LeetCode-style solving workspace"
                                  >
                                    <Terminal className="h-3 w-3" />
                                    <span>Solve</span>
                                  </Link>

                                  {/* Difficulty Pill */}
                                  <span
                                    className={cn(
                                      "rounded-md px-2 py-0.5 text-[10px] sm:text-[11px] font-medium uppercase font-mono",
                                      prob.difficulty === "Easy" && "bg-primary/10 text-primary border border-primary/20",
                                      prob.difficulty === "Medium" && "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20",
                                      prob.difficulty === "Hard" && "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20"
                                    )}
                                  >
                                    {prob.difficulty}
                                  </span>

                                  {/* Video Solution Link */}
                                  {prob.youtubeUrl && (
                                    <a
                                      href={prob.youtubeUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex h-7 w-7 items-center justify-center rounded-lg border border-hairline bg-background hover:bg-rose-500/10 hover:border-rose-500/30 hover:text-rose-600 transition-colors text-muted-foreground"
                                      title="Watch video solution"
                                    >
                                      <Youtube className="h-3.5 w-3.5" />
                                    </a>
                                  )}

                                  {/* Guide / Documentation Link */}
                                  {prob.guideUrl && (
                                    <a
                                      href={prob.guideUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex h-7 w-7 items-center justify-center rounded-lg border border-hairline bg-background hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-colors text-muted-foreground"
                                      title="Read conceptual guide"
                                    >
                                      <BookOpen className="h-3.5 w-3.5" />
                                    </a>
                                  )}

                                  {/* Coding Practice / LeetCode Link */}
                                  {prob.leetcodeUrl && (
                                    <a
                                      href={prob.leetcodeUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex h-7 w-7 items-center justify-center rounded-lg border border-hairline bg-background hover:bg-amber-500/10 hover:border-amber-500/30 hover:text-amber-600 transition-colors text-muted-foreground"
                                      title="Practice on LeetCode / Coding Sandbox"
                                    >
                                      <Code2 className="h-3.5 w-3.5" />
                                    </a>
                                  )}
                                </div>
                              </div>
                            )
                          })}

                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
