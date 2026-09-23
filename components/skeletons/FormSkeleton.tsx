"use client"

import React from "react"
import { Skeleton, SkeletonButton } from "./Skeleton"

export interface FormSkeletonProps {
  fields?: number
  hasTextarea?: boolean
  className?: string
}

export function FormSkeleton({
  fields = 3,
  hasTextarea = true,
  className,
}: FormSkeletonProps) {
  return (
    <div
      aria-busy="true"
      aria-label="Loading form"
      className={`rounded-2xl border border-hairline/70 bg-card p-6 sm:p-8 space-y-6 select-none ${className || ""}`}
    >
      <div className="space-y-1.5 border-b border-hairline/50 pb-4">
        <Skeleton className="h-6 w-44 rounded-md" />
        <Skeleton className="h-3.5 w-64 max-w-full rounded" />
      </div>

      <div className="space-y-4">
        {Array.from({ length: fields }).map((_, idx) => (
          <div key={idx} className="space-y-1.5">
            <Skeleton className="h-3.5 w-24 rounded" />
            <Skeleton className="h-10 w-full rounded-xl border border-hairline/60" />
          </div>
        ))}

        {hasTextarea && (
          <div className="space-y-1.5">
            <Skeleton className="h-3.5 w-28 rounded" />
            <Skeleton className="h-24 w-full rounded-xl border border-hairline/60" />
          </div>
        )}

        {/* Checkbox Agreement Row */}
        <div className="flex items-center gap-3 pt-2">
          <Skeleton className="h-4 w-4 rounded shrink-0" />
          <Skeleton className="h-3 w-64 max-w-full rounded" />
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <SkeletonButton size="lg" className="w-full sm:w-36 h-11" />
      </div>
    </div>
  )
}
