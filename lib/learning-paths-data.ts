export interface PathMilestone {
  step: number
  title: string
  skills: string
  technology?: string
  coursesCount?: number
  projectsCount?: number
  status?: "completed" | "current" | "upcoming"
}

export interface LearningPath {
  id: string
  slug: string
  title: string
  role: string
  brand: string
  duration: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  description: string
  skills: string[]
  milestones: PathMilestone[]
  coursesCount: number
  projectsCount: number
  challengesCount: number
  careerOutcome: string
  certificate: string
}

export const LEARNING_PATHS: LearningPath[] = [
  {
    id: "ai-engineer",
    slug: "ai-engineer",
    title: "AI Engineer",
    role: "Neural Models, Vector RAG & Autonomous Agents",
    brand: "openai",
    duration: "18 Weeks (12-15 hrs/wk)",
    difficulty: "Advanced",
    description: "Build the skills needed for modern AI engineering.",
    skills: ["Python", "PyTorch", "Transformers", "Deep Learning", "LLMs", "AI Agents"],
    milestones: [
      { step: 1, title: "Python", skills: "Data structures, OOP, NumPy, vector operations", technology: "python", status: "completed" },
      { step: 2, title: "Machine Learning", skills: "Regression, classification, scikit-learn, evaluation metrics", technology: "machine learning", status: "current" },
      { step: 3, title: "Deep Learning", skills: "Neural networks, PyTorch, CNNs, backpropagation", technology: "pytorch", status: "upcoming" },
      { step: 4, title: "LLMs", skills: "Attention mechanisms, tokenization, Hugging Face, fine-tuning", technology: "openai", status: "upcoming" },
      { step: 5, title: "AI Agents", skills: "LangGraph, autonomous loops, ReAct agents, tool binding", technology: "gemini", status: "upcoming" },
      { step: 6, title: "Projects", skills: "Multi-tenant vector search, latency evaluation, production capstones", technology: "projects", status: "upcoming" },
    ],
    coursesCount: 7,
    projectsCount: 6,
    challengesCount: 12,
    careerOutcome: "AI Engineer, Machine Learning Specialist, Applied AI Architect",
    certificate: "ASCI Certified AI Engineer",
  },
  {
    id: "full-stack-developer",
    slug: "full-stack-developer",
    title: "Full Stack Developer",
    role: "Modern Distributed Web Architecture",
    brand: "react",
    duration: "16 Weeks (12-14 hrs/wk)",
    difficulty: "Intermediate",
    description: "Construct resilient, full-stack applications with React 19, Next.js, and scalable APIs.",
    skills: ["React 19", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS", "Redis"],
    milestones: [
      { step: 1, title: "Web Foundations & TypeScript", skills: "Strict types, DOM lifecycle, event loop", technology: "typescript", status: "completed" },
      { step: 2, title: "Modern React & State", skills: "React 19, hooks, server actions, suspense", technology: "react", status: "current" },
      { step: 3, title: "Full-Stack Next.js Architecture", skills: "App router, SSR/SSG caching, middleware", technology: "nextjs", status: "upcoming" },
      { step: 4, title: "Databases & ORMs", skills: "PostgreSQL schema design, Prisma, Drizzle", technology: "postgresql", status: "upcoming" },
      { step: 5, title: "Real-Time & Caching", skills: "WebSockets, Redis caching, async task queues", technology: "redis", status: "upcoming" },
      { step: 6, title: "Production Capstones", skills: "Collaborative canvas and multi-tenant portal", technology: "projects", status: "upcoming" },
    ],
    coursesCount: 8,
    projectsCount: 7,
    challengesCount: 16,
    careerOutcome: "Full-Stack Engineer, Frontend Architect, Software Engineer",
    certificate: "ASCI Certified Full Stack Developer",
  },
  {
    id: "backend-engineer",
    slug: "backend-engineer",
    title: "Backend Engineer",
    role: "High-Concurrency Services & Storage Engines",
    brand: "go",
    duration: "16 Weeks (12-15 hrs/wk)",
    difficulty: "Advanced",
    description: "Learn how to build systems that scale: concurrency models, consensus, and messaging.",
    skills: ["Go", "Java", "PostgreSQL", "Kafka", "Docker", "gRPC", "Raft"],
    milestones: [
      { step: 1, title: "Language Concurrency & Core", skills: "Goroutines, channels, sync primitives, memory layout", technology: "go", status: "completed" },
      { step: 2, title: "Database Systems & Internals", skills: "B-Trees, WAL logging, ACID isolation, query planner", technology: "postgresql", status: "current" },
      { step: 3, title: "Microservices & RPC", skills: "gRPC, Protobuf, service discovery, distributed tracing", technology: "docker", status: "upcoming" },
      { step: 4, title: "Event Streaming & Queues", skills: "Apache Kafka, partition semantics, idempotency", technology: "redis", status: "upcoming" },
      { step: 5, title: "Distributed Consensus & Raft", skills: "Leader election, replication log, fault tolerance", technology: "kubernetes", status: "upcoming" },
      { step: 6, title: "Production Capstones", skills: "End-to-end Raft cluster implementation in Go", technology: "projects", status: "upcoming" },
    ],
    coursesCount: 6,
    projectsCount: 5,
    challengesCount: 14,
    careerOutcome: "Backend Engineer, Distributed Systems Engineer, Platform Engineer",
    certificate: "ASCI Certified Backend Engineer",
  },
  {
    id: "data-scientist",
    slug: "data-scientist",
    title: "Data Scientist",
    role: "Statistical Modeling, EDA & Predictive Intelligence",
    brand: "python",
    duration: "14 Weeks (10-12 hrs/wk)",
    difficulty: "Intermediate",
    description: "Turn complex data into predictive intelligence with statistical modeling and deep analysis.",
    skills: ["Python", "Pandas", "NumPy", "Scikit-Learn", "SQL", "Tableau", "Statistics"],
    milestones: [
      { step: 1, title: "Advanced Python & Numerical Computing", skills: "NumPy vectorization, Pandas dataframes, indexing", technology: "python", status: "completed" },
      { step: 2, title: "Statistical Foundations & Probability", skills: "Hypothesis testing, distributions, Bayes theorem", technology: "machine learning", status: "current" },
      { step: 3, title: "Exploratory Data Analysis", skills: "Data cleaning, feature transformation, visualization", technology: "python", status: "upcoming" },
      { step: 4, title: "Applied Machine Learning", skills: "Classification, regression, ensemble methods, XGBoost", technology: "machine learning", status: "upcoming" },
      { step: 5, title: "Feature Engineering & Pipelines", skills: "Automated pipelines, feature stores, model drift", technology: "postgresql", status: "upcoming" },
      { step: 6, title: "Real-World Capstones", skills: "Churn prediction, financial anomaly detection", technology: "projects", status: "upcoming" },
    ],
    coursesCount: 6,
    projectsCount: 5,
    challengesCount: 15,
    careerOutcome: "Data Scientist, Quantitative Analyst, BI Engineer",
    certificate: "ASCI Certified Data Scientist",
  },
  {
    id: "ml-engineer",
    slug: "ml-engineer",
    title: "ML Engineer",
    role: "MLOps, Model Deployment & Distributed Training",
    brand: "pytorch",
    duration: "16 Weeks (12-14 hrs/wk)",
    difficulty: "Advanced",
    description: "Deploy, monitor, and scale machine learning models in production environments.",
    skills: ["Python", "PyTorch", "MLflow", "Docker", "Kubernetes", "ONNX", "Triton"],
    milestones: [
      { step: 1, title: "Python & Numerical Systems", skills: "CUDA basics, memory efficiency, tensor layouts", technology: "python", status: "completed" },
      { step: 2, title: "Classical ML & Feature Pipelines", skills: "scikit-learn pipelines, cross-validation, data drift", technology: "machine learning", status: "current" },
      { step: 3, title: "Deep Neural Networks with PyTorch", skills: "Custom autograd functions, distributed training, AMP", technology: "pytorch", status: "upcoming" },
      { step: 4, title: "Model Quantization & Optimization", skills: "TensorRT, ONNX runtime, pruning, INT8 quantization", technology: "docker", status: "upcoming" },
      { step: 5, title: "MLOps, CI/CD & Model Serving", skills: "Triton server, MLflow registry, latency SLAs", technology: "kubernetes", status: "upcoming" },
      { step: 6, title: "Production Capstones", skills: "Sub-10ms inference pipeline with real-time logging", technology: "projects", status: "upcoming" },
    ],
    coursesCount: 7,
    projectsCount: 6,
    challengesCount: 14,
    careerOutcome: "Machine Learning Engineer, MLOps Specialist, Inference Architect",
    certificate: "ASCI Certified ML Engineer",
  },
  {
    id: "frontend-engineer",
    slug: "frontend-engineer",
    title: "Frontend Engineer",
    role: "Design Systems, Performance & Modern Web UI",
    brand: "nextjs",
    duration: "14 Weeks (10-12 hrs/wk)",
    difficulty: "Intermediate",
    description: "Master modern user interfaces, component systems, web performance, and animations.",
    skills: ["TypeScript", "React 19", "Next.js", "Tailwind CSS", "CSS Architecture", "Web Vitals"],
    milestones: [
      { step: 1, title: "Modern JavaScript & TypeScript", skills: "ESNext, generics, async/await, DOM events", technology: "typescript", status: "completed" },
      { step: 2, title: "React 19 Architecture", skills: "Server Components, optimistic UI, custom hooks", technology: "react", status: "current" },
      { step: 3, title: "CSS Mastery & Tailwind Design Systems", skills: "Design tokens, responsive layouts, dark mode", technology: "tailwind", status: "upcoming" },
      { step: 4, title: "Web Performance & Core Vitals", skills: "LCP/INP/CLS optimization, bundle chunking", technology: "nextjs", status: "upcoming" },
      { step: 5, title: "Micro-interactions & Motion", skills: "Framer motion, gestures, SVG animations", technology: "html", status: "upcoming" },
      { step: 6, title: "Production Design Systems", skills: "Accessible headless UI, automated visual regression", technology: "projects", status: "upcoming" },
    ],
    coursesCount: 6,
    projectsCount: 6,
    challengesCount: 15,
    careerOutcome: "Frontend Engineer, UI/UX Engineer, Design Technologist",
    certificate: "ASCI Certified Frontend Engineer",
  },
  {
    id: "cloud-engineer",
    slug: "cloud-engineer",
    title: "Cloud Engineer",
    role: "Cloud Infrastructure, Kubernetes & Terraform",
    brand: "aws",
    duration: "14 Weeks (10-12 hrs/wk)",
    difficulty: "Advanced",
    description: "Architect scalable cloud infrastructure, Kubernetes clusters, and automated DevOps.",
    skills: ["AWS", "Terraform", "Docker", "Kubernetes", "Linux", "CI/CD", "Prometheus"],
    milestones: [
      { step: 1, title: "Linux & Networking Foundations", skills: "TCP/IP, DNS, bash scripting, systemd, SSH", technology: "docker", status: "completed" },
      { step: 2, title: "Cloud Architecture (AWS / GCP)", skills: "VPC design, IAM policies, compute & storage", technology: "aws", status: "current" },
      { step: 3, title: "Containers & Docker", skills: "Multi-stage builds, container isolation, security", technology: "docker", status: "upcoming" },
      { step: 4, title: "Kubernetes Orchestration", skills: "Pods, services, ingress, helm charts, deployments", technology: "kubernetes", status: "upcoming" },
      { step: 5, title: "Infrastructure as Code (Terraform)", skills: "State management, reusable modules, drift detection", technology: "azure", status: "upcoming" },
      { step: 6, title: "Production Cloud Systems", skills: "Multi-region high-availability cluster with observability", technology: "projects", status: "upcoming" },
    ],
    coursesCount: 5,
    projectsCount: 4,
    challengesCount: 12,
    careerOutcome: "Cloud Architect, DevOps Engineer, Site Reliability Engineer (SRE)",
    certificate: "ASCI Certified Cloud Engineer",
  },
]

export function getLearningPathBySlug(slug: string): LearningPath | undefined {
  const normalized = (slug || "").toLowerCase().trim()
  return LEARNING_PATHS.find(
    (p) => p.slug.toLowerCase() === normalized || p.id.toLowerCase() === normalized
  )
}
