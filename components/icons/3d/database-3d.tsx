"use client"

import React from "react"
import { ThreeDIconBaseProps, THREE_D_SIZES, StudioLightingDefs } from "./3d-base"
import { cn } from "@/lib/utils"

/**
 * Database3DIcon — Studio-lit isometric 3D cylindrical data store with structured block shards.
 */
export function Database3DIcon({
  size = "md",
  className = "",
  alt = "Database 3D Icon",
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
      <StudioLightingDefs prefix="db3d" />

      {/* Ambient Floor Shadow */}
      <ellipse cx="60" cy="100" rx="42" ry="12" fill="url(#db3d-floor-shadow)" />

      {/* Bottom Cylinder Disk */}
      <path d="M30 68 C30 60, 90 60, 90 68 L90 82 C90 90, 30 90, 30 82 Z" fill="#141413" stroke="#252320" strokeWidth="0.75" />
      <path d="M30 68 C30 76, 90 76, 90 68" stroke="#3d3a33" strokeWidth="0.75" fill="none" />

      {/* Middle Cylinder Disk */}
      <path d="M30 48 C30 40, 90 40, 90 48 L90 62 C90 70, 30 70, 30 62 Z" fill="#1c1a17" stroke="#2d2b27" strokeWidth="0.75" />
      <path d="M30 48 C30 56, 90 56, 90 48" stroke="#D4B872" strokeWidth="0.8" strokeOpacity="0.4" fill="none" />

      {/* Top Cylinder Cap */}
      <path d="M30 28 C30 20, 90 20, 90 28 L90 42 C90 50, 30 50, 30 42 Z" fill="#24221e" stroke="#3d3d3a" strokeWidth="0.75" />
      <ellipse cx="60" cy="28" rx="30" ry="8" fill="#2d2b27" stroke="#D4B872" strokeWidth="1" />

      {/* Structured Data Partition Grooves (Gold & Terracotta indicators) */}
      <path d="M42 34 L42 42" stroke="#D4B872" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M60 36 L60 44" stroke="#ea580c" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M78 34 L78 42" stroke="#D4B872" strokeWidth="1.5" strokeLinecap="round" />

      <path d="M42 54 L42 62" stroke="#ea580c" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M60 56 L60 64" stroke="#D4B872" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M78 54 L78 62" stroke="#ea580c" strokeWidth="1.5" strokeLinecap="round" />

      {/* Top Shard Plate Inset */}
      <ellipse cx="60" cy="28" rx="18" ry="4.5" fill="#141413" stroke="#ea580c" strokeWidth="0.75" />
      <circle cx="60" cy="28" r="2" fill="#D4B872" />
    </svg>
  )
}
