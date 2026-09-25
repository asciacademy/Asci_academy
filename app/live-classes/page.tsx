import { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { getLiveClasses } from "@/app/actions/live-classes"
import { LiveClassesClient } from "./live-classes-client"

export const metadata: Metadata = {
  title: "Live Classes & Zoom Masterclasses | ASCI Academy",
  description:
    "Join live interactive Zoom masterclasses with principal engineers. Distributed systems, algorithms sprints, React 19 architecture, and career guidance.",
}

export const dynamic = "force-dynamic"

export default async function LiveClassesPage() {
  const res = await getLiveClasses()
  const classes = res.classes || []

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20 selection:text-primary">
      <Navbar />
      <main className="flex-1">
        <LiveClassesClient initialClasses={classes} />
      </main>
      <Footer />
    </div>
  )
}
