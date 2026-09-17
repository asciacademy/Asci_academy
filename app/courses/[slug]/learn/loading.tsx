import React from "react"
import { BookOpen, Terminal, ShieldCheck, Play, Video } from "lucide-react"

export default function LearnLoading() {
  return (
    <div className="flex-1 flex flex-col h-full bg-background p-6 lg:p-12 relative overflow-y-auto">
      <div className="max-w-4xl relative z-10 my-auto py-6 space-y-8 animate-pulse">
        {/* Workspace Pill Skeleton */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-primary/20 bg-primary/10">
          <BookOpen className="h-3.5 w-3.5 text-primary/60" />
          <div className="h-3.5 w-32 rounded bg-primary/20" />
        </div>

        {/* Large Heading Skeleton */}
        <div className="space-y-3">
          <div className="h-10 sm:h-12 w-3/4 rounded-2xl bg-muted/80" />
          <div className="h-4 sm:h-5 w-1/2 rounded-lg bg-muted/50" />
        </div>

        {/* Action Button Skeleton */}
        <div className="flex items-center gap-4">
          <div className="h-12 w-52 rounded-full bg-primary/30" />
        </div>

        {/* Video Lecture Skeleton Box */}
        <div className="rounded-2xl border border-border/80 bg-card p-4 sm:p-6 space-y-4 shadow-sm">
          <div className="flex items-center gap-2">
            <Video className="h-4 w-4 text-primary/60" />
            <div className="h-4 w-44 rounded bg-muted/70" />
          </div>
          <div className="relative aspect-[16/9] w-full rounded-xl bg-muted/60 flex items-center justify-center">
            <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
              <Play className="h-5 w-5 text-primary/40 ml-0.5 fill-current" />
            </div>
          </div>
        </div>

        {/* Dual Interactive Feature Cards Skeleton */}
        <div className="grid sm:grid-cols-2 gap-4 max-w-xl">
          <div className="p-5 border border-border bg-card rounded-xl space-y-2.5 shadow-sm">
            <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <Terminal className="h-4 w-4 text-primary/40" />
            </div>
            <div className="h-4 w-28 rounded bg-muted/80" />
            <div className="h-3 w-40 rounded bg-muted/50" />
          </div>
          <div className="p-5 border border-border bg-card rounded-xl space-y-2.5 shadow-sm">
            <div className="h-9 w-9 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <ShieldCheck className="h-4 w-4 text-blue-500/40" />
            </div>
            <div className="h-4 w-32 rounded bg-muted/80" />
            <div className="h-3 w-40 rounded bg-muted/50" />
          </div>
        </div>
      </div>
    </div>
  )
}
