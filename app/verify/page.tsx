"use client"

import React, { useState } from "react"
import Link from "next/link"
import { AsciLogo } from "@/components/asci-logo"
import { ShieldCheck, Search, ArrowRight, Award, CheckCircle2, ArrowLeft } from "lucide-react"

export default function VerifyPortalIndexPage() {
  const [certId, setCertId] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (certId.trim()) {
      window.location.href = `/verify/${encodeURIComponent(certId.trim())}`
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      {/* Top Bar */}
      <header className="border-b border-hairline bg-card/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <AsciLogo size={34} showText={false} />
            <div className="flex flex-col">
              <span className="font-mono text-sm font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                ASCI ACADEMY
              </span>
              <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest">
                Verification Registry
              </span>
            </div>
          </Link>

          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Student Dashboard</span>
          </Link>
        </div>
      </header>

      {/* Main Verification Search Box */}
      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-16 flex flex-col justify-center text-center">
        <div className="space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center mx-auto shadow-xs">
            <ShieldCheck className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-primary/10 text-primary border border-primary/20">
              <Award className="w-3.5 h-3.5" />
              <span>Gravit Official Academic Registry</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-normal text-foreground tracking-tight">
              Verify Official Credential
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Verify authentic course completions, academic honors, and engineering credentials issued by <strong>Gravit</strong> in partnership with <strong>ASCI Academy</strong>.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto flex flex-col sm:flex-row items-center gap-2 pt-4"
          >
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="e.g. GRV-ASCI-2026-X89F2A1B"
                value={certId}
                onChange={(e) => setCertId(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-card text-xs sm:text-sm font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-primary shadow-xs"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-primary hover:bg-primary-active text-primary-foreground text-xs sm:text-sm font-semibold transition-all shadow-xs inline-flex items-center justify-center gap-2 cursor-pointer shrink-0"
            >
              <span>Verify</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Sample Demonstration Link */}
          <div className="pt-4 flex items-center justify-center gap-2 text-xs font-mono text-muted-foreground">
            <span>Want to test?</span>
            <Link
              href="/verify/demo"
              className="text-primary hover:underline font-semibold inline-flex items-center gap-1"
            >
              View Sample Verified Credential <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Trust Highlights */}
          <div className="pt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left border-t border-hairline max-w-2xl mx-auto">
            <div className="space-y-1">
              <div className="font-mono text-xs font-semibold text-foreground flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                <span>Instant Verification</span>
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Scan QR codes or lookup unique serial IDs for live validation.
              </p>
            </div>
            <div className="space-y-1">
              <div className="font-mono text-xs font-semibold text-foreground flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                <span>Gravit Accredited</span>
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Evaluated against rigorous industry algorithmic benchmarks.
              </p>
            </div>
            <div className="space-y-1">
              <div className="font-mono text-xs font-semibold text-foreground flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                <span>Tamper Evident</span>
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Cryptographically hashed issue records preventing credential fraud.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-hairline py-6 text-center text-xs font-mono text-muted-foreground">
        <p>ASCI Academy × Gravit Systems Credential Validation Service</p>
      </footer>
    </div>
  )
}
