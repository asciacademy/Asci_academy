"use client"

import React, { useState } from "react"
import {
  Briefcase,
  Building2,
  MapPin,
  DollarSign,
  Clock,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Search,
  Filter,
  Layers,
  Target,
  ArrowRight,
  Shield,
  FileText,
  UserCheck,
  Check,
  X,
  Calendar,
  AlertCircle
} from "lucide-react"
import { useUnstopEcosystem, JobOpportunity } from "@/lib/unstop-store"
import { AxelStage } from "@/components/axel/axel-stage"

export function DashboardJobs() {
  const { jobs, applyForJob } = useUnstopEcosystem()
  const [filter, setFilter] = useState<"all" | "full-time" | "internship" | "applied">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedJobForApply, setSelectedJobForApply] = useState<JobOpportunity | null>(null)
  const [applicationNote, setApplicationNote] = useState("")
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3500)
  }

  const appliedJobs = jobs.filter((j) => j.applied)

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))

    if (!matchesSearch) return false

    if (filter === "applied") return job.applied
    if (filter === "full-time") return job.roleType === "Full-Time"
    if (filter === "internship") return job.roleType === "Internship"
    return true
  })

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedJobForApply) return

    applyForJob(selectedJobForApply.id, applicationNote)
    showToast(`Application successfully sent to ${selectedJobForApply.company}!`)
    setSelectedJobForApply(null)
    setApplicationNote("")
  }

  return (
    <div className="space-y-8 animate-fadeIn" id="dashboard-jobs-section">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-8 z-50 rounded-xl border border-primary/40 bg-card p-4 shadow-lg flex items-center gap-3 text-xs font-mono text-foreground animate-fadeIn">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ══════════════════════════════════════════════
          Header & Axel Anchor
      ══════════════════════════════════════════════ */}
      <div id="dashboard-jobs-header" className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-hairline">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 font-semibold">
              <Briefcase className="w-3 h-3" />
              Unstop Career Portal
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-foreground">
            Hiring Drives &amp; Opportunities Hub
          </h1>
          <p className="text-xs text-muted-foreground mt-1 max-w-2xl">
            Explore verified software engineering jobs, summer internships, and fast-track hiring pipelines with real-time stage tracking.
          </p>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          <AxelStage
            id="dashboard-jobs-robot-anchor"
            sectionId="dashboard-jobs-header"
            label="Placement Mentor"
            emotion="proud"
            scale={0.44}
            size="sm"
          />
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          Metrics Ribbon (Unstop Style)
      ══════════════════════════════════════════════ */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-hairline bg-card p-4.5 shadow-2xs">
          <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-primary" />
            Active Openings
          </span>
          <p className="text-xl font-serif font-normal text-foreground mt-1">{jobs.length}</p>
          <span className="text-[11px] text-muted-foreground mt-0.5 block">High-growth tech partners</span>
        </div>

        <div className="rounded-2xl border border-hairline bg-card p-4.5 shadow-2xs">
          <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <UserCheck className="w-3.5 h-3.5 text-[#D4B872]" />
            My Applications
          </span>
          <p className="text-xl font-serif font-normal text-foreground mt-1">{appliedJobs.length}</p>
          <span className="text-[11px] text-muted-foreground mt-0.5 block">
            {appliedJobs.length > 0 ? "Under active recruiter review" : "Ready to apply"}
          </span>
        </div>

        <div className="rounded-2xl border border-hairline bg-card p-4.5 shadow-2xs">
          <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
            Top Compensation
          </span>
          <p className="text-xl font-serif font-normal text-foreground mt-1">₹28 LPA</p>
          <span className="text-[11px] text-muted-foreground mt-0.5 block">Full-time Core SDE roles</span>
        </div>

        <div className="rounded-2xl border border-hairline bg-card p-4.5 shadow-2xs">
          <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5 text-primary" />
            Shortlist Match Rate
          </span>
          <p className="text-xl font-serif font-normal text-foreground mt-1">92% Match</p>
          <span className="text-[11px] text-muted-foreground mt-0.5 block">Based on your DSA &amp; projects</span>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          Search & Filter Tabs
      ══════════════════════════════════════════════ */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search roles by company, skills (Go, React, DSA)..."
            className="w-full bg-card border border-hairline rounded-xl pl-10 pr-4 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: "all", label: "All Drives" },
            { id: "applied", label: `My Applications (${appliedJobs.length})` },
            { id: "full-time", label: "Full-Time Jobs" },
            { id: "internship", label: "Summer Internships" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                filter === tab.id
                  ? "bg-card text-foreground border border-hairline font-semibold shadow-2xs"
                  : "text-muted-foreground hover:text-foreground hover:bg-card/50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          Jobs / Applications List
      ══════════════════════════════════════════════ */}
      {filter === "applied" && appliedJobs.length > 0 ? (
        /* Unstop 5-Stage Interactive Pipeline Tracker */
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-xl font-normal text-foreground">Active Application Pipelines</h2>
              <p className="text-xs text-muted-foreground">Real-time status updates synced with partner hiring systems.</p>
            </div>
          </div>

          <div className="space-y-4">
            {appliedJobs.map((job) => (
              <div
                key={job.id}
                className="rounded-2xl border border-hairline bg-card p-6 shadow-2xs space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-hairline">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-primary">{job.company}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-secondary text-muted-foreground border border-hairline">
                        {job.roleType}
                      </span>
                    </div>
                    <h3 className="font-serif text-xl font-normal text-foreground mt-0.5">{job.title}</h3>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-sm font-semibold text-foreground">{job.compensation}</span>
                    <span className="text-[11px] font-mono text-muted-foreground block">{job.location} • {job.workMode}</span>
                  </div>
                </div>

                {/* 5-Stage Stepper Tracker */}
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block mb-3">
                    Application Lifecycle Tracker
                  </span>

                  <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                    {[
                      { key: "applied", label: "1. Applied", desc: "Portfolio & Resume Submitted", done: true },
                      { key: "profile_viewed", label: "2. Under Review", desc: "Recruiter Screen in Progress", done: true },
                      { key: "assessment", label: "3. Coding Test", desc: "Proctored Skill Assessment", done: false },
                      { key: "interview", label: "4. Technical Round", desc: "System Design & Live Pair", done: false },
                      { key: "offered", label: "5. Offer Letter", desc: "Final Selection & CTC", done: false },
                    ].map((step, idx) => (
                      <div
                        key={step.key}
                        className={`p-3.5 rounded-xl border transition-all ${
                          step.done
                            ? "bg-secondary/60 border-primary/30 text-foreground"
                            : "bg-secondary/20 border-hairline/60 text-muted-foreground"
                        }`}
                      >
                        <div className="flex items-center gap-1.5 mb-1">
                          {step.done ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                          ) : (
                            <div className="w-3.5 h-3.5 rounded-full border border-muted-foreground/40 flex items-center justify-center text-[9px] font-mono">
                              {idx + 1}
                            </div>
                          )}
                          <span className="text-xs font-semibold">{step.label}</span>
                        </div>
                        <p className="text-[10px] text-muted-foreground leading-tight">{step.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="rounded-2xl border border-hairline bg-card/40 p-12 text-center">
          <Briefcase className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
          <h3 className="font-serif text-lg font-normal text-foreground">No Opportunities Found</h3>
          <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
            {filter === "applied"
              ? "You haven't submitted any job applications yet. Browse the hiring board below to fast-track your profile."
              : "Try adjusting your search criteria or switching filter tabs."}
          </p>
          {filter === "applied" && (
            <button
              onClick={() => setFilter("all")}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-xs font-medium hover:bg-primary-active transition-colors cursor-pointer"
            >
              <span>Explore All Jobs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="rounded-2xl border border-hairline bg-card p-6 flex flex-col justify-between shadow-2xs hover:border-foreground/20 transition-all group"
            >
              <div>
                {/* Top Strip */}
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-primary">{job.company}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-secondary text-muted-foreground border border-hairline">
                      {job.roleType}
                    </span>
                  </div>

                  {job.applied ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold">
                      <CheckCircle2 className="w-3 h-3" />
                      Applied
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {job.closingInDays} days left
                    </span>
                  )}
                </div>

                {/* Role Title & Match Score */}
                <div>
                  <h3 className="font-serif text-xl font-normal text-foreground group-hover:text-primary transition-colors">
                    {job.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold">
                      <CheckCircle2 className="w-3 h-3" />
                      94% Match with ASCI Profile
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground">
                      Direct Partner Referral Active
                    </span>
                  </div>
                </div>

                {/* Meta details */}
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mt-2">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {job.location} ({job.workMode})
                  </span>
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-3 h-3" />
                    {job.experience}
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-foreground">
                    <DollarSign className="w-3 h-3 text-emerald-500" />
                    {job.compensation}
                  </span>
                </div>

                {/* Description Preview */}
                <p className="text-xs text-muted-foreground mt-3 line-clamp-2 leading-relaxed">
                  {job.description}
                </p>

                {/* Skills tags */}
                <div className="flex flex-wrap items-center gap-1.5 mt-4">
                  {job.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded-md bg-secondary text-[10px] font-mono text-muted-foreground border border-hairline"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-5 mt-5 border-t border-hairline flex items-center justify-between gap-3">
                <span className="text-[11px] font-mono text-muted-foreground">
                  Eligibility: {job.batchEligibility}
                </span>

                <div className="flex items-center gap-2">
                  {job.applied ? (
                    <button
                      onClick={() => setFilter("applied")}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-secondary text-foreground text-xs font-medium border border-hairline hover:bg-secondary/80 transition-colors cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5 text-primary" />
                      <span>Track Application</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setSelectedJobForApply(job)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-xs font-medium hover:bg-primary-active transition-colors cursor-pointer"
                    >
                      <span>1-Click Apply</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ══════════════════════════════════════════════
          1-Click Apply Modal / Drawer
      ══════════════════════════════════════════════ */}
      {selectedJobForApply && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-card border border-hairline rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-hairline">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-primary">Direct Application</span>
                <h3 className="font-serif text-lg font-normal text-foreground">Apply to {selectedJobForApply.company}</h3>
              </div>
              <button
                onClick={() => setSelectedJobForApply(null)}
                className="p-1 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleApplySubmit} className="space-y-4">
              <div className="p-3.5 rounded-xl bg-secondary/50 border border-hairline space-y-1">
                <span className="text-xs font-semibold text-foreground">{selectedJobForApply.title}</span>
                <p className="text-[11px] text-muted-foreground">{selectedJobForApply.compensation} • {selectedJobForApply.location}</p>
              </div>

              <div>
                <label className="text-xs font-medium text-foreground block mb-1">
                  Verified Candidate Credentials
                </label>
                <div className="p-3 rounded-xl bg-secondary/40 border border-hairline space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">ASCI Profile:</span>
                    <span className="font-medium text-foreground flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      Verified
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Contest Rating:</span>
                    <span className="font-mono text-foreground font-semibold">1,640 ELO</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-foreground block mb-1">
                  Cover Note / Engineering Highlights (Optional)
                </label>
                <textarea
                  rows={3}
                  value={applicationNote}
                  onChange={(e) => setApplicationNote(e.target.value)}
                  placeholder="Share a short note about your primary tech stack or high-impact projects..."
                  className="w-full bg-secondary border border-hairline rounded-xl p-3 text-xs text-foreground focus:outline-none focus:border-primary resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedJobForApply(null)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-muted-foreground hover:bg-secondary cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-primary text-white text-xs font-medium hover:bg-primary-active cursor-pointer"
                >
                  Send Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
