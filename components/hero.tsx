"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  ArrowRight,
  ArrowUpRight,
  Users,
  BookOpen,
  FolderGit2,
  Briefcase,
  CheckCircle2,
  ShieldCheck,
  Star,
  Compass,
} from "lucide-react"
import { useAuth } from "@/context/auth-context"

interface Pillar {
  code: string
  label: string
  title: string
  desc: string
  meta: string
  icon: typeof Users
  href: string
}

const pillars: Pillar[] = [
  {
    code: "01",
    label: "MENTORING",
    title: "1-on-1 Mentoring",
    desc: "Weekly video calls and line-by-line code reviews with senior engineers.",
    meta: "Weekly 1:1 Video",
    icon: Users,
    href: "/community",
  },
  {
    code: "02",
    label: "LESSONS",
    title: "Step-by-Step Lessons",
    desc: "Over 200 bite-sized lessons with interactive visuals and zero setup.",
    meta: "200+ Visual Guides",
    icon: BookOpen,
    href: "/programs",
  },
  {
    code: "03",
    label: "PROJECTS",
    title: "Real Projects",
    desc: "Build and deploy production-grade web apps and algorithms to the cloud.",
    meta: "Production Cloud Apps",
    icon: FolderGit2,
    href: "/programs",
  },
  {
    code: "04",
    label: "CAREER",
    title: "Career Support",
    desc: "Tailored resume reviews, mock interviews, and personal job referrals.",
    meta: "Direct Job Referrals",
    icon: Briefcase,
    href: "/results",
  },
]

const alumni = ["Google", "Meta", "Stripe", "Vercel", "Amazon"]

