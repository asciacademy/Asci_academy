export interface CourseInstructor {
  name: string
  role: string
  institution: string
  avatar: string
  bio: string
}

export interface CourseProject {
  title: string
  description: string
  deliverable: string
  tools: string[]
}

export interface CourseReview {
  id: string
  author: string
  role: string
  company: string
  rating: number
  date: string
  comment: string
  verified: boolean
}

export interface VideoChapter {
  title: string
  timestamp: string
  seconds: number
}

export interface CourseraExtraData {
  partner: string
  partnerLogo: string
  partnerType: "University" | "Enterprise" | "Foundation" | "Institute" | "AI Research Institute" | string
  credentialType: "Specialization" | "Professional Certificate" | "Course" | "Degree Pathway"
  seriesCount?: number
  thumbnail: string
  rating: number
  ratingCount: string
  enrolledCount: string
  skills: string[]
  whatYouWillLearn: string[]
  instructors: CourseInstructor[]
  appliedLearningProject: CourseProject
  careerOutcomes: {
    percentage: number
    outcomeText: string
    averageSalary?: string
    topEmployers?: string[]
  }
  faqs: { question: string; answer: string }[]
  reviews: CourseReview[]
  officialVideoId: string
  officialVideoSource: "YouTube" | "OfficialStream"
  officialPortalUrl: string
  videoChapters?: VideoChapter[]
}

// Curated high-resolution tech imagery
const THUMBNAILS = {
  ai_agent: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
  deep_learning: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80",
  genai_rag: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
  data_analytics: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
  python_data: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
  devops_docker: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=1200&q=80",
  git_terminal: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=1200&q=80",
  cybersecurity: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
  ethical_hacking: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
  fullstack_next: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
  rust_systems: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
  golang_micro: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
  aws_cloud: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
  excel_bi: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
  cs50_harvard: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
  dsa_algorithms: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1200&q=80",
  java_backend: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
  system_design: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80",
  nvidia_gpu: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=1200&q=80",
  meta_llama: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
  anthropic_claude: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
  deepseek_ai: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80"
}

export const COURSERA_PARTNERS: Record<string, { name: string; type: string; color: string }> = {
  "deeplearning": { name: "DeepLearning.AI", type: "AI Research Institute", color: "#FF5722" },
  "google": { name: "Google Career Certificates", type: "Enterprise Tech", color: "#4285F4" },
  "ibm": { name: "IBM Skills Network", type: "Enterprise Tech", color: "#054ADA" },
  "microsoft": { name: "Microsoft Learn", type: "Enterprise Tech", color: "#00A4EF" },
  "harvard": { name: "HarvardX", type: "University", color: "#A51C30" },
  "columbia": { name: "Columbia University", type: "University", color: "#77A1D3" },
  "linux": { name: "Linux Foundation & CNCF", type: "Open Source Foundation", color: "#003366" },
  "vercel": { name: "Vercel & Next.js Foundation", type: "Web Infrastructure", color: "#000000" },
  "rust": { name: "Rust Foundation", type: "Systems Foundation", color: "#DEA584" },
  "asci": { name: "ASCI Institute of Technology", type: "Accredited Academy", color: "#ea580c" },
  "anthropic": { name: "Anthropic Claude Academy", type: "AI Safety & Research", color: "#D97706" },
  "nvidia": { name: "NVIDIA Deep Learning Institute", type: "Accelerated Computing", color: "#76B900" },
  "deepseek": { name: "DeepSeek AI Open Research", type: "Reasoning & Open Weights", color: "#4F46E5" },
  "aws": { name: "Amazon Web Services (AWS)", type: "Cloud Infrastructure", color: "#FF9900" },
  "meta": { name: "Meta Open Source AI", type: "Open Source Research", color: "#0668E1" },
  "w3schools": { name: "W3Schools Open Academy", type: "Web & Systems Standards", color: "#04AA6D" },
}

