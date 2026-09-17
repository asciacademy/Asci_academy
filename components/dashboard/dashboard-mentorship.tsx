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
  Mail
} from "lucide-react"
import { useUnstopEcosystem, MentorProfile, MentorBooking } from "@/lib/unstop-store"
import { AxelStage } from "@/components/axel/axel-stage"

export function DashboardMentorship() {
  const { mentors, bookings, bookMentorSession } = useUnstopEcosystem()
  const [mentorshipMode, setMentorshipMode] = useState<"inbox" | "mentors" | "sessions">("inbox")
  const [filter, setFilter] = useState<"all" | "booked" | "dsa" | "system-design" | "resume">("all")
  const [searchQuery, setSearchQuery] = useState("")

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
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20 font-semibold">
              <MessageSquare className="w-3 h-3" />
              Direct Messages &amp; Career Mentorship
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-foreground">
            Messages &amp; 1-on-1 Mentorship
          </h1>
          <p className="text-xs text-muted-foreground mt-1 max-w-2xl">
            Communicate directly with your assigned engineering mentors, TAs, hackathon squads, and book private mock technical interviews.
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
          Metrics Ribbon (Unstop Style)
      ══════════════════════════════════════════════ */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-hairline bg-card p-4.5 shadow-2xs">
          <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-blue-500" />
            Unread Messages
          </span>
          <p className="text-xl font-serif font-bold text-blue-600 dark:text-blue-400 mt-1">{unreadCount} New</p>
          <span className="text-[11px] text-muted-foreground mt-0.5 block">Active conversations</span>
        </div>

        <div className="rounded-2xl border border-hairline bg-card p-4.5 shadow-2xs">
          <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-blue-500" />
            My Booked Sessions
          </span>
          <p className="text-xl font-serif font-normal text-foreground mt-1">{confirmedBookings.length}</p>
          <span className="text-[11px] text-muted-foreground mt-0.5 block">
            {confirmedBookings.length > 0 ? "Upcoming Google Meet scheduled" : "No sessions booked yet"}
          </span>
        </div>

        <div className="rounded-2xl border border-hairline bg-card p-4.5 shadow-2xs">
          <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
            Average Rating
          </span>
          <p className="text-xl font-serif font-normal text-foreground mt-1">4.96 / 5.0</p>
          <span className="text-[11px] text-muted-foreground mt-0.5 block">From 1,200+ mock reviews</span>
        </div>

        <div className="rounded-2xl border border-hairline bg-card p-4.5 shadow-2xs">
          <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
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
              ? "bg-blue-600 text-white font-semibold shadow-xs shadow-blue-500/20"
              : "bg-secondary text-muted-foreground hover:text-foreground"
          }`}
        >
          <Mail className="w-3.5 h-3.5" />
          <span>Direct Messages</span>
          {unreadCount > 0 && (
            <span
              className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full font-bold leading-none ${
                mentorshipMode === "inbox"
                  ? "bg-white text-blue-700"
                  : "bg-blue-600 text-white"
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
              ? "bg-blue-600 text-white font-semibold shadow-xs shadow-blue-500/20"
              : "bg-secondary text-muted-foreground hover:text-foreground"
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>1-on-1 Mentorship Directory</span>
        </button>

        <button
          onClick={() => setMentorshipMode("sessions")}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
            mentorshipMode === "sessions"
              ? "bg-blue-600 text-white font-semibold shadow-xs shadow-blue-500/20"
              : "bg-secondary text-muted-foreground hover:text-foreground"
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
                <MessageSquare className="w-4 h-4 text-blue-500" />
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
                    ? "border-blue-500/35 bg-card/90"
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
                      <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 ring-2 ring-card animate-pulse" />
                    )}
                  </div>

                  <div className="space-y-1.5 min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-serif text-base font-medium text-foreground">{msg.sender}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20 leading-none">
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
                      className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs shadow-blue-500/20 transition-all cursor-pointer flex items-center gap-1.5"
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
                className="w-full bg-card border border-hairline rounded-xl pl-10 pr-4 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-blue-500 transition-colors"
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
                      ? "bg-card text-foreground border border-blue-500/30 font-semibold shadow-2xs"
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
                className="rounded-2xl border border-hairline bg-card p-6 flex flex-col justify-between shadow-2xs hover:border-foreground/20 transition-all group"
              >
                <div>
                  {/* Header Profile Info */}
                  <div className="flex items-start gap-3.5 mb-4">
                    <img
                      src={mentor.avatar}
                      alt={mentor.name}
                      className="w-14 h-14 rounded-2xl object-cover border border-hairline shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-serif text-lg font-normal text-foreground group-hover:text-primary transition-colors">
                          {mentor.name}
                        </h3>
                        <ShieldCheck className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                      </div>
                      <p className="text-xs text-muted-foreground">{mentor.role}</p>
                      <span className="text-[11px] font-semibold text-foreground flex items-center gap-1 mt-0.5">
                        <Building2 className="w-3 h-3 text-muted-foreground shrink-0" />
                        {mentor.company}
                      </span>
                    </div>
                  </div>

                  {/* Rating & Exp Strip */}
                  <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-xl bg-secondary/50 border border-hairline text-xs mb-4">
                    <div className="flex items-center gap-1 font-semibold text-foreground shrink-0">
                      <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                      <span>{mentor.rating}</span>
                      <span className="text-[10px] text-muted-foreground font-normal">({mentor.reviewsCount})</span>
                    </div>
                    <span className="text-[11px] text-muted-foreground shrink-0">{mentor.experienceYears} Years Exp</span>
                    <span className="text-[11px] font-mono text-blue-600 dark:text-blue-400 font-semibold shrink-0">{mentor.sessionDuration}</span>
                  </div>

                  {/* Bio */}
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-4">
                    {mentor.bio}
                  </p>

                  {/* Specialties */}
                  <div className="space-y-1.5 mb-4">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground block">
                      Core Focus Areas
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
                <div className="pt-4 border-t border-hairline flex items-center justify-between">
                  <span className="text-[10px] font-mono text-emerald-500 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Slots Available
                  </span>

                  <button
                    onClick={() => {
                      setSelectedMentorForBooking(mentor)
                      setSelectedDate(mentor.availableSlots[0]?.date || "Tomorrow")
                      setSelectedSlot(mentor.availableSlots[0]?.slots[0] || "7:00 PM IST")
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs shadow-blue-500/20 transition-all cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Session</span>
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
                        <div className="flex items-center gap-2 pt-1 text-[11px] font-mono text-blue-600 dark:text-blue-400">
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
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs shadow-blue-500/20 transition-all shrink-0"
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
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs shadow-blue-500/20 transition-all cursor-pointer"
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
                <span className="text-[10px] font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400">
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
                  className="w-full bg-secondary border border-hairline rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-blue-500"
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
                          ? "bg-blue-600 text-white border-blue-600 font-bold shadow-xs shadow-blue-500/20"
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
                              ? "bg-blue-600 text-white border-blue-600 font-bold shadow-xs shadow-blue-500/20"
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
                  className="w-full bg-secondary border border-hairline rounded-xl p-3 text-xs text-foreground focus:outline-none focus:border-blue-500 resize-none"
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
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs shadow-blue-500/20 transition-all cursor-pointer"
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
                <span className="text-[10px] font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400">
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
                  className="w-full bg-secondary border border-hairline rounded-xl p-3 text-xs text-foreground focus:outline-none focus:border-blue-500 resize-none"
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
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs shadow-blue-500/20 cursor-pointer transition-all flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Reply</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
