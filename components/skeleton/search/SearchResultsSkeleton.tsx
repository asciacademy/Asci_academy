import * as React from "react"
import { cn } from "@/lib/utils"
import { Skeleton } from "../Skeleton"
import { SkeletonCard } from "../SkeletonCard"

export interface SearchResultsSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  count?: number
}

export function SearchResultsSkeleton({
  count = 4,
  className,
  ...props
}: SearchResultsSkeletonProps) {
  return (
    <div aria-busy="true" className={cn("space-y-4 w-full", className)} {...props}>
      {/* Search Header Bar */}
      <div className="flex items-center justify-between pb-2 border-b border-border/60">
        <Skeleton className="h-4 w-32" rounded="xs" />
        <Skeleton className="h-3 w-20" rounded="xs" />
      </div>

      {/* Result Cards */}
      <div className="space-y-3">
        {Array.from({ length: count }).map((_, i) => (
          <SkeletonCard key={i} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-2 flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-16" rounded="full" />
                <Skeleton className="h-4 w-12" rounded="full" />
              </div>
              <Skeleton className="h-5 w-3/4 max-w-md" rounded="sm" />
              <Skeleton className="h-3.5 w-5/6 max-w-xl" rounded="xs" />
            </div>
            <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
              <Skeleton className="h-8 w-20" rounded="full" />
            </div>
          </SkeletonCard>
        ))}
      </div>
    </div>
  )
}
