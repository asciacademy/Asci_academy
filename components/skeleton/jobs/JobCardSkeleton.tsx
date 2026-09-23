import * as React from "react"
import { cn } from "@/lib/utils"
import { Skeleton } from "../Skeleton"
import { SkeletonBadge } from "../SkeletonBadge"
import { SkeletonButton } from "../SkeletonButton"

export interface JobCardSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function JobCardSkeleton({ className, ...props }: JobCardSkeletonProps) {
  return (
    <div
      aria-busy="true"
      className={cn(
        "rounded-2xl border border-border/80 dark:border-white/10 bg-card p-5 sm:p-6 flex flex-col justify-between shadow-2xs select-none",
        className
      )}
      {...props}
    >
      <div className="space-y-4">
        {/* Header: Company Logo, Name, Role Type & Badges */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3.5 min-w-0 flex-1">
            <Skeleton className="w-12 h-12 rounded-xl shrink-0 border border-border/60" />
            <div className="min-w-0 flex-1 space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <Skeleton className="h-4 w-24" rounded="xs" />
                <SkeletonBadge size="sm" width="w-16" />
              </div>
              <Skeleton className="h-5 w-48 max-w-full" rounded="xs" />
            </div>
          </div>
          <SkeletonBadge size="sm" width="w-16" />
        </div>

        {/* Location & Salary Chips */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <Skeleton className="h-3.5 w-24" rounded="xs" />
          <Skeleton className="h-3.5 w-28" rounded="xs" />
          <Skeleton className="h-3.5 w-20" rounded="xs" />
        </div>

        {/* Tags / Required Skills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <SkeletonBadge size="sm" width="w-16" />
          <SkeletonBadge size="sm" width="w-20" />
          <SkeletonBadge size="sm" width="w-14" />
          <SkeletonBadge size="sm" width="w-24" />
        </div>
      </div>

      {/* Footer: Posted Date & Apply Button */}
      <div className="pt-4 mt-4 border-t border-border/60 flex items-center justify-between gap-3">
        <Skeleton className="h-3 w-24" rounded="xs" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-9" rounded="xl" />
          <SkeletonButton size="sm" className="w-24 h-9" rounded="xl" />
        </div>
      </div>
    </div>
  )
}
