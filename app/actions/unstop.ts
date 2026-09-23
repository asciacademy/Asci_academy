"use server"

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"
import { awardUserXpServer } from "@/app/actions/gamification"
import type {
  HackathonItem,
  JobOpportunity,
  SkillAssessment,
  MentorProfile,
  MentorBooking,
  TeammatePost,
  POTDProblem,
  AmbassadorProfile,
  AtsResumeData,
} from "@/lib/unstop-store"

export interface EcosystemData {
  hackathons: HackathonItem[]
  jobs: JobOpportunity[]
  assessments: SkillAssessment[]
  mentors: MentorProfile[]
  bookings: MentorBooking[]
  teammatePosts: TeammatePost[]
  potd: POTDProblem | null
  ambassador: AmbassadorProfile | null
  atsResume: AtsResumeData | null
}

// ==============================================================================
// 1. FETCH ALL REAL DATA FROM SUPABASE
// ==============================================================================
export async function getEcosystemData(): Promise<EcosystemData> {
  const supabase = await createClient()

  // Get current user if logged in
  const { data: { user } } = await supabase.auth.getUser().catch(() => ({ data: { user: null } }))
  const userId = user?.id

  // Execute all independent database requests in parallel
  const [
    rawHackathonsRes,
    regDataRes,
    rawJobsRes,
    appDataRes,
    rawAssessmentsRes,
    subDataRes,
    rawMentorsRes,
    rawBookingsRes,
    rawTeammatesRes,
    rawPotdRes,
    rawAmbRes,
    rawResumeRes,
  ] = await Promise.all([
    supabase.from("hackathons").select("*").order("created_at", { ascending: false }),
    userId ? supabase.from("hackathon_registrations").select("*").eq("user_id", userId) : Promise.resolve({ data: null }),
    supabase.from("jobs").select("*").order("created_at", { ascending: false }),
    userId ? supabase.from("job_applications").select("*").eq("user_id", userId) : Promise.resolve({ data: null }),
    supabase.from("skill_assessments").select("*").order("created_at", { ascending: false }),
    userId ? supabase.from("assessment_submissions").select("*").eq("user_id", userId) : Promise.resolve({ data: null }),
    supabase.from("mentors").select("*").order("created_at", { ascending: false }),
    userId ? supabase.from("mentor_bookings").select("*").eq("user_id", userId).order("booked_at", { ascending: false }) : Promise.resolve({ data: null }),
    supabase.from("teammate_posts").select("*").order("posted_at", { ascending: false }),
    supabase.from("potd_problems").select("*").order("challenge_date", { ascending: false }).limit(1).maybeSingle(),
    userId ? supabase.from("ambassador_profiles").select("*").eq("user_id", userId).maybeSingle() : Promise.resolve({ data: null }),
    userId ? supabase.from("ats_resumes").select("*").eq("user_id", userId).maybeSingle() : Promise.resolve({ data: null }),
  ])

  // 1. Process Hackathons & User Registrations
  const userRegistrations: Record<string, any> = {}
  if (regDataRes.data) {
    regDataRes.data.forEach((r: any) => {
      userRegistrations[r.hackathon_id] = r
    })
  }

  const hackathons: HackathonItem[] = (rawHackathonsRes.data || []).map((h: any) => {
    const reg = userRegistrations[h.id]
    return {
      id: h.id,
      title: h.title,
      host: h.host,
      hostLogo: h.host_logo || undefined,
      bannerTag: h.category,
      prizePool: h.prize_pool,
      firstPrize: h.prizes?.firstPrize || h.prize_pool,
      registeredCount: h.participants_count,
      teamSize: h.team_size,
      deadline: h.deadline,
      mode: "Online",
      difficulty: "Advanced",
      tags: h.tags || [],
      problemStatement: h.description,
      rounds: h.stages || [],
      isRegistered: !!reg,
      registration: reg ? {
        teamName: reg.team_name,
        leaderName: user?.user_metadata?.name || "Participant",
        leaderEmail: user?.email || "",
        members: [`Leader (${user?.email || "You"})`],
        track: h.category,
        registeredAt: reg.registered_at,
      } : undefined,
      submission: reg?.project_title ? {
        repoUrl: reg.repo_url || "",
        demoUrl: reg.demo_url || "",
        pitchUrl: undefined,
        notes: reg.submission_notes,
        submittedAt: reg.submitted_at || reg.registered_at,
      } : undefined,
    }
  })

  // 2. Process Jobs & Applications
  const userApplications: Record<string, any> = {}
  if (appDataRes.data) {
    appDataRes.data.forEach((a: any) => {
      userApplications[a.job_id] = a
    })
  }

  const jobs: JobOpportunity[] = (rawJobsRes.data || []).map((j: any) => {
    const app = userApplications[j.id]
    return {
      id: j.id,
      title: j.title,
      company: j.company,
      companyLogo: j.company_logo || undefined,
      roleType: (j.role_type as any) || "Full-Time",
      location: j.location,
      workMode: (j.work_mode as any) || "Hybrid",
      compensation: j.compensation,
      batchEligibility: j.batch_eligibility,
      experience: j.experience,
      skills: j.skills || [],
      closingInDays: j.closing_in_days,
      featured: j.featured,
      description: j.description,
      requirements: j.requirements || [],
      perks: j.perks || [],
      applied: !!app,
      appliedAt: app?.applied_at,
      currentStage: app?.current_stage || undefined,
      stages: app?.stages || undefined,
      interviewSlot: app?.interview_slot || undefined,
    }
  })

  // 3. Process Skill Assessments
  const userSubmissions: Record<string, any> = {}
  if (subDataRes.data) {
    subDataRes.data.forEach((s: any) => {
      userSubmissions[s.assessment_id] = s
    })
  }

  const assessments: SkillAssessment[] = (rawAssessmentsRes.data || []).map((a: any) => {
    const sub = userSubmissions[a.id]
    return {
      id: a.id,
      title: a.title,
      category: a.category,
      durationMinutes: a.duration_minutes,
      totalQuestions: a.total_questions,
      passingScore: a.passing_score,
      difficulty: a.difficulty,
      skillsCovered: a.skills_covered || [],
      badgeReward: a.badge_reward || { id: "badge", name: "Certified", icon: "Award" },
      attemptsCount: a.attempts_count,
      questions: a.questions || [],
      userScore: sub?.score,
      passed: sub?.passed,
      percentile: sub?.percentile,
      completedAt: sub?.completed_at,
    }
  })

  // 4. Process Mentors & Bookings
  const mentors: MentorProfile[] = (rawMentorsRes.data || []).map((m: any) => ({
    id: m.id,
    name: m.name,
    role: m.role,
    company: m.company,
    avatar: m.avatar || "/placeholder.svg",
    experienceYears: m.experience_years,
    rating: Number(m.rating),
    reviewsCount: m.reviews_count,
    specialties: m.specialties || [],
    bio: m.bio,
    sessionDuration: m.session_duration,
    availableSlots: m.available_slots || [],
  }))

  const bookings: MentorBooking[] = (rawBookingsRes.data || []).map((b: any) => ({
    id: b.id,
    mentorId: b.mentor_id,
    mentorName: b.mentor_name,
    mentorRole: b.mentor_role,
    mentorCompany: b.mentor_company,
    mentorAvatar: b.mentor_avatar || "/placeholder.svg",
    date: b.booking_date,
    timeSlot: b.time_slot,
    topic: b.topic,
    status: b.status as any,
    meetLink: b.meet_link,
    bookedAt: b.booked_at,
  }))

  // 5. Process Teammate Posts
  const teammatePosts: TeammatePost[] = (rawTeammatesRes.data || []).map((t: any) => ({
    id: t.id,
    authorName: t.author_name,
    authorAvatar: t.author_avatar || "/placeholder.svg",
    college: t.college,
    hackathonId: t.hackathon_id,
    hackathonTitle: t.hackathon_title,
    role: t.role,
    skills: t.skills || [],
    lookingFor: t.looking_for || [],
    pitch: t.pitch,
    contactEmail: t.contact_email,
    postedAt: new Date(t.posted_at).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    invited: false,
  }))

  // 6. Process POTD
  const rawPotd = rawPotdRes.data
  let potd: POTDProblem | null = null
  if (rawPotd) {
    let solved = false
    let userCode = undefined
    if (userId) {
      const { data: potdSub } = await supabase
        .from("potd_submissions")
        .select("*")
        .eq("problem_id", rawPotd.id)
        .eq("user_id", userId)
        .maybeSingle()
      if (potdSub) {
        solved = potdSub.solved
        userCode = potdSub.user_code
      }
    }

    potd = {
      id: rawPotd.id,
      title: rawPotd.title,
      date: rawPotd.challenge_date,
      difficulty: rawPotd.difficulty as any,
      tags: rawPotd.tags || [],
      description: rawPotd.description,
      examples: rawPotd.examples || [],
      starterCode: rawPotd.starter_code || { javascript: "", python: "", java: "" },
      testCases: rawPotd.test_cases || [],
      solved,
      userCode,
    }
  }

  // 7. Process Ambassador Profile
  let ambassador: AmbassadorProfile | null = null
  if (rawAmbRes.data) {
    const rawAmb = rawAmbRes.data
    ambassador = {
      referralCode: rawAmb.referral_code,
      referralUrl: `https://asci.academy/join?ref=${rawAmb.referral_code}`,
      totalClicks: rawAmb.total_clicks,
      joinedPeers: rawAmb.joined_peers,
      tier: rawAmb.tier as any,
      pointsEarned: rawAmb.points_earned,
      campusRank: rawAmb.campus_rank,
      campusName: rawAmb.campus_name,
      unlockedPerks: rawAmb.unlocked_perks || [],
    }
  }

  // 8. Process ATS Resume
  let atsResume: AtsResumeData | null = null
  if (rawResumeRes.data) {
    const rawResume = rawResumeRes.data
    atsResume = {
      targetRole: rawResume.target_role,
      fullName: rawResume.full_name || "",
      email: rawResume.email || "",
      phone: rawResume.phone || "",
      githubUrl: rawResume.github_url || "",
      linkedinUrl: rawResume.linkedin_url || "",
      summary: rawResume.summary || "",
      skills: rawResume.skills || [],
      projects: rawResume.projects || [],
      workExperience: rawResume.work_experience || [],
      education: rawResume.education || { college: "", degree: "", year: "", cgpa: "" },
      atsScore: rawResume.ats_score,
      actionVerbsScore: rawResume.action_verbs_score,
      keywordMatchScore: rawResume.keyword_match_score,
      missingKeywords: rawResume.missing_keywords || [],
      suggestions: rawResume.suggestions || [],
    }
  }

  return {
    hackathons,
    jobs,
    assessments,
    mentors,
    bookings,
    teammatePosts,
    potd,
    ambassador,
    atsResume,
  }
}

