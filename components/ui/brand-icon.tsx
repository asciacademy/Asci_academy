"use client"

import React from "react"

export type BrandIconName =
  // Programming Languages
  | "python"
  | "java"
  | "javascript"
  | "js"
  | "typescript"
  | "ts"
  | "c"
  | "cpp"
  | "c++"
  | "cplusplus"
  | "go"
  | "golang"
  | "rust"
  | "html"
  | "html5"
  | "css"
  | "css3"
  | "sql"
  // Frameworks & Libraries
  | "react"
  | "nextjs"
  | "next.js"
  | "next"
  | "nodejs"
  | "node"
  | "express"
  | "tailwind"
  | "tailwindcss"
  | "graphql"
  // Systems, Cloud & DevOps
  | "docker"
  | "kubernetes"
  | "k8s"
  | "aws"
  | "azure"
  | "googlecloud"
  | "gcp"
  | "linux"
  | "git"
  | "github"
  | "kafka"
  // Databases & Backend
  | "supabase"
  | "postgres"
  | "postgresql"
  | "mongodb"
  | "redis"
  // AI & ML
  | "openai"
  | "gemini"
  | "machine-learning"
  | "ml"
  | "ai"
  | "tensorflow"
  | "pytorch"
  | "algorithm"
  | "dsa"
  | "system-design"
  // Companies
  | "google"
  | "microsoft"
  | "amazon"
  | "meta"
  | "apple"
  | "adobe"
  | "tcs"
  | "infosys"
  | "razorpay"
  | "zerodha"
  | "netflix"
  | "uber"
  | "ibm"
  // Universities & Institutions
  | "harvard"
  | "mit"
  | "stanford"
  | "iit"
  | "asci"

export interface BrandIconProps extends React.SVGProps<SVGSVGElement> {
  name: BrandIconName | string
  size?: number
  className?: string
}

