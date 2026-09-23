import * as React from "react"
import { cn } from "@/lib/utils"
import { Skeleton } from "./Skeleton"

export interface SkeletonTextProps extends React.HTMLAttributes<HTMLDivElement> {
  lines?: number
  size?: "xs" | "sm" | "base" | "lg" | "xl"
  lastLineWidth?: string
  gap?: string
  lineHeight?: string
}

export function SkeletonText({
  lines = 1,
  size = "base",
  lastLineWidth = "65%",
  gap = "gap-2",
  lineHeight,
  className,
  ...props
}: SkeletonTextProps) {
  const heightClass = lineHeight || {
    xs: "h-3",
    sm: "h-3.5",
    base: "h-4",
    lg: "h-5",
    xl: "h-6",
  }[size]

  if (lines <= 1) {
    return (
      <Skeleton
        className={cn(heightClass, "w-full", className)}
        rounded="sm"
        {...props}
      />
    )
  }

  // Multi-line deterministic variation
  const widths = ["100%", "92%", "96%", "88%", "94%"]

  return (
    <div className={cn("flex flex-col", gap, className)} {...props}>
      {Array.from({ length: lines }).map((_, index) => {
        const isLast = index === lines - 1
        const width = isLast ? lastLineWidth : widths[index % widths.length]
        return (
          <Skeleton
            key={index}
            className={cn(heightClass)}
            style={{ width }}
            rounded="sm"
          />
        )
      })}
    </div>
  )
}
