"use client"

import React, { useEffect, useState, useCallback, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Sparkles, ArrowRight, Video } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { getActiveSitePopup } from "@/app/actions/admin"
import { SitePopup } from "@/lib/popups-types"
import { normalizeImageUrl } from "@/lib/popups-data"

/**
 * Extracts dominant vibrant color from an image URL using an offscreen canvas
 */
/**
 * Known preset color map to instantly match high-res curated posters
 */
const KNOWN_POSTER_COLORS: Record<string, string> = {
  "photo-1517245386807": "#2563eb", // Tech / Zoom Blue
  "photo-1522071820081": "#d97706", // Gold Amber
  "photo-1516116216624": "#7c3aed", // Electric Violet
  "photo-1633356122544": "#0891b2", // Vibrant Cyan
  "photo-1531482615713": "#db2777", // Sunset Rose
}

/**
 * Infer a vibrant non-green accent color from image URL or contextual keywords
 */
export function inferColorFromContext(text: string): string {
  const lower = (text || "").toLowerCase()
  if (lower.includes("gold") || lower.includes("scholarship") || lower.includes("fellowship") || lower.includes("50%") || lower.includes("award")) {
    return "#d97706" // Gold Amber
  }
  if (lower.includes("dsa") || lower.includes("sprint") || lower.includes("contest") || lower.includes("arena") || lower.includes("hackathon") || lower.includes("violet") || lower.includes("purple")) {
    return "#7c3aed" // Electric Violet
  }
  if (lower.includes("react") || lower.includes("frontend") || lower.includes("next") || lower.includes("cyan") || lower.includes("cloud")) {
    return "#0891b2" // Vibrant Cyan
  }
  if (lower.includes("career") || lower.includes("placement") || lower.includes("interview") || lower.includes("rose") || lower.includes("red") || lower.includes("urgent")) {
    return "#db2777" // Sunset Rose
  }
  if (lower.includes("orange") || lower.includes("bootcamp") || lower.includes("python")) {
    return "#0073E6" // Unstop Action Blue
  }
  // Default to sleek Tech Blue - NEVER Green
  return "#2563eb"
}

/**
 * Extracts dominant vibrant color from an image URL using an offscreen canvas
 * with cache-busting CORS handling, preset mapping, and intelligent keyword fallback
 */
export function extractVibrantColor(
  imgSrc: string,
  fallback: string,
  onExtracted: (hex: string) => void,
  contextHint: string = ""
) {
  if (!imgSrc || typeof window === "undefined") {
    onExtracted(fallback && fallback !== "auto" ? fallback : inferColorFromContext(contextHint))
    return
  }

  // 1. Instant match if URL matches known preset posters
  for (const [key, color] of Object.entries(KNOWN_POSTER_COLORS)) {
    if (imgSrc.includes(key)) {
      onExtracted(color)
      return
    }
  }

  // Safe fallback color that is NEVER green
  const safeFallback = fallback && fallback !== "auto" && !fallback.includes("#10b981") && !fallback.includes("#059669")
    ? fallback
    : inferColorFromContext(imgSrc + " " + contextHint)

  // 2. Load with offscreen canvas using cache-busting parameter to prevent tainted cache
  const img = new Image()
  if (!imgSrc.startsWith("data:")) {
    img.crossOrigin = "anonymous"
    const buster = imgSrc.includes("?") ? `&_cors_extract=1` : `?_cors_extract=1`
    img.src = `${imgSrc}${buster}`
  } else {
    // For local data: URLs (uploaded files), crossOrigin is not needed and canvas is never tainted
    img.src = imgSrc
  }

  img.onload = () => {
    try {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      if (!ctx) {
        onExtracted(safeFallback)
        return
      }

      const size = 32
      canvas.width = size
      canvas.height = size
      ctx.drawImage(img, 0, 0, size, size)
      const imageData = ctx.getImageData(0, 0, size, size).data

      let bestHex = safeFallback
      let maxScore = -1

      for (let i = 0; i < imageData.length; i += 4) {
        const r = imageData[i]
        const g = imageData[i + 1]
        const b = imageData[i + 2]
        const a = imageData[i + 3]

        if (a < 140) continue

        const max = Math.max(r, g, b)
        const min = Math.min(r, g, b)
        const saturation = max - min
        const brightness = 0.299 * r + 0.587 * g + 0.114 * b

        // Discard near-monochrome, very dark, or washed-out pixels
        if (saturation < 35 || brightness < 45 || brightness > 225) continue

        // Downweight greenish/olive pixels if they are low saturation muddy tones
        const isMuddyGreen = g > r && g > b && saturation < 60
        if (isMuddyGreen) continue

        // Score based on high saturation and balanced mid-luminance
        const score = saturation * (1 - Math.abs(brightness - 135) / 135)
        if (score > maxScore) {
          maxScore = score
          bestHex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
        }
      }

      onExtracted(bestHex)
    } catch {
      // CORS or canvas security restriction fallback
      onExtracted(safeFallback)
    }
  }

  img.onerror = () => {
    onExtracted(safeFallback)
  }
}

