"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
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
  AlertCircle,
  Plus,
  Edit3,
  Trash2,
  Star,
  SlidersHorizontal,
  ShieldCheck,
  AlertTriangle,
  Sparkles,
  Loader2
} from "lucide-react"
import { useUnstopEcosystem, JobOpportunity } from "@/lib/unstop-store"
import { AxelStage } from "@/components/axel/axel-stage"
import { useAdmin } from "@/context/admin-context"

function CompanyLogo({ logo, name }: { logo?: string; name: string }) {
  const key = (logo || name).toLowerCase()

  if (key.includes("google")) {
    return (
      <div className="w-11 h-11 rounded-xl bg-white border border-hairline flex items-center justify-center shrink-0 shadow-2xs">
        <svg className="w-5.5 h-5.5" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
      </div>
    )
  }

  if (key.includes("zerodha")) {
    return (
      <div className="w-11 h-11 rounded-xl bg-[#387ED1]/10 border border-[#387ED1]/25 flex items-center justify-center shrink-0 shadow-2xs">
        <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 3.5L5.5 14L16 24.5L26.5 14L16 3.5Z" fill="#387ED1" />
          <path d="M16 24.5L12.5 28.5H19.5L16 24.5Z" fill="#245A99" />
          <line x1="16" y1="3.5" x2="16" y2="24.5" stroke="white" strokeWidth="1.2" strokeOpacity="0.85" />
          <line x1="5.5" y1="14" x2="26.5" y2="14" stroke="white" strokeWidth="1.2" strokeOpacity="0.85" />
        </svg>
      </div>
    )
  }

  if (key.includes("razorpay")) {
    return (
      <div className="w-11 h-11 rounded-xl bg-[#0C2340] border border-[#3395FF]/30 flex items-center justify-center shrink-0 shadow-2xs">
        <svg viewBox="0 0 32 32" className="w-5.5 h-5.5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 4L8.5 15.5H15.5L12 28L23.5 13.5H16.5L18 4Z" fill="#3395FF" />
        </svg>
      </div>
    )
  }

  if (key.includes("asci")) {
    return (
      <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center shrink-0 p-1.5 shadow-2xs overflow-hidden">
        <Image
          src="/images/asci-logo.png"
          alt="ASCI Labs"
          width={32}
          height={32}
          className="w-full h-full object-contain"
        />
      </div>
    )
  }

  return (
    <div className="w-11 h-11 rounded-xl bg-secondary border border-hairline flex items-center justify-center shrink-0 text-foreground font-serif font-semibold text-xs shadow-2xs">
      {name.slice(0, 2).toUpperCase()}
    </div>
  )
}

