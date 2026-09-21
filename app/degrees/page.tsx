"use client"

import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import {
  GraduationCap, Award, BookOpen, ArrowRight, ShieldCheck, CheckCircle2,
  TrendingUp, IndianRupee, Briefcase, Building, Star, Check
} from "lucide-react"
import { AxelStage } from "@/components/axel/axel-stage"

const CAREER_ROLES = [
  {
    role: "AI & Machine Learning Engineer",
    salary: "₹38,00,000 LPA",
    openRoles: "38,000+ Open Positions",
    demand: "Top 1% Growth in 2026",
    description: "Build practical AI applications, work with large language models, connect custom company data with RAG, and deploy intelligent software tools.",
    tracks: [
      { name: "Agentic AI Full Course 2026", slug: "agentic-ai", weeks: "10 Weeks" },
      { name: "DeepLearning.AI: Neural Networks", slug: "deep-learning-specialization", weeks: "4 Weeks" },
      { name: "Enterprise GenAI & RAG Systems", slug: "generative-ai-rag", weeks: "8 Weeks" }
    ]
  },
  {
    role: "DevOps & Cloud Engineer",
    salary: "₹34,00,000 LPA",
    openRoles: "46,000+ Open Positions",
    demand: "High Enterprise Demand",
    description: "Build Docker containers, manage cloud servers, automate deployments with CI/CD, and keep apps running fast and reliably.",
    tracks: [
      { name: "Docker & Kubernetes: Cloud-Native DevOps", slug: "docker-kubernetes-devops", weeks: "10 Weeks" },
      { name: "AWS Certified Solutions Architect", slug: "aws-cloud-solutions", weeks: "10 Weeks" },
      { name: "Go Distributed Microservices", slug: "golang-microservices", weeks: "10 Weeks" }
    ]
  },
  {
    role: "Backend & Systems Engineer",
    salary: "₹45,00,000 LPA",
    openRoles: "22,000+ Open Positions",
    demand: "High Demand Senior Role",
    description: "Design large-scale backend systems, manage high-traffic databases, build fast APIs, and learn how to handle millions of active users.",
    tracks: [
      { name: "Distributed System Design & Architecture", slug: "system-design-distributed", weeks: "12 Weeks" },
      { name: "Rust for High-Performance Systems", slug: "rust-systems-programming", weeks: "12 Weeks" },
      { name: "Java DSA Algorithmic Masterclass", slug: "java-dsa-masterclass", weeks: "12 Weeks" }
    ]
  },
  {
    role: "Full-Stack Web Developer",
    salary: "₹32,00,000 LPA",
    openRoles: "58,000+ Open Positions",
    demand: "Continuous Market Need",
    description: "Build complete web applications from interactive frontend interfaces in React and Next.js to backend databases and secure logins.",
    tracks: [
      { name: "Full-Stack TypeScript & Next.js 15", slug: "fullstack-typescript-react", weeks: "10 Weeks" },
      { name: "Modern Git & GitHub Academy", slug: "git-complete-guide", weeks: "6 Weeks" },
      { name: "CS50 Computer Science Foundations", slug: "cs50-introduction-computer-science", weeks: "12 Weeks" }
    ]
  },
  {
    role: "Cybersecurity & Security Specialist",
    salary: "₹30,00,000 LPA",
    openRoles: "28,000+ Open Positions",
    demand: "Critical Industry Need",
    description: "Find and fix security bugs in web applications, understand common cyber attacks, and protect company databases and systems.",
    tracks: [
      { name: "Ethical Hacking & Penetration Testing", slug: "ethical-hacking-pentesting", weeks: "12 Weeks" },
      { name: "CS50 Introduction to Cybersecurity", slug: "cs50-introduction-computer-science", weeks: "8 Weeks" },
      { name: "DevOps Culture & DevSecOps", slug: "devops-culture-mindset", weeks: "4 Weeks" }
    ]
  }
]

