"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import {
  Globe,
  Terminal,
  Cpu,
  Code2,
  Layout,
  Palette,
  Zap,
  ArrowRight,
  PlayCircle,
  CheckCircle2,
  BookOpen,
  ChevronDown,
  ChevronUp,
  TerminalSquare,
  Layers,
  Braces
} from "lucide-react"
import { TechLogo } from "@/components/tech-logo"
import { useEnrollments } from "@/lib/user-learning-store"

interface LabTrack {
  id: string
  title: string
  category: "Web Labs" | "Systems & Compilers" | "Algorithms"
  badge: string
  runtimeTag: string
  interactiveBadge: string
  desc: string
  icon: typeof Globe
  capabilities: string[]
  courseUrl: string
  overviewUrl: string
}

const LAB_TRACKS: LabTrack[] = [
  {
    id: "webdev",
    title: "Live Web & DOM Split-Pane Lab",
    category: "Web Labs",
    badge: "Interactive Frontend",
    runtimeTag: "Live HTML/CSS/JS",
    interactiveBadge: "Instant Split-Pane Browser",
    desc: "Code HTML5 structure and CSS3 styles on the left; watch the browser screen render your components in real time without refreshing.",
    icon: Globe,
    capabilities: [
      "Zero-latency live browser preview as you type",
      "Interactive Flexbox and Grid visual alignment sandbox",
      "DOM event inspector and button click triggers",
    ],
    courseUrl: "/programs/webdev/course",
    overviewUrl: "/programs/webdev",
  },
  {
    id: "python",
    title: "Python In-Browser Scripting & APIs",
    category: "Systems & Compilers",
    badge: "Data & Backend",
    runtimeTag: "Python 3.12 WebAssembly",
    interactiveBadge: "Instant Python Terminal",
    desc: "Execute real Python algorithms and FastAPI endpoints directly in your browser. Inspect variable memory states and terminal outputs.",
    icon: Terminal,
    capabilities: [
      "Instant terminal stdout/stderr stream execution",
      "Step-by-step visual logic & dictionary memory inspector",
      "Interactive API route testing with mock requests",
    ],
    courseUrl: "/programs/python/course",
    overviewUrl: "/programs/python",
  },
  {
    id: "c",
    title: "C Memory & Pointer Visualizer",
    category: "Systems & Compilers",
    badge: "Hardware & Memory",
    runtimeTag: "Clang WebAssembly",
    interactiveBadge: "Interactive Pointer & RAM Map",
    desc: "Demystify memory addresses (&) and pointers (*). Watch variables allocate on the stack and heap in real time with zero cryptic errors.",
    icon: Cpu,
    capabilities: [
      "Interactive pointer address dereferencing diagrams",
      "Stack frame & heap memory allocation visualizer",
      "Standard C library in-browser compiler output",
    ],
    courseUrl: "/programs/c/course",
    overviewUrl: "/programs/c",
  },
  {
    id: "dsa",
    title: "Step-by-Step Algorithm Animator",
    category: "Algorithms",
    badge: "Computer Science",
    runtimeTag: "Visual Debugger",
    interactiveBadge: "Array & Tree Stepper",
    desc: "Step through sorting, two-pointers, binary search, and trees line-by-line. See indices shift, swap, and compare with color-coded nodes.",
    icon: Braces,
    capabilities: [
      "Frame-by-frame algorithm execution playback",
      "Two-pointer & sliding window visual highlights",
      "Time and space complexity benchmark metrics",
    ],
    courseUrl: "/dsa",
    overviewUrl: "/dsa",
  },
  {
    id: "react",
    title: "React 19 & Component Sandboxes",
    category: "Web Labs",
    badge: "Modern UI",
    runtimeTag: "React 19 Server/Client",
    interactiveBadge: "Live Reactive Sandbox",
    desc: "Build declarative component states with useState and useEffect. Experiment with reactive forms and server-side state machines.",
    icon: Zap,
    capabilities: [
      "Live component hot-reloading in browser",
      "Visual hook dependency tracking and render counters",
      "State-machine inspector for multi-step UI flows",
    ],
    courseUrl: "/programs/react/course",
    overviewUrl: "/programs/react",
  },
  {
    id: "git",
    title: "Visual Git DAG & Docker Terminal",
    category: "Systems & Compilers",
    badge: "DevOps & Cloud",
    runtimeTag: "Terminal Simulation",
    interactiveBadge: "Interactive Commit DAG Graph",
    desc: "Practice branching, merging, and rebasing on an interactive topological commit tree. Run simulated Docker build and container commands.",
    icon: TerminalSquare,
    capabilities: [
      "Visual branch pointer movements (HEAD, main, feature)",
      "Interactive merge conflict resolution visualizer",
      "Multi-stage Docker container build simulation",
    ],
    courseUrl: "/programs/git/course",
    overviewUrl: "/programs/git",
  },
]

