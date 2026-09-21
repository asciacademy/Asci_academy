"use client"

import React from "react"
import { ThreeDIconBaseProps, THREE_D_SIZES } from "./3d-base"
import { cn } from "@/lib/utils"

/**
 * Systems3DIcon — Studio-lit layered microservice architecture blocks with interconnected bus lines.
 * High-fidelity 3D claymorphic visual object.
 */
export function Systems3DIcon({
  size = "md",
  className = "",
  alt = "Systems Architecture 3D Icon",
  ...props
}: ThreeDIconBaseProps) {
  const pixelSize = typeof size === "number" ? size : THREE_D_SIZES[size] || 80

  return (
    <svg
      viewBox="0 0 190 174"
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
        href="/images/3d-icons/systems.webp"
        width="190"
        height="174"
        preserveAspectRatio="xMidYMid meet"
      />
    </svg>
  )
}
