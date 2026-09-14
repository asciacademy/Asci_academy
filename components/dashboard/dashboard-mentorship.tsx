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
  ShieldCheck
} from "lucide-react"
import { useUnstopEcosystem, MentorProfile, MentorBooking } from "@/lib/unstop-store"
import { AxelStage } from "@/components/axel/axel-stage"

export function DashboardMentorship() {
  const { mentors, bookings, bookMentorSession } = useUnstopEcosystem()
  const [filter, setFilter] = useState<"all" | "booked" | "dsa" | "system-design" | "resume">("all")
  const [searchQuery, setSearchQuery] = useState("")

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
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 font-semibold">
              <Video className="w-3 h-3" />
              1-on-1 Career Mentorship
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-foreground">
            Mentorship &amp; Mock Technical Interviews
          </h1>
          <p className="text-xs text-muted-foreground mt-1 max-w-2xl">
            Book private 1-on-1 calls with Staff Engineers and Tech Leads from Google, Zerodha, and Razorpay. Master mock technical rounds and receive actionable feedback.
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
            <Users className="w-3.5 h-3.5 text-primary" />
            Verified Mentors
          </span>
          <p className="text-xl font-serif font-normal text-foreground mt-1">28+ Engineers</p>
          <span className="text-[11px] text-muted-foreground mt-0.5 block">Staff &amp; Principal Leads</span>
        </div>

        <div className="rounded-2xl border border-hairline bg-card p-4.5 shadow-2xs">
          <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#D4B872]" />
            My Booked Sessions
          </span>
          <p className="text-xl font-serif font-normal text-foreground mt-1">{confirmedBookings.length}</p>
          <span className="text-[11px] text-muted-foreground mt-0.5 block">
            {confirmedBookings.length > 0 ? "Upcoming Google Meet scheduled" : "No sessions booked yet"}
          </span>
        </div>

        <div className="rounded-2xl border border-hairline bg-card p-4.5 shadow-2xs">
          <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            Average Rating
          </span>
          <p className="text-xl font-serif font-normal text-foreground mt-1">4.96 / 5.0</p>
          <span className="text-[11px] text-muted-foreground mt-0.5 block">From 1,200+ mock reviews</span>
        </div>

        <div className="rounded-2xl border border-hairline bg-card p-4.5 shadow-2xs">
          <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-primary" />
            Interview Clearance
          </span>
          <p className="text-xl font-serif font-normal text-foreground mt-1">87% Success</p>
          <span className="text-[11px] text-muted-foreground mt-0.5 block">Candidates cleared real rounds</span>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          Search & Filters
      ══════════════════════════════════════════════ */}
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
            { id: "booked", label: `My Sessions (${confirmedBookings.length})` },
            { id: "dsa", label: "DSA & LeetCode" },
            { id: "system-design", label: "System Design" },
            { id: "resume", label: "Resume & Portfolio" },
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
          Content: My Booked Sessions vs Mentors Grid
      ══════════════════════════════════════════════ */}
      {filter === "booked" && confirmedBookings.length > 0 ? (
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

                <div className="pt-4 border-t border-hairline flex items-center justify-between">
                  <span className="text-[11px] text-muted-foreground">Video link verified</span>
                  <a
                    href={booking.meetLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-xs font-medium hover:bg-primary-active transition-colors"
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
      ) : filter === "booked" && confirmedBookings.length === 0 ? (
        <div className="rounded-2xl border border-hairline bg-card/40 p-12 text-center">
          <Calendar className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
          <h3 className="font-serif text-lg font-normal text-foreground">No Upcoming Sessions</h3>
          <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
            You haven't scheduled any 1-on-1 mentorship sessions yet. Select a mentor from the directory below to book mock interviews.
          </p>
          <button
            onClick={() => setFilter("all")}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-xs font-medium hover:bg-primary-active transition-colors cursor-pointer"
          >
            <span>Browse All Mentors</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                      <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <p className="text-xs text-muted-foreground">{mentor.role}</p>
                    <span className="text-[11px] font-semibold text-foreground flex items-center gap-1 mt-0.5">
                      <Building2 className="w-3 h-3 text-muted-foreground" />
                      {mentor.company}
                    </span>
                  </div>
                </div>

                {/* Rating & Exp Strip */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-secondary/50 border border-hairline text-xs mb-4">
                  <div className="flex items-center gap-1 font-semibold text-foreground">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>{mentor.rating}</span>
                    <span className="text-[10px] text-muted-foreground font-normal">({mentor.reviewsCount})</span>
                  </div>
                  <span className="text-[11px] text-muted-foreground">{mentor.experienceYears} Years Exp</span>
                  <span className="text-[11px] font-mono text-primary font-semibold">{mentor.sessionDuration}</span>
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
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-xs font-medium hover:bg-primary-active transition-colors cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Session</span>
                </button>
              </div>
            </div>
          ))}
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
                <span className="text-[10px] font-mono uppercase tracking-wider text-primary">Schedule 1-on-1 Call</span>
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
                          ? "bg-primary text-white border-primary"
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
                              ? "bg-primary text-white border-primary font-bold"
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
                  className="px-5 py-2 rounded-xl bg-primary text-white text-xs font-medium hover:bg-primary-active cursor-pointer"
                >
                  Confirm &amp; Generate Meet Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
