"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import {
  Briefcase,
  Search,
  Filter,
  CheckCircle2,
  Calendar,
  Banknote,
  Building2,
  Award,
  Users,
  FileText,
  Clock,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  Zap,
  Sparkles,
  BookOpen,
  HelpCircle,
  Code2,
  Terminal,
} from "lucide-react"
import { useUnstopEcosystem, type JobOpportunity } from "@/lib/unstop-store"
import { JobCard } from "@/components/cards/job-card"
import { InternshipCard } from "@/components/cards/internship-card"
import { DashboardResumeAts } from "@/components/dashboard/dashboard-resume-ats"
import { MobileFilterBottomSheet } from "@/components/ui/mobile-filter-bottom-sheet"

export type CareerTabType =
  | "jobs"
  | "internships"
  | "challenges"
  | "assessments"
  | "mentorship"
  | "resume"
  | "interview-prep"

export interface CareerHubProps {
  initialRoleType?: string
  initialTab?: CareerTabType | "opportunities"
}

const CAREER_HUB_TABS = [
  { id: "jobs", label: "Jobs", icon: Briefcase },
  { id: "internships", label: "Internships", icon: Sparkles },
  { id: "challenges", label: "Hiring Challenges", icon: Zap },
  { id: "assessments", label: "Assessments", icon: Award },
  { id: "mentorship", label: "Mentorship", icon: Users },
  { id: "resume", label: "Resume Tools", icon: FileText },
  { id: "interview-prep", label: "Interview Prep", icon: BookOpen },
]

// 7-Dimension Filters
const ROLE_OPTIONS = ["All Roles", "SDE / Core", "Frontend", "Backend", "Full-Stack", "AI / ML", "Cloud / DevOps"]
const SKILL_OPTIONS = ["All Skills", "Python", "React", "Go", "Java", "TypeScript", "SQL", "Docker", "AWS"]
const LOCATION_OPTIONS = ["All Locations", "Bangalore", "Hyderabad", "Pune", "Delhi NCR", "Mumbai"]
const WORK_MODE_OPTIONS = ["All Modes", "Remote", "Hybrid", "In-Office"]
const EXPERIENCE_OPTIONS = ["All Experience", "Fresher / 0-1 yrs", "1-3 yrs", "3+ yrs"]
const COMPENSATION_OPTIONS = ["All Ranges", "₹10–18 LPA / ₹25–40k", "₹18–28 LPA / ₹45k+", "₹28+ LPA"]
const DEADLINE_OPTIONS = ["All Deadlines", "Ending Soon (< 5d)", "This Month", "Open"]

const HIRING_CHALLENGES = [
  {
    id: "hc-1",
    title: "Google SDE Summer Hiring Sprint",
    company: "Google",
    companyLogo: "google",
    location: "Bengaluru / Remote",
    salary: "₹1,15,000/mo Internship → PPO",
    skills: ["DSA", "Go", "C++", "System Design"],
    deadline: "12 Oct",
    href: "/competitions",
  },
  {
    id: "hc-2",
    title: "Razorpay Fintech High-Throughput Challenge",
    company: "Razorpay",
    companyLogo: "razorpay",
    location: "Bengaluru / Remote",
    salary: "₹22–30 LPA + Equity",
    skills: ["Go", "Kafka", "PostgreSQL", "Distributed Systems"],
    deadline: "18 Oct",
    href: "/competitions",
  },
  {
    id: "hc-3",
    title: "Zerodha Low-Latency Trading Engine Challenge",
    company: "Zerodha",
    companyLogo: "zerodha",
    location: "Bengaluru",
    salary: "₹24–36 LPA",
    skills: ["C++", "Rust", "Networking", "Linux"],
    deadline: "22 Oct",
    href: "/competitions",
  },
  {
    id: "hc-4",
    title: "Microsoft Cloud Native Systems Sprint",
    company: "Microsoft",
    companyLogo: "microsoft",
    location: "Hyderabad / Remote",
    salary: "₹20–28 LPA",
    skills: ["Azure", "Docker", "Kubernetes", "TypeScript"],
    deadline: "28 Oct",
    href: "/competitions",
  },
]

