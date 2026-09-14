"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import { usePathname } from "next/navigation"
import gsap from "gsap"
import { R4XRobot } from "@/components/r4x-robot"
import { useAxel } from "@/context/axel-context"
import { AxelEmotion } from "@/types/axel"

export interface SectionStation {
  id: string
  sectionId: string
  anchorId: string
  label: string
  emotion: AxelEmotion
  scale: number
}

// Landing Page Stations (Primary canonical configuration)
const HOME_STATIONS: SectionStation[] = [
  {
    id: "hero",
    sectionId: "hero-section",
    anchorId: "hero-robot-anchor",
    label: "Master the Craft",
    emotion: "cute",
    scale: 1.15,
  },
  {
    id: "courses",
    sectionId: "courses",
    anchorId: "courses-robot-anchor",
    label: "Curriculum Catalog",
    emotion: "happy",
    scale: 0.46,
  },
  {
    id: "features",
    sectionId: "features",
    anchorId: "features-robot-anchor",
    label: "Core Pillars",
    emotion: "normal",
    scale: 0.46,
  },
  {
    id: "visualizer",
    sectionId: "dsa-visualizer",
    anchorId: "visualizer-robot-anchor",
    label: "Algorithm Engine",
    emotion: "shocked",
    scale: 0.46,
  },
  {
    id: "learning-paths",
    sectionId: "learning-paths",
    anchorId: "learning-paths-robot-anchor",
    label: "Engineering Trajectory",
    emotion: "cute",
    scale: 0.46,
  },
  {
    id: "testimonials",
    sectionId: "testimonials",
    anchorId: "testimonials-robot-anchor",
    label: "Alumni Verification",
    emotion: "heart",
    scale: 0.46,
  },
  {
    id: "pricing",
    sectionId: "pricing",
    anchorId: "pricing-robot-anchor",
    label: "Tuition & Fellowship",
    emotion: "normal",
    scale: 0.46,
  },
  {
    id: "faq",
    sectionId: "faq",
    anchorId: "faq-robot-anchor",
    label: "Questions & Answers",
    emotion: "happy",
    scale: 0.46,
  },
]

