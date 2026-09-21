"use client"

import React from "react"
import { ThreeDIconBaseProps, THREE_D_SIZES } from "./3d-base"
import { cn } from "@/lib/utils"

/**
 * Automation3DIcon — Studio-lit industrial gear mesh with automated execution trigger levers.
 * High-fidelity 3D claymorphic visual object.
 */
export function Automation3DIcon({
  size = "md",
  className = "",
  alt = "Automation 3D Icon",
  ...props
}: ThreeDIconBaseProps) {
  const pixelSize = typeof size === "number" ? size : THREE_D_SIZES[size] || 80

  return (
    <svg
      viewBox="0 0 168 159"
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
        href="/images/3d-icons/automation.webp"
        width="168"
        height="159"
        preserveAspectRatio="xMidYMid meet"
      />
    </svg>
  )
}
