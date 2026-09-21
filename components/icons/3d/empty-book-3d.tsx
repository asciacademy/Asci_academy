"use client"

import React from "react"
import { ThreeDIconBaseProps, THREE_D_SIZES } from "./3d-base"
import { cn } from "@/lib/utils"

/**
 * EmptyBook3DIcon — Studio-lit open leather-bound codex with ribbon bookmark (courses empty state).
 * High-fidelity 3D claymorphic visual object.
 */
export function EmptyBook3DIcon({
  size = "md",
  className = "",
  alt = "No Courses Enrolled 3D Icon",
  ...props
}: ThreeDIconBaseProps) {
  const pixelSize = typeof size === "number" ? size : THREE_D_SIZES[size] || 80

  return (
    <svg
      viewBox="0 0 211 154"
      width={pixelSize}
      height={pixelSize}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0 select-none", className)}
      role="img"
      aria-label={alt}
      {...props}
    >
      <image
        href="/images/3d-icons/empty-book.webp"
        width="211"
        height="154"
        preserveAspectRatio="xMidYMid meet"
      />
    </svg>
  )
}
