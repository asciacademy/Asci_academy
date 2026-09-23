import * as React from "react"
import { cn } from "@/lib/utils"
import { Skeleton } from "../Skeleton"
import { SkeletonAvatar } from "../SkeletonAvatar"

export interface ListSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  count?: number
  hasAvatar?: boolean
}

export function ListSkeleton({
  count = 5,
  hasAvatar = true,
  className,
  ...props
}: ListSkeletonProps) {
  return (
    <div
      aria-busy="true"
      className={cn("divide-y divide-border/60 rounded-2xl border border-border/80 bg-card overflow-hidden", className)}
      {...props}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="p-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 min-w-0 flex-1">
            {hasAvatar && <SkeletonAvatar size="md" />}
            <div className="space-y-1.5 min-w-0 flex-1">
              <Skeleton className="h-4 w-3/5" rounded="xs" />
              <Skeleton className="h-3 w-2/5" rounded="xs" />
            </div>
          </div>
          <Skeleton className="h-8 w-16 rounded-lg shrink-0" />
        </div>
      ))}
    </div>
  )
}
