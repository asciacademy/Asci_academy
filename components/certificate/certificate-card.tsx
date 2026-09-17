"use client"

import React, { useEffect, useState } from "react"
import { Certificate } from "@/lib/certificate-types"
import { generateQrDataUrl } from "@/lib/qr"

interface CertificateCardProps {
  certificate: Certificate
  isPrintMode?: boolean
}

function DiamondStar({ className = "w-2.5 h-2.5 text-[#D4B872]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 0 Q12 12 0 12 Q12 12 12 24 Q12 12 24 12 Q12 12 12 0 Z" />
    </svg>
  )
}

/**
 * Authentic Handwritten Ink Signature for C. Mokshagna Theja (CEO, GRAVIT)
 * Sourced directly from the official executive pen script.
 */
function MokshagnaSignature({
  className = "h-11 sm:h-14 md:h-16 w-auto",
}: {
  className?: string
}) {
  return (
    <img
      src="/images/ceo-signature.png"
      alt="Official Signature of C. Mokshagna Theja"
      className={`${className} max-w-[190px] sm:max-w-[240px] md:max-w-[270px] object-contain select-none mix-blend-multiply`}
      draggable={false}
    />
  )
}


export function CertificateCard({ certificate, isPrintMode = false }: CertificateCardProps) {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("")
  const [origin, setOrigin] = useState<string>("")

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin)
    }
  }, [])

  const verifyUrl = `${origin || "https://verify.asci.gravit.agency"}/verify/${certificate.certificate_id}`

  useEffect(() => {
    generateQrDataUrl(verifyUrl).then((url) => {
      if (url) setQrCodeDataUrl(url)
    })
  }, [certificate.certificate_id, verifyUrl])

  // Format date as "SEP 12, 2026"
  const issueDate = new Date(certificate.issued_at || "2026-09-12T12:00:00Z")
  const formattedDate = issueDate
    .toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    })
    .toUpperCase()

  const courseDescription =
    certificate.metadata?.description ||
    `This certification validates a deep understanding of algorithm design, analysis, and real-world problem solving through rigorous coursework, hands-on projects, and practical assessments.`

  return (
    <div
      id={`cert-${certificate.certificate_id}`}
      className={`certificate-print-canvas relative w-full max-w-[1020px] aspect-[1.414/1] bg-[#FAF7F2] text-[#141413] overflow-hidden shadow-2xl select-none flex flex-col justify-between print:shadow-none print:border-0 print:m-0 ${
        isPrintMode ? "shadow-none border-0 w-full h-full" : ""
      }`}
      style={{
        printColorAdjust: "exact",
        WebkitPrintColorAdjust: "exact",
        fontFeatureSettings: '"cv02", "cv03", "cv04", "cv11"',
      }}
    >
      {/* ──────────────────────────────────────────────────────────
          SUBTLE GRAIN & PAPER SHADING
      ────────────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-multiply bg-[radial-gradient(#8C7A5B_1px,transparent_1px)] [background-size:12px_12px]"
        aria-hidden="true"
      />

      {/* ──────────────────────────────────────────────────────────
          OUTER DOUBLE GOLD FRAME & CORNER STARS
      ────────────────────────────────────────────────────────── */}
      {/* Outer fine border line */}
      <div className="absolute inset-2 sm:inset-3 md:inset-4 border border-[#D4B872]/80 pointer-events-none" />

      {/* Inner hairline border */}
      <div className="absolute inset-3 sm:inset-4 md:inset-5 border border-[#D4B872]/50 pointer-events-none" />

      {/* Four-point stars on frame intersections */}
      <div className="absolute top-2 sm:top-3 md:top-4 left-2 sm:left-3 md:left-4 -translate-x-1/2 -translate-y-1/2 z-20">
        <DiamondStar className="w-2.5 h-2.5 text-[#C9A86A]" />
      </div>
      <div className="absolute top-2 sm:top-3 md:top-4 right-2 sm:right-3 md:right-4 translate-x-1/2 -translate-y-1/2 z-20">
        <DiamondStar className="w-2.5 h-2.5 text-[#C9A86A]" />
      </div>
      <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-2 sm:left-3 md:left-4 -translate-x-1/2 translate-y-1/2 z-20">
        <DiamondStar className="w-2.5 h-2.5 text-[#C9A86A]" />
      </div>
      <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 right-2 sm:right-3 md:right-4 translate-x-1/2 translate-y-1/2 z-20">
        <DiamondStar className="w-2.5 h-2.5 text-[#C9A86A]" />
      </div>

      {/* Center axis stars */}
      <div className="absolute top-2 sm:top-3 md:top-4 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <DiamondStar className="w-2 h-2 text-[#C9A86A]" />
      </div>
      <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 translate-y-1/2 z-20">
        <DiamondStar className="w-2 h-2 text-[#C9A86A]" />
      </div>

      {/* ──────────────────────────────────────────────────────────
          AUTHENTIC CELESTIAL COMPASS ARCS & ORBITAL ACCENTS
      ────────────────────────────────────────────────────────── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-35"
        viewBox="0 0 1020 721"
        fill="none"
        aria-hidden="true"
      >
        {/* Left arc sweeping from dark ribbon */}
        <path
          d="M 120 180 C 180 260 210 370 200 450"
          stroke="#D4B872"
          strokeWidth="0.75"
          strokeDasharray="4 4"
        />
        {/* Large sweeping orbital circle on the right */}
        <path
          d="M 970 45 A 520 520 0 0 0 850 675"
          stroke="#D4B872"
          strokeWidth="0.75"
        />
        {/* Small orbital accent circle */}
        <circle cx="870" cy="370" r="3" fill="#C9A86A" />
      </svg>
      {/* Right orbital intersection star */}
      <div className="absolute top-[51%] right-[14.5%] -translate-y-1/2 z-15 pointer-events-none opacity-60">
        <DiamondStar className="w-3 h-3 text-[#C9A86A]" />
      </div>

      {/* ──────────────────────────────────────────────────────────
          BORDER MICRO-TYPOGRAPHY
      ────────────────────────────────────────────────────────── */}
      {/* Top Right outer text */}
      <div className="absolute top-4 sm:top-6 right-5 sm:right-8 z-20 flex flex-col items-end text-[6px] sm:text-[7.5px] font-mono tracking-[0.25em] text-[#8C867C] uppercase leading-tight text-right">
        <span>PEOPLE</span>
        <span>IDEAS</span>
        <span>SYSTEMS</span>
        <span>REAL IMPACT</span>
      </div>

      {/* Right margin vertical text: DISCIPLINE CREATES FREEDOM */}
      <div className="absolute top-1/2 right-3 sm:right-5 -translate-y-1/2 z-20 flex flex-col items-center text-[6px] sm:text-[7.5px] font-mono tracking-[0.28em] text-[#8C867C] uppercase leading-tight text-center">
        <span>DISCIPLINE</span>
        <span>CREATES</span>
        <span>FREEDOM</span>
        <DiamondStar className="w-2 h-2 text-[#C9A86A] my-1" />
      </div>

      {/* Right lower margin: SOFTWARE PEOPLE A BRIGHTER TOMORROW */}
      <div className="absolute bottom-16 sm:bottom-20 right-3 sm:right-5 z-20 flex flex-col items-end text-[6px] sm:text-[7px] font-mono tracking-[0.24em] text-[#8C867C] uppercase leading-tight text-right">
        <span>SOFTWARE</span>
        <span>PEOPLE</span>
        <span>A BRIGHTER</span>
        <span>TOMORROW</span>
      </div>

      {/* Bottom Center: PEOPLE × TECHNOLOGY × A BRIGHTER TOMORROW */}
      <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 z-20 text-[6.5px] sm:text-[8px] font-mono tracking-[0.3em] text-[#8C867C] uppercase flex items-center gap-3">
        <span>PEOPLE</span>
        <span className="text-[#C9A86A]">✕</span>
        <span>TECHNOLOGY</span>
        <span className="text-[#C9A86A]">✕</span>
        <span>A BRIGHTER TOMORROW</span>
      </div>

      {/* Bottom Right: GLOBAL LEARNERS. REAL IMPACT. */}
      <div className="absolute bottom-2 sm:bottom-3 right-4 sm:right-7 z-20 text-[6px] sm:text-[7.5px] font-mono tracking-[0.25em] text-[#8C867C] uppercase">
        GLOBAL LEARNERS. REAL IMPACT.
      </div>

      {/* Bottom Left: MMXXVI */}
      <div className="absolute bottom-2 sm:bottom-3 left-6 sm:left-9 z-20 text-[6.5px] sm:text-[8px] font-mono tracking-[0.35em] text-[#8C867C] uppercase">
        MMXXVI
      </div>

      {/* ──────────────────────────────────────────────────────────
          LEFT ARCHITECTURAL RIBBON (DARK WITH MOUNTAIN & BEVEL CUT)
      ────────────────────────────────────────────────────────── */}
      <div
        className="absolute left-2 sm:left-3 md:left-4 top-2 sm:top-3 md:top-4 z-20 w-[10.5%] sm:w-[11.5%] md:w-[11%] h-[82%] sm:h-[84%] bg-[#121110] text-[#FAF7F2] flex flex-col justify-between py-3 sm:py-4 px-1 sm:px-2 shadow-lg"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 32px), 0 100%)",
          borderRight: "1px solid #D4B872",
          borderTop: "1px solid #D4B872",
          borderLeft: "1px solid #D4B872",
        }}
      >
        {/* Top Gold Typography */}
        <div className="flex flex-col items-center text-center space-y-2 pt-1 sm:pt-2">
          <div className="flex flex-col text-[6.5px] sm:text-[8px] md:text-[8.5px] font-mono tracking-[0.28em] text-[#D4B872] uppercase leading-[1.35] font-medium">
            <span>LEARN</span>
            <span>BUILD</span>
            <span>GROW</span>
            <span>BELONG</span>
          </div>

          <div className="w-5 sm:w-7 h-[1px] bg-[#D4B872]/50 my-1" />

          <div className="flex flex-col text-[5px] sm:text-[6px] md:text-[6.5px] font-mono tracking-[0.22em] text-[#FAF7F2]/75 uppercase leading-[1.3]">
            <span>HIGHER</span>
            <span>STANDARDS</span>
            <span>FOR A</span>
            <span>BRIGHTER</span>
            <span>TOMORROW</span>
          </div>
        </div>

        {/* Photographic mountain window */}
        <div className="relative my-2 w-full aspect-[2/3] rounded-sm overflow-hidden border border-[#D4B872]/60 shadow-inner">
          <img
            src="/images/certificate-mountain.jpg"
            alt="Alpine Peaks"
            className="w-full h-full object-cover object-center filter contrast-105"
          />
        </div>

        {/* Bottom ASCI × GRAVIT Badge */}
        <div className="flex flex-col items-center text-center pb-5 sm:pb-6">
          <span className="text-[6.5px] sm:text-[8px] font-mono tracking-[0.25em] text-[#D4B872] uppercase font-semibold">
            ASCI
          </span>
          <span className="text-[6px] sm:text-[7px] text-[#D4B872]/80 my-0.5">✕</span>
          <span className="text-[6.5px] sm:text-[8px] font-mono tracking-[0.25em] text-[#D4B872] uppercase font-semibold">
            GRAVIT
          </span>
        </div>
      </div>

      {/* Diagonal Accent Outline to match clip-path */}
      <svg
        className="absolute left-2 sm:left-3 md:left-4 top-2 sm:top-3 md:top-4 w-[10.5%] sm:w-[11.5%] md:w-[11%] h-[82%] sm:h-[84%] pointer-events-none z-20"
        fill="none"
      >
        <line
          x1="0"
          y1="100%"
          x2="100%"
          y2="calc(100% - 32px)"
          stroke="#D4B872"
          strokeWidth="1.5"
        />
      </svg>

      {/* ──────────────────────────────────────────────────────────
          MAIN CERTIFICATE BODY (INSIDE INNER GOLD FRAME)
      ────────────────────────────────────────────────────────── */}
      <div className="relative z-10 pl-[12%] sm:pl-[13.5%] md:pl-[13%] pr-4 sm:pr-8 md:pr-10 py-5 sm:py-7 md:py-8 flex flex-col justify-between h-full">
        {/* ══════════════════════════════════════════════
            HEADER: LOGOS & SUB-HEADER
        ══════════════════════════════════════════════ */}
        <div className="space-y-2 sm:space-y-3">
          {/* Top Logo Row */}
          <div className="flex items-center justify-center gap-4 sm:gap-7 md:gap-8 pt-1">
            {/* Left Brand: ASCI (Using official provided ASCI logo) */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              <div className="w-8 sm:w-10 md:w-11 h-8 sm:h-10 md:h-11 shrink-0 flex items-center justify-center">
                <img
                  src="/images/asci-logo.png"
                  alt="ASCI Logo"
                  className="w-full h-full object-contain filter drop-shadow-[0_2px_4px_rgba(234,88,12,0.18)]"
                />
              </div>

              <div className="flex flex-col text-left leading-none">
                <span className="font-sans font-black text-base sm:text-xl md:text-2xl tracking-tight text-[#141413]">
                  ASCI
                </span>
                <span className="text-[6.5px] sm:text-[7.5px] md:text-[8px] font-sans font-semibold tracking-wider text-[#68635B] uppercase mt-0.5">
                  ACADEMY OF SOFTWARE
                </span>
                <span className="text-[6.5px] sm:text-[7.5px] md:text-[8px] font-sans font-semibold tracking-wider text-[#68635B] uppercase">
                  CRAFT &amp; INTELLIGENCE
                </span>
              </div>
            </div>

            {/* Delicate Center Cross Divider */}
            <span className="text-[#C9A86A] text-sm sm:text-base font-light select-none">
              ✕
            </span>

            {/* Right Brand: GRAVIT (Using official provided GRAVIT G glyph) */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              <div className="w-7 sm:w-8 md:w-9 h-7 sm:h-8 md:h-9 shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
                  <path
                    d="M 72 26 A 38 38 0 1 0 72 74"
                    stroke="#141413"
                    strokeWidth="12"
                    strokeLinecap="round"
                  />
                  <line
                    x1="48"
                    y1="50"
                    x2="74"
                    y2="50"
                    stroke="#141413"
                    strokeWidth="12"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <div className="flex flex-col text-left leading-none">
                <span className="font-sans font-black text-base sm:text-xl md:text-2xl tracking-[0.18em] text-[#141413]">
                  GRAVIT
                </span>
                <span className="text-[6px] sm:text-[7px] md:text-[7.5px] font-sans font-medium tracking-wider text-[#68635B] uppercase mt-0.5">
                  ENGINEERING A BETTER TOMORROW
                </span>
              </div>
            </div>
          </div>

          {/* Sub-header text row */}
          <div className="flex items-center justify-between px-2 sm:px-6 md:px-8 text-[7px] sm:text-[8.5px] md:text-[9.5px] font-mono tracking-[0.22em] text-[#6E685F] uppercase">
            <span>ASCI ACADEMY &nbsp;✕&nbsp; GRAVIT ENGINEERING</span>
            <span>CERT-ID: {certificate.certificate_id}</span>
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            CENTER CONTENT: TITLE, WATERMARK, RECIPIENT, COURSE
        ══════════════════════════════════════════════ */}
        <div className="relative text-center my-auto py-1 sm:py-2 md:py-3 space-y-2 sm:space-y-3">
          {/* Authentic Graduation Cap Watermark in Center Background */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.09] -z-10 select-none overflow-hidden">
            <img
              src="/images/asci-logo.png"
              alt="ASCI Watermark"
              className="w-[45%] max-w-[340px] h-auto object-contain filter grayscale contrast-75"
            />
          </div>

          {/* Certificate of Completion Header */}
          <div className="space-y-1">
            <h1 className="font-certificate-title text-2xl sm:text-4xl md:text-[46px] lg:text-[50px] font-normal text-[#141413] tracking-tight leading-none flex items-baseline justify-center gap-1.5 sm:gap-2">
              <span>Certificate</span>
              <span className="font-certificate-script text-2xl sm:text-4xl md:text-[48px] text-[#2563EB] italic lowercase font-normal">
                of
              </span>
              <span>Completion</span>
            </h1>

            {/* Delicate Gold Underline with Center Diamond */}
            <div className="relative w-48 sm:w-64 md:w-80 mx-auto flex items-center justify-center pt-0.5">
              <div className="w-full h-[0.75px] bg-[#D4B872]/80" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FAF7F2] px-1">
                <DiamondStar className="w-2 h-2 text-[#C9A86A]" />
              </div>
            </div>
          </div>

          {/* Subtitle: THIS CERTIFIES THAT */}
          <p className="font-mono text-[7.5px] sm:text-[9px] md:text-[10px] tracking-[0.32em] text-[#7A7369] uppercase font-medium">
            THIS CERTIFIES THAT
          </p>

          {/* Recipient Name in Prestigious Italic Serif (Matching Reference Image) */}
          <div className="py-0 sm:py-1">
            <div className="inline-block relative">
              <span className="font-certificate-italic text-3xl sm:text-5xl md:text-[52px] lg:text-[58px] text-[#141413] tracking-tight px-4 sm:px-8 block leading-[1.15]">
                {certificate.recipient_name}
              </span>
              {/* Baseline underline */}
              <div className="w-full h-[0.75px] bg-[#C9A86A]/70 mt-0.5" />
            </div>
          </div>

          {/* Completion Line */}
          <p className="font-mono text-[7px] sm:text-[8px] md:text-[9px] tracking-[0.26em] text-[#7A7369] uppercase font-medium">
            HAS SUCCESSFULLY COMPLETED THE
          </p>

          {/* Course Name in Terracotta Bold Serif */}
          <div>
            <h2 className="font-certificate-serif text-xl sm:text-2xl md:text-[32px] text-[#B93815] font-semibold tracking-tight leading-snug">
              {certificate.course_title}
            </h2>

            {/* Partnership Credential Line */}
            <p className="font-mono text-[7px] sm:text-[8.5px] md:text-[9.5px] tracking-[0.16em] text-[#2C2824] uppercase mt-1">
              COURSE AT <strong className="font-bold text-[#141413]">ASCI ACADEMY</strong>, IN OFFICIAL PARTNERSHIP WITH <strong className="font-bold text-[#141413]">GRAVIT</strong>.
            </p>
          </div>

          {/* Course Rigor Paragraph */}
          <p className="font-serif text-[8.5px] sm:text-[11px] md:text-[12px] text-[#4A453E] max-w-[580px] mx-auto leading-relaxed font-normal px-2">
            {courseDescription}
          </p>
        </div>

        {/* ══════════════════════════════════════════════
            BOTTOM SECTION: QR CODE, SERIALS & SIGNATURE
        ══════════════════════════════════════════════ */}
        <div className="pt-2 sm:pt-4 flex items-end justify-between gap-4 border-t border-transparent">
          {/* Left Column: Vertical Tag + Scannable QR + Metadata */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 text-left">
            {/* Knowledge Into Real Impact vertical text */}
            <div className="hidden sm:flex flex-col text-[6px] sm:text-[7px] md:text-[8px] font-mono tracking-[0.24em] text-[#8C867C] uppercase leading-tight border-r border-[#D4B872]/50 pr-2">
              <span>KNOWLEDGE</span>
              <span>INTO</span>
              <span>REAL IMPACT</span>
            </div>

            {/* Functional Scannable QR Code */}
            <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-[72px] md:h-[72px] bg-white border border-[#D4B872]/80 p-0.5 sm:p-1 rounded-sm shadow-xs shrink-0 flex items-center justify-center">
              {qrCodeDataUrl ? (
                <img
                  src={qrCodeDataUrl}
                  alt="Official Verification QR Code"
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-full h-full bg-[#FAF7F2] animate-pulse" />
              )}
            </div>

            {/* Metadata Rows */}
            <div className="space-y-0.5 text-[6.5px] sm:text-[7.5px] md:text-[8.5px] font-mono text-[#5A554D] leading-tight">
              <div className="flex items-center gap-1.5">
                <span className="text-[#8C867C] w-20 sm:w-24">DATE OF ISSUE</span>
                <span className="text-[#141413] font-semibold">: &nbsp;{formattedDate}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[#8C867C] w-20 sm:w-24">CERTIFICATE ID</span>
                <span className="text-[#141413] font-semibold">: &nbsp;{certificate.certificate_id}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[#8C867C] w-20 sm:w-24">VERIFY AT</span>
                <span className="text-[#141413] font-semibold truncate max-w-[150px] sm:max-w-[190px]">
                  : &nbsp;https://verify.asci.gravit.agency
                </span>
              </div>
              <p className="text-[5.5px] sm:text-[6.5px] md:text-[7px] text-[#8C867C] pt-0.5 max-w-[220px]">
                Scan the QR code or visit the link to verify the authenticity of this certificate.
              </p>
            </div>
          </div>

          {/* Right Column: Handwritten Ink Signature of C. Mokshagna Theja */}
          <div className="flex flex-col items-center text-center shrink-0 pr-2 sm:pr-4">
            <div className="h-12 sm:h-14 md:h-16 flex items-end justify-center">
              <MokshagnaSignature className="h-12 sm:h-14 md:h-16 w-auto" />
            </div>

            {/* Signature Underline */}
            <div className="w-40 sm:w-52 md:w-60 h-[1px] bg-[#141413]/70 mb-1" />

            {/* Signee Title */}
            <div className="font-mono text-[7px] sm:text-[8.5px] md:text-[9.5px] font-bold text-[#141413] uppercase tracking-[0.18em]">
              C. MOKSHAGNA THEJA
            </div>
            <div className="font-mono text-[6px] sm:text-[7px] md:text-[8px] text-[#6E685F] uppercase tracking-[0.2em]">
              CEO, GRAVIT
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
