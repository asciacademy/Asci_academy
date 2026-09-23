import * as React from "react"
import { cn } from "@/lib/utils"
import { Skeleton } from "../Skeleton"
import { SkeletonButton } from "../SkeletonButton"
import { SkeletonParagraph } from "../SkeletonParagraph"

export interface DialogSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DialogSkeleton({ className, ...props }: DialogSkeletonProps) {
  return (
    <div
      aria-busy="true"
      className={cn(
        "w-full max-w-lg mx-auto rounded-3xl border border-border/80 dark:border-white/15 bg-card/98 p-6 sm:p-7 space-y-6 shadow-2xl backdrop-blur-2xl",
        className
      )}
      {...props}
    >
      {/* 1. Header (Title + Subtitle) */}
      <div className="space-y-2 pb-2 border-b border-border/60">
        <Skeleton className="h-6 w-3/5" rounded="sm" />
        <Skeleton className="h-4 w-4/5" rounded="xs" />
      </div>

      {/* 2. Body Content (Paragraph + Inputs or Options) */}
      <div className="space-y-4">
        <SkeletonParagraph lines={3} />
        <div className="space-y-2 pt-1">
          <Skeleton className="h-10 w-full" rounded="xl" />
          <Skeleton className="h-10 w-full" rounded="xl" />
        </div>
      </div>

      {/* 3. Footer Action Buttons */}
      <div className="pt-2 flex items-center justify-end gap-3 border-t border-border/60">
        <SkeletonButton size="sm" className="w-24 bg-secondary/80" rounded="xl" />
        <SkeletonButton size="sm" className="w-28 bg-primary/20" rounded="xl" />
      </div>
    </div>
  )
}
