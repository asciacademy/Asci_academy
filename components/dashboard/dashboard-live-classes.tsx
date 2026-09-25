"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { format } from "date-fns"
import {
  Video, Calendar, Clock, User, Users, Play,
  Sparkles, ExternalLink, Radio, CheckCircle2,
  CalendarPlus, ShieldCheck, Bookmark, Check,
  ChevronRight, ArrowRight, Loader2
} from "lucide-react"
import { LiveClass } from "@/lib/live-classes-types"
import { getLiveClasses, registerForLiveClass } from "@/app/actions/live-classes"
import { ZoomMeetingModal } from "@/components/live-classes/zoom-meeting-modal"

export function DashboardLiveClasses() {
  const [classes, setClasses] = useState<LiveClass[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedClassForZoom, setSelectedClassForZoom] = useState<LiveClass | null>(null)
  const [registeredIds, setRegisteredIds] = useState<Set<string>>(new Set())
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    getLiveClasses().then(res => {
      if (isMounted) {
        if (res.success && res.classes) {
          setClasses(res.classes)
        }
        setLoading(false)
      }
    })
    return () => { isMounted = false }
  }, [])

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  const handleRegister = async (c: LiveClass) => {
    if (registeredIds.has(c.id)) {
      showToast("You are already registered for this session!")
      return
    }

    setRegisteredIds(prev => new Set(prev).add(c.id))
    setClasses(prev => prev.map(item => item.id === c.id ? { ...item, attendees_count: (item.attendees_count || 0) + 1 } : item))
    showToast(`Registered for "${c.title}"! Zoom credentials unlocked.`)

    try {
      await registerForLiveClass(c.id)
    } catch (e) {
      console.warn("Registration failed:", e)
    }
  }

  const liveClass = classes.find(c => c.status === "live")
  const upcomingClasses = classes.filter(c => c.status === "upcoming")
  const completedClasses = classes.filter(c => c.status === "completed")

  if (loading) {
    return (
      <div className="flex justify-center items-center p-20 font-mono text-xs text-primary">
        <Loader2 className="w-5 h-5 animate-spin mr-2" /> Loading live class sessions...
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-2xl bg-card border border-emerald-500/40 text-emerald-400 font-mono text-xs uppercase tracking-wider shadow-2xl backdrop-blur-xl">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 mb-1.5 font-bold">
            <Radio className="w-3 h-3 animate-pulse" /> Live Sessions
          </div>
          <h2 className="text-2xl sm:text-3xl font-sans font-bold tracking-tight text-foreground">
            Live Classes & Workshops
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Join interactive live sessions, code with mentors, and watch past workshop recordings.
          </p>
        </div>
      </div>

      {/* Live Spotlight if active */}
      {liveClass && (
        <div className="relative rounded-3xl overflow-hidden border border-emerald-500/40 bg-gradient-to-br from-[#06180b] to-[#0d2e16] p-6 sm:p-8 text-[#FDFBF7] shadow-xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Streaming Live Now on Zoom
            </span>
            <span className="text-xs font-mono text-zinc-400">{liveClass.topic}</span>
          </div>

          <h3 className="font-sans text-xl sm:text-2xl font-bold text-white max-w-2xl leading-snug">
            {liveClass.title}
          </h3>

          <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl mt-2 leading-relaxed">
            {liveClass.description}
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={() => setSelectedClassForZoom(liveClass)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-lg shadow-emerald-950/40 cursor-pointer"
            >
              <Video className="w-4 h-4" /> Join Zoom Meeting
            </button>
            <span className="text-xs font-mono text-emerald-400">
              Instructor: {liveClass.instructor_name} ({liveClass.instructor_role})
            </span>
          </div>
        </div>
      )}

      {/* Upcoming Classes Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" /> Upcoming Sessions
          </h3>
          <span className="text-xs font-mono text-muted-foreground">{upcomingClasses.length} Scheduled</span>
        </div>

        {upcomingClasses.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-border/80 rounded-2xl bg-secondary/10">
            <p className="text-xs font-mono text-muted-foreground">No upcoming live sessions right now. Check back soon!</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {upcomingClasses.map(c => {
              const isRegistered = registeredIds.has(c.id)

              return (
                <div
                  key={c.id}
                  className="p-5 rounded-2xl border border-border/80 bg-card hover:border-emerald-500/40 transition-all shadow-xs flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold bg-primary/10 text-primary border border-primary/20">
                        {c.topic}
                      </span>
                      <span className="text-[10px] font-mono text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {c.duration_minutes} Mins
                      </span>
                    </div>

                    <h4 className="font-sans text-base font-bold text-foreground line-clamp-2">
                      {c.title}
                    </h4>

                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {c.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-border/60 flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0">
                      {c.instructor_avatar && (
                        <img src={c.instructor_avatar} alt={c.instructor_name} className="w-6 h-6 rounded-full object-cover" />
                      )}
                      <span className="text-xs text-foreground truncate">{c.instructor_name}</span>
                    </div>
                    <span className="text-[11px] font-mono text-muted-foreground shrink-0">
                      {format(new Date(c.start_time), "MMM d • h:mm a")}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => setSelectedClassForZoom(c)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>Zoom Info</span>
                    </button>

                    <button
                      onClick={() => handleRegister(c)}
                      className={`px-3 py-2 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
                        isRegistered
                          ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-500"
                          : "bg-card border-border/80 text-muted-foreground hover:text-foreground hover:bg-secondary"
                      }`}
                      title={isRegistered ? "Seat Reserved" : "Reserve Seat"}
                    >
                      {isRegistered ? <Check className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Completed Workshop Recordings */}
      {completedClasses.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-border/60">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
              <Play className="w-4 h-4 text-primary" /> Past Class Recordings
            </h3>
            <span className="text-xs font-mono text-muted-foreground">{completedClasses.length} Available</span>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {completedClasses.map(c => (
              <div
                key={c.id}
                className="p-5 rounded-2xl border border-border/80 bg-card hover:border-primary/40 transition-all shadow-xs flex flex-col justify-between space-y-3"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground">
                    <span className="text-primary font-semibold">{c.topic}</span>
                    <span>{format(new Date(c.start_time), "MMM d, yyyy")}</span>
                  </div>
                  <h4 className="font-sans text-base font-bold text-foreground line-clamp-2">
                    {c.title}
                  </h4>
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {c.description}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Instructor: {c.instructor_name}</span>
                  {c.recording_url ? (
                    <a
                      href={c.recording_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-mono font-semibold uppercase tracking-wider hover:bg-primary-active transition-all"
                    >
                      <Play className="w-3 h-3" /> Watch Replay
                    </a>
                  ) : (
                    <span className="text-[10px] font-mono text-muted-foreground/60">Processing video...</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Zoom Credentials Launcher Modal */}
      <ZoomMeetingModal
        isOpen={Boolean(selectedClassForZoom)}
        onClose={() => setSelectedClassForZoom(null)}
        liveClass={selectedClassForZoom}
      />
    </div>
  )
}
