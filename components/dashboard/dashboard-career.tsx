"use client"

import React, { useState, useEffect } from "react"
import {
  Briefcase,
  Trophy,
  Users,
  FileCheck2,
} from "lucide-react"
import { DashboardJobs } from "@/components/dashboard/dashboard-jobs"
import { DashboardHackathons } from "@/components/dashboard/dashboard-hackathons"
import { DashboardMentorship } from "@/components/dashboard/dashboard-mentorship"
import { DashboardResumeAts } from "@/components/dashboard/dashboard-resume-ats"

export type CareerSubTab = "jobs" | "hackathons" | "mentorship" | "resume"

interface DashboardCareerProps {
  initialSubTab?: CareerSubTab
}

const SUB_TABS: { id: CareerSubTab; label: string; icon: typeof Briefcase }[] = [
  { id: "jobs", label: "Jobs", icon: Briefcase },
  { id: "hackathons", label: "Hackathons", icon: Trophy },
  { id: "mentorship", label: "Mentorship", icon: Users },
  { id: "resume", label: "Resume", icon: FileCheck2 },
]

export function DashboardCareer({ initialSubTab = "jobs" }: DashboardCareerProps) {
  const [subTab, setSubTab] = useState<CareerSubTab>(initialSubTab)

  useEffect(() => {
    if (initialSubTab) {
      setSubTab(initialSubTab)
    }
  }, [initialSubTab])

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* Sub-navigation Tabs — Simple pills */}
      <div className="flex items-center gap-2 flex-wrap">
        {SUB_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSubTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer flex items-center gap-2 ${
              subTab === tab.id
                ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80 border border-hairline"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div>
        {subTab === "jobs" && <DashboardJobs />}
        {subTab === "hackathons" && <DashboardHackathons />}
        {subTab === "mentorship" && <DashboardMentorship />}
        {subTab === "resume" && <DashboardResumeAts />}
      </div>
    </div>
  )
}
