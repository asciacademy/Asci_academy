"use client"

import React from "react"
import { ThreeDIconBaseProps, THREE_D_SIZES } from "./3d-base"
import { cn } from "@/lib/utils"

/**
 * EmptyBadge3DIcon — Studio-lit medal ribbon shield waiting to be earned (achievements empty state).
 * High-fidelity 3D claymorphic visual object.
 */
export function EmptyBadge3DIcon({
  size = "md",
  className = "",
  alt = "No Achievements Earned 3D Icon",
  ...props
}: ThreeDIconBaseProps) {
  const pixelSize = typeof size === "number" ? size : THREE_D_SIZES[size] || 80

  return (
    <svg
      viewBox="0 0 155 155"
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
        href="/images/3d-icons/empty-badge.webp"
        width="155"
        height="155"
        preserveAspectRatio="xMidYMid meet"
      />
    </svg>
  )
}
