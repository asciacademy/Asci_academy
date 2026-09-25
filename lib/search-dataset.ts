import { CURRICULUM_COURSES } from "@/lib/curriculum-data"
import { GUIDED_PROJECTS } from "@/lib/projects-data"

export type SearchCategory =
  | "all"
  | "courses"
  | "lessons"
  | "skills"
  | "projects"
  | "challenges"
  | "competitions"
  | "jobs"
  | "internships"
  | "users"

export type EntityType =
  | "Course"
  | "Lesson"
  | "Skill"
  | "Project"
  | "Challenge"
  | "Competition"
  | "Job"
  | "Internship"
  | "User"

export interface SearchResultItem {
  id: string
  title: string
  subtitle: string
  type: EntityType
  category: Exclude<SearchCategory, "all">
  href: string
  iconType: "brand" | "company" | "avatar" | "lucide"
  iconValue: string
  metaBadge?: string
  keywords: string[]
  popularity: number
  dateAdded: string
}

// 1. Curated Courses
export const SEARCH_COURSES: SearchResultItem[] = [
  {
    id: "course-python",
    title: "Python Programming",
    subtitle: "Beginner to Advanced · 24 Lessons · 18h Duration",
    type: "Course",
    category: "courses",
    href: "/courses/python",
    iconType: "brand",
    iconValue: "python",
    metaBadge: "Python",
    keywords: ["python", "python programming", "django", "fastapi", "numpy", "pandas", "oop"],
    popularity: 98,
    dateAdded: "2026-01-10",
  },
  {
    id: "course-dsa",
    title: "Data Structures & Algorithms",
    subtitle: "Striver A2Z Sheet · 474 Problems · Visualizer Engine",
    type: "Course",
    category: "courses",
    href: "/courses/dsa",
    iconType: "brand",
    iconValue: "algorithm",
    metaBadge: "DSA",
    keywords: ["dsa", "algorithms", "data structures", "leetcode", "trees", "graphs", "dp"],
    popularity: 99,
    dateAdded: "2026-01-05",
  },
  {
    id: "course-react",
    title: "Modern React 19 & Next.js",
    subtitle: "Frontend Systems · Server Components & Tailwind v4",
    type: "Course",
    category: "courses",
    href: "/courses/react",
    iconType: "brand",
    iconValue: "react",
    metaBadge: "Web Dev",
    keywords: ["react", "react 19", "nextjs", "frontend", "javascript", "typescript"],
    popularity: 95,
    dateAdded: "2026-01-15",
  },
  {
    id: "course-java",
    title: "Enterprise Java & Concurrency",
    subtitle: "JVM Internals · Spring Boot 3 · Microservices & JPA",
    type: "Course",
    category: "courses",
    href: "/courses/java",
    iconType: "brand",
    iconValue: "java",
    metaBadge: "Java",
    keywords: ["java", "spring boot", "jvm", "backend", "concurrency", "enterprise"],
    popularity: 91,
    dateAdded: "2026-01-20",
  },
  {
    id: "course-golang",
    title: "Go Systems & Distributed Services",
    subtitle: "Goroutines · Channels · gRPC & Raft Consensus",
    type: "Course",
    category: "courses",
    href: "/courses/golang",
    iconType: "brand",
    iconValue: "go",
    metaBadge: "Systems",
    keywords: ["go", "golang", "systems", "microservices", "concurrency", "distributed"],
    popularity: 88,
    dateAdded: "2026-02-01",
  },
]

