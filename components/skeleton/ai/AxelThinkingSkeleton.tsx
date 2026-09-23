import * as React from "react"
import { cn } from "@/lib/utils"
import { Skeleton } from "../Skeleton"

export interface AxelThinkingSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AxelThinkingSkeleton({ className, ...props }: AxelThinkingSkeletonProps) {
  return (
    <div
      aria-busy="true"
      className={cn(
        "flex items-center gap-3 p-3 rounded-2xl bg-secondary/60 border border-border/60 w-fit select-none",
        className
      )}
      {...props}
    >
      <div className="flex gap-1.5 items-center">
        <span className="h-2 w-2 rounded-full bg-primary/70 animate-pulse" />
        <span className="h-2 w-2 rounded-full bg-primary/70 animate-pulse [animation-delay:200ms]" />
        <span className="h-2 w-2 rounded-full bg-primary/70 animate-pulse [animation-delay:400ms]" />
      </div>
      <Skeleton className="h-3.5 w-28" rounded="xs" />
    </div>
  )
}
