"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  Search,
  BookOpen,
  Code2,
  Cpu,
  Layers,
  Network,
  Terminal,
  GraduationCap,
  CreditCard,
  LayoutDashboard,
  User,
  Database,
  Zap,
  CheckCircle2,
  Briefcase,
  FolderGit2,
  Trophy,
  Award,
  FileCheck,
} from "lucide-react"
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command"

interface SearchCommandDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SearchCommandDialog({ open, onOpenChange }: SearchCommandDialogProps) {
  const router = useRouter()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        onOpenChange(!open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [open, onOpenChange])

  const runCommand = React.useCallback(
    (command: () => void) => {
      onOpenChange(false)
      command()
    },
    [onOpenChange]
  )

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Quick Navigation & Search"
      description="Search curriculum tracks, DSA problems, systems theory and tools..."
      className="border border-border/80 bg-card/95 backdrop-blur-2xl shadow-2xl max-w-xl"
    >
      <CommandInput placeholder="Search curriculum, 474 problems, OS, Java, Python..." />
      <CommandList className="max-h-[380px] p-2">
        <CommandEmpty className="py-8 text-center text-xs text-muted-foreground">
          No matching lessons, problems or tracks found.
        </CommandEmpty>

        {/* Engineering Curricula */}
        <CommandGroup heading="Engineering Curricula & Tracks">
          <CommandItem
            onSelect={() => runCommand(() => router.push("/programs/python"))}
            className="flex items-center gap-2.5 px-3 py-2 text-xs cursor-pointer rounded-lg hover:bg-secondary"
          >
            <Terminal className="h-4 w-4 text-primary" />
            <div className="flex flex-col">
              <span className="font-medium text-foreground">Production Python Engineering</span>
              <span className="text-[10px] text-muted-foreground">24 Chapters • CPython, Asyncio, Automata & Microservices</span>
            </div>
          </CommandItem>

          <CommandItem
            onSelect={() => runCommand(() => router.push("/programs/java"))}
            className="flex items-center gap-2.5 px-3 py-2 text-xs cursor-pointer rounded-lg hover:bg-secondary"
          >
            <Cpu className="h-4 w-4 text-primary" />
            <div className="flex flex-col">
              <span className="font-medium text-foreground">Enterprise Java Engineering</span>
              <span className="text-[10px] text-muted-foreground">Beginner to Hard • JVM Internals, Concurrency & Spring</span>
            </div>
          </CommandItem>

          <CommandItem
            onSelect={() => runCommand(() => router.push("/programs/react"))}
            className="flex items-center gap-2.5 px-3 py-2 text-xs cursor-pointer rounded-lg hover:bg-secondary"
          >
            <Zap className="h-4 w-4 text-primary" />
            <div className="flex flex-col">
              <span className="font-medium text-foreground">Modern React & Web Architecture</span>
              <span className="text-[10px] text-muted-foreground">Next.js 15, Server Components & Fluid UI Systems</span>
            </div>
          </CommandItem>

          <CommandItem
            onSelect={() => runCommand(() => router.push("/programs/backend"))}
            className="flex items-center gap-2.5 px-3 py-2 text-xs cursor-pointer rounded-lg hover:bg-secondary"
          >
            <Layers className="h-4 w-4 text-primary" />
            <div className="flex flex-col">
              <span className="font-medium text-foreground">Backend & Systems Specialization</span>
              <span className="text-[10px] text-muted-foreground">Distributed Engines, Raft, Microservices & PostgreSQL</span>
            </div>
          </CommandItem>

          <CommandItem
            onSelect={() => runCommand(() => router.push("/programs"))}
            className="flex items-center gap-2.5 px-3 py-2 text-xs cursor-pointer rounded-lg hover:bg-secondary"
          >
            <BookOpen className="h-4 w-4 text-primary" />
            <div className="flex flex-col">
              <span className="font-medium text-foreground">All 29 Engineering Tracks</span>
              <span className="text-[10px] text-muted-foreground">Comprehensive accredited curriculum directory</span>
            </div>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator className="my-1" />

