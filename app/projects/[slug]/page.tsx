import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProjectDetail } from "@/components/projects/project-detail"
import { GUIDED_PROJECTS } from "@/lib/projects-data"

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = GUIDED_PROJECTS.find((p) => p.slug === slug)

  if (!project) {
    return {
      title: "Project Not Found | ASCI Academy",
    }
  }

  return {
    title: `${project.title} — Capstone Project | ASCI Academy`,
    description: project.tagline,
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = GUIDED_PROJECTS.find((p) => p.slug === slug)

  if (!project) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1">
        <ProjectDetail project={project} />
      </main>
      <Footer />
    </div>
  )
}
