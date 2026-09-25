/**
 * Phase 17: Simple Onboarding & Personalized Home
 * 
 * Rules:
 * 1. Ask only 3 questions:
 *    - What do you want to learn?
 *    - What is your current level?
 *    - What is your goal?
 * 2. 7 Canonical Goals:
 *    - Learn
 *    - Get internship
 *    - Get job
 *    - Build projects
 *    - Prepare for interviews
 *    - Master DSA
 *    - Learn AI
 * 3. Personalized Home Archetypes & Focuses:
 *    - New student -> "Explore courses"
 *    - Learner -> "Continue learning"
 *    - DSA learner -> "Practice"
 *    - Project-focused -> "Projects"
 *    - Job seeker -> "Career opportunities"
 * 4. Progressive Disclosure:
 *    - Do not show every ASCI feature to every user.
 *    - Progressively reveal the ecosystem with clean focus controls.
 */

export type OnboardingGoal =
  | "Learn"
  | "Get internship"
  | "Get job"
  | "Build projects"
  | "Prepare for interviews"
  | "Master DSA"
  | "Learn AI"

export type OnboardingLevel = "Beginner" | "Intermediate" | "Advanced"

export type UserPersona =
  | "new_student"
  | "learner"
  | "dsa_learner"
  | "project_focused"
  | "job_seeker"

export interface PersonaMeta {
  id: UserPersona
  name: string
  primaryFocus: string
  tagline: string
  recommendedRoute: string
  primaryRails: string[]
  secondaryRails: string[]
}

export const ONBOARDING_GOALS: { id: OnboardingGoal; label: string; desc: string }[] = [
  { id: "Learn", label: "Learn", desc: "Build rock-solid engineering fundamentals from first principles." },
  { id: "Get internship", label: "Get internship", desc: "Discover high-growth summer & winter tech internships." },
  { id: "Get job", label: "Get job", desc: "Secure full-time engineering roles with top-tier compensation." },
  { id: "Build projects", label: "Build projects", desc: "Turn theory into production capstones you can show recruiters." },
  { id: "Prepare for interviews", label: "Prepare for interviews", desc: "Ace live algorithmic coding and system design rounds." },
  { id: "Master DSA", label: "Master DSA", desc: "Conquer A2Z problems, sliding windows, graphs, and dynamic programming." },
  { id: "Learn AI", label: "Learn AI", desc: "Master modern AI agents, LLM pipelines, and neural networks." },
]

export const ONBOARDING_LEVELS: { id: OnboardingLevel; label: string; desc: string }[] = [
  { id: "Beginner", label: "Beginner", desc: "Starting out or learning basic programming syntax." },
  { id: "Intermediate", label: "Intermediate", desc: "Comfortable with coding, ready for real systems." },
  { id: "Advanced", label: "Advanced", desc: "Experienced developer targeting senior opportunities." },
]

export const ONBOARDING_TOPICS = [
  { id: "dsa", label: "Data Structures & Algorithms", brand: "algorithm", desc: "Trees, graphs, sliding windows, DP" },
  { id: "web", label: "Full Stack & Web Dev", brand: "react", desc: "React 19, Next.js, Node.js, TypeScript" },
  { id: "python", label: "Python & Data Science", brand: "python", desc: "Core Python, automation, analytics" },
  { id: "java", label: "Java & Backend Systems", brand: "java", desc: "JVM internals, Spring, multithreading" },
  { id: "ai", label: "AI & Machine Learning", brand: "openai", desc: "LLMs, vector databases, neural nets" },
  { id: "systems", label: "System Design & DevOps", brand: "go", desc: "Distributed cache, Kafka, Docker, Kubernetes" },
]

