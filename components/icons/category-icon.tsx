"use client"

import React from "react"
import { AsciIcon, IconSize, IconTone } from "./asci-icon"
import { Asci3DIcon } from "./asci-3d-icon"
import { ThreeDSize } from "./3d/3d-base"
import { cn } from "@/lib/utils"

export type CategoryName =
  | "Web Development"
  | "Languages & Web"
  | "Programming"
  | "AI & ML"
  | "Artificial Intelligence"
  | "Machine Learning"
  | "Generative AI"
  | "AI Agents"
  | "Data Science"
  | "Systems Design"
  | "Systems & Languages"
  | "Cloud & Infra"
  | "Cloud & DevOps"
  | "Cybersecurity"
  | "Databases"
  | "DSA"
  | "Backend"
  | "Git & DevOps"
  | string

export interface CategoryIconProps {
  category: CategoryName
  mode?: "2d" | "3d"
  size?: IconSize
  size3d?: ThreeDSize | number
  tone?: IconTone
  className?: string
}

const CATEGORY_2D_MAP: Record<string, string> = {
  "web development": "globe",
  "languages & web": "globe",
  "programming": "code",
  "systems & languages": "cpu",
  "ai & ml": "cpu",
  "artificial intelligence": "cpu",
  "machine learning": "cpu",
  "generative ai": "cpu",
  "ai agents": "network",
  "data science": "metrics",
  "systems design": "layers",
  "cloud & infra": "cloud",
  "cloud & devops": "cloud",
  "cybersecurity": "shieldCheck",
  "databases": "database",
  "dsa": "braces",
  "backend": "server",
  "git & devops": "git",
}

const CATEGORY_3D_MAP: Record<string, string> = {
  "web development": "webdev",
  "languages & web": "webdev",
  "programming": "programming",
  "systems & languages": "systems",
  "ai & ml": "ai",
  "artificial intelligence": "ai",
  "machine learning": "ai",
  "generative ai": "ai",
  "ai agents": "agents",
  "data science": "algorithms",
  "systems design": "systems",
  "cloud & infra": "cloud",
  "cloud & devops": "devops",
  "cybersecurity": "security",
  "databases": "database",
  "dsa": "algorithms",
  "backend": "systems",
  "git & devops": "devops",
}

/**
 * CategoryIcon — Unified Category Iconography
 * Renders high-precision 2D glyph or 3D isometric studio asset based on hierarchical need.
 */
export function CategoryIcon({
  category = "",
  mode = "2d",
  size = "md",
  size3d = "md",
  tone = "default",
  className = "",
}: CategoryIconProps) {
  const normalized = category.toLowerCase().trim()

  if (mode === "3d") {
    const icon3dName = CATEGORY_3D_MAP[normalized] || "programming"
    return <Asci3DIcon name={icon3dName} size={size3d} className={className} alt={`${category} Category Icon`} />
  }

  const icon2dName = CATEGORY_2D_MAP[normalized] || "terminal"
  return <AsciIcon name={icon2dName} size={size} tone={tone} className={className} />
}