export default function DegreesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="h-[72px]" />

      {/* 1. Hero Header */}
      <section id="degrees-hero" className="relative overflow-hidden border-b border-hairline bg-card py-16 sm:py-24 scroll-mt-24">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-medium text-primary mb-6 shadow-xs">
                <GraduationCap className="h-3.5 w-3.5" />
                <span className="font-mono uppercase tracking-widest text-[11px]">Career Specializations</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-foreground leading-[1.12]">
                Engineering Roles &amp; <span className="italic">Career Paths</span>
              </h1>

              <p className="mt-6 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
                Step-by-step career tracks to prepare you for high-paying developer roles in web development, AI, cloud engineering, and cybersecurity.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-mono text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Step-by-Step Learning Roadmaps
                </span>
                <span className="text-hairline">•</span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Real Projects to Show Employers
                </span>
                <span className="text-hairline">•</span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Staff Engineer Code Teardowns
                </span>
              </div>
            </div>

            <AxelStage
              id="degrees-hero-robot-anchor"
              sectionId="degrees-hero"
              label="Career Specializations"
              emotion="cute"
              scale={0.5}
            />
          </div>
        </div>
      </section>

      {/* 2. Career Academy Pathways Grid */}
      <section id="degrees-pathways" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-12 scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-hairline/60 pb-8">
          <div className="max-w-3xl">
            <span className="text-xs font-mono uppercase tracking-widest text-primary">Target Roles</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-foreground mt-1">
              In-Demand Job Role Blueprints (2026)
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Structured 3-track credential sequences designed to take you from foundational syntax to job-ready competency.
            </p>
          </div>
          <AxelStage
            id="degrees-pathways-robot-anchor"
            sectionId="degrees-pathways"
            label="Job Role Sequences"
            emotion="happy"
            scale={0.46}
            size="sm"
          />
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {CAREER_ROLES.map((role, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-hairline bg-card p-6 sm:p-8 flex flex-col justify-between hover:border-foreground/20 transition-all shadow-sm"
            >
              <div>
                {/* Header Metrics */}
                <div className="flex flex-wrap items-end justify-between gap-3 border-b border-hairline/70 pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap text-[11px] font-mono">
                      <div className="inline-flex items-center gap-1.5 text-foreground/90">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                        </span>
                        <span className="font-semibold text-primary uppercase tracking-wider">
                          {role.demand}
                        </span>
                      </div>
                      <span className="h-3 w-px bg-hairline hidden sm:inline-block" />
                      <span className="text-muted-foreground/80 hidden sm:inline-block">
                        {role.openRoles}
                      </span>
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl font-normal text-foreground">
                      {role.role}
                    </h3>
                  </div>
                  <div className="text-left sm:text-right shrink-0">
                    <div className="flex items-baseline gap-1.5 sm:justify-end">
                      <span className="text-[10px] font-mono text-muted-foreground uppercase">Benchmark:</span>
                      <span className="font-serif text-xl sm:text-2xl font-medium text-foreground">
                        {role.salary}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground block">
                      Median Industry Compensation
                    </span>
                  </div>
                </div>

                <p className="mt-4 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {role.description}
                </p>

                {/* Recommended Certificate Sequence */}
                <div className="mt-6 space-y-2.5">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground block font-medium">
                    Required Certificate Pathway ({role.tracks.length} Tracks):
                  </span>
                  {role.tracks.map((track, tIdx) => (
                    <Link
                      key={tIdx}
                      href={`/courses/${track.slug}`}
                      className="group flex items-center justify-between rounded-xl border border-hairline bg-secondary/40 p-3 text-xs hover:bg-secondary transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-card font-mono text-[11px] font-bold text-foreground">
                          {tIdx + 1}
                        </span>
                        <span className="font-medium text-foreground group-hover:text-primary transition-colors truncate max-w-xs sm:max-w-md">
                          {track.name}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-muted-foreground shrink-0">
                        {track.weeks}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="mt-8 pt-4 border-t border-hairline/70 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {role.openRoles}
                </span>
                <Link
                  href={`/courses/${role.tracks[0].slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-foreground transition-colors"
                >
                  <span>Start Track 1</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. University Credit & Accreditation Info */}
      <section id="degrees-partners" className="border-t border-hairline bg-card/30 py-16 sm:py-24 scroll-mt-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-6 max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-hairline bg-secondary px-3.5 py-1 text-xs font-mono text-muted-foreground">
                <Building className="h-3.5 w-3.5" />
                <span>Verified Industry Competencies</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-foreground">
                Industry-recognized verification for top-tier hiring
              </h2>

              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Every specialization capstone requires peer code teardowns, automated CI test suites, and deployed infrastructure. Build verifiable proof of work that hiring managers actually value.
              </p>

              <div className="pt-2 flex justify-center lg:justify-start">
                <Link
                  href="/programs"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
                >
                  <span>Explore All 29 Engineering Tracks</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <AxelStage
              id="degrees-partners-robot-anchor"
              sectionId="degrees-partners"
              label="Academic Credit"
              emotion="normal"
              scale={0.46}
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
