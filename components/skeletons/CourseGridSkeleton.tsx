"use client"

import React from "react"
import { CourseCardSkeleton } from "./CourseCardSkeleton"
import { cn } from "@/lib/utils"

export interface CourseGridSkeletonProps {
  count?: number
  columns?: 3 | 4
  className?: string
}

/**
 * CourseGridSkeleton — matches the responsive course grid layout (1 col mobile, 2 col tablet, 3-4 col desktop).
 */
export function CourseGridSkeleton({
  count = 6,
  columns = 3,
  className,
}: CourseGridSkeletonProps) {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-label="Loading courses"
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 gap-6 w-full",
        columns === 4 ? "lg:grid-cols-3 xl:grid-cols-4" : "lg:grid-cols-3",
        className
      )}
    >
      {Array.from({ length: count }).map((_, idx) => (
        <CourseCardSkeleton key={idx} />
      ))}
    </div>
  )
}
