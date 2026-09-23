"use client"

import React, { useState, useRef } from "react"
import {
  X,
  Share2,
  Copy,
  Check,
  Twitter,
  Linkedin,
  Sparkles,
  Download,
  Trophy,
  Cpu,
  Clock,
  ExternalLink
} from "lucide-react"
import { AsciLogo } from "@/components/asci-logo"
import { ProblemDetail } from "@/lib/dsa/problem-catalog"
import { cn } from "@/lib/utils"

interface SolutionShareModalProps {
  isOpen: boolean
  onClose: () => void
  problem: ProblemDetail
  code: string
  language: string
  runtimeMs?: number
  memoryMB?: number
  username?: string
}

export function SolutionShareModal({
  isOpen,
  onClose,
  problem,
  code,
  language,
  runtimeMs = 18,
  memoryMB = 42,
  username = "Engineer",
}: SolutionShareModalProps) {
  const [copiedCode, setCopiedCode] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  if (!isOpen) return null

  // Truncate preview code to first 18 lines to keep snapshot neat
  const codeLines = code.split("\n")
  const previewLines = codeLines.slice(0, 18).join("\n")
  const isTruncated = codeLines.length > 18

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code)
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
  }

  const shareText = `Just solved "${problem.title}" (${problem.difficulty}) on ASCI Academy in ${runtimeMs}ms! 🚀 #DSA #Coding #LeetCode #ASCI`
  const shareUrl = typeof window !== "undefined" ? window.location.href : "https://asci.academy"

  const handleShareTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
    window.open(url, "_blank")
  }

  const handleShareLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    window.open(url, "_blank")
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-3xl border border-primary/30 bg-[#0d0d10] p-6 shadow-2xl flex flex-col space-y-5 overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary">
              <Trophy className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                <span>Proof-of-Work Solution Card</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-mono">
                  Accepted
                </span>
              </h3>
              <p className="text-xs text-muted-foreground">
                Share your algorithmic benchmark with peers and recruiters
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* ─── Ray.so / Carbon Aesthetic Code Snapshot Preview ─── */}
        <div
          ref={cardRef}
          className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#181820] to-[#101016] p-5 shadow-2xl space-y-4 font-mono select-none"
        >
          {/* Card Window Topbar */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            {/* macOS Window Controls */}
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="text-[11px] text-zinc-400 ml-2 font-sans font-medium">
                {problem.title} • {language}
              </span>
            </div>

            {/* Asci Academy Branding */}
            <div className="flex items-center gap-1.5 text-xs text-primary font-bold font-sans">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span>ASCI ACADEMY</span>
            </div>
          </div>

          {/* Metric Badges */}
          <div className="flex items-center gap-2 flex-wrap text-[11px]">
            <span
              className={cn(
                "px-2 py-0.5 rounded font-semibold uppercase text-[10px]",
                problem.difficulty === "Easy" && "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
                problem.difficulty === "Medium" && "bg-amber-500/15 text-amber-400 border border-amber-500/30",
                problem.difficulty === "Hard" && "bg-rose-500/15 text-rose-400 border border-rose-500/30"
              )}
            >
              {problem.difficulty}
            </span>

            <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20">
              <Clock className="h-3 w-3" />
              <span>{runtimeMs} ms</span>
            </span>

            <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
              <Cpu className="h-3 w-3" />
              <span>{memoryMB} MB</span>
            </span>

            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-sans font-medium ml-auto">
              Faster than 94.2% of submissions
            </span>
          </div>

          {/* Code Body */}
          <div className="rounded-xl bg-[#09090d] p-3 border border-white/5 overflow-x-auto text-xs leading-relaxed text-zinc-200">
            <pre className="font-mono">
              <code>{previewLines}</code>
            </pre>
            {isTruncated && (
              <div className="text-[10px] text-zinc-500 italic mt-1 font-sans">
                ... {codeLines.length - 18} more lines omitted for clean presentation ...
              </div>
            )}
          </div>

          {/* Card Footer */}
          <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-1 font-sans">
            <div>
              <span>Solved by </span>
              <strong className="text-zinc-200">{username}</strong>
            </div>
            <div className="text-primary font-mono text-[10px]">
              asci.academy/dsa/problems/{problem.id}
            </div>
          </div>
        </div>

        {/* Share Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <button
            onClick={handleCopyCode}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-border hover:bg-secondary text-xs font-semibold text-foreground flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            {copiedCode ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            <span>{copiedCode ? "Solution Copied!" : "Copy Code"}</span>
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleShareTwitter}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-[#1DA1F2]/15 hover:bg-[#1DA1F2]/25 text-[#1DA1F2] border border-[#1DA1F2]/30 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Twitter className="h-4 w-4" />
              <span>Share to X</span>
            </button>

            <button
              onClick={handleShareLinkedIn}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-[#0A66C2]/15 hover:bg-[#0A66C2]/25 text-[#0A66C2] border border-[#0A66C2]/30 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Linkedin className="h-4 w-4" />
              <span>LinkedIn</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
