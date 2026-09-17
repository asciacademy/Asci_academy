"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  X, CheckCircle2, Award, BookOpen, Code2, ArrowRight,
  Check, Shield, ExternalLink, RefreshCw, GraduationCap
} from "lucide-react"
import { enrollCourse } from "@/lib/user-learning-store"
import { enrollInCourse } from "@/app/actions/courses"

interface EnrollModalProps {
  isOpen: boolean
  onClose: () => void
  courseTitle: string
  courseSlug: string
  partnerName: string
  firstLessonHref: string
}

export function EnrollModal({
  isOpen,
  onClose,
  courseTitle,
  courseSlug,
  partnerName,
  firstLessonHref
}: EnrollModalProps) {
  const router = useRouter()
  const [selectedPlan, setSelectedPlan] = useState<"audit" | "certificate">("audit")
  const [showFinancialAid, setShowFinancialAid] = useState(false)
  const [aidSubmitted, setAidSubmitted] = useState(false)

  if (!isOpen) return null

  const handleStartLearning = () => {
    if (selectedPlan === "audit") {
      try {
        enrollCourse({
          slug: courseSlug,
          title: courseTitle,
        })
        enrollInCourse(courseSlug).catch((err) => console.warn("Background enrollment sync:", err))
      } catch (e) {
        console.warn("Client enrollment registration error:", e)
      }
      router.push(firstLessonHref)
      onClose()
    } else {
      router.push(`/pricing?course=${courseSlug}`)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-hairline bg-card shadow-2xl text-foreground"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-hairline px-6 py-4 bg-secondary/50">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/20 text-primary">
              <GraduationCap className="h-3.5 w-3.5" />
            </span>
            <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              Offered by {partnerName}
            </span>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-muted-foreground hover:bg-card hover:text-foreground transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          {!showFinancialAid ? (
            <>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-foreground leading-snug">
                Enroll in {courseTitle}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Choose the enrollment option that best aligns with your learning goals. You can upgrade to a verified certificate at any point.
              </p>

              {/* Plans Comparison */}
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {/* Option 1: Free Course Audit */}
                <div
                  onClick={() => setSelectedPlan("audit")}
                  className={`relative flex flex-col justify-between rounded-xl border p-5 cursor-pointer transition-all ${
                    selectedPlan === "audit"
                      ? "border-primary bg-primary/5 ring-2 ring-primary/20 shadow-xs"
                      : "border-hairline bg-secondary/30 hover:border-foreground/20 hover:bg-secondary/50"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-semibold uppercase tracking-wider text-primary">
                        Free Access
                      </span>
                      {selectedPlan === "audit" && (
                        <div className="h-4 w-4 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                          <Check className="h-2.5 w-2.5 stroke-[3]" />
                        </div>
                      )}
                    </div>
                    <h3 className="mt-2 text-lg font-medium text-foreground">
                      Full Course Audit
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Free lifetime access to all learning materials and coding katas.
                    </p>

                    <div className="mt-4 space-y-2 text-xs">
                      <div className="flex items-center gap-2 text-foreground/90">
                        <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                        <span>All video & textual curriculum</span>
                      </div>
                      <div className="flex items-center gap-2 text-foreground/90">
                        <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                        <span>In-browser IDE & challenges</span>
                      </div>
                      <div className="flex items-center gap-2 text-foreground/90">
                        <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                        <span>Self-paced learning schedule</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground line-through">
                        <Award className="h-3.5 w-3.5 shrink-0 opacity-40" />
                        <span>Shareable LinkedIn Certificate</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-hairline/60">
                    <span className="text-xl font-mono font-semibold text-foreground">₹0</span>
                    <span className="text-xs text-muted-foreground ml-1">Free forever</span>
                  </div>
                </div>

                {/* Option 2: Verified Professional Certificate */}
                <div
                  onClick={() => setSelectedPlan("certificate")}
                  className={`relative flex flex-col justify-between rounded-xl border p-5 cursor-pointer transition-all ${
                    selectedPlan === "certificate"
                      ? "border-blue-500 bg-gradient-to-br from-blue-500/5 via-indigo-500/5 to-transparent ring-2 ring-blue-500/20 shadow-xs"
                      : "border-hairline bg-secondary/30 hover:border-foreground/20 hover:bg-secondary/50"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 text-xs font-mono font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                        <Award className="h-3 w-3" />
                        Accredited
                      </span>
                      {selectedPlan === "certificate" && (
                        <div className="h-4 w-4 rounded-full bg-blue-600 flex items-center justify-center text-white">
                          <Check className="h-2.5 w-2.5 stroke-[3]" />
                        </div>
                      )}
                    </div>
                    <h3 className="mt-2 text-lg font-medium text-foreground">
                      Verified Certificate
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Industry credential backed by {partnerName}.
                    </p>

                    <div className="mt-4 space-y-2 text-xs">
                      <div className="flex items-center gap-2 text-foreground/90">
                        <CheckCircle2 className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                        <span>Everything in Free Audit</span>
                      </div>
                      <div className="flex items-center gap-2 text-foreground/90">
                        <CheckCircle2 className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                        <span>Verifiable LinkedIn credential</span>
                      </div>
                      <div className="flex items-center gap-2 text-foreground/90">
                        <CheckCircle2 className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                        <span>Graded capstone assessments</span>
                      </div>
                      <div className="flex items-center gap-2 text-foreground/90">
                        <CheckCircle2 className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                        <span>Instructor & peer code review</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-hairline/60">
                    <span className="text-xl font-mono font-semibold text-foreground">₹3,999</span>
                    <span className="text-xs text-muted-foreground ml-1">or ASCI Plus</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  onClick={() => setShowFinancialAid(true)}
                  className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-4 cursor-pointer"
                >
                  Financial Aid available?
                </button>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={onClose}
                    className="flex-1 sm:flex-none rounded-xl border border-hairline px-4 py-2.5 text-xs font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleStartLearning}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-700 hover:via-indigo-700 hover:to-blue-600 px-6 py-2.5 text-xs font-semibold text-white transition-all shadow-md shadow-blue-500/20 cursor-pointer"
                  >
                    <span>
                      {selectedPlan === "audit" ? "Start Free (Launch Lesson 1.1)" : "Proceed to Certificate"}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            /* Financial Aid Form */
            <div className="py-2">
              <h3 className="font-serif text-xl font-normal text-foreground">
                ASCI Financial Aid Application
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                We believe top-tier engineering education should be accessible to everyone worldwide.
              </p>

              {aidSubmitted ? (
                <div className="mt-6 rounded-xl border border-primary/30 bg-primary/10 p-6 text-center">
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h4 className="mt-3 text-base font-medium text-foreground">Application Received</h4>
                  <p className="mt-1 text-xs text-muted-foreground max-w-md mx-auto">
                    Your financial aid request for {courseTitle} has been granted automatically! You can begin immediately with full audit access.
                  </p>
                  <button
                    onClick={handleStartLearning}
                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors cursor-pointer"
                  >
                    <span>Launch Lesson 1.1 Now</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    setAidSubmitted(true)
                  }}
                  className="mt-6 space-y-4 text-xs"
                >
                  <div>
                    <label className="block font-medium text-foreground mb-1">Educational Background</label>
                    <select className="w-full rounded-lg border border-hairline bg-secondary px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-primary">
                      <option>College / University Student</option>
                      <option>Self-Taught Developer</option>
                      <option>Career Transitioner</option>
                      <option>High School / Secondary</option>
                      <option>Employed Software Engineer</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-medium text-foreground mb-1">Annual Income (INR / ₹)</label>
                    <input
                      type="number"
                      placeholder="e.g. 0 or 300000"
                      required
                      className="w-full rounded-lg border border-hairline bg-secondary px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-foreground mb-1">Why are you applying for financial aid?</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Share your goals and how this specialization will impact your engineering career..."
                      className="w-full rounded-lg border border-hairline bg-secondary px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setShowFinancialAid(false)}
                      className="text-muted-foreground hover:text-foreground cursor-pointer"
                    >
                      Back to options
                    </button>
                    <button
                      type="submit"
                      className="rounded-xl bg-primary px-5 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors cursor-pointer"
                    >
                      Submit Application
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