// 2. Curated Lessons
export const SEARCH_LESSONS: SearchResultItem[] = [
  {
    id: "lesson-py-control-flow",
    title: "Python Control Flow & Functional Iterators",
    subtitle: "Python Programming · Lesson 1.3 · 50 XP",
    type: "Lesson",
    category: "lessons",
    href: "/courses/python/learn",
    iconType: "brand",
    iconValue: "python",
    metaBadge: "Lesson",
    keywords: ["python", "loops", "control flow", "iterators", "generators", "lesson"],
    popularity: 85,
    dateAdded: "2026-02-10",
  },
  {
    id: "lesson-dsa-sliding-window",
    title: "Monotonic Deques in Sliding Window Techniques",
    subtitle: "DSA Masterclass · Lesson 4.2 · Socratic CodeMirror",
    type: "Lesson",
    category: "lessons",
    href: "/courses/dsa/learn",
    iconType: "brand",
    iconValue: "algorithm",
    metaBadge: "Lesson",
    keywords: ["dsa", "sliding window", "deque", "monotonic", "algorithms", "lesson"],
    popularity: 92,
    dateAdded: "2026-02-12",
  },
  {
    id: "lesson-react-server-actions",
    title: "React 19 Server Actions & Optimistic State",
    subtitle: "Modern React 19 · Lesson 3.1 · 75 XP",
    type: "Lesson",
    category: "lessons",
    href: "/courses/react/learn",
    iconType: "brand",
    iconValue: "react",
    metaBadge: "Lesson",
    keywords: ["react", "react 19", "server actions", "useoptimistic", "forms", "lesson"],
    popularity: 89,
    dateAdded: "2026-02-14",
  },
  {
    id: "lesson-java-reentrant-locks",
    title: "Java Concurrency: ReentrantLock & Condition Queues",
    subtitle: "Enterprise Java · Lesson 5.2 · Thread Pools",
    type: "Lesson",
    category: "lessons",
    href: "/courses/java/learn",
    iconType: "brand",
    iconValue: "java",
    metaBadge: "Lesson",
    keywords: ["java", "locks", "threads", "concurrency", "synchronization", "lesson"],
    popularity: 84,
    dateAdded: "2026-02-15",
  },
]

// 3. Curated Skills
export const SEARCH_SKILLS: SearchResultItem[] = [
  {
    id: "skill-python",
    title: "Python",
    subtitle: "Language · OOP, AsyncIO, Data Science & Fast API",
    type: "Skill",
    category: "skills",
    href: "/courses/python",
    iconType: "brand",
    iconValue: "python",
    metaBadge: "Language",
    keywords: ["python", "django", "fastapi", "numpy", "pandas", "programming"],
    popularity: 97,
    dateAdded: "2026-01-01",
  },
  {
    id: "skill-react",
    title: "React 19",
    subtitle: "Frontend Framework · Server Components, Hooks & Architecture",
    type: "Skill",
    category: "skills",
    href: "/courses/react",
    iconType: "brand",
    iconValue: "react",
    metaBadge: "Frontend",
    keywords: ["react", "react 19", "nextjs", "javascript", "frontend", "ui"],
    popularity: 96,
    dateAdded: "2026-01-01",
  },
  {
    id: "skill-typescript",
    title: "TypeScript",
    subtitle: "Language · Type Systems, Generics, ASTs & Scalable Code",
    type: "Skill",
    category: "skills",
    href: "/courses/typescript",
    iconType: "brand",
    iconValue: "typescript",
    metaBadge: "Language",
    keywords: ["typescript", "ts", "types", "javascript", "frontend", "backend"],
    popularity: 94,
    dateAdded: "2026-01-01",
  },
  {
    id: "skill-golang",
    title: "Go (Golang)",
    subtitle: "Systems Language · Goroutines, Channels, gRPC & Concurrency",
    type: "Skill",
    category: "skills",
    href: "/courses/golang",
    iconType: "brand",
    iconValue: "go",
    metaBadge: "Systems",
    keywords: ["go", "golang", "systems", "microservices", "concurrency", "backend"],
    popularity: 90,
    dateAdded: "2026-01-01",
  },
  {
    id: "skill-dsa",
    title: "Data Structures & Algorithms",
    subtitle: "CS Core · Trees, Graphs, DP, Asymptotic Analysis & Striver A2Z",
    type: "Skill",
    category: "skills",
    href: "/practice",
    iconType: "brand",
    iconValue: "algorithm",
    metaBadge: "CS Core",
    keywords: ["dsa", "algorithms", "data structures", "leetcode", "striver", "graphs", "trees", "dp"],
    popularity: 99,
    dateAdded: "2026-01-01",
  },
]

