import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CertificatesHub } from "@/components/certificates/certificates-hub"

export const metadata: Metadata = {
  title: "Certificates & Diplomas — Verified Credentials | ASCI Academy",
  description:
    "View, verify, and share your ASCI Academy engineering certificates, diplomas, and proof of asymptotic code mastery.",
}

export default function CertificatesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1">
        <CertificatesHub />
      </main>
      <Footer />
    </div>
  )
}
