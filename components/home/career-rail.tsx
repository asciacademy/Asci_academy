"use client"

import React from "react"
import Link from "next/link"
import { ArrowRight, MapPin, Clock, Briefcase } from "lucide-react"
import { BrandIcon } from "@/components/ui/brand-icon"

const PARTNER_COMPANIES = [
  { name: "Google", logo: "google" },
  { name: "Microsoft", logo: "microsoft" },
  { name: "Amazon", logo: "amazon" },
  { name: "Adobe", logo: "adobe" },
  { name: "Razorpay", logo: "razorpay" },
  { name: "Zerodha", logo: "zerodha" },
]

const CAREER_OPPORTUNITIES = [
  {
    id: "opp-ai-intern",
    title: "AI/ML Intern",
    company: "Google",
    logo: "google",
    location: "Remote",
    skills: "Python · ML · LLM",
    deadline: "Apply by Oct 12",
    reward: "₹1,15,000 / mo",
    href: "/career",
  },
  {
    id: "opp-sys-intern",
    title: "Backend Systems Intern",
    company: "Microsoft",
    logo: "microsoft",
    location: "Bengaluru",
    skills: "Go · Docker · Kubernetes",
    deadline: "Apply by Oct 15",
    reward: "₹1,00,000 / mo",
    href: "/career",
  },
  {
    id: "opp-platform-swe",
    title: "Platform Software Engineer",
    company: "Razorpay",
    logo: "razorpay",
    location: "Bengaluru",
    skills: "Java · Distributed Systems",
    deadline: "Apply by Oct 20",
    reward: "₹20 - 28 LPA",
    href: "/career",
  },
  {
    id: "opp-cloud-intern",
    title: "Cloud Infrastructure Intern",
    company: "Amazon",
    logo: "amazon",
    location: "Hyderabad",
    skills: "Python · AWS · Networking",
    deadline: "Apply by Oct 25",
    reward: "₹95,000 / mo",
    href: "/career",
  },
]

export function CareerRail() {
  return (
    <section aria-labelledby="career-heading" className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-border/70 pb-3">
        <div>
          <h2
            id="career-heading"
            className="font-serif text-2xl sm:text-[28px] font-normal tracking-tight text-foreground"
          >
            Your skills should lead somewhere.
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Discover verified internships and full-time roles from engineering teams seeking demonstrable skill.
          </p>
        </div>
        <Link
          href="/career"
          className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
        >
          <span>All Career Roles</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Company Logos Strip */}
      <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto py-2 border-b border-border/50 scrollbar-none">
        <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider shrink-0">
          Opportunities from:
        </span>
        {PARTNER_COMPANIES.map((comp) => (
          <div
            key={comp.name}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/40 border border-border shrink-0 hover:bg-secondary transition-colors"
          >
            <BrandIcon name={comp.logo} size={16} />
            <span className="text-xs font-medium text-foreground">{comp.name}</span>
          </div>
        ))}
      </div>

      {/* Opportunity Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {CAREER_OPPORTUNITIES.map((opp) => (
          <div
            key={opp.id}
            className="group flex flex-col justify-between p-4 rounded-2xl border border-border bg-card hover:border-primary/50 hover:bg-secondary/30 transition-all shadow-xs"
          >
            <div className="space-y-3">
              {/* Company Logo & Location */}
              <div className="flex items-center justify-between gap-2">
                <div className="w-9 h-9 rounded-xl bg-secondary/80 border border-border flex items-center justify-center shrink-0">
                  <BrandIcon name={opp.logo} size={18} />
                </div>
                <span className="text-[11px] font-mono text-muted-foreground flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {opp.location}
                </span>
              </div>

              {/* Title & Skills */}
              <div>
                <h3 className="font-semibold text-sm font-sans text-foreground group-hover:text-primary transition-colors line-clamp-1">
                  {opp.title}
                </h3>
                <div className="text-xs text-muted-foreground mt-0.5">{opp.company}</div>
                <div className="mt-2 text-[11px] font-mono text-primary font-semibold truncate">
                  {opp.skills}
                </div>
              </div>
            </div>

            {/* Compensation & CTA */}
            <div className="mt-3.5 pt-2.5 border-t border-border/70 flex items-center justify-between text-xs">
              <span className="text-[11px] font-mono text-muted-foreground">
                {opp.deadline}
              </span>

              <Link
                href={opp.href}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground font-semibold text-xs transition-all cursor-pointer"
              >
                <span>View</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