/**
 * Adjust hex color brightness for smooth gradient blending
 */
export function adjustBrightness(hex: string, delta: number): string {
  try {
    let cleanHex = hex.replace("#", "")
    if (cleanHex.length === 3) {
      cleanHex = cleanHex.split("").map(c => c + c).join("")
    }
    const num = parseInt(cleanHex, 16)
    if (isNaN(num)) return hex

    let r = Math.min(255, Math.max(0, (num >> 16) + delta))
    let g = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + delta))
    let b = Math.min(255, Math.max(0, (num & 0x0000ff) + delta))

    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
  } catch {
    return hex
  }
}

export function SitePopupModal() {
  const pathname = usePathname()
  const [popup, setPopup] = useState<SitePopup | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [extractedColor, setExtractedColor] = useState<string | null>(null)
  const [imageError, setImageError] = useState(false)

  // Listen for admin live preview trigger
  useEffect(() => {
    const handleAdminPreview = (e: any) => {
      if (e.detail) {
        setPopup(e.detail)
        setIsOpen(true)
      }
    }
    window.addEventListener("asci-preview-popup", handleAdminPreview)
    return () => window.removeEventListener("asci-preview-popup", handleAdminPreview)
  }, [])

  // Load active popup on mount
  useEffect(() => {
    if (pathname?.startsWith("/admin")) return

    let isMounted = true
    const checkAndShow = async () => {
      try {
        const res = await getActiveSitePopup()
        if (!isMounted || !res.success || !res.popup || !res.popup.is_active) return

        const activeItem = res.popup

        // Check placement filter
        if (activeItem.display_placement && activeItem.display_placement !== "all") {
          if (activeItem.display_placement === "home" && pathname !== "/") return
          if (activeItem.display_placement === "dashboard" && !pathname.startsWith("/dashboard")) return
          if (activeItem.display_placement === "courses" && !pathname.startsWith("/courses")) return
        }

        // Check frequency & dismissal
        const storageKey = `asci_popup_dismissed_${activeItem.id}`
        if (activeItem.frequency === "once_per_session") {
          if (typeof sessionStorage !== "undefined" && sessionStorage.getItem(storageKey)) return
        } else if (activeItem.frequency === "once_forever") {
          if (typeof localStorage !== "undefined" && localStorage.getItem(storageKey)) return
        }

        setPopup(activeItem)
        const timer = setTimeout(() => {
          if (isMounted) setIsOpen(true)
        }, 1200)
        return () => clearTimeout(timer)
      } catch (err) {
        console.warn("Failed to load active popup:", err)
      }
    }

    checkAndShow()
    return () => { isMounted = false }
  }, [pathname])

  const resolvedImageUrl = useMemo(() => normalizeImageUrl(popup?.image_url || ""), [popup?.image_url])

  // Extract dynamic color when poster image or popup changes
  useEffect(() => {
    if (!popup) return

    setImageError(false)

    const initialFallback = popup.accent_color && popup.accent_color !== "auto"
      ? popup.accent_color
      : "#2563eb"

    setExtractedColor(initialFallback)

    if (resolvedImageUrl) {
      extractVibrantColor(resolvedImageUrl, initialFallback, (color) => {
        // If admin specifically chose a custom hex, honor it, otherwise use the sampled color from poster
        if (popup.accent_color && popup.accent_color !== "auto") {
          setExtractedColor(popup.accent_color)
        } else {
          setExtractedColor(color)
        }
      }, popup.title)
    }
  }, [popup, resolvedImageUrl])

  const handleDismiss = useCallback(() => {
    setIsOpen(false)
    if (popup) {
      const storageKey = `asci_popup_dismissed_${popup.id}`
      try {
        if (popup.frequency === "once_forever") {
          localStorage.setItem(storageKey, "true")
        } else {
          sessionStorage.setItem(storageKey, "true")
        }
      } catch {}
    }
  }, [popup])

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) handleDismiss()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, handleDismiss])

  // Dynamic Color Palette computed from Poster
  const themeColor = useMemo(() => {
    return extractedColor || popup?.accent_color || "#2563eb"
  }, [extractedColor, popup])

  const darkerThemeColor = useMemo(() => {
    return adjustBrightness(themeColor, -40)
  }, [themeColor])

  if (!isOpen || !popup) return null

  const isLiveZoom = popup.cta_url?.includes("live") || popup.badge_text?.toLowerCase().includes("zoom") || popup.badge_text?.toLowerCase().includes("live")

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop blur with dark radial vignette */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
          onClick={handleDismiss}
          aria-hidden="true"
        />

        {/* Dynamic Modal Card adapting to Poster Color */}
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 16 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 16 }}
          transition={{ type: "spring", damping: 25, stiffness: 320 }}
          style={{
            borderColor: `${themeColor}45`,
            background: `radial-gradient(ellipse at 50% -10%, ${themeColor}22 0%, #111317 65%, #090a0d 100%)`,
            boxShadow: `0 25px 60px -15px ${themeColor}35`,
          }}
          className="relative w-full max-w-lg sm:max-w-xl border rounded-3xl overflow-hidden text-[#FDFBF7] z-10 my-auto"
        >
          {/* Luminous Top Hairline Accent Bar adapting to Poster Color */}
          <div
            style={{
              background: `linear-gradient(90deg, transparent 5%, ${themeColor} 50%, transparent 95%)`,
            }}
            className="absolute top-0 left-0 right-0 h-[2px] z-30 opacity-90"
          />

          {/* Dynamic Ambient Radial Glow */}
          <div
            style={{ backgroundColor: `${themeColor}25` }}
            className="absolute -top-24 -left-24 w-72 h-72 rounded-full blur-3xl pointer-events-none"
          />
          <div
            style={{ backgroundColor: `${themeColor}15` }}
            className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full blur-3xl pointer-events-none"
          />

          {/* Close Button */}
          <button
            onClick={handleDismiss}
            className="absolute top-3.5 right-3.5 z-20 p-2 rounded-full bg-black/60 hover:bg-black/80 text-zinc-300 hover:text-white border border-white/10 backdrop-blur-md transition-all cursor-pointer shadow-lg"
            aria-label="Close popup"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Poster / Ad Image Area */}
          {resolvedImageUrl && !imageError && (
            <div className="relative w-full h-52 sm:h-64 overflow-hidden bg-black/40">
              <img
                src={resolvedImageUrl}
                alt={popup.title}
                referrerPolicy="no-referrer"
                onError={() => setImageError(true)}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111317] via-[#111317]/30 to-transparent" />

              {/* Dynamic Badge Pill on Poster */}
              <div
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.75)",
                  borderColor: `${themeColor}60`,
                  color: themeColor,
                }}
                className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full border backdrop-blur-md text-[11px] font-mono font-bold tracking-widest uppercase shadow-lg"
              >
                {isLiveZoom ? (
                  <span className="flex items-center gap-1.5" style={{ color: themeColor }}>
                    <span className="relative flex h-2 w-2">
                      <span
                        style={{ backgroundColor: themeColor }}
                        className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                      />
                      <span
                        style={{ backgroundColor: themeColor }}
                        className="relative inline-flex rounded-full h-2 w-2"
                      />
                    </span>
                    <Video className="w-3 h-3 ml-0.5" />
                  </span>
                ) : (
                  <Sparkles className="w-3 h-3" style={{ color: themeColor }} />
                )}
                {popup.badge_text || "ANNOUNCEMENT"}
              </div>
            </div>
          )}

          {/* Content Body */}
          <div className="p-6 sm:p-8 space-y-4">
            {!popup.image_url && (
              <div
                style={{
                  backgroundColor: `${themeColor}15`,
                  borderColor: `${themeColor}40`,
                  color: themeColor,
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-mono font-bold tracking-widest uppercase mb-1"
              >
                <Sparkles className="w-3 h-3" style={{ color: themeColor }} />
                {popup.badge_text || "ANNOUNCEMENT"}
              </div>
            )}

            <div className="space-y-2">
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#FDFBF7] tracking-tight leading-snug">
                {popup.title}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                {popup.content}
              </p>
            </div>

            {/* Action Buttons adapted to Poster Theme Color */}
            <div className="pt-3 flex flex-col sm:flex-row items-center gap-3">
              {popup.cta_url && popup.cta_text && (
                <Link
                  href={popup.cta_url}
                  onClick={handleDismiss}
                  style={{
                    background: `linear-gradient(135deg, ${themeColor}, ${darkerThemeColor})`,
                    boxShadow: `0 10px 25px -5px ${themeColor}50`,
                  }}
                  className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-white text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer group hover:brightness-110"
                >
                  <span>{popup.cta_text}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              )}

              {popup.secondary_cta_url ? (
                <Link
                  href={popup.secondary_cta_url}
                  onClick={handleDismiss}
                  className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono font-medium text-zinc-300 hover:text-white transition-colors text-center cursor-pointer"
                >
                  {popup.secondary_cta_text || "Learn More"}
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={handleDismiss}
                  className="w-full sm:w-auto px-5 py-3.5 rounded-xl hover:bg-white/5 text-xs font-mono text-zinc-400 hover:text-zinc-200 transition-colors text-center cursor-pointer"
                >
                  {popup.secondary_cta_text || "Dismiss"}
                </button>
              )}
            </div>

            <div className="pt-2 flex items-center justify-between text-[10px] font-mono text-zinc-500 border-t border-white/5">
              <span>ASCI Academy Broadcast</span>
              <button
                type="button"
                onClick={handleDismiss}
                className="hover:text-zinc-400 underline underline-offset-2 transition-colors cursor-pointer"
              >
                Don't show this again
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
