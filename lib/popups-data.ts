import { SitePopup } from "./popups-types"

export const POSTER_PRESETS = [
  {
    label: "Live Zoom Masterclass Poster",
    url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop",
    badge: "LIVE ZOOM EVENT",
    title: "Weekend Live Zoom Masterclass: Distributed Systems",
    desc: "Join ex-Stripe Architect Arjun Mehta for an intensive live session on WebSockets, Redis, and high-concurrency architecture. Free for enrolled members.",
    cta: "Reserve Live Seat",
    link: "/live-classes",
    accentColor: "#2563eb", // Vibrant Tech Blue
  },
  {
    label: "50% Early Bird Fellowship Ad",
    url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
    badge: "SPECIAL PROMOTION",
    title: "50% Early Bird Scholarship: 2026 Engineering Fellowship",
    desc: "Fast-track your career with 1-on-1 industry mentorship, 474 curated DSA challenges, and verified production portfolio capstones.",
    cta: "Claim Scholarship",
    link: "/pricing",
    accentColor: "#d97706", // Radiant Gold/Amber
  },
  {
    label: "DSA Coding Sprint Poster",
    url: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=1200&auto=format&fit=crop",
    badge: "ALGORITHMIC ARENA",
    title: "National Algorithmic Sprint & Placement Tournament",
    desc: "Compete with top engineers across the country. Cash prizes, direct interview shortlists with top tech unicorns, and ICPC mentor feedback.",
    cta: "Join Code Sprint",
    link: "/dsa",
    accentColor: "#7c3aed", // Electric Violet
  },
  {
    label: "Full-Stack React 19 Bootcamp Ad",
    url: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1200&auto=format&fit=crop",
    badge: "NEW CURRICULUM",
    title: "React 19 & Next.js Distributed Architecture Bootcamp",
    desc: "Master Server Components, optimistic mutations, edge middleware, and enterprise full-stack deployment patterns.",
    cta: "View Curriculum",
    link: "/programs",
    accentColor: "#0891b2", // Vibrant Cyan
  },
  {
    label: "Career & Placement Masterclass",
    url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop",
    badge: "CAREER MASTERCLASS",
    title: "Crack Tier-1 Product Companies: Resume & System Design Prep",
    desc: "Learn the exact blueprint to bypass ATS screens, ace low-level object-oriented design, and negotiate top-tier compensation offers.",
    cta: "Register Free",
    link: "/degrees",
    accentColor: "#db2777", // Sunset Rose
  },
]

export const SEED_POPUP: SitePopup = {
  id: "popup-zoom-masterclass-2026",
  title: "Live Zoom Masterclass: Distributed Systems & Redis",
  content: "Join Principal Architect Arjun Mehta for an interactive Zoom workshop on high-throughput streaming and fault-tolerant microservices. Live coding, architecture breakdowns, and direct Q&A.",
  type: "promo",
  is_active: true,
  is_popup: true,
  image_url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop",
  badge_text: "EXCLUSIVE LIVE ZOOM EVENT",
  cta_text: "Join Live Class Now",
  cta_url: "/live-classes",
  secondary_cta_text: "View All Sessions",
  secondary_cta_url: "/live-classes",
  target_audience: "all",
  display_placement: "all",
  frequency: "once_per_session",
  priority: 100,
  accent_color: "#2563eb",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}

/**
 * Normalizes user-pasted image URLs (Google Drive, Dropbox, GitHub, accidental double-pastes)
 * into direct image streams that render in <img> tags and allow canvas color sampling.
 */
export function normalizeImageUrl(rawUrl: string): string {
  if (!rawUrl || typeof rawUrl !== "string") return ""
  let url = rawUrl.trim()

  // 1. Fix accidental duplicate pasted URLs (e.g. "https://...https://...")
  if (url.includes("http://") || url.includes("https://")) {
    const matches = url.match(/https?:\/\/[^\s"']+/g)
    if (matches && matches.length > 0) {
      url = matches[0]
      const secondHttpIdx = url.indexOf("http", 8)
      if (secondHttpIdx !== -1) {
        url = url.substring(0, secondHttpIdx)
      }
    }
  }

  // 2. Google Drive Links: Extract File ID and convert to direct CDN image stream
  // Handles:
  // - drive.google.com/file/d/FILE_ID/view...
  // - drive.google.com/open?id=FILE_ID
  // - drive.google.com/uc?id=FILE_ID
  // - docs.google.com/uc?id=FILE_ID
  if (url.includes("drive.google.com") || url.includes("docs.google.com") || url.includes("googleusercontent.com")) {
    const fileIdMatch =
      url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) ||
      url.match(/[?&]id=([a-zA-Z0-9_-]+)/) ||
      url.match(/\/d\/([a-zA-Z0-9_-]+)/)

    if (fileIdMatch && fileIdMatch[1]) {
      const fileId = fileIdMatch[1]
      return `https://lh3.googleusercontent.com/d/${fileId}`
    }
  }

  // 3. Dropbox: Convert dl=0 to raw=1 for direct image streaming
  if (url.includes("dropbox.com")) {
    if (url.includes("dl=0")) {
      return url.replace("dl=0", "raw=1")
    }
    if (!url.includes("raw=1")) {
      return url.includes("?") ? `${url}&raw=1` : `${url}?raw=1`
    }
  }

  // 4. GitHub: Convert blob view URL to raw user content
  if (url.includes("github.com") && url.includes("/blob/")) {
    return url.replace("github.com", "raw.githubusercontent.com").replace("/blob/", "/")
  }

  return url
}
