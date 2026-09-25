"use client"

import React from "react"
import { cn } from "@/lib/utils"

export type IllustrationCategory =
  | "learning"
  | "courses"
  | "practice"
  | "dsa"
  | "projects"
  | "build"
  | "competitions"
  | "hackathons"
  | "career"
  | "jobs"
  | "certificates"
  | "achievements"
  | "community"

export interface CategoryIllustrationProps extends React.SVGProps<SVGSVGElement> {
  category?: IllustrationCategory | string
  type?: IllustrationCategory | string
  name?: IllustrationCategory | string
  size?: number
  className?: string
}

export function CategoryIllustration({
  category,
  type,
  name,
  size = 64,
  className = "",
  ...props
}: CategoryIllustrationProps) {
  const normalized = ((category || type || name || "learning") as string)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")

  switch (normalized) {
    // ─────────────────────────────────────────────────────────────
    // 1. LEARNING
    // ─────────────────────────────────────────────────────────────
    case "learning":
    case "courses":
    case "learn":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 80 80"
          fill="none"
          className={cn("select-none", className)}
          aria-label="Learning Illustration"
          {...props}
        >
          {/* Subtle base pill */}
          <rect x="8" y="12" width="64" height="56" rx="12" fill="#F8F9FA" stroke="#E2E8F0" strokeWidth="1.5" />
          
          {/* Open Book */}
          <path
            d="M20 50V30c0-3.3 2.7-6 6-6h14v26H26c-2.2 0-4.2.8-6 2z"
            fill="#FFFFFF"
            stroke="#0F172A"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M60 50V30c0-3.3-2.7-6-6-6H40v26h14c2.2 0 4.2.8 6 2z"
            fill="#FFFFFF"
            stroke="#0F172A"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          
          {/* Bookmark & Pages Accent */}
          <path d="M40 24v20l4-3 4 3V24" fill="#FF5B00" />
          <path d="M26 32h8M26 38h6M54 32h-8M54 38h-6" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
          
          {/* Graduation Sparkle */}
          <circle cx="56" cy="20" r="3" fill="#FF5B00" />
          <path d="M56 14v2M56 24v2M50 20h2M60 20h2" stroke="#FF5B00" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )

    // ─────────────────────────────────────────────────────────────
    // 2. PRACTICE (DSA & Coding Arena)
    // ─────────────────────────────────────────────────────────────
    case "practice":
    case "dsa":
    case "challenges":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 80 80"
          fill="none"
          className={cn("select-none", className)}
          aria-label="Practice & Problem Arena Illustration"
          {...props}
        >
          {/* Terminal Card */}
          <rect x="8" y="14" width="64" height="52" rx="10" fill="#0F172A" stroke="#334155" strokeWidth="1.5" />
          
          {/* Terminal Title Bar */}
          <rect x="8" y="14" width="64" height="12" rx="10" fill="#1E293B" />
          <circle cx="16" cy="20" r="2" fill="#EF4444" />
          <circle cx="22" cy="20" r="2" fill="#F59E0B" />
          <circle cx="28" cy="20" r="2" fill="#10B981" />
          
          {/* Code Prompt >_ */}
          <path
            d="M20 36l6 5-6 5"
            stroke="#FF5B00"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line x1="30" y1="46" x2="42" y2="46" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
          
          {/* Algorithmic Brackets { } */}
          <path
            d="M50 32c-2 0-3 1-3 3v3c0 2-2 3-2 3s2 1 2 3v3c0 2 1 3 3 3"
            stroke="#94A3B8"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M58 32c2 0 3 1 3 3v3c0 2 2 3 2 3s-2 1-2 3v3c0 2-1 3-3 3"
            stroke="#94A3B8"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      )

    // ─────────────────────────────────────────────────────────────
    // 3. PROJECTS (Guided Systems & Engineering)
    // ─────────────────────────────────────────────────────────────
    case "projects":
    case "build":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 80 80"
          fill="none"
          className={cn("select-none", className)}
          aria-label="Guided Projects Illustration"
          {...props}
        >
          {/* Background Card */}
          <rect x="8" y="12" width="64" height="56" rx="12" fill="#F8F9FA" stroke="#E2E8F0" strokeWidth="1.5" />
          
          {/* Microservices Blueprint Blocks */}
          <rect x="18" y="24" width="18" height="14" rx="4" fill="#0F172A" />
          <rect x="44" y="24" width="18" height="14" rx="4" fill="#1E293B" />
          <rect x="31" y="46" width="18" height="14" rx="4" fill="#FF5B00" />
          
          {/* Connection Lines & Commit Nodes */}
          <path d="M27 38v4a4 4 0 0 0 4 4h9a4 4 0 0 0 4-4v-4" stroke="#64748B" strokeWidth="2" strokeDasharray="2 2" />
          <circle cx="40" cy="42" r="3" fill="#0F172A" stroke="#FFFFFF" strokeWidth="1.5" />
          
          {/* Mini Code Line accents */}
          <line x1="22" y1="31" x2="32" y2="31" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="48" y1="31" x2="58" y2="31" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )

    // ─────────────────────────────────────────────────────────────
    // 4. COMPETITIONS (Hackathons & Sprints)
    // ─────────────────────────────────────────────────────────────
    case "competitions":
    case "hackathons":
    case "compete":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 80 80"
          fill="none"
          className={cn("select-none", className)}
          aria-label="Competitions & Hackathons Illustration"
          {...props}
        >
          {/* Background Card */}
          <rect x="8" y="12" width="64" height="56" rx="12" fill="#F8F9FA" stroke="#E2E8F0" strokeWidth="1.5" />
          
          {/* Championship Trophy Cup */}
          <path
            d="M26 22h28v16c0 7.7-6.3 14-14 14s-14-6.3-14-14V22z"
            fill="#FFFFFF"
            stroke="#0F172A"
            strokeWidth="2"
          />
          
          {/* Trophy Handles */}
          <path d="M26 26h-6a4 4 0 0 0-4 4v4a4 4 0 0 0 4 4h6" stroke="#0F172A" strokeWidth="2" fill="none" />
          <path d="M54 26h6a4 4 0 0 1 4 4v4a4 4 0 0 1-4 4h-6" stroke="#0F172A" strokeWidth="2" fill="none" />
          
          {/* Trophy Stem & Base */}
          <path d="M40 52v8M32 60h16" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
          
          {/* Gold Star / 1st Badge */}
          <circle cx="40" cy="34" r="6" fill="#FF5B00" />
          <path d="M40 30.5l1.2 2.5 2.8.4-2 2 .5 2.8L40 37l-2.5 1.3.5-2.8-2-2 2.8-.4 1.2-2.6z" fill="#FFFFFF" />
        </svg>
      )

    // ─────────────────────────────────────────────────────────────
    // 5. CAREER (Jobs, Internships & Mentorship)
    // ─────────────────────────────────────────────────────────────
    case "career":
    case "jobs":
    case "internships":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 80 80"
          fill="none"
          className={cn("select-none", className)}
          aria-label="Career & Opportunities Illustration"
          {...props}
        >
          {/* Background Card */}
          <rect x="8" y="12" width="64" height="56" rx="12" fill="#F8F9FA" stroke="#E2E8F0" strokeWidth="1.5" />
          
          {/* Briefcase Body */}
          <rect x="18" y="30" width="44" height="30" rx="6" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
          
          {/* Briefcase Handle */}
          <path d="M30 30v-6a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4v6" stroke="#0F172A" strokeWidth="2" fill="none" />
          
          {/* Fast Track Upward Growth Arrow */}
          <path d="M40 40v12M34 46l6-6 6 6" stroke="#FF5B00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          
          {/* Lock / Clip accent */}
          <rect x="36" y="28" width="8" height="4" rx="1" fill="#0F172A" />
        </svg>
      )

    // ─────────────────────────────────────────────────────────────
    // 6. CERTIFICATES (Verified Credentials)
    // ─────────────────────────────────────────────────────────────
    case "certificates":
    case "certificate":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 80 80"
          fill="none"
          className={cn("select-none", className)}
          aria-label="Verified Certificate Illustration"
          {...props}
        >
          {/* Diploma Sheet */}
          <rect x="14" y="14" width="52" height="42" rx="4" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
          
          {/* Document Content Lines */}
          <line x1="22" y1="24" x2="58" y2="24" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
          <line x1="22" y1="30" x2="48" y2="30" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="22" y1="36" x2="42" y2="36" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
          
          {/* Verified Wax Seal with Ribbons */}
          <circle cx="52" cy="46" r="10" fill="#FF5B00" />
          <path d="M48 46l3 3 6-6" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M46 54l-4 10 7-3 3 5 3-12" fill="#E04F00" />
        </svg>
      )

    // ─────────────────────────────────────────────────────────────
    // 7. ACHIEVEMENTS (Badges, Honors & Milestones)
    // ─────────────────────────────────────────────────────────────
    case "achievements":
    case "badges":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 80 80"
          fill="none"
          className={cn("select-none", className)}
          aria-label="Achievements & Honors Illustration"
          {...props}
        >
          {/* Background Card */}
          <rect x="8" y="12" width="64" height="56" rx="12" fill="#F8F9FA" stroke="#E2E8F0" strokeWidth="1.5" />
          
          {/* Medal Ribbons */}
          <path d="M30 20l10 16-10 16-8-32z" fill="#0F172A" opacity="0.8" />
          <path d="M50 20l-10 16 10 16 8-32z" fill="#1E293B" />
          
          {/* Sunburst Star Medal */}
          <circle cx="40" cy="40" r="14" fill="#FF5B00" stroke="#FFFFFF" strokeWidth="2" />
          <circle cx="40" cy="40" r="10" fill="#FFFFFF" />
          
          {/* Inner Milestone Diamond */}
          <rect x="36" y="36" width="8" height="8" rx="1.5" transform="rotate(45 40 40)" fill="#FF5B00" />
        </svg>
      )

    // ─────────────────────────────────────────────────────────────
    // 8. COMMUNITY (Developers & Peer Hubs)
    // ─────────────────────────────────────────────────────────────
    case "community":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 80 80"
          fill="none"
          className={cn("select-none", className)}
          aria-label="Developer Community Illustration"
          {...props}
        >
          {/* Background Card */}
          <rect x="8" y="12" width="64" height="56" rx="12" fill="#F8F9FA" stroke="#E2E8F0" strokeWidth="1.5" />
          
          {/* Peer Node 1 (Center) */}
          <circle cx="40" cy="34" r="8" fill="#FF5B00" />
          <path d="M28 54c0-6.6 5.4-12 12-12s12 5.4 12 12" fill="#0F172A" />
          
          {/* Peer Node 2 (Left) */}
          <circle cx="22" cy="38" r="5" fill="#1E293B" />
          <path d="M14 56c0-4.4 3.6-8 8-8s8 3.6 8 8" fill="#64748B" />
          
          {/* Peer Node 3 (Right) */}
          <circle cx="58" cy="38" r="5" fill="#1E293B" />
          <path d="M50 56c0-4.4 3.6-8 8-8s8 3.6 8 8" fill="#64748B" />
          
          {/* Discussion Bubble */}
          <circle cx="56" cy="22" r="6" fill="#38BDF8" />
          <path d="M52 26l-2 3 4-1" fill="#38BDF8" />
          <line x1="53" y1="22" x2="59" y2="22" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )

    default:
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 80 80"
          fill="none"
          className={cn("select-none", className)}
          aria-label="Category Illustration"
          {...props}
        >
          <rect x="8" y="12" width="64" height="56" rx="12" fill="#F8F9FA" stroke="#E2E8F0" strokeWidth="1.5" />
          <circle cx="40" cy="40" r="16" fill="#FF5B00" opacity="0.15" />
          <circle cx="40" cy="40" r="8" fill="#FF5B00" />
        </svg>
      )
  }
}
