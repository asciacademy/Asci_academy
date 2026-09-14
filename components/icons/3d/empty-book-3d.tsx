"use client"

import React from "react"
import { ThreeDIconBaseProps, THREE_D_SIZES, StudioLightingDefs } from "./3d-base"
import { cn } from "@/lib/utils"

/**
 * EmptyBook3DIcon — Studio-lit isometric 3D open book & learning ledger for empty course states.
 */
export function EmptyBook3DIcon({
  size = "lg",
  className = "",
  alt = "No Courses Empty State",
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
      <StudioLightingDefs prefix="book3d" />

      {/* Ambient Floor Shadow */}
      <ellipse cx="60" cy="100" rx="42" ry="12" fill="url(#book3d-floor-shadow)" />

      {/* Hardcover Spine Foundation */}
      <path d="M60 84 L22 66 L22 72 L60 90 L98 72 L98 66 Z" fill="#062112" stroke="#D4B872" strokeWidth="0.75" />

      {/* Left Open Page Block */}
      <path d="M60 80 L24 62 L32 38 L60 54 Z" fill="#fdfbf7" stroke="#e8e2d8" strokeWidth="0.75" />
      <path d="M24 62 L60 80 L60 84 L24 66 Z" fill="#ede7de" />

      {/* Right Open Page Block */}
      <path d="M60 80 L96 62 L88 38 L60 54 Z" fill="#f5f0e8" stroke="#e8e2d8" strokeWidth="0.75" />
      <path d="M60 80 L96 62 L96 66 L60 84 Z" fill="#e2dbcf" />

      {/* Gold Ribbon Bookmark Inset */}
      <path
        d="M60 54 L60 88 L65 83 L70 88 L70 57"
        fill="#D4B872"
        stroke="#a3853f"
        strokeWidth="0.5"
      />

      {/* Subtle Editorial Text Lines on Left Page */}
      <line x1="32" y1="46" x2="52" y2="58" stroke="#a09d96" strokeWidth="1.2" strokeOpacity="0.4" />
      <line x1="30" y1="52" x2="52" y2="64" stroke="#a09d96" strokeWidth="1.2" strokeOpacity="0.4" />
      <line x1="30" y1="58" x2="48" y2="68" stroke="#a09d96" strokeWidth="1.2" strokeOpacity="0.3" />

      {/* Subtle Editorial Text Lines on Right Page */}
      <line x1="68" y1="58" x2="88" y2="46" stroke="#a09d96" strokeWidth="1.2" strokeOpacity="0.4" />
      <line x1="68" y1="64" x2="90" y2="52" stroke="#a09d96" strokeWidth="1.2" strokeOpacity="0.4" />
      <line x1="72" y1="70" x2="90" y2="58" stroke="#a09d96" strokeWidth="1.2" strokeOpacity="0.3" />

      {/* Centered ASCI Floating Insignia */}
      <circle cx="60" cy="42" r="3.5" fill="#ea580c" />
    </svg>
  )
}
