"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  ArrowRight,
  Code2,
  Terminal,
  CheckCircle2,
  Flame,
  FolderGit2,
  Play,
  Compass,
  Layers,
  Sparkles,
} from "lucide-react"
import { useAuth } from "@/context/auth-context"

export function Hero() {
  const { user: authUser } = useAuth()
  const [mounted, setMounted] = useState(false)
  const [demoBypassUser, setDemoBypassUser] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<"course" | "dsa" | "project">("course")

  useEffect(() => {
    setMounted(true)
    if (!authUser && typeof document !== "undefined") {
      const match = document.cookie.match(/(^| )demo_bypass=([^;]+)/)
      if (match) {
        setDemoBypassUser({ email: "demo@asci.edu" })
      }
    }
  }, [authUser])

  const user = mounted ? authUser || demoBypassUser : null

  return (
    <section
      id="hero-section"
      className="relative min-h-[92svh] flex flex-col justify-center bg-background pt-24 sm:pt-28 pb-12 lg:pb-16 border-b border-border/60"
    >
      {/* Restrained engineering grid texture */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-[0.025] dark:opacity-[0.035]"
          style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* ═══════════════════════════════════════════
              LEFT COLUMN — EDITORIAL PRODUCT COPY
          ═══════════════════════════════════════════ */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Small ASCI system badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1 text-xs font-mono font-medium text-primary shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span>THE OPERATING SYSTEM FOR AN ENGINEERING STUDENT</span>
            </div>

            {/* Main headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-foreground leading-[1.08]">
              Learn Engineering <br />
              <span className="italic text-primary font-normal">by Building</span>.
            </h1>

            {/* Direct, calm supporting text */}
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl font-normal">
              Structured courses, coding practice, projects and career opportunities in one place. Engineered for students who want to ship production software.
            </p>

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                href={user ? "/dashboard" : "/signup"}
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-primary hover:bg-primary-active text-white px-6 py-3.5 text-sm font-semibold tracking-tight transition-all active:scale-[0.99] cursor-pointer shadow-xs text-center"
              >
                <span>{user ? "Go to Dashboard" : "Start Learning"}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/courses"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border hover:border-foreground/30 bg-card hover:bg-secondary/70 px-5 py-3.5 text-sm font-medium text-foreground transition-all cursor-pointer text-center"
              >
                <Compass className="h-4 w-4 text-muted-foreground" />
                <span>Explore Courses</span>
              </Link>
            </div>

            {/* Trustworthy micro indicators (no fabricated statistics) */}
            <div className="pt-3 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-muted-foreground font-mono">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                <span>Zero setup needed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                <span>Interactive in-browser sandboxes</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                <span>Real verified projects</span>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════
              RIGHT COLUMN — LIVE STUDENT COCKPIT PREVIEW
              (NOT an abstract 3D robot or canvas)
          ═══════════════════════════════════════════ */}
          <div className="lg:col-span-5 w-full">
            <div className="relative rounded-2xl border border-border/80 bg-card p-4 sm:p-5 shadow-xl transition-all duration-300 hover:border-border">
              {/* Cockpit Window Chrome Header */}
              <div className="flex items-center justify-between border-b border-border/60 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-xs font-mono text-muted-foreground">asci-cockpit / student-view</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                  <Flame className="w-3 h-3 text-primary fill-primary" />
                  <span>7-Day Streak</span>
                </div>
              </div>

              {/* Cockpit Interactive Tabs */}
              <div className="flex items-center gap-1 bg-secondary/80 p-1 rounded-xl mb-4 text-xs font-medium">
                <button
                  onClick={() => setActiveTab("course")}
                  className={`flex-1 py-1.5 px-2 rounded-lg transition-all text-center cursor-pointer ${
                    activeTab === "course"
                      ? "bg-card text-foreground font-semibold shadow-2xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Active Course
                </button>
                <button
                  onClick={() => setActiveTab("dsa")}
                  className={`flex-1 py-1.5 px-2 rounded-lg transition-all text-center cursor-pointer ${
                    activeTab === "dsa"
                      ? "bg-card text-foreground font-semibold shadow-2xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Today&apos;s Practice
                </button>
                <button
                  onClick={() => setActiveTab("project")}
                  className={`flex-1 py-1.5 px-2 rounded-lg transition-all text-center cursor-pointer ${
                    activeTab === "project"
                      ? "bg-card text-foreground font-semibold shadow-2xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Capstone
                </button>
              </div>

              {/* Tab 1: Active Course Progress */}
              {activeTab === "course" && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="rounded-xl border border-border/80 bg-secondary/30 p-3.5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-primary font-semibold">
                          In Progress
                        </span>
                        <h4 className="text-sm font-semibold text-foreground mt-0.5">
                          Production Python &amp; Systems Engineering
                        </h4>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Lesson 34 / 50 · Functions, Modules &amp; Memory Scope
                        </p>
                      </div>
                      <span className="text-xs font-mono font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md shrink-0">
                        68%
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-secondary h-2 rounded-full overflow-hidden mt-3">
                      <div
                        className="bg-primary h-full rounded-full transition-all duration-500"
                        style={{ width: "68%" }}
                      />
                    </div>
                  </div>

                  {/* Up Next Snippet */}
                  <div className="flex items-center justify-between text-xs px-1">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Play className="w-3.5 h-3.5 text-primary" />
                      <span>Next: <strong className="text-foreground font-medium">Asyncio Event Loops &amp; Sockets</strong></span>
                    </div>
                    <span className="font-mono text-[11px] text-muted-foreground">18 min</span>
                  </div>

                  <Link
                    href="/programs/python"
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-active transition-all cursor-pointer text-center"
                  >
                    <span>Resume Course</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}

              {/* Tab 2: Today's DSA Problem */}
              {activeTab === "dsa" && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="rounded-xl border border-border/80 bg-secondary/30 p-3.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded">
                        Medium · Hash Map
                      </span>
                      <span className="text-[11px] font-mono text-muted-foreground">POTD #142</span>
                    </div>
                    <h4 className="text-sm font-semibold text-foreground mt-2">
                      Two Sum II — Input Array Is Sorted
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      Find two numbers such that they add up to a specific target number using two-pointer approach in O(1) space.
                    </p>

                    <div className="flex items-center gap-2 mt-3 text-[11px] font-mono text-muted-foreground">
                      <span className="text-primary font-semibold">+50 XP</span>
                      <span>·</span>
                      <span>Target: &lt;15 min</span>
                      <span>·</span>
                      <span className="text-emerald-600 dark:text-emerald-400">Acceptance 62.4%</span>
                    </div>
                  </div>

                  <Link
                    href="/dsa/problems/two-sum"
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-active transition-all cursor-pointer text-center"
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    <span>Open in Problem Solver</span>
                  </Link>
                </div>
              )}

              {/* Tab 3: Capstone Project Milestone */}
              {activeTab === "project" && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="rounded-xl border border-border/80 bg-secondary/30 p-3.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-primary font-semibold">
                        Systems Architecture
                      </span>
                      <span className="text-xs font-mono font-bold text-primary">Milestone 2 / 4</span>
                    </div>
                    <h4 className="text-sm font-semibold text-foreground mt-1">
                      ApexKV — Distributed Raft-Consensus KV Store
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Leader election complete. Implementing log replication and heartbeat RPCs.
                    </p>

                    <div className="flex items-center gap-1.5 flex-wrap mt-3">
                      {["Go", "Raft", "gRPC", "Docker"].map((tech) => (
                        <span key={tech} className="text-[10px] font-mono px-2 py-0.5 rounded bg-card border border-border/80 text-muted-foreground">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    href="/projects"
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-active transition-all cursor-pointer text-center"
                  >
                    <FolderGit2 className="w-3.5 h-3.5" />
                    <span>View Project Specification</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
