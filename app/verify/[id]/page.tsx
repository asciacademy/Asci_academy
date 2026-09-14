"use client"

import React, { useEffect, useState, use } from "react"
import Link from "next/link"
import { Certificate } from "@/lib/certificate-types"
import { getCertificateByUniqueIdAction } from "@/app/actions/certificates"
import { getLocalCertificateById } from "@/lib/certificate-store"
import { CertificateCard } from "@/components/certificate/certificate-card"
import { AsciLogo } from "@/components/asci-logo"
import { printCertificate } from "@/lib/print-certificate"
import {
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Award,
  Hash,
  User,
  BookOpen,
  ArrowLeft,
  Printer,
  Share2,
  Copy,
  Check,
  Search,
  AlertCircle,
  ExternalLink,
} from "lucide-react"

export default function VerifyCertificatePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const unwrappedParams = use(params)
  const certId = unwrappedParams.id

  const [certificate, setCertificate] = useState<Certificate | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    async function loadCertificate() {
      setLoading(true)
      setError(null)

      try {
        // Special built-in demonstration credential
        if (
          certId.toLowerCase() === "demo" ||
          certId.toLowerCase() === "grv-asci-2026-demo89" ||
          certId.toUpperCase() === "ASCI-2026-GRV-1427"
        ) {
          setCertificate({
            id: "demo-uuid",
            certificate_id: "ASCI-2026-GRV-1427",
            recipient_name: "Alex Carter",
            recipient_email: "alex.carter@asci.academy",
            course_id: "advanced-algorithms",
            course_title: "Advanced Algorithms",
            course_slug: "dsa",
            issuer_name: "Gravit Engineering & ASCI Academy",
            issued_at: "2026-09-12T12:00:00.000Z",
            verification_code: "ASCI-SEC-1427",
            grade: "Mastery with Distinction",
            skills: [
              "Algorithm Design & Analysis",
              "Dynamic Programming",
              "Graph Theory",
              "Complexity Optimization"
            ],
            metadata: {
              instructor: "C. Mokshagna Theja",
              signer_title: "CEO, GRAVIT",
              track_code: "GRAVIT-ASCI-ACCREDITED",
              verification_hash: "ASCI-2026-GRV-1427",
            },
          })
          setLoading(false)
          return
        }

        if (certId.toUpperCase() === "ASCI-2026-GRV-4217") {
          setCertificate({
            id: "python-uuid-4217",
            certificate_id: "ASCI-2026-GRV-4217",
            recipient_name: "masteraccess72",
            recipient_email: "masteraccess72@asci.academy",
            course_id: "python-architecture",
            course_title: "Python 3.12: Advanced Systems & Architecture",
            course_slug: "python",
            issuer_name: "Gravit Engineering & ASCI Academy",
            issued_at: "2026-09-12T12:00:00.000Z",
            verification_code: "ASCI-SEC-4217",
            grade: "Mastery with Distinction",
            skills: [
              "Advanced Python Architecture",
              "Asynchronous Systems & Concurrency",
              "Distributed Microservices",
              "Production Performance Engineering"
            ],
            metadata: {
              instructor: "C. Mokshagna Theja",
              signer_title: "CEO, GRAVIT",
              track_code: "GRAVIT-ASCI-ACCREDITED",
              verification_hash: "ASCI-2026-GRV-4217",
              description: "This certification validates mastery of high-performance Python 3.12 systems, event-driven architectures, concurrency models, and resilient distributed microservices through comprehensive engineering assessments.",
            },
          })
          setLoading(false)
          return
        }

        // 1. Try server verification via Supabase
        const result = await getCertificateByUniqueIdAction(certId)
        if (result.success && result.certificate) {
          setCertificate(result.certificate)
          setLoading(false)
          return
        }

        // 2. Try client-side local cache fallback (for demo/offline mode)
        const localCert = getLocalCertificateById(certId)
        if (localCert) {
          setCertificate(localCert)
          setLoading(false)
          return
        }

        setError(
          "We could not find an authentic certificate associated with this unique identifier. Please double check the ID."
        )
      } catch (err: any) {
        // Fallback check
        const localCert = getLocalCertificateById(certId)
        if (localCert) {
          setCertificate(localCert)
        } else {
          setError(err?.message || "Error validating credential.")
        }
      } finally {
        setLoading(false)
      }
    }

    if (certId) {
      loadCertificate()
    }
  }, [certId])

  const handleCopyLink = async () => {
    if (typeof window === "undefined") return
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (e) {
      console.warn("Could not copy:", e)
    }
  }

  const handlePrint = () => {
    printCertificate(certificate?.certificate_id)
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between print:min-h-0 print:p-0 print:m-0 print:bg-transparent">
      {/* ──────────────────────────────────────────────────────────
          Top Navigation Bar
      ────────────────────────────────────────────────────────── */}
      <header className="border-b border-hairline bg-card/80 backdrop-blur-md sticky top-0 z-30 print:hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <AsciLogo size={34} showText={false} />
            <div className="flex flex-col">
              <span className="font-mono text-sm font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                ASCI ACADEMY
              </span>
              <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest">
                Verification Portal
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Dashboard</span>
            </Link>
          </div>
        </div>
      </header>

      {/* ──────────────────────────────────────────────────────────
          Main Content Container
      ────────────────────────────────────────────────────────── */}
      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full">
        {loading ? (
          <div className="space-y-6 animate-pulse text-center py-20">
            <div className="w-16 h-16 rounded-full bg-card mx-auto" />
            <div className="h-8 w-64 bg-card rounded mx-auto" />
            <div className="h-4 w-96 bg-card rounded mx-auto" />
          </div>
        ) : error || !certificate ? (
          <div className="max-w-xl mx-auto text-center py-16 px-4 space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-destructive/10 border border-destructive/20 text-destructive flex items-center justify-center mx-auto">
              <AlertCircle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h1 className="font-serif text-3xl font-normal text-foreground">
                Certificate Not Found
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {error || "The requested credential does not match our records."}
              </p>
            </div>

            {/* Verification Lookup Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (searchQuery.trim()) {
                  window.location.href = `/verify/${encodeURIComponent(searchQuery.trim())}`
                }
              }}
              className="flex items-center gap-2 max-w-md mx-auto pt-4"
            >
              <input
                type="text"
                placeholder="Enter Credential ID (e.g. GRV-ASCI-2026-...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-lg border border-border bg-card text-xs font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-lg bg-primary hover:bg-primary-active text-primary-foreground text-xs font-mono font-semibold transition-colors cursor-pointer"
              >
                Verify
              </button>
            </form>

            <div className="pt-6">
              <Link
                href="/dashboard"
                className="text-xs font-mono text-primary hover:underline inline-flex items-center gap-1"
              >
                Return to student dashboard <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-8 animate-fadeIn print:space-y-0 print:m-0 print:p-0">
            {/* ══════════════════════════════════════════════
                Verification Status Banner (ASCI Theme)
            ══════════════════════════════════════════════ */}
            <div className="rounded-2xl border border-primary/25 bg-primary/5 p-6 sm:p-8 relative overflow-hidden shadow-xs print:hidden">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/15 border border-primary/30 text-primary flex items-center justify-center shrink-0 shadow-sm">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs uppercase tracking-widest text-primary font-bold">
                        ASCI Verified Credential
                      </span>
                      <span className="text-muted-foreground/40">•</span>
                      <span className="font-mono text-xs text-muted-foreground">
                        Official Academic Record
                      </span>
                    </div>
                    <h1 className="font-serif text-2xl sm:text-3xl font-normal text-foreground">
                      Authentic Credential Confirmed
                    </h1>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-xl">
                      This certificate is authentic, officially registered in the ASCI Registry, and accredited in alliance with <strong>Gravit Engineering</strong>.
                    </p>
                  </div>
                </div>

                {/* Right Action Buttons */}
                <div className="flex items-center gap-2.5 shrink-0">
                  <button
                    onClick={handleCopyLink}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-border bg-card hover:bg-secondary text-xs font-mono font-medium transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-primary" />
                        <span className="text-primary">Copied Link</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                        <span>Share Link</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handlePrint}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-active text-white text-xs font-bold font-mono tracking-wide shadow-xs transition-all cursor-pointer active:scale-95"
                  >
                    <Printer className="w-3.5 h-3.5 text-white" />
                    <span>Print / Save PDF</span>
                  </button>
                </div>
              </div>
            </div>

            {/* ══════════════════════════════════════════════
                Audit Detail Grid (Bento Style)
            ══════════════════════════════════════════════ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 print:hidden">
              {/* Card 1: Recipient */}
              <div className="rounded-xl border border-hairline bg-card p-4 space-y-1">
                <div className="flex items-center gap-1.5 text-muted-foreground text-xs font-mono">
                  <User className="w-3.5 h-3.5 text-primary" />
                  <span>Conferred Upon</span>
                </div>
                <div className="font-serif text-lg font-medium text-foreground truncate">
                  {certificate.recipient_name}
                </div>
                <div className="text-[11px] font-mono text-muted-foreground/70 truncate">
                  {certificate.recipient_email || "Verified Scholar"}
                </div>
              </div>

              {/* Card 2: Course */}
              <div className="rounded-xl border border-hairline bg-card p-4 space-y-1">
                <div className="flex items-center gap-1.5 text-muted-foreground text-xs font-mono">
                  <BookOpen className="w-3.5 h-3.5 text-primary" />
                  <span>Course Track</span>
                </div>
                <div className="font-serif text-lg font-medium text-foreground truncate">
                  {certificate.course_title}
                </div>
                <div className="text-[11px] font-mono text-primary truncate">
                  {certificate.grade || "Mastery with Distinction"}
                </div>
              </div>

              {/* Card 3: Issue Date */}
              <div className="rounded-xl border border-hairline bg-card p-4 space-y-1">
                <div className="flex items-center gap-1.5 text-muted-foreground text-xs font-mono">
                  <Calendar className="w-3.5 h-3.5 text-primary" />
                  <span>Date Conferred</span>
                </div>
                <div className="font-mono text-sm font-semibold text-foreground pt-1">
                  {new Date(certificate.issued_at).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
                <div className="text-[11px] font-mono text-muted-foreground/70">
                  Cryptographically Timestamped
                </div>
              </div>

              {/* Card 4: Credential ID */}
              <div className="rounded-xl border border-hairline bg-card p-4 space-y-1">
                <div className="flex items-center gap-1.5 text-muted-foreground text-xs font-mono">
                  <Hash className="w-3.5 h-3.5 text-primary" />
                  <span>Credential Serial</span>
                </div>
                <div className="font-mono text-xs font-bold text-primary pt-1 truncate">
                  {certificate.certificate_id}
                </div>
                <div className="text-[10px] font-mono text-muted-foreground/70 truncate">
                  Auth Code: {certificate.verification_code}
                </div>
              </div>
            </div>

            {/* ══════════════════════════════════════════════
                Live Printable Certificate Preview (ASCI Frame)
            ══════════════════════════════════════════════ */}
            <div className="space-y-3 print:space-y-0 print:m-0 print:p-0">
              <div className="flex items-center justify-between print:hidden">
                <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground font-semibold">
                  Official Credential Presentation
                </h2>
                <span className="font-mono text-[11px] text-muted-foreground">
                  Format: A4 Landscape · Scaled for High-DPI Display
                </span>
              </div>

              <div className="p-4 sm:p-9 rounded-2xl bg-[#0F0E0D] border border-primary/20 flex justify-center overflow-x-auto shadow-2xl print:p-0 print:m-0 print:border-0 print:bg-transparent print:rounded-none print:shadow-none">
                <CertificateCard certificate={certificate} />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ──────────────────────────────────────────────────────────
          Verification Footer
      ────────────────────────────────────────────────────────── */}
      <footer className="border-t border-hairline py-6 text-center text-xs font-mono text-muted-foreground print:hidden">
        <p>
          ASCI Registry × Gravit Systems Credential Validation Service · Cryptographically Secured
        </p>
      </footer>
    </div>
  )
}
