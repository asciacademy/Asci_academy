import * as React from "react"
import { cn } from "@/lib/utils"
import { Skeleton } from "./Skeleton"

export interface SkeletonIconProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  rounded?: "xs" | "sm" | "md" | "lg" | "full"
}

export function SkeletonIcon({
  size = "md",
  rounded = "md",
  className,
  ...props
}: SkeletonIconProps) {
  const sizeClass = {
    xs: "h-3.5 w-3.5",
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
    xl: "h-8 w-8",
  }[size]

  return (
    <Skeleton
      className={cn("shrink-0", sizeClass, className)}
      rounded={rounded}
      {...props}
    />
  )
}
