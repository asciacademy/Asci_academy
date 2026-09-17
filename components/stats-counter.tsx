"use client"

import { useEffect, useRef, useState } from "react"
import { Users, BookOpen, TrendingUp, Globe } from "lucide-react"

const stats = [
  { value: 2400, suffix: "+", label: "Students Enrolled", sublabel: "Across 40+ countries", icon: Users },
  { value: 94, suffix: "%", label: "Placement Rate", sublabel: "At top-tier tech companies", icon: TrendingUp },
  { value: 12, suffix: "+", label: "Programs Available", sublabel: "Foundational to Advanced", icon: BookOpen },
  { value: 40, suffix: "+", label: "Global Reach", sublabel: "Worldwide alumni network", icon: Globe },
]

function useCountUpNumber(target: number, active: boolean) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) return
    let start = 0
    const duration = 1600
    const step = 16
    const steps = duration / step
    const increment = target / steps
    const timer = setInterval(() => {
      start += increment
      if (start >= target) { clearInterval(timer); setCount(target); return }
      setCount(Math.floor(start))
    }, step)
    return () => clearInterval(timer)
  }, [target, active])
  return count
}

function StatCard({ stat }: { stat: typeof stats[0] }) {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)
  const count = useCountUpNumber(stat.value, active)

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setActive(true)
    }, { threshold: 0.5 })
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="group relative flex flex-col card-whisper p-6 card-interactive"
    >
      {/* Icon */}
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
        <stat.icon className="h-5 w-5" />
      </div>

      {/* Number */}
      <div className="mt-5">
        <div className="flex items-baseline gap-1">
          <span className="font-serif text-3xl sm:text-4xl text-foreground" style={{ letterSpacing: '-1px' }}>
            {count.toLocaleString()}
          </span>
          <span className="font-serif text-2xl text-primary">{stat.suffix}</span>
        </div>
        <p className="mt-2 font-medium text-foreground text-sm">{stat.label}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{stat.sublabel}</p>
      </div>
    </div>
  )
}

export function StatsCounter() {
  return (
    <section className="section-spacing overflow-hidden">
      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <span className="text-caption-uppercase text-primary mb-3 inline-block">
            Proven Results
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-foreground" style={{ letterSpacing: '-0.5px' }}>
            Helping thousands learn to code and land great jobs
          </h2>
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