export function DashboardJobs() {
  const { isAdmin } = useAdmin()
  const { jobs, applyForJob, addJob, updateJob, deleteJob } = useUnstopEcosystem()
  const [filter, setFilter] = useState<"all" | "full-time" | "internship" | "applied">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedJobForApply, setSelectedJobForApply] = useState<JobOpportunity | null>(null)
  const [applicationNote, setApplicationNote] = useState("")
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Section Header Customization
  const [sectionConfig, setSectionConfig] = useState({
    badge: "Unstop Career Portal",
    title: "Hiring Drives & Opportunities Hub",
    description: "Explore verified software engineering jobs, summer internships, and fast-track hiring pipelines with real-time stage tracking.",
  })
  const [isSectionEditOpen, setIsSectionEditOpen] = useState(false)
  const [sectionForm, setSectionForm] = useState(sectionConfig)

  useEffect(() => {
    try {
      const saved = localStorage.getItem("asci_opportunities_section_config")
      if (saved) {
        const parsed = JSON.parse(saved)
        setSectionConfig(parsed)
        setSectionForm(parsed)
      }
    } catch {}
  }, [])

  const handleSaveSection = (e: React.FormEvent) => {
    e.preventDefault()
    setSectionConfig(sectionForm)
    try {
      localStorage.setItem("asci_opportunities_section_config", JSON.stringify(sectionForm))
    } catch {}
    setIsSectionEditOpen(false)
    showToast("Section heading and description updated!")
  }

  // Job Modal State (Create / Edit)
  const [isJobModalOpen, setIsJobModalOpen] = useState(false)
  const [jobModalMode, setJobModalMode] = useState<"create" | "edit">("create")
  const [jobForm, setJobForm] = useState({
    id: "",
    title: "",
    company: "",
    companyLogo: "google",
    roleType: "Full-Time" as "Full-Time" | "Internship" | "Apprenticeship",
    location: "Bengaluru, Karnataka",
    workMode: "Hybrid" as "Remote" | "Hybrid" | "On-site",
    compensation: "₹20 - 28 LPA",
    batchEligibility: "2025 & 2026 Batch",
    experience: "Fresher / 0-2 Years",
    skillsStr: "Go, PostgreSQL, Kafka, Linux",
    closingInDays: 7,
    featured: false,
    description: "",
  })
  const [isSavingJob, setIsSavingJob] = useState(false)
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)

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

  const handleOpenCreateJob = () => {
    setJobModalMode("create")
    setJobForm({
      id: "",
      title: "",
      company: "",
      companyLogo: "google",
      roleType: "Full-Time",
      location: "Bengaluru, Karnataka",
      workMode: "Hybrid",
      compensation: "₹18 - 25 LPA",
      batchEligibility: "2025 & 2026 Batch",
      experience: "0-2 Years",
      skillsStr: "React, TypeScript, Next.js",
      closingInDays: 10,
      featured: false,
      description: "Join high-velocity engineering teams building resilient scalable software.",
    })
    setIsJobModalOpen(true)
  }

  const handleOpenEditJob = (job: JobOpportunity) => {
    setJobModalMode("edit")
    setJobForm({
      id: job.id,
      title: job.title,
      company: job.company,
      companyLogo: job.companyLogo || "google",
      roleType: job.roleType,
      location: job.location,
      workMode: job.workMode,
      compensation: job.compensation,
      batchEligibility: job.batchEligibility,
      experience: job.experience,
      skillsStr: job.skills.join(", "),
      closingInDays: job.closingInDays,
      featured: Boolean(job.featured),
      description: job.description,
    })
    setIsJobModalOpen(true)
  }

  const handleSaveJobSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!jobForm.title.trim() || !jobForm.company.trim()) {
      showToast("Please provide role title and company name.")
      return
    }

    setIsSavingJob(true)
    const skills = jobForm.skillsStr
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)

    if (jobModalMode === "create") {
      await addJob({
        title: jobForm.title.trim(),
        company: jobForm.company.trim(),
        companyLogo: jobForm.companyLogo.trim(),
        roleType: jobForm.roleType,
        location: jobForm.location.trim(),
        workMode: jobForm.workMode,
        compensation: jobForm.compensation.trim(),
        batchEligibility: jobForm.batchEligibility.trim(),
        experience: jobForm.experience.trim(),
        skills,
        closingInDays: Number(jobForm.closingInDays) || 7,
        featured: jobForm.featured,
        description: jobForm.description.trim(),
        requirements: ["Strong algorithmic foundations", "Production system patterns"],
        perks: ["Competitive industry compensation", "Fast-track mentorship"],
      })
      showToast(`New Opportunity at ${jobForm.company} published!`)
    } else {
      await updateJob(jobForm.id, {
        title: jobForm.title.trim(),
        company: jobForm.company.trim(),
        companyLogo: jobForm.companyLogo.trim(),
        roleType: jobForm.roleType,
        location: jobForm.location.trim(),
        workMode: jobForm.workMode,
        compensation: jobForm.compensation.trim(),
        batchEligibility: jobForm.batchEligibility.trim(),
        experience: jobForm.experience.trim(),
        skills,
        closingInDays: Number(jobForm.closingInDays) || 7,
        featured: jobForm.featured,
        description: jobForm.description.trim(),
      })
      showToast(`Opportunity at ${jobForm.company} updated!`)
    }

    setIsSavingJob(false)
    setIsJobModalOpen(false)
  }

  const handleDeleteJob = async (id: string) => {
    await deleteJob(id)
    setDeleteConfirmId(null)
    showToast("Opportunity removed successfully.")
  }

  const handleToggleFeatured = async (job: JobOpportunity) => {
    await updateJob(job.id, { featured: !job.featured })
    showToast(job.featured ? "Spotlight removed" : "Marked as Featured Opportunity")
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
              {sectionConfig.badge}
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <h1 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-foreground">
              {sectionConfig.title}
            </h1>
            {isAdmin && (
              <button
                onClick={() => {
                  setSectionForm(sectionConfig)
                  setIsSectionEditOpen(true)
                }}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer"
                title="Edit Section Heading & Info"
              >
                <Edit3 className="w-4 h-4 text-primary" />
              </button>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1 max-w-2xl">
            {sectionConfig.description}
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
          Admin Mode Controls Bar
      ══════════════════════════════════════════════ */}
      {isAdmin && (
        <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0 text-amber-600 dark:text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-foreground">Admin Portal Active</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-700 dark:text-amber-300 font-medium">
                  Opportunities &amp; Courses Manager
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground">
                You have master permissions to add, edit, or remove hiring drives, update section copy, and manage courses.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleOpenCreateJob}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-primary text-white text-xs font-medium hover:bg-primary-active transition-colors cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Opportunity</span>
            </button>
            <button
              onClick={() => {
                setSectionForm(sectionConfig)
                setIsSectionEditOpen(true)
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-card border border-hairline text-xs font-medium text-foreground hover:bg-secondary transition-colors cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-muted-foreground" />
              <span>Customize Section</span>
            </button>
            <Link
              href="/admin/opportunities"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-card border border-hairline text-xs font-medium text-foreground hover:bg-secondary transition-colors cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════
          Metrics Ribbon (Unstop Style)
      ══════════════════════════════════════════════ */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-hairline bg-card p-4 sm:p-5 shadow-2xs">
          <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-primary" />
            Active Openings
          </span>
          <p className="text-xl font-serif font-normal text-foreground mt-1">{jobs.length}</p>
          <span className="text-[11px] text-muted-foreground mt-0.5 block">High-growth tech partners</span>
        </div>

        <div className="rounded-2xl border border-hairline bg-card p-4 sm:p-5 shadow-2xs">
          <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <UserCheck className="w-3.5 h-3.5 text-[#D4B872]" />
            My Applications
          </span>
          <p className="text-xl font-serif font-normal text-foreground mt-1">{appliedJobs.length}</p>
          <span className="text-[11px] text-muted-foreground mt-0.5 block">
            {appliedJobs.length > 0 ? "Under active recruiter review" : "Ready to apply"}
          </span>
        </div>

        <div className="rounded-2xl border border-hairline bg-card p-4 sm:p-5 shadow-2xs">
          <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
            Top Compensation
          </span>
          <p className="text-xl font-serif font-normal text-foreground mt-1">₹28 LPA</p>
          <span className="text-[11px] text-muted-foreground mt-0.5 block">Full-time Core SDE roles</span>
        </div>

        <div className="rounded-2xl border border-hairline bg-card p-4 sm:p-5 shadow-2xs">
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
        /* 5-Stage Interactive Pipeline Tracker */
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
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-hairline">
                  <div className="flex items-center gap-3.5">
                    <CompanyLogo logo={job.companyLogo} name={job.company} />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-foreground">{job.company}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-secondary text-muted-foreground border border-hairline">
                          {job.roleType}
                        </span>
                      </div>
                      <h3 className="font-serif text-lg sm:text-xl font-normal text-foreground mt-0.5">{job.title}</h3>
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-sm font-semibold text-foreground block">{job.compensation}</span>
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
          <div className="flex items-center justify-center gap-3 mt-4">
            {filter === "applied" ? (
              <button
                onClick={() => setFilter("all")}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-xs font-medium hover:bg-primary-active transition-colors cursor-pointer"
              >
                <span>Explore All Jobs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : isAdmin ? (
              <button
                onClick={handleOpenCreateJob}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-xs font-medium hover:bg-primary-active transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Post an Opportunity</span>
              </button>
            ) : null}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="rounded-2xl border border-hairline bg-card p-5 sm:p-6 flex flex-col justify-between shadow-2xs hover:border-foreground/20 hover:shadow-md transition-all duration-200 group relative overflow-hidden"
            >
              <div className="space-y-4">
                {/* Header: Company Logo, Name, Role Type & Expiry/Status */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3.5 min-w-0 flex-1">
                    <CompanyLogo logo={job.companyLogo} name={job.company} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-semibold text-foreground">
                          {job.company}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-secondary text-muted-foreground border border-hairline">
                          {job.roleType}
                        </span>
                        {job.featured && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono uppercase tracking-wider bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-semibold">
                            <Star className="w-2.5 h-2.5 fill-current" />
                            Featured
                          </span>
                        )}
                      </div>
                      <h3 className="font-serif text-lg sm:text-xl font-normal text-foreground group-hover:text-primary transition-colors mt-0.5">
                        {job.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {/* Admin Action Buttons on Card */}
                    {isAdmin && (
                      <div className="flex items-center gap-1 p-1 bg-secondary/70 rounded-lg border border-hairline">
                        <button
                          onClick={() => handleOpenEditJob(job)}
                          className="p-1 rounded-md hover:bg-card text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                          title="Edit Opportunity"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-primary" />
                        </button>
                        <button
                          onClick={() => handleToggleFeatured(job)}
                          className={`p-1 rounded-md hover:bg-card transition-colors cursor-pointer ${
                            job.featured ? "text-amber-500" : "text-muted-foreground hover:text-foreground"
                          }`}
                          title={job.featured ? "Remove featured spotlight" : "Mark as featured"}
                        >
                          <Star className="w-3.5 h-3.5 fill-current" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(job.id)}
                          className="p-1 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
                          title="Delete Opportunity"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}

                    {job.applied ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold shrink-0">
                        <CheckCircle2 className="w-3 h-3" />
                        Applied
                      </span>
                    ) : (
                      <span className="text-[11px] font-mono text-muted-foreground flex items-center gap-1 shrink-0 bg-secondary/60 px-2.5 py-1 rounded-lg border border-hairline">
                        <Clock className="w-3 h-3 text-muted-foreground" />
                        {job.closingInDays}d left
                      </span>
                    )}
                  </div>
                </div>

                {/* Key Highlights Strip (Compensation, Location, Experience) */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 text-xs font-medium font-mono">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>{job.compensation}</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-secondary text-muted-foreground text-xs">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{job.location} ({job.workMode})</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-secondary text-muted-foreground text-xs">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>{job.experience}</span>
                  </div>
                </div>

                {/* Clean Skills Badges */}
                <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                  {job.skills.slice(0, 4).map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-0.5 rounded-md bg-secondary/80 text-[11px] font-mono text-muted-foreground border border-hairline"
                    >
                      {skill}
                    </span>
                  ))}
                  {job.skills.length > 4 && (
                    <span className="text-[10px] font-mono text-muted-foreground/70 px-1 py-0.5">
                      +{job.skills.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Card Footer: Eligibility & Action Button */}
              <div className="pt-4 mt-5 border-t border-hairline flex items-center justify-between gap-3">
                <span className="text-[11px] font-mono text-muted-foreground">
                  Eligibility: <span className="text-foreground font-medium">{job.batchEligibility}</span>
                </span>

                <div className="flex items-center gap-2">
                  {job.applied ? (
                    <button
                      onClick={() => setFilter("applied")}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-secondary text-foreground text-xs font-medium border border-hairline hover:bg-secondary/80 transition-colors cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5 text-primary" />
                      <span>Track Application</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setSelectedJobForApply(job)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-xs font-medium hover:bg-primary-active transition-colors cursor-pointer shadow-xs"
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
              <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-secondary/50 border border-hairline">
                <CompanyLogo logo={selectedJobForApply.companyLogo} name={selectedJobForApply.company} />
                <div>
                  <span className="text-xs font-semibold text-foreground block">{selectedJobForApply.title}</span>
                  <p className="text-[11px] text-muted-foreground">{selectedJobForApply.compensation} • {selectedJobForApply.location}</p>
                </div>
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

      {/* ══════════════════════════════════════════════
          Admin: Create / Edit Opportunity Modal
      ══════════════════════════════════════════════ */}
      {isJobModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-card border border-hairline rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-5 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-hairline">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  {jobModalMode === "create" ? <Plus className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-primary">Admin Control</span>
                  <h3 className="font-serif text-lg font-normal text-foreground">
                    {jobModalMode === "create" ? "Post New Opportunity" : `Edit Opportunity: ${jobForm.company}`}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setIsJobModalOpen(false)}
                className="p-1 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveJobSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Title */}
                <div className="sm:col-span-2">
                  <label className="text-xs font-medium text-foreground block mb-1">
                    Role Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={jobForm.title}
                    onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                    placeholder="e.g. Software Engineer — Core Systems"
                    className="w-full bg-secondary border border-hairline rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
                  />
                </div>

                {/* Company Name */}
                <div>
                  <label className="text-xs font-medium text-foreground block mb-1">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={jobForm.company}
                    onChange={(e) => setJobForm({ ...jobForm, company: e.target.value })}
                    placeholder="e.g. Zerodha, Google, Razorpay"
                    className="w-full bg-secondary border border-hairline rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
                  />
                </div>

                {/* Company Logo Preset */}
                <div>
                  <label className="text-xs font-medium text-foreground block mb-1">
                    Company Logo Brand
                  </label>
                  <select
                    value={jobForm.companyLogo}
                    onChange={(e) => setJobForm({ ...jobForm, companyLogo: e.target.value })}
                    className="w-full bg-secondary border border-hairline rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
                  >
                    <option value="zerodha">Zerodha (Blue Kite)</option>
                    <option value="google">Google India (4-Color G)</option>
                    <option value="razorpay">Razorpay (Lightning Slash)</option>
                    <option value="asci">ASCI Academy Labs</option>
                    <option value="custom">Other / Monogram</option>
                  </select>
                </div>

                {/* Role Type */}
                <div>
                  <label className="text-xs font-medium text-foreground block mb-1">
                    Role Type
                  </label>
                  <select
                    value={jobForm.roleType}
                    onChange={(e) => setJobForm({ ...jobForm, roleType: e.target.value as any })}
                    className="w-full bg-secondary border border-hairline rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
                  >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Internship">Internship</option>
                    <option value="Apprenticeship">Apprenticeship</option>
                  </select>
                </div>

                {/* Work Mode */}
                <div>
                  <label className="text-xs font-medium text-foreground block mb-1">
                    Work Mode
                  </label>
                  <select
                    value={jobForm.workMode}
                    onChange={(e) => setJobForm({ ...jobForm, workMode: e.target.value as any })}
                    className="w-full bg-secondary border border-hairline rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
                  >
                    <option value="Hybrid">Hybrid</option>
                    <option value="Remote">Remote</option>
                    <option value="On-site">On-site</option>
                  </select>
                </div>

                {/* Compensation */}
                <div>
                  <label className="text-xs font-medium text-foreground block mb-1">
                    Compensation *
                  </label>
                  <input
                    type="text"
                    required
                    value={jobForm.compensation}
                    onChange={(e) => setJobForm({ ...jobForm, compensation: e.target.value })}
                    placeholder="e.g. ₹20 - 28 LPA or ₹1,20,000 / month"
                    className="w-full bg-secondary border border-hairline rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="text-xs font-medium text-foreground block mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={jobForm.location}
                    onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                    placeholder="e.g. Bengaluru, Karnataka"
                    className="w-full bg-secondary border border-hairline rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
                  />
                </div>

                {/* Batch Eligibility */}
                <div>
                  <label className="text-xs font-medium text-foreground block mb-1">
                    Batch Eligibility
                  </label>
                  <input
                    type="text"
                    value={jobForm.batchEligibility}
                    onChange={(e) => setJobForm({ ...jobForm, batchEligibility: e.target.value })}
                    placeholder="e.g. 2025 & 2026 Batch"
                    className="w-full bg-secondary border border-hairline rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
                  />
                </div>

                {/* Experience */}
                <div>
                  <label className="text-xs font-medium text-foreground block mb-1">
                    Experience Requirement
                  </label>
                  <input
                    type="text"
                    value={jobForm.experience}
                    onChange={(e) => setJobForm({ ...jobForm, experience: e.target.value })}
                    placeholder="e.g. Fresher / 0-2 Years"
                    className="w-full bg-secondary border border-hairline rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
                  />
                </div>

                {/* Skills (Comma-separated) */}
                <div className="sm:col-span-2">
                  <label className="text-xs font-medium text-foreground block mb-1">
                    Required Skills (Comma separated)
                  </label>
                  <input
                    type="text"
                    value={jobForm.skillsStr}
                    onChange={(e) => setJobForm({ ...jobForm, skillsStr: e.target.value })}
                    placeholder="e.g. Go, PostgreSQL, Kafka, Linux"
                    className="w-full bg-secondary border border-hairline rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
                  />
                </div>

                {/* Closing Days & Featured Toggle */}
                <div className="flex items-center justify-between gap-4 sm:col-span-2 pt-1">
                  <div className="flex-1">
                    <label className="text-xs font-medium text-foreground block mb-1">
                      Days Left to Apply
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={90}
                      value={jobForm.closingInDays}
                      onChange={(e) => setJobForm({ ...jobForm, closingInDays: parseInt(e.target.value) || 7 })}
                      className="w-full bg-secondary border border-hairline rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-5">
                    <label className="flex items-center gap-2 text-xs font-medium text-foreground cursor-pointer">
                      <input
                        type="checkbox"
                        checked={jobForm.featured}
                        onChange={(e) => setJobForm({ ...jobForm, featured: e.target.checked })}
                        className="rounded border-hairline accent-primary w-4 h-4 cursor-pointer"
                      />
                      <span>Featured Spotlight</span>
                    </label>
                  </div>
                </div>

                {/* Short Description */}
                <div className="sm:col-span-2">
                  <label className="text-xs font-medium text-foreground block mb-1">
                    Job Overview / Description
                  </label>
                  <textarea
                    rows={3}
                    value={jobForm.description}
                    onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                    placeholder="Provide a clear description of the role, team context, and key responsibilities..."
                    className="w-full bg-secondary border border-hairline rounded-xl p-3 text-xs text-foreground focus:outline-none focus:border-primary resize-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-hairline">
                <button
                  type="button"
                  onClick={() => setIsJobModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-muted-foreground hover:bg-secondary cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingJob}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-primary text-white text-xs font-medium hover:bg-primary-active disabled:opacity-50 cursor-pointer"
                >
                  {isSavingJob && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{jobModalMode === "create" ? "Publish Opportunity" : "Save Changes"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════
          Admin: Delete Confirmation Modal
      ══════════════════════════════════════════════ */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-card border border-hairline rounded-2xl max-w-sm w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center shrink-0 text-destructive">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-base font-medium text-foreground">Delete Opportunity?</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  This will remove this job drive from the portal and revoke active application tracking.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-muted-foreground hover:bg-secondary cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteJob(deleteConfirmId)}
                className="px-4 py-2 rounded-xl bg-destructive text-destructive-foreground text-xs font-medium hover:bg-destructive/90 cursor-pointer"
              >
                Delete Role
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════
          Admin: Section Header Customizer Modal
      ══════════════════════════════════════════════ */}
      {isSectionEditOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-card border border-hairline rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-hairline">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-primary" />
                <h3 className="font-serif text-lg font-normal text-foreground">Customize Section Copy</h3>
              </div>
              <button
                onClick={() => setIsSectionEditOpen(false)}
                className="p-1 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveSection} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-foreground block mb-1">
                  Tag / Portal Badge
                </label>
                <input
                  type="text"
                  required
                  value={sectionForm.badge}
                  onChange={(e) => setSectionForm({ ...sectionForm, badge: e.target.value })}
                  placeholder="e.g. Unstop Career Portal"
                  className="w-full bg-secondary border border-hairline rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-foreground block mb-1">
                  Main Headline / Title
                </label>
                <input
                  type="text"
                  required
                  value={sectionForm.title}
                  onChange={(e) => setSectionForm({ ...sectionForm, title: e.target.value })}
                  placeholder="e.g. Hiring Drives & Opportunities Hub"
                  className="w-full bg-secondary border border-hairline rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-foreground block mb-1">
                  Section Subtitle / Description
                </label>
                <textarea
                  rows={3}
                  required
                  value={sectionForm.description}
                  onChange={(e) => setSectionForm({ ...sectionForm, description: e.target.value })}
                  placeholder="Explore verified software engineering jobs..."
                  className="w-full bg-secondary border border-hairline rounded-xl p-3 text-xs text-foreground focus:outline-none focus:border-primary resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-hairline">
                <button
                  type="button"
                  onClick={() => setIsSectionEditOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-muted-foreground hover:bg-secondary cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-primary text-white text-xs font-medium hover:bg-primary-active cursor-pointer"
                >
                  Save Section Header
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

