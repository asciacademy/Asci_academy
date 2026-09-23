import React from "react"
import { Skeleton, SkeletonBadge, SkeletonButton, SkeletonText } from "@/components/skeletons"

export default function LessonLoading() {
  return (
    <div
      aria-busy="true"
      aria-label="Loading interactive lesson"
      className="flex h-full flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-border bg-background select-none"
    >
      {/* Left Column: Lesson Curriculum & Guide */}
      <div className="flex-1 overflow-y-auto p-6 lg:p-10 space-y-6 max-w-2xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <SkeletonBadge className="h-5 w-28" />
          <span className="text-muted-foreground/30">•</span>
          <Skeleton className="h-4 w-16 rounded" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-9 sm:h-10 w-4/5 rounded-xl" />
          <div className="h-0.5 w-12 bg-primary/40 mt-3" />
        </div>

        <SkeletonText lines={4} lastLineWidth="80%" lineHeight="h-4" gap="space-y-2.5" />

        {/* Code Example Callout Block */}
        <div className="rounded-xl border border-hairline/60 bg-card p-4 space-y-2.5 shadow-sm">
          <div className="flex items-center justify-between pb-2 border-b border-hairline/40">
            <Skeleton className="h-3.5 w-24 rounded" />
            <Skeleton className="h-3.5 w-16 rounded" />
          </div>
          <div className="space-y-1.5 pt-1 font-mono">
            <Skeleton className="h-3 w-3/4 rounded" />
            <Skeleton className="h-3 w-1/2 rounded" />
            <Skeleton className="h-3 w-2/3 rounded" />
          </div>
        </div>

        {/* Challenge Instructions */}
        <div className="rounded-2xl border border-border/80 bg-card p-5 space-y-3 shadow-xs">
          <Skeleton className="h-4 w-36 rounded" />
          <SkeletonText lines={2} lastLineWidth="75%" lineHeight="h-3.5" />
        </div>
      </div>

      {/* Right Column: Code Editor & Execution Console */}
      <div className="flex-1 flex flex-col bg-[#070b12] min-h-[500px] border-t lg:border-t-0 border-border">
        {/* Top Editor Bar */}
        <div className="h-11 border-b border-white/10 bg-[#0d131f] flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-24 rounded-lg bg-white/10" />
            <SkeletonBadge className="h-5 w-28 bg-white/10" />
          </div>
          <SkeletonButton size="sm" className="w-24 h-7 bg-primary/30" />
        </div>

        {/* Indented Code Editor Canvas */}
        <div className="flex-1 p-5 font-mono space-y-2.5 bg-[#0b0f19]">
          {[
            "w-2/5", "w-3/5", "w-1/3", "w-4/5", "w-1/2",
            "w-2/3", "w-1/4", "w-3/4", "w-2/5", "w-1/2"
          ].map((width, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <span className="text-[11px] text-zinc-600 select-none w-5 text-right">{idx + 1}</span>
              <Skeleton className={`h-3.5 ${width} rounded bg-white/10`} />
            </div>
          ))}
        </div>

        {/* Console / Status Bar */}
        <div className="h-36 border-t border-white/10 bg-[#090d16] p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <Skeleton className="h-3.5 w-24 rounded bg-white/10" />
            <Skeleton className="h-3.5 w-36 rounded bg-white/10" />
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-28 rounded-lg bg-white/10" />
            <Skeleton className="h-8 w-24 rounded-lg bg-white/10" />
          </div>
        </div>
      </div>
    </div>
  )
}
