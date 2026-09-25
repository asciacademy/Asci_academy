"use client"

import React from "react"
import { AxelEmotion } from "@/types/axel"

export interface AxelStageProps {
  id?: string
  sectionId?: string
  label?: string
  emotion?: AxelEmotion
  scale?: number
  size?: "sm" | "md" | "lg" | "hero"
  className?: string
}

/**
 * AxelStage: Clean non-rendering anchor preserving legacy caller signatures
 * without generating oversized empty blocks or 3D robot canvas layout shifts.
 */
export function AxelStage(_props: AxelStageProps) {
  return null
}
