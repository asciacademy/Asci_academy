import * as React from "react"
import { cn } from "@/lib/utils"

export interface SkeletonDividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical"
}

export function SkeletonDivider({
  orientation = "horizontal",
  className,
  ...props
}: SkeletonDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "bg-border/60 shrink-0",
        orientation === "horizontal" ? "h-[1px] w-full my-4" : "w-[1px] h-full mx-4",
        className
      )}
      {...props}
    />
  )
}
