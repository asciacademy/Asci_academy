"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  BookOpen, Award, PlayCircle, Zap, Flame, Compass,
  ChevronRight, BarChart2, Layers, CheckCircle2, ArrowRight,
  Code, Clock, Trophy, TrendingUp, Pencil, Check, X, Camera, Globe,
  Briefcase, Video, ShieldCheck, Target, ExternalLink,
  FileText, Terminal, Users, Calendar, ArrowUpRight, Search
} from "lucide-react"
import { AsciIcon } from "@/components/icons"
import { AxelStage } from "@/components/axel/axel-stage"
import { useUserSettings } from "@/context/user-settings-context"
import { useUnstopEcosystem } from "@/lib/unstop-store"

const DEFAULT_AVATARS = [
  { src: "/avatars/hacker.png", name: "Engineer", tag: "Logic & Code" },
  { src: "/avatars/robot.png", name: "Architect", tag: "System Design" },
  { src: "/avatars/skull.png", name: "Strategist", tag: "Security & Scale" },
  { src: "/avatars/astronaut.png", name: "Explorer", tag: "Discovery" },
  { src: "/avatars/ninja.png", name: "Builder", tag: "High Speed" },
  { src: "/avatars/cat.png", name: "Fellow", tag: "Core Member" },
]

interface DashboardOverviewProps {
  userName: string
  rank: string
  totalXP: number
  streak: number
  currentLevel: number
  levelXP: number
  levelPercent: number
  isMaxClearance: boolean
  enrollments: any[]
  weeklyActivity: { day: string; minutes: number; solved: number }[]
  catalogTracks: any[]
  recentLogs: { title: string; category: string; time: string; xp: string }[]
  unlockedBadgeIds?: string[]
  avatarUrl?: string | null
  oauthAvatarUrl?: string | null
  onUpdateName?: (newName: string) => Promise<boolean | void> | void
  onUpdateAvatar?: (newAvatarUrl: string) => Promise<boolean | void> | void
  onSwitchTab: (tab: any) => void
}

