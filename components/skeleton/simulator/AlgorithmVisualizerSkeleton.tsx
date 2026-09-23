import * as React from "react"
import { cn } from "@/lib/utils"
import { Skeleton } from "../Skeleton"

export interface AlgorithmVisualizerSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AlgorithmVisualizerSkeleton({
  className,
  ...props
}: AlgorithmVisualizerSkeletonProps) {
  // Deterministic heights for skeleton bars (non-fake, pure structural shimmer)
  const barHeights = [40, 65, 30, 80, 50, 90, 35, 75, 55, 85, 45, 70, 30, 60, 95, 40, 80, 50]

  return (
    <div
      aria-busy="true"
      className={cn(
        "rounded-2xl border border-border/80 dark:border-white/10 bg-card overflow-hidden shadow-sm w-full max-w-[1400px] mx-auto",
        className
      )}
      {...props}
    >
      {/* 1. TOOLBAR: Algorithm selection tabs & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/70 px-4 sm:px-6 py-3.5 bg-secondary/40">
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-7 w-20 sm:w-24" rounded="md" />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-16" rounded="md" />
          <Skeleton className="h-8 w-28" rounded="md" />
        </div>
      </div>

      {/* 2. Custom Input Bar Skeleton */}
      <div className="flex items-center gap-3 border-b border-border/60 px-4 sm:px-6 py-2.5 bg-background">
        <Skeleton className="h-3.5 w-20 hidden sm:block" rounded="xs" />
        <Skeleton className="h-7 flex-1" rounded="md" />
        <Skeleton className="h-7 w-16 shrink-0" rounded="md" />
      </div>

      {/* 3. VISUALIZATION CANVAS: Shimmering bar geometry */}
      <div className="flex items-end justify-center gap-1.5 sm:gap-2 px-4 sm:px-8 py-12 bg-background border-b border-border/60 h-[280px]">
        {barHeights.map((h, i) => (
          <div key={i} className="flex-1 max-w-[28px] h-full flex items-end">
            <Skeleton
              className="w-full"
              style={{ height: `${h}%` }}
              rounded="xs"
            />
          </div>
        ))}
      </div>

      {/* 4. CONTROLS FOOTER: Step info & status */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3 bg-secondary/30">
        <div className="flex items-center gap-3">
          <Skeleton className="h-3.5 w-24" rounded="xs" />
          <Skeleton className="h-3.5 w-32" rounded="xs" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-20" rounded="full" />
          <Skeleton className="h-6 w-20" rounded="full" />
        </div>
      </div>
    </div>
  )
}
