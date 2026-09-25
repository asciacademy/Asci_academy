import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { CompetitionDetail } from "@/components/competitions/competition-detail"
import { Footer } from "@/components/footer"
import { getEcosystemData } from "@/app/actions/unstop"
import { createClient } from "@/utils/supabase/server"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const ecosystem = await getEcosystemData()
  const competition = ecosystem.hackathons.find(
    (h) => h.id === slug || h.id.toLowerCase() === slug.toLowerCase()
  )

  return {
    title: competition
      ? `${competition.title} | ASCI Academy Competitions`
      : "Competition Details | ASCI Academy",
    description:
      competition?.problemStatement ||
      "Join national engineering challenges, collaborate with teams, and win prizes.",
  }
}

export default async function CompetitionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const ecosystem = await getEcosystemData()
  const competition =
    ecosystem.hackathons.find(
      (h) => h.id === slug || h.id.toLowerCase() === slug.toLowerCase()
    ) || ecosystem.hackathons[0]

  if (!competition) {
    notFound()
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser().catch(() => ({ data: { user: null } }))

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <Navbar />
      <div className="pt-16 sm:pt-20">
        <CompetitionDetail competition={competition} user={user} />
      </div>
      <Footer />
    </main>
  )
}
