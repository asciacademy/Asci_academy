import * as React from "react"
import { cn } from "@/lib/utils"
import { CourseCardSkeleton } from "./CourseCardSkeleton"

export interface CourseGridSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  count?: number
  columns?: 3 | 4
}

export function CourseGridSkeleton({
  count = 6,
  columns = 3,
  className,
  ...props
}: CourseGridSkeletonProps) {
  const colClass = columns === 4
    ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"

  return (
    <div
      aria-busy="true"
      className={cn("grid gap-6", colClass, className)}
      {...props}
    >
      {Array.from({ length: count }).map((_, i) => (
        <CourseCardSkeleton key={i} variant="grid" />
      ))}
    </div>
  )
}
