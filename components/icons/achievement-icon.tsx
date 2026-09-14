"use client"

import React from "react"
import { AsciIcon, IconSize } from "./asci-icon"
import { Asci3DIcon } from "./asci-3d-icon"
import { ThreeDSize } from "./3d/3d-base"
import { cn } from "@/lib/utils"

export type AchievementTier = "bronze" | "silver" | "gold" | "emerald"

export interface AchievementIconProps {
  tier?: AchievementTier
  mode?: "2d" | "3d"
  size?: IconSize
  size3d?: ThreeDSize | number
  isUnlocked?: boolean
  className?: string
}

const TIER_CONTAINER_CLASSES: Record<AchievementTier, string> = {
  bronze: "bg-amber-950/20 border-amber-800/40 text-amber-600",
  silver: "bg-slate-900/20 border-slate-700/40 text-slate-300",
  gold: "bg-[#D4B872]/15 border-[#D4B872]/40 text-[#D4B872]",
  emerald: "bg-emerald-950/20 border-emerald-700/40 text-emerald-500",
}

/**
 * AchievementIcon — Standardized Achievement & Honors Icon Component
 */
export function AchievementIcon({
  tier = "gold",
  mode = "2d",
  size = "md",
  size3d = "md",
  isUnlocked = true,
  className = "",
}: AchievementIconProps) {
  if (mode === "3d") {
    return (
      <Asci3DIcon
        name={isUnlocked ? "empty-badge" : "empty-badge"}
        size={size3d}
        className={cn(!isUnlocked && "opacity-40 grayscale", className)}
        alt={`${tier} Achievement Badge`}
      />
    )
  }

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-xl border p-2 transition-transform",
        isUnlocked ? TIER_CONTAINER_CLASSES[tier] : "bg-muted/40 border-hairline text-muted-foreground opacity-50",
        className
      )}
    >
      <AsciIcon name="trophy" size={size} tone="inherit" />
    </div>
  )
}
