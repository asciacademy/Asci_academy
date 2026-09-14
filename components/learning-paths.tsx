"use client"

import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useScrollReveal } from "@/hooks/use-gsap"
import {
  Route, CheckCircle2, Clock,
  Braces, Code2, Globe, Cloud,
  Database, Server, Cpu, BrainCircuit,
  Layout, Smartphone, Blocks, Layers,
} from "lucide-react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const roadmaps = {
  fullstack: {
    id: "fullstack",
    name: "Full-Stack Developer",
    description: "A clear 24-week path from basic coding to building real full-stack web applications.",
    phases: [
      {
        phase: "Phase 1", title: "Coding Basics & Logic", weeks: "Weeks 1-4",
        topics: ["JavaScript & TypeScript Basics", "Variables, Loops & Functions", "Basic Data Structures", "Git & GitHub Basics"],
        icon: Code2
      },
      {
        phase: "Phase 2", title: "Data Structures & Algorithms", weeks: "Weeks 5-10",
        topics: ["Lists, Stacks & Queues", "Trees & Graphs Explained Simply", "Sorting & Searching Algorithms", "Problem Solving Practice"],
        icon: Braces
      },
      {
        phase: "Phase 3", title: "Building Full-Stack Apps", weeks: "Weeks 11-18",
        topics: ["Modern React & Next.js", "Building REST APIs with Node.js", "Databases with PostgreSQL & Supabase", "Deploying Apps to the Web"],
        icon: Globe
      },
      {
        phase: "Phase 4", title: "System Design & Interview Prep", weeks: "Weeks 19-24",
        topics: ["How Big Systems Work", "Practice Coding Interviews", "Polishing Your Portfolio", "Resume & Job Search Help"],
        icon: Layers
      }
    ]
  },
  frontend: {
    id: "frontend",
    name: "Frontend Developer",
    description: "Learn how to build responsive, beautiful, and accessible web user interfaces.",
    phases: [
      {
        phase: "Phase 1", title: "HTML, CSS & Modern JavaScript", weeks: "Weeks 1-4",
        topics: ["Modern HTML & Semantic Layouts", "CSS Styling & Responsive Design", "JavaScript ES6+ Basics", "Web Accessibility Standards"],
        icon: Layout
      },
      {
        phase: "Phase 2", title: "React & Next.js", weeks: "Weeks 5-10",
        topics: ["React Components & Hooks", "Building Pages with Next.js", "State Management Made Simple", "Tailwind CSS Styling"],
        icon: Code2
      },
      {
        phase: "Phase 3", title: "Animations & Interactions", weeks: "Weeks 11-16",
        topics: ["Smooth Page Transitions", "Interactive Animations with Framer Motion", "Forms & Input Validation", "Mobile-Friendly Touch Events"],
        icon: Smartphone
      },
      {
        phase: "Phase 4", title: "Web Speed & Deployment", weeks: "Weeks 17-20",
        topics: ["Making Pages Load Faster", "Testing Web Interfaces", "Deploying to Vercel & Netlify", "Frontend Interview Questions"],
        icon: Cloud
      }
    ]
  },
  backend: {
    id: "backend",
    name: "Backend & Cloud",
    description: "Learn how to build reliable servers, databases, and secure APIs.",
    phases: [
      {
        phase: "Phase 1", title: "Backend Fundamentals", weeks: "Weeks 1-4",
        topics: ["Node.js & Express Basics", "REST API Design", "User Authentication & JWT", "Error Handling & Validation"],
        icon: Server
      },
      {
        phase: "Phase 2", title: "Databases & Storage", weeks: "Weeks 5-10",
        topics: ["PostgreSQL & Relational Databases", "Writing SQL Queries", "Caching with Redis", "File Uploads & Storage"],
        icon: Database
      },
      {
        phase: "Phase 3", title: "Microservices & Docker", weeks: "Weeks 11-16",
        topics: ["Docker Containers from Scratch", "Connecting Multiple Services", "Message Queues", "Real-Time WebSockets"],
        icon: Blocks
      },
      {
        phase: "Phase 4", title: "Cloud Deployment & Scale", weeks: "Weeks 17-20",
        topics: ["Deploying to Cloud Servers", "Monitoring & Logging", "API Security Best Practices", "Backend System Design Interviews"],
        icon: Cpu
      }
    ]
  },
  ai: {
    id: "ai",
    name: "Python & AI Engineering",
    description: "From Python programming to building practical AI tools and apps.",
    phases: [
      {
        phase: "Phase 1", title: "Python Programming", weeks: "Weeks 1-5",
        topics: ["Python Syntax & Data Types", "Working with Data (Pandas & NumPy)", "Reading & Cleaning Data", "Basic Math for Machine Learning"],
        icon: Code2
      },
      {
        phase: "Phase 2", title: "Machine Learning Basics", weeks: "Weeks 6-12",
        topics: ["How Machine Learning Works", "Predicting Data with Scikit-Learn", "Evaluating Model Accuracy", "Feature Engineering Simply Explained"],
        icon: BrainCircuit
      },
      {
        phase: "Phase 3", title: "Deep Learning & Neural Networks", weeks: "Weeks 13-18",
        topics: ["Neural Networks Explained Step-by-Step", "Building Models with PyTorch", "Natural Language Processing", "Working with Pretrained Models"],
        icon: Cpu
      },
      {
        phase: "Phase 4", title: "Building AI Applications", weeks: "Weeks 19-24",
        topics: ["Building Apps with LLM APIs", "RAG: Giving AI Your Own Documents", "AI Chatbots & Agents", "Deploying AI Apps Online"],
        icon: Layers
      }
    ]
  }
}

