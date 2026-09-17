"use client"

import { ShieldCheck, ArrowRight, Terminal, BookOpen, Play, Video } from "lucide-react"
import { use } from "react"
import Link from "next/link"
import { getCurriculumCourseBySlug } from "@/lib/curriculum-data"
import { getCourseraDataForCourse } from "@/lib/coursera-metadata"
import { CourseVideoEmbed } from "@/components/course-video-embed"

export default function LearnDashboard({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params)
    const curriculumCourse = getCurriculumCourseBySlug(slug)
    const formattedTitle = curriculumCourse ? curriculumCourse.title : slug.replace("-", " ")
    const courseraData = getCourseraDataForCourse(slug, formattedTitle, curriculumCourse?.category || "AI & ML")
    const firstLesson = curriculumCourse?.modules?.[0]?.lessons?.[0]
    const firstModule = curriculumCourse?.modules?.[0]

    return (
        <div className="flex-1 flex flex-col h-full bg-background p-6 lg:p-12 relative overflow-y-auto">
            <div className="max-w-4xl relative z-10 my-auto py-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 mb-6 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-medium">
                    <BookOpen className="h-3.5 w-3.5" />
                    <span className="capitalize">{formattedTitle} Workspace</span>
                </div>

                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-foreground tracking-tight leading-[1.15] mb-5">
                    Welcome to {formattedTitle}
                </h1>

                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl">
                    Select a module and lesson from the navigation sidebar on the left to begin interactive explanations, code walkthroughs, and automated verification challenges.
                </p>

                {firstLesson && firstModule && (
                    <div className="flex flex-wrap items-center gap-4 mb-8">
                        <Link
                            href={`/courses/${slug}/learn/${firstModule.id}/${firstLesson.id}`}
                            className="inline-flex items-center gap-2.5 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-7 py-3 text-sm font-medium transition-colors shadow-sm cursor-pointer"
                        >
                            <Play className="h-4 w-4 fill-current" />
                            <span>Launch {firstLesson.title}</span>
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                )}

                {/* Official Lecture Video Section */}
                <div className="mb-10">
                    <div className="flex items-center gap-2 mb-3">
                        <Video className="h-4 w-4 text-primary" />
                        <h2 className="text-sm font-mono font-semibold uppercase tracking-wider text-muted-foreground">
                            Official Video Lecture & Partner Portal
                        </h2>
                    </div>
                    <CourseVideoEmbed
                        videoId={courseraData.officialVideoId}
                        title={formattedTitle}
                        partnerName={courseraData.partner}
                        portalUrl={courseraData.officialPortalUrl}
                        thumbnailUrl={courseraData.thumbnail}
                        chapters={courseraData.videoChapters}
                    />
                </div>

                <div className="grid sm:grid-cols-2 gap-4 max-w-xl mb-10">
                    <div className="p-5 border border-border bg-card rounded-xl shadow-sm">
                        <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3">
                            <Terminal className="h-4 w-4" />
                        </div>
                        <h3 className="font-serif text-base font-normal text-foreground mb-1">Interactive Console</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            Run and inspect code snippets directly inside your browser environment.
                        </p>
                    </div>
                    <div className="p-5 border border-border bg-card rounded-xl shadow-sm">
                        <div className="h-9 w-9 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3">
                            <ShieldCheck className="h-4 w-4" />
                        </div>
                        <h3 className="font-serif text-base font-normal text-foreground mb-1">Automated Test Suites</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            Verify your solutions against edge-case test runners with instant feedback.
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-6 text-xs text-muted-foreground pt-4 border-t border-border">
                    <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                        <span>Environment Active</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-primary" />
                        <span>{curriculumCourse?.modules?.length || 0} Modules Synchronized</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

