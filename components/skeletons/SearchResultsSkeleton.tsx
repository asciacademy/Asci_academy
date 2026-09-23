"use client"

import React from "react"
import { Skeleton, SkeletonBadge, SkeletonButton, SkeletonText } from "./Skeleton"

export function SearchResultsSkeleton() {
  return (
    <div
      aria-busy="true"
      aria-label="Loading search results"
      className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6 select-none"
    >
      {/* Search Input Bar & Controls */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative w-full flex-1">
          <Skeleton className="h-12 w-full rounded-2xl border border-hairline/80" />
        </div>
        <SkeletonButton size="lg" className="w-full sm:w-28 h-12" />
      </div>

      {/* Filter Tags & Count Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex flex-wrap items-center gap-2">
          <SkeletonBadge className="h-7 w-20 rounded-lg" />
          <SkeletonBadge className="h-7 w-24 rounded-lg" />
          <SkeletonBadge className="h-7 w-20 rounded-lg" />
          <SkeletonBadge className="h-7 w-28 rounded-lg" />
        </div>
        <Skeleton className="h-4 w-32 rounded" />
      </div>

      {/* Search Results List Rows */}
      <div className="space-y-4 pt-2">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-hairline/60 bg-card p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-2xs"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-1 min-w-0 w-full">
              <Skeleton className="w-full sm:w-36 aspect-video rounded-xl shrink-0" />
              <div className="space-y-2 flex-1 w-full">
                <div className="flex items-center gap-2">
                  <SkeletonBadge className="h-4 w-16" />
                  <Skeleton className="h-3.5 w-24 rounded" />
                </div>
                <Skeleton className="h-5 w-3/4 rounded-md" />
                <SkeletonText lines={1} lastLineWidth="90%" lineHeight="h-3" />
                <div className="flex items-center gap-3 pt-1">
                  <Skeleton className="h-3 w-16 rounded" />
                  <Skeleton className="h-3 w-20 rounded" />
                </div>
              </div>
            </div>
            <SkeletonButton size="sm" className="w-full sm:w-28 h-9 shrink-0" />
          </div>
        ))}
      </div>
    </div>
  )
}
