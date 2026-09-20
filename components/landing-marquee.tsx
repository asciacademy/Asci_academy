"use client"

import { Award, Sparkles } from "lucide-react"

const partners = [
  { name: "Google", badge: "Career Certificates", color: "#4285F4" },
  { name: "DeepLearning.AI", badge: "GenAI Research", color: "#FF5722" },
  { name: "IBM", badge: "Skills Network", color: "#054ADA" },
  { name: "Microsoft", badge: "Learn Certified", color: "#00A4EF" },
  { name: "HarvardX", badge: "Computer Science", color: "#A51C30" },
  { name: "Anthropic", badge: "Claude AI", color: "#6366F1" },
  { name: "AWS", badge: "Cloud Architecture", color: "#FF9900" },
  { name: "Meta", badge: "Open Source AI", color: "#0668E1" },
  { name: "Linux Foundation", badge: "CNCF & K8s", color: "#003366" },
  { name: "Vercel", badge: "Frontend Infrastructure", color: "#000000" },
  { name: "ASCI Institute", badge: "Accredited Academy", color: "#2563EB" },
]

export function LandingMarquee() {
  return (
    <section className="relative overflow-hidden border-y border-hairline bg-secondary/70 dark:bg-card/40 py-4 w-full backdrop-blur-xs">
      {/* Top subtle eyebrow */}
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 mb-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
          <Award className="h-3 w-3 text-primary" />
          <span>Curriculum Aligned with Premier Tech Leaders &amp; Universities</span>
        </div>
        <div className="hidden md:flex items-center gap-2 text-[10px] font-mono text-muted-foreground/70">
          <Sparkles className="h-3 w-3 text-amber-500" />
          <span>Industry-Recognized Specializations</span>
        </div>
      </div>

      {/* Marquee row */}
      <div className="flex whitespace-nowrap items-center w-max py-1 animate-marquee" style={{ animationDuration: '45s' }}>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="mx-4 flex items-center gap-6">
            {partners.map((p, idx) => (
              <div
                key={`${p.name}-${idx}`}
                className="group inline-flex items-center gap-2.5 rounded-xl border border-hairline bg-card/80 dark:bg-card/60 px-3.5 py-1.5 shadow-2xs transition-all duration-200 hover:border-primary/40 hover:bg-card hover:-translate-y-0.5 cursor-default select-none"
              >
                <div
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: p.color }}
                />
                <span className="text-xs sm:text-sm font-semibold tracking-tight text-foreground font-sans group-hover:text-primary transition-colors">
                  {p.name}
                </span>
                <span className="text-[10px] font-mono text-muted-foreground border-l border-hairline pl-2">
                  {p.badge}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
