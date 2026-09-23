import * as React from "react"
import { cn } from "@/lib/utils"
import { Skeleton } from "../Skeleton"
import { SkeletonIcon } from "../SkeletonIcon"

export interface SearchOverlaySkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SearchOverlaySkeleton({ className, ...props }: SearchOverlaySkeletonProps) {
  return (
    <div
      aria-busy="true"
      className={cn(
        "w-full max-w-xl mx-auto rounded-2xl border border-border/80 dark:border-white/15 bg-card/98 dark:bg-black/98 p-0 overflow-hidden shadow-2xl backdrop-blur-2xl",
        className
      )}
      {...props}
    >
      {/* 1. Search Input Bar */}
      <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border/70 dark:border-white/10">
        <SkeletonIcon size="md" rounded="sm" />
        <Skeleton className="h-4.5 w-64 sm:w-80" rounded="sm" />
        <div className="ml-auto flex items-center gap-1">
          <Skeleton className="h-5 w-10" rounded="sm" />
        </div>
      </div>

      {/* 2. Command List Content */}
      <div className="p-3 space-y-4 max-h-[380px] overflow-hidden">
        {/* Recent Searches */}
        <div className="space-y-2">
          <Skeleton className="h-3 w-24 ml-1" rounded="xs" />
          <div className="flex flex-wrap gap-1.5 px-1">
            <Skeleton className="h-6 w-20" rounded="full" />
            <Skeleton className="h-6 w-28" rounded="full" />
            <Skeleton className="h-6 w-24" rounded="full" />
          </div>
        </div>

        {/* Group: Courses & Curricula */}
        <div className="space-y-1.5">
          <Skeleton className="h-3 w-36 ml-1" rounded="xs" />
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-2.5 rounded-xl border border-transparent bg-secondary/30"
            >
              <Skeleton className="h-7 w-7 shrink-0 rounded-lg mt-0.5" />
              <div className="space-y-1.5 flex-1 min-w-0">
                <Skeleton className="h-3.5 w-44" rounded="xs" />
                <Skeleton className="h-2.5 w-64" rounded="xs" />
              </div>
            </div>
          ))}
        </div>

        {/* Group: DSA Problems */}
        <div className="space-y-1.5">
          <Skeleton className="h-3 w-32 ml-1" rounded="xs" />
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-2.5 rounded-xl border border-transparent bg-secondary/30"
            >
              <Skeleton className="h-7 w-7 shrink-0 rounded-lg mt-0.5" />
              <div className="space-y-1.5 flex-1 min-w-0">
                <Skeleton className="h-3.5 w-40" rounded="xs" />
                <Skeleton className="h-2.5 w-52" rounded="xs" />
              </div>
              <Skeleton className="h-4 w-12 rounded-full shrink-0" />
            </div>
          ))}
        </div>
      </div>

      {/* 3. Footer Shortcuts */}
      <div className="px-4 py-2.5 bg-secondary/40 border-t border-border/60 dark:border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="h-3 w-16" rounded="xs" />
          <Skeleton className="h-3 w-20" rounded="xs" />
        </div>
        <Skeleton className="h-3 w-24" rounded="xs" />
      </div>
    </div>
  )
}