// 4. Curated Projects
export const SEARCH_PROJECTS: SearchResultItem[] = [
  {
    id: "proj-job-portal",
    title: "Build a Job Portal",
    subtitle: "React · Node.js · PostgreSQL · 4–6 hours · Intermediate",
    type: "Project",
    category: "projects",
    href: "/projects/job-portal",
    iconType: "brand",
    iconValue: "react",
    metaBadge: "Full-Stack",
    keywords: ["project", "job portal", "react", "nodejs", "postgresql", "build", "capstone"],
    popularity: 96,
    dateAdded: "2026-02-01",
  },
  {
    id: "proj-python-projects",
    title: "Python Projects — High-Scale Data Pipeline",
    subtitle: "Python · FastAPI · Redis · 6–8 hours · Production Capstone",
    type: "Project",
    category: "projects",
    href: "/projects/python-data-pipeline",
    iconType: "brand",
    iconValue: "python",
    metaBadge: "Backend",
    keywords: ["python", "python projects", "pipeline", "fastapi", "redis", "project", "data"],
    popularity: 94,
    dateAdded: "2026-02-05",
  },
  {
    id: "proj-distributed-kv",
    title: "Distributed Key-Value Store with Raft",
    subtitle: "Go · Raft · gRPC · 8–10 hours · Advanced Systems",
    type: "Project",
    category: "projects",
    href: "/projects/distributed-kv-raft",
    iconType: "brand",
    iconValue: "go",
    metaBadge: "Distributed",
    keywords: ["go", "raft", "distributed", "kv store", "systems", "project"],
    popularity: 92,
    dateAdded: "2026-02-08",
  },
  {
    id: "proj-ai-agent",
    title: "Autonomous Coding Agent Orchestrator",
    subtitle: "Python · LangChain · Gemini API · 5–7 hours · AI/ML",
    type: "Project",
    category: "projects",
    href: "/projects/ai-agent-orchestrator",
    iconType: "brand",
    iconValue: "openai",
    metaBadge: "AI",
    keywords: ["ai", "agents", "gemini", "langchain", "python", "project"],
    popularity: 95,
    dateAdded: "2026-02-12",
  },
]

// 5. Curated Challenges
export const SEARCH_CHALLENGES: SearchResultItem[] = [
  {
    id: "chal-sliding-window",
    title: "Sliding Window Maximum",
    subtitle: "Hard · Monotonic Deque · 50 XP · Problem of the Day",
    type: "Challenge",
    category: "challenges",
    href: "/dsa/problem/sliding-window-maximum",
    iconType: "brand",
    iconValue: "algorithm",
    metaBadge: "Hard",
    keywords: ["sliding window", "challenge", "deque", "monotonic", "potd", "dsa", "problem"],
    popularity: 97,
    dateAdded: "2026-02-20",
  },
  {
    id: "chal-two-sum",
    title: "Two Sum — Optimal Hash Map",
    subtitle: "Easy · Hash Table · 20 XP · 14,200 Solved",
    type: "Challenge",
    category: "challenges",
    href: "/dsa/problem/two-sum",
    iconType: "brand",
    iconValue: "algorithm",
    metaBadge: "Easy",
    keywords: ["two sum", "hash map", "array", "challenge", "dsa", "leetcode", "problem"],
    popularity: 99,
    dateAdded: "2026-01-01",
  },
  {
    id: "chal-trapping-water",
    title: "Trapping Rain Water",
    subtitle: "Hard · Two Pointers · 45 XP · 4,890 Solved",
    type: "Challenge",
    category: "challenges",
    href: "/dsa/problem/trapping-rain-water",
    iconType: "brand",
    iconValue: "algorithm",
    metaBadge: "Hard",
    keywords: ["trapping rain water", "two pointers", "array", "challenge", "dsa", "problem"],
    popularity: 93,
    dateAdded: "2026-01-10",
  },
  {
    id: "chal-lru-cache",
    title: "LRU Cache Architecture",
    subtitle: "Medium · Doubly Linked List & Hash Map · 40 XP",
    type: "Challenge",
    category: "challenges",
    href: "/dsa/problem/lru-cache",
    iconType: "brand",
    iconValue: "algorithm",
    metaBadge: "Medium",
    keywords: ["lru cache", "linked list", "hash map", "challenge", "dsa", "system design"],
    popularity: 95,
    dateAdded: "2026-01-12",
  },
]

