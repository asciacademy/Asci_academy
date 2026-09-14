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
  Plus
} from "lucide-react"
import { useUnstopEcosystem, HackathonItem } from "@/lib/unstop-store"
import { AxelStage } from "@/components/axel/axel-stage"

export function DashboardHackathons() {
  const {
    hackathons,
    registerForHackathon,
    submitHackathonProject,
    teammatePosts,
    addTeammatePost,
    inviteTeammate,
    activeTeammatesCount
  } = useUnstopEcosystem()

  const [mainMode, setMainMode] = useState<"challenges" | "teammates">("challenges")
  const [filter, setFilter] = useState<"all" | "registered" | "live" | "big-prizes">("all")
  const [searchQuery, setSearchQuery] = useState("")
  
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
              Unstop Ecosystem Compete
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-foreground">
            Competitions &amp; Hackathons Arena
          </h1>
          <p className="text-xs text-muted-foreground mt-1 max-w-2xl">
            Solve industry-grade architectural challenges, compete for ₹10L+ cash prizes, and secure direct interview fast-tracks with engineering leaders.
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
          Metrics Ribbon (Unstop Style)
      ══════════════════════════════════════════════ */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-hairline bg-card p-4.5 shadow-2xs">
          <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-primary" />
            Total Prize Pool
          </span>
          <p className="text-xl font-serif font-normal text-foreground mt-1">{totalPrizeSum}</p>
          <span className="text-[11px] text-muted-foreground mt-0.5 block">Across 3 live flagship cups</span>
        </div>

        <div className="rounded-2xl border border-hairline bg-card p-4.5 shadow-2xs">
          <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-[#D4B872]" />
            Registered Competitors
          </span>
          <p className="text-xl font-serif font-normal text-foreground mt-1">{totalCompetitors.toLocaleString()}+</p>
          <span className="text-[11px] text-muted-foreground mt-0.5 block">Engineers &amp; Fellows</span>
        </div>

        <div className="rounded-2xl border border-hairline bg-card p-4.5 shadow-2xs">
          <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-primary" />
            My Active Registrations
          </span>
          <p className="text-xl font-serif font-normal text-foreground mt-1">{userRegisteredCount}</p>
          <span className="text-[11px] text-muted-foreground mt-0.5 block">
            {userRegisteredCount > 0 ? "Eligible for next round" : "No active registrations yet"}
          </span>
        </div>

        <div className="rounded-2xl border border-hairline bg-card p-4.5 shadow-2xs">
          <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-[#D4B872]" />
            Contest Rating
          </span>
          <p className="text-xl font-serif font-normal text-foreground mt-1">1,640 ELO</p>
          <span className="text-[11px] text-muted-foreground mt-0.5 block">Division I • Top 6% in ASCI</span>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          Arena Mode Switcher (Challenges vs Teammate Matchmaker)
      ══════════════════════════════════════════════ */}
      <div className="flex items-center gap-2 border-b border-hairline pb-3">
        <button
          onClick={() => setMainMode("challenges")}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
            mainMode === "challenges"
              ? "bg-primary text-primary-foreground font-semibold"
              : "bg-secondary text-muted-foreground hover:text-foreground"
          }`}
        >
          <Trophy className="w-3.5 h-3.5" />
          <span>Active Competitions &amp; Grand Prix</span>
        </button>
        <button
          onClick={() => setMainMode("teammates")}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
            mainMode === "teammates"
              ? "bg-primary text-primary-foreground font-semibold"
              : "bg-secondary text-muted-foreground hover:text-foreground"
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Find Teammates Matchmaker</span>
          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-secondary border border-hairline text-foreground">
            {activeTeammatesCount}
          </span>
        </button>
      </div>

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
                className="rounded-2xl border border-hairline bg-card p-6 flex flex-col justify-between shadow-2xs hover:border-foreground/20 transition-all group"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-secondary text-primary font-semibold border border-hairline">
                      {hackathon.bannerTag}
                    </span>

                    {hackathon.isRegistered ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold">
                        <CheckCircle2 className="w-3 h-3" />
                        Registered
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Closes {hackathon.deadline}
                      </span>
                    )}
                  </div>

                  {/* Title & Host */}
                  <h3 className="font-serif text-xl font-normal text-foreground group-hover:text-primary transition-colors">
                    {hackathon.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1.5">
                    <span>Hosted by</span>
                    <span className="font-semibold text-foreground">{hackathon.host}</span>
                  </p>

                  {/* Problem Statement Preview */}
                  <p className="text-xs text-muted-foreground mt-3 line-clamp-2 leading-relaxed">
                    {hackathon.problemStatement}
                  </p>

                  {/* Prize & Meta Bento Strip */}
                  <div className="grid grid-cols-3 gap-2 my-4 p-3 rounded-xl bg-secondary/50 border border-hairline text-center">
                    <div>
                      <span className="text-[9px] font-mono uppercase text-muted-foreground block">Prize Pool</span>
                      <span className="text-sm font-serif font-semibold text-foreground text-primary">{hackathon.prizePool}</span>
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
                <div className="pt-4 border-t border-hairline flex items-center justify-between gap-3">
                  <span className="text-[11px] font-mono text-muted-foreground flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    {hackathon.registeredCount.toLocaleString()} participants
                  </span>

                  <div className="flex items-center gap-2">
                    {hackathon.isRegistered ? (
                      <button
                        onClick={() => setSelectedHackathonForSubmit(hackathon)}
                        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                          hasSubmitted
                            ? "bg-secondary text-foreground border border-hairline hover:bg-secondary/80"
                            : "bg-primary text-white hover:bg-primary-active"
                        }`}
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>{hasSubmitted ? "Update Submission" : "Submit Project"}</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => setSelectedHackathonForReg(hackathon)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-xs font-medium hover:bg-primary-active transition-colors cursor-pointer"
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
                <span className="badge-coral text-[10px]">Unstop Matchmaker</span>
                <span className="text-xs font-mono text-muted-foreground">{activeTeammatesCount} Active Requests</span>
              </div>
              <h2 className="font-serif text-xl font-normal text-foreground flex items-center gap-2">
                <Users className="w-5 h-5 text-[#ea580c]" />
                <span>Hackathon Teammate Matchmaker</span>
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Form high-impact multidisciplinary squads with vetted peers from IITs, BITS, and NITs.
              </p>
            </div>

            <button
              onClick={() => setShowPostTeammateModal(true)}
              className="btn-primary text-xs px-4 py-2 cursor-pointer inline-flex items-center gap-1.5 shrink-0"
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
                    <div className="text-[10px] font-mono text-[#ea580c] uppercase">Looking For:</div>
                    <div className="flex flex-wrap gap-1">
                      {post.lookingFor.map((s, idx) => (
                        <span key={idx} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#ea580c]/10 text-[#ea580c] border border-[#ea580c]/20">
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
                        : "btn-primary"
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
                  className="px-5 py-2 rounded-xl bg-primary text-white text-xs font-medium hover:bg-primary-active cursor-pointer"
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
                  className="px-5 py-2 rounded-xl bg-primary text-white text-xs font-medium hover:bg-primary-active cursor-pointer"
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
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#ea580c]">Matchmaker Broadcast</span>
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
                  className="btn-primary text-xs px-5 py-2 cursor-pointer"
                >
                  Publish Pitch to Board
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
