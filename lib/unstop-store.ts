"use client"

import { useState, useEffect, useCallback } from "react"
import {
  getEcosystemData,
  registerHackathonAction,
  submitHackathonProjectAction,
  applyJobAction,
  submitAssessmentAction,
  bookMentorAction,
  createTeammatePostAction,
  solvePOTDAction,
  saveAtsResumeAction,
  claimAmbassadorPerkAction,
} from "@/app/actions/unstop"

// ==========================================
// 1. DATA TYPES & INTERFACES
// ==========================================

export interface HackathonRound {
  id: string
  name: string
  type: "quiz" | "prototype" | "presentation" | "interview"
  date: string
  status: "upcoming" | "active" | "completed"
  description: string
}

export interface HackathonItem {
  id: string
  title: string
  host: string
  hostLogo?: string
  bannerImage?: string
  bannerTag: string
  prizePool: string
  firstPrize: string
  registeredCount: number
  teamSize: string
  deadline: string // ISO date or formatted
  mode: "Online" | "Hybrid" | "In-Person"
  difficulty: "All Welcome" | "Intermediate" | "Advanced"
  tags: string[]
  problemStatement: string
  rounds: HackathonRound[]
  isRegistered?: boolean
  registration?: {
    teamName: string
    leaderName: string
    leaderEmail: string
    members: string[]
    track: string
    registeredAt: string
  }
  submission?: {
    repoUrl: string
    demoUrl: string
    pitchUrl?: string
    notes?: string
    submittedAt: string
  }
}

export interface JobApplicationStage {
  stage: "applied" | "profile_viewed" | "assessment" | "interview" | "offered"
  label: string
  completed: boolean
  current: boolean
  date?: string
  notes?: string
}

export interface JobOpportunity {
  id: string
  title: string
  company: string
  companyLogo?: string
  bannerImage?: string
  roleType: "Full-Time" | "Internship" | "Apprenticeship"
  location: string
  workMode: "Remote" | "Hybrid" | "On-site"
  compensation: string // e.g. "₹18-24 LPA" or "₹45,00,000 / year"
  batchEligibility: string // e.g. "2025, 2026 Batch"
  experience: string // e.g. "Fresher / 0-1 Years"
  skills: string[]
  closingInDays: number
  featured?: boolean
  description: string
  requirements: string[]
  perks: string[]
  applied?: boolean
  appliedAt?: string
  currentStage?: "applied" | "profile_viewed" | "assessment" | "interview" | "offered"
  stages?: JobApplicationStage[]
  interviewSlot?: string
}

export interface SkillAssessmentQuestion {
  id: number
  question: string
  codeSnippet?: string
  options: string[]
  correctIndex: number
  explanation: string
}

export interface SkillAssessment {
  id: string
  title: string
  category: "DSA" | "Frontend" | "Backend" | "System Design" | "Databases" | "AI & ML"
  bannerImage?: string
  durationMinutes: number
  totalQuestions: number
  passingScore: number // percentage, e.g. 75
  difficulty: "Foundational" | "Intermediate" | "Mastery"
  skillsCovered: string[]
  badgeReward: {
    id: string
    name: string
    icon: string
  }
  attemptsCount: number
  questions: SkillAssessmentQuestion[]
  userScore?: number
  passed?: boolean
  percentile?: number
  completedAt?: string
}

export interface MentorBooking {
  id: string
  mentorId: string
  mentorName: string
  mentorRole: string
  mentorCompany: string
  mentorAvatar: string
  date: string
  timeSlot: string
  topic: string
  status: "confirmed" | "completed" | "cancelled"
  meetLink: string
  bookedAt: string
}

export interface MentorProfile {
  id: string
  name: string
  role: string
  company: string
  avatar: string
  experienceYears: number
  rating: number
  reviewsCount: number
  specialties: string[]
  bio: string
  sessionDuration: string
  availableSlots: { date: string; slots: string[] }[]
}

export interface CandidateProfileChecklist {
  id: string
  title: string
  description: string
  weight: number // percentage weight
  completed: boolean
  actionTab?: string
}

export interface TeammatePost {
  id: string
  authorName: string
  authorAvatar?: string
  college: string
  hackathonId: string
  hackathonTitle: string
  role: string
  skills: string[]
  lookingFor: string[]
  pitch: string
  contactEmail: string
  postedAt: string
  invited?: boolean
}

export interface POTDProblem {
  id: string
  title: string
  date: string
  difficulty: "Easy" | "Medium" | "Hard"
  tags: string[]
  description: string
  examples: { input: string; output: string; explanation?: string }[]
  starterCode: {
    javascript: string
    python: string
    java: string
  }
  testCases: { input: string; expected: string }[]
  solved?: boolean
  userCode?: string
}

