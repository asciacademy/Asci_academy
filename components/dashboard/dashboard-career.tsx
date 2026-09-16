"use client"

import React, { useState } from "react"
import {
  Briefcase,
  Trophy,
  Users,
  FileCheck2,
  GraduationCap,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Search,
  ExternalLink,
  ShieldCheck,
  Building2,
  Calendar,
  CheckCircle2,
  Target
} from "lucide-react"
import { DashboardJobs } from "@/components/dashboard/dashboard-jobs"
import { DashboardHackathons } from "@/components/dashboard/dashboard-hackathons"
import { DashboardMentorship } from "@/components/dashboard/dashboard-mentorship"
import { DashboardResumeAts } from "@/components/dashboard/dashboard-resume-ats"
import { AxelStage } from "@/components/axel/axel-stage"

type CareerSubTab = "jobs" | "hackathons" | "mentorship" | "resume"

interface DashboardCareerProps {
  initialSubTab?: CareerSubTab
}

export function DashboardCareer({ initialSubTab = "jobs" }: DashboardCareerProps) {
  const [subTab, setSubTab] = useState<CareerSubTab>(initialSubTab)

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn" id="dashboard-career-hub-section">
      {/* Editorial Header Banner */}
      <div
        className="rounded-xl border border-stone-200 dark:border-stone-800 bg-card p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden"
        id="dashboard-career-hub-header"
      >
        <div className="space-y-2.5 max-w-2xl min-w-0">
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-mono uppercase tracking-wider bg-orange-500/10 text-accent border border-orange-500/20 font-semibold shrink-0 leading-none">
              <Sparkles className="w-3 h-3 text-accent shrink-0" />
              <span>Engineering Placement &amp; Opportunities</span>
            </span>
            <span className="text-xs font-mono text-muted-foreground shrink-0 flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-stone-300 dark:bg-stone-700 hidden sm:inline-block" />
              <span>ASCI Fellowship Network</span>
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-normal text-foreground flex items-start sm:items-center gap-2.5 leading-tight">
            <Briefcase className="w-6 h-6 text-accent shrink-0 mt-0.5 sm:mt-0" />
            <span className="break-words">Career Command Center</span>
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-xl">
            Verified high-impact software engineering roles, national hackathons, 1-on-1 industry mentorship, and automated ATS resume optimization.
          </p>
        </div>

        <div className="flex items-center gap-4 shrink-0 self-start md:self-auto">
          <AxelStage
            id="dashboard-career-robot-anchor"
            sectionId="dashboard-career-hub-header"
            label="Career Hub"
            emotion="happy"
            scale={0.44}
            size="sm"
          />
        </div>
      </div>

      {/* Sub-navigation Tabs */}
      <div className="flex flex-wrap items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-3 gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSubTab("jobs")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              subTab === "jobs"
                ? "bg-accent text-white font-semibold shadow-2xs"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Engineering Jobs</span>
          </button>
          <button
            onClick={() => setSubTab("hackathons")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              subTab === "hackathons"
                ? "bg-accent text-white font-semibold shadow-2xs"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>National Hackathons</span>
          </button>
          <button
            onClick={() => setSubTab("mentorship")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              subTab === "mentorship"
                ? "bg-accent text-white font-semibold shadow-2xs"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>1-on-1 Mentorship</span>
          </button>
          <button
            onClick={() => setSubTab("resume")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              subTab === "resume"
                ? "bg-accent text-white font-semibold shadow-2xs"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            <FileCheck2 className="w-3.5 h-3.5" />
            <span>Resume &amp; ATS Analyzer</span>
          </button>
        </div>

        <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-muted-foreground">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>All postings vetted for engineering quality</span>
        </div>
      </div>

      {/* Sub-Tab Content Rendering */}
      <div>
        {subTab === "jobs" && <DashboardJobs />}
        {subTab === "hackathons" && <DashboardHackathons />}
        {subTab === "mentorship" && <DashboardMentorship />}
        {subTab === "resume" && <DashboardResumeAts />}
      </div>
    </div>
  )
}
