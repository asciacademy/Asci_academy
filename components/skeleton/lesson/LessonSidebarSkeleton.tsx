import * as React from "react"
import { cn } from "@/lib/utils"
import { Skeleton } from "../Skeleton"

export interface LessonSidebarSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  itemCount?: number
}

export function LessonSidebarSkeleton({
  itemCount = 6,
  className,
  ...props
}: LessonSidebarSkeletonProps) {
  return (
    <div
      aria-busy="true"
      className={cn(
        "rounded-2xl border border-border/80 dark:border-white/10 bg-card p-4 sm:p-5 space-y-4 shadow-sm",
        className
      )}
      {...props}
    >
      {/* Curriculum Header */}
      <div className="flex items-center justify-between border-b border-border/60 pb-3">
        <div className="space-y-1">
          <Skeleton className="h-4.5 w-32" rounded="xs" />
          <Skeleton className="h-3 w-20" rounded="xs" />
        </div>
        <Skeleton className="h-5 w-14" rounded="full" />
      </div>

      {/* Module Lessons List */}
      <div className="space-y-2">
        {Array.from({ length: itemCount }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-3 p-2.5 rounded-xl border border-border/50 bg-secondary/30"
          >
            <Skeleton className="h-6 w-6 rounded-full shrink-0" />
            <div className="flex-1 min-w-0 space-y-1">
              <Skeleton className="h-3.5 w-4/5" rounded="xs" />
              <Skeleton className="h-2.5 w-16" rounded="xs" />
            </div>
            <Skeleton className="h-3.5 w-8 rounded-xs" />
          </div>
        ))}
      </div>
    </div>
  )
}