export interface SpeedQuizQuestion {
  id: number
  category: "CS Core" | "Aptitude" | "System Design" | "Web"
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

export interface AmbassadorProfile {
  referralCode: string
  referralUrl: string
  totalClicks: number
  joinedPeers: number
  tier: "Campus Partner" | "Lead Igniter" | "Chapter President" | "Diamond Fellow"
  pointsEarned: number
  campusRank: number
  campusName: string
  unlockedPerks: string[]
}

export interface AtsResumeData {
  targetRole: string
  fullName: string
  email: string
  phone: string
  githubUrl: string
  linkedinUrl: string
  summary: string
  skills: string[]
  projects: {
    title: string
    techStack: string[]
    bullets: string[]
  }[]
  workExperience: {
    company: string
    role: string
    duration: string
    bullets: string[]
  }[]
  education: {
    college: string
    degree: string
    year: string
    cgpa: string
  }
  atsScore: number
  actionVerbsScore: number
  keywordMatchScore: number
  missingKeywords: string[]
  suggestions: string[]
}

// ==========================================
// 2. CURATED REALISTIC SEED DATA
// ==========================================

export const INITIAL_HACKATHONS: HackathonItem[] = [
  {
    id: "hack-algo-forge-2026",
    title: "ASCI National Algorithm Grand Prix 2026",
    host: "ASCI Institute & Zerodha Tech",
    hostLogo: "/images/asci-logo.png",
    bannerImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    bannerTag: "Flagship Competition",
    prizePool: "₹5,00,000",
    firstPrize: "₹2,50,000 + SDE Fast-track",
    registeredCount: 3840,
    teamSize: "1-4 Members",
    deadline: "2026-10-15",
    mode: "Online",
    difficulty: "Advanced",
    tags: ["Distributed Systems", "High Frequency DSA", "Rust", "Go"],
    problemStatement:
      "Design an ultra-low-latency in-memory order book matcher capable of processing 1,000,000 operations per second with sub-millisecond p99 latency.",
    rounds: [
      {
        id: "r1",
        name: "Round 1: Asymptotic Speed Challenge",
        type: "quiz",
        date: "Oct 18, 2026",
        status: "upcoming",
        description: "Timed algorithmic elimination solving 4 hard DSA optimization constraints.",
      },
      {
        id: "r2",
        name: "Round 2: Architecture & Prototype",
        type: "prototype",
        date: "Oct 24, 2026",
        status: "upcoming",
        description: "Submit GitHub benchmark suite with memory allocation profiling.",
      },
      {
        id: "r3",
        name: "Round 3: Grand Jury Defense",
        type: "presentation",
        date: "Oct 30, 2026",
        status: "upcoming",
        description: "Live stress-testing on ASCI cluster against adversarial test vectors.",
      },
    ],
    isRegistered: false,
  },
  {
    id: "hack-nextgen-ai-2026",
    title: "NextGen Agentic AI & Systems Hackathon",
    host: "ASCI AI Labs & Google Cloud",
    hostLogo: "/images/asci-logo.png",
    bannerImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    bannerTag: "Generative AI & Tool Agents",
    prizePool: "₹3,50,000",
    firstPrize: "₹1,75,000 + Cloud Credits",
    registeredCount: 2910,
    teamSize: "1-3 Members",
    deadline: "2026-10-22",
    mode: "Online",
    difficulty: "Intermediate",
    tags: ["LangChain", "Autonomous Agents", "Gemini 2.5", "TypeScript"],
    problemStatement:
      "Construct an autonomous coding assistant agent capable of understanding real monorepo ASTs, reproducing bug traces, and generating validated surgical patch diffs.",
    rounds: [
      {
        id: "r1",
        name: "Round 1: Problem Ideation & Architecture",
        type: "prototype",
        date: "Oct 25, 2026",
        status: "upcoming",
        description: "Submit architectural blueprint and workflow orchestrator diagram.",
      },
      {
        id: "r2",
        name: "Round 2: Prototype Deployment",
        type: "presentation",
        date: "Nov 02, 2026",
        status: "upcoming",
        description: "Live demonstration verifying tool calling and error recovery.",
      },
    ],
    isRegistered: false,
  },
  {
    id: "hack-fintech-vault-2026",
    title: "Razorpay Core Fintech & Payments Challenge",
    host: "Razorpay Engineering",
    hostLogo: "/images/asci-logo.png",
    bannerImage: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80",
    bannerTag: "Hiring Hackathon",
    prizePool: "₹2,50,000",
    firstPrize: "₹1,25,000 + Summer PPO",
    registeredCount: 4210,
    teamSize: "Solo or Duo",
    deadline: "2026-11-05",
    mode: "Online",
    difficulty: "Intermediate",
    tags: ["PostgreSQL", "Idempotency", "Payment Gateways", "System Design"],
    problemStatement:
      "Implement a distributed idempotency engine and webhook delivery orchestrator with automatic exponential backoff, jitter, and zero duplicate charges.",
    rounds: [
      {
        id: "r1",
        name: "Round 1: System Design MCQ & Coding",
        type: "quiz",
        date: "Nov 08, 2026",
        status: "upcoming",
        description: "Database isolation levels, ACID transactions, and lock concurrency.",
      },
      {
        id: "r2",
        name: "Round 2: Service Implementation",
        type: "prototype",
        date: "Nov 15, 2026",
        status: "upcoming",
        description: "Deliver Dockerized service handling chaos-monkey partition simulations.",
      },
    ],
    isRegistered: false,
  },
]

export const INITIAL_JOBS: JobOpportunity[] = [
  {
    id: "job-swe-zerodha-2026",
    title: "Software Engineer — Core Infrastructure",
    company: "Zerodha",
    companyLogo: "zerodha",
    bannerImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    roleType: "Full-Time",
    location: "Bengaluru, Karnataka",
    workMode: "Hybrid",
    compensation: "₹20 - 28 LPA",
    batchEligibility: "2025 & 2026 Batch",
    experience: "Fresher / 0-2 Years",
    skills: ["Go", "PostgreSQL", "Kafka", "Linux", "Low-Latency"],
    closingInDays: 5,
    featured: true,
    description:
      "Join the team building India's largest discount retail brokerage infrastructure. You will work on real-time trade execution pipelines handling 15+ million daily orders.",
    requirements: [
      "Solid mastery of Data Structures, Concurrency Primitives, and Memory Mechanics",
      "Deep curiosity about distributed systems, networking (TCP/UDP), and Linux internals",
      "Proficiency in Go, C, or modern C++",
    ],
    perks: [
      "No bureaucratic red tape — pure engineering autonomy",
      "Generous health insurance, book allowances, and hardware of choice",
      "Work directly with founding architecture teams",
    ],
    applied: false,
  },
  {
    id: "job-intern-google-2026",
    title: "Software Engineering Intern — Summer 2026",
    company: "Google India",
    companyLogo: "google",
    bannerImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    roleType: "Internship",
    location: "Hyderabad / Bengaluru",
    workMode: "Hybrid",
    compensation: "₹1,15,000 / month",
    batchEligibility: "2026 & 2027 Graduating Batches",
    experience: "Current Student",
    skills: ["DSA", "C++", "Java", "Algorithms", "System Scalability"],
    closingInDays: 8,
    featured: true,
    description:
      "12-week summer internship working with Google engineers on core products used by billions of users worldwide. Direct pre-placement interview (PPO) conversion for top performers.",
    requirements: [
      "Currently enrolled in a Bachelor's, Master's, or Dual Degree in Computer Science or related engineering field",
      "Exceptional algorithmic problem-solving ability",
    ],
    perks: [
      "Subsidized housing, gourmet meals, and wellness stipend",
      "Formal mentorship from Principal Engineers",
    ],
    applied: false,
  },
  {
    id: "job-frontend-razorpay-2026",
    title: "Frontend Platform Engineer",
    company: "Razorpay",
    companyLogo: "razorpay",
    bannerImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
    roleType: "Full-Time",
    location: "Bengaluru, Karnataka",
    workMode: "Hybrid",
    compensation: "₹16 - 22 LPA",
    batchEligibility: "2024, 2025, 2026 Batch",
    experience: "0-2 Years",
    skills: ["React", "TypeScript", "Next.js", "Performance Profiling", "Web Vitals"],
    closingInDays: 12,
    featured: false,
    description:
      "Architect checkout experiences that load under 400ms across India's tier-2 and tier-3 network conditions. Craft accessible, high-converting design systems.",
    requirements: [
      "Mastery of modern JavaScript/TypeScript, React 19, and browser rendering lifecycle",
      "Obsession with 60fps micro-interactions, bundle size optimization, and Web Vitals",
    ],
    perks: [
      "Comprehensive ESOP grants",
      "Annual education & learning conference sponsorship",
    ],
    applied: false,
  },
  {
    id: "job-ai-asci-fellow-2026",
    title: "Junior AI Systems Researcher & Fellow",
    company: "ASCI Academy Research Labs",
    companyLogo: "asci",
    bannerImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80",
    roleType: "Full-Time",
    location: "Bengaluru / Remote",
    workMode: "Remote",
    compensation: "₹14 - 18 LPA",
    batchEligibility: "All Graduates",
    experience: "0-1 Years",
    skills: ["PyTorch", "Python", "Transformers", "Model Fine-Tuning", "Agentic Systems"],
    closingInDays: 14,
    featured: true,
    description:
      "Develop next-generation interactive code visualizers, autonomous tutoring companions (like Axel), and automated curriculum synthesis engines for millions of engineers.",
    requirements: [
      "Strong theoretical grounding in linear algebra, gradient descent, and transformer architectures",
      "Demonstrated open-source contributions or portfolio projects",
    ],
    perks: [
      "Direct pair programming with research directors",
      "Access to dedicated high-memory GPU compute clusters",
    ],
    applied: false,
  },
]

export const INITIAL_ASSESSMENTS: SkillAssessment[] = [
  {
    id: "assessment-dsa-mastery",
    title: "Core Data Structures & Asymptotic Complexity",
    category: "DSA",
    bannerImage: "https://images.unsplash.com/photo-1516116211227-bbc0c2d76ff9?auto=format&fit=crop&w=1200&q=80",
    durationMinutes: 40,
    totalQuestions: 15,
    passingScore: 75,
    difficulty: "Mastery",
    skillsCovered: ["Two Pointers", "Sliding Window", "Binary Search Invariants", "Tree Traversal", "Graph BFS/DFS"],
    badgeReward: {
      id: "badge-dsa-certified",
      name: "Certified DSA Operative",
      icon: "Code",
    },
    attemptsCount: 1840,
    questions: [
      {
        id: 1,
        question: "What is the tightest upper bound (Big-O) of finding the median of two sorted arrays of lengths m and n?",
        options: ["O(log(min(m, n)))", "O((m + n) log(m + n))", "O(m + n)", "O(log(m + n)^2)"],
        correctIndex: 0,
        explanation: "Binary search on the partition of the smaller array achieves O(log(min(m, n))) time complexity.",
      },
      {
        id: 2,
        question: "In Dijkstra's algorithm implemented with a Min-Heap, what is the exact time complexity for a graph with V vertices and E edges?",
        options: ["O((V + E) log V)", "O(V^2)", "O(E + V log V)", "O(V log E)"],
        correctIndex: 0,
        explanation: "Every vertex extraction takes O(log V) and each edge relaxation takes O(log V), yielding O((V + E) log V).",
      },
      {
        id: 3,
        question: "Which invariant guarantees that Floyd's Cycle-Finding Algorithm (Tortoise and Hare) detects a cycle in a linked list?",
        options: [
          "The distance between the fast and slow pointer decreases by 1 modulo the cycle length on every iteration.",
          "The fast pointer visits every node at least twice.",
          "The slow pointer stops at the exact center of the cycle.",
          "Cycle detection requires hash set memory.",
        ],
        correctIndex: 0,
        explanation: "Because the hare advances 2 steps and the tortoise advances 1, the gap closes by 1 node per step until collision.",
      },
      {
        id: 4,
        question: "What is the worst-case recursion depth of QuickSort with randomized pivot selection?",
        options: ["O(N)", "O(log N)", "O(N log N)", "O(1)"],
        correctIndex: 0,
        explanation: "Even with random pivots, an adversarial sequence of worst-case partitions yields a recursion depth of O(N).",
      },
      {
        id: 5,
        question: "When applying dynamic programming on trees, what is the typical space complexity order for auxiliary traversal state?",
        options: ["O(H) where H is tree height", "O(V^2)", "O(E log V)", "O(1)"],
        correctIndex: 0,
        explanation: "Post-order tree DP caches subproblem values along the recursion call stack, requiring O(H) call stack depth.",
      },
    ],
  },
  {
    id: "assessment-frontend-react",
    title: "React 19 & High-Performance UI Architecture",
    category: "Frontend",
    bannerImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80",
    durationMinutes: 35,
    totalQuestions: 12,
    passingScore: 75,
    difficulty: "Intermediate",
    skillsCovered: ["React Server Components", "Fiber Reconciler", "useTransition", "Hydration", "Layout Thrashing"],
    badgeReward: {
      id: "badge-react-certified",
      name: "React Platform Specialist",
      icon: "Zap",
    },
    attemptsCount: 2420,
    questions: [
      {
        id: 1,
        question: "How does React 19's Server Component rendering differ from traditional SSR in terms of client bundle payload?",
        options: [
          "RSC dependencies are executed strictly on the server and are not included in the client JavaScript bundle.",
          "RSCs send HTML only without any hydration markers.",
          "RSCs eliminate the need for any client components.",
          "RSC requires WebSockets for all data streaming.",
        ],
        correctIndex: 0,
        explanation: "Server components execute on the server and stream a JSON-like virtual DOM wire format, omitting code packages from the client JS bundle.",
      },
      {
        id: 2,
        question: "What is the primary architectural purpose of `useTransition` in modern React concurrency?",
        options: [
          "Marking state updates as non-urgent transitions that yield execution to user inputs and interactions.",
          "Triggering CSS page transitions automatically.",
          "Synchronously re-rendering child components without batching.",
          "Fetching network data in a separate Web Worker.",
        ],
        correctIndex: 0,
        explanation: "`useTransition` marks updates as interruptible transitions, keeping the user interface responsive during heavy computational renders.",
      },
      {
        id: 3,
        question: "Which of the following operations is the primary cause of browser layout thrashing (forced reflow)?",
        options: [
          "Interleaving DOM style writes with immediate geometric reads like offsetHeight or getBoundingClientRect.",
          "Changing background-color inside a CSS transition.",
          "Using transform: translate3d for GPU compositing.",
          "Calling requestAnimationFrame consecutively.",
        ],
        correctIndex: 0,
        explanation: "Writing to DOM styles and immediately querying layout geometry forces the browser engine to flush and recalculate layout synchronously.",
      },
    ],
  },
  {
    id: "assessment-backend-systems",
    title: "High-Throughput Backend & Distributed Storage",
    category: "Backend",
    bannerImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    durationMinutes: 40,
    totalQuestions: 15,
    passingScore: 75,
    difficulty: "Mastery",
    skillsCovered: ["PostgreSQL ACID", "Connection Pooling", "Kafka Partitions", "Cache Stampede", "Idempotency"],
    badgeReward: {
      id: "badge-backend-certified",
      name: "Systems Architect Associate",
      icon: "Shield",
    },
    attemptsCount: 1690,
    questions: [
      {
        id: 1,
        question: "Under PostgreSQL's default READ COMMITTED isolation level, what concurrency anomaly is still possible?",
        options: ["Non-repeatable reads and Phantom reads", "Dirty reads", "Lost updates during serializable snapshots", "None"],
        correctIndex: 0,
        explanation: "In READ COMMITTED, each query within a transaction sees committed rows at the time the query begins, permitting non-repeatable and phantom reads.",
      },
      {
        id: 2,
        question: "How does the 'Cache Stampede' (Thundering Herd) problem occur when a high-traffic cache key expires?",
        options: [
          "Hundreds of concurrent incoming requests experience a cache miss simultaneously and hammer the primary database to recompute the value.",
          "The cache memory overflows into swap space.",
          "The Redis replication replica disconnects from the primary.",
          "Database connection limits drop to zero.",
        ],
        correctIndex: 0,
        explanation: "When a popular key expires, all concurrent reader threads simultaneously query the underlying database, overwhelming it.",
      },
    ],
  },
]

export const INITIAL_MENTORS: MentorProfile[] = [
  {
    id: "mentor-karthik-faang",
    name: "Karthik Subramanian",
    role: "Staff Software Engineer",
    company: "Google (ex-Amazon)",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80",
    experienceYears: 9,
    rating: 4.96,
    reviewsCount: 184,
    specialties: ["DSA & Competitive Coding", "System Design (HLD/LLD)", "Google L5/L6 Interview Prep"],
    bio: "Passionate systems engineer who has interviewed 250+ candidates at Google. Mentored 40+ engineers into top-tier compensation roles.",
    sessionDuration: "45 Minutes",
    availableSlots: [
      { date: "Tomorrow", slots: ["6:00 PM IST", "7:30 PM IST", "9:00 PM IST"] },
      { date: "Saturday", slots: ["11:00 AM IST", "2:00 PM IST", "4:30 PM IST"] },
      { date: "Sunday", slots: ["10:00 AM IST", "12:30 PM IST", "5:00 PM IST"] },
    ],
  },
  {
    id: "mentor-ananya-asci",
    name: "Ananya Deshmukh",
    role: "Founding Lead & Architect",
    company: "ASCI Academy (ex-Zerodha)",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80",
    experienceYears: 7,
    rating: 4.98,
    reviewsCount: 212,
    specialties: ["Full-Stack React & Next.js", "Portfolio & Resume Roast", "Startup Career Roadmaps"],
    bio: "Helps engineers build stunning production-grade portfolios and crack high-agency engineering roles without standard resume grind.",
    sessionDuration: "45 Minutes",
    availableSlots: [
      { date: "Today", slots: ["8:00 PM IST", "9:15 PM IST"] },
      { date: "Friday", slots: ["5:00 PM IST", "6:30 PM IST"] },
      { date: "Sunday", slots: ["3:00 PM IST", "4:15 PM IST"] },
    ],
  },
  {
    id: "mentor-rahul-fintech",
    name: "Rahul Verma",
    role: "Engineering Manager — Payments",
    company: "Razorpay",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80",
    experienceYears: 8,
    rating: 4.92,
    reviewsCount: 145,
    specialties: ["FinTech Architecture", "Distributed Data & Kafka", "Behavioral Leadership Rounds"],
    bio: "Leads payment infrastructure teams processing $100B+ annualized TPV. Expert at preparing candidates for deep systems and behavioral rounds.",
    sessionDuration: "45 Minutes",
    availableSlots: [
      { date: "Tomorrow", slots: ["7:00 PM IST", "8:30 PM IST"] },
      { date: "Monday", slots: ["6:00 PM IST", "7:30 PM IST"] },
    ],
  },
]

// ==========================================
// 2B. NEW UNSTOP ECOSYSTEM SEED DATA
// ==========================================

export const INITIAL_TEAMMATES: TeammatePost[] = [
  {
    id: "team-post-1",
    authorName: "Aniket Verma",
    authorAvatar: "/avatars/hacker.png",
    college: "IIT Delhi · Computer Science",
    hackathonId: "hack-algo-forge-2026",
    hackathonTitle: "ASCI National Algorithm Grand Prix 2026",
    role: "Backend Systems & Rust",
    skills: ["Rust", "Go", "Distributed Systems", "Kafka", "gRPC"],
    lookingFor: ["Frontend React 19", "Next.js", "WebSockets"],
    pitch: "Building a high-throughput lock-free orderbook engine. We have the matching core benchmarked at 850k ops/sec. Need an engineer to build the live telemetry visualization client.",
    contactEmail: "aniket.verma@iitd.ac.in",
    postedAt: "2 hours ago",
    invited: false,
  },
  {
    id: "team-post-2",
    authorName: "Sneha Iyer",
    authorAvatar: "/avatars/robot.png",
    college: "BITS Pilani · Data Science",
    hackathonId: "hack-nextgen-ai-2026",
    hackathonTitle: "NextGen AI & Autonomous Systems Hackathon",
    role: "AI / Multi-Agent Architect",
    skills: ["Python", "LangGraph", "Vector DBs", "FastAPI", "PostgreSQL"],
    lookingFor: ["Full-Stack Dev", "Tailwind CSS", "UI/UX"],
    pitch: "Crafting an autonomous agentic code review and security auditing harness for fintech codebases. Looking for a teammate with clean React skills to build the jury dashboard.",
    contactEmail: "sneha.i@pilani.bits-pilani.ac.in",
    postedAt: "5 hours ago",
    invited: false,
  },
  {
    id: "team-post-3",
    authorName: "Vikramaditya Patil",
    authorAvatar: "/avatars/astronaut.png",
    college: "NIT Trichy · ECE",
    hackathonId: "hack-razorpay-fintech-2026",
    hackathonTitle: "Razorpay Fintech Vault Challenge 2026",
    role: "Full-Stack Security Engineer",
    skills: ["TypeScript", "Next.js", "Solidity", "Redis", "Docker"],
    lookingFor: ["Backend Systems", "Postgres Tuning"],
    pitch: "Targeting the Zero-Fraud settlement protocol track. Looking for a partner comfortable with concurrency locks, idempotency keys, and database race conditions.",
    contactEmail: "vikram.patil@nitt.edu",
    postedAt: "Yesterday",
    invited: false,
  },
]

export const INITIAL_POTD: POTDProblem = {
  id: "potd-longest-k-distinct",
  title: "Longest Substring with At Most K Distinct Characters",
  date: "Today's Challenge",
  difficulty: "Medium",
  tags: ["Two Pointers", "Sliding Window", "Hash Map", "String"],
  description:
    "Given a string `s` and an integer `k`, return the length of the longest substring of `s` that contains at most `k` distinct characters. Your solution must run in O(N) time complexity and O(K) auxiliary memory.",
  examples: [
    {
      input: 's = "eceba", k = 2',
      output: "3",
      explanation: 'The substring is "ece" with length 3 containing only \'e\' and \'c\'.',
    },
    {
      input: 's = "aa", k = 1',
      output: "2",
      explanation: 'The substring is "aa" with length 2.',
    },
  ],
  starterCode: {
    javascript: `function lengthOfLongestSubstringKDistinct(s, k) {
  if (k === 0 || !s.length) return 0;
  const map = new Map();
  let left = 0, maxLen = 0;
  
  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    map.set(ch, (map.get(ch) || 0) + 1);
    
    while (map.size > k) {
      const leftCh = s[left];
      map.set(leftCh, map.get(leftCh) - 1);
      if (map.get(leftCh) === 0) map.delete(leftCh);
      left++;
    }
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}`,
    python: `def lengthOfLongestSubstringKDistinct(s: str, k: int) -> int:
    if k == 0 or not s:
        return 0
    from collections import defaultdict
    counts = defaultdict(int)
    left = 0
    max_len = 0
    for right, ch in enumerate(s):
        counts[ch] += 1
        while len(counts) > k:
            left_ch = s[left]
            counts[left_ch] -= 1
            if counts[left_ch] == 0:
                del counts[left_ch]
            left += 1
        max_len = max(max_len, right - left + 1)
    return max_len`,
    java: `class Solution {
    public int lengthOfLongestSubstringKDistinct(String s, int k) {
        if (k == 0 || s == null || s.length() == 0) return 0;
        java.util.Map<Character, Integer> map = new java.util.HashMap<>();
        int left = 0, maxLen = 0;
        for (int right = 0; right < s.length(); right++) {
            char ch = s.charAt(right);
            map.put(ch, map.getOrDefault(ch, 0) + 1);
            while (map.size() > k) {
                char leftCh = s.charAt(left);
                map.put(leftCh, map.get(leftCh) - 1);
                if (map.get(leftCh) == 0) map.remove(leftCh);
                left++;
            }
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }
}`,
  },
  testCases: [
    { input: '"eceba", 2', expected: "3" },
    { input: '"aa", 1', expected: "2" },
    { input: '"a", 0', expected: "0" },
    { input: '"abaccc", 2', expected: "4" },
  ],
}

export const INITIAL_SPEED_QUIZZES: SpeedQuizQuestion[] = [
  {
    id: 1,
    category: "CS Core",
    question: "What happens when a CPU experiences a Translation Lookaside Buffer (TLB) miss?",
    options: [
      "The OS terminates the thread with a SIGSEGV signal.",
      "The hardware page table walker traverses the hierarchical page tables in memory to resolve the physical frame.",
      "The page is loaded directly from secondary SSD swap storage.",
      "The MMU zeroes out the process register file.",
    ],
    correctIndex: 1,
    explanation:
      "On a TLB miss, the MMU/hardware page walker searches the page tables in RAM to find the mapping and refills the TLB before the memory access proceeds.",
  },
  {
    id: 2,
    category: "System Design",
    question: "Which database isolation level prevents Non-Repeatable Reads but may still allow Phantom Reads in the ANSI SQL standard?",
    options: [
      "Read Uncommitted",
      "Read Committed",
      "Repeatable Read",
      "Serializable",
    ],
    correctIndex: 2,
    explanation:
      "Repeatable Read prevents dirty and non-repeatable reads by holding read locks until transaction completion, but phantom rows can still appear unless gap locks or snapshot isolation are used.",
  },
  {
    id: 3,
    category: "Web",
    question: "In React 19, what is the primary benefit of the useActionState hook for form workflows?",
    options: [
      "It completely replaces Redux store state globally.",
      "It manages pending transition status, returned server action state, and automatic optimistic resets without manual useState booleans.",
      "It executes form validation on a dedicated WebAssembly thread.",
      "It runs database transactions directly in the client browser.",
    ],
    correctIndex: 1,
    explanation:
      "useActionState natively binds asynchronous actions with pending states, returned data, and optimistic execution.",
  },
  {
    id: 4,
    category: "CS Core",
    question: "Which TCP header flag is used to gracefully terminate a bidirectional connection after all data is acknowledged?",
    options: ["RST (Reset)", "FIN (Finish)", "PSH (Push)", "URG (Urgent)"],
    correctIndex: 1,
    explanation:
      "The FIN flag is sent by an endpoint when it has finished sending data, initiating the TCP four-way handshake connection teardown.",
  },
]

export const INITIAL_AMBASSADOR: AmbassadorProfile = {
  referralCode: "ASCI-AMB-8821",
  referralUrl: "https://asci.edu/join?ref=ASCI-AMB-8821",
  totalClicks: 214,
  joinedPeers: 14,
  tier: "Lead Igniter",
  pointsEarned: 1680,
  campusRank: 3,
  campusName: "Indian Institute of Technology, Delhi",
  unlockedPerks: [
    "Verified Campus Ambassador Profile Badge",
    "Priority Registration for National Grand Prix",
    "VIP Access to Mentorship Lounge",
  ],
}

export const INITIAL_ATS_RESUME: AtsResumeData = {
  targetRole: "Software Development Engineer (Backend / Distributed Systems)",
  fullName: "Arjun Sharma",
  email: "arjun.sharma@example.edu",
  phone: "+91 98765 43210",
  githubUrl: "https://github.com/arjun-sharma-asci",
  linkedinUrl: "https://linkedin.com/in/arjunsharma-eng",
  summary:
    "Performance-focused Software Engineer with deep expertise in Java 21, Go, and high-concurrency distributed systems. Proven track record architecting event-driven microservices that reduced p99 query latency by 42% across 50,000+ active user workloads.",
  skills: [
    "Data Structures & Algorithms",
    "Java 21",
    "Go",
    "PostgreSQL",
    "Redis",
    "Kafka",
    "Docker",
    "Kubernetes",
    "gRPC",
    "System Design",
    "CI/CD",
  ],
  projects: [
    {
      title: "Distributed Low-Latency Order Book Engine",
      techStack: ["Go", "Lock-free Queues", "Redis", "WebSockets"],
      bullets: [
        "Architected an in-memory limit order book handling 650,000 orders/sec with sub-millisecond p99 execution latency.",
        "Implemented ring buffers and cache-friendly data layouts to eliminate GC overhead by 68%.",
        "Constructed real-time WebSocket telemetry stream delivering market depth updates to 10k concurrent simulated clients.",
      ],
    },
    {
      title: "Scalable Event Sourcing Audit Ledger",
      techStack: ["Java 21", "Spring Boot", "Apache Kafka", "PostgreSQL"],
      bullets: [
        "Engineered transactional outbox pattern to guarantee exactly-once event delivery semantics across 4 payment microservices.",
        "Optimized database composite indexing and query partitioning, reducing read latency from 240ms to 28ms under heavy write loads.",
      ],
    },
  ],
  workExperience: [
    {
      company: "ASCI Tech Core Lab",
      role: "Backend Engineering Fellow",
      duration: "Aug 2025 - Present",
      bullets: [
        "Spearheaded database query optimization and Redis cache invalidation pipelines, speeding up student dashboard loading by 3.2x.",
        "Authored 35+ comprehensive unit and integration test suites with 92% code coverage using JUnit 5 and Testcontainers.",
      ],
    },
  ],
  education: {
    college: "Indian Institute of Technology, Delhi",
    degree: "B.Tech in Computer Science and Engineering",
    year: "2022 - 2026",
    cgpa: "8.9 / 10.0",
  },
  atsScore: 89,
  actionVerbsScore: 92,
  keywordMatchScore: 86,
  missingKeywords: ["Distributed Locks (Redlock)", "Observability (Prometheus/Grafana)", "Terraform"],
  suggestions: [
    "Quantify the test suite scale in your ASCI Core experience (e.g. 'reduced regression test runtimes by 25%').",
    "Add Prometheus or OpenTelemetry metrics collection keyword to strengthen distributed systems relevance.",
  ],
}

// ==========================================
// 3. PERSISTENCE KEYS & HELPER STORAGE
// ==========================================

const STORAGE_KEYS = {
  HACKATHONS: "asci_unstop_hackathons_v1",
  JOBS: "asci_unstop_jobs_v1",
  ASSESSMENTS: "asci_unstop_assessments_v1",
  MENTORS: "asci_unstop_mentors_v1",
  BOOKINGS: "asci_unstop_mentor_bookings_v1",
  PROFILE_CHECKLIST: "asci_unstop_profile_checklist_v1",
  TEAMMATES: "asci_unstop_teammates_v1",
  POTD: "asci_unstop_potd_v1",
  AMBASSADOR: "asci_unstop_ambassador_v1",
  RESUME_ATS: "asci_unstop_resume_ats_v1",
}

export function getStoredData<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch (err) {
    console.warn(`Failed reading storage key "${key}":`, err)
    return fallback
  }
}

