"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import "./splash.css"

export interface SplashScreenProps {
  /**
   * Primary readiness state: when true (or when isLoading becomes false),
   * the boot sequence smoothly concludes and exits.
   */
  isReady?: boolean
  /**
   * Traditional loading state flag. If true, splash awaits completion.
   */
  isLoading?: boolean
  /**
   * Optional real progress value (0-100). If provided, drives the progress bar.
   */
  progress?: number
  /**
   * Minimum display time in milliseconds (600–1200ms, default: 700ms).
   * Prevents jarring micro-flashes on instant cached page loads.
   */
  minimumDuration?: number
  /**
   * If true, renders the minimal error fallback with retry action.
   */
  hasError?: boolean
  /**
   * Optional custom error message.
   */
  errorMessage?: string
  /**
   * Callback fired when user clicks 'Try again' in error state.
   */
  onRetry?: () => void
  /**
   * Callback fired after exit transition concludes and splash unmounts.
   */
  onComplete?: () => void
  /**
   * If true, forces the splash screen to display regardless of session caching.
   */
  forceShow?: boolean
  /**
   * Optional custom className.
   */
  className?: string
}

/**
 * ASCI Academy — Optimized Digital Glitch Boot Sequence
 *
 * Combines:
 * - ASCI Academy identity + subtle technology aesthetic + extremely fast loading + responsive behavior.
 * - Warm neutral background (#FDFBF7 in light, #0c120e in dark)
 * - Central brand lockup (Logo, ASCI Academy, Academy of Software Craft & Intelligence)
 * - Controlled digital glitch (2-3 subtle slice events during 120ms-300ms window, resolving to 100% clean state)
 * - Minimal "LOADING" indicator with ASCI orange progress line
 * - Dynamic readiness connection (no fake stuck timers)
 * - Safe area inset padding for mobile notches and dynamic islands
 * - Prefers-reduced-motion accessibility
 * - Minimal error fallback with retry action
 */
