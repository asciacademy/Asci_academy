"use client"

import React from "react"
import { AxelEmotion } from "@/types/axel"

export interface AxelStageProps {
  id: string
  sectionId?: string
  label?: string
  emotion?: AxelEmotion
  scale?: number
  size?: "sm" | "md" | "lg" | "hero"
  className?: string
}

const SIZE_MAP = {
  sm: "w-52 h-44",
  md: "w-64 h-52",
  lg: "w-72 h-60",
  hero: "w-full min-h-[480px] sm:min-h-[540px] lg:min-h-[600px]",
}

export function AxelStage({
  id,
  sectionId,
  label,
  emotion = "happy",
  scale = 0.46,
  size = "md",
  className = "",
}: AxelStageProps) {
  const sizeClass = SIZE_MAP[size] || SIZE_MAP.md

  return (
    <div
      className={`relative shrink-0 hidden lg:flex items-center justify-center self-center lg:self-auto ${sizeClass} ${className}`}
      aria-hidden="true"
    >
      {/* Anchor point measured by AxelCompanion */}
      <div
        id={id}
        data-axel-anchor="true"
        data-section-id={sectionId || ""}
        data-emotion={emotion}
        data-scale={scale}
        data-label={label || ""}
        className="w-full h-full relative flex items-center justify-center pointer-events-none select-none"
      />
    </div>
  )
}