const headlineWordVariants = {
  hidden: {
    y: "115%",
    opacity: 0,
    rotate: 1.5,
  },
  visible: (i: number) => ({
    y: "0%",
    opacity: 1,
    rotate: 0,
    transition: {
      duration: 0.75,
      delay: 0.08 + i * 0.07,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
}

export function Hero() {
  const { user: authUser } = useAuth()
  const [ctaHovered, setCtaHovered] = useState(false)

  const demoBypassUser = typeof document !== "undefined" && !authUser ? (() => {
    const match = document.cookie.match(/(^| )demo_bypass=([^;]+)/)
    return match ? { email: "demo@example.com" } : null
  })() : null

  const user = authUser || demoBypassUser

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("hero-cta-hover", { detail: { hovered: ctaHovered } })
    )
  }, [ctaHovered])

  return (
    <section
      id="hero-section"
      className="relative min-h-[100svh] flex flex-col justify-between bg-background pt-24 sm:pt-28 lg:pt-32 pb-4 sm:pb-5"
    >
      {/* Background layer with isolated overflow bounds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Architectural hairline grid — barely visible, intentional texture */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(to right, var(--foreground) 1px, transparent 1px),
              linear-gradient(to bottom, var(--foreground) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-between">
        <div>
          {/* ═══════════════════════════════════════════
              HEADLINE BLOCK & AXEL STAGE
          ═══════════════════════════════════════════ */}
          <div className="relative">
            <div className="max-w-3xl lg:max-w-xl xl:max-w-2xl">
              {/* Main headline — kinetic editorial reveal */}
              <h1 className="font-serif text-[clamp(2.4rem,6vw,4.2rem)] leading-[1.08] tracking-[-0.035em] text-foreground font-normal select-none">
                {/* Line 1: Learn coding */}
                <span className="block">
                  <span className="inline-block overflow-hidden pt-0.5 pb-2 -mb-2">
                    <motion.span
                      custom={0}
                      variants={headlineWordVariants}
                      initial="hidden"
                      animate="visible"
                      className="inline-block mr-[0.28em]"
                    >
                      Learn
                    </motion.span>
                  </span>
                  <span className="inline-block overflow-hidden pt-0.5 pb-2 -mb-2">
                    <motion.span
                      custom={1}
                      variants={headlineWordVariants}
                      initial="hidden"
                      animate="visible"
                      className="inline-block"
                    >
                      coding
                    </motion.span>
                  </span>
                </span>

                {/* Line 2: and algorithms, the simple way. */}
                <span className="block">
                  <span className="inline-block overflow-hidden pt-0.5 pb-2 -mb-2">
                    <motion.span
                      custom={2}
                      variants={headlineWordVariants}
                      initial="hidden"
                      animate="visible"
                      className="inline-block mr-[0.28em]"
                    >
                      and
                    </motion.span>
                  </span>
                  <span className="inline-block overflow-hidden pt-0.5 pb-2 -mb-2">
                    <motion.span
                      custom={3}
                      variants={headlineWordVariants}
                      initial="hidden"
                      animate="visible"
                      className="inline-block mr-[0.28em]"
                    >
                      algorithms,
                    </motion.span>
                  </span>{" "}
                  <span className="relative inline-block overflow-visible">
                    <span className="inline-block overflow-hidden pt-0.5 pb-2 -mb-2">
                      <motion.span
                        custom={4}
                        variants={headlineWordVariants}
                        initial="hidden"
                        animate="visible"
                        className="italic text-primary inline-block"
                      >
                        <span className="text-primary">
                          the simple way
                        </span>
                        <span className="text-primary font-normal not-italic">.</span>
                      </motion.span>
                    </span>

                    {/* Hand-drawn editorial SVG underline curve */}
                    <svg
                      className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-2.5 sm:h-3.5 text-primary/45 dark:text-primary/60 overflow-visible pointer-events-none"
                      viewBox="0 0 260 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <motion.path
                        d="M 3 8 C 75 2.5, 185 2.5, 257 9.5"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{
                          duration: 0.75,
                          delay: 0.65,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      />
                    </svg>
                  </span>
                </span>
              </h1>

              {/* Sub-headline — restrained, warm */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="mt-5 text-[15px] sm:text-base leading-relaxed text-body max-w-lg"
              >
                Clear, step-by-step courses in programming, data structures,
                and web development. Practice with interactive visual guides
                and get feedback from experienced mentors.
              </motion.p>

              {/* Confidence pills */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="mt-5 flex flex-wrap items-center gap-2"
              >
                {["Beginner Friendly", "Zero Setup Needed", "Live Visual Feedback"].map((label) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium text-muted-foreground bg-secondary border border-hairline-soft"
                  >
                    <CheckCircle2 className="h-3 w-3 text-primary" />
                    {label}
                  </span>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3.5"
              >
                {user ? (
                  <>
                    <Link
                      href="/dashboard"
                      onMouseEnter={() => setCtaHovered(true)}
                      onMouseLeave={() => setCtaHovered(false)}
                      className="group inline-flex items-center gap-2 rounded-full bg-primary hover:bg-primary-active text-primary-foreground px-6 py-3 text-sm font-semibold tracking-tight shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                    >
                      <span>Go to Dashboard</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                    <Link
                      href="/programs"
                      className="inline-flex items-center gap-2 rounded-full border border-hairline hover:border-primary/30 bg-card/60 hover:bg-card px-5 py-3 text-sm font-medium text-foreground transition-all cursor-pointer"
                    >
                      <Compass className="h-4 w-4 text-muted-foreground" />
                      <span>Browse All Courses</span>
                    </Link>
                  </>
                ) : (
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <Link
                        href="/signup"
                        onMouseEnter={() => setCtaHovered(true)}
                        onMouseLeave={() => setCtaHovered(false)}
                        className="group inline-flex items-center gap-2 rounded-full bg-primary hover:bg-primary-active text-primary-foreground px-6 py-3 text-sm font-semibold tracking-tight shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                      >
                        <span>Start Learning Free</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                      <Link
                        href="/programs"
                        className="inline-flex items-center gap-2 rounded-full border border-hairline hover:border-primary/30 bg-card/60 hover:bg-card px-5 py-3 text-sm font-medium text-foreground transition-all cursor-pointer"
                      >
                        <Compass className="h-4 w-4 text-muted-foreground" />
                        <span>Explore All Courses</span>
                      </Link>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground">
                      <ShieldCheck className="h-3.5 w-3.5 text-primary/70" />
                      <span>No credit card needed · Free instant access</span>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>

            {/* 3D Robot Hero Stage Anchor — Fully responsive: below CTAs on mobile/tablet, right side on desktop */}
            <div
              id="hero-robot-anchor"
              className="relative mx-auto mt-6 sm:mt-8 w-[280px] sm:w-[320px] h-[260px] sm:h-[300px] flex lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 lg:w-[340px] xl:w-[420px] lg:h-[340px] xl:h-[380px] lg:mt-0 items-center justify-center pointer-events-none select-none"
              aria-hidden="true"
            />
          </div>

        {/* ═══════════════════════════════════════════
            PILLAR BENTO — Asymmetric editorial cards
        ═══════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-14 lg:mt-16"
        >
          {/* Section label */}
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px flex-1 bg-hairline" />
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
              What you get
            </span>
            <div className="h-px flex-1 bg-hairline" />
          </div>

          {/* Asymmetric bento: first two cards tall, last two shorter side-by-side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {pillars.map((p, i) => {
              const IconComponent = p.icon
              // First card spans 2 rows on large screens for asymmetry
              const isFeature = i === 0
              return (
                <Link
                  key={p.code}
                  href={p.href}
                  className={`group relative rounded-2xl border border-hairline dark:border-white/[0.06] bg-card/50 dark:bg-[#1a1917]/60 backdrop-blur-xs p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 hover:border-primary/30 hover:bg-card/80 dark:hover:bg-[#1e1d1a]/80 hover:shadow-lg hover:shadow-primary/[0.03] ${
                    isFeature ? "lg:row-span-2" : ""
                  }`}
                >
                  {/* Top row: number + category */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-[10px] font-semibold tracking-widest text-primary/80">
                        {p.code} / {p.label}
                      </span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                    </div>

                    {/* Icon + Title */}
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-9 h-9 rounded-xl bg-primary/[0.08] border border-primary/[0.12] flex items-center justify-center text-primary shrink-0 group-hover:scale-105 transition-transform">
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="text-[15px] font-semibold text-foreground tracking-tight group-hover:text-primary transition-colors leading-tight">
                          {p.title}
                        </h3>
                        <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                          {p.desc}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Bottom metadata */}
                  <div className="mt-4 pt-3 border-t border-hairline-soft dark:border-white/[0.04] flex items-center justify-between">
                    <span className="text-[11px] font-mono font-medium text-primary/80">{p.meta}</span>
                    <span className="text-[10px] font-mono text-muted-foreground/50 group-hover:text-foreground transition-colors flex items-center gap-0.5">
                      Explore <ArrowRight className="h-2.5 w-2.5" />
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </motion.div>
        </div>

        {/* ═══════════════════════════════════════════
            SOCIAL PROOF — Editorial strip
        ═══════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-6 lg:mt-8 pb-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-hairline pt-4"
        >
          {/* Left: Rating + learner count */}
          <div className="flex items-center gap-4">
            {/* Avatar stack */}
            <div className="flex -space-x-2.5">
              {["A", "S", "M", "R"].map((letter, i) => {
                const colors = [
                  "bg-primary/15 text-primary",
                  "bg-amber-500/15 text-amber-600 dark:text-amber-400",
                  "bg-stone-400/15 text-stone-600 dark:text-stone-400",
                  "bg-orange-500/15 text-orange-600 dark:text-orange-400",
                ]
                return (
                  <div
                    key={letter}
                    className={`w-7 h-7 rounded-full ${colors[i]} border-2 border-background flex items-center justify-center text-[10px] font-bold`}
                  >
                    {letter}
                  </div>
                )
              })}
              <div className="w-7 h-7 rounded-full bg-muted border-2 border-background flex items-center justify-center text-[10px] font-bold text-muted-foreground">
                +
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-amber-500 text-amber-500" />
                ))}
              </div>
              <span className="text-xs font-semibold text-foreground">4.9</span>
              <span className="text-muted-foreground/30">·</span>
              <span className="text-xs text-muted-foreground">2,400+ active learners</span>
            </div>
          </div>

          {/* Right: Alumni placements */}
          <div className="flex items-center gap-2 text-[11px] font-mono">
            <span className="text-muted-foreground/50 uppercase tracking-wider text-[10px]">
              Alumni at
            </span>
            {alumni.map((name, i) => (
              <span key={name} className="flex items-center gap-2">
                {i > 0 && <span className="text-hairline">·</span>}
                <span className="text-foreground/70 font-medium">{name}</span>
              </span>
            ))}
          </div>
        </motion.div>
      </div>


    </section>
  )
}
