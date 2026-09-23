import * as React from "react"
import { cn } from "@/lib/utils"
import { Skeleton } from "../Skeleton"
import { SkeletonButton } from "../SkeletonButton"

export interface FormSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  fieldsCount?: number
  hasTextarea?: boolean
  hasFileUpload?: boolean
  hasCheckboxes?: boolean
}

export function FormSkeleton({
  fieldsCount = 4,
  hasTextarea = true,
  hasFileUpload = false,
  hasCheckboxes = true,
  className,
  ...props
}: FormSkeletonProps) {
  return (
    <div
      aria-busy="true"
      className={cn("space-y-5 rounded-2xl border border-border/80 bg-card p-6 sm:p-8 max-w-xl mx-auto", className)}
      {...props}
    >
      {/* Form Header */}
      <div className="space-y-1.5 pb-2 border-b border-border/60">
        <Skeleton className="h-6 w-44" rounded="sm" />
        <Skeleton className="h-3.5 w-72" rounded="xs" />
      </div>

      {/* Input Fields */}
      <div className="space-y-4">
        {Array.from({ length: fieldsCount }).map((_, i) => (
          <div key={i} className="space-y-1.5">
            <Skeleton className="h-3.5 w-24" rounded="xs" />
            <Skeleton className="h-10 w-full" rounded="xl" />
          </div>
        ))}

        {/* Textarea */}
        {hasTextarea && (
          <div className="space-y-1.5">
            <Skeleton className="h-3.5 w-28" rounded="xs" />
            <Skeleton className="h-28 w-full" rounded="xl" />
          </div>
        )}

        {/* File Upload Drop Area */}
        {hasFileUpload && (
          <div className="space-y-1.5">
            <Skeleton className="h-3.5 w-32" rounded="xs" />
            <div className="h-24 w-full rounded-xl border-2 border-dashed border-border flex items-center justify-center">
              <Skeleton className="h-8 w-32" rounded="lg" />
            </div>
          </div>
        )}

        {/* Checkbox / Radio Group */}
        {hasCheckboxes && (
          <div className="pt-2 space-y-2.5">
            <div className="flex items-center gap-2.5">
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton className="h-3 w-56" rounded="xs" />
            </div>
            <div className="flex items-center gap-2.5">
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton className="h-3 w-44" rounded="xs" />
            </div>
          </div>
        )}
      </div>

      {/* Action Submit Buttons */}
      <div className="pt-3 border-t border-border/60 flex items-center justify-end gap-3">
        <SkeletonButton size="md" className="w-24 bg-secondary/80" rounded="xl" />
        <SkeletonButton size="md" className="w-32 bg-primary/20" rounded="xl" />
      </div>
    </div>
  )
}
