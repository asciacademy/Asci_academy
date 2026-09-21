"use client"

import React from "react"
import { ThreeDIconBaseProps, THREE_D_SIZES } from "./3d-base"
import { cn } from "@/lib/utils"

/**
 * Database3DIcon — Studio-lit distributed database cylinder stack with replication lines.
 * High-fidelity 3D claymorphic visual object.
 */
export function Database3DIcon({
  size = "md",
  className = "",
  alt = "Database 3D Icon",
  ...props
}: ThreeDIconBaseProps) {
  const pixelSize = typeof size === "number" ? size : THREE_D_SIZES[size] || 80

  return (
    <svg
      viewBox="0 0 181 162"
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
        href="/images/3d-icons/database.webp"
        width="181"
        height="162"
        preserveAspectRatio="xMidYMid meet"
      />
    </svg>
  )
}
