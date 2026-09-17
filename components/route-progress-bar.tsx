"use client"

import React, { useEffect, useState, useRef, useCallback } from "react"
import { usePathname, useSearchParams } from "next/navigation"

export function RouteProgressBar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [active, setActive] = useState(false)
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const completeTimerRef = useRef<NodeJS.Timeout | null>(null)

  const startProgress = useCallback(() => {
    if (completeTimerRef.current) clearTimeout(completeTimerRef.current)
    if (timerRef.current) clearInterval(timerRef.current)

    setVisible(true)
    setActive(true)
    setProgress(15)

    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          if (timerRef.current) clearInterval(timerRef.current)
          return 90
        }
        // Decelerating crawl toward 90%
        const diff = 92 - prev
        return prev + Math.max(1, Math.floor(diff * 0.12))
      })
    }, 100)
  }, [])

  const finishProgress = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    setProgress(100)

    completeTimerRef.current = setTimeout(() => {
      setVisible(false)
      setActive(false)
      setProgress(0)
    }, 350)
  }, [])

  // Complete progress on pathname or searchParams change
  useEffect(() => {
    finishProgress()
  }, [pathname, searchParams, finishProgress])

  // Listen for internal clicks to start progress bar immediately
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("a")
      if (!target) return

      const href = target.getAttribute("href")
      if (!href) return

      // Ignore hash links, external links, mailto, target="_blank", or modifier keys
      if (
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        target.target === "_blank" ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return
      }

      // Check if it's an internal route
      try {
        const url = new URL(href, window.location.href)
        if (url.origin === window.location.origin) {
          const currentPath = window.location.pathname + window.location.search
          const newPath = url.pathname + url.search
          if (currentPath !== newPath) {
            startProgress()
          }
        }
      } catch {
        // Ignore invalid URLs
      }
    }

    document.addEventListener("click", handleClick, { capture: true })
    return () => {
      document.removeEventListener("click", handleClick, { capture: true })
      if (timerRef.current) clearInterval(timerRef.current)
      if (completeTimerRef.current) clearTimeout(completeTimerRef.current)
    }
  }, [startProgress])

  if (!visible) return null

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[999999] pointer-events-none transition-opacity duration-300"
      style={{ opacity: active ? 1 : 0 }}
    >
      {/* Progress track */}
      <div className="relative h-[2.5px] w-full bg-transparent overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 transition-all duration-200 ease-out shadow-xs shadow-blue-500/50"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
