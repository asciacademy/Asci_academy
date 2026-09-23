import * as React from "react"
import { cn } from "@/lib/utils"
import { Skeleton } from "../Skeleton"
import { SkeletonAvatar } from "../SkeletonAvatar"
import { SkeletonBadge } from "../SkeletonBadge"

export interface LeaderboardSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  rowCount?: number
}

export function LeaderboardSkeleton({
  rowCount = 8,
  className,
  ...props
}: LeaderboardSkeletonProps) {
  return (
    <div
      aria-busy="true"
      className={cn("max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6 select-none", className)}
      {...props}
    >
      {/* 1. Header Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div className="space-y-1">
          <Skeleton className="h-7 w-48" rounded="sm" />
          <Skeleton className="h-4 w-64" rounded="xs" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-24" rounded="lg" />
          <Skeleton className="h-8 w-24" rounded="lg" />
        </div>
      </div>

      {/* 2. Podium (Top 3) */}
      <div className="grid grid-cols-3 gap-3 sm:gap-6 items-end pt-4 pb-2">
        {/* Silver (Rank 2) */}
        <div className="rounded-2xl border border-border/80 bg-card p-4 sm:p-5 flex flex-col items-center text-center space-y-3 shadow-xs">
          <Skeleton className="h-5 w-8" rounded="full" />
          <SkeletonAvatar size="md" />
          <Skeleton className="h-4 w-20" rounded="xs" />
          <SkeletonBadge size="sm" width="w-16" />
        </div>

        {/* Gold (Rank 1 - Elevated) */}
        <div className="rounded-2xl border-2 border-amber-500/30 bg-card p-5 sm:p-6 flex flex-col items-center text-center space-y-3.5 shadow-md -translate-y-2">
          <Skeleton className="h-6 w-10" rounded="full" />
          <SkeletonAvatar size="lg" />
          <Skeleton className="h-5 w-28" rounded="xs" />
          <SkeletonBadge size="sm" width="w-20" />
        </div>

        {/* Bronze (Rank 3) */}
        <div className="rounded-2xl border border-border/80 bg-card p-4 sm:p-5 flex flex-col items-center text-center space-y-3 shadow-xs">
          <Skeleton className="h-5 w-8" rounded="full" />
          <SkeletonAvatar size="md" />
          <Skeleton className="h-4 w-20" rounded="xs" />
          <SkeletonBadge size="sm" width="w-16" />
        </div>
      </div>

      {/* 3. Leaderboard Rows: 01 ○ ████████████ █████ █████ */}
      <div className="rounded-2xl border border-border/80 bg-card overflow-hidden shadow-xs divide-y divide-border/60">
        {Array.from({ length: rowCount }).map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-3.5 sm:p-4 hover:bg-secondary/20 transition-colors"
          >
            {/* Rank + Avatar + Name */}
            <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
              <span className="font-mono text-xs text-muted-foreground/60 w-6 text-center shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <SkeletonAvatar size="sm" />
              <div className="space-y-1 min-w-0 flex-1">
                <Skeleton className="h-4 w-32 sm:w-44" rounded="xs" />
                <Skeleton className="h-3 w-20" rounded="xs" />
              </div>
            </div>

            {/* Score & Streak Badges */}
            <div className="flex items-center gap-3 sm:gap-4 shrink-0">
              <Skeleton className="h-4 w-16" rounded="xs" />
              <SkeletonBadge size="sm" width="w-16" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
