import * as React from "react"
import { cn } from "@/lib/utils"
import { Skeleton } from "../Skeleton"
import { SkeletonButton } from "../SkeletonButton"

export interface FilterDrawerSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function FilterDrawerSkeleton({ className, ...props }: FilterDrawerSkeletonProps) {
  return (
    <div
      aria-busy="true"
      className={cn(
        "rounded-2xl border border-border/80 dark:border-white/10 bg-card p-4 sm:p-5 space-y-4 shadow-sm",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between pb-2 border-b border-border/60">
        <Skeleton className="h-4 w-28" rounded="xs" />
        <Skeleton className="h-3 w-16" rounded="xs" />
      </div>

      {/* Credential / Category Pills */}
      <div className="space-y-2">
        <Skeleton className="h-3 w-20" rounded="xs" />
        <div className="flex flex-wrap gap-1.5">
          <Skeleton className="h-7 w-20" rounded="lg" />
          <Skeleton className="h-7 w-28" rounded="lg" />
          <Skeleton className="h-7 w-24" rounded="lg" />
          <Skeleton className="h-7 w-16" rounded="lg" />
        </div>
      </div>

      {/* Difficulty Level */}
      <div className="space-y-2">
        <Skeleton className="h-3 w-16" rounded="xs" />
        <div className="flex flex-wrap gap-1.5">
          <Skeleton className="h-7 w-20" rounded="lg" />
          <Skeleton className="h-7 w-24" rounded="lg" />
          <Skeleton className="h-7 w-20" rounded="lg" />
        </div>
      </div>

      {/* Duration / Commitment */}
      <div className="space-y-2">
        <Skeleton className="h-3 w-20" rounded="xs" />
        <div className="flex flex-wrap gap-1.5">
          <Skeleton className="h-7 w-24" rounded="lg" />
          <Skeleton className="h-7 w-28" rounded="lg" />
          <Skeleton className="h-7 w-20" rounded="lg" />
        </div>
      </div>

      {/* Providers / Partners */}
      <div className="space-y-2">
        <Skeleton className="h-3 w-18" rounded="xs" />
        <div className="flex flex-wrap gap-1.5">
          <Skeleton className="h-7 w-16" rounded="lg" />
          <Skeleton className="h-7 w-24" rounded="lg" />
          <Skeleton className="h-7 w-16" rounded="lg" />
          <Skeleton className="h-7 w-20" rounded="lg" />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-2 flex items-center gap-2 border-t border-border/60">
        <SkeletonButton size="sm" className="flex-1" rounded="xl" />
        <SkeletonButton size="sm" className="w-24" rounded="xl" />
      </div>
    </div>
  )
}
