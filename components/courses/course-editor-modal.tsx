"use client"

import React, { useState, useEffect, useRef } from "react"
import {
  X,
  Save,
  Loader2,
  BookOpen,
  Sparkles,
  Layers,
  GraduationCap,
  Building2,
  Clock,
  Star,
  Check,
  Image as ImageIcon,
  Plus,
  Trash2,
  HelpCircle,
  Award,
  Eye,
  Target,
  Code2,
  ExternalLink,
  ChevronRight,
  Shield,
  Zap,
  Upload,
  RotateCw,
  FlipHorizontal,
  ZoomIn,
  RefreshCw,
  Sun,
  Crop,
  SlidersHorizontal,
  Wand2,
  Globe,
  Sliders,
  CheckCircle2,
} from "lucide-react"
import { UnifiedCourse } from "@/lib/courses-store"

type TabKey = "details" | "media" | "partner" | "curriculum" | "faqs"

interface CourseEditorModalProps {
  isOpen: boolean
  onClose: () => void
  course: UnifiedCourse | null
  onSave: (payload: { isNew: boolean; course: any }) => Promise<void>
  initialTab?: TabKey
}

const CATEGORIES = [
  "AI & ML",
  "Data Science",
  "Cybersecurity",
  "Systems & Languages",
  "Web & Full-Stack",
  "Languages & Web",
  "Programming",
  "Web Development",
  "Git & DevOps",
  "Cloud & Infra",
  "DSA",
  "Backend",
]

const LEVELS = ["Beginner", "Intermediate", "Advanced", "All Levels"]

const CREDENTIAL_TYPES = [
  "Specialization",
  "Professional Certificate",
  "Course",
  "Degree Pathway",
]

const PARTNER_PRESETS = [
  { name: "Google Career Certificates", logo: "google", type: "Enterprise Tech" },
  { name: "DeepLearning.AI", logo: "deeplearning", type: "AI Research Institute" },
  { name: "IBM Skills Network", logo: "ibm", type: "Enterprise Tech" },
  { name: "Microsoft Learn", logo: "microsoft", type: "Enterprise Tech" },
  { name: "HarvardX", logo: "harvard", type: "University" },
  { name: "Stanford Online", logo: "stanford", type: "University" },
  { name: "Anthropic Claude Academy", logo: "anthropic", type: "AI Safety & Research" },
  { name: "Linux Foundation", logo: "linux", type: "Open Source Foundation" },
  { name: "Vercel & Next.js", logo: "vercel", type: "Web Infrastructure" },
  { name: "ASCI Institute", logo: "asci", type: "Accredited Academy" },
]

export interface ImagePresetItem {
  label: string
  category: string
  url: string
}

