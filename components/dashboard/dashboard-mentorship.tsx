"use client"

import React, { useState } from "react"
import {
  Users,
  Video,
  Calendar,
  Star,
  Clock,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Search,
  Filter,
  Layers,
  ArrowRight,
  MessageSquare,
  Award,
  X,
  Check,
  Building2,
  ShieldCheck,
  Send,
  Sparkles,
  Mail,
  Plus,
  Edit3,
  Trash2,
  Sliders
} from "lucide-react"
import { useAdmin } from "@/context/admin-context"
import { useUnstopEcosystem, MentorProfile, MentorBooking } from "@/lib/unstop-store"
import { AxelStage } from "@/components/axel/axel-stage"

function CompanyBrandLogo({ company, className = "w-7 h-7" }: { company: string; className?: string }) {
  const c = company.toLowerCase()
  if (c.includes("google")) {
    return (
      <div className={`${className} rounded-lg bg-white flex items-center justify-center p-1 shadow-2xs border border-hairline shrink-0`}>
        <svg viewBox="0 0 24 24" className="w-full h-full">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
        </svg>
      </div>
    )
  }
  if (c.includes("microsoft")) {
    return (
      <div className={`${className} rounded-lg bg-white flex items-center justify-center p-1 shadow-2xs border border-hairline shrink-0`}>
        <svg viewBox="0 0 23 23" className="w-full h-full">
          <path fill="#f35325" d="M1 1h10v10H1z" />
          <path fill="#81bc06" d="M12 1h10v10H12z" />
          <path fill="#05a6f0" d="M12 1h10v10H12z" />
          <path fill="#ffba08" d="M12 12h10v10H12z" />
        </svg>
      </div>
    )
  }
  if (c.includes("amazon") || c.includes("aws")) {
    return (
      <div className={`${className} rounded-lg bg-[#232F3E] text-white flex items-center justify-center p-1 shadow-2xs border border-[#FF9900]/30 shrink-0 font-bold font-mono text-[9px]`}>
        <span className="text-[#FF9900]">AWS</span>
      </div>
    )
  }
  if (c.includes("zerodha")) {
    return (
      <div className={`${className} rounded-lg bg-primary/10 border border-primary/20 text-primary flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs`}>
        {company.charAt(0).toUpperCase()}
      </div>
    )
  }
  if (c.includes("razorpay")) {
    return (
      <div className={`${className} rounded-lg bg-[#0c2340] text-[#528FF0] flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs border border-[#528FF0]/30`}>
        R
      </div>
    )
  }
  return (
    <div className={`${className} rounded-lg bg-primary/10 text-primary border border-primary/20 flex items-center justify-center font-bold text-xs uppercase shrink-0`}>
      {company.slice(0, 2)}
    </div>
  )
}

