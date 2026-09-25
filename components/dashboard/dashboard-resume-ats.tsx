"use client"

import React, { useState } from "react"
import {
  FileText, CheckCircle2, AlertCircle, Download,
  Printer, ArrowRight, RefreshCw, Layers, Zap, ShieldCheck,
  Check, ExternalLink, Briefcase, Plus, Trash2, Sliders,
  Sparkles, X, LayoutTemplate, RotateCcw, Edit3
} from "lucide-react"
import { useAdmin } from "@/context/admin-context"
import { useUnstopEcosystem } from "@/lib/unstop-store"
import { AxelStage } from "@/components/axel/axel-stage"

const HIGH_IMPACT_SAMPLE_PROFILE = {
  fullName: "Arjun Sundaram",
  targetRole: "Full-Stack & Systems Software Engineer (Core SDE)",
  email: "arjun.sundaram@alumni.asci.edu",
  phone: "+91 98401 23456",
  githubUrl: "github.com/arjunsundaram",
  linkedinUrl: "linkedin.com/in/arjunsundaram-eng",
  summary: "Systems-focused Software Engineer with deep expertise in Go, Rust, TypeScript, and distributed architectures. Proven track record building high-throughput microservices handling 25,000+ req/sec, optimizing zero-copy serialization pipelines, and deploying fault-tolerant Kubernetes infrastructure. Strong foundation in asymptotic algorithms, concurrent data structures, and enterprise cloud operations.",
  skills: [
    "Go (Golang)",
    "Rust",
    "TypeScript",
    "React 19",
    "Next.js App Router",
    "PostgreSQL",
    "Apache Kafka",
    "Redis Caching",
    "Docker & Kubernetes",
    "gRPC & Protocol Buffers",
    "Distributed Systems",
    "System Design & Microservices",
    "CI/CD GitOps",
    "Linux Systems & eBPF"
  ],
  actionVerbsScore: 94,
  atsScore: 96,
  keywordMatchScore: 95,
  workExperience: [
    {
      company: "ASCI Cloud Infrastructure Fellow",
      role: "Distributed Systems & Platform Engineering Fellow",
      duration: "Aug 2025 – Present",
      bullets: [
        "Architected an in-memory distributed key-value cache engine in Go with Raft consensus, sustaining 35,000 IOPS under sub-millisecond p99 latency.",
        "Implemented consistent hashing with virtual nodes and automated peer discovery via gossip protocol, preventing cold-start node skew across cluster reshuffles.",
        "Engineered zero-copy byte buffers and custom binary serialization, eliminating 82% of heap allocations on critical hot paths."
      ],
    },
    {
      company: "Apex Fintech Labs",
      role: "Software Engineering Intern",
      duration: "May 2025 – Jul 2025",
      bullets: [
        "Benchmarked and refactored core trade-settlement pipeline using Kafka partitioned streams, accelerating throughput by 3.4x during peak market open volatility.",
        "Designed automated canary deployment controllers with Prometheus metric alerting, reducing incident mean-time-to-resolution (MTTR) by 45%."
      ],
    }
  ],
  projects: [
    {
      title: "RaftKV — Distributed Fault-Tolerant State Machine",
      techStack: ["Go", "Raft", "gRPC", "Prometheus"],
      bullets: [
        "Implemented full Raft consensus specification including leader election, log replication, snapshotting, and dynamic membership transitions.",
        "Passed automated Jepsen network partition fault-injection suites with zero data loss across simulated split-brain events."
      ],
    },
    {
      title: "HyperStream — Real-Time Collaborative Canvas Platform",
      techStack: ["Next.js", "TypeScript", "WebSockets", "CRDT (Yjs)", "Redis"],
      bullets: [
        "Built peer-to-peer conflict-free replicated data type (CRDT) canvas allowing 50+ concurrent users with deterministic visual sync.",
        "Engineered cursor prediction smoothing in 120 FPS canvas loop, achieving smooth rendering under 150ms synthetic packet latency."
      ],
    }
  ],
  education: {
    college: "Indian Institute of Technology (IIT)",
    degree: "B.Tech in Computer Science & Engineering",
    year: "Batch of 2026",
    cgpa: "9.2 / 10.0",
  },
  missingKeywords: ["eBPF", "Terraform", "OpenTelemetry"],
  suggestions: [
    "Phenomenal action verb density with verifiable throughput and latency benchmarks.",
    "Project tech stack matches top-tier criteria for Zerodha, Google Cloud, and Razorpay.",
    "Consider adding OpenTelemetry tracing tags in RaftKV bullets for 98+ ATS coverage."
  ]
}

