import * as React from "react"
import { cn } from "@/lib/utils"
import { Skeleton } from "../Skeleton"

export interface StatSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function StatSkeleton({ className, ...props }: StatSkeletonProps) {
  return (
    <div
      aria-busy="true"
      className={cn(
        "relative rounded-2xl border border-border/80 dark:border-white/10 bg-card/60 p-6 flex flex-col justify-between space-y-4",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-10" rounded="xl" />
        <Skeleton className="h-5 w-20" rounded="full" />
      </div>

      <div className="space-y-2 pt-2">
        {/* NUMBER geometry */}
        <Skeleton className="h-8 sm:h-10 w-28" rounded="sm" />
        {/* LABEL */}
        <Skeleton className="h-4 w-36" rounded="xs" />
        {/* DESCRIPTION */}
        <Skeleton className="h-3 w-48" rounded="xs" />
      </div>
    </div>
  )
}

export function StatsGridSkeleton({
  count = 4,
  className,
  ...props
}: { count?: number } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <section
      aria-busy="true"
      className={cn(
        "py-16 max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-8",
        className
      )}
      {...props}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <StatSkeleton key={i} />
        ))}
      </div>
    </section>
  )
}
