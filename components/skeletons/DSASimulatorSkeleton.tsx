"use client"

import React from "react"
import { Skeleton, SkeletonBadge, SkeletonButton, SkeletonText } from "./Skeleton"

export function DSASimulatorSkeleton() {
  return (
    <div
      aria-busy="true"
      aria-label="Loading problem solver"
      className="h-[calc(100vh-4rem)] flex flex-col bg-background text-foreground overflow-hidden select-none"
    >
      {/* Top Problem Navigation & Run Controls Bar */}
      <div className="h-14 border-b border-border/60 bg-card/80 px-4 sm:px-6 flex items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <Skeleton className="h-7 w-7 rounded-lg" />
          <Skeleton className="h-5 w-48 sm:w-64 rounded-md" />
          <SkeletonBadge className="h-5 w-16" />
        </div>

        <div className="flex items-center gap-2">
          <SkeletonButton size="sm" className="w-20 h-9" />
          <SkeletonButton size="sm" className="w-24 h-9 bg-primary/20 border border-primary/30" />
        </div>
      </div>

      {/* Split Pane: Left Description / Right Code Editor */}
      <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden">
        {/* Left Panel: Problem Statement & Constraints */}
        <div className="w-full md:w-1/2 border-r border-border/60 flex flex-col overflow-hidden bg-background">
          {/* Panel Tabs */}
          <div className="h-11 border-b border-border/40 px-4 flex items-center gap-3 bg-secondary/20">
            <Skeleton className="h-6 w-24 rounded-md" />
            <Skeleton className="h-6 w-20 rounded-md" />
            <Skeleton className="h-6 w-28 rounded-md" />
          </div>

          <div className="p-5 sm:p-6 space-y-6 overflow-y-auto flex-1">
            <div className="space-y-2">
              <Skeleton className="h-7 w-3/4 rounded-lg" />
              <div className="flex items-center gap-2 pt-1">
                <SkeletonBadge className="h-5 w-16" />
                <SkeletonBadge className="h-5 w-24" />
                <SkeletonBadge className="h-5 w-20" />
              </div>
            </div>

            {/* Problem Statement Paragraphs */}
            <SkeletonText lines={4} lastLineWidth="80%" lineHeight="h-3.5" gap="space-y-2" />

            {/* Example 1 Card */}
            <div className="rounded-2xl border border-hairline/60 bg-card/60 p-4 space-y-2">
              <Skeleton className="h-4 w-24 rounded" />
              <div className="space-y-1.5 font-mono pt-1">
                <Skeleton className="h-3.5 w-56 rounded bg-secondary/80" />
                <Skeleton className="h-3.5 w-44 rounded bg-secondary/80" />
                <Skeleton className="h-3.5 w-full rounded bg-secondary/60" />
              </div>
            </div>

            {/* Constraints */}
            <div className="space-y-2 pt-2">
              <Skeleton className="h-4 w-28 rounded" />
              <div className="space-y-1.5">
                <Skeleton className="h-3 w-48 rounded" />
                <Skeleton className="h-3 w-40 rounded" />
                <Skeleton className="h-3 w-52 rounded" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: Code Editor & Testcase Runner */}
        <div className="w-full md:w-1/2 flex flex-col overflow-hidden bg-[#0d1117] dark:bg-black/90">
          {/* Code Editor Header */}
          <div className="h-11 border-b border-white/10 px-4 flex items-center justify-between bg-black/40">
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-28 rounded-lg bg-white/10" />
              <Skeleton className="h-6 w-16 rounded-lg bg-white/10" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-6 rounded bg-white/10" />
              <Skeleton className="h-6 w-6 rounded bg-white/10" />
            </div>
          </div>

          {/* Indented Code Editor Canvas */}
          <div className="flex-1 p-4 font-mono space-y-2.5 overflow-hidden">
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-white/30 select-none w-4">1</span>
              <Skeleton className="h-4 w-32 rounded bg-white/10" />
              <Skeleton className="h-4 w-44 rounded bg-white/10" />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-white/30 select-none w-4">2</span>
              <div className="w-6 shrink-0" />
              <Skeleton className="h-4 w-28 rounded bg-white/10" />
              <Skeleton className="h-4 w-36 rounded bg-white/10" />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-white/30 select-none w-4">3</span>
              <div className="w-12 shrink-0" />
              <Skeleton className="h-4 w-48 rounded bg-white/10" />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-white/30 select-none w-4">4</span>
              <div className="w-12 shrink-0" />
              <Skeleton className="h-4 w-36 rounded bg-white/10" />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-white/30 select-none w-4">5</span>
              <div className="w-6 shrink-0" />
              <Skeleton className="h-4 w-20 rounded bg-white/10" />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-white/30 select-none w-4">6</span>
              <Skeleton className="h-4 w-16 rounded bg-white/10" />
            </div>
          </div>

          {/* Bottom Testcases Console Drawer */}
          <div className="h-44 border-t border-white/10 bg-black/60 p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-20 rounded-md bg-white/10" />
              <Skeleton className="h-6 w-20 rounded-md bg-white/10" />
              <Skeleton className="h-6 w-20 rounded-md bg-white/10" />
            </div>
            <div className="space-y-1.5 font-mono pt-1">
              <Skeleton className="h-3.5 w-60 rounded bg-white/10" />
              <Skeleton className="h-3.5 w-40 rounded bg-white/10" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