export const PERSONA_CONFIGS: Record<UserPersona, PersonaMeta> = {
  new_student: {
    id: "new_student",
    name: "New Student",
    primaryFocus: "Explore courses",
    tagline: "Discover foundational curricula and guided starter tracks.",
    recommendedRoute: "/courses",
    primaryRails: ["trending_courses", "learning_paths"],
    secondaryRails: ["practice_spotlight", "projects", "competitions", "career", "certificates"],
  },
  learner: {
    id: "learner",
    name: "Learner",
    primaryFocus: "Continue learning",
    tagline: "Resume active courses and lock in streak milestones.",
    recommendedRoute: "/courses",
    primaryRails: ["continue_learning", "trending_courses", "certificates"],
    secondaryRails: ["practice_spotlight", "learning_paths", "projects", "competitions", "career"],
  },
  dsa_learner: {
    id: "dsa_learner",
    name: "DSA Learner",
    primaryFocus: "Practice",
    tagline: "Sharpen algorithms with daily POTD, A2Z sheets, and CodeMirror.",
    recommendedRoute: "/practice",
    primaryRails: ["practice_spotlight", "continue_learning", "trending_courses"],
    secondaryRails: ["projects", "competitions", "career", "learning_paths", "certificates"],
  },
  project_focused: {
    id: "project_focused",
    name: "Project-Focused",
    primaryFocus: "Projects",
    tagline: "Build production-grade capstones with live GitHub verification.",
    recommendedRoute: "/projects",
    primaryRails: ["projects", "learning_paths", "trending_courses"],
    secondaryRails: ["practice_spotlight", "competitions", "career", "continue_learning", "certificates"],
  },
  job_seeker: {
    id: "job_seeker",
    name: "Job Seeker",
    primaryFocus: "Career opportunities",
    tagline: "Discover verified internships, jobs, and hiring challenges.",
    recommendedRoute: "/career",
    primaryRails: ["career", "featured_opportunities", "competitions"],
    secondaryRails: ["projects", "practice_spotlight", "continue_learning", "trending_courses", "certificates"],
  },
}

export const STORAGE_KEYS = {
  TOPIC: "asci_onboard_topic",
  LEVEL: "asci_onboard_level",
  GOAL: "asci_onboard_goal",
  PERSONA: "asci_user_persona",
  COMPLETED: "asci_onboarding_completed",
  SHOW_ALL: "asci_home_show_all",
} as const

/**
 * Maps onboarding Goal and Level into canonical UserPersona
 */
export function mapGoalToPersona(goal: OnboardingGoal | string, level?: OnboardingLevel | string): UserPersona {
  switch (goal) {
    case "Master DSA":
    case "Prepare for interviews":
      return "dsa_learner"
    case "Build projects":
      return "project_focused"
    case "Get internship":
    case "Get job":
      return "job_seeker"
    case "Learn AI":
      return level === "Beginner" ? "new_student" : "learner"
    case "Learn":
    default:
      return level === "Beginner" ? "new_student" : "learner"
  }
}

/**
 * Safe accessor for client-side stored persona
 */
export function getStoredPersona(): UserPersona {
  if (typeof window === "undefined") return "new_student"
  try {
    const directPersona = localStorage.getItem(STORAGE_KEYS.PERSONA) as UserPersona | null
    if (directPersona && PERSONA_CONFIGS[directPersona]) {
      return directPersona
    }
    const goal = localStorage.getItem(STORAGE_KEYS.GOAL)
    const level = localStorage.getItem(STORAGE_KEYS.LEVEL)
    if (goal) {
      return mapGoalToPersona(goal, level || undefined)
    }
  } catch {
    // safe fallback
  }
  return "new_student"
}

/**
 * Save onboarding data and compute persona
 */
export function saveOnboardingPreferences(
  topic: string,
  level: OnboardingLevel,
  goal: OnboardingGoal
): UserPersona {
  const persona = mapGoalToPersona(goal, level)
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEYS.TOPIC, topic)
      localStorage.setItem(STORAGE_KEYS.LEVEL, level)
      localStorage.setItem(STORAGE_KEYS.GOAL, goal)
      localStorage.setItem(STORAGE_KEYS.PERSONA, persona)
      localStorage.setItem(STORAGE_KEYS.COMPLETED, "true")
    } catch {
      // safe fallback
    }
  }
  return persona
}
