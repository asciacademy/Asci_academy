import * as React from "react"
import { cn } from "@/lib/utils"
import { Skeleton } from "./Skeleton"

export interface SkeletonBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg"
  rounded?: "sm" | "md" | "full"
  width?: string
}

export function SkeletonBadge({
  size = "md",
  rounded = "full",
  width = "w-16",
  className,
  ...props
}: SkeletonBadgeProps) {
  const sizeClass = {
    sm: "h-5",
    md: "h-6",
    lg: "h-7",
  }[size]

  return (
    <Skeleton
      className={cn("inline-flex shrink-0", sizeClass, width, className)}
      rounded={rounded}
      {...props}
    />
  )
}
