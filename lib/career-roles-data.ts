import { CURRICULUM_COURSES, getCurriculumCourseBySlug, CurriculumCourse } from "@/lib/curriculum-data"
import { getCourseraDataForCourse } from "@/lib/coursera-metadata"

export interface CareerRoleCourse {
  id: string
  slug: string
  title: string
  partner: string
  partnerLogo?: string
  partnerType?: string
  thumbnail: string
  rating: number
  reviews: string
  level: "Beginner" | "Intermediate" | "Advanced"
  credential: string
  duration: string
  badge?: string
  skills: string[]
  category: string
  description: string
  enrollUrl?: string
}

export interface CareerRoleTrack {
  id: string
  title: string
  headline: string
  roleCategory: string
  marketDemand?: string
  salaryBenchmark?: string
  badgeText: string
  description: string
  goalLabel: string
  goalUrl: string
  inDemandSkills: string[]
  courses: CareerRoleCourse[]
}

function buildRoleCourse(slug: string, badge?: string): CareerRoleCourse {
  const c = getCurriculumCourseBySlug(slug)
  if (!c) {
    return {
      id: slug,
      slug,
      title: slug.replace(/-/g, " "),
      partner: "ASCI Institute",
      thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
      rating: 4.9,
      reviews: "10.5k",
      level: "Intermediate",
      credential: "Specialization",
      duration: "40h",
      badge: badge || "ASCI Track",
      skills: ["Software Engineering"],
      category: "Engineering",
      description: "Production-grade engineering track.",
      enrollUrl: `/courses/${slug}`,
    }
  }

  const meta = getCourseraDataForCourse(c.slug, c.title, c.category)
  const normLevel: "Beginner" | "Intermediate" | "Advanced" =
    (!c.level || c.level === "All Levels") ? "Beginner" : (c.level as "Beginner" | "Intermediate" | "Advanced")

  return {
    id: c.id,
    slug: c.slug,
    title: c.title,
    partner: meta.partner,
    partnerLogo: meta.partnerLogo,
    partnerType: meta.partnerType,
    thumbnail: meta.thumbnail,
    rating: meta.rating || 4.9,
    reviews: meta.ratingCount || "14.2k",
    level: normLevel,
    credential: meta.credentialType || (c.is_premium ? "Professional Certificate" : "Specialization"),
    duration: c.weeks || (c.duration_hours ? `${c.duration_hours}h` : "40h"),
    badge: badge || (c.is_premium ? "Industry Standard" : "ASCI Track"),
    skills: meta.skills?.length ? meta.skills : (c.tools?.length ? c.tools : [c.category]),
    category: c.category,
    description: c.description,
    enrollUrl: `/courses/${c.slug}`,
  }
}