// ==============================================================================
// 2. REAL SUPABASE MUTATIONS
// ==============================================================================

export async function registerHackathonAction(
  hackathonId: string,
  teamData: {
    teamName: string
    leaderName: string
    leaderEmail: string
    members: string[]
    track: string
  }
) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Please log in to register for hackathons." }

  const { error } = await supabase
    .from("hackathon_registrations")
    .upsert({
      hackathon_id: hackathonId,
      user_id: user.id,
      team_name: teamData.teamName || "Team Alpha",
      team_members_count: teamData.members.length || 1,
      registered_at: new Date().toISOString(),
    }, { onConflict: "hackathon_id,user_id" })

  if (error) {
    console.error("Error registering for hackathon:", error)
    return { error: error.message }
  }

  revalidatePath("/dashboard")
  return { success: true }
}

export async function submitHackathonProjectAction(
  hackathonId: string,
  submission: {
    repoUrl: string
    demoUrl: string
    pitchUrl?: string
    notes?: string
  }
) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Please log in to submit your project." }

  const { error } = await supabase
    .from("hackathon_registrations")
    .update({
      project_title: "Hackathon Submission",
      repo_url: submission.repoUrl,
      demo_url: submission.demoUrl,
      submission_notes: submission.notes || submission.pitchUrl || "",
      submitted_at: new Date().toISOString(),
    })
    .eq("hackathon_id", hackathonId)
    .eq("user_id", user.id)

  if (error) {
    console.error("Error submitting hackathon project:", error)
    return { error: error.message }
  }

  revalidatePath("/dashboard")
  return { success: true }
}

