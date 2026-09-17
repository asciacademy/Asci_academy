"use client"

import React from "react"
import Image from "next/image"

interface AsciLogoProps {
  size?: number | "sm" | "md" | "lg" | "xl"
  showText?: boolean
  showBadge?: boolean
  badgeText?: string
  className?: string
  useVector?: boolean
}

export function AsciLogo({
  size = "md",
  showText = true,
  showBadge = false,
  badgeText = "Academy",
  className = "",
  useVector = false,
}: AsciLogoProps) {
  const pixelSize =
    typeof size === "number"
      ? size
      : size === "sm"
      ? 28
      : size === "md"
      ? 40
      : size === "lg"
      ? 48
      : 64

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Logo Mark Container */}
      <div
        className="relative shrink-0 flex items-center justify-center transition-transform duration-200 group-hover:scale-105"
        style={{ width: pixelSize, height: pixelSize }}
      >
        {useVector ? (
          /* Scalable SVG Vector with high-res emblem */
          <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <image href="/images/asci-logo.png" width="100" height="100" />
          </svg>
        ) : (
          /* Official Master ASCI Logo Asset */
          <Image
            src="/images/asci-logo.png"
            alt="ASCI Logo"
            width={pixelSize * 2}
            height={pixelSize * 2}
            className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(37,99,235,0.22)]"
            priority
          />
        )}
      </div>

      {/* Brand Wordmark (Clean & Stately) */}
      {showText && (
        <div className="flex items-center select-none">
          <span className="font-serif text-[24px] sm:text-[27px] font-medium tracking-tight text-foreground transition-colors duration-200 group-hover:text-primary">
            ASCI
          </span>
          {showBadge && (
            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-medium tracking-wide uppercase bg-primary/10 text-primary border border-primary/20">
              {badgeText}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
