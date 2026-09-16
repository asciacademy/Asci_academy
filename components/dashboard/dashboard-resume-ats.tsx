"use client"

import React, { useState } from "react"
import {
  FileText, CheckCircle2, AlertCircle, Download,
  Printer, ArrowRight, RefreshCw, Layers, Zap, ShieldCheck,
  Check, ExternalLink, Briefcase, Plus, Trash2, Sliders
} from "lucide-react"
import { useUnstopEcosystem } from "@/lib/unstop-store"
import { AxelStage } from "@/components/axel/axel-stage"

export function DashboardResumeAts() {
  const { atsResume, saveAtsResume, jobs } = useUnstopEcosystem()
  const [resumeData, setResumeData] = useState(atsResume)
  const [selectedJobId, setSelectedJobId] = useState<string>(jobs[0]?.id || "")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [activeTab, setActiveTab] = useState<"builder" | "preview">("builder")
  const [newSkill, setNewSkill] = useState("")

  const selectedJob = jobs.find((j) => j.id === selectedJobId) || jobs[0]

  // Recompute score based on content length, action verbs, and matched job skills
  const computeAtsScore = () => {
    setIsAnalyzing(true)
    setTimeout(() => {
      let score = 50
      if (resumeData.skills.length >= 8) score += 15
      if (resumeData.projects.length >= 2) score += 15
      if (resumeData.workExperience.length >= 1) score += 10
      if (resumeData.summary.length > 80) score += 10

      // Match skills against selected job
      const jobSkills = selectedJob?.skills || []
      const matched = jobSkills.filter((s) =>
        resumeData.skills.some((sk) => sk.toLowerCase().includes(s.toLowerCase()))
      )
      const keywordScore = Math.round((matched.length / Math.max(1, jobSkills.length)) * 100)

      saveAtsResume({
        ...resumeData,
        atsScore: Math.min(98, score),
        keywordMatchScore: keywordScore,
      })
      setIsAnalyzing(false)
    }, 600)
  }

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newSkill.trim()) return
    if (!resumeData.skills.includes(newSkill.trim())) {
      const updatedSkills = [...resumeData.skills, newSkill.trim()]
      setResumeData({ ...resumeData, skills: updatedSkills })
      saveAtsResume({ skills: updatedSkills })
    }
    setNewSkill("")
  }

  const handleRemoveSkill = (skillToRemove: string) => {
    const updated = resumeData.skills.filter((s) => s !== skillToRemove)
    setResumeData({ ...resumeData, skills: updated })
    saveAtsResume({ skills: updated })
  }

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print()
    }
  }

  return (
    <div className="space-y-8 animate-fadeIn" id="dashboard-ats-resume-section">
      {/* Header Banner */}
      <div
        className="rounded-2xl border border-hairline bg-card p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative overflow-hidden"
        id="dashboard-ats-header"
      >
        <div className="space-y-2.5 max-w-2xl min-w-0">
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            <span className="badge-coral text-[10px] sm:text-[11px] shrink-0 leading-none font-semibold">Unstop Career Suite</span>
            <span className="text-xs font-mono text-muted-foreground shrink-0 flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-stone-300 dark:bg-stone-700 hidden sm:inline-block" />
              <span>ATS Benchmark 2026</span>
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-normal text-foreground flex items-start sm:items-center gap-2.5 leading-tight">
            <FileText className="w-6 h-6 text-primary shrink-0 mt-0.5 sm:mt-0" />
            <span className="break-words">ATS Resume Architect &amp; Job Match Evaluator</span>
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-xl">
            Format your engineering CV according to top tier tech standards (Google, Zerodha, Razorpay).
            Evaluate keyword density, action verb metrics, and export recruiter-ready editorial resumes.
          </p>
        </div>

        <div className="flex items-center gap-4 shrink-0 self-start sm:self-auto">
          <AxelStage
            id="dashboard-ats-robot-anchor"
            sectionId="dashboard-ats-header"
            label="Resume Architect"
            emotion="proud"
            scale={0.44}
            size="sm"
          />
        </div>
      </div>

      {/* Top ATS Score Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total ATS Score */}
        <div className="rounded-xl border border-hairline bg-card p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
                Overall ATS Score
              </span>
              <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-3xl font-normal text-foreground">
                {resumeData.atsScore}
              </span>
              <span className="text-xs font-mono text-muted-foreground">/ 100</span>
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">
              {resumeData.atsScore >= 85
                ? "Excellent ATS pass rate. Passes 98% of recruiter automated parsers."
                : "Good baseline. Add 2 more high-concurrency action verbs to cross 90."}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-hairline">
            <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-700"
                style={{ width: `${resumeData.atsScore}%` }}
              />
            </div>
          </div>
        </div>

        {/* Action Verbs Score */}
        <div className="rounded-xl border border-hairline bg-card p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
                Quantified Impact Rating
              </span>
              <div className="w-7 h-7 rounded-lg bg-[#ea580c]/10 text-[#ea580c] flex items-center justify-center">
                <Zap className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-3xl font-normal text-foreground">
                {resumeData.actionVerbsScore}%
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">
              Measures usage of strong verbs (e.g. *Architected*, *Benchmarked*, *Optimized*) with numerical benchmarks.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-hairline">
            <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-[#ea580c] rounded-full transition-all duration-700"
                style={{ width: `${resumeData.actionVerbsScore}%` }}
              />
            </div>
          </div>
        </div>

        {/* Job Keyword Match Evaluator */}
        <div className="rounded-xl border border-hairline bg-card p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
                Job Skill Match
              </span>
              <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <Briefcase className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-3xl font-normal text-foreground">
                {resumeData.keywordMatchScore || 86}%
              </span>
              <span className="text-xs text-muted-foreground">with {selectedJob?.company}</span>
            </div>
            <p className="text-[11px] text-muted-foreground mt-1 truncate">
              Comparing against: <span className="font-medium text-foreground">{selectedJob?.title}</span>
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-hairline flex items-center justify-between">
            <select
              value={selectedJobId}
              onChange={(e) => {
                setSelectedJobId(e.target.value)
                computeAtsScore()
              }}
              className="bg-secondary text-xs border border-hairline rounded px-2 py-1 text-foreground focus:outline-none focus:border-primary"
            >
              {jobs.map((j) => (
                <option key={j.id} value={j.id}>
                  {j.company} · {j.title}
                </option>
              ))}
            </select>
            <button
              onClick={computeAtsScore}
              disabled={isAnalyzing}
              className="text-xs text-primary hover:underline font-mono flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className={`w-3 h-3 ${isAnalyzing ? "animate-spin" : ""}`} />
              <span>Recalculate</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mode Switcher */}
      <div className="flex items-center justify-between border-b border-hairline pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("builder")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              activeTab === "builder"
                ? "bg-primary text-primary-foreground font-semibold"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            ATS Resume Builder &amp; Optimizer
          </button>
          <button
            onClick={() => setActiveTab("preview")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === "preview"
                ? "bg-primary text-primary-foreground font-semibold"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            <span>Recruiter Print Preview</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="btn-primary text-xs px-3.5 py-1.5 cursor-pointer inline-flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* BUILDER TAB */}
      {activeTab === "builder" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Form (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Target Role & Summary */}
            <div className="rounded-xl border border-hairline bg-card p-5 space-y-4">
              <h3 className="font-serif text-base font-normal text-foreground">Target Role &amp; Executive Summary</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-mono text-muted-foreground block mb-1">Target Engineering Role</label>
                  <input
                    type="text"
                    value={resumeData.targetRole}
                    onChange={(e) => {
                      const updated = { ...resumeData, targetRole: e.target.value }
                      setResumeData(updated)
                      saveAtsResume(updated)
                    }}
                    className="w-full bg-secondary border border-hairline rounded-lg px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-muted-foreground block mb-1">
                    Professional Summary (ATS High-Impact Pitch)
                  </label>
                  <textarea
                    rows={3}
                    value={resumeData.summary}
                    onChange={(e) => {
                      const updated = { ...resumeData, summary: e.target.value }
                      setResumeData(updated)
                      saveAtsResume(updated)
                    }}
                    className="w-full bg-secondary border border-hairline rounded-lg p-3 text-xs text-foreground focus:outline-none focus:border-primary leading-relaxed"
                  />
                </div>
              </div>
            </div>

            {/* Core Skills Chip Arena */}
            <div className="rounded-xl border border-hairline bg-card p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-base font-normal text-foreground">Core Technical Skills ({resumeData.skills.length})</h3>
                <span className="text-[11px] font-mono text-muted-foreground">Scanned by ATS filters</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-secondary border border-hairline text-xs font-mono text-foreground group"
                  >
                    <span>{skill}</span>
                    <button
                      onClick={() => handleRemoveSkill(skill)}
                      className="text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <form onSubmit={handleAddSkill} className="flex gap-2 pt-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add skill (e.g. Redis, Kafka, WebSockets)..."
                  className="flex-1 bg-secondary border border-hairline rounded-lg px-3 py-1.5 text-xs text-foreground focus:outline-none focus:border-primary"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold cursor-pointer"
                >
                  Add Skill
                </button>
              </form>
            </div>

            {/* Key Technical Projects */}
            <div className="rounded-xl border border-hairline bg-card p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-base font-normal text-foreground">Featured Technical Projects</h3>
                <span className="text-[11px] font-mono text-muted-foreground">Must contain quantifiable metrics</span>
              </div>
              <div className="space-y-4">
                {resumeData.projects.map((proj, idx) => (
                  <div key={idx} className="p-4 rounded-lg bg-secondary/60 border border-hairline space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-xs text-foreground">{proj.title}</div>
                      <div className="flex gap-1">
                        {proj.techStack.map((tech, i) => (
                          <span key={i} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-card border border-hairline text-muted-foreground">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1">
                      {proj.bullets.map((b, bIdx) => (
                        <li key={bIdx} className="leading-relaxed">{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ATS Feedback & Optimization Sidebar (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Recommendations */}
            <div className="rounded-xl border border-hairline bg-card p-5 space-y-4">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#ea580c]" />
                <h3 className="font-serif text-base font-normal text-foreground">ATS Optimization Insights</h3>
              </div>
              <div className="space-y-3">
                {resumeData.suggestions.map((sug, i) => (
                  <div key={i} className="p-3 rounded-lg bg-secondary/70 border border-hairline text-xs text-muted-foreground flex items-start gap-2">
                    <AlertCircle className="w-3.5 h-3.5 text-[#ea580c] shrink-0 mt-0.5" />
                    <span className="leading-snug">{sug}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Missing Keywords for Target Role */}
            <div className="rounded-xl border border-hairline bg-card p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-foreground">Missing Target Keywords</span>
                <span className="text-[10px] font-mono text-muted-foreground">High Recruiter Weight</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Incorporate these keywords into your experience bullets to increase automated screening score:
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {resumeData.missingKeywords.map((kw, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (!resumeData.skills.includes(kw)) {
                        const updated = [...resumeData.skills, kw]
                        setResumeData({ ...resumeData, skills: updated })
                        saveAtsResume({ skills: updated })
                      }
                    }}
                    className="text-[10px] font-mono px-2 py-1 rounded bg-[#ea580c]/10 text-[#ea580c] border border-[#ea580c]/30 hover:bg-[#ea580c]/20 transition-colors cursor-pointer flex items-center gap-1"
                    title="Click to add to skills"
                  >
                    <span>+ {kw}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PREVIEW / PRINT TAB */}
      {activeTab === "preview" && (
        <div className="max-w-4xl mx-auto rounded-2xl border border-hairline bg-card p-8 sm:p-12 shadow-sm space-y-6 print:border-none print:shadow-none print:p-0">
          {/* Resume Header */}
          <div className="border-b border-hairline pb-6 space-y-2 text-center sm:text-left sm:flex sm:items-center sm:justify-between">
            <div>
              <h1 className="font-serif text-3xl font-normal text-foreground tracking-tight">
                {resumeData.fullName}
              </h1>
              <p className="text-xs font-mono text-primary mt-1">
                {resumeData.targetRole}
              </p>
            </div>
            <div className="text-xs text-muted-foreground space-y-0.5 sm:text-right font-mono text-[11px] pt-2 sm:pt-0">
              <div>{resumeData.email} · {resumeData.phone}</div>
              <div>{resumeData.githubUrl} · {resumeData.linkedinUrl}</div>
            </div>
          </div>

          {/* Summary */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono uppercase tracking-widest text-primary font-semibold border-b border-hairline pb-1">
              Executive Summary
            </h2>
            <p className="text-xs text-foreground/90 leading-relaxed">
              {resumeData.summary}
            </p>
          </div>

          {/* Technical Skills */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono uppercase tracking-widest text-primary font-semibold border-b border-hairline pb-1">
              Technical Core
            </h2>
            <p className="text-xs text-foreground/90 leading-relaxed font-mono">
              {resumeData.skills.join(" • ")}
            </p>
          </div>

          {/* Work Experience */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-widest text-primary font-semibold border-b border-hairline pb-1">
              Experience &amp; Fellowships
            </h2>
            {resumeData.workExperience.map((w, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-foreground">{w.role} — {w.company}</span>
                  <span className="font-mono text-muted-foreground text-[11px]">{w.duration}</span>
                </div>
                <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1">
                  {w.bullets.map((b, idx) => (
                    <li key={idx}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Projects */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-widest text-primary font-semibold border-b border-hairline pb-1">
              Engineering Projects
            </h2>
            {resumeData.projects.map((p, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-foreground">{p.title}</span>
                  <span className="font-mono text-muted-foreground text-[11px]">
                    {p.techStack.join(", ")}
                  </span>
                </div>
                <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1">
                  {p.bullets.map((b, idx) => (
                    <li key={idx}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono uppercase tracking-widest text-primary font-semibold border-b border-hairline pb-1">
              Education
            </h2>
            <div className="flex items-center justify-between text-xs">
              <div>
                <div className="font-medium text-foreground">{resumeData.education.college}</div>
                <div className="text-muted-foreground">{resumeData.education.degree}</div>
              </div>
              <div className="text-right font-mono text-[11px] text-muted-foreground">
                <div>{resumeData.education.year}</div>
                <div>CGPA: {resumeData.education.cgpa}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
