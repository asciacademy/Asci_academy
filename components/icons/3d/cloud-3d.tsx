"use client"

import React from "react"
import { ThreeDIconBaseProps, THREE_D_SIZES, StudioLightingDefs } from "./3d-base"
import { cn } from "@/lib/utils"

/**
 * Cloud3DIcon — Studio-lit isometric 3D cloud server rack & deployment pipeline.
 */
export function Cloud3DIcon({
  size = "md",
  className = "",
  alt = "Cloud & DevOps 3D Icon",
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
      <StudioLightingDefs prefix="cloud3d" />

      {/* Ambient Floor Shadow */}
      <ellipse cx="60" cy="100" rx="42" ry="12" fill="url(#cloud3d-floor-shadow)" />

      {/* Isometric Server Rack Chassis */}
      {/* Top Cap */}
      <path d="M60 22 L86 37 L60 52 L34 37 Z" fill="#24221f" stroke="#D4B872" strokeWidth="0.8" />
      
      {/* Left Wall */}
      <path d="M34 37 L60 52 L60 84 L34 69 Z" fill="url(#cloud3d-face-left)" stroke="#3d3a33" strokeWidth="0.75" />

      {/* Right Wall */}
      <path d="M60 52 L86 37 L86 69 L60 84 Z" fill="url(#cloud3d-face-right)" stroke="#252320" strokeWidth="0.75" />

      {/* Server Blade Bays (Isometric horizontal drive slots) */}
      {/* Blade 1 */}
      <path d="M38 48 L56 58 L56 63 L38 53 Z" fill="#181715" stroke="#33312c" strokeWidth="0.5" />
      <circle cx="43" cy="51" r="1.25" fill="#10b981" />
      <circle cx="48" cy="54" r="1.25" fill="#D4B872" />

      {/* Blade 2 */}
      <path d="M38 56 L56 66 L56 71 L38 61 Z" fill="#181715" stroke="#33312c" strokeWidth="0.5" />
      <circle cx="43" cy="59" r="1.25" fill="#10b981" />
      <circle cx="48" cy="62" r="1.25" fill="#2563eb" />

      {/* Blade 3 */}
      <path d="M38 64 L56 74 L56 79 L38 69 Z" fill="#181715" stroke="#33312c" strokeWidth="0.5" />
      <circle cx="43" cy="67" r="1.25" fill="#10b981" />
      <circle cx="48" cy="70" r="1.25" fill="#10b981" />

      {/* Right Face Deployment Pipeline Indicator */}
      <path d="M64 56 L82 46" stroke="#D4B872" strokeWidth="1.75" strokeDasharray="3 2" />
      <path d="M64 64 L82 54" stroke="#2563eb" strokeWidth="1.75" />
      <path d="M64 72 L82 62" stroke="#e8e2d8" strokeWidth="1.25" strokeOpacity="0.6" />

      {/* Cloud Boundary Crest (Restrained matte arch on top) */}
      <path
        d="M48 30 C 48 24, 56 22, 60 25 C 64 21, 74 24, 73 30"
        stroke="#D4B872"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.8"
      />
    </svg>
  )
}
