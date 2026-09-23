import * as React from "react"
import { cn } from "@/lib/utils"
import { Skeleton } from "../Skeleton"
import { SkeletonAvatar } from "../SkeletonAvatar"

export interface AxelResponseSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AxelResponseSkeleton({ className, ...props }: AxelResponseSkeletonProps) {
  return (
    <div
      aria-busy="true"
      className={cn("flex items-start gap-3 max-w-xl", className)}
      {...props}
    >
      {/* Bot Avatar ○ */}
      <SkeletonAvatar size="sm" />

      {/* Response Bubble */}
      <div className="flex-1 space-y-2.5 rounded-2xl rounded-tl-xs bg-secondary/50 border border-border/60 p-4">
        {/* Name: Axel */}
        <div className="flex items-center gap-2 pb-1 border-b border-border/40">
          <Skeleton className="h-3.5 w-16" rounded="xs" />
          <Skeleton className="h-3 w-12" rounded="xs" />
        </div>

        {/* Narrative Text Lines */}
        <div className="space-y-2 pt-1">
          <Skeleton className="h-3.5 w-11/12" rounded="xs" />
          <Skeleton className="h-3.5 w-3/4" rounded="xs" />
          <Skeleton className="h-3.5 w-full" rounded="xs" />
          <Skeleton className="h-3.5 w-2/3" rounded="xs" />
          <Skeleton className="h-3.5 w-4/5" rounded="xs" />
        </div>
      </div>
    </div>
  )
}
