"use client"

import React from "react"
import { AxelEmotion } from "@/types/axel"
import { AxelVectorBot } from "@/components/axel/axel-vector-bot"

export interface R4XRobotProps {
  className?: string
  expression?: AxelEmotion
  isCompact?: boolean
  onClick?: () => void
  showAudioControl?: boolean
}

/**
 * R4XRobot — High-Craft Editorial Cyber-Bot Companion
 * Replaces heavy Spline WebGL iframe with lightweight SVG Vector Bot.
 * Zero-delay rendering, 60 FPS spring parallax, dynamic LED expressions, and zero GPU overhead.
 */
export function R4XRobot({
  className = "",
  expression = "normal",
  isCompact = false,
  onClick,
  showAudioControl = true,
}: R4XRobotProps) {
  return (
    <AxelVectorBot
      className={className}
      expression={expression}
      isCompact={isCompact}
      onClick={onClick}
      showAudioControl={showAudioControl}
    />
  )
}

export { AxelVectorBot }
