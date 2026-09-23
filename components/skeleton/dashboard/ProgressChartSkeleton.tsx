import * as React from "react"
import { cn } from "@/lib/utils"
import { Skeleton } from "../Skeleton"
import { SkeletonCard } from "../SkeletonCard"

export interface ProgressChartSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ProgressChartSkeleton({ className, ...props }: ProgressChartSkeletonProps) {
  return (
    <SkeletonCard
      aria-busy="true"
      className={cn("rounded-3xl border border-border/70 bg-card p-6 sm:p-7 space-y-6 shadow-xs", className)}
      {...props}
    >
      {/* Chart Title & Filters Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1.5">
          <Skeleton className="h-5 w-44" rounded="sm" />
          <Skeleton className="h-3 w-56" rounded="xs" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-7 w-20" rounded="lg" />
          <Skeleton className="h-7 w-20" rounded="lg" />
        </div>
      </div>

      {/* SVG Skeleton Path + Bar Columns Wireframe (No fake data values) */}
      <div className="relative h-56 w-full flex flex-col justify-end pt-4 pb-2 px-2 border-b border-border/60">
        {/* Subtle Wave / Line Path */}
        <svg
          className="absolute inset-x-0 top-6 w-full h-32 text-border/70 overflow-visible pointer-events-none opacity-40"
          preserveAspectRatio="none"
          viewBox="0 0 100 40"
        >
          <path
            d="M 0 30 Q 15 10, 30 25 T 60 15 T 85 28 T 100 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="3 3"
          />
        </svg>

        {/* Vertical Shimmer Bar Columns + Labels */}
        <div className="relative z-10 flex items-end justify-between gap-3 sm:gap-6 h-full">
          {[35, 60, 45, 80, 55, 70, 90].map((h, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
              <Skeleton
                style={{ height: `${h}%` }}
                className="w-full max-w-[40px] rounded-t-lg opacity-80"
              />
              <Skeleton className="h-2.5 w-6" rounded="xs" />
            </div>
          ))}
        </div>
      </div>
    </SkeletonCard>
  )
}
