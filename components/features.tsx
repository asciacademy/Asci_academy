"use client"

import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { useScrollReveal } from "@/hooks/use-gsap"
import { AsciIcon } from "@/components/icons"
import {
  Users,
  Code2,
  FolderGit2,
  Terminal,
  Briefcase,
  MessageSquare,
  Braces,
  Route,
  Compass,
} from "lucide-react"

interface PlatformStats {
  avgRating: string
  members: string
  projects: string
  paths: string
}

function useCountUp(target: string, active: boolean) {
  const [display, setDisplay] = useState("0")
  useEffect(() => {
    if (!active) return
    const num = parseFloat(target.replace(/[^0-9.]/g, ""))
    const suffix = target.replace(/[0-9.]/g, "")
    if (isNaN(num)) { setDisplay(target); return }
    let start = 0
    const duration = 1400
    const step = 16
    const steps = duration / step
    const increment = num / steps
    let count = 0
    const timer = setInterval(() => {
      count += increment
      if (count >= num) { clearInterval(timer); setDisplay(target); return }
      setDisplay(count >= 10 ? Math.floor(count).toString() + suffix : count.toFixed(1) + suffix)
    }, step)
    return () => clearInterval(timer)
  }, [target, active])
  return display
}

function StatMetric({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)
  const display = useCountUp(value, active)

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setActive(true) }, { threshold: 0.5 })
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="text-right">
      <p className="font-serif text-2xl sm:text-3xl text-foreground font-normal tracking-tight">{display}</p>
      <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">{label}</p>
    </div>
  )
}

export function Features({ stats }: { stats?: PlatformStats }) {
  const features = [
    {
      id: "01", title: "1-on-1 Mentorship",
      description: "Weekly friendly calls with experienced software developers. Get code reviews, ask any question, and get clear guidance whenever you get stuck.",
      icon: Users, metric: stats?.avgRating || "4.9/5", metricLabel: "Avg. Rating",
    },
    {
      id: "02", title: "Coding Interview Prep",
      description: "200+ selected coding problems with simple, step-by-step explanations covering lists, trees, graphs, and search algorithms.",
      icon: Code2, metric: "200+", metricLabel: "Problems",
    },
    {
      id: "03", title: "Real Working Projects",
      description: "Build real web applications from scratch. Connect real databases, deploy them online, and build a portfolio employers can test.",
      icon: FolderGit2, metric: stats?.projects || "12+", metricLabel: "Shipped Apps",
    },
    {
      id: "04", title: "Live Coding Sessions",
      description: "Join weekly live coding sessions where mentors build real features and explain every line and decision in plain, simple English.",
      icon: Terminal, metric: "5x", metricLabel: "Per Week",
    },
    {
      id: "05", title: "Career Guidance",
      description: "Resume reviews, clean portfolio building, practice interview sessions, and direct job recommendations to hiring companies.",
      icon: Briefcase, metric: "94%", metricLabel: "Placement",
    },
    {
      id: "06", title: "Helpful Community",
      description: "Connect with friendly fellow learners. Share project ideas, study together for interviews, and help each other grow.",
      icon: MessageSquare, metric: stats?.members || "2.4K+", metricLabel: "Members",
    },
    {
      id: "07", title: "Visual Algorithm Tools",
      description: "Watch how sorting, searching, and memory work with easy-to-understand, interactive visual step-by-step tools.",
      icon: Braces, metric: "50+", metricLabel: "Visualizers",
    },
    {
      id: "08", title: "Step-by-Step Roadmaps",
      description: "Clear, ordered study plans that take you from total beginner to job-ready developer without feeling overwhelmed.",
      icon: Route, metric: stats?.paths || "8", metricLabel: "Tracks",
    },
  ]

  const headerRef = useScrollReveal<HTMLDivElement>({ y: 30, duration: 0.7 })
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!gridRef.current) return
    const cards = gridRef.current.querySelectorAll(".feature-card")
    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        gsap.fromTo(card,
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.6, delay: i * 0.05, ease: "power2.out",
            scrollTrigger: { trigger: card, start: "top 90%", toggleActions: "play none none none" },
          }
        )
      })
    }, gridRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="features" className="relative py-20 lg:py-28 bg-secondary/50 border-y border-hairline">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Header */}
        {/* Header with Dedicated Axel Stage */}
        <div ref={headerRef} className="relative mb-14 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="max-w-2xl text-left">
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-primary font-medium mb-3">
              <Compass className="h-3.5 w-3.5" />
              <span>Why Learn With Us</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-foreground" style={{ letterSpacing: "-1px" }}>
              Built to Help You Learn and Grow
            </h2>
            <p className="mt-3 max-w-xl text-sm sm:text-base text-body leading-relaxed">
              Everything you need to learn coding, build practical software, and get hired — explained simply without confusing jargon.
            </p>
          </div>

          {/* Dedicated Axel Stage: Reserved layout space so nothing overlays */}
          <div className="hidden lg:flex relative shrink-0 w-64 h-56 items-center justify-center self-center lg:self-auto">
            <div
              id="features-robot-anchor"
              className="w-full h-full relative flex items-center justify-center pointer-events-none select-none"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Feature Bento Grid */}
        <div ref={gridRef} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => {
            const isWide = i < 2
            return (
              <div
                key={feature.id}
                className={`feature-card group relative flex flex-col rounded-2xl border border-hairline dark:border-white/[0.08] bg-card/80 dark:bg-[#181715]/80 p-6 sm:p-8 transition-all duration-200 hover:border-foreground/30 dark:hover:border-white/25 hover:-translate-y-0.5 shadow-2xs ${
                  isWide ? "lg:col-span-2" : ""
                }`}
              >
                {/* Top row: icon + index + metric */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`flex items-center justify-center rounded-xl border border-hairline bg-secondary text-primary transition-all group-hover:scale-105 group-hover:border-foreground/20 ${
                      isWide ? "h-12 w-12" : "h-10 w-10"
                    }`}>
                      <feature.icon className={isWide ? "h-6 w-6" : "h-5 w-5"} />
                    </div>
                    <span className="font-mono text-[10px] font-semibold tracking-widest text-muted-foreground/60 uppercase">
                      {feature.id}
                    </span>
                  </div>
                  <StatMetric value={feature.metric} label={feature.metricLabel} />
                </div>

                {/* Content */}
                <div className="mt-8 flex-1">
                  <h3 className={`font-serif tracking-tight text-foreground font-normal ${isWide ? "text-2xl" : "text-lg"}`}>
                    {feature.title}
                  </h3>
                  <p className="mt-2.5 leading-relaxed text-body text-xs sm:text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
