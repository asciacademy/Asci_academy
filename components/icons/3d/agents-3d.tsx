"use client"

import React from "react"
import { ThreeDIconBaseProps, THREE_D_SIZES, StudioLightingDefs } from "./3d-base"
import { cn } from "@/lib/utils"

/**
 * Agents3DIcon — Studio-lit isometric 3D autonomous agent core & orchestrator lattice.
 */
export function Agents3DIcon({
  size = "md",
  className = "",
  alt = "AI Agents 3D Icon",
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
      <StudioLightingDefs prefix="agent3d" />

      {/* Ambient Floor Shadow */}
      <ellipse cx="60" cy="100" rx="42" ry="12" fill="url(#agent3d-floor-shadow)" />

      {/* Base Foundation Platform */}
      <path d="M60 76 L94 56 L60 36 L26 56 Z" fill="#1c1a17" />
      <path d="M26 56 L60 76 L60 84 L26 64 Z" fill="url(#agent3d-face-left)" />
      <path d="M60 76 L94 56 L94 64 L60 84 Z" fill="url(#agent3d-face-right)" />

      {/* Central Autonomous Core (Faceted Octahedral Prism) */}
      <path d="M60 22 L78 36 L60 50 L42 36 Z" fill="#2d2b27" stroke="#D4B872" strokeWidth="1" />
      <path d="M42 36 L60 50 L60 72 L42 58 Z" fill="url(#agent3d-face-left)" stroke="#3d3a33" strokeWidth="0.75" />
      <path d="M60 50 L78 36 L78 58 L60 72 Z" fill="url(#agent3d-face-right)" stroke="#252320" strokeWidth="0.75" />

      {/* Core Energy Ring (Restrained gold orbit) */}
      <ellipse cx="60" cy="50" rx="26" ry="10" stroke="#D4B872" strokeWidth="1.2" strokeDasharray="4 2" fill="none" />

      {/* Satellite Autonomous Subagent Nodes */}
      <circle cx="34" cy="50" r="3.5" fill="#2563eb" stroke="#141413" strokeWidth="1" />
      <circle cx="86" cy="50" r="3.5" fill="#10b981" stroke="#141413" strokeWidth="1" />
      <circle cx="60" cy="40" r="3" fill="#D4B872" />

      {/* Coordinated Feedback Vector Rays */}
      <line x1="34" y1="50" x2="48" y2="44" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="86" y1="50" x2="72" y2="44" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
