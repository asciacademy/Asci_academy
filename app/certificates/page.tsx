"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CertificateModal } from "@/components/certificate/certificate-modal"
import { Certificate } from "@/lib/certificate-types"
import { getLocalCertificates } from "@/lib/certificate-store"
import { useAuth } from "@/context/auth-context"
import {
  Award,
  ShieldCheck,
  Calendar,
  ExternalLink,
  Printer,
  Share2,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Search,
} from "lucide-react"

const DEMO_CERTIFICATES: Certificate[] = [
  {
    id: "cert-py",
    certificate_id: "ASCI-2026-PY84920",
    recipient_name: "Engineering Scholar",
    course_id: "python",
    course_title: "Production Python & Systems Engineering",
    issuer_name: "ASCI Academy Academic Council",
    issued_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString(),
    verification_code: "VER-9842-ASCI",
    grade: "Distinction (96%)",
    skills: ["CPython Internals", "Asyncio", "FastAPI", "Memory Profiling"],
    metadata: {
      hours_estimated: 60,
      instructor: "ASCI Faculty",
      verification_hash: "0x89f41a0b3c2941e7",
    },
  },
  {
    id: "cert-dsa",
    certificate_id: "ASCI-2026-DSA19284",
    recipient_name: "Engineering Scholar",
    course_id: "dsa",
    course_title: "Algorithmic Master Track & 474 Sheet",
    issuer_name: "ASCI Academy Academic Council",
    issued_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 35).toISOString(),
    verification_code: "VER-1928-ASCI",
    grade: "Mastery (100%)",
    skills: ["Dynamic Programming", "Graph Theory", "Trees", "Binary Search"],
    metadata: {
      hours_estimated: 120,
      instructor: "ASCI Faculty",
      verification_hash: "0x77e12f0a1c9983d4",
    },
  },
]

export default function CertificatesPage() {
  const { user } = useAuth()
  const [activeCert, setActiveCert] = useState<Certificate | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [certificates, setCertificates] = useState<Certificate[]>(DEMO_CERTIFICATES)

  useEffect(() => {
    const local = getLocalCertificates()
    if (local && local.length > 0) {
      setCertificates(local)
    }
  }, [])

  const handleOpenCert = (cert: Certificate) => {
    setActiveCert(cert)
    setIsModalOpen(true)
  }

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20 selection:text-primary pb-16 md:pb-0">
      <Navbar />

      {/* Header Banner */}
      <section className="pt-24 sm:pt-28 pb-8 sm:pb-12 border-b border-border/60 bg-secondary/20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1 text-xs font-mono font-medium text-primary shadow-2xs">
              <span>ACCREDITED CREDENTIALS</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-foreground tracking-tight">
              Verified Engineering Certificates
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Tamper-evident, cryptographically signed credentials awarded upon verified completion of curriculum modules, code katas, and capstone evaluations.
            </p>
          </div>
        </div>
      </section>

      {/* Certificates Gallery */}
      <section className="py-8 sm:py-12 flex-1">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between pb-6 border-b border-border/60 mb-8">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-foreground">
                Your Credentials ({certificates.length})
              </span>
            </div>

            <Link
              href="/verify"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
            >
              <span>Public Verification Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="rounded-2xl border border-border/80 bg-card p-6 flex flex-col justify-between hover:border-primary/40 transition-all duration-200 hover:shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                      <Award className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground bg-secondary px-2.5 py-1 rounded-md border border-border/60">
                      ID: {cert.certificate_id}
                    </span>
                  </div>

                  <span className="text-xs font-mono text-primary font-semibold block mb-1">
                    {cert.issuer_name}
                  </span>

                  <h3 className="text-lg font-semibold text-foreground tracking-tight">
                    {cert.course_title}
                  </h3>

                  <div className="flex items-center gap-4 mt-3 text-xs font-mono text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Issued: {new Date(cert.issued_at).toLocaleDateString()}</span>
                    </div>
                    {cert.grade && (
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                        {cert.grade}
                      </span>
                    )}
                  </div>

                  {/* Skills tags */}
                  {cert.skills && cert.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {cert.skills.map((s) => (
                        <span
                          key={s}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-secondary border border-border/60 text-muted-foreground"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="pt-5 mt-5 border-t border-border/60 flex items-center gap-3">
                  <button
                    onClick={() => handleOpenCert(cert)}
                    className="flex-1 py-2 px-4 rounded-xl bg-secondary hover:bg-secondary/80 border border-border/80 text-xs font-medium text-foreground transition-colors cursor-pointer text-center"
                  >
                    View Certificate
                  </button>
                  <button
                    onClick={() => handleOpenCert(cert)}
                    className="flex-1 py-2 px-4 rounded-xl bg-primary hover:bg-primary-active text-white text-xs font-semibold transition-colors cursor-pointer shadow-2xs text-center"
                  >
                    Download / Share
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificate Modal */}
      <CertificateModal
        certificate={activeCert}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <Footer showCTA={false} />
    </main>
  )
}