const INTERVIEW_PREP_TRACKS = [
  {
    id: "prep-dsa",
    title: "FAANG Coding Interview Drills",
    description: "Top 75 curated algorithmic patterns: Monotonic stacks, sliding windows, DP on trees, and graph BFS.",
    topicsCount: 75,
    difficulty: "Medium-Hard",
    badge: "Most Popular",
    href: "/practice",
  },
  {
    id: "prep-system-design",
    title: "Low-Level & High-Level System Design",
    description: "Distributed caching with Redis, Kafka partitioning semantics, rate limiters, and ACID transaction isolation.",
    topicsCount: 24,
    difficulty: "Advanced",
    badge: "Senior SDE",
    href: "/practice",
  },
  {
    id: "prep-behavioral",
    title: "Amazon Leadership Principles & STAR Stories",
    description: "Frameworks for Customer Obsession, Bias for Action, Dive Deep, and conflict resolution scenarios.",
    topicsCount: 16,
    difficulty: "All Levels",
    badge: "Essential",
    href: "/dashboard?tab=resume",
  },
  {
    id: "prep-live-mock",
    title: "Peer & AI Mock Technical Interview",
    description: "Simulate 45-minute live whiteboarding interviews with Axel AI or staff engineering mentors.",
    topicsCount: 10,
    difficulty: "Realistic",
    badge: "Interactive",
    href: "/axel",
  },
]

