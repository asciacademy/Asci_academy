import React from "react"
import { Terminal, Loader2 } from "lucide-react"

export default function LessonLoading() {
  return (
    <div className="flex h-full flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-border bg-background animate-pulse select-none">
      {/* Left Column: Editorial Curriculum & Lesson Guide Skeleton */}
      <div className="flex-1 overflow-y-auto p-6 lg:p-10 space-y-6 max-w-2xl mx-auto w-full">
        {/* Eyebrow & Sequence skeleton */}
        <div className="flex items-center gap-2">
          <div className="h-4 w-28 rounded bg-primary/20" />
          <span className="text-muted-foreground">•</span>
          <div className="h-4 w-16 rounded bg-muted/60" />
        </div>

        {/* Lesson Title Skeleton */}
        <div className="space-y-2">
          <div className="h-9 sm:h-10 w-4/5 rounded-xl bg-muted/80" />
          <div className="h-0.5 w-12 bg-primary/40 mt-3" />
        </div>

        {/* Lesson Content Paragraph Skeletons */}
        <div className="space-y-3 pt-2">
          <div className="h-4 w-full rounded bg-muted/60" />
          <div className="h-4 w-11/12 rounded bg-muted/60" />
          <div className="h-4 w-5/6 rounded bg-muted/50" />
          <div className="h-4 w-4/5 rounded bg-muted/50" />
        </div>

        {/* Code Example Callout Block Skeleton */}
        <div className="rounded-xl border border-stone-800 bg-[#0a0a0a] p-4 space-y-2.5 shadow-md">
          <div className="flex items-center justify-between pb-2 border-b border-stone-800 text-[11px] font-mono text-zinc-500">
            <div className="h-3.5 w-24 rounded bg-zinc-800" />
            <div className="h-3.5 w-16 rounded bg-zinc-800" />
          </div>
          <div className="space-y-1.5 pt-1">
            <div className="h-3 w-3/4 rounded bg-zinc-800/80" />
            <div className="h-3 w-1/2 rounded bg-zinc-800/60" />
            <div className="h-3 w-2/3 rounded bg-zinc-800/70" />
          </div>
        </div>

        {/* Challenge Instructions Skeleton */}
        <div className="rounded-2xl border border-border/80 bg-card p-5 space-y-3 shadow-xs">
          <div className="h-4 w-36 rounded bg-primary/25" />
          <div className="h-3.5 w-full rounded bg-muted/60" />
          <div className="h-3.5 w-4/5 rounded bg-muted/50" />
        </div>
      </div>

      {/* Right Column: Code Editor & Execution Console Skeleton */}
      <div className="flex-1 flex flex-col bg-[#070b12] min-h-[500px] border-t lg:border-t-0 border-border">
        {/* Top Editor Bar Skeleton */}
        <div className="h-11 border-b border-white/10 bg-[#0d131f] flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-24 rounded-lg bg-white/10" />
            <div className="h-5 w-28 rounded-full bg-blue-500/20 border border-blue-500/30" />
          </div>
          <div className="h-7 w-24 rounded-lg bg-primary/30" />
        </div>

        {/* Code Area Skeleton */}
        <div className="flex-1 p-5 font-mono space-y-2.5 bg-[#0b0f19]">
          {[
            "w-2/5", "w-3/5", "w-1/3", "w-4/5", "w-1/2",
            "w-2/3", "w-1/4", "w-3/4", "w-2/5", "w-1/2"
          ].map((width, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <span className="text-[11px] text-zinc-600 select-none w-5 text-right">{idx + 1}</span>
              <div className={`h-3.5 ${width} rounded bg-white/10`} />
            </div>
          ))}
        </div>

        {/* Terminal / Console Bar Skeleton */}
        <div className="h-40 border-t border-white/10 bg-[#090d16] p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <div className="flex items-center gap-2">
              <Terminal className="h-3.5 w-3.5 text-zinc-500" />
              <div className="h-3.5 w-20 rounded bg-white/10" />
            </div>
            <div className="flex items-center gap-2">
              <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
              <span className="text-xs font-mono text-zinc-400">Loading compiler &amp; sandbox...</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-8 w-28 rounded-lg bg-white/10" />
            <div className="h-8 w-24 rounded-lg bg-white/10" />
          </div>
        </div>
      </div>
    </div>
  )
}
