import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CareerOpportunityDetail } from "@/components/career/career-opportunity-detail"
import { INITIAL_JOBS } from "@/lib/unstop-store"
import { getEcosystemData } from "@/app/actions/unstop"

interface JobPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: JobPageProps): Promise<Metadata> {
  const { id } = await params
  const ecosystem = await getEcosystemData().catch(() => ({ jobs: INITIAL_JOBS }))
  const job = (ecosystem.jobs || INITIAL_JOBS).find((j) => j.id === id)

  if (!job) {
    return {
      title: "Job Opportunity | ASCI Academy",
    }
  }

  return {
    title: `${job.title} at ${job.company} | ASCI Academy Careers`,
    description: job.description || `Apply for ${job.title} at ${job.company}. Direct engineering hiring through ASCI Academy.`,
  }
}

export default async function JobDetailPage({ params }: JobPageProps) {
  const { id } = await params
  const ecosystem = await getEcosystemData().catch(() => ({ jobs: INITIAL_JOBS }))
  const job = (ecosystem.jobs || INITIAL_JOBS).find((j) => j.id === id) || INITIAL_JOBS[0]

  if (!job) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1">
        <CareerOpportunityDetail job={job} backHref="/jobs" />
      </main>
      <Footer />
    </div>
  )
}
