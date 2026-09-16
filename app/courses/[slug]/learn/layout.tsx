"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Terminal, ChevronRight, ChevronDown, BookOpen, Trophy, Award } from "lucide-react"
import { cn } from "@/lib/utils"
import { getAllCourses, getCourseContent } from "@/app/actions/courses"
import { getUserProfile } from "@/app/actions/user"
import { Navbar } from "@/components/navbar"
import { useState, useEffect, use } from "react"

export default function CourseLayout({
    children,
    params,
}: {
    children: React.ReactNode
    params: Promise<{ slug: string }>
}) {
    const { slug } = use(params)
    const pathname = usePathname()
    const [openModule, setOpenModule] = useState<string>("")
    const [courseModules, setCourseModules] = useState<any[] | null>(null)
    const [userProfile, setUserProfile] = useState<any>(null)
    const [mobileSyllabusOpen, setMobileSyllabusOpen] = useState(false)

    useEffect(() => {
        async function loadLayoutData() {
            try {
                const profile = await getUserProfile()
                if (profile) setUserProfile(profile)

                const allCourses = await getAllCourses()
                if (allCourses && allCourses.length > 0) {
                    const course = allCourses.find((c: any) => c.slug === slug) || allCourses[0]
                    const fullCourse = await getCourseContent(course.id)
                    if (fullCourse && fullCourse.modules) {
                        setCourseModules(fullCourse.modules)
                        const foundModule = fullCourse.modules.find((m: any) => pathname.includes(m.id))
                        if (foundModule) setOpenModule(foundModule.id)
                        else if (fullCourse.modules.length > 0) setOpenModule(fullCourse.modules[0].id)
                    }
                }
            } catch (error) {
                console.error("Failed to load layout tree", error)
            }
        }
        loadLayoutData()
    }, [pathname])

    // Listen for live XP events from lesson completion and daily tasks
    useEffect(() => {
        const onXpAward = (e: any) => {
            if (e.detail?.amount) {
                setUserProfile((prev: any) => ({
                    ...prev,
                    xp: (prev?.xp || 0) + Number(e.detail.amount)
                }))
            }
        }
        window.addEventListener("asci-award-xp", onXpAward)
        return () => window.removeEventListener("asci-award-xp", onXpAward)
    }, [])

    // XP Math
    const currentXp = userProfile?.xp || 0
    const rank = userProfile?.rank || "Initiate"
    let nextTierXp = 500
    if (currentXp >= 500) nextTierXp = 2000
    if (currentXp >= 2000) nextTierXp = 5000
    if (currentXp >= 5000) nextTierXp = 10000
    if (currentXp >= 10000) nextTierXp = 50000

    let prevTierXp = 0
    if (currentXp >= 10000) prevTierXp = 10000
    else if (currentXp >= 5000) prevTierXp = 5000
    else if (currentXp >= 2000) prevTierXp = 2000
    else if (currentXp >= 500) prevTierXp = 500

    const relativeXpInTier = currentXp - prevTierXp
    const relativeTierSize = nextTierXp - prevTierXp
    const xpPercent = Math.max(0, Math.min(100, (relativeXpInTier / relativeTierSize) * 100))

    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground">
            <Navbar />

            <div className="flex flex-1 flex-col lg:flex-row mt-[72px]">
                {/* Sidebar Navigation */}
                <aside className="w-full shrink-0 border-r border-border/80 bg-card/70 backdrop-blur-2xl lg:w-80 flex flex-col h-auto lg:h-full lg:min-h-[calc(100vh-72px)]">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-border/80 p-4 sm:p-5 bg-card/50">
                        <div className="flex items-center gap-3">
                            <div className="bg-primary/10 p-2 rounded-xl text-primary">
                                <BookOpen className="h-4 w-4" />
                            </div>
                            <div>
                                <h2 className="font-serif text-base font-semibold capitalize text-foreground">
                                    {slug.replace("-", " ")}
                                </h2>
                                <p className="text-[11px] text-muted-foreground">Curriculum Index</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setMobileSyllabusOpen(v => !v)}
                            className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/80 bg-secondary/80 text-xs font-semibold text-foreground hover:bg-secondary transition-colors cursor-pointer"
                        >
                            <span>{mobileSyllabusOpen ? "Hide" : "Syllabus"}</span>
                            <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-200", mobileSyllabusOpen && "rotate-180")} />
                        </button>
                    </div>

                    <div className={cn("flex flex-col flex-1", !mobileSyllabusOpen && "hidden lg:flex")}>
                        {/* XP Tracker */}
                    <div className="px-5 py-4 border-b border-border/80 bg-card/30 shrink-0">
                        <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">Current Level</span>
                            <span className="text-xs font-semibold text-primary">{rank}</span>
                        </div>
                        <div className="flex items-baseline gap-1 mb-2">
                            <span className="font-serif text-2xl font-normal text-foreground">{currentXp}</span>
                            <span className="text-xs text-muted-foreground">/ {nextTierXp} XP</span>
                        </div>

                        {/* Progress Bar */}
                        <div className="h-1.5 w-full bg-background overflow-hidden rounded-full border border-border">
                            <div className="h-full bg-primary transition-all duration-500 rounded-full" style={{ width: `${xpPercent}%` }} />
                        </div>
                    </div>

                    {/* Gravit Certificate Status Banner */}
                    <div className="px-5 py-2.5 border-b border-border/80 bg-card/40 shrink-0 flex items-center justify-between text-xs font-mono">
                        <div className="flex items-center gap-1.5 text-muted-foreground text-[11px]">
                            <Award className="w-3.5 h-3.5 text-primary" />
                            <span>Gravit Certificate:</span>
                        </div>
                        <Link
                            href="/dashboard?tab=certificates"
                            className="text-[11px] text-primary hover:underline font-semibold flex items-center gap-0.5"
                        >
                            <span>100% Required</span>
                            <ChevronRight className="w-3 h-3" />
                        </Link>
                    </div>

                    {/* Accordion Curriculum List */}
                    <nav className="flex-1 overflow-y-auto p-3 space-y-2">
                        {!courseModules ? (
                            <div className="flex justify-center p-6 text-muted-foreground"><Terminal className="h-4 w-4 animate-pulse text-primary" /></div>
                        ) : courseModules.map((module: any) => {
                            const isOpen = openModule === module.id;

                            return (
                                <div key={module.id} className="rounded-xl overflow-hidden bg-card/80 border border-border/80 transition-colors">
                                    <button
                                        onClick={() => setOpenModule(isOpen ? "" : module.id)}
                                        className={cn(
                                            "w-full flex items-center justify-between p-3.5 text-left transition-colors cursor-pointer",
                                            isOpen ? "bg-primary/5" : "hover:bg-secondary/40"
                                        )}
                                    >
                                        <div className="pr-2">
                                            <h3 className={cn(
                                                "text-xs font-semibold leading-tight",
                                                isOpen ? "text-primary" : "text-foreground"
                                            )}>
                                                {module.title}
                                            </h3>
                                            {!isOpen && (
                                                <p className="text-[11px] text-muted-foreground mt-0.5 truncate max-w-[200px]">{module.description}</p>
                                            )}
                                        </div>
                                        <ChevronDown className={cn(
                                            "h-3.5 w-3.5 text-muted-foreground transition-transform duration-200 shrink-0",
                                            isOpen && "transform rotate-180 text-primary"
                                        )} />
                                    </button>

                                    {isOpen && (
                                        <div className="bg-background/80 border-t border-border/80 p-2">
                                            <ul className="space-y-0.5">
                                                {module.lessons.map((lesson: any) => {
                                                    const href = `/courses/${slug}/learn/${module.id}/${lesson.id}`
                                                    const isActive = pathname === href

                                                    return (
                                                        <li key={lesson.id}>
                                                            <Link
                                                                href={href}
                                                                className={cn(
                                                                    "group flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs transition-colors",
                                                                    isActive
                                                                        ? "bg-primary/10 font-semibold text-primary"
                                                                        : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                                                                )}
                                                            >
                                                                {isActive ? (
                                                                    <ChevronRight className="h-3.5 w-3.5 text-primary shrink-0" />
                                                                ) : (
                                                                    <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40 group-hover:bg-primary shrink-0 ml-1" />
                                                                )}
                                                                <span className="truncate">{lesson.title}</span>
                                                            </Link>
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </nav>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 relative overflow-hidden flex flex-col bg-background">
                    {children}
                </main>
            </div>
        </div>
    )
}

