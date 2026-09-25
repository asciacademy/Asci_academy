"use client"

import { useEffect, useState, useTransition } from "react"
import { format } from "date-fns"
import {
  Video, Plus, Trash2, Loader2, Check, X,
  Radio, Calendar, Clock, User, Link as LinkIcon,
  Play, CheckCircle2, AlertTriangle, ExternalLink,
  Sliders, Eye, Copy, Sparkles, Tv, Layers
} from "lucide-react"
import {
  getLiveClasses,
  createAdminLiveClass,
  updateAdminLiveClass,
  toggleLiveClassStatus,
  deleteAdminLiveClass
} from "@/app/actions/live-classes"
import { LiveClass, LiveClassFormData, LiveClassStatus } from "@/lib/live-classes-types"
import { TOPIC_PRESETS, INSTRUCTOR_PRESETS, BANNER_PRESETS } from "@/lib/live-classes-data"
import { ZoomMeetingModal } from "@/components/live-classes/zoom-meeting-modal"

export default function AdminLiveClassesPage() {
  const [classes, setClasses] = useState<LiveClass[]>([])
  const [loading, setLoading] = useState(true)
  const [isPending, startTransition] = useTransition()
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState<"all" | "live" | "upcoming" | "completed">("all")
  const [toast, setToast] = useState<{ type: "ok" | "err"; msg: string } | null>(null)
  const [previewClass, setPreviewClass] = useState<LiveClass | null>(null)

  // Form State
  const defaultStartTime = new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString().slice(0, 16)
  const [form, setForm] = useState<LiveClassFormData>({
    title: "",
    description: "",
    topic: TOPIC_PRESETS[0],
    instructor_name: INSTRUCTOR_PRESETS[0].name,
    instructor_role: INSTRUCTOR_PRESETS[0].role,
    instructor_avatar: INSTRUCTOR_PRESETS[0].avatar,
    start_time: defaultStartTime,
    duration_minutes: 90,
    status: "upcoming",
    zoom_meeting_url: "https://zoom.us/j/84920394821?pwd=asci-live-room",
    zoom_meeting_id: "849 2039 4821",
    zoom_passcode: "ASCI2026",
    recording_url: "",
    banner_image: BANNER_PRESETS[0].url,
    max_attendees: 300,
    tags: ["Live Zoom", "System Design"],
    is_featured: true,
  })

  const notify = (type: "ok" | "err", msg: string) => {
    setToast({ type, msg })
    setTimeout(() => setToast(null), 3500)
  }

  const loadData = () => startTransition(async () => {
    const res = await getLiveClasses()
    if (res.success && res.classes) {
      setClasses(res.classes)
    }
    setLoading(false)
  })

  useEffect(() => { loadData() }, [])

  const handleResetForm = () => {
    setForm({
      title: "",
      description: "",
      topic: TOPIC_PRESETS[0],
      instructor_name: INSTRUCTOR_PRESETS[0].name,
      instructor_role: INSTRUCTOR_PRESETS[0].role,
      instructor_avatar: INSTRUCTOR_PRESETS[0].avatar,
      start_time: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString().slice(0, 16),
      duration_minutes: 90,
      status: "upcoming",
      zoom_meeting_url: "https://zoom.us/j/84920394821?pwd=asci-live-room",
      zoom_meeting_id: "849 2039 4821",
      zoom_passcode: "ASCI2026",
      recording_url: "",
      banner_image: BANNER_PRESETS[0].url,
      max_attendees: 300,
      tags: ["Live Zoom", "System Design"],
      is_featured: true,
    })
    setEditingId(null)
    setShowForm(false)
  }

  const handleEdit = (c: LiveClass) => {
    setEditingId(c.id)
    const formattedStartTime = c.start_time ? new Date(c.start_time).toISOString().slice(0, 16) : defaultStartTime
    setForm({
      title: c.title,
      description: c.description,
      topic: c.topic,
      instructor_name: c.instructor_name,
      instructor_role: c.instructor_role,
      instructor_avatar: c.instructor_avatar || "",
      start_time: formattedStartTime,
      duration_minutes: c.duration_minutes,
      status: c.status,
      zoom_meeting_url: c.zoom_meeting_url,
      zoom_meeting_id: c.zoom_meeting_id || "",
      zoom_passcode: c.zoom_passcode || "",
      recording_url: c.recording_url || "",
      banner_image: c.banner_image || "",
      max_attendees: c.max_attendees || 300,
      tags: c.tags || [],
      is_featured: c.is_featured ?? true,
    })
    setShowForm(true)
    window.scrollTo({ top: 100, behavior: "smooth" })
  }

  const handleSave = () => {
    if (!form.title.trim() || !form.zoom_meeting_url.trim()) {
      notify("err", "Title and Zoom Meeting URL are required")
      return
    }

    startTransition(async () => {
      if (editingId) {
        const res = await updateAdminLiveClass(editingId, form)
        if (res.success) {
          notify("ok", "Live class session updated!")
          handleResetForm()
          loadData()
        } else {
          notify("err", res.error || "Update failed")
        }
      } else {
        const res = await createAdminLiveClass(form)
        if (res.success) {
          notify("ok", "New live class & Zoom meeting created!")
          handleResetForm()
          loadData()
        } else {
          notify("err", res.error || "Creation failed")
        }
      }
    })
  }

  const handleQuickStatusToggle = (c: LiveClass) => {
    const nextStatus: LiveClassStatus = c.status === "live" ? "completed" : c.status === "upcoming" ? "live" : "upcoming"
    startTransition(async () => {
      const res = await toggleLiveClassStatus(c.id, nextStatus)
      if (res.success) {
        setClasses(prev => prev.map(item => item.id === c.id ? { ...item, status: nextStatus } : item))
        notify("ok", `Status updated to ${nextStatus.toUpperCase()}`)
      } else {
        notify("err", res.error || "Failed to update status")
      }
    })
  }

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this live class session?")) return
    startTransition(async () => {
      const res = await deleteAdminLiveClass(id)
      if (res.success) {
        setClasses(prev => prev.filter(c => c.id !== id))
        notify("ok", "Live class removed")
      } else {
        notify("err", res.error || "Failed to delete")
      }
    })
  }

  const liveCount = classes.filter(c => c.status === "live").length
  const upcomingCount = classes.filter(c => c.status === "upcoming").length
  const completedCount = classes.filter(c => c.status === "completed").length

  const filteredClasses = classes.filter(c => {
    if (filterStatus === "all") return true
    return c.status === filterStatus
  })

  if (loading) {
    return (
      <div className="flex justify-center items-center p-24 font-mono text-xs text-primary">
        <Loader2 className="h-6 w-6 animate-spin mr-2" /> Loading live classes & Zoom rooms...
      </div>
    )
  }

  return (
    <div className="space-y-8 pt-2 font-sans text-foreground">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl border text-xs font-mono uppercase tracking-wider shadow-2xl ${
          toast.type === "ok" ? "bg-card border-primary/40 text-primary" : "bg-card border-red-500/40 text-red-500"
        }`}>
          {toast.type === "ok" ? <Check className="h-4 w-4 text-primary" /> : <X className="h-4 w-4 text-red-500" />}
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-widest bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 mb-2 font-semibold">
            <Radio className="w-3 h-3 animate-pulse" /> Live Streaming Operations
          </div>
          <h1 className="font-sans text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
            Live Classes & Zoom Meetings
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 font-sans">
            Schedule live Zoom sessions, broadcast streaming credentials, manage live statuses, and host workshop recordings.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => {
              handleResetForm()
              setShowForm(true)
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-mono font-semibold uppercase tracking-wider hover:bg-primary-active transition-all shadow-md cursor-pointer"
          >
            <Plus className="h-4 w-4" /> Schedule New Session
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-card border border-border/80 shadow-xs">
          <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Total Sessions</div>
          <div className="text-2xl font-sans font-bold text-foreground mt-1">{classes.length}</div>
        </div>
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 shadow-xs">
          <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Live Right Now
          </div>
          <div className="text-2xl font-sans font-bold text-emerald-600 dark:text-emerald-400 mt-1">{liveCount}</div>
        </div>
        <div className="p-4 rounded-2xl bg-card border border-border/80 shadow-xs">
          <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Upcoming Scheduled</div>
          <div className="text-2xl font-sans font-bold text-foreground mt-1">{upcomingCount}</div>
        </div>
        <div className="p-4 rounded-2xl bg-card border border-border/80 shadow-xs">
          <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Completed Archive</div>
          <div className="text-2xl font-sans font-bold text-foreground mt-1">{completedCount}</div>
        </div>
      </div>

      {/* Creation / Edit Form */}
      {showForm && (
        <div className="bg-card border border-border/80 rounded-3xl shadow-xl overflow-hidden backdrop-blur-xl">
          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-border/80 pb-4">
              <div>
                <h2 className="text-xs font-mono uppercase tracking-widest text-primary font-bold">
                  {editingId ? "Edit Live Class & Zoom Settings" : "Schedule New Live Class / Zoom Meeting"}
                </h2>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  Set meeting topic, Zoom join URL, credentials, instructor details, and banner artwork.
                </p>
              </div>
              <button onClick={handleResetForm} className="text-muted-foreground hover:text-foreground cursor-pointer">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Quick Presets Picker */}
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground font-semibold flex items-center gap-1.5">
                <Sparkles className="h-3 w-3 text-primary" /> Instructor Presets
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {INSTRUCTOR_PRESETS.map((inst, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setForm(v => ({
                      ...v,
                      instructor_name: inst.name,
                      instructor_role: inst.role,
                      instructor_avatar: inst.avatar
                    }))}
                    className={`p-2.5 rounded-xl border text-left transition-all flex items-center gap-2.5 cursor-pointer ${
                      form.instructor_name === inst.name
                        ? "border-primary bg-primary/10 shadow-xs"
                        : "border-border/80 bg-secondary/30 hover:bg-secondary/60"
                    }`}
                  >
                    <img src={inst.avatar} alt={inst.name} className="w-8 h-8 rounded-full object-cover shrink-0" />
                    <div className="min-w-0">
                      <div className="text-xs font-medium truncate">{inst.name}</div>
                      <div className="text-[9px] font-mono text-muted-foreground truncate">{inst.role}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-1.5 font-semibold">
                  Session Title *
                </label>
                <input
                  value={form.title}
                  onChange={e => setForm(v => ({ ...v, title: e.target.value }))}
                  placeholder="e.g. Real-Time Distributed Architectures & WebSockets with Redis"
                  className="w-full bg-secondary/40 border border-border/80 rounded-xl text-foreground px-3.5 py-2.5 text-xs font-sans font-medium focus:outline-none focus:border-primary/50"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-1.5 font-semibold">
                  Topic & Category
                </label>
                <select
                  value={form.topic}
                  onChange={e => setForm(v => ({ ...v, topic: e.target.value }))}
                  className="w-full bg-secondary/40 border border-border/80 rounded-xl text-foreground px-3.5 py-2.5 text-xs font-sans focus:outline-none"
                >
                  {TOPIC_PRESETS.map((t, idx) => (
                    <option key={idx} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-1.5 font-semibold">
                  Initial Status
                </label>
                <select
                  value={form.status}
                  onChange={e => setForm(v => ({ ...v, status: e.target.value as LiveClassStatus }))}
                  className="w-full bg-secondary/40 border border-border/80 rounded-xl text-foreground px-3.5 py-2.5 text-xs font-sans focus:outline-none"
                >
                  <option value="upcoming">Upcoming (Scheduled)</option>
                  <option value="live">Live Now (Streaming)</option>
                  <option value="completed">Completed (Archived)</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-1.5 font-semibold">
                  Start Date & Time (Local) *
                </label>
                <input
                  type="datetime-local"
                  value={form.start_time}
                  onChange={e => setForm(v => ({ ...v, start_time: e.target.value }))}
                  className="w-full bg-secondary/40 border border-border/80 rounded-xl text-foreground px-3.5 py-2.5 text-xs font-mono focus:outline-none focus:border-primary/50"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-1.5 font-semibold">
                  Duration (Minutes)
                </label>
                <input
                  type="number"
                  value={form.duration_minutes}
                  onChange={e => setForm(v => ({ ...v, duration_minutes: Number(e.target.value) }))}
                  placeholder="60"
                  className="w-full bg-secondary/40 border border-border/80 rounded-xl text-foreground px-3.5 py-2.5 text-xs font-mono focus:outline-none focus:border-primary/50"
                />
              </div>

              {/* Zoom Credentials Section */}
              <div className="sm:col-span-2 p-4 rounded-2xl bg-secondary/30 border border-[#2D8CFF]/30 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#2D8CFF] uppercase">
                  <Video className="w-4 h-4" /> Zoom Meeting Configuration
                </div>
                <div className="grid sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-3">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-1 font-semibold">
                      Zoom Join / Meeting URL *
                    </label>
                    <input
                      value={form.zoom_meeting_url}
                      onChange={e => setForm(v => ({ ...v, zoom_meeting_url: e.target.value }))}
                      placeholder="https://zoom.us/j/84920394821?pwd=..."
                      className="w-full bg-secondary/60 border border-border/80 rounded-xl text-foreground px-3.5 py-2 text-xs font-mono focus:outline-none focus:border-[#2D8CFF]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-1 font-semibold">
                      Meeting ID (Optional)
                    </label>
                    <input
                      value={form.zoom_meeting_id}
                      onChange={e => setForm(v => ({ ...v, zoom_meeting_id: e.target.value }))}
                      placeholder="849 2039 4821"
                      className="w-full bg-secondary/60 border border-border/80 rounded-xl text-foreground px-3.5 py-2 text-xs font-mono focus:outline-none focus:border-[#2D8CFF]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-1 font-semibold">
                      Passcode (Optional)
                    </label>
                    <input
                      value={form.zoom_passcode}
                      onChange={e => setForm(v => ({ ...v, zoom_passcode: e.target.value }))}
                      placeholder="ASCI2026"
                      className="w-full bg-secondary/60 border border-border/80 rounded-xl text-foreground px-3.5 py-2 text-xs font-mono focus:outline-none focus:border-[#2D8CFF]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-1 font-semibold">
                      Recording URL (Post-class Replay)
                    </label>
                    <input
                      value={form.recording_url}
                      onChange={e => setForm(v => ({ ...v, recording_url: e.target.value }))}
                      placeholder="https://youtube.com/... or Zoom cloud replay"
                      className="w-full bg-secondary/60 border border-border/80 rounded-xl text-foreground px-3.5 py-2 text-xs font-mono focus:outline-none focus:border-[#2D8CFF]"
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="sm:col-span-2">
                <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-1.5 font-semibold">
                  Session Description & Learning Outcomes *
                </label>
                <textarea
                  value={form.description}
                  onChange={e => setForm(v => ({ ...v, description: e.target.value }))}
                  rows={3}
                  placeholder="What students will build and learn during this live interactive Zoom class..."
                  className="w-full bg-secondary/40 border border-border/80 rounded-xl text-foreground px-3.5 py-2.5 text-xs font-sans focus:outline-none focus:border-primary/50 resize-none leading-relaxed"
                />
              </div>

              {/* Banner Artwork Presets */}
              <div className="sm:col-span-2 space-y-2">
                <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground font-semibold flex items-center justify-between">
                  <span>Banner Artwork</span>
                  <span className="text-[9px] font-mono text-muted-foreground/70">Select preset or paste custom URL below</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {BANNER_PRESETS.map((b, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setForm(v => ({ ...v, banner_image: b.url }))}
                      className={`p-1.5 rounded-xl border text-left transition-all overflow-hidden cursor-pointer ${
                        form.banner_image === b.url ? "border-primary ring-2 ring-primary/30" : "border-border/80 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <div className="h-14 rounded-lg overflow-hidden bg-black/40 mb-1">
                        <img src={b.url} alt={b.label} className="w-full h-full object-cover" />
                      </div>
                      <div className="text-[9px] font-medium truncate">{b.label}</div>
                    </button>
                  ))}
                </div>
                <input
                  value={form.banner_image}
                  onChange={e => setForm(v => ({ ...v, banner_image: e.target.value }))}
                  placeholder="https://images.unsplash.com/... or paste custom banner URL"
                  className="w-full bg-secondary/40 border border-border/80 rounded-xl text-foreground px-3.5 py-2 text-xs font-mono focus:outline-none focus:border-primary/50 mt-1"
                />
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border/80">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.is_featured}
                  onChange={e => setForm(v => ({ ...v, is_featured: e.target.checked }))}
                  className="accent-primary rounded"
                />
                <span className="text-xs font-sans text-foreground font-semibold">Pin as Featured Spotlight</span>
              </label>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-border/80 bg-card text-muted-foreground text-xs font-mono uppercase tracking-wider hover:bg-secondary cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={isPending}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-mono font-bold uppercase tracking-wider hover:bg-primary-active transition-all disabled:opacity-60 shadow-md cursor-pointer"
                >
                  {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Video className="h-4 w-4" />}
                  {editingId ? "Update Live Class" : "Publish Live Class"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-border/60 pb-3">
        <button
          onClick={() => setFilterStatus("all")}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
            filterStatus === "all" ? "bg-primary text-primary-foreground font-bold shadow-xs" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          All Sessions ({classes.length})
        </button>
        <button
          onClick={() => setFilterStatus("live")}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
            filterStatus === "live" ? "bg-emerald-500 text-white font-bold shadow-xs" : "text-muted-foreground hover:text-emerald-400"
          }`}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Streaming Now ({liveCount})
        </button>
        <button
          onClick={() => setFilterStatus("upcoming")}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
            filterStatus === "upcoming" ? "bg-primary text-primary-foreground font-bold shadow-xs" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Upcoming ({upcomingCount})
        </button>
        <button
          onClick={() => setFilterStatus("completed")}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
            filterStatus === "completed" ? "bg-primary text-primary-foreground font-bold shadow-xs" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Completed ({completedCount})
        </button>
      </div>

      {/* Sessions Grid */}
      {filteredClasses.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-border/80 rounded-3xl bg-secondary/10">
          <Video className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-muted-foreground text-xs font-mono">No live class sessions match this filter. Click "Schedule New Session" to create one.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredClasses.map(c => {
            const isLive = c.status === "live"
            const isUpcoming = c.status === "upcoming"
            const isCompleted = c.status === "completed"

            return (
              <div
                key={c.id}
                className={`p-5 rounded-3xl border bg-card transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-5 shadow-xs hover:border-primary/40 ${
                  isLive ? "border-emerald-500/50 bg-emerald-500/[0.03]" : "border-border/80"
                }`}
              >
                <div className="flex items-start gap-4 min-w-0 flex-1">
                  {/* Banner Thumbnail */}
                  <div className="w-24 h-24 sm:w-32 sm:h-24 rounded-2xl overflow-hidden shrink-0 bg-black/40 border border-border/80 relative group">
                    <img src={c.banner_image || BANNER_PRESETS[0].url} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    {isLive && (
                      <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded-md bg-emerald-600/90 text-white font-mono text-[9px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span> Live
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="space-y-1.5 min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm sm:text-base font-semibold text-foreground font-sans">{c.title}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold bg-primary/10 text-primary border border-primary/20">
                        {c.topic}
                      </span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase tracking-wider font-bold ${
                        isLive ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                          : isUpcoming ? "bg-blue-500/10 text-blue-500 border border-blue-500/30"
                          : "bg-secondary text-muted-foreground"
                      }`}>
                        {c.status.toUpperCase()}
                      </span>
                    </div>

                    <p className="text-xs text-muted-foreground font-sans line-clamp-2 leading-relaxed">
                      {c.description}
                    </p>

                    <div className="flex items-center gap-4 text-[10px] font-mono text-muted-foreground/80 flex-wrap pt-1">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3 text-primary" /> {c.instructor_name}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {format(new Date(c.start_time), "MMM d, yyyy 'at' h:mm a")}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {c.duration_minutes} Mins
                      </span>
                      {c.zoom_meeting_id && (
                        <span className="font-semibold text-foreground">
                          ID: {c.zoom_meeting_id}
                        </span>
                      )}
                      {c.recording_url && (
                        <span className="text-emerald-500 font-semibold flex items-center gap-0.5">
                          ✓ Recording Ready
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Controls & Quick Actions */}
                <div className="flex items-center gap-2 shrink-0 self-end lg:self-center flex-wrap">
                  {/* Status Toggle Button */}
                  <button
                    onClick={() => handleQuickStatusToggle(c)}
                    disabled={isPending}
                    className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      isLive
                        ? "bg-amber-500/20 text-amber-400 border border-amber-500/40 hover:bg-amber-500/30"
                        : isUpcoming
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30"
                        : "bg-secondary/40 text-muted-foreground border border-border/80 hover:bg-secondary"
                    }`}
                  >
                    <Radio className="w-3.5 h-3.5" />
                    <span>{isLive ? "End Stream" : isUpcoming ? "Go Live Now" : "Reset Upcoming"}</span>
                  </button>

                  {/* View Zoom Details Modal Launcher */}
                  <button
                    onClick={() => setPreviewClass(c)}
                    className="p-2 rounded-xl border border-border/80 bg-secondary/40 text-muted-foreground hover:text-primary transition-all cursor-pointer"
                    title="Preview Zoom Join Credentials"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  {/* Edit */}
                  <button
                    onClick={() => handleEdit(c)}
                    className="p-2 rounded-xl border border-border/80 bg-secondary/40 text-muted-foreground hover:text-foreground transition-all cursor-pointer"
                    title="Edit Session"
                  >
                    <Sliders className="w-4 h-4" />
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(c.id)}
                    disabled={isPending}
                    className="p-2 rounded-xl border border-border/80 bg-card text-muted-foreground hover:text-red-500 transition-all cursor-pointer"
                    title="Delete Class"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Zoom Credentials Modal Preview */}
      <ZoomMeetingModal
        isOpen={Boolean(previewClass)}
        onClose={() => setPreviewClass(null)}
        liveClass={previewClass}
      />
    </div>
  )
}
