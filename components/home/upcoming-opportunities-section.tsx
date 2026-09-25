"use client"

import React, { useState, useMemo } from "react"
import Link from "next/link"
import { ArrowRight, Trophy, Sparkles, Building, Briefcase, MapPin, Clock } from "lucide-react"
import { BrandIcon } from "@/components/ui/brand-icon"

type OpportunityCategory = "All" | "Hackathons" | "Competitions" | "Internships" | "Jobs"

interface OpportunityData {
  id: string
  title: string
  organization: string
  logo: string
  category: "Hackathons" | "Competitions" | "Internships" | "Jobs"
  deadline: string
  location: string
  reward: string
  href: string
}

const OPPORTUNITIES: OpportunityData[] = [
  {
    id: "opp-1",
    title: "AI Innovation Sprint 2026",
    organization: "Google Cloud",
    logo: "google",
    category: "Hackathons",
    deadline: "Ends in 8 days",
    location: "Online",
    reward: "₹50,000 Prize",
    href: "/competitions/google-summer-algorithm-sprint-2026",
  },
  {
    id: "opp-2",
    title: "National Algorithm Grand Prix",
    organization: "Zerodha",
    logo: "zerodha",
    category: "Competitions",
    deadline: "15 Oct 2026",
    location: "Online",
    reward: "₹5,00,000 Pool",
    href: "/competitions/asci-national-algorithm-grand-prix-2026",
  },
  {
    id: "opp-3",
    title: "Software Engineer Intern",
    organization: "Google India",
    logo: "google",
    category: "Internships",
    deadline: "18 Oct 2026",
    location: "Bangalore / Remote",
    reward: "₹1,15,000 / mo",
    href: "/career",
  },
  {
    id: "opp-4",
    title: "Backend Platform Engineer",
    organization: "Razorpay",
    logo: "razorpay",
    category: "Jobs",
    deadline: "24 Oct 2026",
    location: "Bengaluru",
    reward: "₹22 - 30 LPA",
    href: "/career",
  },
  {
    id: "opp-5",
    title: "Autonomous Agent Hackathon",
    organization: "Microsoft",
    logo: "microsoft",
    category: "Hackathons",
    deadline: "30 Oct 2026",
    location: "Online",
    reward: "₹3,00,000 Prize",
    href: "/competitions",
  },
  {
    id: "opp-6",
    title: "AI/ML Engineering Intern",
    organization: "Amazon",
    logo: "amazon",
    category: "Internships",
    deadline: "12 Oct 2026",
    location: "Hyderabad",
    reward: "₹95,000 / mo",
    href: "/career",
  },
]

export function UpcomingOpportunitiesSection() {
  const [selectedTab, setSelectedTab] = useState<OpportunityCategory>("All")

  const filteredOpportunities = useMemo(() => {
    if (selectedTab === "All") return OPPORTUNITIES
    return OPPORTUNITIES.filter((item) => item.category === selectedTab)
  }, [selectedTab])

  const tabs: OpportunityCategory[] = [
    "All",
    "Hackathons",
    "Competitions",
    "Internships",
    "Jobs",
  ]

  return (
    <section aria-labelledby="opportunities-heading" className="space-y-4">
      {/* Header & Tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border/70 pb-3">
        <div>
          <h2
            id="opportunities-heading"
            className="font-serif text-2xl sm:text-[28px] font-normal tracking-tight text-foreground"
          >
            Opportunities you can join
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Participate in sponsored hackathons, algorithm sprints, verified internships, and full-time engineering roles.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setSelectedTab(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedTab === tab
                  ? "bg-foreground text-background shadow-xs"
                  : "bg-secondary/60 hover:bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
        {filteredOpportunities.map((opp) => (
          <div
            key={opp.id}
            className="group flex flex-col justify-between p-4 rounded-2xl border border-border bg-card hover:border-primary/50 hover:bg-secondary/30 transition-all shadow-xs"
          >
            <div className="space-y-3">
              {/* Top Row: Organizer Logo + Category Tag */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-secondary/80 border border-border flex items-center justify-center shrink-0">
                    <BrandIcon name={opp.logo} size={20} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-foreground truncate">
                      {opp.organization}
                    </div>
                    <div className="text-[11px] text-muted-foreground flex items-center gap-1 truncate">
                      <MapPin className="w-3 h-3 shrink-0" />
                      <span>{opp.location}</span>
                    </div>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                    opp.category === "Hackathons"
                      ? "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20"
                      : opp.category === "Competitions"
                      ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                      : opp.category === "Internships"
                      ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
                      : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                  }`}
                >
                  {opp.category}
                </span>
              </div>

              {/* Title & Reward */}
              <div>
                <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">
                  {opp.title}
                </h3>
                <div className="text-xs font-mono font-bold text-primary mt-1">
                  {opp.reward}
                </div>
              </div>
            </div>

            {/* Bottom Meta & CTA */}
            <div className="mt-3.5 pt-2.5 border-t border-border/70 flex items-center justify-between text-xs">
              <span className="text-[11px] font-mono text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" />
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
