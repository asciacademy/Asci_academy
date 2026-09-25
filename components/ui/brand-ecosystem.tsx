"use client"

import React from "react"
import {
  Trophy,
  Briefcase,
  BookOpen,
  Code2,
  Hammer,
  Award,
  Users,
  MessageSquare,
  Sparkles,
  Compass,
  FileCheck2,
  LucideIcon,
} from "lucide-react"
import { BrandIcon, BrandIconName } from "./brand-icon"
import { CategoryIllustration, IllustrationCategory } from "./category-illustrations"
import { cn } from "@/lib/utils"

export interface BrandAssetProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string
  size?: number
  className?: string
  showDock?: boolean
  dockSize?: number | "sm" | "md" | "lg"
}

// ─────────────────────────────────────────────────────────────
// 1. BRAND LOGO (Universal Language/Tool Vector)
// ─────────────────────────────────────────────────────────────
export function BrandLogo({
  name = "",
  size = 24,
  className = "",
  showDock = false,
  dockSize = "md",
  ...props
}: BrandAssetProps) {
  const normalized = (name || "").toLowerCase().trim()

  const dockPx =
    typeof dockSize === "number"
      ? dockSize
      : dockSize === "sm"
      ? 36
      : dockSize === "lg"
      ? 52
      : 44

  if (showDock) {
    return (
      <div
        className={cn(
          "rounded-xl bg-card border border-border flex items-center justify-center shrink-0 shadow-2xs transition-transform hover:scale-105",
          className
        )}
        style={{ width: dockPx, height: dockPx }}
        {...props}
      >
        <BrandIcon name={normalized} size={size || Math.round(dockPx * 0.58)} />
      </div>
    )
  }

  return (
    <div
      className={cn("inline-flex items-center justify-center shrink-0", className)}
      style={{ width: size, height: size }}
      {...props}
    >
      <BrandIcon name={normalized} size={size} />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// 2. TECHNOLOGY LOGO
// ─────────────────────────────────────────────────────────────
export interface TechnologyLogoProps extends BrandAssetProps {
  technology?: BrandIconName | string
}

export function TechnologyLogo({
  technology,
  name,
  size = 24,
  className = "",
  showDock = false,
  dockSize = "md",
  ...props
}: TechnologyLogoProps) {
  const techName = technology || name || "code"
  return (
    <BrandLogo
      name={techName}
      size={size}
      className={className}
      showDock={showDock}
      dockSize={dockSize}
      {...props}
    />
  )
}

// ─────────────────────────────────────────────────────────────
// 3. COMPANY LOGO
// ─────────────────────────────────────────────────────────────
export interface CompanyLogoProps extends BrandAssetProps {
  company?: string
}

export function CompanyLogo({
  company,
  name,
  size = 24,
  className = "",
  showDock = false,
  dockSize = "md",
  ...props
}: CompanyLogoProps) {
  const companyName = company || name || "asci"
  return (
    <BrandLogo
      name={companyName}
      size={size}
      className={className}
      showDock={showDock}
      dockSize={dockSize}
      {...props}
    />
  )
}

// ─────────────────────────────────────────────────────────────
// 4. ORGANIZATION LOGO (Universities & Contests)
// ─────────────────────────────────────────────────────────────
export interface OrganizationLogoProps extends BrandAssetProps {
  organization?: string
}

export function OrganizationLogo({
  organization,
  name,
  size = 24,
  className = "",
  showDock = false,
  dockSize = "md",
  ...props
}: OrganizationLogoProps) {
  const orgName = organization || name || "asci"
  return (
    <BrandLogo
      name={orgName}
      size={size}
      className={className}
      showDock={showDock}
      dockSize={dockSize}
      {...props}
    />
  )
}

// ─────────────────────────────────────────────────────────────
// 5. CATEGORY ICON
// ─────────────────────────────────────────────────────────────
export type CategoryIconType =
  | "competitions"
  | "hackathons"
  | "jobs"
  | "internships"
  | "career"
  | "courses"
  | "learning"
  | "practice"
  | "dsa"
  | "projects"
  | "build"
  | "certificates"
  | "achievements"
  | "mentors"
  | "community"

export interface CategoryIconProps extends React.HTMLAttributes<HTMLDivElement> {
  type: CategoryIconType | string
  size?: number
  showDock?: boolean
  className?: string
}

const CATEGORY_MAP: Record<
  string,
  { icon: LucideIcon; color: string; bg: string }
> = {
  competitions: { icon: Trophy, color: "#FF5B00", bg: "#FFF4ED" },
  hackathons: { icon: Trophy, color: "#FF5B00", bg: "#FFF4ED" },
  jobs: { icon: Briefcase, color: "#0284C7", bg: "#E0F2FE" },
  internships: { icon: Briefcase, color: "#0284C7", bg: "#E0F2FE" },
  career: { icon: Briefcase, color: "#0284C7", bg: "#E0F2FE" },
  courses: { icon: BookOpen, color: "#10B981", bg: "#D1FAE5" },
  learning: { icon: BookOpen, color: "#10B981", bg: "#D1FAE5" },
  practice: { icon: Code2, color: "#8B5CF6", bg: "#EDE9FE" },
  dsa: { icon: Code2, color: "#8B5CF6", bg: "#EDE9FE" },
  projects: { icon: Hammer, color: "#F59E0B", bg: "#FEF3C7" },
  build: { icon: Hammer, color: "#F59E0B", bg: "#FEF3C7" },
  certificates: { icon: FileCheck2, color: "#EC4899", bg: "#FCE7F3" },
  achievements: { icon: Award, color: "#F59E0B", bg: "#FEF3C7" },
  mentors: { icon: Users, color: "#06B6D4", bg: "#CFFAFE" },
  community: { icon: MessageSquare, color: "#14B8A6", bg: "#CCFBF1" },
}

export function CategoryIcon({
  type,
  size = 20,
  showDock = false,
  className = "",
  ...props
}: CategoryIconProps) {
  const normalized = (type || "").toLowerCase().trim()
  const match = CATEGORY_MAP[normalized] || {
    icon: Sparkles,
    color: "#FF5B00",
    bg: "#FFF4ED",
  }
  const Icon = match.icon

  if (showDock) {
    const dockPx = Math.max(36, size + 16)
    return (
      <div
        className={cn(
          "rounded-xl flex items-center justify-center shrink-0 border border-border/80 shadow-2xs",
          className
        )}
        style={{
          width: dockPx,
          height: dockPx,
          backgroundColor: match.bg,
        }}
        {...props}
      >
        <Icon size={size} style={{ color: match.color }} />
      </div>
    )
  }

  return (
    <div
      className={cn("inline-flex items-center justify-center shrink-0", className)}
      style={{ width: size, height: size }}
      {...props}
    >
      <Icon size={size} style={{ color: match.color }} />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// 6. CATEGORY ILLUSTRATION RE-EXPORT
// ─────────────────────────────────────────────────────────────
export { CategoryIllustration } from "./category-illustrations"
export type { IllustrationCategory } from "./category-illustrations"
export { BrandIcon } from "./brand-icon"
export type { BrandIconName } from "./brand-icon"

// Backward-compatibility alias
export const TechnologyIcon = TechnologyLogo
