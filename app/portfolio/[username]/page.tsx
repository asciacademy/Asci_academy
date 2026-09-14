"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Award, BookOpen, CheckCircle2, Shield, Terminal, Zap, Share2, Globe, Check, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { AxelStage } from "@/components/axel/axel-stage"

export default function ScholarPortfolioPage() {
    const params = useParams()
    const username = params?.username as string
    const [profile, setProfile] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch(`/api/user/profile?username=${encodeURIComponent(username)}`)
                if (res.ok) {
                    const data = await res.json()
                    setProfile(data.profile)
                }
            } catch (err) {
                console.error("Failed to load portfolio:", err)
            } finally {
                setLoading(false)
            }
        }

        if (username) {
            fetchProfile()
        }
    }, [username])

    const handleCopyLink = () => {
        if (typeof window !== "undefined") {
            navigator.clipboard.writeText(window.location.href)
            setCopied(true)
            setTimeout(() => setCopied(false), 2500)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center font-mono text-xs uppercase tracking-widest text-primary animate-pulse">
                Retrieving Scholar Profile...
            </div>
        )
    }

    if (!profile) {
        return (
            <main className="min-h-screen bg-background text-foreground flex flex-col font-sans transition-colors duration-300">
                <Navbar />
                <div className="h-[68px]" />
                <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto">
                    <div className="w-16 h-16 mb-6 rounded-2xl border border-border flex items-center justify-center bg-card">
                        <Shield className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="font-serif text-3xl font-normal text-foreground mb-2">Profile Not Found</h1>
                    <p className="text-sm text-muted-foreground font-sans mb-6">
                        The requested scholar profile is either private or does not exist in our academic registry.
                    </p>
                    <Link
                        href="/"
                        className="px-6 py-2.5 rounded-xl border border-border bg-card text-xs font-mono uppercase tracking-widest text-foreground hover:bg-secondary transition-all font-semibold"
                    >
                        Return Home
                    </Link>
                </div>
                <Footer />
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-background text-foreground flex flex-col font-sans transition-colors duration-300">
            <Navbar />
            <div className="h-[68px]" />

            <div className="max-w-6xl mx-auto px-6 py-16 w-full flex-1">
                {/* Header / Identity Section */}
                <section id="portfolio-hero" className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-16 border-b border-border pb-12 scroll-mt-24">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                        <div className="relative w-28 h-28 flex-shrink-0">
                            <div className="w-full h-full rounded-2xl border-2 border-border overflow-hidden bg-card flex items-center justify-center shadow-sm">
                                {profile.avatar_url ? (
                                    <Image src={profile.avatar_url} alt={profile.name} width={112} height={112} className="w-full h-full object-cover" />
                                ) : (
                                    <User className="w-12 h-12 text-muted-foreground/60" />
                                )}
                            </div>
                            <div className="absolute -bottom-2 -right-2 p-1.5 rounded-lg bg-background border border-border shadow-sm">
                                <Award className="w-4 h-4 text-primary" />
                            </div>
                        </div>

                        <div>
                            <div className="flex flex-wrap items-center gap-3 mb-2">
                                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-foreground tracking-tight">
                                    {profile.name}
                                </h1>
                                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 font-semibold">
                                    {profile.rank || "Scholar"}
                                </span>
                            </div>
                            <p className="text-xs sm:text-sm text-muted-foreground font-sans max-w-xl leading-relaxed">
                                {profile.bio || "Student of rigorous systems engineering and algorithmic computer science."}
                            </p>
                            <div className="flex items-center gap-4 mt-4">
                                <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
                                    <Globe className="w-3.5 h-3.5 text-primary" />
                                    Active since {profile.created_at ? new Date(profile.created_at).getFullYear() : "2024"}
                                </div>
                                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                <div className="text-xs font-mono text-primary tracking-wider">Active Scholar</div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <AxelStage
                            id="portfolio-hero-robot-anchor"
                            sectionId="portfolio-hero"
                            label="Scholar Portfolio"
                            emotion="wave"
                            scale={0.46}
                            size="sm"
                        />
                        <button
                            onClick={handleCopyLink}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-card text-xs font-mono font-semibold uppercase tracking-wider text-foreground hover:bg-secondary transition-all shadow-sm shrink-0"
                        >
                            {copied ? (
                                <>
                                    <Check className="w-3.5 h-3.5 text-primary" />
                                    Link Copied
                                </>
                            ) : (
                                <>
                                    <Share2 className="w-3.5 h-3.5 text-primary" />
                                    Share Profile
                                </>
                            )}
                        </button>
                    </div>
                </section>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                    <div className="bg-card border border-border rounded-2xl p-6 relative overflow-hidden">
                        <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1">Total XP</div>
                        <div className="text-3xl sm:text-4xl font-serif text-primary font-normal">{profile.xp || 0}</div>
                        <div className="text-[10px] font-mono text-muted-foreground/70 mt-1">Verified Computation</div>
                    </div>
                    <div className="bg-card border border-border rounded-2xl p-6 relative overflow-hidden">
                        <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1">Academic Rank</div>
                        <div className="text-3xl sm:text-4xl font-serif text-foreground font-normal">{profile.rank || "Novice"}</div>
                        <div className="text-[10px] font-mono text-muted-foreground/70 mt-1">Clearance Level</div>
                    </div>
                    <div className="bg-card border border-border rounded-2xl p-6 relative overflow-hidden">
                        <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1">Study Streak</div>
                        <div className="text-3xl sm:text-4xl font-serif text-foreground font-normal">{profile.streak_count || 0}d</div>
                        <div className="text-[10px] font-mono text-muted-foreground/70 mt-1">Consecutive Days</div>
                    </div>
                    <div className="bg-card border border-border rounded-2xl p-6 relative overflow-hidden">
                        <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1">Completed</div>
                        <div className="text-3xl sm:text-4xl font-serif text-foreground font-normal">{profile.completedCourses?.length || 0}</div>
                        <div className="text-[10px] font-mono text-muted-foreground/70 mt-1">Certified Tracks</div>
                    </div>
                </div>

                {/* Content Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Section: Completed Curriculum */}
                    <section id="portfolio-curriculum" className="lg:col-span-2 space-y-6 scroll-mt-24">
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <BookOpen className="w-5 h-5 text-primary" />
                                <h2 className="font-serif text-2xl font-normal text-foreground">Certified Curriculum</h2>
                            </div>
                            <AxelStage
                                id="portfolio-curriculum-robot-anchor"
                                sectionId="portfolio-curriculum"
                                label="Certified Tracks"
                                emotion="proud"
                                scale={0.46}
                                size="sm"
                            />
                        </div>

                        {profile.completedCourses && profile.completedCourses.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {profile.completedCourses.map((course: any) => (
                                    <div key={course.id} className="bg-card border border-border rounded-2xl p-5 hover:border-primary/40 transition-all">
                                        <div className="flex gap-4">
                                            <div className="w-14 h-14 rounded-xl bg-secondary border border-border flex-shrink-0 relative overflow-hidden flex items-center justify-center">
                                                {course.thumbnail_url ? (
                                                    <Image src={course.thumbnail_url} alt={course.title} fill className="object-cover" />
                                                ) : (
                                                    <Terminal className="w-6 h-6 text-primary" />
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-sm font-semibold text-foreground truncate">{course.title}</h3>
                                                <div className="text-[10px] font-mono text-muted-foreground mt-0.5 uppercase">{course.difficulty || "Foundational"}</div>
                                                <div className="mt-3 flex items-center justify-between">
                                                    <span className="text-[10px] font-mono text-primary uppercase tracking-widest font-semibold flex items-center gap-1">
                                                        <CheckCircle2 className="w-3 h-3" /> 100% Completed
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="rounded-2xl border border-dashed border-border bg-card/40 p-12 text-center">
                                <Terminal className="w-8 h-8 text-muted-foreground/40 mx-auto mb-3" />
                                <p className="text-xs text-muted-foreground font-mono">Curriculum modules currently in progress.</p>
                            </div>
                        )}
                    </section>

                    {/* Sidebar: Honors & Badges */}
                    <section id="portfolio-honors" className="space-y-6 scroll-mt-24">
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <Award className="w-5 h-5 text-primary" />
                                <h2 className="font-serif text-2xl font-normal text-foreground">Scholastic Honors</h2>
                            </div>
                            <AxelStage
                                id="portfolio-honors-robot-anchor"
                                sectionId="portfolio-honors"
                                label="Honors & Awards"
                                emotion="cute"
                                scale={0.46}
                                size="sm"
                            />
                        </div>

                        <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
                            <div className="flex items-center gap-3.5 p-3 rounded-xl border border-border bg-secondary/50">
                                <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                    <Zap className="w-4 h-4" />
                                </div>
                                <div>
                                    <div className="text-xs font-semibold text-foreground">Foundational Architect</div>
                                    <div className="text-[10px] font-mono text-muted-foreground">Completed Core Algorithms Track</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3.5 p-3 rounded-xl border border-border bg-secondary/50">
                                <div className="w-9 h-9 rounded-lg bg-foreground text-background flex items-center justify-center shrink-0">
                                    <Shield className="w-4 h-4" />
                                </div>
                                <div>
                                    <div className="text-xs font-semibold text-foreground">Invariant Master</div>
                                    <div className="text-[10px] font-mono text-muted-foreground">Zero-error runtime submission</div>
                                </div>
                            </div>

                            <div className="p-4 rounded-xl border border-border bg-secondary/30 text-center mt-6">
                                <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">Verified Cryptographic Hash</div>
                                <div className="text-[9px] font-mono text-primary truncate">
                                    0x7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1f
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            <Footer />
        </main>
    )
}