export function DashboardOverview({
  userName,
  rank,
  totalXP,
  streak,
  currentLevel,
  levelXP,
  levelPercent,
  isMaxClearance,
  enrollments,
  weeklyActivity,
  catalogTracks,
  recentLogs,
  unlockedBadgeIds,
  avatarUrl,
  oauthAvatarUrl,
  onUpdateName,
  onUpdateAvatar,
  onSwitchTab,
}: DashboardOverviewProps) {
  const { settings, updateSetting } = useUserSettings()
  const {
    registeredHackathonsCount,
    activeApplicationsCount,
    confirmedBookingsCount,
    potd,
    hackathons,
    jobs,
    mentors,
  } = useUnstopEcosystem()

  const effectiveAvatar = avatarUrl || settings.avatar || oauthAvatarUrl || ""

  // Inline name editing state
  const [isEditingName, setIsEditingName] = useState(false)
  const [editedName, setEditedName] = useState(userName)
  const [isSavingName, setIsSavingName] = useState(false)
  const [nameSavedSuccess, setNameSavedSuccess] = useState(false)

  // Avatar picker dialog state
  const [showAvatarPicker, setShowAvatarPicker] = useState(false)
  const [customAvatarInput, setCustomAvatarInput] = useState("")
  const [avatarError, setAvatarError] = useState("")

  React.useEffect(() => {
    setEditedName(userName)
  }, [userName])

  const handleSaveName = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    const trimmed = editedName.trim()
    if (!trimmed || trimmed === userName) {
      setIsEditingName(false)
      return
    }

    setIsSavingName(true)
    try {
      if (onUpdateName) {
        await onUpdateName(trimmed)
      }
      setIsEditingName(false)
      setNameSavedSuccess(true)
      setTimeout(() => setNameSavedSuccess(false), 3000)
    } catch (err) {
      console.error("Failed to update name:", err)
    } finally {
      setIsSavingName(false)
    }
  }

  const handleSelectAvatar = async (url: string) => {
    updateSetting("avatar", url)
    if (onUpdateAvatar) {
      await onUpdateAvatar(url)
    }
    setShowAvatarPicker(false)
    setAvatarError("")
  }

  const handleApplyCustomAvatar = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!customAvatarInput.trim()) return
    const url = customAvatarInput.trim()
    if (!url.startsWith("http://") && !url.startsWith("https://") && !url.startsWith("/")) {
      setAvatarError("Please enter a valid image URL")
      return
    }
    await handleSelectAvatar(url)
    setCustomAvatarInput("")
  }

  const activeCourse = enrollments && enrollments.length > 0 ? enrollments[0] : (catalogTracks && catalogTracks[0] ? catalogTracks[0] : null)
  const featuredHackathons = hackathons && hackathons.length > 0 ? hackathons.slice(0, 3) : []
  const featuredJobs = jobs && jobs.length > 0 ? jobs.slice(0, 3) : []

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* ══════════════════════════════════════════════
          1. Clean Unstop User Profile Header
      ══════════════════════════════════════════════ */}
      <section className="rounded-2xl border border-border bg-card p-6 shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-5 min-w-0">
            {/* Avatar with Camera badge */}
            <div className="relative shrink-0">
              <button
                type="button"
                onClick={() => setShowAvatarPicker(true)}
                className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl overflow-hidden border border-border bg-secondary hover:border-primary transition-all duration-150 cursor-pointer shadow-xs flex items-center justify-center relative group"
                title="Change Avatar"
              >
                {effectiveAvatar ? (
                  <img src={effectiveAvatar} alt={userName} className="w-full h-full object-cover" />
                ) : (
                  <div className="font-serif text-2xl font-semibold text-primary">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                  <Camera className="w-4 h-4" />
                </div>
              </button>
              <button
                type="button"
                onClick={() => setShowAvatarPicker(true)}
                className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground border-2 border-card flex items-center justify-center shadow-xs cursor-pointer"
                title="Change Avatar"
              >
                <Camera className="w-2.5 h-2.5" />
              </button>
            </div>

            {/* Greeting & Name */}
            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-500/20">
                  Student Member
                </span>
                <span className="text-xs text-muted-foreground font-mono">
                  Level {currentLevel} · {rank}
                </span>
              </div>

              {isEditingName ? (
                <form onSubmit={handleSaveName} className="flex items-center gap-2 pt-1">
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    autoFocus
                    className="font-serif text-xl sm:text-2xl font-normal text-foreground bg-secondary border border-primary rounded-lg px-2.5 py-0.5 focus:outline-none focus:ring-1 focus:ring-primary w-48 sm:w-64"
                    disabled={isSavingName}
                  />
                  <button
                    type="submit"
                    className="p-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary-active text-xs font-semibold cursor-pointer"
                    title="Save"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => { setIsEditingName(false); setEditedName(userName) }}
                    className="p-1.5 rounded-lg border border-border bg-secondary text-muted-foreground hover:text-foreground cursor-pointer"
                    title="Cancel"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <div className="flex items-center gap-2">
                  <h1 className="font-serif text-2xl sm:text-3xl font-normal text-foreground truncate">
                    Welcome back, {userName}
                  </h1>
                  <button
                    type="button"
                    onClick={() => { setEditedName(userName); setIsEditingName(true) }}
                    className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer"
                    title="Edit Name"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              <p className="text-xs text-muted-foreground">
                Track your course progress, compete in national hackathons, and apply for tech hiring sprints.
              </p>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <div className="px-4 py-2.5 rounded-xl border border-border bg-secondary/50 flex flex-col items-center">
              <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Total XP</span>
              <span className="font-mono text-sm font-bold text-primary">{totalXP.toLocaleString()}</span>
            </div>

            <div className="px-4 py-2.5 rounded-xl border border-border bg-secondary/50 flex flex-col items-center">
              <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Streak</span>
              <span className="font-mono text-sm font-bold text-amber-500 flex items-center gap-1.5">
                <AsciIcon name="streak" size="sm" tone="gold" />
                <span>{streak}d</span>
              </span>
            </div>

            <div className="px-4 py-2.5 rounded-xl border border-border bg-secondary/50 flex flex-col items-center">
              <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Level {currentLevel}</span>
              <span className="font-mono text-xs font-semibold text-foreground">{levelXP}/1k XP</span>
            </div>
          </div>
        </div>

        {/* Dedicated Axel Anchor for smooth companion docking */}
        <AxelStage
          id="dashboard-hero-robot-anchor"
          sectionId="dashboard-hero"
          label="Learning Command"
          emotion="happy"
          scale={0.42}
          size="sm"
        />
      </section>

      {/* ══════════════════════════════════════════════
          2. Unstop-style Quick Category Launchpad
      ══════════════════════════════════════════════ */}
      <section>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {[
            {
              id: "courses",
              label: "Courses",
              sub: "Learn & Build",
              icon: BookOpen,
              tab: "courses",
            },
            {
              id: "practice",
              label: "Practice & POTD",
              sub: "Coding Arena",
              icon: Terminal,
              tab: "practice-arena",
              badge: potd?.solved ? undefined : "Live",
            },
            {
              id: "hackathons",
              label: "Hackathons",
              sub: "National Challenges",
              icon: Trophy,
              tab: "hackathons",
              badge: registeredHackathonsCount > 0 ? `${registeredHackathonsCount} Joined` : undefined,
            },
            {
              id: "jobs",
              label: "Jobs & Internships",
              sub: "Verified Openings",
              icon: Briefcase,
              tab: "jobs",
              badge: activeApplicationsCount > 0 ? `${activeApplicationsCount} Active` : undefined,
            },
            {
              id: "mentorship",
              label: "1:1 Mentorship",
              sub: "FAANG Reviews",
              icon: Video,
              tab: "mentorship",
              badge: confirmedBookingsCount > 0 ? "Booked" : undefined,
            },
            {
              id: "resume-ats",
              label: "Resume ATS",
              sub: "Score & Feedback",
              icon: FileText,
              tab: "resume-ats",
            },
          ].map((cat) => {
            const Icon = cat.icon
            return (
              <button
                key={cat.id}
                onClick={() => onSwitchTab(cat.tab)}
                className="p-4 rounded-2xl border border-border bg-card hover:border-primary/50 hover:bg-secondary/40 transition-all duration-150 flex flex-col items-center text-center group cursor-pointer shadow-xs relative"
              >
                {cat.badge && (
                  <span className="absolute top-2 right-2 text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-full bg-primary/10 text-primary border border-primary/20">
                    {cat.badge}
                  </span>
                )}
                <div className="w-12 h-12 rounded-xl bg-secondary group-hover:bg-primary/10 text-foreground group-hover:text-primary transition-colors flex items-center justify-center mb-2.5">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                  {cat.label}
                </span>
                <span className="text-[10px] text-muted-foreground mt-0.5">
                  {cat.sub}
                </span>
              </button>
            )
          })}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          3. High-Impact Visual Spotlight Posters (Unstop Banners)
      ══════════════════════════════════════════════ */}
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Banner 1: Grand Hackathon */}
          <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-xs flex flex-col justify-between group hover:border-primary/40 transition-all">
            <div className="relative h-40 bg-secondary overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80"
                alt="Hackathon"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary text-primary-foreground text-[10px] font-mono font-bold uppercase tracking-wider shadow-xs">
                <Trophy className="w-3 h-3" />
                <span>₹5,00,000 Prize Pool</span>
              </div>
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/80">National Competition</span>
                <h3 className="font-serif text-lg font-normal leading-tight text-white mt-0.5">
                  ASCI Grand Innovation Hackathon 2026
                </h3>
              </div>
            </div>
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
                <Calendar className="w-3.5 h-3.5" />
                <span>12 Days Left · Solo / Teams</span>
              </div>
              <button
                onClick={() => onSwitchTab("hackathons")}
                className="px-3.5 py-1.5 rounded-lg bg-primary hover:bg-primary-active text-primary-foreground text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Register</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Banner 2: Daily Problem of the Day */}
          <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-xs flex flex-col justify-between group hover:border-primary/40 transition-all">
            <div className="relative h-40 bg-secondary overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"
                alt="Coding Problem"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[10px] font-mono font-bold uppercase tracking-wider shadow-xs">
                <Flame className="w-3 h-3" />
                <span>+150 XP Reward</span>
              </div>
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/80">Problem of the Day</span>
                <h3 className="font-serif text-lg font-normal leading-tight text-white mt-0.5 truncate">
                  {potd?.title || "Longest Substring Without Repeating Characters"}
                </h3>
              </div>
            </div>
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
                <span className="px-2 py-0.5 rounded bg-secondary text-foreground text-[10px] font-semibold">
                  {potd?.difficulty || "Medium"}
                </span>
                <span>Algorithm Practice</span>
              </div>
              <button
                onClick={() => onSwitchTab("practice-arena")}
                className="px-3.5 py-1.5 rounded-lg bg-primary hover:bg-primary-active text-primary-foreground text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Solve Today</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Banner 3: 1:1 Senior Engineering Mentorship */}
          <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-xs flex flex-col justify-between group hover:border-primary/40 transition-all">
            <div className="relative h-40 bg-secondary overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                alt="Mentorship"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary text-foreground text-[10px] font-mono font-bold uppercase tracking-wider shadow-xs border border-border/60">
                <Users className="w-3 h-3 text-primary" />
                <span>FAANG Engineers</span>
              </div>
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/80">Career Acceleration</span>
                <h3 className="font-serif text-lg font-normal leading-tight text-white mt-0.5">
                  1-on-1 Code Review &amp; Mock Interviews
                </h3>
              </div>
            </div>
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
                <Users className="w-3.5 h-3.5" />
                <span>Google · Meta · Stripe</span>
              </div>
              <button
                onClick={() => onSwitchTab("mentorship")}
                className="px-3.5 py-1.5 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground border border-border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Book Call</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          4. Continue Learning (Visual Progress Card)
      ══════════════════════════════════════════════ */}
      {activeCourse && (
        <section className="rounded-2xl border border-border bg-card p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                In-Progress Curriculum
              </span>
            </div>
            <button
              onClick={() => onSwitchTab("courses")}
              className="text-xs text-primary hover:underline font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>View All My Courses</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-4 rounded-xl bg-secondary/50 border border-border/60">
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shrink-0">
                <BookOpen className="w-7 h-7" />
              </div>
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-secondary border border-border font-semibold text-muted-foreground">
                    {activeCourse.category || "Core Track"}
                  </span>
                  <span className="text-xs text-muted-foreground font-mono">
                    {activeCourse.difficulty || "Beginner"}
                  </span>
                </div>
                <h3 className="font-serif text-lg font-normal text-foreground truncate">
                  {activeCourse.title || "DSA Master Track"}
                </h3>
                <p className="text-xs text-muted-foreground truncate">
                  {activeCourse.desc || "Interactive lessons, memory step-throughs, and algorithmic thinking."}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 shrink-0">
              <div className="w-36 space-y-1.5">
                <div className="flex justify-between text-[11px] font-mono text-muted-foreground">
                  <span>Progress</span>
                  <span className="text-foreground font-semibold">
                    {activeCourse.progressPercent || levelPercent}%
                  </span>
                </div>
                <div className="h-2 w-full bg-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-300"
                    style={{ width: `${activeCourse.progressPercent || levelPercent}%` }}
                  />
                </div>
              </div>

              <Link
                href={activeCourse.href || "/programs/dsa/course"}
                className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-active text-primary-foreground text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors shrink-0"
              >
                <PlayCircle className="w-4 h-4" />
                <span>Resume Learning</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════
          5. Featured Competitions & Hackathons (Unstop Card Grid)
      ══════════════════════════════════════════════ */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground">
              Competitions &amp; Hackathons
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Compete with peers, showcase real engineering projects, and win from verified prize pools.
            </p>
          </div>
          <button
            onClick={() => onSwitchTab("hackathons")}
            className="text-xs text-primary hover:underline font-semibold flex items-center gap-1 cursor-pointer"
          >
            <span>Explore All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featuredHackathons.map((hack) => (
            <div
              key={hack.id}
              className="rounded-2xl border border-border bg-card overflow-hidden shadow-xs hover:border-primary/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="h-32 bg-secondary relative overflow-hidden">
                  <img
                    src={hack.bannerImage || "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80"}
                    alt={hack.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-white text-[10px] font-mono font-medium">
                    {hack.bannerTag}
                  </div>
                  <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-mono font-bold">
                    {hack.prizePool}
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <div className="text-[11px] font-mono text-muted-foreground flex items-center gap-1.5">
                    <span>{hack.host}</span>
                    <span>·</span>
                    <span>{hack.mode}</span>
                  </div>

                  <h3 className="font-serif text-base font-medium text-foreground line-clamp-2 leading-snug">
                    {hack.title}
                  </h3>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {hack.tags.slice(0, 3).map((tag, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-secondary text-muted-foreground border border-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0 border-t border-border/40 mt-3 flex items-center justify-between">
                <span className="text-[11px] font-mono text-muted-foreground">
                  {hack.registeredCount.toLocaleString()} Registered
                </span>
                <button
                  onClick={() => onSwitchTab("hackathons")}
                  className="px-3 py-1.5 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground text-foreground border border-border text-xs font-semibold transition-colors cursor-pointer"
                >
                  {hack.isRegistered ? "View Team" : "Register"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          6. Verified Tech Jobs & Internships
      ══════════════════════════════════════════════ */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground">
              Hot Jobs &amp; Hiring Sprints
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Direct job opportunities with high compensation packages and verified tech roles.
            </p>
          </div>
          <button
            onClick={() => onSwitchTab("jobs")}
            className="text-xs text-primary hover:underline font-semibold flex items-center gap-1 cursor-pointer"
          >
            <span>Explore All Jobs</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featuredJobs.map((job) => (
            <div
              key={job.id}
              className="p-5 rounded-2xl border border-border bg-card hover:border-primary/40 transition-all shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="w-10 h-10 rounded-xl bg-secondary border border-border flex items-center justify-center font-serif text-base font-bold text-foreground shrink-0">
                    {job.company.charAt(0)}
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-500/20">
                    {job.roleType}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-base font-medium text-foreground line-clamp-1">
                    {job.title}
                  </h3>
                  <p className="text-xs text-muted-foreground font-mono mt-0.5">
                    {job.company} · {job.location}
                  </p>
                </div>

                <div className="font-mono text-xs font-bold text-foreground">
                  {job.compensation}
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {job.skills.slice(0, 3).map((skill, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-secondary text-muted-foreground border border-border"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onSwitchTab("jobs")}
                className="w-full py-2 rounded-xl bg-secondary hover:bg-primary hover:text-primary-foreground text-foreground border border-border text-xs font-semibold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Apply Now</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          7. Avatar Selection Modal
      ══════════════════════════════════════════════ */}
      {showAvatarPicker && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-2xl max-w-md w-full p-6 shadow-xl space-y-5 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="font-serif text-lg font-normal text-foreground">
                Choose Profile Avatar
              </h3>
              <button
                type="button"
                onClick={() => setShowAvatarPicker(false)}
                className="p-1 text-muted-foreground hover:text-foreground rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {DEFAULT_AVATARS.map((av) => (
                <button
                  key={av.src}
                  type="button"
                  onClick={() => handleSelectAvatar(av.src)}
                  className="p-3 rounded-xl border border-border bg-secondary/50 hover:border-primary hover:bg-secondary transition-all flex flex-col items-center gap-1.5 cursor-pointer group"
                >
                  <img src={av.src} alt={av.name} className="w-12 h-12 object-cover rounded-lg group-hover:scale-105 transition-transform" />
                  <span className="text-[11px] font-medium text-foreground">{av.name}</span>
                </button>
              ))}
            </div>

            <form onSubmit={handleApplyCustomAvatar} className="pt-2 border-t border-border space-y-2">
              <label className="text-xs text-muted-foreground block">Or paste custom image URL:</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customAvatarInput}
                  onChange={(e) => setCustomAvatarInput(e.target.value)}
                  placeholder="https://example.com/avatar.png"
                  className="flex-1 bg-secondary border border-border rounded-xl px-3 py-1.5 text-xs text-foreground focus:outline-none focus:border-primary"
                />
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-primary hover:bg-primary-active text-primary-foreground text-xs font-semibold cursor-pointer"
                >
                  Apply
                </button>
              </div>
              {avatarError && <p className="text-[11px] text-destructive">{avatarError}</p>}
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
