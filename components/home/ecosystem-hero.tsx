"use client"

import React from "react"
import Link from "next/link"
import {
  ArrowRight,
  Sparkles,
  Trophy,
  Briefcase,
  CheckCircle2,
  Clock,
  Award,
  ShieldCheck,
} from "lucide-react"
import { BrandIcon } from "@/components/ui/brand-icon"

const TRUSTED_TECHNOLOGIES: { name: string; brand: string }[] = [
  { name: "Python", brand: "python" },
  { name: "JavaScript", brand: "javascript" },
  { name: "React", brand: "react" },
  { name: "Next.js", brand: "nextjs" },
  { name: "Java", brand: "java" },
  { name: "Docker", brand: "docker" },
  { name: "AWS", brand: "aws" },
  { name: "GitHub", brand: "github" },
  { name: "PostgreSQL", brand: "postgresql" },
  { name: "AI & ML", brand: "openai" },
]

export function EcosystemHero() {
  return (
    <section className="relative overflow-hidden bg-[#FAF8F4] dark:bg-[#0c120e] border-b border-border/70 transition-colors">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 lg:pt-16 pb-8 sm:pb-12">
        {/* Two-Part Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* ==============================================================
              LEFT COLUMN: High-Impact Typography & Action CTAs
          ============================================================== */}
          <div className="lg:col-span-6 space-y-5">
            {/* Small Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[11px] sm:text-xs font-mono font-semibold text-primary tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span>ACADEMY OF SOFTWARE CRAFT &amp; INTELLIGENCE</span>
            </div>

            {/* Large Headline (48-60px desktop, 32-40px mobile) */}
            <h1 className="font-serif text-[34px] sm:text-[44px] lg:text-[54px] font-normal leading-[1.08] tracking-tight text-foreground">
              Build skills.<br />
              <span className="text-primary font-medium">Build proof.</span><br />
              Build your career.
            </h1>

            {/* Supporting Text */}
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl font-sans">
              Learn from structured courses, practice with real challenges, build projects, and discover career opportunities.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/courses"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-[#EA5300] text-sm font-semibold transition-all shadow-sm active:scale-[0.98] cursor-pointer"
              >
                <span>Explore Learning</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/career"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-border bg-card hover:bg-secondary text-foreground text-sm font-medium transition-colors cursor-pointer"
              >
                <span>Explore Opportunities</span>
              </Link>
            </div>

            {/* Quick Metrics Micro-Strip */}
            <div className="pt-3 flex items-center gap-6 text-xs text-muted-foreground font-mono">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="font-semibold text-foreground">47+</span> Courses
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-blue-500" />
                <span className="font-semibold text-foreground">100+</span> Real Projects
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="font-semibold text-foreground">Verified</span> Proof of Work
              </div>
            </div>
          </div>

          {/* ==============================================================
              RIGHT COLUMN: Visual Ecosystem Composition (No 3D illustration)
              Arranged real UI cards, recognizable logos, and proof badges
          ============================================================== */}
          <div className="lg:col-span-6 relative">
            <div className="relative w-full max-w-[540px] mx-auto min-h-[380px] sm:min-h-[420px] flex items-center justify-center p-2">
              {/* Card 1: Main Course Spotlight (Top-Left anchored) */}
              <div className="absolute top-0 left-0 w-[270px] sm:w-[310px] p-3.5 sm:p-4 rounded-2xl border border-border bg-card shadow-lg hover:border-primary/40 transition-all z-20 group">
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                    <BrandIcon name="python" size={20} />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-secondary border border-border text-muted-foreground">
                    Course
                  </span>
                </div>
                <h3 className="font-semibold text-xs sm:text-sm text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                  Python for Production &amp; Systems
                </h3>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  24 lessons · Interactive Pyodide REPL
                </p>
                <div className="mt-3 pt-2.5 border-t border-border/70 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-16 h-1.5 rounded-full bg-secondary overflow-hidden">
                      <div className="w-[65%] h-full bg-primary rounded-full" />
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground">65%</span>
                  </div>
                  <span className="text-[11px] font-semibold text-primary">Resume →</span>
                </div>
              </div>

              {/* Card 2: Live Hackathon Card (Top-Right / Overlapping) */}
              <div className="absolute top-6 right-0 sm:-right-2 w-[240px] sm:w-[270px] p-3 sm:p-3.5 rounded-2xl border border-border bg-card/95 backdrop-blur-xs shadow-md hover:border-primary/40 transition-all z-10">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                    <BrandIcon name="google" size={16} />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                    Hackathon
                  </span>
                </div>
                <h4 className="font-semibold text-xs text-foreground line-clamp-1">
                  AI Innovation Sprint 2026
                </h4>
                <div className="mt-1 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                  <span className="text-foreground font-bold">₹50,000 Prize</span>
                  <span className="flex items-center gap-1 text-primary">
                    <Clock className="w-3 h-3" /> 8 days left
                  </span>
                </div>
              </div>

              {/* Card 3: Career Internship Opportunity (Bottom-Right / Overlapping) */}
              <div className="absolute bottom-2 sm:bottom-0 right-1 sm:right-2 w-[260px] sm:w-[290px] p-3.5 rounded-2xl border border-border bg-card shadow-lg hover:border-primary/40 transition-all z-30">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-secondary border border-border flex items-center justify-center shrink-0">
                      <BrandIcon name="google" size={16} />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-foreground">Google India</div>
                      <div className="text-[10px] text-muted-foreground">Bangalore / Remote</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    Internship
                  </span>
                </div>
                <div className="text-xs font-bold text-foreground">
                  Software Engineer Intern
                </div>
                <div className="mt-1.5 pt-2 border-t border-border/70 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-primary font-bold">₹1,15,000 / mo</span>
                  <span className="text-muted-foreground">Apply by Oct 12</span>
                </div>
              </div>

              {/* Card 4: Real Capstone Project Pill (Bottom-Left / Overlapping) */}
              <div className="absolute bottom-8 left-0 sm:left-2 w-[220px] sm:w-[250px] p-3 rounded-2xl border border-border bg-card/95 backdrop-blur-xs shadow-md z-20">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="flex -space-x-1.5">
                    <div className="w-6 h-6 rounded-md bg-secondary border border-border flex items-center justify-center shadow-xs">
                      <BrandIcon name="react" size={12} />
                    </div>
                    <div className="w-6 h-6 rounded-md bg-secondary border border-border flex items-center justify-center shadow-xs">
                      <BrandIcon name="nodejs" size={12} />
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground">
                    Project
                  </span>
                </div>
                <div className="text-xs font-semibold text-foreground truncate">
                  Build a Full-Stack Job Portal
                </div>
                <div className="text-[10px] font-mono text-muted-foreground mt-0.5">
                  Intermediate · 4–6 hours
                </div>
              </div>

              {/* Card 5: Cryptographic Certificate Verified Pill (Center floating) */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl border border-amber-500/30 bg-[#FFFDF9]/95 dark:bg-[#141413]/95 shadow-xl z-30 flex items-center gap-2 whitespace-nowrap">
                <div className="w-6 h-6 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                  <Award className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-foreground flex items-center gap-1">
                    <span>Verified Credential</span>
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                  </div>
                  <div className="text-[9px] font-mono text-muted-foreground">
                    Ed25519 Cryptographic Proof
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ==============================================================
            SECTION 07: TRUST / ECOSYSTEM STRIP
            "Learn the technologies used across modern engineering."
        ============================================================== */}
        <div className="mt-8 pt-6 border-t border-border/60">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground shrink-0">
              Learn the technologies used across modern engineering:
            </span>

            {/* Horizontal Tech Logo Strip */}
            <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto pb-1 scrollbar-none">
              {TRUSTED_TECHNOLOGIES.map((tech) => (
                <div
                  key={tech.name}
                  className="flex items-center gap-1.5 shrink-0 opacity-85 hover:opacity-100 transition-opacity"
                  title={tech.name}
                >
                  <div className="w-6 h-6 rounded-md bg-secondary/80 border border-border/80 flex items-center justify-center shrink-0">
                    <BrandIcon name={tech.brand} size={14} />
                  </div>
                  <span className="text-xs font-mono font-medium text-foreground whitespace-nowrap">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
