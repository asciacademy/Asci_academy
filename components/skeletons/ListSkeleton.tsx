"use client"

import React from "react"
import { Skeleton, SkeletonAvatar } from "./Skeleton"

export interface ListSkeletonProps {
  count?: number
  avatar?: boolean
  secondaryText?: boolean
  trailingAction?: boolean
  className?: string
}

export function ListSkeleton({
  count = 5,
  avatar = true,
  secondaryText = true,
  trailingAction = true,
  className,
}: ListSkeletonProps) {
  return (
    <div
      aria-busy="true"
      aria-label="Loading list"
      className={`rounded-2xl border border-hairline/70 bg-card overflow-hidden divide-y divide-hairline/50 select-none ${className || ""}`}
    >
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="p-4 sm:p-5 flex items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3.5 min-w-0 flex-1">
            {avatar && <SkeletonAvatar size="md" />}
            <div className="space-y-1.5 min-w-0 flex-1">
              <Skeleton className="h-4 w-48 sm:w-64 max-w-full rounded" />
              {secondaryText && (
                <Skeleton className="h-3 w-32 sm:w-40 rounded bg-secondary/70" />
              )}
            </div>
          </div>

          {trailingAction && (
            <Skeleton className="h-8 w-16 sm:w-20 rounded-xl shrink-0" />
          )}
        </div>
      ))}
    </div>
  )
}
