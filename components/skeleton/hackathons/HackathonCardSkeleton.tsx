import * as React from "react"
import { cn } from "@/lib/utils"
import { Skeleton } from "../Skeleton"
import { SkeletonBadge } from "../SkeletonBadge"
import { SkeletonButton } from "../SkeletonButton"

export interface HackathonCardSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function HackathonCardSkeleton({ className, ...props }: HackathonCardSkeletonProps) {
  return (
    <div
      aria-busy="true"
      className={cn(
        "rounded-3xl border border-border/80 dark:border-white/10 bg-card overflow-hidden shadow-xs flex flex-col justify-between select-none",
        className
      )}
      {...props}
    >
      <div>
        {/* Banner Media Cover */}
        <div className="relative aspect-[16/9] w-full bg-[var(--skeleton-base)] overflow-hidden">
          <Skeleton className="w-full h-full rounded-none" />
          <div className="absolute top-3 left-3">
            <SkeletonBadge size="sm" width="w-20" />
          </div>
          <div className="absolute top-3 right-3">
            <SkeletonBadge size="sm" width="w-16" />
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 sm:p-6 space-y-3.5">
          <div className="flex items-center gap-2">
            <Skeleton className="h-3.5 w-24" rounded="xs" />
            <span className="text-muted-foreground/30">•</span>
            <Skeleton className="h-3.5 w-20" rounded="xs" />
          </div>

          <Skeleton className="h-6 w-11/12" rounded="sm" />
          <div className="space-y-1.5 pt-0.5">
            <Skeleton className="h-3.5 w-full" rounded="xs" />
            <Skeleton className="h-3.5 w-4/5" rounded="xs" />
          </div>

          {/* Stats: Participants & Prize Pool */}
          <div className="pt-2 grid grid-cols-2 gap-3 border-t border-border/60">
            <div className="space-y-1">
              <Skeleton className="h-2.5 w-16" rounded="xs" />
              <Skeleton className="h-4 w-20" rounded="xs" />
            </div>
            <div className="space-y-1">
              <Skeleton className="h-2.5 w-16" rounded="xs" />
              <Skeleton className="h-4 w-20" rounded="xs" />
            </div>
          </div>
        </div>
      </div>

      {/* Footer: Countdown & Register CTA */}
      <div className="p-4 sm:p-5 pt-3 border-t border-border/60 bg-secondary/20 flex items-center justify-between gap-3">
        <div className="space-y-1">
          <Skeleton className="h-2.5 w-14" rounded="xs" />
          <Skeleton className="h-3.5 w-24" rounded="xs" />
        </div>
        <SkeletonButton size="sm" className="w-28 h-9" rounded="xl" />
      </div>
    </div>
  )
}
