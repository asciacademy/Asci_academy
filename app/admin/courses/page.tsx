"use client"

import { useState, useEffect, useTransition } from "react"
import {
    getAdminCourses, toggleCoursePublish, toggleCoursePremium,
    updateCourseDetails, deleteCourse, createCourse, getAdminStats
} from "@/app/actions/admin"
import Link from "next/link"
import {
    BookOpen, Edit3, Eye, EyeOff, Star, Save, X,
    Loader2, Check, AlertCircle, Lock, Globe, RefreshCw,
    Trash2, Plus, Search, Users, TrendingUp, Download, Clock
} from "lucide-react"

const DIFFICULTIES = ["Beginner", "Intermediate", "Advanced"]

type CourseValues = { title: string; description: string; difficulty: string; duration_hours: string; thumbnail_url: string }
type NewCourseValues = { title: string; slug: string; description: string; difficulty: string; duration_hours: string; is_premium: boolean; template: string }
const EMPTY_NEW: NewCourseValues = { title: "", slug: "", description: "", difficulty: "Beginner", duration_hours: "", is_premium: false, template: "blank" }

export default function AdminCoursesPage() {
    const [courses, setCourses] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [isPending, startTransition] = useTransition()
    const [search, setSearch] = useState("")
    const [showCreate, setShowCreate] = useState(false)
    const [newVal, setNewVal] = useState<NewCourseValues>(EMPTY_NEW)
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
    const [stats, setStats] = useState<any>(null)
    const [toast, setToast] = useState<{ type: "ok" | "err"; msg: string } | null>(null)

    const notify = (type: "ok" | "err", msg: string) => {
        setToast({ type, msg })
        setTimeout(() => setToast(null), 3000)
    }

    const load = () => startTransition(async () => {
        const [cRes, sRes] = await Promise.all([getAdminCourses(), getAdminStats()])
        if (cRes.success && cRes.courses) setCourses(cRes.courses)
        if (sRes.success) setStats(sRes.stats)
        setLoading(false)
    })

    useEffect(() => { load() }, [])

    const handleTogglePublish = async (courseId: string, isPublished: boolean) => {
        startTransition(async () => {
            const res = await toggleCoursePublish(courseId, isPublished)
            if (res.success) {
                setCourses(prev => prev.map(c => c.id === courseId ? { ...c, is_published: !isPublished } : c))
                notify("ok", `Course ${isPublished ? "unpublished" : "published"}`)
            } else notify("err", res.error || "Failed")
        })
    }

    const handleTogglePremium = async (courseId: string, isPremium: boolean) => {
        startTransition(async () => {
            const res = await toggleCoursePremium(courseId, isPremium)
            if (res.success) {
                setCourses(prev => prev.map(c => c.id === courseId ? { ...c, is_premium: !isPremium } : c))
                notify("ok", `Course set to ${isPremium ? "Free" : "Premium"}`)
            } else notify("err", res.error || "Failed")
        })
    }

    const handleCreate = async () => {
        if (!newVal.title.trim() || !newVal.slug.trim()) {
            notify("err", "Title and slug are required")
            return
        }
        startTransition(async () => {
            const res = await createCourse({
                title: newVal.title,
                slug: newVal.slug,
                description: newVal.description,
                difficulty: newVal.difficulty,
                duration_hours: parseFloat(newVal.duration_hours) || 0,
                is_premium: newVal.is_premium,
                template: newVal.template,
            })
            if (res.success) {
                notify("ok", "Course created successfully!")
                setShowCreate(false)
                setNewVal(EMPTY_NEW)
                load()
            } else notify("err", res.error || "Failed")
        })
    }

    const handleDelete = async (courseId: string) => {
        startTransition(async () => {
            const res = await deleteCourse(courseId)
            if (res.success) {
                setCourses(prev => prev.filter(c => c.id !== courseId))
                notify("ok", "Course deleted")
            } else notify("err", res.error || "Failed")
            setDeleteConfirm(null)
        })
    }

    const filtered = courses.filter(c =>
        !search || c.title?.toLowerCase().includes(search.toLowerCase()) ||
        c.description?.toLowerCase().includes(search.toLowerCase())
    )

    if (loading) return (
        <div className="flex justify-center items-center p-24 font-mono text-xs text-primary">
            <Loader2 className="h-6 w-6 animate-spin mr-2" /> Loading course management...
        </div>
    )

    return (
        <div className="space-y-8 pt-2 font-sans text-foreground">
            {/* Toast */}
            {toast && (
                <div className={`fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl border text-xs font-mono uppercase tracking-wider shadow-lg ${
                    toast.type === "ok" ? "bg-card border-primary/40 text-foreground" : "bg-card border-destructive/40 text-destructive"
                }`}>
                    {toast.type === "ok" ? <Check className="h-4 w-4 text-primary" /> : <AlertCircle className="h-4 w-4 text-destructive" />}
                    {toast.msg}
                </div>
            )}

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
                <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-widest bg-primary/10 text-primary border border-primary/20 mb-2">
                        Academic Directory
                    </div>
                    <h1 className="font-serif text-3xl sm:text-4xl font-normal text-foreground tracking-tight">
                        Curriculum Courses <span className="text-muted-foreground text-xl">({filtered.length})</span>
                    </h1>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1 font-sans">
                        Author, edit, structure syllabi, and set access tiers across all technical disciplines.
                    </p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                    <button
                        onClick={async () => {
                            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(courses, null, 2))
                            const downloadAnchorNode = document.createElement('a')
                            downloadAnchorNode.setAttribute("href", dataStr)
                            downloadAnchorNode.setAttribute("download", "asci_courses_export.json")
                            document.body.appendChild(downloadAnchorNode)
                            downloadAnchorNode.click()
                            downloadAnchorNode.remove()
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border bg-card text-xs font-mono uppercase tracking-wider font-semibold hover:bg-secondary text-foreground transition-all cursor-pointer"
                    >
                        <Download className="h-3.5 w-3.5" /> Export JSON
                    </button>
                    <button
                        onClick={load}
                        disabled={isPending}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border bg-card text-xs font-mono uppercase tracking-wider font-semibold hover:bg-secondary text-foreground transition-all cursor-pointer"
                    >
                        <RefreshCw className={`h-3.5 w-3.5 ${isPending ? "animate-spin" : ""}`} /> Refresh
                    </button>
                    <button
                        onClick={() => { setShowCreate(v => !v); setNewVal(EMPTY_NEW) }}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary hover:bg-primary-active text-primary-foreground text-xs font-mono font-semibold uppercase tracking-wider transition-all shadow-xs cursor-pointer"
                    >
                        <Plus className="h-3.5 w-3.5" /> New Course
                    </button>
                </div>
            </div>

            {/* Stats Row */}
            {stats && (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                    <div className="bg-card/70 backdrop-blur-xl border border-border/80 rounded-2xl p-5 relative overflow-hidden">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Total Scholars</span>
                        <div className="text-2xl sm:text-3xl font-serif text-foreground mt-1">{stats.totalUsers}</div>
                    </div>
                    <div className="bg-card/70 backdrop-blur-xl border border-border/80 rounded-2xl p-5 relative overflow-hidden">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Curriculum Tracks</span>
                        <div className="text-2xl sm:text-3xl font-serif text-foreground mt-1">{stats.totalCourses}</div>
                    </div>
                    <div className="bg-card/70 backdrop-blur-xl border border-border/80 rounded-2xl p-5 relative overflow-hidden">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Active Enrollments</span>
                        <div className="text-2xl sm:text-3xl font-serif text-primary mt-1">{stats.totalEnrollments}</div>
                    </div>
                    <div className="bg-card/70 backdrop-blur-xl border border-border/80 rounded-2xl p-5 relative overflow-hidden">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">New Scholars Today</span>
                        <div className="text-2xl sm:text-3xl font-serif text-primary mt-1">+{stats.newUsersToday}</div>
                    </div>
                </div>
            )}

            {/* Create Course Panel */}
            {showCreate && (
                <div className="bg-card/90 backdrop-blur-xl border border-primary/30 rounded-2xl p-6 sm:p-8 space-y-5 shadow-md">
                    <div className="flex items-center justify-between border-b border-border pb-3">
                        <h2 className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
                            Create New Academic Course
                        </h2>
                        <button onClick={() => setShowCreate(false)} className="text-muted-foreground hover:text-foreground cursor-pointer">
                            <X className="h-4 w-4" />
                        </button>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label className="text-[10px] font-mono uppercase tracking-widest text-[#141413]/60 block mb-1">
                                Course Title *
                            </label>
                            <input
                                value={newVal.title}
                                onChange={e => setNewVal(v => ({ ...v, title: e.target.value }))}
                                placeholder="e.g. Advanced Operating Systems Internals"
                                className="w-full bg-card border border-border rounded-xl text-foreground px-3.5 py-2.5 text-xs focus:outline-none focus:border-primary"
                            />
                        </div>
                        <div>
                            <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-1">
                                URL Slug *
                            </label>
                            <input
                                value={newVal.slug}
                                onChange={e => setNewVal(v => ({ ...v, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") }))}
                                placeholder="e.g. os-internals"
                                className="w-full bg-card border border-border rounded-xl text-foreground px-3.5 py-2.5 text-xs font-mono focus:outline-none focus:border-primary"
                            />
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-1">
                                Description
                            </label>
                            <textarea
                                value={newVal.description}
                                onChange={e => setNewVal(v => ({ ...v, description: e.target.value }))}
                                rows={2}
                                placeholder="Comprehensive overview of topics covered..."
                                className="w-full bg-card border border-border rounded-xl text-foreground px-3.5 py-2.5 text-xs focus:outline-none focus:border-primary resize-none"
                            />
                        </div>
                        <div>
                            <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-1">
                                Starting Template
                            </label>
                            <select
                                value={newVal.template}
                                onChange={e => setNewVal(v => ({ ...v, template: e.target.value }))}
                                className="w-full bg-card border border-border rounded-xl text-foreground px-3.5 py-2.5 text-xs font-mono focus:outline-none focus:border-primary cursor-pointer"
                            >
                                <option value="blank">Blank Syllabus</option>
                                <option value="crash_course">Crash Course (1 Module, 3 Lessons)</option>
                                <option value="masterclass">Full Masterclass (4 Modules, 12 Lessons)</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                        <div>
                            <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-1">
                                Difficulty
                            </label>
                            <select
                                value={newVal.difficulty}
                                onChange={e => setNewVal(v => ({ ...v, difficulty: e.target.value }))}
                                className="w-full bg-card border border-border rounded-xl text-foreground px-3.5 py-2.5 text-xs focus:outline-none focus:border-primary cursor-pointer"
                            >
                                {DIFFICULTIES.map(d => <option key={d}>{d}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-1">
                                Estimated Hours
                            </label>
                            <input
                                type="number"
                                value={newVal.duration_hours}
                                onChange={e => setNewVal(v => ({ ...v, duration_hours: e.target.value }))}
                                placeholder="40"
                                className="w-full bg-card border border-border rounded-xl text-foreground px-3.5 py-2.5 text-xs focus:outline-none focus:border-primary"
                            />
                        </div>
                        <div className="flex items-end">
                            <label className="flex items-center gap-2 cursor-pointer pb-2.5">
                                <input
                                    type="checkbox"
                                    checked={newVal.is_premium}
                                    onChange={e => setNewVal(v => ({ ...v, is_premium: e.target.checked }))}
                                    className="accent-primary rounded cursor-pointer"
                                />
                                <span className="text-xs font-sans text-foreground font-medium">Require Architect Plan</span>
                            </label>
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
                        <button
                            onClick={() => setShowCreate(false)}
                            className="px-4 py-2 rounded-xl border border-border bg-card text-muted-foreground text-xs font-mono uppercase tracking-wider hover:bg-secondary cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleCreate}
                            disabled={isPending}
                            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-primary hover:bg-primary-active text-primary-foreground text-xs font-mono font-semibold uppercase tracking-wider transition-all disabled:opacity-60 shadow-xs cursor-pointer"
                        >
                            {isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Plus className="h-3.5 w-3.5" />}
                            Create Course
                        </button>
                    </div>
                </div>
            )}

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search by course title or keywords..."
                    className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-xl text-xs sm:text-sm text-foreground focus:outline-none focus:border-primary font-sans placeholder:text-muted-foreground"
                />
            </div>

            {/* Courses Grid */}
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {filtered.map(course => (
                    <div
                        key={course.id}
                        className="bg-card/70 backdrop-blur-xl border border-border/80 rounded-2xl p-5 flex flex-col justify-between hover:border-primary/40 transition-all shadow-xs"
                    >
                        <div>
                            <div className="flex items-center justify-between gap-2 mb-2">
                                <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full border uppercase tracking-wider font-semibold ${
                                    course.is_published
                                        ? "border-primary/40 text-primary bg-primary/10"
                                        : "border-border text-muted-foreground bg-secondary/30"
                                }`}>
                                    {course.is_published ? "Live Catalog" : "Draft"}
                                </span>
                                {course.is_premium && (
                                    <span className="text-[9px] font-mono px-2 py-0.5 rounded-full border border-primary/40 text-primary bg-primary/10 uppercase tracking-wider font-semibold">
                                        Architect
                                    </span>
                                )}
                            </div>

                            <h3 className="text-base font-semibold text-foreground leading-snug font-sans mb-1.5 line-clamp-1">
                                {course.title}
                            </h3>

                            <p className="text-xs text-muted-foreground font-sans line-clamp-2 mb-4 leading-relaxed">
                                {course.description || "Comprehensive systems and software engineering curriculum track."}
                            </p>

                            <div className="flex items-center gap-3 text-[10px] font-mono text-muted-foreground mb-5 border-t border-border pt-3">
                                <span>{course.module_count ?? 0} modules</span>
                                <span>·</span>
                                <span className="text-primary font-semibold">{course.enrollment_count ?? 0} scholars</span>
                                {course.difficulty && <><span>·</span><span>{course.difficulty}</span></>}
                                {course.duration_hours > 0 && <><span>·</span><span>{course.duration_hours}h</span></>}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-border">
                            <button
                                onClick={() => handleTogglePublish(course.id, course.is_published)}
                                disabled={isPending}
                                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-mono uppercase tracking-wider border transition-all cursor-pointer ${
                                    course.is_published
                                        ? "bg-primary/10 border-primary/30 text-primary hover:bg-primary/20"
                                        : "bg-card border-border text-muted-foreground hover:bg-secondary"
                                }`}
                            >
                                {course.is_published ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                                {course.is_published ? "Live" : "Draft"}
                            </button>

                            <button
                                onClick={() => handleTogglePremium(course.id, course.is_premium)}
                                disabled={isPending}
                                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-mono uppercase tracking-wider border transition-all cursor-pointer ${
                                    course.is_premium
                                        ? "bg-primary/10 border-primary/30 text-primary"
                                        : "bg-card border-border text-muted-foreground hover:bg-secondary"
                                }`}
                            >
                                {course.is_premium ? <Lock className="h-3 w-3" /> : <Globe className="h-3 w-3" />}
                                {course.is_premium ? "Pro" : "Free"}
                            </button>

                            <Link
                                href={`/admin/courses/${course.id}/edit`}
                                className="ml-auto flex items-center gap-1 px-3 py-1.5 rounded-lg text-[10px] font-mono uppercase tracking-wider font-semibold bg-primary hover:bg-primary-active text-primary-foreground transition-all shadow-xs"
                            >
                                <Edit3 className="h-3 w-3" /> Builder
                            </Link>

                            {deleteConfirm === course.id ? (
                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => handleDelete(course.id)}
                                        disabled={isPending}
                                        className="px-2 py-1.5 rounded-lg text-[10px] font-mono bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-all cursor-pointer"
                                    >
                                        {isPending ? <Loader2 className="h-3 w-3 animate-spin" /> : "Confirm"}
                                    </button>
                                    <button
                                        onClick={() => setDeleteConfirm(null)}
                                        className="px-2 py-1.5 rounded-lg border border-border bg-card text-muted-foreground text-[10px] font-mono hover:bg-secondary cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => setDeleteConfirm(course.id)}
                                    className="p-1.5 rounded-lg border border-border bg-card text-muted-foreground hover:text-destructive hover:border-destructive/30 transition-all cursor-pointer"
                                    title="Delete entire course"
                                >
                                    <Trash2 className="h-3.5 w-3.5" />
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {filtered.length === 0 && (
                <div className="text-center py-20 text-muted-foreground font-mono text-xs">
                    No courses found matching query.
                </div>
            )}
        </div>
    )
}
