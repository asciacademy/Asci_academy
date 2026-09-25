"use client"

import Link from "next/link"
import { ArrowRight, Trophy, Sparkles, Building, Briefcase } from "lucide-react"
import { CompanyLogo } from "@/components/ui/brand-ecosystem"
import { SectionHeader } from "@/components/discovery/section-header"
import { DiscoveryGrid } from "@/components/discovery/discovery-grid"

interface OpportunityItem {
  id: string
  title: string
  host: string
  logo: string
  type: "Competition" | "Hackathon" | "Internship" | "Full-Time Job"
  reward: string
  mode: string
  deadline: string
  href: string
}

const FEATURED_OPPORTUNITIES: OpportunityItem[] = [
  {
    id: "opp-1",
    title: "ASCI National Algorithm Grand Prix 2026",
    host: "Zerodha Tech",
    logo: "zerodha",
    type: "Competition",
    reward: "₹5,00,000 Prize",
    mode: "Online · 3,840 registered",
    deadline: "15 Oct",
    href: "/competitions",
  },
  {
    id: "opp-2",
    title: "NextGen Agentic AI & Systems Hackathon",
    host: "Google Cloud & ASCI",
    logo: "google",
    type: "Hackathon",
    reward: "₹3,50,000 Prize",
    mode: "Online · 2,910 registered",
    deadline: "22 Oct",
    href: "/competitions",
  },
  {
    id: "opp-3",
    title: "Software Engineering Intern — Summer 2026",
    host: "Google India",
    logo: "google",
    type: "Internship",
    reward: "₹1,15,000 / mo",
    mode: "Hyderabad / Bengaluru",
    deadline: "18 Oct",
    href: "/career?tab=internships",
  },
  {
    id: "opp-4",
    title: "Software Engineer — Core Infrastructure",
    host: "Zerodha",
    logo: "zerodha",
    type: "Full-Time Job",
    reward: "₹20 - 28 LPA",
    mode: "Bengaluru (Hybrid)",
    deadline: "5 days left",
    href: "/career?tab=jobs",
  },
]

export function FeaturedOpportunitiesRail() {
  const getTypeBadgeClass = (type: OpportunityItem["type"]) => {
    switch (type) {
      case "Competition":
        return "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20"
      case "Hackathon":
        return "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20"
      case "Internship":
        return "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20"
      case "Full-Time Job":
        return "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20"
    }
  }

  const getTypeIcon = (type: OpportunityItem["type"]) => {
    switch (type) {
      case "Competition":
        return <Trophy className="w-3 h-3" />
      case "Hackathon":
        return <Sparkles className="w-3 h-3" />
      case "Internship":
        return <Building className="w-3 h-3" />
      case "Full-Time Job":
        return <Briefcase className="w-3 h-3" />
    }
  }

  return (
    <section aria-labelledby="featured-opportunities-heading" className="space-y-3">
      {/* Universal Section Header */}
      <SectionHeader
        title="Featured Opportunities"
        subtitle="Top competitions, hackathons, internships, and hiring challenges"
        actionHref="/career"
        actionLabel="View All"
      />

      {/* Universal Discovery Grid with 4 Opportunity Types */}
      <DiscoveryGrid columns={4}>
        {FEATURED_OPPORTUNITIES.map((opp) => (
          <Link
            key={opp.id}
            href={opp.href}
            className="group flex flex-col justify-between p-3.5 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-secondary/30 transition-all shadow-2xs"
          >
            <div className="space-y-2.5">
              {/* Top Row: Visual Logo + Opportunity Tag */}
              <div className="flex items-center justify-between gap-2">
                <div className="w-8 h-8 rounded-lg bg-secondary/80 border border-border flex items-center justify-center shrink-0">
                  <CompanyLogo company={opp.logo} size={18} />
                </div>
                <span
                  className={`inline-flex items-center gap-1 text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border ${getTypeBadgeClass(
                    opp.type
                  )}`}
                >
                  {getTypeIcon(opp.type)}
                  <span>{opp.type}</span>
                </span>
              </div>

              {/* Title & Host */}
              <div>
                <h3 className="text-xs sm:text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                  {opp.title}
                </h3>
                <p className="text-[11px] text-muted-foreground mt-0.5 truncate">
                  {opp.host}
                </p>
              </div>

              {/* Highlight reward/compensation */}
              <div className="pt-1.5 border-t border-border/60">
                <span className="text-xs font-mono font-bold text-foreground">
                  {opp.reward}
                </span>
              </div>
            </div>

            {/* Footer details */}
            <div className="mt-3 pt-2 border-t border-border/60 flex items-center justify-between text-[11px] text-muted-foreground font-mono">
              <span className="truncate max-w-[120px]">{opp.mode}</span>
              <span className="text-primary font-semibold group-hover:translate-x-0.5 transition-transform">
                Explore →
              </span>
            </div>
          </Link>
        ))}
      </DiscoveryGrid>
    </section>
  )
}
