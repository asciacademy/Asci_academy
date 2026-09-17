"use client"

import React from "react"
import { ThreeDIconBaseProps, THREE_D_SIZES, StudioLightingDefs } from "./3d-base"
import { cn } from "@/lib/utils"

/**
 * EmptyCertificate3DIcon — Studio-lit isometric 3D parchment credential & wax-sealed diploma.
 */
export function EmptyCertificate3DIcon({
  size = "lg",
  className = "",
  alt = "No Certificates Empty State",
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
      <StudioLightingDefs prefix="cert3d" />

      {/* Ambient Floor Shadow */}
      <ellipse cx="60" cy="102" rx="42" ry="12" fill="url(#cert3d-floor-shadow)" />

      {/* Rolled Diploma Scroll Sheet (Isometric Angle) */}
      {/* Back Depth Thickness */}
      <path d="M34 32 L86 18 L92 78 L40 92 Z" fill="#e2dbcf" stroke="#d5cebf" strokeWidth="0.5" />

      {/* Parchment Main Face */}
      <path d="M30 36 L82 22 L88 82 L36 96 Z" fill="#fdfbf7" stroke="#D4B872" strokeWidth="1" />

      {/* Gold Leaf Inner Filigree Border */}
      <path
        d="M36 41 L77 30 L82 78 L41 89 Z"
        stroke="#D4B872"
        strokeWidth="0.8"
        strokeDasharray="4 2"
        fill="none"
        strokeOpacity="0.8"
      />

      {/* Academic Header Monogram Stamp */}
      <circle cx="58" cy="42" r="5" fill="#062112" stroke="#D4B872" strokeWidth="0.75" />
      <path d="M58 39 L61 44 L55 44 Z" fill="#D4B872" />

      {/* Script Calligraphy Lines */}
      <line x1="42" y1="52" x2="74" y2="44" stroke="#a09d96" strokeWidth="1.2" strokeOpacity="0.5" />
      <line x1="44" y1="58" x2="72" y2="50" stroke="#a09d96" strokeWidth="1.2" strokeOpacity="0.4" />
      <line x1="46" y1="64" x2="70" y2="56" stroke="#a09d96" strokeWidth="1.2" strokeOpacity="0.4" />
      <line x1="48" y1="70" x2="64" y2="65" stroke="#a09d96" strokeWidth="1.2" strokeOpacity="0.3" />

      {/* Official Gravit / ASCI Wax Seal Emblem (Bottom Left) */}
      <circle cx="48" cy="80" r="9" fill="#2563eb" stroke="#1d4ed8" strokeWidth="1" />
      <circle cx="48" cy="80" r="6" fill="#1e40af" stroke="#D4B872" strokeWidth="0.75" />
      {/* Star Insignia inside seal */}
      <path
        d="M48 76 L49.5 79 L53 79.5 L50 82 L51 85 L48 83.5 L45 85 L46 82 L43 79.5 L46.5 79 Z"
        fill="#D4B872"
      />

      {/* Seal Ribbon Tails */}
      <path d="M46 88 L42 98 L48 95 L52 98 L50 88 Z" fill="#1e40af" stroke="#1d4ed8" strokeWidth="0.5" />
    </svg>
  )
}
