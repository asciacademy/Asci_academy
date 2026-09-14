"use client"

import React from "react"
import { ThreeDIconBaseProps, THREE_D_SIZES, StudioLightingDefs } from "./3d-base"
import { cn } from "@/lib/utils"

/**
 * Algorithms3DIcon — Studio-lit isometric 3D binary search graph & balanced node tree.
 */
export function Algorithms3DIcon({
  size = "md",
  className = "",
  alt = "Algorithms & Data Structures 3D Icon",
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
      <StudioLightingDefs prefix="algo3d" />

      {/* Ambient Floor Shadow */}
      <ellipse cx="60" cy="100" rx="42" ry="12" fill="url(#algo3d-floor-shadow)" />

      {/* Base Grid Tier */}
      <path d="M60 76 L94 56 L60 36 L26 56 Z" fill="#1e1d1a" stroke="#33312c" strokeWidth="0.75" />
      <path d="M26 56 L60 76 L60 84 L26 64 Z" fill="url(#algo3d-face-left)" />
      <path d="M60 76 L94 56 L94 64 L60 84 Z" fill="url(#algo3d-face-right)" />

      {/* Root Node (Top) */}
      <ellipse cx="60" cy="30" rx="9" ry="5.5" fill="#2d2b27" stroke="#D4B872" strokeWidth="1.2" />
      <circle cx="60" cy="30" r="3" fill="#D4B872" />

      {/* Branch Connectors (Isometric depth) */}
      <line x1="55" y1="34" x2="42" y2="48" stroke="#D4B872" strokeWidth="1.75" />
      <line x1="65" y1="34" x2="78" y2="48" stroke="#ea580c" strokeWidth="1.75" />

      {/* Left Child Node (Level 1) */}
      <ellipse cx="42" cy="50" rx="8" ry="5" fill="#24221f" stroke="#D4B872" strokeWidth="1" />
      <circle cx="42" cy="50" r="2.5" fill="#ea580c" />

      {/* Right Child Node (Level 1) */}
      <ellipse cx="78" cy="50" rx="8" ry="5" fill="#24221f" stroke="#ea580c" strokeWidth="1" />
      <circle cx="78" cy="50" r="2.5" fill="#D4B872" />

      {/* Leaf Branch Connectors (Level 2) */}
      <line x1="38" y1="54" x2="32" y2="68" stroke="#a09d96" strokeWidth="1.2" strokeDasharray="2 1" />
      <line x1="46" y1="54" x2="52" y2="68" stroke="#a09d96" strokeWidth="1.2" strokeDasharray="2 1" />
      <line x1="74" y1="54" x2="68" y2="68" stroke="#a09d96" strokeWidth="1.2" strokeDasharray="2 1" />
      <line x1="82" y1="54" x2="88" y2="68" stroke="#a09d96" strokeWidth="1.2" strokeDasharray="2 1" />

      {/* Leaf Nodes */}
      <circle cx="32" cy="70" r="3" fill="#fdfbf7" stroke="#10b981" strokeWidth="1" />
      <circle cx="52" cy="70" r="3" fill="#141413" stroke="#D4B872" strokeWidth="1" />
      <circle cx="68" cy="70" r="3" fill="#141413" stroke="#ea580c" strokeWidth="1" />
      <circle cx="88" cy="70" r="3" fill="#fdfbf7" stroke="#D4B872" strokeWidth="1" />
    </svg>
  )
}
