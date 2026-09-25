"use client"

import React, { useState, useMemo } from "react"
import Link from "next/link"
import {
  Award,
  Search,
  Filter,
  Plus,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Download,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
} from "lucide-react"

interface CertificateRecord {
  id: string
  credentialId: string
  studentName: string
  studentEmail: string
  courseTitle: string
  issueDate: string
  status: "Verified" | "Revoked" | "Pending"
  hash: string
}

const MOCK_CERTIFICATES: CertificateRecord[] = [
  {
    id: "cert-1",
    credentialId: "ASCI-2026-PY789",
    studentName: "Devin Vance",
    studentEmail: "devin.vance@example.com",
    courseTitle: "Python for Production & Data Systems",
    issueDate: "2026-09-18",
    status: "Verified",
    hash: "0x8f2a...c391",
  },
  {
    id: "cert-2",
    credentialId: "ASCI-2026-DSA402",
    studentName: "Aditi Rao",
    studentEmail: "aditi.rao@example.com",
    courseTitle: "Striver A2Z Algorithms Masterclass",
    issueDate: "2026-09-20",
    status: "Verified",
    hash: "0x77b1...99e4",
  },
  {
    id: "cert-3",
    credentialId: "ASCI-2026-R19108",
    studentName: "Liam Chen",
    studentEmail: "liam.chen@example.com",
    courseTitle: "Full-Stack React 19 & Next.js Architecture",
    issueDate: "2026-09-22",
    status: "Verified",
    hash: "0x334d...e5a2",
  },
  {
    id: "cert-4",
    credentialId: "ASCI-2026-GO091",
    studentName: "Kavya Patel",
    studentEmail: "kavya.patel@example.com",
    courseTitle: "Distributed Go & Microservices Engine",
    issueDate: "2026-09-23",
    status: "Verified",
    hash: "0x11ce...8fa1",
  },
  {
    id: "cert-5",
    credentialId: "ASCI-2026-SYS441",
    studentName: "Rohan Deshmukh",
    studentEmail: "rohan.d@example.com",
    courseTitle: "Low-Level Systems Engineering in C++",
    issueDate: "2026-09-24",
    status: "Pending",
    hash: "0x99a0...33c9",
  },
]

export default function AdminCertificatesPage() {
  const [certs, setCerts] = useState<CertificateRecord[]>(MOCK_CERTIFICATES)
  const [search, setSearch] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("All")

  const filtered = useMemo(() => {
    return certs.filter((c) => {
      if (search.trim()) {
        const q = search.toLowerCase()
        const matchesName = c.studentName.toLowerCase().includes(q)
        const matchesEmail = c.studentEmail.toLowerCase().includes(q)
        const matchesCourse = c.courseTitle.toLowerCase().includes(q)
        const matchesId = c.credentialId.toLowerCase().includes(q)
        if (!matchesName && !matchesEmail && !matchesCourse && !matchesId) return false
      }
      if (selectedStatus !== "All" && c.status !== selectedStatus) return false
      return true
    })
  }, [certs, search, selectedStatus])

  const handleToggleStatus = (id: string) => {
    setCerts((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const nextStatus = c.status === "Verified" ? "Revoked" : "Verified"
          return { ...c, status: nextStatus }
        }
        return c
      })
    )
  }

  return (
    <div className="space-y-6 pt-2 font-sans text-foreground">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-widest bg-primary/10 text-primary border border-primary/20 mb-2 font-bold">
            Credential Authority
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Verifiable Certificate Ledger
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Audit cryptographically signed course certificates, verify hash trees, and handle revocation requests.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/certificates"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-secondary hover:bg-secondary/80 border border-border text-foreground text-xs font-mono font-semibold uppercase tracking-wider transition-all"
          >
            <span>Public Verification Portal</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Control Bar */}
      <div className="p-4 rounded-2xl border border-border bg-card shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by student name, email, credential ID, course title..."
              className="w-full h-10 pl-10 pr-4 rounded-xl border border-border bg-secondary text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="h-10 px-3 rounded-xl border border-border bg-secondary text-xs text-foreground font-mono focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Verified">Verified Active</option>
              <option value="Revoked">Revoked</option>
              <option value="Pending">Pending Audit</option>
            </select>
          </div>
        </div>
      </div>

      {/* Information-Dense Table */}
      <div className="p-4 rounded-2xl border border-border bg-card shadow-2xs space-y-3">
        <div className="flex items-center justify-between text-xs font-mono text-muted-foreground pb-1">
          <span>Showing {filtered.length} Issued Certificates</span>
          <span>Cryptographic Hash Ledger</span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-border/80">
          <table className="w-full text-left text-xs">
            <thead className="bg-secondary/60 text-muted-foreground font-mono uppercase text-[10px] tracking-wider border-b border-border">
              <tr>
                <th className="py-2.5 px-3 font-semibold">Credential ID</th>
                <th className="py-2.5 px-3 font-semibold">Scholar Recipient</th>
                <th className="py-2.5 px-3 font-semibold">Course / Specialization</th>
                <th className="py-2.5 px-3 font-semibold">Issued Date</th>
                <th className="py-2.5 px-3 font-semibold">Merkle Root Hash</th>
                <th className="py-2.5 px-3 font-semibold">Status</th>
                <th className="py-2.5 px-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-muted-foreground font-mono">
                    No certificate records match your query.
                  </td>
                </tr>
              ) : (
                filtered.map((cert) => (
                  <tr key={cert.id} className="hover:bg-secondary/30 transition-colors">
                    <td className="py-2.5 px-3 whitespace-nowrap font-mono text-[11px] font-bold text-foreground">
                      {cert.credentialId}
                    </td>

                    <td className="py-2.5 px-3">
                      <div className="font-semibold text-foreground truncate max-w-xs">
                        {cert.studentName}
                      </div>
                      <div className="text-[10px] font-mono text-muted-foreground truncate">
                        {cert.studentEmail}
                      </div>
                    </td>

                    <td className="py-2.5 px-3">
                      <span className="text-[11px] text-foreground font-medium truncate max-w-xs block">
                        {cert.courseTitle}
                      </span>
                    </td>

                    <td className="py-2.5 px-3 whitespace-nowrap font-mono text-[11px] text-muted-foreground">
                      {cert.issueDate}
                    </td>

                    <td className="py-2.5 px-3 whitespace-nowrap font-mono text-[10px] text-primary">
                      {cert.hash}
                    </td>

                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <span
                        className={`text-[9px] font-mono px-2 py-0.5 rounded-full border uppercase tracking-wider font-semibold ${
                          cert.status === "Verified"
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-bold"
                            : cert.status === "Revoked"
                            ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30"
                            : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30"
                        }`}
                      >
                        {cert.status}
                      </span>
                    </td>

                    <td className="py-2.5 px-3 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5">
                        <Link
                          href={`/certificates/verify?id=${encodeURIComponent(cert.credentialId)}`}
                          className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                          title="Verify Certificate"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(cert.id)}
                          className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold cursor-pointer border transition-colors ${
                            cert.status === "Verified"
                              ? "text-rose-600 dark:text-rose-400 border-rose-500/30 hover:bg-rose-500/10"
                              : "text-emerald-600 dark:text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/10"
                          }`}
                        >
                          {cert.status === "Verified" ? "Revoke" : "Re-activate"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
