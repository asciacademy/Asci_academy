"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Award,
  BookOpen,
  CheckCircle2,
  FolderGit2,
  Trophy,
  Check,
  Share2,
  Edit3,
  ExternalLink,
  ShieldCheck,
  Calendar,
  Sparkles,
  ArrowRight,
  X,
  Save,
  Building2,
  Code2,
  Clock,
  Layers,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BrandIcon } from "@/components/ui/brand-icon"
import { updateUserProfile } from "@/app/actions/user"

export type ProfileTab = "overview" | "learning" | "projects" | "certificates" | "achievements" | "competitions"

export interface StudentProfileData {
  id?: string
  username: string
  name: string
  headline?: string
  bio?: string
  avatar_url?: string | null
  rank?: string
  xp?: number
  streak_count?: number
  skills: string[]
  completedCourses: {
    id: string
    title: string
    category: string
    brand: string
    completedDate?: string
    lessonsCount?: number
  }[]
  inProgressCourses?: {
    id: string
    title: string
    brand: string
    progressPercent: number
    lessonInfo: string
  }[]
  projects: {
    id: string
    slug: string
    title: string
    description: string
    technologies: string[]
    difficulty: string
    estimatedHours?: string
    demoUrl?: string
    repoUrl?: string
  }[]
  certificates: {
    id: string
    certId: string
    title: string
    issuer: string
    issueDate: string
    verified: boolean
    verificationUrl: string
  }[]
  achievements: {
    id: string
    title: string
    description: string
    category: string
    date: string
  }[]
  competitions: {
    id: string
    title: string
    host: string
    rank: string
    date: string
    category: string
  }[]
}

interface StudentProfileViewProps {
  initialProfile: StudentProfileData
  isOwner?: boolean
  onProfileUpdated?: (updated: Partial<StudentProfileData>) => void
}

const PRESET_SKILLS = [
  "Python",
  "React",
  "Go",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "PostgreSQL",
  "Docker",
  "Kubernetes",
  "Rust",
  "Redis",
  "AWS",
  "Next.js",
  "Algorithms",
  "System Design",
  "Distributed Systems",
]

const PRESET_AVATARS = [
  { url: "/avatars/hacker.png", label: "Engineer" },
  { url: "/avatars/robot.png", label: "Architect" },
  { url: "/avatars/astronaut.png", label: "Explorer" },
  { url: "/avatars/ninja.png", label: "Builder" },
  { url: "/avatars/cat.png", label: "Fellow" },
]

