"use client"

import { DiscoveryRail } from "@/components/discovery/discovery-rail"
import { CompetitionCard } from "@/components/cards/competition-card"

const UPCOMING_COMPETITIONS = [
  {
    id: "comp-algo-forge-2026",
    slug: "algo-forge-2026",
    title: "ASCI National Algorithm Grand Prix 2026",
    organizer: "Zerodha Tech",
    prizePool: "₹5,00,000",
    registeredCount: 3840,
    teamSize: "1–4 Members",
    deadline: "15 Oct 2026",
    daysLeft: 5,
    mode: "Online",
    skills: ["High-Frequency DSA", "Go", "Rust"],
  },
  {
    id: "comp-nextgen-ai-2026",
    slug: "nextgen-ai-2026",
    title: "NextGen Agentic AI & Systems Hackathon",
    organizer: "Google Cloud",
    prizePool: "₹3,50,000",
    registeredCount: 2910,
    teamSize: "1–3 Members",
    deadline: "22 Oct 2026",
    daysLeft: 12,
    mode: "Online",
    skills: ["Autonomous Agents", "Gemini 2.5", "TypeScript"],
  },
  {
    id: "comp-fintech-cup-2026",
    slug: "fintech-cup-2026",
    title: "FinTech Distributed Systems Cup",
    organizer: "Razorpay",
    prizePool: "₹2,50,000",
    registeredCount: 1450,
    teamSize: "1–4 Members",
    deadline: "02 Nov 2026",
    daysLeft: 22,
    mode: "Online",
    skills: ["Transactional Outbox", "Kafka", "Microservices"],
  },
]

export function UpcomingCompetitionsRail() {
  return (
    <DiscoveryRail
      title="Upcoming Competitions"
      subtitle="National hackathons, coding contests, and verified hiring bounties"
      actionHref="/competitions"
      actionLabel="Browse All"
    >
      {UPCOMING_COMPETITIONS.map((comp) => (
        <div key={comp.id} className="min-w-[290px] sm:min-w-[320px] flex-1 snap-start">
          <CompetitionCard
            id={comp.id}
            slug={comp.slug}
            title={comp.title}
            organizer={comp.organizer}
            prizePool={comp.prizePool}
            teamSize={comp.teamSize}
            mode={comp.mode}
            deadline={comp.deadline}
            daysLeft={comp.daysLeft}
            skills={comp.skills}
            registeredCount={comp.registeredCount}
          />
        </div>
      ))}
    </DiscoveryRail>
  )
}