export function setStoredData<T>(key: string, data: T): void {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (err) {
    console.warn(`Failed writing storage key "${key}":`, err)
  }
}

// ==========================================
// 4. REACT HOOKS FOR LIVE ECOSYSTEM STATE
// ==========================================

export function useUnstopEcosystem() {
  const [hackathons, setHackathons] = useState<HackathonItem[]>([])
  const [jobs, setJobs] = useState<JobOpportunity[]>([])
  const [assessments, setAssessments] = useState<SkillAssessment[]>([])
  const [mentors, setMentors] = useState<MentorProfile[]>(INITIAL_MENTORS)
  const [bookings, setBookings] = useState<MentorBooking[]>([])
  const [teammatePosts, setTeammatePosts] = useState<TeammatePost[]>([])
  const [potd, setPotd] = useState<POTDProblem>(INITIAL_POTD)
  const [speedQuizzes, setSpeedQuizzes] = useState<SpeedQuizQuestion[]>(INITIAL_SPEED_QUIZZES)
  const [ambassador, setAmbassador] = useState<AmbassadorProfile>(INITIAL_AMBASSADOR)
  const [atsResume, setAtsResume] = useState<AtsResumeData>(INITIAL_ATS_RESUME)
  const [isLoaded, setIsLoaded] = useState(false)

  // Initialize from storage or seed defaults, then hydrate live from Supabase
  useEffect(() => {
    const storedHacks = getStoredData<HackathonItem[]>(STORAGE_KEYS.HACKATHONS, INITIAL_HACKATHONS)
    const storedJobs = getStoredData<JobOpportunity[]>(STORAGE_KEYS.JOBS, INITIAL_JOBS)
    const storedAssessments = getStoredData<SkillAssessment[]>(STORAGE_KEYS.ASSESSMENTS, INITIAL_ASSESSMENTS)
    const storedBookings = getStoredData<MentorBooking[]>(STORAGE_KEYS.BOOKINGS, [])
    const storedTeammates = getStoredData<TeammatePost[]>(STORAGE_KEYS.TEAMMATES, INITIAL_TEAMMATES)
    const storedPotd = getStoredData<POTDProblem>(STORAGE_KEYS.POTD, INITIAL_POTD)
    const storedAmbassador = getStoredData<AmbassadorProfile>(STORAGE_KEYS.AMBASSADOR, INITIAL_AMBASSADOR)
    const storedAtsResume = getStoredData<AtsResumeData>(STORAGE_KEYS.RESUME_ATS, INITIAL_ATS_RESUME)

    setHackathons(storedHacks)
    setJobs(storedJobs)
    setAssessments(storedAssessments)
    setBookings(storedBookings)
    setTeammatePosts(storedTeammates)
    setPotd(storedPotd)
    setAmbassador(storedAmbassador)
    setAtsResume(storedAtsResume)
    setIsLoaded(true)

    // Hydrate real live data directly from Supabase PostgreSQL tables
    getEcosystemData()
      .then((real) => {
        if (real.hackathons && real.hackathons.length > 0) {
          setHackathons(real.hackathons)
          setStoredData(STORAGE_KEYS.HACKATHONS, real.hackathons)
        }
        if (real.jobs && real.jobs.length > 0) {
          setJobs(real.jobs)
          setStoredData(STORAGE_KEYS.JOBS, real.jobs)
        }
        if (real.assessments && real.assessments.length > 0) {
          setAssessments(real.assessments)
          setStoredData(STORAGE_KEYS.ASSESSMENTS, real.assessments)
        }
        if (real.mentors && real.mentors.length > 0) {
          setMentors(real.mentors)
        }
        if (real.bookings && real.bookings.length > 0) {
          setBookings(real.bookings)
          setStoredData(STORAGE_KEYS.BOOKINGS, real.bookings)
        }
        if (real.teammatePosts && real.teammatePosts.length > 0) {
          setTeammatePosts(real.teammatePosts)
          setStoredData(STORAGE_KEYS.TEAMMATES, real.teammatePosts)
        }
        if (real.potd) {
          setPotd(real.potd)
          setStoredData(STORAGE_KEYS.POTD, real.potd)
        }
        if (real.ambassador) {
          setAmbassador(real.ambassador)
          setStoredData(STORAGE_KEYS.AMBASSADOR, real.ambassador)
        }
        if (real.atsResume) {
          setAtsResume(real.atsResume)
          setStoredData(STORAGE_KEYS.RESUME_ATS, real.atsResume)
        }
      })
      .catch((err) => {
        console.warn("Could not sync live ecosystem data from Supabase:", err)
      })
  }, [])

  // Sync back to storage & call Supabase Server Actions
  const registerForHackathon = useCallback((hackathonId: string, regData: HackathonItem["registration"]) => {
    setHackathons((prev) => {
      const updated = prev.map((h) => {
        if (h.id === hackathonId) {
          return {
            ...h,
            isRegistered: true,
            registeredCount: h.registeredCount + 1,
            registration: regData,
          }
        }
        return h
      })
      setStoredData(STORAGE_KEYS.HACKATHONS, updated)
      return updated
    })

    if (regData) {
      registerHackathonAction(hackathonId, {
        teamName: regData.teamName,
        leaderName: regData.leaderName,
        leaderEmail: regData.leaderEmail,
        members: regData.members,
        track: regData.track,
      }).catch((err) => console.warn("Supabase hackathon registration sync error:", err))
    }
  }, [])

  const submitHackathonProject = useCallback((hackathonId: string, submission: HackathonItem["submission"]) => {
    setHackathons((prev) => {
      const updated = prev.map((h) => {
        if (h.id === hackathonId) {
          return {
            ...h,
            submission,
          }
        }
        return h
      })
      setStoredData(STORAGE_KEYS.HACKATHONS, updated)
      return updated
    })

    if (submission) {
      submitHackathonProjectAction(hackathonId, {
        repoUrl: submission.repoUrl,
        demoUrl: submission.demoUrl,
        pitchUrl: submission.pitchUrl,
        notes: submission.notes,
      }).catch((err) => console.warn("Supabase hackathon submission sync error:", err))
    }
  }, [])

  const applyForJob = useCallback((jobId: string, notes?: string) => {
    setJobs((prev) => {
      const now = new Date().toISOString()
      const updated = prev.map((job) => {
        if (job.id === jobId) {
          const stages: JobApplicationStage[] = [
            { stage: "applied", label: "Application Submitted", completed: true, current: false, date: "Today", notes: notes || "Application sent with verified ASCI portfolio" },
            { stage: "profile_viewed", label: "Profile Screened", completed: true, current: true, date: "In Progress", notes: "Recruiter reviewing algorithmic credentials" },
            { stage: "assessment", label: "Online Coding Assessment", completed: false, current: false },
            { stage: "interview", label: "Technical Video Round", completed: false, current: false },
            { stage: "offered", label: "Final Selection & Offer", completed: false, current: false },
          ]
          return {
            ...job,
            applied: true,
            appliedAt: now,
            currentStage: "profile_viewed" as const,
            stages,
          }
        }
        return job
      })
      setStoredData(STORAGE_KEYS.JOBS, updated)
      return updated
    })

    applyJobAction(jobId).catch((err) => console.warn("Supabase job application sync error:", err))
  }, [])

  const recordAssessmentResult = useCallback((assessmentId: string, score: number, passed: boolean) => {
    const percentile = Math.min(99, Math.round(score * 0.8 + 20))
    setAssessments((prev) => {
      const updated = prev.map((a) => {
        if (a.id === assessmentId) {
          return {
            ...a,
            userScore: score,
            passed,
            percentile,
            completedAt: new Date().toISOString(),
          }
        }
        return a
      })
      setStoredData(STORAGE_KEYS.ASSESSMENTS, updated)
      return updated
    })

    submitAssessmentAction(assessmentId, score, passed, percentile).catch((err) =>
      console.warn("Supabase assessment submission sync error:", err)
    )
  }, [])

  const bookMentorSession = useCallback((booking: Omit<MentorBooking, "id" | "bookedAt" | "status" | "meetLink">) => {
    const newBooking: MentorBooking = {
      ...booking,
      id: `booking-${Date.now()}`,
      bookedAt: new Date().toISOString(),
      status: "confirmed",
      meetLink: `https://meet.google.com/asc-${Math.random().toString(36).substring(2, 6)}-${Math.random().toString(36).substring(2, 5)}`,
    }

    setBookings((prev) => {
      const updated = [newBooking, ...prev]
      setStoredData(STORAGE_KEYS.BOOKINGS, updated)
      return updated
    })

    bookMentorAction({
      mentorId: booking.mentorId,
      mentorName: booking.mentorName,
      mentorRole: booking.mentorRole,
      mentorCompany: booking.mentorCompany,
      mentorAvatar: booking.mentorAvatar,
      date: booking.date,
      timeSlot: booking.timeSlot,
      topic: booking.topic,
    }).catch((err) => console.warn("Supabase mentor booking sync error:", err))

    return newBooking
  }, [])

  // Teammate Matchmaker Actions
  const addTeammatePost = useCallback((post: Omit<TeammatePost, "id" | "postedAt" | "invited">) => {
    const newPost: TeammatePost = {
      ...post,
      id: `teammate-${Date.now()}`,
      postedAt: "Just now",
      invited: false,
    }
    setTeammatePosts((prev) => {
      const updated = [newPost, ...prev]
      setStoredData(STORAGE_KEYS.TEAMMATES, updated)
      return updated
    })

    createTeammatePostAction({
      authorName: post.authorName,
      authorAvatar: post.authorAvatar,
      college: post.college,
      hackathonId: post.hackathonId,
      hackathonTitle: post.hackathonTitle,
      role: post.role,
      skills: post.skills,
      lookingFor: post.lookingFor,
      pitch: post.pitch,
      contactEmail: post.contactEmail,
    }).catch((err) => console.warn("Supabase teammate post sync error:", err))

    return newPost
  }, [])

  const inviteTeammate = useCallback((postId: string) => {
    setTeammatePosts((prev) => {
      const updated = prev.map((p) => (p.id === postId ? { ...p, invited: true } : p))
      setStoredData(STORAGE_KEYS.TEAMMATES, updated)
      return updated
    })
  }, [])

  // POTD & Quiz Actions
  const solvePOTD = useCallback((code: string) => {
    setPotd((prev) => {
      const updated: POTDProblem = {
        ...prev,
        solved: true,
        userCode: code,
      }
      setStoredData(STORAGE_KEYS.POTD, updated)
      return updated
    })
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("asci-award-xp", { detail: { amount: 150 } }))
    }

    if (potd?.id) {
      solvePOTDAction(potd.id, code).catch((err) => console.warn("Supabase POTD solve sync error:", err))
    }
  }, [potd?.id])

  // Ambassador Actions
  const claimAmbassadorPerk = useCallback((perk: string) => {
    setAmbassador((prev) => {
      if (prev.unlockedPerks.includes(perk)) return prev
      const updated: AmbassadorProfile = {
        ...prev,
        unlockedPerks: [...prev.unlockedPerks, perk],
      }
      setStoredData(STORAGE_KEYS.AMBASSADOR, updated)
      return updated
    })

    claimAmbassadorPerkAction(perk).catch((err) => console.warn("Supabase claim perk sync error:", err))
  }, [])

  // ATS Resume Actions
  const saveAtsResume = useCallback((data: Partial<AtsResumeData>) => {
    setAtsResume((prev) => {
      const updated: AtsResumeData = {
        ...prev,
        ...data,
      }
      setStoredData(STORAGE_KEYS.RESUME_ATS, updated)
      return updated
    })

    saveAtsResumeAction(data).catch((err) => console.warn("Supabase ATS resume sync error:", err))
  }, [])

  // Derived counts for navbar badges & overview counters
  const registeredHackathonsCount = hackathons.filter((h) => h.isRegistered).length
  const activeApplicationsCount = jobs.filter((j) => j.applied).length
  const passedAssessmentsCount = assessments.filter((a) => a.passed).length
  const confirmedBookingsCount = bookings.filter((b) => b.status === "confirmed").length
  const isPotdSolvedToday = !!potd.solved
  const activeTeammatesCount = teammatePosts.length

  return {
    isLoaded,
    hackathons,
    jobs,
    assessments,
    mentors,
    bookings,
    teammatePosts,
    potd,
    speedQuizzes,
    ambassador,
    atsResume,
    registeredHackathonsCount,
    activeApplicationsCount,
    passedAssessmentsCount,
    confirmedBookingsCount,
    isPotdSolvedToday,
    activeTeammatesCount,
    registerForHackathon,
    submitHackathonProject,
    applyForJob,
    recordAssessmentResult,
    bookMentorSession,
    addTeammatePost,
    inviteTeammate,
    solvePOTD,
    claimAmbassadorPerk,
    saveAtsResume,
  }
}
