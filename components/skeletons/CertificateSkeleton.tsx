"use client"

import React from "react"
import { Skeleton } from "./Skeleton"

export function CertificateSkeleton() {
  return (
    <div
      aria-busy="true"
      aria-label="Loading certificate"
      className="w-full max-w-4xl mx-auto aspect-[1.414/1] rounded-3xl border-2 border-hairline/80 bg-card p-6 sm:p-10 lg:p-12 flex flex-col justify-between shadow-xl relative overflow-hidden select-none"
    >
      {/* Ornamental Corner Filigree Placeholders */}
      <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-hairline/60 rounded-tl-xl pointer-events-none" />
      <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-hairline/60 rounded-tr-xl pointer-events-none" />
      <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-hairline/60 rounded-bl-xl pointer-events-none" />
      <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-hairline/60 rounded-br-xl pointer-events-none" />

      {/* Header: Crest & Academy Banner */}
      <div className="flex flex-col items-center text-center space-y-3">
        <Skeleton className="h-14 w-14 rounded-full border border-hairline/60" />
        <Skeleton className="h-5 w-40 rounded" />
        <Skeleton className="h-3 w-56 rounded" />
      </div>

      {/* Center: Awarded To, Student Name & Course Title */}
      <div className="flex flex-col items-center text-center space-y-4 my-auto">
        <Skeleton className="h-3 w-28 rounded" />
        {/* Recipient Name in Display typography placeholder */}
        <Skeleton className="h-10 sm:h-12 w-72 sm:w-96 rounded-xl" />
        <Skeleton className="h-3.5 w-80 max-w-full rounded" />
        {/* Course Title */}
        <Skeleton className="h-7 sm:h-8 w-64 sm:w-80 rounded-lg" />
      </div>

      {/* Footer: Date, QR Code & Signatures */}
      <div className="pt-6 border-t border-hairline/60 grid grid-cols-3 items-end gap-4">
        {/* Left: Issue Date & Cert ID */}
        <div className="space-y-1.5">
          <Skeleton className="h-3 w-20 rounded" />
          <Skeleton className="h-2.5 w-32 rounded" />
          <Skeleton className="h-2.5 w-24 rounded" />
        </div>

        {/* Center: Verification Seal / QR */}
        <div className="flex flex-col items-center space-y-1.5">
          <Skeleton className="h-12 w-12 rounded-xl" />
          <Skeleton className="h-2 w-16 rounded" />
        </div>

        {/* Right: Instructor / Registrar Signatures */}
        <div className="space-y-2 flex flex-col items-end">
          <Skeleton className="h-7 w-28 rounded" />
          <div className="h-px w-32 bg-border/60" />
          <Skeleton className="h-2.5 w-24 rounded" />
        </div>
      </div>
    </div>
  )
}
