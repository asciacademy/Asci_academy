"use client"

import Link from "next/link"
import { Award, Download, ExternalLink } from "lucide-react"

export interface CertificateCardProps {
  id: string
  certificateId: string
  title: string
  issueDate?: string
  studentName?: string
  skills?: string[]
  grade?: string
  verifyUrl?: string
  downloadUrl?: string
  variant?: "card" | "row"
}

export function CertificateCard({
  id,
  certificateId,
  title,
  issueDate = "12 Sep 2026",
  verifyUrl,
  variant = "card",
}: CertificateCardProps) {
  const verificationLink = verifyUrl || `/verify/${certificateId || id}`

  if (variant === "row") {
    return (
      <div className="group flex items-center justify-between gap-4 p-4 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-secondary/20 transition-all">
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
            <Award className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <Link href={verificationLink} className="font-semibold text-sm sm:text-base text-foreground hover:text-primary transition-colors truncate block">
              {title}
            </Link>
            <p className="text-xs text-muted-foreground truncate">
              Completed {issueDate} · ID: {certificateId}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            href={verificationLink}
            className="px-3 py-1.5 rounded-lg border border-border bg-secondary hover:bg-secondary/80 text-foreground text-xs font-semibold transition-all"
          >
            View
          </Link>
          <button
            type="button"
            onClick={() => window.open(verificationLink, "_blank")}
            className="px-3 py-1.5 rounded-lg border border-border bg-secondary hover:bg-secondary/80 text-foreground text-xs font-semibold transition-all cursor-pointer"
          >
            Download
          </button>
          <Link
            href={verificationLink}
            className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary-active text-xs font-semibold transition-all"
          >
            Verify
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="group relative flex flex-col justify-between rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:border-primary/50 hover:shadow-xs">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
            <Award className="h-5 w-5" />
          </div>
          <span className="text-[10px] font-mono text-muted-foreground font-semibold">
            {certificateId}
          </span>
        </div>

        <Link href={verificationLink} className="block group-hover:text-primary transition-colors">
          <h3 className="font-semibold text-foreground text-base tracking-tight leading-snug line-clamp-1 mb-1">
            {title}
          </h3>
        </Link>

        <p className="text-xs text-muted-foreground font-mono">
          Completed {issueDate}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between gap-2">
        <Link
          href={verificationLink}
          className="flex-1 text-center py-2 rounded-lg border border-border bg-secondary hover:bg-secondary/80 text-foreground text-xs font-semibold transition-all"
        >
          View
        </Link>
        <button
          type="button"
          onClick={() => window.open(verificationLink, "_blank")}
          className="flex-1 text-center py-2 rounded-lg border border-border bg-secondary hover:bg-secondary/80 text-foreground text-xs font-semibold transition-all cursor-pointer"
        >
          Download
        </button>
        <Link
          href={verificationLink}
          className="flex-1 text-center py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary-active text-xs font-semibold transition-all"
        >
          Verify
        </Link>
      </div>
    </div>
  )
}
