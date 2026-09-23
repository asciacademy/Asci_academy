import * as React from "react"
import { cn } from "@/lib/utils"
import { Skeleton } from "../Skeleton"
import { SkeletonAvatar } from "../SkeletonAvatar"

export interface SidebarSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  itemCount?: number
}

export function SidebarSkeleton({
  itemCount = 6,
  className,
  ...props
}: SidebarSkeletonProps) {
  return (
    <aside
      aria-busy="true"
      className={cn(
        "w-64 shrink-0 border-r border-border/80 dark:border-white/10 bg-background/95 dark:bg-black/95 p-4 flex flex-col justify-between h-[calc(100vh-68px)]",
        className
      )}
      {...props}
    >
      <div className="space-y-6">
        {/* Brand / Context Header */}
        <div className="flex items-center gap-3 px-2 py-1">
          <Skeleton className="h-8 w-8" rounded="lg" />
          <div className="space-y-1.5">
            <Skeleton className="h-4 w-28" rounded="xs" />
            <Skeleton className="h-2.5 w-16" rounded="xs" />
          </div>
        </div>

        {/* Navigation Item Stack */}
        <div className="space-y-1.5">
          {Array.from({ length: itemCount }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-transparent"
            >
              <Skeleton className="h-4 w-4" rounded="xs" />
              <Skeleton
                className="h-3.5"
                style={{ width: `${60 + (i % 3) * 15}%` }}
                rounded="xs"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom User Area */}
      <div className="pt-4 border-t border-border/60 dark:border-white/10 flex items-center gap-3 px-2">
        <SkeletonAvatar size="sm" />
        <div className="space-y-1.5 flex-1 min-w-0">
          <Skeleton className="h-3.5 w-24" rounded="xs" />
          <Skeleton className="h-2.5 w-32" rounded="xs" />
        </div>
      </div>
    </aside>
  )
}
