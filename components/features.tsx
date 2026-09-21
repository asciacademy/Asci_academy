"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import { gsap } from "gsap"
import { useScrollReveal } from "@/hooks/use-gsap"
import {
  Users,
  Code2,
  FolderGit2,
  Briefcase,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

interface PlatformStats {
  avgRating: string
  members: string
  projects: string
  paths: string
}

function useCountUp(target: string, active: boolean) {
  const [display, setDisplay] = useState(target)

  useEffect(() => {
    if (!active) return
    const num = parseFloat(target.replace(/[^0-9.]/g, ""))
    const suffix = target.replace(/[0-9.]/g, "")
    if (isNaN(num)) {
      setDisplay(target)
      return
    }

    const duration = 1200
    const step = 16
    const steps = duration / step
    const increment = num / steps
    let count = 0

    const timer = setInterval(() => {
      count += increment
      if (count >= num) {
        clearInterval(timer)
        setDisplay(target)
        return
      }
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
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setActive(true)
      },
      { threshold: 0.15 }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="text-right shrink-0">
      <p className="font-serif text-2xl sm:text-3xl lg:text-4xl text-foreground font-normal tracking-tight">
        {display}
      </p>
      <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-muted-foreground font-mono font-medium mt-0.5">
        {label}
      </p>
    </div>
  )
}

export function Features({ stats }: { stats?: PlatformStats }) {
  const features = [
    {
      id: "01",
      shortTab: "Mentorship",
      title: "1-on-1 Senior Engineer Mentorship",
      description:
        "Weekly 1-on-1 video calls and line-by-line code reviews with senior engineers to unblock hurdles and accelerate your engineering growth.",
      icon: Users,
      metric: stats?.avgRating || "4.9/5",
      metricLabel: "Learner Rating",
      tags: ["Weekly 1-on-1 Calls", "Code Reviews", "Architecture Guidance"],
      isSpan2: true,
    },
    {
      id: "02",
      shortTab: "Projects",
      title: "Production-Grade Projects",
      description:
        "Build and deploy production software from scratch: distributed caches, real-time collaboration engines, and cloud microservices.",
      icon: FolderGit2,
      metric: stats?.projects || "47+",
      metricLabel: "Shipped Repos",
      tags: ["Distributed Systems", "Cloud Apps", "Deployable Repos"],
      isSpan2: false,
    },
    {
      id: "03",
      shortTab: "Interviews",
      title: "Technical Interview Prep",
      description:
        "200+ curated problems covering data structures, dynamic programming, system design, and realistic mock technical rounds.",
      icon: Code2,
      metric: "200+",
      metricLabel: "Curated Problems",
      tags: ["Algorithms", "System Design", "Mock Rounds"],
      isSpan2: false,
    },
    {
      id: "04",
      shortTab: "Placement",
      title: "Career Coaching & Referrals",
      description:
        "Resume reviews, portfolio audits, mock interviews, and direct referrals to high-growth tech companies and top startups.",
      icon: Briefcase,
      metric: "94%",
      metricLabel: "Hiring Outcomes",
      tags: ["Resume Reviews", "Portfolio Audits", "Job Referrals"],
      isSpan2: true,
    },
  ]

  const [activeMobileIndex, setActiveMobileIndex] = useState(0)
  const mobileCarouselRef = useRef<HTMLDivElement>(null)
  const headerRef = useScrollReveal<HTMLDivElement>({ y: 30, duration: 0.7 })
  const desktopGridRef = useRef<HTMLDivElement>(null)

  const handleMobileTabClick = (index: number) => {
    setActiveMobileIndex(index)
    if (!mobileCarouselRef.current) return
    const cards = mobileCarouselRef.current.querySelectorAll(".mobile-feature-card")
    if (cards[index]) {
      cards[index].scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" })
    }
  }

  const handleCarouselScroll = useCallback(() => {
    if (!mobileCarouselRef.current) return
    const el = mobileCarouselRef.current
    const scrollLeft = el.scrollLeft
    const firstCard = el.querySelector(".mobile-feature-card") as HTMLElement
    if (!firstCard) return
    const cardWidth = firstCard.offsetWidth + 16
    const newIndex = Math.round(scrollLeft / cardWidth)
    if (newIndex >= 0 && newIndex < features.length && newIndex !== activeMobileIndex) {
      setActiveMobileIndex(newIndex)
    }
  }, [features.length, activeMobileIndex])

  const scrollNextMobile = () => {
    const nextIdx = Math.min(features.length - 1, activeMobileIndex + 1)
    handleMobileTabClick(nextIdx)
  }

  const scrollPrevMobile = () => {
    const prevIdx = Math.max(0, activeMobileIndex - 1)
    handleMobileTabClick(prevIdx)
  }

  // Desktop GSAP entry animation
  useEffect(() => {
    if (!desktopGridRef.current) return
    const cards = desktopGridRef.current.querySelectorAll(".feature-bento-card")
    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: i * 0.08,
            ease: "power2.out",
            scrollTrigger: { trigger: card, start: "top 90%", toggleActions: "play none none none" },
          }
        )
      })
    }, desktopGridRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="features" className="relative py-14 sm:py-20 lg:py-28 bg-background border-y border-hairline overflow-hidden">
      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headerRef} className="relative mb-8 sm:mb-14 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 sm:gap-8">
          <div className="max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-medium text-primary mb-3 sm:mb-4 backdrop-blur-xs shadow-xs">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span className="tracking-widest uppercase font-mono text-[11px]">Why Learn With ASCI</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-normal tracking-tight text-foreground leading-[1.15]">
              Built to Help You Learn, Build, and Get Hired
            </h2>
            <p className="mt-2.5 sm:mt-4 text-xs sm:text-base text-muted-foreground leading-relaxed">
              Everything you need to master software engineering, build production projects, and land top engineering roles.
            </p>
          </div>

          {/* Dedicated Axel Stage: Reserved layout space on desktop */}
          <div className="hidden lg:flex relative shrink-0 w-64 h-48 items-center justify-center self-center lg:self-auto">
            <div
              id="features-robot-anchor"
              data-axel-anchor="true"
              data-section-id="features"
              data-emotion="excited"
              data-scale="0.95"
              data-label="Platform Features"
              className="w-full h-full relative flex items-center justify-center pointer-events-none select-none"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════
            MOBILE-FIRST COMPACT EXPERIENCE (< md)
            Reduces vertical scrolling by 75% via touch-first snap carousel
        ══════════════════════════════════════════════════════════ */}
        <div className="block md:hidden">
          {/* Thumb-friendly Segmented Pillar Switcher */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-3 -mx-4 px-4 mb-2">
            {features.map((feature, idx) => {
              const isActive = activeMobileIndex === idx
              return (
                <button
                  key={feature.id}
                  onClick={() => handleMobileTabClick(idx)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all active:scale-[0.98] cursor-pointer whitespace-nowrap min-h-[40px] ${
                    isActive
                      ? "bg-foreground text-background font-semibold shadow-xs"
                      : "border border-hairline bg-card/70 text-muted-foreground hover:text-foreground"
                  }`}
                  aria-label={`View ${feature.title}`}
                >
                  <span className="font-mono text-[10px] opacity-75">{feature.id}</span>
                  <span>{feature.shortTab}</span>
                </button>
              )
            })}
          </div>

          {/* Horizontal Snap Carousel */}
          <div
            ref={mobileCarouselRef}
            onScroll={handleCarouselScroll}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar -mx-4 px-4 py-2 scroll-smooth overscroll-x-contain"
          >
            {features.map((feature, idx) => {
              const IconComp = feature.icon
              return (
                <div
                  key={feature.id}
                  className="mobile-feature-card snap-center shrink-0 w-[82vw] max-w-[325px] rounded-3xl border border-hairline dark:border-white/10 bg-card/90 dark:bg-black/90 p-5 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    {/* Top Row: Icon + Index + Metric */}
                    <div className="flex items-start justify-between gap-3 pb-4 border-b border-hairline/60">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-hairline bg-secondary text-primary">
                          <IconComp className="h-5 w-5" />
                        </div>
                        <span className="font-mono text-xs font-bold text-primary tracking-wider uppercase">
                          {feature.id}
                        </span>
                      </div>

                      <StatMetric value={feature.metric} label={feature.metricLabel} />
                    </div>

                    {/* Title & Description */}
                    <div className="mt-4">
                      <h3 className="font-serif text-lg font-medium text-foreground leading-snug">
                        {feature.title}
                      </h3>
                      <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>

                  {/* Highlights Bulleted Tags */}
                  <div className="mt-5 pt-3 border-t border-hairline/60">
                    <ul className="space-y-1.5">
                      {feature.tags.map((b, bIdx) => (
                        <li key={bIdx} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary/70 shrink-0" />
                          <span className="line-clamp-1">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            })}
            {/* Trailing Spacer to prevent mobile right cut-off */}
            <div className="w-2 sm:hidden shrink-0 pointer-events-none select-none" aria-hidden="true" />
          </div>

          {/* Carousel Footer Controls: Dots + Prev/Next Tap */}
          <div className="flex items-center justify-between mt-3 px-1">
            <div className="flex items-center gap-1.5">
              {features.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleMobileTabClick(idx)}
                  className={`h-1.5 transition-all duration-200 rounded-full cursor-pointer ${
                    activeMobileIndex === idx ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/60"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={scrollPrevMobile}
                disabled={activeMobileIndex === 0}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-hairline bg-card/80 text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                aria-label="Previous feature"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={scrollNextMobile}
                disabled={activeMobileIndex === features.length - 1}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-hairline bg-card/80 text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                aria-label="Next feature"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════
            DESKTOP ASYMMETRICAL BENTO GRID (>= md)
        ══════════════════════════════════════════════════════════ */}
        <div ref={desktopGridRef} className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {features.map((feature) => {
            const IconComp = feature.icon
            return (
              <div
                key={feature.id}
                className={`feature-bento-card group relative flex flex-col justify-between rounded-3xl border border-hairline dark:border-white/10 bg-card/80 dark:bg-black/80 backdrop-blur-xl p-7 sm:p-9 transition-all duration-300 hover:border-primary/40 hover:-translate-y-1 shadow-xs ${
                  feature.isSpan2 ? "md:col-span-2 lg:col-span-2" : "md:col-span-1 lg:col-span-1"
                }`}
              >
                <div>
                  {/* Top Row: Icon + Index + Metric */}
                  <div className="flex items-start justify-between gap-4 pb-6 border-b border-hairline/70">
                    <div className="flex items-center gap-3.5">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-hairline bg-secondary/80 text-primary transition-all duration-200 group-hover:scale-105 group-hover:bg-primary/10 group-hover:border-primary/30 shadow-2xs">
                        <IconComp className="h-6 w-6" />
                      </div>
                      <span className="font-mono text-xs font-bold tracking-widest text-primary/80 uppercase">
                        {feature.id}
                      </span>
                    </div>

                    <StatMetric value={feature.metric} label={feature.metricLabel} />
                  </div>

                  {/* Middle Content: Title & Description */}
                  <div className="mt-6">
                    <h3 className="font-serif text-xl sm:text-2xl font-medium text-foreground tracking-tight leading-snug">
                      {feature.title}
                    </h3>
                    <p className="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
