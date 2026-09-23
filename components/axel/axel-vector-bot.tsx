"use client"

import React, { useRef, useState, useEffect, useCallback, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Volume2, VolumeX } from "lucide-react"
import { AxelEmotion } from "@/types/axel"
import { playCyberTone, isAudioMuted, toggleAudioMute, CyberSoundType } from "@/lib/audio/cyber-audio"

interface AxelVectorBotProps {
  className?: string
  expression?: AxelEmotion
  isCompact?: boolean
  onClick?: () => void
  showAudioControl?: boolean
}

export function AxelVectorBot({
  className = "",
  expression = "normal",
  isCompact = false,
  onClick,
  showAudioControl = true,
}: AxelVectorBotProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [pointerOffset, setPointerOffset] = useState({ x: 0, y: 0 })
  const [isBlinking, setIsBlinking] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const [muted, setMuted] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  // Sync mute state on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      setMuted(isAudioMuted())
      setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window)
    }
  }, [])

  // Natural ambient blink loop (every 3.5s - 6s)
  useEffect(() => {
    let blinkTimeout: NodeJS.Timeout
    const triggerBlink = () => {
      setIsBlinking(true)
      setTimeout(() => setIsBlinking(false), 140)
      const nextDelay = 3200 + Math.random() * 2800
      blinkTimeout = setTimeout(triggerBlink, nextDelay)
    }
    blinkTimeout = setTimeout(triggerBlink, 3500)
    return () => clearTimeout(blinkTimeout)
  }, [])

  // Trigger sound when expression changes
  useEffect(() => {
    const soundMap: Record<string, CyberSoundType> = {
      happy: "happy",
      smile: "happy",
      excited: "celebrate",
      proud: "celebrate",
      heart: "celebrate",
      shocked: "shocked",
      curious: "curious",
      wave: "wave",
    }
    const sound = soundMap[expression]
    if (sound) {
      playCyberTone(sound)
    }
  }, [expression])

  // Desktop Pointer Parallax Tracking (throttled via requestAnimationFrame)
  useEffect(() => {
    if (isTouchDevice) return

    let rafId: number | null = null
    let latestE: PointerEvent | null = null

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return
      latestE = e
      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          rafId = null
          if (!latestE || !containerRef.current) return
          const rect = containerRef.current.getBoundingClientRect()
          // Only track if visible in viewport
          if (rect.bottom < 0 || rect.top > window.innerHeight) return

          const centerX = rect.left + rect.width / 2
          const centerY = rect.top + rect.height / 2

          const maxDistX = Math.max(window.innerWidth / 2, 350)
          const maxDistY = Math.max(window.innerHeight / 2, 350)

          const normX = Math.max(-1, Math.min(1, (latestE.clientX - centerX) / maxDistX))
          const normY = Math.max(-1, Math.min(1, (latestE.clientY - centerY) / maxDistY))

          setPointerOffset({ x: normX, y: normY })
        })
      }
    }

    const handleMouseLeave = () => {
      setPointerOffset({ x: 0, y: 0 })
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true })
    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId)
      window.removeEventListener("pointermove", handlePointerMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [isTouchDevice])

  const handleClick = useCallback(() => {
    setIsClicked(true)
    playCyberTone("click")
    setTimeout(() => setIsClicked(false), 300)
    onClick?.()
  }, [onClick])

  const handleMuteToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    const nextMuted = toggleAudioMute()
    setMuted(nextMuted)
  }

  // Dimension scaling
  const size = isCompact ? 72 : 120
  const visorW = isCompact ? 54 : 90
  const visorH = isCompact ? 34 : 56

  // LED eyes shift based on pointer
  const eyeShiftX = pointerOffset.x * (isCompact ? 4.5 : 8)
  const eyeShiftY = pointerOffset.y * (isCompact ? 3 : 5.5)

  // Render visor facial expression
  const renderVisorEyes = useMemo(() => {
    if (isBlinking && expression !== "heart" && expression !== "happy") {
      return (
        <g stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" opacity="0.9">
          <line x1="28" y1="36" x2="44" y2="36" />
          <line x1="68" y1="36" x2="84" y2="36" />
        </g>
      )
    }

    switch (expression) {
      case "happy":
      case "smile":
        // Curved happy crescent arcs (^_^)
        return (
          <g stroke="#34d399" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.95">
            <path d="M 28 39 Q 36 29 44 39" />
            <path d="M 68 39 Q 76 29 84 39" />
          </g>
        )

      case "heart":
        // Glowing heart eyes
        return (
          <g fill="#f43f5e" opacity="0.95">
            <path
              transform="translate(26, 27) scale(0.68)"
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
            <path
              transform="translate(66, 27) scale(0.68)"
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </g>
        )

      case "shocked":
        // Wide circular dilated ring eyes (O_O)
        return (
          <g stroke="#38bdf8" strokeWidth="3" fill="none" opacity="0.95">
            <circle cx="36" cy="36" r="8" />
            <circle cx="76" cy="36" r="8" />
            <circle cx="36" cy="36" r="2.5" fill="#38bdf8" />
            <circle cx="76" cy="36" r="2.5" fill="#38bdf8" />
          </g>
        )

      case "cute":
      case "excited":
        // Big anime sparkle eyes with gold tint
        return (
          <g opacity="0.95">
            <rect x="28" y="27" width="16" height="18" rx="8" fill="#fbbf24" />
            <circle cx="32" cy="30" r="3" fill="#ffffff" />
            <circle cx="39" cy="38" r="1.5" fill="#ffffff" />

            <rect x="68" y="27" width="16" height="18" rx="8" fill="#fbbf24" />
            <circle cx="72" cy="30" r="3" fill="#ffffff" />
            <circle cx="79" cy="38" r="1.5" fill="#ffffff" />
          </g>
        )

      case "cry":
        // Drooping eyes with teardrop spark
        return (
          <g opacity="0.95">
            <path d="M 28 34 Q 36 40 44 34" stroke="#60a5fa" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M 68 34 Q 76 40 84 34" stroke="#60a5fa" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <motion.circle
              cx="36"
              cy="43"
              r="2"
              fill="#93c5fd"
              animate={{ y: [0, 4], opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
            />
          </g>
        )

      case "proud":
        // Confident star eye + playful wink
        return (
          <g opacity="0.95">
            {/* Left Eye: Star sparkle */}
            <path
              d="M 36 28 L 38 33 L 43 35 L 38 37 L 36 42 L 34 37 L 29 35 L 34 33 Z"
              fill="#D4B872"
            />
            {/* Right Eye: Wink horizontal arc */}
            <path d="M 68 36 Q 76 31 84 36" stroke="#34d399" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </g>
        )

      case "curious":
        // One eye raised, one smaller
        return (
          <g opacity="0.95" fill="#34d399">
            <ellipse cx="36" cy="33" rx="7" ry="9" />
            <ellipse cx="76" cy="38" rx="5.5" ry="6.5" />
          </g>
        )

      case "wave":
        // Smiling happy eye + wave wink
        return (
          <g stroke="#34d399" strokeWidth="2.8" strokeLinecap="round" fill="none" opacity="0.95">
            <path d="M 28 38 Q 36 28 44 38" />
            <path d="M 68 38 Q 76 28 84 38" />
          </g>
        )

      case "normal":
      default:
        // Relaxed glowing rounded LED stadium eyes
        return (
          <g fill="#34d399" opacity="0.95">
            <rect x="29" y="27" width="14" height="18" rx="7" />
            <rect x="69" y="27" width="14" height="18" rx="7" />
            {/* Subtle inner highlight */}
            <circle cx="33" cy="31" r="2" fill="#ffffff" opacity="0.6" />
            <circle cx="73" cy="31" r="2" fill="#ffffff" opacity="0.6" />
          </g>
        )
    }
  }, [expression, isBlinking])

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      className={`relative inline-flex flex-col items-center justify-center select-none cursor-pointer group/axel ${className}`}
      style={{ width: size, height: size }}
      role="button"
      tabIndex={0}
      aria-label={`Axel Copilot — Emotion: ${expression}`}
    >
      {/* 1. Ambient Hovering Motion Wrap */}
      <motion.div
        animate={{
          y: isClicked ? [0, -8, 2, 0] : [-3, 3, -3],
          rotate: isClicked ? [0, -3, 3, 0] : [0, pointerOffset.x * 3, 0],
          scale: isClicked ? 0.94 : 1,
        }}
        transition={{
          y: { repeat: isClicked ? 0 : Infinity, duration: 2.8, ease: "easeInOut" },
          rotate: { repeat: isClicked ? 0 : Infinity, duration: 3.2, ease: "easeInOut" },
          scale: { duration: 0.2 },
        }}
        className="relative flex flex-col items-center"
      >
        {/* Antenna / Sensor Beacon with Pulsing Emerald Glow */}
        <div className="relative flex flex-col items-center -mb-1">
          <motion.div
            animate={{
              scale: expression === "shocked" || expression === "excited" ? [1, 1.4, 1] : [1, 1.15, 1],
              opacity: [0.75, 1, 0.75],
            }}
            transition={{ repeat: Infinity, duration: 1.8 }}
            className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)] border border-emerald-200"
          />
          <div className="w-1 h-2.5 bg-gradient-to-b from-emerald-500/60 to-stone-400/80 rounded-t" />
        </div>

        {/* 2. Main Bot Head Chassis */}
        <div
          className="relative rounded-[28px] p-1.5 transition-shadow duration-300 shadow-lg group-hover/axel:shadow-[0_8px_25px_rgba(16,185,129,0.22)]"
          style={{
            background: "linear-gradient(145deg, #ffffff 0%, #f3efe6 60%, #e5decf 100%)",
            border: "1.5px solid rgba(212, 184, 114, 0.45)",
          }}
        >
          {/* Subtle Cyber Ear Node - Left */}
          <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-2 h-5 rounded-l-full bg-stone-300 dark:bg-stone-700 border-l border-y border-[#D4B872]/40" />

          {/* Subtle Cyber Ear Node - Right */}
          <motion.div
            animate={expression === "wave" ? { rotate: [0, 20, -10, 15, 0] } : {}}
            transition={{ repeat: expression === "wave" ? Infinity : 0, duration: 1.2 }}
            className="absolute -right-2 top-1/2 -translate-y-1/2 w-2 h-5 rounded-r-full bg-stone-300 dark:bg-stone-700 border-r border-y border-[#D4B872]/40 origin-left"
          />

          {/* 3. Curved Obsidian Visor */}
          <div
            className="relative overflow-hidden rounded-[20px] bg-[#050c08] border border-white/10 shadow-inner"
            style={{ width: visorW, height: visorH }}
          >
            {/* Specular Curved Glare Layer */}
            <div
              className="absolute inset-0 pointer-events-none rounded-[inherit]"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.04) 40%, transparent 65%)",
              }}
            />

            {/* Subtle Horizon Visor Scan Grid */}
            <div
              className="absolute inset-0 pointer-events-none opacity-10"
              style={{
                backgroundImage: "linear-gradient(rgba(52, 211, 153, 0.4) 1px, transparent 1px)",
                backgroundSize: "100% 4px",
              }}
            />

            {/* 4. Dynamic LED Eye Matrix (Parallax Follow) */}
            <motion.div
              animate={{
                x: eyeShiftX,
                y: eyeShiftY,
              }}
              transition={{ type: "spring", stiffness: 180, damping: 20 }}
              className="w-full h-full flex items-center justify-center filter drop-shadow-[0_0_6px_rgba(52,211,153,0.7)]"
            >
              <svg
                viewBox="0 0 112 70"
                className="w-full h-full overflow-visible"
                xmlns="http://www.w3.org/2000/svg"
              >
                {renderVisorEyes}
              </svg>
            </motion.div>
          </div>
        </div>

        {/* 5. Floating Magnetic Thruster Ring */}
        <div className="relative mt-1 flex flex-col items-center">
          {/* Ring */}
          <div
            className="w-8 h-2 rounded-full border border-[#D4B872]/60 shadow-[0_0_6px_rgba(212,184,114,0.4)]"
            style={{
              background: "linear-gradient(90deg, #062112 0%, #D4B872 50%, #062112 100%)",
            }}
          />
          {/* Thruster Pulse Beam */}
          <motion.div
            animate={{
              opacity: [0.35, 0.85, 0.35],
              scaleX: [0.85, 1.15, 0.85],
            }}
            transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
            className="w-5 h-2.5 rounded-full bg-emerald-400/40 blur-[2px]"
          />
        </div>
      </motion.div>

      {/* 6. Ground Ambient Shadow */}
      <motion.div
        animate={{
          scale: isClicked ? 0.75 : [0.85, 1.05, 0.85],
          opacity: [0.25, 0.4, 0.25],
        }}
        transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
        className="w-10 h-2 bg-stone-900/30 dark:bg-emerald-950/60 rounded-full blur-[3px] -mt-1 pointer-events-none"
      />

      {/* 7. Subtle Audio Toggle Control */}
      {showAudioControl && !isCompact && (
        <button
          type="button"
          onClick={handleMuteToggle}
          title={muted ? "Unmute Axel sound feedback" : "Mute Axel sound feedback"}
          className="absolute -bottom-2 -right-2 p-1 rounded-full bg-background/80 hover:bg-secondary border border-border/60 text-muted-foreground hover:text-foreground opacity-0 group-hover/axel:opacity-100 transition-all duration-200 cursor-pointer shadow-xs"
        >
          {muted ? <VolumeX className="w-3 h-3 text-muted-foreground" /> : <Volume2 className="w-3 h-3 text-emerald-500" />}
        </button>
      )}
    </div>
  )
}
