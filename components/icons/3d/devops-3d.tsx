"use client"

import React from "react"
import { ThreeDIconBaseProps, THREE_D_SIZES, StudioLightingDefs } from "./3d-base"
import { cn } from "@/lib/utils"

/**
 * DevOps3DIcon — Studio-lit isometric 3D CI/CD deployment pipeline & container blocks.
 */
export function DevOps3DIcon({
  size = "md",
  className = "",
  alt = "DevOps & Deployment 3D Icon",
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
      <StudioLightingDefs prefix="do3d" />

      {/* Ambient Floor Shadow */}
      <ellipse cx="60" cy="100" rx="42" ry="12" fill="url(#do3d-floor-shadow)" />

      {/* Pipeline Base Platform */}
      <path d="M60 78 L96 58 L60 38 L24 58 Z" fill="#1b1a18" />
      <path d="M24 58 L60 78 L60 86 L24 66 Z" fill="url(#do3d-face-left)" />
      <path d="M60 78 L96 58 L96 66 L60 86 Z" fill="url(#do3d-face-right)" />

      {/* Container Box 1 (Build / Stage) */}
      <path d="M36 50 L52 41 L68 50 L52 59 Z" fill="#24221e" stroke="#D4B872" strokeWidth="0.8" />
      <path d="M36 50 L52 59 L52 73 L36 64 Z" fill="url(#do3d-face-left)" stroke="#33312c" strokeWidth="0.5" />
      <path d="M52 59 L68 50 L68 64 L52 73 Z" fill="url(#do3d-face-right)" stroke="#252320" strokeWidth="0.5" />

      {/* Container Ribs */}
      <line x1="41" y1="53" x2="41" y2="67" stroke="#3d3a33" strokeWidth="1" />
      <line x1="46" y1="56" x2="46" y2="70" stroke="#3d3a33" strokeWidth="1" />
      <line x1="57" y1="56" x2="57" y2="70" stroke="#3d3a33" strokeWidth="1" />
      <line x1="63" y1="53" x2="63" y2="67" stroke="#3d3a33" strokeWidth="1" />

      {/* Container Box 2 (Deploy / Production Stacked) */}
      <path d="M54 36 L70 27 L86 36 L70 45 Z" fill="#2d2a24" stroke="#ea580c" strokeWidth="0.8" />
      <path d="M54 36 L70 45 L70 59 L54 50 Z" fill="url(#do3d-face-left)" stroke="#33312c" strokeWidth="0.5" />
      <path d="M70 45 L86 36 L86 50 L70 59 Z" fill="url(#do3d-face-right)" stroke="#252320" strokeWidth="0.5" />

      {/* Container Ribs 2 */}
      <line x1="59" y1="39" x2="59" y2="53" stroke="#3d3a33" strokeWidth="1" />
      <line x1="64" y1="42" x2="64" y2="56" stroke="#3d3a33" strokeWidth="1" />
      <line x1="75" y1="42" x2="75" y2="56" stroke="#3d3a33" strokeWidth="1" />
      <line x1="81" y1="39" x2="81" y2="53" stroke="#3d3a33" strokeWidth="1" />

      {/* CI/CD Pipeline Loop Track (Restrained orbital path with gold arrow) */}
      <path
        d="M32 54 C 28 34, 52 24, 72 26"
        stroke="#D4B872"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="3 2"
        fill="none"
      />
      <circle cx="72" cy="26" r="2.5" fill="#10b981" />
    </svg>
  )
}
