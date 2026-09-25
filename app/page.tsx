import { Navbar } from "@/components/navbar"
import { StudentEcosystemHome } from "@/components/home/student-ecosystem-home"
import { Footer } from "@/components/footer"
import { getEcosystemData } from "@/app/actions/unstop"
import { CURRICULUM_COURSES } from "@/lib/curriculum-data"

export const dynamic = "force-dynamic"

export default async function Home() {
  const ecosystem = await getEcosystemData().catch(() => undefined)

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      <Navbar />
      <StudentEcosystemHome courses={CURRICULUM_COURSES} ecosystem={ecosystem} />
      <Footer />
    </main>
  )
}
