import { LiveClass } from "./live-classes-types"

export const TOPIC_PRESETS = [
  "System Design & Cloud Architecture",
  "DSA & Algorithmic Problem Solving",
  "Full-Stack Web & Next.js",
  "Low-Level Systems & C++",
  "Enterprise Java & Microservices",
  "AI Engineering & LLM Pipelines",
  "Career Masterclass & Mock Interviews",
]

export const INSTRUCTOR_PRESETS = [
  {
    name: "Arjun Mehta",
    role: "Principal Distributed Systems Architect @ Ex-Stripe",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Priya Sharma",
    role: "Senior Staff Engineer & ICPC Regional Finalist",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Rohan Varma",
    role: "Lead Full-Stack Architect & Open Source Maintainer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Vikram Sengupta",
    role: "Senior Systems Engineer (C++ & Linux Kernel Contributor)",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
  },
]

export const BANNER_PRESETS = [
  {
    label: "Distributed Systems & Cloud",
    url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop",
  },
  {
    label: "DSA & Code Arena",
    url: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=1200&auto=format&fit=crop",
  },
  {
    label: "Modern Web & React",
    url: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1200&auto=format&fit=crop",
  },
  {
    label: "Live Webinar & Auditorium",
    url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop",
  },
  {
    label: "Systems & Architecture",
    url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop",
  },
]

// Generates dynamic dates relative to current time
const now = new Date()
const inOneHour = new Date(now.getTime() + 60 * 60 * 1000).toISOString()
const inTomorrowEvening = new Date(now.getTime() + 28 * 60 * 60 * 1000).toISOString()
const inThreeDays = new Date(now.getTime() + 72 * 60 * 60 * 1000).toISOString()
const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString()

export const SEED_LIVE_CLASSES: LiveClass[] = [
  {
    id: "live-sys-101",
    title: "Real-Time Distributed Architectures & WebSockets with Redis Pub/Sub",
    description: "Architecting high-throughput, fault-tolerant live communication engines. Hands-on coding of bidirectional streaming, heartbeat protocols, and scaling cluster nodes with Redis Pub/Sub.",
    topic: "System Design & Cloud Architecture",
    instructor_name: "Arjun Mehta",
    instructor_role: "Principal Distributed Systems Architect @ Ex-Stripe",
    instructor_avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
    start_time: inOneHour,
    duration_minutes: 90,
    status: "upcoming",
    zoom_meeting_url: "https://zoom.us/j/84920394821?pwd=asci-systems-live",
    zoom_meeting_id: "849 2039 4821",
    zoom_passcode: "ASCI2026",
    recording_url: "",
    banner_image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop",
    max_attendees: 300,
    attendees_count: 184,
    tags: ["System Design", "WebSockets", "Redis", "Distributed Systems"],
    is_featured: true,
  },
  {
    id: "live-dsa-202",
    title: "DSA Live Sprint: Tree DP, Shortest Paths & Competitive Problem Solving",
    description: "Intensive 2-hour algorithmic sprint solving tricky dynamic programming on trees and multi-source BFS/Dijkstra problems. Code along and get your code reviewed in live Zoom breakout rooms.",
    topic: "DSA & Algorithmic Problem Solving",
    instructor_name: "Priya Sharma",
    instructor_role: "Senior Staff Engineer & ICPC Regional Finalist",
    instructor_avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
    start_time: inTomorrowEvening,
    duration_minutes: 120,
    status: "upcoming",
    zoom_meeting_url: "https://zoom.us/j/91283746501?pwd=asci-dsa-masterclass",
    zoom_meeting_id: "912 8374 6501",
    zoom_passcode: "DPGRAPH26",
    recording_url: "",
    banner_image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=1200&auto=format&fit=crop",
    max_attendees: 250,
    attendees_count: 228,
    tags: ["Dynamic Programming", "Graphs", "A2Z Sheet", "Interview Prep"],
    is_featured: true,
  },
  {
    id: "live-web-303",
    title: "React 19 & Next.js Fullstack Architecture Masterclass",
    description: "Deep dive into Server Actions, Streaming SSR, Edge Runtime deployment, and Optimistic UI mutations. Live debugging of real-world production concurrency bottlenecks.",
    topic: "Full-Stack Web & Next.js",
    instructor_name: "Rohan Varma",
    instructor_role: "Lead Full-Stack Architect & Open Source Maintainer",
    instructor_avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    start_time: inThreeDays,
    duration_minutes: 75,
    status: "upcoming",
    zoom_meeting_url: "https://zoom.us/j/88392019482?pwd=asci-react19-live",
    zoom_meeting_id: "883 9201 9482",
    zoom_passcode: "REACT19",
    recording_url: "",
    banner_image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1200&auto=format&fit=crop",
    max_attendees: 200,
    attendees_count: 95,
    tags: ["React 19", "Next.js", "SSR", "TypeScript"],
    is_featured: false,
  },
  {
    id: "live-rec-404",
    title: "Low-Latency Systems in Modern C++20: Memory Ordering & SIMD Acceleration",
    description: "Full recording and workshop recap covering memory barriers, atomic operations, cache miss optimization, and hardware intrinsics in modern C++20.",
    topic: "Low-Level Systems & C++",
    instructor_name: "Vikram Sengupta",
    instructor_role: "Senior Systems Engineer (C++ & Linux Kernel Contributor)",
    instructor_avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
    start_time: yesterday,
    duration_minutes: 90,
    status: "completed",
    zoom_meeting_url: "https://zoom.us/j/88392019482",
    zoom_meeting_id: "883 9201 9482",
    zoom_passcode: "CPPKERNEL",
    recording_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    banner_image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop",
    max_attendees: 300,
    attendees_count: 289,
    tags: ["C++20", "Low-Latency", "Kernel", "Memory Order"],
    is_featured: false,
  },
]
