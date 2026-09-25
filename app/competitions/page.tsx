import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { CompetitionsCatalog } from "@/components/competitions/competitions-catalog"
import { Footer } from "@/components/footer"
import { getEcosystemData } from "@/app/actions/unstop"

export const metadata: Metadata = {
  title: "Hackathons & Coding Competitions | ASCI Academy",
  description:
    "Discover national hackathons, code sprints, and tech challenges with verified cash prize pools, mentor support, and direct placement opportunities.",
}

export default async function CompetitionsPage() {
  const ecosystem = await getEcosystemData()

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <Navbar />
      <div className="pt-16 sm:pt-20">
        <CompetitionsCatalog initialCompetitions={ecosystem.hackathons} />
      </div>
      <Footer />
    </main>
  )
}
