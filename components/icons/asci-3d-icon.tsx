"use client"

import React from "react"
import {
  ThreeDIconBaseProps,
  Programming3DIcon,
  AI3DIcon,
  Systems3DIcon,
  Cloud3DIcon,
  Security3DIcon,
  Database3DIcon,
  DevOps3DIcon,
  Algorithms3DIcon,
  Agents3DIcon,
  Automation3DIcon,
  EmptyBook3DIcon,
  EmptyBadge3DIcon,
  EmptyCertificate3DIcon,
  EmptyWorkspace3DIcon,
} from "./3d"

export type ThreeDIconName =
  | "programming"
  | "code"
  | "webdev"
  | "ai"
  | "ml"
  | "generative-ai"
  | "systems"
  | "system-design"
  | "cloud"
  | "devops"
  | "security"
  | "cybersecurity"
  | "database"
  | "databases"
  | "sql"
  | "pipeline"
  | "algorithms"
  | "dsa"
  | "agents"
  | "automation"
  | "empty-book"
  | "empty-courses"
  | "empty-badge"
  | "empty-achievements"
  | "empty-certificate"
  | "empty-credentials"
  | "empty-workspace"
  | "empty-projects"

const THREE_D_REGISTRY: Record<string, React.ComponentType<ThreeDIconBaseProps>> = {
  programming: Programming3DIcon,
  code: Programming3DIcon,
  webdev: Programming3DIcon,
  ai: AI3DIcon,
  ml: AI3DIcon,
  "generative-ai": AI3DIcon,
  systems: Systems3DIcon,
  "system-design": Systems3DIcon,
  cloud: Cloud3DIcon,
  devops: DevOps3DIcon,
  security: Security3DIcon,
  cybersecurity: Security3DIcon,
  database: Database3DIcon,
  databases: Database3DIcon,
  sql: Database3DIcon,
  pipeline: DevOps3DIcon,
  algorithms: Algorithms3DIcon,
  dsa: Algorithms3DIcon,
  agents: Agents3DIcon,
  automation: Automation3DIcon,
  "empty-book": EmptyBook3DIcon,
  "empty-courses": EmptyBook3DIcon,
  "empty-badge": EmptyBadge3DIcon,
  "empty-achievements": EmptyBadge3DIcon,
  "empty-certificate": EmptyCertificate3DIcon,
  "empty-credentials": EmptyCertificate3DIcon,
  "empty-workspace": EmptyWorkspace3DIcon,
  "empty-projects": EmptyWorkspace3DIcon,
}

export interface Asci3DIconProps extends ThreeDIconBaseProps {
  name: ThreeDIconName | string
}

/**
 * Asci3DIcon — Unified 3D Icon Component
 * Loads studio-lit, theme-adaptive isometric 3D objects with zero network latency.
 */
export function Asci3DIcon({ name, ...props }: Asci3DIconProps) {
  const IconComponent = THREE_D_REGISTRY[name.toLowerCase()] || Programming3DIcon
  return <IconComponent {...props} />
}
