"use client"

import Link from "next/link"
import { ArrowRight, Briefcase, Trophy, Building2, MapPin, Clock, Calendar, CheckCircle2 } from "lucide-react"

interface OpportunityItem {
  id: string
  company: string
  title: string
  type: "Job" | "Internship" | "Hackathon"
  location: string
  compensationOrPrize: string
  skills: string[]
  daysLeft: number
  deadline: string
  href: string
}

const OPPORTUNITIES: OpportunityItem[] = [
  {
    id: "opp-1",
    company: "Razorpay",
    title: "Software Engineer Intern (Backend & Payments)",
    type: "Internship",
    location: "Bengaluru · Hybrid",
    compensationOrPrize: "₹45,000 / month",
    skills: ["Java", "Spring Boot", "Kafka", "SQL"],
    daysLeft: 4,
    deadline: "Sept 28, 2026",
    href: "/career?tab=internships",
  },
  {
    id: "opp-2",
    company: "ASCI National Build",
    title: "Autonomous AI Agent Challenge 2026",
    type: "Hackathon",
    location: "Online",
    compensationOrPrize: "₹75,000 Prize Pool",
    skills: ["Python", "LLMs", "FastAPI", "Next.js"],
    daysLeft: 8,
    deadline: "Oct 2, 2026",
    href: "/career?tab=hackathons",
  },
  {
    id: "opp-3",
    company: "Zerodha",
    title: "Junior Systems & Platform Engineer",
    type: "Job",
    location: "Remote",
    compensationOrPrize: "₹12–16 LPA",
    skills: ["Go", "Linux", "PostgreSQL", "Networking"],
    daysLeft: 6,
    deadline: "Sept 30, 2026",
    href: "/career?tab=jobs",
  },
]

export function CareerPreviewSection() {
  return (
    <section className="py-14 sm:py-20 border-b border-border/60 bg-secondary/20">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-primary mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span>Career &amp; Opportunity Discovery</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-foreground tracking-tight">
              Find Your Next Opportunity
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mt-2 max-w-xl">
              Software engineering jobs, paid internships, and national hackathons matched directly to your verified ASCI skills and project portfolio.
            </p>
          </div>
          <Link
            href="/career"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary hover:text-primary-active transition-colors shrink-0"
          >
            <span>Open Career Center</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {OPPORTUNITIES.map((opp) => (
            <div
              key={opp.id}
              className="rounded-2xl border border-border/80 bg-card p-5 hover:border-primary/40 transition-all duration-200 hover:shadow-sm flex flex-col justify-between"
            >
              <div>
                {/* Header Badge & Days Left */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={`text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-md ${
                      opp.type === "Hackathon"
                        ? "bg-purple-500/10 text-purple-600 dark:text-purple-400"
                        : opp.type === "Internship"
                        ? "bg-primary/10 text-primary"
                        : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    }`}
                  >
                    {opp.type}
                  </span>
                  <span className="text-[11px] font-mono text-amber-600 dark:text-amber-400 font-medium">
                    {opp.daysLeft} days left
                  </span>
                </div>

                <span className="text-xs font-mono text-muted-foreground block font-medium">
                  {opp.company}
                </span>

                <h3 className="text-base font-semibold text-foreground mt-1 tracking-tight leading-snug">
                  {opp.title}
                </h3>

                <div className="flex items-center gap-3 mt-3 text-xs font-mono text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{opp.location}</span>
                  </div>
                  <span>·</span>
                  <span className="font-semibold text-foreground">
                    {opp.compensationOrPrize}
                  </span>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5 mt-3.5">
                  {opp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-secondary border border-border/60 text-muted-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="pt-4 mt-4 border-t border-border/60">
                <Link
                  href={opp.href}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-secondary hover:bg-primary hover:text-white border border-border/80 hover:border-primary text-xs font-semibold text-foreground transition-all cursor-pointer text-center"
                >
                  <span>View Opportunity</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