const IMAGE_PRESETS: ImagePresetItem[] = [
  // AI & ML
  { label: "AI Agents & Autonomous Systems", category: "AI & ML", url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80" },
  { label: "Deep Neural Networks", category: "AI & ML", url: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80" },
  { label: "Generative Models & LLMs", category: "AI & ML", url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80" },
  // Systems
  { label: "Systems Architecture & C++", category: "Systems", url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80" },
  { label: "Kernel & Hardware Chips", category: "Systems", url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80" },
  { label: "Low Latency Terminal Engineering", category: "Systems", url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80" },
  // Data Science
  { label: "Data Science & Visual Intelligence", category: "Data Science", url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80" },
  { label: "Quantitative Analytics & Math", category: "Data Science", url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80" },
  // Cybersecurity
  { label: "Offensive Security & Pentesting", category: "Cybersecurity", url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80" },
  { label: "Digital Vault & Cryptography", category: "Cybersecurity", url: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=1200&q=80" },
  // Web & Cloud
  { label: "Next.js & Modern Web Stack", category: "Web", url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80" },
  { label: "Cloud Native & Kubernetes Racks", category: "Cloud", url: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=1200&q=80" },
]

const PRESET_CATEGORIES = ["All", "AI & ML", "Systems", "Data Science", "Cybersecurity", "Web", "Cloud"]

const POPULAR_SKILL_SUGGESTIONS = [
  "Python", "C++", "PyTorch", "Transformers", "RAG", "LangChain", 
  "Docker", "Kubernetes", "Next.js", "React 19", "PostgreSQL", 
  "System Design", "Distributed Systems", "Algorithms", "Cybersecurity", "Linux"
]

export interface ImageAdjustments {
  brightness: number
  contrast: number
  saturate: number
  zoom: number
  rotation: number
  flipH: boolean
  vignette: number
  filterPreset: string
}

const DEFAULT_ADJUSTMENTS: ImageAdjustments = {
  brightness: 100,
  contrast: 100,
  saturate: 100,
  zoom: 100,
  rotation: 0,
  flipH: false,
  vignette: 45,
  filterPreset: "natural",
}

const FILTER_PRESETS = [
  {
    id: "natural",
    label: "Clean Natural",
    desc: "Original balanced colors",
    icon: Sun,
    settings: { brightness: 100, contrast: 100, saturate: 100 },
  },
  {
    id: "emerald",
    label: "Emerald Brand",
    desc: "ASCI Signature green tone",
    icon: Sparkles,
    settings: { brightness: 96, contrast: 118, saturate: 125 },
  },
  {
    id: "noir",
    label: "Modern Noir",
    desc: "High contrast monochrome",
    icon: Layers,
    settings: { brightness: 90, contrast: 140, saturate: 0 },
  },
  {
    id: "amber",
    label: "Warm Amber",
    desc: "Cyber gold highlights",
    icon: Award,
    settings: { brightness: 104, contrast: 110, saturate: 135 },
  },
  {
    id: "vibrant",
    label: "Vibrant Tech",
    desc: "Punchy and saturated",
    icon: Zap,
    settings: { brightness: 102, contrast: 125, saturate: 155 },
  },
]

export function CourseEditorModal({
  isOpen,
  onClose,
  course,
  onSave,
  initialTab = "details",
}: CourseEditorModalProps) {
  const isEdit = Boolean(course)
  const [activeTab, setActiveTab] = useState<TabKey>(initialTab)

  const [form, setForm] = useState({
    title: "",
    slug: "",
    category: "AI & ML",
    level: "Intermediate",
    weeks: "6 Weeks",
    duration_hours: 40,
    modules: 4,
    lessons: 12,
    partner: "DeepLearning.AI",
    partnerType: "AI Research Institute",
    partnerLogo: "deeplearning",
    credentialType: "Specialization",
    rating: 4.9,
    ratingCount: "50,000 ratings",
    enrolledCount: "120,000 enrolled",
    skillsStr: "PyTorch, Transformers, LangChain",
    description: "",
    thumbnail: IMAGE_PRESETS[0].url,
    is_premium: false,
    is_published: true,
    certificate: "Specialization of Completion",
    outcomes: [
      "Master core architectural concepts and algorithmic thinking",
      "Develop hands-on production code in isolated sandbox environments",
      "Implement end-to-end industry patterns with automated test validation"
    ],
    prerequisites: "Basic programming fundamentals and command line familiarity",
    targetRoles: "Software Engineer, Systems Developer, Technical Lead",
    capstoneTitle: "Production-grade Capstone Implementation",
    capstoneDesc: "Architect and ship a complete enterprise project meeting all benchmark performance criteria.",
    faqs: [
      { question: "What are the prerequisites for this course?", answer: "Foundational programming experience and comfort with command-line tools is recommended." },
      { question: "Will I receive an industry certificate upon completion?", answer: "Yes, completing all modules and passing the capstone project awards a verified certificate." }
    ]
  })

  // Easy Image Controls
  const [adjustments, setAdjustments] = useState<ImageAdjustments>(DEFAULT_ADJUSTMENTS)
  const [originalThumbnail, setOriginalThumbnail] = useState<string | null>(null)
  const [presetCategory, setPresetCategory] = useState("All")
  const [imageSourceMode, setImageSourceMode] = useState<"presets" | "upload" | "url">("presets")
  const [customUrlInput, setCustomUrlInput] = useState("")
  const [isDragging, setIsDragging] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [isSaving, setIsSaving] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab)
    }
  }, [isOpen, initialTab])

  useEffect(() => {
    if (course) {
      const cData = course.courseraData || {}
      const initialThumb = course.thumbnail_url || cData.thumbnail || IMAGE_PRESETS[0].url
      setForm({
        title: course.title || "",
        slug: course.slug || course.id || "",
        category: course.category || "AI & ML",
        level: course.level || (course as any).difficulty || "Intermediate",
        weeks: course.weeks || `${Math.max(1, Math.round((course.duration_hours || 40) / 6))} Weeks`,
        duration_hours: course.duration_hours || 40,
        modules: course.modules || 4,
        lessons: course.lessons || (course.modules ? course.modules * 3 : 12),
        partner: cData.partner || "ASCI Institute",
        partnerType: cData.partnerType || "Accredited Academy",
        partnerLogo: cData.partnerLogo || "asci",
        credentialType: cData.credentialType || "Specialization",
        rating: cData.rating || 4.9,
        ratingCount: cData.ratingCount || "42,000 ratings",
        enrolledCount: cData.enrolledCount || "100,000 enrolled",
        skillsStr: (cData.skills || course.tools || []).join(", "),
        description: course.description || "",
        thumbnail: initialThumb,
        is_premium: Boolean(course.is_premium),
        is_published: course.is_published ?? true,
        certificate: course.certificate || `${cData.credentialType || "Specialization"} of Completion`,
        outcomes: cData.whatYouWillLearn && cData.whatYouWillLearn.length > 0
          ? [...cData.whatYouWillLearn]
          : [
              "Master core architectural concepts and algorithmic thinking",
              "Develop hands-on production code in isolated sandbox environments",
              "Implement end-to-end industry patterns with automated test validation"
            ],
        prerequisites: (cData as any).prerequisites || "Basic programming fundamentals and command line familiarity",
        targetRoles: "Software Engineer, Systems Developer, Technical Lead",
        capstoneTitle: cData.appliedLearningProject?.title || "Production-grade Capstone Implementation",
        capstoneDesc: cData.appliedLearningProject?.description || "Architect and ship a complete enterprise project meeting all benchmark performance criteria.",
        faqs: cData.faqs && cData.faqs.length > 0
          ? [...cData.faqs]
          : [
              { question: "What are the prerequisites for this course?", answer: "Foundational programming experience and comfort with command-line tools is recommended." },
              { question: "Will I receive an industry certificate upon completion?", answer: "Yes, completing all modules and passing the capstone project awards a verified certificate." }
            ]
      })
      setOriginalThumbnail(initialThumb)
      setCustomUrlInput(initialThumb)
    } else {
      const defaultThumb = IMAGE_PRESETS[0].url
      setForm({
        title: "",
        slug: "",
        category: "AI & ML",
        level: "Beginner",
        weeks: "4 Weeks",
        duration_hours: 32,
        modules: 4,
        lessons: 12,
        partner: "Google Career Certificates",
        partnerType: "Enterprise Tech",
        partnerLogo: "google",
        credentialType: "Professional Certificate",
        rating: 4.9,
        ratingCount: "15,000 ratings",
        enrolledCount: "45,000 enrolled",
        skillsStr: "Python, Problem Solving, Machine Learning",
        description: "",
        thumbnail: defaultThumb,
        is_premium: false,
        is_published: true,
        certificate: "Professional Certificate of Completion",
        outcomes: [
          "Master core architectural concepts and algorithmic thinking",
          "Develop hands-on production code in isolated sandbox environments",
          "Implement end-to-end industry patterns with automated test validation"
        ],
        prerequisites: "Basic programming fundamentals and command line familiarity",
        targetRoles: "Software Engineer, Systems Developer, Technical Lead",
        capstoneTitle: "Production-grade Capstone Implementation",
        capstoneDesc: "Architect and ship a complete enterprise project meeting all benchmark performance criteria.",
        faqs: [
          { question: "What are the prerequisites for this course?", answer: "Foundational programming experience and comfort with command-line tools is recommended." },
          { question: "Will I receive an industry certificate upon completion?", answer: "Yes, completing all modules and passing the capstone project awards a verified certificate." }
        ]
      })
      setOriginalThumbnail(defaultThumb)
      setCustomUrlInput(defaultThumb)
    }
    setAdjustments(DEFAULT_ADJUSTMENTS)
    setErrorMsg(null)
    setUploadSuccess(false)
  }, [course, isOpen])

  if (!isOpen) return null

  const handleTitleChange = (val: string) => {
    setForm((prev) => {
      const updates: any = { title: val }
      if (!isEdit && (!prev.slug || prev.slug === prev.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"))) {
        updates.slug = val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
      }
      return { ...prev, ...updates }
    })
  }

  const handlePartnerSelect = (partnerName: string) => {
    const preset = PARTNER_PRESETS.find((p) => p.name === partnerName)
    if (preset) {
      setForm((prev) => ({
        ...prev,
        partner: preset.name,
        partnerType: preset.type,
        partnerLogo: preset.logo,
      }))
    } else {
      setForm((prev) => ({ ...prev, partner: partnerName }))
    }
  }

  const addOutcome = () => {
    setForm(prev => ({
      ...prev,
      outcomes: [...prev.outcomes, ""]
    }))
  }

  const updateOutcome = (index: number, val: string) => {
    setForm(prev => {
      const next = [...prev.outcomes]
      next[index] = val
      return { ...prev, outcomes: next }
    })
  }

  const removeOutcome = (index: number) => {
    setForm(prev => ({
      ...prev,
      outcomes: prev.outcomes.filter((_, i) => i !== index)
    }))
  }

  const addFAQ = () => {
    setForm(prev => ({
      ...prev,
      faqs: [...prev.faqs, { question: "", answer: "" }]
    }))
  }

  const updateFAQ = (index: number, field: "question" | "answer", val: string) => {
    setForm(prev => {
      const next = [...prev.faqs]
      next[index] = { ...next[index], [field]: val }
      return { ...prev, faqs: next }
    })
  }

  const removeFAQ = (index: number) => {
    setForm(prev => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index)
    }))
  }

  const addSkillChip = (skill: string) => {
    const existing = form.skillsStr.split(",").map(s => s.trim()).filter(Boolean)
    if (!existing.includes(skill)) {
      setForm(prev => ({
        ...prev,
        skillsStr: existing.length > 0 ? `${prev.skillsStr}, ${skill}` : skill
      }))
    }
  }

  // ── Image Handlers (Simple & Effortless) ───────────────────────────────────
  const processImageFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setErrorMsg("Please upload a standard image file (PNG, JPG, or WebP).")
      return
    }
    const reader = new FileReader()
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string
      if (dataUrl) {
        if (!originalThumbnail) setOriginalThumbnail(form.thumbnail)
        setForm(prev => ({ ...prev, thumbnail: dataUrl }))
        setUploadSuccess(true)
        setTimeout(() => setUploadSuccess(false), 3000)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) processImageFile(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) processImageFile(file)
  }

  const handleApplyPresetFilter = (presetId: string) => {
    const preset = FILTER_PRESETS.find(p => p.id === presetId)
    if (!preset) return
    setAdjustments(prev => ({
      ...prev,
      ...preset.settings,
      filterPreset: presetId,
    }))
  }

  const handleRotate = () => {
    setAdjustments(prev => ({
      ...prev,
      rotation: (prev.rotation + 90) % 360,
    }))
  }

  const handleFlip = () => {
    setAdjustments(prev => ({
      ...prev,
      flipH: !prev.flipH,
    }))
  }

  const handleResetImage = () => {
    if (originalThumbnail) {
      setForm(prev => ({ ...prev, thumbnail: originalThumbnail }))
    }
    setAdjustments(DEFAULT_ADJUSTMENTS)
  }

  const handleApplyCustomUrl = () => {
    if (customUrlInput.trim()) {
      if (!originalThumbnail) setOriginalThumbnail(form.thumbnail)
      setForm(prev => ({ ...prev, thumbnail: customUrlInput.trim() }))
      setUploadSuccess(true)
      setTimeout(() => setUploadSuccess(false), 3000)
    }
  }

  // Active CSS Styles for Live Card
  const activeCssFilter = `contrast(${adjustments.contrast}%) brightness(${adjustments.brightness}%) saturate(${adjustments.saturate}%)`
  const activeCssTransform = `scale(${adjustments.zoom / 100}) rotate(${adjustments.rotation}deg) scaleX(${adjustments.flipH ? -1 : 1})`

  // Filtered Presets
  const filteredPresets = presetCategory === "All"
    ? IMAGE_PRESETS
    : IMAGE_PRESETS.filter(p => p.category === presetCategory)

  // ── Form Submit ────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title.trim()) {
      setErrorMsg("Please enter a course title.")
      return
    }
    if (!form.slug.trim()) {
      setErrorMsg("Please enter a URL slug.")
      return
    }

    setIsSaving(true)
    setErrorMsg(null)

    const skills = form.skillsStr
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)

    const cleanOutcomes = form.outcomes.map(o => o.trim()).filter(Boolean)
    const cleanFaqs = form.faqs.filter(f => f.question.trim() && f.answer.trim())

    const payload = {
      title: form.title.trim(),
      slug: form.slug.trim(),
      category: form.category,
      level: form.level,
      difficulty: form.level,
      weeks: form.weeks.trim() || `${Math.max(1, Math.round(form.duration_hours / 6))} Weeks`,
      duration_hours: Number(form.duration_hours) || 40,
      modules: Number(form.modules) || 4,
      lessons: Number(form.lessons) || (Number(form.modules) * 3),
      projects: 2,
      certificate: form.certificate.trim() || `${form.credentialType} of Completion`,
      is_premium: form.is_premium,
      is_published: form.is_published,
      description: form.description.trim() || `${form.title} — Comprehensive curriculum track.`,
      thumbnail_url: form.thumbnail,
      thumbnail: form.thumbnail,
      tools: skills,
      partner: form.partner,
      partnerType: form.partnerType,
      partnerLogo: form.partnerLogo,
      credentialType: form.credentialType as any,
      rating: Number(form.rating) || 4.9,
      ratingCount: form.ratingCount,
      enrolledCount: form.enrolledCount,
      skills,
      courseraData: {
        partner: form.partner,
        partnerType: form.partnerType,
        partnerLogo: form.partnerLogo,
        rating: Number(form.rating) || 4.9,
        ratingCount: form.ratingCount,
        enrolledCount: form.enrolledCount,
        credentialType: form.credentialType,
        skills,
        whatYouWillLearn: cleanOutcomes,
        thumbnail: form.thumbnail,
        appliedLearningProject: {
          title: form.capstoneTitle,
          description: form.capstoneDesc,
        },
        faqs: cleanFaqs,
      },
    }

    try {
      await onSave({ isNew: !isEdit, course: payload })
      onClose()
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to save course changes.")
    } finally {
      setIsSaving(false)
    }
  }

  const currentSkills = form.skillsStr
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="bg-card border border-hairline rounded-3xl w-full max-w-6xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* ── Top Bar ────────────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-hairline bg-secondary/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold">
                  {isEdit ? "Edit Course Details" : "Create New Course"}
                </span>
                <span className="text-[10px] font-mono text-muted-foreground">
                  • {form.category}
                </span>
              </div>
              <h2 className="font-serif text-lg text-foreground font-semibold truncate max-w-lg">
                {form.title || "Untitled Course Program"}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full border border-hairline hover:bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              title="Close editor"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ── Clean Tab Switcher ────────────────────────────────────────────── */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-hairline bg-secondary/20 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab("details")}
            className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-mono border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "details"
                ? "border-primary text-primary font-bold"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>1. Course Info</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("media")}
            className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-mono border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "media"
                ? "border-primary text-primary font-bold"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5 text-[#D4B872]" />
            <span>2. Cover Image</span>
            <span className="px-1.5 py-0.2 rounded-full bg-primary/20 text-primary text-[9px] font-semibold">Easy Edit</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("partner")}
            className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-mono border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "partner"
                ? "border-primary text-primary font-bold"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>3. Partner & Credential</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("curriculum")}
            className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-mono border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "curriculum"
                ? "border-primary text-primary font-bold"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            <span>4. What Students Learn</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("faqs")}
            className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-mono border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "faqs"
                ? "border-primary text-primary font-bold"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>5. FAQs</span>
          </button>
        </div>

        {/* ── Main Workspace (Side-by-Side Dual Pane) ────────────────────────── */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto p-6">
            {errorMsg && (
              <div className="mb-4 p-3.5 rounded-2xl bg-destructive/10 border border-destructive/20 text-destructive text-xs flex items-center gap-2.5">
                <X className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="grid lg:grid-cols-12 gap-8 items-start">
              
              {/* LEFT COLUMN: Clean Form Controls (7 of 12 cols) */}
              <div className="lg:col-span-7 space-y-6">

                {/* TAB 1: BASIC COURSE INFO */}
                {activeTab === "details" && (
                  <div className="space-y-4 animate-in fade-in duration-150">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                        Course Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        placeholder="e.g. Deep Learning Specialization"
                        className="w-full bg-secondary/60 border border-hairline rounded-xl px-4 py-3 text-sm text-foreground font-medium focus:outline-none focus:border-primary shadow-2xs"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3.5">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                          URL Link (Slug) *
                        </label>
                        <input
                          type="text"
                          required
                          value={form.slug}
                          onChange={(e) => setForm({ ...form, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, "-") })}
                          placeholder="e.g. deep-learning-specialization"
                          className="w-full bg-secondary/60 border border-hairline rounded-xl px-3.5 py-2.5 text-xs text-foreground font-mono focus:outline-none focus:border-primary shadow-2xs"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                          Topic Discipline
                        </label>
                        <select
                          value={form.category}
                          onChange={(e) => setForm({ ...form, category: e.target.value })}
                          className="w-full bg-secondary/60 border border-hairline rounded-xl px-3.5 py-2.5 text-xs text-foreground font-mono focus:outline-none focus:border-primary shadow-2xs cursor-pointer"
                        >
                          {CATEGORIES.map((cat) => (
                            <option key={cat} value={cat} className="bg-card text-foreground">
                              {cat}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                          Skill Level
                        </label>
                        <select
                          value={form.level}
                          onChange={(e) => setForm({ ...form, level: e.target.value })}
                          className="w-full bg-secondary/60 border border-hairline rounded-xl px-3.5 py-2.5 text-xs text-foreground font-mono focus:outline-none focus:border-primary shadow-2xs cursor-pointer"
                        >
                          {LEVELS.map((lvl) => (
                            <option key={lvl} value={lvl} className="bg-card text-foreground">
                              {lvl}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                          Estimated Duration
                        </label>
                        <input
                          type="text"
                          value={form.weeks}
                          onChange={(e) => setForm({ ...form, weeks: e.target.value })}
                          placeholder="e.g. 6 Weeks (40 hrs)"
                          className="w-full bg-secondary/60 border border-hairline rounded-xl px-3.5 py-2.5 text-xs text-foreground font-mono focus:outline-none focus:border-primary shadow-2xs"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      <label className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                        Short Course Description
                      </label>
                      <textarea
                        rows={3}
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        placeholder="Provide a clear, inviting overview of the curriculum and what makes it valuable..."
                        className="w-full bg-secondary/60 border border-hairline rounded-xl p-3.5 text-xs text-foreground leading-relaxed focus:outline-none focus:border-primary shadow-2xs resize-none"
                      />
                    </div>

                    {/* Simple Visibility & Tier Switches */}
                    <div className="grid sm:grid-cols-2 gap-3 pt-2 border-t border-hairline">
                      <div className="flex items-center justify-between p-3 rounded-2xl border border-hairline bg-secondary/50">
                        <div>
                          <span className="text-xs font-mono font-semibold text-foreground block">
                            Publish to Catalog
                          </span>
                          <span className="text-[11px] text-muted-foreground">
                            {form.is_published ? "Visible on website" : "Hidden (Draft)"}
                          </span>
                        </div>
                        <input
                          type="checkbox"
                          checked={form.is_published}
                          onChange={(e) => setForm({ ...form, is_published: e.target.checked })}
                          className="w-4 h-4 rounded accent-primary cursor-pointer"
                        />
                      </div>

                      <div className="flex items-center justify-between p-3 rounded-2xl border border-hairline bg-secondary/50">
                        <div>
                          <span className="text-xs font-mono font-semibold text-foreground block">
                            Architect Pro Tier
                          </span>
                          <span className="text-[11px] text-muted-foreground">
                            {form.is_premium ? "Requires Pro Plan" : "Free for all scholars"}
                          </span>
                        </div>
                        <input
                          type="checkbox"
                          checked={form.is_premium}
                          onChange={(e) => setForm({ ...form, is_premium: e.target.checked })}
                          className="w-4 h-4 rounded accent-primary cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: COVER IMAGE (SIMPLE & EASY) */}
                {activeTab === "media" && (
                  <div className="space-y-5 animate-in fade-in duration-150">
                    {/* Mode Selector */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                        Choose Cover Image
                      </span>
                      <div className="inline-flex rounded-xl p-0.5 bg-secondary border border-hairline">
                        <button
                          type="button"
                          onClick={() => setImageSourceMode("presets")}
                          className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                            imageSourceMode === "presets"
                              ? "bg-primary text-primary-foreground font-semibold shadow-2xs"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          Curated Photos
                        </button>
                        <button
                          type="button"
                          onClick={() => setImageSourceMode("upload")}
                          className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                            imageSourceMode === "upload"
                              ? "bg-primary text-primary-foreground font-semibold shadow-2xs"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          Upload File
                        </button>
                        <button
                          type="button"
                          onClick={() => setImageSourceMode("url")}
                          className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                            imageSourceMode === "url"
                              ? "bg-primary text-primary-foreground font-semibold shadow-2xs"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          Web URL
                        </button>
                      </div>
                    </div>

                    {/* SOURCE 1: CURATED PHOTO PRESETS */}
                    {imageSourceMode === "presets" && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
                          {PRESET_CATEGORIES.map(cat => (
                            <button
                              type="button"
                              key={cat}
                              onClick={() => setPresetCategory(cat)}
                              className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition-all cursor-pointer whitespace-nowrap border ${
                                presetCategory === cat
                                  ? "bg-primary/20 border-primary/40 text-primary font-bold"
                                  : "bg-secondary/60 border-hairline text-muted-foreground hover:text-foreground"
                              }`}
                            >
                              {cat}
                            </button>
                          ))}
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-56 overflow-y-auto pr-1">
                          {filteredPresets.map((p) => {
                            const isCurrent = form.thumbnail === p.url
                            return (
                              <button
                                type="button"
                                key={p.label}
                                onClick={() => setForm({ ...form, thumbnail: p.url })}
                                className={`p-2 rounded-2xl border text-left transition-all cursor-pointer group relative overflow-hidden ${
                                  isCurrent
                                    ? "border-primary bg-primary/10 ring-2 ring-primary/40 shadow-sm"
                                    : "border-hairline bg-secondary/50 hover:border-primary/40"
                                }`}
                              >
                                <div className="aspect-[16/9] w-full rounded-xl overflow-hidden mb-1.5 bg-stone-900 relative">
                                  <img src={p.url} alt={p.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200" />
                                  {isCurrent && (
                                    <div className="absolute inset-0 bg-primary/25 flex items-center justify-center">
                                      <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-xs">
                                        <Check className="w-3.5 h-3.5" />
                                      </div>
                                    </div>
                                  )}
                                </div>
                                <span className="text-[10px] font-mono font-semibold text-foreground truncate block">
                                  {p.label}
                                </span>
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    )}

                    {/* SOURCE 2: LOCAL FILE UPLOAD */}
                    {imageSourceMode === "upload" && (
                      <div className="space-y-2">
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                        <div
                          onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
                          onDragLeave={() => setIsDragging(false)}
                          onDrop={handleDrop}
                          onClick={() => fileInputRef.current?.click()}
                          className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                            isDragging
                              ? "border-primary bg-primary/10 scale-[1.01]"
                              : "border-hairline bg-secondary/40 hover:bg-secondary/70 hover:border-primary/40"
                          }`}
                        >
                          <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary mx-auto flex items-center justify-center mb-2">
                            <Upload className="w-5 h-5" />
                          </div>
                          <h4 className="text-xs font-mono font-bold text-foreground">
                            Click to upload or drag image here
                          </h4>
                          <p className="text-[11px] text-muted-foreground mt-0.5">
                            Supports PNG, JPG, WebP from your computer
                          </p>
                        </div>
                        {uploadSuccess && (
                          <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-mono flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4" /> Image uploaded and applied to preview!
                          </div>
                        )}
                      </div>
                    )}

                    {/* SOURCE 3: WEB URL */}
                    {imageSourceMode === "url" && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <input
                            type="url"
                            value={customUrlInput}
                            onChange={(e) => setCustomUrlInput(e.target.value)}
                            placeholder="Paste image address (https://...)"
                            className="flex-1 bg-secondary/60 border border-hairline rounded-xl px-3.5 py-2.5 text-xs text-foreground font-mono focus:outline-none focus:border-primary shadow-2xs"
                          />
                          <button
                            type="button"
                            onClick={handleApplyCustomUrl}
                            className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-mono font-semibold hover:bg-primary-active transition-all cursor-pointer"
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                    )}

                    {/* 1-Click Aesthetic Filters */}
                    <div className="space-y-2.5 pt-3 border-t border-hairline">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-primary" />
                          <span>Quick Style Filters</span>
                        </span>
                        <button
                          type="button"
                          onClick={handleResetImage}
                          className="text-[10px] font-mono text-primary hover:underline cursor-pointer flex items-center gap-1"
                        >
                          <RefreshCw className="w-3 h-3" /> Reset Image
                        </button>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                        {FILTER_PRESETS.map((p) => {
                          const isSelected = adjustments.filterPreset === p.id
                          return (
                            <button
                              type="button"
                              key={p.id}
                              onClick={() => handleApplyPresetFilter(p.id)}
                              className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                                isSelected
                                  ? "border-primary bg-primary/10 shadow-xs ring-1 ring-primary/30"
                                  : "border-hairline bg-secondary/50 hover:bg-secondary"
                              }`}
                            >
                              <div className="text-[11px] font-mono font-semibold text-foreground truncate">
                                {p.label}
                              </div>
                              <div className="text-[9px] font-mono text-muted-foreground truncate">
                                {p.desc}
                              </div>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Simple Sliders: Brightness, Zoom, Fade */}
                    <div className="grid sm:grid-cols-3 gap-3 p-3.5 rounded-2xl bg-secondary/40 border border-hairline">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[11px] font-mono">
                          <span className="text-muted-foreground">Brightness</span>
                          <span className="text-foreground">{adjustments.brightness}%</span>
                        </div>
                        <input
                          type="range"
                          min="70"
                          max="130"
                          value={adjustments.brightness}
                          onChange={(e) => setAdjustments({ ...adjustments, brightness: Number(e.target.value), filterPreset: "custom" })}
                          className="w-full accent-primary h-1.5 bg-secondary rounded-lg cursor-pointer"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[11px] font-mono">
                          <span className="text-muted-foreground">Zoom / Crop</span>
                          <span className="text-foreground">{adjustments.zoom}%</span>
                        </div>
                        <input
                          type="range"
                          min="100"
                          max="160"
                          value={adjustments.zoom}
                          onChange={(e) => setAdjustments({ ...adjustments, zoom: Number(e.target.value) })}
                          className="w-full accent-primary h-1.5 bg-secondary rounded-lg cursor-pointer"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[11px] font-mono">
                          <span className="text-muted-foreground">Dark Bottom Vignette</span>
                          <span className="text-foreground">{adjustments.vignette}%</span>
                        </div>
                        <input
                          type="range"
                          min="10"
                          max="80"
                          value={adjustments.vignette}
                          onChange={(e) => setAdjustments({ ...adjustments, vignette: Number(e.target.value) })}
                          className="w-full accent-primary h-1.5 bg-secondary rounded-lg cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* Rotate & Flip Helpers */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleRotate}
                        className="px-3 py-1.5 rounded-xl border border-hairline bg-secondary text-xs font-mono text-muted-foreground hover:text-foreground flex items-center gap-1.5 cursor-pointer"
                      >
                        <RotateCw className="w-3.5 h-3.5" /> Rotate 90°
                      </button>
                      <button
                        type="button"
                        onClick={handleFlip}
                        className="px-3 py-1.5 rounded-xl border border-hairline bg-secondary text-xs font-mono text-muted-foreground hover:text-foreground flex items-center gap-1.5 cursor-pointer"
                      >
                        <FlipHorizontal className="w-3.5 h-3.5" /> Mirror Image
                      </button>
                    </div>
                  </div>
                )}

                {/* TAB 3: PARTNER & CERTIFICATE */}
                {activeTab === "partner" && (
                  <div className="space-y-4 animate-in fade-in duration-150">
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold block">
                        Accredited Partner
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {PARTNER_PRESETS.map((p) => {
                          const isSelected = form.partner === p.name
                          return (
                            <button
                              type="button"
                              key={p.name}
                              onClick={() => handlePartnerSelect(p.name)}
                              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                                isSelected
                                  ? "border-primary bg-primary/10 text-primary shadow-2xs font-semibold"
                                  : "border-hairline bg-secondary/50 text-muted-foreground hover:text-foreground"
                              }`}
                            >
                              <span className="text-xs truncate block">{p.name}</span>
                              <span className="text-[10px] font-mono opacity-70 block">{p.type}</span>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3.5 pt-2 border-t border-hairline">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                          Custom Partner Name
                        </label>
                        <input
                          type="text"
                          value={form.partner}
                          onChange={(e) => setForm({ ...form, partner: e.target.value })}
                          placeholder="e.g. Stanford Online"
                          className="w-full bg-secondary/60 border border-hairline rounded-xl px-3.5 py-2.5 text-xs text-foreground font-medium focus:outline-none focus:border-primary shadow-2xs"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                          Credential Type
                        </label>
                        <select
                          value={form.credentialType}
                          onChange={(e) => setForm({ ...form, credentialType: e.target.value as any })}
                          className="w-full bg-secondary/60 border border-hairline rounded-xl px-3.5 py-2.5 text-xs text-foreground font-mono focus:outline-none focus:border-primary shadow-2xs cursor-pointer"
                        >
                          {CREDENTIAL_TYPES.map((ct) => (
                            <option key={ct} value={ct} className="bg-card text-foreground">
                              {ct}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1.5 sm:col-span-2">
                        <label className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                          Certificate Title on Completion
                        </label>
                        <input
                          type="text"
                          value={form.certificate}
                          onChange={(e) => setForm({ ...form, certificate: e.target.value })}
                          placeholder="e.g. Professional Certificate of Completion"
                          className="w-full bg-secondary/60 border border-hairline rounded-xl px-3.5 py-2.5 text-xs text-foreground font-medium focus:outline-none focus:border-primary shadow-2xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2 border-t border-hairline">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                          Public Rating (1.0 to 5.0)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          min="1.0"
                          max="5.0"
                          value={form.rating}
                          onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
                          className="w-full bg-secondary/60 border border-hairline rounded-xl px-3.5 py-2.5 text-xs text-foreground font-mono focus:outline-none focus:border-primary shadow-2xs"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                          Learner Count Text
                        </label>
                        <input
                          type="text"
                          value={form.enrolledCount}
                          onChange={(e) => setForm({ ...form, enrolledCount: e.target.value })}
                          placeholder="e.g. 120,000 enrolled"
                          className="w-full bg-secondary/60 border border-hairline rounded-xl px-3.5 py-2.5 text-xs text-foreground font-mono focus:outline-none focus:border-primary shadow-2xs"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 4: WHAT STUDENTS LEARN */}
                {activeTab === "curriculum" && (
                  <div className="space-y-4 animate-in fade-in duration-150">
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold flex items-center justify-between">
                        <span>Core Skills Taught</span>
                        <span className="text-[10px] text-muted-foreground font-normal">{currentSkills.length} tagged</span>
                      </label>
                      <input
                        type="text"
                        value={form.skillsStr}
                        onChange={(e) => setForm({ ...form, skillsStr: e.target.value })}
                        placeholder="e.g. PyTorch, Transformers, LangChain, Docker"
                        className="w-full bg-secondary/60 border border-hairline rounded-xl px-3.5 py-2.5 text-xs text-foreground font-mono focus:outline-none focus:border-primary shadow-2xs"
                      />

                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        <span className="text-[10px] font-mono text-muted-foreground">Quick Add:</span>
                        {POPULAR_SKILL_SUGGESTIONS.slice(0, 8).map(skill => (
                          <button
                            type="button"
                            key={skill}
                            onClick={() => addSkillChip(skill)}
                            className="px-2 py-0.5 rounded-lg border border-hairline bg-secondary/80 hover:bg-primary/10 text-[10px] font-mono text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                          >
                            + {skill}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2.5 pt-2 border-t border-hairline">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                          What Scholars Will Learn (Bullet Points)
                        </label>
                        <button
                          type="button"
                          onClick={addOutcome}
                          className="inline-flex items-center gap-1 text-[11px] font-mono text-primary hover:underline cursor-pointer"
                        >
                          <Plus className="w-3 h-3" /> Add Outcome
                        </button>
                      </div>

                      <div className="space-y-2">
                        {form.outcomes.map((outcome, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-primary/10 text-primary font-mono text-[10px] flex items-center justify-center shrink-0">
                              {idx + 1}
                            </span>
                            <input
                              type="text"
                              value={outcome}
                              onChange={(e) => updateOutcome(idx, e.target.value)}
                              placeholder="e.g. Build production systems with high availability..."
                              className="flex-1 bg-secondary/60 border border-hairline rounded-xl px-3.5 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
                            />
                            <button
                              type="button"
                              onClick={() => removeOutcome(idx)}
                              disabled={form.outcomes.length <= 1}
                              className="p-1.5 text-muted-foreground hover:text-destructive transition-colors disabled:opacity-30 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 5: FAQS */}
                {activeTab === "faqs" && (
                  <div className="space-y-4 animate-in fade-in duration-150">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                          Frequently Asked Questions
                        </h3>
                        <p className="text-[11px] text-muted-foreground">
                          Address common scholar inquiries regarding certificates, time, and prerequisites.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={addFAQ}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-semibold hover:bg-primary/20 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Question
                      </button>
                    </div>

                    <div className="space-y-3">
                      {form.faqs.map((faq, idx) => (
                        <div key={idx} className="p-3.5 rounded-2xl border border-hairline bg-secondary/40 space-y-2">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] font-mono text-primary uppercase tracking-wider font-bold">
                              Q#{idx + 1}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeFAQ(idx)}
                              className="text-muted-foreground hover:text-destructive p-1 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <input
                            type="text"
                            value={faq.question}
                            onChange={(e) => updateFAQ(idx, "question", e.target.value)}
                            placeholder="Question..."
                            className="w-full bg-card border border-hairline rounded-xl px-3 py-1.5 text-xs text-foreground font-medium focus:outline-none focus:border-primary"
                          />

                          <textarea
                            rows={2}
                            value={faq.answer}
                            onChange={(e) => updateFAQ(idx, "answer", e.target.value)}
                            placeholder="Answer..."
                            className="w-full bg-card border border-hairline rounded-xl px-3 py-1.5 text-xs text-muted-foreground focus:text-foreground focus:outline-none focus:border-primary resize-none"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* RIGHT COLUMN: Real-Time Live Student Card Preview (5 of 12 cols) */}
              <div className="lg:col-span-5 sticky top-0 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-primary" />
                    <span>Live Student Card Preview</span>
                  </span>
                  <span className="text-[10px] font-mono text-emerald-500 font-bold">
                    Updates Live
                  </span>
                </div>

                {/* Simulated Student Card with Real-time Image Transformations */}
                <div className="rounded-3xl border border-hairline bg-card shadow-xl overflow-hidden">
                  <div className="relative aspect-[16/9] w-full bg-stone-900 overflow-hidden">
                    <img
                      src={form.thumbnail}
                      alt="Preview"
                      style={{
                        filter: activeCssFilter,
                        transform: activeCssTransform,
                      }}
                      className="w-full h-full object-cover transition-all duration-200"
                    />

                    {/* Dark Vignette Overlay */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: `linear-gradient(to top, rgba(6, 33, 18, ${adjustments.vignette / 100}) 0%, rgba(6, 33, 18, ${(adjustments.vignette / 100) * 0.4}) 50%, transparent 100%)`
                      }}
                    />

                    <div className="absolute top-3 left-3 z-10">
                      <span className="rounded-full bg-white/95 dark:bg-stone-900/95 px-2.5 py-0.5 text-[10px] font-mono font-bold text-foreground border border-hairline uppercase tracking-wider">
                        {form.category}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
                      <span className="rounded-full bg-black/60 px-2.5 py-0.5 text-[10px] font-mono font-medium text-white">
                        {form.level}
                      </span>
                    </div>

                    <div className="absolute bottom-2.5 left-3 right-3 text-white flex items-center justify-between text-[11px] font-mono">
                      <span className="truncate">{form.partner}</span>
                      <span className="text-[#D4B872] flex items-center gap-1 shrink-0">
                        <Star className="w-3 h-3 fill-current" /> {form.rating}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 space-y-2.5">
                    <div className="text-[11px] font-mono text-primary font-semibold">
                      {form.credentialType}
                    </div>
                    <h3 className="font-serif text-base font-semibold text-foreground line-clamp-1">
                      {form.title || "Course Program Title"}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {form.description || "Course summary will appear here for prospective scholars..."}
                    </p>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {currentSkills.slice(0, 3).map(s => (
                        <span key={s} className="px-2 py-0.5 rounded-md bg-secondary text-[10px] font-mono text-muted-foreground">
                          {s}
                        </span>
                      ))}
                    </div>

                    <div className="pt-2.5 border-t border-hairline flex items-center justify-between text-xs">
                      <span className="font-mono text-muted-foreground">{form.weeks}</span>
                      <span className="px-3 py-1.5 rounded-xl bg-primary text-primary-foreground font-semibold text-[11px]">
                        Enroll Track
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-2xl border border-hairline bg-secondary/30 text-[11px] text-muted-foreground space-y-1 font-mono">
                  <div className="flex items-center justify-between">
                    <span>Catalog Status:</span>
                    <span className={form.is_published ? "text-emerald-500 font-bold" : "text-stone-400"}>
                      {form.is_published ? "Live in Catalog" : "Draft (Unlisted)"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Access Tier:</span>
                    <span className={form.is_premium ? "text-[#D4B872] font-bold" : "text-foreground"}>
                      {form.is_premium ? "Architect Pro Plan" : "Free Access"}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* ── Sticky Action Footer ────────────────────────────────────────── */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-hairline bg-secondary/40">
            <div className="text-xs text-muted-foreground font-mono">
              {isEdit ? `Editing: ${form.slug}` : "Drafting new curriculum program"}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-hairline bg-secondary text-muted-foreground hover:text-foreground text-xs font-medium transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-primary hover:bg-primary-active text-primary-foreground text-xs font-semibold shadow-xs transition-all cursor-pointer disabled:opacity-50"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    <span>{isEdit ? "Save Changes" : "Create Course"}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

      </div>
    </div>
  )
}
