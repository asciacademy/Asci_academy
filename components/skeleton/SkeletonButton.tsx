import * as React from "react"
import { cn } from "@/lib/utils"
import { Skeleton } from "./Skeleton"

export interface SkeletonButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "icon"
  rounded?: "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full"
  width?: string
}

export function SkeletonButton({
  size = "md",
  rounded = "md",
  width,
  className,
  ...props
}: SkeletonButtonProps) {
  const sizeClass = {
    sm: "h-8 px-3",
    md: "h-10 px-4",
    lg: "h-12 px-6",
    icon: "h-10 w-10",
  }[size]

  const defaultWidth = size === "icon" ? "w-10" : "w-28"

  return (
    <Skeleton
      className={cn(
        "inline-flex items-center justify-center shrink-0",
        sizeClass,
        width || (size !== "icon" ? defaultWidth : ""),
        className
      )}
      rounded={rounded}
      {...props}
    />
  )
}
