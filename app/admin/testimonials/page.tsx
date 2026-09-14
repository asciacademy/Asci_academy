"use client"

import { useEffect, useState, useTransition } from "react"
import { format } from "date-fns"
import {
    MessageSquare, Star, CheckCircle2, XCircle, Trash2,
    RefreshCw, Loader2, Search, Quote,
    ThumbsUp, Clock
} from "lucide-react"
import {
    getAllTestimonialsAdmin,
    approveTestimonial,
    deleteTestimonial
} from "@/app/actions/admin"

type Testimonial = {
    id: string
    content: string
    rating: number
    cohort: string
    is_approved: boolean
    created_at: string
    profiles: { name: string; email: string } | null
}

type Filter = "all" | "approved" | "pending"

export default function AdminTestimonialsPage() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const [filter, setFilter] = useState<Filter>("all")
    const [isPending, startTransition] = useTransition()
    const [actionId, setActionId] = useState<string | null>(null)
    const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)

    const load = () => {
        startTransition(async () => {
            const res = await getAllTestimonialsAdmin()
            if (res.success && res.testimonials) {
                setTestimonials(res.testimonials as Testimonial[])
            }
            setLoading(false)
        })
    }

    useEffect(() => { load() }, [])

    const handleApprove = async (id: string, approve: boolean) => {
        setActionId(id)
        await approveTestimonial(id, approve)
        setTestimonials(prev =>
            prev.map(t => t.id === id ? { ...t, is_approved: approve } : t)
        )
        setActionId(null)
    }

    const handleDelete = async (id: string) => {
        setActionId(id)
        await deleteTestimonial(id)
        setTestimonials(prev => prev.filter(t => t.id !== id))
        setActionId(null)
        setDeleteConfirmId(null)
    }

    const filtered = testimonials.filter(t => {
        const matchesFilter =
            filter === "all" ? true :
            filter === "approved" ? t.is_approved :
            !t.is_approved

        const q = search.toLowerCase()
        const matchesSearch =
            !q ||
            t.content.toLowerCase().includes(q) ||
            (t.profiles?.name || "").toLowerCase().includes(q) ||
            (t.profiles?.email || "").toLowerCase().includes(q)

        return matchesFilter && matchesSearch
    })

    const stats = {
        total: testimonials.length,
        approved: testimonials.filter(t => t.is_approved).length,
        pending: testimonials.filter(t => !t.is_approved).length,
        avgRating: testimonials.length
            ? (testimonials.reduce((s, t) => s + t.rating, 0) / testimonials.length).toFixed(1)
            : "—",
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center p-24 font-mono text-xs text-primary">
                <Loader2 className="h-6 w-6 animate-spin mr-2" /> Loading testimonials...
            </div>
        )
    }

    return (
        <div className="space-y-8 pt-2 font-sans text-foreground">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-6">
                <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-widest bg-primary/10 text-primary border border-primary/20 mb-2 font-semibold">
                        Scholar Endorsements
                    </div>
                    <h1 className="font-serif text-3xl sm:text-4xl font-normal text-foreground tracking-tight">
                        Testimonials &amp; Evaluations <span className="text-muted-foreground text-xl">({filtered.length})</span>
                    </h1>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1 font-sans">
                        Review, moderate, and publish student outcome feedback to public catalog pages.
                    </p>
                </div>
                <button
                    onClick={load}
                    disabled={isPending}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border/80 bg-card/70 hover:bg-secondary text-xs font-mono uppercase tracking-wider font-semibold transition-all shrink-0 cursor-pointer"
                >
                    <RefreshCw className={`h-3.5 w-3.5 ${isPending ? "animate-spin" : ""}`} />
                    Refresh
                </button>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                    { label: "Total Reviews", value: stats.total, sub: "Collected submissions" },
                    { label: "Published Live", value: stats.approved, sub: "Visible on homepage" },
                    { label: "Pending Approval", value: stats.pending, sub: "Awaiting review" },
                    { label: "Average Evaluation", value: stats.avgRating, sub: "Out of 5.0 stars" },
                ].map(card => (
                    <div key={card.label} className="bg-card/70 border border-border/80 backdrop-blur-xl rounded-2xl p-5 relative overflow-hidden">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{card.label}</span>
                        <div className="text-2xl sm:text-3xl font-serif text-foreground mt-1">{card.value}</div>
                        <span className="text-[11px] font-mono text-primary mt-1 block">{card.sub}</span>
                    </div>
                ))}
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search by scholar name, email, or quote content..."
                        className="w-full pl-10 pr-4 py-2.5 bg-card/70 border border-border/80 rounded-xl text-xs sm:text-sm text-foreground focus:outline-none focus:border-primary/50 font-sans placeholder:text-muted-foreground/50"
                    />
                </div>
                <div className="flex bg-secondary/50 border border-border/80 rounded-xl p-0.5">
                    {(["all", "approved", "pending"] as Filter[]).map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider capitalize transition-all cursor-pointer ${
                                filter === f
                                    ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                                    : "text-muted-foreground hover:text-foreground"
                            }`}
                        >
                            {f}
                            {f === "pending" && stats.pending > 0 && (
                                <span className="ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] bg-primary-foreground/20 text-primary-foreground font-bold">
                                    {stats.pending}
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Testimonials List */}
            {filtered.length === 0 ? (
                <div className="text-center py-20 border border-dashed border-border/80 rounded-2xl bg-secondary/20 font-mono text-xs text-muted-foreground">
                    No testimonials match the specified filter or query.
                </div>
            ) : (
                <div className="space-y-4">
                    {filtered.map(t => (
                        <div
                            key={t.id}
                            className={`bg-card/70 backdrop-blur-xl border rounded-2xl p-6 transition-all relative ${
                                t.is_approved ? "border-border/80" : "border-amber-500/40 bg-card/90"
                            }`}
                        >
                            {/* Status Tag */}
                            <div className="absolute top-5 right-5">
                                {t.is_approved ? (
                                    <span className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/30 uppercase tracking-wider">
                                        ✓ Approved Live
                                    </span>
                                ) : (
                                    <span className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 uppercase tracking-wider flex items-center gap-1">
                                        <Clock className="h-3 w-3" /> Pending Review
                                    </span>
                                )}
                            </div>

                            {/* Author Row */}
                            <div className="flex items-center gap-3.5 mb-4 pr-32">
                                <div className="w-10 h-10 rounded-xl bg-secondary border border-border/80 font-mono text-xs font-bold text-primary flex items-center justify-center shrink-0">
                                    {(t.profiles?.name || "?").split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)}
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-semibold text-foreground truncate font-sans">
                                        {t.profiles?.name || "Anonymous Scholar"}
                                    </p>
                                    <p className="text-[11px] text-muted-foreground font-mono truncate">
                                        {t.profiles?.email || "No email"} · {t.cohort || "Cohort Alpha"}
                                    </p>
                                </div>
                                <div className="flex items-center gap-0.5 ml-3 shrink-0 text-amber-500">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star key={i} className={`h-3.5 w-3.5 ${i < t.rating ? "fill-current" : "text-border"}`} />
                                    ))}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="relative pl-4 border-l-2 border-primary/40 mb-4 bg-secondary/30 p-3.5 rounded-r-xl">
                                <p className="font-serif text-sm text-foreground leading-relaxed italic">
                                    &ldquo;{t.content}&rdquo;
                                </p>
                            </div>

                            {/* Footer Controls */}
                            <div className="flex items-center justify-between pt-2 border-t border-border/80">
                                <span className="text-[10px] text-muted-foreground font-mono">
                                    {format(new Date(t.created_at), "MMM d, yyyy 'at' h:mm a")}
                                </span>

                                <div className="flex items-center gap-2">
                                    {t.is_approved ? (
                                        <button
                                            onClick={() => handleApprove(t.id, false)}
                                            disabled={actionId === t.id}
                                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-mono border border-border/80 bg-card hover:bg-secondary text-muted-foreground hover:text-amber-600 transition-all uppercase tracking-wider font-semibold cursor-pointer"
                                        >
                                            {actionId === t.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <XCircle className="h-3.5 w-3.5" />}
                                            Unpublish
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleApprove(t.id, true)}
                                            disabled={actionId === t.id}
                                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-mono bg-primary text-primary-foreground hover:bg-primary-active transition-all uppercase tracking-wider font-semibold shadow-xs cursor-pointer"
                                        >
                                            {actionId === t.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <ThumbsUp className="h-3.5 w-3.5" />}
                                            Approve Live
                                        </button>
                                    )}

                                    {deleteConfirmId === t.id ? (
                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => handleDelete(t.id)}
                                                disabled={actionId === t.id}
                                                className="px-2.5 py-1.5 rounded-lg text-[10px] font-mono bg-red-600 text-white hover:bg-red-700 transition-all cursor-pointer"
                                            >
                                                Confirm Delete
                                            </button>
                                            <button
                                                onClick={() => setDeleteConfirmId(null)}
                                                className="px-2 py-1.5 rounded-lg text-[10px] font-mono border border-border/80 bg-card text-foreground cursor-pointer"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => setDeleteConfirmId(t.id)}
                                            className="p-1.5 rounded-lg border border-border/80 bg-card text-muted-foreground hover:text-red-500 transition-all cursor-pointer"
                                            title="Delete testimonial"
                                        >
                                            <Trash2 className="h-3.5 w-3.5" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