// 6. Curated Competitions
export const SEARCH_COMPETITIONS: SearchResultItem[] = [
  {
    id: "comp-algo-grand-prix",
    title: "ASCI National Algorithm Grand Prix 2026",
    subtitle: "Zerodha Tech · Cash Prize ₹5,00,000 · High-Frequency DSA & Systems",
    type: "Competition",
    category: "competitions",
    href: "/competitions/algo-grand-prix-2026",
    iconType: "company",
    iconValue: "zerodha",
    metaBadge: "₹5,00,000",
    keywords: ["competition", "hackathon", "grand prix", "zerodha", "algorithms", "dsa", "contest"],
    popularity: 96,
    dateAdded: "2026-02-01",
  },
  {
    id: "comp-nextgen-ai",
    title: "NextGen Agentic AI & Systems Hackathon",
    subtitle: "Google Cloud & ASCI · Cash Prize ₹3,50,000 · Autonomous Code Agents",
    type: "Competition",
    category: "competitions",
    href: "/competitions/nextgen-ai-hackathon",
    iconType: "company",
    iconValue: "google",
    metaBadge: "₹3,50,000",
    keywords: ["competition", "hackathon", "ai", "agents", "google", "cloud", "gemini"],
    popularity: 98,
    dateAdded: "2026-02-05",
  },
  {
    id: "comp-fintech-cup",
    title: "FinTech Distributed Systems Cup",
    subtitle: "Razorpay · Cash Prize ₹2,50,000 · Idempotent Ledger & Raft Engine",
    type: "Competition",
    category: "competitions",
    href: "/competitions/fintech-cup",
    iconType: "company",
    iconValue: "razorpay",
    metaBadge: "₹2,50,000",
    keywords: ["competition", "hackathon", "fintech", "razorpay", "systems", "microservices"],
    popularity: 91,
    dateAdded: "2026-02-10",
  },
]

// 7. Curated Jobs
export const SEARCH_JOBS: SearchResultItem[] = [
  {
    id: "job-zerodha-swe",
    title: "Software Engineer — Core Infrastructure",
    subtitle: "Zerodha · Bengaluru (Hybrid) · ₹20 - 28 LPA · Low-Latency Go & Linux",
    type: "Job",
    category: "jobs",
    href: "/career/zerodha-software-engineer-core-infrastructure",
    iconType: "company",
    iconValue: "zerodha",
    metaBadge: "₹20 - 28 LPA",
    keywords: ["job", "zerodha", "software engineer", "go", "systems", "bengaluru", "full-time"],
    popularity: 95,
    dateAdded: "2026-02-15",
  },
  {
    id: "job-razorpay-platform",
    title: "Backend Platform Engineer",
    subtitle: "Razorpay · Bengaluru · ₹18 - 26 LPA · Microservices & Payments",
    type: "Job",
    category: "jobs",
    href: "/career/razorpay-backend-platform-engineer",
    iconType: "company",
    iconValue: "razorpay",
    metaBadge: "₹18 - 26 LPA",
    keywords: ["job", "razorpay", "backend", "platform", "payments", "golang", "full-time"],
    popularity: 93,
    dateAdded: "2026-02-16",
  },
  {
    id: "job-google-swe",
    title: "Software Engineer — Cloud Infrastructure",
    subtitle: "Google India · Bengaluru / Remote · ₹32 - 45 LPA · Distributed Systems",
    type: "Job",
    category: "jobs",
    href: "/career/google-software-engineer",
    iconType: "company",
    iconValue: "google",
    metaBadge: "₹32 - 45 LPA",
    keywords: ["job", "google", "software engineer", "cloud", "systems", "full-time"],
    popularity: 99,
    dateAdded: "2026-02-18",
  },
]

