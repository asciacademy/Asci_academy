export interface ProjectMilestone {
  step: number
  title: string
  description: string
  deliverables: string[]
}

export type ProjectCategory =
  | "Frontend"
  | "Backend"
  | "AI"
  | "ML"
  | "Data"
  | "Mobile"
  | "Cloud"
  | "DevOps"

export interface GuidedProject {
  id: string
  slug: string
  title: string
  tagline: string
  category: ProjectCategory
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  estimatedHours: string
  technologies: string[]
  skills: string[]
  problemStatement: string
  whatYoullBuild: string
  requirements: string[]
  milestones: ProjectMilestone[]
  evaluationCriteria: string[]
  submissionRequirements: {
    repoRequired: boolean
    liveDemoRequired: boolean
    dockerRequired?: boolean
  }
  portfolioShowcase: {
    headline: string
    badges: string[]
    recruiterTakeaway: string
  }
  enrolledStudents: number
}

export const GUIDED_PROJECTS: GuidedProject[] = [
  {
    id: "proj-job-portal",
    slug: "build-a-job-portal",
    title: "Build a Job Portal",
    tagline: "Build a high-performance opportunity discovery engine with full-text search and recruiter workflows.",
    category: "Frontend",
    difficulty: "Intermediate",
    estimatedHours: "4–6 hours",
    technologies: ["React", "Node.js", "PostgreSQL"],
    skills: ["React 19", "Server Components", "PostgreSQL Schema Design", "REST APIs", "Filter Architecture"],
    enrolledStudents: 1240,
    problemStatement:
      "Modern job platforms suffer from sluggish filters, bloated DOM trees, and unoptimized relational queries when serving thousands of concurrent candidates. In this project, you will build an end-to-end job board with instant keyword search, faceted filters, and responsive applicant tracking.",
    whatYoullBuild:
      "A complete Unstop/LinkedIn-grade hiring portal featuring candidate discovery rails, 7-dimension job filter bars, direct resume attachments, and a recruiter management dashboard with applicant status tracking.",
    requirements: [
      "Basic understanding of modern JavaScript (ES6+) and React component state.",
      "Node.js 18+ and PostgreSQL installed locally or via Supabase/Neon connection string.",
      "Git configured for repository commits.",
    ],
    milestones: [
      {
        step: 1,
        title: "Relational Schema & Node.js API",
        description: "Design PostgreSQL schema for jobs, companies, and applications with indexing on location and salary.",
        deliverables: ["SQL migration script", "Express/Fastify CRUD endpoints", "Input validation middleware"],
      },
      {
        step: 2,
        title: "Faceted Discovery Interface in React",
        description: "Build responsive search bar, multi-select category pills, and clean JobCards.",
        deliverables: ["JobCard component", "FilterBar with query-param state sync", "Debounced search hook"],
      },
      {
        step: 3,
        title: "Recruiter Kanban & Application Flow",
        description: "Implement 1-click candidate application modal and recruiter pipeline stages (Applied → Review → Interview).",
        deliverables: ["Application submission handler", "Recruiter status updater", "Form validation with Zod"],
      },
    ],
    evaluationCriteria: [
      "Filtering through 5,000 jobs completes in under 50ms without UI freeze.",
      "Clean TypeScript definitions across API contracts and frontend props.",
      "Responsive layout tested across mobile (375px) and desktop viewports.",
    ],
    submissionRequirements: {
      repoRequired: true,
      liveDemoRequired: true,
      dockerRequired: false,
    },
    portfolioShowcase: {
      headline: "Engineered High-Throughput Job Marketplace",
      badges: ["React 19", "Full-Stack System", "Database Indexing"],
      recruiterTakeaway: "Demonstrates practical full-stack product engineering with clean architecture and SQL query optimization.",
    },
  },
  {
    id: "proj-api-gateway",
    slug: "high-throughput-api-gateway",
    title: "High-Throughput API Gateway & Rate Limiter",
    tagline: "Build a token-bucket distributed traffic proxy in Go capable of 25k req/s.",
    category: "Backend",
    difficulty: "Intermediate",
    estimatedHours: "6–8 hours",
    technologies: ["Go", "Redis", "Docker", "PostgreSQL"],
    skills: ["Go Concurrency", "Token Bucket Algorithm", "Redis Lua Scripting", "Reverse Proxy"],
    enrolledStudents: 850,
    problemStatement:
      "Microservice architectures require unified edge entrypoints that enforce rate limits, authenticate JWT tokens, and mitigate DDoS spikes with sub-millisecond p99 latency overhead.",
    whatYoullBuild:
      "A distributed reverse proxy gateway in Go that consumes tokens via atomic Redis Lua scripts, proxies requests to backend pools, and exports Prometheus metrics.",
    requirements: [
      "Familiarity with Go syntax, goroutines, and channels.",
      "Docker Desktop installed for spinning up local Redis instances.",
    ],
    milestones: [
      {
        step: 1,
        title: "Reverse Proxy Core & Upstream Pool",
        description: "Construct HTTP reverse proxy in Go with connection pooling and health checks.",
        deliverables: ["Reverse proxy handler", "Round-robin load balancer"],
      },
      {
        step: 2,
        title: "Atomic Redis Token Bucket",
        description: "Implement sliding-window token bucket algorithm with Lua scripts for atomicity.",
        deliverables: ["Redis Lua script", "HTTP 429 Too Many Requests response headers"],
      },
      {
        step: 3,
        title: "Prometheus Telemetry & Benchmarks",
        description: "Add Prometheus /metrics endpoint and benchmark throughput using wrk/k6.",
        deliverables: ["Prometheus exporter", "Benchmark load test report"],
      },
    ],
    evaluationCriteria: [
      "Sustains 20,000 requests/sec with p99 latency under 3ms on localhost.",
      "Zero race conditions during concurrent token consumption.",
    ],
    submissionRequirements: {
      repoRequired: true,
      liveDemoRequired: false,
      dockerRequired: true,
    },
    portfolioShowcase: {
      headline: "Distributed Rate Limiter & Edge Proxy",
      badges: ["Go", "Distributed Systems", "Redis"],
      recruiterTakeaway: "Proves mastery of high-concurrency backend systems and atomic distributed transactions.",
    },
  },
  {
    id: "proj-ai-agent-swarm",
    slug: "autonomous-code-review-swarm",
    title: "Autonomous Multi-Agent Code Review Swarm",
    tagline: "Architect a supervisor-worker AI agent network for automated PR review and linting.",
    category: "AI",
    difficulty: "Advanced",
    estimatedHours: "8–10 hours",
    technologies: ["Python", "OpenAI", "LangGraph", "FastAPI"],
    skills: ["Agentic Loops", "LangGraph", "Tool Calling", "AST Parsing", "GitHub Checks API"],
    enrolledStudents: 920,
    problemStatement:
      "Engineering teams lose hours conducting repetitive code reviews. In this project, you will build an autonomous agent swarm where specialized LLMs (Security, Performance, and Architecture) inspect git diffs.",
    whatYoullBuild:
      "A supervisor-worker AI agent network that receives GitHub pull_request webhooks, orchestrates parallel subagent reviews, and writes inline annotations directly onto code lines.",
    requirements: [
      "Python 3.11+ and virtual environment setup.",
      "API key from OpenAI, Gemini, or local Ollama endpoint.",
    ],
    milestones: [
      {
        step: 1,
        title: "Git Diff Parser & Context Tokenizer",
        description: "Parse unified diffs into clean structured file blocks with line number mapping.",
        deliverables: ["Diff parser module", "Token-budgeted prompt builder"],
      },
      {
        step: 2,
        title: "LangGraph Multi-Agent Architecture",
        description: "Construct supervisor graph that delegates chunks to Security and Performance agents.",
        deliverables: ["LangGraph state definition", "Specialized reviewer agent prompts"],
      },
      {
        step: 3,
        title: "GitHub Webhook & Bot Feedback Loop",
        description: "Deploy FastAPI webhook handler that posts structured GitHub check runs.",
        deliverables: ["FastAPI server", "Inline PR review commenter"],
      },
    ],
    evaluationCriteria: [
      "Zero hallucinated line numbers in code review annotations.",
      "Correctly detects common vulnerabilities: SQL injection, unhandled promise rejections, and memory leaks.",
    ],
    submissionRequirements: {
      repoRequired: true,
      liveDemoRequired: true,
      dockerRequired: true,
    },
    portfolioShowcase: {
      headline: "Autonomous Multi-Agent Code Reviewer",
      badges: ["LangGraph", "AI Agents", "Python"],
      recruiterTakeaway: "Demonstrates practical production-grade AI agent engineering beyond simple chatbot wrappers.",
    },
  },
  {
    id: "proj-fraud-detection",
    slug: "real-time-fraud-detection-pipeline",
    title: "Real-Time Fraud Detection & Inference Pipeline",
    tagline: "Train and deploy sub-15ms machine learning fraud classifiers on streaming financial transactions.",
    category: "ML",
    difficulty: "Advanced",
    estimatedHours: "6–8 hours",
    technologies: ["Python", "PyTorch", "FastAPI", "Docker"],
    skills: ["Feature Engineering", "Model Quantization", "Inference Serving", "Anomaly Detection"],
    enrolledStudents: 670,
    problemStatement:
      "Financial platforms must evaluate transaction fraud risks in real-time without introducing checkout latency. You will build a complete ML inference pipeline with feature extraction and ONNX runtime optimization.",
    whatYoullBuild:
      "A low-latency fraud scoring microservice that receives transaction payloads, computes feature embeddings, evaluates an XGBoost/PyTorch classifier, and logs drift metrics.",
    requirements: [
      "Python 3.10+ with PyTorch and scikit-learn installed.",
      "Basic understanding of classification metrics: Precision, Recall, and ROC-AUC.",
    ],
    milestones: [
      {
        step: 1,
        title: "Data Preprocessing & Feature Pipeline",
        description: "Handle extreme class imbalance using SMOTE and construct automated feature transformers.",
        deliverables: ["Feature extraction script", "Baseline model evaluation report"],
      },
      {
        step: 2,
        title: "Model Quantization & ONNX Export",
        description: "Quantize neural weights to INT8 and benchmark latency reduction.",
        deliverables: ["ONNX model file", "Latency comparison benchmark"],
      },
      {
        step: 3,
        title: "FastAPI Production Inference Server",
        description: "Serve predictions with p99 latency under 15ms with structured error boundaries.",
        deliverables: ["FastAPI application", "Docker container with health checks"],
      },
    ],
    evaluationCriteria: [
      "Achieves > 0.92 ROC-AUC on imbalanced test dataset.",
      "Inference response time under 15ms on standard CPU hardware.",
    ],
    submissionRequirements: {
      repoRequired: true,
      liveDemoRequired: false,
      dockerRequired: true,
    },
    portfolioShowcase: {
      headline: "Real-Time ML Fraud Inference Pipeline",
      badges: ["PyTorch", "MLOps", "ONNX"],
      recruiterTakeaway: "Proves hands-on competence in production ML model serving and latency constraints.",
    },
  },
  {
    id: "proj-lakehouse-etl",
    slug: "high-speed-analytics-lakehouse",
    title: "High-Speed Analytics Lakehouse & ETL Pipeline",
    tagline: "Construct a columnar data warehouse ingestion pipeline with automated schema migrations.",
    category: "Data",
    difficulty: "Intermediate",
    estimatedHours: "6–8 hours",
    technologies: ["Python", "PostgreSQL", "ClickHouse", "Docker"],
    skills: ["Columnar Databases", "ETL Pipelines", "Data Modeling", "SQL Aggregations"],
    enrolledStudents: 540,
    problemStatement:
      "Operational databases degrade when handling large analytical aggregations. You will design a change-data-capture (CDC) pipeline that transforms relational writes into columnar ClickHouse tables for sub-second analytical queries.",
    whatYoullBuild:
      "An automated data ingestion engine that syncs transactional records into an analytical lakehouse and provides high-speed aggregation endpoints for executive business dashboards.",
    requirements: [
      "Comfort with complex SQL queries (Window functions, CTEs).",
      "Docker for running PostgreSQL and ClickHouse containers.",
    ],
    milestones: [
      {
        step: 1,
        title: "Transactional Seed & CDC Ingestion",
        description: "Generate 1,000,000 synthetic transaction records and stream changes via CDC.",
        deliverables: ["Data generator script", "CDC pipeline worker"],
      },
      {
        step: 2,
        title: "ClickHouse Columnar Schema Design",
        description: "Design MergeTree tables with partition keys optimized for temporal analysis.",
        deliverables: ["ClickHouse schema DDL", "Aggregation query benchmarks"],
      },
      {
        step: 3,
        title: "Analytics API & Dashboard Service",
        description: "Expose sub-50ms aggregation endpoints for time-series charts.",
        deliverables: ["Python analytics API", "Query latency comparison chart"],
      },
    ],
    evaluationCriteria: [
      "Analytical aggregations on 1M rows complete in under 50ms in ClickHouse vs 1.2s in vanilla Postgres.",
      "Zero missing records during pipeline failover tests.",
    ],
    submissionRequirements: {
      repoRequired: true,
      liveDemoRequired: false,
      dockerRequired: true,
    },
    portfolioShowcase: {
      headline: "Columnar Lakehouse Analytics Engine",
      badges: ["ClickHouse", "Data Engineering", "PostgreSQL"],
      recruiterTakeaway: "Demonstrates practical data platform engineering and columnar storage optimization.",
    },
  },
  {
    id: "proj-mobile-workspace",
    slug: "cross-platform-student-workspace",
    title: "Cross-Platform Offline-First Student Workspace",
    tagline: "Build a fluid mobile code & notes companion with local SQLite replication and gestures.",
    category: "Mobile",
    difficulty: "Intermediate",
    estimatedHours: "8–10 hours",
    technologies: ["React", "TypeScript", "Tailwind", "PostgreSQL"],
    skills: ["Offline-First Architecture", "Local Storage", "Gesture Handlers", "Responsive UI"],
    enrolledStudents: 490,
    problemStatement:
      "Students often code and study in intermittent connectivity conditions. You will build a mobile-first progressive application with background synchronization and local-first persistence.",
    whatYoullBuild:
      "A cross-platform mobile app featuring offline code katas, markdown notes, instant search, and background sync when internet connection resumes.",
    requirements: [
      "Node.js 18+ and mobile browser or simulator.",
      "Familiarity with React hooks and local state.",
    ],
    milestones: [
      {
        step: 1,
        title: "Offline Storage Engine & Local Sync",
        description: "Set up local IndexedDB/SQLite storage with optimistic UI updates.",
        deliverables: ["Storage adapter", "Mutation queue"],
      },
      {
        step: 2,
        title: "Mobile Gesture & Card Interface",
        description: "Build swipeable challenge cards and dark mode syntax viewer.",
        deliverables: ["Swipe gesture components", "Mobile code viewer"],
      },
      {
        step: 3,
        title: "Background Synchronization Worker",
        description: "Sync pending mutations with cloud database on network reconnection.",
        deliverables: ["Network status listener", "Conflict resolution strategy"],
      },
    ],
    evaluationCriteria: [
      "Full app functionality operates smoothly in 100% Airplane Mode.",
      "Zero data collisions when syncing offline modifications.",
    ],
    submissionRequirements: {
      repoRequired: true,
      liveDemoRequired: true,
      dockerRequired: false,
    },
    portfolioShowcase: {
      headline: "Offline-First Mobile Engineering Companion",
      badges: ["React", "Mobile Architecture", "Offline Sync"],
      recruiterTakeaway: "Demonstrates advanced local-first architecture and resilient offline state management.",
    },
  },
  {
    id: "proj-k8s-cluster",
    slug: "multi-region-kubernetes-cluster",
    title: "Multi-Region Kubernetes Cluster & Ingress",
    tagline: "Provision automated cloud infrastructure with Terraform, Helm charts, and TLS cert managers.",
    category: "Cloud",
    difficulty: "Advanced",
    estimatedHours: "6–8 hours",
    technologies: ["AWS", "Kubernetes", "Docker", "Git"],
    skills: ["Infrastructure as Code", "Terraform", "Kubernetes Ingress", "SSL/TLS Automation"],
    enrolledStudents: 710,
    problemStatement:
      "Manual server provisioning is error-prone and unscalable. You will write declarative Terraform configurations and Kubernetes manifests to deploy highly available microservices across cloud availability zones.",
    whatYoullBuild:
      "A production-ready infrastructure repo containing Terraform modules for VPC and EKS/GKE clusters, Traefik ingress controller, and automated Let's Encrypt TLS certificates.",
    requirements: [
      "Terraform CLI and kubectl installed.",
      "Basic understanding of containerization and cloud networking (VPC, Subnets).",
    ],
    milestones: [
      {
        step: 1,
        title: "Terraform Infrastructure Modules",
        description: "Declare modular VPC, public/private subnets, and Kubernetes cluster resources.",
        deliverables: ["Terraform main.tf", "Reusable networking module"],
      },
      {
        step: 2,
        title: "Ingress Controller & Cert-Manager",
        description: "Deploy ingress controller with automated Let's Encrypt certificate renewal.",
        deliverables: ["Helm values configuration", "Ingress manifest"],
      },
      {
        step: 3,
        title: "Horizontal Pod Autoscaling & Drills",
        description: "Configure HPA based on CPU/memory metrics and simulate pod node failure.",
        deliverables: ["HPA manifest", "Resilience drill runbook"],
      },
    ],
    evaluationCriteria: [
      "Terraform plan completes cleanly with 0 syntax warnings.",
      "Services remain available with 0 dropped requests during rolling deployment updates.",
    ],
    submissionRequirements: {
      repoRequired: true,
      liveDemoRequired: false,
      dockerRequired: true,
    },
    portfolioShowcase: {
      headline: "Cloud Infrastructure as Code & Kubernetes",
      badges: ["Kubernetes", "Terraform", "Cloud Architecture"],
      recruiterTakeaway: "Demonstrates production DevOps and declarative cloud infrastructure engineering.",
    },
  },
  {
    id: "proj-devops-cicd",
    slug: "zero-downtime-blue-green-pipeline",
    title: "Zero-Downtime Blue-Green Deployment Engine",
    tagline: "Engineer an automated CI/CD pipeline with GitHub Actions, container scans, and instant rollback.",
    category: "DevOps",
    difficulty: "Intermediate",
    estimatedHours: "4–6 hours",
    technologies: ["Docker", "Git", "GitHub", "Linux"],
    skills: ["CI/CD Pipelines", "Container Security", "Blue-Green Deployment", "Bash Scripting"],
    enrolledStudents: 630,
    problemStatement:
      "Deploying updates without downtime is a core requirement of modern web scale. You will build a continuous delivery pipeline that verifies unit tests, scans Docker images for CVEs, and switches traffic seamlessly.",
    whatYoullBuild:
      "A GitHub Actions CI/CD automation workflow and Nginx blue-green routing script that eliminates downtime during production deployments.",
    requirements: [
      "GitHub account with repository access.",
      "Basic bash scripting and Docker container familiarity.",
    ],
    milestones: [
      {
        step: 1,
        title: "Automated Testing & Security Linting",
        description: "Configure GitHub Actions workflow to run linting, unit tests, and vulnerability scans.",
        deliverables: [".github/workflows/deploy.yml", "Trivy container scan step"],
      },
      {
        step: 2,
        title: "Blue-Green Container Orchestration",
        description: "Deploy secondary container pool alongside live pool and verify health endpoints.",
        deliverables: ["Docker Compose blue-green config", "Deployment health check script"],
      },
      {
        step: 3,
        title: "Traffic Switch & Instant Rollback",
        description: "Re-point Nginx reverse proxy to new pool with automated rollback on failure.",
        deliverables: ["Nginx reload script", "Rollback trigger hook"],
      },
    ],
    evaluationCriteria: [
      "Zero HTTP 502/503 errors measured during live continuous deployment load tests.",
      "Automated rollback triggered in under 5 seconds if health check returns non-200.",
    ],
    submissionRequirements: {
      repoRequired: true,
      liveDemoRequired: false,
      dockerRequired: true,
    },
    portfolioShowcase: {
      headline: "Zero-Downtime CI/CD Deployment Engine",
      badges: ["CI/CD", "Docker", "DevOps"],
      recruiterTakeaway: "Shows practical enterprise deployment automation and reliability engineering skills.",
    },
  },
]

export function getProjectBySlug(slug: string): GuidedProject | undefined {
  const normalized = (slug || "").toLowerCase().trim()
  return GUIDED_PROJECTS.find(
    (p) => p.slug.toLowerCase() === normalized || p.id.toLowerCase() === normalized
  )
}
