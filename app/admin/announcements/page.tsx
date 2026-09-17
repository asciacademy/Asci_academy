"use client"

import { useEffect, useState, useTransition } from "react"
import { getAnnouncements, createAnnouncement, deleteAnnouncement, toggleAnnouncement } from "@/app/actions/admin"
import { format } from "date-fns"
import {
    Megaphone, Plus, Trash2, Loader2, Check, X,
    ToggleLeft, ToggleRight, Zap, AlertTriangle, Info, Star
} from "lucide-react"

const TYPES = [
    { value: "info", label: "Information", color: "#3b82f6", icon: Info },
    { value: "warning", label: "Notice", color: "#6366f1", icon: AlertTriangle },
    { value: "success", label: "Update", color: "#10b981", icon: Check },
    { value: "promo", label: "Special", color: "#d4b872", icon: Star },
]

export default function AdminAnnouncementsPage() {
    const [announcements, setAnnouncements] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [isPending, startTransition] = useTransition()
    const [showForm, setShowForm] = useState(false)
    const [form, setForm] = useState({ title: "", content: "", type: "info", is_active: true })
    const [toast, setToast] = useState<{ type: "ok" | "err"; msg: string } | null>(null)

    const notify = (type: "ok" | "err", msg: string) => {
        setToast({ type, msg })
        setTimeout(() => setToast(null), 3000)
    }

    const load = () => startTransition(async () => {
        const res = await getAnnouncements()
        if (res.success) setAnnouncements(res.announcements)
        setLoading(false)
    })

    useEffect(() => { load() }, [])

    const handleCreate = async () => {
        if (!form.title.trim() || !form.content.trim()) {
            notify("err", "Title and content are required")
            return
        }
        startTransition(async () => {
            const res = await createAnnouncement(form)
            if (res.success) {
                notify("ok", "Announcement published to dashboard")
                setShowForm(false)
                setForm({ title: "", content: "", type: "info", is_active: true })
                load()
            } else notify("err", res.error || "Failed")
        })
    }

    const handleToggle = async (id: string, isActive: boolean) => {
        startTransition(async () => {
            const res = await toggleAnnouncement(id, isActive)
            if (res.success) {
                setAnnouncements(prev => prev.map(a => a.id === id ? { ...a, is_active: !isActive } : a))
                notify("ok", isActive ? "Announcement hidden" : "Announcement shown")
            } else notify("err", res.error || "Failed")
        })
    }

    const handleDelete = async (id: string) => {
        startTransition(async () => {
            const res = await deleteAnnouncement(id)
            if (res.success) {
                setAnnouncements(prev => prev.filter(a => a.id !== id))
                notify("ok", "Announcement deleted")
            } else notify("err", res.error || "Failed")
        })
    }

    if (loading) return (
        <div className="flex justify-center items-center p-24 font-mono text-xs text-primary">
            <Loader2 className="h-6 w-6 animate-spin mr-2" /> Loading announcements...
        </div>
    )

    return (
        <div className="space-y-8 pt-2 font-sans text-foreground">
            {/* Toast */}
            {toast && (
                <div className={`fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl border text-xs font-mono uppercase tracking-wider shadow-lg ${
                    toast.type === "ok" ? "bg-card border-primary/40 text-primary" : "bg-card border-red-500/40 text-red-600 dark:text-red-400"
                }`}>
                    {toast.type === "ok" ? <Check className="h-4 w-4 text-primary" /> : <X className="h-4 w-4 text-red-500" />}
                    {toast.msg}
                </div>
            )}

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-6">
                <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-widest bg-primary/10 text-primary border border-primary/20 mb-2 font-semibold">
                        System Broadcasts
                    </div>
                    <h1 className="font-serif text-3xl sm:text-4xl font-normal text-foreground tracking-tight">
                        Site Announcements
                    </h1>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1 font-sans">
                        Broadcast alerts and banners that appear across student and operative dashboards.
                    </p>
                </div>
                <button
                    onClick={() => setShowForm(v => !v)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-mono font-semibold uppercase tracking-wider hover:bg-primary-active transition-all shadow-sm shrink-0 cursor-pointer"
                >
                    <Plus className="h-4 w-4" /> New Announcement
                </button>
            </div>

            {/* Create Form */}
            {showForm && (
                <div className="bg-card/70 border border-border/80 backdrop-blur-xl rounded-2xl overflow-hidden shadow-md">
                    <div className="p-6 sm:p-8 space-y-5">
                        <div className="flex items-center justify-between border-b border-border/80 pb-3">
                            <h2 className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
                                Draft New Broadcast
                            </h2>
                            <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground cursor-pointer">
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-1.5">
                                    Title *
                                </label>
                                <input
                                    value={form.title}
                                    onChange={e => setForm(v => ({ ...v, title: e.target.value }))}
                                    placeholder="e.g. New Distributed Systems Module Published"
                                    className="w-full bg-secondary/40 border border-border/80 rounded-xl text-foreground px-3.5 py-2.5 text-xs font-sans focus:outline-none focus:border-primary/50"
                                />
                            </div>
                            <div>
                                <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-1.5">
                                    Category
                                </label>
                                <div className="grid grid-cols-4 gap-2">
                                    {TYPES.map(t => (
                                        <button
                                            key={t.value}
                                            type="button"
                                            onClick={() => setForm(v => ({ ...v, type: t.value }))}
                                            className={`py-2 rounded-xl text-[10px] font-mono uppercase tracking-wider border transition-all cursor-pointer ${
                                                form.type === t.value
                                                    ? "bg-primary text-primary-foreground font-bold shadow-xs border-primary"
                                                    : "bg-secondary/40 border-border/80 text-muted-foreground hover:text-foreground"
                                            }`}
                                        >
                                            {t.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-1.5">
                                Content *
                            </label>
                            <textarea
                                value={form.content}
                                onChange={e => setForm(v => ({ ...v, content: e.target.value }))}
                                rows={2}
                                placeholder="Message text displayed directly on user dashboards..."
                                className="w-full bg-secondary/40 border border-border/80 rounded-xl text-foreground px-3.5 py-2.5 text-xs font-sans focus:outline-none focus:border-primary/50 resize-none"
                            />
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-border/80">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={form.is_active}
                                    onChange={e => setForm(v => ({ ...v, is_active: e.target.checked }))}
                                    className="accent-primary rounded"
                                />
                                <span className="text-xs font-sans text-foreground font-medium">Publish immediately</span>
                            </label>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setShowForm(false)}
                                    className="px-4 py-2 rounded-xl border border-border/80 bg-card text-muted-foreground text-xs font-mono uppercase tracking-wider hover:bg-secondary cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleCreate}
                                    disabled={isPending}
                                    className="flex items-center gap-2 px-5 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-mono font-semibold uppercase tracking-wider hover:bg-primary-active transition-all disabled:opacity-60 shadow-sm cursor-pointer"
                                >
                                    {isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Megaphone className="h-3.5 w-3.5" />}
                                    Publish Broadcast
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Announcement List */}
            {announcements.length === 0 ? (
                <div className="text-center py-20 border border-dashed border-border/80 rounded-2xl bg-secondary/20">
                    <Megaphone className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
                    <p className="text-muted-foreground text-xs font-mono">No active announcements recorded. Click New Announcement to create one.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {announcements.map(a => {
                        const typeConfig = TYPES.find(t => t.value === a.type) || TYPES[0]
                        return (
                            <div
                                key={a.id}
                                className={`rounded-2xl border bg-card/70 border-border/80 backdrop-blur-xl transition-all overflow-hidden p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                                    a.is_active ? "border-border/80" : "border-border/60 opacity-60"
                                }`}
                            >
                                <div className="flex items-start gap-4 min-w-0">
                                    <div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border"
                                        style={{ borderColor: `${typeConfig.color}40`, backgroundColor: `${typeConfig.color}15`, color: typeConfig.color }}
                                    >
                                        <typeConfig.icon className="h-5 w-5" />
                                    </div>
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                                            <span className="text-sm font-semibold text-foreground font-sans">{a.title}</span>
                                            <span
                                                className="text-[10px] font-mono px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold"
                                                style={{ backgroundColor: `${typeConfig.color}15`, color: typeConfig.color }}
                                            >
                                                {typeConfig.label}
                                            </span>
                                            <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase tracking-wider font-bold ${
                                                a.is_active ? "bg-primary/10 text-primary border border-primary/30" : "bg-secondary text-muted-foreground"
                                            }`}>
                                                {a.is_active ? "Live" : "Inactive"}
                                            </span>
                                        </div>
                                        <p className="text-xs text-muted-foreground font-sans leading-relaxed">{a.content}</p>
                                        <p className="text-[10px] text-muted-foreground/60 font-mono mt-1.5">
                                            {format(new Date(a.created_at), "MMM d, yyyy 'at' h:mm a")}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                                    <button
                                        onClick={() => handleToggle(a.id, a.is_active)}
                                        disabled={isPending}
                                        title={a.is_active ? "Hide announcement" : "Display announcement"}
                                        className={`p-2 rounded-xl border transition-all cursor-pointer ${
                                            a.is_active
                                                ? "border-primary/40 text-primary bg-primary/10 hover:bg-primary/20"
                                                : "border-border/80 text-muted-foreground bg-card"
                                        }`}
                                    >
                                        {a.is_active ? <ToggleRight className="h-5 w-5" /> : <ToggleLeft className="h-5 w-5" />}
                                    </button>
                                    <button
                                        onClick={() => handleDelete(a.id)}
                                        disabled={isPending}
                                        className="p-2 rounded-xl border border-border/80 bg-card text-muted-foreground hover:text-red-500 transition-all cursor-pointer"
                                        title="Delete announcement"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
