"use client"

import React, { useState } from "react"
import {
  Trophy,
  Users,
  Calendar,
  Search,
  Filter,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Clock,
  Send,
  Github,
  Globe,
  Award,
  Layers,
  Zap,
  ArrowRight,
  ShieldCheck,
  Check,
  X,
  Plus,
  Edit3,
  Trash2,
  Sliders,
  Star,
  Sparkles
} from "lucide-react"
import { useUnstopEcosystem, HackathonItem } from "@/lib/unstop-store"
import { useAdmin } from "@/context/admin-context"
import { AxelStage } from "@/components/axel/axel-stage"

// ══════════════════════════════════════════════
// AUTHENTIC HACKATHON HOST / ORGANIZER LOGOS
// ══════════════════════════════════════════════
function HackathonHostLogo({ host, logo, className = "w-11 h-11" }: { host: string; logo?: string; className?: string }) {
  const norm = host.toLowerCase()

  if (logo && (logo.startsWith("http") || logo.startsWith("/"))) {
    return (
      <div className={`${className} rounded-xl overflow-hidden bg-card border border-hairline flex items-center justify-center p-1.5 shrink-0 shadow-2xs`}>
        <img src={logo} alt={host} className="w-full h-full object-contain" />
      </div>
    )
  }

  if (norm.includes("google")) {
    return (
      <div className={`${className} rounded-xl bg-white border border-stone-200/80 dark:border-stone-800 flex items-center justify-center shrink-0 shadow-2xs p-2`}>
        <svg viewBox="0 0 24 24" className="w-full h-full">
          <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
          <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
          <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
          <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
        </svg>
      </div>
    )
  }

  if (norm.includes("aws") || norm.includes("amazon")) {
    return (
      <div className={`${className} rounded-xl bg-[#232F3E] text-[#FF9900] border border-amber-500/20 flex items-center justify-center shrink-0 shadow-2xs font-bold text-xs font-mono tracking-tight`}>
        AWS
      </div>
    )
  }

  if (norm.includes("razorpay")) {
    return (
      <div className={`${className} rounded-xl bg-[#0C2340] border border-hairline flex items-center justify-center shrink-0 shadow-2xs p-2`}>
        <svg viewBox="0 0 24 24" className="w-full h-full fill-[#3395FF]">
          <path d="M14.07 1.5L4 13.2h6.15L7.93 22.5 20 9.8h-5.93z" />
        </svg>
      </div>
    )
  }

  if (norm.includes("devfolio") || norm.includes("eth")) {
    return (
      <div className={`${className} rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white flex items-center justify-center shrink-0 shadow-2xs font-bold text-xs font-mono`}>
        DEV
      </div>
    )
  }

  if (norm.includes("asci")) {
    return (
      <div className={`${className} rounded-xl bg-emerald-950 border border-emerald-500/30 flex items-center justify-center shrink-0 shadow-2xs p-1.5`}>
        <img src="/images/asci-logo.png" alt="ASCI" className="w-full h-full object-contain" />
      </div>
    )
  }

  // Fallback Monogram
  return (
    <div className={`${className} rounded-xl bg-gradient-to-br from-emerald-600/20 to-teal-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0 font-bold text-xs font-mono uppercase`}>
      {host.slice(0, 2)}
    </div>
  )
}

