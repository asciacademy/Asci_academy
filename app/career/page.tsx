import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CareerHub } from "@/components/career/career-hub"

export const metadata: Metadata = {
  title: "Career & Opportunities — Jobs, Internships & ATS Tools | ASCI Academy",
  description:
    "Direct engineering hiring pipelines, verified compensation, technical assessments, and recruiter-ready ATS tools for students and software engineers.",
}

export default function CareerPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1">
        <CareerHub />
      </main>
      <Footer />
    </div>
  )
}