export function DashboardMentorship() {
  const { isAdmin } = useAdmin()
  const {
    mentors,
    bookings,
    bookMentorSession,
    addMentor,
    updateMentor,
    deleteMentor
  } = useUnstopEcosystem()

  const [mentorshipMode, setMentorshipMode] = useState<"inbox" | "mentors" | "sessions">("mentors")
  const [filter, setFilter] = useState<"all" | "booked" | "dsa" | "system-design" | "resume">("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Dynamic Section Configuration (Admin editable)
  const [sectionConfig, setSectionConfig] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("asci_mentorship_section_config")
      if (saved) {
        try { return JSON.parse(saved) } catch (e) {}
      }
    }
    return {
      badge: "Elite Engineering Advisory",
      title: "1-on-1 Mentorship & Direct Network",
      description: "Book private architecture consultations, mock algorithmic screens, and code reviews with verified Principal & Staff Engineers from Google, Microsoft, Amazon, and leading tech companies."
    }
  })

  // Admin Modals State
  const [showMentorModal, setShowMentorModal] = useState(false)
  const [editingMentorId, setEditingMentorId] = useState<string | null>(null)
  const [mentorFormData, setMentorFormData] = useState({
    name: "",
    role: "",
    company: "",
    companyLogoPreset: "Google",
    avatar: "/avatars/ninja.png",
    experienceYears: 6,
    rating: 4.9,
    reviewsCount: 38,
    specialtiesInput: "Distributed Systems, Microservices, Go, System Design",
    bio: "Passionate engineer mentoring aspiring developers on high-throughput backend architecture and enterprise design patterns.",
    sessionDuration: "45 Mins / 1-on-1 Video",
  })
  const [deleteConfirmMentorId, setDeleteConfirmMentorId] = useState<string | null>(null)
  const [showSectionModal, setShowSectionModal] = useState(false)
  const [tempSectionConfig, setTempSectionConfig] = useState(sectionConfig)

  // Direct Messages Inbox State (5 Unread Threads)
  const [messages, setMessages] = useState([
    {
      id: "msg-1",
      sender: "Vivek Ramanathan",
      role: "Staff Engineer @ Google",
      avatar: "/avatars/ninja.png",
      time: "12m ago",
      subject: "Feedback on Raft Consensus Implementation",
      body: "Hey Arjun! Reviewed your Raft consensus design and log replication benchmarks. Overall solid p99 numbers under network partitions! Let's dive into election timeouts in tomorrow's mock.",
      unread: true,
      badge: "Mentor",
    },
    {
      id: "msg-2",
      sender: "Axel AI",
      role: "Academic Strategic Co-Pilot",
      avatar: "/avatars/robot.png",
      time: "45m ago",
      subject: "POTD Alert: 100-Day Streak at Risk",
      body: "Your 100-Day Algorithmic Streak is at 42 days! Solve today's POTD before midnight to earn +150 XP and retain your Division I standing.",
      unread: true,
      badge: "AI Co-Pilot",
    },
    {
      id: "msg-3",
      sender: "Priya Sharma",
      role: "Hackathon Squad Lead (Rank #1)",
      avatar: "/avatars/astronaut.png",
      time: "2h ago",
      subject: "Squad Invitation: Razorpay FinTech Grand Prix",
      body: "Sent you an invite for the Razorpay FinTech Grand Prix squad! We need a distributed systems engineer who knows Go and Kafka.",
      unread: true,
      badge: "Squad Invite",
    },
    {
      id: "msg-4",
      sender: "Rohan Deshmukh",
      role: "Lead TA - Systems Track",
      avatar: "/avatars/hacker.png",
      time: "5h ago",
      subject: "Module 8: Custom Memory Pool Verified",
      body: "Your submission for Module 8 (Custom Memory Pool in C++/Go) passed all benchmark assertions with zero heap allocations in the critical path. Excellent work!",
      unread: true,
      badge: "Curriculum",
    },
    {
      id: "msg-5",
      sender: "Kavya Iyer",
      role: "Industry Placement Lead",
      avatar: "/avatars/cat.png",
      time: "Yesterday",
      subject: "Microsoft Azure Engineering Fast-Track Shortlist",
      body: "Congratulations! The Microsoft Azure Core Engineering team reviewed your verified ASCI portfolio. A technical screen slot is open for this Thursday.",
      unread: true,
      badge: "Career Fast-Track",
    },
  ])

  const [activeReplyMessage, setActiveReplyMessage] = useState<any | null>(null)
  const [replyText, setReplyText] = useState("")

  const unreadCount = messages.filter((m) => m.unread).length

  // Booking Modal State
  const [selectedMentorForBooking, setSelectedMentorForBooking] = useState<MentorProfile | null>(null)
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedSlot, setSelectedSlot] = useState("")
  const [selectedTopic, setSelectedTopic] = useState("Mock Algorithmic Interview (DSA)")
  const [candidateNotes, setCandidateNotes] = useState("")

  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3500)
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!replyText.trim()) return
    showToast(`Reply sent to ${activeReplyMessage?.sender}!`)
    setMessages((prev) =>
      prev.map((m) => (m.id === activeReplyMessage?.id ? { ...m, unread: false } : m))
    )
    setActiveReplyMessage(null)
    setReplyText("")
  }

  const markAsRead = (id: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, unread: false } : m))
    )
    showToast("Conversation marked as read")
  }

  const confirmedBookings = bookings.filter((b) => b.status === "confirmed")

  const filteredMentors = mentors.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.specialties.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))

    if (!matchesSearch) return false

    if (filter === "dsa") return m.specialties.some((s) => s.toLowerCase().includes("dsa") || s.toLowerCase().includes("coding"))
    if (filter === "system-design") return m.specialties.some((s) => s.toLowerCase().includes("system design"))
    if (filter === "resume") return m.specialties.some((s) => s.toLowerCase().includes("portfolio") || s.toLowerCase().includes("resume"))
    return true
  })

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedMentorForBooking) return

    bookMentorSession({
      mentorId: selectedMentorForBooking.id,
      mentorName: selectedMentorForBooking.name,
      mentorRole: selectedMentorForBooking.role,
      mentorCompany: selectedMentorForBooking.company,
      mentorAvatar: selectedMentorForBooking.avatar,
      date: selectedDate || selectedMentorForBooking.availableSlots[0]?.date || "Tomorrow",
      timeSlot: selectedSlot || selectedMentorForBooking.availableSlots[0]?.slots[0] || "7:00 PM IST",
      topic: selectedTopic,
    })

    showToast(`1-on-1 session confirmed with ${selectedMentorForBooking.name}!`)
    setSelectedMentorForBooking(null)
    setSelectedDate("")
    setSelectedSlot("")
    setCandidateNotes("")
  }

  const openCreateMentor = () => {
    setEditingMentorId(null)
    setMentorFormData({
      name: "",
      role: "Staff Software Engineer",
      company: "Google",
      companyLogoPreset: "Google",
      avatar: "/avatars/ninja.png",
      experienceYears: 7,
      rating: 4.95,
      reviewsCount: 42,
      specialtiesInput: "Distributed Systems, High-Throughput Microservices, System Design, Go",
      bio: "Passionate engineer mentoring students and junior engineers on large-scale infrastructure, resilient architecture, and FAANG technical screens.",
      sessionDuration: "45 Mins / 1-on-1 Video",
    })
    setShowMentorModal(true)
  }

  const openEditMentor = (m: MentorProfile) => {
    setEditingMentorId(m.id)
    setMentorFormData({
      name: m.name,
      role: m.role,
      company: m.company,
      companyLogoPreset: m.companyLogoPreset || (m.company.toLowerCase().includes("google") ? "Google" : m.company.toLowerCase().includes("microsoft") ? "Microsoft" : m.company.toLowerCase().includes("amazon") || m.company.toLowerCase().includes("aws") ? "AWS" : m.company.toLowerCase().includes("zerodha") ? "Zerodha" : m.company.toLowerCase().includes("razorpay") ? "Razorpay" : "ASCI"),
      avatar: m.avatar || "/avatars/ninja.png",
      experienceYears: m.experienceYears || 5,
      rating: m.rating || 4.9,
      reviewsCount: m.reviewsCount || 24,
      specialtiesInput: m.specialties ? m.specialties.join(", ") : "System Design, DSA",
      bio: m.bio || "",
      sessionDuration: m.sessionDuration || "45 Mins / 1-on-1 Video",
    })
    setShowMentorModal(true)
  }

  const handleSaveMentor = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!mentorFormData.name || !mentorFormData.company) {
      showToast("Please provide mentor name and company.")
      return
    }

    const specialties = mentorFormData.specialtiesInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)

    if (editingMentorId) {
      await updateMentor(editingMentorId, {
        name: mentorFormData.name,
        role: mentorFormData.role,
        company: mentorFormData.company,
        companyLogoPreset: mentorFormData.companyLogoPreset,
        avatar: mentorFormData.avatar,
        experienceYears: Number(mentorFormData.experienceYears),
        rating: Number(mentorFormData.rating),
        reviewsCount: Number(mentorFormData.reviewsCount),
        specialties: specialties.length ? specialties : ["System Design", "Backend"],
        bio: mentorFormData.bio,
        sessionDuration: mentorFormData.sessionDuration,
      })
      showToast(`Updated mentor: ${mentorFormData.name}`)
    } else {
      await addMentor({
        name: mentorFormData.name,
        role: mentorFormData.role,
        company: mentorFormData.company,
        companyLogoPreset: mentorFormData.companyLogoPreset,
        avatar: mentorFormData.avatar,
        experienceYears: Number(mentorFormData.experienceYears),
        rating: Number(mentorFormData.rating),
        reviewsCount: Number(mentorFormData.reviewsCount),
        specialties: specialties.length ? specialties : ["System Design", "Backend"],
        bio: mentorFormData.bio,
        sessionDuration: mentorFormData.sessionDuration,
        availableSlots: [
          { date: "Tomorrow", slots: ["6:00 PM IST", "7:30 PM IST", "9:00 PM IST"] },
          { date: "This Weekend", slots: ["11:00 AM IST", "3:00 PM IST", "6:00 PM IST"] },
        ],
      })
      showToast(`Added new mentor: ${mentorFormData.name}`)
    }
    setShowMentorModal(false)
    setEditingMentorId(null)
  }

  const handleDeleteMentor = async (id: string) => {
    await deleteMentor(id)
    setDeleteConfirmMentorId(null)
    showToast("Mentor removed successfully.")
  }

  const handleSaveSectionConfig = (e: React.FormEvent) => {
    e.preventDefault()
    setSectionConfig(tempSectionConfig)
    if (typeof window !== "undefined") {
      localStorage.setItem("asci_mentorship_section_config", JSON.stringify(tempSectionConfig))
    }
    setShowSectionModal(false)
    showToast("Section customized successfully!")
  }

  return (
    <div className="space-y-8 animate-fadeIn" id="dashboard-mentorship-section">
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
      <div id="dashboard-mentorship-header" className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-hairline">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 font-semibold">
              <MessageSquare className="w-3 h-3" />
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
            id="dashboard-mentorship-robot-anchor"
            sectionId="dashboard-mentorship-header"
            label="Mentorship Matchmaker"
            emotion="happy"
            scale={0.44}
            size="sm"
          />
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          Admin Controls Ribbon (When Signed In as Admin)
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
                  Mentorship Roster
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Onboard verified industry mentors, manage availability slots, or customize section copy.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap shrink-0">
            <button
              onClick={openCreateMentor}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-950/40 transition-all active:scale-[0.98] cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Mentor</span>
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
            <Mail className="w-3.5 h-3.5 text-primary" />
            Unread Messages
          </span>
          <p className="text-xl font-serif font-bold text-primary mt-1">{unreadCount} New</p>
          <span className="text-[11px] text-muted-foreground mt-0.5 block">Active conversations</span>
        </div>

        <div className="rounded-2xl border border-hairline bg-card p-4 sm:p-5 shadow-2xs">
          <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#D4B872]" />
            My Booked Sessions
          </span>
          <p className="text-xl font-serif font-normal text-foreground mt-1">{confirmedBookings.length}</p>
          <span className="text-[11px] text-muted-foreground mt-0.5 block">
            {confirmedBookings.length > 0 ? "Upcoming Google Meet scheduled" : "No sessions booked yet"}
          </span>
        </div>

        <div className="rounded-2xl border border-hairline bg-card p-4 sm:p-5 shadow-2xs">
          <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
            Average Rating
          </span>
          <p className="text-xl font-serif font-normal text-foreground mt-1">4.96 / 5.0</p>
          <span className="text-[11px] text-muted-foreground mt-0.5 block">From 1,200+ mock reviews</span>
        </div>

        <div className="rounded-2xl border border-hairline bg-card p-4 sm:p-5 shadow-2xs">
          <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-primary" />
            Interview Clearance
          </span>
          <p className="text-xl font-serif font-normal text-foreground mt-1">87% Success</p>
          <span className="text-[11px] text-muted-foreground mt-0.5 block">Candidates cleared real rounds</span>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          Mode Switcher (Inbox vs Mentors vs Sessions)
      ══════════════════════════════════════════════ */}
      <div className="flex flex-wrap items-center gap-2 border-b border-hairline pb-3">
        <button
          onClick={() => setMentorshipMode("inbox")}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
            mentorshipMode === "inbox"
              ? "bg-primary text-primary-foreground font-semibold shadow-xs"
              : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80 border border-hairline"
          }`}
        >
          <Mail className="w-3.5 h-3.5" />
          <span>Direct Messages</span>
          {unreadCount > 0 && (
            <span
              className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full font-bold leading-none ${
                mentorshipMode === "inbox"
                  ? "bg-primary-foreground text-primary"
                  : "bg-primary text-primary-foreground"
              }`}
            >
              {unreadCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setMentorshipMode("mentors")}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
            mentorshipMode === "mentors"
              ? "bg-primary text-primary-foreground font-semibold shadow-xs"
              : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80 border border-hairline"
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>1-on-1 Mentorship Directory</span>
        </button>

        <button
          onClick={() => setMentorshipMode("sessions")}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
            mentorshipMode === "sessions"
              ? "bg-primary text-primary-foreground font-semibold shadow-xs"
              : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80 border border-hairline"
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>My Scheduled Calls ({confirmedBookings.length})</span>
        </button>
      </div>

      {/* ══════════════════════════════════════════════
          VIEW 1: DIRECT MESSAGES INBOX (5 Threads)
      ══════════════════════════════════════════════ */}
      {mentorshipMode === "inbox" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-secondary/40 border border-hairline">
            <div>
              <h2 className="font-serif text-lg font-normal text-foreground flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-primary" />
                <span>Inbox Communications</span>
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Direct updates from your mock interview mentors, hackathon squads, TAs, and placement advisors.
              </p>
            </div>
            <span className="text-xs font-mono text-muted-foreground">
              {unreadCount} unread message{unreadCount === 1 ? "" : "s"}
            </span>
          </div>

          <div className="space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`rounded-2xl border p-5 flex flex-col sm:flex-row items-start justify-between gap-4 transition-all shadow-2xs hover:shadow-xs ${
                  msg.unread
                    ? "border-primary/40 bg-card/90"
                    : "border-hairline bg-card/50"
                }`}
              >
                <div className="flex items-start gap-3.5 min-w-0 flex-1">
                  <div className="relative shrink-0">
                    <img
                      src={msg.avatar}
                      alt={msg.sender}
                      className="w-11 h-11 rounded-2xl object-cover border border-hairline"
                    />
                    {msg.unread && (
                      <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-primary ring-2 ring-card animate-pulse" />
                    )}
                  </div>

                  <div className="space-y-1.5 min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-serif text-base font-medium text-foreground">{msg.sender}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 leading-none">
                        {msg.badge}
                      </span>
                      <span className="text-xs text-muted-foreground">• {msg.role}</span>
                    </div>

                    <h4 className="text-xs font-semibold text-foreground">{msg.subject}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {msg.body}
                    </p>
                  </div>
                </div>

                <div className="flex sm:flex-col items-end justify-between sm:justify-start gap-2 shrink-0 self-stretch sm:self-auto border-t sm:border-t-0 pt-2 sm:pt-0 border-hairline">
                  <span className="text-[11px] font-mono text-muted-foreground">{msg.time}</span>
                  <div className="flex items-center gap-2">
                    {msg.unread && (
                      <button
                        onClick={() => markAsRead(msg.id)}
                        className="text-[11px] font-mono text-muted-foreground hover:text-foreground px-2 py-1 rounded transition-colors cursor-pointer"
                      >
                        Mark read
                      </button>
                    )}
                    <button
                      onClick={() => setActiveReplyMessage(msg)}
                      className="px-3.5 py-1.5 rounded-xl bg-primary hover:bg-primary-active text-primary-foreground text-xs font-semibold shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <Send className="w-3 h-3" />
                      <span>Reply</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════
          VIEW 2: MENTORS DIRECTORY
      ══════════════════════════════════════════════ */}
      {mentorshipMode === "mentors" && (
        <div className="space-y-6">
          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search mentors by name, company, or specialty..."
                className="w-full bg-card border border-hairline rounded-xl pl-10 pr-4 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: "all", label: "All Mentors" },
                { id: "dsa", label: "DSA & LeetCode" },
                { id: "system-design", label: "System Design" },
                { id: "resume", label: "Resume & Portfolio" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    filter === tab.id
                      ? "bg-card text-foreground border border-primary/30 font-semibold shadow-2xs"
                      : "text-muted-foreground hover:text-foreground hover:bg-card/50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredMentors.map((mentor) => (
              <div
                key={mentor.id}
                className="rounded-2xl border border-hairline bg-card p-6 flex flex-col justify-between shadow-2xs hover:border-foreground/20 transition-all group relative overflow-hidden"
              >
                <div>
                  {/* Top Row: Avatar, Info, Company Logo & Admin Controls */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-start gap-3.5 min-w-0 flex-1">
                      <div className="relative shrink-0">
                        <img
                          src={mentor.avatar}
                          alt={mentor.name}
                          className="w-13 h-13 rounded-2xl object-cover border border-hairline"
                        />
                        <div className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-card border border-hairline shadow-xs">
                          <CompanyBrandLogo company={mentor.company} className="w-5 h-5" />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-serif text-lg font-normal text-foreground group-hover:text-primary transition-colors">
                            {mentor.name}
                          </h3>
                          <ShieldCheck className="w-3.5 h-3.5 text-primary shrink-0" />
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-1">{mentor.role}</p>
                        <span className="text-[11px] font-semibold text-foreground flex items-center gap-1.5 mt-0.5">
                          <span>{mentor.company}</span>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-[10px] font-mono text-muted-foreground font-normal">
                            {mentor.experienceYears}+ yrs exp
                          </span>
                        </span>
                      </div>
                    </div>

                    {isAdmin && (
                      <div className="flex items-center gap-1 bg-secondary/80 p-0.5 rounded-lg border border-hairline shrink-0">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            openEditMentor(mentor)
                          }}
                          className="p-1 rounded hover:bg-card text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                          title="Edit Mentor (Admin)"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setDeleteConfirmMentorId(mentor.id)
                          }}
                          className="p-1 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
                          title="Delete Mentor (Admin)"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Rating & Session Format Bento Strip */}
                  <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-xl bg-secondary/50 border border-hairline text-xs mb-4">
                    <div className="flex items-center gap-1.5 font-semibold text-foreground shrink-0">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span>{mentor.rating}</span>
                      <span className="text-[10px] text-muted-foreground font-normal font-mono">({mentor.reviewsCount} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-mono text-primary font-medium shrink-0">
                      <Clock className="w-3 h-3" />
                      <span>{mentor.sessionDuration}</span>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-4">
                    {mentor.bio}
                  </p>

                  {/* Core Specialties Pills */}
                  <div className="space-y-1.5 mb-4">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground block">
                      Core Advisory Specializations
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {mentor.specialties.map((spec) => (
                        <span
                          key={spec}
                          className="px-2 py-0.5 rounded-md bg-secondary text-[10px] font-mono text-muted-foreground border border-hairline"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 border-t border-hairline flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Slots Open This Week
                  </span>

                  <button
                    onClick={() => {
                      setSelectedMentorForBooking(mentor)
                      setSelectedDate(mentor.availableSlots[0]?.date || "Tomorrow")
                      setSelectedSlot(mentor.availableSlots[0]?.slots[0] || "7:00 PM IST")
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold shadow-xs transition-all cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book 1-on-1</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════
          VIEW 3: SCHEDULED SESSIONS
      ══════════════════════════════════════════════ */}
      {mentorshipMode === "sessions" && (
        <div className="space-y-4">
          {confirmedBookings.length > 0 ? (
            <div className="space-y-4">
              <h2 className="font-serif text-xl font-normal text-foreground">My Scheduled 1-on-1 Sessions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {confirmedBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="rounded-2xl border border-hairline bg-card p-6 shadow-2xs space-y-4 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Confirmed Slot
                        </span>
                        <span className="text-[11px] font-mono text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          45 Minutes
                        </span>
                      </div>

                      <div className="flex items-center gap-3 mb-3">
                        <img
                          src={booking.mentorAvatar}
                          alt={booking.mentorName}
                          className="w-12 h-12 rounded-full object-cover border border-hairline shrink-0"
                        />
                        <div>
                          <h3 className="font-serif text-lg font-normal text-foreground">{booking.mentorName}</h3>
                          <p className="text-xs text-muted-foreground">{booking.mentorRole} • {booking.mentorCompany}</p>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-secondary/50 border border-hairline space-y-1 text-xs">
                        <span className="text-muted-foreground block text-[10px] font-mono uppercase">Session Topic</span>
                        <span className="font-medium text-foreground">{booking.topic}</span>
                        <div className="flex items-center gap-2 pt-1 text-[11px] font-mono text-primary">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{booking.date} at {booking.timeSlot}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-hairline flex flex-wrap items-center justify-between gap-2">
                      <span className="text-[11px] text-muted-foreground shrink-0">Video link verified</span>
                      <a
                        href={booking.meetLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary hover:bg-primary-active text-primary-foreground text-xs font-semibold shadow-xs transition-all shrink-0"
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>Join Google Meet</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-hairline bg-card/40 p-12 text-center">
              <Calendar className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
              <h3 className="font-serif text-lg font-normal text-foreground">No Upcoming Sessions</h3>
              <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
                You haven&apos;t scheduled any 1-on-1 mentorship sessions yet. Select a mentor from the directory to book mock technical interviews.
              </p>
              <button
                onClick={() => setMentorshipMode("mentors")}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary hover:bg-primary-active text-primary-foreground text-xs font-semibold shadow-xs transition-all cursor-pointer"
              >
                <span>Browse All Mentors</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* ══════════════════════════════════════════════
          Booking Modal / Drawer
      ══════════════════════════════════════════════ */}
      {selectedMentorForBooking && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-card border border-hairline rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-hairline">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-primary">
                  Schedule 1-on-1 Call
                </span>
                <h3 className="font-serif text-lg font-normal text-foreground">Session with {selectedMentorForBooking.name}</h3>
              </div>
              <button
                onClick={() => setSelectedMentorForBooking(null)}
                className="p-1 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-foreground block mb-1">Select Consultation Topic</label>
                <select
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  className="w-full bg-secondary border border-hairline rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
                >
                  <option value="Mock Algorithmic Interview (DSA & LeetCode)">Mock Algorithmic Interview (DSA & LeetCode)</option>
                  <option value="System Design Architecture Breakdown (LLD / HLD)">System Design Architecture Breakdown (LLD / HLD)</option>
                  <option value="Engineering Resume & Portfolio In-Depth Roast">Engineering Resume & Portfolio In-Depth Roast</option>
                  <option value="Career Transition & High-CTC Placement Strategy">Career Transition & High-CTC Placement Strategy</option>
                </select>
              </div>

              {/* Date Selector */}
              <div>
                <label className="text-xs font-medium text-foreground block mb-1">Available Days</label>
                <div className="grid grid-cols-3 gap-2">
                  {selectedMentorForBooking.availableSlots.map((avail) => (
                    <button
                      type="button"
                      key={avail.date}
                      onClick={() => {
                        setSelectedDate(avail.date)
                        setSelectedSlot(avail.slots[0] || "")
                      }}
                      className={`p-2.5 rounded-xl border text-xs font-medium transition-all cursor-pointer text-center ${
                        selectedDate === avail.date
                          ? "bg-primary text-primary-foreground border-primary font-bold shadow-xs"
                          : "bg-secondary/60 border-hairline text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {avail.date}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slots Selector */}
              {selectedMentorForBooking.availableSlots.find((a) => a.date === selectedDate) && (
                <div>
                  <label className="text-xs font-medium text-foreground block mb-1">Time Slot (IST)</label>
                  <div className="grid grid-cols-3 gap-2">
                    {selectedMentorForBooking.availableSlots
                      .find((a) => a.date === selectedDate)
                      ?.slots.map((slot) => (
                        <button
                          type="button"
                          key={slot}
                          onClick={() => setSelectedSlot(slot)}
                          className={`p-2 rounded-lg border text-xs font-mono transition-all cursor-pointer text-center ${
                            selectedSlot === slot
                              ? "bg-primary text-primary-foreground border-primary font-bold shadow-xs"
                              : "bg-secondary border-hairline text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                  </div>
                </div>
              )}

              <div>
                <label className="text-xs font-medium text-foreground block mb-1">
                  Preparation Notes / Specific Questions (Optional)
                </label>
                <textarea
                  rows={3}
                  value={candidateNotes}
                  onChange={(e) => setCandidateNotes(e.target.value)}
                  placeholder="Share details about what company you're interviewing for or specific weak spots you want to practice..."
                  className="w-full bg-secondary border border-hairline rounded-xl p-3 text-xs text-foreground focus:outline-none focus:border-primary resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedMentorForBooking(null)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-muted-foreground hover:bg-secondary cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-primary hover:bg-primary-active text-primary-foreground text-xs font-semibold shadow-xs transition-all cursor-pointer"
                >
                  Confirm &amp; Generate Meet Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════
          Quick Reply Modal
      ══════════════════════════════════════════════ */}
      {activeReplyMessage && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-card border border-hairline rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-hairline">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-primary">
                  Quick Reply
                </span>
                <h3 className="font-serif text-lg font-normal text-foreground">
                  Reply to {activeReplyMessage.sender}
                </h3>
              </div>
              <button
                onClick={() => setActiveReplyMessage(null)}
                className="p-1 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 rounded-xl bg-secondary/50 border border-hairline text-xs text-muted-foreground">
              <span className="font-semibold text-foreground block mb-0.5">Replying to: &ldquo;{activeReplyMessage.subject}&rdquo;</span>
              <p className="line-clamp-2 text-[11px]">{activeReplyMessage.body}</p>
            </div>

            <form onSubmit={handleSendMessage} className="space-y-3">
              <div>
                <label className="text-xs font-medium text-foreground block mb-1">Your Message</label>
                <textarea
                  rows={4}
                  required
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your response here..."
                  className="w-full bg-secondary border border-hairline rounded-xl p-3 text-xs text-foreground focus:outline-none focus:border-primary resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveReplyMessage(null)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-muted-foreground hover:bg-secondary cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-primary hover:bg-primary-active text-primary-foreground text-xs font-semibold shadow-xs cursor-pointer transition-all flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Reply</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════
          ADMIN MODAL: Add / Edit Mentor
      ══════════════════════════════════════════════ */}
      {showMentorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl rounded-3xl border border-hairline bg-card p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between pb-4 border-b border-hairline mb-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-medium text-foreground">
                    {editingMentorId ? "Edit Mentor Profile" : "Onboard Industry Mentor"}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Configure mentor credentials, advisory focus, and session format.
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowMentorModal(false)
                  setEditingMentorId(null)
                }}
                className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveMentor} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground block mb-1.5 font-medium">
                    Mentor Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={mentorFormData.name}
                    onChange={(e) => setMentorFormData({ ...mentorFormData, name: e.target.value })}
                    placeholder="e.g. Vivek Ramanathan"
                    className="w-full bg-secondary/60 border border-hairline rounded-xl px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div>
                  <label className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground block mb-1.5 font-medium">
                    Current Designation / Role *
                  </label>
                  <input
                    type="text"
                    required
                    value={mentorFormData.role}
                    onChange={(e) => setMentorFormData({ ...mentorFormData, role: e.target.value })}
                    placeholder="e.g. Staff Engineer, Distributed Systems"
                    className="w-full bg-secondary/60 border border-hairline rounded-xl px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div>
                  <label className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground block mb-1.5 font-medium">
                    Company / Organization *
                  </label>
                  <input
                    type="text"
                    required
                    value={mentorFormData.company}
                    onChange={(e) => setMentorFormData({ ...mentorFormData, company: e.target.value })}
                    placeholder="e.g. Google, Microsoft, Amazon"
                    className="w-full bg-secondary/60 border border-hairline rounded-xl px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div>
                  <label className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground block mb-1.5 font-medium">
                    Company Logo Brand
                  </label>
                  <select
                    value={mentorFormData.companyLogoPreset}
                    onChange={(e) => setMentorFormData({ ...mentorFormData, companyLogoPreset: e.target.value })}
                    className="w-full bg-secondary/60 border border-hairline rounded-xl px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary transition-colors cursor-pointer"
                  >
                    <option value="Google">Google (Official SVG)</option>
                    <option value="Microsoft">Microsoft (Official SVG)</option>
                    <option value="AWS">Amazon / AWS (Official Badge)</option>
                    <option value="Zerodha">Zerodha (Brand Mark)</option>
                    <option value="Razorpay">Razorpay (Brand Mark)</option>
                    <option value="ASCI">ASCI Academy (Default)</option>
                  </select>
                </div>

                <div>
                  <label className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground block mb-1.5 font-medium">
                    Avatar Icon Preset
                  </label>
                  <select
                    value={mentorFormData.avatar}
                    onChange={(e) => setMentorFormData({ ...mentorFormData, avatar: e.target.value })}
                    className="w-full bg-secondary/60 border border-hairline rounded-xl px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary transition-colors cursor-pointer"
                  >
                    <option value="/avatars/ninja.png">Ninja Avatar</option>
                    <option value="/avatars/hacker.png">Hacker Avatar</option>
                    <option value="/avatars/robot.png">Robot Avatar</option>
                    <option value="/avatars/astronaut.png">Astronaut Avatar</option>
                    <option value="/avatars/cat.png">Cat Avatar</option>
                  </select>
                </div>

                <div>
                  <label className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground block mb-1.5 font-medium">
                    Experience (Years)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={mentorFormData.experienceYears}
                    onChange={(e) => setMentorFormData({ ...mentorFormData, experienceYears: Number(e.target.value) })}
                    className="w-full bg-secondary/60 border border-hairline rounded-xl px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div>
                  <label className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground block mb-1.5 font-medium">
                    Rating (out of 5.0)
                  </label>
                  <input
                    type="number"
                    step="0.05"
                    min="1"
                    max="5"
                    value={mentorFormData.rating}
                    onChange={(e) => setMentorFormData({ ...mentorFormData, rating: Number(e.target.value) })}
                    className="w-full bg-secondary/60 border border-hairline rounded-xl px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div>
                  <label className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground block mb-1.5 font-medium">
                    Verified Reviews Count
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={mentorFormData.reviewsCount}
                    onChange={(e) => setMentorFormData({ ...mentorFormData, reviewsCount: Number(e.target.value) })}
                    className="w-full bg-secondary/60 border border-hairline rounded-xl px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground block mb-1.5 font-medium">
                    Session Format &amp; Duration
                  </label>
                  <input
                    type="text"
                    value={mentorFormData.sessionDuration}
                    onChange={(e) => setMentorFormData({ ...mentorFormData, sessionDuration: e.target.value })}
                    placeholder="e.g. 45 Mins / 1-on-1 Video"
                    className="w-full bg-secondary/60 border border-hairline rounded-xl px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground block mb-1.5 font-medium">
                    Core Specializations (comma separated)
                  </label>
                  <input
                    type="text"
                    value={mentorFormData.specialtiesInput}
                    onChange={(e) => setMentorFormData({ ...mentorFormData, specialtiesInput: e.target.value })}
                    placeholder="e.g. Distributed Systems, High-Throughput Microservices, System Design, Go"
                    className="w-full bg-secondary/60 border border-hairline rounded-xl px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground block mb-1.5 font-medium">
                    Executive Biography &amp; Mentorship Approach
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={mentorFormData.bio}
                    onChange={(e) => setMentorFormData({ ...mentorFormData, bio: e.target.value })}
                    placeholder="Describe their background, major systems architected, and advisory approach..."
                    className="w-full bg-secondary/60 border border-hairline rounded-xl p-3 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-hairline">
                <button
                  type="button"
                  onClick={() => {
                    setShowMentorModal(false)
                    setEditingMentorId(null)
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
                  <span>{editingMentorId ? "Save Changes" : "Onboard Mentor"}</span>
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
                  <h3 className="font-serif text-lg font-medium text-foreground">Customize Mentorship Section</h3>
                  <p className="text-xs text-muted-foreground">Adjust section header, badge, and description.</p>
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
      {deleteConfirmMentorId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-md rounded-3xl border border-destructive/30 bg-card p-6 shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-destructive/10 border border-destructive/20 flex items-center justify-center text-destructive mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-medium text-foreground">Remove Mentor?</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Are you sure you want to remove this mentor profile? Ongoing confirmed bookings will remain accessible.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmMentorId(null)}
                className="px-4 py-2 rounded-xl border border-hairline text-xs font-medium text-muted-foreground hover:bg-secondary cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteMentor(deleteConfirmMentorId)}
                className="px-5 py-2 rounded-xl bg-destructive text-white text-xs font-semibold shadow-md hover:bg-destructive/90 transition-all cursor-pointer"
              >
                Confirm Removal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
