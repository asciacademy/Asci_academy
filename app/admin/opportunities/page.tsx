"use client"

import React, { useState, useEffect, useTransition } from "react"
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
  Loader2,
  Users
} from "lucide-react"
import {
  getAdminOpportunities,
  createAdminOpportunity,
  updateAdminOpportunity,
  deleteAdminOpportunity,
  toggleOpportunityFeatured
} from "@/app/actions/admin"

function CompanyLogo({ logo, name }: { logo?: string; name: string }) {
  const key = (logo || name).toLowerCase()

  if (key.includes("google")) {
    return (
      <div className="w-10 h-10 rounded-xl bg-white border border-hairline flex items-center justify-center shrink-0 shadow-2xs">
        <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
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
      <div className="w-10 h-10 rounded-xl bg-[#387ED1]/10 border border-[#387ED1]/25 flex items-center justify-center shrink-0 shadow-2xs">
        <svg viewBox="0 0 32 32" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
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
      <div className="w-10 h-10 rounded-xl bg-[#0C2340] border border-[#3395FF]/30 flex items-center justify-center shrink-0 shadow-2xs">
        <svg viewBox="0 0 32 32" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 4L8.5 15.5H15.5L12 28L23.5 13.5H16.5L18 4Z" fill="#3395FF" />
        </svg>
      </div>
    )
  }

  if (key.includes("asci")) {
    return (
      <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center shrink-0 p-1 shadow-2xs overflow-hidden">
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
    <div className="w-10 h-10 rounded-xl bg-secondary border border-hairline flex items-center justify-center shrink-0 text-foreground font-serif font-semibold text-xs shadow-2xs">
      {name.slice(0, 2).toUpperCase()}
    </div>
  )
}

export default function AdminOpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isPending, startTransition] = useTransition()
  const [search, setSearch] = useState("")
  const [filterRole, setFilterRole] = useState<"all" | "Full-Time" | "Internship">("all")
  const [toast, setToast] = useState<{ type: "ok" | "err"; msg: string } | null>(null)

  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<"create" | "edit">("create")
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)
  const [formValues, setFormValues] = useState({
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

  const notify = (type: "ok" | "err", msg: string) => {
    setToast({ type, msg })
    setTimeout(() => setToast(null), 3500)
  }

  const loadData = () => {
    startTransition(async () => {
      const res = await getAdminOpportunities()
      if (res.success && res.opportunities) {
        setOpportunities(res.opportunities)
      } else {
        // Fallback to local stored jobs if table is empty
        try {
          const raw = localStorage.getItem("asci_unstop_jobs_v1")
          if (raw) setOpportunities(JSON.parse(raw))
        } catch {}
      }
      setLoading(false)
    })
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleOpenCreate = () => {
    setModalMode("create")
    setFormValues({
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
      description: "Join high-growth software engineering teams building production systems.",
    })
    setIsModalOpen(true)
  }

  const handleOpenEdit = (opp: any) => {
    setModalMode("edit")
    setFormValues({
      id: opp.id,
      title: opp.title,
      company: opp.company,
      companyLogo: opp.companyLogo || "google",
      roleType: opp.roleType,
      location: opp.location,
      workMode: opp.workMode,
      compensation: opp.compensation,
      batchEligibility: opp.batchEligibility,
      experience: opp.experience,
      skillsStr: (opp.skills || []).join(", "),
      closingInDays: opp.closingInDays || 7,
      featured: Boolean(opp.featured),
      description: opp.description || "",
    })
    setIsModalOpen(true)
  }

  const handleSaveSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formValues.title.trim() || !formValues.company.trim()) {
      notify("err", "Role title and company name are required.")
      return
    }

    const skills = formValues.skillsStr
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)

    if (modalMode === "create") {
      const res = await createAdminOpportunity({
        title: formValues.title,
        company: formValues.company,
        companyLogo: formValues.companyLogo,
        roleType: formValues.roleType,
        location: formValues.location,
        workMode: formValues.workMode,
        compensation: formValues.compensation,
        batchEligibility: formValues.batchEligibility,
        experience: formValues.experience,
        skills,
        closingInDays: Number(formValues.closingInDays) || 7,
        featured: formValues.featured,
        description: formValues.description,
      })

      if (res.success) {
        notify("ok", "New Opportunity created and published!")
        setIsModalOpen(false)
        loadData()
      } else {
        notify("err", res.error || "Failed to create opportunity.")
      }
    } else {
      const res = await updateAdminOpportunity(formValues.id, {
        title: formValues.title,
        company: formValues.company,
        companyLogo: formValues.companyLogo,
        roleType: formValues.roleType,
        location: formValues.location,
        workMode: formValues.workMode,
        compensation: formValues.compensation,
        batchEligibility: formValues.batchEligibility,
        experience: formValues.experience,
        skills,
        closingInDays: Number(formValues.closingInDays) || 7,
        featured: formValues.featured,
        description: formValues.description,
      })

      if (res.success) {
        notify("ok", "Opportunity updated successfully!")
        setIsModalOpen(false)
        loadData()
      } else {
        notify("err", res.error || "Failed to update opportunity.")
      }
    }
  }

  const handleDelete = async (id: string) => {
    const res = await deleteAdminOpportunity(id)
    if (res.success) {
      notify("ok", "Opportunity deleted.")
      setDeleteConfirmId(null)
      loadData()
    } else {
      notify("err", res.error || "Failed to delete opportunity.")
    }
  }

  const handleToggleStar = async (id: string, featured: boolean) => {
    const res = await toggleOpportunityFeatured(id, featured)
    if (res.success) {
      notify("ok", featured ? "Spotlight removed" : "Marked as Featured")
      loadData()
    } else {
      notify("err", res.error || "Failed to toggle status.")
    }
  }

  const filtered = opportunities.filter((opp) => {
    const matchesSearch =
      opp.title.toLowerCase().includes(search.toLowerCase()) ||
      opp.company.toLowerCase().includes(search.toLowerCase()) ||
      (opp.skills || []).some((s: string) => s.toLowerCase().includes(search.toLowerCase()))

    if (!matchesSearch) return false
    if (filterRole === "all") return true
    return opp.roleType === filterRole
  })

  const fullTimeCount = opportunities.filter((o) => o.roleType === "Full-Time").length
  const internCount = opportunities.filter((o) => o.roleType === "Internship").length
  const totalApps = opportunities.reduce((acc, o) => acc + (o.applicationsCount || 0), 0)

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-20 right-8 z-50 rounded-xl border p-4 shadow-lg flex items-center gap-3 text-xs font-mono animate-fadeIn ${
            toast.type === "ok"
              ? "bg-card border-primary/40 text-foreground"
              : "bg-card border-destructive/40 text-destructive"
          }`}
        >
          <div className={`w-2 h-2 rounded-full ${toast.type === "ok" ? "bg-primary" : "bg-destructive"}`} />
          <span>{toast.msg}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-hairline">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 font-semibold">
              <Briefcase className="w-3 h-3" />
              Career Hub Admin
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-foreground">
            Opportunities &amp; Hiring Drives
          </h1>
          <p className="text-xs text-muted-foreground mt-1 max-w-2xl">
            Create, edit, and orchestrate verified job openings, summer internships, company logos, and candidate pipelines.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-secondary text-foreground text-xs font-medium border border-hairline hover:bg-secondary/80 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
            <span>View Student Hub</span>
          </Link>
          <button
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-xs font-medium hover:bg-primary-active transition-colors shadow-xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Post Opportunity</span>
          </button>
        </div>
      </div>

      {/* Metrics Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-hairline bg-card p-4.5 shadow-2xs">
          <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-primary" />
            Total Drives
          </span>
          <p className="text-2xl font-serif font-normal text-foreground mt-1">{opportunities.length}</p>
          <span className="text-[11px] text-muted-foreground mt-0.5 block">Active hiring pipelines</span>
        </div>

        <div className="rounded-2xl border border-hairline bg-card p-4.5 shadow-2xs">
          <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            Full-Time Jobs
          </span>
          <p className="text-2xl font-serif font-normal text-foreground mt-1">{fullTimeCount}</p>
          <span className="text-[11px] text-muted-foreground mt-0.5 block">Core SDE &amp; Systems</span>
        </div>

        <div className="rounded-2xl border border-hairline bg-card p-4.5 shadow-2xs">
          <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-500" />
            Summer Internships
          </span>
          <p className="text-2xl font-serif font-normal text-foreground mt-1">{internCount}</p>
          <span className="text-[11px] text-muted-foreground mt-0.5 block">Pre-Placement Opportunities</span>
        </div>

        <div className="rounded-2xl border border-hairline bg-card p-4.5 shadow-2xs">
          <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-primary" />
            Candidate Applications
          </span>
          <p className="text-2xl font-serif font-normal text-foreground mt-1">{totalApps}</p>
          <span className="text-[11px] text-muted-foreground mt-0.5 block">1-Click referrals submitted</span>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search drives by role, company, or skills..."
            className="w-full bg-card border border-hairline rounded-xl pl-10 pr-4 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        <div className="flex items-center gap-1.5">
          {[
            { id: "all", label: `All (${opportunities.length})` },
            { id: "Full-Time", label: `Full-Time (${fullTimeCount})` },
            { id: "Internship", label: `Internships (${internCount})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterRole(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                filterRole === tab.id
                  ? "bg-card text-foreground border border-hairline font-semibold shadow-2xs"
                  : "text-muted-foreground hover:text-foreground hover:bg-card/50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Opportunities Table / List */}
      {loading ? (
        <div className="rounded-2xl border border-hairline bg-card/50 p-16 text-center">
          <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto mb-3" />
          <p className="text-xs text-muted-foreground font-mono">Loading Opportunities catalog...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-hairline bg-card/40 p-12 text-center">
          <Briefcase className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
          <h3 className="font-serif text-lg font-normal text-foreground">No Opportunities Found</h3>
          <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
            Try adjusting your search criteria or create a new opportunity drive.
          </p>
          <button
            onClick={handleOpenCreate}
            className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-xs font-medium hover:bg-primary-active transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Post Opportunity</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((opp) => (
            <div
              key={opp.id}
              className="rounded-2xl border border-hairline bg-card p-5 flex flex-col justify-between shadow-2xs hover:border-foreground/20 transition-all group"
            >
              <div className="space-y-3.5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <CompanyLogo logo={opp.companyLogo} name={opp.company} />
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-semibold text-foreground">{opp.company}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-secondary text-muted-foreground border border-hairline">
                          {opp.roleType}
                        </span>
                        {opp.featured && (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-mono uppercase bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-semibold">
                            <Star className="w-2.5 h-2.5 fill-current" />
                            Featured
                          </span>
                        )}
                      </div>
                      <h3 className="font-serif text-base font-normal text-foreground group-hover:text-primary transition-colors mt-0.5">
                        {opp.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleToggleStar(opp.id, opp.featured)}
                      className={`p-1.5 rounded-lg border border-hairline hover:bg-secondary transition-colors cursor-pointer ${
                        opp.featured ? "text-amber-500" : "text-muted-foreground"
                      }`}
                      title={opp.featured ? "Unmark featured" : "Feature on Hub"}
                    >
                      <Star className="w-3.5 h-3.5 fill-current" />
                    </button>
                    <button
                      onClick={() => handleOpenEdit(opp)}
                      className="p-1.5 rounded-lg border border-hairline hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                      title="Edit Details"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-primary" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(opp.id)}
                      className="p-1.5 rounded-lg border border-hairline hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
                      title="Delete Opportunity"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 font-mono font-medium text-[11px]">
                    <DollarSign className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                    <span>{opp.compensation}</span>
                  </div>
                  <div className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-secondary text-muted-foreground text-[11px]">
                    <MapPin className="w-3 h-3" />
                    <span>{opp.location} ({opp.workMode})</span>
                  </div>
                  <div className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-secondary text-muted-foreground text-[11px]">
                    <Clock className="w-3 h-3" />
                    <span>{opp.closingInDays}d left</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-1">
                  {(opp.skills || []).slice(0, 4).map((s: string) => (
                    <span
                      key={s}
                      className="px-2 py-0.5 rounded-md bg-secondary/80 text-[10px] font-mono text-muted-foreground border border-hairline"
                    >
                      {s}
                    </span>
                  ))}
                  {(opp.skills || []).length > 4 && (
                    <span className="text-[10px] font-mono text-muted-foreground/70 px-1 py-0.5">
                      +{(opp.skills || []).length - 4} more
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-3.5 mt-3.5 border-t border-hairline flex items-center justify-between gap-2 text-[11px] font-mono text-muted-foreground">
                <span>Eligibility: {opp.batchEligibility}</span>
                <span className="text-foreground font-medium">
                  {opp.applicationsCount || 0} applications
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-card border border-hairline rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-5 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-hairline">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  {modalMode === "create" ? <Plus className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-primary">Portal Admin</span>
                  <h3 className="font-serif text-lg font-normal text-foreground">
                    {modalMode === "create" ? "Post New Opportunity" : `Edit Opportunity: ${formValues.company}`}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="text-xs font-medium text-foreground block mb-1">
                    Role Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formValues.title}
                    onChange={(e) => setFormValues({ ...formValues, title: e.target.value })}
                    placeholder="e.g. Software Engineer — Core Systems"
                    className="w-full bg-secondary border border-hairline rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-foreground block mb-1">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formValues.company}
                    onChange={(e) => setFormValues({ ...formValues, company: e.target.value })}
                    placeholder="e.g. Google, Zerodha, Razorpay"
                    className="w-full bg-secondary border border-hairline rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-foreground block mb-1">
                    Company Logo Brand
                  </label>
                  <select
                    value={formValues.companyLogo}
                    onChange={(e) => setFormValues({ ...formValues, companyLogo: e.target.value })}
                    className="w-full bg-secondary border border-hairline rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
                  >
                    <option value="zerodha">Zerodha (Blue Kite)</option>
                    <option value="google">Google India (4-Color G)</option>
                    <option value="razorpay">Razorpay (Lightning Bolt)</option>
                    <option value="asci">ASCI Academy Labs</option>
                    <option value="custom">Other / Monogram</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-foreground block mb-1">
                    Role Type
                  </label>
                  <select
                    value={formValues.roleType}
                    onChange={(e) => setFormValues({ ...formValues, roleType: e.target.value as any })}
                    className="w-full bg-secondary border border-hairline rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
                  >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Internship">Internship</option>
                    <option value="Apprenticeship">Apprenticeship</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-foreground block mb-1">
                    Work Mode
                  </label>
                  <select
                    value={formValues.workMode}
                    onChange={(e) => setFormValues({ ...formValues, workMode: e.target.value as any })}
                    className="w-full bg-secondary border border-hairline rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
                  >
                    <option value="Hybrid">Hybrid</option>
                    <option value="Remote">Remote</option>
                    <option value="On-site">On-site</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-foreground block mb-1">
                    Compensation *
                  </label>
                  <input
                    type="text"
                    required
                    value={formValues.compensation}
                    onChange={(e) => setFormValues({ ...formValues, compensation: e.target.value })}
                    placeholder="e.g. ₹20 - 28 LPA"
                    className="w-full bg-secondary border border-hairline rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-foreground block mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formValues.location}
                    onChange={(e) => setFormValues({ ...formValues, location: e.target.value })}
                    placeholder="e.g. Bengaluru, Karnataka"
                    className="w-full bg-secondary border border-hairline rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-foreground block mb-1">
                    Batch Eligibility
                  </label>
                  <input
                    type="text"
                    value={formValues.batchEligibility}
                    onChange={(e) => setFormValues({ ...formValues, batchEligibility: e.target.value })}
                    placeholder="e.g. 2025 & 2026 Batch"
                    className="w-full bg-secondary border border-hairline rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-foreground block mb-1">
                    Experience Requirement
                  </label>
                  <input
                    type="text"
                    value={formValues.experience}
                    onChange={(e) => setFormValues({ ...formValues, experience: e.target.value })}
                    placeholder="e.g. Fresher / 0-2 Years"
                    className="w-full bg-secondary border border-hairline rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-medium text-foreground block mb-1">
                    Skills (Comma separated)
                  </label>
                  <input
                    type="text"
                    value={formValues.skillsStr}
                    onChange={(e) => setFormValues({ ...formValues, skillsStr: e.target.value })}
                    placeholder="e.g. Go, PostgreSQL, Kafka, Linux"
                    className="w-full bg-secondary border border-hairline rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="flex items-center justify-between gap-4 sm:col-span-2">
                  <div className="flex-1">
                    <label className="text-xs font-medium text-foreground block mb-1">
                      Days Left to Apply
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={90}
                      value={formValues.closingInDays}
                      onChange={(e) => setFormValues({ ...formValues, closingInDays: parseInt(e.target.value) || 7 })}
                      className="w-full bg-secondary border border-hairline rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-5">
                    <label className="flex items-center gap-2 text-xs font-medium text-foreground cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formValues.featured}
                        onChange={(e) => setFormValues({ ...formValues, featured: e.target.checked })}
                        className="rounded border-hairline accent-primary w-4 h-4 cursor-pointer"
                      />
                      <span>Featured Spotlight</span>
                    </label>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-medium text-foreground block mb-1">
                    Role Description
                  </label>
                  <textarea
                    rows={3}
                    value={formValues.description}
                    onChange={(e) => setFormValues({ ...formValues, description: e.target.value })}
                    placeholder="Describe role impact, team scope, and primary deliverables..."
                    className="w-full bg-secondary border border-hairline rounded-xl p-3 text-xs text-foreground focus:outline-none focus:border-primary resize-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-hairline">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-muted-foreground hover:bg-secondary cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-primary text-white text-xs font-medium hover:bg-primary-active cursor-pointer"
                >
                  {modalMode === "create" ? "Post Opportunity" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
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
                  This will permanently delete this drive and any associated application records.
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
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 rounded-xl bg-destructive text-destructive-foreground text-xs font-medium hover:bg-destructive/90 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
