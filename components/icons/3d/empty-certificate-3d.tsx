"use client"

import React from "react"
import { ThreeDIconBaseProps, THREE_D_SIZES } from "./3d-base"
import { cn } from "@/lib/utils"

/**
 * EmptyCertificate3DIcon — Studio-lit wax-sealed parchment diploma with ribbon (certificates empty state).
 * High-fidelity 3D claymorphic visual object.
 */
export function EmptyCertificate3DIcon({
  size = "md",
  className = "",
  alt = "No Certificates Yet 3D Icon",
  ...props
}: ThreeDIconBaseProps) {
  const pixelSize = typeof size === "number" ? size : THREE_D_SIZES[size] || 80

  return (
    <svg
      viewBox="0 0 167 157"
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
        href="/images/3d-icons/empty-certificate.webp"
        width="167"
        height="157"
        preserveAspectRatio="xMidYMid meet"
      />
    </svg>
  )
}
