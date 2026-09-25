"use client"

import { useEffect, useState, useTransition, useMemo, useRef } from "react"
import {
    getAnnouncements,
    createAnnouncement,
    deleteAnnouncement,
    toggleAnnouncement,
    updateAnnouncement
} from "@/app/actions/admin"
import { format } from "date-fns"
import {
    Megaphone, Plus, Trash2, Loader2, Check, X,
    Eye, Sparkles, Sliders, LayoutTemplate,
    Monitor, Palette, ArrowRight, Video, ChevronDown, ChevronUp,
    Upload, Link2, Image as ImageIcon, AlertCircle, RefreshCw
} from "lucide-react"
import { POSTER_PRESETS, normalizeImageUrl } from "@/lib/popups-data"
import { extractVibrantColor, adjustBrightness } from "@/components/popups/site-popup-modal"

const COLOR_SWATCHES = [
    { label: "Zoom Blue", color: "#2563eb" },
    { label: "Gold Amber", color: "#d97706" },
    { label: "Electric Violet", color: "#7c3aed" },
    { label: "Vibrant Cyan", color: "#0891b2" },
    { label: "Sunset Rose", color: "#db2777" },
    { label: "Unstop Blue", color: "#0073E6" },
    { label: "Crimson", color: "#dc2626" },
]

const DEFAULT_FORM = {
    title: "",
    content: "",
    type: "promo",
    is_active: true,
    is_popup: true,
    image_url: "",
    badge_text: "LIVE EVENT",
    cta_text: "Join Live Class Now",
    cta_url: "/live-classes",
    secondary_cta_text: "Dismiss",
    secondary_cta_url: "",
    target_audience: "all",
    display_placement: "all",
    frequency: "once_per_session",
    priority: 10,
    accent_color: "auto",
}

