"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  Award,
  BookOpen,
  FolderGit2,
  Code2,
  Trophy,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Flame,
  ArrowRight,
  ExternalLink,
  Layers,
  Sparkles,
  Users,
} from "lucide-react"
import { BrandIcon } from "@/components/ui/brand-icon"
import { BadgesShowcase } from "@/components/gamification/badges-showcase"

export type AchievementCategory = "all" | "courses" | "projects" | "challenges" | "competitions" | "certificates"

export interface AchievementItem {
  id: string
  title: string
  category: "courses" | "projects" | "challenges" | "competitions" | "certificates"
  description: string
  date: string
  status: "Completed" | "Verified" | "Placed" | "Earned"
  brand?: string
  link?: string
  metadata?: string
}

export const SCHOLASTIC_ACHIEVEMENTS: AchievementItem[] = [
  // 1. Courses
  {
    id: "ach-c1",
    title: "Python Programming Curriculum",
    category: "courses",
    description: "Mastered fundamental to advanced Python including memory models, OOP, generators, and async execution.",
    date: "Sep 2026",
    status: "Completed",
    brand: "python",
    link: "/courses/python",
    metadata: "24 Lessons · 100% Verified",
  },
  {
    id: "ach-c2",
    title: "Data Structures & Algorithms Track",
    category: "courses",
    description: "Completed comprehensive A2Z algorithmic progression spanning arrays, trees, graphs, and dynamic programming.",
    date: "Aug 2026",
    status: "Completed",
    brand: "algorithm",
    link: "/courses/dsa",
    metadata: "32 Lessons · 100% Verified",
  },

  // 2. Projects
  {
    id: "ach-p1",
    title: "Build a Job Portal Capstone",
    category: "projects",
    description: "Engineered a production-ready opportunity discovery engine with full-text search, faceted filtering, and applicant tracking.",
    date: "Sep 2026",
    status: "Verified",
    brand: "react",
    link: "/projects/build-a-job-portal",
    metadata: "React · Node.js · PostgreSQL",
  },
  {
    id: "ach-p2",
    title: "Distributed Key-Value Store with Raft",
    category: "projects",
    description: "Built a consensus-backed distributed KV store supporting heartbeats, leader elections, and log compaction.",
    date: "Aug 2026",
    status: "Verified",
    brand: "go",
    link: "/projects/distributed-key-value-store",
    metadata: "Go · Docker · Raft Consensus",
  },

  // 3. Challenges
  {
    id: "ach-ch1",
    title: "50 DSA Challenges Solved",
    category: "challenges",
    description: "Solved 50+ medium and hard computational problems with validated Big-O asymptotic efficiency.",
    date: "Sep 2026",
    status: "Verified",
    brand: "algorithm",
    link: "/practice",
    metadata: "50 Problems · Automated Test Suites",
  },
  {
    id: "ach-ch2",
    title: "Sliding Window Maximum & Two Pointers",
    category: "challenges",
    description: "Optimized complex nested traversals into linear O(N) deque algorithms with zero memory leaks.",
    date: "Aug 2026",
    status: "Completed",
    brand: "algorithm",
    link: "/practice",
    metadata: "Hard Problem of the Day",
  },

  // 4. Competitions
  {
    id: "ach-comp1",
    title: "ASCI National Algorithm Sprint",
    category: "competitions",
    description: "Placed Rank 42 out of 1,200 national collegiate participants in timed competitive programming.",
    date: "Sep 2026",
    status: "Placed",
    brand: "google",
    link: "/competitions",
    metadata: "Rank 42 / 1,200 · Google Dev Groups",
  },
  {
    id: "ach-comp2",
    title: "Razorpay High-Throughput Sprint",
    category: "competitions",
    description: "Built high-concurrency payment webhook receiver handling 10,000 requests per second.",
    date: "Aug 2026",
    status: "Placed",
    brand: "algorithm",
    link: "/competitions",
    metadata: "National Finalist · Razorpay",
  },

  // 5. Certificates
  {
    id: "ach-cert1",
    title: "ASCI Certified Python Specialist",
    category: "certificates",
    description: "Formal credential awarded upon completing the Python track with distinction and passing standardized evaluation.",
    date: "Sep 2026",
    status: "Earned",
    brand: "python",
    link: "/verify/ASCI-PY-2026-904",
    metadata: "Credential ID: ASCI-PY-2026-904",
  },
  {
    id: "ach-cert2",
    title: "Systems Architecture Mastery Diploma",
    category: "certificates",
    description: "Accredited diploma verifying distributed systems design, concurrency primitives, and database scalability.",
    date: "Aug 2026",
    status: "Earned",
    brand: "algorithm",
    link: "/verify/ASCI-DSA-2026-118",
    metadata: "Credential ID: ASCI-DSA-2026-118",
  },
]

