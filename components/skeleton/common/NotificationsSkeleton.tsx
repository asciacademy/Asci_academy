import * as React from "react"
import { cn } from "@/lib/utils"
import { Skeleton } from "../Skeleton"
import { SkeletonAvatar } from "../SkeletonAvatar"

export interface NotificationsSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  count?: number
}

export function NotificationsSkeleton({
  count = 5,
  className,
  ...props
}: NotificationsSkeletonProps) {
  return (
    <div
      aria-busy="true"
      className={cn(
        "w-full max-w-md mx-auto rounded-2xl border border-border/80 dark:border-white/10 bg-card p-4 space-y-3 shadow-lg select-none",
        className
      )}
      {...props}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-border/60">
        <Skeleton className="h-4.5 w-28" rounded="xs" />
        <Skeleton className="h-3 w-16" rounded="xs" />
      </div>

      {/* Notification items: ○ █████████████████ █████████████ █████ */}
      <div className="space-y-2">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="flex items-start gap-3 p-2.5 rounded-xl border border-transparent bg-secondary/30"
          >
            <SkeletonAvatar size="xs" className="mt-0.5" />
            <div className="flex-1 min-w-0 space-y-1">
              <Skeleton className="h-3.5 w-5/6" rounded="xs" />
              <Skeleton className="h-2.5 w-4/6" rounded="xs" />
            </div>
            <Skeleton className="h-2.5 w-10 shrink-0 mt-0.5" rounded="xs" />
          </div>
        ))}
      </div>
    </div>
  )
}
