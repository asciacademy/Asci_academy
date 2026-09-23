"use client"

import React from "react"
import { Skeleton, SkeletonBadge, SkeletonButton } from "./Skeleton"

export interface JobCardSkeletonProps {
  className?: string
}

export function JobCardSkeleton({ className }: JobCardSkeletonProps) {
  return (
    <div
      aria-busy="true"
      aria-label="Loading job opportunity"
      className={`rounded-2xl border border-hairline/70 bg-card p-5 sm:p-6 flex flex-col justify-between shadow-2xs select-none ${className || ""}`}
    >
      <div className="space-y-4">
        {/* Header: Company Logo, Name, Role Type & Badges */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3.5 min-w-0 flex-1">
            <Skeleton className="w-12 h-12 rounded-xl shrink-0 border border-hairline/60" />
            <div className="min-w-0 flex-1 space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <Skeleton className="h-4 w-24 rounded" />
                <SkeletonBadge className="h-4 w-16" />
              </div>
              <Skeleton className="h-5 w-48 max-w-full rounded-md" />
            </div>
          </div>
          <SkeletonBadge className="h-5 w-14 shrink-0" />
        </div>

        {/* Location & Salary Chips */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <Skeleton className="h-3.5 w-24 rounded" />
          <Skeleton className="h-3.5 w-28 rounded" />
          <Skeleton className="h-3.5 w-20 rounded" />
        </div>

        {/* Tags / Required Skills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <SkeletonBadge className="h-5 w-16" />
          <SkeletonBadge className="h-5 w-20" />
          <SkeletonBadge className="h-5 w-14" />
          <SkeletonBadge className="h-5 w-24" />
        </div>
      </div>

      {/* Footer: Posted Date & Apply Button */}
      <div className="pt-4 mt-4 border-t border-hairline/50 flex items-center justify-between gap-3">
        <Skeleton className="h-3 w-24 rounded" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-9 rounded-xl" />
          <SkeletonButton size="sm" className="w-24 h-9" />
        </div>
      </div>
    </div>
  )
}
