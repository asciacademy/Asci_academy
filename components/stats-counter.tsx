"use client"

import { useEffect, useRef, useState } from "react"
import { Users, BookOpen, TrendingUp, Star } from "lucide-react"

const stats = [
  {
    value: 240000,
    suffix: "+",
    label: "Active Learners",
    sublabel: "Across 40+ countries globally",
    icon: Users,
    badge: "Global Reach",
    accent: "from-blue-600/10 to-indigo-600/5",
  },
  {
    value: 94,
    suffix: "%",
    label: "Career Placement",
    sublabel: "Promotions, raises, or offers",
    icon: TrendingUp,
    badge: "Verified Outcomes",
    accent: "from-emerald-600/10 to-teal-600/5",
  },
  {
    value: 47,
    suffix: "+",
    label: "Specializations & Tracks",
    sublabel: "Aligned with industry pioneers",
    icon: BookOpen,
    badge: "Accredited",
    accent: "from-purple-600/10 to-pink-600/5",
  },
  {
    value: 4.9,
    suffix: "★",
    label: "Average Course Rating",
    sublabel: "From 62,000+ alumni reviews",
    icon: Star,
    badge: "Top Rated",
    accent: "from-amber-600/10 to-yellow-600/5",
  },
]

function useCountUpNumber(target: number, active: boolean, isDecimal = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) return
    let start = 0
    const duration = 1400
    const step = 16
    const steps = duration / step
    const increment = target / steps
    const timer = setInterval(() => {
      start += increment
      if (start >= target) {
        clearInterval(timer)
        setCount(target)
        return
      }
      setCount(start)
    }, step)
    return () => clearInterval(timer)
  }, [target, active])
  return isDecimal ? count.toFixed(1) : Math.floor(count).toLocaleString()
}

function StatCard({ stat }: { stat: typeof stats[0] }) {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)
  const isDecimal = stat.suffix === "★"
  const count = useCountUpNumber(stat.value, active, isDecimal)

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setActive(true)
    }, { threshold: 0.3 })
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-stone-200/90 dark:border-stone-800/90 bg-card/80 dark:bg-card/40 backdrop-blur-md p-6 transition-all duration-300 hover:border-primary/40 hover:-translate-y-1 shadow-xs"
    >
      <div>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-hairline bg-secondary text-primary mb-5 transition-transform duration-200 group-hover:scale-105">
          <stat.icon className="h-5 w-5" />
        </div>

        <div className="flex items-baseline gap-1">
          <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-foreground tracking-tight">
            {count}
          </span>
          <span className="font-serif text-2xl sm:text-3xl text-primary font-normal">
            {stat.suffix}
          </span>
        </div>

        <p className="mt-2 text-sm sm:text-base font-medium text-foreground tracking-tight">
          {stat.label}
        </p>
        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
          {stat.sublabel}
        </p>
      </div>
    </div>
  )
}

export function StatsCounter() {
  return (
    <section className="relative py-16 lg:py-20 bg-background overflow-hidden border-b border-border/40">
      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="mb-10 sm:mb-12 max-w-2xl text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-[11px] font-mono font-medium text-primary uppercase tracking-widest mb-3 backdrop-blur-xs shadow-xs">
            <span>Demonstrated Impact</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground font-normal tracking-tight leading-tight">
            Education engineered for real career transformation
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
            Our curriculum and mentors empower learners from over 40 countries to master systems programming, artificial intelligence, and software engineering.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  )
}
