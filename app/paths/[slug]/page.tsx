import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import {
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  Award,
  Clock,
  ArrowDown,
  BookOpen,
  FolderGit2,
  Code2,
  Play,
  Compass,
  Sparkles,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BrandLogo, TechnologyIcon } from "@/components/ui/brand-ecosystem"
import { getLearningPathBySlug, LEARNING_PATHS } from "@/lib/learning-paths-data"

interface PathPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PathPageProps): Promise<Metadata> {
  const { slug } = await params
  const path = getLearningPathBySlug(slug)

  if (!path) {
    return {
      title: "Learning Path Not Found | ASCI Academy",
    }
  }

  return {
    title: `${path.title} Learning Path | ASCI Academy`,
    description: path.description,
  }
}

export default async function LearningPathDetailPage({ params }: PathPageProps) {
  const { slug } = await params
  const path = getLearningPathBySlug(slug)

  if (!path) {
    notFound()
  }

  // Determine current active milestone and next milestone
  const currentMilestoneIndex = path.milestones.findIndex(
    (m) => m.status === "current"
  )
  const activeMilestone =
    currentMilestoneIndex >= 0 ? path.milestones[currentMilestoneIndex] : path.milestones[0]
  const nextMilestone =
    currentMilestoneIndex >= 0 && currentMilestoneIndex + 1 < path.milestones.length
      ? path.milestones[currentMilestoneIndex + 1]
      : null

  const completedCount = path.milestones.filter((m) => m.status === "completed").length
  const progressPercent = Math.round((completedCount / path.milestones.length) * 100)

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />

      <main className="flex-1 max-w-[960px] w-full mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-16 space-y-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/paths" className="hover:text-foreground transition-colors">
            Learning Paths
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground font-semibold">{path.title}</span>
        </nav>

        {/* HERO */}
        <div className="p-6 sm:p-8 rounded-2xl border border-border bg-card shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-secondary/80 border border-border/80 flex items-center justify-center shrink-0">
                <BrandLogo name={path.brand} size={36} />
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-primary">
                    {path.difficulty}
                  </span>
                  <span className="text-xs text-muted-foreground">• {path.duration}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-normal text-foreground tracking-tight">
                  {path.title}
                </h1>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-xl">
                  {path.description}
                </p>
              </div>
            </div>

            <Link
              href="/courses"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-[#EA5300] text-xs sm:text-sm font-semibold transition-all shadow-xs shrink-0 cursor-pointer self-start sm:self-auto"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Continue Path</span>
            </Link>
          </div>

          {/* Important Metadata Strip */}
          <div className="pt-4 border-t border-border grid grid-cols-2 sm:grid-cols-4 gap-4 text-center sm:text-left">
            <div>
              <div className="text-base sm:text-lg font-bold text-foreground font-mono">{path.coursesCount} Courses</div>
              <div className="text-xs text-muted-foreground">Structured Curricula</div>
            </div>
            <div>
              <div className="text-base sm:text-lg font-bold text-foreground font-mono">{path.projectsCount} Projects</div>
              <div className="text-xs text-muted-foreground">Production Capstones</div>
            </div>
            <div>
              <div className="text-base sm:text-lg font-bold text-foreground font-mono">{path.challengesCount} Challenges</div>
              <div className="text-xs text-muted-foreground">Coding Katas</div>
            </div>
            <div>
              <div className="text-base sm:text-lg font-bold text-primary font-mono">Certificate</div>
              <div className="text-xs text-muted-foreground">Accredited Credential</div>
            </div>
          </div>
        </div>

        {/* WHERE AM I? / WHAT COMES NEXT? (Clean Progress Box) */}
        <div className="p-5 sm:p-6 rounded-2xl border border-primary/20 bg-primary/5 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-primary">
                Active Progress Tracking
              </h2>
            </div>
            <div className="text-xs font-mono text-muted-foreground">
              {completedCount} of {path.milestones.length} Stages Completed ({progressPercent}%)
            </div>
          </div>

          {/* Simple progress bar */}
          <div className="w-full h-2 rounded-full bg-secondary overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${Math.max(progressPercent, 16)}%` }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            {/* WHERE AM I? */}
            <div className="p-3.5 rounded-xl border border-border bg-card">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                WHERE AM I?
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-foreground">
                  Stage {activeMilestone.step}: {activeMilestone.title}
                </span>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                  In Progress
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1 truncate">
                {activeMilestone.skills}
              </p>
            </div>

            {/* WHAT COMES NEXT? */}
            <div className="p-3.5 rounded-xl border border-border bg-card">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                WHAT COMES NEXT?
              </span>
              {nextMilestone ? (
                <>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-foreground">
                      Stage {nextMilestone.step}: {nextMilestone.title}
                    </span>
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-secondary text-muted-foreground border border-border">
                      Next Up
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 truncate">
                    {nextMilestone.skills}
                  </p>
                </>
              ) : (
                <div className="text-xs font-bold text-foreground">
                  Final Capstone & Accredited Certification
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ROADMAP: Python ↓ Machine Learning ↓ Deep Learning ↓ LLMs ↓ AI Agents ↓ Projects */}
        <section className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-serif font-normal text-foreground tracking-tight">
              Roadmap Progression
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Follow this linear, step-by-step engineering roadmap to complete the track.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {path.milestones.map((milestone, index) => {
              const isLast = index === path.milestones.length - 1
              const techKey = milestone.technology || "algorithm"
              const isCompleted = milestone.status === "completed"
              const isCurrent = milestone.status === "current"

              return (
                <div key={milestone.step} className="space-y-3">
                  <div
                    className={`flex items-center justify-between gap-4 p-4 sm:p-5 rounded-xl border transition-all ${
                      isCurrent
                        ? "border-primary/60 bg-card shadow-2xs ring-1 ring-primary/20"
                        : isCompleted
                        ? "border-border bg-card/80"
                        : "border-border/70 bg-card/50 opacity-90"
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      {/* Status / Step badge */}
                      <div className="w-10 h-10 rounded-xl bg-secondary border border-border/80 flex items-center justify-center shrink-0">
                        {isCompleted ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                        ) : (
                          <TechnologyIcon name={techKey} size={22} />
                        )}
                      </div>

                      {/* Title & Skills */}
                      <div className="min-w-0 space-y-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-primary">
                            Step {milestone.step}
                          </span>
                          <span className="text-xs sm:text-sm font-bold text-foreground">
                            {milestone.title}
                          </span>
                          {isCompleted && (
                            <span className="text-[10px] font-mono font-semibold px-2 py-0.2 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                              Completed
                            </span>
                          )}
                          {isCurrent && (
                            <span className="text-[10px] font-mono font-semibold px-2 py-0.2 rounded-full bg-primary/10 text-primary border border-primary/20">
                              Active
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground truncate max-w-lg">
                          {milestone.skills}
                        </p>
                      </div>
                    </div>

                    {/* Step Action */}
                    <Link
                      href="/courses"
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-colors cursor-pointer ${
                        isCurrent
                          ? "bg-primary text-primary-foreground hover:bg-[#EA5300]"
                          : "border border-border bg-secondary hover:bg-secondary/80 text-foreground"
                      }`}
                    >
                      {isCurrent ? "Continue" : isCompleted ? "Review" : "Explore"}
                    </Link>
                  </div>

                  {/* Clean Visual Down Arrow between Steps: Python ↓ Machine Learning ↓ Deep Learning ... */}
                  {!isLast && (
                    <div className="flex justify-center py-0.5">
                      <div className="w-6 h-6 rounded-full bg-secondary/80 border border-border/80 flex items-center justify-center text-muted-foreground shadow-2xs">
                        <ArrowDown className="w-3.5 h-3.5 text-primary" />
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </section>

        {/* Career Outcome Strip */}
        <div className="p-5 rounded-xl border border-border bg-secondary/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-0.5">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground">
              Target Career Outcome
            </span>
            <div className="text-sm font-semibold text-foreground">
              {path.careerOutcome}
            </div>
            <div className="text-xs text-muted-foreground">
              Credential: {path.certificate}
            </div>
          </div>

          <Link
            href="/career"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-card border border-border hover:bg-secondary text-foreground text-xs font-semibold transition-all shrink-0"
          >
            <span>View Matching Roles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
