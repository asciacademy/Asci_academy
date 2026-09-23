"use client"

import React from "react"
import { Skeleton, SkeletonButton, SkeletonText } from "./Skeleton"

export interface DialogSkeletonProps {
  className?: string
}

export function DialogSkeleton({ className }: DialogSkeletonProps) {
  return (
    <div
      aria-busy="true"
      aria-label="Loading modal dialog"
      className={`w-full max-w-lg mx-auto rounded-3xl border border-hairline/80 bg-card p-6 sm:p-7 space-y-6 shadow-2xl select-none ${className || ""}`}
    >
      {/* Header with Title & Close Icon */}
      <div className="flex items-start justify-between gap-4 border-b border-hairline/50 pb-4">
        <div className="space-y-1.5 flex-1">
          <Skeleton className="h-6 w-48 rounded-md" />
          <Skeleton className="h-3.5 w-64 max-w-full rounded" />
        </div>
        <Skeleton className="h-7 w-7 rounded-full shrink-0" />
      </div>

      {/* Body / Content Area */}
      <div className="space-y-4">
        <SkeletonText lines={2} lastLineWidth="85%" lineHeight="h-3.5" />
        <div className="space-y-3 pt-2">
          <div className="space-y-1.5">
            <Skeleton className="h-3.5 w-20 rounded" />
            <Skeleton className="h-10 w-full rounded-xl border border-hairline/60" />
          </div>
          <div className="space-y-1.5">
            <Skeleton className="h-3.5 w-28 rounded" />
            <Skeleton className="h-20 w-full rounded-xl border border-hairline/60" />
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-hairline/50">
        <SkeletonButton size="md" className="w-24 bg-secondary/80" />
        <SkeletonButton size="md" className="w-28" />
      </div>
    </div>
  )
}