export async function applyJobAction(jobId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Please log in to apply for roles." }

  const defaultStages = [
    { stage: "applied", label: "Application Submitted", completed: true, current: false, date: "Today" },
    { stage: "profile_viewed", label: "Profile Shortlisted by Engineering", completed: true, current: true, date: "Under Review" },
    { stage: "assessment", label: "Skill Benchmark Assessment", completed: false, current: false },
    { stage: "interview", label: "Live Systems Interview", completed: false, current: false },
    { stage: "offered", label: "Formal Offer", completed: false, current: false },
  ]

  const { error } = await supabase
    .from("job_applications")
    .upsert({
      job_id: jobId,
      user_id: user.id,
      current_stage: "profile_viewed",
      applied_at: new Date().toISOString(),
      stages: defaultStages,
    }, { onConflict: "job_id,user_id" })

  if (error) {
    console.error("Error applying for job:", error)
    return { error: error.message }
  }

  revalidatePath("/dashboard")
  return { success: true }
}

export async function submitAssessmentAction(
  assessmentId: string,
  score: number,
  passed: boolean,
  percentile: number
) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Please log in to save assessment results." }

  const credentialId = `ASCI-CERT-${Date.now().toString(36).toUpperCase()}`

  const { error } = await supabase
    .from("assessment_submissions")
    .upsert({
      assessment_id: assessmentId,
      user_id: user.id,
      score,
      passed,
      percentile,
      credential_id: credentialId,
      completed_at: new Date().toISOString(),
    }, { onConflict: "assessment_id,user_id" })

  if (error) {
    console.error("Error submitting assessment:", error)
    return { error: error.message }
  }

  revalidatePath("/dashboard")
  return { success: true, credentialId }
}

