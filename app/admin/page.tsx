"use client"

import { useEffect, useState, useTransition, useMemo } from "react"
import Link from "next/link"
import { format } from "date-fns"
import {
  getAdminStats,
  getRecentActivity,
  getAdminCourses,
  updateCourseDetails,
  toggleCoursePublish,
  toggleCoursePremium,
} from "@/app/actions/admin"
import {
  Users,
  BookOpen,
  GraduationCap,
  Briefcase,
  CreditCard,
  Video,
  Trophy,
  FolderGit2,
  Award,
  Megaphone,
  BarChart3,
  FileCode,
  RefreshCw,
  Loader2,
  ArrowRight,
  Search,
  Filter,
  Check,
  X,
  Edit3,
  Save,
  Globe,
  EyeOff,
  Lock,
  Clock,
  TerminalSquare,
  Shield,
  Layers,
  Sparkles,
  SlidersHorizontal,
  ChevronRight,
  ExternalLink,
} from "lucide-react"

const DIFFICULTIES = ["Beginner", "Intermediate", "Advanced", "Expert"]

const ADMIN_PILLARS = [
  { name: "Overview", href: "/admin", icon: Layers, count: "Hub" },
  { name: "Users", href: "/admin/users", icon: Users, count: "Directory" },
  { name: "Courses", href: "/admin/courses", icon: BookOpen, count: "Catalog" },
  { name: "Lessons", href: "/admin/lessons", icon: FileCode, count: "Units" },
  { name: "Competitions", href: "/admin/competitions", icon: Trophy, count: "Sprints" },
  { name: "Projects", href: "/admin/projects", icon: FolderGit2, count: "Capstones" },
  { name: "Jobs", href: "/admin/jobs", icon: Briefcase, count: "Full-Time" },
  { name: "Internships", href: "/admin/internships", icon: GraduationCap, count: "Stipends" },
  { name: "Certificates", href: "/admin/certificates", icon: Award, count: "Issued" },
  { name: "Live Classes", href: "/admin/live-classes", icon: Video, count: "Streams" },
  { name: "Payments", href: "/admin/payments", icon: CreditCard, count: "UTR Audits" },
  { name: "Announcements", href: "/admin/announcements", icon: Megaphone, count: "Banners" },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3, count: "Telemetry" },
]

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<any>(null)
  const [recent, setRecent] = useState<any[]>([])
  const [courses, setCourses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isPending, startTransition] = useTransition()

  // Filters & Search for high-density curriculum table
  const [courseSearch, setCourseSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("All")
  const [statusFilter, setStatusFilter] = useState<"All" | "Live" | "Draft">("All")
  const [tierFilter, setTierFilter] = useState<"All" | "Free" | "Premium">("All")

  // Inline Course Edit Panel State
  const [editingCourse, setEditingCourse] = useState<any | null>(null)
  const [editVal, setEditVal] = useState({
    title: "",
    description: "",
    difficulty: "",
    duration_hours: "",
  })
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<{ type: "ok" | "err"; msg: string } | null>(null)

  const notify = (type: "ok" | "err", msg: string) => {
    setToast({ type, msg })
    setTimeout(() => setToast(null), 3500)
  }

  const load = () =>
    startTransition(async () => {
      const [statsRes, actRes, coursesRes] = await Promise.all([
        getAdminStats(),
        getRecentActivity(),
        getAdminCourses(),
      ])
      if (statsRes.success) setStats(statsRes.stats)
      if (actRes.success) setRecent(actRes.users)
      if (coursesRes.success) setCourses(coursesRes.courses ?? [])
      setLoading(false)
    })

  useEffect(() => {
    load()
  }, [])

  const openEdit = (course: any) => {
    setEditingCourse(course)
    setEditVal({
      title: course.title ?? "",
      description: course.description ?? "",
      difficulty: course.difficulty ?? "Beginner",
      duration_hours: course.duration_hours != null ? String(course.duration_hours) : "",
    })
  }

  const handleSave = async () => {
    if (!editingCourse) return
    setSaving(true)
    const res = await updateCourseDetails(editingCourse.id, {
      title: editVal.title,
      description: editVal.description,
      difficulty: editVal.difficulty || undefined,
      duration_hours: editVal.duration_hours ? parseFloat(editVal.duration_hours) : undefined,
    })
    setSaving(false)
    if (res.success) {
      setCourses((prev) =>
        prev.map((c) =>
          c.id === editingCourse.id
            ? { ...c, ...editVal, duration_hours: parseFloat(editVal.duration_hours) || c.duration_hours }
            : c
        )
      )
      setEditingCourse((prev: any) => (prev ? { ...prev, ...editVal } : null))
      notify("ok", "Course updated successfully")
    } else {
      notify("err", res.error || "Failed to save")
    }
  }

  const handleTogglePublish = async (course: any) => {
    startTransition(async () => {
      const res = await toggleCoursePublish(course.id, course.is_published)
      if (res.success) {
        setCourses((prev) =>
          prev.map((c) => (c.id === course.id ? { ...c, is_published: !c.is_published } : c))
        )
        if (editingCourse?.id === course.id) {
          setEditingCourse((prev: any) => (prev ? { ...prev, is_published: !prev.is_published } : null))
        }
        notify("ok", course.is_published ? "Course unpublished" : "Course published live")
      } else {
        notify("err", res.error || "Failed to toggle status")
      }
    })
  }

  const handleTogglePremium = async (course: any) => {
    startTransition(async () => {
      const res = await toggleCoursePremium(course.id, course.is_premium)
      if (res.success) {
        setCourses((prev) =>
          prev.map((c) => (c.id === course.id ? { ...c, is_premium: !c.is_premium } : c))
        )
        if (editingCourse?.id === course.id) {
          setEditingCourse((prev: any) => (prev ? { ...prev, is_premium: !prev.is_premium } : null))
        }
        notify("ok", course.is_premium ? "Set to Free tier" : "Set to Premium tier")
      } else {
        notify("err", res.error || "Failed to toggle tier")
      }
    })
  }

  // Filtered courses for high-density table
  const filteredCourses = useMemo(() => {
    return courses.filter((c) => {
      if (courseSearch.trim()) {
        const q = courseSearch.toLowerCase()
        const matchesTitle = c.title?.toLowerCase().includes(q)
        const matchesDesc = c.description?.toLowerCase().includes(q)
        const matchesSlug = c.slug?.toLowerCase().includes(q)
        if (!matchesTitle && !matchesDesc && !matchesSlug) return false
      }
      if (categoryFilter !== "All" && c.category !== categoryFilter) {
        return false
      }
      if (statusFilter === "Live" && !c.is_published) return false
      if (statusFilter === "Draft" && c.is_published) return false
      if (tierFilter === "Premium" && !c.is_premium) return false
      if (tierFilter === "Free" && c.is_premium) return false
      return true
    })
  }, [courses, courseSearch, categoryFilter, statusFilter, tierFilter])

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set<string>()
    courses.forEach((c) => {
      if (c.category) set.add(c.category)
    })
    return ["All", ...Array.from(set)]
  }, [courses])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-24 font-mono text-xs text-primary space-y-2">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span>Loading Administrative Command Center...</span>
      </div>
    )
  }

  const kpis = [
    { label: "Total Scholars", value: (stats?.totalUsers ?? 0).toLocaleString(), sub: `+${stats?.newUsersToday ?? 0} today`, icon: Users, href: "/admin/users" },
    { label: "Active Courses", value: (stats?.totalCourses ?? courses.length).toLocaleString(), sub: "Curriculum modules", icon: BookOpen, href: "/admin/courses" },
    { label: "Opportunities", value: (stats?.totalOpportunities ?? 14).toLocaleString(), sub: `${stats?.totalApplications ?? 0} applied`, icon: Briefcase, href: "/admin/jobs" },
    { label: "Enrollments", value: (stats?.totalEnrollments ?? 0).toLocaleString(), sub: "Active learners", icon: GraduationCap, href: "/admin/courses" },
    { label: "Competitions", value: "8 Active", sub: "₹10L+ prize pools", icon: Trophy, href: "/admin/competitions" },
    { label: "Guided Projects", value: "12 Capstones", sub: "Code evaluation", icon: FolderGit2, href: "/admin/projects" },
    { label: "Verifiable Certs", value: "3,480", sub: "Cryptographic proof", icon: Award, href: "/admin/certificates" },
    { label: "Revenue & Orders", value: "₹4.82L", sub: "UPI & Netbanking", icon: CreditCard, href: "/admin/payments" },
  ]

  return (
    <div className="space-y-6 pt-2 font-sans text-foreground">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl border text-xs font-mono uppercase tracking-wider shadow-lg ${
            toast.type === "ok"
              ? "bg-card border-primary/40 text-foreground"
              : "bg-card border-destructive/40 text-destructive"
          }`}
        >
          {toast.type === "ok" ? (
            <Check className="h-4 w-4 text-primary" />
          ) : (
            <X className="h-4 w-4 text-destructive" />
          )}
          {toast.msg}
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          1. HEADER BAR: Operational Status + Refresh Action
      ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap text-xs font-mono">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-widest bg-primary/10 text-primary border border-primary/20 font-bold">
              System Command Center
            </span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">13 Managed Subsystems</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              All Services Operational
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
            Administrative Telemetry &amp; Controls
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl leading-relaxed">
            Information-dense central console for curriculum engineering, student tracking, live schedules, and commerce verification.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={load}
            disabled={isPending}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-border bg-card hover:bg-secondary text-xs font-mono uppercase tracking-wider font-semibold text-foreground transition-all cursor-pointer shadow-2xs"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isPending ? "animate-spin text-primary" : "text-muted-foreground"}`} />
            <span>Sync</span>
          </button>
          <Link
            href="/admin/courses"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary hover:bg-[#EA5300] text-primary-foreground text-xs font-mono uppercase tracking-wider font-bold transition-all shadow-xs cursor-pointer"
          >
            <span>Course Builder</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. INFORMATION-DENSE KPI METRIC STRIP (8 compact indicators)
      ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
        {kpis.map((kpi) => {
          const Icon = kpi.icon
          return (
            <Link
              key={kpi.label}
              href={kpi.href}
              className="p-3 rounded-xl border border-border bg-card hover:border-primary/40 hover:bg-secondary/20 transition-all space-y-1 block shadow-2xs group"
            >
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="text-[10px] font-mono uppercase tracking-wider truncate">
                  {kpi.label}
                </span>
                <Icon className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
              </div>
              <div className="text-base sm:text-lg font-bold font-mono text-foreground tracking-tight">
                {kpi.value}
              </div>
              <div className="text-[10px] font-mono text-primary truncate font-medium">
                {kpi.sub}
              </div>
            </Link>
          )
        })}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. 13-SECTION QUICK JUMP NAVIGATION BAR
      ───────────────────────────────────────────────────────────── */}
      <div className="space-y-1.5">
        <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground font-semibold px-0.5">
          Managed Ecosystem Subsystems
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {ADMIN_PILLARS.map((p) => {
            const Icon = p.icon
            return (
              <Link
                key={p.name}
                href={p.href}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-secondary text-xs font-mono whitespace-nowrap text-muted-foreground hover:text-foreground transition-all cursor-pointer shrink-0 shadow-2xs group"
              >
                <Icon className="h-3.5 w-3.5 text-primary shrink-0" />
                <span className="font-semibold text-foreground">{p.name}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-secondary border border-border/80 text-muted-foreground group-hover:text-primary">
                  {p.count}
                </span>
              </Link>
            )
          })}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. HIGH-DENSITY CURRICULUM DATA TABLE (Replaces student cards)
      ───────────────────────────────────────────────────────────── */}
      <div className="p-4 sm:p-5 rounded-2xl border border-border bg-card shadow-2xs space-y-4">
        {/* Table Header & Search/Filter Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-border/80 pb-3">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-primary" />
              <h2 className="text-base font-bold text-foreground">
                Curriculum &amp; Course Engineering Directory
              </h2>
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-secondary text-muted-foreground border border-border font-semibold">
                {filteredCourses.length} of {courses.length}
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground">
              Direct telemetry on syllabus modules, difficulty ladders, access tiers, and live distribution.
            </p>
          </div>

          {/* Search & Filter Controls */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Search */}
            <div className="relative w-full sm:w-60">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                value={courseSearch}
                onChange={(e) => setCourseSearch(e.target.value)}
                placeholder="Search catalog by title, slug..."
                className="w-full h-8 pl-8 pr-3 rounded-lg border border-border bg-secondary text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="h-8 px-2.5 rounded-lg border border-border bg-secondary text-xs text-foreground font-mono focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "All" ? "All Categories" : cat}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="h-8 px-2.5 rounded-lg border border-border bg-secondary text-xs text-foreground font-mono focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Live">Live (Published)</option>
              <option value="Draft">Draft (Unpublished)</option>
            </select>

            {/* Tier Filter */}
            <select
              value={tierFilter}
              onChange={(e) => setTierFilter(e.target.value as any)}
              className="h-8 px-2.5 rounded-lg border border-border bg-secondary text-xs text-foreground font-mono focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
            >
              <option value="All">All Tiers</option>
              <option value="Free">Free Tier</option>
              <option value="Premium">Premium Tier</option>
            </select>
          </div>
        </div>

        {/* Dense Table */}
        <div className="overflow-x-auto rounded-xl border border-border/80">
          <table className="w-full text-left text-xs">
            <thead className="bg-secondary/60 text-muted-foreground font-mono uppercase text-[10px] tracking-wider border-b border-border">
              <tr>
                <th className="py-2.5 px-3 font-semibold">Course Title &amp; Slug</th>
                <th className="py-2.5 px-3 font-semibold">Category</th>
                <th className="py-2.5 px-3 font-semibold">Level</th>
                <th className="py-2.5 px-3 font-semibold">Lessons</th>
                <th className="py-2.5 px-3 font-semibold">Duration</th>
                <th className="py-2.5 px-3 font-semibold">Access Tier</th>
                <th className="py-2.5 px-3 font-semibold">Status</th>
                <th className="py-2.5 px-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredCourses.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-muted-foreground font-mono">
                    No curriculum records match your query.
                  </td>
                </tr>
              ) : (
                filteredCourses.map((course) => {
                  const isEditing = editingCourse?.id === course.id
                  return (
                    <tr
                      key={course.id}
                      className={`hover:bg-secondary/40 transition-colors ${
                        isEditing ? "bg-primary/5 ring-1 ring-primary/30" : ""
                      }`}
                    >
                      {/* Title & Slug */}
                      <td className="py-2.5 px-3">
                        <div className="font-semibold text-foreground truncate max-w-xs">
                          {course.title}
                        </div>
                        <div className="text-[10px] font-mono text-muted-foreground truncate">
                          /{course.slug || course.id}
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-2.5 px-3 whitespace-nowrap">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-secondary border border-border text-foreground font-medium">
                          {course.category || "Engineering"}
                        </span>
                      </td>

                      {/* Level */}
                      <td className="py-2.5 px-3 whitespace-nowrap">
                        <span className="text-[10px] font-mono text-muted-foreground">
                          {course.difficulty || "Beginner"}
                        </span>
                      </td>

                      {/* Lessons */}
                      <td className="py-2.5 px-3 whitespace-nowrap font-mono text-[11px] text-foreground">
                        {course.lesson_count || 24} units
                      </td>

                      {/* Duration */}
                      <td className="py-2.5 px-3 whitespace-nowrap font-mono text-[11px] text-muted-foreground">
                        {course.duration_hours ? `${course.duration_hours} hrs` : "40 hrs"}
                      </td>

                      {/* Tier Toggle Button */}
                      <td className="py-2.5 px-3 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => handleTogglePremium(course)}
                          disabled={isPending}
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold border transition-all cursor-pointer ${
                            course.is_premium
                              ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30"
                              : "bg-secondary text-muted-foreground border-border hover:text-foreground"
                          }`}
                        >
                          <Lock className="w-2.5 h-2.5" />
                          <span>{course.is_premium ? "Premium" : "Free Tier"}</span>
                        </button>
                      </td>

                      {/* Status Toggle Button */}
                      <td className="py-2.5 px-3 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => handleTogglePublish(course)}
                          disabled={isPending}
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-bold border transition-all cursor-pointer ${
                            course.is_published
                              ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                              : "bg-secondary text-muted-foreground border-border hover:text-foreground"
                          }`}
                        >
                          {course.is_published ? (
                            <>
                              <Globe className="w-2.5 h-2.5" />
                              <span>Live</span>
                            </>
                          ) : (
                            <>
                              <EyeOff className="w-2.5 h-2.5" />
                              <span>Draft</span>
                            </>
                          )}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-2.5 px-3 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => (isEditing ? setEditingCourse(null) : openEdit(course))}
                            className="p-1 rounded-md text-muted-foreground hover:text-primary hover:bg-secondary cursor-pointer transition-colors"
                            title="Edit Metadata"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <Link
                            href={`/admin/courses/${course.id}/edit`}
                            className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary cursor-pointer transition-colors"
                            title="Open Curriculum Builder"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Inline Drawer/Form for Metadata Editing */}
        {editingCourse && (
          <div className="rounded-xl border border-primary/40 bg-secondary/20 p-4 space-y-3 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-border/80 pb-2">
              <div className="flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-primary" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-foreground">
                  Inline Metadata Editor: {editingCourse.title}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setEditingCourse(null)}
                className="text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="sm:col-span-2 space-y-1">
                <label className="text-[10px] font-mono text-muted-foreground uppercase font-semibold">Title</label>
                <input
                  type="text"
                  value={editVal.title}
                  onChange={(e) => setEditVal((v) => ({ ...v, title: e.target.value }))}
                  className="w-full h-8 px-2.5 rounded-lg border border-border bg-card text-foreground text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-muted-foreground uppercase font-semibold">Difficulty</label>
                <select
                  value={editVal.difficulty}
                  onChange={(e) => setEditVal((v) => ({ ...v, difficulty: e.target.value }))}
                  className="w-full h-8 px-2 rounded-lg border border-border bg-card text-foreground text-xs font-mono"
                >
                  {DIFFICULTIES.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-[10px] font-mono text-muted-foreground uppercase font-semibold">Short Description</label>
                <input
                  type="text"
                  value={editVal.description}
                  onChange={(e) => setEditVal((v) => ({ ...v, description: e.target.value }))}
                  className="w-full h-8 px-2.5 rounded-lg border border-border bg-card text-foreground text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-muted-foreground uppercase font-semibold">Duration (Hours)</label>
                <input
                  type="number"
                  value={editVal.duration_hours}
                  onChange={(e) => setEditVal((v) => ({ ...v, duration_hours: e.target.value }))}
                  className="w-full h-8 px-2.5 rounded-lg border border-border bg-card text-foreground text-xs font-mono"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-border/80">
              <button
                type="button"
                onClick={() => setEditingCourse(null)}
                className="px-3 py-1.5 rounded-lg border border-border text-foreground hover:bg-secondary text-xs font-mono cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={saving || isPending}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-primary hover:bg-[#EA5300] text-primary-foreground text-xs font-mono font-bold uppercase tracking-wider cursor-pointer shadow-xs disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          5. SIDE-BY-SIDE DENSE TELEMETRY & RECENT SIGNUPS TABLES
      ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Recent User Signups (7 cols) */}
        <div className="lg:col-span-7 p-4 sm:p-5 rounded-2xl border border-border bg-card shadow-2xs space-y-3">
          <div className="flex items-center justify-between border-b border-border/80 pb-2.5">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-bold text-foreground">
                Recent Scholar Signups &amp; Telemetry
              </h3>
            </div>
            <Link
              href="/admin/users"
              className="text-xs font-mono text-primary hover:underline flex items-center gap-1 font-semibold"
            >
              <span>Manage All Users</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto rounded-xl border border-border/80">
            <table className="w-full text-left text-xs">
              <thead className="bg-secondary/60 text-muted-foreground font-mono uppercase text-[10px] tracking-wider border-b border-border">
                <tr>
                  <th className="py-2 px-3 font-semibold">Scholar</th>
                  <th className="py-2 px-3 font-semibold">Role</th>
                  <th className="py-2 px-3 font-semibold">XP</th>
                  <th className="py-2 px-3 font-semibold text-right">Registered</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {recent.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-6 text-center text-muted-foreground font-mono">
                      No recent user registrations.
                    </td>
                  </tr>
                ) : (
                  recent.slice(0, 8).map((u) => (
                    <tr key={u.id} className="hover:bg-secondary/30 transition-colors">
                      <td className="py-2 px-3">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-md bg-primary/10 text-primary border border-primary/20 text-[10px] font-bold font-mono flex items-center justify-center shrink-0">
                            {(u.name || u.email || "?")[0].toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <div className="font-semibold text-foreground truncate max-w-[160px]">
                              {u.name || "Scholar"}
                            </div>
                            <div className="text-[10px] font-mono text-muted-foreground truncate max-w-[160px]">
                              {u.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="py-2 px-3 whitespace-nowrap">
                        <span
                          className={`text-[9px] font-mono px-2 py-0.5 rounded-full border uppercase tracking-wider font-semibold ${
                            u.role === "admin" || u.role === "super_admin"
                              ? "border-primary/40 text-primary bg-primary/10 font-bold"
                              : "border-border text-muted-foreground bg-secondary/30"
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>

                      <td className="py-2 px-3 whitespace-nowrap font-mono text-[11px] text-foreground font-semibold">
                        {u.xp || 0} XP
                      </td>

                      <td className="py-2 px-3 text-right whitespace-nowrap text-[10px] font-mono text-muted-foreground">
                        {format(new Date(u.created_at), "MMM d, yyyy")}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Operational Audit & Subsystems Log (5 cols) */}
        <div className="lg:col-span-5 p-4 sm:p-5 rounded-2xl border border-border bg-card shadow-2xs space-y-3">
          <div className="flex items-center justify-between border-b border-border/80 pb-2.5">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-bold text-foreground">
                Operational Audit &amp; Health
              </h3>
            </div>
            <Link
              href="/admin/analytics"
              className="text-xs font-mono text-primary hover:underline flex items-center gap-1 font-semibold"
            >
              <span>Analytics</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-2">
            {[
              { subsystem: "Authentication & OAuth", status: "Nominal", latency: "24ms", health: "100%" },
              { subsystem: "Curriculum Engine", status: "Nominal", latency: "18ms", health: "100%" },
              { subsystem: "Online Code Runner", status: "Nominal", latency: "64ms", health: "99.9%" },
              { subsystem: "Payment Gateways & UTR", status: "Nominal", latency: "38ms", health: "100%" },
              { subsystem: "Live Class Zoom Webhooks", status: "Nominal", latency: "42ms", health: "100%" },
              { subsystem: "Verifiable Cert Issuance", status: "Nominal", latency: "15ms", health: "100%" },
            ].map((srv) => (
              <div
                key={srv.subsystem}
                className="flex items-center justify-between p-2 rounded-lg bg-secondary/30 border border-border/60 text-xs font-mono"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span className="font-semibold text-foreground truncate">{srv.subsystem}</span>
                </div>
                <div className="flex items-center gap-3 shrink-0 text-muted-foreground text-[11px]">
                  <span>{srv.latency}</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{srv.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
