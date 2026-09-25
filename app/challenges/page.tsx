"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Flame, Trophy, ArrowRight, Clock, Award, Sparkles } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BrandIcon } from "@/components/ui/brand-icon"
import { ChallengeCard } from "@/components/cards/challenge-card"

const CHALLENGES = [
  {
    id: "ch-1",
    slug: "two-sum",
    title: "Two Sum & Two-Pointer Partition",
    difficulty: "Easy",
    topic: "Arrays",
    estimatedMinutes: 15,
    solvedCount: 14200,
    acceptanceRate: "52%",
    brand: "algorithm",
    xpReward: 50,
  },
  {
    id: "ch-2",
    slug: "sliding-window-maximum",
    title: "Sliding Window Maximum",
    difficulty: "Hard",
    topic: "Monotonic Queue",
    estimatedMinutes: 30,
    solvedCount: 4210,
    acceptanceRate: "38%",
    brand: "algorithm",
    xpReward: 100,
  },
  {
    id: "ch-3",
    slug: "lru-cache",
    title: "LRU Cache Memory Architecture",
    difficulty: "Medium",
    topic: "Linked List",
    estimatedMinutes: 25,
    solvedCount: 8900,
    acceptanceRate: "44%",
    brand: "algorithm",
    xpReward: 75,
  },
  {
    id: "ch-4",
    slug: "trapping-rain-water",
    title: "Trapping Rain Water",
    difficulty: "Hard",
    topic: "Dynamic Programming",
    estimatedMinutes: 35,
    solvedCount: 5120,
    acceptanceRate: "36%",
    brand: "algorithm",
    xpReward: 120,
  },
]

export default function ChallengesPage() {
  const [filter, setFilter] = useState<string>("All")

  const filteredChallenges = CHALLENGES.filter((c) => {
    if (filter === "All") return true
    return c.difficulty === filter
  })

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
        {/* Header */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary border border-border text-[11px] font-mono font-semibold text-muted-foreground">
            <Flame className="w-3.5 h-3.5 text-primary" />
            <span>CODING &amp; HIRING CHALLENGES</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-normal text-foreground tracking-tight">
            Developer Challenges
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Daily algorithmic problems, hiring assessments, and timed skill challenges.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-secondary border border-border/80 w-fit text-xs font-semibold">
          {["All", "Easy", "Medium", "Hard"].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setFilter(lvl)}
              className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                filter === lvl
                  ? "bg-card text-foreground shadow-2xs font-bold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>

        {/* Grid of Challenges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredChallenges.map((c) => (
            <ChallengeCard
              key={c.id}
              id={c.id}
              slug={c.slug}
              title={c.title}
              difficulty={c.difficulty}
              topic={c.topic}
              estimatedMinutes={c.estimatedMinutes}
              solvedCount={c.solvedCount}
              acceptanceRate={c.acceptanceRate}
              xpReward={c.xpReward}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
