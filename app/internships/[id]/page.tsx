import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CareerOpportunityDetail } from "@/components/career/career-opportunity-detail"
import { INITIAL_JOBS } from "@/lib/unstop-store"
import { getEcosystemData } from "@/app/actions/unstop"

interface InternshipPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: InternshipPageProps): Promise<Metadata> {
  const { id } = await params
  const ecosystem = await getEcosystemData().catch(() => ({ jobs: INITIAL_JOBS }))
  const internship = (ecosystem.jobs || INITIAL_JOBS).find((j) => j.id === id)

  if (!internship) {
    return {
      title: "Internship Opportunity | ASCI Academy",
    }
  }

  return {
    title: `${internship.title} at ${internship.company} | ASCI Academy`,
    description: internship.description || `Apply for ${internship.title} at ${internship.company}. Verified engineering internship program.`,
  }
}

export default async function InternshipDetailPage({ params }: InternshipPageProps) {
  const { id } = await params
  const ecosystem = await getEcosystemData().catch(() => ({ jobs: INITIAL_JOBS }))
  const internship =
    (ecosystem.jobs || INITIAL_JOBS).find((j) => j.id === id) ||
    INITIAL_JOBS.find((j) => j.roleType === "Internship") ||
    INITIAL_JOBS[0]

  if (!internship) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1">
        <CareerOpportunityDetail job={internship} backHref="/internships" />
      </main>
      <Footer />
    </div>
  )
}
