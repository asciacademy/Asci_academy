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
  showBadge = true,
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
      ? 36
      : size === "lg"
      ? 48
      : 64

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Logo Mark Container */}
      <div
        className="relative shrink-0 flex items-center justify-center transition-transform duration-200 group-hover:scale-105"
        style={{ width: pixelSize, height: pixelSize }}
      >
        {useVector ? (
          /* Scalable SVG Vector */
          <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <defs>
              <linearGradient id="asciLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f97316" />
                <stop offset="50%" stopColor="#ea580c" />
                <stop offset="100%" stopColor="#c2410c" />
              </linearGradient>
            </defs>

            {/* Mortarboard Cap Top */}
            <path
              d="M50 14L88 31L50 48L12 31L50 14Z"
              fill="url(#asciLogoGrad)"
            />

            {/* Cap Under-Arch Band */}
            <path
              d="M27 38.5C33 34.5 41 33 50 33C59 33 67 34.5 73 38.5V44C67 40 59 38.5 50 38.5C41 38.5 33 40 27 44V38.5Z"
              fill="url(#asciLogoGrad)"
            />

            {/* Tassel Button & Drop */}
            <circle cx="79" cy="36" r="2" fill="url(#asciLogoGrad)" />
            <path
              d="M79 36C80 39 81 41 81 44"
              stroke="url(#asciLogoGrad)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <rect
              x="79.5"
              y="44"
              width="3.2"
              height="8"
              rx="1.6"
              fill="url(#asciLogoGrad)"
            />

            {/* Illuminating Central 4-Pointed Sparkle Star */}
            <path
              d="M50 43C50 49 46 53 42 53C46 53 50 57 50 63C50 57 54 53 58 53C54 53 50 49 50 43Z"
              fill="url(#asciLogoGrad)"
            />

            {/* Left Page of Open Book */}
            <path
              d="M47.5 65.5C36 60.5 25 55 16 54V70C25 71 36 76 47.5 81V65.5Z"
              fill="url(#asciLogoGrad)"
            />

            {/* Right Page of Open Book */}
            <path
              d="M52.5 65.5C64 60.5 75 55 84 54V70C75 71 64 76 52.5 81V65.5Z"
              fill="url(#asciLogoGrad)"
            />
          </svg>
        ) : (
          /* Official Master ASCI Logo Asset */
          <Image
            src="/images/asci-logo.png"
            alt="ASCI Logo"
            width={pixelSize * 2}
            height={pixelSize * 2}
            className="w-full h-full object-contain filter drop-shadow-[0_1px_3px_rgba(234,88,12,0.22)]"
            priority
          />
        )}
      </div>

      {/* Optional Wordmark */}
      {showText && (
        <div className="flex items-center gap-2">
          <span className="font-serif text-2xl font-normal tracking-tight text-foreground">
            ASCI
          </span>
          {showBadge && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-medium tracking-wide uppercase bg-primary/10 text-primary border border-primary/20">
              {badgeText}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
