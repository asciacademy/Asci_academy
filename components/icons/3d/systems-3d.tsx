"use client"

import React from "react"
import { ThreeDIconBaseProps, THREE_D_SIZES, StudioLightingDefs } from "./3d-base"
import { cn } from "@/lib/utils"

/**
 * Systems3DIcon — Studio-lit isometric 3D systems architecture & distributed infrastructure blocks.
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
      <StudioLightingDefs prefix="sys3d" />

      {/* Ambient Floor Shadow */}
      <ellipse cx="60" cy="100" rx="42" ry="12" fill="url(#sys3d-floor-shadow)" />

      {/* Lower Architecture Bus Tier */}
      <path d="M60 76 L94 56 L60 36 L26 56 Z" fill="#201e1b" stroke="#33312c" strokeWidth="0.75" />
      <path d="M26 56 L60 76 L60 84 L26 64 Z" fill="url(#sys3d-face-left)" />
      <path d="M60 76 L94 56 L94 64 L60 84 Z" fill="url(#sys3d-face-right)" />

      {/* Left Microservice Node Block */}
      <path d="M38 52 L54 43 L54 57 L38 66 Z" fill="url(#sys3d-face-left)" stroke="#3d3a33" strokeWidth="0.5" />
      <path d="M54 43 L70 52 L70 66 L54 57 Z" fill="url(#sys3d-face-right)" stroke="#252320" strokeWidth="0.5" />
      <path d="M54 29 L70 38 L54 47 L38 38 Z" fill="#2d2a24" stroke="#D4B872" strokeWidth="0.75" />

      {/* Right Microservice Node Block */}
      <path d="M66 36 L82 27 L98 36 L82 45 Z" fill="#24221e" stroke="#ea580c" strokeWidth="0.75" />
      <path d="M66 36 L82 45 L82 59 L66 50 Z" fill="url(#sys3d-face-left)" />
      <path d="M82 45 L98 36 L98 50 L82 59 Z" fill="url(#sys3d-face-right)" />

      {/* Interconnect High-Speed Bus Tracks */}
      <path d="M54 47 L66 54 L82 45" stroke="#D4B872" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M46 58 L58 65 L74 56" stroke="#ea580c" strokeWidth="1.5" strokeLinecap="round" fill="none" />

      {/* Status Indicators (Restrained server pings) */}
      <circle cx="54" cy="38" r="2" fill="#D4B872" />
      <circle cx="82" cy="36" r="2" fill="#ea580c" />
      <circle cx="60" cy="74" r="2.5" fill="#fdfbf7" stroke="#10b981" strokeWidth="1" />
    </svg>
  )
}
