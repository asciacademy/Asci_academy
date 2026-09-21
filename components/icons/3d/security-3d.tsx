"use client"

import React from "react"
import { ThreeDIconBaseProps, THREE_D_SIZES } from "./3d-base"
import { cn } from "@/lib/utils"

/**
 * Security3DIcon — Studio-lit emerald cryptographic vault shield with keyhole.
 * High-fidelity 3D claymorphic visual object.
 */
export function Security3DIcon({
  size = "md",
  className = "",
  alt = "Security & Cryptography 3D Icon",
  ...props
}: ThreeDIconBaseProps) {
  const pixelSize = typeof size === "number" ? size : THREE_D_SIZES[size] || 80

  return (
    <svg
      viewBox="0 0 180 160"
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
        href="/images/3d-icons/security.webp"
        width="180"
        height="160"
        preserveAspectRatio="xMidYMid meet"
      />
    </svg>
  )
}
