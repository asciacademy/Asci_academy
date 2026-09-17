"use client"

import React from "react"
import { ThreeDIconBaseProps, THREE_D_SIZES, StudioLightingDefs } from "./3d-base"
import { cn } from "@/lib/utils"

/**
 * Security3DIcon — Studio-lit isometric 3D cryptographic shield & precision vault key.
 */
export function Security3DIcon({
  size = "md",
  className = "",
  alt = "Cybersecurity 3D Icon",
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
      <StudioLightingDefs prefix="sec3d" />

      {/* Ambient Floor Shadow */}
      <ellipse cx="60" cy="100" rx="42" ry="12" fill="url(#sec3d-floor-shadow)" />

      {/* Isometric Cryptographic Shield Body */}
      {/* Front Left Facet */}
      <path
        d="M60 24 L34 38 L34 68 C34 82, 54 94, 60 98 L60 24 Z"
        fill="url(#sec3d-face-left)"
        stroke="#3d3a33"
        strokeWidth="0.75"
      />

      {/* Front Right Facet */}
      <path
        d="M60 24 L86 38 L86 68 C86 82, 66 94, 60 98 L60 24 Z"
        fill="url(#sec3d-face-right)"
        stroke="#252320"
        strokeWidth="0.75"
      />

      {/* Gold Rim Chamfer */}
      <path
        d="M60 27 L38 39 L38 66 C38 78, 55 88, 60 91 C65 88, 82 78, 82 66 L82 39 Z"
        stroke="#D4B872"
        strokeWidth="1.2"
        fill="none"
        strokeOpacity="0.8"
      />

      {/* Vault Core Hardware Keyhole (Faceted geometric lock) */}
      <path d="M60 48 L68 53 L60 58 L52 53 Z" fill="#2d2b27" stroke="#2563eb" strokeWidth="1" />
      <path d="M52 53 L60 58 L60 72 L52 67 Z" fill="#181715" />
      <path d="M60 58 L68 53 L68 67 L60 72 Z" fill="#0f0f0e" />

      {/* Keyhole Slot */}
      <ellipse cx="60" cy="58" rx="2" ry="2.5" fill="#D4B872" />
      <path d="M59 60 L61 60 L61.5 66 L58.5 66 Z" fill="#D4B872" />

      {/* Top Shackle Arc */}
      <path
        d="M50 36 C50 26, 70 26, 70 36"
        stroke="#D4B872"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}