export function FeaturedMasterTracks() {
  const { isEnrolled } = useEnrollments()
  const [selectedFilter, setSelectedFilter] = useState<"All" | "Web Labs" | "Systems & Compilers" | "Algorithms">("All")
  const [isExpanded, setIsExpanded] = useState(false)

  const filteredLabs = useMemo(() => {
    return selectedFilter === "All"
      ? LAB_TRACKS
      : LAB_TRACKS.filter((l) => l.category === selectedFilter)
  }, [selectedFilter])

  const displayedLabs = isExpanded ? filteredLabs : filteredLabs.slice(0, 3)

  return (
    <section id="interactive-labs" className="relative py-16 lg:py-20 border-b border-border/50 bg-secondary/30 dark:bg-card/20 scroll-mt-20">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10">
          <div className="max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-[11px] font-mono font-medium text-primary uppercase tracking-widest mb-3 backdrop-blur-xs shadow-xs">
              <TerminalSquare className="h-3.5 w-3.5" />
              <span>Zero-Setup In-Browser Sandboxes</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground font-normal tracking-tight leading-tight">
              Interactive Guided Labs
            </h2>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
              Write and test code directly in your browser with live previews, WebAssembly compilers, and algorithm animators.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex overflow-x-auto no-scrollbar max-w-full -mx-4 px-4 sm:mx-0 sm:px-0 overscroll-x-contain">
            <div className="inline-flex items-center gap-1.5 rounded-2xl border border-hairline bg-card/80 p-1.5 backdrop-blur-md shadow-xs shrink-0 text-xs font-mono pr-4 sm:pr-1.5">
              {(["All", "Web Labs", "Systems & Compilers", "Algorithms"] as const).map((tab) => {
                const isActive = selectedFilter === tab
                const count = tab === "All" ? LAB_TRACKS.length : LAB_TRACKS.filter((l) => l.category === tab).length
                return (
                  <button
                    key={tab}
                    onClick={() => {
                      setSelectedFilter(tab)
                      setIsExpanded(false)
                    }}
                    className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 transition-all cursor-pointer ${
                      isActive
                        ? "bg-primary text-primary-foreground font-semibold shadow-2xs"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    <span>{tab}</span>
                    <span className={`rounded-full px-1.5 py-0.2 text-[10px] font-mono ${isActive ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"}`}>
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Labs Cards Grid: 3-column curated interactive showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {displayedLabs.map((lab) => {
            const enrolled = isEnrolled(lab.id)
            return (
              <div
                key={lab.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-stone-200/90 dark:border-stone-800/90 bg-card p-5 sm:p-6 transition-all duration-200 hover:border-primary/40 hover:-translate-y-1 shadow-xs"
              >
                <div>
                  {/* Top Header: Logo + Badges */}
                  <div className="flex items-center justify-between gap-3 mb-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-hairline bg-secondary/80 p-1.5 shadow-2xs group-hover:scale-105 group-hover:border-primary/40 transition-all">
                        <TechLogo slug={lab.id} className="h-5 w-5 object-contain" />
                      </div>
                      <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-mono font-semibold text-primary uppercase tracking-wider">
                        {lab.badge}
                      </span>
                    </div>

                    <span className="text-[10px] font-mono text-muted-foreground border border-hairline rounded-md px-2 py-0.5 bg-secondary/60">
                      {lab.runtimeTag}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <Link href={lab.overviewUrl} className="group-hover:text-primary transition-colors">
                    <h3 className="font-serif text-lg font-medium text-foreground tracking-tight leading-snug">
                      {lab.title}
                    </h3>
                  </Link>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    {lab.desc}
                  </p>
                </div>

                {/* Footer Action */}
                <div className="mt-5 pt-3.5 border-t border-hairline/60 flex items-center gap-2">
                  <Link
                    href={lab.courseUrl}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-primary hover:bg-primary-active text-primary-foreground px-4 py-2.5 text-xs font-semibold shadow-xs transition-all active:scale-[0.98] cursor-pointer"
                  >
                    <PlayCircle className="h-4 w-4" />
                    <span>Launch Sandbox</span>
                  </Link>
                  <Link
                    href={lab.overviewUrl}
                    className="inline-flex items-center justify-center gap-1 rounded-xl border border-hairline bg-secondary/60 hover:bg-secondary px-3.5 py-2.5 text-xs font-medium text-foreground transition-all cursor-pointer"
                  >
                    <span>Details</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        {/* Expand / Collapse Button */}
        {filteredLabs.length > 3 && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-2 rounded-xl border border-hairline bg-card hover:bg-secondary px-5 py-2.5 text-xs font-mono font-medium text-foreground transition-all cursor-pointer shadow-2xs"
            >
              <span>{isExpanded ? "Collapse to 3 Sandboxes" : `Show All ${filteredLabs.length} Interactive Sandboxes`}</span>
              {isExpanded ? <ChevronUp className="h-3.5 w-3.5 text-primary" /> : <ChevronDown className="h-3.5 w-3.5 text-primary" />}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
