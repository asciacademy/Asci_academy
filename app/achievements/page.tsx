import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AchievementsHub } from "@/components/achievements/achievements-hub"

export const metadata: Metadata = {
  title: "Achievements & Milestones — Scholastic Honors | ASCI Academy",
  description:
    "Track your engineering consistency, problem-solving streaks, guided projects built, hackathons joined, and accredited honors.",
}

export default function AchievementsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1">
        <AchievementsHub />
      </main>
      <Footer />
    </div>
  )
}
