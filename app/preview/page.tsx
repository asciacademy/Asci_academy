"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  Compass,
  BookOpen,
  Terminal,
  Trophy,
  Briefcase,
  Search,
  CheckCircle2,
  Calendar,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  Layers,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { CourseCard } from "@/components/cards/course-card"
import { CompetitionCard } from "@/components/cards/competition-card"
import { OpportunityCard } from "@/components/cards/opportunity-card"
import { BrandIcon } from "@/components/ui/brand-icon"
import { AsciLogo } from "@/components/asci-logo"

export default function ComponentKitPreviewPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState("all")

  return (
    <div className="min-h-screen bg-background text-foreground py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-[1280px] mx-auto space-y-12">
        {/* Header / Intro */}
        <div className="border-b border-border pb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="success">Unstop Design System Active</Badge>
              <span className="text-xs font-mono text-muted-foreground">Tokens v2.0</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              ASCI Platform Component Kit &amp; Design System Preview
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Interactive Storybook-style workbench testing all Unstop-standardized components, tokens, typography, and card anatomies.
            </p>
          </div>
          <Link href="/">
            <Button variant="outline" size="sm">
              Back to Home
            </Button>
          </Link>
        </div>

        {/* 1. Header & Navigation Preview */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-primary flex items-center gap-2">
              <Compass className="h-5 w-5" /> 1. Header / Navigation Shell (64px)
            </h2>
            <span className="text-xs font-mono text-muted-foreground">Tokens: --primary-700 (#1C4980), --grey-200</span>
          </div>

          <div className="rounded-xl border border-border bg-card p-4 shadow-xs">
            <div className="flex h-16 items-center justify-between px-4 rounded-lg bg-background border border-border">
              <div className="flex items-center gap-6">
                <AsciLogo size={36} showText showBadge={false} />
                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-secondary/50 text-xs text-muted-foreground w-64">
                  <Search className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="truncate">Search courses, hackathons...</span>
                  <kbd className="ml-auto font-mono text-[10px] px-1 py-0.5 rounded bg-background border border-border">⌘K</kbd>
                </div>
              </div>

              <div className="hidden lg:flex items-center gap-6 text-xs font-semibold">
                <span className="text-primary cursor-pointer border-b-2 border-primary pb-1">Explore</span>
                <span className="text-muted-foreground hover:text-foreground cursor-pointer">Learn</span>
                <span className="text-muted-foreground hover:text-foreground cursor-pointer">Practice</span>
                <span className="text-muted-foreground hover:text-foreground cursor-pointer">Build</span>
                <span className="text-muted-foreground hover:text-foreground cursor-pointer">Grow</span>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">Log In</Button>
                <Button size="sm">Register</Button>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Buttons Suite */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-primary flex items-center gap-2">
              <Sparkles className="h-5 w-5" /> 2. Button Component (Variants &amp; Sizes)
            </h2>
            <span className="text-xs font-mono text-muted-foreground">Action Blue: #0073E6</span>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 shadow-xs space-y-6">
            <div>
              <h3 className="text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-3">Variants</h3>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="default">Primary CTA (#0073E6)</Button>
                <Button variant="secondary">Secondary Action</Button>
                <Button variant="outline">Outline Button</Button>
                <Button variant="ghost">Ghost Button</Button>
                <Button variant="destructive">Destructive Action</Button>
                <Button variant="link">Inline Link Action</Button>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-3">Sizes &amp; Pill Styles</h3>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="lg">Large (40px)</Button>
                <Button size="default">Default (36px)</Button>
                <Button size="sm">Small (32px)</Button>
                <Button size="pill">Unstop Pill CTA</Button>
                <Button size="pill-sm">Small Pill</Button>
                <Button size="icon"><Sparkles className="h-4 w-4" /></Button>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Badges, Tags & Chips */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-primary flex items-center gap-2">
              <Award className="h-5 w-5" /> 3. Badges, Tags &amp; Category Chips
            </h2>
            <span className="text-xs font-mono text-muted-foreground">Semantic Unstop States</span>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge variant="default">Default Badge</Badge>
              <Badge variant="secondary">Secondary Pill</Badge>
              <Badge variant="success">Free / Open</Badge>
              <Badge variant="warning">Featured / PPO</Badge>
              <Badge variant="urgency">2 Days Left</Badge>
              <Badge variant="category">Full-Stack Track</Badge>
              <Badge variant="outline">Verified Scholar</Badge>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-border">
              <span className="text-xs text-muted-foreground mr-2 font-medium">Interactive Filter Chips:</span>
              {["all", "live", "hackathons", "internships"].map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium capitalize transition-all cursor-pointer ${
                    selectedFilter === filter
                      ? "bg-primary text-primary-foreground shadow-xs font-semibold"
                      : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Opportunity & Course Cards Anatomy */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-primary flex items-center gap-2">
              <Layers className="h-5 w-5" /> 4. Unstop Card Anatomy (Logo + Title + Tags + Meta + CTA)
            </h2>
            <span className="text-xs font-mono text-muted-foreground">High Density &amp; Visual Scanning</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Card 1: Course Card */}
            <div>
              <span className="text-xs font-mono uppercase text-muted-foreground font-semibold block mb-2">Course Opportunity</span>
              <CourseCard
                id="demo-c1"
                slug="distributed-systems"
                title="Distributed Systems &amp; Concurrency in Go"
                category="Systems"
                level="Advanced"
                duration="10 Weeks"
                lessonsCount={32}
                projectsCount={4}
                hasCertificate={true}
              />
            </div>

            {/* Card 2: Competition Card */}
            <div>
              <span className="text-xs font-mono uppercase text-muted-foreground font-semibold block mb-2">Competition / Hackathon</span>
              <CompetitionCard
                id="demo-comp1"
                slug="google-cloud-hackathon"
                title="Google Cloud AI Global Hackathon 2026"
                category="Hackathon"
                organizer="Google Cloud"
                deadline="15 Oct"
                prizePool="₹5,00,000"
                teamSize="Team of 2–4"
                mode="Online"
                registeredCount={1420}
                daysLeft={12}
              />
            </div>

            {/* Card 3: Job / Internship Card */}
            <div>
              <span className="text-xs font-mono uppercase text-muted-foreground font-semibold block mb-2">Job / Internship Opportunity</span>
              <OpportunityCard
                id="demo-opp1"
                title="Software Development Engineer — Core Systems"
                company="Razorpay"
                location="Bengaluru / Remote"
                workType="Full-Time"
                salary="₹18–26 LPA"
                experience="0–2 Yrs"
                skills={["Go", "Kafka", "PostgreSQL", "Docker"]}
                deadline="6d left"
                applicantsCount={340}
              />
            </div>
          </div>
        </section>

        {/* 5. Form Inputs, Select & Textarea */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-primary flex items-center gap-2">
              <Terminal className="h-5 w-5" /> 5. Form Inputs &amp; Controls
            </h2>
            <span className="text-xs font-mono text-muted-foreground">Border #E2E2E2, Focus Ring #0073E6</span>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 shadow-xs grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-foreground block mb-1.5">Standard Input</label>
                <Input placeholder="Enter your full name or handle..." />
              </div>

              <div>
                <label className="text-xs font-medium text-foreground block mb-1.5">Input with Leading Icon</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input className="pl-9" placeholder="Search technology katas (e.g. Raft, Redis)..." />
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-foreground block mb-1.5">Textarea Input</label>
              <Textarea rows={4} placeholder="Describe your team project architecture or submission notes..." />
            </div>
          </div>
        </section>

        {/* 6. Modal / Dialog Preview */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-primary flex items-center gap-2">
              <ShieldCheck className="h-5 w-5" /> 6. Dialog &amp; Modal Shell
            </h2>
            <span className="text-xs font-mono text-muted-foreground">Radius 16px, Backdrop Blur</span>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 shadow-xs flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-sm text-foreground">Interactive Modal Trigger</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Test registration modal dialog with backdrop blur and Unstop action button.</p>
            </div>
            <Button onClick={() => setModalOpen(true)}>
              Open Demo Dialog
            </Button>
          </div>

          {modalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
              <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <h3 className="font-bold text-base text-foreground">
                    Register for Opportunity
                  </h3>
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="text-muted-foreground hover:text-foreground text-sm font-bold p-1 cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
                <div className="space-y-3 text-xs">
                  <p className="text-muted-foreground">
                    Confirm your registration for this challenge. You will receive real-time notifications and interview scheduling updates.
                  </p>
                  <div>
                    <label className="font-semibold block mb-1">Scholar Handle</label>
                    <Input defaultValue="scholar_alex" />
                  </div>
                </div>
                <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
                  <Button variant="outline" size="sm" onClick={() => setModalOpen(false)}>Cancel</Button>
                  <Button size="sm" onClick={() => setModalOpen(false)}>Confirm Registration</Button>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
