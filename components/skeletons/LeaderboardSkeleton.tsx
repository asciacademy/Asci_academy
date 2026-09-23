"use client"

import React from "react"
import { Skeleton, SkeletonAvatar, SkeletonBadge } from "./Skeleton"

export function LeaderboardSkeleton() {
  return (
    <div
      aria-busy="true"
      aria-label="Loading leaderboard"
      className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8 select-none"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div className="space-y-1">
          <Skeleton className="h-7 w-48 rounded-lg" />
          <Skeleton className="h-4 w-64 rounded" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-24 rounded-lg" />
          <Skeleton className="h-8 w-24 rounded-lg" />
        </div>
      </div>

      {/* Top 3 Podium Cards */}
      <div className="grid grid-cols-3 gap-3 sm:gap-6 items-end pt-4 pb-2">
        {/* Rank 2 (Silver) */}
        <div className="rounded-2xl border border-hairline/60 bg-card p-4 sm:p-5 flex flex-col items-center text-center space-y-3 shadow-xs">
          <Skeleton className="h-5 w-8 rounded-full" />
          <SkeletonAvatar size="md" />
          <div className="space-y-1 w-full flex flex-col items-center">
            <Skeleton className="h-4 w-20 sm:w-28 rounded" />
            <Skeleton className="h-3 w-14 rounded" />
          </div>
          <SkeletonBadge className="h-5 w-16" />
        </div>

        {/* Rank 1 (Gold - Elevated) */}
        <div className="rounded-2xl border-2 border-amber-500/30 bg-card p-5 sm:p-6 flex flex-col items-center text-center space-y-3.5 shadow-md -translate-y-3">
          <Skeleton className="h-6 w-10 rounded-full" />
          <SkeletonAvatar size="lg" />
          <div className="space-y-1 w-full flex flex-col items-center">
            <Skeleton className="h-5 w-24 sm:w-32 rounded" />
            <Skeleton className="h-3.5 w-16 rounded" />
          </div>
          <SkeletonBadge className="h-6 w-20" />
        </div>

        {/* Rank 3 (Bronze) */}
        <div className="rounded-2xl border border-hairline/60 bg-card p-4 sm:p-5 flex flex-col items-center text-center space-y-3 shadow-xs">
          <Skeleton className="h-5 w-8 rounded-full" />
          <SkeletonAvatar size="md" />
          <div className="space-y-1 w-full flex flex-col items-center">
            <Skeleton className="h-4 w-20 sm:w-28 rounded" />
            <Skeleton className="h-3 w-14 rounded" />
          </div>
          <SkeletonBadge className="h-5 w-16" />
        </div>
      </div>

      {/* Ranks 4-10 Table Rows */}
      <div className="rounded-2xl border border-border/70 bg-card overflow-hidden divide-y divide-border/50 shadow-xs">
        {Array.from({ length: 7 }).map((_, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-3.5 sm:p-4 gap-4"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <span className="text-xs font-mono font-bold text-muted-foreground/50 w-5 text-center">
                {String(idx + 4).padStart(2, "0")}
              </span>
              <SkeletonAvatar size="sm" />
              <div className="space-y-1 min-w-0">
                <Skeleton className="h-4 w-32 sm:w-44 rounded" />
                <Skeleton className="h-3 w-20 sm:w-28 rounded" />
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-6 shrink-0">
              <Skeleton className="h-4 w-16 rounded" />
              <SkeletonBadge className="h-5 w-14 hidden sm:inline-block" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
