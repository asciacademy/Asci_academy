import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { ProjectsCatalog } from "@/components/projects/projects-catalog"
import { Footer } from "@/components/footer"
import { GUIDED_PROJECTS } from "@/lib/projects-data"

export const metadata: Metadata = {
  title: "Guided Engineering Projects & Capstones | ASCI Academy",
  description:
    "Build verified production systems: Raft consensus databases, high-throughput rate limiters, collaborative editors, and autonomous AI agents with technical specifications.",
}

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <Navbar />
      <div className="pt-16 sm:pt-20">
        <ProjectsCatalog initialProjects={GUIDED_PROJECTS} />
      </div>
      <Footer />
    </main>
  )
}
