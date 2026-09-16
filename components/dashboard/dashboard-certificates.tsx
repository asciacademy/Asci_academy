"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { Certificate } from "@/lib/certificate-types"
import {
  generateCertificateAction,
  getUserCertificatesAction,
} from "@/app/actions/certificates"
import {
  getLocalCertificates,
  saveLocalCertificate,
} from "@/lib/certificate-store"
import { CertificateModal } from "@/components/certificate/certificate-modal"
import {
  Award,
  ExternalLink,
  Printer,
  ShieldCheck,
  CheckCircle2,
  Lock,
  PlayCircle,
  AlertCircle,
  ArrowRight,
  BookOpen,
  Zap,
} from "lucide-react"
import { EmptyCertificate3DIcon } from "@/components/icons"
import { AxelStage } from "@/components/axel/axel-stage"

interface DashboardCertificatesProps {
  userName: string
  enrollments: any[]
  onExploreCourses?: () => void
}

export function DashboardCertificates({
  userName,
  enrollments,
  onExploreCourses,
}: DashboardCertificatesProps) {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationSuccessMsg, setGenerationSuccessMsg] = useState<string | null>(null)
  const [generationErrorMsg, setGenerationErrorMsg] = useState<string | null>(null)

  // Maintain local mutable enrollments for live testing in demo mode
  const [coursesList, setCoursesList] = useState<any[]>([])

  useEffect(() => {
    setCoursesList(enrollments || [])
  }, [enrollments])

  // Load certificates from server & local storage
  useEffect(() => {
    async function load() {
      const serverCerts = await getUserCertificatesAction()
      const localCerts = getLocalCertificates()

      const map = new Map<string, Certificate>()
      serverCerts.forEach((c) => map.set(c.certificate_id, c))
      localCerts.forEach((c) => {
        if (!map.has(c.certificate_id)) {
          map.set(c.certificate_id, c)
        }
      })

      const combined = Array.from(map.values()).sort(
        (a, b) => new Date(b.issued_at).getTime() - new Date(a.issued_at).getTime()
      )
      setCertificates(combined)
    }
    load()
  }, [enrollments])

  // If redirected with ?completed=slug or ?view=certId, automatically highlight & preview
  useEffect(() => {
    if (typeof window !== "undefined" && certificates.length > 0) {
      const params = new URLSearchParams(window.location.search)
      const viewId = params.get("view")
      const completed = params.get("completed")
      const autoOpen = params.get("autoOpen")

      if (viewId) {
        const found = certificates.find((c) => c.certificate_id === viewId)
        if (found) {
          setSelectedCertificate(found)
          setModalOpen(true)
        }
      } else if (completed) {
        setGenerationSuccessMsg(
          "Curriculum 100% Completed! Your official Gravit Certificate is conferred and ready to view below."
        )
        const matchingCert = certificates.find(
          (c) => c.course_slug === completed || c.course_id === completed
        )
        if (matchingCert && autoOpen === "true") {
          setSelectedCertificate(matchingCert)
          setModalOpen(true)
        }
      }
    }
  }, [certificates])

  // Partition courses into 100% completed vs in-progress
  const completedCourses = coursesList.filter(
    (c) => (c.progressPercent ?? 0) >= 100 || c.status === "completed"
  )

  const inProgressCourses = coursesList.filter(
    (c) => (c.progressPercent ?? 0) < 100 && c.status !== "completed"
  )

  const handleClaimCertificate = async (course: any) => {
    const isCompleted = (course.progressPercent ?? 0) >= 100 || course.status === "completed"

    // STRICT CLIENT VALIDATION: Never permit claim if course is incomplete
    if (!isCompleted) {
      setGenerationErrorMsg(
        `Cannot issue certificate: You have completed ${course.progressPercent || 0}% of "${course.title}". Certificates are strictly awarded upon 100% completion of all lessons.`
      )
      setTimeout(() => setGenerationErrorMsg(null), 5000)
      return
    }

    setIsGenerating(true)
    setGenerationSuccessMsg(null)
    setGenerationErrorMsg(null)

    try {
      const res = await generateCertificateAction({
        courseId: course.courseId || course.id || "dsa-foundations",
        courseTitle: course.title || "DSA: Algorithmic Foundations",
        courseSlug: course.slug || "dsa",
        recipientName: userName,
        grade: "Mastery with Highest Distinction",
        progressPercent: 100,
        isCompleted: true,
      })

      if (res.success && res.certificate) {
        saveLocalCertificate(res.certificate)
        setCertificates((prev) => {
          const exists = prev.some((c) => c.certificate_id === res.certificate!.certificate_id)
          return exists ? prev : [res.certificate!, ...prev]
        })
        setSelectedCertificate(res.certificate)
        setModalOpen(true)
        setGenerationSuccessMsg(`Official Gravit Certificate for "${res.certificate.course_title}" conferred successfully!`)
        setTimeout(() => setGenerationSuccessMsg(null), 5000)
      } else {
        setGenerationErrorMsg(res.error || "Failed to generate certificate.")
        setTimeout(() => setGenerationErrorMsg(null), 5000)
      }
    } catch (err: any) {
      console.error("Error generating certificate:", err)
      setGenerationErrorMsg("An unexpected error occurred during certificate generation.")
    } finally {
      setIsGenerating(false)
    }
  }

  // Demo helper: Simulate finishing all remaining lessons in a course & auto-mint certificate
  const handleSimulateCompletion = async (courseId: string) => {
    const targetCourse = coursesList.find((c) => c.id === courseId || c.courseId === courseId)
    setCoursesList((prev) =>
      prev.map((c) => {
        if (c.id === courseId || c.courseId === courseId) {
          return {
            ...c,
            progressPercent: 100,
            status: "completed",
            lessonsCompleted: c.totalLessons || 30,
            completedLessons: c.totalLessons || 30,
          }
        }
        return c
      })
    )

    if (targetCourse) {
      await handleClaimCertificate({
        ...targetCourse,
        progressPercent: 100,
        status: "completed",
      })
    }
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      <section id="dashboard-certificates-header" className="rounded-2xl border border-hairline bg-card p-6 sm:p-8 shadow-xs relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20">
                <ShieldCheck className="w-3 h-3" />
                Accredited Credentials
              </span>
              <span className="text-xs font-mono text-muted-foreground">
                Gravit Engineering Partnership
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-normal text-foreground">
              Certificates of Completion
            </h1>
            <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
              Official Gravit credentials are <strong>strictly conferred upon 100% completion</strong> of a curriculum track. Enrolling in a course does not grant a certificate; every lesson, challenge, and requirement must be satisfied.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <AxelStage
              id="dashboard-certificates-robot-anchor"
              sectionId="dashboard-certificates-header"
              label="Credentials Verifier"
              emotion="proud"
              scale={0.44}
              size="sm"
            />
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="font-mono text-2xl font-bold text-amber-600 dark:text-amber-400">
                  {certificates.length}
                </div>
                <div className="text-[11px] font-mono text-muted-foreground">
                  Earned Credentials
                </div>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        {generationSuccessMsg && (
          <div className="mt-4 p-3.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-mono flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{generationSuccessMsg}</span>
          </div>
        )}

        {generationErrorMsg && (
          <div className="mt-4 p-3.5 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-xs font-mono flex items-center gap-2 animate-fadeIn">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{generationErrorMsg}</span>
          </div>
        )}
      </section>

      {/* ══════════════════════════════════════════════
          1. Issued & Verified Certificates
      ══════════════════════════════════════════════ */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground font-semibold flex items-center gap-2">
            <Award className="w-4 h-4 text-primary" />
            <span>Your Issued Certificates ({certificates.length})</span>
          </h2>
          <span className="font-mono text-[11px] text-muted-foreground">
            Cryptographically Registered
          </span>
        </div>

        {certificates.length === 0 ? (
          <div className="rounded-2xl border border-hairline p-8 sm:p-12 text-center space-y-4 bg-card/40 backdrop-blur-xs">
            <div className="flex items-center justify-center mx-auto">
              <EmptyCertificate3DIcon size="lg" className="hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-serif text-lg font-normal text-foreground">
                No Certificates Earned Yet
              </h3>
              <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
                Complete 100% of all curriculum lessons in any enrolled course below to unlock and mint your official Gravit Certificate.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certificates.map((cert) => (
              <div
                key={cert.certificate_id}
                className="rounded-2xl border border-hairline bg-card hover:border-amber-500/40 p-5 sm:p-6 flex flex-col justify-between shadow-2xs hover:shadow-xs transition-all duration-200 group relative overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-[10.5px] font-bold text-amber-700 dark:text-amber-300 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                      {cert.certificate_id}
                    </span>
                    <span className="text-[11px] font-mono text-muted-foreground">
                      {new Date(cert.issued_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-medium text-foreground group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {cert.course_title}
                  </h3>

                  <div className="mt-2.5 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                      {cert.grade || "Mastery with Highest Distinction"}
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-hairline flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedCertificate(cert)
                        setModalOpen(true)
                      }}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
                    >
                      View &amp; Print
                    </button>

                    <a
                      href={`/verify/${cert.certificate_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 rounded-xl border border-hairline hover:border-foreground/30 hover:bg-secondary text-xs font-mono font-medium text-foreground transition-colors inline-flex items-center gap-1.5"
                    >
                      <span>Public Verify</span>
                      <ExternalLink className="w-3 h-3 text-muted-foreground" />
                    </a>
                  </div>

                  <span className="font-mono text-[10px] text-muted-foreground/70 uppercase tracking-wider">
                    ASCI × Gravit
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ══════════════════════════════════════════════
          2. Fully Completed Courses (100% - Ready to Claim)
      ══════════════════════════════════════════════ */}
      <section className="space-y-4 pt-4 border-t border-hairline">
        <div>
          <h2 className="font-mono text-xs uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Completed Courses — Eligible For Credential Issuance ({completedCourses.length})</span>
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            These tracks have achieved 100% curriculum completion. Click &quot;Claim Certificate&quot; to mint your verified credential.
          </p>
        </div>

        {completedCourses.length === 0 ? (
          <div className="rounded-xl border border-hairline bg-card/40 p-6 text-center space-y-3">
            <p className="text-xs font-mono text-muted-foreground">
              {coursesList.length === 0
                ? "You have not enrolled in any courses yet. Enroll in a curriculum track to begin earning credentials."
                : "No courses are 100% completed yet. Review your courses in progress below to finish remaining lessons."}
            </p>
            {coursesList.length === 0 && (
              <Link
                href="/programs"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold shadow-xs hover:bg-primary-active transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Explore Course Catalog</span>
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {completedCourses.map((course) => {
              const courseKey = course.courseId || course.id
              const alreadyClaimed = certificates.some(
                (c) => c.course_id === courseKey
              )

              return (
                <div
                  key={courseKey}
                  className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-5 flex flex-col justify-between shadow-2xs hover:shadow-xs transition-shadow"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-[10px] font-mono text-muted-foreground uppercase">
                        {course.category || "Curriculum"}
                      </span>
                      <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-500/15 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        100% Completed
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-serif font-medium text-foreground leading-snug">
                      {course.title}
                    </h3>
                    <p className="text-[11px] font-mono text-muted-foreground mt-1.5">
                      All {course.totalLessons ?? course.lessonsCompleted ?? 0} curriculum modules completed.
                    </p>
                  </div>

                  <div className="mt-5 pt-3.5 border-t border-emerald-500/20 flex items-center justify-between">
                    {alreadyClaimed ? (
                      <span className="text-xs font-mono text-emerald-600 font-medium flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4" />
                        Certificate Conferred
                      </span>
                    ) : (
                      <button
                        onClick={() => handleClaimCertificate(course)}
                        disabled={isGenerating}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:opacity-50 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer w-full justify-center"
                      >
                        <Award className="w-3.5 h-3.5" />
                        <span>{isGenerating ? "Minting Credential..." : "Claim Gravit Certificate"}</span>
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>

      {/* ══════════════════════════════════════════════
          3. In-Progress Courses (Locked until 100% complete)
      ══════════════════════════════════════════════ */}
      {inProgressCourses.length > 0 && (
        <section className="space-y-4 pt-4 border-t border-hairline">
          <div>
            <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground font-semibold flex items-center gap-2">
              <Lock className="w-4 h-4 text-muted-foreground" />
              <span>In-Progress Curriculum Tracks (Locked Until 100% Complete)</span>
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              Certificates remain locked until every lesson is completed. Continue learning to reach 100%.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {inProgressCourses.map((course) => {
              const courseKey = course.courseId || course.id
              const percent = course.progressPercent ?? 0
              const completedLessons = course.lessonsCompleted ?? course.completedLessons ?? 0
              const total = course.totalLessons ?? 0
              const courseSlug = course.slug || "dsa"

              return (
                <div
                  key={courseKey}
                  className="rounded-xl border border-hairline bg-card/60 p-5 flex flex-col justify-between shadow-2xs hover:bg-card transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono text-muted-foreground uppercase">
                        {course.category || "In Progress"}
                      </span>
                      <span className="text-[10px] font-mono font-medium text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        {percent}% Complete
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-serif font-medium text-foreground leading-snug">
                      {course.title}
                    </h3>

                    {/* Progress Bar */}
                    <div className="mt-3 space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                        <span>{completedLessons} of {total} Lessons</span>
                        <span>{percent}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden border border-hairline">
                        <div
                          className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-500"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 pt-3.5 border-t border-hairline flex flex-col gap-2">
                    <div className="flex items-center justify-between gap-2">
                      <Link
                        href={`/courses/${courseSlug}/learn`}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg border border-hairline bg-secondary hover:bg-card text-xs font-mono text-foreground transition-colors"
                      >
                        <PlayCircle className="w-3.5 h-3.5 text-amber-500" />
                        <span>Continue Learning</span>
                      </Link>

                      <button
                        disabled
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-muted text-muted-foreground text-xs font-mono opacity-60 cursor-not-allowed"
                        title="Complete 100% of lessons to unlock"
                      >
                        <Lock className="w-3 h-3" />
                        <span>Locked</span>
                      </button>
                    </div>

                    {/* Interactive Test Button to simulate 100% completion in demo */}
                    <button
                      onClick={() => handleSimulateCompletion(courseKey)}
                      className="text-[10px] font-mono text-amber-600 dark:text-amber-400 hover:text-amber-500 transition-colors text-center cursor-pointer hover:underline flex items-center justify-center gap-1 pt-1"
                    >
                      <Zap className="w-3 h-3" />
                      <span>Simulate 100% Completion (Test Unlocking)</span>
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* Certificate Viewer Modal */}
      <CertificateModal
        certificate={selectedCertificate}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  )
}
