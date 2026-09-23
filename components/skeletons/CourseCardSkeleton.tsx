"use client"

import React from "react"
import { Skeleton, SkeletonText, SkeletonAvatar, SkeletonBadge } from "./Skeleton"

export interface CourseCardSkeletonProps {
  className?: string
}

/**
 * CourseCardSkeleton — matches ASCI Academy CourseCard dimensions and geometry exactly.
 * Zero layout shift between loading skeleton and hydrated course card.
 */
export function CourseCardSkeleton({ className }: CourseCardSkeletonProps) {
  return (
    <div
      aria-busy="true"
      aria-label="Loading course"
      className={`w-full rounded-2xl border border-hairline/60 bg-card overflow-hidden shadow-xs flex flex-col justify-between select-none ${className || ""}`}
    >
      <div>
        {/* 16:9 Thumbnail Image Skeleton */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-[var(--skeleton-base)]">
          <Skeleton className="w-full h-full rounded-none" />

          {/* Top-Left Category Pill */}
          <div className="absolute left-3 top-3 z-10">
            <Skeleton className="h-5 w-24 rounded-full bg-background/80 backdrop-blur-xs" />
          </div>

          {/* Top-Right Level Pill + Bookmark */}
          <div className="absolute right-3 top-3 z-10 flex items-center gap-1.5">
            <Skeleton className="h-5 w-16 rounded-full bg-background/80 backdrop-blur-xs" />
            <Skeleton className="h-7 w-7 rounded-full bg-background/80 backdrop-blur-xs" />
          </div>

          {/* Bottom Partner Pill */}
          <div className="absolute left-3 bottom-2.5 z-10">
            <Skeleton className="h-4 w-28 rounded-md bg-background/70 backdrop-blur-xs" />
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 sm:p-5 space-y-3.5">
          {/* Partner & Rating Row */}
          <div className="flex items-center justify-between gap-2">
            <Skeleton className="h-3.5 w-24 rounded" />
            <div className="flex items-center gap-1">
              <Skeleton className="h-3.5 w-12 rounded" />
            </div>
          </div>

          {/* Course Title (2-line heading placeholder) */}
          <div className="space-y-1.5 pt-0.5">
            <Skeleton className="h-5 w-full rounded-md" />
            <Skeleton className="h-5 w-3/4 rounded-md" />
          </div>

          {/* Description Paragraph (2 lines) */}
          <SkeletonText lines={2} lastLineWidth="80%" lineHeight="h-3.5" gap="space-y-1.5" className="pt-1" />

          {/* Instructor Row */}
          <div className="flex items-center gap-2 pt-1.5">
            <SkeletonAvatar size="xs" />
            <Skeleton className="h-3.5 w-28 rounded" />
          </div>

          {/* Metadata Chips: Lessons, Duration */}
          <div className="flex items-center gap-2 pt-1">
            <SkeletonBadge className="w-20 h-5" />
            <SkeletonBadge className="w-16 h-5" />
            <SkeletonBadge className="w-14 h-5" />
          </div>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="p-4 pt-3 border-t border-hairline/60 bg-card/60 mt-auto flex items-center justify-between gap-3">
        <Skeleton className="h-10 flex-1 rounded-xl" />
        <Skeleton className="h-10 w-24 rounded-xl" />
      </div>
    </div>
  )
}
