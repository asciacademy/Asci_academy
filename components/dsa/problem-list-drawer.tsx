"use client"

import { useState, useMemo, useEffect } from "react"
import Link from "next/link"
import {
  X, Search, CheckCircle2, Circle, ChevronRight,
  Filter, Code2, ArrowUpRight, Trophy, BookOpen
} from "lucide-react"
import { ALL_PROBLEMS, ProblemDetail, ProblemDifficulty } from "@/lib/dsa/problem-catalog"
import { cn } from "@/lib/utils"

interface ProblemListDrawerProps {
  isOpen: boolean
  onClose: () => void
  currentProblemId: string
  solvedIds: Set<string>
  onSelectProblem?: (problem: ProblemDetail) => void
}

export function ProblemListDrawer({
  isOpen,
  onClose,
  currentProblemId,
  solvedIds,
  onSelectProblem,
}: ProblemListDrawerProps) {
  const [search, setSearch] = useState("")
  const [difficulty, setDifficulty] = useState<ProblemDifficulty | "All">("All")
  const [status, setStatus] = useState<"All" | "Solved" | "Unsolved">("All")
  const [selectedStep, setSelectedStep] = useState<number | "All">("All")

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  // Extract unique steps
  const steps = useMemo(() => {
    const map = new Map<number, string>()
    ALL_PROBLEMS.forEach(p => {
      if (!map.has(p.stepNumber)) {
        map.set(p.stepNumber, p.stepTitle)
      }
    })
    return Array.from(map.entries()).map(([num, title]) => ({ num, title }))
  }, [])

  // Filter problems
  const filteredProblems = useMemo(() => {
    const q = search.toLowerCase().trim()
    return ALL_PROBLEMS.filter(p => {
      // Search
      if (q) {
        const matchesTitle = p.title.toLowerCase().includes(q)
        const matchesStep = p.stepTitle.toLowerCase().includes(q)
        const matchesSub = p.subcategoryTitle.toLowerCase().includes(q)
        const matchesId = p.id === q
        if (!matchesTitle && !matchesStep && !matchesSub && !matchesId) return false
      }

      // Difficulty
      if (difficulty !== "All" && p.difficulty !== difficulty) return false

      // Status
      const isSolved = solvedIds.has(p.id)
      if (status === "Solved" && !isSolved) return false
      if (status === "Unsolved" && isSolved) return false

      // Step
      if (selectedStep !== "All" && p.stepNumber !== selectedStep) return false

      return true
    })
  }, [search, difficulty, status, selectedStep, solvedIds])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="relative z-10 w-full max-w-xl bg-card border-r border-border flex flex-col h-full shadow-2xl animate-in slide-in-from-left duration-200">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-border flex items-center justify-between gap-3 bg-secondary/20">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <Code2 className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
                ASCI A2Z Problem Catalog
                <span className="text-xs font-mono font-normal px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                  {ALL_PROBLEMS.length}
                </span>
              </h2>
              <p className="text-xs text-muted-foreground">
                {solvedIds.size} of {ALL_PROBLEMS.length} completed ({Math.round((solvedIds.size / ALL_PROBLEMS.length) * 100)}%)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close drawer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Search & Filters */}
        <div className="p-4 border-b border-border space-y-3 bg-card">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by problem name, number, or topic..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-border bg-background placeholder:text-muted-foreground/60 text-foreground focus:outline-hidden focus:ring-1 focus:ring-primary focus:border-primary"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
              >
                Clear
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* Difficulty */}
            <div className="flex items-center rounded-lg border border-border bg-secondary/30 p-0.5">
              {(["All", "Easy", "Medium", "Hard"] as const).map(d => (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className={cn(
                    "px-2.5 py-1 rounded-md transition-all font-medium text-[11px]",
                    difficulty === d
                      ? "bg-background text-foreground shadow-xs font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {d}
                </button>
              ))}
            </div>

            {/* Status */}
            <div className="flex items-center rounded-lg border border-border bg-secondary/30 p-0.5">
              {(["All", "Solved", "Unsolved"] as const).map(s => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className={cn(
                    "px-2.5 py-1 rounded-md transition-all font-medium text-[11px]",
                    status === s
                      ? "bg-background text-foreground shadow-xs font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Step Selector */}
            <select
              value={selectedStep}
              onChange={e => setSelectedStep(e.target.value === "All" ? "All" : Number(e.target.value))}
              className="px-2.5 py-1 text-[11px] rounded-lg border border-border bg-secondary/30 text-foreground focus:outline-hidden"
            >
              <option value="All">All 18 Steps</option>
              {steps.map(s => (
                <option key={s.num} value={s.num}>
                  Step {s.num}: {s.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Problems List */}
        <div className="flex-1 overflow-y-auto divide-y divide-border/60">
          {filteredProblems.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground text-sm">
              No problems match your current filters.
            </div>
          ) : (
            filteredProblems.map((prob, idx) => {
              const isCurrent = prob.id === currentProblemId
              const isSolved = solvedIds.has(prob.id)

              return (
                <Link
                  key={prob.id}
                  href={`/dsa/problems/${prob.id}`}
                  onClick={() => {
                    if (onSelectProblem) onSelectProblem(prob)
                    onClose()
                  }}
                  className={cn(
                    "group flex items-center justify-between gap-3 p-3 sm:px-4 text-left transition-colors",
                    isCurrent
                      ? "bg-primary/10 border-l-4 border-l-primary"
                      : "hover:bg-secondary/40"
                  )}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    {/* Solved Icon */}
                    <div className="shrink-0">
                      {isSolved ? (
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      ) : (
                        <Circle className="h-4 w-4 text-muted-foreground/40 group-hover:text-muted-foreground" />
                      )}
                    </div>

                    {/* Step & Title */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono text-muted-foreground">
                          #{prob.index + 1}
                        </span>
                        <span className={cn(
                          "text-xs sm:text-sm font-medium truncate",
                          isCurrent && "text-primary font-semibold",
                          isSolved && "text-muted-foreground line-through"
                        )}>
                          {prob.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5 text-[10px] text-muted-foreground">
                        <span>Step {prob.stepNumber}</span>
                        <span>•</span>
                        <span className="truncate">{prob.subcategoryTitle}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Badges */}
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={cn(
                      "px-2 py-0.5 rounded-md text-[10px] font-mono font-medium uppercase",
                      prob.difficulty === "Easy" && "bg-primary/10 text-primary border border-primary/20",
                      prob.difficulty === "Medium" && "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20",
                      prob.difficulty === "Hard" && "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20"
                    )}>
                      {prob.difficulty}
                    </span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground/60 group-hover:text-foreground transition-transform group-hover:translate-x-0.5" />
                  </div>
                </Link>
              )
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-border bg-secondary/20 flex items-center justify-between text-xs text-muted-foreground">
          <span>Showing {filteredProblems.length} of {ALL_PROBLEMS.length} problems</span>
          <Link
            href="/dsa/a2z-sheet"
            className="flex items-center gap-1 text-primary hover:underline font-medium"
            onClick={onClose}
          >
            Open Full Sheet
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
