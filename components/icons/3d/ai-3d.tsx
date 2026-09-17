"use client"

import React from "react"
import { ThreeDIconBaseProps, THREE_D_SIZES, StudioLightingDefs } from "./3d-base"
import { cn } from "@/lib/utils"

/**
 * AI3DIcon — Studio-lit isometric 3D computational intelligence lattice.
 * Abstract computational matrix with restrained matte materials, clean nodes, and zero glowing neon cliches.
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
      <StudioLightingDefs prefix="ai3d" />

      {/* Ambient Floor Shadow */}
      <ellipse cx="60" cy="98" rx="40" ry="12" fill="url(#ai3d-floor-shadow)" />

      {/* Base Foundation Plinth */}
      <path d="M60 76 L92 58 L60 40 L28 58 Z" fill="#1c1a17" />
      <path d="M28 58 L60 76 L60 84 L28 66 Z" fill="url(#ai3d-face-left)" />
      <path d="M60 76 L92 58 L92 66 L60 84 Z" fill="url(#ai3d-face-right)" />

      {/* Floating Neural Computation Lattice - Core Cube */}
      {/* Top Face */}
      <path d="M60 26 L82 39 L60 52 L38 39 Z" fill="#2d2b27" stroke="#D4B872" strokeWidth="0.8" />
      
      {/* Left Face */}
      <path d="M38 39 L60 52 L60 76 L38 63 Z" fill="#201f1c" stroke="#3d3d3a" strokeWidth="0.75" />
      
      {/* Right Face */}
      <path d="M60 52 L82 39 L82 63 L60 76 Z" fill="#151413" stroke="#252320" strokeWidth="0.75" />

      {/* Isometric Interconnected Matrix Nodes */}
      {/* Upper Nodes */}
      <circle cx="60" cy="30" r="3" fill="#D4B872" />
      <circle cx="74" cy="38" r="2.5" fill="#2563eb" />
      <circle cx="46" cy="38" r="2.5" fill="#2563eb" />
      <circle cx="60" cy="46" r="3.5" fill="#fdfbf7" stroke="#D4B872" strokeWidth="1" />

      {/* Interconnecting Geometric Logic Vectors */}
      <line x1="60" y1="30" x2="74" y2="38" stroke="#D4B872" strokeWidth="1.2" strokeDasharray="2 1" />
      <line x1="60" y1="30" x2="46" y2="38" stroke="#D4B872" strokeWidth="1.2" strokeDasharray="2 1" />
      <line x1="46" y1="38" x2="60" y2="46" stroke="#2563eb" strokeWidth="1.2" />
      <line x1="74" y1="38" x2="60" y2="46" stroke="#2563eb" strokeWidth="1.2" />

      {/* Vertical Data Tensor Pillars */}
      <line x1="46" y1="38" x2="46" y2="58" stroke="#a09d96" strokeWidth="1.2" strokeDasharray="2 2" />
      <line x1="60" y1="46" x2="60" y2="68" stroke="#D4B872" strokeWidth="1.5" />
      <line x1="74" y1="38" x2="74" y2="58" stroke="#a09d96" strokeWidth="1.2" strokeDasharray="2 2" />

      {/* Mid Layer Core Logic Node */}
      <circle cx="60" cy="68" r="3" fill="#2563eb" stroke="#141413" strokeWidth="1" />
      <circle cx="46" cy="58" r="2" fill="#D4B872" />
      <circle cx="74" cy="58" r="2" fill="#D4B872" />
    </svg>
  )
}
