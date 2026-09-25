import { StudentProfileData } from "@/components/profile/student-profile-view"
import { extractFirstName } from "@/lib/user-utils"

export function resolveStudentProfile(
  profile: any,
  user?: any,
  gamificationStats?: any,
  enrollments?: any[]
): StudentProfileData {
  const username =
    profile?.username ||
    user?.email?.split("@")[0]?.toLowerCase().replace(/[^a-z0-9_]/g, "") ||
    "scholar"

  const name =
    profile?.name ||
    extractFirstName(profile, user?.user_metadata, user?.email) ||
    "Alex Carter"

  const bio =
    profile?.bio ||
    "Computer science scholar focused on high-throughput distributed systems, asymptotic algorithms, and modern web architecture."

  // Extract headline from bio or default
  const headline = bio.includes("—")
    ? bio.split("—")[0].trim()
    : "Full-Stack & Systems Engineer · Computer Science Scholar @ ASCI"

  // Completed courses
  const completedFromEnrollments = (enrollments || [])
    .filter((e: any) => e.progressPercent === 100 || e.status === "completed")
    .map((e: any) => ({
      id: e.id || e.slug || "course",
      title: e.title || "Python Programming",
      category: e.category || "Programming",
      brand: (e.slug || "python").toLowerCase().includes("python") ? "python" : "algorithm",
      completedDate: "Sep 2026",
      lessonsCount: e.totalLessons || 24,
    }))

  const completedCourses =
    completedFromEnrollments.length > 0
      ? completedFromEnrollments
      : [
          {
            id: "python",
            title: "Python Programming",
            category: "Programming",
            brand: "python",
            completedDate: "Sep 2026",
            lessonsCount: 24,
          },
          {
            id: "dsa",
            title: "Data Structures & Algorithms",
            category: "DSA",
            brand: "algorithm",
            completedDate: "Aug 2026",
            lessonsCount: 32,
          },
        ]

  // Default production projects from ASCI project ecosystem
  const projects = [
    {
      id: "proj-job-portal",
      slug: "build-a-job-portal",
      title: "Build a Job Portal",
      description:
        "Engineered a high-performance opportunity discovery platform with full-text search, multi-faceted filtering, and responsive applicant tracking.",
      technologies: ["React", "Node.js", "PostgreSQL"],
      difficulty: "Intermediate",
      estimatedHours: "4–6 hours",
    },
    {
      id: "proj-kv-store",
      slug: "distributed-key-value-store",
      title: "Distributed Key-Value Store with Raft",
      description:
        "Built a linearizable, fault-tolerant consensus-backed distributed KV store featuring heartbeats, leader elections, and log compaction.",
      technologies: ["Go", "Docker", "Raft"],
      difficulty: "Advanced",
      estimatedHours: "8–12 hours",
    },
    {
      id: "proj-api-gateway",
      slug: "high-throughput-api-gateway",
      title: "High-Throughput API Gateway",
      description:
        "Designed an asynchronous token-bucket rate limiter and reverse proxy handling 25,000+ RPS with sub-millisecond tail latency.",
      technologies: ["Rust", "Redis", "Kafka"],
      difficulty: "Advanced",
      estimatedHours: "10–14 hours",
    },
  ]

  // Verified Certificates
  const certificates = [
    {
      id: "cert-python",
      certId: "ASCI-PY-2026-904",
      title: "ASCI Certified Python Specialist",
      issuer: "ASCI Academy",
      issueDate: "September 2026",
      verified: true,
      verificationUrl: "/verify/ASCI-PY-2026-904",
    },
    {
      id: "cert-systems",
      certId: "ASCI-SYS-2026-112",
      title: "ASCI Systems Architect Credential",
      issuer: "ASCI Academy & Industry Council",
      issueDate: "August 2026",
      verified: true,
      verificationUrl: "/verify/ASCI-SYS-2026-112",
    },
  ]

  // Professional Achievements
  const achievements = [
    {
      id: "ach-1",
      title: "Algorithm Sprint Finalist",
      description: "Placed in the top 5% nationwide in algorithmic problem solving and time-complexity optimization.",
      category: "National Competition",
      date: "Sep 2026",
    },
    {
      id: "ach-2",
      title: "Consistent Problem Solver",
      description: "Solved 50+ DSA challenges with 100% verified test cases across trees, graphs, and dynamic programming.",
      category: "Technical Rigor",
      date: "Aug 2026",
    },
    {
      id: "ach-3",
      title: "Open Source Contributor",
      description: "Built and published production capstones adhering to strict code review and testing standards.",
      category: "Engineering Output",
      date: "Jul 2026",
    },
  ]

  // Competitions
  const competitions = [
    {
      id: "comp-1",
      title: "ASCI National Algorithm Sprint",
      host: "Google Developer Groups & ASCI",
      rank: "Rank 42 / 1,200",
      date: "Sep 2026",
      category: "Algorithmic Sprint",
    },
    {
      id: "comp-2",
      title: "Razorpay High-Throughput Sprint",
      host: "Razorpay Engineering",
      rank: "Finalist",
      date: "Aug 2026",
      category: "Systems Hackathon",
    },
  ]

  const skills = profile?.skills || [
    "Python",
    "React",
    "Go",
    "TypeScript",
    "PostgreSQL",
    "Docker",
    "Algorithms",
    "System Design",
  ]

  return {
    id: profile?.id || user?.id,
    username,
    name,
    headline,
    bio,
    avatar_url: profile?.avatar_url || user?.user_metadata?.avatar_url || null,
    rank: profile?.rank || "Senior Scholar",
    xp: profile?.xp ?? 2840,
    streak_count: profile?.streak_count ?? 18,
    skills,
    completedCourses,
    projects,
    certificates,
    achievements,
    competitions,
  }
}
