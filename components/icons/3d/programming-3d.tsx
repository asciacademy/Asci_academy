"use client"

import React from "react"
import { ThreeDIconBaseProps, THREE_D_SIZES, StudioLightingDefs } from "./3d-base"
import { cn } from "@/lib/utils"

/**
 * Programming3DIcon — Studio-lit isometric 3D code editor window & compiler plane.
 * Clean geometry, matte finish, soft drop shadow, zero neon AI-slop.
 */
export function Programming3DIcon({
  size = "md",
  className = "",
  alt = "Programming 3D Icon",
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
      <StudioLightingDefs prefix="prog3d" />

      {/* Ambient Floor Shadow */}
      <ellipse cx="60" cy="100" rx="42" ry="12" fill="url(#prog3d-floor-shadow)" />

      {/* Base Elevation Platform */}
      <path d="M60 76 L94 56 L60 36 L26 56 Z" fill="#252320" />
      <path d="M26 56 L60 76 L60 84 L26 64 Z" fill="url(#prog3d-face-left)" />
      <path d="M60 76 L94 56 L94 64 L60 84 Z" fill="url(#prog3d-face-right)" />

      {/* Chamfered Isometric Code Terminal Box */}
      {/* Back Panel */}
      <path d="M34 44 L60 29 L86 44 L60 59 Z" fill="#1e1d1a" stroke="#3d3d3a" strokeWidth="0.75" />
      
      {/* Floating Upper Code Pane (Isometric Viewport) */}
      <path d="M36 38 L60 24 L84 38 L60 52 Z" fill="#141413" stroke="#D4B872" strokeWidth="0.8" strokeOpacity="0.4" />

      {/* Window Header Dots (Subtle neutral, not clown colors) */}
      <circle cx="48" cy="34" r="1.5" fill="#e8e2d8" opacity="0.6" />
      <circle cx="53" cy="31" r="1.5" fill="#e8e2d8" opacity="0.4" />
      <circle cx="58" cy="28" r="1.5" fill="#e8e2d8" opacity="0.4" />

      {/* Isometric Code Lines (Clean gold & terracotta syntax highlights) */}
      {/* Line 1: Keyword + Identifier */}
      <path d="M44 40 L52 35.5" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" />
      <path d="M55 33.8 L68 26.5" stroke="#D4B872" strokeWidth="2" strokeLinecap="round" />

      {/* Line 2: Indented Function Call */}
      <path d="M48 44.5 L58 39" stroke="#e8e2d8" strokeWidth="1.75" strokeLinecap="round" strokeOpacity="0.7" />
      <path d="M61 37.2 L72 31" stroke="#2563eb" strokeWidth="1.75" strokeLinecap="round" />

      {/* Line 3: Return Statement & Bracket */}
      <path d="M48 48.5 L54 45" stroke="#D4B872" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M57 43.2 L64 39.2" stroke="#e8e2d8" strokeWidth="1.75" strokeLinecap="round" strokeOpacity="0.5" />

      {/* Front Isometric Bracket Accent */}
      <path d="M60 58 L70 52 L60 46" stroke="#D4B872" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.9" />
      <path d="M50 64 L40 58 L50 52" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.9" />
    </svg>
  )
}
