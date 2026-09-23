import * as React from "react"
import { cn } from "@/lib/utils"
import { Skeleton } from "../Skeleton"
import { SkeletonAvatar } from "../SkeletonAvatar"
import { SkeletonBadge } from "../SkeletonBadge"
import { SkeletonButton } from "../SkeletonButton"
import { SkeletonParagraph } from "../SkeletonParagraph"

export interface ProfileSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ProfileSkeleton({ className, ...props }: ProfileSkeletonProps) {
  return (
    <div
      aria-busy="true"
      className={cn("max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 select-none", className)}
      {...props}
    >
      {/* 1. Profile Header Card */}
      <div className="rounded-3xl border border-border/80 dark:border-white/10 bg-card overflow-hidden shadow-xs">
        {/* Cover Banner */}
        <div className="h-32 sm:h-44 w-full bg-[var(--skeleton-base)] overflow-hidden">
          <Skeleton className="w-full h-full rounded-none" />
        </div>

        {/* Profile Info Row: Avatar, Name, Username, Badges & Actions */}
        <div className="p-6 sm:p-8 pt-0 relative flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5 -mt-12 sm:-mt-16">
            <div className="relative">
              <SkeletonAvatar size="xl" className="h-24 w-24 sm:h-28 sm:w-28 border-4 border-card" />
              <div className="absolute bottom-1 right-1">
                <Skeleton className="h-7 w-7 rounded-full border-2 border-card" />
              </div>
            </div>
            <div className="space-y-1.5 pt-2">
              <div className="flex items-center gap-2.5">
                <Skeleton className="h-7 w-48" rounded="sm" />
                <SkeletonBadge size="sm" width="w-20" />
              </div>
              <Skeleton className="h-4 w-32" rounded="xs" />
              <Skeleton className="h-3.5 w-64 max-w-full" rounded="xs" />
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <SkeletonButton size="md" className="flex-1 sm:flex-none w-32" rounded="xl" />
            <SkeletonButton size="md" className="w-10 bg-secondary/80" rounded="xl" />
          </div>
        </div>
      </div>

      {/* 2. 4 Metric Stats: XP, Level, Streak, Solved */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className="p-5 rounded-2xl border border-border/80 bg-card space-y-2">
            <Skeleton className="h-3 w-20" rounded="xs" />
            <Skeleton className="h-7 w-16" rounded="sm" />
            <Skeleton className="h-2 w-full rounded-full" />
          </div>
        ))}
      </div>

      {/* 3. Two Column Split: Left Bio & Skills vs Right Enrolled Courses & Certifications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Bio & Skills */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-border/80 bg-card p-5 space-y-3">
            <Skeleton className="h-4 w-20" rounded="xs" />
            <SkeletonParagraph lines={3} />
          </div>

          <div className="rounded-2xl border border-border/80 bg-card p-5 space-y-3">
            <Skeleton className="h-4 w-28" rounded="xs" />
            <div className="flex flex-wrap gap-2 pt-1">
              <SkeletonBadge size="md" width="w-20" />
              <SkeletonBadge size="md" width="w-24" />
              <SkeletonBadge size="md" width="w-16" />
              <SkeletonBadge size="md" width="w-28" />
              <SkeletonBadge size="md" width="w-20" />
            </div>
          </div>
        </div>

        {/* Right Column: Active Courses & Certificates */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-border/80 bg-card p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <Skeleton className="h-5 w-40" rounded="sm" />
              <Skeleton className="h-4 w-16" rounded="xs" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="p-4 rounded-xl border border-border/60 bg-secondary/30 space-y-2.5">
                  <Skeleton className="h-4 w-36" rounded="xs" />
                  <Skeleton className="h-3 w-24" rounded="xs" />
                  <Skeleton className="h-2 w-full rounded-full" />
                </div>
              ))}
            </div>
          </div>

          {/* Activity Timeline Card */}
          <div className="rounded-2xl border border-border/80 bg-card p-5 sm:p-6 space-y-3">
            <Skeleton className="h-5 w-32" rounded="sm" />
            <div className="space-y-3 pt-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="h-3 w-3 rounded-full" />
                  <Skeleton className="h-3.5 flex-1" rounded="xs" />
                  <Skeleton className="h-3 w-16" rounded="xs" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
