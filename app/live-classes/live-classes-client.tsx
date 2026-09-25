"use client"

import React, { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { format, formatDistanceToNow, isPast } from "date-fns"
import {
  Video, Calendar, Clock, User, Users, Play,
  Sparkles, ExternalLink, Radio, CheckCircle2,
  ChevronRight, CalendarPlus, ShieldCheck, Filter,
  Share2, ArrowRight, Bookmark, Search, Copy, Check
} from "lucide-react"
import { LiveClass, LiveClassStatus } from "@/lib/live-classes-types"
import { TOPIC_PRESETS } from "@/lib/live-classes-data"
import { ZoomMeetingModal } from "@/components/live-classes/zoom-meeting-modal"
import { registerForLiveClass } from "@/app/actions/live-classes"

interface LiveClassesClientProps {
  initialClasses: LiveClass[]
}

export function LiveClassesClient({ initialClasses }: LiveClassesClientProps) {
  const [classes, setClasses] = useState<LiveClass[]>(initialClasses)
  const [activeTab, setActiveTab] = useState<"all" | "live" | "upcoming" | "completed">("all")
  const [selectedTopic, setSelectedTopic] = useState<string>("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedClassForZoom, setSelectedClassForZoom] = useState<LiveClass | null>(null)
  const [registeredIds, setRegisteredIds] = useState<Set<string>>(new Set())
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  // Spotlights: currently live or nearest upcoming session
  const liveClass = useMemo(() => {
    return classes.find(c => c.status === "live") || null
  }, [classes])

  const upcomingClasses = useMemo(() => {
    return classes.filter(c => c.status === "upcoming")
  }, [classes])

  const nextUpcoming = useMemo(() => {
    return upcomingClasses[0] || null
  }, [upcomingClasses])

  // Filtered List
  const filteredClasses = useMemo(() => {
    return classes.filter(c => {
      // Tab filter
      if (activeTab === "live" && c.status !== "live") return false
      if (activeTab === "upcoming" && c.status !== "upcoming") return false
      if (activeTab === "completed" && c.status !== "completed") return false

      // Topic filter
      if (selectedTopic !== "All" && c.topic !== selectedTopic) return false

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const matchesTitle = c.title.toLowerCase().includes(q)
        const matchesInstructor = c.instructor_name.toLowerCase().includes(q)
        const matchesDesc = c.description.toLowerCase().includes(q)
        const matchesTopic = c.topic.toLowerCase().includes(q)
        if (!matchesTitle && !matchesInstructor && !matchesDesc && !matchesTopic) return false
      }

      return true
    })
  }, [classes, activeTab, selectedTopic, searchQuery])

  const handleRegister = async (c: LiveClass) => {
    if (registeredIds.has(c.id)) {
      showToast("You are already registered for this session!")
      return
    }

    // Optimistic update
    setRegisteredIds(prev => new Set(prev).add(c.id))
    setClasses(prev => prev.map(item => item.id === c.id ? { ...item, attendees_count: (item.attendees_count || 0) + 1 } : item))
    showToast(`Registered for "${c.title}"! Zoom link is ready.`)

    try {
      await registerForLiveClass(c.id)
    } catch (e) {
      console.warn("Registration server action failed:", e)
    }
  }

  const generateGoogleCalendarUrl = (c: LiveClass) => {
    try {
      const startTime = new Date(c.start_time)
      const endTime = new Date(startTime.getTime() + c.duration_minutes * 60 * 1000)
      const formatTime = (d: Date) => d.toISOString().replace(/-|:|\.\d\d\d/g, "")
      
      const title = encodeURIComponent(`ASCI Live: ${c.title}`)
      const details = encodeURIComponent(`${c.description}\n\nZoom Meeting URL: ${c.zoom_meeting_url}\nMeeting ID: ${c.zoom_meeting_id || "N/A"}\nPasscode: ${c.zoom_passcode || "N/A"}`)
      const location = encodeURIComponent("Zoom Meeting Online")
      const dates = `${formatTime(startTime)}/${formatTime(endTime)}`

      return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`
    } catch {
      return "#"
    }
  }

  return (
    <div className="min-h-screen py-10 sm:py-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-2xl bg-card border border-emerald-500/40 text-emerald-400 font-mono text-xs uppercase tracking-wider shadow-2xl backdrop-blur-xl">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <Radio className="w-3.5 h-3.5 ml-0.5" /> Interactive Zoom Masterclasses
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-foreground tracking-tight leading-tight">
            Live Engineering Masterclasses & Zoom Sessions
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground font-sans leading-relaxed">
            Live coding, system architecture breakdowns, and algorithmic sprints led by staff engineers and industry architects. Join live Zoom rooms with real-time interactive Q&A.
          </p>
        </div>

        {/* Spotlight Banner: Live Right Now or Imminent Session */}
        {(liveClass || nextUpcoming) && (
          <div className="relative rounded-3xl overflow-hidden border border-emerald-500/40 bg-gradient-to-br from-[#07170c] via-[#091f10] to-[#040c06] shadow-2xl text-[#FDFBF7] p-6 sm:p-10">
            {/* Ambient Radial Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#D4B872]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
              {/* Left Info (8 cols) */}
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center gap-2.5 flex-wrap">
                  {liveClass ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-widest font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-sm">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      Streaming Live Now
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-widest font-bold bg-[#D4B872]/15 text-[#D4B872] border border-[#D4B872]/30">
                      <Clock className="w-3.5 h-3.5" /> Next Upcoming Masterclass
                    </span>
                  )}

                  <span className="text-[11px] font-mono text-zinc-400">
                    {(liveClass || nextUpcoming)?.topic}
                  </span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-white leading-tight">
                  {(liveClass || nextUpcoming)?.title}
                </h2>

                <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed max-w-2xl">
                  {(liveClass || nextUpcoming)?.description}
                </p>

                {/* Instructor & Meta */}
                <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-zinc-300">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={(liveClass || nextUpcoming)?.instructor_avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop"}
                      alt={(liveClass || nextUpcoming)?.instructor_name}
                      className="w-9 h-9 rounded-full object-cover border border-emerald-500/40 shrink-0"
                    />
                    <div>
                      <div className="font-medium text-white font-sans">{(liveClass || nextUpcoming)?.instructor_name}</div>
                      <div className="text-[10px] font-mono text-zinc-400">{(liveClass || nextUpcoming)?.instructor_role}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-300 border-l border-white/10 pl-4 sm:pl-6">
                    <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{format(new Date((liveClass || nextUpcoming)?.start_time || Date.now()), "EEE, MMM d • h:mm a")}</span>
                  </div>

                  <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-300">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{(liveClass || nextUpcoming)?.duration_minutes} Mins</span>
                  </div>
                </div>

                {/* Primary Action Buttons */}
                <div className="pt-3 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setSelectedClassForZoom(liveClass || nextUpcoming)}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white text-xs font-mono font-bold uppercase tracking-wider shadow-lg shadow-emerald-900/40 hover:shadow-emerald-700/50 transition-all cursor-pointer group"
                  >
                    <Video className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>{liveClass ? "Join Live Zoom Class" : "View Zoom Credentials"}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <a
                    href={generateGoogleCalendarUrl(liveClass || nextUpcoming!)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono font-medium text-zinc-200 hover:text-white transition-colors cursor-pointer"
                  >
                    <CalendarPlus className="w-3.5 h-3.5 text-[#D4B872]" />
                    <span>Add to Google Calendar</span>
                  </a>
                </div>
              </div>

              {/* Right Media (4 cols) */}
              <div className="lg:col-span-4 relative rounded-2xl overflow-hidden border border-emerald-500/30 aspect-video lg:aspect-square bg-black/60 shadow-xl group">
                <img
                  src={(liveClass || nextUpcoming)?.banner_image || "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop"}
                  alt={(liveClass || nextUpcoming)?.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-300">
                    <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                      <Users className="w-3.5 h-3.5" /> {(liveClass || nextUpcoming)?.attendees_count || 140} Enrolled
                    </span>
                    <span className="text-[10px] text-zinc-400 uppercase">
                      Zoom Web & App
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filter and Search Bar */}
        <div className="space-y-4 pt-4 border-t border-border/60">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Status Tabs */}
            <div className="flex items-center gap-1.5 bg-secondary/40 p-1 rounded-2xl border border-border/80 overflow-x-auto">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === "all" ? "bg-primary text-primary-foreground font-bold shadow-xs" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                All Sessions ({classes.length})
              </button>
              <button
                onClick={() => setActiveTab("live")}
                className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === "live" ? "bg-emerald-600 text-white font-bold shadow-xs" : "text-muted-foreground hover:text-emerald-400"
                }`}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Live Now ({classes.filter(c => c.status === "live").length})
              </button>
              <button
                onClick={() => setActiveTab("upcoming")}
                className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === "upcoming" ? "bg-primary text-primary-foreground font-bold shadow-xs" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Upcoming ({classes.filter(c => c.status === "upcoming").length})
              </button>
              <button
                onClick={() => setActiveTab("completed")}
                className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === "completed" ? "bg-primary text-primary-foreground font-bold shadow-xs" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Recordings & Replays ({classes.filter(c => c.status === "completed").length})
              </button>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search classes or topics..."
                className="w-full bg-secondary/40 border border-border/80 rounded-2xl pl-10 pr-4 py-2 text-xs font-sans text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/50"
              />
            </div>
          </div>

          {/* Category Topics Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
            <button
              onClick={() => setSelectedTopic("All")}
              className={`px-3 py-1.5 rounded-full font-mono text-[11px] uppercase tracking-wider border whitespace-nowrap transition-all cursor-pointer ${
                selectedTopic === "All"
                  ? "bg-primary text-primary-foreground font-bold border-primary shadow-xs"
                  : "bg-secondary/40 border-border/80 text-muted-foreground hover:text-foreground"
              }`}
            >
              All Topics
            </button>
            {TOPIC_PRESETS.map((t, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedTopic(t)}
                className={`px-3 py-1.5 rounded-full font-mono text-[11px] uppercase tracking-wider border whitespace-nowrap transition-all cursor-pointer ${
                  selectedTopic === t
                    ? "bg-primary text-primary-foreground font-bold border-primary shadow-xs"
                    : "bg-secondary/40 border-border/80 text-muted-foreground hover:text-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Classes Cards Grid */}
        {filteredClasses.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-border/80 rounded-3xl bg-secondary/10">
            <Video className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground text-xs font-mono">No live class sessions match your selected filters.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClasses.map(c => {
              const isLive = c.status === "live"
              const isCompleted = c.status === "completed"
              const isRegistered = registeredIds.has(c.id)

              return (
                <div
                  key={c.id}
                  className={`flex flex-col rounded-3xl border bg-card/70 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-emerald-500/40 group ${
                    isLive ? "border-emerald-500/50 ring-1 ring-emerald-500/30" : "border-border/80"
                  }`}
                >
                  {/* Poster Image */}
                  <div className="relative h-48 w-full overflow-hidden bg-black/40">
                    <img
                      src={c.banner_image || "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop"}
                      alt={c.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full bg-black/70 border border-white/10 backdrop-blur-md text-[10px] font-mono font-semibold uppercase tracking-wider text-[#D4B872]">
                        {c.topic}
                      </span>
                      {isLive ? (
                        <span className="px-2.5 py-1 rounded-full bg-emerald-600/90 text-white font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-lg">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span> Live Now
                        </span>
                      ) : isCompleted ? (
                        <span className="px-2.5 py-1 rounded-full bg-black/70 text-zinc-400 font-mono text-[10px] uppercase tracking-wider">
                          Completed
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full bg-[#2D8CFF]/80 text-white font-mono text-[10px] uppercase font-bold flex items-center gap-1">
                          <Video className="w-3 h-3" /> Zoom
                        </span>
                      )}
                    </div>

                    {/* Date on banner bottom */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-zinc-200">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                        {format(new Date(c.start_time), "MMM d, yyyy • h:mm a")}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-zinc-400" />
                        {c.duration_minutes} Mins
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-serif text-lg font-normal text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                        {c.title}
                      </h3>
                      <p className="text-xs text-muted-foreground font-sans line-clamp-2 leading-relaxed">
                        {c.description}
                      </p>
                    </div>

                    {/* Instructor Info */}
                    <div className="pt-2 border-t border-border/60 flex items-center justify-between">
                      <div className="flex items-center gap-2 min-w-0">
                        {c.instructor_avatar && (
                          <img
                            src={c.instructor_avatar}
                            alt={c.instructor_name}
                            className="w-7 h-7 rounded-full object-cover border border-emerald-500/30 shrink-0"
                          />
                        )}
                        <div className="min-w-0">
                          <div className="text-xs font-medium text-foreground truncate">{c.instructor_name}</div>
                          <div className="text-[10px] font-mono text-muted-foreground truncate">{c.instructor_role}</div>
                        </div>
                      </div>

                      <div className="text-[10px] font-mono text-muted-foreground/80 shrink-0">
                        {c.attendees_count || 45} attending
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="pt-2 flex items-center gap-2">
                      {isCompleted ? (
                        c.recording_url ? (
                          <a
                            href={c.recording_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-mono text-xs font-semibold uppercase tracking-wider hover:bg-primary-active transition-all"
                          >
                            <Play className="w-3.5 h-3.5" /> Watch Replay
                          </a>
                        ) : (
                          <div className="w-full py-2.5 rounded-xl bg-secondary/50 text-center font-mono text-xs text-muted-foreground">
                            Recording Processing
                          </div>
                        )
                      ) : (
                        <>
                          <button
                            onClick={() => setSelectedClassForZoom(c)}
                            className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-sm transition-all cursor-pointer"
                          >
                            <Video className="w-3.5 h-3.5" />
                            <span>{isLive ? "Join Live" : "Zoom Info"}</span>
                          </button>

                          <button
                            onClick={() => handleRegister(c)}
                            className={`px-3 py-2.5 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
                              isRegistered
                                ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-500"
                                : "bg-card border-border/80 text-muted-foreground hover:text-foreground hover:bg-secondary"
                            }`}
                            title={isRegistered ? "Registered" : "Reserve Seat"}
                          >
                            {isRegistered ? <Check className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Zoom Credentials Modal Launcher */}
      <ZoomMeetingModal
        isOpen={Boolean(selectedClassForZoom)}
        onClose={() => setSelectedClassForZoom(null)}
        liveClass={selectedClassForZoom}
      />
    </div>
  )
}
