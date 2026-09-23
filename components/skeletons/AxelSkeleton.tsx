"use client"

import React from "react"
import { Skeleton, SkeletonAvatar, SkeletonBadge, SkeletonText } from "./Skeleton"

export interface AxelSkeletonProps {
  thinkingOnly?: boolean
  className?: string
}

export function AxelSkeleton({ thinkingOnly = false, className }: AxelSkeletonProps) {
  if (thinkingOnly) {
    return (
      <div
        aria-busy="true"
        aria-label="Axel is thinking"
        className={`flex items-center gap-3 p-3 rounded-2xl bg-secondary/60 border border-hairline/60 w-fit select-none ${className || ""}`}
      >
        <div className="flex gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce" />
        </div>
        <span className="text-xs font-medium text-muted-foreground font-sans">
          Axel is thinking...
        </span>
        <Skeleton className="h-2 w-16 rounded-full" />
      </div>
    )
  }

  return (
    <div
      aria-busy="true"
      aria-label="Loading AI assistant"
      className={`rounded-3xl border border-hairline/70 bg-card p-5 space-y-5 shadow-md select-none max-w-lg ${className || ""}`}
    >
      {/* Header: Bot Avatar + Axel Name */}
      <div className="flex items-center justify-between border-b border-hairline/50 pb-3">
        <div className="flex items-center gap-3">
          <SkeletonAvatar size="sm" />
          <div className="space-y-1">
            <Skeleton className="h-4 w-28 rounded" />
            <Skeleton className="h-2.5 w-16 rounded" />
          </div>
        </div>
        <SkeletonBadge className="h-5 w-16" />
      </div>

      {/* Messages Feed */}
      <div className="space-y-4">
        {/* User Message Bubble */}
        <div className="flex flex-col items-end">
          <div className="rounded-2xl rounded-tr-xs bg-primary/20 border border-primary/20 p-3 max-w-[80%] space-y-1">
            <Skeleton className="h-3 w-40 rounded" />
          </div>
        </div>

        {/* Axel Assistant Response Bubble */}
        <div className="flex flex-col items-start space-y-2">
          <div className="rounded-2xl rounded-tl-xs bg-secondary/50 border border-hairline/60 p-4 max-w-[90%] space-y-2">
            <Skeleton className="h-3.5 w-48 rounded" />
            <SkeletonText lines={2} lastLineWidth="65%" lineHeight="h-3" gap="space-y-1.5" />

            {/* Study Plan / Tool Card */}
            <div className="mt-3 p-2.5 rounded-xl border border-hairline/60 bg-background/60 space-y-2">
              <div className="flex items-center justify-between">
                <Skeleton className="h-3 w-28 rounded" />
                <SkeletonBadge className="h-4 w-12" />
              </div>
              <Skeleton className="h-2.5 w-full rounded" />
              <Skeleton className="h-2.5 w-4/5 rounded" />
            </div>
          </div>
        </div>

        {/* Thinking State */}
        <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-secondary/40 border border-hairline/40 w-fit">
          <div className="flex gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-primary/80 animate-bounce [animation-delay:-0.3s]" />
            <span className="h-1.5 w-1.5 rounded-full bg-primary/80 animate-bounce [animation-delay:-0.15s]" />
            <span className="h-1.5 w-1.5 rounded-full bg-primary/80 animate-bounce" />
          </div>
          <span className="text-[11px] text-muted-foreground font-sans">
            Axel is formulating response...
          </span>
        </div>
      </div>

      {/* Suggested Prompts Row */}
      <div className="flex gap-2 overflow-x-hidden pt-2 border-t border-hairline/50">
        <Skeleton className="h-7 w-28 rounded-full shrink-0" />
        <Skeleton className="h-7 w-36 rounded-full shrink-0" />
        <Skeleton className="h-7 w-24 rounded-full shrink-0" />
      </div>

      {/* Input Bar Placeholder */}
      <div className="flex items-center gap-2 pt-1">
        <Skeleton className="h-10 flex-1 rounded-xl" />
        <Skeleton className="h-10 w-10 rounded-xl" />
      </div>
    </div>
  )
}