export function AxelCompanion() {
  const pathname = usePathname()

  const {
    expression,
    setExpression,
    setActiveSection,
  } = useAxel()

  const [mounted, setMounted] = useState(false)
  const [stations, setStations] = useState<SectionStation[]>(HOME_STATIONS)
  const [activeStationId, setActiveStationId] = useState<string>("hero")
  const [popKey, setPopKey] = useState<number>(0)
  const [ctaHovered, setCtaHovered] = useState(false)
  const [windowSize, setWindowSize] = useState({ w: 1280, h: 800 })
  const [hasMeasuredCoords, setHasMeasuredCoords] = useState<boolean>(false)

  // Live coordinates of the active anchor in document space
  const [activeCoords, setActiveCoords] = useState<{ docX: number; docY: number }>({
    docX: 1060,
    docY: 450,
  })

  const lastActiveRef = useRef<string>("hero")
  const stationsRef = useRef<SectionStation[]>(HOME_STATIONS)
  const robotWrapperRef = useRef<HTMLDivElement>(null)
  const initialPoppedRef = useRef<boolean>(false)

  // Keep stationsRef in sync with stations
  useEffect(() => {
    stationsRef.current = stations
  }, [stations])

  // Discover stations on the current page dynamically
  const discoverStations = useCallback((): SectionStation[] => {
    if (typeof window === "undefined") return HOME_STATIONS

    if (pathname === "/") {
      return HOME_STATIONS
    }

    // Query all registered Axel stages on this subpage
    const anchorEls = document.querySelectorAll<HTMLElement>(
      '[data-axel-anchor="true"], [id$="-robot-anchor"]'
    )

    if (!anchorEls || anchorEls.length === 0) {
      return []
    }

    const discovered: SectionStation[] = []
    anchorEls.forEach((el, index) => {
      const anchorId = el.id || `stage-anchor-${index}`
      const rawSectionId =
        el.getAttribute("data-section-id") ||
        el.closest("section")?.id ||
        el.parentElement?.closest("[id]")?.id ||
        anchorId.replace("-robot-anchor", "")
      const emotion = (el.getAttribute("data-emotion") as AxelEmotion) || "happy"
      const scale = parseFloat(el.getAttribute("data-scale") || "0.46") || 0.46
      const label = el.getAttribute("data-label") || `Section ${index + 1}`

      discovered.push({
        id: anchorId,
        sectionId: rawSectionId,
        anchorId,
        label,
        emotion,
        scale,
      })
    })

    return discovered
  }, [pathname])

  // Update active anchor position directly from live DOM
  const updateAnchorPosition = useCallback((stationId?: string, currentStations?: SectionStation[]) => {
    if (typeof window === "undefined") return
    const list = currentStations || stationsRef.current
    if (!list || list.length === 0) return

    const targetId = stationId || lastActiveRef.current
    const station = list.find((s) => s.id === targetId) || list[0]
    if (!station) return

    const el = document.getElementById(station.anchorId)
    if (el) {
      const r = el.getBoundingClientRect()
      // If anchor has zero size (e.g. hidden on mobile), avoid jumping to (0,0)
      if (r.width === 0 && r.height === 0) return

      const scrollX = window.scrollX || window.pageXOffset || 0
      const scrollY = window.scrollY || window.pageYOffset || 0
      const nextDocX = Math.round(r.left + r.width / 2 + scrollX)
      const nextDocY = Math.round(r.top + r.height / 2 + scrollY)

      setActiveCoords((prev) => {
        if (Math.abs(prev.docX - nextDocX) < 1 && Math.abs(prev.docY - nextDocY) < 1) {
          return prev
        }
        return { docX: nextDocX, docY: nextDocY }
      })
      setHasMeasuredCoords(true)
    }
  }, [])

  // Listen to CTA hover from hero
  useEffect(() => {
    const handleCtaHover = (e: Event) => {
      const custom = e as CustomEvent<{ hovered: boolean }>
      setCtaHovered(!!custom.detail?.hovered)
    }
    window.addEventListener("hero-cta-hover", handleCtaHover)
    return () => window.removeEventListener("hero-cta-hover", handleCtaHover)
  }, [])

  // Mount, resize, and initial measurement
  useEffect(() => {
    setMounted(true)
    const winW = typeof window !== "undefined" ? window.innerWidth : 1280
    const winH = typeof window !== "undefined" ? window.innerHeight : 800
    setWindowSize({ w: winW, h: winH })

    const handleResize = () => {
      setWindowSize({ w: window.innerWidth, h: window.innerHeight })
      updateAnchorPosition(lastActiveRef.current)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [updateAnchorPosition])

  // Continuous layout shift observer (detects accordions, expanded cards, dynamic data loading)
  useEffect(() => {
    let ro: ResizeObserver | null = null
    if (typeof ResizeObserver !== "undefined" && document.body) {
      ro = new ResizeObserver(() => {
        updateAnchorPosition(lastActiveRef.current)
      })
      ro.observe(document.body)
    }

    return () => {
      if (ro) ro.disconnect()
    }
  }, [updateAnchorPosition])

  // Full dynamic refresh method: re-queries DOM for registered Axel stages
  const refreshStations = useCallback(() => {
    const newStations = discoverStations()
    setStations(newStations)
    stationsRef.current = newStations

    if (newStations.length > 0) {
      // If current activeStationId is still valid in newStations, keep it; otherwise snap to first station of new tab/page
      const stillExists = newStations.some(
        (s) => s.id === lastActiveRef.current && typeof document !== "undefined" && document.getElementById(s.anchorId)
      )
      const targetStation = stillExists
        ? newStations.find((s) => s.id === lastActiveRef.current)!
        : newStations[0]

      const stationChanged = lastActiveRef.current !== targetStation.id
      lastActiveRef.current = targetStation.id
      setActiveStationId(targetStation.id)
      setActiveSection(targetStation.id)

      if (stationChanged || !initialPoppedRef.current) {
        initialPoppedRef.current = true
        setPopKey((k) => k + 1)
        setExpression(targetStation.emotion, 0)
      }
      updateAnchorPosition(targetStation.id, newStations)
    } else {
      setHasMeasuredCoords(false)
    }
  }, [discoverStations, setActiveSection, setExpression, updateAnchorPosition])

  // Route change & dynamic DOM lifecycle: observe tab switches and mutations
  useEffect(() => {
    refreshStations()
    const t1 = setTimeout(refreshStations, 100)
    const t2 = setTimeout(refreshStations, 350)
    const t3 = setTimeout(refreshStations, 900)

    const handleRefreshEvent = () => {
      refreshStations()
      setTimeout(refreshStations, 60)
      setTimeout(refreshStations, 250)
    }

    window.addEventListener("axel-refresh-stations", handleRefreshEvent)
    window.addEventListener("popstate", handleRefreshEvent)

    // MutationObserver: detects when tabs mount/unmount stages inside dashboard workspace
    let mutationDebounce: NodeJS.Timeout | null = null
    const observer = new MutationObserver((mutations) => {
      let shouldRefresh = false
      for (const m of mutations) {
        if (m.type === "childList") {
          for (const node of m.addedNodes) {
            if (
              node instanceof HTMLElement &&
              (node.getAttribute?.("data-axel-anchor") === "true" ||
                node.id?.endsWith("-robot-anchor") ||
                node.querySelector?.('[data-axel-anchor="true"], [id$="-robot-anchor"]'))
            ) {
              shouldRefresh = true
              break
            }
          }
          if (!shouldRefresh) {
            for (const node of m.removedNodes) {
              if (
                node instanceof HTMLElement &&
                (node.getAttribute?.("data-axel-anchor") === "true" ||
                  node.id?.endsWith("-robot-anchor") ||
                  node.querySelector?.('[data-axel-anchor="true"], [id$="-robot-anchor"]'))
              ) {
                shouldRefresh = true
                break
              }
            }
          }
        }
        if (shouldRefresh) break
      }

      if (shouldRefresh) {
        if (mutationDebounce) clearTimeout(mutationDebounce)
        mutationDebounce = setTimeout(() => {
          refreshStations()
        }, 40)
      }
    })

    if (document.body) {
      observer.observe(document.body, { childList: true, subtree: true })
    }

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      if (mutationDebounce) clearTimeout(mutationDebounce)
      window.removeEventListener("axel-refresh-stations", handleRefreshEvent)
      window.removeEventListener("popstate", handleRefreshEvent)
      observer.disconnect()
    }
  }, [pathname, refreshStations])

  // Live Section Detection on Scroll (capture phase to support both window & nested elements)
  useEffect(() => {
    let scrollRaf: number | null = null

    const handleScroll = () => {
      if (scrollRaf !== null) return
      scrollRaf = requestAnimationFrame(() => {
        scrollRaf = null
        const curStations = stationsRef.current
        if (!curStations || curStations.length === 0) return

        const scrollY = window.scrollY || window.pageYOffset || 0
        const winH = window.innerHeight || 800

        // 1. Top of page is always first section
        if (scrollY < 120) {
          const first = curStations[0]
          if (lastActiveRef.current !== first.id) {
            lastActiveRef.current = first.id
            setActiveStationId(first.id)
            setActiveSection(first.id)
            setPopKey((k) => k + 1)
            setExpression(first.emotion, 0)
          }
          updateAnchorPosition(first.id, curStations)
          return
        }

        // 2. Section detection using live getBoundingClientRect against 45% viewport line
        const focusLine = winH * 0.45
        let detectedStationId = curStations[0].id

        for (const st of curStations) {
          const el = document.getElementById(st.sectionId) || document.getElementById(st.anchorId)
          if (el) {
            const rect = el.getBoundingClientRect()
            if (rect.top <= focusLine && rect.bottom >= 0) {
              detectedStationId = st.id
            }
          }
        }

        if (detectedStationId !== lastActiveRef.current) {
          lastActiveRef.current = detectedStationId
          setActiveStationId(detectedStationId)
          setActiveSection(detectedStationId)
          setPopKey((k) => k + 1)
          const stObj = curStations.find((s) => s.id === detectedStationId)
          if (stObj) {
            setExpression(stObj.emotion, 0)
          }
        }
        updateAnchorPosition(detectedStationId, curStations)
      })
    }

    window.addEventListener("scroll", handleScroll, { passive: true, capture: true })
    handleScroll()

    return () => {
      if (scrollRaf !== null) cancelAnimationFrame(scrollRaf)
      window.removeEventListener("scroll", handleScroll, true)
    }
  }, [setActiveSection, setExpression, updateAnchorPosition])

  // Active station data and scaling
  const currentStation =
    stations.find((s) => s.id === activeStationId) || stations[0]
  const baseScale = currentStation?.scale || 0.46
  const restingEmotion = currentStation?.emotion || "normal"

  // Responsive scaling: comfortably sized across mobile, tablet, and desktop
  const curScale =
    windowSize.w < 640
      ? baseScale * 0.65
      : windowSize.w < 1024
      ? baseScale * 0.8
      : baseScale

  // GSAP: Buttery-smooth pop-up animation with tactile back overshoot
  useEffect(() => {
    if (!robotWrapperRef.current || popKey === 0) return

    gsap.killTweensOf(robotWrapperRef.current)

    gsap.fromTo(
      robotWrapperRef.current,
      {
        scale: 0.25 * curScale,
        y: 28,
        opacity: 0.1,
      },
      {
        scale: curScale,
        y: 0,
        opacity: 1,
        duration: 0.55,
        ease: "back.out(1.6)",
        force3D: true,
      }
    )
  }, [popKey, curScale])

  // 1. Leaving the website -> Axel cries; Returning -> Axel is happy & relieved
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (
        e.clientY <= 0 ||
        e.clientX <= 0 ||
        e.clientX >= window.innerWidth ||
        e.clientY >= window.innerHeight
      ) {
        setExpression("cry", 6000, restingEmotion)
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      if (!e.relatedTarget && !(e as any).toElement) {
        setExpression("cry", 6000, restingEmotion)
      }
    }

    const handleMouseEnter = () => {
      setExpression("happy", 2400, restingEmotion)
    }

    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseout", handleMouseOut)
    document.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseout", handleMouseOut)
      document.removeEventListener("mouseenter", handleMouseEnter)
    }
  }, [setExpression, restingEmotion])

  // 2. User interaction-based emotions: Hovering over CTAs triggers love (heart)
  useEffect(() => {
    const handleActionHover = (e: Event) => {
      const target = e.target as HTMLElement | null
      if (!target) return

      const isActionElement = target.closest(
        'button, a[href*="signup"], a[href*="dashboard"], a[href*="programs"], a[href*="courses"], a[href*="fellowship"], .btn-primary, [role="button"]'
      )

      if (isActionElement) {
        setExpression("heart", 2600, restingEmotion)
      }
    }

    document.addEventListener("pointerover", handleActionHover, { passive: true })
    return () => {
      document.removeEventListener("pointerover", handleActionHover)
    }
  }, [setExpression, restingEmotion])

  // 3. User interaction-based emotions: Rapid flick scrolling triggers shocked expression
  const lastScrollYRef = useRef<number>(0)
  const lastScrollTimeRef = useRef<number>(Date.now())

  useEffect(() => {
    const handleScrollVelocity = () => {
      const now = Date.now()
      const scrollY = window.scrollY || window.pageYOffset || 0
      const deltaY = Math.abs(scrollY - lastScrollYRef.current)
      const deltaTime = Math.max(1, now - lastScrollTimeRef.current)
      const velocity = (deltaY / deltaTime) * 100 // px per 100ms

      lastScrollYRef.current = scrollY
      lastScrollTimeRef.current = now

      if (velocity > 120) {
        setExpression("shocked", 1400, restingEmotion)
      }
    }

    window.addEventListener("scroll", handleScrollVelocity, { passive: true })
    return () => window.removeEventListener("scroll", handleScrollVelocity)
  }, [setExpression, restingEmotion])

  // 4. Playing Emotes: Periodic idle emote playback when user is inactive
  useEffect(() => {
    let idleTimer: NodeJS.Timeout | null = null
    const IDLE_EMOTES: AxelEmotion[] = ["heart", "cute", "happy"]
    let emoteIndex = 0

    const triggerIdleEmote = () => {
      const selectedEmote = IDLE_EMOTES[emoteIndex % IDLE_EMOTES.length]
      emoteIndex++
      setExpression(selectedEmote, 3000, restingEmotion)

      // Playful gentle physical bob without jarring iframe 2D rotation
      if (robotWrapperRef.current) {
        gsap.to(robotWrapperRef.current, {
          y: -8,
          duration: 0.38,
          yoyo: true,
          repeat: 3,
          ease: "sine.inOut",
          onComplete: () => {
            if (robotWrapperRef.current) {
              gsap.to(robotWrapperRef.current, { y: 0, duration: 0.3 })
            }
          },
        })
      }

      idleTimer = setTimeout(triggerIdleEmote, 11000)
    }

    const resetIdleTimer = () => {
      if (idleTimer) clearTimeout(idleTimer)
      idleTimer = setTimeout(triggerIdleEmote, 8000)
    }

    const activityEvents = ["pointermove", "keydown", "scroll", "click", "touchstart"]
    activityEvents.forEach((evt) =>
      window.addEventListener(evt, resetIdleTimer, { passive: true })
    )
    resetIdleTimer()

    return () => {
      if (idleTimer) clearTimeout(idleTimer)
      activityEvents.forEach((evt) =>
        window.removeEventListener(evt, resetIdleTimer)
      )
    }
  }, [setExpression, restingEmotion])

  // Playful CTA hover reaction when in hero
  useEffect(() => {
    if (ctaHovered && activeStationId === "hero") {
      setExpression("heart", 2800, restingEmotion)
    }
  }, [ctaHovered, activeStationId, setExpression, restingEmotion])

  // Direct click on the 3D robot: tactile physical bounce & cycles through playful emotes
  const clickIndexRef = useRef<number>(0)

  const handleRobotClick = () => {
    if (robotWrapperRef.current) {
      gsap.to(robotWrapperRef.current, {
        scale: curScale * 1.1,
        y: -12,
        duration: 0.15,
        yoyo: true,
        repeat: 1,
        ease: "power2.out",
      })
    }

    const exprs: AxelEmotion[] = ["heart", "happy", "cute", "shocked"]
    clickIndexRef.current = (clickIndexRef.current + 1) % exprs.length
    const nextExpr = exprs[clickIndexRef.current]
    setExpression(nextExpr, 3000, restingEmotion)
  }

  // Mouse placed directly on Axel: Axel smiles warmly!
  const handleRobotHover = () => {
    setExpression("happy", 3000, restingEmotion)
  }

  // Mouse moved away from Axel: restore current section station emotion
  const handleRobotLeave = () => {
    setExpression(restingEmotion, 0)
  }

  const baseW = 500
  const baseH = 560

  const docX = activeCoords.docX
  const docY = activeCoords.docY

  // If component not mounted or current page has no stages, do not render
  if (!mounted || stations.length === 0) return null

  return (
    <>
      {/* Axel Robot stationed directly at the active section's stage in document space */}
      <div
        className={`absolute pointer-events-none select-none z-30 transition-[left,top,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          hasMeasuredCoords ? "opacity-100" : "opacity-0"
        }`}
        style={{
          left: `${docX}px`,
          top: `${docY}px`,
          width: `${baseW}px`,
          height: `${baseH}px`,
          marginLeft: `-${baseW / 2}px`,
          marginTop: `-${baseH / 2}px`,
        }}
      >
        {/* Popping 3D Robot Container driven by GSAP hardware acceleration */}
        <div
          ref={robotWrapperRef}
          className="w-full h-full relative"
          style={{
            transformOrigin: "center center",
            willChange: "transform, opacity",
          }}
        >
          <div
            className="h-full w-full pointer-events-auto cursor-pointer relative shadow-none"
            title={`Axel — ${currentStation?.label || "AI Companion"}`}
            aria-label="Axel 3D AI Mentor"
          >
            <R4XRobot
              expression={expression}
              isCompact={currentStation?.scale < 0.8}
              className="!h-full !w-full !max-w-none pointer-events-none"
            />
            {/* Interactive touch & click shield: intercepts all clicks and hovers cleanly in React space */}
            <div
              className="absolute inset-0 z-30 cursor-pointer pointer-events-auto bg-transparent"
              onClick={handleRobotClick}
              onMouseEnter={handleRobotHover}
              onMouseLeave={handleRobotLeave}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </>
  )
}
