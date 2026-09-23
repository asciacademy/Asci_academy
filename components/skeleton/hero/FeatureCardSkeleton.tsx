import * as React from "react"
import { cn } from "@/lib/utils"
import { Skeleton } from "../Skeleton"
import { SkeletonIcon } from "../SkeletonIcon"

export interface FeatureCardSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  isSpan2?: boolean
}

export function FeatureCardSkeleton({
  isSpan2 = false,
  className,
  ...props
}: FeatureCardSkeletonProps) {
  return (
    <div
      aria-busy="true"
      className={cn(
        "rounded-2xl border border-border/80 dark:border-white/10 bg-card/80 p-6 flex flex-col justify-between h-[320px] transition-all",
        isSpan2 ? "md:col-span-2" : "col-span-1",
        className
      )}
      {...props}
    >
      <div>
        {/* Top: Icon + Number/Tag + Metric */}
        <div className="flex items-start justify-between gap-3 pb-4 border-b border-border/60">
          <div className="flex items-center gap-2.5">
            <Skeleton className="h-10 w-10 rounded-xl" />
            <Skeleton className="h-3.5 w-6" rounded="xs" />
          </div>
          <div className="text-right space-y-1">
            <Skeleton className="h-5 w-14 ml-auto" rounded="xs" />
            <Skeleton className="h-2.5 w-20 ml-auto" rounded="xs" />
          </div>
        </div>

        {/* Title & Description */}
        <div className="mt-5 space-y-2">
          <Skeleton className="h-5 w-3/4 max-w-sm" rounded="sm" />
          <div className="space-y-1.5 pt-1">
            <Skeleton className="h-3.5 w-full" rounded="xs" />
            <Skeleton className="h-3.5 w-5/6" rounded="xs" />
          </div>
        </div>
      </div>

      {/* Highlights / Tags list */}
      <div className="mt-5 pt-3 border-t border-border/60 space-y-2">
        <div className="flex items-center gap-2">
          <SkeletonIcon size="xs" rounded="full" />
          <Skeleton className="h-3 w-32" rounded="xs" />
        </div>
        <div className="flex items-center gap-2">
          <SkeletonIcon size="xs" rounded="full" />
          <Skeleton className="h-3 w-40" rounded="xs" />
        </div>
      </div>
    </div>
  )
}

export function FeatureGridSkeleton({
  count = 4,
  className,
  ...props
}: { count?: number } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-busy="true"
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-8",
        className
      )}
      {...props}
    >
      {Array.from({ length: count }).map((_, i) => (
        <FeatureCardSkeleton key={i} isSpan2={i === 0 || i === 3} />
      ))}
    </div>
  )
}
