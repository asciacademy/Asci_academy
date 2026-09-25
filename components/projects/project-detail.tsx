"use client"

import { useState } from "react"
import Link from "next/link"
import {
  FolderGit2,
  Clock,
  ChevronRight,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Award,
  Layers,
  Code2,
  ExternalLink,
  Terminal,
  Send,
  Github,
  Globe,
  Sparkles,
  Check,
  Briefcase,
  AlertCircle,
  FileCode,
} from "lucide-react"
import type { GuidedProject } from "@/lib/projects-data"
import { BrandIcon } from "@/components/ui/brand-icon"
import { detectTechIcon } from "@/components/cards/course-card"
import { ContextualAxelButton } from "@/components/axel/contextual-axel-button"

interface ProjectDetailProps {
  project: GuidedProject
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const [activeMilestone, setActiveMilestone] = useState(1)
  const [enrolled, setEnrolled] = useState(false)
  const [repoUrl, setRepoUrl] = useState("")
  const [demoUrl, setDemoUrl] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const difficultyColor =
    project.difficulty === "Beginner"
      ? "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
      : project.difficulty === "Advanced"
      ? "text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/20"
      : "text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20"

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!repoUrl.trim()) return
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-background text-foreground pt-6 pb-24 lg:py-8">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/projects" className="hover:text-foreground transition-colors">
            Projects
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground font-semibold truncate max-w-xs sm:max-w-md">
            {project.title}
          </span>
        </nav>

        {/* ═══════════════════════════════════════════════════════════════
            TOP VIEWPORT:
            Answers immediately:
            1. WHAT AM I BUILDING? -> Title & Tagline
            2. WHAT TECHNOLOGY WILL I USE? -> Tech Logos & Stack
            3. HOW HARD IS IT? -> Difficulty Badge & Estimated Hours
        ═══════════════════════════════════════════════════════════════ */}
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-2xs space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div className="space-y-4 max-w-3xl">
              {/* Tech Logos & Badges */}
              <div className="flex items-center gap-3">
                <div className="flex items-center -space-x-2">
                  {project.technologies.slice(0, 3).map((tech, idx) => (
                    <div
                      key={idx}
                      className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/90 border border-border/80 shadow-2xs p-2"
                      title={tech}
                    >
                      <BrandIcon name={detectTechIcon(tech)} size={26} />
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-mono font-bold text-primary uppercase tracking-wider">
                    {project.category}
                  </span>
                  <span className="text-muted-foreground">•</span>
                  <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border font-semibold ${difficultyColor}`}>
                    {project.difficulty}
                  </span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-xs font-mono text-muted-foreground">{project.estimatedHours} build time</span>
                </div>
              </div>

              {/* Title & Tagline */}
              <div className="space-y-1.5">
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-foreground leading-[1.15]">
                  {project.title}
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {project.tagline}
                </p>
              </div>

              {/* Tech Stack List */}
              <div className="flex items-center gap-1.5 flex-wrap pt-1">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-mono px-3 py-1 rounded-lg bg-secondary text-foreground border border-border"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action CTA */}
            <div className="shrink-0 flex flex-col items-stretch sm:items-end gap-3 pt-2">
              {enrolled ? (
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white text-xs font-semibold shadow-xs">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Enrolled in Workspace</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setEnrolled(true)}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-primary-foreground hover:bg-[#EA5300] text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer"
                >
                  <span>Start Project</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
              <span className="text-[11px] font-mono text-muted-foreground">
                {project.enrolledStudents} scholars building
              </span>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            PROJECT DETAIL STRUCTURED SECTIONS:
            1. Problem
            2. What You'll Build
            3. Technology
            4. Skills
            5. Requirements
            6. Milestones
            7. Submission
            8. Portfolio
        ═══════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main 8-column layout */}
          <div className="lg:col-span-8 space-y-8">
            {/* 1. Problem */}
            <section className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-3 shadow-2xs">
              <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground">
                Problem Statement
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {project.problemStatement}
              </p>
            </section>

            {/* 2. What You'll Build */}
            <section className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-3 shadow-2xs">
              <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground">
                What You&apos;ll Build
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {project.whatYoullBuild}
              </p>
            </section>

            {/* 3. Technology */}
            <section className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-4 shadow-2xs">
              <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground">
                Technology Stack
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {project.technologies.map((tech) => (
                  <div
                    key={tech}
                    className="p-3.5 rounded-xl border border-border bg-secondary/30 flex items-center gap-3"
                  >
                    <div className="w-9 h-9 rounded-lg bg-card border border-border flex items-center justify-center shrink-0">
                      <BrandIcon name={detectTechIcon(tech)} size={20} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-foreground truncate">{tech}</div>
                      <div className="text-[10px] font-mono text-muted-foreground">Primary Tool</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 4. Skills */}
            <section className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-4 shadow-2xs">
              <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground">
                Skills You&apos;ll Master
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-muted-foreground">
                {project.skills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-secondary/40 border border-border text-foreground font-medium"
                  >
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* 5. Requirements */}
            <section className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-4 shadow-2xs">
              <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground">
                Requirements &amp; Prerequisites
              </h2>
              <ul className="list-disc list-inside text-xs sm:text-sm text-muted-foreground space-y-2 leading-relaxed">
                {project.requirements.map((req, idx) => (
                  <li key={idx}>{req}</li>
                ))}
              </ul>
            </section>

            {/* 6. Milestones */}
            <section className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-6 shadow-2xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border pb-3 gap-2">
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground">
                    Guided Milestones ({project.milestones.length})
                  </h2>
                  <span className="text-xs font-mono text-muted-foreground">Step-by-Step Architecture</span>
                </div>
                <ContextualAxelButton
                  context="project"
                  topicTitle={`${project.title} - Milestone ${activeMilestone}`}
                  variant="compact"
                />
              </div>

              <div className="space-y-4">
                {project.milestones.map((m) => {
                  const isActive = activeMilestone === m.step
                  return (
                    <div
                      key={m.step}
                      className={`rounded-xl border p-4.5 transition-all ${
                        isActive
                          ? "border-primary/50 bg-secondary/30 shadow-2xs"
                          : "border-border bg-card hover:bg-secondary/20"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3.5">
                          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary font-mono font-bold text-xs shrink-0 mt-0.5">
                            {m.step}
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground text-sm">{m.title}</h3>
                            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                              {m.description}
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => setActiveMilestone(m.step)}
                          className="text-xs font-mono text-primary shrink-0 hover:underline cursor-pointer"
                        >
                          {isActive ? "Viewing" : "View"}
                        </button>
                      </div>

                      {isActive && (
                        <div className="mt-3.5 pt-3.5 border-t border-border/60 pl-11 space-y-2">
                          <div className="text-[11px] font-mono uppercase text-muted-foreground font-semibold">
                            Expected Deliverables:
                          </div>
                          <ul className="list-disc list-inside text-xs text-foreground/90 space-y-1 font-mono">
                            {m.deliverables.map((del, dIdx) => (
                              <li key={dIdx}>{del}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </section>

            {/* 7. Submission */}
            <section className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-5 shadow-2xs">
              <div className="space-y-1">
                <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground">
                  Project Submission &amp; Verification
                </h2>
                <p className="text-xs text-muted-foreground">
                  Submit your public GitHub repository and live deployment link for automated test checks.
                </p>
              </div>

              {submitted ? (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-mono flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Capstone submitted! Automated test runners will verify your build within 15 minutes.</span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-muted-foreground font-mono mb-1">
                      GitHub Repository URL:
                    </label>
                    <div className="relative">
                      <Github className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="url"
                        value={repoUrl}
                        onChange={(e) => setRepoUrl(e.target.value)}
                        placeholder="https://github.com/username/project-repo"
                        required
                        className="w-full h-10 pl-9 pr-3 rounded-xl border border-border bg-secondary text-foreground text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-muted-foreground font-mono mb-1">
                      Live Demo URL (Optional):
                    </label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="url"
                        value={demoUrl}
                        onChange={(e) => setDemoUrl(e.target.value)}
                        placeholder="https://my-project.vercel.app"
                        className="w-full h-10 pl-9 pr-3 rounded-xl border border-border bg-secondary text-foreground text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground hover:bg-[#EA5300] font-semibold text-xs transition-all shadow-xs cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit for Verification</span>
                  </button>
                </form>
              )}
            </section>

            {/* 8. Portfolio */}
            <section className="rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:p-8 space-y-4 shadow-2xs">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground">
                  Add to ASCI Portfolio
                </h2>
              </div>

              <div className="p-4 rounded-xl border border-border bg-card space-y-2">
                <div className="text-xs font-mono font-bold text-primary uppercase">
                  Recruiter Portfolio Showcase Preview
                </div>
                <div className="text-sm font-bold text-foreground">
                  {project.portfolioShowcase?.headline || `Built ${project.title}`}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {project.portfolioShowcase?.recruiterTakeaway || "Verified proof of work showcasing production system implementation and clean code standards."}
                </p>
                <div className="flex items-center gap-1.5 flex-wrap pt-1">
                  {(project.portfolioShowcase?.badges || ["Verified Capstone", "Clean Architecture"]).map((badge) => (
                    <span
                      key={badge}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-secondary border border-border text-foreground font-semibold"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* Sticky Sidebar Action Panel (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="rounded-2xl border border-border bg-card p-6 space-y-5 shadow-2xs sticky top-24">
              <div>
                <span className="text-[11px] font-mono uppercase text-muted-foreground block mb-1">
                  Capstone Credential
                </span>
                <div className="text-xl font-serif font-bold text-foreground">
                  ASCI Verified Capstone
                </div>
              </div>

              <div className="space-y-3 pt-3 border-t border-border/60 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Domain:</span>
                  <span className="font-bold text-foreground">{project.category}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Difficulty:</span>
                  <span className="font-bold text-foreground">{project.difficulty}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Estimated Time:</span>
                  <span className="font-bold text-foreground">{project.estimatedHours}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Milestones:</span>
                  <span className="font-bold text-foreground">{project.milestones.length} Steps</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Enrolled:</span>
                  <span className="font-bold text-foreground">{project.enrolledStudents} Scholars</span>
                </div>
              </div>

              <div className="pt-2 space-y-2">
                <button
                  type="button"
                  onClick={() => setEnrolled(!enrolled)}
                  className="w-full py-3 rounded-xl bg-primary text-primary-foreground hover:bg-[#EA5300] text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  {enrolled ? "Workspace Active ✓" : "Start Project"}
                </button>
                <ContextualAxelButton
                  context="project"
                  topicTitle={project.title}
                  className="w-full justify-center"
                />
              </div>

              <div className="pt-3 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1 font-mono text-[11px]">
                  <ShieldCheck className="h-3.5 w-3.5 text-primary" /> Verified Specification
                </span>
                <span className="font-mono text-[11px]">+ Certificate</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Sticky Bottom CTA */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-md border-t border-border p-3.5 px-4 pb-[calc(env(safe-area-inset-bottom)+0.875rem)] shadow-lg flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="text-[10px] font-mono uppercase text-primary font-bold truncate">
              {project.category} · {project.difficulty}
            </div>
            <div className="text-xs font-semibold text-foreground truncate">
              {project.estimatedHours} build time
            </div>
          </div>
          <button
            type="button"
            onClick={() => setEnrolled(!enrolled)}
            className="inline-flex items-center justify-center gap-2 px-5 h-11 rounded-xl bg-primary text-primary-foreground hover:bg-[#EA5300] text-xs font-bold transition-all shadow-xs cursor-pointer shrink-0"
          >
            <span>{enrolled ? "Workspace Active ✓" : "Start Project"}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
