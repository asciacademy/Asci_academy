"use client"

import Link from "next/link"
import { Code2, ArrowRight, CheckCircle2, Flame, Terminal, Play, Zap, HelpCircle } from "lucide-react"

export function PracticeSection() {
  const practiceProblems = [
    {
      id: "two-sum",
      title: "Two Sum",
      topic: "Array · Hash Table",
      difficulty: "Easy",
      status: "Solved",
      xp: "+50 XP",
    },
    {
      id: "valid-anagram",
      title: "Valid Anagram",
      topic: "String · Sorting",
      difficulty: "Easy",
      status: "Solved",
      xp: "+50 XP",
    },
    {
      id: "3sum",
      title: "3Sum — Unique Triplets",
      topic: "Two Pointers · Sorting",
      difficulty: "Medium",
      status: "Pending",
      xp: "+80 XP",
    },
    {
      id: "lru-cache",
      title: "LRU Cache Architecture",
      topic: "Hash Map · Doubly Linked List",
      difficulty: "Medium",
      status: "Pending",
      xp: "+100 XP",
    },
  ]

  return (
    <section className="py-14 sm:py-20 border-b border-border/60 bg-secondary/20">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-primary mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span>Algorithmic Practice Arena</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-foreground tracking-tight">
              Turn Lessons into Working Code
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mt-2 max-w-xl">
              Real coding practice with step-by-step visual proofs, multi-language compiler, automated assertions, and test runners.
            </p>
          </div>
          <Link
            href="/dsa"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary hover:text-primary-active transition-colors shrink-0"
          >
            <span>Open DSA Arena (474 Problems)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Compact Engineering Cockpit Card */}
        <div className="rounded-2xl border border-border/80 bg-card p-5 sm:p-7 shadow-xs">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-border/60">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-semibold text-primary uppercase tracking-wider">
                  Daily Coding Goals
                </span>
                <span className="text-xs text-muted-foreground font-mono">· 2/4 completed today</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-foreground mt-1">
                Today&apos;s Practice Plan
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                Target: Complete 2 algorithmic problems to maintain your 7-day streak.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <div className="flex items-center gap-2 text-xs font-mono bg-secondary px-3 py-1.5 rounded-xl border border-border/60">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Easy: 2 Solved</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono bg-secondary px-3 py-1.5 rounded-xl border border-border/60">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>Medium: 2 Remaining</span>
              </div>
              <Link
                href="/dsa/problems/two-sum"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-active text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Start Practice</span>
              </Link>
            </div>
          </div>

          {/* Problem Rows Table */}
          <div className="divide-y divide-border/60 mt-2">
            {practiceProblems.map((prob, idx) => (
              <div
                key={prob.id}
                className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-secondary/40 px-2 rounded-xl transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-muted-foreground w-6">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <Link
                      href={`/dsa/problems/${prob.id}`}
                      className="text-sm font-semibold text-foreground hover:text-primary transition-colors"
                    >
                      {prob.title}
                    </Link>
                    <span className="text-xs text-muted-foreground ml-2 font-mono hidden sm:inline">
                      {prob.topic}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 justify-between sm:justify-end">
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                      prob.difficulty === "Easy"
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                    }`}
                  >
                    {prob.difficulty}
                  </span>
                  <span className="text-[11px] font-mono text-muted-foreground">
                    {prob.xp}
                  </span>
                  <Link
                    href={`/dsa/problems/${prob.id}`}
                    className={`text-xs font-medium px-3 py-1 rounded-lg border transition-colors cursor-pointer ${
                      prob.status === "Solved"
                        ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        : "border-primary/30 bg-primary/10 text-primary hover:bg-primary hover:text-white"
                    }`}
                  >
                    {prob.status === "Solved" ? "Review" : "Solve"}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
