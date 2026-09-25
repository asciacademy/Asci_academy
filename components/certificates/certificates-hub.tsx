"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Award,
  ShieldCheck,
  Search,
  Download,
  CheckCircle2,
  ChevronRight,
  BookOpen,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Calendar,
} from "lucide-react"
import { CURRICULUM_COURSES } from "@/lib/curriculum-data"
import { useEnrollments } from "@/lib/user-learning-store"

export interface SimpleCertificate {
  id: string
  certificateId: string
  title: string
  courseName: string
  issueDate: string
  studentName: string
  grade?: string
  verifyUrl: string
}

export const VERIFIED_CERTIFICATES: SimpleCertificate[] = [
  {
    id: "cert-python",
    certificateId: "ASCI-PY-2026-904",
    title: "Certified Python Specialist",
    courseName: "Python Programming",
    issueDate: "September 24, 2026",
    studentName: "Alex Carter",
    grade: "Distinction (98%)",
    verifyUrl: "/verify/ASCI-PY-2026-904",
  },
  {
    id: "cert-dsa",
    certificateId: "ASCI-DSA-2026-118",
    title: "Algorithmic & Systems Architecture Mastery",
    courseName: "Data Structures & Algorithms",
    issueDate: "August 15, 2026",
    studentName: "Alex Carter",
    grade: "Excellence (96%)",
    verifyUrl: "/verify/ASCI-DSA-2026-118",
  },
  {
    id: "cert-fullstack",
    certificateId: "ASCI-FS-2026-302",
    title: "Full-Stack Web Systems Engineer",
    courseName: "Full Stack Web Development",
    issueDate: "July 10, 2026",
    studentName: "Alex Carter",
    grade: "Honors (94%)",
    verifyUrl: "/verify/ASCI-FS-2026-302",
  },
]

/**
 * Phase 15: Certificates Hub
 * 
 * Uses simple certificate previews with exact required fields:
 * - Certificate (Visual preview)
 * - Course (Course title)
 * - Date (Conferred date)
 * - Verify (Verification link)
 * - Download (PDF / Print action)
 */
