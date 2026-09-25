"use client"

import React from "react"
import Link from "next/link"
import { Award, ArrowRight, ShieldCheck, CheckCircle2, QrCode } from "lucide-react"

export function CertificatesSection() {
  return (
    <section aria-labelledby="certificates-heading" className="pt-2">
      <div className="p-5 sm:p-6 lg:p-7 rounded-2xl border border-border bg-card shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Left: Headline & Copy */}
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-[11px] font-mono font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>Verifiable Proof of Work</span>
            </div>

            <h2
              id="certificates-heading"
              className="font-serif text-2xl sm:text-[28px] font-normal tracking-tight text-foreground"
            >
              Prove what you know.
            </h2>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Earn verified certificates as you complete ASCI learning paths. Each certificate is cryptographically signed and shareable with hiring managers.
            </p>

            <div className="pt-1">
              <Link
                href="/certificates"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-foreground text-background hover:bg-foreground/90 text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer"
              >
                <span>Explore Certificates</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right: Certificate Preview Card */}
          <div className="w-full md:w-[360px] p-4 rounded-xl border border-amber-500/30 bg-[#FFFDF9] dark:bg-[#141413] shadow-md space-y-3 shrink-0">
            <div className="flex items-center justify-between border-b border-border/70 pb-2.5">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-serif font-bold text-foreground">ASCI ACADEMY</div>
                  <div className="text-[9px] font-mono text-muted-foreground">Certificate of Mastery</div>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1 font-bold">
                <CheckCircle2 className="w-3 h-3" /> Verified
              </span>
            </div>

            <div>
              <div className="text-[10px] font-mono text-muted-foreground uppercase">Recipient</div>
              <div className="text-xs font-bold text-foreground">Devin Vance</div>
              <div className="text-[11px] text-muted-foreground mt-0.5 font-sans">
                Python for Production &amp; Systems Architecture
              </div>
            </div>

            <div className="pt-2 border-t border-border/70 flex items-center justify-between text-[10px] font-mono text-muted-foreground">
              <span>ID: ASCI-2026-PY789</span>
              <span className="flex items-center gap-1 text-primary">
                <ShieldCheck className="w-3 h-3" /> Merkle Verified
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
