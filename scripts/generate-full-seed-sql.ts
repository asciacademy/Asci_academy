import * as fs from 'fs'
import * as path from 'path'
import { CURRICULUM_COURSES } from '../lib/curriculum-data'
import {
  INITIAL_HACKATHONS,
  INITIAL_JOBS,
  INITIAL_ASSESSMENTS,
  INITIAL_MENTORS,
  INITIAL_POTD,
  INITIAL_TEAMMATES,
} from '../lib/unstop-store'

function escapeSql(str: string | null | undefined): string {
  if (str === null || str === undefined) return 'NULL'
  return "'" + str.replace(/'/g, "''") + "'"
}

function escapeJson(obj: any): string {
  if (!obj) return 'NULL'
  return "'" + JSON.stringify(obj).replace(/'/g, "''") + "'::jsonb"
}

function escapeArray(arr: string[] | undefined): string {
  if (!arr || arr.length === 0) return "'{}'::text[]"
  return 'ARRAY[' + arr.map((item) => escapeSql(item)).join(', ') + ']::text[]'
}

// ==========================================
// 1. GENERATE SEED_CURRICULUM.SQL
// ==========================================
let curSql = `-- ==============================================================================
-- ASCI LMS: COMPLETE 2026 CURRICULUM SEED SCRIPT (47 COURSES, 157 MODULES, 169 LESSONS)
-- ==============================================================================
BEGIN;

`

for (const course of CURRICULUM_COURSES) {
  const courseUuid = `md5('asci-course-' || ${escapeSql(course.slug)})::uuid`
  curSql += `-- Course: ${course.title} (${course.slug})\n`
  curSql += `INSERT INTO courses (
    id, title, slug, description, category, difficulty, weeks, duration_hours,
    lessons, projects, certificate, is_published, is_premium, tools, thumbnail_url, is_deleted
  ) VALUES (
    ${courseUuid},
    ${escapeSql(course.title)},
    ${escapeSql(course.slug)},
    ${escapeSql(course.description)},
    ${escapeSql(course.category)},
    ${escapeSql(course.level)},
    ${escapeSql(course.weeks)},
    ${course.duration_hours || 0},
    ${course.lessons || (course.modules ? course.modules.reduce((acc, m) => acc + (m.lessons?.length || 0), 0) : 0)},
    ${course.projects || 0},
    ${escapeSql(course.certificate)},
    TRUE,
    ${course.is_premium ? 'TRUE' : 'FALSE'},
    ${escapeArray(course.tools)},
    ${escapeSql(course.thumbnail_url || '/placeholder.svg')},
    FALSE
  ) ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    difficulty = EXCLUDED.difficulty,
    weeks = EXCLUDED.weeks,
    duration_hours = EXCLUDED.duration_hours,
    lessons = EXCLUDED.lessons,
    projects = EXCLUDED.projects,
    certificate = EXCLUDED.certificate,
    is_published = EXCLUDED.is_published,
    is_premium = EXCLUDED.is_premium,
    tools = EXCLUDED.tools,
    thumbnail_url = EXCLUDED.thumbnail_url,
    is_deleted = FALSE;

`

  if (course.modules) {
    for (const mod of course.modules) {
      const modUuid = `md5('asci-mod-' || ${escapeSql(course.slug)} || '-' || ${mod.sequence_order})::uuid`
      curSql += `INSERT INTO modules (
        id, course_id, title, sequence_order, description, is_deleted
      ) VALUES (
        ${modUuid},
        ${courseUuid},
        ${escapeSql(mod.title)},
        ${mod.sequence_order},
        ${escapeSql(mod.description || '')},
        FALSE
      ) ON CONFLICT (id) DO UPDATE SET
        title = EXCLUDED.title,
        sequence_order = EXCLUDED.sequence_order,
        description = EXCLUDED.description,
        is_deleted = FALSE;

`

      if (mod.lessons) {
        for (const les of mod.lessons) {
          const lesUuid = `md5('asci-les-' || ${escapeSql(course.slug)} || '-' || ${mod.sequence_order} || '-' || ${les.sequence_order})::uuid`
          curSql += `INSERT INTO lessons (
            id, module_id, title, sequence_order, content_type, xp_reward,
            description, content, challenge_data, is_deleted
          ) VALUES (
            ${lesUuid},
            ${modUuid},
            ${escapeSql(les.title)},
            ${les.sequence_order},
            ${escapeSql(les.content_type || 'text')}::content_type,
            ${les.xp_reward || 50},
            ${escapeSql(les.description || '')},
            ${escapeSql(les.content || '')},
            ${escapeJson(les.challenge_data)},
            FALSE
          ) ON CONFLICT (id) DO UPDATE SET
            title = EXCLUDED.title,
            sequence_order = EXCLUDED.sequence_order,
            content_type = EXCLUDED.content_type,
            xp_reward = EXCLUDED.xp_reward,
            description = EXCLUDED.description,
            content = EXCLUDED.content,
            challenge_data = EXCLUDED.challenge_data,
            is_deleted = FALSE;

`
        }
      }
    }
  }
}

curSql += `COMMIT;\n`
const curOutPath = path.join(__dirname, '..', 'supabase', 'seeds', 'seed_curriculum.sql')
fs.writeFileSync(curOutPath, curSql)
console.log('Successfully generated supabase/seeds/seed_curriculum.sql!')

// ==========================================
// 2. GENERATE SEED_ECOSYSTEM.SQL
// ==========================================
let ecoSql = `-- ==============================================================================
-- ASCI UNSTOP ECOSYSTEM: REALISTIC SEED DATA (HACKATHONS, JOBS, ASSESSMENTS, MENTORS, POTD, ETC)
-- ==============================================================================
BEGIN;

-- 1. HACKATHONS
`

for (const h of INITIAL_HACKATHONS) {
  ecoSql += `INSERT INTO hackathons (
    id, title, slug, host, host_logo, prize_pool, deadline, days_left,
    participants_count, team_size, category, status, description, stages, tags,
    eligibility, prizes, featured
  ) VALUES (
    ${escapeSql(h.id)},
    ${escapeSql(h.title)},
    ${escapeSql(h.id.toLowerCase().replace(/[^a-z0-9]+/g, '-'))},
    ${escapeSql(h.host)},
    ${escapeSql(h.hostLogo || '/partners/asci.svg')},
    ${escapeSql(h.prizePool)},
    ${escapeSql(h.deadline)},
    ${Math.max(1, Math.ceil((new Date(h.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))},
    ${h.registeredCount},
    ${escapeSql(h.teamSize)},
    ${escapeSql(h.bannerTag)},
    'Open for Registration',
    ${escapeSql(h.problemStatement)},
    ${escapeJson(h.rounds)},
    ${escapeArray(h.tags)},
    'Engineering students & professionals worldwide',
    ${escapeJson({ firstPrize: h.firstPrize, totalPool: h.prizePool })},
    TRUE
  ) ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    host = EXCLUDED.host,
    prize_pool = EXCLUDED.prize_pool,
    deadline = EXCLUDED.deadline,
    participants_count = EXCLUDED.participants_count,
    team_size = EXCLUDED.team_size,
    stages = EXCLUDED.stages,
    tags = EXCLUDED.tags,
    description = EXCLUDED.description;

`
}

ecoSql += `\n-- 2. JOBS\n`
for (const j of INITIAL_JOBS) {
  ecoSql += `INSERT INTO jobs (
    id, title, company, company_logo, role_type, location, work_mode,
    compensation, batch_eligibility, experience, skills, closing_in_days,
    featured, description, requirements, perks
  ) VALUES (
    ${escapeSql(j.id)},
    ${escapeSql(j.title)},
    ${escapeSql(j.company)},
    ${escapeSql(j.companyLogo ? `/partners/${j.companyLogo}.svg` : '/partners/asci.svg')},
    ${escapeSql(j.roleType)},
    ${escapeSql(j.location)},
    ${escapeSql(j.workMode)},
    ${escapeSql(j.compensation)},
    ${escapeSql(j.batchEligibility)},
    ${escapeSql(j.experience)},
    ${escapeArray(j.skills)},
    ${j.closingInDays},
    ${j.featured ? 'TRUE' : 'FALSE'},
    ${escapeSql(j.description)},
    ${escapeArray(j.requirements)},
    ${escapeArray(j.perks)}
  ) ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    company = EXCLUDED.company,
    compensation = EXCLUDED.compensation,
    skills = EXCLUDED.skills,
    requirements = EXCLUDED.requirements,
    perks = EXCLUDED.perks,
    description = EXCLUDED.description;

`
}

ecoSql += `\n-- 3. SKILL ASSESSMENTS\n`
for (const a of INITIAL_ASSESSMENTS) {
  ecoSql += `INSERT INTO skill_assessments (
    id, title, category, duration_minutes, total_questions, passing_score,
    difficulty, skills_covered, badge_reward, attempts_count, questions
  ) VALUES (
    ${escapeSql(a.id)},
    ${escapeSql(a.title)},
    ${escapeSql(a.category)},
    ${a.durationMinutes},
    ${a.totalQuestions},
    ${a.passingScore},
    ${escapeSql(a.difficulty)},
    ${escapeArray(a.skillsCovered)},
    ${escapeJson(a.badgeReward)},
    ${a.attemptsCount},
    ${escapeJson(a.questions)}
  ) ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    category = EXCLUDED.category,
    duration_minutes = EXCLUDED.duration_minutes,
    total_questions = EXCLUDED.total_questions,
    passing_score = EXCLUDED.passing_score,
    difficulty = EXCLUDED.difficulty,
    skills_covered = EXCLUDED.skills_covered,
    badge_reward = EXCLUDED.badge_reward,
    questions = EXCLUDED.questions;

`
}

ecoSql += `\n-- 4. MENTORS\n`
for (const m of INITIAL_MENTORS) {
  ecoSql += `INSERT INTO mentors (
    id, name, role, company, avatar, experience_years, rating,
    reviews_count, specialties, bio, session_duration, available_slots
  ) VALUES (
    ${escapeSql(m.id)},
    ${escapeSql(m.name)},
    ${escapeSql(m.role)},
    ${escapeSql(m.company)},
    ${escapeSql(m.avatar)},
    ${m.experienceYears},
    ${m.rating},
    ${m.reviewsCount},
    ${escapeArray(m.specialties)},
    ${escapeSql(m.bio)},
    ${escapeSql(m.sessionDuration)},
    ${escapeJson(m.availableSlots)}
  ) ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    role = EXCLUDED.role,
    company = EXCLUDED.company,
    avatar = EXCLUDED.avatar,
    rating = EXCLUDED.rating,
    specialties = EXCLUDED.specialties,
    bio = EXCLUDED.bio,
    available_slots = EXCLUDED.available_slots;

`
}

ecoSql += `\n-- 5. PROBLEM OF THE DAY\n`
ecoSql += `INSERT INTO potd_problems (
  id, title, challenge_date, difficulty, tags, description,
  examples, starter_code, test_cases
) VALUES (
  ${escapeSql(INITIAL_POTD.id)},
  ${escapeSql(INITIAL_POTD.title)},
  CURRENT_DATE,
  ${escapeSql(INITIAL_POTD.difficulty)},
  ${escapeArray(INITIAL_POTD.tags)},
  ${escapeSql(INITIAL_POTD.description)},
  ${escapeJson(INITIAL_POTD.examples)},
  ${escapeJson(INITIAL_POTD.starterCode)},
  ${escapeJson(INITIAL_POTD.testCases)}
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  difficulty = EXCLUDED.difficulty,
  tags = EXCLUDED.tags,
  description = EXCLUDED.description,
  examples = EXCLUDED.examples,
  starter_code = EXCLUDED.starter_code,
  test_cases = EXCLUDED.test_cases;

`

ecoSql += `\n-- 6. TEAMMATE POSTS\n`
const sampleUserIds = [
  '4d342614-f8ec-48a9-8c76-8e1bead7b1cb',
  '58e211ca-b614-4829-8362-0d955548ee72',
  'db177657-b831-43f8-8630-13002969b57a',
]

INITIAL_TEAMMATES.forEach((post, idx) => {
  const userId = sampleUserIds[idx % sampleUserIds.length]
  const postUuid = `md5('asci-team-post-' || ${escapeSql(post.id)})::uuid`
  ecoSql += `INSERT INTO teammate_posts (
    id, user_id, author_name, author_avatar, college, hackathon_id,
    hackathon_title, role, skills, looking_for, pitch, contact_email
  ) VALUES (
    ${postUuid},
    '${userId}'::uuid,
    ${escapeSql(post.authorName)},
    ${escapeSql(post.authorAvatar)},
    ${escapeSql(post.college)},
    ${escapeSql(post.hackathonId)},
    ${escapeSql(post.hackathonTitle)},
    ${escapeSql(post.role)},
    ${escapeArray(post.skills)},
    ${escapeArray(post.lookingFor)},
    ${escapeSql(post.pitch)},
    ${escapeSql(post.contactEmail)}
  ) ON CONFLICT (id) DO UPDATE SET
    author_name = EXCLUDED.author_name,
    role = EXCLUDED.role,
    skills = EXCLUDED.skills,
    looking_for = EXCLUDED.looking_for,
    pitch = EXCLUDED.pitch;

`
})

ecoSql += `\n-- 7. TESTIMONIALS (TIED TO REAL USERS IN PROFILES)\n`
const realTestimonials = [
  {
    userId: '4d342614-f8ec-48a9-8c76-8e1bead7b1cb',
    cohort: 'Alumni 2025 · Google L4',
    content:
      'The algorithmic optimization visualizers and the system design tracks made my interview prep seamless. I transitioned from struggling with dynamic programming invariants to securing offers at top tier tech firms within 4 months.',
    rating: 5,
  },
  {
    userId: '58e211ca-b614-4829-8362-0d955548ee72',
    cohort: 'Batch 2025 · Vercel Platform',
    content:
      'The full-stack curriculum with Next.js and high-concurrency systems taught me design patterns that I implement daily in production. Having mentor code reviews completely elevated my standard for code quality.',
    rating: 5,
  },
  {
    userId: 'db177657-b831-43f8-8630-13002969b57a',
    cohort: 'Batch 2025 · Razorpay Core',
    content:
      'I started with basic data structure syntax and graduated to engineering distributed idempotency engines. The hackathons and live speed challenges gave me the real portfolio that recruiters cared about.',
    rating: 5,
  },
  {
    userId: '02d1fa8e-1175-44f8-8fb2-375537ee98b6',
    cohort: 'Batch 2026 · Microsoft Fellow',
    content:
      'The Agentic AI curriculum is unlike anything else on the internet. Working with LangGraph, stateful PRAL loops, and MCP tools directly prepared me for cutting-edge autonomous engineering roles.',
    rating: 5,
  },
  {
    userId: '89539eeb-029c-469f-85c0-99e9cde180cc',
    cohort: 'Batch 2025 · Zerodha Systems',
    content:
      'The low-latency Go and distributed database modules pushed me to understand lock contention and cache stampedes. ASCI was the highest ROI decision of my college journey.',
    rating: 5,
  },
]

for (const t of realTestimonials) {
  const testUuid = `md5('asci-testim-' || '${t.userId}')::uuid`
  ecoSql += `INSERT INTO testimonials (
    id, user_id, content, rating, cohort, is_approved, is_published
  ) VALUES (
    ${testUuid},
    '${t.userId}'::uuid,
    ${escapeSql(t.content)},
    ${t.rating},
    ${escapeSql(t.cohort)},
    TRUE,
    TRUE
  ) ON CONFLICT (id) DO UPDATE SET
    content = EXCLUDED.content,
    rating = EXCLUDED.rating,
    cohort = EXCLUDED.cohort,
    is_approved = TRUE,
    is_published = TRUE;

`
}

ecoSql += `COMMIT;\n`
const ecoOutPath = path.join(__dirname, '..', 'supabase', 'seeds', 'seed_ecosystem.sql')
fs.writeFileSync(ecoOutPath, ecoSql)
console.log('Successfully generated supabase/seeds/seed_ecosystem.sql!')
