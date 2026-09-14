"use client"

import React from "react"
import { ThreeDIconBaseProps, THREE_D_SIZES, StudioLightingDefs } from "./3d-base"
import { cn } from "@/lib/utils"

/**
 * Automation3DIcon — Studio-lit isometric 3D workflow & precision automation lattice.
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
      viewBox="0 0 120 120"
      width={pixelSize}
      height={pixelSize}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0 select-none", className)}
      role="img"
      aria-label={alt}
      {...props}
    >
      <StudioLightingDefs prefix="auto3d" />

      {/* Ambient Floor Shadow */}
      <ellipse cx="60" cy="100" rx="42" ry="12" fill="url(#auto3d-floor-shadow)" />

      {/* Base Elevation Platform */}
      <path d="M60 76 L94 56 L60 36 L26 56 Z" fill="#1e1c19" />
      <path d="M26 56 L60 76 L60 84 L26 64 Z" fill="url(#auto3d-face-left)" />
      <path d="M60 76 L94 56 L94 64 L60 84 Z" fill="url(#auto3d-face-right)" />

      {/* Left Interlocking Isometric Gear Plate */}
      <ellipse cx="48" cy="46" rx="18" ry="10" fill="#292622" stroke="#D4B872" strokeWidth="1" />
      <ellipse cx="48" cy="46" rx="8" ry="4.5" fill="#141413" stroke="#ea580c" strokeWidth="0.75" />
      {/* Gear Teeth Pins */}
      <circle cx="48" cy="36" r="1.5" fill="#D4B872" />
      <circle cx="66" cy="46" r="1.5" fill="#D4B872" />
      <circle cx="48" cy="56" r="1.5" fill="#D4B872" />
      <circle cx="30" cy="46" r="1.5" fill="#D4B872" />

      {/* Right Interlocking Isometric Gear Plate */}
      <ellipse cx="72" cy="56" rx="16" ry="9" fill="#22201d" stroke="#ea580c" strokeWidth="1" />
      <ellipse cx="72" cy="56" rx="7" ry="4" fill="#141413" stroke="#D4B872" strokeWidth="0.75" />
      {/* Gear Teeth Pins */}
      <circle cx="72" cy="47" r="1.5" fill="#ea580c" />
      <circle cx="88" cy="56" r="1.5" fill="#ea580c" />
      <circle cx="72" cy="65" r="1.5" fill="#ea580c" />
      <circle cx="56" cy="56" r="1.5" fill="#ea580c" />

      {/* Synchronized Flow Circuit Trace */}
      <path
        d="M34 40 L60 25 L86 40"
        stroke="#D4B872"
        strokeWidth="1.75"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="60" cy="25" r="2.5" fill="#10b981" />
    </svg>
  )
}
