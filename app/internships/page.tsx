import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CareerHub } from "@/components/career/career-hub"

export const metadata: Metadata = {
  title: "Engineering Internships — Summer & Winter Cohorts | ASCI Academy",
  description:
    "Software engineering internships, research fellowships, and verified apprenticeships for developers and students.",
}

export default function InternshipsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1">
        <CareerHub initialRoleType="Internship" initialTab="opportunities" />
      </main>
      <Footer />
    </div>
  )
}