export function CareerHub({ initialRoleType = "All", initialTab = "jobs" }: CareerHubProps = {}) {
  const { jobs, assessments, mentors, applyForJob } = useUnstopEcosystem()

  const resolveInitialTab = (): CareerTabType => {
    if (initialTab && initialTab !== "opportunities") {
      if (initialTab === ("mentors" as any)) return "mentorship"
      return initialTab as CareerTabType
    }
    if (initialRoleType === "Internship") return "internships"
    return "jobs"
  }

  const [activeTab, setActiveTab] = useState<CareerTabType>(resolveInitialTab)
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)

  // 7-Dimension Filters State
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRole, setSelectedRole] = useState("All Roles")
  const [selectedSkill, setSelectedSkill] = useState("All Skills")
  const [selectedLocation, setSelectedLocation] = useState("All Locations")
  const [selectedWorkMode, setSelectedWorkMode] = useState("All Modes")
  const [selectedExperience, setSelectedExperience] = useState("All Experience")
  const [selectedCompensation, setSelectedCompensation] = useState("All Ranges")
  const [selectedDeadline, setSelectedDeadline] = useState("All Deadlines")

  const resetFilters = () => {
    setSearchQuery("")
    setSelectedRole("All Roles")
    setSelectedSkill("All Skills")
    setSelectedLocation("All Locations")
    setSelectedWorkMode("All Modes")
    setSelectedExperience("All Experience")
    setSelectedCompensation("All Ranges")
    setSelectedDeadline("All Deadlines")
  }

  const isFiltered = Boolean(
    searchQuery.trim() ||
    selectedRole !== "All Roles" ||
    selectedSkill !== "All Skills" ||
    selectedLocation !== "All Locations" ||
    selectedWorkMode !== "All Modes" ||
    selectedExperience !== "All Experience" ||
    selectedCompensation !== "All Ranges" ||
    selectedDeadline !== "All Deadlines"
  )

  // Filtered Opportunities
  const filteredOpportunities = useMemo(() => {
    return jobs.filter((j) => {
      // Role type matching tab
      if (activeTab === "jobs" && j.roleType !== "Full-Time") return false
      if (activeTab === "internships" && j.roleType !== "Internship") return false

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const matchTitle = j.title.toLowerCase().includes(q)
        const matchCompany = j.company.toLowerCase().includes(q)
        const matchSkill = j.skills.some((s) => s.toLowerCase().includes(q))
        if (!matchTitle && !matchCompany && !matchSkill) return false
      }

      // Skill filter
      if (selectedSkill !== "All Skills") {
        if (!j.skills.some((s) => s.toLowerCase() === selectedSkill.toLowerCase())) {
          return false
        }
      }

      // Location filter
      if (selectedLocation !== "All Locations") {
        if (!j.location.toLowerCase().includes(selectedLocation.toLowerCase())) {
          return false
        }
      }

      // Work mode filter
      if (selectedWorkMode !== "All Modes") {
        if (j.workMode.toLowerCase() !== selectedWorkMode.toLowerCase()) {
          return false
        }
      }

      return true
    })
  }, [
    jobs,
    activeTab,
    searchQuery,
    selectedSkill,
    selectedLocation,
    selectedWorkMode,
  ])

  return (
    <div className="min-h-screen bg-background text-foreground py-8">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground font-semibold">Career Ecosystem</span>
        </nav>

        {/* Header Banner */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-6">
          <div className="space-y-2">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-foreground">
              Career &amp; Opportunities
            </h1>
            <p className="text-sm text-muted-foreground max-w-xl leading-relaxed">
              Explore verified engineering opportunities, internships, hiring sprints, and interview tools.
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              placeholder="Search companies, roles, skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-10 pr-4 rounded-xl border border-border bg-card text-foreground text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary shadow-2xs transition-all"
            />
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            CAREER HUB: 7 Pillars
            1. Jobs
            2. Internships
            3. Hiring Challenges
            4. Assessments
            5. Mentorship
            6. Resume Tools
            7. Interview Prep
        ═══════════════════════════════════════════════════════════════ */}
        <div className="flex items-center gap-2 border-b border-border pb-3 overflow-x-auto scrollbar-none">
          {CAREER_HUB_TABS.map((tab) => {
            const Icon = tab.icon
            const active = activeTab === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as CareerTabType)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  active
                    ? "bg-primary text-primary-foreground shadow-2xs"
                    : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80 border border-border/60"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            FILTERS BAR: (Role, Skills, Location, Work Mode, Experience, Salary/Stipend, Deadline)
            Available for Jobs and Internships tabs
        ═══════════════════════════════════════════════════════════════ */}
        {(activeTab === "jobs" || activeTab === "internships") && (
          <div className="p-4 rounded-2xl border border-border bg-card shadow-2xs space-y-3">
            <div className="flex items-center justify-between gap-3 text-xs font-mono text-muted-foreground">
              <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-foreground">
                <Filter className="w-3.5 h-3.5 text-primary" />
                <span>Filter Opportunities</span>
              </div>
              {isFiltered && (
                <button
                  onClick={resetFilters}
                  className="text-primary hover:underline text-xs font-semibold cursor-pointer"
                >
                  Reset All Filters
                </button>
              )}
            </div>

            {/* Mobile Filter Sheet Trigger Button */}
            <div className="sm:hidden">
              <button
                type="button"
                onClick={() => setMobileFilterOpen(true)}
                className="w-full h-11 px-4 rounded-xl border border-border bg-secondary hover:bg-secondary/80 flex items-center justify-between text-xs font-semibold text-foreground cursor-pointer shadow-2xs"
              >
                <div className="flex items-center gap-2">
                  <Filter className="w-3.5 h-3.5 text-primary" />
                  <span>Filters ({isFiltered ? "Filtered" : "All"})</span>
                </div>
                <span className="font-mono text-[11px] px-2 py-0.5 rounded-full bg-primary/15 text-primary font-bold">
                  {isFiltered ? "Active" : "Open"}
                </span>
              </button>
            </div>

            {/* Desktop 7 Filter Selectors */}
            <div className="hidden sm:grid sm:grid-cols-4 lg:grid-cols-7 gap-2">
              {/* 1. Role */}
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="h-9 px-2 rounded-lg border border-border bg-secondary text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer font-mono"
              >
                {ROLE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>

              {/* 2. Skills */}
              <select
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value)}
                className="h-9 px-2 rounded-lg border border-border bg-secondary text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer font-mono"
              >
                {SKILL_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>

              {/* 3. Location */}
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="h-9 px-2 rounded-lg border border-border bg-secondary text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer font-mono"
              >
                {LOCATION_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>

              {/* 4. Work Mode */}
              <select
                value={selectedWorkMode}
                onChange={(e) => setSelectedWorkMode(e.target.value)}
                className="h-9 px-2 rounded-lg border border-border bg-secondary text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer font-mono"
              >
                {WORK_MODE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>

              {/* 5. Experience */}
              <select
                value={selectedExperience}
                onChange={(e) => setSelectedExperience(e.target.value)}
                className="h-9 px-2 rounded-lg border border-border bg-secondary text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer font-mono"
              >
                {EXPERIENCE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>

              {/* 6. Salary / Stipend */}
              <select
                value={selectedCompensation}
                onChange={(e) => setSelectedCompensation(e.target.value)}
                className="h-9 px-2 rounded-lg border border-border bg-secondary text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer font-mono"
              >
                {COMPENSATION_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>

              {/* 7. Deadline */}
              <select
                value={selectedDeadline}
                onChange={(e) => setSelectedDeadline(e.target.value)}
                className="h-9 px-2 rounded-lg border border-border bg-secondary text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer font-mono"
              >
                {DEADLINE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Mobile Filter Bottom Sheet */}
            <MobileFilterBottomSheet
              isOpen={mobileFilterOpen}
              onClose={() => setMobileFilterOpen(false)}
              onReset={resetFilters}
              title="Filter Opportunities"
              isFiltered={isFiltered}
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-muted-foreground font-mono mb-1 font-semibold">Role Track:</label>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl border border-border bg-card text-foreground text-xs"
                  >
                    {ROLE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-muted-foreground font-mono mb-1 font-semibold">Core Skill:</label>
                  <select
                    value={selectedSkill}
                    onChange={(e) => setSelectedSkill(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl border border-border bg-card text-foreground text-xs"
                  >
                    {SKILL_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-muted-foreground font-mono mb-1 font-semibold">Location:</label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl border border-border bg-card text-foreground text-xs"
                  >
                    {LOCATION_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-muted-foreground font-mono mb-1 font-semibold">Work Mode:</label>
                  <select
                    value={selectedWorkMode}
                    onChange={(e) => setSelectedWorkMode(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl border border-border bg-card text-foreground text-xs"
                  >
                    {WORK_MODE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-muted-foreground font-mono mb-1 font-semibold">Experience:</label>
                  <select
                    value={selectedExperience}
                    onChange={(e) => setSelectedExperience(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl border border-border bg-card text-foreground text-xs"
                  >
                    {EXPERIENCE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-muted-foreground font-mono mb-1 font-semibold">Salary / Stipend:</label>
                  <select
                    value={selectedCompensation}
                    onChange={(e) => setSelectedCompensation(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl border border-border bg-card text-foreground text-xs"
                  >
                    {COMPENSATION_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-muted-foreground font-mono mb-1 font-semibold">Deadline:</label>
                  <select
                    value={selectedDeadline}
                    onChange={(e) => setSelectedDeadline(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl border border-border bg-card text-foreground text-xs"
                  >
                    {DEADLINE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>
            </MobileFilterBottomSheet>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════
            TAB 1: JOBS (Uses JobCard with [View Opportunity])
        ═══════════════════════════════════════════════════════════════ */}
        {activeTab === "jobs" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
              <span>Showing {filteredOpportunities.length} Full-Time Opportunities</span>
              <span>Direct verified referrals</span>
            </div>

            {filteredOpportunities.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredOpportunities.map((job) => (
                  <JobCard
                    key={job.id}
                    id={job.id}
                    title={job.title}
                    company={job.company}
                    companyLogo={job.companyLogo}
                    location={job.location}
                    workMode={job.workMode}
                    compensation={job.compensation}
                    experience={job.experience}
                    skills={job.skills}
                    closingInDays={job.closingInDays}
                    applied={job.applied}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center space-y-3">
                <Briefcase className="h-10 w-10 text-muted-foreground mx-auto opacity-60" />
                <h3 className="font-semibold text-foreground text-base">No job openings found</h3>
                <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                  Try adjusting your filter criteria or search query to see more openings.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-[#EA5300] cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════
            TAB 2: INTERNSHIPS (Uses InternshipCard with [Apply])
        ═══════════════════════════════════════════════════════════════ */}
        {activeTab === "internships" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
              <span>Showing {filteredOpportunities.length} Internship Cohorts</span>
              <span>Summer &amp; Winter programs</span>
            </div>

            {filteredOpportunities.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredOpportunities.map((internship) => (
                  <InternshipCard
                    key={internship.id}
                    id={internship.id}
                    title={internship.title}
                    company={internship.company}
                    companyLogo={internship.companyLogo}
                    stipend={internship.compensation}
                    location={internship.location}
                    workMode={internship.workMode}
                    duration="3 months"
                    skills={internship.skills}
                    closingInDays={internship.closingInDays}
                    applied={internship.applied}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center space-y-3">
                <Sparkles className="h-10 w-10 text-muted-foreground mx-auto opacity-60" />
                <h3 className="font-semibold text-foreground text-base">No internships found</h3>
                <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                  Try adjusting your filter criteria or search query to see more cohorts.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-[#EA5300] cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════
            TAB 3: HIRING CHALLENGES
        ═══════════════════════════════════════════════════════════════ */}
        {activeTab === "challenges" && (
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-2xl font-normal text-foreground">Hiring Challenges &amp; Hack-Sprints</h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Fast-track your application directly to technical interviews by solving production code katas.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {HIRING_CHALLENGES.map((challenge) => (
                <div
                  key={challenge.id}
                  className="rounded-2xl border border-border bg-card p-5 space-y-3 shadow-2xs flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold">
                      Sprint
                    </span>
                    <h3 className="font-bold text-foreground text-sm line-clamp-1">{challenge.title}</h3>
                    <p className="text-xs text-muted-foreground font-mono">{challenge.company} • {challenge.location}</p>
                    <div className="text-xs font-bold text-primary font-mono pt-1">{challenge.salary}</div>
                  </div>

                  <Link
                    href={challenge.href}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-secondary hover:bg-primary hover:text-primary-foreground text-foreground text-xs font-semibold transition-all"
                  >
                    <span>View Challenge</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════
            TAB 4: ASSESSMENTS
        ═══════════════════════════════════════════════════════════════ */}
        {activeTab === "assessments" && (
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-2xl font-normal text-foreground">Standardized Skill Benchmarks</h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Proctored assessments vetted by hiring managers. Score 75%+ to unlock verified recruiter badges.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {assessments.map((a) => (
                <div key={a.id} className="rounded-2xl border border-border bg-card p-5 space-y-4 shadow-2xs flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold">
                        {a.category}
                      </span>
                      <span className="text-xs font-mono text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {a.durationMinutes} Mins
                      </span>
                    </div>

                    <h3 className="font-bold text-foreground text-base tracking-tight">{a.title}</h3>

                    <div className="text-xs text-muted-foreground space-y-1.5 font-mono">
                      <div className="flex items-center justify-between">
                        <span>Total Questions:</span>
                        <span className="font-bold text-foreground">{a.totalQuestions}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Passing Benchmark:</span>
                        <span className="font-bold text-foreground">{a.passingScore}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Badge Reward:</span>
                        <span className="font-bold text-primary flex items-center gap-1">
                          <Award className="h-3 w-3" /> {a.badgeReward.name}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-border/60">
                    <Link
                      href="/practice"
                      className="w-full inline-flex items-center justify-center py-2.5 rounded-xl bg-primary text-primary-foreground hover:bg-[#EA5300] text-xs font-semibold transition-all cursor-pointer text-center"
                    >
                      Begin Benchmark Test
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════
            TAB 5: MENTORSHIP
        ═══════════════════════════════════════════════════════════════ */}
        {activeTab === "mentorship" && (
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-2xl font-normal text-foreground">1-on-1 Engineering Mentorship</h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Book mock technical interviews, system design drills, and resume reviews with staff engineers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {mentors.map((m) => (
                <div key={m.id} className="rounded-2xl border border-border bg-card p-5 space-y-4 shadow-2xs flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <img
                        src={m.avatar}
                        alt={m.name}
                        className="h-12 w-12 rounded-full object-cover border border-border shrink-0"
                      />
                      <div className="min-w-0">
                        <h3 className="font-bold text-foreground text-sm truncate">{m.name}</h3>
                        <p className="text-xs text-muted-foreground truncate">{m.role}</p>
                        <p className="text-[11px] font-mono text-primary font-bold truncate">{m.company}</p>
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {m.bio}
                    </p>

                    <div className="space-y-1 text-xs">
                      <div className="text-[11px] font-mono font-bold text-muted-foreground uppercase">
                        Specializations
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {m.specialties.map((spec) => (
                          <span key={spec} className="text-[10px] font-mono px-2 py-0.5 rounded bg-secondary text-foreground">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-border/60 flex items-center justify-between">
                    <span className="text-xs font-mono text-muted-foreground">
                      ★ {m.rating} ({m.reviewsCount})
                    </span>
                    <button
                      type="button"
                      onClick={() => alert(`Opening booking schedule for ${m.name}`)}
                      className="px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-[#EA5300] text-xs font-semibold transition-all cursor-pointer"
                    >
                      Book 1-on-1 ({m.sessionDuration})
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════
            TAB 6: RESUME TOOLS
        ═══════════════════════════════════════════════════════════════ */}
        {activeTab === "resume" && (
          <div className="space-y-6">
            <DashboardResumeAts />
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════
            TAB 7: INTERVIEW PREP
        ═══════════════════════════════════════════════════════════════ */}
        {activeTab === "interview-prep" && (
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-2xl font-normal text-foreground">Interview Preparation Tracks</h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Practice targeted coding katas, system design architectures, and behavioral STAR models.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {INTERVIEW_PREP_TRACKS.map((track) => (
                <div
                  key={track.id}
                  className="rounded-2xl border border-border bg-card p-6 space-y-4 shadow-2xs flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                        {track.badge}
                      </span>
                      <span className="text-xs font-mono text-muted-foreground">
                        {track.topicsCount} Modules
                      </span>
                    </div>

                    <h3 className="font-serif text-xl font-normal text-foreground">{track.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{track.description}</p>
                  </div>

                  <div className="pt-4 border-t border-border/60 flex items-center justify-between">
                    <span className="text-xs font-mono text-muted-foreground">
                      Level: <strong className="text-foreground">{track.difficulty}</strong>
                    </span>
                    <Link
                      href={track.href}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-[#EA5300] text-xs font-semibold transition-all cursor-pointer"
                    >
                      <span>Start Prep Track</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
