"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Video, Copy, Check, ExternalLink, ShieldCheck, Clock, User, Sparkles } from "lucide-react"
import { LiveClass } from "@/lib/live-classes-types"

interface ZoomMeetingModalProps {
  isOpen: boolean
  onClose: () => void
  liveClass: LiveClass | null
}

export function ZoomMeetingModal({ isOpen, onClose, liveClass }: ZoomMeetingModalProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null)

  if (!isOpen || !liveClass) return null

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const isLiveNow = liveClass.status === "live"

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
          onClick={onClose}
          aria-hidden="true"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 12 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 12 }}
          transition={{ type: "spring", damping: 25, stiffness: 320 }}
          className="relative w-full max-w-lg bg-[#0e1610] border border-emerald-500/30 rounded-3xl shadow-2xl overflow-hidden text-[#FDFBF7] z-10 my-auto"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#D4B872]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Top Banner / Header */}
          <div className="p-6 sm:p-7 border-b border-white/10 space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest font-bold bg-[#2D8CFF]/15 text-[#2D8CFF] border border-[#2D8CFF]/30">
                <Video className="w-3.5 h-3.5" /> Zoom Live Room
              </span>
              {isLiveNow && (
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  Streaming Now
                </span>
              )}
            </div>

            <h2 className="font-sans text-xl sm:text-2xl font-bold text-[#FDFBF7] leading-snug">
              {liveClass.title}
            </h2>

            <div className="flex items-center gap-3 text-xs text-zinc-300 pt-1">
              {liveClass.instructor_avatar && (
                <img
                  src={liveClass.instructor_avatar}
                  alt={liveClass.instructor_name}
                  className="w-7 h-7 rounded-full object-cover border border-emerald-500/40"
                />
              )}
              <div>
                <span className="font-medium text-foreground">{liveClass.instructor_name}</span>
                <span className="text-zinc-400 text-[11px] block sm:inline sm:ml-2">({liveClass.instructor_role})</span>
              </div>
            </div>
          </div>

          {/* Body: Meeting Credentials */}
          <div className="p-6 sm:p-7 space-y-4">
            {/* Primary Action Button */}
            <a
              href={liveClass.zoom_meeting_url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-[#2D8CFF] to-[#1772E8] hover:from-[#1772E8] hover:to-[#0D5EC7] text-white text-xs font-mono font-bold uppercase tracking-wider shadow-lg shadow-[#2D8CFF]/30 transition-all cursor-pointer group"
            >
              <Video className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Launch Zoom Meeting</span>
              <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-80" />
            </a>

            {/* Credential Cards */}
            <div className="grid sm:grid-cols-2 gap-3 pt-2">
              {/* Meeting ID */}
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">Meeting ID</div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-semibold text-white tracking-wider">
                    {liveClass.zoom_meeting_id || "Direct URL Meeting"}
                  </span>
                  {liveClass.zoom_meeting_id && (
                    <button
                      onClick={() => copyToClipboard(liveClass.zoom_meeting_id!, "id")}
                      className="p-1.5 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                      title="Copy Meeting ID"
                    >
                      {copiedField === "id" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  )}
                </div>
              </div>

              {/* Passcode */}
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">Passcode</div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-semibold text-[#D4B872] tracking-wider">
                    {liveClass.zoom_passcode || "No passcode"}
                  </span>
                  {liveClass.zoom_passcode && (
                    <button
                      onClick={() => copyToClipboard(liveClass.zoom_passcode!, "pass")}
                      className="p-1.5 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                      title="Copy Passcode"
                    >
                      {copiedField === "pass" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Direct Join Link Copy */}
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">Direct Meeting Link</div>
                <div className="font-mono text-xs text-zinc-300 truncate mt-0.5">
                  {liveClass.zoom_meeting_url}
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(liveClass.zoom_meeting_url, "url")}
                className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-[11px] font-mono text-zinc-200 hover:text-white transition-colors cursor-pointer"
              >
                {copiedField === "url" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedField === "url" ? "Copied" : "Copy"}</span>
              </button>
            </div>

            {/* Recording notice if available */}
            {liveClass.recording_url && (
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between gap-3">
                <div className="text-xs text-emerald-300 font-sans">
                  Session recording & replay is available.
                </div>
                <a
                  href={liveClass.recording_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-emerald-500 text-white font-mono text-xs font-semibold hover:bg-emerald-600 transition-colors"
                >
                  Watch Replay
                </a>
              </div>
            )}

            {/* Tips footer */}
            <div className="pt-2 text-[11px] text-zinc-400 space-y-1">
              <div className="flex items-center gap-1.5 text-zinc-300 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Live Session Guidelines
              </div>
              <p>• You can join directly in your web browser or open the Zoom desktop app.</p>
              <p>• Microphones will be muted upon entry. Use Zoom chat or raise hand for live Q&A.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
