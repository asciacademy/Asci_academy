"use client"

import { useState, useEffect, useTransition } from "react"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { getCourseContent } from "@/app/actions/courses"
import { updateCourseDetails, toggleCoursePublish, toggleCoursePremium } from "@/app/actions/admin"
import { createModule, updateModule, deleteModule, createLesson, updateLesson, deleteLesson, reorderModule, reorderLesson } from "@/app/actions/curriculum"
import {
    ChevronLeft, Plus, Edit3, Trash2, Settings,
    FileText, Terminal, Check, AlertCircle, Loader2,
    ArrowUp, ArrowDown, Eye, EyeOff, Code, Image as ImageIcon, Link as LinkIcon, Bold, Italic, FileCode2,
    MonitorPlay, Save, Globe, Lock
} from "lucide-react"

export default function EditCourseDashboard() {
    const params = useParams()
    const router = useRouter()
    const searchParams = useSearchParams()
    const courseId = params.id as string

    const [course, setCourse] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [isPending, startTransition] = useTransition()
    const [toast, setToast] = useState<{ type: "ok" | "err"; msg: string } | null>(null)

    // Editing States
    const [isEditingCourse, setIsEditingCourse] = useState(false)
    const [courseEditForm, setCourseEditForm] = useState<any>({})

    const [activeLesson, setActiveLesson] = useState<any | null>(null)
    const [lessonEditForm, setLessonEditForm] = useState<any>({})

    const [activeModule, setActiveModule] = useState<any | null>(null)
    const [moduleEditForm, setModuleEditForm] = useState<any>({})

    const [previewMode, setPreviewMode] = useState(false)

    const notify = (type: "ok" | "err", msg: string) => {
        setToast({ type, msg })
        setTimeout(() => setToast(null), 3000)
    }

    const handleSaveLesson = async () => {
        if (!activeLesson) return
        startTransition(async () => {
            const res = await updateLesson(activeLesson.id, lessonEditForm)
            if (res.success) {
                notify("ok", "Lesson updated successfully!")
                loadData()
            } else {
                notify("err", res.error || "Failed to save lesson details")
            }
        })
    }

    const handleSaveModule = async () => {
        if (!activeModule) return
        startTransition(async () => {
            const res = await updateModule(activeModule.id, moduleEditForm.title, activeModule.sequence_order)
            if (res.success) {
                notify("ok", "Module updated successfully!")
                loadData()
            } else {
                notify("err", res.error || "Failed to save module details")
            }
        })
    }

    const handleAddModule = async () => {
        startTransition(async () => {
            const nextOrder = (course?.modules?.length || 0) + 1
            const res = await createModule(courseId, `Module ${nextOrder}: New Subject`, nextOrder)
            if (res.success) {
                notify("ok", "New module appended!")
                loadData()
            } else {
                notify("err", res.error || "Failed to create module")
            }
        })
    }

    const handleDeleteModule = async (moduleId: string) => {
        if (!confirm("Are you certain you wish to delete this entire module and its lessons?")) return
        startTransition(async () => {
            const res = await deleteModule(moduleId)
            if (res.success) {
                notify("ok", "Module removed")
                if (activeModule?.id === moduleId) setActiveModule(null)
                loadData()
            } else {
                notify("err", res.error || "Failed to delete module")
            }
        })
    }

    const handleAddLesson = async (moduleId: string, currentCount: number) => {
        startTransition(async () => {
            const nextOrder = currentCount + 1
            const res = await createLesson(moduleId, {
                title: `Lesson ${nextOrder}: Concept Overview`,
                description: "Deep-dive lesson description",
                content_type: "text",
                content: "# Introduction\n\nExplain core algorithmic concepts here.",
                sequence_order: nextOrder,
                xp_reward: 50
            })
            if (res.success) {
                notify("ok", "New lesson appended to module!")
                loadData()
            } else {
                notify("err", res.error || "Failed to create lesson")
            }
        })
    }

    const handleDeleteLesson = async (lessonId: string, e: React.MouseEvent) => {
        e.stopPropagation()
        if (!confirm("Delete this lesson permanently?")) return
        startTransition(async () => {
            const res = await deleteLesson(lessonId)
            if (res.success) {
                notify("ok", "Lesson deleted")
                if (activeLesson?.id === lessonId) setActiveLesson(null)
                loadData()
            } else {
                notify("err", res.error || "Failed to delete lesson")
            }
        })
    }

    const handleReorderModule = async (moduleId: string, direction: "up" | "down", e: React.MouseEvent) => {
        e.stopPropagation()
        startTransition(async () => {
            await reorderModule(courseId, moduleId, direction)
            loadData()
        })
    }

    const handleReorderLesson = async (moduleId: string, lessonId: string, direction: "up" | "down", e: React.MouseEvent) => {
        e.stopPropagation()
        startTransition(async () => {
            await reorderLesson(moduleId, lessonId, direction)
            loadData()
        })
    }

    const loadData = () => {
        startTransition(async () => {
            const data = await getCourseContent(courseId)
            setCourse(data)

            const tab = searchParams.get("tab")
            if (tab === "settings" || !data?.modules?.length) {
                setIsEditingCourse(true)
                setActiveLesson(null)
                setActiveModule(null)
            } else if (data?.modules?.[0]?.lessons?.[0] && !activeLesson && !activeModule && !isEditingCourse) {
                setActiveLesson(data.modules[0].lessons[0])
                setLessonEditForm({
                    title: data.modules[0].lessons[0].title || "",
                    description: data.modules[0].lessons[0].description || "",
                    content_type: data.modules[0].lessons[0].content_type || "text",
                    content: data.modules[0].lessons[0].content || "",
                    xp_reward: data.modules[0].lessons[0].xp_reward || 0,
                    challenge_data: data.modules[0].lessons[0].challenge_data || null
                })
            }

            if (!courseEditForm.title && data) {
                setCourseEditForm({
                    title: data?.title || "",
                    description: data?.description || "",
                    difficulty: data?.difficulty || "Beginner",
                    duration_hours: data?.duration_hours || 0,
                    thumbnail_url: data?.thumbnail_url || "",
                    is_published: data?.is_published || false,
                    is_premium: data?.is_premium || false,
                })
            }

            setLoading(false)
        })
    }

    useEffect(() => { loadData() }, [courseId, searchParams])

    const handleSaveCourseDetails = async () => {
        startTransition(async () => {
            const res = await updateCourseDetails(courseId, {
                title: courseEditForm.title,
                description: courseEditForm.description,
                difficulty: courseEditForm.difficulty,
                duration_hours: parseFloat(courseEditForm.duration_hours) || 0,
                thumbnail_url: courseEditForm.thumbnail_url,
            })
            if (courseEditForm.is_published !== course.is_published) {
                await toggleCoursePublish(courseId, course.is_published)
            }
            if (courseEditForm.is_premium !== course.is_premium) {
                await toggleCoursePremium(courseId, course.is_premium)
            }

            if (res.success) {
                notify("ok", "Course details updated successfully!")
                loadData()
            } else {
                notify("err", res.error || "Failed to save course details")
            }
        })
    }

    if (loading) return (
        <div className="flex h-screen items-center justify-center bg-background font-mono text-xs text-primary">
            <Loader2 className="h-6 w-6 animate-spin mr-2" /> Loading syllabus builder...
        </div>
    )

    if (!course) return (
        <div className="p-16 text-center font-mono text-xs text-muted-foreground bg-background">
            Course record not located or unauthorized.
        </div>
    )

    return (
        <div className="flex h-[calc(100vh-5rem)] bg-card/70 text-foreground font-sans overflow-hidden border border-border/80 rounded-2xl shadow-sm backdrop-blur-xl">
            {toast && (
                <div className={`fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl border text-xs font-mono uppercase tracking-wider shadow-lg ${
                    toast.type === "ok" ? "bg-card border-primary/40 text-primary" : "bg-card border-destructive/40 text-destructive"
                }`}>
                    {toast.type === "ok" ? <Check className="h-4 w-4 text-primary" /> : <AlertCircle className="h-4 w-4 text-destructive" />}
                    {toast.msg}
                </div>
            )}

            {/* Sidebar Syllabus Tree */}
            <div className="w-80 border-r border-border/80 bg-secondary/30 flex flex-col shrink-0">
                <div className="p-4 border-b border-border/80 flex items-center justify-between gap-3 bg-secondary/40">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                        <button
                            onClick={() => router.push('/admin/courses')}
                            className="p-1.5 hover:bg-secondary rounded-lg transition-colors text-muted-foreground hover:text-foreground shrink-0 cursor-pointer"
                            title="Back to Courses"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </button>
                        <div className="flex-1 truncate">
                            <h2 className="font-semibold text-xs truncate font-sans text-foreground">{course.title}</h2>
                            <span className="text-[10px] text-primary font-mono uppercase tracking-widest font-semibold">Syllabus Editor</span>
                        </div>
                    </div>
                    <button
                        onClick={handleAddModule}
                        title="Add New Module"
                        className="p-1.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary-active transition-colors shrink-0 shadow-xs cursor-pointer"
                    >
                        <Plus className="h-4 w-4" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
                    {/* Course Details Block */}
                    <div className="rounded-xl border border-border/80 bg-card/70 overflow-hidden">
                        <button
                            type="button"
                            className={`w-full p-2.5 flex items-center gap-2 text-left transition-colors cursor-pointer ${
                                isEditingCourse ? 'bg-primary/15 text-primary font-semibold' : 'text-foreground/80 hover:bg-secondary/60'
                            }`}
                            onClick={() => {
                                setActiveLesson(null)
                                setActiveModule(null)
                                setIsEditingCourse(true)
                                setCourseEditForm({
                                    title: course?.title || "",
                                    description: course?.description || "",
                                    difficulty: course?.difficulty || "Beginner",
                                    duration_hours: course?.duration_hours || 0,
                                    thumbnail_url: course?.thumbnail_url || "",
                                    is_published: course?.is_published || false,
                                    is_premium: course?.is_premium || false,
                                })
                            }}
                        >
                            <Settings className="h-3.5 w-3.5 shrink-0" />
                            <span className="text-[11px] font-mono uppercase tracking-wider">Global Settings</span>
                        </button>
                    </div>

                    {course.modules?.map((m: any, mIdx: number) => (
                        <div key={m.id} className="rounded-xl border border-border/80 bg-card/70 overflow-hidden">
                            <div
                                className={`p-2.5 flex items-center justify-between border-b border-border/80 group cursor-pointer transition-colors ${
                                    activeModule?.id === m.id ? 'bg-primary/15 text-primary' : 'hover:bg-secondary/60'
                                }`}
                                onClick={() => {
                                    setActiveLesson(null)
                                    setIsEditingCourse(false)
                                    setActiveModule(m)
                                    setModuleEditForm({ title: m.title || "" })
                                }}
                            >
                                <div className="flex items-center gap-2 flex-1 min-w-0">
                                    <div className="flex flex-col gap-0.5 opacity-40 group-hover:opacity-100 transition-opacity">
                                        <button onClick={(e) => handleReorderModule(m.id, "up", e)} disabled={mIdx === 0} className="hover:text-primary disabled:opacity-20 cursor-pointer"><ArrowUp className="h-2.5 w-2.5" /></button>
                                        <button onClick={(e) => handleReorderModule(m.id, "down", e)} disabled={mIdx === course.modules.length - 1} className="hover:text-primary disabled:opacity-20 cursor-pointer"><ArrowDown className="h-2.5 w-2.5" /></button>
                                    </div>
                                    <span className="text-[11px] font-mono font-semibold uppercase tracking-wider truncate" title={m.title}>
                                        M{m.sequence_order}: {m.title}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all shrink-0">
                                    <button onClick={(e) => { e.stopPropagation(); handleAddLesson(m.id, m.lessons?.length || 0) }} className="text-muted-foreground hover:text-primary p-1 cursor-pointer">
                                        <Plus className="h-3.5 w-3.5" />
                                    </button>
                                    <button onClick={(e) => { e.stopPropagation(); handleDeleteModule(m.id) }} className="text-muted-foreground hover:text-red-500 p-1 cursor-pointer">
                                        <Trash2 className="h-3 w-3" />
                                    </button>
                                </div>
                            </div>

                            <div className="p-1 space-y-0.5">
                                {m.lessons?.map((l: any, lIdx: number) => (
                                    <button
                                        key={l.id}
                                        onClick={() => {
                                            setIsEditingCourse(false)
                                            setActiveModule(null)
                                            setActiveLesson(l)
                                            setLessonEditForm({
                                                title: l.title || "",
                                                description: l.description || "",
                                                content_type: l.content_type || "text",
                                                content: l.content || "",
                                                xp_reward: l.xp_reward || 0,
                                                challenge_data: l.challenge_data || null
                                            })
                                        }}
                                        className={`w-full text-left p-2 rounded-lg text-xs flex items-center justify-between group transition-colors cursor-pointer ${
                                            activeLesson?.id === l.id ? 'bg-primary text-primary-foreground font-medium shadow-xs' : 'hover:bg-secondary/60 text-foreground/80'
                                        }`}
                                    >
                                        <div className="flex items-center gap-2 overflow-hidden flex-1">
                                            <div className="flex flex-col gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={(e) => handleReorderLesson(m.id, l.id, "up", e)} disabled={lIdx === 0} className="hover:text-primary-foreground disabled:opacity-20 cursor-pointer"><ArrowUp className="h-2 w-2" /></button>
                                                <button onClick={(e) => handleReorderLesson(m.id, l.id, "down", e)} disabled={lIdx === m.lessons.length - 1} className="hover:text-primary-foreground disabled:opacity-20 cursor-pointer"><ArrowDown className="h-2 w-2" /></button>
                                            </div>
                                            {l.content_type === "interactive" ? <Terminal className="h-3 w-3 shrink-0" /> : <FileText className="h-3 w-3 shrink-0" />}
                                            <span className="truncate">{l.title}</span>
                                        </div>
                                        <div onClick={(e) => handleDeleteLesson(l.id, e)} className="p-1 text-inherit opacity-0 group-hover:opacity-100 transition-all shrink-0 hover:text-red-400 cursor-pointer">
                                            <Trash2 className="h-3 w-3" />
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Editor Space */}
            <div className="flex-1 overflow-y-auto bg-background p-8 custom-scrollbar">
                {(!activeLesson && !activeModule && !isEditingCourse) ? (
                    <div className="h-full flex flex-col items-center justify-center text-muted-foreground/60 max-w-sm mx-auto text-center">
                        <Settings className="h-10 w-10 mb-3 text-muted-foreground/40" />
                        <h3 className="text-base font-semibold text-foreground mb-1">Select Syllabus Component</h3>
                        <p className="text-xs">Choose Course Details, a Module, or a Lesson from the left navigation tree to begin authoring.</p>
                    </div>
                ) : isEditingCourse ? (
                    <div className="max-w-4xl mx-auto space-y-8 pb-24">
                        <div className="flex items-center justify-between border-b border-border/80 pb-5">
                            <div>
                                <span className="text-[10px] font-mono text-primary uppercase tracking-widest bg-primary/10 px-2.5 py-0.5 rounded-full border border-primary/20 font-semibold">
                                    Global Settings
                                </span>
                                <h1 className="font-sans text-3xl font-bold mt-2 text-foreground">Course Details</h1>
                            </div>
                            <button
                                onClick={handleSaveCourseDetails}
                                disabled={isPending}
                                className="px-5 py-2.5 bg-primary hover:bg-primary-active text-primary-foreground text-xs font-mono font-semibold uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 shadow-sm cursor-pointer disabled:opacity-50"
                            >
                                {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                                Save Course
                            </button>
                        </div>

                        <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
                            <div className="space-y-5">
                                <div>
                                    <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-1.5">Title</label>
                                    <input
                                        type="text"
                                        value={courseEditForm.title}
                                        onChange={(e) => setCourseEditForm({ ...courseEditForm, title: e.target.value })}
                                        className="w-full bg-secondary/40 border border-border/80 rounded-xl p-3 text-xs font-sans text-foreground focus:outline-none focus:border-primary/50"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-1.5">Description</label>
                                    <textarea
                                        value={courseEditForm.description}
                                        onChange={(e) => setCourseEditForm({ ...courseEditForm, description: e.target.value })}
                                        rows={5}
                                        className="w-full bg-secondary/40 border border-border/80 rounded-xl p-3 text-xs font-sans text-foreground focus:outline-none focus:border-primary/50 resize-none leading-relaxed"
                                    />
                                </div>

                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-1.5">Difficulty</label>
                                        <select
                                            value={courseEditForm.difficulty}
                                            onChange={(e) => setCourseEditForm({ ...courseEditForm, difficulty: e.target.value })}
                                            className="w-full bg-secondary/40 border border-border/80 rounded-xl p-3 text-xs font-sans text-foreground focus:outline-none focus:border-primary/50"
                                        >
                                            <option>Beginner</option>
                                            <option>Intermediate</option>
                                            <option>Advanced</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-1.5">Estimated Hours</label>
                                        <input
                                            type="number"
                                            value={courseEditForm.duration_hours}
                                            onChange={(e) => setCourseEditForm({ ...courseEditForm, duration_hours: e.target.value })}
                                            className="w-full bg-secondary/40 border border-border/80 rounded-xl p-3 text-xs font-sans text-foreground focus:outline-none focus:border-primary/50"
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="space-y-5">
                                <div className="bg-card/70 border border-border/80 rounded-2xl p-5 space-y-4">
                                    <h3 className="text-xs font-mono font-semibold uppercase tracking-widest text-muted-foreground">Access & Publishing</h3>
                                    
                                    <button 
                                        onClick={() => setCourseEditForm((prev: any) => ({ ...prev, is_published: !prev.is_published }))}
                                        className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                                            courseEditForm.is_published ? 'bg-primary/10 border-primary/30 text-primary font-semibold' : 'bg-secondary/40 border-border/80 text-muted-foreground'
                                        }`}>
                                        <div className="flex items-center gap-2">
                                            {courseEditForm.is_published ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                                            <span className="font-mono text-xs uppercase tracking-wider">
                                                {courseEditForm.is_published ? "Published (Live)" : "Draft Mode"}
                                            </span>
                                        </div>
                                    </button>

                                    <button 
                                        onClick={() => setCourseEditForm((prev: any) => ({ ...prev, is_premium: !prev.is_premium }))}
                                        className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                                            courseEditForm.is_premium ? 'bg-primary/10 border-primary/30 text-primary font-semibold' : 'bg-secondary/40 border-border/80 text-muted-foreground'
                                        }`}>
                                        <div className="flex items-center gap-2">
                                            {courseEditForm.is_premium ? <Lock className="h-4 w-4" /> : <Globe className="h-4 w-4" />}
                                            <span className="font-mono text-xs uppercase tracking-wider">
                                                {courseEditForm.is_premium ? "Architect Only" : "Free Access"}
                                            </span>
                                        </div>
                                    </button>
                                </div>

                                <div>
                                    <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-1.5">Course Thumbnail URL</label>
                                    <input
                                        type="text"
                                        placeholder="https://..."
                                        value={courseEditForm.thumbnail_url}
                                        onChange={(e) => setCourseEditForm({ ...courseEditForm, thumbnail_url: e.target.value })}
                                        className="w-full bg-secondary/40 border border-border/80 rounded-xl p-3 text-xs font-mono focus:outline-none focus:border-primary/50 text-foreground"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : activeModule ? (
                    <div className="max-w-4xl mx-auto space-y-8 pb-24">
                        <div className="flex items-center justify-between border-b border-border/80 pb-5">
                            <div>
                                <span className="text-[10px] font-mono text-primary uppercase tracking-widest bg-primary/10 px-2.5 py-0.5 rounded-full border border-primary/20 font-semibold">
                                    Module Properties
                                </span>
                                <h1 className="font-sans text-3xl font-bold mt-2 text-foreground">Editing Module</h1>
                            </div>
                            <button
                                onClick={handleSaveModule}
                                disabled={isPending}
                                className="px-5 py-2.5 bg-primary hover:bg-primary-active text-primary-foreground text-xs font-mono font-semibold uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 shadow-sm cursor-pointer disabled:opacity-50"
                            >
                                {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                                Save Module
                            </button>
                        </div>
                        <div>
                            <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-1.5">Module Title</label>
                            <input
                                type="text"
                                value={moduleEditForm.title}
                                onChange={(e) => setModuleEditForm({ ...moduleEditForm, title: e.target.value })}
                                className="w-full bg-secondary/40 border border-border/80 rounded-xl p-3 text-xs font-sans text-foreground focus:outline-none focus:border-primary/50"
                            />
                        </div>
                    </div>
                ) : (
                    <div className="max-w-4xl mx-auto space-y-8 pb-24">
                        <div className="flex items-center justify-between border-b border-border/80 pb-5">
                            <div>
                                <div className="flex items-center gap-3">
                                    <span className="text-[10px] font-mono text-primary uppercase tracking-widest bg-primary/10 px-2.5 py-0.5 rounded-full border border-primary/20 font-semibold">
                                        {activeLesson.content_type === "interactive" ? "Terminal Challenge" : "Standard Lesson"}
                                    </span>
                                    <button
                                        onClick={() => {
                                            const newType = lessonEditForm.content_type === 'interactive' ? 'text' : 'interactive'
                                            setLessonEditForm({
                                                ...lessonEditForm,
                                                content_type: newType,
                                                challenge_data: newType === 'interactive' ? { initialCode: '# Code here', expectedOutput: '', instructions: 'Follow instructions' } : null
                                            })
                                        }}
                                        className="text-[10px] font-mono hover:text-primary text-muted-foreground flex items-center gap-1 transition-colors bg-secondary/50 border border-border/80 px-2 py-1 rounded-lg cursor-pointer"
                                    >
                                        <MonitorPlay className="h-3 w-3" /> Toggle Mode
                                    </button>
                                </div>
                                <h1 className="font-sans text-3xl font-bold mt-2 text-foreground">{activeLesson.title}</h1>
                            </div>
                            <button
                                onClick={handleSaveLesson}
                                disabled={isPending}
                                className="px-5 py-2.5 bg-primary hover:bg-primary-active text-primary-foreground text-xs font-mono font-semibold uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 shadow-sm cursor-pointer disabled:opacity-50"
                            >
                                {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                                Save Changes
                            </button>
                        </div>

                        {/* Title & XP */}
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                                <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-1.5">Lesson Title</label>
                                <input
                                    type="text"
                                    value={lessonEditForm.title}
                                    onChange={(e) => setLessonEditForm({ ...lessonEditForm, title: e.target.value })}
                                    className="w-full bg-secondary/40 border border-border/80 rounded-xl p-3 text-xs font-sans text-foreground focus:outline-none focus:border-primary/50"
                                />
                            </div>
                            <div>
                                <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-1.5">XP Reward</label>
                                <input
                                    type="number"
                                    value={lessonEditForm.xp_reward}
                                    onChange={(e) => setLessonEditForm({ ...lessonEditForm, xp_reward: parseInt(e.target.value) || 0 })}
                                    className="w-full bg-secondary/40 border border-border/80 rounded-xl p-3 text-xs font-mono text-foreground focus:outline-none focus:border-primary/50"
                                />
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Lesson Narrative & Instructions</span>
                                <div className="flex bg-secondary/50 border border-border/80 rounded-lg p-0.5">
                                    <button onClick={() => setPreviewMode(false)} className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-mono uppercase tracking-widest transition-colors cursor-pointer ${!previewMode ? "bg-primary text-primary-foreground font-semibold shadow-xs" : "text-muted-foreground hover:text-foreground"}`}>
                                        <Edit3 className="h-3 w-3" /> Edit
                                    </button>
                                    <button onClick={() => setPreviewMode(true)} className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-mono uppercase tracking-widest transition-colors cursor-pointer ${previewMode ? "bg-primary text-primary-foreground font-semibold shadow-xs" : "text-muted-foreground hover:text-foreground"}`}>
                                        <Eye className="h-3 w-3" /> Preview
                                    </button>
                                </div>
                            </div>

                            {!previewMode && (
                                <div className="bg-secondary/30 border border-border/80 rounded-2xl overflow-hidden flex flex-col focus-within:border-primary/50 transition-colors">
                                    <div className="bg-secondary/60 border-b border-border/80 p-2 flex items-center gap-2 overflow-x-auto text-muted-foreground">
                                        <button onClick={() => setLessonEditForm({ ...lessonEditForm, content: lessonEditForm.content + "\n**Bold**" })} className="p-1.5 hover:bg-secondary rounded cursor-pointer" title="Bold"><Bold className="h-3.5 w-3.5" /></button>
                                        <button onClick={() => setLessonEditForm({ ...lessonEditForm, content: lessonEditForm.content + "\n*Italic*" })} className="p-1.5 hover:bg-secondary rounded cursor-pointer" title="Italic"><Italic className="h-3.5 w-3.5" /></button>
                                        <div className="w-px h-4 bg-border/80" />
                                        <button onClick={() => setLessonEditForm({ ...lessonEditForm, content: lessonEditForm.content + "\n[Link Text](url)" })} className="p-1.5 hover:bg-secondary rounded cursor-pointer" title="Link"><LinkIcon className="h-3.5 w-3.5" /></button>
                                        <button onClick={() => setLessonEditForm({ ...lessonEditForm, content: lessonEditForm.content + "\n![Image Description](url)" })} className="p-1.5 hover:bg-secondary rounded cursor-pointer" title="Image"><ImageIcon className="h-3.5 w-3.5" /></button>
                                        <div className="w-px h-4 bg-border/80" />
                                        <button onClick={() => setLessonEditForm({ ...lessonEditForm, content: lessonEditForm.content + "\n`inline code`" })} className="p-1.5 hover:bg-secondary rounded cursor-pointer" title="Inline Code"><Code className="h-3.5 w-3.5" /></button>
                                        <button onClick={() => setLessonEditForm({ ...lessonEditForm, content: lessonEditForm.content + "\n```python\n# Execution code...\n```" })} className="flex items-center gap-1.5 p-1.5 px-2 hover:bg-secondary rounded text-primary font-mono text-[10px] font-semibold uppercase cursor-pointer" title="Code Block"><FileCode2 className="h-3 w-3" /> Code Block</button>
                                    </div>
                                    <textarea
                                        value={lessonEditForm.content}
                                        onChange={(e) => setLessonEditForm({ ...lessonEditForm, content: e.target.value })}
                                        className="w-full bg-transparent p-4 text-xs font-mono outline-none min-h-[320px] resize-y text-foreground leading-relaxed placeholder:text-muted-foreground/50"
                                        placeholder="Author technical syllabus content in standard markdown..."
                                    />
                                </div>
                            )}

                            {previewMode && (
                                <div className="bg-secondary/30 border border-border/80 rounded-2xl p-6 min-h-[320px] overflow-x-auto text-xs leading-relaxed text-foreground/90">
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: (lessonEditForm.content || "No content provided.")
                                                .replace(/\n/g, '<br/>')
                                        }}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Interactive Challenge Data */}
                        {lessonEditForm.content_type === "interactive" && (
                            <div className="space-y-4 pt-6 border-t border-border/80">
                                <h3 className="text-xs font-mono font-semibold uppercase tracking-widest text-primary flex items-center gap-2">
                                    <Terminal className="h-4 w-4" /> Terminal Sandboxing Config
                                </h3>

                                <div>
                                    <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-1">Challenge Instructions</label>
                                    <textarea
                                        value={lessonEditForm.challenge_data?.instructions || ""}
                                        onChange={(e) => setLessonEditForm({
                                            ...lessonEditForm,
                                            challenge_data: { ...(lessonEditForm.challenge_data || {}), instructions: e.target.value }
                                        })}
                                        className="w-full bg-secondary/40 border border-border/80 rounded-xl p-3 text-xs font-sans text-foreground focus:outline-none focus:border-primary/50"
                                        rows={2}
                                    />
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-1">Initial Code</label>
                                        <textarea
                                            value={lessonEditForm.challenge_data?.initialCode || ""}
                                            onChange={(e) => setLessonEditForm({
                                                ...lessonEditForm,
                                                challenge_data: { ...(lessonEditForm.challenge_data || {}), initialCode: e.target.value }
                                            })}
                                            className="w-full bg-[#111827] text-blue-400 border border-border/80 rounded-xl p-3 text-xs font-mono focus:outline-none min-h-[140px] shadow-inner"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-1">Expected Output</label>
                                        <input
                                            type="text"
                                            value={lessonEditForm.challenge_data?.expectedOutput || ""}
                                            onChange={(e) => setLessonEditForm({
                                                ...lessonEditForm,
                                                challenge_data: { ...(lessonEditForm.challenge_data || {}), expectedOutput: e.target.value }
                                            })}
                                            className="w-full bg-[#111827] text-primary border border-border/80 rounded-xl p-3 text-xs font-mono focus:outline-none"
                                            placeholder="e.g. 120"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
