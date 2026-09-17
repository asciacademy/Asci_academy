"use client"

import React from "react"
import { AsciLogo } from "@/components/asci-logo"

export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading ASCI"
      className="min-h-[70vh] w-full flex flex-col items-center justify-center bg-background text-foreground select-none py-20 px-4"
    >
      {/* Editorial Brand Identity */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Crisp Logo Mark with Subtle Aura */}
        <div className="relative mb-5 flex items-center justify-center">
          <div className="absolute inset-0 rounded-2xl bg-primary/15 blur-xl animate-pulse" />
          <AsciLogo size={52} showText={false} />
        </div>

        {/* Clean Editorial Typography */}
        <div className="space-y-1.5 text-center">
          <h1 className="font-serif text-2xl sm:text-[28px] tracking-[0.14em] text-foreground font-normal">
            ASCI
          </h1>
          <p className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground font-sans font-medium">
            Learn Coding Simply
          </p>
        </div>

        {/* Hairline Laser Sweep Progress Indicator */}
        <div className="mt-7 w-36 sm:w-44">
          <div className="relative h-[2.5px] w-full overflow-hidden rounded-full bg-border/60">
            <div className="h-full w-1/2 bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 animate-laser-sweep rounded-full" />
          </div>
        </div>

        {/* Micro Status Label */}
        <div className="mt-4 flex items-center gap-2 text-xs font-mono text-muted-foreground/80">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          <span>Loading workspace...</span>
        </div>
      </div>
    </div>
  )
}
