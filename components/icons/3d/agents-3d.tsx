"use client"

import React from "react"
import { ThreeDIconBaseProps, THREE_D_SIZES } from "./3d-base"
import { cn } from "@/lib/utils"

/**
 * Agents3DIcon — Studio-lit autonomous agent core with orbit ring and cognitive processing unit.
 * High-fidelity 3D claymorphic visual object.
 */
export function Agents3DIcon({
  size = "md",
  className = "",
  alt = "Autonomous Agents 3D Icon",
  ...props
}: ThreeDIconBaseProps) {
  const pixelSize = typeof size === "number" ? size : THREE_D_SIZES[size] || 80

  return (
    <svg
      viewBox="0 0 166 163"
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
        href="/images/3d-icons/agents.webp"
        width="166"
        height="163"
        preserveAspectRatio="xMidYMid meet"
      />
    </svg>
  )
}
