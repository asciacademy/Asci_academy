import * as React from "react"
import { cn } from "@/lib/utils"
import { Skeleton } from "./Skeleton"

export interface SkeletonInputProps extends React.HTMLAttributes<HTMLDivElement> {
  hasLabel?: boolean
  labelWidth?: string
  height?: "sm" | "md" | "lg"
  rounded?: "sm" | "md" | "lg" | "full"
}

export function SkeletonInput({
  hasLabel = false,
  labelWidth = "w-24",
  height = "md",
  rounded = "lg",
  className,
  ...props
}: SkeletonInputProps) {
  const heightClass = {
    sm: "h-8",
    md: "h-10",
    lg: "h-12",
  }[height]

  return (
    <div className={cn("w-full space-y-1.5", className)} {...props}>
      {hasLabel && (
        <Skeleton className={cn("h-3.5", labelWidth)} rounded="xs" />
      )}
      <Skeleton className={cn("w-full", heightClass)} rounded={rounded} />
    </div>
  )
}
