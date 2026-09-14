"use client"

import React from "react"
import { cn } from "@/lib/utils"

export type ThreeDSize = "sm" | "md" | "lg" | "xl"

export const THREE_D_SIZES: Record<ThreeDSize, number> = {
  sm: 64,
  md: 80,
  lg: 96,
  xl: 120,
}

export interface ThreeDIconBaseProps extends React.SVGProps<SVGSVGElement> {
  size?: ThreeDSize | number
  className?: string
  alt?: string
}

/**
 * Common studio lighting definitions and shadow gradients for ASCI isometric 3D icons.
 */
export function StudioLightingDefs({ prefix }: { prefix: string }) {
  return (
    <defs>
      {/* Ambient Floor Shadow */}
      <radialGradient id={`${prefix}-floor-shadow`} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#000000" stopOpacity="0.28" />
        <stop offset="70%" stopColor="#000000" stopOpacity="0.08" />
        <stop offset="100%" stopColor="#000000" stopOpacity="0" />
      </radialGradient>

      {/* Top Surface Studio Key Light */}
      <linearGradient id={`${prefix}-key-top`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fdfbf7" stopOpacity="0.95" />
        <stop offset="100%" stopColor="#e8e2d8" stopOpacity="0.8" />
      </linearGradient>

      {/* Left Facing Isometric Surface (Direct Light) */}
      <linearGradient id={`${prefix}-face-left`} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#252320" />
        <stop offset="100%" stopColor="#141413" />
      </linearGradient>

      {/* Right Facing Isometric Surface (Fill / Shadow) */}
      <linearGradient id={`${prefix}-face-right`} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#181715" />
        <stop offset="100%" stopColor="#0a0a09" />
      </linearGradient>

      {/* ASCI Brand Gold Accent Material */}
      <linearGradient id={`${prefix}-gold-accent`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ecdca7" />
        <stop offset="50%" stopColor="#D4B872" />
        <stop offset="100%" stopColor="#a3853f" />
      </linearGradient>

      {/* ASCI Brand Terracotta Accent Material */}
      <linearGradient id={`${prefix}-terracotta-accent`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fb923c" />
        <stop offset="50%" stopColor="#ea580c" />
        <stop offset="100%" stopColor="#9a3412" />
      </linearGradient>

      {/* Emerald Tone Accent Material */}
      <linearGradient id={`${prefix}-emerald-accent`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="50%" stopColor="#064e3b" />
        <stop offset="100%" stopColor="#062112" />
      </linearGradient>
    </defs>
  )
}
