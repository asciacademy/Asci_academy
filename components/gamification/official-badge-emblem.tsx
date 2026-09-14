"use client"

import React from "react"
import { BadgeCategory, BadgeTier } from "@/lib/gamification"

interface OfficialBadgeEmblemProps {
  badgeId: string
  title: string
  category: BadgeCategory
  tier: BadgeTier
  isUnlocked: boolean
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
}

const SIZE_MAP = {
  sm: { width: 68, height: 76, viewBox: "0 0 100 112" },
  md: { width: 104, height: 116, viewBox: "0 0 100 112" },
  lg: { width: 144, height: 160, viewBox: "0 0 100 112" },
  xl: { width: 210, height: 235, viewBox: "0 0 100 112" },
}

export function OfficialBadgeEmblem({
  badgeId,
  title,
  category,
  tier,
  isUnlocked,
  size = "md",
  className = "",
}: OfficialBadgeEmblemProps) {
  const { width, height, viewBox } = SIZE_MAP[size] || SIZE_MAP.md
  const uniqueId = `badge_${badgeId}_${tier}_${size}`

  // Color & Gradient Palette by Tier
  const tierConfig = {
    bronze: {
      rimOuter: ["#92400e", "#d97706", "#78350f", "#b45309"],
      rimInner: ["#f59e0b", "#78350f", "#b45309"],
      enamelCore: ["#451a03", "#1c1917", "#0c0a09"],
      accent: "#f59e0b",
      glow: "rgba(217, 119, 6, 0.4)",
      stars: 1,
      bannerText: "BRONZE",
      bannerBg: "#78350f",
      bannerTextCol: "#fed7aa",
    },
    silver: {
      rimOuter: ["#64748b", "#cbd5e1", "#475569", "#94a3b8"],
      rimInner: ["#e2e8f0", "#475569", "#cbd5e1"],
      enamelCore: ["#0f172a", "#090d16", "#020617"],
      accent: "#38bdf8",
      glow: "rgba(148, 163, 184, 0.4)",
      stars: 2,
      bannerText: "SILVER",
      bannerBg: "#334155",
      bannerTextCol: "#f1f5f9",
    },
    gold: {
      rimOuter: ["#a16207", "#fef08a", "#854d0e", "#eab308"],
      rimInner: ["#fde047", "#854d0e", "#d4af37"],
      enamelCore: ["#2d1b06", "#140e05", "#0a0703"],
      accent: "#fde047",
      glow: "rgba(234, 179, 8, 0.5)",
      stars: 3,
      bannerText: "GOLD",
      bannerBg: "#854d0e",
      bannerTextCol: "#fef08a",
    },
    emerald: {
      rimOuter: ["#047857", "#6ee7b7", "#064e3b", "#D4B872"],
      rimInner: ["#34d399", "#064e3b", "#10b981"],
      enamelCore: ["#064e3b", "#022c22", "#062112"],
      accent: "#D4B872",
      glow: "rgba(16, 185, 129, 0.55)",
      stars: 4,
      bannerText: "EMERALD",
      bannerBg: "#064e3b",
      bannerTextCol: "#D4B872",
    },
  }[tier]

  // Locked Gunmetal / Obsidian theme
  const lockedConfig = {
    rimOuter: ["#3f3f46", "#52525b", "#27272a", "#18181b"],
    rimInner: ["#3f3f46", "#18181b", "#27272a"],
    enamelCore: ["#18181b", "#09090b", "#050506"],
    accent: "#71717a",
    glow: "rgba(0, 0, 0, 0)",
    stars: 0,
    bannerText: "LOCKED",
    bannerBg: "#27272a",
    bannerTextCol: "#a1a1aa",
  }

  const palette = isUnlocked ? tierConfig : lockedConfig

  // Render Category Specific Inner Vector Art
  const renderEmblemArtwork = () => {
    if (!isUnlocked) {
      // Locked Padlock Emblem with laser engraved grid
      return (
        <g opacity="0.6">
          {/* Laser-etched blueprint circle */}
          <circle cx="50" cy="52" r="22" fill="none" stroke="#3f3f46" strokeWidth="0.75" strokeDasharray="2 2" />
          <path d="M50 34 L50 70 M32 52 L68 52" stroke="#27272a" strokeWidth="0.5" />
          {/* Padlock Shackle */}
          <path
            d="M44 48 V42 C44 38.7 46.7 36 50 36 C53.3 36 56 38.7 56 42 V48"
            fill="none"
            stroke="#71717a"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          {/* Padlock Body */}
          <rect x="40" y="48" width="20" height="16" rx="3.5" fill="#27272a" stroke="#52525b" strokeWidth="1.2" />
          {/* Keyhole */}
          <circle cx="50" cy="54" r="2" fill="#71717a" />
          <path d="M49 55 L48 60 H52 L51 55 Z" fill="#71717a" />
        </g>
      )
    }

    switch (badgeId) {
      // ==========================================
      // CURRICULUM BADGES
      // ==========================================
      case "first_byte":
        return (
          <g>
            {/* Concentric data waves */}
            <circle cx="50" cy="50" r="22" fill="none" stroke={palette.accent} strokeWidth="0.8" opacity="0.25" strokeDasharray="3 3" />
            <circle cx="50" cy="50" r="16" fill="none" stroke={palette.accent} strokeWidth="1.2" opacity="0.4" />
            {/* Central Neon 01 with bit nodes */}
            <text x="50" y="55" fontSize="13" fontWeight="900" fontFamily="monospace" fill={palette.accent} textAnchor="middle" letterSpacing="0.5">
              01
            </text>
            <circle cx="34" cy="50" r="2" fill={palette.accent} />
            <circle cx="66" cy="50" r="2" fill={palette.accent} />
            <circle cx="50" cy="34" r="2" fill={palette.accent} />
            <circle cx="50" cy="66" r="2" fill={palette.accent} />
          </g>
        )

      case "curriculum_initiate":
        return (
          <g>
            {/* Open Grimoire Book with ascending star beam */}
            <path
              d="M50 42 L34 38 C31 37 31 58 34 60 L50 64 L66 60 C69 58 69 37 66 38 Z"
              fill={palette.accent}
              opacity="0.2"
            />
            {/* Book Spine & Pages */}
            <path
              d="M50 42 V64 M50 42 C44 38 34 38 33 40 V59 C34 58 44 58 50 62 C56 58 66 58 67 59 V40 C66 38 56 38 50 42 Z"
              fill="none"
              stroke={palette.accent}
              strokeWidth="2"
              strokeLinejoin="round"
            />
            {/* Bookmark Ribbon */}
            <path d="M50 43 V56 L47 53 L44 56 V43" fill={palette.accent} opacity="0.8" />
            {/* Magic Star */}
            <polygon points="50,30 52,35 57,36 53,39 54,44 50,41 46,44 47,39 43,36 48,35" fill={palette.accent} />
          </g>
        )

      case "knowledge_seeker":
        return (
          <g>
            {/* Triple Stacked Isometric Prism Plates */}
            <g transform="translate(50, 48) scale(0.9)">
              {/* Bottom Plate */}
              <polygon points="0,18 20,8 0,-2 -20,8" fill={palette.accent} opacity="0.4" stroke={palette.accent} strokeWidth="1" />
              {/* Middle Plate */}
              <polygon points="0,8 20,-2 0,-12 -20,-2" fill={palette.accent} opacity="0.7" stroke={palette.accent} strokeWidth="1" />
              {/* Top Plate */}
              <polygon points="0,-2 20,-12 0,-22 -20,-12" fill={palette.accent} stroke="#ffffff" strokeWidth="1.2" />
            </g>
            {/* Upward Energy Pillars */}
            <line x1="32" y1="46" x2="32" y2="40" stroke={palette.accent} strokeWidth="1.5" strokeLinecap="round" />
            <line x1="68" y1="46" x2="68" y2="40" stroke={palette.accent} strokeWidth="1.5" strokeLinecap="round" />
          </g>
        )

      case "code_architect":
        return (
          <g>
            {/* CPU Silicon Die Wafer */}
            <rect x="36" y="36" width="28" height="28" rx="4" fill={palette.accent} opacity="0.2" stroke={palette.accent} strokeWidth="2" />
            {/* Inner Core */}
            <rect x="42" y="42" width="16" height="16" rx="2" fill={palette.accent} opacity="0.9" />
            {/* Dual In-Line Bus Pins */}
            <g stroke={palette.accent} strokeWidth="2" strokeLinecap="round">
              <line x1="41" y1="31" x2="41" y2="35" />
              <line x1="50" y1="31" x2="50" y2="35" />
              <line x1="59" y1="31" x2="59" y2="35" />

              <line x1="41" y1="65" x2="41" y2="69" />
              <line x1="50" y1="65" x2="50" y2="69" />
              <line x1="59" y1="65" x2="59" y2="69" />

              <line x1="31" y1="41" x2="35" y2="41" />
              <line x1="31" y1="50" x2="35" y2="50" />
              <line x1="31" y1="59" x2="35" y2="59" />

              <line x1="65" y1="41" x2="69" y2="41" />
              <line x1="65" y1="50" x2="69" y2="50" />
              <line x1="65" y1="59" x2="69" y2="59" />
            </g>
          </g>
        )

      case "track_graduate":
        return (
          <g>
            {/* Twin Laurel Branches */}
            <path
              d="M30 60 C26 50 30 38 38 34 M62 34 C70 38 74 50 70 60"
              fill="none"
              stroke={palette.accent}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            {/* Laurel Leaves */}
            <circle cx="30" cy="46" r="2" fill={palette.accent} />
            <circle cx="34" cy="38" r="2" fill={palette.accent} />
            <circle cx="70" cy="46" r="2" fill={palette.accent} />
            <circle cx="66" cy="38" r="2" fill={palette.accent} />
            {/* Mortarboard Cap */}
            <polygon points="50,38 70,45 50,52 30,45" fill={palette.accent} stroke="#ffffff" strokeWidth="1" />
            <path d="M37 48 V56 C37 60 63 60 63 56 V48" fill="none" stroke={palette.accent} strokeWidth="2" />
            {/* Golden Tassel */}
            <path d="M62 48 L65 57" stroke={palette.accent} strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="65.5" cy="58" r="1.5" fill={palette.accent} />
          </g>
        )

      case "polymath":
        return (
          <g>
            {/* Armillary Compass Sphere with 3 Stellar Orbits */}
            <circle cx="50" cy="49" r="18" fill="none" stroke={palette.accent} strokeWidth="1.5" />
            <ellipse cx="50" cy="49" rx="18" ry="7" fill="none" stroke={palette.accent} strokeWidth="1.2" transform="rotate(-30 50 49)" />
            <ellipse cx="50" cy="49" rx="18" ry="7" fill="none" stroke={palette.accent} strokeWidth="1.2" transform="rotate(30 50 49)" />
            {/* Central Sun/Atom */}
            <circle cx="50" cy="49" r="4.5" fill={palette.accent} />
            <circle cx="50" cy="49" r="7" fill="none" stroke="#ffffff" strokeWidth="0.8" opacity="0.7" />
          </g>
        )

      // ==========================================
      // MASTERY BADGES
      // ==========================================
      case "algorithm_solver":
        return (
          <g>
            {/* Terminal Window Box */}
            <rect x="30" y="34" width="40" height="30" rx="4" fill={palette.accent} opacity="0.15" stroke={palette.accent} strokeWidth="1.5" />
            <line x1="30" y1="41" x2="70" y2="41" stroke={palette.accent} strokeWidth="1" opacity="0.5" />
            {/* Mini Window Dots */}
            <circle cx="34" cy="37.5" r="1" fill={palette.accent} />
            <circle cx="38" cy="37.5" r="1" fill={palette.accent} />
            {/* Chevron Prompt and Cursor */}
            <path d="M37 47 L44 52 L37 57" fill="none" stroke={palette.accent} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="47" y1="57" x2="57" y2="57" stroke={palette.accent} strokeWidth="2.2" strokeLinecap="round" />
          </g>
        )

      case "binary_samurai":
        return (
          <g>
            {/* Crossed Sword Code Brackets </> */}
            <g stroke={palette.accent} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M42 36 L30 49 L42 62" />
              <path d="M58 36 L70 49 L58 62" />
              <line x1="55" y1="34" x2="45" y2="64" stroke="#ffffff" strokeWidth="2" />
            </g>
            {/* Center spark */}
            <polygon points="50,45 52,48 55,49 52,50 50,53 48,50 45,49 48,48" fill={palette.accent} />
          </g>
        )

      case "runtime_optimizer":
        return (
          <g>
            {/* Gauge Dial Circle */}
            <circle cx="50" cy="50" r="18" fill="none" stroke={palette.accent} strokeWidth="1.2" strokeDasharray="3 3" opacity="0.5" />
            {/* Speed Lightning Bolt */}
            <polygon
              points="53,28 35,49 48,49 44,70 65,46 51,46"
              fill={palette.accent}
              stroke="#ffffff"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </g>
        )

      case "concurrency_master":
        return (
          <g>
            {/* Multi-thread distributed cluster network */}
            <circle cx="50" cy="50" r="7" fill={palette.accent} opacity="0.9" />
            <circle cx="34" cy="40" r="4.5" fill={palette.accent} opacity="0.75" />
            <circle cx="66" cy="40" r="4.5" fill={palette.accent} opacity="0.75" />
            <circle cx="36" cy="62" r="4.5" fill={palette.accent} opacity="0.75" />
            <circle cx="64" cy="62" r="4.5" fill={palette.accent} opacity="0.75" />
            {/* Circuit connection bus */}
            <g stroke={palette.accent} strokeWidth="1.5" opacity="0.6">
              <line x1="50" y1="50" x2="34" y2="40" />
              <line x1="50" y1="50" x2="66" y2="40" />
              <line x1="50" y1="50" x2="36" y2="62" />
              <line x1="50" y1="50" x2="64" y2="62" />
              <line x1="34" y1="40" x2="66" y2="40" strokeDasharray="2 2" />
              <line x1="36" y1="62" x2="64" y2="62" strokeDasharray="2 2" />
            </g>
          </g>
        )

      // ==========================================
      // STREAK BADGES
      // ==========================================
      case "streak_spark":
        return (
          <g>
            {/* Blazing 4-Point Star Spark with Ignition Pulse */}
            <circle cx="50" cy="50" r="18" fill="none" stroke={palette.accent} strokeWidth="1" opacity="0.3" strokeDasharray="2 3" />
            <circle cx="50" cy="50" r="12" fill={palette.accent} opacity="0.2" />
            {/* Spark Blades */}
            <path
              d="M50 28 Q50 44 34 50 Q50 56 50 72 Q50 56 66 50 Q50 44 50 28 Z"
              fill={palette.accent}
              stroke="#ffffff"
              strokeWidth="0.8"
            />
            {/* Central Pure White Heat Spark */}
            <circle cx="50" cy="50" r="3.5" fill="#ffffff" />
            <polygon points="50,42 52,47 57,48 53,51 54,56 50,53 46,56 47,51 43,48 48,47" fill="#ffffff" opacity="0.9" />
          </g>
        )

      case "streak_habit":
        return (
          <g>
            {/* 3-Day Triple Flame Core */}
            <path
              d="M50 30 C53 38 60 42 60 52 C60 62 52 66 50 66 C48 66 40 62 40 52 C40 42 47 38 50 30 Z"
              fill={palette.accent}
              opacity="0.95"
            />
            {/* Inner Heat Flame */}
            <path
              d="M50 42 C51.5 46 54 48 54 53 C54 57 52 60 50 60 C48 60 46 57 46 53 C46 48 48.5 46 50 42 Z"
              fill="#ffffff"
            />
            {/* Left and Right Small Flames */}
            <path d="M36 50 C37 54 40 56 40 60 C40 64 36 65 35 65 C34 65 30 64 30 60 C30 56 34 54 36 50 Z" fill={palette.accent} opacity="0.75" />
            <path d="M64 50 C65 54 68 56 68 60 C68 64 64 65 63 65 C62 65 58 64 58 60 C58 56 62 54 64 50 Z" fill={palette.accent} opacity="0.75" />
          </g>
        )

      case "week_on_fire":
        return (
          <g>
            {/* 7-Tongue Solar Sunburst Corona */}
            <g stroke={palette.accent} strokeWidth="2" strokeLinecap="round">
              <line x1="50" y1="28" x2="50" y2="33" />
              <line x1="66" y1="35" x2="62" y2="39" />
              <line x1="72" y1="51" x2="67" y2="51" />
              <line x1="64" y1="66" x2="60" y2="62" />
              <line x1="36" y1="66" x2="40" y2="62" />
              <line x1="28" y1="51" x2="33" y2="51" />
              <line x1="34" y1="35" x2="38" y2="39" />
            </g>
            {/* Majestic Fierce Flame */}
            <path
              d="M50 32 C56 42 64 45 64 54 C64 63 56 67 50 67 C44 67 36 63 36 54 C36 45 44 42 50 32 Z"
              fill={palette.accent}
            />
            <path
              d="M50 43 C53 48 56 50 56 55 C56 60 53 62 50 62 C47 62 44 60 44 55 C44 50 47 48 50 43 Z"
              fill="#ffffff"
            />
          </g>
        )

      case "fortnight_titan":
        return (
          <g>
            {/* Invincible Spartan Kite Shield */}
            <path
              d="M50 28 L68 34 V52 C68 62 50 71 50 71 C50 71 32 62 32 52 V34 Z"
              fill={palette.accent}
              opacity="0.25"
              stroke={palette.accent}
              strokeWidth="2"
            />
            {/* Inner Reinforced Plate */}
            <path
              d="M50 34 L62 38 V50 C62 58 50 64 50 64 C50 64 38 58 38 50 V38 Z"
              fill={palette.accent}
              opacity="0.8"
            />
            {/* Center Boss / Star */}
            <polygon points="50,42 52,46 56,47 53,50 54,54 50,51 46,54 47,50 44,47 48,46" fill="#ffffff" />
          </g>
        )

      case "thirty_suns":
        return (
          <g>
            {/* 30-Suns Radiant Solar Disc with Corona Blades */}
            <g stroke={palette.accent} strokeWidth="1.5" strokeLinecap="round" opacity="0.85">
              <line x1="50" y1="26" x2="50" y2="31" />
              <line x1="67" y1="33" x2="63" y2="37" />
              <line x1="74" y1="50" x2="69" y2="50" />
              <line x1="67" y1="67" x2="63" y2="63" />
              <line x1="50" y1="74" x2="50" y2="69" />
              <line x1="33" y1="67" x2="37" y2="63" />
              <line x1="26" y1="50" x2="31" y2="50" />
              <line x1="33" y1="33" x2="37" y2="37" />
            </g>
            {/* Golden Sun Core */}
            <circle cx="50" cy="50" r="14" fill={palette.accent} opacity="0.9" stroke="#ffffff" strokeWidth="1.2" />
            <circle cx="50" cy="50" r="10" fill="none" stroke="#ffffff" strokeWidth="0.75" opacity="0.6" strokeDasharray="2 2" />
            {/* Bold '30' Solar Numerals */}
            <text x="50" y="54" fontSize="11" fontWeight="900" fontFamily="sans-serif" fill="#000000" textAnchor="middle">
              30
            </text>
          </g>
        )

      case "century_legend":
        return (
          <g>
            {/* Legendary Winged Trophy */}
            <path
              d="M38 32 H62 V47 C62 54 56 58 50 58 C44 58 38 54 38 47 Z"
              fill={palette.accent}
              stroke="#ffffff"
              strokeWidth="1.2"
            />
            {/* Trophy Handles */}
            <path
              d="M38 35 C31 35 31 46 38 48 M62 35 C69 35 69 46 62 48"
              fill="none"
              stroke={palette.accent}
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Trophy Pedestal */}
            <path d="M47 58 H53 V63 H47 Z M41 63 H59 V67 H41 Z" fill={palette.accent} />
            {/* 30-Day Number Emblem */}
            <text x="50" y="47" fontSize="10" fontWeight="900" fontFamily="serif" fill="#000000" textAnchor="middle">
              30
            </text>
          </g>
        )

      case "relentless_force":
        return (
          <g>
            {/* Twin Roaring Dragon / Phoenix Flames Wrapping Emerald Diamond */}
            <path
              d="M50 26 C40 36 34 46 34 56 C34 66 42 70 50 70 C58 70 66 66 66 56 C66 46 60 36 50 26 Z"
              fill={palette.accent}
              opacity="0.3"
            />
            {/* Left Rising Blade Flame */}
            <path
              d="M48 28 C42 36 37 46 37 54 C37 62 43 65 47 65 C45 58 45 50 49 42 C51 37 50 32 48 28 Z"
              fill={palette.accent}
              opacity="0.9"
            />
            {/* Right Rising Blade Flame */}
            <path
              d="M52 28 C58 36 63 46 63 54 C63 62 57 65 53 65 C55 58 55 50 51 42 C49 37 50 32 52 28 Z"
              fill={palette.accent}
              opacity="0.9"
            />
            {/* Central Relentless Core Diamond */}
            <polygon points="50,40 57,50 50,60 43,50" fill="#ffffff" stroke={palette.accent} strokeWidth="1.5" />
            <circle cx="50" cy="50" r="2" fill="#064e3b" />
          </g>
        )

      case "centurion_immortal":
        return (
          <g>
            {/* Ascendant Immortal Phoenix with 100 Core Crest */}
            <path
              d="M50 34 C44 26 30 28 26 38 C32 42 36 50 42 54 C36 54 30 52 26 56 C34 60 42 61 47 58 C45 64 42 68 50 72 C58 68 55 64 53 58 C58 61 66 60 74 56 C70 52 64 54 58 54 C64 50 68 42 74 38 C70 28 56 26 50 34 Z"
              fill={palette.accent}
              opacity="0.95"
              stroke="#ffffff"
              strokeWidth="0.8"
            />
            {/* Laurel Wreath base */}
            <path
              d="M34 60 C38 66 62 66 66 60"
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            {/* Central Medallion Shield with '100' */}
            <circle cx="50" cy="46" r="9" fill="#064e3b" stroke="#ffffff" strokeWidth="1.2" />
            <text x="50" y="50" fontSize="8" fontWeight="900" fontFamily="sans-serif" fill="#ffffff" textAnchor="middle" letterSpacing="0.2">
              100
            </text>
          </g>
        )

      // ==========================================
      // QUESTS BADGES
      // ==========================================
      case "daily_striver":
        return (
          <g>
            {/* Triad Checkmark Crest */}
            <g transform="translate(50, 48)">
              {/* Top Medal */}
              <circle cx="0" cy="-12" r="7" fill={palette.accent} opacity="0.9" />
              <path d="M-3 -12 L-1 -10 L3 -14" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" fill="none" />

              {/* Bottom Left Medal */}
              <circle cx="-11" cy="7" r="7" fill={palette.accent} opacity="0.9" />
              <path d="M-14 7 L-12 9 L-8 5" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" fill="none" />

              {/* Bottom Right Medal */}
              <circle cx="11" cy="7" r="7" fill={palette.accent} opacity="0.9" />
              <path d="M8 7 L10 9 L14 5" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            </g>
          </g>
        )

      case "grand_master_prime":
        return (
          <g>
            {/* Imperial Crown with Emerald Star */}
            <path
              d="M33 55 L31 40 L41 48 L50 32 L59 48 L69 40 L67 55 Z"
              fill={palette.accent}
              stroke="#ffffff"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            {/* Crown Base Rim */}
            <rect x="33" y="55" width="34" height="6" rx="1.5" fill="#ffffff" opacity="0.95" />
            {/* Crown Jewels */}
            <circle cx="31" cy="38" r="2.5" fill="#ffffff" />
            <circle cx="50" cy="30" r="3" fill="#ffffff" />
            <circle cx="69" cy="38" r="2.5" fill="#ffffff" />
            {/* Prime Diamond Jewel */}
            <polygon points="50,45 54,50 50,55 46,50" fill="#047857" stroke="#ffffff" strokeWidth="0.8" />
          </g>
        )

      default:
        return (
          <g>
            <circle cx="50" cy="50" r="16" fill={palette.accent} opacity="0.8" />
            <polygon points="50,40 53,46 60,47 55,52 56,58 50,55 44,58 45,52 40,47 47,46" fill="#ffffff" />
          </g>
        )
    }
  }

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <svg
        width={width}
        height={height}
        viewBox={viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:scale-105"
      >
        <defs>
          {/* Radial Core Gradient */}
          <radialGradient id={`${uniqueId}_core`} cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor={palette.enamelCore[0]} />
            <stop offset="70%" stopColor={palette.enamelCore[1]} />
            <stop offset="100%" stopColor={palette.enamelCore[2]} />
          </radialGradient>

          {/* Outer Bevel Linear Gradient */}
          <linearGradient id={`${uniqueId}_bevel`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={palette.rimOuter[1]} />
            <stop offset="35%" stopColor={palette.rimOuter[0]} />
            <stop offset="70%" stopColor={palette.rimOuter[3] || palette.rimOuter[0]} />
            <stop offset="100%" stopColor={palette.rimOuter[2]} />
          </linearGradient>

          {/* Inner Rim Linear Gradient */}
          <linearGradient id={`${uniqueId}_rim`} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={palette.rimInner[1]} />
            <stop offset="50%" stopColor={palette.rimInner[0]} />
            <stop offset="100%" stopColor={palette.rimInner[2]} />
          </linearGradient>

          {/* Upper Glass Specular Curve */}
          <linearGradient id={`${uniqueId}_glass`} x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
            <stop offset="60%" stopColor="#ffffff" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          {/* Ambient Drop Shadow */}
          <filter id={`${uniqueId}_shadow`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.5" />
          </filter>
        </defs>

        {/* =========================================================
            OUTER BADGE GEOMETRY (Google Cloud / Credly Hexagonal Shield)
           ========================================================= */}
        {/* Outer Shadow Shell */}
        <path
          d="M50 4 L88 24 V66 L50 96 L12 66 V24 Z"
          fill="black"
          opacity="0.25"
          transform="translate(0, 3)"
        />

        {/* 1. Heavy Metallic Beveled Outer Rim */}
        <path
          d="M50 4 L88 24 V66 L50 96 L12 66 V24 Z"
          fill={`url(#${uniqueId}_bevel)`}
          stroke={palette.rimOuter[2]}
          strokeWidth="1.2"
        />

        {/* 2. Inner Recessed Rim */}
        <path
          d="M50 8 L84 26.5 V64 L50 91 L16 64 V26.5 Z"
          fill={`url(#${uniqueId}_rim)`}
          stroke="#000000"
          strokeWidth="0.8"
          opacity="0.9"
        />

        {/* 3. Deep Jewel / Enamel Core Face */}
        <path
          d="M50 12 L80 29 V61.5 L50 86 L20 61.5 V29 Z"
          fill={`url(#${uniqueId}_core)`}
          stroke={isUnlocked ? palette.accent : "#3f3f46"}
          strokeWidth="0.8"
        />

        {/* 4. Delicate Concentric Engraving Rings */}
        <circle
          cx="50"
          cy="49"
          r="26"
          fill="none"
          stroke={palette.accent}
          strokeWidth="0.75"
          opacity={isUnlocked ? "0.35" : "0.15"}
          strokeDasharray="4 2"
        />
        <circle
          cx="50"
          cy="49"
          r="24"
          fill="none"
          stroke={palette.accent}
          strokeWidth="0.5"
          opacity={isUnlocked ? "0.2" : "0.1"}
        />

        {/* 5. Center Bespoke Artwork */}
        {renderEmblemArtwork()}

        {/* 6. High-Luster Specular Glass Curved Reflection */}
        <path
          d="M50 12 L80 29 V45 C65 42 35 42 20 45 V29 Z"
          fill={`url(#${uniqueId}_glass)`}
          pointerEvents="none"
        />

        {/* 7. Bottom Stamped Official Ribbon Tab */}
        <g transform="translate(0, 8)">
          {/* Ribbon Base */}
          <path
            d="M30 84 L50 88 L70 84 L74 94 L50 98 L26 94 Z"
            fill={palette.bannerBg}
            stroke={`url(#${uniqueId}_bevel)`}
            strokeWidth="1"
          />
          {/* Ribbon Label */}
          <text
            x="50"
            y="93"
            fontSize="5.5"
            fontWeight="900"
            fontFamily="monospace"
            letterSpacing="1.2"
            fill={palette.bannerTextCol}
            textAnchor="middle"
          >
            {palette.bannerText}
          </text>
        </g>

        {/* 8. Official Star Pips on Top Bevel */}
        {palette.stars > 0 && (
          <g transform="translate(0, 0)">
            {palette.stars === 1 && (
              <polygon points="50,14 51.5,17.5 55,18 52.5,20.5 53,24 50,22 47,24 47.5,20.5 45,18 48.5,17.5" fill={palette.accent} />
            )}
            {palette.stars === 2 && (
              <>
                <polygon points="45,14 46,16.5 48.5,17 46.5,19 47,21.5 45,20 43,21.5 43.5,19 41.5,17 44,16.5" fill={palette.accent} />
                <polygon points="55,14 56,16.5 58.5,17 56.5,19 57,21.5 55,20 53,21.5 53.5,19 51.5,17 54,16.5" fill={palette.accent} />
              </>
            )}
            {palette.stars === 3 && (
              <>
                <polygon points="40,15 41,17.5 43.5,18 41.5,20 42,22.5 40,21 38,22.5 38.5,20 36.5,18 39,17.5" fill={palette.accent} />
                <polygon points="50,13 51.5,16 54.5,16.5 52.5,18.8 53,22 50,20.2 47,22 47.5,18.8 45.5,16.5 48.5,16" fill={palette.accent} />
                <polygon points="60,15 61,17.5 63.5,18 61.5,20 62,22.5 60,21 58,22.5 58.5,20 56.5,18 59,17.5" fill={palette.accent} />
              </>
            )}
            {palette.stars === 4 && (
              <>
                <polygon points="36,16 37,18.5 39.5,19 37.5,21 38,23.5 36,22 34,23.5 34.5,21 32.5,19 35,18.5" fill={palette.accent} />
                <polygon points="45,14 46,16.5 48.5,17 46.5,19 47,21.5 45,20 43,21.5 43.5,19 41.5,17 44,16.5" fill={palette.accent} />
                <polygon points="55,14 56,16.5 58.5,17 56.5,19 57,21.5 55,20 53,21.5 53.5,19 51.5,17 54,16.5" fill={palette.accent} />
                <polygon points="64,16 65,18.5 67.5,19 65.5,21 66,23.5 64,22 62,23.5 62.5,21 60.5,19 63,18.5" fill={palette.accent} />
              </>
            )}
          </g>
        )}
      </svg>
    </div>
  )
}
