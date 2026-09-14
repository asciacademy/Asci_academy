"use client"

import React from "react"
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  TrendingUp,
  Award,
  Trophy,
  Settings,
  Search,
  Bell,
  Users,
  FolderGit2,
  Terminal,
  Database,
  Shield,
  ShieldCheck,
  Cloud,
  Flame,
  Code2,
  Layers,
  Server,
  Network,
  Cpu,
  Route,
  Compass,
  CheckCircle2,
  Check,
  X,
  AlertCircle,
  Clock,
  Play,
  PlayCircle,
  FileText,
  Briefcase,
  Video,
  Sliders,
  LogOut,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  ExternalLink,
  Lock,
  Unlock,
  Sparkles,
  HelpCircle,
  RefreshCw,
  RotateCcw,
  Copy,
  Eye,
  Filter,
  Bookmark,
  MessageSquare,
  MessageCircle,
  Star,
  Zap,
  Globe,
  GitBranch,
  Braces,
  Calendar,
  Pencil,
  Camera,
  Trash2,
  Menu,
  LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

export type IconSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl"
export type IconTone = "default" | "muted" | "accent" | "gold" | "contrast" | "inherit"

export const ICON_SIZE_CLASSES: Record<IconSize, string> = {
  xs: "w-3 h-3",       // 12px
  sm: "w-4 h-4",       // 16px
  md: "w-5 h-5",       // 20px
  lg: "w-6 h-6",       // 24px
  xl: "w-8 h-8",       // 32px
  "2xl": "w-10 h-10",  // 40px
  "3xl": "w-12 h-12",  // 48px
  "4xl": "w-16 h-16",  // 64px
}

export const ICON_TONE_CLASSES: Record<IconTone, string> = {
  default: "text-foreground",
  muted: "text-muted-foreground",
  accent: "text-primary",
  gold: "text-[#D4B872]",
  contrast: "text-primary-foreground",
  inherit: "text-inherit",
}

/**
 * Standard semantic icon registry mapping domain concepts to precision 2D icons.
 */
export const ICON_MAP: Record<string, LucideIcon> = {
  // Navigation & Core
  dashboard: LayoutDashboard,
  overview: LayoutDashboard,
  search: Search,
  settings: Settings,
  notifications: Bell,
  menu: Menu,
  close: X,
  logout: LogOut,
  compass: Compass,
  external: ExternalLink,
  filter: Filter,
  sliders: Sliders,

  // Education & Learning
  courses: BookOpen,
  book: BookOpen,
  learning: GraduationCap,
  graduation: GraduationCap,
  certificate: Award,
  credential: Award,
  achievement: Trophy,
  trophy: Trophy,
  roadmap: Route,
  route: Route,
  practice: Terminal,
  bookmark: Bookmark,
  clock: Clock,
  play: Play,
  playCircle: PlayCircle,

  // Engineering & Architecture
  code: Code2,
  terminal: Terminal,
  database: Database,
  security: Shield,
  shield: Shield,
  shieldCheck: ShieldCheck,
  cloud: Cloud,
  server: Server,
  layers: Layers,
  network: Network,
  cpu: Cpu,
  git: GitBranch,
  gitBranch: GitBranch,
  projects: FolderGit2,
  folderCode: FolderGit2,
  braces: Braces,
  globe: Globe,

  // Gamification & Stats
  streak: Flame,
  progress: TrendingUp,
  metrics: TrendingUp,
  star: Star,
  zap: Zap,

  // Community & Career
  community: Users,
  users: Users,
  briefcase: Briefcase,
  jobs: Briefcase,
  mentorship: Video,
  video: Video,
  message: MessageSquare,
  messageCircle: MessageCircle,
  calendar: Calendar,
  fileText: FileText,
  resume: FileText,

  // UI State & Actions
  check: Check,
  checkCircle: CheckCircle2,
  alert: AlertCircle,
  lock: Lock,
  unlock: Unlock,
  copy: Copy,
  eye: Eye,
  pencil: Pencil,
  camera: Camera,
  trash: Trash2,
  help: HelpCircle,
  refresh: RefreshCw,
  reset: RotateCcw,
  arrowRight: ArrowRight,
  arrowLeft: ArrowLeft,
  arrowUpRight: ArrowUpRight,
  chevronRight: ChevronRight,
  chevronLeft: ChevronLeft,
  chevronDown: ChevronDown,
  chevronUp: ChevronUp,
}

export interface AsciIconProps extends React.SVGProps<SVGSVGElement> {
  name?: string
  icon?: LucideIcon
  size?: IconSize | number
  tone?: IconTone
  className?: string
  strokeWidth?: number
  label?: string
}

/**
 * AsciIcon — Centralized 2D Icon Component
 * Enforces optical balance, consistent stroke geometry, and semantic accessibility.
 */
export function AsciIcon({
  name,
  icon,
  size = "md",
  tone = "default",
  className = "",
  strokeWidth = 1.75,
  label,
  ...props
}: AsciIconProps) {
  const ResolvedIcon = icon || (name ? ICON_MAP[name.toLowerCase()] : null) || HelpCircle

  const sizeClass = typeof size === "string" ? ICON_SIZE_CLASSES[size] || ICON_SIZE_CLASSES.md : undefined
  const toneClass = ICON_TONE_CLASSES[tone] || ICON_TONE_CLASSES.default
  const inlineStyle = typeof size === "number" ? { width: size, height: size } : undefined

  return (
    <ResolvedIcon
      className={cn("shrink-0 transition-colors", sizeClass, toneClass, className)}
      style={inlineStyle}
      strokeWidth={strokeWidth}
      aria-hidden={label ? undefined : "true"}
      aria-label={label}
      role={label ? "img" : undefined}
      {...props}
    />
  )
}
