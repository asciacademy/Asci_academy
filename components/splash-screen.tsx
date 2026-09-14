"use client"

import React, { useState, useEffect, useRef } from "react"
import { AsciLogo } from "@/components/asci-logo"

export function SplashScreen() {
  const [mounted, setMounted] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const isPageReadyRef = useRef(false)
  const minTimeElapsedRef = useRef(false)

  useEffect(() => {
    setMounted(true)

    // Check if user has already experienced the splash in this browser session
    const hasSeenSplash = sessionStorage.getItem("asci_splash_seen")
    if (hasSeenSplash === "true") {
      setIsVisible(false)
      return
    }
    setIsVisible(true)

    const handleLoad = () => {
      dismiss()
    }

    if (document.readyState === "complete") {
      dismiss()
    } else {
      window.addEventListener("load", handleLoad)
    }

    // Snappy safety fallback: dismiss after 600ms maximum so visitors are never blocked
    const fallbackTimer = setTimeout(() => {
      dismiss()
    }, 600)

    return () => {
      window.removeEventListener("load", handleLoad)
      clearTimeout(fallbackTimer)
    }
  }, [])

  const dismiss = () => {
    if (isExiting) return
    setIsExiting(true)
    try {
      sessionStorage.setItem("asci_splash_seen", "true")
    } catch {
      // Ignore storage restrictions
    }
    setTimeout(() => {
      setIsVisible(false)
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("asci:splash-complete"))
      }
    }, 250)
  }

  // Keyboard shortcut to dismiss instantly (Escape or Enter)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter") {
        dismiss()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  if (!mounted || !isVisible) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Loading ASCI"
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background text-foreground select-none overflow-hidden transition-all duration-450 ease-out ${
        isExiting
          ? "opacity-0 scale-[1.01] blur-[2px] pointer-events-none"
          : "opacity-100 scale-100 blur-0"
      }`}
    >
      {/* Minimal Editorial Brand Identity */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Crisp Logo Mark */}
        <div className="relative mb-5 flex items-center justify-center">
          <AsciLogo size={52} showText={false} />
        </div>

        {/* Clean Editorial Wordmark */}
        <div className="space-y-1 text-center">
          <h1 className="font-serif text-2xl sm:text-[28px] tracking-[0.14em] text-foreground font-normal">
            ASCI
          </h1>
          <p className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground font-sans font-medium">
            Learn Coding Simply
          </p>
        </div>

        {/* Clean Hairline Progress Indicator */}
        <div className="mt-8 w-32 sm:w-36">
          <div className="relative h-[2px] w-full overflow-hidden rounded-full bg-border">
            <div className="h-full w-1/2 bg-[#ea580c] animate-laser-sweep rounded-full" />
          </div>
        </div>
      </div>
    </div>
  )
}
