import * as React from "react"
import { cn } from "@/lib/utils"
import { Skeleton } from "./Skeleton"

export interface SkeletonAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
  shape?: "circle" | "rounded" | "square"
}

export function SkeletonAvatar({
  size = "md",
  shape = "circle",
  className,
  ...props
}: SkeletonAvatarProps) {
  const sizeClass = {
    xs: "h-6 w-6",
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
    xl: "h-16 w-16",
    "2xl": "h-20 w-20",
  }[size]

  const shapeClass = {
    circle: "rounded-full",
    rounded: "rounded-lg",
    square: "rounded-none",
  }[shape]

  return (
    <Skeleton
      className={cn("shrink-0", sizeClass, shapeClass, className)}
      rounded={shape === "circle" ? "full" : shape === "rounded" ? "lg" : "none"}
      {...props}
    />
  )
}