export function CertificatesHub() {
  const router = useRouter()
  const { enrollments } = useEnrollments()

  const [verifyInput, setVerifyInput] = useState("")
  const [activeFilter, setActiveFilter] = useState<"earned" | "available">("earned")

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!verifyInput.trim()) return
    router.push(`/verify/${encodeURIComponent(verifyInput.trim())}`)
  }

  const handleDownload = (cert: SimpleCertificate) => {
    if (typeof window !== "undefined") {
      // Directs to verification / print view with auto-print
      const printUrl = `${cert.verifyUrl}?print=true`
      window.open(printUrl, "_blank")
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground py-8">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground font-semibold">Certificates</span>
        </nav>

        {/* Header Banner */}
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-2xl space-y-2">
              <span className="text-xs font-mono font-bold text-primary uppercase tracking-wider">
                ACADEMIC &amp; INDUSTRY CREDENTIALS
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground font-sans">
                Certificates &amp; Diplomas
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Cryptographically verifiable proof of rigorous course completion, algorithmic problem solving,
                and production systems mastery.
              </p>
            </div>

            {/* Verification Lookup Input */}
            <div className="shrink-0 w-full lg:w-80 rounded-xl border border-border bg-secondary/50 p-4 space-y-2">
              <span className="text-[11px] font-mono uppercase text-muted-foreground font-semibold block">
                Verify Any Credential
              </span>
              <form onSubmit={handleVerifySubmit} className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. ASCI-PY-2026-904"
                  value={verifyInput}
                  onChange={(e) => setVerifyInput(e.target.value)}
                  className="w-full bg-card border border-border/80 rounded-lg px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary font-mono"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary-active text-xs font-semibold shrink-0 cursor-pointer"
                >
                  Verify
                </button>
              </form>
            </div>
          </div>

          {/* Quick Filter Switch */}
          <div className="flex items-center gap-2 mt-6 pt-6 border-t border-border/60">
            <button
              onClick={() => setActiveFilter("earned")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeFilter === "earned"
                  ? "bg-primary text-primary-foreground shadow-2xs"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              Earned Diplomas ({VERIFIED_CERTIFICATES.length})
            </button>
            <button
              onClick={() => setActiveFilter("available")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeFilter === "available"
                  ? "bg-primary text-primary-foreground shadow-2xs"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              Available Credentials ({CURRICULUM_COURSES.length})
            </button>
          </div>
        </div>

        {/* ────────────────────────────────────────────────────────
            EARNED CERTIFICATES (Simple Certificate Previews)
        ──────────────────────────────────────────────────────── */}
        {activeFilter === "earned" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-foreground">
                Your Accredited Certificates
              </h2>
              <span className="text-xs font-mono text-muted-foreground">
                Showing {VERIFIED_CERTIFICATES.length} credentials
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {VERIFIED_CERTIFICATES.map((cert) => (
                <div
                  key={cert.id}
                  className="p-5 rounded-2xl border border-border/80 bg-card hover:border-primary/50 transition-all flex flex-col justify-between shadow-2xs group"
                >
                  {/* 1. Simple Certificate Preview Frame */}
                  <div className="relative aspect-[16/10] rounded-xl border border-border/80 bg-gradient-to-br from-card via-secondary/30 to-secondary/60 p-4 flex flex-col justify-between overflow-hidden shadow-inner group-hover:border-primary/40 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-md bg-primary/10 text-primary flex items-center justify-center">
                          <Award className="w-3 h-3" />
                        </div>
                        <span className="text-[9px] font-mono uppercase font-bold tracking-widest text-primary">
                          ASCI ACADEMY
                        </span>
                      </div>
                      <span className="text-[9px] font-mono text-muted-foreground font-semibold">
                        {cert.certificateId}
                      </span>
                    </div>

                    <div className="space-y-1 text-center py-2">
                      <div className="text-[8px] uppercase font-mono tracking-wider text-muted-foreground">
                        Certificate of Completion
                      </div>
                      <h4 className="font-serif font-bold text-sm text-foreground line-clamp-1">
                        {cert.title}
                      </h4>
                      <p className="text-[10px] text-muted-foreground">
                        Issued to <span className="font-semibold text-foreground">{cert.studentName}</span>
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-border/40 text-[9px] font-mono text-muted-foreground">
                      <span>{cert.issueDate}</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-0.5">
                        <CheckCircle2 className="w-2.5 h-2.5" /> Verified
                      </span>
                    </div>
                  </div>

                  {/* 2. Course Name & 3. Date */}
                  <div className="mt-4 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                        Course
                      </span>
                      <span className="text-[10px] font-mono text-muted-foreground">
                        {cert.issueDate}
                      </span>
                    </div>
                    <h3 className="font-bold text-base text-foreground line-clamp-1">
                      {cert.courseName}
                    </h3>
                  </div>

                  {/* 4. Verify & 5. Download Actions */}
                  <div className="mt-5 pt-3 border-t border-border/60 flex items-center gap-2.5">
                    <Link
                      href={cert.verifyUrl}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary-active text-xs font-semibold transition-all shadow-2xs cursor-pointer"
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Verify</span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDownload(cert)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-xl border border-border bg-secondary hover:bg-secondary/80 text-foreground text-xs font-semibold transition-all cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ────────────────────────────────────────────────────────
            AVAILABLE CREDENTIALS (Syllabus Tracks to Earn)
        ──────────────────────────────────────────────────────── */}
        {activeFilter === "available" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-foreground">
                Available Industry Credentials
              </h2>
              <span className="text-xs font-mono text-muted-foreground">
                Complete courses to earn diplomas
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {CURRICULUM_COURSES.map((course) => (
                <div
                  key={course.id}
                  className="p-5 rounded-2xl border border-border/80 bg-card hover:border-primary/40 transition-all flex flex-col justify-between gap-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-secondary text-muted-foreground">
                        {course.category}
                      </span>
                      <span className="text-xs font-mono text-primary font-bold">
                        {course.duration_hours || 24}h Study
                      </span>
                    </div>
                    <h3 className="font-bold text-base text-foreground line-clamp-1">
                      {course.certificate || `${course.title} Diploma`}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      Course: {course.title}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-border/60 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground font-mono">
                      {course.level || "Beginner"}
                    </span>
                    <Link
                      href={`/courses/${course.slug || course.id}`}
                      className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary-active font-semibold"
                    >
                      <span>Enroll to Earn</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