type RoadmapKey = keyof typeof roadmaps

export function LearningPaths() {
  const [activeTab, setActiveTab] = useState<RoadmapKey>("fullstack")
  const headerRef = useScrollReveal<HTMLDivElement>({ y: 30, duration: 0.7 })
  const timelineRef = useRef<HTMLDivElement>(null)

  const activeRoadmap = roadmaps[activeTab]
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (!timelineRef.current) return
    const cards = timelineRef.current.querySelectorAll(".path-card")

    const ctx = gsap.context(() => {
      if (hasAnimated) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.35, stagger: 0.08, ease: "power2.out" }
        )
      } else {
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { y: 30, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 0.6, ease: "power2.out",
              scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none none" },
            }
          )
        })
        setHasAnimated(true)
      }
    }, timelineRef)

    return () => ctx.revert()
  }, [activeTab, hasAnimated])

  const handleTabChange = (key: RoadmapKey) => {
    if (key === activeTab) return
    setActiveTab(key)
  }

  return (
    <section id="learning-paths" className="relative py-20 lg:py-28 bg-background">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Header with Dedicated Axel Stage */}
        <div ref={headerRef} className="relative mb-14 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="max-w-2xl text-left">
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-primary font-medium mb-3">
              <Route className="h-3.5 w-3.5" />
              <span>Learning Roadmaps</span>
            </div>
            <h2 className="font-serif text-3xl font-normal tracking-tight text-foreground sm:text-4xl lg:text-5xl" style={{ letterSpacing: "-1px" }}>
              Step-by-Step Learning Roadmaps
            </h2>
            <p className="mt-3 max-w-xl text-sm sm:text-base text-body leading-relaxed">
              {activeRoadmap.description}
            </p>
          </div>

          {/* Dedicated Axel Stage: Reserved layout space so nothing overlays */}
          <div className="relative shrink-0 w-64 h-52 flex items-center justify-center self-center lg:self-auto">
            <div
              id="learning-paths-robot-anchor"
              className="w-full h-full relative flex items-center justify-center pointer-events-none select-none"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Tab Selector — Category tabs */}
        <div className="flex justify-center mb-16 relative z-20">
          <div className="inline-flex flex-wrap items-center justify-center gap-1 rounded-lg border border-hairline bg-secondary p-1">
            {(Object.keys(roadmaps) as RoadmapKey[]).map((key) => {
              const roadmap = roadmaps[key]
              const isActive = activeTab === key
              return (
                <button
                  key={key}
                  onClick={() => handleTabChange(key)}
                  suppressHydrationWarning
                  className={`rounded-md px-4 py-2 text-xs font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-card text-foreground shadow-xs border border-hairline"
                      : "text-muted-foreground hover:text-foreground bg-transparent"
                  }`}
                >
                  {roadmap.name}
                </button>
              )
            })}
          </div>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative mt-8 max-w-5xl mx-auto">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-hairline lg:block" aria-hidden="true" />

          <div className="flex flex-col gap-8 lg:gap-12">
            {activeRoadmap.phases.map((path, i) => {
              const isLeft = i % 2 === 0
              const IconComp = path.icon
              return (
                <div key={path.phase} className="path-card relative">
                  {/* Dot on center line */}
                  <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block z-10" aria-hidden="true">
                    <div className="h-3 w-3 rounded-full bg-primary ring-4 ring-background" />
                  </div>

                  <div className={`flex lg:w-1/2 ${isLeft ? "lg:pr-12" : "lg:ml-auto lg:pl-12"}`}>
                    <div className="group flex w-full flex-col overflow-hidden rounded-xl border border-hairline bg-card transition-all duration-300 hover:border-foreground/20 hover:shadow-sm">
                      {/* Header */}
                      <div className="flex items-center gap-3 border-b border-hairline/60 px-6 py-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-hairline bg-secondary text-primary">
                          <IconComp className="h-5 w-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground truncate">
                            {path.phase}
                          </p>
                          <h3 className="font-serif text-base font-normal text-foreground truncate">
                            {path.title}
                          </h3>
                        </div>
                        <div className="ml-auto flex shrink-0 items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground border border-hairline">
                          <Clock className="h-3 w-3 text-primary" />
                          <span>{path.weeks}</span>
                        </div>
                      </div>

                      {/* Topics */}
                      <div className="flex flex-col gap-2.5 p-6">
                        {path.topics.map((topic) => (
                          <div key={topic} className="flex items-center gap-2.5 text-xs text-body">
                            <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                            <span>{topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
