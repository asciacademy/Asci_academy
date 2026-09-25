"use client"

import Link from "next/link"
import { ArrowRight, Trophy, BookOpen, FolderGit2, Briefcase, Award, Play } from "lucide-react"
import { BrandIcon } from "@/components/ui/brand-icon"
import { CourseCard } from "@/components/cards/course-card"
import { CompetitionCard } from "@/components/cards/competition-card"
import { ProjectCard } from "@/components/cards/project-card"
import { OpportunityCard } from "@/components/cards/opportunity-card"
import { CertificateCard } from "@/components/cards/certificate-card"
import type { CurriculumCourse } from "@/lib/curriculum-data"
import type { EcosystemData } from "@/app/actions/unstop"

interface DiscoveryRailsProps {
  courses: CurriculumCourse[]
  ecosystem: EcosystemData
}

export function DiscoveryRails({ courses, ecosystem }: DiscoveryRailsProps) {
  // Top 4 trending courses
  const popularCourses = courses.slice(0, 4)

  // Top 3 hackathons / competitions
  const hackathons = ecosystem.hackathons.slice(0, 3)

  // Top 3 jobs / internships
  const jobs = ecosystem.jobs.slice(0, 3)

  // Guided projects
  const guidedProjects = [
    {
      id: "proj-1",
      slug: "distributed-key-value-store",
      title: "Distributed Key-Value Store with Raft",
      description: "Build a distributed, linearizable KV database from scratch with leader election and WAL replication.",
      category: "Systems",
      difficulty: "Advanced",
      estimatedHours: "20h",
      technologies: ["Go", "gRPC", "Docker", "Raft"],
      milestonesCount: 5,
      enrolledStudents: 412,
    },
    {
      id: "proj-2",
      slug: "high-throughput-api-gateway",
      title: "High-Throughput API Gateway & Rate Limiter",
      description: "Engineer a Token-Bucket distributed rate limiter in Rust and Redis handling 50k req/sec.",
      category: "Backend",
      difficulty: "Intermediate",
      estimatedHours: "14h",
      technologies: ["Rust", "Redis", "Tokio", "HTTP/2"],
      milestonesCount: 4,
      enrolledStudents: 620,
    },
    {
      id: "proj-3",
      slug: "collaborative-code-canvas",
      title: "Real-Time Collaborative Code Canvas",
      description: "Build a multi-user code execution workspace with CRDT sync, WebSockets, and Docker sandboxes.",
      category: "Full-Stack",
      difficulty: "Advanced",
      estimatedHours: "18h",
      technologies: ["TypeScript", "React", "WebSockets", "Next.js"],
      milestonesCount: 4,
      enrolledStudents: 890,
    },
  ]

  // Learning paths
  const careerPaths = [
    {
      title: "AI & ML Engineer",
      slug: "ai-engineer",
      role: "Machine Learning & LLM Systems",
      duration: "16 Weeks",
      coursesCount: 5,
      projectsCount: 4,
      badge: "Highest Demand",
      brand: "openai",
      skills: ["PyTorch", "Transformers", "CUDA", "FastAPI"],
    },
    {
      title: "Full-Stack Systems Engineer",
      slug: "full-stack-developer",
      role: "Distributed Web Architecture",
      duration: "14 Weeks",
      coursesCount: 6,
      projectsCount: 5,
      badge: "Core Role",
      brand: "react",
      skills: ["React 19", "Next.js", "TypeScript", "PostgreSQL"],
    },
    {
      title: "Backend & Distributed Systems",
      slug: "backend-engineer",
      role: "Cloud Services & Concurrency",
      duration: "12 Weeks",
      coursesCount: 4,
      projectsCount: 4,
      brand: "go",
      skills: ["Go", "Docker", "Kafka", "PostgreSQL"],
    },
    {
      title: "Low-Level Systems & C++",
      slug: "systems-engineer",
      role: "Kernel, Memory & Embedded",
      duration: "14 Weeks",
      coursesCount: 4,
      projectsCount: 3,
      brand: "cpp",
      skills: ["C++20", "Assembly", "OS Internals", "Linux"],
    },
  ]

  return (
    <div className="space-y-12 py-8 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
      {/* ────────────────────────────────────────────────────────
          3. CONTINUE LEARNING (Simple Row / Card)
      ──────────────────────────────────────────────────────── */}
      <section aria-labelledby="continue-learning-heading">
        <div className="p-4 sm:p-5 rounded-2xl border border-primary/20 bg-secondary/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <div className="w-12 h-12 rounded-xl bg-card border border-border/80 flex items-center justify-center shrink-0 shadow-2xs">
              <BrandIcon name="python" size={26} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-primary">
                  Continue Learning
                </span>
                <span className="text-xs text-muted-foreground">• Lesson 8 of 24</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-foreground truncate">
                Python Programming
              </h3>
              <p className="text-xs text-muted-foreground truncate">
                Control Flow, Functions &amp; Data Structures · 65% completed
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden md:flex flex-col items-end text-xs font-mono text-muted-foreground">
              <span>Next: Generators &amp; Iterators</span>
              <span className="text-primary font-bold">15 min</span>
            </div>
            <Link
              href="/courses/python/learn"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary-active text-xs font-semibold transition-all shadow-2xs cursor-pointer"
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              <span>Resume</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          4. POPULAR COURSES
      ──────────────────────────────────────────────────────── */}
      <section aria-labelledby="popular-courses-heading">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <BookOpen className="h-4 w-4" />
            </div>
            <div>
              <h2 id="popular-courses-heading" className="text-lg sm:text-xl font-bold text-foreground tracking-tight">
                Popular Courses
              </h2>
              <p className="text-xs text-muted-foreground">
                Structured practice with compilers and certificates
              </p>
            </div>
          </div>

          <Link
            href="/courses"
            className="group inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-active transition-colors shrink-0 font-mono"
          >
            <span>View All ({courses.length || 29})</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {popularCourses.map((c) => (
            <CourseCard
              key={c.id}
              id={c.id}
              slug={c.slug}
              title={c.title}
              description={c.description}
              category={c.category}
              level={c.level}
              duration={c.weeks}
              lessonsCount={c.lessons}
              projectsCount={c.projects}
              hasCertificate={!!c.certificate}
            />
          ))}
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          5. UPCOMING COMPETITIONS
      ──────────────────────────────────────────────────────── */}
      <section aria-labelledby="competitions-heading">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Trophy className="h-4 w-4" />
            </div>
            <div>
              <h2 id="competitions-heading" className="text-lg sm:text-xl font-bold text-foreground tracking-tight">
                Upcoming Competitions
              </h2>
              <p className="text-xs text-muted-foreground">
                National hackathons and developer challenges
              </p>
            </div>
          </div>

          <Link
            href="/competitions"
            className="group inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-active transition-colors shrink-0 font-mono"
          >
            <span>Browse All</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {hackathons.map((h) => (
            <CompetitionCard
              key={h.id}
              id={h.id}
              slug={h.id}
              title={h.title}
              organizer={h.host || "ASCI Engineering League"}
              prizePool={h.prizePool}
              teamSize={h.teamSize}
              mode={h.mode}
              deadline={h.deadline}
              skills={h.tags}
              registeredCount={h.registeredCount || 520}
              status="Open"
            />
          ))}
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          6. FEATURED PROJECTS
      ──────────────────────────────────────────────────────── */}
      <section aria-labelledby="projects-heading">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <FolderGit2 className="h-4 w-4" />
            </div>
            <div>
              <h2 id="projects-heading" className="text-lg sm:text-xl font-bold text-foreground tracking-tight">
                Featured Projects
              </h2>
              <p className="text-xs text-muted-foreground">
                Production-grade capstones with step-by-step guidance
              </p>
            </div>
          </div>

          <Link
            href="/projects"
            className="group inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-active transition-colors shrink-0 font-mono"
          >
            <span>View All Projects</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {guidedProjects.map((proj) => (
            <ProjectCard
              key={proj.id}
              id={proj.id}
              slug={proj.slug}
              title={proj.title}
              description={proj.description}
              category={proj.category}
              difficulty={proj.difficulty}
              estimatedHours={proj.estimatedHours}
              technologies={proj.technologies}
              milestonesCount={proj.milestonesCount}
              enrolledStudents={proj.enrolledStudents}
            />
          ))}
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          7. CAREER OPPORTUNITIES
      ──────────────────────────────────────────────────────── */}
      <section aria-labelledby="career-heading">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Briefcase className="h-4 w-4" />
            </div>
            <div>
              <h2 id="career-heading" className="text-lg sm:text-xl font-bold text-foreground tracking-tight">
                Career Opportunities
              </h2>
              <p className="text-xs text-muted-foreground">
                Software internships, graduate roles, and hiring sprints
              </p>
            </div>
          </div>

          <Link
            href="/career"
            className="group inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-active transition-colors shrink-0 font-mono"
          >
            <span>Explore Opportunities</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {jobs.map((job) => (
            <OpportunityCard
              key={job.id}
              id={job.id}
              title={job.title}
              company={job.company}
              location={`${job.location} • ${job.workMode}`}
              workType={job.roleType}
              salary={job.compensation}
              experience={job.experience || job.batchEligibility}
              skills={job.skills}
              deadline={job.closingInDays ? `${job.closingInDays}d left` : undefined}
              href="/career"
            />
          ))}
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          8. LEARNING PATHS
      ──────────────────────────────────────────────────────── */}
      <section aria-labelledby="learning-paths-heading">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <BrandIcon name="algorithm" size={16} />
            </div>
            <div>
              <h2 id="learning-paths-heading" className="text-lg sm:text-xl font-bold text-foreground tracking-tight">
                Learning Paths
              </h2>
              <p className="text-xs text-muted-foreground">
                Structured roadmaps to job-ready engineering roles
              </p>
            </div>
          </div>

          <Link
            href="/paths"
            className="group inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-active transition-colors shrink-0 font-mono"
          >
            <span>All Paths</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {careerPaths.map((path) => (
            <div
              key={path.slug}
              className="group flex flex-col justify-between rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/50"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-secondary border border-border/80 flex items-center justify-center">
                    <BrandIcon name={path.brand} size={18} />
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground bg-secondary px-2 py-0.5 rounded">
                    {path.duration}
                  </span>
                </div>

                <Link href={`/paths/${path.slug}`} className="block group-hover:text-primary transition-colors">
                  <h3 className="font-semibold text-foreground text-sm tracking-tight mb-1">
                    {path.title}
                  </h3>
                </Link>
                <p className="text-xs text-muted-foreground mb-3 line-clamp-1">
                  {path.role}
                </p>

                <div className="flex items-center gap-2 text-[11px] font-mono text-muted-foreground py-2 border-y border-border/60 mb-3">
                  <span>{path.coursesCount} Courses</span>
                  <span>•</span>
                  <span>{path.projectsCount} Capstones</span>
                </div>

                <div className="flex items-center gap-1 flex-wrap">
                  {path.skills.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-secondary text-muted-foreground border border-border/60"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-2 border-t border-border/60 flex justify-end">
                <Link
                  href={`/paths/${path.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-active transition-colors font-mono"
                >
                  <span>View Path →</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          9. CERTIFICATES
      ──────────────────────────────────────────────────────── */}
      <section aria-labelledby="certificates-heading">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Award className="h-4 w-4" />
            </div>
            <div>
              <h2 id="certificates-heading" className="text-lg sm:text-xl font-bold text-foreground tracking-tight">
                Certificates
              </h2>
              <p className="text-xs text-muted-foreground">
                Verifiable credentials for completed coursework and capstones
              </p>
            </div>
          </div>

          <Link
            href="/certificates"
            className="group inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-active transition-colors shrink-0 font-mono"
          >
            <span>View All</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CertificateCard
            id="cert-sample-1"
            certificateId="ASCI-PYTH-2026-908"
            title="Python Systems & Backend Engineering"
            issueDate="12 Sep 2026"
            variant="row"
          />
          <CertificateCard
            id="cert-sample-2"
            certificateId="ASCI-ALGO-2026-442"
            title="Algorithms & Asymptotic Data Structures"
            issueDate="15 Aug 2026"
            variant="row"
          />
        </div>
      </section>
    </div>
  )
}
