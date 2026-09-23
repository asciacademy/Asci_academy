import * as React from "react"
import { cn } from "@/lib/utils"
import { SkeletonText } from "./SkeletonText"

export interface SkeletonParagraphProps extends React.HTMLAttributes<HTMLDivElement> {
  lines?: number
  size?: "xs" | "sm" | "base" | "lg"
  lastLineWidth?: string
  gap?: string
}

export function SkeletonParagraph({
  lines = 3,
  size = "base",
  lastLineWidth = "60%",
  gap = "gap-2.5",
  className,
  ...props
}: SkeletonParagraphProps) {
  return (
    <SkeletonText
      lines={lines}
      size={size}
      lastLineWidth={lastLineWidth}
      gap={gap}
      className={cn("w-full", className)}
      {...props}
    />
  )
}
