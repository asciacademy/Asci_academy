import * as React from "react"
import { cn } from "@/lib/utils"
import { Skeleton } from "../Skeleton"
import { SkeletonAvatar } from "../SkeletonAvatar"
import { SkeletonBadge } from "../SkeletonBadge"
import { AxelThinkingSkeleton } from "./AxelThinkingSkeleton"
import { AxelResponseSkeleton } from "./AxelResponseSkeleton"
import { AxelToolExecutionSkeleton } from "./AxelToolExecutionSkeleton"

export interface AxelSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  thinkingOnly?: boolean
  state?: "full" | "thinking" | "response" | "tool"
}

export function AxelSkeleton({
  thinkingOnly = false,
  state = "full",
  className,
  ...props
}: AxelSkeletonProps) {
  if (thinkingOnly || state === "thinking") {
    return <AxelThinkingSkeleton className={className} {...props} />
  }

  if (state === "response") {
    return <AxelResponseSkeleton className={className} {...props} />
  }

  if (state === "tool") {
    return <AxelToolExecutionSkeleton className={className} {...props} />
  }

  // Full AI Assistant Chat Widget Skeleton
  return (
    <div
      aria-busy="true"
      className={cn(
        "rounded-3xl border border-border/80 dark:border-white/10 bg-card p-5 space-y-5 shadow-2xl select-none max-w-lg w-full",
        className
      )}
      {...props}
    >
      {/* Header: Axel Avatar + Name + Status */}
      <div className="flex items-center justify-between border-b border-border/60 pb-3">
        <div className="flex items-center gap-3">
          <SkeletonAvatar size="sm" />
          <div className="space-y-1">
            <Skeleton className="h-4 w-28" rounded="xs" />
            <Skeleton className="h-2.5 w-16" rounded="xs" />
          </div>
        </div>
        <SkeletonBadge size="sm" width="w-16" />
      </div>

      {/* Messages Stack */}
      <div className="space-y-4">
        {/* User Prompt */}
        <div className="flex justify-end">
          <div className="rounded-2xl rounded-tr-xs bg-primary/20 border border-primary/20 p-3 max-w-[80%]">
            <Skeleton className="h-3.5 w-44" rounded="xs" />
          </div>
        </div>

        {/* Axel Response */}
        <AxelResponseSkeleton />

        {/* Tool Execution */}
        <AxelToolExecutionSkeleton />

        {/* Thinking Indicator */}
        <AxelThinkingSkeleton />
      </div>

      {/* Suggested Prompts */}
      <div className="flex gap-2 overflow-x-hidden pt-2 border-t border-border/60">
        <Skeleton className="h-7 w-28 rounded-full shrink-0" />
        <Skeleton className="h-7 w-36 rounded-full shrink-0" />
        <Skeleton className="h-7 w-24 rounded-full shrink-0" />
      </div>

      {/* Input Bar */}
      <div className="flex items-center gap-2 pt-1">
        <Skeleton className="h-10 flex-1 rounded-xl" />
        <Skeleton className="h-10 w-10 rounded-xl" />
      </div>
    </div>
  )
}
