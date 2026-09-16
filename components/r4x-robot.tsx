"use client"

import { useState, useRef, useEffect } from "react"

import { AxelEmotion } from "@/types/axel"

interface R4XRobotProps {
  className?: string
  expression?: AxelEmotion
  isCompact?: boolean
  onClick?: () => void
}

export function R4XRobot({
  className = "",
  expression = "normal",
  isCompact = false,
  onClick,
}: R4XRobotProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const normalizedExpr =
    expression === "proud" || expression === "excited"
      ? "happy"
      : expression === "curious" || expression === "wave"
      ? "smile"
      : expression

  // Wait for 3D Spline scene to finish loading and rendering before revealing iframe
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data && e.data.type === "ROBOT_SCENE_LOADED") {
        setIsLoaded(true)
        const win = iframeRef.current?.contentWindow
        if (win) {
          const dur = normalizedExpr === "normal" ? 0 : (normalizedExpr === "cry" ? 8000 : 3200)
          win.postMessage({ type: "ROBOT_SET_EXPRESSION", expression: normalizedExpr, duration: dur }, "*")
        }
      } else if (e.data && e.data.type === "ROBOT_CLICKED") {
        onClick?.()
      }
    }
    window.addEventListener("message", handleMessage)


    // Safety fallback: if message is delayed or missed, reveal after 7s
    const fallbackTimer = setTimeout(() => {
      setIsLoaded(true)
    }, 7000)

    return () => {
      window.removeEventListener("message", handleMessage)
      clearTimeout(fallbackTimer)
    }
  }, [expression, onClick])

  useEffect(() => {
    const win = iframeRef.current?.contentWindow
    if (!win) return
    const dur = normalizedExpr === "normal" ? 0 : (normalizedExpr === "cry" ? 8000 : 3200)
    try {
      if ((win as unknown as { __applyExpression?: (expr: string, dur?: number) => void }).__applyExpression) {
        (win as unknown as { __applyExpression: (expr: string, dur?: number) => void }).__applyExpression(normalizedExpr, dur)
      }
    } catch (_) {}
    win.postMessage(
      { type: "ROBOT_SET_EXPRESSION", expression: normalizedExpr, duration: dur },
      "*"
    )
  }, [normalizedExpr])


  useEffect(() => {
    if (!iframeRef.current?.contentWindow) return
    iframeRef.current.contentWindow.postMessage(
      { type: "ROBOT_SET_COMPACT", compact: isCompact },
      "*"
    )
  }, [isCompact])

  useEffect(() => {
    let rafId: number | null = null
    let latestE: PointerEvent | null = null

    const processPointer = () => {
      rafId = null
      if (!latestE) return
      const iframe = iframeRef.current
      if (!iframe || !iframe.contentWindow) return

      const rect = iframe.getBoundingClientRect()
      // Skip postMessage if robot is scrolled offscreen or hidden
      if (rect.bottom < 0 || rect.top > window.innerHeight || rect.width === 0) return

      // Center of robot in viewport coordinates
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2

      // Normalized coordinates from -1 to 1 based on distance to robot center
      const maxDistX = Math.max(window.innerWidth / 2, 400)
      const maxDistY = Math.max(window.innerHeight / 2, 400)

      const nx = Math.max(-1, Math.min(1, (latestE.clientX - cx) / maxDistX))
      const ny = Math.max(-1, Math.min(1, (latestE.clientY - cy) / maxDistY))

      iframe.contentWindow.postMessage(
        { type: "ROBOT_POINTER_MOVE", x: nx, y: ny },
        "*"
      )
    }

    const handlePointerMove = (e: PointerEvent) => {
      // Ignore touch events to prevent touch-scroll lag and frame drops on mobile
      if (e.pointerType === "touch") return
      latestE = e
      if (rafId === null) {
        rafId = requestAnimationFrame(processPointer)
      }
    }

    const handlePointerLeave = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
        rafId = null
      }
      latestE = null
      iframeRef.current?.contentWindow?.postMessage(
        { type: "ROBOT_POINTER_MOVE", x: 0, y: 0 },
        "*"
      )
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true })
    document.addEventListener("mouseleave", handlePointerLeave)

    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
      window.removeEventListener("pointermove", handlePointerMove)
      document.removeEventListener("mouseleave", handlePointerLeave)
    }
  }, [])

  return (
    <div
      onClick={onClick}
      className={`relative w-full h-full flex items-center justify-center pointer-events-auto select-none ${className}`}
    >
      {/* Editorial Emerald & Soft Gold Cybernetic Loader with smooth crossfade exit */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 select-none transition-opacity duration-700 ease-out ${
          isLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        aria-label="Awakening Axel 3D Companion"
      >
        <div className="relative flex items-center justify-center">

          {/* Outer Emerald Orbital Ring */}
          <div
            className="w-20 h-20 rounded-full border-2 border-primary/20 border-t-primary border-r-amber-500/80 animate-spin"
            style={{ animationDuration: "1.6s" }}
          />

          {/* Inner Counter-Orbit Ring */}
          <div
            className="absolute w-12 h-12 rounded-full border-2 border-foreground/15 border-b-primary/90 border-l-amber-500/70 animate-spin"
            style={{ animationDuration: "1.1s", animationDirection: "reverse" }}
          />

          {/* Center Pulsing Robot Beacon Core */}
          <div className="absolute w-4 h-4 rounded-full bg-primary animate-pulse" />

          {/* Micro-satellite beacon dot on outer orbit */}
          <div
            className="absolute w-20 h-20 rounded-full animate-spin pointer-events-none"
            style={{ animationDuration: "3.2s" }}
          >
            <div className="w-2 h-2 rounded-full bg-primary -mt-1 mx-auto" />
          </div>
        </div>

        {/* Editorial Glassmorphic Status Pod */}
        <div className="mt-5 px-4 py-2 rounded-full bg-card/85 dark:bg-card/60 backdrop-blur-md border border-hairline shadow-sm flex flex-col items-center gap-1.5">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="text-[11px] font-mono font-semibold tracking-[0.2em] text-foreground uppercase">
              Awakening Axel
            </span>
          </div>

          {/* Laser Sweep Progress Bar */}
          <div className="w-28 h-1 rounded-full bg-muted/60 dark:bg-muted/40 overflow-hidden relative">
            <div className="absolute inset-y-0 w-1/2 bg-primary/40 animate-laser-sweep rounded-full" />
          </div>

          <span className="text-[9px] font-mono tracking-wider text-muted-foreground uppercase">
            Neural 3D Companion
          </span>
        </div>
      </div>

      {/* Direct borderless 3D Robot with isolated head tracking */}
      <iframe
        ref={iframeRef}
        src="/r4x-viewer.html"
        title="3D Robot"
        allow="autoplay; fullscreen; vr"
        className={`w-full h-full border-0 outline-none bg-transparent transition-opacity duration-700 ease-out ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{
          border: "none",
          background: "transparent",
          colorScheme: "none",
        }}
      />
    </div>
  )
}
