"use client"

import React from "react"
import { Skeleton, SkeletonBadge, SkeletonButton, SkeletonText } from "./Skeleton"

export interface HackathonCardSkeletonProps {
  className?: string
}

export function HackathonCardSkeleton({ className }: HackathonCardSkeletonProps) {
  return (
    <div
      aria-busy="true"
      aria-label="Loading hackathon"
      className={`rounded-3xl border border-hairline/70 bg-card overflow-hidden shadow-xs flex flex-col justify-between select-none ${className || ""}`}
    >
      <div>
        {/* Banner Media */}
        <div className="relative aspect-[16/9] w-full bg-[var(--skeleton-base)] overflow-hidden">
          <Skeleton className="w-full h-full rounded-none" />
          <div className="absolute top-3 left-3">
            <SkeletonBadge className="h-5 w-20 bg-background/80" />
          </div>
          <div className="absolute top-3 right-3">
            <SkeletonBadge className="h-5 w-16 bg-background/80" />
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 sm:p-6 space-y-3.5">
          <div className="flex items-center gap-2">
            <Skeleton className="h-3.5 w-24 rounded" />
            <span className="text-muted-foreground/30">•</span>
            <Skeleton className="h-3.5 w-20 rounded" />
          </div>

          <Skeleton className="h-6 w-11/12 rounded-lg" />
          <SkeletonText lines={2} lastLineWidth="75%" lineHeight="h-3.5" gap="space-y-1.5" />

          {/* Stats: Participants & Prize Pool */}
          <div className="pt-2 grid grid-cols-2 gap-3 border-t border-hairline/50">
            <div className="space-y-1">
              <Skeleton className="h-2.5 w-16 rounded" />
              <Skeleton className="h-4 w-20 rounded" />
            </div>
            <div className="space-y-1">
              <Skeleton className="h-2.5 w-16 rounded" />
              <Skeleton className="h-4 w-20 rounded" />
            </div>
          </div>
        </div>
      </div>

      {/* Footer: Countdown & Register CTA */}
      <div className="p-4 sm:p-5 pt-3 border-t border-hairline/60 bg-secondary/20 flex items-center justify-between gap-3">
        <div className="space-y-1">
          <Skeleton className="h-2.5 w-14 rounded" />
          <Skeleton className="h-3.5 w-24 rounded" />
        </div>
        <SkeletonButton size="sm" className="w-28 h-9" />
      </div>
    </div>
  )
}