export function BrandIcon({ name, size = 24, className = "", ...props }: BrandIconProps) {
  const normalized = (name || "").toLowerCase().trim().replace(/\s+/g, "-")

  switch (normalized) {
    // ─────────────────────────────────────────────────────────────
    // PROGRAMMING LANGUAGES
    // ─────────────────────────────────────────────────────────────
    case "python":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
          <path
            d="M11.91 2c-5.26 0-4.93 2.28-4.93 2.28l.01 2.36h5.02v.71H4.96S2 7.02 2 12.28c0 5.27 2.58 5.09 2.58 5.09h1.54v-2.17s-.08-2.58 2.54-2.58h4.33s2.47.04 2.47-2.42V4.47S15.86 2 11.91 2zm-1.39 1.45a.87.87 0 1 1 0 1.74.87.87 0 0 1 0-1.74z"
            fill="#3776AB"
          />
          <path
            d="M12.09 22c5.26 0 4.93-2.28 4.93-2.28l-.01-2.36h-5.02v-.71h7.05S22 16.98 22 11.72c0-5.27-2.58-5.09-2.58-5.09h-1.54v2.17s.08 2.58-2.54 2.58h-4.33s-2.47-.04-2.47 2.42v5.73S8.14 22 12.09 22zm1.39-1.45a.87.87 0 1 1 0-1.74.87.87 0 0 1 0 1.74z"
            fill="#FFD438"
          />
        </svg>
      )

    case "java":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
          <path
            d="M8.5 17.5c2.5 1 6.5 1 9 0 .5-.2 1-.4 1.2-.7-.5-.3-1.5-.5-2.2-.6-3.2-.2-6.5-.1-8 .7-.3.2-.3.4 0 .6z"
            fill="#E76F00"
          />
          <path
            d="M7.8 19.3c3.2 1.2 8.3 1.2 11.5 0 .4-.2.8-.4 1-.7-.6-.3-1.9-.5-2.8-.6-4.1-.3-8.3-.1-10.2.7-.4.2-.4.4.5.6z"
            fill="#E76F00"
          />
          <path
            d="M14.5 10c.8 1-1.2 2-1.2 2s2.5.5 3.5 1.5c1.2 1.2.8 2.5-.2 3.5 0 0 2-1.2 1.5-2.8-.4-1.2-2.2-1.8-2.2-1.8s1.8-.8 1-2.2c-.8-1.5-2.4-2.2-2.4-2.2s1-.2 0 2z"
            fill="#5382A1"
          />
          <path
            d="M10.5 8c-.5 1 1 2 1 2s-2.5.5-3.5 1.5c-1.2 1.2-.8 2.5.2 3.5 0 0-2-1.2-1.5-2.8.4-1.2 2.2-1.8 2.2-1.8s-1.8-.8-1-2.2C8.7 6.7 10.3 6 10.3 6s-1-.2 0 2z"
            fill="#E76F00"
          />
        </svg>
      )

    case "javascript":
    case "js":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
          <rect width="24" height="24" rx="4" fill="#F7DF1E" />
          <path
            d="M7 16.5c.5.8 1.2 1.5 2.5 1.5 1.3 0 2-.7 2-2.1v-5.4H9.8v5.3c0 .7-.3 1-1 1-.4 0-.8-.3-1-.6l-.8.3zm7.8-.1c.6.9 1.5 1.6 3 1.6 1.6 0 2.7-.8 2.7-2.1 0-1.4-.9-1.9-2.2-2.4l-.5-.2c-.8-.3-1.1-.6-1.1-1.1 0-.5.4-.9 1.1-.9.7 0 1.2.3 1.5.8l1.4-.9c-.6-.9-1.4-1.3-2.9-1.3-1.5 0-2.6.9-2.6 2.2 0 1.3.8 1.9 2 2.4l.5.2c.8.3 1.3.6 1.3 1.2 0 .6-.5 1-1.3 1-.9 0-1.4-.5-1.8-1.1l-1.2.8z"
            fill="#000000"
          />
        </svg>
      )

    case "typescript":
    case "ts":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
          <rect width="24" height="24" rx="4" fill="#3178C6" />
          <path
            d="M5 8.5h6V10H8.8v6H7.2v-6H5V8.5zm8 6.9c.5.6 1.1 1 2.2 1 1.2 0 1.9-.6 1.9-1.5 0-1-.7-1.4-1.6-1.7l-.4-.2c-.7-.2-.9-.5-.9-.9 0-.4.3-.7.8-.7.5 0 .9.2 1.2.6l1.1-.8c-.5-.7-1.1-1-2.3-1-1.2 0-2 .7-2 1.7 0 1 .6 1.4 1.5 1.8l.4.1c.7.2 1 .5 1 .9 0 .5-.4.8-1 .8-.7 0-1.1-.4-1.4-.9l-1.2.8z"
            fill="#FFFFFF"
          />
        </svg>
      )

    case "c":
    case "c-lang":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
          <path d="M12 2l8.66 5v10L12 22l-8.66-5V7L12 2z" fill="#00599C" />
          <path
            d="M12 6.5c-3.3 0-6 2.7-6 6s2.7 6 6 6c2.3 0 4.2-1.3 5.2-3.1l-2.2-1.3c-.6 1.1-1.8 1.8-3 1.8-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5c1.3 0 2.4.7 3 1.8l2.2-1.3c-1-1.8-2.9-3.1-5.2-3.1z"
            fill="#FFFFFF"
          />
        </svg>
      )

    case "cpp":
    case "c++":
    case "cplusplus":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
          <path d="M12 2l8.66 5v10L12 22l-8.66-5V7L12 2z" fill="#00599C" />
          <path
            d="M9.5 7c-2.8 0-5 2.2-5 5s2.2 5 5 5c1.9 0 3.5-1.1 4.3-2.6l-1.8-1.1c-.5.9-1.5 1.5-2.5 1.5-1.7 0-3-1.3-3-3s1.3-3 3-3c1 0 2 .6 2.5 1.5l1.8-1.1C13 8.1 11.4 7 9.5 7z"
            fill="#FFFFFF"
          />
          <path
            d="M15 10.5h1v1.5h1.5v1H16v1.5h-1v-1.5h-1.5v-1H15v-1.5zm3.5 0h1v1.5h1.5v1H19.5v1.5h-1v-1.5H17v-1h1.5v-1.5z"
            fill="#00D2FF"
          />
        </svg>
      )

    case "go":
    case "golang":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
          <rect width="24" height="24" rx="4" fill="#00ADD8" />
          <path
            d="M10.8 12.8h-2.5v-1.6h4.3v4.4c-.9.6-2.1.9-3.4.9-3.2 0-5.2-2.1-5.2-5 0-2.8 2-5 5.2-5 1.8 0 3.1.6 3.9 1.5l-1.4 1.3c-.6-.6-1.4-1-2.5-1-1.8 0-3 1.3-3 3.2s1.2 3.2 3 3.2c.6 0 1.1-.1 1.6-.4v-1.5zm7.7-.8c0 2.6-1.8 4.5-4.4 4.5s-4.4-1.9-4.4-4.5 1.8-4.5 4.4-4.5 4.4 1.9 4.4 4.5zm-2.2 0c0-1.5-.9-2.7-2.2-2.7s-2.2 1.2-2.2 2.7.9 2.7 2.2 2.7 2.2-1.2 2.2-2.7z"
            fill="#FFFFFF"
          />
        </svg>
      )

    case "rust":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
          <rect width="24" height="24" rx="4" fill="#000000" />
          <circle cx="12" cy="12" r="7.5" stroke="#DEA584" strokeWidth="1.5" />
          <path
            d="M9 8h3.5c1.4 0 2.5 1 2.5 2.2 0 1-.7 1.8-1.7 2.1l2 3.7h-2l-1.7-3.3H11v3.3H9V8zm2 3.2h1.4c.5 0 .9-.3.9-.7s-.4-.7-.9-.7H11v1.4z"
            fill="#DEA584"
          />
        </svg>
      )

    case "html":
    case "html5":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
          <path d="M4 3l1.5 16.5L12 22l6.5-2.5L20 3H4z" fill="#E34F26" />
          <path d="M12 4.5v15.5l5.2-1.9L18.4 4.5H12z" fill="#EF652A" />
          <path
            d="M7.5 7h9l-.2 2.5H12v2.5h4l-.4 4.5-3.6 1-3.6-1-.2-2.5h2.2l.1 1.2 1.5.4 1.5-.4.2-1.7H7.5V7z"
            fill="#FFFFFF"
          />
        </svg>
      )

    case "css":
    case "css3":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
          <path d="M4 3l1.5 16.5L12 22l6.5-2.5L20 3H4z" fill="#1572B6" />
          <path d="M12 4.5v15.5l5.2-1.9L18.4 4.5H12z" fill="#33A9DC" />
          <path
            d="M7.5 7h9l-.2 2.5H12v2.5h4l-.4 4.5-3.6 1-3.6-1-.2-2.5h2.2l.1 1.2 1.5.4 1.5-.4.2-1.7H7.5V7z"
            fill="#FFFFFF"
          />
        </svg>
      )

    case "sql":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
          <rect width="24" height="24" rx="4" fill="#00758F" />
          <ellipse cx="12" cy="7" rx="6" ry="2.5" fill="#FFFFFF" opacity="0.9" />
          <path d="M6 7v4c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5V7" stroke="#FFFFFF" strokeWidth="1.5" />
          <path d="M6 11v4c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-4" stroke="#FFFFFF" strokeWidth="1.5" />
        </svg>
      )

    // ─────────────────────────────────────────────────────────────
    // FRAMEWORKS & LIBRARIES
    // ─────────────────────────────────────────────────────────────
    case "react":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
          <rect width="24" height="24" rx="4" fill="#20232A" />
          <ellipse cx="12" cy="12" rx="3.5" ry="8.5" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(30 12 12)" />
          <ellipse cx="12" cy="12" rx="3.5" ry="8.5" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(90 12 12)" />
          <ellipse cx="12" cy="12" rx="3.5" ry="8.5" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(150 12 12)" />
          <circle cx="12" cy="12" r="1.5" fill="#61DAFB" />
        </svg>
      )

    case "nextjs":
    case "next.js":
    case "next":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
          <circle cx="12" cy="12" r="11" fill="#000000" />
          <path
            d="M8.5 7.5v9h2.2v-5.2l5.5 6.2c.4-.3.7-.6 1-.9L9.8 7.5H8.5zm6.5 0h2.2v4.8l-2.2-2.5V7.5z"
            fill="#FFFFFF"
          />
        </svg>
      )

    case "nodejs":
    case "node":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
          <path d="M12 2l9 5.2v10.4l-9 5.2-9-5.2V7.2L12 2z" fill="#339933" />
          <path
            d="M12 6.5a2.5 2.5 0 0 0-2.5 2.5v6a2.5 2.5 0 0 0 5 0v-2.5h-2.5v2.5a.8.8 0 0 1-1.6 0V9a.8.8 0 0 1 1.6 0h2.5a2.5 2.5 0 0 0-2.5-2.5z"
            fill="#FFFFFF"
          />
        </svg>
      )

    case "express":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
          <rect width="24" height="24" rx="4" fill="#000000" />
          <text x="12" y="16" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontFamily="sans-serif" fontWeight="bold">
            ex
          </text>
        </svg>
      )

    case "tailwind":
    case "tailwindcss":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
          <rect width="24" height="24" rx="4" fill="#0B1120" />
          <path
            d="M7 11.5c.8-1.5 2.2-2.3 4.2-2.3 3 0 3.8 2.3 5.3 2.3 1 0 1.8-.5 2.5-1.5-1 1.5-2.3 2.3-4.3 2.3-3 0-3.7-2.3-5.2-2.3-1 0-1.8.5-2.5 1.5zm-3 4c.8-1.5 2.2-2.3 4.2-2.3 3 0 3.8 2.3 5.3 2.3 1 0 1.8-.5 2.5-1.5-1 1.5-2.3 2.3-4.3 2.3-3 0-3.7-2.3-5.2-2.3-1 0-1.8.5-2.5 1.5z"
            fill="#06B6D4"
          />
        </svg>
      )

    case "graphql":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
          <rect width="24" height="24" rx="4" fill="#171E26" />
          <circle cx="12" cy="4" r="1.5" fill="#E10098" />
          <circle cx="12" cy="20" r="1.5" fill="#E10098" />
          <circle cx="4.5" cy="8" r="1.5" fill="#E10098" />
          <circle cx="19.5" cy="8" r="1.5" fill="#E10098" />
          <circle cx="4.5" cy="16" r="1.5" fill="#E10098" />
          <circle cx="19.5" cy="16" r="1.5" fill="#E10098" />
          <path d="M12 4l7.5 4v8L12 20l-7.5-4V8L12 4z" stroke="#E10098" strokeWidth="1" />
          <path d="M12 4v16M4.5 8l15 8M4.5 16l15-8" stroke="#E10098" strokeWidth="1" />
        </svg>
      )

    // ─────────────────────────────────────────────────────────────
    // CLOUD, DEVOPS & INFRASTRUCTURE
    // ─────────────────────────────────────────────────────────────
    case "docker":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
          <rect width="24" height="24" rx="4" fill="#2496ED" />
          <path
            d="M4 13.5c.5-1 2-1 2-1h13c1 0 2 .5 2 2 0 3-2.5 5.5-6.5 5.5S6 18 5 15.5L4 13.5z"
            fill="#FFFFFF"
          />
          <path
            d="M6 10.5h2v2H6zm2.5 0h2v2h-2zm2.5 0h2v2h-2zm2.5 0h2v2h-2zm-5-2.5h2v2h-2zm2.5 0h2v2h-2zm2.5 0h2v2h-2z"
            fill="#FFFFFF"
          />
        </svg>
      )

    case "kubernetes":
    case "k8s":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
          <rect width="24" height="24" rx="4" fill="#326CE5" />
          <circle cx="12" cy="12" r="7" stroke="#FFFFFF" strokeWidth="1.5" fill="none" />
          <circle cx="12" cy="12" r="2.5" fill="#FFFFFF" />
          <path d="M12 5v4M12 15v4M5 12h4M15 12h4" stroke="#FFFFFF" strokeWidth="1.5" />
        </svg>
      )

    case "aws":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
          <rect width="24" height="24" rx="4" fill="#232F3E" />
          <path
            d="M6 15c3 2 8 2 12 0"
            stroke="#FF9900"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path d="M18 13.5l1 2-2 .5" fill="#FF9900" />
        </svg>
      )

    case "azure":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
          <rect width="24" height="24" rx="4" fill="#0078D4" />
          <path
            d="M5 18l4.5-12h4L8 18H5zm4.8 0l3-5.2 4.2 5.2h-7.2zm3.8-6.5L16 7h3l-3.5 4.5h-1.9z"
            fill="#FFFFFF"
          />
        </svg>
      )

    case "googlecloud":
    case "gcp":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
          <path
            d="M17.5 15a4.5 4.5 0 0 0 .5-8.9 6 6 0 0 0-11.8 1.9A4.5 4.5 0 0 0 7 16.8h10.5"
            stroke="#4285F4"
            strokeWidth="2"
            fill="#FFFFFF"
          />
          <path d="M10 14h4" stroke="#EA4335" strokeWidth="2" />
        </svg>
      )

    case "git":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
          <path d="M12 2l9 9-9 9-9-9 9-9z" fill="#F05032" />
          <path
            d="M15 11a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-6 2a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm3 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"
            fill="#FFFFFF"
          />
          <path d="M9 13v-3m6 0v5M9 10l6 3" stroke="#FFFFFF" strokeWidth="1.5" />
        </svg>
      )

    case "github":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
          <rect width="24" height="24" rx="4" fill="#181717" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 4C7.58 4 4 7.58 4 12c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0020 12c0-4.42-3.58-8-8-8z"
            fill="#FFFFFF"
          />
        </svg>
      )

    case "linux":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
          <rect width="24" height="24" rx="4" fill="#FCC624" />
          <path
            d="M12 5c-2 0-3 1.5-3 3.5v4c0 2 1 3.5 3 3.5s3-1.5 3-3.5v-4C15 6.5 14 5 12 5z"
            fill="#000000"
          />
          <circle cx="10.8" cy="8" r="0.7" fill="#FFFFFF" />
          <circle cx="13.2" cy="8" r="0.7" fill="#FFFFFF" />
          <path d="M11 9.5h2l-1 1-1-1z" fill="#FFA500" />
        </svg>
      )

    case "kafka":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
          <rect width="24" height="24" rx="4" fill="#231F20" />
          <circle cx="8" cy="12" r="2.5" fill="#FFFFFF" />
          <circle cx="16" cy="7" r="2" fill="#FFFFFF" />
          <circle cx="16" cy="17" r="2" fill="#FFFFFF" />
          <path d="M8 12l8-5M8 12l8 5" stroke="#FFFFFF" strokeWidth="1.5" />
        </svg>
      )

    // ─────────────────────────────────────────────────────────────
    // DATABASES & STORAGE
    // ─────────────────────────────────────────────────────────────
    case "supabase":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
          <rect width="24" height="24" rx="4" fill="#1C1C1C" />
          <path d="M13.5 3L4 14.5h7.5L9.5 21l10.5-12h-7.5l1-6z" fill="#3ECF8E" />
        </svg>
      )

    case "postgres":
    case "postgresql":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
          <rect width="24" height="24" rx="4" fill="#336791" />
          <path
            d="M12 4c-3.3 0-6 2.5-6 6 0 2.2 1.2 4.1 3 5.1V18h6v-2.9c1.8-1 3-2.9 3-5.1 0-3.5-2.7-6-6-6zm0 2c2.2 0 4 1.8 4 4 0 1.5-.8 2.8-2 3.5V16h-4v-2.5c-1.2-.7-2-2-2-3.5 0-2.2 1.8-4 4-4z"
            fill="#FFFFFF"
          />
        </svg>
      )

    case "mongodb":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
          <rect width="24" height="24" rx="4" fill="#47A248" />
          <path
            d="M12 3S7 7.5 7 13c0 3 2.5 6 5 8 2.5-2 5-5 5-8 0-5.5-5-10-5-10zm0 15c-1.5-1.5-2.5-3.5-2.5-5 0-2.5 2.5-5 2.5-5s2.5 2.5 2.5 5c0 1.5-1 3.5-2.5 5z"
            fill="#FFFFFF"
          />
        </svg>
      )

    case "redis":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
          <rect width="24" height="24" rx="4" fill="#DC382D" />
          <path
            d="M5 8l7-4 7 4-7 4-7-4zm0 4.5l7 4 7-4m-14 4l7 4 7-4"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )

    // ─────────────────────────────────────────────────────────────
    // AI, ML & DATA SYSTEMS
    // ─────────────────────────────────────────────────────────────
    case "openai":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
          <rect width="24" height="24" rx="4" fill="#10A37F" />
          <circle cx="12" cy="12" r="6" stroke="#FFFFFF" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="2" fill="#FFFFFF" />
          <path d="M12 6v3M12 15v3M6 12h3M15 12h3" stroke="#FFFFFF" strokeWidth="1.5" />
        </svg>
      )

    case "gemini":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
          <rect width="24" height="24" rx="4" fill="#1E293B" />
          <path
            d="M12 3C12 7.5 16.5 12 21 12C16.5 12 12 16.5 12 21C12 16.5 7.5 12 3 12C7.5 12 12 7.5 12 3Z"
            fill="url(#gemini-grad)"
          />
          <defs>
            <linearGradient id="gemini-grad" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
              <stop stopColor="#4E88F5" />
              <stop offset="0.5" stopColor="#9B72CF" />
              <stop offset="1" stopColor="#D96570" />
            </linearGradient>
          </defs>
        </svg>
      )

    case "tensorflow":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
          <rect width="24" height="24" rx="4" fill="#FF6F00" />
          <path d="M12 4l6 3.5v7l-6 3.5-6-3.5v-7L12 4z" fill="#FFFFFF" />
          <path d="M12 4v14M6 7.5l12 7M18 7.5l-12 7" stroke="#FF6F00" strokeWidth="1.5" />
        </svg>
      )

    case "pytorch":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
          <rect width="24" height="24" rx="4" fill="#EE4C2C" />
          <path
            d="M13.5 5.5l-3 3a4 4 0 1 0 5.6 5.6l1-1-1-1-.7.7a2.5 2.5 0 1 1-3.5-3.5l3-3-1.4-1.8z"
            fill="#FFFFFF"
          />
          <circle cx="15.5" cy="6.5" r="1" fill="#FFFFFF" />
        </svg>
      )

    case "machine-learning":
    case "ml":
    case "ai":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
          <rect width="24" height="24" rx="4" fill="#FF5B00" />
          <rect x="6" y="6" width="12" height="12" rx="2" stroke="#FFFFFF" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="2" fill="#FFFFFF" />
          <path d="M12 3v3M12 18v3M3 12h3M18 12h3" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )

    case "algorithm":
    case "dsa":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
          <rect width="24" height="24" rx="4" fill="#FF5B00" opacity="0.12" />
          <rect width="24" height="24" rx="4" stroke="#FF5B00" strokeWidth="1" />
          <path
            d="M7 8l-3 4 3 4M17 8l3 4-3 4M14 6l-4 12"
            stroke="#FF5B00"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )

    case "system-design":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
          <rect width="24" height="24" rx="4" fill="#0F172A" />
          <rect x="5" y="5" width="5" height="5" rx="1" stroke="#38BDF8" strokeWidth="1.5" />
          <rect x="14" y="5" width="5" height="5" rx="1" stroke="#38BDF8" strokeWidth="1.5" />
          <rect x="9.5" y="14" width="5" height="5" rx="1" stroke="#38BDF8" strokeWidth="1.5" />
          <path d="M10 7.5h4M12 10v4" stroke="#38BDF8" strokeWidth="1.5" />
        </svg>
      )

    // ─────────────────────────────────────────────────────────────
    // COMPANIES
    // ─────────────────────────────────────────────────────────────
    case "google":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
          <path
            d="M21.35 12.04c0-.7-.06-1.37-.18-2.04H12v3.86h5.25c-.23 1.22-.92 2.25-1.96 2.94v2.44h3.18c1.86-1.71 2.88-4.23 2.88-7.2z"
            fill="#4285F4"
          />
          <path
            d="M12 21.6c2.59 0 4.77-.86 6.36-2.32l-3.18-2.44c-.88.59-2 .94-3.18.94-2.45 0-4.52-1.65-5.26-3.87H3.45v2.52C5.07 19.45 8.27 21.6 12 21.6z"
            fill="#34A853"
          />
          <path
            d="M6.74 13.91a5.77 5.77 0 0 1 0-3.82V7.57H3.45a9.6 9.6 0 0 0 0 8.86l3.29-2.52z"
            fill="#FBBC05"
          />
          <path
            d="M12 6.22c1.41 0 2.68.49 3.68 1.44l2.76-2.76C16.76 3.32 14.58 2.4 12 2.4 8.27 2.4 5.07 4.55 3.45 7.57l3.29 2.52c.74-2.22 2.81-3.87 5.26-3.87z"
            fill="#EA4335"
          />
        </svg>
      )

    case "microsoft":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
          <rect x="3" y="3" width="8.5" height="8.5" fill="#F25022" />
          <rect x="12.5" y="3" width="8.5" height="8.5" fill="#7FBA00" />
          <rect x="3" y="12.5" width="8.5" height="8.5" fill="#00A4EF" />
          <rect x="12.5" y="12.5" width="8.5" height="8.5" fill="#FFB900" />
        </svg>
      )

    case "amazon":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
          <rect width="24" height="24" rx="4" fill="#232F3E" />
          <path
            d="M6 14.5c3.5 2 8.5 2 12 0"
            stroke="#FF9900"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path d="M17.5 13.5l1.5 1.8-2 .3" fill="#FF9900" />
        </svg>
      )

    case "meta":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
          <rect width="24" height="24" rx="4" fill="#0668E1" />
          <path
            d="M6.5 14.5c-1.5 0-2.5-1.2-2.5-2.5s1-2.5 2.5-2.5c1.6 0 2.8 1.4 3.8 3.2 1-1.8 2.2-3.2 3.8-3.2 1.5 0 2.5 1.2 2.5 2.5s-1 2.5-2.5 2.5c-1.6 0-2.8-1.4-3.8-3.2-1 1.8-2.2 3.2-3.8 3.2z"
            stroke="#FFFFFF"
            strokeWidth="1.8"
            fill="none"
          />
        </svg>
      )

    case "apple":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
          <rect width="24" height="24" rx="4" fill="#000000" />
          <path
            d="M15.5 12.8c0-1.8 1.5-2.7 1.6-2.8-.8-1.2-2.1-1.4-2.6-1.4-1.1-.1-2.2.7-2.7.7-.6 0-1.5-.7-2.4-.7-1.2 0-2.4.7-3 1.8-1.3 2.2-.3 5.5.9 7.3.6.9 1.3 1.9 2.3 1.8.9 0 1.3-.6 2.4-.6 1.1 0 1.4.6 2.4.6 1 0 1.7-.9 2.3-1.8.7-1 1-2 1-2.1-.1 0-1.9-.7-1.9-2.9zM14.2 7.3c.5-.6.8-1.4.7-2.3-.7 0-1.6.5-2.1 1.1-.4.5-.8 1.4-.7 2.2.8.1 1.6-.4 2.1-1z"
            fill="#FFFFFF"
          />
        </svg>
      )

    case "adobe":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
          <rect width="24" height="24" rx="4" fill="#FF0000" />
          <path d="M4 4h5.5l-4 16H4V4zm10.5 0H20v16h-1.5l-4-16zm-5.2 7.5L12 6.5l2.7 5h-5.4z" fill="#FFFFFF" />
        </svg>
      )

    case "tcs":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
          <rect width="24" height="24" rx="4" fill="#0B132B" />
          <text x="12" y="15.5" textAnchor="middle" fill="#E2231A" fontSize="8" fontFamily="sans-serif" fontWeight="900" letterSpacing="0.5">
            TCS
          </text>
        </svg>
      )

    case "infosys":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
          <rect width="24" height="24" rx="4" fill="#007CC3" />
          <text x="12" y="15.5" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontFamily="sans-serif" fontWeight="bold">
            infy
          </text>
        </svg>
      )

    case "razorpay":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
          <rect width="24" height="24" rx="4" fill="#0C2340" />
          <path d="M13.5 4L8 14h5l-2.5 6L17 11h-4.5l1-7z" fill="#0070F3" />
        </svg>
      )

    case "zerodha":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
          <rect width="24" height="24" rx="4" fill="#387ED1" />
          <path d="M7 7h10L7 17h10" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )

    case "netflix":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
          <rect width="24" height="24" rx="4" fill="#000000" />
          <path d="M7 4h2.5v16H7V4zm7.5 0H17v16h-2.5V4z" fill="#B81D24" />
          <path d="M7 4h2.5l5 16H12L7 4z" fill="#E50914" />
        </svg>
      )

    case "uber":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
          <rect width="24" height="24" rx="4" fill="#000000" />
          <circle cx="12" cy="12" r="6" stroke="#FFFFFF" strokeWidth="1.5" />
          <rect x="9.5" y="9.5" width="5" height="5" fill="#FFFFFF" />
        </svg>
      )

    case "ibm":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
          <rect width="24" height="24" rx="4" fill="#052FAD" />
          <path
            d="M5 8h14M5 10h14M5 12h14M5 14h14M5 16h14"
            stroke="#FFFFFF"
            strokeWidth="1.2"
          />
        </svg>
      )

    // ─────────────────────────────────────────────────────────────
    // UNIVERSITIES & ORGANIZATIONS
    // ─────────────────────────────────────────────────────────────
    case "harvard":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
          <rect width="24" height="24" rx="4" fill="#A51C30" />
          <path
            d="M6 6h12v7c0 4-6 6-6 6s-6-2-6-6V6z"
            fill="#FFFFFF"
            opacity="0.2"
          />
          <text x="12" y="15" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontFamily="serif" fontWeight="bold">
            H
          </text>
        </svg>
      )

    case "mit":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
          <rect width="24" height="24" rx="4" fill="#A31F34" />
          <path d="M6 7v10h2V7H6zm4 0v10h2V7h-2zm4 4v6h2v-6h-2zm4-4v10h2V7h-2z" fill="#FFFFFF" />
        </svg>
      )

    case "stanford":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
          <rect width="24" height="24" rx="4" fill="#8C1515" />
          <path d="M12 5l-4 7h2.5l-2.5 5h8l-2.5-5H16L12 5z" fill="#007C41" />
          <rect x="11" y="17" width="2" height="2.5" fill="#990000" />
        </svg>
      )

    case "iit":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
          <rect width="24" height="24" rx="4" fill="#004F98" />
          <circle cx="12" cy="12" r="6" stroke="#FFFFFF" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="2" fill="#FFFFFF" />
          <text x="12" y="15.5" textAnchor="middle" fill="#FFFFFF" fontSize="7" fontFamily="sans-serif" fontWeight="bold">
            IIT
          </text>
        </svg>
      )

    case "asci":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
          <rect width="24" height="24" rx="4" fill="#FF5B00" />
          <path
            d="M12 5L6 19h3.5l1.2-3h4.6l1.2 3H20L14 5h-2zm-.3 8l1.3-3.5 1.3 3.5h-2.6z"
            fill="#FFFFFF"
          />
        </svg>
      )

    default: {
      // Deterministic initials fallback with clean styled badge
      const cleanLabel = normalized.replace(/[^a-z0-9]/g, "").toUpperCase()
      const initials = (cleanLabel.slice(0, 2) || "AS").toUpperCase()
      
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...props}>
          <rect width="24" height="24" rx="4" fill="#F1F5F9" stroke="#E2E8F0" />
          <text
            x="12"
            y="15.5"
            textAnchor="middle"
            fontSize="8.5"
            fontFamily="monospace"
            fontWeight="bold"
            fill="#0F172A"
          >
            {initials}
          </text>
        </svg>
      )
    }
  }
}