        {/* DSA Workbench */}
        <CommandGroup heading="DSA Workbench & Problems">
          <CommandItem
            onSelect={() => runCommand(() => router.push("/dsa/a2z-sheet"))}
            className="flex items-center gap-2.5 px-3 py-2 text-xs cursor-pointer rounded-lg hover:bg-secondary"
          >
            <Code2 className="h-4 w-4 text-primary" />
            <div className="flex flex-col">
              <span className="font-medium text-foreground">ASCI A2Z Master Sheet</span>
              <span className="text-[10px] text-muted-foreground">474 Structured interview problems with visual flowcharts</span>
            </div>
          </CommandItem>

          <CommandItem
            onSelect={() => runCommand(() => router.push("/dsa/strivers-a2z-sheet-learn-dsa-a-to-z"))}
            className="flex items-center gap-2.5 px-3 py-2 text-xs cursor-pointer rounded-lg hover:bg-secondary"
          >
            <CheckCircle2 className="h-4 w-4 text-primary" />
            <div className="flex flex-col">
              <span className="font-medium text-foreground">Striver&apos;s A2Z Roadmap</span>
              <span className="text-[10px] text-muted-foreground">Step-by-step master algorithm curriculum</span>
            </div>
          </CommandItem>

          <CommandItem
            onSelect={() => runCommand(() => router.push("/dsa/problems"))}
            className="flex items-center gap-2.5 px-3 py-2 text-xs cursor-pointer rounded-lg hover:bg-secondary"
          >
            <Search className="h-4 w-4 text-primary" />
            <div className="flex flex-col">
              <span className="font-medium text-foreground">Browse All Problems Directory</span>
              <span className="text-[10px] text-muted-foreground">Filter by topic, company tag, and difficulty</span>
            </div>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator className="my-1" />

        {/* Core CS Systems (Plus) */}
        <CommandGroup heading="Core CS Systems (Plus)">
          <CommandItem
            onSelect={() => runCommand(() => router.push("/plus/operating-systems"))}
            className="flex items-center gap-2.5 px-3 py-2 text-xs cursor-pointer rounded-lg hover:bg-secondary"
          >
            <Cpu className="h-4 w-4 text-primary" />
            <div className="flex flex-col">
              <span className="font-medium text-foreground">Operating Systems Theory & Architecture</span>
              <span className="text-[10px] text-muted-foreground">Process scheduling, virtual memory, paging & kernel syscalls</span>
            </div>
          </CommandItem>

          <CommandItem
            onSelect={() => runCommand(() => router.push("/plus/computer-networks"))}
            className="flex items-center gap-2.5 px-3 py-2 text-xs cursor-pointer rounded-lg hover:bg-secondary"
          >
            <Network className="h-4 w-4 text-primary" />
            <div className="flex flex-col">
              <span className="font-medium text-foreground">Computer Networks Architecture</span>
              <span className="text-[10px] text-muted-foreground">TCP/IP stack, BGP routing, congestion control & sockets</span>
            </div>
          </CommandItem>

          <CommandItem
            onSelect={() => runCommand(() => router.push("/plus/dbms"))}
            className="flex items-center gap-2.5 px-3 py-2 text-xs cursor-pointer rounded-lg hover:bg-secondary"
          >
            <Database className="h-4 w-4 text-primary" />
            <div className="flex flex-col">
              <span className="font-medium text-foreground">Database Management Systems (DBMS)</span>
              <span className="text-[10px] text-muted-foreground">B-Tree storage, WAL logging, ACID isolation & queries</span>
            </div>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator className="my-1" />

