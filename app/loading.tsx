"use client"

import React from "react"
import { AsciLogo } from "@/components/asci-logo"

export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading ASCI"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background text-foreground select-none overflow-hidden"
    >
      {/* Minimal Editorial Brand Identity */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Crisp Logo Mark */}
        <div className="relative mb-5 flex items-center justify-center">
          <AsciLogo size={52} showText={false} />
        </div>

        {/* Clean Editorial Typography */}
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