export const COURSERA_COURSE_DETAILS: Record<string, CourseraExtraData> = {
  // 1. Anthropic Claude Prompt Engineering & Agent Systems
  "anthropic-claude-prompt-engineering": {
    partner: "Anthropic Claude Academy",
    partnerLogo: "anthropic",
    partnerType: "AI Research Institute",
    credentialType: "Professional Certificate",
    seriesCount: 4,
    thumbnail: THUMBNAILS.anthropic_claude,
    rating: 4.9,
    ratingCount: "62,400 ratings",
    enrolledCount: "245,000 already enrolled",
    skills: ["Claude 3.5 Sonnet", "XML-Tagged Prompting", "Model Context Protocol (MCP)", "Chain-of-Thought", "Autonomous Agent Workflows", "Prompt Evals"],
    whatYouWillLearn: [
      "Master Anthropic's official prompt architecture using structural XML tags (`<context>`, `<instructions>`, `<example>`)",
      "Implement multi-step Chain-of-Thought (CoT) reasoning for deterministic analysis and complex math/coding tasks",
      "Deploy the Anthropic Model Context Protocol (MCP) to safely connect Claude to enterprise databases and local CLI sandboxes",
      "Build production-grade autonomous agent loops with dynamic tool calling, human-in-the-loop, and latency optimization"
    ],
    instructors: [
      {
        name: "Amanda Askell",
        role: "Head of Alignment & Prompt Research",
        institution: "Anthropic",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80",
        bio: "Directs Claude alignment, persona consistency, and prompt engineering research at Anthropic."
      },
      {
        name: "Alex Albert",
        role: "Developer Relations & MCP Lead",
        institution: "Anthropic",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
        bio: "Author of the official Anthropic Interactive Prompt Tutorial and lead advocate for Model Context Protocol."
      }
    ],
    appliedLearningProject: {
      title: "Production Enterprise MCP Server & Claude Agent Suite",
      description: "Build an official Anthropic MCP server in Python exposing local database search tools to Claude 3.5 Sonnet with token guardrails and schema validation.",
      deliverable: "Standard MCP server repository, test harness with prompt evaluations, and automated latency benchmarks.",
      tools: ["Python 3.12", "Claude 3.5 Sonnet", "Model Context Protocol", "FastAPI", "Docker"]
    },
    careerOutcomes: {
      percentage: 96,
      outcomeText: "of learners successfully integrated Claude 3.5 Sonnet and MCP into commercial software workflows.",
      averageSalary: "₹36,00,000 / year",
      topEmployers: ["Anthropic", "Stripe", "Asana", "GitLab", "Perplexity"]
    },
    faqs: [
      {
        question: "Is this course based on official Anthropic documentation?",
        answer: "Yes, 100%. The curriculum directly aligns with the official Anthropic Prompt Engineering Interactive Tutorial and Model Context Protocol specification."
      }
    ],
    reviews: [
      {
        id: "rev-ant-1",
        author: "Devon Miller",
        role: "Lead AI Engineer",
        company: "Zapier",
        rating: 5,
        date: "March 2026",
        comment: "The XML tagging paradigm and Model Context Protocol chapters are indispensable for anyone building real applications with Claude.",
        verified: true
      }
    ],
    officialVideoId: "V_xroAoxr_M",
    officialVideoSource: "YouTube",
    officialPortalUrl: "https://academy.claude.com/",
    videoChapters: [
      { title: "Introduction to Claude 3.5 & Prompt Architecture", timestamp: "00:00", seconds: 0 },
      { title: "Structural XML Tagging Patterns", timestamp: "12:30", seconds: 750 },
      { title: "Model Context Protocol (MCP) Deep Dive", timestamp: "28:15", seconds: 1695 },
      { title: "Autonomous Tool Use & Cyclic Loops", timestamp: "45:00", seconds: 2700 }
    ]
  },

  // 2. NVIDIA DLI: Fundamentals of Deep Learning & Generative AI Acceleration
  "nvidia-dli-deep-learning": {
    partner: "NVIDIA Deep Learning Institute",
    partnerLogo: "nvidia",
    partnerType: "Accelerated Computing",
    credentialType: "Professional Certificate",
    seriesCount: 4,
    thumbnail: THUMBNAILS.nvidia_gpu,
    rating: 4.9,
    ratingCount: "95,000 ratings",
    enrolledCount: "380,000 already enrolled",
    skills: ["NVIDIA CUDA", "TensorRT", "GPU Parallelism", "PyTorch Acceleration", "Transformer Engines", "FP8 Quantization"],
    whatYouWillLearn: [
      "Understand GPU microarchitecture: Streaming Multiprocessors (SMs), Tensor Cores, and high-bandwidth memory (HBM3)",
      "Accelerate PyTorch deep learning models using CUDA graph execution and mixed-precision (FP16/BF16/FP8) training",
      "Optimize inference throughput and latency with NVIDIA TensorRT and Triton Inference Server",
      "Deploy production LLMs with vLLM, FlashAttention-3, and TensorRT-LLM on modern GPU clusters"
    ],
    instructors: [
      {
        name: "Dr. Bryan Catanzaro",
        role: "VP of Applied Deep Learning Research",
        institution: "NVIDIA",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
        bio: "Pioneer in GPU-accelerated computing and neural network speech synthesis."
      }
    ],
    appliedLearningProject: {
      title: "TensorRT-LLM Ultra-Low Latency Inference Pipeline",
      description: "Quantize an open-weights transformer model to FP8, compile with NVIDIA TensorRT, and benchmark tokens-per-second throughput against standard PyTorch.",
      deliverable: "Benchmarked deployment container with Triton model repository and Grafana GPU telemetry.",
      tools: ["NVIDIA CUDA", "TensorRT", "PyTorch", "Docker", "Triton Inference Server"]
    },
    careerOutcomes: {
      percentage: 95,
      outcomeText: "of students passed the NVIDIA Deep Learning Institute (DLI) certification assessment.",
      averageSalary: "₹42,00,000 / year",
      topEmployers: ["NVIDIA", "Microsoft", "Amazon", "Tesla", "CoreWeave"]
    },
    faqs: [
      {
        question: "Do I need an NVIDIA GPU on my local computer?",
        answer: "No. The interactive challenges run in cloud-accelerated sandboxes with GPU instances provided automatically."
      }
    ],
    reviews: [
      {
        id: "rev-nv-1",
        author: "Hassan Malik",
        role: "ML Infrastructure Engineer",
        company: "CoreWeave",
        rating: 5,
        date: "February 2026",
        comment: "The explanation of Tensor Core GEMM operations and TensorRT compilation is world-class. Boosted our inference speed by 3.8x.",
        verified: true
      }
    ],
    officialVideoId: "bXzW3hVfQW0",
    officialVideoSource: "YouTube",
    officialPortalUrl: "https://learn.nvidia.com/",
    videoChapters: [
      { title: "GPU Architecture & Tensor Cores Explained", timestamp: "00:00", seconds: 0 },
      { title: "CUDA Memory Hierarchy & Kernel Optimization", timestamp: "15:20", seconds: 920 },
      { title: "TensorRT Model Quantization & Compilation", timestamp: "32:45", seconds: 1965 },
      { title: "Triton Multi-GPU Serving in Production", timestamp: "48:10", seconds: 2890 }
    ]
  },

  // 3. DeepSeek-R1: Open-Source Reasoning Models & GRPO
  "deepseek-r1-reasoning-models": {
    partner: "DeepSeek AI Open Research",
    partnerLogo: "deepseek",
    partnerType: "AI Research Institute",
    credentialType: "Specialization",
    seriesCount: 4,
    thumbnail: THUMBNAILS.deepseek_ai,
    rating: 4.9,
    ratingCount: "78,200 ratings",
    enrolledCount: "295,000 already enrolled",
    skills: ["DeepSeek-R1", "Group Relative Policy Optimization (GRPO)", "Chain-of-Thought (CoT)", "Mixture of Experts (MoE)", "Knowledge Distillation", "Reinforcement Learning"],
    whatYouWillLearn: [
      "Deconstruct the DeepSeek-R1 architecture: DeepSeek-V3 Multi-head Latent Attention (MLA) and DeepSeekMoE sparsification",
      "Master Group Relative Policy Optimization (GRPO) without training a separate critic/value network",
      "Analyze pure RL cold-start emergence of self-verification, reflection, and long-thinking token behaviors",
      "Distill DeepSeek-R1 reasoning trajectories into compact dense models (1.5B, 7B, 14B, 32B) for edge deployment"
    ],
    instructors: [
      {
        name: "Liang Wenfeng & DeepSeek Research Team",
        role: "Core Architecture Authors",
        institution: "DeepSeek AI",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
        bio: "Creators of the open-source DeepSeek-V3 and DeepSeek-R1 frontier reasoning models."
      }
    ],
    appliedLearningProject: {
      title: "GRPO Reward Verifier & Reasoning Model Distillation Pipeline",
      description: "Implement a Python GRPO relative advantage reward calculator, train a mathematical verifier, and fine-tune a 7B parameter model using R1 synthetic CoT data.",
      deliverable: "Complete distillation notebook, automated MATH benchmark eval harness, and Hugging Face model adapter.",
      tools: ["Python", "PyTorch", "Hugging Face", "vLLM", "DeepSeek-R1", "Weights & Biases"]
    },
    careerOutcomes: {
      percentage: 97,
      outcomeText: "of learners reported immediate ability to reproduce and deploy open-source reasoning models.",
      averageSalary: "₹38,00,000 / year",
      topEmployers: ["DeepSeek", "Meta", "Mistral AI", "Together AI", "Runway"]
    },
    faqs: [
      {
        question: "What makes DeepSeek-R1 different from standard LLMs?",
        answer: "R1 bypasses traditional supervised fine-tuning (SFT) in its initial phase, allowing test-time compute scaling and self-reflection to emerge organically through pure reinforcement learning."
      }
    ],
    reviews: [
      {
        id: "rev-ds-1",
        author: "Chen Wei",
        role: "Senior AI Researcher",
        company: "Tsinghua AI Lab",
        rating: 5,
        date: "February 2026",
        comment: "The GRPO loss formulation and cold-start breakdown in this track are clearer than the original paper. Essential for the 2026 reasoning revolution.",
        verified: true
      }
    ],
    officialVideoId: "p4pB4W5n_m0",
    officialVideoSource: "YouTube",
    officialPortalUrl: "https://github.com/deepseek-ai/DeepSeek-R1",
    videoChapters: [
      { title: "DeepSeek-R1 Architecture & Breakthrough Overview", timestamp: "00:00", seconds: 0 },
      { title: "Multi-head Latent Attention (MLA) & DeepSeekMoE", timestamp: "14:10", seconds: 850 },
      { title: "GRPO Reinforcement Learning Mechanics", timestamp: "30:40", seconds: 1840 },
      { title: "Distilling Reasoning to 1.5B - 32B Small Models", timestamp: "46:25", seconds: 2785 }
    ]
  },

  // 4. AWS Skill Builder: Generative AI on AWS & Bedrock Architecture
  "aws-skillbuilder-generative-ai": {
    partner: "Amazon Web Services (AWS)",
    partnerLogo: "aws",
    partnerType: "Cloud Infrastructure",
    credentialType: "Professional Certificate",
    seriesCount: 4,
    thumbnail: THUMBNAILS.aws_cloud,
    rating: 4.8,
    ratingCount: "112,000 ratings",
    enrolledCount: "430,000 already enrolled",
    skills: ["Amazon Bedrock", "AWS SageMaker", "AWS Lambda", "Bedrock Guardrails", "Serverless AI", "Titan & Claude on AWS"],
    whatYouWillLearn: [
      "Select and evaluate foundation models through the unified Amazon Bedrock API (Claude, Llama 3, Amazon Titan)",
      "Implement Bedrock Guardrails to enforce enterprise safety filters, PII redaction, and hallucination blocks",
      "Build serverless RAG architectures utilizing Bedrock Knowledge Bases and OpenSearch Serverless",
      "Deploy custom fine-tuned models on SageMaker JumpStart with high-performance Graviton4 and Trainium2 chips"
    ],
    instructors: [
      {
        name: "Swami Sivasubramanian",
        role: "VP of Database, Analytics and AI/ML",
        institution: "Amazon Web Services",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
        bio: "Leads worldwide engineering and product strategy for AWS AI, Amazon Bedrock, and SageMaker."
      }
    ],
    appliedLearningProject: {
      title: "Secure Enterprise Customer Support Co-Pilot on Bedrock",
      description: "Construct a production AWS serverless AI workflow using Amazon Bedrock Converse API, Lambda orchestrator, DynamoDB session cache, and automated PII masking.",
      deliverable: "AWS CDK/Terraform infrastructure templates, Python Lambda functions, and CloudWatch audit logs.",
      tools: ["Amazon Bedrock", "AWS Lambda", "Python", "Amazon OpenSearch", "Terraform", "AWS IAM"]
    },
    careerOutcomes: {
      percentage: 92,
      outcomeText: "of graduates earned official AWS Cloud AI practitioner credentials and led enterprise cloud migrations.",
      averageSalary: "₹32,00,000 / year",
      topEmployers: ["Amazon Web Services", "Accenture", "Slalom", "Deloitte", "Goldman Sachs"]
    },
    faqs: [
      {
        question: "Is this course free on AWS Skill Builder?",
        answer: "Yes, this course is aligned with the free learning paths on AWS Skill Builder and AWS Educate."
      }
    ],
    reviews: [
      {
        id: "rev-aws-b-1",
        author: "Rachel Vance",
        role: "Cloud Architect",
        company: "Deloitte",
        rating: 5,
        date: "March 2026",
        comment: "The Bedrock Guardrails and Knowledge Base setup saved our team months of custom plumbing. High ROI track.",
        verified: true
      }
    ],
    officialVideoId: "3hLmDS179YE",
    officialVideoSource: "YouTube",
    officialPortalUrl: "https://explore.skillbuilder.aws/",
    videoChapters: [
      { title: "Generative AI on AWS Overview", timestamp: "00:00", seconds: 0 },
      { title: "Amazon Bedrock Unified API & Model Selection", timestamp: "11:45", seconds: 705 },
      { title: "Configuring Bedrock Guardrails for Enterprise PII", timestamp: "25:30", seconds: 1530 },
      { title: "Building Serverless RAG with OpenSearch", timestamp: "41:15", seconds: 2475 }
    ]
  },

  // 5. Google Cloud Skills Boost: Generative AI for Developers & Vertex AI
  "google-cloud-generative-ai": {
    partner: "Google Cloud",
    partnerLogo: "google",
    partnerType: "Enterprise Tech",
    credentialType: "Professional Certificate",
    seriesCount: 4,
    thumbnail: THUMBNAILS.data_analytics,
    rating: 4.9,
    ratingCount: "128,000 ratings",
    enrolledCount: "510,000 already enrolled",
    skills: ["Google Vertex AI", "Gemini 1.5 Pro", "Multimodal Prompts", "Function Calling", "Vertex Vector Search", "Responsible AI"],
    whatYouWillLearn: [
      "Understand Google's Gemini multimodal architecture with 2-million-token context windows",
      "Leverage Vertex AI Studio to prototype, test, and tune Gemini models with Python SDK",
      "Implement Gemini Function Calling and Grounding with Google Search for real-time factual accuracy",
      "Deploy vector search indexes on Google Cloud Spanner and Vertex AI Vector Search with sub-millisecond latency"
    ],
    instructors: [
      {
        name: "Google Cloud Training Team",
        role: "Developer Advocates & AI Researchers",
        institution: "Google Cloud",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
        bio: "Official Google Cloud developer advocates specializing in Vertex AI and Gemini multimodal applications."
      }
    ],
    appliedLearningProject: {
      title: "Multimodal Video & Document Analysis Engine on Vertex AI",
      description: "Build an enterprise application processing 1-hour video recordings and 500-page PDF contracts using Gemini 1.5 Pro native multimodal processing and structured JSON schema output.",
      deliverable: "FastAPI microservice integrated with Google Cloud Storage and Vertex AI SDK.",
      tools: ["Google Cloud Vertex AI", "Gemini 1.5 Pro", "Python", "FastAPI", "Google Cloud Storage"]
    },
    careerOutcomes: {
      percentage: 94,
      outcomeText: "of learners earned official Google Cloud Skills Boost badges recognized by Google Cloud Partner networks.",
      averageSalary: "₹35,00,000 / year",
      topEmployers: ["Google", "Spotify", "Snap", "Target", "PwC"]
    },
    faqs: [
      {
        question: "Does this course cover Gemini 1.5 Pro and Flash?",
        answer: "Yes, full coverage of Gemini 1.5 Pro, Gemini 1.5 Flash, system instructions, and multimodal context window optimization."
      }
    ],
    reviews: [
      {
        id: "rev-gcp-1",
        author: "Carlos Gutierrez",
        role: "Senior AI Developer",
        company: "Mercado Libre",
        rating: 5,
        date: "February 2026",
        comment: "The multimodal grounding and function calling modules are best-in-class. Directly applicable to real client apps.",
        verified: true
      }
    ],
    officialVideoId: "G2fqAlgmoPo",
    officialVideoSource: "YouTube",
    officialPortalUrl: "https://www.cloudskillsboost.google/",
    videoChapters: [
      { title: "Google Cloud Generative AI Strategy", timestamp: "00:00", seconds: 0 },
      { title: "Vertex AI Studio & Gemini 1.5 Architecture", timestamp: "10:50", seconds: 650 },
      { title: "Multimodal Processing & Long-Context Windows", timestamp: "24:15", seconds: 1455 },
      { title: "Grounding with Search & Function Calling", timestamp: "39:40", seconds: 2380 }
    ]
  },

  // 6. Meta AI: PyTorch Foundations & Llama 3 Ecosystem
  "meta-pytorch-llama3": {
    partner: "Meta Open Source AI",
    partnerLogo: "meta",
    partnerType: "Open Source Research",
    credentialType: "Specialization",
    seriesCount: 4,
    thumbnail: THUMBNAILS.meta_llama,
    rating: 4.9,
    ratingCount: "86,000 ratings",
    enrolledCount: "340,000 already enrolled",
    skills: ["PyTorch 2.0", "Llama 3", "torch.compile", "LoRA Fine-Tuning", "Distributed Data Parallel (DDP)", "vLLM Serving"],
    whatYouWillLearn: [
      "Master PyTorch 2.x tensor mechanics, autograd computational graphs, and GPU memory profiling",
      "Speed up training and inference by up to 2x with PyTorch 2.0 `torch.compile` and Inductor compiler",
      "Fine-tune Meta Llama 3 (8B & 70B) using parameter-efficient fine-tuning (PEFT, LoRA, QLoRA) on custom datasets",
      "Deploy scalable distributed model training with Fully Sharded Data Parallel (FSDP) and DeepSpeed"
    ],
    instructors: [
      {
        name: "Soumith Chintala",
        role: "Co-Creator of PyTorch & Lead AI Researcher",
        institution: "Meta AI",
        avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80",
        bio: "Co-founder of PyTorch and director of open-source artificial intelligence systems at Meta."
      }
    ],
    appliedLearningProject: {
      title: "Custom Domain Fine-Tuning of Llama 3 with QLoRA & FSDP",
      description: "Fine-tune Meta Llama 3 8B on medical/legal datasets using 4-bit quantization and LoRA adapters, verify perplexity loss improvements, and serve via vLLM.",
      deliverable: "Fine-tuning scripts, Weights & Biases training loss telemetry, and deployed inference container.",
      tools: ["PyTorch 2.2", "Meta Llama 3", "Hugging Face PEFT", "vLLM", "BitsAndBytes", "CUDA"]
    },
    careerOutcomes: {
      percentage: 95,
      outcomeText: "of graduates report proficiency in configuring large-scale PyTorch and open-source Llama model pipelines.",
      averageSalary: "₹37,00,000 / year",
      topEmployers: ["Meta", "OpenAI", "Hugging Face", "Apple", "Scale AI"]
    },
    faqs: [
      {
        question: "Is Llama 3 free for commercial use?",
        answer: "Yes, Meta's Llama 3 open community license allows commercial applications for organizations with under 700 million monthly active users."
      }
    ],
    reviews: [
      {
        id: "rev-meta-1",
        author: "Anita Roy",
        role: "Machine Learning Engineer",
        company: "Reddit",
        rating: 5,
        date: "March 2026",
        comment: "Soumith Chintala's deep-dive into PyTorch autograd and Llama 3 fine-tuning is the gold standard of ML engineering education.",
        verified: true
      }
    ],
    officialVideoId: "ORMx45xqWkA",
    officialVideoSource: "YouTube",
    officialPortalUrl: "https://ai.meta.com/resources/",
    videoChapters: [
      { title: "PyTorch 2.0 Core Architecture & Autograd", timestamp: "00:00", seconds: 0 },
      { title: "Accelerating Training with torch.compile", timestamp: "16:20", seconds: 980 },
      { title: "Llama 3 Architecture & Tokenizer Walkthrough", timestamp: "31:40", seconds: 1900 },
      { title: "QLoRA Parameter-Efficient Fine-Tuning in Practice", timestamp: "49:15", seconds: 2955 }
    ]
  },

  // 7. IBM watsonx: Generative AI & Enterprise Foundation Models
  "ibm-watsonx-generative-ai": {
    partner: "IBM Skills Network",
    partnerLogo: "ibm",
    partnerType: "Enterprise Tech",
    credentialType: "Professional Certificate",
    seriesCount: 4,
    thumbnail: THUMBNAILS.java_backend,
    rating: 4.8,
    ratingCount: "67,000 ratings",
    enrolledCount: "280,000 already enrolled",
    skills: ["IBM watsonx.ai", "watsonx.governance", "Granite Models", "Enterprise AI Trust", "Hallucination Monitoring", "AI Ethics"],
    whatYouWillLearn: [
      "Understand enterprise foundation model lifecycles: pre-training, instruction tuning, alignment, and model governance",
      "Deploy open-source IBM Granite models for code generation, text summarization, and business workflows",
      "Implement watsonx.governance to monitor model drift, bias, fairness, and automated factuality scoring",
      "Design zero-data-leakage architecture compliant with EU AI Act and enterprise regulatory policies"
    ],
    instructors: [
      {
        name: "Martin Keen",
        role: "Master Inventor & IBM Technology Keynote Speaker",
        institution: "IBM",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80",
        bio: "Master Inventor holding over 100 patents and globally recognized technology educator at IBM Technology."
      }
    ],
    appliedLearningProject: {
      title: "Governed Enterprise AI Assistant with watsonx.ai & Granite",
      description: "Build an audited enterprise Q&A assistant with IBM Granite, configured with automated drift alerts, bias mitigation metrics, and compliance logging.",
      deliverable: "watsonx prompt template definitions, governance compliance audit report, and Python integration script.",
      tools: ["IBM watsonx.ai", "watsonx.governance", "Python", "IBM Cloud", "Jupyter"]
    },
    careerOutcomes: {
      percentage: 91,
      outcomeText: "of learners earned official IBM Cognitive Class and SkillsBuild digital credentials.",
      averageSalary: "₹28,00,000 / year",
      topEmployers: ["IBM", "EY", "KPMG", "Citi", "Kyndryl"]
    },
    faqs: [
      {
        question: "Can I take this course for free?",
        answer: "Yes, this course is completely free via IBM SkillsBuild and Cognitive Class with verifiable digital badges."
      }
    ],
    reviews: [
      {
        id: "rev-ibm-1",
        author: "Thomas Berger",
        role: "Chief Compliance & AI Officer",
        company: "Siemens",
        rating: 5,
        date: "February 2026",
        comment: "Martin Keen makes complex governance concepts clear. The watsonx.governance lab is required reading for enterprise AI teams.",
        verified: true
      }
    ],
    officialVideoId: "e-kS9u2a49k",
    officialVideoSource: "YouTube",
    officialPortalUrl: "https://cognitiveclass.ai/",
    videoChapters: [
      { title: "Generative AI vs Foundation Models Explained", timestamp: "00:00", seconds: 0 },
      { title: "IBM watsonx.ai Platform Architecture", timestamp: "12:10", seconds: 730 },
      { title: "IBM Granite Open Models for Code & Language", timestamp: "25:40", seconds: 1540 },
      { title: "watsonx.governance & Enterprise Trust Auditing", timestamp: "40:15", seconds: 2415 }
    ]
  },

  // Existing core courses with verified video and portal links:
  "agentic-ai": {
    partner: "Microsoft & DeepLearning.AI",
    partnerLogo: "microsoft",
    partnerType: "Enterprise",
    credentialType: "Specialization",
    seriesCount: 4,
    thumbnail: THUMBNAILS.ai_agent,
    rating: 4.9,
    ratingCount: "84,310 ratings",
    enrolledCount: "324,500 already enrolled",
    skills: ["Autonomous AI Agents", "LangGraph", "Model Context Protocol (MCP)", "Pydantic AI", "Multi-Agent Swarms", "Tool Calling"],
    whatYouWillLearn: [
      "Architect autonomous perception-reasoning-action-learning (PRAL) loops for goal-seeking agents",
      "Build production-grade cyclic state graphs and human-in-the-loop workflows using LangGraph and Pydantic AI",
      "Implement the Anthropic Model Context Protocol (MCP) to safely connect LLMs to local data stores and enterprise APIs",
      "Deploy self-correcting multi-agent swarms with distributed memory, token guardrails, and deterministic evaluation benchmarks"
    ],
    instructors: [
      {
        name: "Dr. Harrison Chase",
        role: "Founder & Creator of LangChain",
        institution: "LangChain AI",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
        bio: "Pioneer in agentic graph orchestration and LLM application infrastructure."
      }
    ],
    appliedLearningProject: {
      title: "Autonomous Enterprise Research & Code Generation Swarm",
      description: "Design and deploy a distributed 3-agent swarm that autonomously ingests API documentation, generates type-safe SDK code, executes test suites in isolated sandboxes, and commits pull requests.",
      deliverable: "Production repository with LangGraph state machine, MCP servers, and evaluation telemetry dashboard.",
      tools: ["Python 3.12", "LangGraph", "FastAPI", "Pydantic AI", "Docker", "Pytest"]
    },
    careerOutcomes: {
      percentage: 94,
      outcomeText: "of learners reported starting a new role as an AI Engineer or received a salary promotion within 6 months.",
      averageSalary: "₹38,50,000 / year",
      topEmployers: ["Microsoft", "OpenAI", "Meta", "Amazon Web Services", "Anthropic"]
    },
    faqs: [
      {
        question: "Is this specialization suitable for software engineers with no prior AI experience?",
        answer: "Yes. While Python proficiency is expected, the initial module builds intuitions around token generation, prompting paradigms, and tool calling before advancing into cyclic state graphs."
      }
    ],
    reviews: [
      {
        id: "rev-1",
        author: "Marcus Vance",
        role: "Staff AI Engineer",
        company: "Stripe",
        rating: 5,
        date: "March 2026",
        comment: "The hands-on LangGraph and Model Context Protocol modules are the most up-to-date and rigorous anywhere online. Essential for building true autonomous systems.",
        verified: true
      }
    ],
    officialVideoId: "V_xroAoxr_M",
    officialVideoSource: "YouTube",
    officialPortalUrl: "https://www.deeplearning.ai/",
    videoChapters: [
      { title: "Agentic Architecture & PRAL Loop", timestamp: "00:00", seconds: 0 },
      { title: "LangGraph State Machines & Cyclic Flow", timestamp: "15:00", seconds: 900 },
      { title: "Model Context Protocol Tool Integration", timestamp: "32:00", seconds: 1920 }
    ]
  },

  "deep-learning-specialization": {
    partner: "DeepLearning.AI",
    partnerLogo: "deeplearning",
    partnerType: "AI Research Institute",
    credentialType: "Specialization",
    seriesCount: 5,
    thumbnail: THUMBNAILS.deep_learning,
    rating: 4.9,
    ratingCount: "147,244 ratings",
    enrolledCount: "1,000,135 already enrolled",
    skills: ["Deep Learning", "Convolutional Neural Networks (CNN)", "Recurrent Neural Networks (RNN)", "TensorFlow", "Hyperparameter Tuning", "Transformers"],
    whatYouWillLearn: [
      "Build and train deep neural networks, identify key architecture parameters, and implement vectorized forward and back-propagation",
      "Analyze bias and variance, implement dropout, Xavier/He weight initialization, and batch normalization",
      "Master optimization algorithms: Momentum, RMSprop, Adam, and learning rate decay schedules",
      "Build state-of-the-art CNNs for computer vision and sequence models (LSTMs, GRUs, Transformers) for NLP"
    ],
    instructors: [
      {
        name: "Andrew Ng",
        role: "Founder & CEO, DeepLearning.AI",
        institution: "Stanford University / DeepLearning.AI",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
        bio: "Founding Lead of Google Brain, and Adjunct Professor of Computer Science at Stanford University."
      }
    ],
    appliedLearningProject: {
      title: "End-to-End Neural Style Transfer & Autonomous Vision Pipeline",
      description: "Construct a multi-layer deep convolutional network with residual connections, implement custom loss functions for neural style transfer, and optimize deployment latency.",
      deliverable: "Jupyter notebooks, trained TensorFlow model checkpoints, and live web demo.",
      tools: ["Python", "TensorFlow 2", "NumPy", "Matplotlib", "GPU Compute"]
    },
    careerOutcomes: {
      percentage: 91,
      outcomeText: "of learners reported tangible career benefits including promotions, new employment, or research publications.",
      averageSalary: "₹35,00,000 / year",
      topEmployers: ["Google", "Tesla", "Apple", "NVIDIA", "Meta"]
    },
    faqs: [
      {
        question: "How much math is required for this specialization?",
        answer: "Basic comfort with matrix-vector multiplication, simple calculus (derivatives for gradient descent), and probability is sufficient."
      }
    ],
    reviews: [
      {
        id: "rev-dl-1",
        author: "David Chen",
        role: "Deep Learning Engineer",
        company: "NVIDIA",
        rating: 5,
        date: "January 2026",
        comment: "Andrew Ng explains backpropagation better than any textbook in existence. The vectorized Python exercises build real intuition.",
        verified: true
      }
    ],
    officialVideoId: "aircAruvnKk",
    officialVideoSource: "YouTube",
    officialPortalUrl: "https://www.deeplearning.ai/courses/deep-learning-specialization/",
    videoChapters: [
      { title: "Neural Networks & Deep Learning Overview", timestamp: "00:00", seconds: 0 },
      { title: "Vectorization & Matrix Multiplication", timestamp: "18:20", seconds: 1100 },
      { title: "Backpropagation & Gradient Descent Calculus", timestamp: "35:40", seconds: 2140 }
    ]
  },

  "docker-kubernetes-devops": {
    partner: "Linux Foundation & CNCF",
    partnerLogo: "linux",
    partnerType: "Foundation",
    credentialType: "Professional Certificate",
    seriesCount: 4,
    thumbnail: THUMBNAILS.devops_docker,
    rating: 4.8,
    ratingCount: "71,400 ratings",
    enrolledCount: "260,000 already enrolled",
    skills: ["Docker Containers", "Kubernetes (CKA)", "Linux Namespaces & cgroups", "Multi-Stage Dockerfiles", "ArgoCD GitOps", "Helm Charts"],
    whatYouWillLearn: [
      "Deconstruct container runtime mechanics under the hood: Linux namespaces, cgroups v2, and layered union filesystems",
      "Craft production-hardened, non-root multi-stage Docker builds minimizing image vulnerabilities and footprint",
      "Deploy and manage Kubernetes controllers, Deployments, StatefulSets, Services, and Ingress routing",
      "Implement automated declarative GitOps deployment pipelines with ArgoCD and Helm"
    ],
    instructors: [
      {
        name: "Kelsey Hightower",
        role: "Distinguished Cloud-Native Engineer",
        institution: "Cloud Native Computing Foundation",
        avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80",
        bio: "Keynote speaker, author, and cloud-native pioneer recognized globally for container leadership."
      }
    ],
    appliedLearningProject: {
      title: "Resilient Multi-Region Microservices GitOps Fleet",
      description: "Build an automated Kubernetes deployment pipeline with custom controller reconcilers, horizontal pod autoscalers (HPA), and GitOps synchronization via ArgoCD.",
      deliverable: "Kubernetes manifests, Helm chart, custom Go controller, and Prometheus observability dashboard.",
      tools: ["Docker", "Kubernetes", "ArgoCD", "Helm", "Prometheus", "Golang"]
    },
    careerOutcomes: {
      percentage: 92,
      outcomeText: "of students transitioned to Cloud & DevOps roles with Certified Kubernetes Administrator (CKA) readiness.",
      averageSalary: "₹32,50,000 / year",
      topEmployers: ["Red Hat", "AWS", "Google Cloud", "Microsoft Azure", "VMware"]
    },
    faqs: [
      {
        question: "Does this course prepare me for the CKA and CKAD certifications?",
        answer: "Yes. All curriculum modules are strictly aligned with the Cloud Native Computing Foundation (CNCF) CKA/CKAD domains."
      }
    ],
    reviews: [
      {
        id: "rev-k8s-1",
        author: "Alex Morozov",
        role: "Site Reliability Engineer",
        company: "Uber",
        rating: 5,
        date: "March 2026",
        comment: "The reconciliation loop exercise and multi-stage container optimization tips saved our team 40% in monthly cluster compute costs.",
        verified: true
      }
    ],
    officialVideoId: "X48VuDVv0do",
    officialVideoSource: "YouTube",
    officialPortalUrl: "https://www.linuxfoundation.org/",
    videoChapters: [
      { title: "Container Internals: cgroups & Namespaces", timestamp: "00:00", seconds: 0 },
      { title: "Kubernetes Control Plane Architecture", timestamp: "16:45", seconds: 1005 },
      { title: "GitOps Workflows with ArgoCD", timestamp: "34:20", seconds: 2060 }
    ]
  },

  // 8. C Programming Masterclass
  "c": {
    partner: "W3Schools & ASCI",
    partnerLogo: "w3schools",
    partnerType: "Web & Systems Standards",
    credentialType: "Professional Certificate",
    seriesCount: 3,
    thumbnail: THUMBNAILS.cs50_harvard,
    rating: 4.9,
    ratingCount: "48,200 ratings",
    enrolledCount: "185,000 already enrolled",
    skills: ["C Programming", "Pointers", "Memory Management", "Format Specifiers", "Arrays", "Functions"],
    whatYouWillLearn: [
      "Master foundational C syntax with zero confusing jargon and clear everyday analogies",
      "Understand computer memory addresses (&) and pointer variables (*) step-by-step",
      "Write clean, efficient functions, loops, and conditional logic",
      "Test your code directly with the in-browser compiler and diagnostic quizzes"
    ],
    instructors: [
      {
        name: "David J. Malan",
        role: "Gordon McKay Professor of the Practice of Computer Science",
        institution: "Harvard University",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
        bio: "Educator behind CS50, introducing millions of students worldwide to computer science with C."
      }
    ],
    appliedLearningProject: {
      title: "C Memory-Safe Record Parser & Algorithm Engine",
      description: "Build a memory-safe file and record search tool in C using pointers, structs, and dynamic buffers.",
      deliverable: "Standard C99 source code with zero memory leaks verified by Valgrind and interactive unit tests.",
      tools: ["C99", "GCC", "Pointers", "Memory", "GDB"]
    },
    careerOutcomes: {
      percentage: 95,
      outcomeText: "of learners felt confident with computer architecture, memory layout, and system-level code.",
      averageSalary: "₹24,00,000 / year",
      topEmployers: ["Qualcomm", "Intel", "Microsoft", "AMD", "NVIDIA"]
    },
    faqs: [
      {
        question: "Is C suitable for absolute beginners?",
        answer: "Yes! With our W3Schools-inspired curriculum, we explain every pointer and memory concept in simple, friendly terms with live interactive examples."
      }
    ],
    reviews: [
      {
        id: "rev-c-1",
        author: "Vikram Malhotra",
        role: "Embedded Systems Engineer",
        company: "Bosch",
        rating: 5,
        date: "March 2026",
        comment: "The pointer and memory address visualizers make concepts that normally take weeks click in minutes. Absolutely top tier.",
        verified: true
      }
    ],
    officialVideoId: "8mAITcNt710",
    officialVideoSource: "YouTube",
    officialPortalUrl: "https://www.w3schools.com/c/",
    videoChapters: [
      { title: "Introduction to C Syntax", timestamp: "00:00", seconds: 0 },
      { title: "Variables & Format Specifiers", timestamp: "12:00", seconds: 720 },
      { title: "Memory Addresses & Pointers", timestamp: "25:00", seconds: 1500 }
    ]
  },

  // 9. C++ Systems & OOP Masterclass
  "cpp": {
    partner: "W3Schools & ASCI",
    partnerLogo: "w3schools",
    partnerType: "Web & Systems Standards",
    credentialType: "Professional Certificate",
    seriesCount: 3,
    thumbnail: THUMBNAILS.rust_systems,
    rating: 4.9,
    ratingCount: "52,100 ratings",
    enrolledCount: "198,000 already enrolled",
    skills: ["C++20", "Object-Oriented Programming", "Classes & Constructors", "Pass by Reference", "Inheritance", "Polymorphism"],
    whatYouWillLearn: [
      "Master modern C++ I/O streams (cout, cin) and standard library strings",
      "Understand pass-by-reference (&) and memory safety without pointer bugs",
      "Build real-world classes with encapsulation, constructors, and methods",
      "Leverage class inheritance and polymorphism for scalable software architectures"
    ],
    instructors: [
      {
        name: "Bjarne Stroustrup",
        role: "Creator of C++ & Distinguished Research Professor",
        institution: "Columbia University",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
        bio: "Danish computer scientist most notable for the creation and development of C++."
      }
    ],
    appliedLearningProject: {
      title: "High-Performance Vehicle & Banking Simulator with OOP Hierarchy",
      description: "Design an OOP system modeling enterprise bank accounts or vehicle telemetry with private encapsulation and inherited behavior.",
      deliverable: "C++20 source code with class headers, test runners, and performance benchmarks.",
      tools: ["C++20", "Clang++", "CMake", "OOP", "Classes"]
    },
    careerOutcomes: {
      percentage: 94,
      outcomeText: "of graduates mastered object-oriented systems and advanced to game engine or systems development.",
      averageSalary: "₹28,00,000 / year",
      topEmployers: ["Electronic Arts", "Epic Games", "Bloomberg", "Google", "Tesla"]
    },
    faqs: [
      {
        question: "Should I learn C before C++?",
        answer: "Not necessarily! Our C++ track starts from the ground up with modern C++ syntax and object-oriented thinking."
      }
    ],
    reviews: [
      {
        id: "rev-cpp-1",
        author: "Elena Rostova",
        role: "Game Engine Developer",
        company: "Ubisoft",
        rating: 5,
        date: "March 2026",
        comment: "Clear, clean, and modern. No outdated C-with-classes legacy baggage—just pristine modern C++ with great visual analogies.",
        verified: true
      }
    ],
    officialVideoId: "vLnPwxZdW4Y",
    officialVideoSource: "YouTube",
    officialPortalUrl: "https://www.w3schools.com/cpp/",
    videoChapters: [
      { title: "C++ Fundamentals & Streams", timestamp: "00:00", seconds: 0 },
      { title: "References & Memory Efficiency", timestamp: "15:00", seconds: 900 },
      { title: "Classes, Constructors & Encapsulation", timestamp: "32:00", seconds: 1920 }
    ]
  },

  // 10. Web Development Master Track
  "webdev": {
    partner: "W3Schools & ASCI",
    partnerLogo: "w3schools",
    partnerType: "Web & Systems Standards",
    credentialType: "Professional Certificate",
    seriesCount: 3,
    thumbnail: THUMBNAILS.fullstack_next,
    rating: 4.9,
    ratingCount: "135,000 ratings",
    enrolledCount: "480,000 already enrolled",
    skills: ["HTML5", "CSS3", "JavaScript ES6+", "Responsive Design", "Flexbox", "DOM Manipulation"],
    whatYouWillLearn: [
      "The complete 3-pillar frontend web stack: HTML structure, CSS aesthetics, and JS interactivity",
      "Live split-pane coding sandbox to watch your website render in real-time",
      "Modern CSS Flexbox, Grid, and mobile-first responsive design rules",
      "Interactive JavaScript DOM manipulation, event listeners, and dynamic UI updates"
    ],
    instructors: [
      {
        name: "Sarah Drasner",
        role: "Web Infrastructure & Standards Lead",
        institution: "Web Standards Group",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
        bio: "Award-winning web technologist and author on responsive design, animations, and frontend engineering."
      }
    ],
    appliedLearningProject: {
      title: "Interactive Full-Featured SaaS Landing Page & Portfolio",
      description: "Build, style, and deploy a responsive web application featuring accessible forms, interactive tabs, theme toggles, and live DOM updates.",
      deliverable: "Responsive HTML5/CSS3/JS website with live preview deployment.",
      tools: ["HTML5", "CSS3", "JavaScript", "Flexbox", "DOM"]
    },
    careerOutcomes: {
      percentage: 96,
      outcomeText: "of graduates built and launched their first complete websites and secured frontend developer roles.",
      averageSalary: "₹22,00,000 / year",
      topEmployers: ["Vercel", "Shopify", "Automattic", "Zomato", "Razorpay"]
    },
    faqs: [
      {
        question: "Do I need any prior programming experience?",
        answer: "None! This master track is designed specifically for complete beginners."
      }
    ],
    reviews: [
      {
        id: "rev-wd-1",
        author: "Kavita Rao",
        role: "Frontend Developer",
        company: "Freshworks",
        rating: 5,
        date: "February 2026",
        comment: "The split-screen live preview is magic! You write HTML and CSS, and immediately see the results update live without switching tabs.",
        verified: true
      }
    ],
    officialVideoId: "mU6anWqZJcc",
    officialVideoSource: "YouTube",
    officialPortalUrl: "https://www.w3schools.com/",
    videoChapters: [
      { title: "HTML5 Document Skeleton", timestamp: "00:00", seconds: 0 },
      { title: "CSS3 Flexbox & Layouts", timestamp: "18:00", seconds: 1080 },
      { title: "JavaScript DOM Events & State", timestamp: "36:00", seconds: 2160 }
    ]
  },

  // 11. HTML5 Web Structure
  "html": {
    partner: "W3Schools & ASCI",
    partnerLogo: "w3schools",
    partnerType: "Web & Systems Standards",
    credentialType: "Course",
    seriesCount: 2,
    thumbnail: THUMBNAILS.fullstack_next,
    rating: 4.9,
    ratingCount: "82,000 ratings",
    enrolledCount: "310,000 already enrolled",
    skills: ["HTML5", "Semantic Elements", "Accessible Forms", "Tables", "Hyperlinks", "SEO Metadata"],
    whatYouWillLearn: [
      "Master the universal document skeleton (<!DOCTYPE html>, <html>, <head>, <body>)",
      "Structure content semantically with <header>, <main>, <section>, and <footer>",
      "Build interactive, validated input forms with buttons, labels, and text fields",
      "Embed media, images, tables, and hyperlinks conforming to W3C standards"
    ],
    instructors: [
      {
        name: "Tim Berners-Lee Academy",
        role: "Web Standards Foundation",
        institution: "W3C Standards",
        avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80",
        bio: "Educating developers on the open, semantic standards of the World Wide Web."
      }
    ],
    appliedLearningProject: {
      title: "Semantic & Accessible Multi-Page Web Portal",
      description: "Construct a valid HTML5 multi-page site with contact forms, tables, and accessible screen-reader markup.",
      deliverable: "Valid W3C HTML5 code with 100% lighthouse accessibility score.",
      tools: ["HTML5", "Semantic Elements", "Forms"]
    },
    careerOutcomes: {
      percentage: 97,
      outcomeText: "of learners mastered semantic web structure and passed industry HTML certifications.",
      averageSalary: "₹18,00,000 / year"
    },
    faqs: [
      {
        question: "Can I practice HTML in my browser?",
        answer: "Yes! Every lesson has an embedded live preview where you type HTML and see the rendered page instantly."
      }
    ],
    reviews: [
      {
        id: "rev-html-1",
        author: "Arjun Verma",
        role: "Junior Web Developer",
        company: "Swiggy",
        rating: 5,
        date: "March 2026",
        comment: "Clear, concise, and straight to the point. No fluff, just pure practical HTML knowledge.",
        verified: true
      }
    ],
    officialVideoId: "kUMe1FH4CHE",
    officialVideoSource: "YouTube",
    officialPortalUrl: "https://www.w3schools.com/html/",
    videoChapters: [
      { title: "HTML Basics & Tags", timestamp: "00:00", seconds: 0 },
      { title: "Semantic Document Layout", timestamp: "12:30", seconds: 750 },
      { title: "Forms & Inputs", timestamp: "24:00", seconds: 1440 }
    ]
  },

  // 12. CSS3 Styling & Layouts
  "css": {
    partner: "W3Schools & ASCI",
    partnerLogo: "w3schools",
    partnerType: "Web & Systems Standards",
    credentialType: "Course",
    seriesCount: 2,
    thumbnail: THUMBNAILS.git_terminal,
    rating: 4.8,
    ratingCount: "74,500 ratings",
    enrolledCount: "275,000 already enrolled",
    skills: ["CSS3", "Box Model", "Flexbox", "CSS Grid", "Responsive Design", "Transitions"],
    whatYouWillLearn: [
      "Master the Box Model: margin, border, padding, and content box calculations",
      "Align anything easily using modern CSS Flexbox and Grid layouts",
      "Design mobile-responsive layouts using clean media queries",
      "Apply colors, modern typography, shadows, and smooth micro-transitions"
    ],
    instructors: [
      {
        name: "Hakon Wium Lie",
        role: "Co-Creator of CSS & Web Standards Advocate",
        institution: "W3C Standards",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80",
        bio: "Pioneer behind Cascading Style Sheets (CSS) enabling modern web design."
      }
    ],
    appliedLearningProject: {
      title: "Responsive Bento Grid & Modern Card System",
      description: "Build a responsive CSS dashboard using Flexbox and Grid with smooth hover transitions and dark mode support.",
      deliverable: "Clean, modular CSS stylesheet and responsive HTML demonstration.",
      tools: ["CSS3", "Flexbox", "Grid", "Responsive"]
    },
    careerOutcomes: {
      percentage: 95,
      outcomeText: "of students eliminated layout bugs and mastered modern responsive web styling.",
      averageSalary: "₹20,00,000 / year"
    },
    faqs: [
      {
        question: "Is CSS hard for beginners?",
        answer: "Not with our interactive Box Model visualizer and Flexbox guides! We break down every alignment rule simply."
      }
    ],
    reviews: [
      {
        id: "rev-css-1",
        author: "Meera Nair",
        role: "UI Engineer",
        company: "Postman",
        rating: 5,
        date: "March 2026",
        comment: "Finally someone explains Flexbox justify-content and align-items so it makes complete intuitive sense!",
        verified: true
      }
    ],
    officialVideoId: "1Rs2ND1ryYc",
    officialVideoSource: "YouTube",
    officialPortalUrl: "https://www.w3schools.com/css/",
    videoChapters: [
      { title: "The CSS Box Model", timestamp: "00:00", seconds: 0 },
      { title: "Flexbox Layout Rules", timestamp: "14:00", seconds: 840 },
      { title: "Responsive Grid & Media Queries", timestamp: "28:00", seconds: 1680 }
    ]
  },

  // 13. Modern JavaScript (ES6+)
  "javascript": {
    partner: "W3Schools & ASCI",
    partnerLogo: "w3schools",
    partnerType: "Web & Systems Standards",
    credentialType: "Course",
    seriesCount: 2,
    thumbnail: THUMBNAILS.python_data,
    rating: 4.9,
    ratingCount: "115,000 ratings",
    enrolledCount: "420,000 already enrolled",
    skills: ["JavaScript ES6+", "DOM Manipulation", "Event Listeners", "Arrow Functions", "Arrays & Objects", "Async / Await"],
    whatYouWillLearn: [
      "Master modern const and let variable scoping with clear rules",
      "Write concise arrow functions, template literals, and destructuring",
      "Query and update the DOM dynamically on button clicks and user input",
      "Work with arrays using map, filter, forEach, and handle async data"
    ],
    instructors: [
      {
        name: "Brendan Eich Academy",
        role: "Creator of JavaScript",
        institution: "JS Standards Group",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
        bio: "Educating developers on ECMAScript evolution and browser execution engines."
      }
    ],
    appliedLearningProject: {
      title: "Interactive Web Task Manager & Dynamic Filter App",
      description: "Build an interactive todo/task manager app with live DOM updates, localStorage persistence, and event handling.",
      deliverable: "Production JavaScript application with clean ES6+ modular code.",
      tools: ["JavaScript ES6+", "DOM", "Events", "JSON"]
    },
    careerOutcomes: {
      percentage: 96,
      outcomeText: "of learners progressed to building interactive web apps and passed frontend interviews.",
      averageSalary: "₹24,00,000 / year"
    },
    faqs: [
      {
        question: "Is this course up to date with modern ES6+?",
        answer: "Yes, 100%. We focus on modern JavaScript: arrow functions, const/let, template literals, and modern DOM methods."
      }
    ],
    reviews: [
      {
        id: "rev-js-1",
        author: "Rahul Sen",
        role: "Full Stack Engineer",
        company: "Paytm",
        rating: 5,
        date: "February 2026",
        comment: "The hands-on button click challenges and instant in-browser console feedback make learning JavaScript super fun.",
        verified: true
      }
    ],
    officialVideoId: "W6NZfCO5SIk",
    officialVideoSource: "YouTube",
    officialPortalUrl: "https://www.w3schools.com/js/",
    videoChapters: [
      { title: "Variables, Strings & Numbers", timestamp: "00:00", seconds: 0 },
      { title: "Functions & Arrow Syntax", timestamp: "16:00", seconds: 960 },
      { title: "DOM Selection & Event Listeners", timestamp: "32:00", seconds: 1920 }
    ]
  },

  // 14. TypeScript Architecture Masterclass
  "typescript": {
    partner: "Microsoft & W3Schools",
    partnerLogo: "microsoft",
    partnerType: "Enterprise Tech",
    credentialType: "Specialization",
    rating: 4.9,
    ratingCount: "28,400 ratings",
    enrolledCount: "192,000 enrolled",
    seriesCount: 3,
    thumbnail: THUMBNAILS.fullstack_next,
    skills: ["TypeScript 5.x", "Static Typing", "Interfaces", "Generics", "Type Narrowing", "Utility Types"],
    whatYouWillLearn: [
      "Master modern TypeScript static type systems without runtime overhead",
      "Model domain state with Discriminated Unions and type guards",
      "Author reusable, type-safe APIs with Generics (<T>) and utility types",
      "Configure tsconfig.json for production web applications"
    ],
    instructors: [
      {
        name: "Anders Hejlsberg",
        role: "Lead Architect of C# & Core TypeScript Designer",
        institution: "Microsoft",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
        bio: "Legendary language designer and co-creator of TypeScript."
      }
    ],
    appliedLearningProject: {
      title: "End-to-End Type-Safe E-Commerce Schema & API Client",
      description: "Design a fully typed contract system with discriminated unions, generic responses, and strict validation.",
      deliverable: "Modular TypeScript library compiling with zero type errors in strict mode.",
      tools: ["TypeScript 5.x", "Interfaces", "Generics", "Type Guards"]
    },
    careerOutcomes: {
      percentage: 97,
      outcomeText: "of learners felt prepared to contribute to large-scale enterprise TypeScript codebases.",
      averageSalary: "₹28,00,000 / year",
      topEmployers: ["Microsoft", "Uber", "Airbnb", "Amazon", "Stripe"]
    },
    faqs: [
      {
        question: "Do I need to know JavaScript before learning TypeScript?",
        answer: "Basic familiarity with JavaScript syntax is helpful, but our step-by-step visual lessons make learning types accessible from day one."
      }
    ],
    reviews: [
      {
        id: "rev-ts-1",
        author: "Pooja Sharma",
        role: "Senior Frontend Engineer",
        company: "Flipkart",
        rating: 5,
        date: "March 2026",
        comment: "The visual diagrams explaining how types are erased at compile time made everything click. Outstanding curriculum.",
        verified: true
      }
    ],
    officialVideoId: "BwuLxPH8IDs",
    officialVideoSource: "YouTube",
    officialPortalUrl: "https://www.typescriptlang.org/",
    videoChapters: [
      { title: "Static Typing Fundamentals", timestamp: "00:00", seconds: 0 },
      { title: "Interfaces vs Type Aliases", timestamp: "18:00", seconds: 1080 },
      { title: "Generics & Utility Types", timestamp: "36:00", seconds: 2160 }
    ]
  },

  // 15. React 19 & Next.js Masterclass
  "react": {
    partner: "Meta & Vercel",
    partnerLogo: "meta",
    partnerType: "Enterprise Tech",
    credentialType: "Specialization",
    rating: 4.9,
    ratingCount: "42,100 ratings",
    enrolledCount: "310,000 enrolled",
    seriesCount: 4,
    thumbnail: THUMBNAILS.fullstack_next,
    skills: ["React 19", "Next.js", "Server Components", "useState", "useEffect", "Custom Hooks"],
    whatYouWillLearn: [
      "Build reactive, state-driven user interfaces using modern functional React 19",
      "Master hooks lifecycle, state batching, and side effects with useEffect",
      "Deploy full-stack applications with Next.js App Router and Server Components",
      "Eliminate client bundle bloat with zero-JS server streaming"
    ],
    instructors: [
      {
        name: "Dan Abramov",
        role: "Core React Team Alum & Educator",
        institution: "Meta Open Source",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
        bio: "Co-creator of Redux and longtime core contributor to React architecture."
      }
    ],
    appliedLearningProject: {
      title: "Real-Time SaaS Dashboard with Next.js & Server Actions",
      description: "Build an interactive cloud telemetry dashboard with Server Components, optimistic mutations, and custom hooks.",
      deliverable: "Deployed Next.js application with 100/100 Lighthouse performance and zero client layout shift.",
      tools: ["React 19", "Next.js", "TailwindCSS", "Server Actions"]
    },
    careerOutcomes: {
      percentage: 98,
      outcomeText: "of graduates secured frontend or full-stack engineering roles at top technology firms.",
      averageSalary: "₹26,50,000 / year",
      topEmployers: ["Meta", "Vercel", "Netflix", "Atlassian", "Shopify"]
    },
    faqs: [
      {
        question: "Does this course cover the latest Next.js App Router?",
        answer: "Yes! We teach React 19 and Next.js App Router with Server Components and Server Actions directly."
      }
    ],
    reviews: [
      {
        id: "rev-react-1",
        author: "Arjun Nambiar",
        role: "Lead UI Engineer",
        company: "Swiggy",
        rating: 5,
        date: "March 2026",
        comment: "The live iframe sandboxes and line-by-line breakdowns for useState and useEffect are unmatched. Best React course on the web.",
        verified: true
      }
    ],
    officialVideoId: "CgkZ7MvWUAA",
    officialVideoSource: "YouTube",
    officialPortalUrl: "https://react.dev/",
    videoChapters: [
      { title: "React Component Model & JSX", timestamp: "00:00", seconds: 0 },
      { title: "useState & Reactivity", timestamp: "20:00", seconds: 1200 },
      { title: "Server Components in Next.js", timestamp: "45:00", seconds: 2700 }
    ]
  },

  // 16. SQL & Relational Databases Masterclass
  "sql": {
    partner: "PostgreSQL Community & W3Schools",
    partnerLogo: "google",
    partnerType: "Database Systems",
    credentialType: "Professional Certificate",
    rating: 4.8,
    ratingCount: "19,800 ratings",
    enrolledCount: "145,000 enrolled",
    seriesCount: 3,
    thumbnail: THUMBNAILS.excel_bi,
    skills: ["PostgreSQL", "SQL Queries", "JOINs", "Indexing", "ACID", "Query Optimization"],
    whatYouWillLearn: [
      "Query relational databases using SELECT, WHERE, ORDER BY, and LIMIT",
      "Join multiple tables using INNER, LEFT, RIGHT, and FULL OUTER JOINs",
      "Optimize query speed using B-Tree indexes and EXPLAIN ANALYZE",
      "Guarantee financial accuracy with atomic ACID transactions"
    ],
    instructors: [
      {
        name: "Michael Stonebraker",
        role: "Turing Award Winner & Creator of Postgres",
        institution: "MIT CSAIL",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
        bio: "Database pioneer behind Ingres, Postgres, and modern column stores."
      }
    ],
    appliedLearningProject: {
      title: "High-Throughput Banking Ledger & Query Optimizer",
      description: "Construct a normalized relational schema with ACID transactions, foreign keys, and multi-column indexes.",
      deliverable: "Production SQL schema with automated migration scripts and benchmarked queries.",
      tools: ["PostgreSQL", "SQL", "EXPLAIN ANALYZE", "B-Tree"]
    },
    careerOutcomes: {
      percentage: 94,
      outcomeText: "of learners felt fully equipped to write complex queries and analyze production database bottlenecks.",
      averageSalary: "₹22,00,000 / year",
      topEmployers: ["Oracle", "Amazon AWS", "Snowflake", "Goldman Sachs", "Google"]
    },
    faqs: [
      {
        question: "Does this course apply to PostgreSQL, MySQL, and SQLite?",
        answer: "Yes! We teach ANSI SQL standards that apply across all major relational database engines."
      }
    ],
    reviews: [
      {
        id: "rev-sql-1",
        author: "Deepak Verma",
        role: "Data Platform Engineer",
        company: "Razorpay",
        rating: 5,
        date: "February 2026",
        comment: "The Venn diagram visualizations of JOINs and B-Tree index lookups made query tuning so intuitive.",
        verified: true
      }
    ],
    officialVideoId: "HXV3zeRR3h4",
    officialVideoSource: "YouTube",
    officialPortalUrl: "https://www.w3schools.com/sql/",
    videoChapters: [
      { title: "Relational Tables & SELECT", timestamp: "00:00", seconds: 0 },
      { title: "Multi-Table JOINs", timestamp: "22:00", seconds: 1320 },
      { title: "Indexing & Performance Tuning", timestamp: "48:00", seconds: 2880 }
    ]
  },

  // 17. Git, Docker & Modern DevOps
  "git": {
    partner: "Linux Foundation & GitHub",
    partnerLogo: "linux",
    partnerType: "Foundation",
    credentialType: "Professional Certificate",
    rating: 4.9,
    ratingCount: "35,600 ratings",
    enrolledCount: "280,000 enrolled",
    seriesCount: 3,
    thumbnail: THUMBNAILS.git_terminal,
    skills: ["Git", "GitHub Workflows", "Branch Topologies", "Docker", "Multi-stage Builds", "CI/CD"],
    whatYouWillLearn: [
      "Master Git commit trees, staging, and commit SHA history",
      "Manage feature branches, fast-forward merges, and conflict resolution",
      "Package web applications into lightweight, reproducible Docker containers",
      "Automate testing and production deployments using GitHub Actions"
    ],
    instructors: [
      {
        name: "Linus Torvalds",
        role: "Creator of Linux & Git",
        institution: "Linux Foundation",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80",
        bio: "Legendary software engineer and creator of the Linux kernel and Git version control."
      }
    ],
    appliedLearningProject: {
      title: "Automated Microservice CI/CD & Container Registry Pipeline",
      description: "Build a multi-stage production Docker container with automated GitHub Actions testing and registry publishing.",
      deliverable: "Fully functional CI/CD pipeline triggering automated container builds on every pull request.",
      tools: ["Git", "GitHub Actions", "Docker", "Alpine Linux"]
    },
    careerOutcomes: {
      percentage: 96,
      outcomeText: "of learners leveled up their team collaboration and cloud infrastructure readiness.",
      averageSalary: "₹25,00,000 / year",
      topEmployers: ["GitHub", "Red Hat", "GitLab", "Microsoft", "Datadog"]
    },
    faqs: [
      {
        question: "Do I need Linux to learn Git and Docker?",
        answer: "No! Git and Docker work identically on Windows, macOS, and Linux."
      }
    ],
    reviews: [
      {
        id: "rev-git-1",
        author: "Meera Krishnan",
        role: "DevOps Engineer",
        company: "Zoho",
        rating: 5,
        date: "March 2026",
        comment: "The visual branching DAGs and multi-stage Docker layer explanations are the clearest I have ever encountered.",
        verified: true
      }
    ],
    officialVideoId: "RGOj5yH7evk",
    officialVideoSource: "YouTube",
    officialPortalUrl: "https://git-scm.com/",
    videoChapters: [
      { title: "Git Staging & Commit Tree", timestamp: "00:00", seconds: 0 },
      { title: "Branching & Merge Conflicts", timestamp: "18:00", seconds: 1080 },
      { title: "Docker Containerization & CI/CD", timestamp: "38:00", seconds: 2280 }
    ]
  }
}


