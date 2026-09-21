"use client"

import React from "react"
import { ThreeDIconBaseProps, THREE_D_SIZES } from "./3d-base"
import { cn } from "@/lib/utils"

/**
 * Cloud3DIcon — Studio-lit high-availability cloud server cluster with dual edge gateways.
 * High-fidelity 3D claymorphic visual object.
 */
export function Cloud3DIcon({
  size = "md",
  className = "",
  alt = "Cloud Infrastructure 3D Icon",
  ...props
}: ThreeDIconBaseProps) {
  const pixelSize = typeof size === "number" ? size : THREE_D_SIZES[size] || 80

  return (
    <svg
      viewBox="0 0 184 169"
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
        href="/images/3d-icons/cloud.webp"
        width="184"
        height="169"
        preserveAspectRatio="xMidYMid meet"
      />
    </svg>
  )
}
