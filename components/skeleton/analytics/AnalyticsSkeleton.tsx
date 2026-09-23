import * as React from "react"
import { cn } from "@/lib/utils"
import { Skeleton } from "../Skeleton"
import { SkeletonBadge } from "../SkeletonBadge"

export interface AnalyticsSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AnalyticsSkeleton({ className, ...props }: AnalyticsSkeletonProps) {
  return (
    <div
      aria-busy="true"
      className={cn("max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8 select-none", className)}
      {...props}
    >
      {/* 1. Header with Title & Date Range Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div className="space-y-1">
          <Skeleton className="h-7 w-48" rounded="sm" />
          <Skeleton className="h-4 w-64" rounded="xs" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-28" rounded="lg" />
          <Skeleton className="h-8 w-24" rounded="lg" />
        </div>
      </div>

      {/* 2. 4 KPI Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className="p-5 rounded-2xl border border-border/70 bg-card space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <Skeleton className="h-3.5 w-24" rounded="xs" />
              <SkeletonBadge size="sm" width="w-12" />
            </div>
            <Skeleton className="h-8 w-20" rounded="sm" />
            <Skeleton className="h-2.5 w-32" rounded="xs" />
          </div>
        ))}
      </div>

      {/* 3. Charts: Activity Line/Bar + Skill Proficiency Bars */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Chart */}
        <div className="rounded-3xl border border-border/70 bg-card p-6 space-y-5 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Skeleton className="h-5 w-40" rounded="sm" />
              <Skeleton className="h-3 w-52" rounded="xs" />
            </div>
            <Skeleton className="h-6 w-16" rounded="xs" />
          </div>

          <div className="h-48 w-full flex items-end justify-between gap-3 pt-6 pb-2 border-b border-border/60 px-2">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <Skeleton
                  style={{ height: `${25 + ((i * 17) % 60)}%` }}
                  className="w-full max-w-[28px] rounded-t-md"
                />
                <Skeleton className="h-2.5 w-6" rounded="xs" />
              </div>
            ))}
          </div>
        </div>

        {/* Skill Proficiency Horizontal Bars */}
        <div className="rounded-3xl border border-border/70 bg-card p-6 space-y-5 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Skeleton className="h-5 w-36" rounded="sm" />
              <Skeleton className="h-3 w-48" rounded="xs" />
            </div>
            <Skeleton className="h-6 w-16" rounded="xs" />
          </div>

          <div className="space-y-3.5 pt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between">
                  <Skeleton className="h-3 w-28" rounded="xs" />
                  <Skeleton className="h-3 w-10" rounded="xs" />
                </div>
                <Skeleton className="h-2 w-full rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Activity Contribution Heatmap Grid */}
      <div className="rounded-3xl border border-border/70 bg-card p-6 space-y-4 shadow-xs">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-44" rounded="sm" />
          <Skeleton className="h-3 w-28" rounded="xs" />
        </div>
        <div className="overflow-x-auto pb-2">
          <div className="grid grid-flow-col grid-rows-7 gap-1.5 w-max">
            {Array.from({ length: 7 * 26 }).map((_, idx) => (
              <Skeleton
                key={idx}
                className="w-3 h-3 rounded-xs shrink-0"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