import { ATSScannerSkeleton } from "@/components/skeletons"

export function DashboardResumeAts() {
  const { isAdmin } = useAdmin()
  const { atsResume, saveAtsResume, jobs, isLoaded } = useUnstopEcosystem()
  const [resumeData, setResumeData] = useState(atsResume)
  const [selectedJobId, setSelectedJobId] = useState<string>(jobs[0]?.id || "")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [activeTab, setActiveTab] = useState<"builder" | "preview">("builder")
  const [selectedTemplate, setSelectedTemplate] = useState<"stanford" | "modern" | "harvard">("stanford")
  const [newSkill, setNewSkill] = useState("")

  if (!isLoaded) {
    return <ATSScannerSkeleton />
  }

  // Dynamic Section Configuration (Editable by Admin)
  const [sectionConfig, setSectionConfig] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("asci_resume_section_config")
      if (saved) {
        try { return JSON.parse(saved) } catch (e) {}
      }
    }
    return {
      badge: "Resume & ATS",
      title: "Resume Reviewer & ATS Score",
      description: "Build an ATS-friendly engineering resume, check keyword matches for target jobs, and export a clean recruiter-ready PDF."
    }
  })

  const [showSectionModal, setShowSectionModal] = useState(false)
  const [tempSectionConfig, setTempSectionConfig] = useState(sectionConfig)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3500)
  }

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

      const updated = {
        ...resumeData,
        atsScore: Math.min(98, score),
        keywordMatchScore: keywordScore,
      }
      setResumeData(updated)
      saveAtsResume(updated)
      setIsAnalyzing(false)
      showToast("ATS Score recalculation complete!")
    }, 600)
  }

  const handleLoadSample = () => {
    setResumeData(HIGH_IMPACT_SAMPLE_PROFILE)
    saveAtsResume(HIGH_IMPACT_SAMPLE_PROFILE)
    showToast("Loaded high-impact SDE sample profile (96% ATS Score)!")
  }

  const handleSaveSectionConfig = (e: React.FormEvent) => {
    e.preventDefault()
    setSectionConfig(tempSectionConfig)
    if (typeof window !== "undefined") {
      localStorage.setItem("asci_resume_section_config", JSON.stringify(tempSectionConfig))
    }
    setShowSectionModal(false)
    showToast("Section customized successfully!")
  }

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newSkill.trim()) return
    if (!resumeData.skills.includes(newSkill.trim())) {
      const updatedSkills = [...resumeData.skills, newSkill.trim()]
      const updated = { ...resumeData, skills: updatedSkills }
      setResumeData(updated)
      saveAtsResume(updated)
      showToast(`Added skill: ${newSkill.trim()}`)
    }
    setNewSkill("")
  }

  const handleRemoveSkill = (skillToRemove: string) => {
    const updatedSkills = resumeData.skills.filter((s) => s !== skillToRemove)
    const updated = { ...resumeData, skills: updatedSkills }
    setResumeData(updated)
    saveAtsResume(updated)
  }

  const handleAddMissingKeyword = (kw: string) => {
    if (!resumeData.skills.includes(kw)) {
      const updatedSkills = [...resumeData.skills, kw]
      const updatedMissing = resumeData.missingKeywords.filter((k) => k !== kw)
      const updated = {
        ...resumeData,
        skills: updatedSkills,
        missingKeywords: updatedMissing,
        keywordMatchScore: Math.min(98, (resumeData.keywordMatchScore || 85) + 3)
      }
      setResumeData(updated)
      saveAtsResume(updated)
      showToast(`Added target keyword: ${kw}`)
    }
  }

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print()
    }
  }

  return (
    <div className="space-y-8 animate-fadeIn" id="dashboard-ats-resume-section">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-8 z-50 rounded-xl border border-primary/40 bg-card p-4 shadow-lg flex items-center gap-3 text-xs font-mono text-foreground animate-fadeIn">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div
        className="rounded-2xl border border-hairline bg-card p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative overflow-hidden"
        id="dashboard-ats-header"
      >
        <div className="space-y-2.5 max-w-2xl min-w-0">
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-mono uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 shrink-0 leading-none font-semibold">
              {sectionConfig.badge}
            </span>
            <span className="text-xs font-mono text-muted-foreground shrink-0 flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-stone-300 dark:bg-stone-700 hidden sm:inline-block" />
              <span>ATS Benchmark 2026</span>
            </span>
          </div>
          <h1 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-foreground flex items-start sm:items-center gap-2.5 leading-tight">
            <FileText className="w-6 h-6 text-primary shrink-0 mt-0.5 sm:mt-0" />
            <span className="break-words">{sectionConfig.title}</span>
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-xl">
            {sectionConfig.description}
          </p>
        </div>

        <div className="flex items-center gap-4 shrink-0 self-start sm:self-auto">
          <AxelStage
            id="dashboard-ats-robot-anchor"
            sectionId="dashboard-ats-header"
            label="Resume Advisor"
            emotion="proud"
            scale={0.44}
            size="sm"
          />
        </div>
      </div>

      {/* Admin Controls Ribbon (When Signed In as Admin) */}
      {isAdmin && (
        <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 via-emerald-900/20 to-teal-950/40 backdrop-blur-md p-4 sm:p-5 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 shadow-inner">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                  Admin Mode Active
                </span>
                <span className="inline-flex items-center rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-mono text-emerald-300">
                  ATS Standard &amp; Templates
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Customize section copy, benchmark requirements, and preview Ivy League / Tech Executive templates.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap shrink-0">
            <button
              onClick={() => {
                setTempSectionConfig(sectionConfig)
                setShowSectionModal(true)
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-emerald-500/30 bg-emerald-900/30 hover:bg-emerald-800/40 text-emerald-200 text-xs font-medium transition-all cursor-pointer"
            >
              <Sliders className="h-3.5 w-3.5" />
              <span>Customize Section</span>
            </button>
          </div>
        </div>
      )}

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
              <span className="font-sans text-3xl font-bold text-foreground">
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
              <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <Zap className="w-4 h-4 text-primary" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-sans text-3xl font-bold text-foreground">
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
                className="h-full bg-gradient-to-r from-primary via-emerald-600 to-teal-500 rounded-full transition-all duration-700"
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
              <span className="font-sans text-3xl font-bold text-foreground">
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
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline pb-3">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab("builder")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              activeTab === "builder"
                ? "bg-primary text-primary-foreground font-semibold"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            Resume Builder
          </button>
          <button
            onClick={() => setActiveTab("preview")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === "preview"
                ? "bg-primary text-primary-foreground font-semibold"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            <span>Print Preview</span>
          </button>

          {/* Template Switcher Pill */}
          <div className="flex items-center gap-1 bg-secondary/80 p-0.5 rounded-lg border border-hairline ml-1">
            <span className="text-[10px] font-mono text-muted-foreground px-1.5 flex items-center gap-1">
              <LayoutTemplate className="w-3 h-3 text-primary" />
              Template:
            </span>
            {[
              { id: "stanford", label: "Stanford SDE" },
              { id: "modern", label: "Tech Executive" },
              { id: "harvard", label: "Harvard Clean" },
            ].map((tpl) => (
              <button
                key={tpl.id}
                onClick={() => setSelectedTemplate(tpl.id as any)}
                className={`px-2 py-1 rounded text-[11px] font-medium transition-all cursor-pointer ${
                  selectedTemplate === tpl.id
                    ? "bg-card text-foreground font-semibold shadow-2xs border border-hairline"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tpl.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleLoadSample}
            className="px-3 py-1.5 rounded-lg border border-primary/30 bg-primary/10 hover:bg-primary/20 text-primary text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5"
            title="Load high-impact SDE benchmark with distributed systems projects and metrics"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Load SDE Benchmark Sample</span>
          </button>
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
              <h3 className="font-sans text-base font-bold text-foreground">Target Role &amp; Summary</h3>
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
                <h3 className="font-sans text-sm sm:text-base font-semibold text-foreground">Core Technical Skills ({resumeData.skills.length})</h3>
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
                <h3 className="font-sans text-sm sm:text-base font-semibold text-foreground">Technical Projects</h3>
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
                <Sliders className="w-4 h-4 text-primary" />
                <h3 className="font-sans text-sm sm:text-base font-semibold text-foreground">Resume Insights</h3>
              </div>
              <div className="space-y-3">
                {resumeData.suggestions.map((sug, i) => (
                  <div key={i} className="p-3 rounded-lg bg-secondary/70 border border-hairline text-xs text-muted-foreground flex items-start gap-2">
                    <AlertCircle className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
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
                    onClick={() => handleAddMissingKeyword(kw)}
                    className="text-[10px] font-mono px-2 py-1 rounded bg-primary/10 text-primary border border-primary/25 hover:bg-primary/20 transition-colors cursor-pointer flex items-center gap-1"
                    title="Click to add to skills and boost score"
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
        <div className="space-y-4">
          {/* Template Bar inside Preview */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-secondary/50 border border-hairline print:hidden">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-muted-foreground flex items-center gap-1.5">
                <LayoutTemplate className="w-3.5 h-3.5 text-primary" />
                Active Layout:
              </span>
              <span className="text-xs font-semibold text-foreground">
                {selectedTemplate === "stanford" && "Stanford SDE Standard (99.4% ATS Match)"}
                {selectedTemplate === "modern" && "Tech Executive Modern (Emerald Editorial)"}
                {selectedTemplate === "harvard" && "Harvard Clean Minimalist (Single-Column)"}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              {[
                { id: "stanford", name: "Stanford" },
                { id: "modern", name: "Modern" },
                { id: "harvard", name: "Harvard" },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTemplate(t.id as any)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    selectedTemplate === t.id
                      ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                      : "bg-card text-muted-foreground hover:text-foreground border border-hairline"
                  }`}
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>

          {/* Printable Resume Container */}
          <div
            id="printable-resume"
            className={`max-w-4xl mx-auto rounded-2xl border border-hairline bg-card p-8 sm:p-12 shadow-sm transition-all print:border-none print:shadow-none print:p-0 ${
              selectedTemplate === "stanford"
                ? "font-serif text-foreground leading-relaxed"
                : selectedTemplate === "modern"
                ? "font-sans text-foreground"
                : "font-serif text-foreground/95"
            }`}
          >
            {/* ══════════════════════════════════════════════
                TEMPLATE 1: STANFORD SDE STANDARD
            ══════════════════════════════════════════════ */}
            {selectedTemplate === "stanford" && (
              <div className="space-y-5 text-xs text-foreground/90">
                {/* Centered Stanford Header */}
                <div className="text-center pb-4 border-b-2 border-foreground/20 space-y-1">
                  <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-foreground uppercase">
                    {resumeData.fullName}
                  </h1>
                  <p className="font-mono text-xs font-semibold text-primary">
                    {resumeData.targetRole}
                  </p>
                  <p className="font-mono text-[11px] text-muted-foreground tracking-wide">
                    {resumeData.email} • {resumeData.phone} • {resumeData.githubUrl} • {resumeData.linkedinUrl}
                  </p>
                </div>

                {/* Summary */}
                <div className="space-y-1">
                  <h2 className="font-serif text-xs uppercase font-bold tracking-wider text-foreground border-b border-foreground/15 pb-0.5">
                    Professional Summary
                  </h2>
                  <p className="text-[11px] leading-relaxed text-foreground/90 pt-1">
                    {resumeData.summary}
                  </p>
                </div>

                {/* Technical Skills */}
                <div className="space-y-1">
                  <h2 className="font-serif text-xs uppercase font-bold tracking-wider text-foreground border-b border-foreground/15 pb-0.5">
                    Technical Skills
                  </h2>
                  <p className="text-[11px] font-mono leading-relaxed text-foreground/90 pt-1">
                    {resumeData.skills.join(" • ")}
                  </p>
                </div>

                {/* Work Experience */}
                <div className="space-y-3">
                  <h2 className="font-serif text-xs uppercase font-bold tracking-wider text-foreground border-b border-foreground/15 pb-0.5">
                    Work Experience &amp; Engineering Fellowships
                  </h2>
                  {resumeData.workExperience.map((w, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-foreground">{w.role} — <span className="font-normal italic">{w.company}</span></span>
                        <span className="font-mono text-[11px] text-muted-foreground">{w.duration}</span>
                      </div>
                      <ul className="list-disc list-inside text-[11px] text-foreground/85 space-y-1">
                        {w.bullets.map((b, idx) => (
                          <li key={idx} className="leading-relaxed">{b}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Engineering Projects */}
                <div className="space-y-3">
                  <h2 className="font-serif text-xs uppercase font-bold tracking-wider text-foreground border-b border-foreground/15 pb-0.5">
                    Featured Systems &amp; Capstone Projects
                  </h2>
                  {resumeData.projects.map((p, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-foreground">
                          {p.title}
                          <span className="font-mono font-normal text-[10px] text-muted-foreground ml-2">
                            [{p.techStack.join(", ")}]
                          </span>
                        </span>
                      </div>
                      <ul className="list-disc list-inside text-[11px] text-foreground/85 space-y-1">
                        {p.bullets.map((b, idx) => (
                          <li key={idx} className="leading-relaxed">{b}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Education */}
                <div className="space-y-1">
                  <h2 className="font-serif text-xs uppercase font-bold tracking-wider text-foreground border-b border-foreground/15 pb-0.5">
                    Education &amp; Credentials
                  </h2>
                  <div className="flex items-center justify-between text-xs pt-1">
                    <div>
                      <span className="font-bold text-foreground">{resumeData.education.college}</span> —{" "}
                      <span className="text-foreground/90">{resumeData.education.degree}</span>
                    </div>
                    <div className="font-mono text-[11px] text-muted-foreground">
                      {resumeData.education.year} | CGPA: {resumeData.education.cgpa}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ══════════════════════════════════════════════
                TEMPLATE 2: TECH EXECUTIVE MODERN
            ══════════════════════════════════════════════ */}
            {selectedTemplate === "modern" && (
              <div className="space-y-6 text-xs font-sans">
                {/* Modern Executive Accent Strip & Header */}
                <div className="relative pb-5 border-b border-hairline flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-[10px] uppercase tracking-wider font-semibold">
                      Verified ASCI Senior Fellow
                    </div>
                    <h1 className="font-serif text-3xl font-medium tracking-tight text-foreground">
                      {resumeData.fullName}
                    </h1>
                    <p className="text-xs font-medium text-primary">
                      {resumeData.targetRole}
                    </p>
                  </div>
                  <div className="text-xs text-muted-foreground font-mono space-y-0.5 sm:text-right text-[11px]">
                    <div>{resumeData.email}</div>
                    <div>{resumeData.phone}</div>
                    <div className="text-primary">{resumeData.githubUrl}</div>
                  </div>
                </div>

                {/* Executive Summary */}
                <div className="p-4 rounded-xl bg-secondary/40 border border-hairline space-y-1.5">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                    Executive Profile
                  </span>
                  <p className="text-xs text-foreground/90 leading-relaxed">
                    {resumeData.summary}
                  </p>
                </div>

                {/* Core Technical Stack Pills */}
                <div className="space-y-2">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-primary font-semibold block">
                    Core Technical Stack
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {resumeData.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-card border border-hairline text-xs font-mono text-foreground font-medium shadow-2xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Work Experience */}
                <div className="space-y-4">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-primary font-semibold block">
                    Engineering Experience
                  </span>
                  <div className="space-y-3">
                    {resumeData.workExperience.map((w, i) => (
                      <div key={i} className="p-4 rounded-xl bg-card border border-hairline shadow-2xs space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-foreground">{w.role} • <span className="text-primary">{w.company}</span></span>
                          <span className="font-mono text-[10px] text-muted-foreground bg-secondary px-2 py-0.5 rounded-md">
                            {w.duration}
                          </span>
                        </div>
                        <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1.5">
                          {w.bullets.map((b, idx) => (
                            <li key={idx} className="leading-relaxed">{b}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Projects */}
                <div className="space-y-4">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-primary font-semibold block">
                    Key Architectural Capstones
                  </span>
                  <div className="space-y-3">
                    {resumeData.projects.map((p, i) => (
                      <div key={i} className="p-4 rounded-xl bg-card border border-hairline shadow-2xs space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-foreground">{p.title}</span>
                          <div className="flex gap-1">
                            {p.techStack.map((tech, tIdx) => (
                              <span key={tIdx} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-secondary text-muted-foreground">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                        <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1">
                          {p.bullets.map((b, idx) => (
                            <li key={idx} className="leading-relaxed">{b}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Education */}
                <div className="pt-2 border-t border-hairline flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-foreground">{resumeData.education.college}</span>
                    <span className="text-muted-foreground ml-1.5">({resumeData.education.degree})</span>
                  </div>
                  <span className="font-mono text-[11px] text-primary font-semibold">
                    {resumeData.education.year} • CGPA {resumeData.education.cgpa}
                  </span>
                </div>
              </div>
            )}

            {/* ══════════════════════════════════════════════
                TEMPLATE 3: HARVARD CLEAN MINIMAL
            ══════════════════════════════════════════════ */}
            {selectedTemplate === "harvard" && (
              <div className="space-y-5 text-xs font-serif text-foreground/95">
                {/* Harvard Header */}
                <div className="pb-4 border-b border-foreground/30 space-y-1">
                  <div className="flex items-baseline justify-between">
                    <h1 className="text-2xl font-bold text-foreground uppercase tracking-wider">
                      {resumeData.fullName}
                    </h1>
                    <span className="text-xs font-mono text-muted-foreground">{resumeData.phone}</span>
                  </div>
                  <div className="flex items-center justify-between font-mono text-[11px] text-muted-foreground">
                    <span>{resumeData.targetRole}</span>
                    <span>{resumeData.email} | {resumeData.githubUrl}</span>
                  </div>
                </div>

                {/* Summary */}
                <div className="space-y-1">
                  <h2 className="text-[11px] font-mono uppercase tracking-widest text-foreground font-bold border-b border-foreground/20 pb-0.5">
                    Objective &amp; Summary
                  </h2>
                  <p className="text-[11px] leading-relaxed pt-1">
                    {resumeData.summary}
                  </p>
                </div>

                {/* Skills */}
                <div className="space-y-1">
                  <h2 className="text-[11px] font-mono uppercase tracking-widest text-foreground font-bold border-b border-foreground/20 pb-0.5">
                    Technical Core
                  </h2>
                  <p className="text-[11px] font-mono leading-relaxed pt-1">
                    {resumeData.skills.join(" • ")}
                  </p>
                </div>

                {/* Work Experience */}
                <div className="space-y-3">
                  <h2 className="text-[11px] font-mono uppercase tracking-widest text-foreground font-bold border-b border-foreground/20 pb-0.5">
                    Experience
                  </h2>
                  {resumeData.workExperience.map((w, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold">{w.company} — {w.role}</span>
                        <span className="font-mono text-[10px] text-muted-foreground">{w.duration}</span>
                      </div>
                      <ul className="list-disc list-inside text-[11px] text-foreground/85 space-y-0.5">
                        {w.bullets.map((b, idx) => (
                          <li key={idx}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Projects */}
                <div className="space-y-3">
                  <h2 className="text-[11px] font-mono uppercase tracking-widest text-foreground font-bold border-b border-foreground/20 pb-0.5">
                    Academic &amp; Systems Projects
                  </h2>
                  {resumeData.projects.map((p, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold">{p.title}</span>
                        <span className="font-mono text-[10px] text-muted-foreground">{p.techStack.join(", ")}</span>
                      </div>
                      <ul className="list-disc list-inside text-[11px] text-foreground/85 space-y-0.5">
                        {p.bullets.map((b, idx) => (
                          <li key={idx}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Education */}
                <div className="space-y-1">
                  <h2 className="text-[11px] font-mono uppercase tracking-widest text-foreground font-bold border-b border-foreground/20 pb-0.5">
                    Education
                  </h2>
                  <div className="flex items-center justify-between text-xs pt-1">
                    <div>
                      <span className="font-bold">{resumeData.education.college}</span>, {resumeData.education.degree}
                    </div>
                    <span className="font-mono text-[11px]">{resumeData.education.year} (CGPA: {resumeData.education.cgpa})</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════
          ADMIN MODAL: Section Customizer
      ══════════════════════════════════════════════ */}
      {showSectionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg rounded-3xl border border-hairline bg-card p-6 sm:p-7 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-hairline mb-5">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                  <Sliders className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-sans text-base sm:text-lg font-bold text-foreground">Customize Resume ATS Section</h3>
                  <p className="text-xs text-muted-foreground">Adjust section header, badge, and description.</p>
                </div>
              </div>
              <button
                onClick={() => setShowSectionModal(false)}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveSectionConfig} className="space-y-4 text-xs">
              <div>
                <label className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground block mb-1 font-medium">
                  Badge Text
                </label>
                <input
                  type="text"
                  value={tempSectionConfig.badge}
                  onChange={(e) => setTempSectionConfig({ ...tempSectionConfig, badge: e.target.value })}
                  className="w-full bg-secondary/60 border border-hairline rounded-xl px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground block mb-1 font-medium">
                  Main Title
                </label>
                <input
                  type="text"
                  value={tempSectionConfig.title}
                  onChange={(e) => setTempSectionConfig({ ...tempSectionConfig, title: e.target.value })}
                  className="w-full bg-secondary/60 border border-hairline rounded-xl px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary font-sans text-sm font-semibold"
                />
              </div>

              <div>
                <label className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground block mb-1 font-medium">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={tempSectionConfig.description}
                  onChange={(e) => setTempSectionConfig({ ...tempSectionConfig, description: e.target.value })}
                  className="w-full bg-secondary/60 border border-hairline rounded-xl p-3 text-xs text-foreground focus:outline-none focus:border-primary resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-hairline">
                <button
                  type="button"
                  onClick={() => setShowSectionModal(false)}
                  className="px-4 py-2 rounded-xl text-xs text-muted-foreground hover:bg-secondary cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold shadow-xs hover:bg-primary/90 cursor-pointer"
                >
                  Save Configuration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
