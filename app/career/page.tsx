"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { DashboardJobs } from "@/components/dashboard/dashboard-jobs"
import { DashboardHackathons } from "@/components/dashboard/dashboard-hackathons"
import { DashboardMentorship } from "@/components/dashboard/dashboard-mentorship"
import { DashboardResumeAts } from "@/components/dashboard/dashboard-resume-ats"
import {
  Briefcase,
  Trophy,
  Users,
  FileCheck2,
  Building2,
  Flame,
  ArrowRight,
  ShieldCheck,
  Search,
} from "lucide-react"

type CareerTab = "jobs" | "internships" | "hackathons" | "competitions" | "mentorship" | "resume"

const TABS: { id: CareerTab; label: string; icon: typeof Briefcase; count?: string }[] = [
  { id: "jobs", label: "Software Jobs", icon: Briefcase, count: "18 Active" },
  { id: "internships", label: "Student Internships", icon: Building2, count: "12 Open" },
  { id: "hackathons", label: "Build Hackathons", icon: Trophy, count: "4 Live" },
  { id: "competitions", label: "Coding Contests", icon: Flame, count: "Weekly" },
  { id: "mentorship", label: "1-on-1 Mentorship", icon: Users, count: "Book Slot" },
  { id: "resume", label: "Resume ATS Scanner", icon: FileCheck2, count: "AI Match" },
]

function CareerContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const tabParam = (searchParams.get("tab") as CareerTab) || "jobs"
  const [activeTab, setActiveTab] = useState<CareerTab>(tabParam)

  useEffect(() => {
    if (tabParam && tabParam !== activeTab) {
      setActiveTab(tabParam)
    }
  }, [tabParam])

  const handleTabChange = (tab: CareerTab) => {
    setActiveTab(tab)
    router.push(`/career?tab=${tab}`, { scroll: false })
  }

  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex-1">
      {/* Tab Navigation Ribbon */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-border/60 no-scrollbar">
        {TABS.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id

          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all shrink-0 cursor-pointer ${
                isActive
                  ? "bg-primary text-white font-semibold shadow-xs"
                  : "bg-card border border-border/80 text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.count && (
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Active Tab View */}
      <div className="animate-fadeIn">
        {activeTab === "jobs" && <DashboardJobs />}
        {activeTab === "internships" && <DashboardJobs />}
        {activeTab === "hackathons" && <DashboardHackathons />}
        {activeTab === "competitions" && <DashboardHackathons />}
        {activeTab === "mentorship" && <DashboardMentorship />}
        {activeTab === "resume" && <DashboardResumeAts />}
      </div>
    </div>
  )
}

export default function CareerPage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20 selection:text-primary pb-16 md:pb-0">
      <Navbar />

      {/* Hero Banner */}
      <section className="pt-24 sm:pt-28 pb-8 sm:pb-12 border-b border-border/60 bg-secondary/20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1 text-xs font-mono font-medium text-primary shadow-2xs">
              <span>UNSTOP-INSPIRED OPPORTUNITY LAYER</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-foreground tracking-tight">
              Career &amp; Opportunity Hub
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Discover verified software engineering openings, paid student internships, national hackathons, and 1-on-1 code mentorship matched directly to your ASCI technical credentials.
            </p>
          </div>
        </div>
      </section>

      {/* Suspense-wrapped query param content */}
      <Suspense fallback={<div className="p-12 text-center font-mono text-xs text-muted-foreground">Loading Career Opportunities...</div>}>
        <CareerContent />
      </Suspense>

      <Footer showCTA={false} />
    </main>
  )
}
