"use client"

import React from "react"
import { ThreeDIconBaseProps, THREE_D_SIZES } from "./3d-base"
import { cn } from "@/lib/utils"

/**
 * EmptyWorkspace3DIcon — Studio-lit isometric workstation with dual monitors (projects empty state).
 * High-fidelity 3D claymorphic visual object.
 */
export function EmptyWorkspace3DIcon({
  size = "md",
  className = "",
  alt = "No Projects Staged 3D Icon",
  ...props
}: ThreeDIconBaseProps) {
  const pixelSize = typeof size === "number" ? size : THREE_D_SIZES[size] || 80

  return (
    <svg
      viewBox="0 0 246 166"
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
        href="/images/3d-icons/empty-workspace.webp"
        width="246"
        height="166"
        preserveAspectRatio="xMidYMid meet"
      />
    </svg>
  )
}
