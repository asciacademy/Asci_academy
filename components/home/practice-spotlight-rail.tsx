"use client"

import React from "react"
import Link from "next/link"
import { Flame, Code2, ArrowRight, Zap, Target } from "lucide-react"
import { ContextualAxelButton } from "@/components/axel/contextual-axel-button"

export function PracticeSpotlightRail() {
  const potd = {
    title: "Sliding Window Maximum",
    slug: "sliding-window-maximum",
    topic: "Monotonic Deque",
    difficulty: "Hard",
    solvedCount: 3240,
    xpReward: 50,
  }

  return (
    <section aria-label="DSA Practice Spotlight" className="space-y-3.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary" />
          <h2 className="text-base sm:text-lg font-serif font-bold text-foreground">
            Practice Arena
          </h2>
          <span className="text-xs font-mono text-muted-foreground hidden sm:inline">
            • Daily Challenges &amp; A2Z Sheets
          </span>
        </div>
        <Link
          href="/practice"
          className="text-xs font-mono text-primary hover:underline flex items-center gap-1 font-semibold"
        >
          <span>View All Practice</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* POTD Card (Spans 2 cols) */}
        <div className="md:col-span-2 p-5 rounded-2xl border border-primary/20 bg-primary/5 flex flex-col justify-between space-y-4 shadow-2xs">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-primary text-primary-foreground shadow-2xs">
                <Flame className="h-3 w-3 fill-current" />
                PROBLEM OF THE DAY
              </span>
              <span className="text-xs font-mono text-primary font-bold">+{potd.xpReward} XP</span>
            </div>

            <h3 className="font-serif text-lg sm:text-xl font-bold text-foreground">
              {potd.title}
            </h3>

            <p className="text-xs text-muted-foreground leading-relaxed">
              Find the maximum values in all sliding windows of size k across a streaming integer buffer using an optimal monotonic deque.
            </p>

            <div className="flex items-center gap-2 pt-1 text-xs font-mono text-muted-foreground">
              <span className="text-rose-600 dark:text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded font-semibold text-[10px]">
                {potd.difficulty}
              </span>
              <span>•</span>
              <span>Topic: {potd.topic}</span>
              <span>•</span>
              <span>{potd.solvedCount} solved</span>
            </div>
          </div>

          <div className="pt-2 border-t border-primary/10 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <Link
              href={`/dsa/problem/${potd.slug}`}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground hover:bg-[#EA5300] font-semibold text-xs transition-all shadow-xs cursor-pointer"
            >
              <span>Solve Today&apos;s Challenge</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <ContextualAxelButton context="dsa" topicTitle={potd.title} />
          </div>
        </div>

        {/* A2Z Sheet Quick Progress Card */}
        <div className="p-5 rounded-2xl border border-border bg-card flex flex-col justify-between space-y-4 shadow-2xs">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
                Roadmap
              </span>
              <span className="text-xs font-mono text-primary font-semibold">474 Total</span>
            </div>

            <div className="space-y-1">
              <div className="font-bold text-foreground text-sm flex items-center gap-2">
                <Code2 className="w-4 h-4 text-primary" />
                <span>A2Z DSA Roadmap</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Progressive algorithmic sheet from Arrays to Dynamic Programming.
              </p>
            </div>

            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                <span>Progress</span>
                <span className="text-foreground font-semibold">18 / 474 (4%)</span>
              </div>
              <div className="h-2 w-full rounded-full bg-secondary overflow-hidden border border-border">
                <div className="h-full bg-primary rounded-full" style={{ width: "4%" }} />
              </div>
            </div>
          </div>

          <Link
            href="/dsa/a2z-sheet"
            className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-secondary hover:bg-secondary/80 border border-border text-xs font-semibold text-foreground transition-all cursor-pointer shadow-2xs"
          >
            <span>Open A2Z Sheet</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