export const LEADERBOARD_STUDENTS = [
  { rank: 1, name: "Priya Sharma", institution: "IIT Bombay", solved: 142, xp: 8420, badge: "Master Architect" },
  { rank: 2, name: "Arjun Mehta", institution: "BITS Pilani", solved: 138, xp: 7950, badge: "Principal Fellow" },
  { rank: 3, name: "Sneha Patel", institution: "NIT Trichy", solved: 124, xp: 7200, badge: "Senior Specialist" },
  { rank: 4, name: "Alex Carter (You)", institution: "ASCI Scholar", solved: 50, xp: 2840, badge: "Systems Architect" },
  { rank: 5, name: "Devansh Rao", institution: "IIIT Hyderabad", solved: 48, xp: 2750, badge: "Systems Architect" },
]

export function AchievementsHub() {
  const [selectedCategory, setSelectedCategory] = useState<AchievementCategory>("all")
  const [showSecondaryGamification, setShowSecondaryGamification] = useState(false)

  const filteredItems =
    selectedCategory === "all"
      ? SCHOLASTIC_ACHIEVEMENTS
      : SCHOLASTIC_ACHIEVEMENTS.filter((item) => item.category === selectedCategory)

  const counts = {
    all: SCHOLASTIC_ACHIEVEMENTS.length,
    courses: SCHOLASTIC_ACHIEVEMENTS.filter((i) => i.category === "courses").length,
    projects: SCHOLASTIC_ACHIEVEMENTS.filter((i) => i.category === "projects").length,
    challenges: SCHOLASTIC_ACHIEVEMENTS.filter((i) => i.category === "challenges").length,
    competitions: SCHOLASTIC_ACHIEVEMENTS.filter((i) => i.category === "competitions").length,
    certificates: SCHOLASTIC_ACHIEVEMENTS.filter((i) => i.category === "certificates").length,
  }

  return (
    <div className="min-h-screen bg-background text-foreground py-8">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground font-semibold">Achievements</span>
        </nav>

        {/* Header Banner */}
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xs">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-mono font-bold text-primary uppercase tracking-wider">
              VERIFIED MERIT &amp; ENGINEERING HONORS
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground font-sans">
              Achievements &amp; Scholastic Records
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Objective, verifiable records of your technical progress across coursework, capstone projects,
              algorithmic challenges, hackathons, and accredited credentials.
            </p>
          </div>

          {/* 5-Pillar Summary Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-6 pt-6 border-t border-border/60">
            <button
              onClick={() => setSelectedCategory("courses")}
              className={`p-3.5 rounded-xl border transition-all text-left cursor-pointer ${
                selectedCategory === "courses"
                  ? "border-primary bg-primary/5"
                  : "border-border/80 bg-secondary/30 hover:bg-secondary/50"
              }`}
            >
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="text-[11px] font-mono uppercase font-semibold">Courses</span>
                <BookOpen className="h-4 w-4 text-primary" />
              </div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-foreground mt-1">
                {counts.courses}
              </div>
              <span className="text-[10px] text-muted-foreground">Completed</span>
            </button>

            <button
              onClick={() => setSelectedCategory("projects")}
              className={`p-3.5 rounded-xl border transition-all text-left cursor-pointer ${
                selectedCategory === "projects"
                  ? "border-primary bg-primary/5"
                  : "border-border/80 bg-secondary/30 hover:bg-secondary/50"
              }`}
            >
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="text-[11px] font-mono uppercase font-semibold">Projects</span>
                <FolderGit2 className="h-4 w-4 text-primary" />
              </div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-foreground mt-1">
                {counts.projects}
              </div>
              <span className="text-[10px] text-muted-foreground">Production Capstones</span>
            </button>

            <button
              onClick={() => setSelectedCategory("challenges")}
              className={`p-3.5 rounded-xl border transition-all text-left cursor-pointer ${
                selectedCategory === "challenges"
                  ? "border-primary bg-primary/5"
                  : "border-border/80 bg-secondary/30 hover:bg-secondary/50"
              }`}
            >
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="text-[11px] font-mono uppercase font-semibold">Challenges</span>
                <Code2 className="h-4 w-4 text-primary" />
              </div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-foreground mt-1">
                50+
              </div>
              <span className="text-[10px] text-muted-foreground">DSA Solved</span>
            </button>

            <button
              onClick={() => setSelectedCategory("competitions")}
              className={`p-3.5 rounded-xl border transition-all text-left cursor-pointer ${
                selectedCategory === "competitions"
                  ? "border-primary bg-primary/5"
                  : "border-border/80 bg-secondary/30 hover:bg-secondary/50"
              }`}
            >
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="text-[11px] font-mono uppercase font-semibold">Competitions</span>
                <Trophy className="h-4 w-4 text-primary" />
              </div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-foreground mt-1">
                {counts.competitions}
              </div>
              <span className="text-[10px] text-muted-foreground">Hackathons Joined</span>
            </button>

            <button
              onClick={() => setSelectedCategory("certificates")}
              className={`p-3.5 rounded-xl border transition-all text-left cursor-pointer ${
                selectedCategory === "certificates"
                  ? "border-primary bg-primary/5"
                  : "border-border/80 bg-secondary/30 hover:bg-secondary/50"
              }`}
            >
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="text-[11px] font-mono uppercase font-semibold">Certificates</span>
                <Award className="h-4 w-4 text-primary" />
              </div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-foreground mt-1">
                {counts.certificates}
              </div>
              <span className="text-[10px] text-muted-foreground">Accredited Diplomas</span>
            </button>
          </div>
        </div>

        {/* ────────────────────────────────────────────────────────
            CATEGORY FILTER TABS (Courses, Projects, Challenges, Competitions, Certificates)
        ──────────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between border-b border-border/80 pb-3 flex-wrap gap-3">
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar">
            {(
              [
                { id: "all", label: "All Honors" },
                { id: "courses", label: "Courses" },
                { id: "projects", label: "Projects" },
                { id: "challenges", label: "Challenges" },
                { id: "competitions", label: "Competitions" },
                { id: "certificates", label: "Certificates" },
              ] as { id: AchievementCategory; label: string }[]
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === tab.id
                    ? "bg-primary text-primary-foreground shadow-2xs"
                    : "bg-secondary/60 text-muted-foreground hover:text-foreground"
                }`}
              >
                <span>{tab.label}</span>
                <span className="ml-1.5 opacity-70 font-mono">({counts[tab.id]})</span>
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowSecondaryGamification((prev) => !prev)}
            className="text-xs font-mono text-primary hover:text-primary-active font-semibold flex items-center gap-1 cursor-pointer"
          >
            <span>{showSecondaryGamification ? "Hide Standing & Leaderboard" : "View Standing & Leaderboard"}</span>
            <ChevronRight className={`w-3.5 h-3.5 transition-transform ${showSecondaryGamification ? "rotate-90" : ""}`} />
          </button>
        </div>

        {/* ────────────────────────────────────────────────────────
            PRIMARY EXPERIENCE: PROFESSIONAL ACHIEVEMENTS GRID
        ──────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl border border-border/80 bg-card hover:border-primary/40 transition-all flex flex-col justify-between gap-4 shadow-2xs"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-secondary border border-border/80 flex items-center justify-center shrink-0">
                      <BrandIcon name={(item.brand || "algorithm") as any} size={20} />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-secondary text-primary font-bold">
                        {item.category}
                      </span>
                      <span className="text-xs text-muted-foreground ml-2 font-mono">
                        {item.date}
                      </span>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{item.status}</span>
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-base text-foreground">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-border/60 flex items-center justify-between">
                <span className="text-xs font-mono text-muted-foreground">
                  {item.metadata}
                </span>
                {item.link && (
                  <Link
                    href={item.link}
                    className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary-active font-semibold"
                  >
                    <span>View Record</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ────────────────────────────────────────────────────────
            SECONDARY EXPERIENCE: PRESERVED GAMIFICATION
            (XP, Streaks, Badges, Leaderboards kept professional)
        ──────────────────────────────────────────────────────── */}
        <section
          aria-label="Secondary Gamification & Standing"
          className="rounded-2xl border border-border/80 bg-card p-6 sm:p-8 space-y-6 shadow-xs"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border/60">
            <div>
              <span className="text-xs font-mono font-bold text-primary uppercase tracking-wider">
                SECONDARY EXPERIENCE · SCHOLASTIC MERIT
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground font-sans">
                Merit Standing &amp; National Leaderboard
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                Preserved metrics supporting rigorous practice without mobile gaming distraction.
              </p>
            </div>
          </div>

          {/* XP & Streak Micro-Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border border-border/80 bg-secondary/30 space-y-1">
              <span className="text-[11px] font-mono uppercase text-muted-foreground font-semibold">
                Total Experience
              </span>
              <div className="text-2xl font-bold font-mono text-foreground">
                2,840 XP
              </div>
              <p className="text-xs text-muted-foreground">Tier 3 Systems Architect</p>
            </div>

            <div className="p-4 rounded-xl border border-border/80 bg-secondary/30 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase text-muted-foreground font-semibold">
                  Habit Consistency
                </span>
                <Flame className="w-4 h-4 text-primary" />
              </div>
              <div className="text-2xl font-bold font-mono text-primary">
                18-Day Streak
              </div>
              <p className="text-xs text-muted-foreground">Continuous daily practice</p>
            </div>

            <div className="p-4 rounded-xl border border-border/80 bg-secondary/30 space-y-1">
              <span className="text-[11px] font-mono uppercase text-muted-foreground font-semibold">
                National Ranking
              </span>
              <div className="text-2xl font-bold font-mono text-foreground">
                Rank #4
              </div>
              <p className="text-xs text-muted-foreground">Among active engineering scholars</p>
            </div>
          </div>

          {/* National Engineering Leaderboard Table */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-foreground font-sans flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <span>Collegiate Engineering Leaderboard</span>
              </h3>
              <span className="text-xs font-mono text-muted-foreground">
                Weekly Evaluation Cycle
              </span>
            </div>

            <div className="rounded-xl border border-border/80 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-secondary/60 text-muted-foreground font-mono uppercase text-[10px] border-b border-border/60">
                    <tr>
                      <th className="px-4 py-2.5">Rank</th>
                      <th className="px-4 py-2.5">Scholar</th>
                      <th className="px-4 py-2.5">Institution</th>
                      <th className="px-4 py-2.5 text-right">Solved</th>
                      <th className="px-4 py-2.5 text-right">Merit XP</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {LEADERBOARD_STUDENTS.map((st) => (
                      <tr
                        key={st.rank}
                        className={`transition-colors ${
                          st.name.includes("(You)")
                            ? "bg-primary/5 font-semibold text-primary"
                            : "hover:bg-secondary/30"
                        }`}
                      >
                        <td className="px-4 py-3 font-mono font-bold">
                          #{st.rank}
                        </td>
                        <td className="px-4 py-3 text-foreground font-medium">
                          {st.name}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {st.institution}
                        </td>
                        <td className="px-4 py-3 text-right font-mono">
                          {st.solved}
                        </td>
                        <td className="px-4 py-3 text-right font-mono font-bold text-foreground">
                          {st.xp.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Badges Showcase */}
          <div className="pt-2">
            <BadgesShowcase unlockedBadgeIds={["badge-first-code", "badge-streak-7", "badge-potd-master"]} />
          </div>
        </section>
      </div>
    </div>
  )
}
