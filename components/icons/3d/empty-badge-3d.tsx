"use client"

import React from "react"
import { ThreeDIconBaseProps, THREE_D_SIZES, StudioLightingDefs } from "./3d-base"
import { cn } from "@/lib/utils"

/**
 * EmptyBadge3DIcon — Studio-lit isometric 3D heraldic medal & faceted achievement shield.
 */
export function EmptyBadge3DIcon({
  size = "lg",
  className = "",
  alt = "No Achievements Empty State",
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
      <StudioLightingDefs prefix="badge3d" />

      {/* Ambient Floor Shadow */}
      <ellipse cx="60" cy="102" rx="38" ry="10" fill="url(#badge3d-floor-shadow)" />

      {/* Ribbon Banner Strands (Behind) */}
      <path d="M48 64 L40 92 L52 86 L56 94 L56 70 Z" fill="#062112" stroke="#D4B872" strokeWidth="0.5" />
      <path d="M72 64 L80 92 L68 86 L64 94 L64 70 Z" fill="#064e3b" stroke="#D4B872" strokeWidth="0.5" />

      {/* Outer Faceted Octagonal Plaque */}
      <path
        d="M60 20 L84 32 L94 56 L84 80 L60 92 L36 80 L26 56 L36 32 Z"
        fill="#24221f"
        stroke="#D4B872"
        strokeWidth="1.5"
      />

      {/* Left Beveled Facet */}
      <path
        d="M60 20 L36 32 L26 56 L36 80 L60 92 L60 20 Z"
        fill="url(#badge3d-face-left)"
        fillOpacity="0.4"
      />

      {/* Inner Enamel Core */}
      <path
        d="M60 28 L78 38 L86 56 L78 74 L60 84 L42 74 L34 56 L42 38 Z"
        fill="#141413"
        stroke="#3d3a33"
        strokeWidth="1"
      />

      {/* Gold Star / Laurel Inset */}
      <path
        d="M60 40 L64 50 L74 50 L66 56 L69 66 L60 60 L51 66 L54 56 L46 50 L56 50 Z"
        fill="#D4B872"
        stroke="#a3853f"
        strokeWidth="0.5"
      />

      {/* Center Ruby/Sapphire Accent Dot */}
      <circle cx="60" cy="54" r="2" fill="#2563eb" />
    </svg>
  )
}
