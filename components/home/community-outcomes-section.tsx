"use client"

import React from "react"
import Link from "next/link"
import { Users, Trophy, FolderGit2, Award, ArrowRight, CheckCircle2 } from "lucide-react"

const PROOF_METRICS = [
  { value: "47+", label: "Curated Courses", desc: "Foundational to distributed systems" },
  { value: "157+", label: "Interactive Modules", desc: "With in-browser sandbox REPLs" },
  { value: "100+", label: "Projects & Challenges", desc: "474 Striver A2Z algorithm problems" },
  { value: "Verified", label: "Proof of Work", desc: "Cryptographic credentials & honors" },
]

const COMMUNITY_ACTIVITIES = [
  {
    name: "Rohan D.",
    action: "completed 5 milestones on",
    target: "Distributed Key-Value Store",
    time: "24m ago",
    badge: "Go & Docker",
  },
  {
    name: "Aditi R.",
    action: "submitted solution for",
    target: "AI Innovation Sprint",
    time: "1h ago",
    badge: "Google Cloud",
  },
  {
    name: "Devin V.",
    action: "earned credential in",
    target: "Python Production Systems",
    time: "3h ago",
    badge: "Verified",
  },
]

export function CommunityOutcomesSection() {
  return (
    <section aria-labelledby="community-outcomes-heading" className="space-y-6 pt-2">
      {/* ==============================================================
          SECTION 16: ASCI PROOF / OUTCOMES (Capability-based proof)
      ============================================================== */}
      <div className="p-4 sm:p-5 rounded-2xl border border-border bg-card shadow-xs">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 divide-y md:divide-y-0 md:divide-x divide-border/60">
          {PROOF_METRICS.map((metric, idx) => (
            <div key={metric.label} className={`space-y-1 ${idx !== 0 ? "pt-3 md:pt-0 md:pl-5" : ""}`}>
              <div className="text-xl sm:text-2xl font-serif font-bold text-foreground">
                {metric.value}
              </div>
              <div className="text-xs font-semibold text-foreground font-sans">
                {metric.label}
              </div>
              <div className="text-[11px] text-muted-foreground font-mono leading-tight">
                {metric.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ==============================================================
          SECTION 19: COMMUNITY ("Build. Share. Compete.")
      ============================================================== */}
      <div className="p-5 sm:p-6 rounded-2xl border border-border bg-secondary/30 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Left Headline */}
          <div className="space-y-2 max-w-md">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary border border-border text-[11px] font-mono font-semibold text-primary uppercase tracking-wider">
              <Users className="w-3.5 h-3.5" />
              <span>Developer Community</span>
            </div>

            <h3
              id="community-outcomes-heading"
              className="font-serif text-xl sm:text-2xl font-normal text-foreground tracking-tight"
            >
              Learn together.
            </h3>

            <p className="text-xs sm:text-sm text-muted-foreground">
              Build projects, solve algorithmic problems, and compete in sprints with peers across universities and engineering hubs.
            </p>

            <div className="text-xs font-mono font-bold text-primary">
              Build. Share. Compete.
            </div>
          </div>

          {/* Right: Real Student Activity Pulse */}
          <div className="flex-1 max-w-lg space-y-2">
            {COMMUNITY_ACTIVITIES.map((act) => (
              <div
                key={act.name}
                className="flex items-center justify-between gap-3 p-2.5 rounded-xl border border-border/70 bg-card text-xs font-sans shadow-2xs"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center shrink-0">
                    {act.name.charAt(0)}
                  </div>
                  <div className="min-w-0 truncate">
                    <span className="font-semibold text-foreground">{act.name}</span>{" "}
                    <span className="text-muted-foreground">{act.action}</span>{" "}
                    <span className="font-medium text-foreground">{act.target}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-secondary border border-border text-foreground">
                    {act.badge}
                  </span>
                  <span className="text-[10px] font-mono text-muted-foreground">{act.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