export function DashboardHackathons() {
  const { isAdmin } = useAdmin()
  const {
    hackathons,
    registerForHackathon,
    submitHackathonProject,
    addHackathon,
    updateHackathon,
    deleteHackathon,
    teammatePosts,
    addTeammatePost,
    inviteTeammate,
    activeTeammatesCount
  } = useUnstopEcosystem()

  const [mainMode, setMainMode] = useState<"leaderboard" | "challenges" | "teammates">("challenges")
  const [filter, setFilter] = useState<"all" | "registered" | "live" | "big-prizes">("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Dynamic Section Configuration (Editable by Admin)
  const [sectionConfig, setSectionConfig] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("asci_hackathons_section_config")
      if (saved) {
        try { return JSON.parse(saved) } catch (e) {}
      }
    }
    return {
      badge: "Flagship Innovation Arena",
      title: "Competitions & Hackathons Arena",
      description: "Solve industry-grade architectural challenges, compete for ₹10L+ cash prizes, and secure direct interview fast-tracks with engineering leaders."
    }
  })

  // Admin Modals
  const [showHackModal, setShowHackModal] = useState(false)
  const [editingHackId, setEditingHackId] = useState<string | null>(null)
  const [hackFormData, setHackFormData] = useState({
    title: "",
    host: "",
    hostLogoPreset: "Google",
    hostLogoCustom: "",
    prizePool: "₹5,00,000",
    firstPrize: "₹2,50,000 Cash + AWS Credits",
    deadline: "10 days left",
    teamSize: "1-4 Members",
    mode: "Online" as "Online" | "Hybrid" | "In-Person",
    difficulty: "All Welcome" as "All Welcome" | "Intermediate" | "Advanced",
    bannerTag: "Flagship Sprint",
    tagsInput: "Distributed Systems, Microservices, Go",
    problemStatement: "",
  })
  const [deleteConfirmHackId, setDeleteConfirmHackId] = useState<string | null>(null)
  const [showSectionModal, setShowSectionModal] = useState(false)
  const [tempSectionConfig, setTempSectionConfig] = useState(sectionConfig)

  // National Engineering Leaderboard Data
  const leaderboardEntries = [
    { rank: 1, name: "Priya Sharma", college: "IIT Delhi", elo: 2420, tier: "Grandmaster", xp: "12,450 XP", solved: 142, avatar: "/avatars/ninja.png", badge: "🏆 Gold" },
    { rank: 2, name: "Aryan Verma", college: "BITS Pilani", elo: 2340, tier: "Master", xp: "11,800 XP", solved: 136, avatar: "/avatars/hacker.png", badge: "🥈 Silver" },
    { rank: 3, name: "Sneha Nair", college: "NIT Trichy", elo: 2290, tier: "Master", xp: "11,250 XP", solved: 129, avatar: "/avatars/robot.png", badge: "🥉 Bronze" },
    { rank: 4, name: "Rohan Iyer", college: "IIIT Hyderabad", elo: 2180, tier: "Candidate Master", xp: "9,900 XP", solved: 118, avatar: "/avatars/astronaut.png" },
    { rank: 5, name: "Ananya Sen", college: "IIT Bombay", elo: 2120, tier: "Candidate Master", xp: "9,450 XP", solved: 112, avatar: "/avatars/cat.png" },
    { rank: 6, name: "Karthik R", college: "RVCE Bangalore", elo: 2040, tier: "Specialist", xp: "8,900 XP", solved: 104, avatar: "/avatars/skull.png" },
    { rank: 7, name: "Tanvi Deshmukh", college: "COEP Pune", elo: 1980, tier: "Specialist", xp: "8,300 XP", solved: 98, avatar: "/avatars/hacker.png" },
    { rank: 8, name: "Devansh Mehta", college: "DTU Delhi", elo: 1910, tier: "Specialist", xp: "7,850 XP", solved: 92, avatar: "/avatars/robot.png" },
    { rank: 9, name: "Meera Patel", college: "IIT Madras", elo: 1840, tier: "Expert", xp: "7,400 XP", solved: 87, avatar: "/avatars/ninja.png" },
    { rank: 10, name: "Kabir Das", college: "NSUT Delhi", elo: 1760, tier: "Expert", xp: "6,950 XP", solved: 81, avatar: "/avatars/astronaut.png" },
  ]

  const campusRankings = [
    { rank: 1, college: "IIT Delhi", members: 184, totalXp: "94.2k XP", topSpecialty: "Distributed Systems" },
    { rank: 2, college: "BITS Pilani", members: 162, totalXp: "88.5k XP", topSpecialty: "High-Throughput Concurrency" },
    { rank: 3, college: "IIIT Hyderabad", members: 141, totalXp: "81.3k XP", topSpecialty: "Algorithmic Complexity" },
    { rank: 4, college: "NIT Trichy", members: 129, totalXp: "76.8k XP", topSpecialty: "JVM Memory Systems" },
    { rank: 5, college: "IIT Bombay", members: 118, totalXp: "71.4k XP", topSpecialty: "Neural Systems & AI" },
  ]
  
  // Registration Modal State
  const [selectedHackathonForReg, setSelectedHackathonForReg] = useState<HackathonItem | null>(null)
  const [teamName, setTeamName] = useState("")
  const [leaderName, setLeaderName] = useState("")
  const [leaderEmail, setLeaderEmail] = useState("")
  const [selectedTrack, setSelectedTrack] = useState("")
  
  // Submission Modal State
  const [selectedHackathonForSubmit, setSelectedHackathonForSubmit] = useState<HackathonItem | null>(null)
  const [repoUrl, setRepoUrl] = useState("")
  const [demoUrl, setDemoUrl] = useState("")
  const [pitchNotes, setPitchNotes] = useState("")

  // Teammate Post Modal State
  const [showPostTeammateModal, setShowPostTeammateModal] = useState(false)
  const [myAuthorName, setMyAuthorName] = useState("")
  const [myCollege, setMyCollege] = useState("")
  const [myHackathonId, setMyHackathonId] = useState(hackathons[0]?.id || "")
  const [myRole, setMyRole] = useState("")
  const [mySkillsInput, setMySkillsInput] = useState("")
  const [myLookingForInput, setMyLookingForInput] = useState("")
  const [myPitch, setMyPitch] = useState("")
  const [myContactEmail, setMyContactEmail] = useState("")
  
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3500)
  }

  // Filter logic
  const filteredHackathons = hackathons.filter((h) => {
    const matchesSearch =
      h.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.host.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))

    if (!matchesSearch) return false

    if (filter === "registered") return h.isRegistered
    if (filter === "live") return h.rounds.some((r) => r.status === "active" || r.status === "upcoming")
    if (filter === "big-prizes") return h.prizePool.includes("5,00,000") || h.prizePool.includes("3,50,000")
    return true
  })

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedHackathonForReg) return

    registerForHackathon(selectedHackathonForReg.id, {
      teamName: teamName || "Team Alpha",
      leaderName: leaderName || "Lead Engineer",
      leaderEmail: leaderEmail || "lead@asci.edu",
      members: ["Lead", "Partner 1"],
      track: selectedTrack || selectedHackathonForReg.tags[0] || "General Track",
      registeredAt: new Date().toISOString(),
    })

    showToast(`Successfully registered for "${selectedHackathonForReg.title}"!`)
    setSelectedHackathonForReg(null)
    setTeamName("")
    setLeaderName("")
    setLeaderEmail("")
    setSelectedTrack("")
  }

  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedHackathonForSubmit) return

    submitHackathonProject(selectedHackathonForSubmit.id, {
      repoUrl: repoUrl || "https://github.com/asci-candidate/hackathon-submission",
      demoUrl: demoUrl || "https://prototype.asci.app",
      notes: pitchNotes,
      submittedAt: new Date().toISOString(),
    })

    showToast(`Project submission confirmed for "${selectedHackathonForSubmit.title}"!`)
    setSelectedHackathonForSubmit(null)
    setRepoUrl("")
    setDemoUrl("")
    setPitchNotes("")
  }

  const handlePostTeammate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!myAuthorName || !myPitch) return
    const targetHack = hackathons.find((h) => h.id === myHackathonId) || hackathons[0]
    addTeammatePost({
      authorName: myAuthorName,
      authorAvatar: "/avatars/hacker.png",
      college: myCollege || "Engineering University",
      hackathonId: targetHack?.id || "general",
      hackathonTitle: targetHack?.title || "National Hackathon",
      role: myRole || "Full-Stack Engineer",
      skills: mySkillsInput.split(",").map((s) => s.trim()).filter(Boolean),
      lookingFor: myLookingForInput.split(",").map((s) => s.trim()).filter(Boolean),
      pitch: myPitch,
      contactEmail: myContactEmail || "candidate@asci.edu",
    })
    showToast("Teammate pitch published to ASCI Matchmaker!")
    setShowPostTeammateModal(false)
    setMyAuthorName("")
    setMyPitch("")
    setMySkillsInput("")
    setMyLookingForInput("")
  }

  const openCreateHackathon = () => {
    setEditingHackId(null)
    setHackFormData({
      title: "",
      host: "Google Cloud",
      hostLogoPreset: "Google",
      hostLogoCustom: "",
      prizePool: "₹5,00,000",
      firstPrize: "₹2,50,000 Cash + Cloud Credits",
      deadline: "14 days left",
      teamSize: "1-4 Members",
      mode: "Online",
      difficulty: "All Welcome",
      bannerTag: "Flagship Sprint",
      tagsInput: "Distributed Systems, AI Agents, Go",
      problemStatement: "Architect a resilient real-time platform capable of scaling under high-throughput production load with automated fallback.",
    })
    setShowHackModal(true)
  }

  const openEditHackathon = (hack: HackathonItem) => {
    setEditingHackId(hack.id)
    setHackFormData({
      title: hack.title,
      host: hack.host,
      hostLogoPreset: hack.hostLogoPreset || (hack.host.toLowerCase().includes("google") ? "Google" : hack.host.toLowerCase().includes("amazon") || hack.host.toLowerCase().includes("aws") ? "AWS" : hack.host.toLowerCase().includes("razorpay") ? "Razorpay" : hack.host.toLowerCase().includes("devfolio") ? "Devfolio" : "ASCI Academy"),
      hostLogoCustom: hack.hostLogoCustom || "",
      prizePool: hack.prizePool,
      firstPrize: hack.firstPrize,
      deadline: hack.deadline,
      teamSize: hack.teamSize,
      mode: hack.mode,
      difficulty: hack.difficulty,
      bannerTag: hack.bannerTag,
      tagsInput: hack.tags.join(", "),
      problemStatement: hack.problemStatement,
    })
    setShowHackModal(true)
  }

  const handleSaveHackathon = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!hackFormData.title || !hackFormData.host) {
      showToast("Please provide title and host name.")
      return
    }

    const tags = hackFormData.tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)

    if (editingHackId) {
      await updateHackathon(editingHackId, {
        title: hackFormData.title,
        host: hackFormData.host,
        hostLogoPreset: hackFormData.hostLogoPreset,
        hostLogoCustom: hackFormData.hostLogoCustom,
        prizePool: hackFormData.prizePool,
        firstPrize: hackFormData.firstPrize,
        deadline: hackFormData.deadline,
        teamSize: hackFormData.teamSize,
        mode: hackFormData.mode,
        difficulty: hackFormData.difficulty,
        bannerTag: hackFormData.bannerTag,
        tags: tags.length ? tags : ["Engineering", "Hackathon"],
        problemStatement: hackFormData.problemStatement,
      })
      showToast(`Updated hackathon: ${hackFormData.title}`)
    } else {
      await addHackathon({
        title: hackFormData.title,
        host: hackFormData.host,
        hostLogoPreset: hackFormData.hostLogoPreset,
        hostLogoCustom: hackFormData.hostLogoCustom,
        prizePool: hackFormData.prizePool,
        firstPrize: hackFormData.firstPrize,
        deadline: hackFormData.deadline,
        teamSize: hackFormData.teamSize,
        mode: hackFormData.mode,
        difficulty: hackFormData.difficulty,
        bannerTag: hackFormData.bannerTag,
        tags: tags.length ? tags : ["Engineering", "Hackathon"],
        problemStatement: hackFormData.problemStatement,
      })
      showToast(`Created new hackathon: ${hackFormData.title}`)
    }
    setShowHackModal(false)
    setEditingHackId(null)
  }

  const handleDeleteHackathon = async (id: string) => {
    await deleteHackathon(id)
    setDeleteConfirmHackId(null)
    showToast("Hackathon deleted successfully.")
  }

  const handleSaveSectionConfig = (e: React.FormEvent) => {
    e.preventDefault()
    setSectionConfig(tempSectionConfig)
    if (typeof window !== "undefined") {
      localStorage.setItem("asci_hackathons_section_config", JSON.stringify(tempSectionConfig))
    }
    setShowSectionModal(false)
    showToast("Section customized successfully!")
  }

  const totalPrizeSum = "₹11,00,000+"
  const totalCompetitors = hackathons.reduce((acc, h) => acc + h.registeredCount, 0)
  const userRegisteredCount = hackathons.filter((h) => h.isRegistered).length

  return (
    <div className="space-y-8 animate-fadeIn" id="dashboard-hackathons-section">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-8 z-50 rounded-xl border border-primary/40 bg-card p-4 shadow-lg flex items-center gap-3 text-xs font-mono text-foreground animate-fadeIn">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ══════════════════════════════════════════════
          Header & Axel Anchor
      ══════════════════════════════════════════════ */}
      <div id="dashboard-hackathons-header" className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-hairline">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
              <Trophy className="w-3 h-3" />
              {sectionConfig.badge}
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-foreground">
            {sectionConfig.title}
          </h1>
          <p className="text-xs text-muted-foreground mt-1 max-w-2xl">
            {sectionConfig.description}
          </p>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          <AxelStage
            id="dashboard-hackathons-robot-anchor"
            sectionId="dashboard-hackathons-header"
            label="Hackathon Strategist"
            emotion="shocked"
            scale={0.44}
            size="sm"
          />
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          Admin Controls Ribbon (Visible to Administrators)
      ══════════════════════════════════════════════ */}
      {isAdmin && (
        <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 via-emerald-900/20 to-teal-950/40 backdrop-blur-md p-4 sm:p-5 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 shadow-inner">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                  Admin Mode Active
                </span>
                <span className="inline-flex items-center rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-mono text-emerald-300">
                  Arena &amp; Challenge Suite
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Launch new national hackathons, adjust problem statements and prize pools, or customize section copy.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap shrink-0">
            <button
              onClick={() => {
                setEditingHackId(null)
                setHackFormData({
                  title: "",
                  host: "",
                  hostLogoPreset: "Google",
                  hostLogoCustom: "",
                  prizePool: "₹5,00,000",
                  firstPrize: "₹2,50,000 Cash + Cloud Credits",
                  deadline: "10 days left",
                  teamSize: "1-4 Members",
                  mode: "Online",
                  difficulty: "All Welcome",
                  bannerTag: "Flagship Sprint",
                  tagsInput: "Distributed Systems, Microservices, Go",
                  problemStatement: "",
                })
                setShowHackModal(true)
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-all active:scale-[0.98] cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Hackathon</span>
            </button>
            <button
              onClick={() => {
                setTempSectionConfig(sectionConfig)
                setShowSectionModal(true)
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-emerald-500/30 bg-emerald-900/30 hover:bg-emerald-800/40 text-emerald-200 text-xs font-medium transition-all cursor-pointer"
            >
              <Sliders className="h-3.5 w-3.5" />
              <span>Customize Section</span>
            </button>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════
          Metrics Ribbon (Unstop Style)
      ══════════════════════════════════════════════ */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-hairline bg-card p-4 sm:p-5 shadow-2xs">
          <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-primary" />
            Total Prize Pool
          </span>
          <p className="text-xl font-serif font-normal text-foreground mt-1">{totalPrizeSum}</p>
          <span className="text-[11px] text-muted-foreground mt-0.5 block">Across 3 live flagship cups</span>
        </div>

        <div className="rounded-2xl border border-hairline bg-card p-4 sm:p-5 shadow-2xs">
          <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-[#D4B872]" />
            Registered Competitors
          </span>
          <p className="text-xl font-serif font-normal text-foreground mt-1">{totalCompetitors.toLocaleString()}+</p>
          <span className="text-[11px] text-muted-foreground mt-0.5 block">Engineers &amp; Fellows</span>
        </div>

        <div className="rounded-2xl border border-hairline bg-card p-4 sm:p-5 shadow-2xs">
          <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-primary" />
            My Active Registrations
          </span>
          <p className="text-xl font-serif font-normal text-foreground mt-1">{userRegisteredCount}</p>
          <span className="text-[11px] text-muted-foreground mt-0.5 block">
            {userRegisteredCount > 0 ? "Eligible for next round" : "No active registrations yet"}
          </span>
        </div>

        <div className="rounded-2xl border border-hairline bg-card p-4 sm:p-5 shadow-2xs">
          <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-[#D4B872]" />
            Contest Rating
          </span>
          <p className="text-xl font-serif font-normal text-foreground mt-1">1,640 ELO</p>
          <span className="text-[11px] text-muted-foreground mt-0.5 block">Division I • Top 6% in ASCI</span>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          Arena Mode Switcher (Leaderboard vs Challenges vs Teammate Matchmaker)
      ══════════════════════════════════════════════ */}
      <div className="flex flex-wrap items-center gap-2 border-b border-hairline pb-3">
        <button
          onClick={() => setMainMode("leaderboard")}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
            mainMode === "leaderboard"
              ? "bg-primary text-primary-foreground font-semibold shadow-xs"
              : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80 border border-hairline"
          }`}
        >
          <Trophy className="w-3.5 h-3.5" />
          <span>National Student Leaderboard</span>
        </button>
        <button
          onClick={() => setMainMode("challenges")}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
            mainMode === "challenges"
              ? "bg-primary text-primary-foreground font-semibold shadow-xs"
              : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80 border border-hairline"
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>Active Competitions &amp; Hackathons</span>
        </button>
        <button
          onClick={() => setMainMode("teammates")}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
            mainMode === "teammates"
              ? "bg-primary text-primary-foreground font-semibold shadow-xs"
              : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80 border border-hairline"
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Find Teammates Matchmaker</span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-secondary border border-hairline text-foreground leading-none">
            {activeTeammatesCount}
          </span>
        </button>
      </div>

      {/* ══════════════════════════════════════════════
          National Student Leaderboard View
      ══════════════════════════════════════════════ */}
      {mainMode === "leaderboard" && (
        <div className="space-y-6">
          {/* Top 3 Podium Cards */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block">
                  Hall of Excellence
                </span>
                <h2 className="font-serif text-xl font-normal text-foreground">Top 3 National Grandmasters</h2>
              </div>
              <span className="text-xs font-mono text-muted-foreground">Updated live • Season 2026</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {leaderboardEntries.slice(0, 3).map((entry) => {
                const isFirst = entry.rank === 1
                return (
                  <div
                    key={entry.rank}
                    className={`rounded-2xl border p-5 flex flex-col justify-between transition-all relative overflow-hidden ${
                      isFirst
                        ? "border-[#D4B872]/60 bg-card shadow-sm"
                        : "border-hairline bg-card shadow-2xs"
                    }`}
                  >
                    {isFirst && (
                      <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-[#D4B872] via-amber-400 to-[#D4B872]" />
                    )}

                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                            isFirst
                              ? "bg-[#D4B872]/20 text-[#D4B872] border border-[#D4B872]/40 shadow-2xs"
                              : entry.rank === 2
                              ? "bg-slate-500/15 text-slate-700 dark:text-slate-300 border border-slate-500/30"
                              : "bg-amber-900/15 text-amber-700 dark:text-amber-300 border border-amber-900/30"
                          }`}
                        >
                          {entry.badge}
                        </span>
                        <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                          +{entry.solved} solved
                        </span>
                      </div>

                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center font-serif text-sm font-semibold text-foreground overflow-hidden border ${
                            isFirst ? "border-[#D4B872]/50" : "border-hairline"
                          }`}
                        >
                          <img
                            src={entry.avatar}
                            alt={entry.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-serif text-base font-medium text-foreground">{entry.name}</h3>
                          <p className="text-xs text-muted-foreground">{entry.college}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 py-3 border-y border-hairline my-2 text-center">
                        <div>
                          <span className="text-[9px] font-mono uppercase text-muted-foreground block">Rating</span>
                          <span className="text-sm font-serif font-bold text-foreground">{entry.elo}</span>
                        </div>
                        <div>
                          <span className="text-[9px] font-mono uppercase text-muted-foreground block">Tier</span>
                          <span className="text-xs font-medium text-foreground">{entry.tier}</span>
                        </div>
                        <div>
                          <span className="text-[9px] font-mono uppercase text-muted-foreground block">Solved</span>
                          <span className="text-xs font-semibold text-primary">{entry.solved}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between text-xs">
                      <span className="text-[11px] font-mono text-muted-foreground">{entry.xp}</span>
                      <span className="text-[11px] font-mono text-primary font-medium">Verified Profile</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Current User Standing Simple Card */}
          <div className="rounded-2xl border border-hairline bg-card p-5 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center font-serif text-base font-bold text-primary">
                #42
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-serif font-medium text-foreground">Arjun Mehta (Your Standing)</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                    Division I
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  1,640 ELO • Top 6% in ASCI • 160 ELO to Master Tier (1,800 ELO)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="hidden md:block w-36">
                <div className="flex justify-between text-[10px] font-mono text-muted-foreground mb-1">
                  <span>To Master</span>
                  <span>78%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-[#D4B872] rounded-full" style={{ width: "78%" }} />
                </div>
              </div>
              <button
                onClick={() => setMainMode("challenges")}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-primary hover:bg-primary-active text-primary-foreground text-xs font-semibold shadow-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 shrink-0"
              >
                <span>Enter Weekly Contest</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Split Layout: Ranks 4-10 Table + Campus Leaderboard */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* National Top Engineers Table (Ranks 4-10) */}
            <div className="lg:col-span-2 rounded-2xl border border-hairline bg-card p-5 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-hairline">
                <div>
                  <h3 className="font-serif text-base font-normal text-foreground">Engineering Division Ranks (4–10)</h3>
                  <p className="text-xs text-muted-foreground">National algorithmic &amp; system architecture ranking</p>
                </div>
                <span className="text-[11px] font-mono text-muted-foreground">Season 2026</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-hairline text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                      <th className="pb-2.5 font-medium">Rank</th>
                      <th className="pb-2.5 font-medium">Engineer</th>
                      <th className="pb-2.5 font-medium">Campus</th>
                      <th className="pb-2.5 font-medium">Tier</th>
                      <th className="pb-2.5 font-medium text-right">Rating (ELO)</th>
                      <th className="pb-2.5 font-medium text-right">Solved</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-hairline">
                    {leaderboardEntries.slice(3).map((entry) => (
                      <tr key={entry.rank} className="hover:bg-secondary/40 transition-colors">
                        <td className="py-3 font-mono font-bold text-foreground">#{entry.rank}</td>
                        <td className="py-3">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={entry.avatar}
                              alt={entry.name}
                              className="w-7 h-7 rounded-full object-cover border border-hairline"
                            />
                            <div>
                              <span className="font-medium text-foreground block">{entry.name}</span>
                              <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">+{entry.solved} solved</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 text-muted-foreground">{entry.college}</td>
                        <td className="py-3">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-secondary border border-hairline text-foreground">
                            {entry.tier}
                          </span>
                        </td>
                        <td className="py-3 text-right font-mono font-bold text-foreground">{entry.elo}</td>
                        <td className="py-3 text-right font-mono text-muted-foreground">{entry.xp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Top Engineering Campuses */}
            <div className="rounded-2xl border border-hairline bg-card p-5 shadow-2xs space-y-4">
              <div className="pb-2 border-b border-hairline">
                <h3 className="font-serif text-base font-normal text-foreground">Top Engineering Campuses</h3>
                <p className="text-xs text-muted-foreground">Cumulative collegiate rankings</p>
              </div>

              <div className="space-y-3">
                {campusRankings.map((campus) => (
                  <div
                    key={campus.rank}
                    className="p-3 rounded-xl bg-secondary/40 border border-hairline flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-lg bg-card border border-hairline flex items-center justify-center font-mono text-xs font-bold text-foreground">
                        {campus.rank}
                      </span>
                      <div>
                        <span className="text-xs font-medium text-foreground block">{campus.college}</span>
                        <span className="text-[10px] text-muted-foreground">{campus.members} Active Fellows</span>
                      </div>
                    </div>
                    <div className="text-right font-mono">
                      <span className="text-xs font-semibold text-foreground block">{campus.totalXp}</span>
                      <span className="text-[9px] text-muted-foreground uppercase">{campus.topSpecialty}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setMainMode("teammates")}
                  className="w-full py-2 rounded-xl bg-secondary hover:bg-secondary/80 border border-hairline text-foreground text-xs font-medium transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Find Campus Teammates</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {mainMode === "challenges" && (
        <>
          {/* ══════════════════════════════════════════════
              Search & Filter Bar
          ══════════════════════════════════════════════ */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search hackathons by title, host, or technology stack..."
                className="w-full bg-card border border-hairline rounded-xl pl-10 pr-4 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: "all", label: "All Events" },
                { id: "registered", label: `My Registered (${userRegisteredCount})` },
                { id: "live", label: "Active Rounds" },
                { id: "big-prizes", label: "Top Prize Pools" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    filter === tab.id
                      ? "bg-card text-foreground border border-hairline font-semibold shadow-2xs"
                      : "text-muted-foreground hover:text-foreground hover:bg-card/50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

      {/* ══════════════════════════════════════════════
          Hackathon Cards List
      ══════════════════════════════════════════════ */}
      {filteredHackathons.length === 0 ? (
        <div className="rounded-2xl border border-hairline bg-card/40 p-12 text-center">
          <Trophy className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
          <h3 className="font-serif text-lg font-normal text-foreground">No Competitions Found</h3>
          <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
            {filter === "registered"
              ? "You haven't registered for any competitions yet. Explore open hackathons below and sign up your team."
              : "Try adjusting your search keywords or filter pills to view available challenges."}
          </p>
          {filter === "registered" && (
            <button
              onClick={() => setFilter("all")}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-xs font-medium hover:bg-primary-active transition-colors cursor-pointer"
            >
              <span>Explore All Competitions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredHackathons.map((hackathon) => {
            const hasSubmitted = !!hackathon.submission

            return (
              <div
                key={hackathon.id}
                className="rounded-2xl border border-hairline bg-card p-5 sm:p-6 flex flex-col justify-between shadow-2xs hover:border-foreground/20 transition-all group overflow-hidden relative"
              >
                <div>
                  {/* Top Header with Host Logo & Admin Action Buttons */}
                  <div className="flex items-start justify-between gap-3 mb-3.5">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <HackathonHostLogo host={hackathon.host} />
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block">
                          Verified Challenge Host
                        </span>
                        <span className="text-xs font-semibold text-foreground flex items-center gap-1 truncate">
                          {hackathon.host}
                          <Sparkles className="w-3 h-3 text-[#D4B872] shrink-0" />
                        </span>
                      </div>
                    </div>

                    {isAdmin && (
                      <div className="flex items-center gap-1 bg-secondary/80 p-1 rounded-xl border border-hairline shrink-0 shadow-2xs">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            openEditHackathon(hackathon)
                          }}
                          className="p-1 rounded-lg hover:bg-card text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                          title="Edit Hackathon (Admin)"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setDeleteConfirmHackId(hackathon.id)
                          }}
                          className="p-1 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
                          title="Delete Hackathon (Admin)"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Domain / Category Banner Tag & Metadata Badges */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-primary/10 text-primary font-semibold border border-primary/20 max-w-full">
                      {hackathon.bannerTag}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md bg-secondary text-muted-foreground border border-hairline">
                      {hackathon.mode || "Online"}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md bg-secondary text-muted-foreground border border-hairline">
                      {hackathon.difficulty || "All Welcome"}
                    </span>
                  </div>

                  {/* Title & Registration Status */}
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                    <h3 className="font-serif text-xl font-normal text-foreground group-hover:text-primary transition-colors">
                      {hackathon.title}
                    </h3>
                    {hackathon.isRegistered ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold shrink-0">
                        <CheckCircle2 className="w-3 h-3" />
                        Registered
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-muted-foreground flex items-center gap-1 shrink-0">
                        <Clock className="w-3 h-3" />
                        Closes {hackathon.deadline}
                      </span>
                    )}
                  </div>

                  {/* Problem Statement Preview */}
                  <p className="text-xs text-muted-foreground mt-3 line-clamp-2 leading-relaxed">
                    {hackathon.problemStatement}
                  </p>

                  {/* Prize & Meta Bento Strip */}
                  <div className="grid grid-cols-3 gap-2 my-4 p-3 rounded-xl bg-secondary/50 border border-hairline text-center">
                    <div>
                      <span className="text-[9px] font-mono uppercase text-muted-foreground block">Prize Pool</span>
                      <span className="text-sm font-serif font-bold text-[#D4B872]">{hackathon.prizePool}</span>
                    </div>
                    <div>
                      <span className="text-[9px] font-mono uppercase text-muted-foreground block">First Prize</span>
                      <span className="text-xs font-medium text-foreground truncate block">{hackathon.firstPrize}</span>
                    </div>
                    <div>
                      <span className="text-[9px] font-mono uppercase text-muted-foreground block">Team Size</span>
                      <span className="text-xs font-medium text-foreground">{hackathon.teamSize}</span>
                    </div>
                  </div>

                  {/* Round Timeline Progression */}
                  <div className="space-y-2 mb-4">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block">
                      Rounds Timeline ({hackathon.rounds.length} Stages)
                    </span>
                    <div className="space-y-1.5">
                      {hackathon.rounds.map((round, idx) => (
                        <div
                          key={round.id}
                          className="flex items-center justify-between text-xs p-2 rounded-lg bg-card/60 border border-hairline/80"
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-4 h-4 rounded-full bg-secondary border border-hairline flex items-center justify-center text-[10px] font-mono text-muted-foreground">
                              {idx + 1}
                            </span>
                            <span className="font-medium text-foreground">{round.name}</span>
                          </div>
                          <span className="text-[11px] font-mono text-muted-foreground">{round.date}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap items-center gap-1.5 mb-6">
                    {hackathon.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md bg-secondary text-[10px] font-mono text-muted-foreground border border-hairline"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 border-t border-hairline flex flex-wrap items-center justify-between gap-3">
                  <span className="text-[11px] font-mono text-muted-foreground flex items-center gap-1 shrink-0">
                    <Users className="w-3.5 h-3.5" />
                    {hackathon.registeredCount.toLocaleString()} participants
                  </span>

                  <div className="flex items-center gap-2 shrink-0">
                    {isAdmin && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          openEditHackathon(hackathon)
                        }}
                        className="inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-hairline bg-secondary hover:bg-card text-foreground text-xs font-medium transition-colors cursor-pointer"
                        title="Edit Hackathon Details (Admin)"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-primary" />
                        <span className="hidden sm:inline">Edit</span>
                      </button>
                    )}

                    {hackathon.isRegistered ? (
                      <button
                        onClick={() => setSelectedHackathonForSubmit(hackathon)}
                        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer shrink-0 ${
                          hasSubmitted
                            ? "bg-secondary text-foreground border border-hairline hover:bg-secondary/80"
                            : "bg-primary hover:bg-primary-active text-primary-foreground shadow-xs font-semibold"
                        }`}
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>{hasSubmitted ? "Update Submission" : "Submit Project"}</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => setSelectedHackathonForReg(hackathon)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary hover:bg-primary-active text-primary-foreground text-xs font-semibold shadow-xs transition-all cursor-pointer shrink-0"
                      >
                        <span>Register Now</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
      </>
    )}

      {/* ══════════════════════════════════════════════
          Teammate Matchmaker View
      ══════════════════════════════════════════════ */}
      {mainMode === "teammates" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-secondary/50 border border-hairline">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 font-semibold">
                  Unstop Matchmaker
                </span>
                <span className="text-xs font-mono text-muted-foreground">{activeTeammatesCount} Active Requests</span>
              </div>
              <h2 className="font-serif text-xl font-normal text-foreground flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <span>Hackathon Teammate Matchmaker</span>
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Form high-impact multidisciplinary squads with vetted peers from IITs, BITS, and NITs.
              </p>
            </div>

            <button
              onClick={() => setShowPostTeammateModal(true)}
              className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-active text-primary-foreground text-xs font-semibold shadow-xs transition-colors cursor-pointer inline-flex items-center gap-1.5 shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Post Teammate Pitch</span>
            </button>
          </div>

          {/* Teammate Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {teammatePosts.map((post) => (
              <div
                key={post.id}
                className="rounded-2xl border border-hairline bg-card p-5 flex flex-col justify-between shadow-xs hover:border-foreground/20 transition-all space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-secondary border border-hairline flex items-center justify-center font-serif text-xs font-semibold text-primary overflow-hidden">
                        {post.authorAvatar ? (
                          <img src={post.authorAvatar} alt={post.authorName} className="w-full h-full object-cover" />
                        ) : (
                          post.authorName.charAt(0)
                        )}
                      </div>
                      <div>
                        <div className="text-xs font-medium text-foreground">{post.authorName}</div>
                        <div className="text-[10px] text-muted-foreground">{post.college}</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground">{post.postedAt}</span>
                  </div>

                  <div className="text-[11px] font-mono text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20 inline-block truncate max-w-full">
                    Target: {post.hackathonTitle}
                  </div>

                  <div>
                    <div className="text-xs font-medium text-foreground">Role: {post.role}</div>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed line-clamp-3">
                      &ldquo;{post.pitch}&rdquo;
                    </p>
                  </div>

                  <div className="space-y-1 pt-1">
                    <div className="text-[10px] font-mono text-muted-foreground uppercase">Skills Offered:</div>
                    <div className="flex flex-wrap gap-1">
                      {post.skills.map((s, idx) => (
                        <span key={idx} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-secondary border border-hairline text-foreground">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-[10px] font-mono text-primary uppercase">Looking For:</div>
                    <div className="flex flex-wrap gap-1">
                      {post.lookingFor.map((s, idx) => (
                        <span key={idx} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-hairline flex items-center justify-between">
                  <span className="text-[10px] font-mono text-muted-foreground truncate max-w-[120px]">{post.contactEmail}</span>
                  <button
                    onClick={() => {
                      inviteTeammate(post.id)
                      showToast(`Invitation sent to ${post.authorName}!`)
                    }}
                    disabled={post.invited}
                    className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                      post.invited
                        ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                        : "bg-primary hover:bg-primary-active text-primary-foreground shadow-xs font-semibold"
                    }`}
                  >
                    {post.invited ? (
                      <>
                        <Check className="w-3 h-3" />
                        <span>Invited</span>
                      </>
                    ) : (
                      <>
                        <Users className="w-3 h-3" />
                        <span>Invite to Team</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════
          Registration Modal / Drawer
      ══════════════════════════════════════════════ */}
      {selectedHackathonForReg && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-card border border-hairline rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-hairline">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-primary">Competition Entry</span>
                <h3 className="font-serif text-lg font-normal text-foreground">Register for {selectedHackathonForReg.title}</h3>
              </div>
              <button
                onClick={() => setSelectedHackathonForReg(null)}
                className="p-1 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-foreground block mb-1">Team Name</label>
                <input
                  type="text"
                  required
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="e.g. Apex Architect Guild"
                  className="w-full bg-secondary border border-hairline rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-foreground block mb-1">Team Lead Name</label>
                  <input
                    type="text"
                    required
                    value={leaderName}
                    onChange={(e) => setLeaderName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full bg-secondary border border-hairline rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-foreground block mb-1">Leader Email</label>
                  <input
                    type="email"
                    required
                    value={leaderEmail}
                    onChange={(e) => setLeaderEmail(e.target.value)}
                    placeholder="email@domain.com"
                    className="w-full bg-secondary border border-hairline rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-foreground block mb-1">Preferred Track</label>
                <select
                  value={selectedTrack}
                  onChange={(e) => setSelectedTrack(e.target.value)}
                  className="w-full bg-secondary border border-hairline rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
                >
                  <option value="">Select an engineering track</option>
                  {selectedHackathonForReg.tags.map((tag) => (
                    <option key={tag} value={tag}>{tag}</option>
                  ))}
                </select>
              </div>

              <div className="rounded-xl bg-secondary/40 border border-hairline p-3 text-[11px] text-muted-foreground flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Eligibility verified via your ASCI Academy student profile.</span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedHackathonForReg(null)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-muted-foreground hover:bg-secondary cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-primary hover:bg-primary-active text-primary-foreground text-xs font-semibold shadow-xs cursor-pointer transition-all"
                >
                  Confirm Registration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════
          Project Submission Modal / Drawer
      ══════════════════════════════════════════════ */}
      {selectedHackathonForSubmit && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-card border border-hairline rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-hairline">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-primary">Prototype Submission</span>
                <h3 className="font-serif text-lg font-normal text-foreground">{selectedHackathonForSubmit.title}</h3>
              </div>
              <button
                onClick={() => setSelectedHackathonForSubmit(null)}
                className="p-1 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleProjectSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-foreground block mb-1 flex items-center gap-1.5">
                  <Github className="w-3.5 h-3.5 text-muted-foreground" />
                  GitHub Repository Link
                </label>
                <input
                  type="url"
                  required
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  placeholder="https://github.com/username/project-repo"
                  className="w-full bg-secondary border border-hairline rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-foreground block mb-1 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-muted-foreground" />
                  Live Deployment / Demo URL
                </label>
                <input
                  type="url"
                  required
                  value={demoUrl}
                  onChange={(e) => setDemoUrl(e.target.value)}
                  placeholder="https://my-prototype.vercel.app"
                  className="w-full bg-secondary border border-hairline rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-foreground block mb-1">Architecture &amp; Benchmark Notes</label>
                <textarea
                  rows={3}
                  value={pitchNotes}
                  onChange={(e) => setPitchNotes(e.target.value)}
                  placeholder="Briefly explain your architectural trade-offs, algorithms used, and p99 latency results..."
                  className="w-full bg-secondary border border-hairline rounded-xl p-3 text-xs text-foreground focus:outline-none focus:border-primary resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedHackathonForSubmit(null)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-muted-foreground hover:bg-secondary cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-primary hover:bg-primary-active text-primary-foreground text-xs font-semibold shadow-xs cursor-pointer transition-all"
                >
                  Save &amp; Submit Prototype
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════
          Post Teammate Pitch Modal
      ══════════════════════════════════════════════ */}
      {showPostTeammateModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-card border border-hairline rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-hairline">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-primary">Matchmaker Broadcast</span>
                <h3 className="font-serif text-lg font-normal text-foreground">Post Teammate Search Request</h3>
              </div>
              <button
                onClick={() => setShowPostTeammateModal(false)}
                className="p-1 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handlePostTeammate} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-foreground block mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={myAuthorName}
                    onChange={(e) => setMyAuthorName(e.target.value)}
                    placeholder="e.g. Priya Sharma"
                    className="w-full bg-secondary border border-hairline rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-foreground block mb-1">Your University</label>
                  <input
                    type="text"
                    required
                    value={myCollege}
                    onChange={(e) => setMyCollege(e.target.value)}
                    placeholder="e.g. BITS Pilani"
                    className="w-full bg-secondary border border-hairline rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-foreground block mb-1">Target Hackathon</label>
                <select
                  value={myHackathonId}
                  onChange={(e) => setMyHackathonId(e.target.value)}
                  className="w-full bg-secondary border border-hairline rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
                >
                  {hackathons.map((h) => (
                    <option key={h.id} value={h.id}>
                      {h.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-foreground block mb-1">Your Primary Role</label>
                  <input
                    type="text"
                    required
                    value={myRole}
                    onChange={(e) => setMyRole(e.target.value)}
                    placeholder="e.g. Backend / Distributed Systems"
                    className="w-full bg-secondary border border-hairline rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-foreground block mb-1">Contact Email</label>
                  <input
                    type="email"
                    required
                    value={myContactEmail}
                    onChange={(e) => setMyContactEmail(e.target.value)}
                    placeholder="you@college.edu"
                    className="w-full bg-secondary border border-hairline rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-foreground block mb-1">Your Skills (comma-separated)</label>
                <input
                  type="text"
                  required
                  value={mySkillsInput}
                  onChange={(e) => setMySkillsInput(e.target.value)}
                  placeholder="e.g. Go, Rust, PostgreSQL, Kafka"
                  className="w-full bg-secondary border border-hairline rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-foreground block mb-1">Looking for Skills (comma-separated)</label>
                <input
                  type="text"
                  required
                  value={myLookingForInput}
                  onChange={(e) => setMyLookingForInput(e.target.value)}
                  placeholder="e.g. React 19, UI/UX, WebSockets"
                  className="w-full bg-secondary border border-hairline rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-foreground block mb-1">Squad Pitch &amp; Architecture Vision</label>
                <textarea
                  rows={3}
                  required
                  value={myPitch}
                  onChange={(e) => setMyPitch(e.target.value)}
                  placeholder="Briefly describe what you plan to build and why teammates should squad up with you..."
                  className="w-full bg-secondary border border-hairline rounded-xl p-3 text-xs text-foreground focus:outline-none focus:border-primary resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPostTeammateModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-muted-foreground hover:bg-secondary cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-primary hover:bg-primary-active text-primary-foreground text-xs font-semibold shadow-xs cursor-pointer transition-all"
                >
                  Publish Pitch to Board
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════
          ADMIN MODAL: Add / Edit Hackathon
      ══════════════════════════════════════════════ */}
      {showHackModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl rounded-3xl border border-hairline bg-card p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between pb-4 border-b border-hairline mb-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                  <Trophy className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-medium text-foreground">
                    {editingHackId ? "Edit Hackathon" : "Create New Hackathon"}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Configure national competition parameters, prize pools, and guidelines.
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowHackModal(false)
                  setEditingHackId(null)
                }}
                className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveHackathon} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground block mb-1.5 font-medium">
                    Hackathon Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={hackFormData.title}
                    onChange={(e) => setHackFormData({ ...hackFormData, title: e.target.value })}
                    placeholder="e.g. Google Cloud Apex Hackathon 2026"
                    className="w-full bg-secondary/60 border border-hairline rounded-xl px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div>
                  <label className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground block mb-1.5 font-medium">
                    Host Organization *
                  </label>
                  <input
                    type="text"
                    required
                    value={hackFormData.host}
                    onChange={(e) => setHackFormData({ ...hackFormData, host: e.target.value })}
                    placeholder="e.g. Google Cloud, AWS, ASCI"
                    className="w-full bg-secondary/60 border border-hairline rounded-xl px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div>
                  <label className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground block mb-1.5 font-medium">
                    Host Brand Logo Preset
                  </label>
                  <select
                    value={hackFormData.hostLogoPreset}
                    onChange={(e) => setHackFormData({ ...hackFormData, hostLogoPreset: e.target.value })}
                    className="w-full bg-secondary/60 border border-hairline rounded-xl px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary transition-colors cursor-pointer"
                  >
                    <option value="Google">Google (Official SVG)</option>
                    <option value="AWS">Amazon AWS (Official SVG)</option>
                    <option value="Devfolio">Devfolio (Official SVG)</option>
                    <option value="Razorpay">Razorpay (Official SVG)</option>
                    <option value="ASCI Academy">ASCI Academy (Shield Logo)</option>
                  </select>
                </div>

                <div>
                  <label className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground block mb-1.5 font-medium">
                    Total Prize Pool *
                  </label>
                  <input
                    type="text"
                    required
                    value={hackFormData.prizePool}
                    onChange={(e) => setHackFormData({ ...hackFormData, prizePool: e.target.value })}
                    placeholder="e.g. ₹5,00,000"
                    className="w-full bg-secondary/60 border border-hairline rounded-xl px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div>
                  <label className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground block mb-1.5 font-medium">
                    First Prize Description *
                  </label>
                  <input
                    type="text"
                    required
                    value={hackFormData.firstPrize}
                    onChange={(e) => setHackFormData({ ...hackFormData, firstPrize: e.target.value })}
                    placeholder="e.g. ₹2,50,000 Cash + AWS Credits"
                    className="w-full bg-secondary/60 border border-hairline rounded-xl px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div>
                  <label className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground block mb-1.5 font-medium">
                    Deadline / Time Left
                  </label>
                  <input
                    type="text"
                    value={hackFormData.deadline}
                    onChange={(e) => setHackFormData({ ...hackFormData, deadline: e.target.value })}
                    placeholder="e.g. 12 days left, Closes Oct 15"
                    className="w-full bg-secondary/60 border border-hairline rounded-xl px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div>
                  <label className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground block mb-1.5 font-medium">
                    Team Size
                  </label>
                  <input
                    type="text"
                    value={hackFormData.teamSize}
                    onChange={(e) => setHackFormData({ ...hackFormData, teamSize: e.target.value })}
                    placeholder="e.g. 1-4 Members"
                    className="w-full bg-secondary/60 border border-hairline rounded-xl px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div>
                  <label className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground block mb-1.5 font-medium">
                    Banner Tag / Category
                  </label>
                  <input
                    type="text"
                    value={hackFormData.bannerTag}
                    onChange={(e) => setHackFormData({ ...hackFormData, bannerTag: e.target.value })}
                    placeholder="e.g. Flagship Sprint, AI Innovation, National"
                    className="w-full bg-secondary/60 border border-hairline rounded-xl px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div>
                  <label className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground block mb-1.5 font-medium">
                    Mode &amp; Format
                  </label>
                  <select
                    value={hackFormData.mode}
                    onChange={(e) => setHackFormData({ ...hackFormData, mode: e.target.value as any })}
                    className="w-full bg-secondary/60 border border-hairline rounded-xl px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary transition-colors cursor-pointer"
                  >
                    <option value="Online">Online Virtual</option>
                    <option value="Hybrid">Hybrid (Finals Onsite)</option>
                    <option value="In-Person">In-Person Campus</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground block mb-1.5 font-medium">
                    Tech Stack Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={hackFormData.tagsInput}
                    onChange={(e) => setHackFormData({ ...hackFormData, tagsInput: e.target.value })}
                    placeholder="e.g. Distributed Systems, Go, Kafka, React 19"
                    className="w-full bg-secondary/60 border border-hairline rounded-xl px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground block mb-1.5 font-medium">
                    Problem Statement &amp; Architecture Brief *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={hackFormData.problemStatement}
                    onChange={(e) => setHackFormData({ ...hackFormData, problemStatement: e.target.value })}
                    placeholder="Explain the challenge, evaluation criteria, and architectural constraints..."
                    className="w-full bg-secondary/60 border border-hairline rounded-xl p-3 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-hairline">
                <button
                  type="button"
                  onClick={() => {
                    setShowHackModal(false)
                    setEditingHackId(null)
                  }}
                  className="px-4 py-2.5 rounded-xl border border-hairline text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-semibold shadow-md hover:bg-primary/90 transition-all cursor-pointer flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{editingHackId ? "Save Changes" : "Publish Hackathon"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════
          ADMIN MODAL: Section Customizer
      ══════════════════════════════════════════════ */}
      {showSectionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg rounded-3xl border border-hairline bg-card p-6 sm:p-7 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-hairline mb-5">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                  <Sliders className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-medium text-foreground">Customize Hackathons Section</h3>
                  <p className="text-xs text-muted-foreground">Adjust section header, badge, and intro copy.</p>
                </div>
              </div>
              <button
                onClick={() => setShowSectionModal(false)}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveSectionConfig} className="space-y-4 text-xs">
              <div>
                <label className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground block mb-1 font-medium">
                  Badge Text
                </label>
                <input
                  type="text"
                  value={tempSectionConfig.badge}
                  onChange={(e) => setTempSectionConfig({ ...tempSectionConfig, badge: e.target.value })}
                  className="w-full bg-secondary/60 border border-hairline rounded-xl px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground block mb-1 font-medium">
                  Main Title
                </label>
                <input
                  type="text"
                  value={tempSectionConfig.title}
                  onChange={(e) => setTempSectionConfig({ ...tempSectionConfig, title: e.target.value })}
                  className="w-full bg-secondary/60 border border-hairline rounded-xl px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary font-serif text-base"
                />
              </div>

              <div>
                <label className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground block mb-1 font-medium">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={tempSectionConfig.description}
                  onChange={(e) => setTempSectionConfig({ ...tempSectionConfig, description: e.target.value })}
                  className="w-full bg-secondary/60 border border-hairline rounded-xl p-3 text-xs text-foreground focus:outline-none focus:border-primary resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-hairline">
                <button
                  type="button"
                  onClick={() => setShowSectionModal(false)}
                  className="px-4 py-2 rounded-xl text-xs text-muted-foreground hover:bg-secondary cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold shadow-xs hover:bg-primary/90 cursor-pointer"
                >
                  Save Configuration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════
          ADMIN MODAL: Delete Confirmation Dialog
      ══════════════════════════════════════════════ */}
      {deleteConfirmHackId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-md rounded-3xl border border-destructive/30 bg-card p-6 shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-destructive/10 border border-destructive/20 flex items-center justify-center text-destructive mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-medium text-foreground">Delete Hackathon?</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Are you sure you want to permanently delete this competition? This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmHackId(null)}
                className="px-4 py-2 rounded-xl border border-hairline text-xs font-medium text-muted-foreground hover:bg-secondary cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteHackathon(deleteConfirmHackId)}
                className="px-5 py-2 rounded-xl bg-destructive text-white text-xs font-semibold shadow-md hover:bg-destructive/90 transition-all cursor-pointer"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