export async function bookMentorAction(bookingData: {
  mentorId: string
  mentorName: string
  mentorRole: string
  mentorCompany: string
  mentorAvatar: string
  date: string
  timeSlot: string
  topic: string
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Please log in to schedule mentorship sessions." }

  const meetLink = `https://meet.google.com/asc-${Math.random().toString(36).substring(2, 6)}-${Math.random().toString(36).substring(2, 5)}`

  const { data, error } = await supabase
    .from("mentor_bookings")
    .insert({
      mentor_id: bookingData.mentorId,
      user_id: user.id,
      mentor_name: bookingData.mentorName,
      mentor_role: bookingData.mentorRole,
      mentor_company: bookingData.mentorCompany,
      mentor_avatar: bookingData.mentorAvatar,
      booking_date: bookingData.date,
      time_slot: bookingData.timeSlot,
      topic: bookingData.topic,
      status: "confirmed",
      meet_link: meetLink,
      booked_at: new Date().toISOString(),
    })
    .select()
    .maybeSingle()

  if (error) {
    console.error("Error booking mentor session:", error)
    return { error: error.message }
  }

  revalidatePath("/dashboard")
  return { success: true, booking: data }
}

export async function createTeammatePostAction(postData: {
  authorName: string
  authorAvatar?: string
  college: string
  hackathonId: string
  hackathonTitle: string
  role: string
  skills: string[]
  lookingFor: string[]
  pitch: string
  contactEmail: string
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Please log in to post a teammate request." }

  const { data, error } = await supabase
    .from("teammate_posts")
    .insert({
      user_id: user.id,
      author_name: postData.authorName,
      author_avatar: postData.authorAvatar || "/placeholder.svg",
      college: postData.college,
      hackathon_id: postData.hackathonId,
      hackathon_title: postData.hackathonTitle,
      role: postData.role,
      skills: postData.skills,
      looking_for: postData.lookingFor,
      pitch: postData.pitch,
      contact_email: postData.contactEmail,
      posted_at: new Date().toISOString(),
    })
    .select()
    .maybeSingle()

  if (error) {
    console.error("Error creating teammate post:", error)
    return { error: error.message }
  }

  revalidatePath("/dashboard")
  return { success: true, post: data }
}

export async function solvePOTDAction(problemId: string, userCode: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Please log in to submit solutions." }

  const { error } = await supabase
    .from("potd_submissions")
    .upsert({
      problem_id: problemId,
      user_id: user.id,
      user_code: userCode,
      solved: true,
      solved_at: new Date().toISOString(),
    }, { onConflict: "problem_id,user_id" })

  if (error) {
    console.error("Error recording POTD submission:", error)
    return { error: error.message }
  }

  // Persist 150 XP and advance calendar streak in Supabase
  await awardUserXpServer(150, "Solved Problem of the Day")

  revalidatePath("/dashboard")
  return { success: true }
}

export async function saveAtsResumeAction(resumeData: Partial<AtsResumeData>) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Please log in to save your ATS resume." }

  const { error } = await supabase
    .from("ats_resumes")
    .upsert({
      user_id: user.id,
      target_role: resumeData.targetRole || "Software Development Engineer",
      full_name: resumeData.fullName || user.user_metadata?.name || "",
      email: resumeData.email || user.email || "",
      phone: resumeData.phone || "",
      github_url: resumeData.githubUrl || "",
      linkedin_url: resumeData.linkedinUrl || "",
      summary: resumeData.summary || "",
      skills: resumeData.skills || [],
      projects: resumeData.projects || [],
      work_experience: resumeData.workExperience || [],
      education: resumeData.education || {},
      ats_score: resumeData.atsScore || 88,
      action_verbs_score: resumeData.actionVerbsScore || 85,
      keyword_match_score: resumeData.keywordMatchScore || 90,
      missing_keywords: resumeData.missingKeywords || [],
      suggestions: resumeData.suggestions || [],
      updated_at: new Date().toISOString(),
    }, { onConflict: "user_id" })

  if (error) {
    console.error("Error saving ATS resume:", error)
    return { error: error.message }
  }

  revalidatePath("/dashboard")
  return { success: true }
}

export async function claimAmbassadorPerkAction(perk: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Please log in to claim perks." }

  const { data: profile } = await supabase
    .from("ambassador_profiles")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle()

  const currentPerks = profile?.unlocked_perks || []
  if (currentPerks.includes(perk)) return { success: true }

  const updatedPerks = [...currentPerks, perk]

  const { error } = await supabase
    .from("ambassador_profiles")
    .upsert({
      user_id: user.id,
      referral_code: profile?.referral_code || `ASCI-${user.id.substring(0, 6).toUpperCase()}`,
      total_clicks: profile?.total_clicks || 0,
      joined_peers: profile?.joined_peers || 0,
      tier: profile?.tier || "Campus Partner",
      points_earned: profile?.points_earned || 250,
      campus_rank: profile?.campus_rank || 12,
      campus_name: profile?.campus_name || "ASCI Tech Campus",
      unlocked_perks: updatedPerks,
      updated_at: new Date().toISOString(),
    }, { onConflict: "user_id" })

  if (error) {
    console.error("Error claiming ambassador perk:", error)
    return { error: error.message }
  }

  revalidatePath("/dashboard")
  return { success: true }
}
