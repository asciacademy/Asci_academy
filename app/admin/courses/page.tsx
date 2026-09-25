"use client"

import { useState, useEffect, useTransition, useMemo } from "react"
import {
    getAdminCourses, toggleCoursePublish, toggleCoursePremium,
    updateCourseDetails, deleteCourse, createCourse, getAdminStats,
    duplicateCourse, batchUpdateCoursesPublish, batchUpdateCoursesPremium, batchDeleteCourses
} from "@/app/actions/admin"
import Link from "next/link"
import {
    BookOpen, Edit3, Eye, EyeOff, Star, Save, X,
    Loader2, Check, AlertCircle, Lock, Globe, RefreshCw,
    Trash2, Plus, Search, Users, TrendingUp, Download, Clock,
    Copy, ExternalLink, LayoutGrid, List, SlidersHorizontal,
    CheckSquare, Square, MoreHorizontal, ArrowUpDown, ChevronRight,
    ShieldCheck, Sparkles, Filter, Award, Code2, Image as ImageIcon
} from "lucide-react"
import { CourseEditorModal } from "@/components/courses/course-editor-modal"
import { useCoursesStore, UnifiedCourse } from "@/lib/courses-store"
import { getCourseraDataForCourse } from "@/lib/coursera-metadata"

const DIFFICULTIES = ["All", "Beginner", "Intermediate", "Advanced"]

const CATEGORIES = [
    "All",
    "AI & ML",
    "Data Science",
    "Cybersecurity",
    "Systems & Languages",
    "Web & Full-Stack",
    "DSA",
    "Backend",
    "Cloud & Infra"
]

