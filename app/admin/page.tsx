"use client"

import { useEffect, useState, useTransition } from "react"
import { getAdminStats, getRecentActivity, getAdminCourses, updateCourseDetails, toggleCoursePublish, toggleCoursePremium } from "@/app/actions/admin"
import Link from "next/link"
import { format } from "date-fns"
import {
    Users, BookOpen, GraduationCap, MessageSquare,
    Shield, RefreshCw, Loader2, ArrowRight,
    Zap, Edit3, X, Save, Globe, EyeOff, Lock, Check,
    TerminalSquare, Clock
} from "lucide-react"

const DIFFICULTIES = ["Beginner", "Intermediate", "Advanced", "Expert"]

export default function AdminDashboardPage() {
    const [stats, setStats] = useState<any>(null)
    const [recent, setRecent] = useState<any[]>([])
    const [courses, setCourses] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [isPending, startTransition] = useTransition()

    // Edit panel state
    const [editingCourse, setEditingCourse] = useState<any | null>(null)
    const [editVal, setEditVal] = useState<{ title: string; description: string; difficulty: string; duration_hours: string }>({ title: "", description: "", difficulty: "", duration_hours: "" })
    const [saving, setSaving] = useState(false)
    const [toast, setToast] = useState<{ type: "ok" | "err"; msg: string } | null>(null)

    const notify = (type: "ok" | "err", msg: string) => {
        setToast({ type, msg })
        setTimeout(() => setToast(null), 3500)
    }

    const load = () => startTransition(async () => {
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

    useEffect(() => { load() }, [])

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
            setCourses(prev => prev.map(c => c.id === editingCourse.id ? { ...c, ...editVal, duration_hours: parseFloat(editVal.duration_hours) || c.duration_hours } : c))
            setEditingCourse((prev: any) => prev ? { ...prev, ...editVal } : null)
            notify("ok", "Course updated successfully")
        } else notify("err", res.error || "Failed to save")
    }

    const handleTogglePublish = async (course: any) => {
        startTransition(async () => {
            const res = await toggleCoursePublish(course.id, course.is_published)
            if (res.success) {
                setCourses(prev => prev.map(c => c.id === course.id ? { ...c, is_published: !c.is_published } : c))
                if (editingCourse?.id === course.id) setEditingCourse((prev: any) => prev ? { ...prev, is_published: !prev.is_published } : null)
                notify("ok", course.is_published ? "Course unpublished" : "Course published live")
            } else notify("err", res.error || "Failed")
        })
    }

    const handleTogglePremium = async (course: any) => {
        startTransition(async () => {
            const res = await toggleCoursePremium(course.id, course.is_premium)
            if (res.success) {
                setCourses(prev => prev.map(c => c.id === course.id ? { ...c, is_premium: !c.is_premium } : c))
                if (editingCourse?.id === course.id) setEditingCourse((prev: any) => prev ? { ...prev, is_premium: !prev.is_premium } : null)
                notify("ok", course.is_premium ? "Set to Free tier" : "Set to Premium tier")
            } else notify("err", res.error || "Failed")
        })
    }

    if (loading) return (
        <div className="flex justify-center items-center p-24 font-mono text-xs text-primary">
            <Loader2 className="h-6 w-6 animate-spin mr-2" /> Loading command center...
        </div>
    )

    const statCards = [
        { name: "Total Users", value: stats?.totalUsers ?? 0, icon: Users, sub: `+${stats?.newUsersToday ?? 0} today` },
        { name: "Total Courses", value: stats?.totalCourses ?? 0, icon: BookOpen, sub: "Published & Draft" },
        { name: "Enrollments", value: stats?.totalEnrollments ?? 0, icon: GraduationCap, sub: "Active members" },
        { name: "Testimonials", value: stats?.totalTestimonials ?? 0, icon: MessageSquare, sub: "Reviews collected" },
    ]

    const quickLinks = [
        { label: "Manage Users", href: "/admin/users", icon: Users, desc: "Roles, XP, suspension" },
        { label: "Manage Courses", href: "/admin/courses", icon: BookOpen, desc: "Publish, curriculum, delete" },
        { label: "Testimonials", href: "/admin/testimonials", icon: MessageSquare, desc: "Review & approve" },
        { label: "Announcements", href: "/admin/announcements", icon: Zap, desc: "Push site-wide banners" },
        { label: "Settings", href: "/admin/settings", icon: Shield, desc: "Platform configuration" },
    ]

    return (
        <div className="space-y-10 pt-2 font-sans text-foreground">
            {/* Toast */}
            {toast && (
                <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl border text-xs font-mono uppercase tracking-wider shadow-lg ${
                    toast.type === "ok" ? "bg-card border-primary/40 text-foreground" : "bg-card border-destructive/40 text-destructive"
                }`}>
                    {toast.type === "ok" ? <Check className="h-4 w-4 text-primary" /> : <X className="h-4 w-4 text-destructive" />}
                    {toast.msg}
                </div>
            )}

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
                <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-widest bg-primary/10 text-primary border border-primary/20 mb-2">
                        Command Center
                    </div>
                    <h1 className="font-serif text-3xl sm:text-4xl font-normal text-foreground tracking-tight">
                        Administrative Overview
                    </h1>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1 font-sans">
                        Real-time telemetry, user management, and curriculum control.
                    </p>
                </div>
                <button
                    onClick={load}
                    disabled={isPending}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-card text-xs font-mono uppercase tracking-wider font-semibold hover:bg-secondary text-foreground transition-all shrink-0 cursor-pointer"
                >
                    <RefreshCw className={`h-3.5 w-3.5 ${isPending ? "animate-spin" : ""}`} />
                    Refresh Telemetry
                </button>
            </div>

            {/* Stat Cards */}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {statCards.map(stat => (
                    <div key={stat.name} className="bg-card/70 backdrop-blur-xl border border-border/80 rounded-2xl p-6 relative overflow-hidden transition-all hover:border-primary/40 shadow-xs">
                        <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">{stat.name}</div>
                        <div className="text-3xl sm:text-4xl font-serif text-foreground font-normal">{stat.value.toLocaleString()}</div>
                        <div className="text-[11px] font-mono text-primary mt-2 font-medium">{stat.sub}</div>
                    </div>
                ))}
            </div>

            {/* Quick Access + Recent Users */}
            <div className="grid lg:grid-cols-5 gap-8">
                {/* Quick Links */}
                <div className="lg:col-span-2 space-y-3">
                    <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">Quick Navigation</div>
                    {quickLinks.map(link => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="flex items-center gap-4 p-4 rounded-xl bg-card/70 backdrop-blur-xl border border-border/80 hover:border-primary/40 hover:bg-secondary/40 transition-all group shadow-xs"
                        >
                            <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                <link.icon className="h-4 w-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-sm font-semibold text-foreground font-sans">{link.label}</div>
                                <div className="text-[11px] text-muted-foreground font-sans">{link.desc}</div>
                            </div>
                            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                        </Link>
                    ))}
                </div>

                {/* Recent Signups */}
                <div className="lg:col-span-3 space-y-3">
                    <div className="flex items-center justify-between mb-3">
                        <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Recent Signups</div>
                        <Link href="/admin/users" className="text-xs font-mono text-primary hover:underline uppercase tracking-wider flex items-center gap-1 font-semibold">
                            View All Users <ArrowRight className="h-3 w-3" />
                        </Link>
                    </div>
                    <div className="bg-card/70 backdrop-blur-xl border border-border/80 rounded-2xl overflow-hidden shadow-xs">
                        {recent.length === 0 ? (
                            <div className="p-8 text-center text-muted-foreground font-mono text-xs">No users recorded yet.</div>
                        ) : (
                            <table className="w-full text-sm">
                                <tbody className="divide-y divide-border">
                                    {recent.map(u => (
                                        <tr key={u.id} className="hover:bg-secondary/30 transition-colors">
                                            <td className="px-5 py-3.5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary border border-primary/20 text-xs font-bold font-mono flex items-center justify-center shrink-0">
                                                        {(u.name || u.email || "?")[0].toUpperCase()}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <div className="text-xs font-semibold text-foreground truncate">{u.name || "Scholar"}</div>
                                                        <div className="text-[11px] text-muted-foreground font-mono truncate">{u.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3.5">
                                                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border uppercase tracking-wider ${
                                                    u.role === "admin" || u.role === "super_admin"
                                                        ? "border-primary/40 text-primary bg-primary/10 font-bold"
                                                        : "border-border text-muted-foreground"
                                                }`}>
                                                    {u.role}
                                                </span>
                                            </td>
                                            <td className="px-5 py-3.5 text-[11px] text-muted-foreground font-mono text-right">
                                                {format(new Date(u.created_at), "MMM d, yyyy")}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>

            {/* Courses Section */}
            <div className="space-y-4 pt-4 border-t border-border">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Curriculum Catalog</div>
                        <h2 className="font-serif text-2xl font-normal text-foreground mt-0.5">Active Courses</h2>
                    </div>
                    <Link
                        href="/admin/courses"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary hover:bg-primary-active text-primary-foreground font-mono text-xs uppercase tracking-wider font-semibold transition-all shadow-xs cursor-pointer"
                    >
                        <span>Full Course Builder</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                </div>

                {courses.length === 0 ? (
                    <div className="bg-card/40 border border-dashed border-border rounded-2xl p-12 text-center">
                        <BookOpen className="h-8 w-8 text-muted-foreground/30 mx-auto mb-3" />
                        <p className="text-xs text-muted-foreground font-mono">No courses in database.</p>
                        <Link href="/admin/courses" className="mt-3 inline-flex items-center gap-1.5 text-xs font-mono text-primary uppercase tracking-wider font-semibold">
                            Create First Course <ArrowRight className="h-3 w-3" />
                        </Link>
                    </div>
                ) : (
                    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                        {courses.map(course => {
                            const isEditing = editingCourse?.id === course.id
                            return (
                                <div key={course.id} className="flex flex-col">
                                    <button
                                        onClick={() => isEditing ? setEditingCourse(null) : openEdit(course)}
                                        className={`relative text-left bg-card/70 backdrop-blur-xl border rounded-2xl p-5 transition-all group overflow-hidden cursor-pointer shadow-xs ${
                                            isEditing
                                                ? "border-primary shadow-md ring-1 ring-primary"
                                                : "border-border/80 hover:border-primary/40"
                                        }`}
                                    >
                                        <div className="flex items-start justify-between gap-3 mb-3">
                                            <div className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center shrink-0">
                                                <TerminalSquare className="h-5 w-5 text-primary" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-sm font-semibold text-foreground truncate font-sans">{course.title}</h3>
                                                <div className="flex items-center gap-2 mt-1 flex-wrap">
                                                    <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full border uppercase tracking-wider ${
                                                        course.is_published
                                                            ? "border-primary/40 text-primary bg-primary/10 font-bold"
                                                            : "border-border text-muted-foreground bg-secondary/30"
                                                    }`}>
                                                        {course.is_published ? "Live" : "Draft"}
                                                    </span>
                                                    {course.is_premium && (
                                                        <span className="text-[9px] font-mono px-2 py-0.5 rounded-full border border-primary/40 text-primary bg-primary/10 uppercase tracking-wider font-semibold">
                                                            Premium
                                                        </span>
                                                    )}
                                                    {course.difficulty && (
                                                        <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider">
                                                            {course.difficulty}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <Edit3 className={`h-4 w-4 shrink-0 transition-colors ${isEditing ? "text-primary" : "text-muted-foreground group-hover:text-primary"}`} />
                                        </div>

                                        {course.description && (
                                            <p className="text-xs text-muted-foreground font-sans line-clamp-2 mb-3 leading-relaxed">
                                                {course.description}
                                            </p>
                                        )}

                                        <div className="flex items-center gap-4 text-[10px] font-mono text-muted-foreground border-t border-border pt-3">
                                            {course.duration_hours > 0 && (
                                                <span className="flex items-center gap-1">
                                                    <Clock className="h-3 w-3 text-primary" /> {course.duration_hours}h
                                                </span>
                                            )}
                                            {course.lesson_count > 0 && (
                                                <span className="flex items-center gap-1">
                                                    <BookOpen className="h-3 w-3 text-primary" /> {course.lesson_count} lessons
                                                </span>
                                            )}
                                        </div>
                                    </button>

                                    {/* Inline Edit Panel */}
                                    {isEditing && (
                                        <div className="bg-card/95 backdrop-blur-xl border border-primary/30 rounded-2xl mt-2 p-5 space-y-4 shadow-lg">
                                            <div className="flex items-center justify-between border-b border-border pb-2">
                                                <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-semibold">Edit Course Metadata</span>
                                                <button onClick={() => setEditingCourse(null)} className="text-muted-foreground hover:text-foreground cursor-pointer">
                                                    <X className="h-4 w-4" />
                                                </button>
                                            </div>

                                            <div>
                                                <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-1">Title</label>
                                                <input
                                                    value={editVal.title}
                                                    onChange={e => setEditVal(v => ({ ...v, title: e.target.value }))}
                                                    className="w-full bg-card border border-border rounded-xl text-foreground px-3 py-2 text-xs focus:outline-none focus:border-primary"
                                                />
                                            </div>

                                            <div>
                                                <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-1">Description</label>
                                                <textarea
                                                    value={editVal.description}
                                                    onChange={e => setEditVal(v => ({ ...v, description: e.target.value }))}
                                                    rows={2}
                                                    className="w-full bg-card border border-border rounded-xl text-foreground px-3 py-2 text-xs focus:outline-none focus:border-primary resize-none"
                                                />
                                            </div>

                                            <div className="grid grid-cols-2 gap-3">
                                                <div>
                                                    <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-1">Difficulty</label>
                                                    <select
                                                        value={editVal.difficulty}
                                                        onChange={e => setEditVal(v => ({ ...v, difficulty: e.target.value }))}
                                                        className="w-full bg-card border border-border rounded-xl text-foreground px-3 py-2 text-xs focus:outline-none focus:border-primary cursor-pointer"
                                                    >
                                                        {DIFFICULTIES.map(d => <option key={d}>{d}</option>)}
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-1">Duration (hrs)</label>
                                                    <input
                                                        type="number"
                                                        value={editVal.duration_hours}
                                                        onChange={e => setEditVal(v => ({ ...v, duration_hours: e.target.value }))}
                                                        placeholder="40"
                                                        className="w-full bg-card border border-border rounded-xl text-foreground px-3 py-2 text-xs focus:outline-none focus:border-primary"
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3 pt-1">
                                                <button
                                                    onClick={() => handleTogglePublish(editingCourse)}
                                                    disabled={isPending}
                                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-mono border uppercase tracking-wider transition-all cursor-pointer ${
                                                        editingCourse.is_published
                                                            ? "border-primary/40 text-primary bg-primary/10 font-bold"
                                                            : "border-border text-muted-foreground bg-card hover:bg-secondary"
                                                    }`}
                                                >
                                                    {editingCourse.is_published ? <><Globe className="h-3 w-3" /> Live</> : <><EyeOff className="h-3 w-3" /> Draft</>}
                                                </button>
                                                <button
                                                    onClick={() => handleTogglePremium(editingCourse)}
                                                    disabled={isPending}
                                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-mono border uppercase tracking-wider transition-all cursor-pointer ${
                                                        editingCourse.is_premium
                                                            ? "border-primary/40 text-primary bg-primary/10 font-bold"
                                                            : "border-border text-muted-foreground bg-card hover:bg-secondary"
                                                    }`}
                                                >
                                                    <Lock className="h-3 w-3" />
                                                    {editingCourse.is_premium ? "Premium" : "Free"}
                                                </button>
                                            </div>

                                            <div className="flex items-center justify-between pt-2 border-t border-border">
                                                <button
                                                    onClick={handleSave}
                                                    disabled={saving || isPending}
                                                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary hover:bg-primary-active text-primary-foreground text-[11px] font-mono font-semibold uppercase tracking-wider transition-all disabled:opacity-50 shadow-xs cursor-pointer"
                                                >
                                                    {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
                                                    Save Changes
                                                </button>
                                                <Link
                                                    href={`/admin/courses/${editingCourse.id}/edit`}
                                                    className="flex items-center gap-1 text-[11px] font-mono text-primary hover:underline uppercase tracking-wider font-semibold"
                                                >
                                                    Curriculum Builder <ArrowRight className="h-3 w-3" />
                                                </Link>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}
