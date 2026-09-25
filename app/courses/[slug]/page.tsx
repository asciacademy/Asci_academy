"use client"

import { useState, useMemo, use } from "react"
import Link from "next/link"
import {
  ChevronRight,
  ChevronDown,
  Clock,
  BookOpen,
  Award,
  Bookmark,
  CheckCircle2,
  FolderGit2,
  Play,
  ArrowRight,
  ShieldCheck,
  FileCode,
  Check,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BrandIcon } from "@/components/ui/brand-icon"
import { getCurriculumCourseBySlug, type CurriculumCourse, type CurriculumModule } from "@/lib/curriculum-data"
import { useWishlist, useEnrollments } from "@/lib/user-learning-store"
import { EnrollModal } from "@/components/enroll-modal"
import { ContextualAxelButton } from "@/components/axel/contextual-axel-button"

type CourseTab = "overview" | "curriculum" | "projects" | "certificate"

export default function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const course = getCurriculumCourseBySlug(slug)
  const { isSaved, toggle } = useWishlist()
  const { isEnrolled } = useEnrollments()

  const [activeTab, setActiveTab] = useState<CourseTab>("overview")
  const [expandedModules, setExpandedModules] = useState<Record<number, boolean>>({ 0: true })
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false)

  const title = course ? course.title : slug.replace(/-/g, " ")
  const level = course?.level || "Beginner"
  const lessonsCount = course?.lessons || 24
  const projectsCount = course?.projects || 3
  const hasCertificate = Boolean(course?.certificate)
  const duration = course?.weeks || "6 Weeks"
  const enrolled = isEnrolled(slug)
  const saved = isSaved(slug)

  // Detect tech logo
  const techBrand = useMemo(() => {
    const s = `${slug} ${title}`.toLowerCase()
    if (s.includes("python")) return "python"
    if (s.includes("react")) return "react"
    if (s.includes("javascript") || s.includes("js")) return "javascript"
    if (s.includes("typescript") || s.includes("ts")) return "typescript"
    if (s.includes("node")) return "nodejs"
    if (s.includes("next")) return "nextjs"
    if (s.includes("docker")) return "docker"
    if (s.includes("aws")) return "aws"
    if (s.includes("sql") || s.includes("postgres")) return "postgresql"
    if (s.includes("mongo")) return "mongodb"
    if (s.includes("ai") || s.includes("ml")) return "openai"
    if (s.includes("c++") || s.includes("cpp")) return "cpp"
    if (s.includes("java")) return "java"
    if (s.includes("rust")) return "rust"
    if (s.includes("go") || s.includes("golang")) return "go"
    return "algorithm"
  }, [slug, title])

  // Resolve curriculum modules
  const modules: CurriculumModule[] = useMemo(() => {
    if (course?.modules && course.modules.length > 0) {
      return course.modules
    }
    // Clean fallback modules
    return [
      {
        id: `${slug}-m1`,
        title: "Module 1: Foundations & Architecture",
        sequence_order: 1,
        description: `Core concepts, environment setup, and execution model for ${title}.`,
        lessons: [
          {
            id: `${slug}-1-1`,
            title: "1.1 Introduction & Environment Setup",
            sequence_order: 1,
            content_type: "text",
            xp_reward: 25,
            description: "Tooling, compiler setup, and core mental model.",
            content: "Setup instructions and foundation overview.",
          },
          {
            id: `${slug}-1-2`,
            title: "1.2 Syntax, Data Types & Variables",
            sequence_order: 2,
            content_type: "challenge",
            xp_reward: 50,
            description: "Primitive data types, memory representation, and scoping.",
            content: "Hands-on coding exercise.",
          },
          {
            id: `${slug}-1-3`,
            title: "1.3 Control Flow & Iterators",
            sequence_order: 3,
            content_type: "challenge",
            xp_reward: 50,
            description: "Conditionals, loops, and functional iteration patterns.",
            content: "Practice algorithms.",
          },
        ],
      },
      {
        id: `${slug}-m2`,
        title: "Module 2: Advanced Design & Concurrency",
        sequence_order: 2,
        description: "Modular architecture, concurrency primitives, and error handling.",
        lessons: [
          {
            id: `${slug}-2-1`,
            title: "2.1 Structs, Interfaces & Composition",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 75,
            description: "Writing scalable and decoupled components.",
            content: "Structural challenge.",
          },
          {
            id: `${slug}-2-2`,
            title: "2.2 Async Primitives & Memory Mechanics",
            sequence_order: 2,
            content_type: "challenge",
            xp_reward: 100,
            description: "Thread pools, non-blocking I/O, and garbage collection.",
            content: "Asynchronous pipeline exercise.",
          },
        ],
      },
      {
        id: `${slug}-m3`,
        title: "Module 3: Capstone Production Project",
        sequence_order: 3,
        description: "End-to-end implementation with unit benchmarks and certification assessment.",
        lessons: [
          {
            id: `${slug}-3-1`,
            title: "3.1 Project Specification & Deliverables",
            sequence_order: 1,
            content_type: "text",
            xp_reward: 100,
            description: "System architecture and evaluation criteria.",
            content: "Capstone walkthrough.",
          },
          {
            id: `${slug}-3-2`,
            title: "3.2 Final Certification Assessment",
            sequence_order: 2,
            content_type: "challenge",
            xp_reward: 200,
            description: "Timed benchmark verification for certificate issuance.",
            content: "Final evaluation problem.",
          },
        ],
      },
    ]
  }, [course, slug, title])

  const toggleModule = (index: number) => {
    setExpandedModules((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  const TABS = [
    { id: "overview", label: "Overview" },
    { id: "curriculum", label: "Curriculum" },
    { id: "projects", label: "Projects" },
    { id: "certificate", label: "Certificate" },
  ] as const

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 pt-6 pb-24 sm:py-8">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/courses" className="hover:text-foreground transition-colors">
              Courses
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-semibold truncate max-w-[200px]">
              {title}
            </span>
          </nav>

          {/* ==============================================================
              1. COURSE DETAIL HERO
              Technology logo | Course title | short description | metadata | CTA
          ============================================================== */}
          <div className="p-5 sm:p-6 rounded-2xl border border-border bg-card shadow-2xs space-y-4">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-5">
              <div className="flex items-start gap-4 min-w-0">
                {/* Technology Logo */}
                <div className="w-12 h-12 rounded-xl bg-secondary/80 border border-border flex items-center justify-center shrink-0 shadow-2xs">
                  <BrandIcon name={techBrand} size={28} />
                </div>

                <div className="space-y-1.5 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-primary px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20">
                      {course?.category || "Engineering"}
                    </span>
                    {hasCertificate && (
                      <span className="text-[10px] font-mono font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" /> Verified Certificate
                      </span>
                    )}
                  </div>

                  {/* Course Title */}
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-foreground">
                    {title}
                  </h1>

                  {/* Short Description */}
                  <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl leading-relaxed">
                    {course?.description || "Master core concepts through structured hands-on modules and projects."}
                  </p>
                </div>
              </div>

              {/* Action Column */}
              <div className="flex items-center md:flex-col md:items-end gap-2.5 shrink-0">
                <Link
                  href={`/courses/${slug}/learn`}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-primary hover:bg-[#EA5300] text-primary-foreground text-xs sm:text-sm font-semibold transition-all shadow-xs active:scale-[0.98]"
                >
                  <Play className="h-4 w-4 fill-current" />
                  <span>{enrolled ? "Continue Learning" : "Start Learning"}</span>
                </Link>

                <button
                  type="button"
                  onClick={() =>
                    toggle({
                      courseSlug: slug,
                      title,
                      category: course?.category,
                      level,
                      duration,
                      desc: course?.description,
                      playerUrl: `/courses/${slug}/learn`,
                    })
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border hover:bg-secondary text-foreground text-xs font-medium transition-colors cursor-pointer"
                >
                  <Bookmark className={`w-3.5 h-3.5 ${saved ? "fill-primary text-primary" : ""}`} />
                  <span>{saved ? "Saved" : "Save"}</span>
                </button>

                {/* Contextual Axel: Ask Axel "Explain this" */}
                <ContextualAxelButton context="course" topicTitle={title} variant="compact" />
              </div>
            </div>

            {/* Key Metadata Row: level · duration · lessons · certificate */}
            <div className="pt-3 border-t border-border/60 flex items-center gap-4 sm:gap-6 flex-wrap text-xs font-mono text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-foreground font-semibold">Level:</span> {level}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span className="text-foreground font-semibold">Duration:</span> {duration}
              </span>
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span className="text-foreground font-semibold">Lessons:</span> {lessonsCount} Lessons
              </span>
              <span className="flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" />
                <span className="text-foreground font-semibold">Credential:</span> {hasCertificate ? "Included" : "None"}
              </span>
            </div>
          </div>

          {/* ==============================================================
              2. CONTENT TABS
              Overview | Curriculum | Projects | Certificate
          ============================================================== */}
          <div className="space-y-4">
            {/* Tab Buttons */}
            <div className="border-b border-border flex items-center gap-2">
              {TABS.map((tab) => {
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all border-b-2 cursor-pointer ${
                      isActive
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab.label}
                  </button>
                )
              })}
            </div>

            {/* Tab 1: Overview */}
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="lg:col-span-2 space-y-5">
                  <div className="p-4 sm:p-5 rounded-xl border border-border bg-card space-y-3">
                    <h3 className="text-sm font-bold text-foreground uppercase tracking-wider font-mono text-[11px]">
                      About this Course
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {course?.description || "Engineered for computer science students and engineers preparing for production roles. Learn by writing real code with instant execution feedback and automated tests."}
                    </p>

                    <div className="pt-3 border-t border-border space-y-2">
                      <h4 className="text-xs font-semibold text-foreground">What you will learn:</h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted-foreground">
                        <li className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                          <span>Core idiomatic syntax and mental models</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                          <span>Scalable architecture &amp; concurrency</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                          <span>Hands-on capstone portfolio project</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                          <span>Automated test benchmarks &amp; validation</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Tools & Tech */}
                  {course?.tools && course.tools.length > 0 && (
                    <div className="p-4 sm:p-5 rounded-xl border border-border bg-card space-y-2">
                      <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
                        Technologies &amp; Tools Covered
                      </h3>
                      <div className="flex items-center gap-1.5 flex-wrap pt-1">
                        {course.tools.map((tool) => (
                          <span
                            key={tool}
                            className="text-xs font-mono px-2.5 py-1 rounded-md bg-secondary border border-border text-foreground"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right side summary */}
                <div className="space-y-4">
                  <div className="p-4 rounded-xl border border-border bg-card space-y-3">
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
                      Course Summary
                    </h3>
                    <div className="space-y-2 text-xs font-mono">
                      <div className="flex justify-between py-1 border-b border-border/60">
                        <span className="text-muted-foreground">Modules</span>
                        <span className="font-semibold text-foreground">{modules.length}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-border/60">
                        <span className="text-muted-foreground">Lessons</span>
                        <span className="font-semibold text-foreground">{lessonsCount}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-border/60">
                        <span className="text-muted-foreground">Capstones</span>
                        <span className="font-semibold text-foreground">{projectsCount}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-border/60">
                        <span className="text-muted-foreground">Access</span>
                        <span className="font-semibold text-primary">Full Platform Access</span>
                      </div>
                    </div>

                    <Link
                      href={`/courses/${slug}/learn`}
                      className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-primary hover:bg-[#EA5300] text-primary-foreground text-xs font-semibold transition-all shadow-xs mt-2"
                    >
                      <span>Start Learning Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Curriculum (Module 1, Module 2, Module 3 Expandable) */}
            {activeTab === "curriculum" && (
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-1">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
                    Syllabus ({modules.length} Modules · {lessonsCount} Lessons)
                  </h3>
                  <span className="text-xs text-muted-foreground font-mono">
                    Expand modules to view topics
                  </span>
                </div>

                {modules.map((mod, index) => {
                  const isExpanded = !!expandedModules[index]
                  return (
                    <div
                      key={mod.id || index}
                      className="rounded-xl border border-border bg-card overflow-hidden transition-colors"
                    >
                      {/* Module Header Button */}
                      <button
                        type="button"
                        onClick={() => toggleModule(index)}
                        className="w-full flex items-center justify-between p-3.5 sm:p-4 text-left hover:bg-secondary/40 transition-colors cursor-pointer"
                        aria-expanded={isExpanded}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-mono font-bold text-xs shrink-0">
                            {index + 1}
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-xs sm:text-sm font-semibold text-foreground truncate">
                              {mod.title}
                            </h4>
                            {mod.description && (
                              <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">
                                {mod.description}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 ml-2">
                          <span className="text-[10px] font-mono text-muted-foreground hidden sm:inline-block">
                            {mod.lessons.length} lessons
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
                              isExpanded ? "rotate-180 text-primary" : ""
                            }`}
                          />
                        </div>
                      </button>

                      {/* Expandable Module Lessons List */}
                      {isExpanded && (
                        <div className="border-t border-border/60 bg-secondary/20 p-2 sm:p-3 space-y-1">
                          {mod.lessons.map((lesson) => (
                            <Link
                              key={lesson.id}
                              href={`/courses/${slug}/learn?lesson=${lesson.id}`}
                              className="group flex items-center justify-between p-2 rounded-lg hover:bg-card border border-transparent hover:border-border transition-all text-xs"
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <FileCode className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                                <span className="font-medium text-foreground group-hover:text-primary transition-colors truncate">
                                  {lesson.title}
                                </span>
                              </div>

                              <div className="flex items-center gap-2 shrink-0 font-mono text-[10px] text-muted-foreground">
                                <span className="text-primary font-semibold">+{lesson.xp_reward} XP</span>
                                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}

            {/* Tab 3: Projects */}
            {activeTab === "projects" && (
              <div className="space-y-4">
                <div className="p-4 sm:p-5 rounded-xl border border-border bg-card space-y-3">
                  <div className="flex items-center gap-2">
                    <FolderGit2 className="w-5 h-5 text-primary" />
                    <h3 className="text-sm font-bold text-foreground">
                      Hands-on Production Capstones
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    This track includes {projectsCount} guided capstones designed to showcase production competence on your GitHub and resume.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                    <div className="p-3.5 rounded-lg border border-border bg-secondary/30 space-y-1.5">
                      <span className="text-[10px] font-mono uppercase text-primary font-bold">
                        Capstone Milestone 1
                      </span>
                      <h4 className="text-xs font-semibold text-foreground">
                        Component Architecture &amp; State Invariants
                      </h4>
                      <p className="text-[11px] text-muted-foreground">
                        Implement core operational models, error boundaries, and unit coverage.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-lg border border-border bg-secondary/30 space-y-1.5">
                      <span className="text-[10px] font-mono uppercase text-primary font-bold">
                        Capstone Milestone 2
                      </span>
                      <h4 className="text-xs font-semibold text-foreground">
                        End-to-End Benchmark &amp; Deployment
                      </h4>
                      <p className="text-[11px] text-muted-foreground">
                        Stress test with chaos conditions, automate CI pipeline, and package artifact.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 4: Certificate */}
            {activeTab === "certificate" && (
              <div className="space-y-4">
                <div className="p-5 sm:p-6 rounded-xl border border-border bg-card space-y-4 max-w-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-foreground">
                        Verifiable ASCI Engineering Certificate
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Cryptographically verifiable certificate issued upon completing all lessons and capstones.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-lg border border-dashed border-border bg-secondary/20 space-y-1 text-xs font-mono">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Certificate Title:</span>
                      <span className="font-semibold text-foreground">{title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Verification URL:</span>
                      <span className="text-primary font-semibold">asci.academy/certificates/sample</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Issuing Authority:</span>
                      <span className="text-foreground">ASCI Academy Board</span>
                    </div>
                  </div>

                  <Link
                    href={`/courses/${slug}/learn`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-[#EA5300] text-xs font-semibold transition-all shadow-xs"
                  >
                    <span>Start Course to Earn Certificate</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Sticky Bottom CTA */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-md border-t border-border p-3.5 px-4 pb-[calc(env(safe-area-inset-bottom)+0.875rem)] shadow-lg flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="text-[10px] font-mono uppercase text-primary font-bold truncate">
              {level} · {duration}
            </div>
            <div className="text-xs font-semibold text-foreground truncate">
              {title}
            </div>
          </div>
          {enrolled ? (
            <Link
              href={`/courses/${slug}/learn`}
              className="inline-flex items-center justify-center gap-2 px-5 h-11 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 text-xs font-bold transition-all shadow-xs shrink-0"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => setIsEnrollModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-5 h-11 rounded-xl bg-primary text-primary-foreground hover:bg-[#EA5300] text-xs font-bold transition-all shadow-xs cursor-pointer shrink-0"
            >
              <span>Enroll Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </main>

      <Footer />

      {/* Enroll Modal */}
      <EnrollModal
        isOpen={isEnrollModalOpen}
        onClose={() => setIsEnrollModalOpen(false)}
        courseTitle={title}
        courseSlug={slug}
        partnerName={course?.category || "ASCI Academy"}
        firstLessonHref={`/courses/${slug}/learn`}
      />
    </div>
  )
}
