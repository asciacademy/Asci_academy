"use client"

import { useState, useEffect, use } from "react"
import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import {
  TerminalSquare, BookOpen, Layers, Laptop, Code2, Youtube, GraduationCap,
  ChevronRight, Zap, ArrowRight, Award, Clock, CheckCircle2,
  Shield, Cpu, FileCode2, ExternalLink, Star, Users, Check, Play, Share2,
  HelpCircle, ChevronDown, ChevronUp, Globe, ThumbsUp, Calendar, AlertCircle
} from "lucide-react"
import { PythonConcepts } from "@/components/python-concepts"
import { getCurriculumCourseBySlug } from "@/lib/curriculum-data"
import { getCourseraDataForCourse } from "@/lib/coursera-metadata"
import { EnrollModal } from "@/components/enroll-modal"
import { CourseVideoEmbed } from "@/components/course-video-embed"
import { AxelStage } from "@/components/axel/axel-stage"

export default function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const curriculumCourse = getCurriculumCourseBySlug(slug)
  const formattedTitle = curriculumCourse ? curriculumCourse.title : slug.replace(/-/g, " ")
  const category = curriculumCourse?.category || "AI & ML"
  const courseraData = getCourseraDataForCourse(slug, formattedTitle, category)

  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("about")
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    "0": true // first module open by default
  })
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [showStickyBar, setShowStickyBar] = useState(false)

  // Scroll listener for sticky header bar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowStickyBar(true)
      } else {
        setShowStickyBar(false)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleModule = (idx: string) => {
    setExpandedModules(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }))
  }

  const toggleFaq = (index: number) => {
    setExpandedFaq(prev => prev === index ? null : index)
  }

  const firstLesson = curriculumCourse?.modules?.[0]?.lessons?.[0]
  const firstLessonHref = firstLesson 
    ? `/courses/${slug}/learn/${curriculumCourse?.modules?.[0]?.id || "m1"}/${firstLesson.id}`
    : `/courses/${slug}/learn`

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      <Navbar />
      <div className="h-[72px]" />

      {/* Sticky Top Progress / Action Bar */}
      <div
        className={`fixed top-[72px] left-0 right-0 z-40 border-b border-hairline bg-card/95 backdrop-blur-md px-6 py-2.5 transition-all duration-300 ${
          showStickyBar ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex items-center gap-3 overflow-hidden">
            <span className="font-serif text-sm font-medium text-foreground truncate max-w-xs sm:max-w-md">
              {formattedTitle}
            </span>
            <div className="hidden sm:flex items-center gap-1 text-xs font-mono text-muted-foreground">
              <Star className="h-3.5 w-3.5 text-amber-500 fill-current" />
              <span>{courseraData.rating}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsEnrollModalOpen(true)}
              className="rounded-xl bg-primary px-5 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors shadow-xs cursor-pointer"
            >
              Enroll for Free
            </button>
            <Link
              href={firstLessonHref}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-hairline px-3.5 py-2 text-xs font-medium text-foreground hover:bg-secondary transition-colors"
            >
              <span>Go to Course</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* 1. Coursera Hero Banner */}
      <section id="course-hero" className="relative overflow-hidden border-b border-hairline bg-card py-12 lg:py-16 scroll-mt-24">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12 items-start">
            {/* Left Hero Content (7 Cols) */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center justify-between gap-4">
                {/* Partner Institution Badge */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-lg border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    <GraduationCap className="h-3.5 w-3.5" />
                    <span>Offered by {courseraData.partner}</span>
                  </span>
                  <span className="rounded-lg bg-secondary border border-hairline px-2.5 py-1 text-xs font-semibold text-foreground/90 font-mono">
                    {courseraData.credentialType}
                  </span>
                  {curriculumCourse?.certificate && (
                    <span className="hidden sm:inline-flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400 font-medium">
                      <Award className="h-3.5 w-3.5" />
                      <span>Accredited</span>
                    </span>
                  )}
                </div>

                <AxelStage
                  id="course-hero-robot-anchor"
                  sectionId="course-hero"
                  label="Course Overview"
                  emotion="cute"
                  scale={0.44}
                  size="sm"
                />
              </div>

              {/* Title */}
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-foreground leading-[1.18]">
                {formattedTitle}
              </h1>

              {/* Subtitle / Tagline */}
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {curriculumCourse?.description || "Master industry-grade concepts, architect verified real-world systems, and earn a credential recognized by top global employers."}
              </p>

              {/* Social Proof Bar */}
              <div className="flex flex-wrap items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-foreground">
                  <div className="flex text-amber-500">
                    <Star className="h-4 w-4 fill-current" />
                  </div>
                  <span>{courseraData.rating}</span>
                  <span className="font-normal text-muted-foreground underline underline-offset-2">
                    ({courseraData.ratingCount})
                  </span>
                </div>
                <span className="text-hairline">•</span>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Users className="h-3.5 w-3.5" />
                  <strong className="text-foreground">{courseraData.enrolledCount}</strong>
                </div>
              </div>

              {/* Instructor Mini-Badge */}
              {courseraData.instructors && courseraData.instructors.length > 0 && (
                <div className="flex items-center gap-3 pt-1">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full border border-hairline bg-secondary shrink-0">
                    <Image
                      src={courseraData.instructors[0].avatar}
                      alt={courseraData.instructors[0].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-xs">
                    <div className="text-muted-foreground">
                      Instructor: <strong className="text-foreground font-medium">{courseraData.instructors[0].name}</strong>
                      {courseraData.instructors.length > 1 && (
                        <span> +{courseraData.instructors.length - 1} more</span>
                      )}
                    </div>
                    <div className="text-[11px] text-muted-foreground/80 truncate max-w-sm">
                      {courseraData.instructors[0].role} · {courseraData.instructors[0].institution}
                    </div>
                  </div>
                </div>
              )}

              {/* Primary Enrollment Call To Action */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setIsEnrollModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-all shadow-md hover:shadow-lg cursor-pointer"
                >
                  <span>Enroll for Free</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <Link
                  href={firstLessonHref}
                  className="inline-flex items-center gap-2 rounded-xl border border-hairline bg-card hover:bg-secondary px-6 py-3.5 text-sm font-medium text-foreground transition-colors"
                >
                  <span>Launch Lesson 1.1</span>
                  <Code2 className="h-4 w-4 text-primary" />
                </Link>
              </div>

              {/* Financial Aid & Coursera Plus Links */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-1">
                <button
                  onClick={() => setIsEnrollModalOpen(true)}
                  className="underline underline-offset-4 hover:text-foreground cursor-pointer"
                >
                  Financial Aid Available
                </button>
                <span className="text-hairline">•</span>
                <Link href="/plus" className="hover:text-foreground">
                  Included with <strong className="text-foreground">ASCI Plus</strong>
                </Link>
              </div>
            </div>

            {/* Right Floating Course Media Card (5 Cols) */}
            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-2xl border border-hairline bg-card shadow-xl">
                {/* 16:9 Cover Thumbnail Image */}
                <div className="relative aspect-video w-full overflow-hidden bg-secondary">
                  <Image
                    src={courseraData.thumbnail}
                    alt={formattedTitle}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40" />

                  {/* Play preview button - links to video section */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <a
                      href="#video"
                      className="group flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-black shadow-lg backdrop-blur-xs transition-transform hover:scale-110 cursor-pointer"
                    >
                      <Play className="h-6 w-6 fill-current ml-1" />
                    </a>
                  </div>

                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white">
                    <span className="font-mono text-[11px] uppercase tracking-wider">Official Video Lecture</span>
                    <span className="bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded text-[10px]">
                      {curriculumCourse?.duration_hours || 40} Total Hours
                    </span>
                  </div>
                </div>

                {/* Card Specs Checklist */}
                <div className="p-6 space-y-4 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                      <Award className="h-4 w-4" />
                    </div>
                    <div>
                      <strong className="block text-foreground font-medium">Shareable Career Certificate</strong>
                      <span className="text-muted-foreground">Add to LinkedIn, CV, and professional portfolios</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div>
                      <strong className="block text-foreground font-medium">Flexible Schedule</strong>
                      <span className="text-muted-foreground">{curriculumCourse?.weeks || "8-10 Weeks"} at your own pace</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                      <Laptop className="h-4 w-4" />
                    </div>
                    <div>
                      <strong className="block text-foreground font-medium">In-Browser Interactive IDE</strong>
                      <span className="text-muted-foreground">Automated code compilation & grading</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                      <Shield className="h-4 w-4" />
                    </div>
                    <div>
                      <strong className="block text-foreground font-medium">{curriculumCourse?.level || "Intermediate"} Level</strong>
                      <span className="text-muted-foreground">Recommended experience in foundational concepts</span>
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="pt-4 border-t border-hairline">
                    <button
                      onClick={() => setIsEnrollModalOpen(true)}
                      className="w-full rounded-xl bg-primary py-3 text-center text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors cursor-pointer"
                    >
                      Start Free Course Audit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coursera Sub-Navigation Sticky Tabs */}
      <div className="sticky top-[72px] z-30 border-b border-hairline bg-card/90 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-6 overflow-x-auto py-3 text-xs font-medium scrollbar-none">
            {[
              { id: "about", label: "About" },
              { id: "video", label: "Official Lecture" },
              { id: "outcomes", label: "What you'll learn" },
              { id: "syllabus", label: "Syllabus" },
              { id: "instructors", label: "Instructors" },
              { id: "project", label: "Applied Project" },
              { id: "reviews", label: "Reviews & Ratings" },
              { id: "faq", label: "FAQ" }
            ].map((tab) => (
              <a
                key={tab.id}
                href={`#${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`shrink-0 py-1 transition-colors ${
                  activeTab === tab.id
                    ? "text-primary border-b-2 border-primary font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Section 0: Official Lecture Video & Masterclass */}
        <section id="video" className="scroll-mt-32 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-hairline pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-primary uppercase tracking-wider mb-1">
                <Youtube className="h-4 w-4" />
                <span>Official Partner Masterclass</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-foreground">
                Official Course Video & Keynote
              </h2>
            </div>
            <a
              href={courseraData.officialPortalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-foreground font-medium underline underline-offset-4"
            >
              <span>Explore on Official {courseraData.partner} Portal</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          <CourseVideoEmbed
            videoId={courseraData.officialVideoId}
            title={formattedTitle}
            partnerName={courseraData.partner}
            portalUrl={courseraData.officialPortalUrl}
            thumbnailUrl={courseraData.thumbnail}
            chapters={courseraData.videoChapters}
          />
        </section>

        {/* Section 1: What You'll Learn (Bento Grid) */}
        <section id="outcomes" className="scroll-mt-32 space-y-6">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-foreground">
              What you will learn
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Key competencies verified by {courseraData.partner}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {courseraData.whatYouWillLearn.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 rounded-xl border border-hairline bg-card p-5 transition-colors hover:border-foreground/20"
              >
                <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary shrink-0">
                  <Check className="h-3 w-3 stroke-[3]" />
                </div>
                <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed">
                  {item}
                </p>
              </div>
            ))}
          </div>

          {/* Skills Tag Cloud */}
          <div className="rounded-xl border border-hairline bg-secondary/30 p-6">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Skills you will gain
            </h3>
            <div className="flex flex-wrap gap-2">
              {courseraData.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="rounded-lg bg-card border border-hairline px-3 py-1 text-xs font-medium text-foreground shadow-2xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: Details To Know Bar */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-hairline bg-card p-5">
            <Award className="h-5 w-5 text-amber-500 mb-2" />
            <h4 className="text-xs font-semibold text-foreground">Shareable Certificate</h4>
            <p className="mt-1 text-[11px] text-muted-foreground">
              Earn a certificate upon completion backed by {courseraData.partner}.
            </p>
          </div>
          <div className="rounded-xl border border-hairline bg-card p-5">
            <Globe className="h-5 w-5 text-blue-500 mb-2" />
            <h4 className="text-xs font-semibold text-foreground">100% Online & Self-Paced</h4>
            <p className="mt-1 text-[11px] text-muted-foreground">
              Start instantly and learn at your own schedule from any device.
            </p>
          </div>
          <div className="rounded-xl border border-hairline bg-card p-5">
            <Code2 className="h-5 w-5 text-primary mb-2" />
            <h4 className="text-xs font-semibold text-foreground">Hands-on Challenge Katas</h4>
            <p className="mt-1 text-[11px] text-muted-foreground">
              Write, compile, and debug real code in the browser IDE.
            </p>
          </div>
          <div className="rounded-xl border border-hairline bg-card p-5">
            <Clock className="h-5 w-5 text-purple-500 mb-2" />
            <h4 className="text-xs font-semibold text-foreground">Flexible Deadlines</h4>
            <p className="mt-1 text-[11px] text-muted-foreground">
              Reset deadlines according to your personal availability.
            </p>
          </div>
        </section>

        {/* Section 3: Courses / Syllabus Breakdown */}
        <section id="syllabus" className="scroll-mt-32 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-hairline pb-4">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-foreground">
                Syllabus: What is in this {courseraData.credentialType}
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                {curriculumCourse?.modules?.length || 0} Modules · {curriculumCourse?.lessons || 0} Lessons · {curriculumCourse?.projects || 0} Capstone Projects
              </p>
            </div>
            <div className="flex items-center gap-4">
              <AxelStage
                id="course-syllabus-robot-anchor"
                sectionId="syllabus"
                label="Module Syllabus"
                emotion="happy"
                scale={0.46}
                size="sm"
              />
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const all: Record<string, boolean> = {}
                    curriculumCourse?.modules?.forEach((_, i) => (all[i.toString()] = true))
                    setExpandedModules(all)
                  }}
                  className="text-xs text-primary underline underline-offset-4 hover:text-foreground cursor-pointer"
                >
                  Expand all
                </button>
                <span className="text-hairline">•</span>
                <button
                  onClick={() => setExpandedModules({})}
                  className="text-xs text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  Collapse all
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {curriculumCourse?.modules?.map((mod, modIdx) => {
              const isOpen = !!expandedModules[modIdx.toString()]
              return (
                <div
                  key={mod.id}
                  className="overflow-hidden rounded-xl border border-hairline bg-card transition-all"
                >
                  {/* Module Header Toggle */}
                  <div
                    onClick={() => toggleModule(modIdx.toString())}
                    className="flex items-center justify-between p-5 sm:p-6 cursor-pointer hover:bg-secondary/40 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary border border-hairline font-mono text-xs font-semibold text-foreground">
                        {modIdx + 1}
                      </span>
                      <div>
                        <h3 className="font-serif text-base sm:text-lg font-medium text-foreground">
                          {mod.title}
                        </h3>
                        <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">
                          {mod.description || `${mod.lessons.length} lessons with interactive coding exercises`}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-muted-foreground hidden sm:inline">
                        {mod.lessons.length} {mod.lessons.length === 1 ? "lesson" : "lessons"}
                      </span>
                      <div className="rounded-lg p-1.5 text-muted-foreground hover:bg-card">
                        {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </div>
                    </div>
                  </div>

                  {/* Module Content Tree */}
                  {isOpen && (
                    <div className="border-t border-hairline bg-secondary/15 px-5 sm:px-6 py-4 space-y-3">
                      {mod.lessons.map((lesson, lIdx) => (
                        <div
                          key={lesson.id}
                          className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-lg border border-hairline/60 bg-card/60 p-3.5 hover:border-foreground/20 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-mono text-muted-foreground w-6">
                              {modIdx + 1}.{lIdx + 1}
                            </span>
                            <div>
                              <h4 className="text-xs font-medium text-foreground">
                                {lesson.title}
                              </h4>
                              <p className="text-[11px] text-muted-foreground line-clamp-1">
                                {lesson.description}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 self-end sm:self-auto">
                            {lesson.challenge_data ? (
                              <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 border border-primary/20 px-2 py-0.5 text-[10px] font-mono font-medium text-primary">
                                <Code2 className="h-3 w-3" />
                                Coding Kata
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 rounded-md bg-secondary border border-hairline px-2 py-0.5 text-[10px] font-mono text-muted-foreground">
                                <BookOpen className="h-3 w-3" />
                                Reading
                              </span>
                            )}

                            <Link
                              href={`/courses/${slug}/learn/${mod.id}/${lesson.id}`}
                              className="rounded-lg bg-primary/10 hover:bg-primary hover:text-primary-foreground text-primary px-3 py-1 text-[11px] font-medium transition-colors cursor-pointer"
                            >
                              Launch
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </section>

        {/* Section 4: Applied Learning Project */}
        <section id="project" className="scroll-mt-32 rounded-2xl border border-hairline bg-card p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-primary">
            <Code2 className="h-4 w-4" />
            <span>Capstone Applied Learning Project</span>
          </div>

          <div className="max-w-3xl space-y-3">
            <h3 className="font-serif text-2xl font-normal text-foreground">
              {courseraData.appliedLearningProject.title}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {courseraData.appliedLearningProject.description}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 pt-2">
            <div className="rounded-xl border border-hairline bg-secondary/30 p-4">
              <h4 className="text-xs font-semibold text-foreground mb-1">Final Deliverable</h4>
              <p className="text-xs text-muted-foreground">
                {courseraData.appliedLearningProject.deliverable}
              </p>
            </div>
            <div className="rounded-xl border border-hairline bg-secondary/30 p-4">
              <h4 className="text-xs font-semibold text-foreground mb-1">Technologies & Stack</h4>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {courseraData.appliedLearningProject.tools.map((tool, i) => (
                  <span key={i} className="rounded-md bg-card border border-hairline px-2 py-0.5 text-[11px] font-mono text-foreground">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Instructors */}
        <section id="instructors" className="scroll-mt-32 space-y-6">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-foreground">
              Instructors
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Learn from industry pioneers and senior educators from {courseraData.partner}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {courseraData.instructors.map((instructor, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 rounded-xl border border-hairline bg-card p-6"
              >
                <div className="relative h-16 w-16 overflow-hidden rounded-xl border border-hairline bg-secondary shrink-0">
                  <Image
                    src={instructor.avatar}
                    alt={instructor.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-base font-medium text-foreground">
                    {instructor.name}
                  </h3>
                  <div className="text-xs text-primary font-medium">
                    {instructor.role}
                  </div>
                  <div className="text-[11px] text-muted-foreground font-mono">
                    {instructor.institution}
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                    {instructor.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6: Coursera Career Outcomes Banner */}
        <section className="rounded-2xl border border-hairline bg-card p-8 sm:p-10">
          <div className="grid gap-8 md:grid-cols-12 items-center">
            <div className="md:col-span-4 text-center md:text-left">
              <span className="font-serif text-5xl sm:text-6xl font-normal text-foreground">
                {courseraData.careerOutcomes.percentage}%
              </span>
              <p className="mt-2 text-xs font-medium uppercase tracking-wider text-primary">
                Positive Career Outcome
              </p>
            </div>
            <div className="md:col-span-8 space-y-2">
              <p className="text-sm sm:text-base text-foreground/90 leading-relaxed">
                {courseraData.careerOutcomes.outcomeText}
              </p>
              {courseraData.careerOutcomes.averageSalary && (
                <p className="text-xs text-muted-foreground">
                  Median reported compensation: <strong className="text-foreground">{courseraData.careerOutcomes.averageSalary}</strong>
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Section 7: Reviews & Ratings */}
        <section id="reviews" className="scroll-mt-32 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-hairline pb-4">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-foreground">
                Learner Reviews
              </h2>
              <div className="mt-1 flex items-center gap-2 text-xs">
                <div className="flex text-amber-500">
                  <Star className="h-4 w-4 fill-current" />
                </div>
                <span className="font-bold text-foreground text-sm">{courseraData.rating} out of 5</span>
                <span className="text-muted-foreground">({courseraData.ratingCount})</span>
              </div>
            </div>
            <AxelStage
              id="course-reviews-robot-anchor"
              sectionId="reviews"
              label="Learner Feedback"
              emotion="proud"
              scale={0.46}
              size="sm"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {courseraData.reviews.map((rev) => (
              <div
                key={rev.id}
                className="rounded-xl border border-hairline bg-card p-6 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] text-muted-foreground font-mono">{rev.date}</span>
                </div>

                <p className="text-xs text-foreground/90 leading-relaxed italic">
                  "{rev.comment}"
                </p>

                <div className="pt-2 flex items-center justify-between text-xs border-t border-hairline/60">
                  <div>
                    <strong className="block text-foreground font-medium">{rev.author}</strong>
                    <span className="text-[11px] text-muted-foreground">{rev.role} at {rev.company}</span>
                  </div>
                  {rev.verified && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-primary font-mono font-medium">
                      <CheckCircle2 className="h-3 w-3" />
                      Verified Learner
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 8: FAQ Accordion */}
        <section id="faq" className="scroll-mt-32 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-hairline pb-4">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-foreground">
                Frequently Asked Questions
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Answers to common queries about certificates, grading, and prerequisites
              </p>
            </div>
            <AxelStage
              id="course-faq-robot-anchor"
              sectionId="faq"
              label="Course FAQs"
              emotion="curious"
              scale={0.46}
              size="sm"
            />
          </div>

          <div className="space-y-3">
            {courseraData.faqs.map((faq, idx) => {
              const isFaqOpen = expandedFaq === idx
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-hairline bg-card overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-5 text-left text-xs sm:text-sm font-medium text-foreground hover:bg-secondary/40 transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${isFaqOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isFaqOpen && (
                    <div className="border-t border-hairline bg-secondary/20 p-5 text-xs text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </section>
      </div>

      {/* Floating Enrollment Modal */}
      <EnrollModal
        isOpen={isEnrollModalOpen}
        onClose={() => setIsEnrollModalOpen(false)}
        courseTitle={formattedTitle}
        courseSlug={slug}
        partnerName={courseraData.partner}
        firstLessonHref={firstLessonHref}
      />

      <Footer />
    </main>
  )
}
