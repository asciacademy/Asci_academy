import * as React from "react"
import { cn } from "@/lib/utils"
import { Skeleton } from "../Skeleton"
import { SkeletonCard } from "../SkeletonCard"

export interface RoadmapSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  stepCount?: number
}

export function RoadmapSkeleton({
  stepCount = 4,
  className,
  ...props
}: RoadmapSkeletonProps) {
  return (
    <div
      aria-busy="true"
      className={cn("w-full max-w-3xl mx-auto py-8 space-y-2", className)}
      {...props}
    >
      {/* 1. Start Node */}
      <div className="flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/80 dark:border-white/10 bg-card">
          <Skeleton className="h-2 w-2 rounded-full" />
          <Skeleton className="h-3 w-12" rounded="xs" />
        </div>

        {/* Connector to First Card */}
        <div className="flex flex-col items-center my-2">
          <div className="w-[2px] h-6 bg-border/80" />
          <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] border-t-border" />
        </div>
      </div>

      {/* 2. Step Milestone Nodes */}
      {Array.from({ length: stepCount }).map((_, i) => (
        <div key={i} className="flex flex-col items-center w-full">
          {/* Milestone Node Card */}
          <SkeletonCard className="w-full p-5 sm:p-6 border border-border/80 dark:border-white/10 bg-card/90 shadow-xs space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <Skeleton className="h-7 w-16" rounded="lg" />
                <div className="space-y-1.5 flex-1 min-w-0">
                  <Skeleton className="h-5 w-3/4 max-w-xs" rounded="xs" />
                  <Skeleton className="h-3 w-1/2 max-w-[200px]" rounded="xs" />
                </div>
              </div>

              {/* Progress Bar / Pill */}
              <div className="hidden sm:flex items-center gap-2">
                <Skeleton className="h-2 w-20" rounded="full" />
                <Skeleton className="h-4 w-10" rounded="xs" />
              </div>
            </div>

            {/* Sub-topics / Checkpoints (○ ○ ○ ○) */}
            <div className="pt-2 border-t border-border/60 flex items-center gap-4 flex-wrap">
              {Array.from({ length: 4 }).map((_, dotIdx) => (
                <div key={dotIdx} className="flex items-center gap-2">
                  <Skeleton className="h-3.5 w-3.5 rounded-full" />
                  <Skeleton className="h-3 w-16 sm:w-20" rounded="xs" />
                </div>
              ))}
            </div>
          </SkeletonCard>

          {/* Connector to Next Card */}
          {i < stepCount - 1 && (
            <div className="flex flex-col items-center my-2">
              <div className="w-[2px] h-7 bg-border/80" />
              <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] border-t-border" />
            </div>
          )}
        </div>
      ))}

      {/* 3. Goal / Completion Node */}
      <div className="flex flex-col items-center pt-2">
        <div className="flex flex-col items-center my-2">
          <div className="w-[2px] h-6 bg-border/80" />
          <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] border-t-border" />
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-primary/20 bg-primary/10">
          <Skeleton className="h-2.5 w-2.5 rounded-full" />
          <Skeleton className="h-3 w-20" rounded="xs" />
        </div>
      </div>
    </div>
  )
}