export default function AdminAnnouncementsPage() {
    const [announcements, setAnnouncements] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [isPending, startTransition] = useTransition()
    const [showForm, setShowForm] = useState(false)
    const [showAdvanced, setShowAdvanced] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [toast, setToast] = useState<{ type: "ok" | "err"; msg: string } | null>(null)
    const [previewColor, setPreviewColor] = useState<string>("#2563eb")

    // Image source mode: upload from device vs paste URL
    const [imageMode, setImageMode] = useState<"upload" | "url">("upload")
    const [uploadedFileName, setUploadedFileName] = useState<string>("")
    const [imageLoadError, setImageLoadError] = useState(false)
    const [isDragging, setIsDragging] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    // Form state
    const [form, setForm] = useState(DEFAULT_FORM)

    const notify = (type: "ok" | "err", msg: string) => {
        setToast({ type, msg })
        setTimeout(() => setToast(null), 3500)
    }

    const load = () => startTransition(async () => {
        const res = await getAnnouncements()
        if (res.success) setAnnouncements(res.announcements)
        setLoading(false)
    })

    useEffect(() => { load() }, [])

    // Dynamically extract poster color for live admin preview
    useEffect(() => {
        if (form.accent_color && form.accent_color !== "auto") {
            setPreviewColor(form.accent_color)
        } else if (form.image_url) {
            const normalized = normalizeImageUrl(form.image_url)
            extractVibrantColor(normalized, "#2563eb", (color) => {
                setPreviewColor(color)
            }, form.title)
        } else {
            setPreviewColor("#2563eb")
        }
    }, [form.accent_color, form.image_url, form.title])

    // Client-side file upload and auto-resizing
    const handleFileProcess = (file: File) => {
        if (!file.type.startsWith("image/")) {
            notify("err", "Please select an image file (PNG, JPG, WebP, SVG, GIF)")
            return
        }

        setUploadedFileName(file.name)
        setImageLoadError(false)

        const reader = new FileReader()
        reader.onload = (event) => {
            const rawDataUrl = event.target?.result as string
            if (!rawDataUrl) return

            // Optimize large images via client canvas to keep payload under 300KB
            const img = new Image()
            img.onload = () => {
                const maxDim = 1400
                let finalDataUrl = rawDataUrl
                if (img.width > maxDim || img.height > maxDim) {
                    const ratio = Math.min(maxDim / img.width, maxDim / img.height)
                    const canvas = document.createElement("canvas")
                    canvas.width = Math.round(img.width * ratio)
                    canvas.height = Math.round(img.height * ratio)
                    const ctx = canvas.getContext("2d")
                    ctx?.drawImage(img, 0, 0, canvas.width, canvas.height)
                    finalDataUrl = canvas.toDataURL("image/webp", 0.88)
                }

                setForm(prev => ({ ...prev, image_url: finalDataUrl }))
                notify("ok", `Uploaded "${file.name}"! Dominant colors adapted.`)

                // Instant color extraction from local data URL
                extractVibrantColor(finalDataUrl, "#2563eb", (color) => {
                    setPreviewColor(color)
                }, form.title)
            }
            img.onerror = () => {
                setForm(prev => ({ ...prev, image_url: rawDataUrl }))
                extractVibrantColor(rawDataUrl, "#2563eb", (color) => {
                    setPreviewColor(color)
                }, form.title)
            }
            img.src = rawDataUrl
        }
        reader.readAsDataURL(file)
    }

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) handleFileProcess(file)
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
        const file = e.dataTransfer.files?.[0]
        if (file) {
            setImageMode("upload")
            handleFileProcess(file)
        }
    }

    const handleApplyPreset = (preset: typeof POSTER_PRESETS[0]) => {
        setForm({
            ...DEFAULT_FORM,
            title: preset.title,
            content: preset.desc,
            image_url: preset.url,
            badge_text: preset.badge,
            cta_text: preset.cta,
            cta_url: preset.link,
            accent_color: preset.accentColor || "#2563eb",
        })
        setImageMode("url")
        setImageLoadError(false)
        setUploadedFileName("")
        setPreviewColor(preset.accentColor || "#2563eb")
        setShowForm(true)
        notify("ok", `Loaded "${preset.label}" template`)
    }

    const handleResetForm = () => {
        setForm(DEFAULT_FORM)
        setEditingId(null)
        setShowForm(false)
        setShowAdvanced(false)
        setUploadedFileName("")
        setImageLoadError(false)
        setPreviewColor("#2563eb")
        if (fileInputRef.current) fileInputRef.current.value = ""
    }

    const handleSave = async () => {
        if (!form.title.trim() || !form.content.trim()) {
            notify("err", "Title and description are required")
            return
        }

        startTransition(async () => {
            const payload = {
                ...form,
                image_url: normalizeImageUrl(form.image_url),
                accent_color: form.accent_color === "auto" ? previewColor : form.accent_color,
            }

            if (editingId) {
                const res = await updateAnnouncement(editingId, payload)
                if (res.success) {
                    notify("ok", "Pop-up updated successfully")
                    handleResetForm()
                    load()
                } else {
                    notify("err", res.error || "Update failed")
                }
            } else {
                const res = await createAnnouncement(payload)
                if (res.success) {
                    notify("ok", "Pop-up published live to students")
                    handleResetForm()
                    load()
                } else {
                    notify("err", res.error || "Creation failed")
                }
            }
        })
    }

    const handleEdit = (item: any) => {
        setEditingId(item.id)
        setForm({
            title: item.title || "",
            content: item.content || "",
            type: item.type || "promo",
            is_active: item.is_active ?? true,
            is_popup: item.is_popup ?? true,
            image_url: item.image_url || "",
            badge_text: item.badge_text || "LIVE EVENT",
            cta_text: item.cta_text || "Explore Now",
            cta_url: item.cta_url || "/live-classes",
            secondary_cta_text: item.secondary_cta_text || "Dismiss",
            secondary_cta_url: item.secondary_cta_url || "",
            target_audience: item.target_audience || "all",
            display_placement: item.display_placement || "all",
            frequency: item.frequency || "once_per_session",
            priority: item.priority || 10,
            accent_color: item.accent_color || "auto",
        })
        setImageLoadError(false)
        if (item.image_url?.startsWith("data:")) {
            setImageMode("upload")
            setUploadedFileName("Uploaded Image")
        } else {
            setImageMode("url")
            setUploadedFileName("")
        }
        setShowForm(true)
        window.scrollTo({ top: 80, behavior: "smooth" })
    }

    const handleToggle = async (id: string, isActive: boolean) => {
        startTransition(async () => {
            const res = await toggleAnnouncement(id, isActive)
            if (res.success) {
                setAnnouncements(prev => prev.map(a => a.id === id ? { ...a, is_active: !isActive } : a))
                notify("ok", isActive ? "Pop-up paused" : "Pop-up is now live!")
            } else notify("err", res.error || "Failed")
        })
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this pop-up?")) return
        startTransition(async () => {
            const res = await deleteAnnouncement(id)
            if (res.success) {
                setAnnouncements(prev => prev.filter(a => a.id !== id))
                notify("ok", "Pop-up removed")
            } else notify("err", res.error || "Failed")
        })
    }

    const handleTestOnScreen = (item: any) => {
        if (typeof window !== "undefined") {
            const normalizedUrl = normalizeImageUrl(item.image_url || "")
            window.dispatchEvent(new CustomEvent("asci-preview-popup", {
                detail: {
                    ...item,
                    image_url: normalizedUrl,
                    accent_color: item.accent_color && item.accent_color !== "auto" ? item.accent_color : previewColor,
                }
            }))
            notify("ok", "Triggered live modal on your screen!")
        }
    }

    const darkerPreview = useMemo(() => adjustBrightness(previewColor, -40), [previewColor])

    return (
        <div className="max-w-7xl mx-auto space-y-8 pt-2 font-sans text-foreground">
            {/* Toast Notification */}
            {toast && (
                <div className={`fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl border text-xs font-mono uppercase tracking-wider shadow-2xl backdrop-blur-md ${
                    toast.type === "ok" ? "bg-card/95 border-primary/50 text-primary" : "bg-card/95 border-red-500/50 text-red-500"
                }`}>
                    {toast.type === "ok" ? <Check className="h-4 w-4 text-primary" /> : <X className="h-4 w-4 text-red-500" />}
                    {toast.msg}
                </div>
            )}

            {/* Clean Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-6">
                <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-widest bg-primary/10 text-primary border border-primary/20 mb-2 font-semibold">
                        Marketing & Announcements
                    </div>
                    <h1 className="font-sans text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
                        Pop-ups & Posters
                    </h1>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1 font-sans">
                        Broadcast modal posters, Zoom masterclasses, and visual ads with dynamic color adaptation.
                    </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                    <button
                        onClick={() => {
                            if (showForm && !editingId) {
                                setShowForm(false)
                            } else {
                                handleResetForm()
                                setShowForm(true)
                            }
                        }}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-mono font-semibold uppercase tracking-wider hover:bg-primary-active transition-all shadow-md cursor-pointer"
                    >
                        {showForm && !editingId ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                        {showForm && !editingId ? "Close Form" : "Create Pop-up Poster"}
                    </button>
                </div>
            </div>

            {/* Quick 1-Click Templates Bar */}
            <div className="p-4 rounded-2xl bg-secondary/30 border border-border/80 space-y-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                        <Sparkles className="h-3.5 w-3.5 text-primary" /> One-Click Poster Templates
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground/70">Click to autofill form & preview</span>
                </div>
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                    {POSTER_PRESETS.map((p, idx) => (
                        <button
                            key={idx}
                            type="button"
                            onClick={() => handleApplyPreset(p)}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-border/80 bg-card hover:border-primary/50 text-left transition-all shrink-0 group cursor-pointer shadow-xs"
                        >
                            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: p.accentColor }} />
                            <span className="text-xs font-medium text-foreground group-hover:text-primary transition-colors whitespace-nowrap">
                                {p.label}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Streamlined Creator Panel with Dynamic Preview */}
            {showForm && (
                <div className="bg-card border border-border/80 rounded-3xl shadow-xl overflow-hidden backdrop-blur-xl">
                    <div className="p-6 sm:p-8 space-y-6">
                        <div className="flex items-center justify-between border-b border-border/80 pb-4">
                            <div>
                                <h2 className="text-xs font-mono uppercase tracking-widest text-primary font-bold">
                                    {editingId ? "Edit Pop-up Poster" : "Draft New Modal Pop-up"}
                                </h2>
                                <p className="text-[11px] text-muted-foreground mt-0.5">
                                    Upload artwork or paste a URL. The modal automatically extracts and adapts to the poster's colors.
                                </p>
                            </div>
                            <button onClick={handleResetForm} className="text-muted-foreground hover:text-foreground cursor-pointer">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* 2-Column Split: Clean Controls (Left) & Real-time Chameleon Preview (Right) */}
                        <div className="grid lg:grid-cols-12 gap-8 items-start">
                            {/* Left Controls (7 cols) */}
                            <div className="lg:col-span-7 space-y-4">
                                {/* Title */}
                                <div>
                                    <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-1 font-semibold">
                                        Headline / Title *
                                    </label>
                                    <input
                                        value={form.title}
                                        onChange={e => setForm(v => ({ ...v, title: e.target.value }))}
                                        placeholder="e.g. Live Zoom Masterclass: Distributed Systems & Redis"
                                        className="w-full bg-secondary/40 border border-border/80 rounded-xl text-foreground px-3.5 py-2.5 text-xs font-medium focus:outline-none focus:border-primary/60 transition-colors"
                                    />
                                </div>

                                {/* Poster / Ad Image: Upload or Link Switch */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground font-semibold flex items-center gap-1.5">
                                            <ImageIcon className="h-3.5 w-3.5 text-primary" /> Poster Image / Artwork
                                        </label>
                                        <div className="flex items-center gap-1 bg-secondary/60 p-0.5 rounded-lg border border-border/80">
                                            <button
                                                type="button"
                                                onClick={() => setImageMode("upload")}
                                                className={`px-2.5 py-1 rounded-md text-[10px] font-mono transition-all cursor-pointer flex items-center gap-1 ${
                                                    imageMode === "upload"
                                                        ? "bg-primary text-primary-foreground font-bold shadow-xs"
                                                        : "text-muted-foreground hover:text-foreground"
                                                }`}
                                            >
                                                <Upload className="w-3 h-3" /> Upload File
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setImageMode("url")}
                                                className={`px-2.5 py-1 rounded-md text-[10px] font-mono transition-all cursor-pointer flex items-center gap-1 ${
                                                    imageMode === "url"
                                                        ? "bg-primary text-primary-foreground font-bold shadow-xs"
                                                        : "text-muted-foreground hover:text-foreground"
                                                }`}
                                            >
                                                <Link2 className="w-3 h-3" /> Paste Link
                                            </button>
                                        </div>
                                    </div>

                                    {/* Upload Mode: Drag and drop or browse */}
                                    {imageMode === "upload" ? (
                                        <div
                                            onDragOver={e => { e.preventDefault(); setIsDragging(true) }}
                                            onDragLeave={() => setIsDragging(false)}
                                            onDrop={handleDrop}
                                            onClick={() => fileInputRef.current?.click()}
                                            className={`p-5 rounded-2xl border-2 border-dashed transition-all cursor-pointer text-center relative overflow-hidden group ${
                                                isDragging
                                                    ? "border-primary bg-primary/10"
                                                    : "border-border/80 hover:border-primary/50 bg-secondary/20 hover:bg-secondary/40"
                                            }`}
                                        >
                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                accept="image/png,image/jpeg,image/webp,image/svg+xml,image/gif"
                                                onChange={handleFileInputChange}
                                                className="hidden"
                                            />

                                            {form.image_url ? (
                                                <div className="flex items-center justify-between gap-3 text-left">
                                                    <div className="flex items-center gap-3 min-w-0">
                                                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-black/40 border border-border/80 shrink-0">
                                                            <img
                                                                src={form.image_url}
                                                                alt="Uploaded artwork"
                                                                referrerPolicy="no-referrer"
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                        <div className="min-w-0">
                                                            <p className="text-xs font-semibold text-foreground truncate">
                                                                {uploadedFileName || "Uploaded Custom Poster"}
                                                            </p>
                                                            <p className="text-[10px] font-mono text-primary flex items-center gap-1">
                                                                <Check className="w-3 h-3" /> Active & color sampled
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <button
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            setForm(v => ({ ...v, image_url: "" }))
                                                            setUploadedFileName("")
                                                            if (fileInputRef.current) fileInputRef.current.value = ""
                                                        }}
                                                        className="px-2.5 py-1.5 rounded-lg border border-border/80 hover:bg-red-500/10 hover:text-red-500 text-xs text-muted-foreground cursor-pointer transition-colors"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="space-y-1.5 py-2">
                                                    <div className="w-9 h-9 mx-auto rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                                                        <Upload className="w-4 h-4" />
                                                    </div>
                                                    <p className="text-xs font-medium text-foreground">
                                                        Click to upload or drag & drop poster artwork
                                                    </p>
                                                    <p className="text-[10px] font-mono text-muted-foreground">
                                                        PNG, JPG, WebP, SVG, GIF up to 10MB
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        /* Link Mode: Direct URL input with clear button */
                                        <div className="space-y-1.5">
                                            <div className="flex gap-2">
                                                <input
                                                    value={form.image_url}
                                                    onChange={e => {
                                                        const raw = e.target.value
                                                        const normalized = normalizeImageUrl(raw)
                                                        setImageLoadError(false)
                                                        setForm(v => ({ ...v, image_url: normalized }))
                                                        if (normalized !== raw.trim() && (raw.includes("drive.google.com") || raw.includes("docs.google.com"))) {
                                                            notify("ok", "Google Drive link converted to direct image stream!")
                                                        }
                                                    }}
                                                    onBlur={() => {
                                                        if (form.image_url) {
                                                            const normalized = normalizeImageUrl(form.image_url)
                                                            if (normalized !== form.image_url) {
                                                                setForm(v => ({ ...v, image_url: normalized }))
                                                            }
                                                        }
                                                    }}
                                                    placeholder="Paste Google Drive sharing link, Unsplash, or direct image URL"
                                                    className="flex-1 bg-secondary/40 border border-border/80 rounded-xl text-foreground px-3.5 py-2 text-xs font-mono focus:outline-none focus:border-primary/60"
                                                />
                                                {form.image_url && (
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setForm(v => ({ ...v, image_url: "" }))
                                                            setImageLoadError(false)
                                                        }}
                                                        className="px-3 py-1.5 rounded-xl border border-border/80 hover:bg-secondary text-xs text-muted-foreground cursor-pointer"
                                                    >
                                                        Clear
                                                    </button>
                                                )}
                                            </div>
                                            <p className="text-[10px] font-mono text-muted-foreground/70">
                                                Supports Google Drive sharing links (auto-converts), Unsplash, Imgur, Dropbox, and direct image links.
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Dynamic Accent Color Swatches */}
                                <div className="p-3 rounded-2xl bg-secondary/30 border border-border/80 space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground font-semibold flex items-center gap-1.5">
                                            <Palette className="h-3 w-3 text-primary" /> Poster Dynamic Theme Color
                                        </span>
                                        <span className="text-[9px] font-mono text-muted-foreground">Adapts borders, glows & buttons</span>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-1.5">
                                        <button
                                            type="button"
                                            onClick={() => setForm(v => ({ ...v, accent_color: "auto" }))}
                                            className={`px-2.5 py-1 rounded-xl text-[10px] font-mono border transition-all cursor-pointer ${
                                                form.accent_color === "auto" || !form.accent_color
                                                    ? "bg-primary text-primary-foreground font-bold border-primary shadow-xs"
                                                    : "bg-card border-border/80 text-muted-foreground hover:text-foreground"
                                            }`}
                                        >
                                            ✨ Auto From Poster
                                        </button>
                                        {COLOR_SWATCHES.map(swatch => (
                                            <button
                                                key={swatch.color}
                                                type="button"
                                                onClick={() => setForm(v => ({ ...v, accent_color: swatch.color }))}
                                                className={`flex items-center gap-1 px-2 py-1 rounded-xl text-[10px] font-mono border transition-all cursor-pointer ${
                                                    form.accent_color === swatch.color
                                                        ? "ring-2 ring-primary border-primary font-bold bg-secondary"
                                                        : "border-border/80 bg-card hover:bg-secondary/70 text-muted-foreground"
                                                }`}
                                            >
                                                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: swatch.color }} />
                                                <span>{swatch.label}</span>
                                            </button>
                                        ))}
                                        <div className="flex items-center gap-1.5 ml-auto">
                                            <input
                                                type="color"
                                                value={previewColor}
                                                onChange={e => setForm(v => ({ ...v, accent_color: e.target.value }))}
                                                className="w-6 h-6 rounded-lg border border-border/80 cursor-pointer bg-transparent"
                                                title="Custom Hex Color"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Description / Ad Copy */}
                                <div>
                                    <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-1 font-semibold">
                                        Message & Ad Copy *
                                    </label>
                                    <textarea
                                        value={form.content}
                                        onChange={e => setForm(v => ({ ...v, content: e.target.value }))}
                                        rows={3}
                                        placeholder="Brief, persuasive description for visitors and students..."
                                        className="w-full bg-secondary/40 border border-border/80 rounded-xl text-foreground px-3.5 py-2 text-xs focus:outline-none focus:border-primary/60 resize-none leading-relaxed"
                                    />
                                </div>

                                {/* Call to Action Button Row */}
                                <div className="grid sm:grid-cols-2 gap-3">
                                    <div>
                                        <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-1 font-semibold">
                                            CTA Button Label
                                        </label>
                                        <input
                                            value={form.cta_text}
                                            onChange={e => setForm(v => ({ ...v, cta_text: e.target.value }))}
                                            placeholder="e.g. Join Live Class Now"
                                            className="w-full bg-secondary/40 border border-border/80 rounded-xl text-foreground px-3 py-2 text-xs focus:outline-none focus:border-primary/60"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-1 font-semibold">
                                            CTA Target Link
                                        </label>
                                        <input
                                            value={form.cta_url}
                                            onChange={e => setForm(v => ({ ...v, cta_url: e.target.value }))}
                                            placeholder="e.g. /live-classes or /pricing"
                                            className="w-full bg-secondary/40 border border-border/80 rounded-xl text-foreground px-3 py-2 text-xs font-mono focus:outline-none focus:border-primary/60"
                                        />
                                    </div>
                                </div>

                                {/* Optional Advanced Options Accordion */}
                                <div className="border border-border/80 rounded-2xl overflow-hidden">
                                    <button
                                        type="button"
                                        onClick={() => setShowAdvanced(v => !v)}
                                        className="w-full px-4 py-2.5 bg-secondary/20 hover:bg-secondary/40 flex items-center justify-between text-xs font-mono text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                                    >
                                        <span>⚙️ Additional Settings (Badge, Placement, Frequency)</span>
                                        {showAdvanced ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                    </button>

                                    {showAdvanced && (
                                        <div className="p-4 bg-card space-y-3 border-t border-border/80">
                                            <div className="grid sm:grid-cols-2 gap-3">
                                                <div>
                                                    <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-1">
                                                        Badge / Tag Text
                                                    </label>
                                                    <input
                                                        value={form.badge_text}
                                                        onChange={e => setForm(v => ({ ...v, badge_text: e.target.value }))}
                                                        placeholder="e.g. LIVE ZOOM EVENT"
                                                        className="w-full bg-secondary/40 border border-border/80 rounded-xl px-3 py-1.5 text-xs font-mono uppercase"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-1">
                                                        Secondary Button Text
                                                    </label>
                                                    <input
                                                        value={form.secondary_cta_text}
                                                        onChange={e => setForm(v => ({ ...v, secondary_cta_text: e.target.value }))}
                                                        placeholder="e.g. Dismiss / Learn More"
                                                        className="w-full bg-secondary/40 border border-border/80 rounded-xl px-3 py-1.5 text-xs"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid sm:grid-cols-2 gap-3">
                                                <div>
                                                    <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-1">
                                                        Page Placement
                                                    </label>
                                                    <select
                                                        value={form.display_placement}
                                                        onChange={e => setForm(v => ({ ...v, display_placement: e.target.value }))}
                                                        className="w-full bg-secondary/40 border border-border/80 rounded-xl px-3 py-1.5 text-xs"
                                                    >
                                                        <option value="all">All Pages</option>
                                                        <option value="home">Home Page Only</option>
                                                        <option value="dashboard">Dashboard Only</option>
                                                        <option value="courses">Courses Only</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-1">
                                                        Display Frequency
                                                    </label>
                                                    <select
                                                        value={form.frequency}
                                                        onChange={e => setForm(v => ({ ...v, frequency: e.target.value }))}
                                                        className="w-full bg-secondary/40 border border-border/80 rounded-xl px-3 py-1.5 text-xs"
                                                    >
                                                        <option value="once_per_session">Once Per Session</option>
                                                        <option value="always">Every Visit</option>
                                                        <option value="once_forever">Once Until Cleared</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Right Chameleon Live Preview (5 cols) */}
                            <div className="lg:col-span-5 bg-secondary/20 border border-border/80 rounded-2xl p-4 sm:p-5 space-y-3">
                                <div className="flex items-center justify-between pb-2 border-b border-border/60">
                                    <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                                        <Monitor className="h-3.5 w-3.5 text-primary" /> Live Student Preview
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handleTestOnScreen({ ...form, id: "preview-temp" })}
                                        className="inline-flex items-center gap-1 text-[10px] font-mono text-primary hover:underline cursor-pointer"
                                    >
                                        <Eye className="h-3 w-3" /> Test Modal On Screen
                                    </button>
                                </div>

                                {/* Dynamic Pop-up Modal Container Adapting to Poster Theme Color */}
                                <div
                                    style={{
                                        borderColor: `${previewColor}55`,
                                        background: `radial-gradient(ellipse at 50% -10%, ${previewColor}25 0%, #111317 65%, #090a0d 100%)`,
                                        boxShadow: `0 15px 40px -10px ${previewColor}40`,
                                    }}
                                    className="relative border rounded-2xl shadow-xl overflow-hidden text-[#FDFBF7]"
                                >
                                    {/* Top Hairline Glowing Strip */}
                                    <div
                                        style={{
                                            background: `linear-gradient(90deg, transparent 5%, ${previewColor} 50%, transparent 95%)`,
                                        }}
                                        className="absolute top-0 left-0 right-0 h-[2px] z-20 opacity-90"
                                    />

                                    {form.image_url ? (
                                        <div className="relative w-full h-40 bg-black/40 overflow-hidden">
                                            <img
                                                src={normalizeImageUrl(form.image_url)}
                                                alt="Preview Poster"
                                                referrerPolicy="no-referrer"
                                                onError={() => setImageLoadError(true)}
                                                className="w-full h-full object-cover"
                                            />
                                            {imageLoadError && (
                                                <div className="absolute inset-0 bg-secondary/95 backdrop-blur-xs flex flex-col items-center justify-center p-3 text-center z-10 space-y-1.5">
                                                    <AlertCircle className="w-5 h-5 text-amber-500" />
                                                    <span className="text-[11px] font-semibold text-foreground">
                                                        Image Link Could Not Be Loaded
                                                    </span>
                                                    <span className="text-[10px] text-muted-foreground max-w-xs">
                                                        Hotlinking blocked by host. Use &quot;Upload File&quot; to upload it directly from your computer.
                                                    </span>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setImageMode("upload")
                                                            setImageLoadError(false)
                                                            fileInputRef.current?.click()
                                                        }}
                                                        className="px-2.5 py-1 rounded-lg bg-primary text-primary-foreground text-[10px] font-mono font-bold uppercase cursor-pointer hover:bg-primary-active transition-colors"
                                                    >
                                                        Upload File Instead
                                                    </button>
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#111317] via-transparent to-transparent pointer-events-none" />
                                            <div
                                                style={{
                                                    backgroundColor: "rgba(0,0,0,0.8)",
                                                    borderColor: `${previewColor}70`,
                                                    color: previewColor,
                                                }}
                                                className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full border text-[9px] font-mono uppercase font-bold flex items-center gap-1 shadow-md z-10"
                                            >
                                                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: previewColor }} />
                                                {form.badge_text || "LIVE EVENT"}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="p-3.5 pb-0">
                                            <span
                                                style={{
                                                    backgroundColor: `${previewColor}20`,
                                                    borderColor: `${previewColor}50`,
                                                    color: previewColor,
                                                }}
                                                className="px-2.5 py-0.5 rounded-full border text-[9px] font-mono uppercase font-bold"
                                            >
                                                {form.badge_text || "ANNOUNCEMENT"}
                                            </span>
                                        </div>
                                    )}

                                    <div className="p-4 space-y-2">
                                        <h3 className="font-sans text-base font-bold text-white leading-snug">
                                            {form.title || "Your Headline Will Appear Here"}
                                        </h3>
                                        <p className="text-[11px] text-zinc-300 font-sans line-clamp-3 leading-relaxed">
                                            {form.content || "Ad description and compelling highlights will appear here."}
                                        </p>
                                        <div className="pt-2 flex items-center gap-2">
                                            <div
                                                style={{
                                                    background: `linear-gradient(135deg, ${previewColor}, ${darkerPreview})`,
                                                    boxShadow: `0 4px 14px 0 ${previewColor}50`,
                                                }}
                                                className="flex-1 py-2 px-3 rounded-xl text-center text-[10px] font-mono font-bold uppercase tracking-wider text-white shadow-xs"
                                            >
                                                {form.cta_text || "Join Live Class"}
                                            </div>
                                            <div className="py-2 px-3 rounded-xl bg-white/5 border border-white/10 text-center text-[10px] font-mono text-zinc-300">
                                                {form.secondary_cta_text || "Dismiss"}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-[10px] font-mono text-muted-foreground/70 text-center">
                                    Adaptive poster styling matches user modal exactly
                                </p>
                            </div>
                        </div>

                        {/* Form Submit Footer */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border/80">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={form.is_active}
                                    onChange={e => setForm(v => ({ ...v, is_active: e.target.checked }))}
                                    className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                                />
                                <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                                    Set Live Immediately
                                </span>
                            </label>

                            <div className="flex items-center gap-3 w-full sm:w-auto">
                                <button
                                    type="button"
                                    onClick={handleResetForm}
                                    className="flex-1 sm:flex-initial px-4 py-2 rounded-xl border border-border/80 text-xs font-mono text-muted-foreground hover:text-foreground hover:bg-secondary cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSave}
                                    disabled={isPending}
                                    className="flex-1 sm:flex-initial px-6 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-mono font-bold uppercase tracking-wider hover:bg-primary-active transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                                >
                                    {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                                    {editingId ? "Update Pop-up" : "Publish Pop-up Live"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Clean Broadcasts List */}
            <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-border/80 pb-2">
                    <h2 className="text-xs font-mono uppercase tracking-widest text-muted-foreground font-bold">
                        Active Broadcasts & Pop-ups ({announcements.length})
                    </h2>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-16 font-mono text-xs text-primary">
                        <Loader2 className="h-6 w-6 animate-spin mr-2" /> Loading broadcasts...
                    </div>
                ) : announcements.length === 0 ? (
                    <div className="text-center py-16 border border-dashed border-border/80 rounded-3xl bg-secondary/10">
                        <Megaphone className="h-8 w-8 text-muted-foreground/30 mx-auto mb-2" />
                        <p className="text-muted-foreground text-xs font-mono">No broadcasts found. Click "Create Pop-up Poster" above.</p>
                    </div>
                ) : (
                    <div className="grid gap-3">
                        {announcements.map(a => {
                            const itemColor = a.accent_color && a.accent_color !== "auto" ? a.accent_color : "#2563eb"

                            return (
                                <div
                                    key={a.id}
                                    className={`rounded-2xl border bg-card border-border/80 transition-all p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs hover:border-primary/40 ${
                                        a.is_active ? "border-border/80" : "opacity-60"
                                    }`}
                                >
                                    <div className="flex items-center gap-3.5 min-w-0">
                                        {a.image_url ? (
                                            <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-black/40 border border-border/80 relative">
                                                <img
                                                    src={normalizeImageUrl(a.image_url)}
                                                    alt={a.title}
                                                    referrerPolicy="no-referrer"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        ) : (
                                            <div
                                                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border"
                                                style={{ borderColor: `${itemColor}50`, backgroundColor: `${itemColor}15`, color: itemColor }}
                                            >
                                                <Sparkles className="h-5 w-5" />
                                            </div>
                                        )}

                                        <div className="min-w-0 space-y-1">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <span className="text-sm font-semibold text-foreground truncate">{a.title}</span>
                                                <span
                                                    className="w-2.5 h-2.5 rounded-full inline-block shrink-0"
                                                    style={{ backgroundColor: itemColor }}
                                                    title={`Theme color: ${itemColor}`}
                                                />
                                                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase font-bold ${
                                                    a.is_active ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/30" : "bg-secondary text-muted-foreground"
                                                }`}>
                                                    {a.is_active ? "Live" : "Paused"}
                                                </span>
                                            </div>
                                            <p className="text-xs text-muted-foreground line-clamp-1">{a.content}</p>
                                            <div className="flex items-center gap-3 text-[10px] font-mono text-muted-foreground/70">
                                                {a.cta_text && (
                                                    <span className="text-primary">CTA: {a.cta_text} → {a.cta_url || "/"}</span>
                                                )}
                                                <span>{format(new Date(a.created_at || Date.now()), "MMM d, yyyy")}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                                        <button
                                            type="button"
                                            onClick={() => handleTestOnScreen(a)}
                                            className="p-2 rounded-xl border border-border/80 bg-secondary/40 text-muted-foreground hover:text-primary hover:border-primary/40 transition-all cursor-pointer"
                                            title="Test this modal live on your screen"
                                        >
                                            <Eye className="h-4 w-4" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleEdit(a)}
                                            className="p-2 rounded-xl border border-border/80 bg-secondary/40 text-muted-foreground hover:text-foreground transition-all cursor-pointer"
                                            title="Edit"
                                        >
                                            <Sliders className="h-4 w-4" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleToggle(a.id, a.is_active)}
                                            disabled={isPending}
                                            className={`px-3 py-1.5 rounded-xl border text-[11px] font-mono font-medium transition-all cursor-pointer ${
                                                a.is_active
                                                    ? "border-emerald-500/30 text-emerald-500 bg-emerald-500/10 hover:bg-emerald-500/20"
                                                    : "border-border/80 text-muted-foreground bg-card hover:bg-secondary"
                                            }`}
                                        >
                                            {a.is_active ? "Active" : "Paused"}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleDelete(a.id)}
                                            disabled={isPending}
                                            className="p-2 rounded-xl border border-border/80 bg-card text-muted-foreground hover:text-red-500 transition-all cursor-pointer"
                                            title="Delete"
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
        </div>
    )
}