// 8. Curated Internships
export const SEARCH_INTERNSHIPS: SearchResultItem[] = [
  {
    id: "intern-python-developer",
    title: "Python Developer Internship",
    subtitle: "Razorpay · Remote / Bengaluru · ₹85,000 / month · 6 months",
    type: "Internship",
    category: "internships",
    href: "/career/razorpay-python-intern",
    iconType: "company",
    iconValue: "razorpay",
    metaBadge: "₹85,000/mo",
    keywords: ["python developer internship", "python", "internship", "razorpay", "backend", "intern"],
    popularity: 97,
    dateAdded: "2026-02-18",
  },
  {
    id: "intern-google-swe",
    title: "Software Engineering Intern — Summer 2026",
    subtitle: "Google India · Hyderabad / Bengaluru · ₹1,15,000 / month · 2026/27 Batches",
    type: "Internship",
    category: "internships",
    href: "/career/google-swe-intern-summer-2026",
    iconType: "company",
    iconValue: "google",
    metaBadge: "₹1,15,000/mo",
    keywords: ["internship", "google", "software engineering", "summer 2026", "intern"],
    popularity: 100,
    dateAdded: "2026-02-19",
  },
  {
    id: "intern-microsoft-swe",
    title: "Core Systems Engineering Intern",
    subtitle: "Microsoft · Hyderabad · ₹1,00,000 / month · Azure Cloud Team",
    type: "Internship",
    category: "internships",
    href: "/career/microsoft-core-systems-intern",
    iconType: "company",
    iconValue: "microsoft",
    metaBadge: "₹1,00,000/mo",
    keywords: ["internship", "microsoft", "azure", "systems", "intern", "hyderabad"],
    popularity: 96,
    dateAdded: "2026-02-15",
  },
]

// 9. Curated Users
export const SEARCH_USERS: SearchResultItem[] = [
  {
    id: "user-masteraccess72",
    title: "Mokshagna Theja (@masteraccess72)",
    subtitle: "Staff Systems Fellow · Raft KV & Compiler Visualizers · Level 20",
    type: "User",
    category: "users",
    href: "/u/masteraccess72",
    iconType: "avatar",
    iconValue: "MT",
    metaBadge: "Staff Fellow",
    keywords: ["mokshagna theja", "masteraccess72", "systems", "user", "portfolio", "scholar"],
    popularity: 95,
    dateAdded: "2026-01-01",
  },
  {
    id: "user-sarahc",
    title: "Sarah Chen (@sarahc)",
    subtitle: "AI Systems Fellow · SpectraQuery RAG Pipeline · Level 16",
    type: "User",
    category: "users",
    href: "/u/sarahc",
    iconType: "avatar",
    iconValue: "SC",
    metaBadge: "AI Fellow",
    keywords: ["sarah chen", "sarahc", "ai", "rag", "user", "portfolio", "scholar"],
    popularity: 91,
    dateAdded: "2026-01-05",
  },
  {
    id: "user-marcusv",
    title: "Marcus Vance (@marcusv)",
    subtitle: "Distributed Systems Fellow · AetherPay Settlement Engine · Level 18",
    type: "User",
    category: "users",
    href: "/u/marcusv",
    iconType: "avatar",
    iconValue: "MV",
    metaBadge: "Systems Fellow",
    keywords: ["marcus vance", "marcusv", "kafka", "microservices", "user", "portfolio"],
    popularity: 88,
    dateAdded: "2026-01-10",
  },
]

export const ALL_SEARCH_ITEMS: SearchResultItem[] = [
  ...SEARCH_COURSES,
  ...SEARCH_LESSONS,
  ...SEARCH_SKILLS,
  ...SEARCH_PROJECTS,
  ...SEARCH_CHALLENGES,
  ...SEARCH_COMPETITIONS,
  ...SEARCH_JOBS,
  ...SEARCH_INTERNSHIPS,
  ...SEARCH_USERS,
]

