import * as React from "react"
import { cn } from "@/lib/utils"
import { Skeleton } from "./Skeleton"

export interface SkeletonHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6
  width?: string
}

export function SkeletonHeading({
  level = 2,
  width,
  className,
  ...props
}: SkeletonHeadingProps) {
  const levelStyles = {
    1: { height: "h-9 sm:h-11 md:h-13", defaultWidth: "w-3/4 max-w-xl", rounded: "md" as const },
    2: { height: "h-7 sm:h-8 md:h-9", defaultWidth: "w-2/3 max-w-lg", rounded: "md" as const },
    3: { height: "h-6 sm:h-7", defaultWidth: "w-1/2 max-w-md", rounded: "sm" as const },
    4: { height: "h-5 sm:h-6", defaultWidth: "w-2/5 max-w-sm", rounded: "sm" as const },
    5: { height: "h-4 sm:h-5", defaultWidth: "w-1/3 max-w-xs", rounded: "sm" as const },
    6: { height: "h-3.5 sm:h-4", defaultWidth: "w-1/4 max-w-[200px]", rounded: "xs" as const },
  }[level]

  return (
    <Skeleton
      className={cn(levelStyles.height, width || levelStyles.defaultWidth, className)}
      rounded={levelStyles.rounded}
      {...props}
    />
  )
}
