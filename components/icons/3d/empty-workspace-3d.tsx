"use client"

import React from "react"
import { ThreeDIconBaseProps, THREE_D_SIZES, StudioLightingDefs } from "./3d-base"
import { cn } from "@/lib/utils"

/**
 * EmptyWorkspace3DIcon — Studio-lit isometric 3D engineering workstation for empty projects states.
 */
export function EmptyWorkspace3DIcon({
  size = "lg",
  className = "",
  alt = "No Projects Empty State",
  ...props
}: ThreeDIconBaseProps) {
  const pixelSize = typeof size === "number" ? size : THREE_D_SIZES[size] || 96

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
      <StudioLightingDefs prefix="work3d" />

      {/* Ambient Floor Shadow */}
      <ellipse cx="60" cy="102" rx="42" ry="12" fill="url(#work3d-floor-shadow)" />

      {/* Isometric Desk Plinth */}
      <path d="M60 74 L96 54 L60 34 L24 54 Z" fill="#24221f" stroke="#3d3a33" strokeWidth="0.75" />
      <path d="M24 54 L60 74 L60 80 L24 60 Z" fill="url(#work3d-face-left)" />
      <path d="M60 74 L96 54 L96 60 L60 80 Z" fill="url(#work3d-face-right)" />

      {/* Stand Leg */}
      <path d="M58 54 L62 52 L62 68 L58 70 Z" fill="#141413" />

      {/* Isometric Ultra-Wide Monitor Display */}
      {/* Screen Frame Back */}
      <path d="M38 34 L78 12 L84 46 L44 68 Z" fill="#181715" stroke="#252320" strokeWidth="0.75" />

      {/* Screen Active Canvas */}
      <path d="M40 36 L76 16 L81 44 L45 64 Z" fill="#062112" stroke="#D4B872" strokeWidth="0.8" />

      {/* Screen Code Lines */}
      <line x1="45" y1="40" x2="55" y2="34" stroke="#D4B872" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="58" y1="32" x2="68" y2="26" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="48" y1="46" x2="65" y2="36" stroke="#fdfbf7" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.7" />
      <line x1="52" y1="52" x2="72" y2="40" stroke="#fdfbf7" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.5" />

      {/* Floating Isometric Folder/File Plate */}
      <path d="M68 56 L86 46 L94 50 L76 60 Z" fill="#2d2b27" stroke="#2563eb" strokeWidth="0.75" />
      <path d="M68 56 L76 60 L76 66 L68 62 Z" fill="#141413" />
      <path d="M76 60 L94 50 L94 56 L76 66 Z" fill="#100f0e" />
    </svg>
  )
}
