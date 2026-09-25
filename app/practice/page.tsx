import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { PracticeHub } from "@/components/practice/practice-hub"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Engineering Practice & Problem Arena | ASCI Academy",
  description:
    "Practice coding challenges across DSA, Python, SQL, Java, React, and System Design with in-browser multi-language compilation, test runners, and visual proofs.",
}

export default function PracticePage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <Navbar />
      <div className="pt-16 sm:pt-20">
        <PracticeHub />
      </div>
      <Footer />
    </main>
  )
}
