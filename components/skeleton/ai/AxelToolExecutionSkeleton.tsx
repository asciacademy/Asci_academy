import * as React from "react"
import { cn } from "@/lib/utils"
import { Skeleton } from "../Skeleton"
import { SkeletonAvatar } from "../SkeletonAvatar"

export interface AxelToolExecutionSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AxelToolExecutionSkeleton({
  className,
  ...props
}: AxelToolExecutionSkeletonProps) {
  return (
    <div
      aria-busy="true"
      className={cn("flex items-start gap-3 max-w-lg", className)}
      {...props}
    >
      <SkeletonAvatar size="xs" />
      <div className="flex-1 rounded-xl border border-primary/20 bg-primary/5 p-3.5 space-y-2">
        <div className="flex items-center justify-between pb-1 border-b border-primary/10">
          <Skeleton className="h-3.5 w-28" rounded="xs" />
          <Skeleton className="h-3 w-16" rounded="xs" />
        </div>
        <Skeleton className="h-3 w-full" rounded="xs" />
        <Skeleton className="h-3 w-3/5" rounded="xs" />
      </div>
    </div>
  )
}
