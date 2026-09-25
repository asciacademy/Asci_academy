"use client"

import React from "react"
import Image from "next/image"

interface AsciLogoProps {
  size?: number | "sm" | "md" | "lg" | "xl"
  showText?: boolean
  showBadge?: boolean
  badgeText?: string
  className?: string
}

export function AsciLogo({
  size = "md",
  showText = true,
  showBadge = false,
  badgeText = "Academy",
  className = "",
}: AsciLogoProps) {
  const pixelSize =
    typeof size === "number"
      ? size
      : size === "sm"
      ? 26
      : size === "md"
      ? 34
      : size === "lg"
      ? 42
      : 52

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Crisp Logo Mark */}
      <div
        className="relative shrink-0 flex items-center justify-center rounded-lg bg-primary/10 border border-primary/20 overflow-hidden"
        style={{ width: pixelSize, height: pixelSize }}
      >
        <Image
          src="/images/asci-logo.png"
          alt="ASCI Logo"
          width={pixelSize * 2}
          height={pixelSize * 2}
          className="w-full h-full object-contain p-1"
          priority
        />
      </div>

      {/* Brand Wordmark (Clean & Modern UI Font) */}
      {showText && (
        <div className="flex items-center gap-1.5">
          <span className="font-sans font-bold text-lg sm:text-xl tracking-tight text-foreground">
            ASCI<span className="text-primary">.</span>
          </span>
          {showBadge && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-sans font-semibold tracking-wide uppercase bg-secondary text-muted-foreground border border-border">
              {badgeText}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
