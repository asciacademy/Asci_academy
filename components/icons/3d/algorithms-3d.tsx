"use client"

import React from "react"
import { ThreeDIconBaseProps, THREE_D_SIZES } from "./3d-base"
import { cn } from "@/lib/utils"

/**
 * Algorithms3DIcon — Studio-lit binary heap tree with sorting pivot balance scales.
 * High-fidelity 3D claymorphic visual object.
 */
export function Algorithms3DIcon({
  size = "md",
  className = "",
  alt = "Algorithms 3D Icon",
  ...props
}: ThreeDIconBaseProps) {
  const pixelSize = typeof size === "number" ? size : THREE_D_SIZES[size] || 80

  return (
    <svg
      viewBox="0 0 158 159"
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
        href="/images/3d-icons/algorithms.webp"
        width="158"
        height="159"
        preserveAspectRatio="xMidYMid meet"
      />
    </svg>
  )
}
