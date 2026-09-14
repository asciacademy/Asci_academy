"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Play, ExternalLink, Clock, BookOpen, CheckCircle2, Bookmark,
  ChevronDown, ChevronUp, Share2, Award, Volume2, ShieldCheck
} from "lucide-react"

export interface VideoChapter {
  title: string
  timestamp: string
  seconds: number
}

interface CourseVideoEmbedProps {
  videoId: string
  title: string
  partnerName: string
  partnerLogo?: string
  portalUrl: string
  thumbnailUrl: string
  chapters?: VideoChapter[]
  durationText?: string
}

export function CourseVideoEmbed({
  videoId,
  title,
  partnerName,
  portalUrl,
  thumbnailUrl,
  chapters = [],
  durationText = "Official Lecture & Walkthrough"
}: CourseVideoEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSeconds, setCurrentSeconds] = useState(0)
  const [showNotes, setShowNotes] = useState(false)

  // Jump to specific chapter timestamp
  const handleChapterClick = (seconds: number) => {
    setCurrentSeconds(seconds)
    setIsPlaying(true)
  }

  // Construct privacy-enhanced YouTube embed URL
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&start=${currentSeconds}&rel=0&modestbranding=1`

  return (
    <div className="overflow-hidden rounded-2xl border border-hairline bg-card shadow-lg">
      {/* Top Header with Official Source Verification & External Portal Link */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-hairline px-5 py-3.5 bg-secondary/40 text-xs">
        <div className="flex items-center gap-2.5">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20 text-primary shrink-0">
            <CheckCircle2 className="h-3.5 w-3.5" />
          </span>
          <div className="flex items-center gap-1.5 font-medium text-foreground">
            <span className="text-muted-foreground">Official Course Video:</span>
            <span className="font-semibold text-primary">{partnerName}</span>
          </div>
        </div>

        {/* Direct Link to Official Company Portal */}
        <a
          href={portalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg border border-hairline bg-card/80 px-3 py-1.5 text-[11px] font-medium text-foreground hover:bg-secondary hover:text-primary transition-colors cursor-pointer shrink-0 shadow-2xs"
        >
          <span>Visit Official {partnerName} Portal</span>
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>

      {/* Responsive 16:9 Video Player Container */}
      <div className="relative aspect-video w-full bg-black overflow-hidden">
        {!isPlaying ? (
          /* Thumbnail Poster with Big Play Button */
          <div className="relative h-full w-full group cursor-pointer" onClick={() => setIsPlaying(true)}>
            <Image
              src={thumbnailUrl}
              alt={title}
              fill
              sizes="(max-width: 1200px) 100vw, 900px"
              className="object-cover transition-transform duration-500 group-hover:scale-102 opacity-85"
            />
            <div className="absolute inset-0 bg-black/40" />

            {/* Centered Pulsing Play Button */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-2xl transition-transform group-hover:scale-110">
                <Play className="h-8 w-8 sm:h-9 sm:w-9 fill-current ml-1" />
              </div>
              <span className="rounded-full bg-black/70 backdrop-blur-md border border-white/10 px-3.5 py-1 text-xs font-medium text-white shadow-md">
                Click to Watch Official Lecture
              </span>
            </div>

            {/* Video Footer Metadata Overlay */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/90">
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-white/20 backdrop-blur-xs px-2 py-0.5 font-mono text-[10px] text-white">
                  1080p HD
                </span>
                <span className="font-medium truncate max-w-sm sm:max-w-md">{title}</span>
              </div>
              <span className="text-[11px] font-mono text-white/80">{durationText}</span>
            </div>
          </div>
        ) : (
          /* Live Responsive Iframe */
          <iframe
            src={embedUrl}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="h-full w-full border-0"
          />
        )}
      </div>

      {/* Chapters & Timeline Bar */}
      {chapters.length > 0 && (
        <div className="border-t border-hairline bg-secondary/20 p-4">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Clock className="h-3 w-3" />
              Key Lecture Chapters & Timestamps
            </span>
            <button
              onClick={() => setShowNotes(!showNotes)}
              className="text-[11px] text-primary hover:text-foreground cursor-pointer flex items-center gap-1"
            >
              <span>{showNotes ? "Hide Key Takeaways" : "View Key Takeaways"}</span>
              {showNotes ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            </button>
          </div>

          {/* Chapter Buttons Carousel */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {chapters.map((chap, i) => (
              <button
                key={i}
                onClick={() => handleChapterClick(chap.seconds)}
                className="group flex items-center gap-2 rounded-xl border border-hairline bg-card/70 px-3 py-1.5 text-xs text-foreground/80 hover:bg-card hover:border-foreground/25 hover:text-foreground transition-all shrink-0 cursor-pointer shadow-2xs"
              >
                <span className="rounded-md bg-secondary px-1.5 py-0.5 font-mono text-[10px] font-semibold text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {chap.timestamp}
                </span>
                <span className="truncate max-w-[200px]">{chap.title}</span>
              </button>
            ))}
          </div>

          {/* Collapsible Key Takeaways */}
          {showNotes && (
            <div className="mt-3 rounded-xl border border-hairline bg-card p-4 text-xs text-muted-foreground space-y-2 animate-in fade-in duration-200">
              <div className="flex items-center gap-1.5 font-semibold text-foreground">
                <BookOpen className="h-3.5 w-3.5 text-primary" />
                <span>Executive Study Guide & Concepts</span>
              </div>
              <p className="leading-relaxed">
                This official video lecture covers the core architecture, design paradigms, and production deployment patterns verified by {partnerName}. Review the chapter milestones above to reinforce key theoretical mechanics before jumping into the interactive coding challenges.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
