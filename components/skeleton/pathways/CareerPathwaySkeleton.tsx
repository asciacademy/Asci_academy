import * as React from "react"
import { cn } from "@/lib/utils"
import { Skeleton } from "../Skeleton"
import { SkeletonCard } from "../SkeletonCard"

export interface CareerPathwaySkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CareerPathwaySkeleton({ className, ...props }: CareerPathwaySkeletonProps) {
  return (
    <SkeletonCard
      aria-busy="true"
      className={cn(
        "rounded-2xl border border-border/80 dark:border-white/10 bg-card p-6 flex flex-col justify-between space-y-6 shadow-xs",
        className
      )}
      {...props}
    >
      <div className="space-y-4">
        {/* Category Pill */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-28" rounded="md" />
          <Skeleton className="h-4 w-16" rounded="xs" />
        </div>

        {/* Title geometry (2 lines) */}
        <div className="space-y-2 pt-1">
          <Skeleton className="h-7 w-4/5" rounded="sm" />
          <Skeleton className="h-7 w-3/5" rounded="sm" />
        </div>

        {/* Description */}
        <div className="space-y-1.5 pt-1">
          <Skeleton className="h-3.5 w-full" rounded="xs" />
          <Skeleton className="h-3.5 w-5/6" rounded="xs" />
        </div>

        {/* In-Demand Skills section */}
        <div className="pt-3 space-y-2.5 border-t border-border/60">
          <Skeleton className="h-3 w-32" rounded="xs" />
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-6 w-20" rounded="full" />
            <Skeleton className="h-6 w-24" rounded="full" />
            <Skeleton className="h-6 w-22" rounded="full" />
            <Skeleton className="h-6 w-28" rounded="full" />
          </div>
        </div>
      </div>

      {/* Pathway Action Footer */}
      <div className="pt-4 border-t border-border/60 flex items-center justify-between">
        <Skeleton className="h-4 w-32" rounded="xs" />
        <Skeleton className="h-9 w-28" rounded="xl" />
      </div>
    </SkeletonCard>
  )
}

export function CareerPathwayShelfSkeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-busy="true"
      className={cn("w-full py-6 sm:py-8 border-b border-border/60 last:border-b-0 space-y-4", className)}
      {...props}
    >
      {/* Shelf Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-1">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-32" rounded="md" />
            <Skeleton className="h-3 w-20" rounded="xs" />
          </div>
          <Skeleton className="h-8 w-80 sm:w-96" rounded="md" />
          <Skeleton className="h-4 w-64 sm:w-80" rounded="xs" />
        </div>
        <div className="flex items-center gap-2 self-end">
          <Skeleton className="h-8 w-8" rounded="full" />
          <Skeleton className="h-8 w-8" rounded="full" />
        </div>
      </div>

      {/* Horizontal Cards Reel */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-hidden">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-border/80 bg-card p-3.5 space-y-3">
            <Skeleton className="aspect-[2/1] w-full" rounded="lg" />
            <Skeleton className="h-4 w-3/4" rounded="xs" />
            <Skeleton className="h-3 w-1/2" rounded="xs" />
          </div>
        ))}
      </div>
    </div>
  )
}
