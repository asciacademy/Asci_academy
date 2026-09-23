import * as React from "react"
import { cn } from "@/lib/utils"
import { Skeleton } from "../Skeleton"

export interface CertificateSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CertificateSkeleton({ className, ...props }: CertificateSkeletonProps) {
  return (
    <div
      aria-busy="true"
      className={cn(
        "w-full max-w-4xl mx-auto aspect-[1.414/1] rounded-3xl border-2 border-border/80 dark:border-white/10 bg-card p-6 sm:p-10 lg:p-12 flex flex-col justify-between shadow-2xl relative overflow-hidden select-none",
        className
      )}
      {...props}
    >
      {/* Ornamental Corner Filigree Placeholders */}
      <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-border/60 rounded-tl-xl pointer-events-none" />
      <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-border/60 rounded-tr-xl pointer-events-none" />
      <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-border/60 rounded-bl-xl pointer-events-none" />
      <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-border/60 rounded-br-xl pointer-events-none" />

      {/* Header: ASCI Crest & Certificate Banner */}
      <div className="flex flex-col items-center text-center space-y-3">
        <Skeleton className="h-14 w-14 rounded-full border border-border/60" />
        <Skeleton className="h-5 w-40" rounded="sm" />
        <Skeleton className="h-3 w-56" rounded="xs" />
      </div>

      {/* Center: Awarded To, Student Name & Program Title */}
      <div className="flex flex-col items-center text-center space-y-4 my-auto">
        <Skeleton className="h-3 w-28" rounded="xs" />
        <Skeleton className="h-10 sm:h-12 w-72 sm:w-96" rounded="xl" />
        <Skeleton className="h-3.5 w-80 max-w-full" rounded="xs" />
        <Skeleton className="h-7 sm:h-8 w-64 sm:w-80" rounded="lg" />
      </div>

      {/* Footer: Date, Verification Seal & Signatures */}
      <div className="pt-6 border-t border-border/60 grid grid-cols-3 items-end gap-4">
        {/* Left: Issue Date & ID */}
        <div className="space-y-1.5">
          <Skeleton className="h-3 w-20" rounded="xs" />
          <Skeleton className="h-2.5 w-32" rounded="xs" />
          <Skeleton className="h-2.5 w-24" rounded="xs" />
        </div>

        {/* Center: Verification Seal / QR */}
        <div className="flex flex-col items-center space-y-1.5">
          <Skeleton className="h-12 w-12" rounded="xl" />
          <Skeleton className="h-2 w-16" rounded="xs" />
        </div>

        {/* Right: Signatures */}
        <div className="space-y-2 flex flex-col items-end">
          <Skeleton className="h-7 w-28" rounded="sm" />
          <div className="h-px w-32 bg-border/60" />
          <Skeleton className="h-2.5 w-24" rounded="xs" />
        </div>
      </div>
    </div>
  )
}
