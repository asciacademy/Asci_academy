import * as React from "react"
import { cn } from "@/lib/utils"
import { Skeleton } from "../Skeleton"

export interface PaginationSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  pageCount?: number
}

export function PaginationSkeleton({
  pageCount = 5,
  className,
  ...props
}: PaginationSkeletonProps) {
  return (
    <div
      aria-busy="true"
      className={cn(
        "flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border/60 pt-6 w-full",
        className
      )}
      {...props}
    >
      {/* Left: Page count summary & bar */}
      <div className="flex items-center gap-3">
        <Skeleton className="h-4 w-36 sm:w-48" rounded="xs" />
        <Skeleton className="hidden sm:block h-1.5 w-24" rounded="full" />
      </div>

      {/* Right: Previous + Numeric buttons + Next */}
      <div className="flex items-center gap-1.5 flex-wrap justify-center">
        {/* Prev button */}
        <Skeleton className="h-8 w-20" rounded="xl" />

        {/* Numeric page buttons */}
        {Array.from({ length: pageCount }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-8" rounded="xl" />
        ))}

        {/* Next button */}
        <Skeleton className="h-8 w-18" rounded="xl" />
      </div>
    </div>
  )
}
