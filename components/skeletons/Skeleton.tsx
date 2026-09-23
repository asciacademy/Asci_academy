"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export type SkeletonVariant =
  | "default"
  | "text"
  | "heading"
  | "avatar"
  | "image"
  | "button"
  | "card"
  | "circle"
  | "line"
  | "badge"
  | "icon"

export interface SkeletonProps extends React.ComponentProps<"div"> {
  variant?: SkeletonVariant
  animated?: boolean
}

/**
 * ASCI Academy Master Skeleton Primitive
 * Powered by restrained GPU-accelerated CSS shimmer animation
 * Fully compliant with WCAG accessibility (aria-hidden by default, reduced-motion fallback)
 */
export function Skeleton({
  variant = "default",
  animated = true,
  className,
  children,
  ...props
}: SkeletonProps) {
  const variantStyles: Record<SkeletonVariant, string> = {
    default: "rounded-md",
    text: "h-4 w-full rounded",
    heading: "h-7 w-3/4 rounded-md",
    avatar: "h-10 w-10 rounded-full shrink-0",
    image: "aspect-video w-full rounded-2xl",
    button: "h-10 w-28 rounded-xl",
    card: "rounded-2xl border border-hairline/60 bg-card p-5",
    circle: "rounded-full aspect-square shrink-0",
    line: "h-px w-full",
    badge: "h-5 w-16 rounded-full",
    icon: "h-5 w-5 rounded-md shrink-0",
  }

  return (
    <div
      data-slot="skeleton"
      aria-hidden="true"
      className={cn(
        "select-none overflow-hidden",
        animated ? "animate-skeleton-shimmer" : "bg-[var(--skeleton-base)]",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

/* ═══════════════════════════════════════════
   Composable Sub-Primitives
═══════════════════════════════════════════ */

export interface SkeletonTextProps extends React.ComponentProps<"div"> {
  lines?: number
  lastLineWidth?: string
  gap?: string
  lineHeight?: string
  className?: string
}

export function SkeletonText({
  lines = 3,
  lastLineWidth = "65%",
  gap = "space-y-2",
  lineHeight = "h-3.5",
  className,
  ...props
}: SkeletonTextProps) {
  return (
    <div className={cn("w-full", gap, className)} aria-hidden="true" {...props}>
      {Array.from({ length: lines }).map((_, i) => {
        const isLast = i === lines - 1
        return (
          <Skeleton
            key={i}
            className={cn(
              lineHeight,
              "rounded",
              isLast ? `w-[${lastLineWidth}]` : "w-full"
            )}
            style={isLast ? { width: lastLineWidth } : undefined}
          />
        )
      })}
    </div>
  )
}

export interface SkeletonAvatarProps extends React.ComponentProps<"div"> {
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  shape?: "circle" | "square"
  className?: string
}

export function SkeletonAvatar({
  size = "md",
  shape = "circle",
  className,
  ...props
}: SkeletonAvatarProps) {
  const sizeMap = {
    xs: "h-6 w-6",
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
    xl: "h-16 w-16",
  }

  return (
    <Skeleton
      className={cn(
        sizeMap[size],
        shape === "circle" ? "rounded-full" : "rounded-xl",
        "shrink-0",
        className
      )}
      {...props}
    />
  )
}

export interface SkeletonButtonProps extends React.ComponentProps<"div"> {
  size?: "sm" | "md" | "lg"
  pill?: boolean
  className?: string
}

export function SkeletonButton({
  size = "md",
  pill = false,
  className,
  ...props
}: SkeletonButtonProps) {
  const sizeMap = {
    sm: "h-8 px-3 text-xs",
    md: "h-10 px-4",
    lg: "h-12 px-6",
  }

  return (
    <Skeleton
      className={cn(
        sizeMap[size],
        pill ? "rounded-full" : "rounded-xl",
        className
      )}
      {...props}
    />
  )
}

export interface SkeletonBadgeProps extends React.ComponentProps<"div"> {
  className?: string
}

export function SkeletonBadge({ className, ...props }: SkeletonBadgeProps) {
  return (
    <Skeleton
      className={cn("h-5 w-16 rounded-full inline-block", className)}
      {...props}
    />
  )
}

export interface SkeletonImageProps extends React.ComponentProps<"div"> {
  aspectRatio?: "16/9" | "4/3" | "1/1" | "21/9"
  className?: string
}

export function SkeletonImage({
  aspectRatio = "16/9",
  className,
  ...props
}: SkeletonImageProps) {
  const ratioMap = {
    "16/9": "aspect-video",
    "4/3": "aspect-[4/3]",
    "1/1": "aspect-square",
    "21/9": "aspect-[21/9]",
  }

  return (
    <Skeleton
      className={cn("w-full overflow-hidden rounded-2xl", ratioMap[aspectRatio], className)}
      {...props}
    />
  )
}

export interface SkeletonIconProps extends React.ComponentProps<"div"> {
  size?: number | string
  className?: string
}

export function SkeletonIcon({ size = 20, className, ...props }: SkeletonIconProps) {
  return (
    <Skeleton
      style={{ width: size, height: size }}
      className={cn("rounded-md shrink-0 inline-block", className)}
      {...props}
    />
  )
}
