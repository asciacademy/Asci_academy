"use client"

import React from "react"
import { ThreeDIconBaseProps, THREE_D_SIZES } from "./3d-base"
import { cn } from "@/lib/utils"

/**
 * AI3DIcon — Studio-lit neural network matrix with illuminated synaptic nodes & core chip.
 * High-fidelity 3D claymorphic visual object.
 */
export function AI3DIcon({
  size = "md",
  className = "",
  alt = "Artificial Intelligence 3D Icon",
  ...props
}: ThreeDIconBaseProps) {
  const pixelSize = typeof size === "number" ? size : THREE_D_SIZES[size] || 80

  return (
    <svg
      viewBox="0 0 171 174"
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
        href="/images/3d-icons/ai.webp"
        width="171"
        height="174"
        preserveAspectRatio="xMidYMid meet"
      />
    </svg>
  )
}
