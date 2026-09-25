import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CareerHub } from "@/components/career/career-hub"

export const metadata: Metadata = {
  title: "Engineering Jobs — Career Opportunities | ASCI Academy",
  description:
    "Direct engineering openings, software development careers, and high-growth startup opportunities with transparent compensation.",
}

export default function JobsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1">
        <CareerHub initialRoleType="Full-Time" initialTab="opportunities" />
      </main>
      <Footer />
    </div>
  )
}