export default function AdminCoursesPage() {
    const [courses, setCourses] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [isPending, startTransition] = useTransition()
    const { addCourse: storeAddCourse, updateCourse: storeUpdateCourse, deleteCourse: storeDeleteCourse } = useCoursesStore()

    // Filters & Sorting
    const [search, setSearch] = useState("")
    const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft" | "premium" | "free">("all")
    const [categoryFilter, setCategoryFilter] = useState("All")
    const [difficultyFilter, setDifficultyFilter] = useState("All")
    const [sortBy, setSortBy] = useState<"recent" | "scholars" | "rating" | "title" | "duration">("recent")
    const [viewMode, setViewMode] = useState<"grid" | "table">("grid")

    // Selection for Batch Actions
    const [selectedIds, setSelectedIds] = useState<string[]>([])
    const [isBatchOperating, setIsBatchOperating] = useState(false)

    // Modal Editor State
    const [isEditorOpen, setIsEditorOpen] = useState(false)
    const [editingCourse, setEditingCourse] = useState<UnifiedCourse | null>(null)
    const [modalInitialTab, setModalInitialTab] = useState<"details" | "partner" | "curriculum" | "media" | "faqs">("details")

    // Delete confirmation modal / inline
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
    const [batchDeleteConfirm, setBatchDeleteConfirm] = useState(false)

    // Stats & Feedback Toast
    const [stats, setStats] = useState<any>(null)
    const [toast, setToast] = useState<{ type: "ok" | "err"; msg: string } | null>(null)

    const notify = (type: "ok" | "err", msg: string) => {
        setToast({ type, msg })
        setTimeout(() => setToast(null), 3500)
    }

    const load = () => startTransition(async () => {
        const [cRes, sRes] = await Promise.all([getAdminCourses(), getAdminStats()])
        if (cRes.success && cRes.courses) setCourses(cRes.courses)
        if (sRes.success) setStats(sRes.stats)
        setLoading(false)
    })

    useEffect(() => { load() }, [])

    // ── Single Course Quick Toggles ──────────────────────────────────────────
    const handleTogglePublish = async (courseId: string, currentPublished: boolean) => {
        startTransition(async () => {
            const res = await toggleCoursePublish(courseId, currentPublished)
            if (res.success) {
                setCourses(prev => prev.map(c => c.id === courseId ? { ...c, is_published: !currentPublished } : c))
                notify("ok", `Course ${currentPublished ? "unpublished (Draft)" : "published (Live Catalog)"}`)
            } else notify("err", res.error || "Failed to update publish state")
        })
    }

    const handleTogglePremium = async (courseId: string, currentPremium: boolean) => {
        startTransition(async () => {
            const res = await toggleCoursePremium(courseId, currentPremium)
            if (res.success) {
                setCourses(prev => prev.map(c => c.id === courseId ? { ...c, is_premium: !currentPremium } : c))
                notify("ok", `Tier updated to ${currentPremium ? "Free Access" : "Architect Plan Required"}`)
            } else notify("err", res.error || "Failed to update tier")
        })
    }

    const handleDelete = async (courseId: string) => {
        startTransition(async () => {
            const res = await deleteCourse(courseId)
            if (res.success) {
                setCourses(prev => prev.filter(c => c.id !== courseId))
                await storeDeleteCourse(courseId)
                setSelectedIds(prev => prev.filter(id => id !== courseId))
                notify("ok", "Course and syllabus removed permanently")
            } else notify("err", res.error || "Failed to delete course")
            setDeleteConfirm(null)
        })
    }

    // ── 1-Click Course Cloning / Duplication ──────────────────────────────────
    const handleClone = async (courseId: string, courseTitle: string) => {
        startTransition(async () => {
            notify("ok", `Cloning "${courseTitle}" syllabus and modules...`)
            const res = await duplicateCourse(courseId)
            if (res.success) {
                notify("ok", `Successfully duplicated "${courseTitle}" as Draft!`)
                load()
            } else {
                notify("err", res.error || "Failed to clone course")
            }
        })
    }

    // ── Quick Editor Modal Save Handler ──────────────────────────────────────
    const handleOpenQuickEdit = (course: any, tab: "details" | "partner" | "curriculum" | "media" | "faqs" = "details") => {
        const cSlug = course.slug || course.id
        const extra = getCourseraDataForCourse(cSlug, course.title, course.category)
        const fullCourse: UnifiedCourse = {
            id: course.id,
            slug: cSlug,
            title: course.title,
            category: course.category || "AI & ML",
            level: course.difficulty || "Intermediate",
            weeks: `${Math.max(1, Math.round((course.duration_hours || 40) / 6))} Weeks`,
            duration_hours: course.duration_hours || 40,
            modules: course.module_count || 4,
            lessons: (course.module_count || 4) * 3,
            projects: 2,
            certificate: `${extra.credentialType || "Specialization"} of Completion`,
            is_premium: Boolean(course.is_premium),
            is_published: course.is_published ?? true,
            description: course.description || "",
            thumbnail_url: course.thumbnail_url || extra.thumbnail,
            tools: extra.skills || [],
            courseraData: extra,
        }
        setEditingCourse(fullCourse)
        setModalInitialTab(tab)
        setIsEditorOpen(true)
    }

    const handleOpenCreateCourse = () => {
        setEditingCourse(null)
        setModalInitialTab("details")
        setIsEditorOpen(true)
    }

    const handleSaveCourseModal = async ({ isNew, course }: { isNew: boolean; course: any }) => {
        if (isNew) {
            const res = await createCourse({
                title: course.title,
                slug: course.slug,
                description: course.description,
                difficulty: course.level || course.difficulty || "Intermediate",
                duration_hours: Number(course.duration_hours) || 40,
                is_premium: Boolean(course.is_premium),
                template: "masterclass"
            })
            if (res.success) {
                await storeAddCourse(course)
                notify("ok", `Course "${course.title}" created successfully!`)
                load()
            } else {
                throw new Error(res.error || "Failed to create course in database")
            }
        } else {
            const targetId = editingCourse?.id || course.id || course.slug
            const updateRes = await updateCourseDetails(targetId, {
                title: course.title,
                description: course.description,
                difficulty: course.level || course.difficulty,
                duration_hours: Number(course.duration_hours) || 40,
                thumbnail_url: course.thumbnail_url || course.thumbnail,
                category: course.category,
            })

            if (editingCourse && editingCourse.is_published !== course.is_published) {
                await toggleCoursePublish(targetId, editingCourse.is_published)
            }
            if (editingCourse && editingCourse.is_premium !== course.is_premium) {
                await toggleCoursePremium(targetId, editingCourse.is_premium)
            }

            if (updateRes.success) {
                await storeUpdateCourse(targetId, course)
                notify("ok", `Updated "${course.title}" metadata & curriculum!`)
                load()
            } else {
                throw new Error(updateRes.error || "Failed to update course details")
            }
        }
    }

    // ── Batch Operations ─────────────────────────────────────────────────────
    const toggleSelectAll = () => {
        if (selectedIds.length === filteredCourses.length) {
            setSelectedIds([])
        } else {
            setSelectedIds(filteredCourses.map(c => c.id))
        }
    }

    const toggleSelectCourse = (courseId: string) => {
        setSelectedIds(prev => 
            prev.includes(courseId) ? prev.filter(id => id !== courseId) : [...prev, courseId]
        )
    }

    const handleBatchPublish = async (publish: boolean) => {
        if (selectedIds.length === 0) return
        setIsBatchOperating(true)
        try {
            const res = await batchUpdateCoursesPublish(selectedIds, publish)
            if (res.success) {
                setCourses(prev => prev.map(c => selectedIds.includes(c.id) ? { ...c, is_published: publish } : c))
                notify("ok", `Updated ${selectedIds.length} course${selectedIds.length === 1 ? "" : "s"} to ${publish ? "Live" : "Draft"}`)
                setSelectedIds([])
            } else notify("err", res.error || "Batch publish failed")
        } finally {
            setIsBatchOperating(false)
        }
    }

    const handleBatchPremium = async (isPremium: boolean) => {
        if (selectedIds.length === 0) return
        setIsBatchOperating(true)
        try {
            const res = await batchUpdateCoursesPremium(selectedIds, isPremium)
            if (res.success) {
                setCourses(prev => prev.map(c => selectedIds.includes(c.id) ? { ...c, is_premium: isPremium } : c))
                notify("ok", `Updated ${selectedIds.length} course${selectedIds.length === 1 ? "" : "s"} tier to ${isPremium ? "Architect Pro" : "Free"}`)
                setSelectedIds([])
            } else notify("err", res.error || "Batch tier update failed")
        } finally {
            setIsBatchOperating(false)
        }
    }

    const handleBatchDelete = async () => {
        if (selectedIds.length === 0) return
        setIsBatchOperating(true)
        try {
            const res = await batchDeleteCourses(selectedIds)
            if (res.success) {
                setCourses(prev => prev.filter(c => !selectedIds.includes(c.id)))
                notify("ok", `Deleted ${selectedIds.length} courses permanently`)
                setSelectedIds([])
                setBatchDeleteConfirm(false)
            } else notify("err", res.error || "Batch delete failed")
        } finally {
            setIsBatchOperating(false)
        }
    }

    const handleExportJSON = (selectedOnly = false) => {
        const dataset = selectedOnly 
            ? courses.filter(c => selectedIds.includes(c.id))
            : courses
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dataset, null, 2))
        const a = document.createElement('a')
        a.setAttribute("href", dataStr)
        a.setAttribute("download", `asci_courses_${selectedOnly ? "selected" : "catalog"}_export.json`)
        document.body.appendChild(a)
        a.click()
        a.remove()
        notify("ok", `Exported ${dataset.length} courses as JSON`)
    }

    // ── Filtered & Sorted Course List ────────────────────────────────────────
    const filteredCourses = useMemo(() => {
        return courses.filter(c => {
            // Status Tab
            if (statusFilter === "published" && !c.is_published) return false
            if (statusFilter === "draft" && c.is_published) return false
            if (statusFilter === "premium" && !c.is_premium) return false
            if (statusFilter === "free" && c.is_premium) return false

            // Category Filter
            if (categoryFilter !== "All") {
                const s = (c.slug || c.id || "").toLowerCase()
                const title = (c.title || "").toLowerCase()
                if (categoryFilter === "AI & ML") {
                    if (!c.category?.includes("AI") && !s.includes("ai") && !s.includes("rag") && !s.includes("learning") && !title.includes("ai")) return false
                } else if (categoryFilter === "Data Science") {
                    if (!c.category?.includes("Data") && !s.includes("data") && !s.includes("analytics")) return false
                } else if (categoryFilter === "Cybersecurity") {
                    if (!c.category?.includes("Cyber") && !s.includes("security") && !s.includes("hack")) return false
                } else if (categoryFilter === "Systems & Languages") {
                    if (!s.includes("cpp") && !s.includes("c") && !s.includes("rust") && !s.includes("java") && !c.category?.includes("Programming")) return false
                } else if (categoryFilter === "DSA") {
                    if (!s.includes("dsa") && !s.includes("algo") && c.category !== "DSA") return false
                } else if (categoryFilter === "Web & Full-Stack") {
                    if (!s.includes("web") && !s.includes("react") && !s.includes("html") && !c.category?.includes("Web")) return false
                } else if (c.category && c.category !== categoryFilter) {
                    return false
                }
            }

            // Difficulty Filter
            if (difficultyFilter !== "All") {
                const diff = (c.difficulty || "Intermediate").toLowerCase()
                if (diff !== difficultyFilter.toLowerCase()) return false
            }

            // Search Keyword
            if (search.trim()) {
                const query = search.toLowerCase().trim()
                const title = (c.title || "").toLowerCase()
                const desc = (c.description || "").toLowerCase()
                const slug = (c.slug || c.id || "").toLowerCase()
                if (!title.includes(query) && !desc.includes(query) && !slug.includes(query)) return false
            }

            return true
        }).sort((a, b) => {
            if (sortBy === "scholars") {
                return (b.enrollment_count || 0) - (a.enrollment_count || 0)
            }
            if (sortBy === "title") {
                return (a.title || "").localeCompare(b.title || "")
            }
            if (sortBy === "duration") {
                return (b.duration_hours || 0) - (a.duration_hours || 0)
            }
            if (sortBy === "rating") {
                return 4.9 - 4.8 // high rating default
            }
            // default recent
            return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()
        })
    }, [courses, statusFilter, categoryFilter, difficultyFilter, search, sortBy])

    // Status Tab Counts
    const counts = useMemo(() => {
        return {
            all: courses.length,
            published: courses.filter(c => c.is_published).length,
            draft: courses.filter(c => !c.is_published).length,
            premium: courses.filter(c => c.is_premium).length,
            free: courses.filter(c => !c.is_premium).length,
        }
    }, [courses])

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center p-28 font-mono text-xs text-primary space-y-3">
                <Loader2 className="h-7 w-7 animate-spin" />
                <span>Loading academic course command center...</span>
            </div>
        )
    }

    return (
        <div className="space-y-7 pt-2 font-sans text-foreground">
            {/* Feedback Toast */}
            {toast && (
                <div className={`fixed top-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl border text-xs font-mono shadow-xl backdrop-blur-xl animate-in fade-in slide-in-from-top-3 ${
                    toast.type === "ok" 
                        ? "bg-card border-primary/40 text-foreground" 
                        : "bg-card border-destructive/40 text-destructive"
                }`}>
                    {toast.type === "ok" ? <Check className="h-4 w-4 text-primary shrink-0" /> : <AlertCircle className="h-4 w-4 text-destructive shrink-0" />}
                    <span>{toast.msg}</span>
                </div>
            )}

            {/* Header Ribbon with Actions */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-border pb-6">
                <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-widest bg-primary/10 text-primary border border-primary/20 mb-2 font-semibold">
                        Curriculum Command Center
                    </div>
                    <h1 className="font-sans text-3xl sm:text-4xl font-bold text-foreground tracking-tight flex items-center gap-3">
                        <span>Course Catalog Directory</span>
                        <span className="text-muted-foreground text-xl font-mono font-normal">
                            ({filteredCourses.length} of {courses.length})
                        </span>
                    </h1>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-2xl font-sans leading-relaxed">
                        Author comprehensive engineering syllabi, manage Coursera accreditation standards, clone master tracks, and configure tiered access.
                    </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                    <button
                        onClick={() => handleExportJSON(false)}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border bg-card text-xs font-mono font-semibold hover:bg-secondary text-foreground transition-all cursor-pointer shadow-2xs"
                        title="Export all courses as JSON"
                    >
                        <Download className="h-3.5 w-3.5" /> 
                        <span className="hidden sm:inline">Export Catalog</span>
                    </button>

                    <button
                        onClick={load}
                        disabled={isPending}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border bg-card text-xs font-mono font-semibold hover:bg-secondary text-foreground transition-all cursor-pointer shadow-2xs"
                        title="Refresh dataset"
                    >
                        <RefreshCw className={`h-3.5 w-3.5 ${isPending ? "animate-spin" : ""}`} />
                        <span className="hidden sm:inline">Refresh</span>
                    </button>

                    <button
                        onClick={handleOpenCreateCourse}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary hover:bg-primary-active text-primary-foreground text-xs font-mono font-semibold uppercase tracking-wider transition-all shadow-xs cursor-pointer active:scale-98"
                    >
                        <Plus className="h-4 w-4" /> 
                        <span>New Course</span>
                    </button>
                </div>
            </div>

            {/* Quick Stats Ribbon */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                <div className="bg-card border border-border/80 rounded-2xl p-4 relative overflow-hidden shadow-2xs">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block">Total Programs</span>
                    <div className="text-2xl font-sans text-foreground mt-1 font-bold">{courses.length}</div>
                    <span className="text-[10px] text-muted-foreground font-mono">Curriculum Tracks</span>
                </div>

                <div className="bg-card border border-border/80 rounded-2xl p-4 relative overflow-hidden shadow-2xs">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block">Live Catalog</span>
                    <div className="text-2xl font-sans text-primary mt-1 font-bold">{counts.published}</div>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">Accessible by Students</span>
                </div>

                <div className="bg-card border border-border/80 rounded-2xl p-4 relative overflow-hidden shadow-2xs">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block">Drafts Pending</span>
                    <div className="text-2xl font-sans text-amber-600 dark:text-amber-400 mt-1 font-bold">{counts.draft}</div>
                    <span className="text-[10px] text-muted-foreground font-mono">In-review / staging</span>
                </div>

                <div className="bg-card border border-border/80 rounded-2xl p-4 relative overflow-hidden shadow-2xs">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block">Architect Tier</span>
                    <div className="text-2xl font-sans text-primary mt-1 font-bold">{counts.premium}</div>
                    <span className="text-[10px] text-muted-foreground font-mono">Pro plan tracks</span>
                </div>

                <div className="bg-card border border-border/80 rounded-2xl p-4 relative overflow-hidden shadow-2xs col-span-2 sm:col-span-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block">Active Scholars</span>
                    <div className="text-2xl font-sans text-foreground mt-1 font-bold">
                        {courses.reduce((acc, c) => acc + (c.enrollment_count || 0), 0)}
                    </div>
                    <span className="text-[10px] text-primary font-mono">Total enrollments</span>
                </div>
            </div>

            {/* Filter Navigation Tabs + View Mode Switcher */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                {/* Status Tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar p-1 rounded-2xl bg-secondary border border-hairline">
                    {(
                        [
                            { key: "all", label: "All Programs", count: counts.all },
                            { key: "published", label: "Live Catalog", count: counts.published },
                            { key: "draft", label: "Drafts", count: counts.draft },
                            { key: "premium", label: "Architect Pro", count: counts.premium },
                            { key: "free", label: "Free Tier", count: counts.free },
                        ] as const
                    ).map((tab) => {
                        const isActive = statusFilter === tab.key
                        return (
                            <button
                                key={tab.key}
                                onClick={() => setStatusFilter(tab.key)}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono tracking-tight transition-all cursor-pointer whitespace-nowrap ${
                                    isActive
                                        ? "bg-primary text-primary-foreground font-semibold shadow-2xs"
                                        : "text-muted-foreground hover:text-foreground"
                                }`}
                            >
                                <span>{tab.label}</span>
                                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                                    isActive ? "bg-black/20 text-white" : "bg-card text-muted-foreground"
                                }`}>
                                    {tab.count}
                                </span>
                            </button>
                        )
                    })}
                </div>

                {/* View Mode & Sorter */}
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 rounded-full border border-hairline bg-card px-3 py-1.5 text-xs text-muted-foreground">
                        <span className="font-mono text-[11px]">Sort:</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as any)}
                            className="bg-transparent text-foreground font-medium focus:outline-none cursor-pointer text-xs"
                        >
                            <option value="recent" className="bg-card text-foreground">Most Recent</option>
                            <option value="scholars" className="bg-card text-foreground">Most Scholars</option>
                            <option value="rating" className="bg-card text-foreground">Highest Rating</option>
                            <option value="title" className="bg-card text-foreground">Title (A-Z)</option>
                            <option value="duration" className="bg-card text-foreground">Longest Duration</option>
                        </select>
                    </div>

                    <div className="inline-flex items-center rounded-full border border-hairline bg-card p-0.5">
                        <button
                            onClick={() => setViewMode("grid")}
                            title="Grid Cards View"
                            className={`p-1.5 rounded-full transition-all cursor-pointer ${
                                viewMode === "grid"
                                    ? "bg-primary text-primary-foreground shadow-2xs"
                                    : "text-muted-foreground hover:text-foreground"
                            }`}
                        >
                            <LayoutGrid className="h-3.5 w-3.5" />
                        </button>
                        <button
                            onClick={() => setViewMode("table")}
                            title="Spreadsheet Table View"
                            className={`p-1.5 rounded-full transition-all cursor-pointer ${
                                viewMode === "table"
                                    ? "bg-primary text-primary-foreground shadow-2xs"
                                    : "text-muted-foreground hover:text-foreground"
                            }`}
                        >
                            <List className="h-3.5 w-3.5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Search Bar & Secondary Category / Level Selectors */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search courses by title, keywords, or URL slug..."
                        className="w-full pl-10 pr-10 py-2.5 bg-card border border-border rounded-xl text-xs sm:text-sm text-foreground focus:outline-none focus:border-primary font-sans placeholder:text-muted-foreground shadow-2xs"
                    />
                    {search && (
                        <button
                            onClick={() => setSearch("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 cursor-pointer"
                        >
                            <X className="h-3.5 w-3.5" />
                        </button>
                    )}
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <select
                        value={categoryFilter}
                        onChange={e => setCategoryFilter(e.target.value)}
                        className="px-3 py-2.5 rounded-xl border border-border bg-card text-xs font-mono text-foreground focus:outline-none focus:border-primary cursor-pointer shadow-2xs flex-1 sm:flex-none"
                    >
                        {CATEGORIES.map(c => (
                            <option key={c} value={c}>{c === "All" ? "All Disciplines" : c}</option>
                        ))}
                    </select>

                    <select
                        value={difficultyFilter}
                        onChange={e => setDifficultyFilter(e.target.value)}
                        className="px-3 py-2.5 rounded-xl border border-border bg-card text-xs font-mono text-foreground focus:outline-none focus:border-primary cursor-pointer shadow-2xs flex-1 sm:flex-none"
                    >
                        {DIFFICULTIES.map(d => (
                            <option key={d} value={d}>{d === "All" ? "All Difficulties" : d}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Batch Action Floating Toolbar (When items selected) */}
            {selectedIds.length > 0 && (
                <div className="sticky top-20 z-40 p-3 sm:p-4 rounded-2xl bg-foreground text-background shadow-2xl flex flex-wrap items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setSelectedIds([])}
                            className="p-1 rounded-lg hover:bg-background/20 text-background/80 hover:text-background transition-colors cursor-pointer"
                            title="Clear selection"
                        >
                            <X className="h-4 w-4" />
                        </button>
                        <span className="text-xs font-mono font-semibold">
                            {selectedIds.length} course{selectedIds.length === 1 ? "" : "s"} selected
                        </span>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                        <button
                            onClick={() => handleBatchPublish(true)}
                            disabled={isBatchOperating}
                            className="px-3 py-1.5 rounded-xl bg-primary text-primary-foreground text-xs font-mono font-semibold hover:bg-primary-active transition-all cursor-pointer disabled:opacity-50"
                        >
                            Publish Live
                        </button>

                        <button
                            onClick={() => handleBatchPublish(false)}
                            disabled={isBatchOperating}
                            className="px-3 py-1.5 rounded-xl bg-background/20 text-background text-xs font-mono font-semibold hover:bg-background/30 transition-all cursor-pointer disabled:opacity-50"
                        >
                            Set Draft
                        </button>

                        <button
                            onClick={() => handleBatchPremium(true)}
                            disabled={isBatchOperating}
                            className="px-3 py-1.5 rounded-xl bg-background/20 text-background text-xs font-mono font-semibold hover:bg-background/30 transition-all cursor-pointer disabled:opacity-50"
                        >
                            Make Pro
                        </button>

                        <button
                            onClick={() => handleBatchPremium(false)}
                            disabled={isBatchOperating}
                            className="px-3 py-1.5 rounded-xl bg-background/20 text-background text-xs font-mono font-semibold hover:bg-background/30 transition-all cursor-pointer disabled:opacity-50"
                        >
                            Make Free
                        </button>

                        <button
                            onClick={() => handleExportJSON(true)}
                            className="px-3 py-1.5 rounded-xl bg-background/20 text-background text-xs font-mono font-semibold hover:bg-background/30 transition-all cursor-pointer"
                        >
                            Export JSON
                        </button>

                        <button
                            onClick={() => setBatchDeleteConfirm(true)}
                            disabled={isBatchOperating}
                            className="px-3 py-1.5 rounded-xl bg-destructive text-destructive-foreground text-xs font-mono font-semibold hover:bg-destructive/90 transition-all cursor-pointer disabled:opacity-50"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            )}

            {/* Batch Delete Confirmation Modal */}
            {batchDeleteConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
                    <div className="bg-card border border-destructive/40 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
                        <div className="w-10 h-10 rounded-2xl bg-destructive/10 text-destructive flex items-center justify-center">
                            <AlertCircle className="w-5 h-5" />
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-base font-semibold text-foreground">Confirm Batch Deletion</h3>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                Are you sure you want to permanently delete {selectedIds.length} selected courses and all their modules, lessons, and scholar enrollment records? This action cannot be undone.
                            </p>
                        </div>
                        <div className="flex items-center justify-end gap-2 pt-2">
                            <button
                                onClick={() => setBatchDeleteConfirm(false)}
                                className="px-4 py-2 rounded-xl border border-hairline bg-secondary text-xs font-medium cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleBatchDelete}
                                className="px-4 py-2 rounded-xl bg-destructive text-destructive-foreground text-xs font-semibold hover:bg-destructive/90 transition-all cursor-pointer"
                            >
                                Confirm Permanent Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ══════════════════════════════════════════════════════════
                MAIN PRESENTATION: GRID VIEW vs SPREADSHEET TABLE VIEW
            ══════════════════════════════════════════════════════════ */}
            {viewMode === "grid" ? (
                /* Bento Grid Cards View */
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {filteredCourses.map(course => {
                        const trackSlug = course.slug || course.id
                        const extra = getCourseraDataForCourse(trackSlug, course.title, course.category)
                        const coverImg = course.thumbnail_url || extra.thumbnail || "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80"
                        const isSelected = selectedIds.includes(course.id)

                        return (
                            <div
                                key={course.id}
                                className={`group relative rounded-3xl border bg-card/80 backdrop-blur-xl p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:border-primary/50 shadow-xs hover:shadow-xl ${
                                    isSelected ? "border-primary ring-2 ring-primary/20 bg-primary/5" : "border-border/80"
                                }`}
                            >
                                <div>
                                    {/* Thumbnail Cover Header */}
                                    <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-stone-900 mb-4 border border-hairline group/cover">
                                        <img
                                            src={coverImg}
                                            alt={course.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />

                                        {/* Quick Edit Cover Hover Overlay */}
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleOpenQuickEdit(course, "media")
                                            }}
                                            className="absolute inset-0 z-15 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover/cover:opacity-100 flex items-center justify-center transition-opacity duration-200 cursor-pointer"
                                            title="Open Image Studio for this cover"
                                        >
                                            <div className="px-3 py-1.5 rounded-xl bg-black/75 hover:bg-black/95 border border-white/20 text-white flex items-center gap-1.5 text-[11px] font-mono font-semibold shadow-lg transition-transform hover:scale-105">
                                                <ImageIcon className="w-3.5 h-3.5 text-[#D4B872]" />
                                                <span>Edit Cover</span>
                                            </div>
                                        </button>

                                        {/* Selection Checkbox */}
                                        <button
                                            type="button"
                                            onClick={(e) => { e.stopPropagation(); toggleSelectCourse(course.id) }}
                                            className="absolute top-2.5 left-2.5 z-20 w-6 h-6 rounded-lg bg-black/60 backdrop-blur-xs border border-white/20 flex items-center justify-center cursor-pointer transition-transform hover:scale-105"
                                        >
                                            {isSelected ? (
                                                <Check className="w-3.5 h-3.5 text-primary" />
                                            ) : (
                                                <div className="w-2.5 h-2.5 rounded-xs border border-white/40" />
                                            )}
                                        </button>

                                        {/* Top Badges */}
                                        <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1.5">
                                            <button
                                                type="button"
                                                onClick={() => handleTogglePublish(course.id, course.is_published)}
                                                className={`text-[9px] font-mono px-2 py-0.5 rounded-full border uppercase tracking-wider font-bold transition-colors cursor-pointer shadow-xs ${
                                                    course.is_published
                                                        ? "border-emerald-500/40 text-emerald-400 bg-emerald-950/80"
                                                        : "border-stone-500/40 text-stone-300 bg-stone-900/80"
                                                }`}
                                            >
                                                {course.is_published ? "Live Catalog" : "Draft"}
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => handleTogglePremium(course.id, course.is_premium)}
                                                className={`text-[9px] font-mono px-2 py-0.5 rounded-full border uppercase tracking-wider font-bold transition-colors cursor-pointer shadow-xs ${
                                                    course.is_premium
                                                        ? "border-[#D4B872]/40 text-[#D4B872] bg-amber-950/80"
                                                        : "border-white/20 text-white/80 bg-black/60"
                                                }`}
                                            >
                                                {course.is_premium ? "Architect" : "Free"}
                                            </button>
                                        </div>

                                        {/* Bottom Overlay Label */}
                                        <div className="absolute bottom-2.5 left-3 right-3 text-white flex items-center justify-between text-[11px] font-mono pointer-events-none">
                                            <span className="truncate opacity-90">{extra.partner}</span>
                                            <span className="text-[#D4B872] flex items-center gap-1 shrink-0">
                                                <Star className="w-3 h-3 fill-current" /> {extra.rating || 4.9}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Discipline & Title */}
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <span className="text-[10px] font-mono uppercase tracking-wider font-semibold text-primary">
                                            {course.category || extra.credentialType || "Academic Track"}
                                        </span>
                                        <span className="text-muted-foreground text-[10px] font-mono">·</span>
                                        <span className="text-[10px] font-mono text-muted-foreground">
                                            {course.difficulty || "Intermediate"}
                                        </span>
                                    </div>

                                    <h3 className="text-base font-sans font-bold text-foreground leading-snug line-clamp-1 mb-1.5">
                                        {course.title}
                                    </h3>

                                    <p className="text-xs text-muted-foreground font-sans line-clamp-2 mb-4 leading-relaxed">
                                        {course.description || "Comprehensive systems and software engineering curriculum track."}
                                    </p>

                                    {/* Metadata Bar */}
                                    <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground mb-4 pt-3 border-t border-border">
                                        <span className="flex items-center gap-1">
                                            <BookOpen className="w-3.5 h-3.5 text-primary" />
                                            {course.module_count ?? 0} modules
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                                            {course.duration_hours > 0 ? `${course.duration_hours}h` : "40h"}
                                        </span>
                                        <span className="flex items-center gap-1 text-primary font-semibold">
                                            <Users className="w-3.5 h-3.5" />
                                            {course.enrollment_count ?? 0} scholars
                                        </span>
                                    </div>
                                </div>

                                {/* Full Action Toolbar */}
                                <div className="space-y-2 pt-2 border-t border-border">
                                    <div className="grid grid-cols-2 gap-2">
                                        <button
                                            type="button"
                                            onClick={() => handleOpenQuickEdit(course, "details")}
                                            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-primary hover:bg-primary-active text-primary-foreground text-xs font-semibold transition-all shadow-xs cursor-pointer active:scale-98"
                                        >
                                            <Edit3 className="w-3.5 h-3.5" />
                                            <span>Edit Course</span>
                                        </button>

                                        <Link
                                            href={`/admin/courses/${course.id}/edit`}
                                            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-border bg-card hover:bg-secondary text-xs font-semibold text-foreground transition-all cursor-pointer shadow-2xs"
                                        >
                                            <Code2 className="w-3.5 h-3.5 text-primary" />
                                            <span>Syllabus</span>
                                        </Link>
                                    </div>

                                    <div className="flex items-center justify-between gap-1.5 pt-1">
                                        <Link
                                            href={`/courses/${trackSlug}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1 text-[11px] font-mono text-muted-foreground hover:text-primary transition-colors p-1"
                                            title="Open student preview in new tab"
                                        >
                                            <ExternalLink className="w-3 h-3" />
                                            <span>Preview</span>
                                        </Link>

                                        <button
                                            type="button"
                                            onClick={() => handleClone(course.id, course.title)}
                                            className="flex items-center gap-1 text-[11px] font-mono text-muted-foreground hover:text-foreground transition-colors p-1 cursor-pointer"
                                            title="Clone course and modules"
                                        >
                                            <Copy className="w-3 h-3" />
                                            <span>Clone</span>
                                        </button>

                                        {deleteConfirm === course.id ? (
                                            <div className="flex items-center gap-1">
                                                <button
                                                    onClick={() => handleDelete(course.id)}
                                                    className="px-2 py-1 rounded-lg text-[10px] font-mono bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-all cursor-pointer font-semibold"
                                                >
                                                    Confirm
                                                </button>
                                                <button
                                                    onClick={() => setDeleteConfirm(null)}
                                                    className="px-2 py-1 rounded-lg border border-border text-[10px] font-mono text-muted-foreground hover:bg-secondary cursor-pointer"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => setDeleteConfirm(course.id)}
                                                className="p-1.5 rounded-lg border border-hairline text-muted-foreground hover:text-destructive hover:border-destructive/30 transition-all cursor-pointer"
                                                title="Delete course"
                                            >
                                                <Trash2 className="w-3 h-3" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            ) : (
                /* Spreadsheet Dense Table View */
                <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-xs">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs font-sans border-collapse">
                            <thead>
                                <tr className="border-b border-border bg-secondary/50 font-mono text-[11px] text-muted-foreground uppercase tracking-wider">
                                    <th className="p-3.5 w-10">
                                        <input
                                            type="checkbox"
                                            checked={selectedIds.length > 0 && selectedIds.length === filteredCourses.length}
                                            onChange={toggleSelectAll}
                                            className="rounded accent-primary cursor-pointer"
                                        />
                                    </th>
                                    <th className="p-3.5">Course Program</th>
                                    <th className="p-3.5">Discipline</th>
                                    <th className="p-3.5">Difficulty</th>
                                    <th className="p-3.5">Modules</th>
                                    <th className="p-3.5">Scholars</th>
                                    <th className="p-3.5">Catalog Status</th>
                                    <th className="p-3.5">Access Tier</th>
                                    <th className="p-3.5 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {filteredCourses.map(course => {
                                    const trackSlug = course.slug || course.id
                                    const extra = getCourseraDataForCourse(trackSlug, course.title, course.category)
                                    const coverImg = course.thumbnail_url || extra.thumbnail || "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80"
                                    const isSelected = selectedIds.includes(course.id)
                                    return (
                                        <tr 
                                            key={course.id} 
                                            className={`hover:bg-secondary/40 transition-colors ${
                                                isSelected ? "bg-primary/5" : ""
                                            }`}
                                        >
                                            <td className="p-3.5">
                                                <input
                                                    type="checkbox"
                                                    checked={isSelected}
                                                    onChange={() => toggleSelectCourse(course.id)}
                                                    className="rounded accent-primary cursor-pointer"
                                                />
                                            </td>

                                            <td className="p-3.5">
                                                <div className="flex items-center gap-3">
                                                    <div 
                                                        onClick={() => handleOpenQuickEdit(course, "media")}
                                                        className="relative aspect-[16/9] w-14 rounded-lg overflow-hidden bg-stone-900 border border-hairline shrink-0 cursor-pointer group/thumb shadow-xs"
                                                        title="Click to edit course cover"
                                                    >
                                                        <img src={coverImg} alt={course.title} className="w-full h-full object-cover group-hover/thumb:scale-110 transition-transform" />
                                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/thumb:opacity-100 flex items-center justify-center transition-opacity">
                                                            <ImageIcon className="w-3 h-3 text-[#D4B872]" />
                                                        </div>
                                                    </div>
                                                    <div className="min-w-0">
                                                        <div className="font-semibold text-foreground line-clamp-1">{course.title}</div>
                                                        <div className="font-mono text-[10px] text-muted-foreground">{trackSlug}</div>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="p-3.5">
                                                <span className="font-mono text-[11px] text-primary">
                                                    {course.category || "AI & ML"}
                                                </span>
                                            </td>

                                            <td className="p-3.5">
                                                <span className="px-2 py-0.5 rounded-full border border-hairline bg-secondary text-[10px] font-mono">
                                                    {course.difficulty || "Intermediate"}
                                                </span>
                                            </td>

                                            <td className="p-3.5 font-mono text-muted-foreground">
                                                {course.module_count ?? 0}
                                            </td>

                                            <td className="p-3.5 font-mono text-primary font-semibold">
                                                {course.enrollment_count ?? 0}
                                            </td>

                                            <td className="p-3.5">
                                                <button
                                                    onClick={() => handleTogglePublish(course.id, course.is_published)}
                                                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold cursor-pointer border transition-colors ${
                                                        course.is_published
                                                            ? "bg-primary/10 border-primary/30 text-primary"
                                                            : "bg-secondary border-hairline text-muted-foreground"
                                                    }`}
                                                >
                                                    {course.is_published ? "Live" : "Draft"}
                                                </button>
                                            </td>

                                            <td className="p-3.5">
                                                <button
                                                    onClick={() => handleTogglePremium(course.id, course.is_premium)}
                                                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold cursor-pointer border transition-colors ${
                                                        course.is_premium
                                                            ? "bg-[#D4B872]/15 border-[#D4B872]/30 text-[#D4B872]"
                                                            : "bg-secondary border-hairline text-muted-foreground"
                                                    }`}
                                                >
                                                    {course.is_premium ? "Architect" : "Free"}
                                                </button>
                                            </td>

                                            <td className="p-3.5 text-right">
                                                <div className="inline-flex items-center gap-1.5">
                                                    <button
                                                        onClick={() => handleOpenQuickEdit(course, "media")}
                                                        className="p-1.5 rounded-lg border border-hairline bg-card hover:bg-secondary text-[#D4B872] cursor-pointer"
                                                        title="Edit Cover Image & Studio"
                                                    >
                                                        <ImageIcon className="h-3.5 w-3.5" />
                                                    </button>

                                                    <button
                                                        onClick={() => handleOpenQuickEdit(course, "details")}
                                                        className="p-1.5 rounded-lg border border-hairline bg-card hover:bg-secondary text-primary cursor-pointer"
                                                        title="Quick Edit Program"
                                                    >
                                                        <Edit3 className="h-3.5 w-3.5" />
                                                    </button>

                                                    <Link
                                                        href={`/admin/courses/${course.id}/edit`}
                                                        className="p-1.5 rounded-lg border border-hairline bg-card hover:bg-secondary text-foreground cursor-pointer"
                                                        title="Open Syllabus Builder"
                                                    >
                                                        <Code2 className="h-3.5 w-3.5" />
                                                    </Link>

                                                    <button
                                                        onClick={() => handleClone(course.id, course.title)}
                                                        className="p-1.5 rounded-lg border border-hairline bg-card hover:bg-secondary text-muted-foreground hover:text-foreground cursor-pointer"
                                                        title="Clone course"
                                                    >
                                                        <Copy className="h-3.5 w-3.5" />
                                                    </button>

                                                    <button
                                                        onClick={() => handleDelete(course.id)}
                                                        className="p-1.5 rounded-lg border border-hairline bg-card text-muted-foreground hover:text-destructive hover:border-destructive/30 cursor-pointer"
                                                        title="Delete course"
                                                    >
                                                        <Trash2 className="h-3.5 w-3.5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {filteredCourses.length === 0 && (
                <div className="rounded-3xl border border-dashed border-border bg-card/60 p-12 text-center space-y-3">
                    <BookOpen className="w-8 h-8 text-primary mx-auto opacity-60" />
                    <h3 className="font-sans text-lg font-bold text-foreground">No courses match your filter</h3>
                    <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                        Try resetting your search query or selecting a different status or category tab.
                    </p>
                    <button
                        onClick={() => {
                            setSearch("")
                            setStatusFilter("all")
                            setCategoryFilter("All")
                            setDifficultyFilter("All")
                        }}
                        className="inline-flex items-center text-xs text-primary font-semibold hover:underline cursor-pointer"
                    >
                        Reset all filters
                    </button>
                </div>
            )}

            {/* Course Editor Modal (Quick Edit & Create Program) */}
            <CourseEditorModal
                isOpen={isEditorOpen}
                onClose={() => setIsEditorOpen(false)}
                course={editingCourse}
                onSave={handleSaveCourseModal}
                initialTab={modalInitialTab}
            />
        </div>
    )
}
