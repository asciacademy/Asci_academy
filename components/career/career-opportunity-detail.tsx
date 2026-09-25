"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Building2,
  MapPin,
  Calendar,
  Briefcase,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Share2,
  Bookmark,
  ShieldCheck,
  Award,
  Sparkles,
  Clock,
  Banknote,
  Send,
} from "lucide-react"
import { CompanyLogo } from "@/components/ui/brand-ecosystem"
import type { JobOpportunity } from "@/lib/unstop-store"
import { useUnstopEcosystem } from "@/lib/unstop-store"

interface CareerOpportunityDetailProps {
  job: JobOpportunity
  backHref?: string
}

export function CareerOpportunityDetail({
  job,
  backHref = "/career",
}: CareerOpportunityDetailProps) {
  const { applyForJob } = useUnstopEcosystem()
  const [applied, setApplied] = useState(job.applied || false)
  const [isApplying, setIsApplying] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [notes, setNotes] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleQuickApply = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsApplying(true)
    try {
      await applyForJob(job.id)
      setApplied(true)
      setSubmitted(true)
      setShowModal(false)
    } finally {
      setIsApplying(false)
    }
  }

  const skillsList = job.skills || ["Python", "React", "SQL"]
  const deadlineText = job.closingInDays
    ? `Apply within ${job.closingInDays} days`
    : "Apply by Oct 12"

  return (
    <div className="min-h-screen bg-background text-foreground pt-6 pb-24 lg:py-8">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href={backHref} className="hover:text-foreground transition-colors">
            {job.roleType === "Internship" ? "Internships" : "Jobs"}
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground font-semibold truncate max-w-xs">
            {job.title}
          </span>
        </nav>

        {/* ═══════════════════════════════════════════════════════════════
            DECISION INFORMATION (TOP VIEWPORT)
            - Company logo
            - Role
            - Company
            - Location
            - Job type
            - Skills
            - Deadline
            - CTA
        ═══════════════════════════════════════════════════════════════ */}
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-2xs space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div className="flex items-start gap-5">
              {/* Company Logo */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-secondary/80 border border-border flex items-center justify-center shrink-0 p-3">
                <CompanyLogo company={job.companyLogo || job.company} size={44} />
              </div>

              <div className="space-y-2 min-w-0">
                <div className="flex items-center gap-2 flex-wrap text-xs font-mono">
                  <span className="text-primary font-bold">{job.company}</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="px-2 py-0.5 rounded-full bg-secondary border border-border text-foreground font-semibold">
                    {job.roleType}
                  </span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">{job.workMode}</span>
                </div>

                {/* Role Title */}
                <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight text-foreground leading-snug">
                  {job.title}
                </h1>

                {/* Location & Compensation */}
                <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground pt-0.5 flex-wrap">
                  <span className="flex items-center gap-1 text-foreground font-medium">
                    <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                    {job.location}
                  </span>
                  <span>•</span>
                  <span className="font-bold text-primary">{job.compensation}</span>
                  <span>•</span>
                  <span>{job.experience || "0–2 Years Exp"}</span>
                </div>

                {/* Skills Line */}
                <div className="flex items-center gap-1.5 flex-wrap pt-2">
                  <span className="text-[11px] font-mono text-muted-foreground font-semibold mr-1">Skills:</span>
                  {skillsList.map((skill) => (
                    <span
                      key={skill}
                      className="text-[11px] font-mono px-2 py-0.5 rounded-lg bg-secondary text-foreground border border-border"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Decision Information CTA & Deadline */}
            <div className="shrink-0 flex flex-col items-stretch sm:items-end gap-3 border-t lg:border-t-0 pt-4 lg:pt-0">
              <div className="text-xs font-mono text-muted-foreground text-left sm:text-right">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-primary" />
                  <span>Deadline: <strong className="text-foreground">{deadlineText}</strong></span>
                </span>
              </div>

              {applied ? (
                <div className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white text-xs font-semibold shadow-xs">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Applied Successfully</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-[#EA5300] text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            DETAIL INFORMATION (BELOW DECISION INFORMATION)
            1. About Role
            2. Responsibilities
            3. Requirements
            4. Benefits
            5. Application
        ═══════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Detail Content (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* 1. About Role */}
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-3 shadow-2xs">
              <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground">
                About the Role
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {job.description ||
                  `As a ${job.title} at ${job.company}, you will work on mission-critical software systems, participate in architecture discussions, and engineer production-ready code with automated test coverage.`}
              </p>
            </div>

            {/* 2. Responsibilities */}
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-3 shadow-2xs">
              <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground">
                Responsibilities
              </h2>
              <ul className="list-disc list-inside text-xs sm:text-sm text-muted-foreground space-y-2 leading-relaxed">
                <li>Design, develop, test, deploy, and maintain customer-facing and internal engineering services.</li>
                <li>Collaborate with cross-functional product designers, managers, and system architects.</li>
                <li>Optimize system latency, database query execution times, and resource utilization.</li>
                <li>Conduct code reviews and champion rigorous software engineering and testing practices.</li>
              </ul>
            </div>

            {/* 3. Requirements */}
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-3 shadow-2xs">
              <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground">
                Requirements &amp; Qualifications
              </h2>
              <ul className="list-disc list-inside text-xs sm:text-sm text-muted-foreground space-y-2 leading-relaxed">
                {(job.requirements && job.requirements.length > 0
                  ? job.requirements
                  : [
                      "Proficiency in modern programming languages such as Python, Go, TypeScript, Java, or C++.",
                      "Firm grounding in computer science foundations: Data Structures, Algorithms, and System Design.",
                      "Experience with relational databases (PostgreSQL/MySQL) or distributed document stores.",
                      "Clear written and verbal technical communication skills.",
                    ]
                ).map((req, idx) => (
                  <li key={idx}>{req}</li>
                ))}
              </ul>
            </div>

            {/* 4. Benefits */}
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-3 shadow-2xs">
              <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground">
                Benefits &amp; Perks
              </h2>
              <ul className="list-disc list-inside text-xs sm:text-sm text-muted-foreground space-y-2 leading-relaxed">
                {(job.perks && job.perks.length > 0
                  ? job.perks
                  : [
                      "Competitive base salary with equity/ESOP incentives.",
                      "Comprehensive health, dental, and wellness insurance coverage.",
                      "Generous annual learning and conference attendance stipend.",
                      "Flexible hybrid or remote work arrangements with home-office equipment budget.",
                    ]
                ).map((perk, idx) => (
                  <li key={idx}>{perk}</li>
                ))}
              </ul>
            </div>

            {/* 5. Application Section */}
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:p-8 space-y-4 shadow-2xs">
              <div className="space-y-1">
                <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground">
                  Application Procedure
                </h2>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Applications are reviewed on a rolling basis. Direct pipeline referrals through ASCI Academy skip initial ATS keyword filters.
                </p>
              </div>

              {applied ? (
                <div className="p-4 rounded-xl bg-card border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>You have already submitted an application for this role.</span>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(true)}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-[#EA5300] text-xs font-semibold shadow-xs cursor-pointer"
                  >
                    <span>Submit ASCI Verified Application</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <Link
                    href="/dashboard?tab=resume"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-card border border-border text-foreground hover:bg-secondary text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <span>Run ATS Resume Audit First</span>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Sticky Sidebar Action Panel (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="rounded-2xl border border-border bg-card p-6 space-y-5 shadow-2xs sticky top-24">
              <div>
                <span className="text-[11px] font-mono uppercase text-muted-foreground block mb-1">
                  Compensation Package
                </span>
                <div className="text-2xl font-serif font-bold text-primary font-mono">
                  {job.compensation}
                </div>
              </div>

              {/* Fast Apply Action */}
              <div>
                {applied ? (
                  <div className="w-full text-center py-3 rounded-xl bg-emerald-600/10 text-emerald-600 border border-emerald-600/20 text-xs font-bold font-mono">
                    ✓ Application Received
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowModal(true)}
                    className="w-full py-3 rounded-xl bg-primary text-primary-foreground hover:bg-[#EA5300] text-xs font-bold transition-all shadow-xs cursor-pointer"
                  >
                    Apply Now
                  </button>
                )}
              </div>

              {/* Meta details */}
              <div className="space-y-3 pt-3 border-t border-border/60 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Company:</span>
                  <span className="font-bold text-foreground">{job.company}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Location:</span>
                  <span className="font-bold text-foreground">{job.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Work Mode:</span>
                  <span className="font-bold text-foreground">{job.workMode}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Role Type:</span>
                  <span className="font-bold text-foreground">{job.roleType}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Deadline:</span>
                  <span className="font-bold text-foreground">{deadlineText}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-border/60 text-xs text-muted-foreground flex items-center gap-1 font-mono text-[11px]">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                <span>Verified recruiter listing</span>
              </div>
            </div>
          </div>
        </div>

        {/* Apply Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <h3 className="font-serif text-lg font-bold text-foreground">
                  Apply for {job.title}
                </h3>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleQuickApply} className="space-y-4 text-xs">
                <div>
                  <label className="block text-muted-foreground font-mono mb-1">
                    Candidate Profile Note:
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Briefly state why your skills align with this engineering opening..."
                    className="w-full p-3 rounded-xl border border-border bg-secondary text-foreground text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="p-3 rounded-xl bg-secondary border border-border text-[11px] text-muted-foreground space-y-1">
                  <div className="font-semibold text-foreground">Verified ASCI Candidate Profile Attached</div>
                  <div>Your portfolio, problem-solving history, and code kata proofs will be automatically attached.</div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 rounded-xl border border-border text-foreground hover:bg-secondary cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isApplying}
                    className="px-5 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-[#EA5300] font-semibold shadow-xs cursor-pointer"
                  >
                    {isApplying ? "Submitting..." : "Confirm & Apply"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Mobile Sticky Bottom CTA */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-md border-t border-border p-3.5 px-4 pb-[calc(env(safe-area-inset-bottom)+0.875rem)] shadow-lg flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="text-[10px] font-mono text-muted-foreground truncate">
              {job.company} · {job.compensation}
            </div>
            <div className="text-xs font-semibold text-foreground truncate">
              Due {deadlineText}
            </div>
          </div>
          {applied ? (
            <div className="inline-flex items-center gap-1.5 px-4 h-11 rounded-xl bg-emerald-600 text-white text-xs font-semibold shrink-0">
              <CheckCircle2 className="h-4 w-4" />
              <span>Applied</span>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="inline-flex items-center justify-center gap-2 px-5 h-11 rounded-xl bg-primary text-primary-foreground hover:bg-[#EA5300] text-xs font-bold transition-all shadow-xs cursor-pointer shrink-0"
            >
              <span>Apply Now</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