        {/* Engineering Projects */}
        <CommandGroup heading="Engineering Projects & Systems">
          <CommandItem
            onSelect={() => runCommand(() => router.push("/projects"))}
            className="flex items-center gap-2.5 px-3 py-2 text-xs cursor-pointer rounded-lg hover:bg-secondary"
          >
            <FolderGit2 className="h-4 w-4 text-primary" />
            <div className="flex flex-col">
              <span className="font-medium text-foreground">Projects Hub Directory</span>
              <span className="text-[10px] text-muted-foreground">Portfolio builds, systems architecture & capstones</span>
            </div>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push("/projects"))}
            className="flex items-center gap-2.5 px-3 py-2 text-xs cursor-pointer rounded-lg hover:bg-secondary"
          >
            <Cpu className="h-4 w-4 text-primary" />
            <div className="flex flex-col">
              <span className="font-medium text-foreground">ApexKV — Distributed Raft KV Store</span>
              <span className="text-[10px] text-muted-foreground">Go, Raft Consensus, gRPC, Docker</span>
            </div>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push("/projects"))}
            className="flex items-center gap-2.5 px-3 py-2 text-xs cursor-pointer rounded-lg hover:bg-secondary"
          >
            <Zap className="h-4 w-4 text-primary" />
            <div className="flex flex-col">
              <span className="font-medium text-foreground">SpectraQuery — Vector RAG Engine</span>
              <span className="text-[10px] text-muted-foreground">Python, FastAPI, pgvector, Next.js</span>
            </div>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator className="my-1" />

        {/* Career & Opportunities */}
        <CommandGroup heading="Career Center & Opportunities">
          <CommandItem
            onSelect={() => runCommand(() => router.push("/career?tab=jobs"))}
            className="flex items-center gap-2.5 px-3 py-2 text-xs cursor-pointer rounded-lg hover:bg-secondary"
          >
            <Briefcase className="h-4 w-4 text-primary" />
            <div className="flex flex-col">
              <span className="font-medium text-foreground">Software Engineering Jobs</span>
              <span className="text-[10px] text-muted-foreground">Verified junior to senior developer openings</span>
            </div>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push("/career?tab=internships"))}
            className="flex items-center gap-2.5 px-3 py-2 text-xs cursor-pointer rounded-lg hover:bg-secondary"
          >
            <Briefcase className="h-4 w-4 text-primary" />
            <div className="flex flex-col">
              <span className="font-medium text-foreground">Student Internships</span>
              <span className="text-[10px] text-muted-foreground">Paid software internships with transparent stipends</span>
            </div>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push("/career?tab=hackathons"))}
            className="flex items-center gap-2.5 px-3 py-2 text-xs cursor-pointer rounded-lg hover:bg-secondary"
          >
            <Trophy className="h-4 w-4 text-primary" />
            <div className="flex flex-col">
              <span className="font-medium text-foreground">Hackathons & Build Challenges</span>
              <span className="text-[10px] text-muted-foreground">Active national hackathons with prize pools</span>
            </div>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push("/career?tab=resume"))}
            className="flex items-center gap-2.5 px-3 py-2 text-xs cursor-pointer rounded-lg hover:bg-secondary"
          >
            <FileCheck className="h-4 w-4 text-primary" />
            <div className="flex flex-col">
              <span className="font-medium text-foreground">Resume ATS Scanner</span>
              <span className="text-[10px] text-muted-foreground">Keyword matching & formatting analysis</span>
            </div>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator className="my-1" />

        {/* Quick Portal Navigation */}
        <CommandGroup heading="Platform & Account">
          <CommandItem
            onSelect={() => runCommand(() => router.push("/dashboard"))}
            className="flex items-center gap-2.5 px-3 py-2 text-xs cursor-pointer rounded-lg hover:bg-secondary"
          >
            <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium text-foreground">Personal Learning Dashboard</span>
          </CommandItem>

          <CommandItem
            onSelect={() => runCommand(() => router.push("/certificates"))}
            className="flex items-center gap-2.5 px-3 py-2 text-xs cursor-pointer rounded-lg hover:bg-secondary"
          >
            <Award className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium text-foreground">Credentials & Verified Certificates</span>
          </CommandItem>

          <CommandItem
            onSelect={() => runCommand(() => router.push("/profile"))}
            className="flex items-center gap-2.5 px-3 py-2 text-xs cursor-pointer rounded-lg hover:bg-secondary"
          >
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium text-foreground">Engineer Profile & Skill Graph</span>
          </CommandItem>

          <CommandItem
            onSelect={() => runCommand(() => router.push("/community"))}
            className="flex items-center gap-2.5 px-3 py-2 text-xs cursor-pointer rounded-lg hover:bg-secondary"
          >
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium text-foreground">Student Community & Discussions</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
