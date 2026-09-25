"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Trophy,
  Users,
  Clock,
  Globe,
  Share2,
  Calendar,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Award,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  Sparkles,
  GraduationCap,
  FileText,
  Gift,
} from "lucide-react"
import type { HackathonItem } from "@/lib/unstop-store"
import { registerHackathonAction } from "@/app/actions/unstop"
import { BrandIcon } from "@/components/ui/brand-icon"
import { detectOrganizerIcon } from "@/components/cards/competition-card"

interface CompetitionDetailProps {
  competition: HackathonItem
  user: any
}

type TabKey = "overview" | "timeline" | "rules" | "prizes" | "eligibility" | "faqs"

export function CompetitionDetail({ competition, user }: CompetitionDetailProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("overview")
  const [isRegistering, setIsRegistering] = useState(false)
  const [teamName, setTeamName] = useState("")
  const [registered, setRegistered] = useState(competition.isRegistered || false)
  const [showModal, setShowModal] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  const orgIcon = detectOrganizerIcon(competition.host)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      window.location.href = `/login?redirect=/competitions/${competition.id}`
      return
    }
    if (!teamName.trim()) {
      setErrorMsg("Please enter a team name.")
      return
    }

    setIsRegistering(true)
    setErrorMsg("")
    try {
      const res = await registerHackathonAction(competition.id, {
        teamName: teamName.trim(),
        leaderName: user?.user_metadata?.full_name || user?.email || "Team Leader",
        leaderEmail: user?.email || "",
        members: [user?.email || "Team Leader"],
        track: competition.bannerTag || "General",
      })
      if (res && !res.error) {
        setRegistered(true)
        setShowModal(false)
      } else {
        setErrorMsg(res?.error || "Failed to register. Please try again.")
      }
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred.")
    } finally {
      setIsRegistering(false)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground pt-6 pb-24 lg:py-8">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/competitions" className="hover:text-foreground transition-colors">
            Competitions
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground font-semibold truncate max-w-xs sm:max-w-md">
            {competition.title}
          </span>
        </nav>

        {/* ═══════════════════════════════════════════════════════════════
            TOP VIEWPORT: Answers immediately:
            1. WHAT IS IT?
            2. WHO ORGANIZES IT?
            3. WHEN DOES IT END?
            4. CAN I JOIN?
            5. WHAT DO I GET?
        ═══════════════════════════════════════════════════════════════ */}
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-2xs space-y-6">
          {/* Top Section */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-start gap-4 sm:gap-5">
              {/* [ORGANIZER LOGO] */}
              <div className="flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-2xl bg-secondary/80 border border-border/80 p-3">
                <BrandIcon name={orgIcon} size={42} />
              </div>

              <div className="space-y-1.5 min-w-0">
                <div className="flex items-center gap-2 flex-wrap text-xs font-mono">
                  <span className="text-primary font-bold uppercase tracking-wider">
                    {competition.bannerTag || "Hackathon"}
                  </span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">by <strong className="text-foreground font-semibold">{competition.host}</strong></span>
                  <span className="text-muted-foreground">•</span>
                  <span className="px-2 py-0.5 rounded-full bg-secondary border border-border text-foreground font-semibold">
                    {competition.mode}
                  </span>
                </div>

                {/* Competition Name */}
                <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight text-foreground leading-snug">
                  {competition.title}
                </h1>

                {/* Registration Deadline */}
                <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground pt-0.5">
                  <Calendar className="w-3.5 h-3.5 text-primary" />
                  <span>Registration Deadline: <strong className="text-foreground font-bold">{competition.deadline}</strong></span>
                </div>
              </div>
            </div>

            {/* Top Action */}
            <div className="shrink-0 flex items-center">
              {registered ? (
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white text-xs font-semibold shadow-xs">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Successfully Registered</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-[#EA5300] text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer w-full sm:w-auto"
                >
                  <span>Register Now</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════
              IMPORTANT INFO: Visual Metadata Strip
              Answers: WHAT DO I GET? CAN I JOIN? WHEN DOES IT END?
          ═══════════════════════════════════════════════════════════════ */}
          <div className="pt-4 border-t border-border grid grid-cols-2 sm:grid-cols-5 gap-4 text-center sm:text-left">
            <div>
              <div className="text-[10px] font-mono uppercase text-muted-foreground">Prize Pool</div>
              <div className="text-base sm:text-lg font-bold text-primary font-mono">{competition.prizePool}</div>
              <div className="text-[11px] text-muted-foreground">+ Placement Referral</div>
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase text-muted-foreground">Team Size</div>
              <div className="text-base sm:text-lg font-bold text-foreground font-mono">{competition.teamSize}</div>
              <div className="text-[11px] text-muted-foreground">Cross-college allowed</div>
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase text-muted-foreground">Eligibility</div>
              <div className="text-base sm:text-lg font-bold text-foreground font-mono">Open to All</div>
              <div className="text-[11px] text-muted-foreground">Students &amp; Coders</div>
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase text-muted-foreground">Deadline</div>
              <div className="text-base sm:text-lg font-bold text-foreground font-mono">{competition.deadline}</div>
              <div className="text-[11px] text-muted-foreground">23:59 IST</div>
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase text-muted-foreground">Format</div>
              <div className="text-base sm:text-lg font-bold text-foreground font-mono">{competition.mode}</div>
              <div className="text-[11px] text-muted-foreground">Remote Submission</div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            CONTENT TABS (Overview, Timeline, Rules, Prizes, Eligibility, FAQs)
            + DESKTOP STICKY RIGHT-SIDE ACTION PANEL
        ═══════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Content Tabs (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Tabs Header */}
            <div className="flex items-center gap-1 border-b border-border overflow-x-auto scrollbar-none pb-px text-xs font-mono">
              {[
                { id: "overview", label: "Overview" },
                { id: "timeline", label: "Timeline" },
                { id: "rules", label: "Rules" },
                { id: "prizes", label: "Prizes" },
                { id: "eligibility", label: "Eligibility" },
                { id: "faqs", label: "FAQs" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as TabKey)}
                  className={`px-4 py-2.5 rounded-t-xl transition-colors cursor-pointer whitespace-nowrap font-medium ${
                    activeTab === tab.id
                      ? "text-primary border-b-2 border-primary bg-secondary/40 font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Body */}
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-6 shadow-2xs text-sm leading-relaxed">
              {/* TAB 1: OVERVIEW */}
              {activeTab === "overview" && (
                <div className="space-y-5">
                  <div>
                    <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground mb-2">
                      About {competition.title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {competition.problemStatement ||
                        "This national engineering sprint brings together software scholars, system architects, and algorithms enthusiasts to engineer innovative real-world software solutions. Participants develop working prototypes, benchmark latency, and present to enterprise engineering leads."}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 rounded-xl border border-border bg-secondary/40 space-y-1.5">
                      <div className="text-xs font-mono text-muted-foreground uppercase font-bold">Skills Evaluated</div>
                      <div className="flex items-center gap-1.5 flex-wrap pt-1">
                        {(competition.tags || ["DSA", "Full-Stack", "System Design"]).map((t) => (
                          <span
                            key={t}
                            className="text-[11px] font-mono px-2 py-0.5 rounded bg-background border border-border text-foreground"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl border border-border bg-secondary/40 space-y-1.5">
                      <div className="text-xs font-mono text-muted-foreground uppercase font-bold">Organizer</div>
                      <div className="text-xs font-semibold text-foreground pt-1">
                        {competition.host} — Technical Innovation Wing
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: TIMELINE */}
              {activeTab === "timeline" && (
                <div className="space-y-5">
                  <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground">
                    Challenge Timeline &amp; Rounds
                  </h2>

                  {competition.rounds && competition.rounds.length > 0 ? (
                    <div className="space-y-4">
                      {competition.rounds.map((round, idx) => (
                        <div
                          key={round.id || idx}
                          className="flex items-start gap-4 p-4 rounded-xl border border-border bg-secondary/40"
                        >
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-mono font-bold text-xs shrink-0">
                            {idx + 1}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold text-foreground text-sm">{round.name}</h4>
                              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-background border border-border text-muted-foreground">
                                {round.status}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">{round.description}</p>
                            <span className="text-[11px] font-mono text-primary mt-1 block">
                              Date: {round.date}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="p-4 rounded-xl border border-border bg-secondary/40 space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-foreground text-xs">Round 1: Technical Proposal &amp; Repo Scaffold</h4>
                          <span className="text-[10px] font-mono text-primary font-bold">Week 1</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Submit architecture design document, tech stack, and GitHub skeleton.</p>
                      </div>

                      <div className="p-4 rounded-xl border border-border bg-secondary/40 space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-foreground text-xs">Round 2: Prototype Code Submission &amp; Benchmarks</h4>
                          <span className="text-[10px] font-mono text-primary font-bold">Week 2</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Full working build tested against automated test harness and latency metrics.</p>
                      </div>

                      <div className="p-4 rounded-xl border border-border bg-secondary/40 space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-foreground text-xs">Round 3: Grand Finale &amp; Enterprise Jury Presentation</h4>
                          <span className="text-[10px] font-mono text-primary font-bold">Week 3</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Top 10 finalist teams pitch directly to senior engineering leadership.</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: RULES */}
              {activeTab === "rules" && (
                <div className="space-y-4">
                  <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground">
                    Rules &amp; Guidelines
                  </h2>
                  <ul className="list-disc list-inside text-xs text-muted-foreground space-y-2.5 leading-relaxed">
                    <li>All submitted code must be original and authored during the competition timeframe.</li>
                    <li>Open-source libraries and frameworks are permitted, but proprietary modules must not be imported.</li>
                    <li>Submissions past the declared deadline ({competition.deadline}) will not be evaluated.</li>
                    <li>Code plagiarism, duplicate accounts, or prompt injection exploits result in immediate disqualification.</li>
                    <li>Every team must provide a public repository with installation commands and verified Docker scripts.</li>
                  </ul>
                </div>
              )}

              {/* TAB 4: PRIZES */}
              {activeTab === "prizes" && (
                <div className="space-y-5">
                  <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground">
                    Prizes &amp; Rewards
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-5 rounded-xl border border-primary/40 bg-primary/5 text-center space-y-1.5 shadow-2xs">
                      <Trophy className="h-7 w-7 text-primary mx-auto mb-1" />
                      <div className="text-xs font-mono font-bold text-primary uppercase">1st Place Winner</div>
                      <div className="text-xl font-bold text-foreground font-mono">{competition.firstPrize || "₹50,000"}</div>
                      <div className="text-xs text-muted-foreground">+ Direct Placement Interview</div>
                    </div>

                    <div className="p-5 rounded-xl border border-border bg-secondary/40 text-center space-y-1.5">
                      <Award className="h-7 w-7 text-foreground/70 mx-auto mb-1" />
                      <div className="text-xs font-mono font-bold text-muted-foreground uppercase">1st Runner Up</div>
                      <div className="text-xl font-bold text-foreground font-mono">₹25,000</div>
                      <div className="text-xs text-muted-foreground">+ ASCI Fellowship Track</div>
                    </div>

                    <div className="p-5 rounded-xl border border-border bg-secondary/40 text-center space-y-1.5">
                      <Sparkles className="h-7 w-7 text-foreground/70 mx-auto mb-1" />
                      <div className="text-xs font-mono font-bold text-muted-foreground uppercase">2nd Runner Up</div>
                      <div className="text-xl font-bold text-foreground font-mono">₹15,000</div>
                      <div className="text-xs text-muted-foreground">+ Certificate of Distinction</div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: ELIGIBILITY */}
              {activeTab === "eligibility" && (
                <div className="space-y-4">
                  <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground">
                    Eligibility Criteria
                  </h2>
                  <div className="space-y-3 text-xs">
                    <div className="p-4 rounded-xl border border-border bg-secondary/30 space-y-1">
                      <div className="font-bold text-foreground flex items-center gap-1.5">
                        <GraduationCap className="w-4 h-4 text-primary" />
                        <span>Academic Standing</span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        Open to all undergraduate, graduate, and doctoral students enrolled in Computer Science, Data Science, or related engineering programs.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-border bg-secondary/30 space-y-1">
                      <div className="font-bold text-foreground flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-primary" />
                        <span>Team Formation</span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        Allowed team size is {competition.teamSize}. Inter-college, inter-department, and cross-year teams are fully permitted. Solo participation is also welcome.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-border bg-secondary/30 space-y-1">
                      <div className="font-bold text-foreground flex items-center gap-1.5">
                        <Globe className="w-4 h-4 text-primary" />
                        <span>Geographic Eligibility</span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        Open to participants worldwide for online submissions. Final round jury presentations are conducted virtually via live video.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 6: FAQS */}
              {activeTab === "faqs" && (
                <div className="space-y-4">
                  <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground">
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-3 text-xs">
                    <div className="p-4 rounded-xl border border-border bg-secondary/30 space-y-1">
                      <strong className="block text-foreground font-semibold">Is there any fee to register?</strong>
                      <p className="text-muted-foreground">No. Registration is completely free for all verified students and professionals on ASCI Academy.</p>
                    </div>

                    <div className="p-4 rounded-xl border border-border bg-secondary/30 space-y-1">
                      <strong className="block text-foreground font-semibold">Can I modify my team members after registering?</strong>
                      <p className="text-muted-foreground">Yes, team members can be added or updated until the registration deadline ({competition.deadline}).</p>
                    </div>

                    <div className="p-4 rounded-xl border border-border bg-secondary/30 space-y-1">
                      <strong className="block text-foreground font-semibold">Will all team members receive certificates?</strong>
                      <p className="text-muted-foreground">Yes, every active team member on a verified submission receives an accredited verifiable ASCI Academy credential.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════
              DESKTOP STICKY RIGHT-SIDE ACTION PANEL:
              Register Now · Deadline · Prize · Team Size
          ═══════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-4 space-y-4">
            <div className="rounded-2xl border border-border bg-card p-6 space-y-5 shadow-2xs sticky top-24">
              <div>
                <span className="text-[11px] font-mono uppercase text-muted-foreground block mb-1">
                  Total Prize Pool
                </span>
                <div className="text-3xl font-serif font-bold text-primary font-mono">
                  {competition.prizePool}
                </div>
              </div>

              {/* Register Now Primary Action */}
              <div>
                {registered ? (
                  <div className="w-full text-center py-3 rounded-xl bg-emerald-600/10 text-emerald-600 border border-emerald-600/20 text-xs font-bold font-mono">
                    ✓ Registered for Challenge
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowModal(true)}
                    className="w-full py-3 rounded-xl bg-primary text-primary-foreground hover:bg-[#EA5300] text-xs font-bold transition-all shadow-xs cursor-pointer"
                  >
                    Register Now
                  </button>
                )}
              </div>

              {/* Deadline, Prize, Team Size strip */}
              <div className="space-y-3 pt-3 border-t border-border/60 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Deadline:</span>
                  <span className="font-bold text-foreground">{competition.deadline}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Prize Pool:</span>
                  <span className="font-bold text-primary">{competition.prizePool}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Team Size:</span>
                  <span className="font-bold text-foreground">{competition.teamSize}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Format:</span>
                  <span className="font-bold text-foreground">{competition.mode}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1 font-mono text-[11px]">
                  <ShieldCheck className="h-3.5 w-3.5 text-primary" /> Verified by ASCI
                </span>
                <span className="font-mono text-[11px]">{competition.registeredCount} registered</span>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            MOBILE STICKY BOTTOM CTA:
            Register Now
        ═══════════════════════════════════════════════════════════════ */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 p-3 bg-background/95 border-t border-border z-40 backdrop-blur-md flex items-center justify-between gap-3 shadow-lg">
          <div className="min-w-0">
            <span className="text-[10px] font-mono text-muted-foreground block uppercase">Prize Pool</span>
            <span className="text-sm font-bold text-foreground truncate block font-mono">{competition.prizePool}</span>
          </div>
          {registered ? (
            <div className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-semibold shrink-0">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Registered</span>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground hover:bg-[#EA5300] text-xs font-semibold shrink-0 shadow-xs cursor-pointer"
            >
              <span>Register Now</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Team Registration Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <h3 className="font-serif text-lg font-bold text-foreground">
                  Register for {competition.title}
                </h3>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleRegister} className="space-y-4 text-xs">
                {errorMsg && (
                  <div className="p-3 rounded-xl bg-destructive/10 text-destructive text-xs">
                    {errorMsg}
                  </div>
                )}

                <div>
                  <label className="block text-muted-foreground font-mono mb-1">
                    Team Name (or Your Name if Solo):
                  </label>
                  <input
                    type="text"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="e.g. ByteCraft Pioneers"
                    required
                    className="w-full h-10 px-3 rounded-xl border border-border bg-secondary text-foreground text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="text-[11px] text-muted-foreground">
                  By registering, you agree to the hackathon honor code and deadline timelines.
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 rounded-xl border border-border text-foreground hover:bg-secondary cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isRegistering}
                    className="px-5 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-[#EA5300] font-semibold shadow-xs cursor-pointer"
                  >
                    {isRegistering ? "Registering..." : "Confirm Registration"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Mobile Sticky Bottom CTA */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-md border-t border-border p-3.5 px-4 pb-[calc(env(safe-area-inset-bottom)+0.875rem)] shadow-lg flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="text-[10px] font-mono uppercase text-muted-foreground truncate">
              {competition.bannerTag || "Hackathon"} · {competition.prizePool}
            </div>
            <div className="text-xs font-semibold text-foreground truncate">
              {competition.deadline} deadline
            </div>
          </div>
          {registered ? (
            <div className="inline-flex items-center gap-1.5 px-4 h-11 rounded-xl bg-emerald-600 text-white text-xs font-semibold shrink-0">
              <CheckCircle2 className="h-4 w-4" />
              <span>Registered</span>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="inline-flex items-center justify-center gap-2 px-5 h-11 rounded-xl bg-primary text-primary-foreground hover:bg-[#EA5300] text-xs font-bold transition-all shadow-xs cursor-pointer shrink-0"
            >
              <span>Register Now</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