export const TRENDING_SEARCHES = [
  "Python Programming",
  "Sliding Window Maximum",
  "Python Projects",
  "Python Developer Internship",
  "React 19",
  "Google SWE Intern",
  "A2Z DSA Sheet",
  "Distributed Systems",
]

export const SEARCH_CATEGORY_CONFIGS = [
  { id: "all", label: "All" },
  { id: "courses", label: "Courses" },
  { id: "lessons", label: "Lessons" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "challenges", label: "Challenges" },
  { id: "competitions", label: "Competitions" },
  { id: "jobs", label: "Jobs" },
  { id: "internships", label: "Internships" },
  { id: "users", label: "Users" },
] as const

export type SearchSortOption = "relevance" | "newest" | "title" | "popularity"

/**
 * Calculates a search relevance score for a given query against an item
 */
export function calculateRelevanceScore(item: SearchResultItem, query: string): number {
  const cleanQ = query.trim().toLowerCase()
  if (!cleanQ) return 0

  const titleLower = item.title.toLowerCase()
  const subLower = item.subtitle.toLowerCase()
  let score = 0

  // Exact title match gets astronomical boost
  if (titleLower === cleanQ) score += 100
  // Starts with query
  else if (titleLower.startsWith(cleanQ)) score += 50
  // Contains entire query in title
  else if (titleLower.includes(cleanQ)) score += 30

  // Keyword exact matches
  for (const kw of item.keywords) {
    if (kw === cleanQ) score += 40
    else if (kw.includes(cleanQ)) score += 15
  }

  // Subtitle / description matches
  if (subLower.includes(cleanQ)) score += 10

  // Type matches (e.g. typing "course" matches items of type Course)
  if (item.type.toLowerCase().includes(cleanQ)) score += 20

  // Add normalized popularity as tiebreaker
  score += item.popularity * 0.1

  return score
}

/**
 * Filter and sort search items
 */
export function executeUniversalSearch(
  query: string,
  category: SearchCategory = "all",
  sort: SearchSortOption = "relevance"
): SearchResultItem[] {
  let filtered = ALL_SEARCH_ITEMS

  // Filter by category
  if (category !== "all") {
    filtered = filtered.filter((item) => item.category === category)
  }

  // Filter by query
  if (query.trim()) {
    const cleanQ = query.trim().toLowerCase()
    filtered = filtered.filter((item) => {
      const titleMatch = item.title.toLowerCase().includes(cleanQ)
      const subMatch = item.subtitle.toLowerCase().includes(cleanQ)
      const keywordMatch = item.keywords.some((k) => k.includes(cleanQ))
      const typeMatch = item.type.toLowerCase().includes(cleanQ)
      return titleMatch || subMatch || keywordMatch || typeMatch
    })
  }

  // Sort results
  return [...filtered].sort((a, b) => {
    if (sort === "relevance" && query.trim()) {
      return calculateRelevanceScore(b, query) - calculateRelevanceScore(a, query)
    }
    if (sort === "newest") {
      return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
    }
    if (sort === "title") {
      return a.title.localeCompare(b.title)
    }
    // popularity default
    return b.popularity - a.popularity
  })
}

const RECENT_SEARCHES_STORAGE_KEY = "asci_recent_searches_v2"

export function getStoredRecentSearches(): string[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(RECENT_SEARCHES_STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed)) return parsed.slice(0, 8)
    }
  } catch {
    // safe fallback
  }
  return ["Python Programming", "Sliding Window", "Google SWE Intern"]
}

export function saveRecentSearch(query: string): string[] {
  const clean = query.trim()
  if (!clean || typeof window === "undefined") return []
  try {
    const current = getStoredRecentSearches().filter((s) => s.toLowerCase() !== clean.toLowerCase())
    const updated = [clean, ...current].slice(0, 8)
    localStorage.setItem(RECENT_SEARCHES_STORAGE_KEY, JSON.stringify(updated))
    return updated
  } catch {
    return []
  }
}

export function clearRecentSearches(): void {
  if (typeof window === "undefined") return
  try {
    localStorage.removeItem(RECENT_SEARCHES_STORAGE_KEY)
  } catch {
    // safe fallback
  }
}
