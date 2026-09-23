import * as React from "react"
import { cn } from "@/lib/utils"
import { Skeleton } from "../Skeleton"
import { SkeletonBadge } from "../SkeletonBadge"
import { SkeletonButton } from "../SkeletonButton"
import { SkeletonParagraph } from "../SkeletonParagraph"

export interface ATSScannerSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ATSScannerSkeleton({ className, ...props }: ATSScannerSkeletonProps) {
  return (
    <div
      aria-busy="true"
      className={cn("max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8 select-none", className)}
      {...props}
    >
      {/* 1. Header with Title & Action CTAs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div className="space-y-1">
          <Skeleton className="h-7 w-56" rounded="lg" />
          <Skeleton className="h-4 w-72" rounded="xs" />
        </div>
        <div className="flex items-center gap-2">
          <SkeletonButton size="sm" className="w-28 h-9" rounded="xl" />
          <SkeletonButton size="sm" className="w-28 h-9 bg-primary/20" rounded="xl" />
        </div>
      </div>

      {/* 2. Main 12-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Upload Area & Resume Preview */}
        <div className="lg:col-span-7 space-y-6">
          {/* Upload Dropzone */}
          <div className="rounded-3xl border-2 border-dashed border-border/80 bg-card/60 p-8 flex flex-col items-center justify-center text-center space-y-3">
            <Skeleton className="h-12 w-12" rounded="2xl" />
            <Skeleton className="h-5 w-48" rounded="sm" />
            <Skeleton className="h-3.5 w-64 max-w-full" rounded="xs" />
            <SkeletonButton size="sm" className="w-32 h-9 mt-2" rounded="xl" />
          </div>

          {/* Resume Document Wireframe */}
          <div className="rounded-2xl border border-border/70 bg-card p-6 space-y-5 shadow-xs">
            <div className="flex items-center justify-between border-b border-border/50 pb-3">
              <Skeleton className="h-4 w-36" rounded="xs" />
              <SkeletonBadge size="sm" width="w-16" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-6 w-48" rounded="sm" />
              <Skeleton className="h-3.5 w-64" rounded="xs" />
            </div>

            <SkeletonParagraph lines={3} />

            {/* Experience timeline items */}
            <div className="space-y-4 pt-2">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-40" rounded="xs" />
                    <Skeleton className="h-3 w-20" rounded="xs" />
                  </div>
                  <Skeleton className="h-3 w-full" rounded="xs" />
                  <Skeleton className="h-3 w-4/5" rounded="xs" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: ATS Score Gauge, Keyword Match & Recommendations */}
        <div className="lg:col-span-5 space-y-6">
          {/* Circular Score Gauge Card */}
          <div className="rounded-3xl border border-border/70 bg-card p-6 flex flex-col items-center text-center space-y-4 shadow-xs">
            <Skeleton className="h-4 w-32" rounded="xs" />

            {/* Gauge Circle */}
            <div className="relative w-36 h-36 rounded-full border-8 border-[var(--skeleton-base)] flex items-center justify-center">
              <div className="space-y-1 flex flex-col items-center">
                <Skeleton className="h-8 w-12" rounded="md" />
                <Skeleton className="h-2.5 w-16" rounded="xs" />
              </div>
            </div>

            {/* Metric Bars */}
            <div className="w-full space-y-3 pt-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between">
                    <Skeleton className="h-3 w-24" rounded="xs" />
                    <Skeleton className="h-3 w-8" rounded="xs" />
                  </div>
                  <Skeleton className="h-2 w-full" rounded="full" />
                </div>
              ))}
            </div>
          </div>

          {/* Keyword Match Breakdown */}
          <div className="rounded-2xl border border-border/70 bg-card p-5 space-y-3 shadow-xs">
            <Skeleton className="h-4 w-36" rounded="xs" />
            <div className="flex flex-wrap gap-2 pt-1">
              <SkeletonBadge size="md" width="w-20" />
              <SkeletonBadge size="md" width="w-24" />
              <SkeletonBadge size="md" width="w-18" />
              <SkeletonBadge size="md" width="w-28" />
              <SkeletonBadge size="md" width="w-22" />
            </div>
          </div>

          {/* Recommendations Card */}
          <div className="rounded-2xl border border-border/70 bg-card p-5 space-y-3 shadow-xs">
            <Skeleton className="h-4 w-40" rounded="xs" />
            <div className="space-y-2 pt-1">
              <Skeleton className="h-3.5 w-full" rounded="xs" />
              <Skeleton className="h-3.5 w-11/12" rounded="xs" />
              <Skeleton className="h-3.5 w-4/5" rounded="xs" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
