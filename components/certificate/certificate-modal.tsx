"use client"

import React, { useState } from "react"
import { Certificate } from "@/lib/certificate-types"
import { CertificateCard } from "./certificate-card"
import { printCertificate } from "@/lib/print-certificate"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Printer,
  Copy,
  Check,
  Share2,
  ShieldCheck,
  X,
  ArrowUpRight,
} from "lucide-react"

interface CertificateModalProps {
  certificate: Certificate | null
  isOpen: boolean
  onClose: () => void
}

export function CertificateModal({
  certificate,
  isOpen,
  onClose,
}: CertificateModalProps) {
  const [copied, setCopied] = useState(false)

  if (!certificate) return null

  const verifyUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/verify/${certificate.certificate_id}`
      : `/verify/${certificate.certificate_id}`

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(verifyUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (e) {
      console.warn("Failed to copy URL:", e)
    }
  }

  const handlePrint = () => {
    printCertificate(certificate.certificate_id)
  }

  const handleShareLinkedIn = () => {
    const issueDate = new Date(certificate.issued_at || Date.now())
    const year = issueDate.getFullYear()
    const month = issueDate.getMonth() + 1
    const certName = encodeURIComponent(certificate.course_title)
    const orgName = encodeURIComponent("ASCI Academy")
    const certUrl = encodeURIComponent(verifyUrl)
    const certId = encodeURIComponent(certificate.certificate_id)

    const linkedInUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${certName}&organizationName=${orgName}&issueYear=${year}&issueMonth=${month}&certUrl=${certUrl}&certId=${certId}`
    window.open(linkedInUrl, "_blank", "noopener,noreferrer")
  }

  const issueDate = new Date(certificate.issued_at || "2026-09-12T12:00:00Z")
  const formattedDate = issueDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="fixed inset-0 top-0 left-0 translate-x-0 translate-y-0 w-screen max-w-none sm:max-w-none h-screen max-h-none p-0 gap-0 border-0 bg-[#0E0D0C]/96 backdrop-blur-2xl text-[#FDFBF7] shadow-none flex flex-col justify-between items-center overflow-hidden z-50 select-none print:p-0 print:border-0 print:bg-transparent print:shadow-none print:w-screen print:h-screen print:max-h-none print:overflow-visible"
      >
        {/* Accessible screen-reader title */}
        <DialogTitle className="sr-only">
          {certificate.course_title} — Official ASCI Certificate of Completion for {certificate.recipient_name}
        </DialogTitle>

        {/* ══════════════════════════════════════════════
            1. MINIMAL FLOATING ASCI BRAND HEADER
        ══════════════════════════════════════════════ */}
        <header className="w-full max-w-6xl flex items-center justify-between px-4 sm:px-8 py-3.5 sm:py-4 shrink-0 z-20 print:hidden">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {/* ASCI Signature Orange Accreditation Badge */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10.5px] font-mono font-semibold tracking-wider uppercase bg-[#EA580C]/15 text-[#EA580C] border border-[#EA580C]/35 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C]" />
              ASCI ACCREDITED
            </span>

            <span className="text-[#EA580C]/40 hidden sm:inline">•</span>

            {/* Serial Pill in ASCI Brand Styling */}
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono tracking-wider font-semibold text-[#EA580C] bg-[#EA580C]/10 border border-[#EA580C]/25">
              ID: {certificate.certificate_id}
            </span>

            <span className="text-xs font-mono text-[#A09D96] hidden md:inline">
              Conferred on {formattedDate}
            </span>
          </div>

          {/* Close Lightbox Button with ASCI Orange hover */}
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#181715]/90 border border-[#2A2724] hover:border-[#EA580C]/70 text-[#A09D96] hover:text-[#FDFBF7] hover:bg-[#22201D] transition-all cursor-pointer shadow-lg group"
            title="Close viewer (ESC)"
            aria-label="Close viewer"
          >
            <X className="w-4 h-4 transition-transform group-hover:rotate-90 duration-200" />
          </button>
        </header>

        {/* ══════════════════════════════════════════════
            2. CINEMATIC CERTIFICATE STAGE (Centerpiece)
            Scaled to 100% viewport fit with ASCI Warm Bloom
        ══════════════════════════════════════════════ */}
        <main className="flex-1 w-full flex items-center justify-center px-2 sm:px-6 py-1 sm:py-2 overflow-hidden relative print:p-0 print:m-0 print:overflow-visible">
          {/* Certificate Frame with ASCI Accent Border and Drop Shadow */}
          <div className="relative z-10 w-full max-w-[min(1080px,calc((100vh-140px)*1.414))] aspect-[1.414/1] shadow-2xl ring-1 ring-[#EA580C]/35 rounded-xs print:shadow-none print:ring-0 print:max-w-none print:w-full print:h-full">
            <CertificateCard certificate={certificate} />
          </div>
        </main>

        {/* ══════════════════════════════════════════════
            3. FLOATING ASCI ACTION DOCK
        ══════════════════════════════════════════════ */}
        <footer className="w-full max-w-6xl flex flex-col items-center gap-2 px-4 sm:px-8 pb-4 sm:pb-5 pt-2 shrink-0 z-20 print:hidden">
          {/* Floating Action Pill Bar */}
          <div className="flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-2xl bg-[#181715]/95 border border-[#EA580C]/30 backdrop-blur-xl shadow-2xl flex-wrap justify-center">
            {/* Primary Hero: Print / Save PDF in ASCI Flame */}
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-active text-white text-xs font-bold font-mono tracking-wide shadow-md transition-all cursor-pointer active:scale-95"
            >
              <Printer className="w-4 h-4 text-white" />
              <span>Print / Save PDF</span>
            </button>

            {/* Copy Verification Link */}
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2.5 rounded-xl border border-[#2A2724] hover:border-[#EA580C]/50 bg-[#1F1E1B] hover:bg-[#262420] text-xs font-mono font-medium text-[#FDFBF7] transition-all cursor-pointer shadow-xs"
              title="Copy verification link"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#EA580C]" />
                  <span className="text-[#EA580C]">Copied Link</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#EA580C]" />
                  <span>Copy Link</span>
                </>
              )}
            </button>

            {/* Add to LinkedIn */}
            <button
              onClick={handleShareLinkedIn}
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2.5 rounded-xl border border-[#2A2724] hover:border-[#EA580C]/50 bg-[#1F1E1B] hover:bg-[#262420] text-xs font-mono font-medium text-[#FDFBF7] transition-all cursor-pointer shadow-xs"
              title="Add credential to LinkedIn Profile"
            >
              <Share2 className="w-3.5 h-3.5 text-[#EA580C]" />
              <span>LinkedIn</span>
            </button>

            {/* Public Registry Link */}
            <a
              href={verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2.5 rounded-xl border border-[#EA580C]/35 bg-[#1F1E1B] hover:bg-[#EA580C]/15 text-xs font-mono font-medium text-[#EA580C] hover:text-[#FB923C] transition-all"
              title="Open public registry verification page"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#EA580C]" />
              <span>Public Registry</span>
              <ArrowUpRight className="w-3 h-3 opacity-70" />
            </a>
          </div>

          {/* Micro Security Trust Line */}
          <div className="flex items-center gap-2 text-[10.5px] font-mono text-[#A09D96] text-center">
            <span>Cryptographically Verified &amp; Issued by ASCI Academy</span>
            <span className="text-[#EA580C]/40">•</span>
            <span>Authorized by C. Mokshagna Theja (CEO, Gravit)</span>
          </div>
        </footer>
      </DialogContent>
    </Dialog>
  )
}
