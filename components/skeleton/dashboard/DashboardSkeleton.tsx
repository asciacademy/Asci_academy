import * as React from "react"
import { cn } from "@/lib/utils"
import { Skeleton } from "../Skeleton"
import { SkeletonAvatar } from "../SkeletonAvatar"
import { SkeletonBadge } from "../SkeletonBadge"
import { SkeletonButton } from "../SkeletonButton"
import { SidebarSkeleton } from "../navigation/SidebarSkeleton"
import { CourseGridSkeleton } from "../courses/CourseGridSkeleton"
import { ProgressChartSkeleton } from "./ProgressChartSkeleton"

export interface DashboardSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DashboardSkeleton({ className, ...props }: DashboardSkeletonProps) {
  return (
    <div
      aria-busy="true"
      className={cn(
        "min-h-screen bg-background text-foreground flex flex-col md:flex-row antialiased select-none",
        className
      )}
      {...props}
    >
      {/* 1. Left Sidebar Navigation Skeleton */}
      <div className="hidden md:block">
        <SidebarSkeleton />
      </div>

      {/* 2. Main Dashboard Workspace */}
      <main className="flex-1 min-w-0 flex flex-col">
        {/* Mobile Header Bar Skeleton */}
        <div className="md:hidden h-16 border-b border-border/60 bg-card px-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Skeleton className="h-8 w-8" rounded="lg" />
            <Skeleton className="h-4 w-24" rounded="xs" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8" rounded="full" />
            <Skeleton className="h-8 w-8" rounded="full" />
          </div>
        </div>

        <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-[1400px] w-full mx-auto">
          {/* Welcome User Banner */}
          <div className="rounded-3xl border border-border/80 dark:border-white/10 bg-card/70 p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-xs">
            <div className="flex items-center gap-4 sm:gap-5">
              <SkeletonAvatar size="xl" />
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <Skeleton className="h-6 sm:h-7 w-48" rounded="sm" />
                  <SkeletonBadge size="sm" width="w-20" />
                </div>
                <Skeleton className="h-3.5 w-64 max-w-full" rounded="xs" />
              </div>
            </div>

            {/* Quick Action Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <Skeleton className="h-8 w-28" rounded="full" />
              <Skeleton className="h-8 w-32" rounded="full" />
              <Skeleton className="h-8 w-24" rounded="full" />
            </div>
          </div>

          {/* 4 KPI Cards Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl border border-border/80 dark:border-white/10 bg-card space-y-3 shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <Skeleton className="h-3.5 w-24" rounded="xs" />
                  <Skeleton className="h-8 w-8" rounded="xl" />
                </div>
                <Skeleton className="h-8 w-20" rounded="sm" />
                <Skeleton className="h-2.5 w-32" rounded="xs" />
              </div>
            ))}
          </div>

          {/* Bento: Continue Learning Card + Problem of the Day */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Continue Learning Course (2 Cols) */}
            <div className="lg:col-span-2 rounded-3xl border border-border/80 dark:border-white/10 bg-card p-6 space-y-5 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4" rounded="xs" />
                  <Skeleton className="h-5 w-40" rounded="xs" />
                </div>
                <SkeletonBadge size="sm" width="w-20" />
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <Skeleton className="w-full sm:w-44 aspect-[16/10] rounded-xl shrink-0" />
                <div className="space-y-2 flex-1 w-full">
                  <Skeleton className="h-5 w-3/4" rounded="xs" />
                  <Skeleton className="h-3 w-1/2" rounded="xs" />
                  <div className="space-y-1.5 pt-2 max-w-sm">
                    <div className="flex justify-between">
                      <Skeleton className="h-2 w-20" rounded="xs" />
                      <Skeleton className="h-2 w-8" rounded="xs" />
                    </div>
                    <Skeleton className="h-2 w-full" rounded="full" />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border/60">
                <Skeleton className="h-3 w-32" rounded="xs" />
                <SkeletonButton size="sm" className="w-32" rounded="xl" />
              </div>
            </div>

            {/* Problem of the Day (1 Col) */}
            <div className="rounded-3xl border border-border/80 dark:border-white/10 bg-card p-6 space-y-4 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Skeleton className="h-5 w-28" rounded="xs" />
                  <SkeletonBadge size="sm" width="w-14" />
                </div>
                <Skeleton className="h-5 w-full mb-2" rounded="xs" />
                <div className="space-y-1.5">
                  <Skeleton className="h-3 w-full" rounded="xs" />
                  <Skeleton className="h-3 w-3/4" rounded="xs" />
                </div>
              </div>
              <div className="pt-3 border-t border-border/60 flex items-center justify-between">
                <Skeleton className="h-3 w-20" rounded="xs" />
                <SkeletonButton size="sm" className="w-24" rounded="xl" />
              </div>
            </div>
          </div>

          {/* Learning Progress Chart */}
          <ProgressChartSkeleton />

          {/* Recommended Programs */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Skeleton className="h-5 w-48" rounded="sm" />
                <Skeleton className="h-3 w-64" rounded="xs" />
              </div>
              <Skeleton className="h-4 w-20" rounded="xs" />
            </div>
            <CourseGridSkeleton count={3} />
          </div>
        </div>
      </main>
    </div>
  )
}
