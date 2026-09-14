"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ChevronRight, 
  MonitorPlay, 
  Zap, 
  Trophy, 
  ArrowLeft, 
  Terminal, 
  Menu,
  X,
  BookOpen
} from "lucide-react"

import { courseCurriculum, Lesson, Chapter, Part } from "@/lib/dsa-advanced-course-data"
import LessonDialog from "@/components/dsa/LessonDialog"
import { cn } from "@/lib/utils"

export default function DSAAdvancedCourseDocsLayout() {
  const [activeLesson, setActiveLesson] = useState<Lesson>(courseCurriculum[0].chapters[0].concepts[0])
  const [openChapters, setOpenChapters] = useState<Record<string, boolean>>({
    [courseCurriculum[0].chapters[0].id]: true
  })
  const [simulationLesson, setSimulationLesson] = useState<{lesson: Lesson, color: string} | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleChapter = (chapterId: string) => {
    setOpenChapters(prev => ({ ...prev, [chapterId]: !prev[chapterId] }))
  }

  let currentPartTitle = ""
  let currentChapterTitle = ""

  for (const part of courseCurriculum) {
    for (const chapter of part.chapters) {
      const allLessons = [...chapter.concepts, ...(chapter.missions || []), ...(chapter.problems || [])]
      if (allLessons.some(l => l.id === activeLesson.id)) {
        currentPartTitle = part.title
        currentChapterTitle = chapter.title
        break
      }
    }
  }

  if (!mounted) return null

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden font-sans">
      {/* MOBILE HEADER */}
      <div className="lg:hidden absolute top-0 left-0 right-0 h-16 border-b border-border bg-card/90 backdrop-blur-xl z-50 flex items-center justify-between px-4">
        <Link href="/programs/dsa-advanced" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
            <ArrowLeft size={16} />
            <span className="font-serif text-sm font-semibold tracking-tight text-foreground">
              DSA Advanced
            </span>
        </Link>
        <button className="text-foreground p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* LEFT SIDEBAR NAVIGATION */}
      <aside className={cn(
        "w-72 shrink-0 border-r border-border/80 dark:border-white/10 bg-card/70 dark:bg-[#141413]/95 backdrop-blur-2xl flex flex-col z-40 transition-transform duration-300 absolute lg:relative h-full",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Header - Desktop */}
        <div className="hidden lg:flex h-14 border-b border-border/70 dark:border-white/10 items-center justify-between px-4 shrink-0">
          <Link href="/programs/dsa-advanced" className="group flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
            <span>DSA Advanced</span>
          </Link>
          <span className="rounded-full bg-primary/10 border border-primary/20 px-2 py-0.5 text-[10px] font-mono font-medium text-primary">
            Curriculum
          </span>
        </div>

        {/* Navigation Tree */}
        <nav className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-3 mt-14 lg:mt-0">
          {courseCurriculum.map((part) => (
            <div key={part.id} className="space-y-1">
              <div className="flex items-center justify-between px-2 py-0.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground/70 font-semibold">
                  {part.title}
                </span>
              </div>
              <div className="space-y-0.5">
                {part.chapters.map(chapter => {
                  const hasMissions = (chapter.missions || chapter.problems || []).length > 0;
                  const isOpen = openChapters[chapter.id];
                  const allChapterLessons = [...chapter.concepts, ...(chapter.missions || []), ...(chapter.problems || [])];
                  return (
                    <div key={chapter.id} className="space-y-0.5">
                      <button 
                        onClick={() => toggleChapter(chapter.id)}
                        className="w-full flex items-center justify-between gap-1.5 px-2 py-1.5 text-xs font-medium hover:text-primary transition-colors text-foreground/90 rounded-lg hover:bg-secondary/50 text-left cursor-pointer"
                      >
                        <div className="flex items-center gap-1.5 min-w-0 flex-1">
                          <ChevronRight size={12} className={cn("transition-transform text-muted-foreground shrink-0", isOpen && "rotate-90 text-primary")} />
                          <span className="truncate text-xs">{chapter.title}</span>
                        </div>
                        <span className="shrink-0 text-[10px] font-mono text-muted-foreground/60">
                          {allChapterLessons.length}
                        </span>
                      </button>
                      
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden border-l border-border/60 dark:border-white/10 ml-3.5 pl-2 space-y-0.5"
                          >
                            {/* Concepts */}
                            {chapter.concepts.map(lesson => (
                              <LessonNavItem 
                                key={lesson.id} 
                                lesson={lesson} 
                                isActive={activeLesson.id === lesson.id} 
                                onClick={() => {
                                  setActiveLesson(lesson)
                                  setIsMobileMenuOpen(false)
                                }} 
                              />
                            ))}
                            {/* Practice */}
                            {hasMissions && (
                                <div className="pt-2 pb-0.5">
                                    <span className="text-[10px] font-mono uppercase text-muted-foreground/70 pl-2 tracking-wider">Practice</span>
                                </div>
                            )}
                            {(chapter.missions || chapter.problems || []).map(lesson => (
                              <LessonNavItem 
                                key={lesson.id} 
                                lesson={lesson} 
                                isActive={activeLesson.id === lesson.id} 
                                onClick={() => {
                                  setActiveLesson(lesson)
                                  setIsMobileMenuOpen(false)
                                }} 
                              />
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer HUD */}
        <div className="p-3.5 border-t border-border/70 dark:border-white/10 bg-secondary/15 shrink-0 flex items-center justify-between text-[10px] font-mono text-muted-foreground">
          <span>Advanced Track</span>
          <span className="text-primary font-medium">Self-Paced</span>
        </div>
      </aside>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-30 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 relative z-10 flex flex-col bg-background overflow-y-auto custom-scrollbar pt-16 lg:pt-0">
         <header className="hidden lg:flex h-14 border-b border-border/80 dark:border-white/10 items-center justify-between px-8 sticky top-0 bg-background/90 backdrop-blur-md z-30">
            <div className="flex items-center gap-2 text-xs text-muted-foreground truncate max-w-lg">
               <span className="truncate">{currentPartTitle.split('—')[0]?.trim() || currentPartTitle}</span>
               <ChevronRight size={12} className="shrink-0" />
               <span className="truncate font-medium text-foreground">{currentChapterTitle}</span>
               <ChevronRight size={12} className="shrink-0" />
               <span className="text-primary shrink-0 font-medium">Lesson</span>
            </div>

            <div className="flex items-center gap-3 shrink-0">
               <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10">
                 <Trophy size={13} className="text-primary" />
                 <span className="text-xs font-semibold text-primary">19,500 XP</span>
               </div>
               <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card">
                 <Zap size={13} className="text-primary" />
                 <span className="text-xs font-semibold text-foreground">7 Day Streak</span>
               </div>
            </div>
         </header>

         <div className="max-w-4xl mx-auto w-full p-6 lg:p-12 pb-32">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeLesson.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="space-y-8"
              >
                 <div className="lg:hidden flex items-center gap-2 text-xs text-muted-foreground truncate pb-3 border-b border-border mb-6">
                   <span className="truncate">{currentChapterTitle}</span>
                 </div>

                 <div className="space-y-4">
                    <div className="flex items-start gap-4">
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-primary/10 text-primary shrink-0">
                            {activeLesson.icon ? <activeLesson.icon size={22} /> : <BookOpen size={22} />}
                        </div>
                        <div>
                            <span className="text-xs font-mono uppercase tracking-wider text-primary font-medium block mb-1">
                            {activeLesson.type}
                            </span>
                            <h1 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-foreground leading-tight">
                                {activeLesson.title}
                            </h1>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-1">
                        {activeLesson.difficulty && (
                            <span className="px-2.5 py-0.5 text-xs font-medium rounded-full border border-border bg-card text-muted-foreground">
                            {activeLesson.difficulty}
                            </span>
                        )}
                        <span className="px-2.5 py-0.5 text-xs font-medium rounded-full border border-primary/30 bg-primary/10 text-primary">
                            +{activeLesson.xpReward || (activeLesson.type === 'concept' ? 75 : 200)} XP
                        </span>
                        {activeLesson.type === 'practice' && (
                            <span className="px-2.5 py-0.5 text-xs font-medium rounded-full border border-primary/20 bg-primary/5 text-primary">
                                Advanced Problem
                            </span>
                        )}
                    </div>
                 </div>

                 <div className="p-5 border border-border bg-card rounded-2xl relative overflow-hidden shadow-xs">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-primary" />
                    <p className="text-base sm:text-lg font-serif italic text-foreground/90 leading-relaxed pl-2">
                        "{activeLesson.tldr}"
                    </p>
                 </div>

                 <div className="text-base text-foreground/80 leading-relaxed space-y-5">
                   {activeLesson.description.split('\n\n').map((para, i) => {
                     if (para.includes('\n•') || para.includes('\n- ') || para.includes('\n1. ')) {
                        const lines = para.split('\n');
                        const intro = lines[0] && !lines[0].match(/^[•\-1-9]/) ? lines[0] : null;
                        const listItems = intro ? lines.slice(1) : lines;
                        
                        return (
                            <div key={i} className="space-y-3">
                                {intro && <p className="font-medium text-foreground">{intro}</p>}
                                <ul className="space-y-2 list-disc pl-5 text-muted-foreground">
                                    {listItems.map((item, j) => {
                                        const cleanItem = item.replace(/^[•\-\d\.]+\s*/, '');
                                        const formattedItem = cleanItem.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>');
                                        return <li key={j} dangerouslySetInnerHTML={{ __html: formattedItem }} />;
                                    })}
                                </ul>
                            </div>
                        )
                     }
                     const formattedPara = para.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>');
                     return <p key={i} dangerouslySetInnerHTML={{ __html: formattedPara }} />
                   })}
                 </div>

                 {activeLesson.code && (
                   <div className="mt-10 space-y-3">
                     <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                       <Terminal size={14} className="text-primary" />
                       <span>{activeLesson.type === 'concept' ? 'Reference Code / Implementation' : 'Problem Template'}</span>
                     </h3>
                      <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-[#181715] dark:bg-[#141413] overflow-hidden text-[#ea580c] font-mono text-xs shadow-inner">
                        {/* Mac-style mock window header for code block */}
                        <div className="px-4 py-2.5 border-b border-border/80 dark:border-white/10 bg-[#141413]/80 flex items-center gap-2">
                             <div className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
                             <div className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                             <div className="w-2.5 h-2.5 rounded-full bg-[#ea580c]/70" />
                             <span className="ml-3 font-mono text-[11px] text-muted-foreground">{activeLesson.id}.py</span>
                        </div>

                       <pre className="p-5 text-[13px] font-mono text-slate-200 overflow-x-auto whitespace-pre-wrap leading-relaxed custom-scrollbar">
                         <code>{activeLesson.code}</code>
                       </pre>
                     </div>
                   </div>
                 )}

                 <div className="pt-8 mt-10 border-t border-border flex flex-col sm:flex-row gap-5 items-center justify-between">
                   <div className="flex flex-col text-center sm:text-left">
                     <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Interactive Workspace</span>
                     <span className="font-serif text-xl font-normal text-foreground">Interactive Simulation Sandbox</span>
                   </div>
                   <button 
                     onClick={() => setSimulationLesson({ lesson: activeLesson, color: activeLesson.color || "hsl(var(--primary))" })}
                     className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-primary hover:bg-primary-active text-primary-foreground px-7 py-3 text-sm font-semibold font-mono transition-colors shadow-sm cursor-pointer"
                   >
                     <MonitorPlay size={16} />
                     <span>Launch Sandbox</span>
                   </button>
                 </div>
              </motion.div>
            </AnimatePresence>
         </div>
      </main>

      <AnimatePresence>
        {simulationLesson && (
          <LessonDialog 
            lesson={simulationLesson.lesson}
            partColor={simulationLesson.color}
            onClose={() => setSimulationLesson(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

function LessonNavItem({ lesson, isActive, onClick }: { lesson: Lesson, isActive: boolean, onClick: () => void }) {
  const Icon = lesson.icon || BookOpen
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full flex items-start gap-2.5 px-3 py-2 text-left transition-all rounded-lg text-xs cursor-pointer",
        isActive 
          ? "bg-primary/10 text-primary font-semibold" 
          : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
      )}
    >
      <Icon size={14} className={cn("mt-0.5 shrink-0", isActive ? "text-primary" : "text-muted-foreground")} />
      <div className="flex flex-col overflow-hidden">
        <span className="leading-snug truncate">{lesson.title}</span>
        {lesson.type === 'practice' && <span className={cn("text-[9px] font-mono uppercase tracking-wider mt-0.5", isActive ? "text-primary" : "text-muted-foreground/70")}>Practice</span>}
      </div>
    </button>
  )
}