export function StudentProfileView({
  initialProfile,
  isOwner = false,
  onProfileUpdated,
}: StudentProfileViewProps) {
  const [profile, setProfile] = useState<StudentProfileData>(initialProfile)
  const [activeTab, setActiveTab] = useState<ProfileTab>("overview")
  const [copied, setCopied] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)

  // Edit form state
  const [editName, setEditName] = useState(profile.name)
  const [editHeadline, setEditHeadline] = useState(profile.headline || "")
  const [editBio, setEditBio] = useState(profile.bio || "")
  const [editSkills, setEditSkills] = useState<string[]>(profile.skills || [])
  const [editAvatarUrl, setEditAvatarUrl] = useState(profile.avatar_url || "")
  const [newSkillInput, setNewSkillInput] = useState("")
  const [saving, setSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      const publicUrl = `${window.location.origin}/u/${profile.username || "scholar"}`
      navigator.clipboard.writeText(publicUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    }
  }

  const handleAddSkill = (skillToAdd: string) => {
    const trimmed = skillToAdd.trim()
    if (trimmed && !editSkills.includes(trimmed)) {
      setEditSkills([...editSkills, trimmed])
      setNewSkillInput("")
    }
  }

  const handleRemoveSkill = (skillToRemove: string) => {
    setEditSkills(editSkills.filter((s) => s !== skillToRemove))
  }

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setSaveSuccess(false)

    try {
      await updateUserProfile({
        name: editName,
        bio: editHeadline ? `${editHeadline} — ${editBio}` : editBio,
        avatar_url: editAvatarUrl,
      })

      const updatedData: Partial<StudentProfileData> = {
        name: editName,
        headline: editHeadline,
        bio: editBio,
        skills: editSkills,
        avatar_url: editAvatarUrl,
      }

      setProfile((prev) => ({
        ...prev,
        ...updatedData,
      }))

      if (onProfileUpdated) {
        onProfileUpdated(updatedData)
      }

      setSaveSuccess(true)
      setTimeout(() => {
        setSaveSuccess(false)
        setEditModalOpen(false)
      }, 1000)
    } catch (err) {
      console.error("Failed to update profile:", err)
    } finally {
      setSaving(false)
    }
  }

  const TABS_CONFIG: { id: ProfileTab; label: string; count?: number }[] = [
    { id: "overview", label: "Overview" },
    { id: "learning", label: "Learning", count: profile.completedCourses.length },
    { id: "projects", label: "Projects", count: profile.projects.length },
    { id: "certificates", label: "Certificates", count: profile.certificates.length },
    { id: "achievements", label: "Achievements", count: profile.achievements.length },
    { id: "competitions", label: "Competitions", count: profile.competitions.length },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground antialiased">
      <Navbar />

      <main className="flex-1 max-w-[1040px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
        {/* ────────────────────────────────────────────────────────
            1. HEADER: Avatar, Name, Headline, Skills, Edit/Share Button
        ──────────────────────────────────────────────────────── */}
        <section
          aria-label="Student Header"
          className="p-6 sm:p-8 rounded-2xl border border-border/80 bg-card shadow-xs space-y-6"
        >
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 min-w-0">
              {/* Avatar */}
              <div className="relative group shrink-0">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-secondary border border-border/80 flex items-center justify-center overflow-hidden shadow-2xs">
                  {profile.avatar_url ? (
                    <img
                      src={profile.avatar_url}
                      alt={profile.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-3xl font-bold font-mono text-primary">
                      {profile.name ? profile.name.charAt(0).toUpperCase() : "S"}
                    </span>
                  )}
                </div>
                <div
                  className="absolute -bottom-1 -right-1 p-1 rounded-lg bg-card border border-border text-emerald-600 dark:text-emerald-400 shadow-xs"
                  title="Verified Student Identity"
                >
                  <ShieldCheck className="w-4 h-4" />
                </div>
              </div>

              {/* Identity & Headline */}
              <div className="space-y-2 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                    {profile.rank || "Scholar"}
                  </span>
                  <span className="text-xs text-muted-foreground font-mono">
                    @{profile.username || "scholar"}
                  </span>
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified Identity</span>
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
                  {profile.name}
                </h1>

                <p className="text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
                  {profile.headline || "Full-Stack & Systems Engineer · Computer Science Scholar @ ASCI"}
                </p>

                {/* Skills Pills */}
                <div className="flex items-center gap-1.5 flex-wrap pt-1.5">
                  {(profile.skills || []).map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded-lg bg-secondary border border-border/80 text-foreground"
                    >
                      <BrandIcon name={skill.toLowerCase() as any} size={14} />
                      <span>{skill}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions: Edit Profile (Owner) or Share Profile */}
            <div className="flex items-center gap-2.5 shrink-0 self-start md:self-auto">
              {isOwner && (
                <button
                  type="button"
                  onClick={() => setEditModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary-active text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
              )}

              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-secondary hover:bg-secondary/80 text-foreground text-xs sm:text-sm font-semibold transition-all cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-primary" />
                    <span>Link Copied</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4 text-primary" />
                    <span>Share Profile</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Academic & Verification Metrics */}
          <div className="pt-4 border-t border-border/60 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <span className="text-xs text-muted-foreground uppercase font-mono">Courses Completed</span>
              <div className="text-xl sm:text-2xl font-bold font-mono text-foreground mt-0.5">
                {profile.completedCourses.length}
              </div>
            </div>
            <div>
              <span className="text-xs text-muted-foreground uppercase font-mono">Projects Built</span>
              <div className="text-xl sm:text-2xl font-bold font-mono text-foreground mt-0.5">
                {profile.projects.length}
              </div>
            </div>
            <div>
              <span className="text-xs text-muted-foreground uppercase font-mono">Verified Credentials</span>
              <div className="text-xl sm:text-2xl font-bold font-mono text-primary mt-0.5">
                {profile.certificates.length}
              </div>
            </div>
            <div>
              <span className="text-xs text-muted-foreground uppercase font-mono">Competitions</span>
              <div className="text-xl sm:text-2xl font-bold font-mono text-foreground mt-0.5">
                {profile.competitions.length}
              </div>
            </div>
          </div>
        </section>

        {/* ────────────────────────────────────────────────────────
            2. TABS: Overview, Learning, Projects, Certificates, Achievements, Competitions
        ──────────────────────────────────────────────────────── */}
        <nav aria-label="Profile navigation" className="border-b border-border/80">
          <div className="flex items-center gap-2 sm:gap-6 overflow-x-auto no-scrollbar">
            {TABS_CONFIG.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 text-xs sm:text-sm font-semibold whitespace-nowrap transition-all border-b-2 flex items-center gap-1.5 cursor-pointer ${
                  activeTab === tab.id
                    ? "border-primary text-primary font-bold"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                      activeTab === tab.id
                        ? "bg-primary/10 text-primary"
                        : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </nav>

        {/* ────────────────────────────────────────────────────────
            3. TAB CONTENT
        ──────────────────────────────────────────────────────── */}

        {/* ── TAB 1: OVERVIEW (Completed courses, Projects, Certificates, Skills) ── */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* 1. Completed Courses */}
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                    Learning Record
                  </span>
                  <h2 className="text-lg font-bold text-foreground">
                    Completed Courses
                  </h2>
                </div>
                <button
                  onClick={() => setActiveTab("learning")}
                  className="text-xs text-primary hover:text-primary-active font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <span>View All</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {profile.completedCourses.map((c) => (
                  <div
                    key={c.id}
                    className="p-4 rounded-xl border border-border/80 bg-card hover:border-primary/40 transition-all flex items-center justify-between gap-4 shadow-2xs"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-11 h-11 rounded-xl bg-secondary border border-border/80 flex items-center justify-center shrink-0">
                        <BrandIcon name={c.brand as any} size={24} />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-sm text-foreground truncate">{c.title}</h3>
                        <p className="text-xs text-muted-foreground">{c.category} · Accredited Curriculum</p>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400 shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Completed</span>
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* 2. Projects */}
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                    Production Portfolio
                  </span>
                  <h2 className="text-lg font-bold text-foreground">
                    Projects
                  </h2>
                </div>
                <button
                  onClick={() => setActiveTab("projects")}
                  className="text-xs text-primary hover:text-primary-active font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <span>View All Projects</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {profile.projects.slice(0, 2).map((proj) => (
                  <div
                    key={proj.id}
                    className="p-5 rounded-xl border border-border/80 bg-card hover:border-primary/40 transition-all flex flex-col justify-between gap-4 shadow-2xs"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          {proj.technologies.slice(0, 3).map((tech) => (
                            <div
                              key={tech}
                              className="w-7 h-7 rounded-lg bg-secondary border border-border/80 flex items-center justify-center"
                              title={tech}
                            >
                              <BrandIcon name={tech.toLowerCase() as any} size={15} />
                            </div>
                          ))}
                        </div>
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-secondary text-muted-foreground">
                          {proj.difficulty}
                        </span>
                      </div>

                      <h3 className="font-bold text-base text-foreground">{proj.title}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        {proj.description}
                      </p>
                    </div>

                    <Link
                      href={`/projects/${proj.slug}`}
                      className="text-xs text-primary hover:text-primary-active font-semibold flex items-center gap-1 pt-2 border-t border-border/60"
                    >
                      <span>Explore Project Specs</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                ))}
              </div>
            </section>

            {/* 3. Certificates */}
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                    Career Proof
                  </span>
                  <h2 className="text-lg font-bold text-foreground">
                    Certificates
                  </h2>
                </div>
                <button
                  onClick={() => setActiveTab("certificates")}
                  className="text-xs text-primary hover:text-primary-active font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <span>Verification Records</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-3">
                {profile.certificates.map((cert) => (
                  <div
                    key={cert.id}
                    className="p-4 rounded-xl border border-border/80 bg-card hover:border-primary/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <Award className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-sm text-foreground truncate">{cert.title}</h3>
                        <p className="text-xs text-muted-foreground">
                          {cert.issuer} · Issued {cert.issueDate} · ID: <span className="font-mono">{cert.certId}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-center">
                      <span className="inline-flex items-center gap-1 text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Verified</span>
                      </span>
                      <Link
                        href={cert.verificationUrl}
                        className="px-3 py-1.5 rounded-lg border border-border bg-secondary hover:bg-secondary/80 text-foreground text-xs font-semibold"
                      >
                        Verify
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 4. Skills */}
            <section className="p-6 rounded-2xl border border-border/80 bg-card space-y-4">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                  Competency Matrix
                </span>
                <h2 className="text-lg font-bold text-foreground">
                  Verified Skills
                </h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {profile.skills.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center gap-3 p-3 rounded-xl border border-border/70 bg-secondary/40"
                  >
                    <div className="w-8 h-8 rounded-lg bg-card border border-border/80 flex items-center justify-center text-primary shrink-0">
                      <BrandIcon name={skill.toLowerCase() as any} size={18} />
                    </div>
                    <span className="text-xs font-semibold text-foreground truncate">{skill}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ── TAB 2: LEARNING (Learning record, completed courses, in-progress) ── */}
        {activeTab === "learning" && (
          <div className="space-y-6">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                Official Transcript
              </span>
              <h2 className="text-xl font-bold text-foreground">
                Learning Record & Coursework
              </h2>
            </div>

            <div className="space-y-3">
              {profile.completedCourses.map((c) => (
                <div
                  key={c.id}
                  className="p-5 rounded-2xl border border-border/80 bg-card hover:border-primary/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-12 h-12 rounded-xl bg-secondary border border-border/80 flex items-center justify-center shrink-0">
                      <BrandIcon name={c.brand as any} size={28} />
                    </div>
                    <div className="min-w-0 space-y-0.5">
                      <h3 className="font-bold text-base text-foreground truncate">{c.title}</h3>
                      <p className="text-xs text-muted-foreground">
                        {c.category} · {c.lessonsCount || 24} Lessons Completed · 100% Mastery
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Transcript Verified</span>
                    </span>
                    <Link
                      href={`/courses/${c.id}`}
                      className="px-3.5 py-1.5 rounded-lg border border-border bg-secondary hover:bg-secondary/80 text-foreground text-xs font-semibold"
                    >
                      Syllabus
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB 3: PROJECTS (Show actual projects. Technology logos.) ── */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                Engineering Output
              </span>
              <h2 className="text-xl font-bold text-foreground">
                Actual Production Projects
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {profile.projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-6 rounded-2xl border border-border/80 bg-card hover:border-primary/50 transition-all flex flex-col justify-between gap-5 shadow-xs"
                >
                  <div className="space-y-3.5">
                    {/* Technology Logos Strip */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {proj.technologies.map((tech) => (
                          <div
                            key={tech}
                            className="w-8 h-8 rounded-xl bg-secondary border border-border/80 flex items-center justify-center"
                            title={tech}
                          >
                            <BrandIcon name={tech.toLowerCase() as any} size={18} />
                          </div>
                        ))}
                      </div>
                      <span className="text-[10px] font-mono uppercase font-semibold px-2 py-0.5 rounded bg-secondary text-muted-foreground border border-border/60">
                        {proj.difficulty}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-bold text-lg text-foreground">{proj.title}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 leading-relaxed">
                        {proj.description}
                      </p>
                    </div>

                    {/* Tech Badges */}
                    <div className="flex items-center gap-1.5 flex-wrap pt-1">
                      {proj.technologies.map((t) => (
                        <span
                          key={t}
                          className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-secondary/80 text-foreground border border-border/60"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-border/60 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground font-mono">
                      {proj.estimatedHours || "4–6 hours"}
                    </span>
                    <Link
                      href={`/projects/${proj.slug}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary-active text-xs font-semibold transition-all shadow-2xs"
                    >
                      <span>View Project</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB 4: CERTIFICATES (Show verification.) ── */}
        {activeTab === "certificates" && (
          <div className="space-y-6">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                Accredited Credentials
              </span>
              <h2 className="text-xl font-bold text-foreground">
                Verified Certificates
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profile.certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="p-6 rounded-2xl border border-primary/25 bg-card/95 hover:border-primary/50 transition-all flex flex-col justify-between gap-4 shadow-xs"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                        <Award className="w-5 h-5" />
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Verified Credential</span>
                      </span>
                    </div>

                    <div>
                      <h3 className="font-bold text-base sm:text-lg text-foreground">{cert.title}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Issued by {cert.issuer} · {cert.issueDate}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-secondary/60 border border-border/80 flex items-center justify-between text-xs font-mono">
                      <span className="text-muted-foreground">Credential ID:</span>
                      <span className="font-bold text-foreground">{cert.certId}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-border/60 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Chain of Trust Validated</span>
                    <Link
                      href={cert.verificationUrl}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-secondary hover:bg-secondary/80 border border-border text-foreground hover:text-primary text-xs font-semibold transition-all"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Verify Certificate</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB 5: ACHIEVEMENTS (Keep professional.) ── */}
        {activeTab === "achievements" && (
          <div className="space-y-6">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                Professional Recognition
              </span>
              <h2 className="text-xl font-bold text-foreground">
                Academic & Engineering Honors
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profile.achievements.map((ach) => (
                <div
                  key={ach.id}
                  className="p-5 rounded-2xl border border-border/80 bg-card hover:border-primary/40 transition-all flex items-start gap-4 shadow-2xs"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-secondary text-primary font-semibold">
                        {ach.category}
                      </span>
                      <span className="text-xs text-muted-foreground font-mono">{ach.date}</span>
                    </div>
                    <h3 className="font-bold text-base text-foreground">{ach.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {ach.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB 6: COMPETITIONS ── */}
        {activeTab === "competitions" && (
          <div className="space-y-6">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                Contest Performance
              </span>
              <h2 className="text-xl font-bold text-foreground">
                Hackathons & Algorithmic Sprints
              </h2>
            </div>

            <div className="space-y-3">
              {profile.competitions.map((comp) => (
                <div
                  key={comp.id}
                  className="p-5 rounded-2xl border border-border/80 bg-card hover:border-primary/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-12 h-12 rounded-xl bg-secondary border border-border/80 flex items-center justify-center text-amber-500 shrink-0">
                      <Trophy className="w-6 h-6" />
                    </div>
                    <div className="min-w-0 space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold">
                          {comp.category}
                        </span>
                        <span className="text-xs text-muted-foreground font-mono">{comp.date}</span>
                      </div>
                      <h3 className="font-bold text-base text-foreground truncate">{comp.title}</h3>
                      <p className="text-xs text-muted-foreground">Host: {comp.host}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-secondary border border-border text-foreground">
                      {comp.rank}
                    </span>
                    <Link
                      href="/competitions"
                      className="px-3.5 py-1.5 rounded-lg border border-border bg-secondary hover:bg-secondary/80 text-foreground text-xs font-semibold"
                    >
                      Leaderboard
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />

      {/* ────────────────────────────────────────────────────────
          EDIT PROFILE MODAL (Triggered by [Edit Profile])
      ──────────────────────────────────────────────────────── */}
      {editModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div
            className="w-full max-w-xl rounded-2xl border border-border bg-card p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-profile-title"
          >
            <div className="flex items-center justify-between pb-3 border-b border-border/60">
              <h2 id="edit-profile-title" className="text-lg font-bold text-foreground">
                Edit Student Profile
              </h2>
              <button
                type="button"
                onClick={() => setEditModalOpen(false)}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-muted-foreground">Full Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  required
                  className="w-full px-3.5 py-2 rounded-xl bg-secondary/50 border border-border text-sm text-foreground focus:outline-none focus:border-primary"
                />
              </div>

              {/* Headline */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-muted-foreground">
                  Headline / Professional Role
                </label>
                <input
                  type="text"
                  value={editHeadline}
                  onChange={(e) => setEditHeadline(e.target.value)}
                  placeholder="e.g. Full-Stack & Systems Engineer · Computer Science Scholar"
                  className="w-full px-3.5 py-2 rounded-xl bg-secondary/50 border border-border text-sm text-foreground focus:outline-none focus:border-primary"
                />
              </div>

              {/* Avatar Selector */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase text-muted-foreground">Avatar Preset</label>
                <div className="flex items-center gap-2.5 flex-wrap">
                  {PRESET_AVATARS.map((av) => (
                    <button
                      key={av.url}
                      type="button"
                      onClick={() => setEditAvatarUrl(av.url)}
                      className={`w-12 h-12 rounded-xl overflow-hidden border-2 transition-all p-0.5 cursor-pointer ${
                        editAvatarUrl === av.url ? "border-primary scale-105" : "border-border/60 hover:border-border"
                      }`}
                      title={av.label}
                    >
                      <img src={av.url} alt={av.label} className="w-full h-full object-cover rounded-lg" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Skills Editor */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase text-muted-foreground">
                  Verified Skills
                </label>
                <div className="flex items-center gap-1.5 flex-wrap p-2.5 rounded-xl bg-secondary/30 border border-border/70 min-h-[48px]">
                  {editSkills.map((s) => (
                    <span
                      key={s}
                      className="inline-flex items-center gap-1 text-xs font-mono px-2 py-0.5 rounded bg-secondary border border-border text-foreground"
                    >
                      <span>{s}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(s)}
                        className="text-muted-foreground hover:text-destructive cursor-pointer"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newSkillInput}
                    onChange={(e) => setNewSkillInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        handleAddSkill(newSkillInput)
                      }
                    }}
                    placeholder="Add a skill (e.g. Docker, Rust)..."
                    className="flex-1 px-3 py-1.5 rounded-lg bg-secondary/50 border border-border text-xs text-foreground focus:outline-none focus:border-primary"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddSkill(newSkillInput)}
                    className="px-3 py-1.5 rounded-lg bg-secondary hover:bg-secondary/80 text-xs font-semibold cursor-pointer"
                  >
                    Add
                  </button>
                </div>

                {/* Popular Skill Suggestions */}
                <div className="flex items-center gap-1 flex-wrap pt-1">
                  <span className="text-[10px] text-muted-foreground font-mono">Suggestions:</span>
                  {PRESET_SKILLS.slice(0, 8).map((ps) => (
                    <button
                      key={ps}
                      type="button"
                      onClick={() => handleAddSkill(ps)}
                      className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-secondary/60 hover:bg-secondary text-muted-foreground hover:text-foreground cursor-pointer"
                    >
                      + {ps}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bio */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-muted-foreground">About / Bio</label>
                <textarea
                  rows={3}
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  placeholder="Share a short summary of your technical focus, systems interests, or research..."
                  className="w-full px-3.5 py-2 rounded-xl bg-secondary/50 border border-border text-sm text-foreground focus:outline-none focus:border-primary"
                />
              </div>

              {/* Save & Feedback */}
              <div className="pt-3 border-t border-border/60 flex items-center justify-between">
                {saveSuccess ? (
                  <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Profile Saved!</span>
                  </span>
                ) : (
                  <div />
                )}

                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setEditModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-border text-xs font-semibold hover:bg-secondary cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary-active text-xs font-semibold transition-all shadow-xs cursor-pointer disabled:opacity-60"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{saving ? "Saving..." : "Save Profile"}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
