"use client"

import React from "react"
import { Skeleton, SkeletonAvatar, SkeletonBadge } from "./Skeleton"

export interface NotificationsSkeletonProps {
  count?: number
  className?: string
}

export function NotificationsSkeleton({ count = 5, className }: NotificationsSkeletonProps) {
  return (
    <div
      aria-busy="true"
      aria-label="Loading notifications"
      className={`rounded-2xl border border-hairline/70 bg-card overflow-hidden divide-y divide-hairline/50 select-none ${className || ""}`}
    >
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="p-4 sm:p-5 flex items-start gap-4">
          <SkeletonAvatar size="sm" />
          <div className="flex-1 space-y-1.5 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <Skeleton className="h-4 w-48 sm:w-64 max-w-full rounded" />
              <SkeletonBadge className="h-4 w-12" />
            </div>
            <Skeleton className="h-3 w-5/6 rounded bg-secondary/70" />
            <Skeleton className="h-2.5 w-16 rounded pt-0.5" />
          </div>
        </div>
      ))}
    </div>
  )
}
