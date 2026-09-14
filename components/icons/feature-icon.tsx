"use client"

import React from "react"
import { LucideIcon } from "lucide-react"
import { AsciIcon, IconSize, IconTone } from "./asci-icon"
import { cn } from "@/lib/utils"

export interface FeatureIconProps {
  name?: string
  icon?: LucideIcon
  size?: IconSize
  tone?: IconTone
  className?: string
  containerClassName?: string
  variant?: "subtle" | "bordered" | "contrast"
}

/**
 * FeatureIcon — Containerized Icon Component for Bento Grids & Feature Cards
 * Eliminates glowing circles in favor of restrained, editorial borders with generous whitespace.
 */
export function FeatureIcon({
  name,
  icon,
  size = "md",
  tone = "default",
  className = "",
  containerClassName = "",
  variant = "bordered",
}: FeatureIconProps) {
  const containerVariants = {
    bordered: "border border-hairline bg-secondary/60 text-foreground group-hover:border-primary/40 group-hover:bg-primary/10 group-hover:text-primary",
    subtle: "bg-secondary/40 text-foreground/80 group-hover:text-primary group-hover:bg-primary/10",
    contrast: "border border-hairline bg-card text-primary group-hover:bg-primary group-hover:text-primary-foreground",
  }

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-xl transition-all duration-200",
        size === "lg" || size === "xl" ? "h-12 w-12" : "h-10 w-10",
        containerVariants[variant],
        containerClassName
      )}
    >
      <AsciIcon name={name} icon={icon} size={size} tone={tone} className={className} />
    </div>
  )
}