export function AsciSplashScreen({
  isReady,
  isLoading = false,
  progress: externalProgress,
  minimumDuration = 700,
  hasError = false,
  errorMessage = "Something went wrong while loading.",
  onRetry,
  onComplete,
  forceShow = false,
  className = "",
}: SplashScreenProps) {
  const [mounted, setMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const [internalProgress, setInternalProgress] = useState(0)
  const [isGlitchActive, setIsGlitchActive] = useState(true)
  const [reducedMotion, setReducedMotion] = useState(false)

  const startTimeRef = useRef<number>(0)
  const dismissedRef = useRef<boolean>(false)

  // Determine readiness: isReady takes priority; if undefined, checks !isLoading
  const applicationIsReady = isReady !== undefined ? isReady : !isLoading

  const dismiss = useCallback(() => {
    if (dismissedRef.current) return
    dismissedRef.current = true
    setIsExiting(true)

    try {
      if (typeof window !== "undefined" && !forceShow) {
        sessionStorage.setItem("asci_splash_seen", "true")
      }
    } catch {
      // Storage access blocked or restricted
    }

    // Phase 5 — Exit: opacity 1 -> 0 and translateY(-4px) over 220ms
    setTimeout(() => {
      setIsVisible(false)
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("asci:splash-complete"))
      }
      onComplete?.()
    }, 220)
  }, [forceShow, onComplete])

  useEffect(() => {
    setMounted(true)

    // Check prefers-reduced-motion
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
      setReducedMotion(mediaQuery.matches)
    }

    // Check session storage to avoid repeating splash during in-app navigation
    if (!forceShow && typeof window !== "undefined") {
      const hasSeen = sessionStorage.getItem("asci_splash_seen")
      if (hasSeen === "true") {
        setIsVisible(false)
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("asci:splash-complete"))
        }
        onComplete?.()
        return
      }
    }

    setIsVisible(true)
    startTimeRef.current = Date.now()

    // Phase 2 Signal: Glitch is only active between 120ms and 320ms, then locked to 100% clean
    const glitchTimer = setTimeout(() => {
      setIsGlitchActive(false)
    }, 320)

    // Progress timer
    const progressInterval = setInterval(() => {
      if (externalProgress !== undefined) {
        setInternalProgress(Math.min(100, Math.max(0, externalProgress)))
        return
      }

      const elapsed = Date.now() - startTimeRef.current
      if (elapsed < 200) {
        setInternalProgress(20)
      } else if (elapsed < 400) {
        setInternalProgress(55)
      } else {
        const pct = Math.min(95, Math.round(((elapsed - 200) / (minimumDuration - 200)) * 100))
        setInternalProgress(pct)
      }
    }, 35)

    // Minimum display timer
    const minTimer = setTimeout(() => {
      if (applicationIsReady && !hasError) {
        setInternalProgress(100)
        dismiss()
      }
    }, minimumDuration)

    return () => {
      clearTimeout(glitchTimer)
      clearInterval(progressInterval)
      clearTimeout(minTimer)
    }
  }, [forceShow, minimumDuration, externalProgress, applicationIsReady, hasError, dismiss, onComplete])

  // React to application readiness transition
  useEffect(() => {
    if (mounted && isVisible && applicationIsReady && !hasError) {
      const elapsed = Date.now() - startTimeRef.current
      if (elapsed >= minimumDuration) {
        setInternalProgress(100)
        dismiss()
      }
    }
  }, [applicationIsReady, hasError, minimumDuration, mounted, isVisible, dismiss])

  // Instant keyboard dismissal (Escape or Enter)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter") {
        dismiss()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [dismiss])

  if (!mounted || !isVisible) return null

  // Computed display progress percentage
  const currentProgress = externalProgress !== undefined ? externalProgress : internalProgress

  // Framer Motion entrance variants with reduced-motion fallback
  const containerVariants = {
    initial: { opacity: 0, scale: reducedMotion ? 1 : 0.98 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: reducedMotion ? 0.01 : 0.25,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
    exit: {
      opacity: 0,
      y: reducedMotion ? 0 : -4,
      transition: {
        duration: 0.22,
        ease: "easeOut" as const,
      },
    },
  }

  const brandLockupVariants = {
    initial: { opacity: 0, y: reducedMotion ? 0 : 4 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reducedMotion ? 0.01 : 0.25,
        delay: reducedMotion ? 0 : 0.15,
        ease: "easeOut" as const,
      },
    },
  }

  const indicatorVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: reducedMotion ? 0.01 : 0.2,
        delay: reducedMotion ? 0 : 0.35,
      },
    },
  }

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          role="status"
          aria-live="polite"
          aria-label="Loading ASCI Academy"
          variants={containerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#FDFBF7] dark:bg-[#0c120e] text-foreground select-none overflow-hidden asci-splash-safe-viewport transition-colors duration-200 ${className}`}
        >
          {/* Constrained container inside calc(100vw - 32px) */}
          <div className="relative z-10 flex flex-col items-center px-4 w-full max-w-[calc(100vw-32px)] sm:max-w-md text-center">
            {hasError ? (
              /* Minimal Error Fallback State */
              <div className="space-y-4 py-4">
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center p-2.5">
                  <Image
                    src="/images/asci-logo.png"
                    alt="ASCI Logo"
                    width={64}
                    height={64}
                    className="w-full h-full object-contain grayscale opacity-80"
                  />
                </div>

                <div className="space-y-1">
                  <h2 className="font-sans font-bold text-xl sm:text-2xl text-foreground tracking-tight">
                    ASCI Academy
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground max-w-xs mx-auto">
                    {errorMessage}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-center gap-2">
                  {onRetry && (
                    <button
                      type="button"
                      onClick={onRetry}
                      className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-[#EA5300] transition-all cursor-pointer shadow-xs active:scale-[0.98]"
                    >
                      Try again
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={dismiss}
                    className="px-3.5 py-2 rounded-xl border border-border bg-card text-muted-foreground hover:text-foreground text-xs font-medium transition-colors cursor-pointer"
                  >
                    Continue anyway
                  </button>
                </div>
              </div>
            ) : (
              /* Digital Glitch Boot Sequence */
              <div className="flex flex-col items-center w-full">
                {/* 1. Glitch Logo Multi-layer Composition */}
                <div className="asci-glitch-container mb-4 sm:mb-5">
                  {/* Base Clean Layer (64–80px visual height on desktop, 48–60px on mobile) */}
                  <div className="asci-glitch-base w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl bg-primary/10 border border-primary/25 flex items-center justify-center p-2 sm:p-2.5 md:p-3 shadow-2xs">
                    <Image
                      src="/images/asci-logo.png"
                      alt="ASCI Logo"
                      width={80}
                      height={80}
                      priority
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Sliced Glitch Layer A: active only during 120-300ms signal */}
                  {!reducedMotion && isGlitchActive && (
                    <div
                      className="asci-glitch-slice-a w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl p-2 sm:p-2.5 md:p-3 flex items-center justify-center"
                      aria-hidden="true"
                    >
                      <Image
                        src="/images/asci-logo.png"
                        alt=""
                        width={80}
                        height={80}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}

                  {/* Sliced Glitch Layer B: active only during 120-300ms signal */}
                  {!reducedMotion && isGlitchActive && (
                    <div
                      className="asci-glitch-slice-b w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl p-2 sm:p-2.5 md:p-3 flex items-center justify-center"
                      aria-hidden="true"
                    >
                      <Image
                        src="/images/asci-logo.png"
                        alt=""
                        width={80}
                        height={80}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}

                  {/* Micro horizontal scanline sweep */}
                  {!reducedMotion && isGlitchActive && (
                    <div className="asci-glitch-scan" aria-hidden="true" />
                  )}
                </div>

                {/* 2. Brand Name: ASCI Academy (28–36px desktop, 24–28px mobile) */}
                <motion.div
                  variants={brandLockupVariants}
                  initial="initial"
                  animate="animate"
                  className="space-y-1 w-full"
                >
                  <h1 className="font-sans font-bold text-2xl sm:text-[28px] md:text-[32px] tracking-tight text-[#1A1A1A] dark:text-[#F3F4F6] leading-tight">
                    ASCI Academy
                  </h1>

                  {/* 3. Supporting Line: Academy of Software Craft & Intelligence (12–14px desktop, 11–12px mobile) */}
                  <p className="text-[11px] sm:text-xs md:text-[13px] font-medium tracking-wide text-[#78716C] dark:text-[#9CA3AF] max-w-xs sm:max-w-sm mx-auto leading-relaxed">
                    Academy of Software Craft &amp; Intelligence
                  </p>
                </motion.div>

                {/* 4. Minimal Loading Section: "LOADING" label + horizontal progress line */}
                <motion.div
                  variants={indicatorVariants}
                  initial="initial"
                  animate="animate"
                  className="mt-6 sm:mt-7 flex flex-col items-center w-full"
                >
                  {/* Subtle technical label */}
                  <div className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] text-[#78716C] dark:text-muted-foreground font-semibold mb-2">
                    LOADING
                  </div>

                  {/* Horizontal progress bar (160–220px desktop, 140–180px mobile) */}
                  <div
                    className="relative h-[2px] w-36 sm:w-44 md:w-52 overflow-hidden rounded-full bg-neutral-200/80 dark:bg-neutral-800"
                    aria-hidden="true"
                  >
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-150 ease-out"
                      style={{ width: `${currentProgress}%` }}
                    />
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Re-export with PascalCase as requested in specification
export const SplashScreen = AsciSplashScreen
export default AsciSplashScreen
