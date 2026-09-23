import * as React from "react"
import { cn } from "@/lib/utils"
import { Skeleton } from "../Skeleton"
import { JobCardSkeleton } from "./JobCardSkeleton"

export interface JobBoardSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  count?: number
}

export function JobBoardSkeleton({
  count = 6,
  className,
  ...props
}: JobBoardSkeletonProps) {
  return (
    <div aria-busy="true" className={cn("space-y-8 max-w-[1400px] mx-auto py-8", className)} {...props}>
      {/* Header and Filter Toolbar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-border/60">
        <div className="space-y-2">
          <Skeleton className="h-6 w-32" rounded="full" />
          <Skeleton className="h-8 sm:h-9 w-64 sm:w-80" rounded="sm" />
          <Skeleton className="h-4 w-72 sm:w-96" rounded="xs" />
        </div>

        <div className="flex items-center gap-2.5">
          <Skeleton className="h-10 w-44" rounded="xl" />
          <Skeleton className="h-10 w-28" rounded="xl" />
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex overflow-x-auto gap-2 py-1">
        {["All Roles", "Full-Stack", "Backend", "AI / ML", "DevOps", "Internships"].map((_, i) => (
          <Skeleton key={i} className="h-8 w-24 shrink-0" rounded="full" />
        ))}
      </div>

      {/* Job Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: count }).map((_, i) => (
          <JobCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}
