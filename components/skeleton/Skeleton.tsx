import * as React from "react"
import { cn } from "@/lib/utils"

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  shimmer?: boolean
  rounded?: "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full"
}

export function Skeleton({
  className,
  shimmer = true,
  rounded = "md",
  ...props
}: SkeletonProps) {
  const roundedClass = {
    none: "rounded-none",
    xs: "rounded-[4px]",
    sm: "rounded-[6px]",
    md: "rounded-[8px]",
    lg: "rounded-[12px]",
    xl: "rounded-[16px]",
    "2xl": "rounded-[20px]",
    "3xl": "rounded-[24px]",
    full: "rounded-full",
  }[rounded]

  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative overflow-hidden bg-[var(--skeleton-base)]",
        shimmer && "skeleton animate-skeleton-shimmer",
        roundedClass,
        className
      )}
      {...props}
    />
  )
}
