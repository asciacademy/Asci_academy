"use client"

import React from "react"
import { ThreeDIconBaseProps, THREE_D_SIZES } from "./3d-base"
import { cn } from "@/lib/utils"

/**
 * Programming3DIcon — Studio-lit isometric 3D keyboard switches & angled code brackets.
 * High-fidelity 3D claymorphic visual object.
 */
export function Programming3DIcon({
  size = "md",
  className = "",
  alt = "Programming 3D Icon",
  ...props
}: ThreeDIconBaseProps) {
  const pixelSize = typeof size === "number" ? size : THREE_D_SIZES[size] || 80

  return (
    <svg
      viewBox="0 0 179 168"
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
        href="/images/3d-icons/programming.webp"
        width="179"
        height="168"
        preserveAspectRatio="xMidYMid meet"
      />
    </svg>
  )
}