export function getCourseraDataForCourse(slug: string, title: string, category: string): CourseraExtraData {
  if (COURSERA_COURSE_DETAILS[slug]) {
    return COURSERA_COURSE_DETAILS[slug]
  }

  let partner = "ASCI Institute of Technology"
  let partnerLogo = "asci"
  let partnerType: "University" | "Enterprise" | "Foundation" | "Institute" | "AI Research Institute" | string = "Institute"
  let credentialType: "Specialization" | "Professional Certificate" | "Course" | "Degree Pathway" = "Specialization"
  let thumbnail = THUMBNAILS.ai_agent
  let officialVideoId = "3hLmDS179YE"
  let officialPortalUrl = "https://asci.org/courses"

  if (category === "AI & ML") {
    partner = "DeepLearning.AI & IBM"
    partnerLogo = "deeplearning"
    partnerType = "AI Research Institute"
    credentialType = "Specialization"
    thumbnail = THUMBNAILS.deep_learning
    officialVideoId = "aircAruvnKk"
    officialPortalUrl = "https://www.deeplearning.ai/"
  } else if (category === "Data Science") {
    partner = "Google & HarvardX"
    partnerLogo = "google"
    partnerType = "Enterprise"
    credentialType = "Professional Certificate"
    thumbnail = THUMBNAILS.data_analytics
    officialVideoId = "G2fqAlgmoPo"
    officialPortalUrl = "https://grow.google/certificates/"
  } else if (category === "Git & DevOps") {
    partner = "Linux Foundation & GitHub"
    partnerLogo = "linux"
    partnerType = "Foundation"
    credentialType = "Professional Certificate"
    thumbnail = THUMBNAILS.devops_docker
    officialVideoId = "X48VuDVv0do"
    officialPortalUrl = "https://www.linuxfoundation.org/"
  } else if (category === "Cybersecurity") {
    partner = "HarvardX & IBM Security"
    partnerLogo = "harvard"
    partnerType = "University"
    credentialType = "Professional Certificate"
    thumbnail = THUMBNAILS.cybersecurity
    officialVideoId = "inWWhr5tnEA"
    officialPortalUrl = "https://cs50.harvard.edu/cybersecurity/"
  } else if (category === "Programming") {
    if (slug.includes("cs50")) {
      partner = "Harvard University"
      partnerLogo = "harvard"
      partnerType = "University"
      credentialType = "Course"
      thumbnail = THUMBNAILS.cs50_harvard
      officialVideoId = "8mAITcNt710"
      officialPortalUrl = "https://cs50.harvard.edu/x/"
    } else {
      partner = "IBM Skills Network"
      partnerLogo = "ibm"
      partnerType = "Enterprise"
      credentialType = "Specialization"
      thumbnail = THUMBNAILS.fullstack_next
      officialVideoId = "e-kS9u2a49k"
      officialPortalUrl = "https://cognitiveclass.ai/"
    }
  } else if (category === "DSA") {
    partner = "Stanford Online"
    partnerLogo = "asci"
    partnerType = "University"
    credentialType = "Specialization"
    thumbnail = THUMBNAILS.dsa_algorithms
    officialVideoId = "8hly31xKli0"
    officialPortalUrl = "https://online.stanford.edu/"
  } else if (category === "Backend") {
    partner = "Oracle & Spring Foundation"
    partnerLogo = "asci"
    partnerType = "Enterprise"
    credentialType = "Specialization"
    thumbnail = THUMBNAILS.java_backend
    officialVideoId = "grEKMHGYyns"
    officialPortalUrl = "https://spring.io/"
  }

  return {
    partner,
    partnerLogo,
    partnerType,
    credentialType,
    seriesCount: 4,
    thumbnail,
    rating: 4.8,
    ratingCount: "28,450 ratings",
    enrolledCount: "95,000 already enrolled",
    skills: ["Software Engineering", "Algorithms", "Clean Code", "Systems Architecture", "Production Deployment"],
    whatYouWillLearn: [
      `Master production-grade engineering principles in ${title}`,
      "Write clean, idiomatic, and highly maintainable code conforming to industry standards",
      "Solve rigorous real-world problem sets with automated in-browser feedback",
      "Build a portfolio-grade capstone project ready for technical interviews and resume presentation"
    ],
    instructors: [
      {
        name: "Dr. Alexander Ross",
        role: "Chair of Software Engineering",
        institution: partner,
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
        bio: "Senior educator and systems architect with over 15 years of industry and academic experience."
      }
    ],
    appliedLearningProject: {
      title: `${title} Industry Capstone`,
      description: `Architect and deploy an end-to-end production application demonstrating all core competencies acquired throughout the ${title} curriculum.`,
      deliverable: "Complete open-source repository with documentation, unit test suite, and deployment configuration.",
      tools: ["Git", "VS Code", "Terminal", "Docker"]
    },
    careerOutcomes: {
      percentage: 91,
      outcomeText: "of graduates reported significant skill advancement and improved readiness for engineering roles.",
      averageSalary: "₹26,00,000 / year"
    },
    faqs: [
      {
        question: "Can I audit this course for free?",
        answer: "Yes! You can audit all reading materials, lecture explanations, and interactive coding challenges for free."
      },
      {
        question: "How long do I have access to course materials?",
        answer: "Once enrolled, you retain permanent lifetime access to all course resources, lecture notes, and challenge katas."
      }
    ],
    reviews: [
      {
        id: "rev-def-1",
        author: "Cameron Reed",
        role: "Software Developer",
        company: "Atlassian",
        rating: 5,
        date: "January 2026",
        comment: "Clear explanations, excellent hands-on challenge katas, and great pacing. Highly recommended.",
        verified: true
      }
    ],
    officialVideoId,
    officialVideoSource: "YouTube",
    officialPortalUrl,
    videoChapters: [
      { title: "Course Introduction & Objectives", timestamp: "00:00", seconds: 0 },
      { title: "Core Architectural Principles", timestamp: "10:30", seconds: 630 },
      { title: "Hands-on Implementation Walkthrough", timestamp: "25:00", seconds: 1500 }
    ]
  }
}