export const CAREER_ROLE_TRACKS: CareerRoleTrack[] = [
  // =========================================================================
  // ROLE 1: MACHINE LEARNING & AI SYSTEMS ENGINEER
  // =========================================================================
  {
    id: "machine-learning-engineer",
    title: "Machine Learning Engineer",
    headline: "Architect, train, and productionize state-of-the-art neural architectures and AI systems",
    roleCategory: "AI & ML",
    marketDemand: "High Market Demand",
    salaryBenchmark: "₹28L–₹45L / yr",
    badgeText: "High Demand · ₹28L–₹45L Benchmark",
    description: "Master probability, neural architectures, PyTorch, TensorFlow, MLOps, and agentic workflows to train and deploy production AI models.",
    goalLabel: "Explore Role Roadmap",
    goalUrl: "/programs",
    inDemandSkills: [
      "Autonomous Agents",
      "RAG Architectures",
      "PyTorch 2.0",
      "Deep Learning",
      "Prompt Engineering",
      "CUDA Acceleration",
      "Foundation Models",
      "GRPO Reasoning"
    ],
    courses: [
      buildRoleCourse("agentic-ai", "Top recommendation"),
      buildRoleCourse("generative-ai-rag", "Top AI program"),
      buildRoleCourse("deep-learning-specialization", "Bestseller"),
      buildRoleCourse("anthropic-claude-prompt-engineering", "Job skills"),
      buildRoleCourse("nvidia-dli-deep-learning", "Top AI program"),
      buildRoleCourse("deepseek-r1-reasoning-models", "Top recommendation"),
      buildRoleCourse("meta-pytorch-llama3", "Bestseller"),
      buildRoleCourse("google-cloud-generative-ai", "Top AI program"),
      buildRoleCourse("ibm-watsonx-generative-ai", "Job skills"),
      buildRoleCourse("aws-skillbuilder-generative-ai", "Top recommendation"),
      buildRoleCourse("columbia-ai", "Bestseller"),
      buildRoleCourse("ai-for-everyone", "Top AI program")
    ]
  },

  // =========================================================================
  // ROLE 2: DATA SCIENTIST & AI ANALYTICS SPECIALIST
  // =========================================================================
  {
    id: "data-scientist",
    title: "Data Scientist",
    headline: "Transform petabyte datasets into predictive intelligence, statistical proofs, and executive narratives",
    roleCategory: "Data Science",
    marketDemand: "Accelerating Field",
    salaryBenchmark: "₹24L–₹38L / yr",
    badgeText: "Accelerating Field · ₹24L–₹38L Benchmark",
    description: "Acquire statistical mastery, machine learning pipelines, big data infrastructure, and executive storytelling with Python, SQL, and Power BI.",
    goalLabel: "Explore Role Roadmap",
    goalUrl: "/programs",
    inDemandSkills: [
      "Python 3.12",
      "Pandas & NumPy",
      "Statistical Inference",
      "Data Visualization",
      "SQL & Relational DBs",
      "Power BI & DAX",
      "Predictive Modeling",
      "Big Data Workflows"
    ],
    courses: [
      buildRoleCourse("ibm-data-science", "Top recommendation"),
      buildRoleCourse("google-data-analytics", "Professional Certificate"),
      buildRoleCourse("data-science-python", "Applied Data Science"),
      buildRoleCourse("data-science-probability", "HarvardX Certified"),
      buildRoleCourse("data-science-visualization", "Visual Communication"),
      buildRoleCourse("python-ai", "Core Scripting"),
      buildRoleCourse("sql", "Query Optimization"),
      buildRoleCourse("excel-bi-advanced", "Enterprise Analytics")
    ]
  },

  // =========================================================================
  // ROLE 3: CYBERSECURITY SPECIALIST & CLOUD DEFENSE
  // =========================================================================
  {
    id: "cyber-security-specialist",
    title: "Cybersecurity Specialist",
    headline: "Defend enterprise boundaries with zero-trust networking, penetration testing, and cloud infrastructure hardening",
    roleCategory: "Cybersecurity",
    marketDemand: "Zero Unemployment",
    salaryBenchmark: "₹22L–₹40L / yr",
    badgeText: "Zero Unemployment · ₹22L–₹40L Benchmark",
    description: "Master offensive security, Nmap reconnaissance, OWASP Top 10 vulnerabilities, containerized GitOps pipelines, and AWS cloud security architectures.",
    goalLabel: "Explore Role Roadmap",
    goalUrl: "/programs",
    inDemandSkills: [
      "Penetration Testing",
      "Network Port Exploits",
      "OWASP Top 10",
      "Wireshark & Cryptography",
      "Docker & Kubernetes",
      "AWS Cloud Solutions",
      "Zero-Trust Architecture",
      "Enterprise GitOps"
    ],
    courses: [
      buildRoleCourse("ethical-hacking-pentesting", "Top recommendation"),
      buildRoleCourse("cs50-cybersecurity", "HarvardX Security"),
      buildRoleCourse("docker-kubernetes-devops", "Cloud-Native DevOps"),
      buildRoleCourse("aws-cloud-solutions", "AWS Certified"),
      buildRoleCourse("ultimate-github", "Enterprise Fleet"),
      buildRoleCourse("modern-git-academy", "Complete 8-Pillar"),
      buildRoleCourse("git", "Modern DevOps")
    ]
  },

  // =========================================================================
  // ROLE 4: FULL-STACK SOFTWARE ENGINEER & DISTRIBUTED WEB SYSTEMS
  // =========================================================================
  {
    id: "full-stack-web-architect",
    title: "Full-Stack Software Engineer",
    headline: "Engineer scalable web platforms, high-throughput microservices, and distributed algorithmic backends",
    roleCategory: "Web Systems",
    marketDemand: "Foundational Need",
    salaryBenchmark: "₹20L–₹36L / yr",
    badgeText: "Essential Discipline · ₹20L–₹36L Benchmark",
    description: "Master React 19, Next.js 15, TypeScript architecture, distributed system patterns, FAANG-caliber DSA, and enterprise Java & Go microservices.",
    goalLabel: "Explore Role Roadmap",
    goalUrl: "/programs",
    inDemandSkills: [
      "Next.js 15 App Router",
      "React 19 & Server Actions",
      "TypeScript Architecture",
      "Distributed Systems & Saga",
      "Dynamic Programming (DSA)",
      "Enterprise Java & Spring",
      "Go (Golang) Microservices",
      "Rust Systems Concurrency"
    ],
    courses: [
      buildRoleCourse("fullstack-typescript-react", "Top recommendation"),
      buildRoleCourse("webdev", "Master Track"),
      buildRoleCourse("react", "React 19 Modern"),
      buildRoleCourse("typescript", "Static Typing"),
      buildRoleCourse("javascript", "ES6+ Standards"),
      buildRoleCourse("html", "Semantic Structure"),
      buildRoleCourse("css", "Modern Grid & Flex"),
      buildRoleCourse("system-design-distributed", "High Scalability"),
      buildRoleCourse("dsa-advanced", "Algorithmic Paradigms"),
      buildRoleCourse("dsa-intermediate", "Core Data Structures"),
      buildRoleCourse("dsa", "Foundational DSA"),
      buildRoleCourse("java-advanced", "Enterprise Architecture"),
      buildRoleCourse("java-intermediate", "JVM & Collections"),
      buildRoleCourse("java", "Java Core"),
      buildRoleCourse("golang-microservices", "Cloud Microservices"),
      buildRoleCourse("rust-systems-programming", "Zero-Cost Abstractions"),
      buildRoleCourse("python", "CPython Internals"),
      buildRoleCourse("cloud-productivity", "Enterprise Workflows"),
      buildRoleCourse("c", "Memory & Pointers"),
      buildRoleCourse("cpp", "OOP & Performance")
    ]
  }
]
