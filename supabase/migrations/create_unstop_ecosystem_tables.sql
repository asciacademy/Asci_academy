-- ==============================================================================
-- ASCI ACADEMY: REAL DATA & UNSTOP TALENT ECOSYSTEM SCHEMA MIGRATION
-- ==============================================================================

-- 1. Extend courses table with required curriculum attributes
ALTER TABLE public.courses
  ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE,
  ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'General',
  ADD COLUMN IF NOT EXISTS difficulty TEXT DEFAULT 'Beginner',
  ADD COLUMN IF NOT EXISTS weeks TEXT DEFAULT '8 Weeks',
  ADD COLUMN IF NOT EXISTS duration_hours NUMERIC DEFAULT 0,
  ADD COLUMN IF NOT EXISTS lessons INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS projects INTEGER DEFAULT 1,
  ADD COLUMN IF NOT EXISTS certificate TEXT DEFAULT 'ASCI Certificate of Completion',
  ADD COLUMN IF NOT EXISTS thumbnail_url TEXT,
  ADD COLUMN IF NOT EXISTS tools TEXT[] DEFAULT '{}';

-- 2. HACKATHONS & COMPETITIONS
CREATE TABLE IF NOT EXISTS public.hackathons (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  host TEXT NOT NULL,
  host_logo TEXT,
  banner_image TEXT,
  prize_pool TEXT NOT NULL,
  deadline TEXT NOT NULL,
  days_left INTEGER NOT NULL DEFAULT 14,
  participants_count INTEGER NOT NULL DEFAULT 0,
  team_size TEXT NOT NULL DEFAULT '1-4 Members',
  category TEXT NOT NULL DEFAULT 'Engineering',
  status TEXT NOT NULL DEFAULT 'Registration Open',
  description TEXT NOT NULL,
  stages JSONB NOT NULL DEFAULT '[]'::jsonb,
  tags TEXT[] NOT NULL DEFAULT '{}',
  eligibility TEXT NOT NULL DEFAULT 'Open to all students and recent grads',
  prizes JSONB NOT NULL DEFAULT '[]'::jsonb,
  featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.hackathons ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "Public can view hackathons" ON public.hackathons FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "Admins can manage hackathons" ON public.hackathons FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
  );
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- 3. HACKATHON REGISTRATIONS
CREATE TABLE IF NOT EXISTS public.hackathon_registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  hackathon_id TEXT REFERENCES public.hackathons(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  team_name TEXT NOT NULL,
  team_members_count INTEGER NOT NULL DEFAULT 1,
  registered_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  project_title TEXT,
  repo_url TEXT,
  demo_url TEXT,
  submission_notes TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(hackathon_id, user_id)
);

ALTER TABLE public.hackathon_registrations ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "Users view own registrations" ON public.hackathon_registrations FOR SELECT USING (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "Users create own registrations" ON public.hackathon_registrations FOR INSERT WITH CHECK (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "Users update own registrations" ON public.hackathon_registrations FOR UPDATE USING (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- 4. JOBS & INTERNSHIPS
CREATE TABLE IF NOT EXISTS public.jobs (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  company_logo TEXT,
  role_type TEXT NOT NULL DEFAULT 'Full-Time',
  location TEXT NOT NULL DEFAULT 'Bengaluru, India',
  work_mode TEXT NOT NULL DEFAULT 'Remote',
  compensation TEXT NOT NULL,
  batch_eligibility TEXT NOT NULL DEFAULT '2024, 2025, 2026 Batch',
  experience TEXT NOT NULL DEFAULT 'Fresher / 0-1 Years',
  skills TEXT[] NOT NULL DEFAULT '{}',
  closing_in_days INTEGER NOT NULL DEFAULT 7,
  featured BOOLEAN NOT NULL DEFAULT false,
  description TEXT NOT NULL,
  requirements TEXT[] NOT NULL DEFAULT '{}',
  perks TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "Public can view jobs" ON public.jobs FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "Admins can manage jobs" ON public.jobs FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
  );
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- 5. JOB APPLICATIONS
CREATE TABLE IF NOT EXISTS public.job_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id TEXT REFERENCES public.jobs(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  current_stage TEXT NOT NULL DEFAULT 'applied',
  applied_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  stages JSONB NOT NULL DEFAULT '[]'::jsonb,
  interview_slot TEXT,
  notes TEXT,
  UNIQUE(job_id, user_id)
);

ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "Users view own applications" ON public.job_applications FOR SELECT USING (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "Users submit own applications" ON public.job_applications FOR INSERT WITH CHECK (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "Users update own applications" ON public.job_applications FOR UPDATE USING (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- 6. STANDARDIZED SKILL ASSESSMENTS
CREATE TABLE IF NOT EXISTS public.skill_assessments (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'DSA',
  duration_minutes INTEGER NOT NULL DEFAULT 30,
  total_questions INTEGER NOT NULL DEFAULT 10,
  passing_score INTEGER NOT NULL DEFAULT 75,
  difficulty TEXT NOT NULL DEFAULT 'Intermediate',
  skills_covered TEXT[] NOT NULL DEFAULT '{}',
  badge_reward JSONB NOT NULL DEFAULT '{}'::jsonb,
  attempts_count INTEGER NOT NULL DEFAULT 0,
  questions JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.skill_assessments ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "Public can view skill assessments" ON public.skill_assessments FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- 7. ASSESSMENT SUBMISSIONS & CREDENTIALS
CREATE TABLE IF NOT EXISTS public.assessment_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  assessment_id TEXT REFERENCES public.skill_assessments(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  score INTEGER NOT NULL,
  passed BOOLEAN NOT NULL,
  percentile INTEGER NOT NULL DEFAULT 90,
  credential_id TEXT NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(assessment_id, user_id)
);

ALTER TABLE public.assessment_submissions ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "Users view own submissions" ON public.assessment_submissions FOR SELECT USING (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "Users create submissions" ON public.assessment_submissions FOR INSERT WITH CHECK (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "Users update submissions" ON public.assessment_submissions FOR UPDATE USING (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- 8. MENTORS & MOCK INTERVIEWS
CREATE TABLE IF NOT EXISTS public.mentors (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  company TEXT NOT NULL,
  avatar TEXT,
  experience_years INTEGER NOT NULL DEFAULT 5,
  rating NUMERIC NOT NULL DEFAULT 4.9,
  reviews_count INTEGER NOT NULL DEFAULT 120,
  specialties TEXT[] NOT NULL DEFAULT '{}',
  bio TEXT NOT NULL,
  session_duration TEXT NOT NULL DEFAULT '45 Mins',
  available_slots JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.mentors ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "Public can view mentors" ON public.mentors FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- 9. MENTOR BOOKINGS
CREATE TABLE IF NOT EXISTS public.mentor_bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  mentor_id TEXT REFERENCES public.mentors(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  mentor_name TEXT NOT NULL,
  mentor_role TEXT NOT NULL,
  mentor_company TEXT NOT NULL,
  mentor_avatar TEXT,
  booking_date TEXT NOT NULL,
  time_slot TEXT NOT NULL,
  topic TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'confirmed',
  meet_link TEXT NOT NULL,
  candidate_notes TEXT,
  booked_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.mentor_bookings ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "Users view own bookings" ON public.mentor_bookings FOR SELECT USING (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "Users create own bookings" ON public.mentor_bookings FOR INSERT WITH CHECK (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "Users update own bookings" ON public.mentor_bookings FOR UPDATE USING (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- 10. TEAMMATE POSTS (MATCHMAKER)
CREATE TABLE IF NOT EXISTS public.teammate_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  author_name TEXT NOT NULL,
  author_avatar TEXT,
  college TEXT NOT NULL,
  hackathon_id TEXT NOT NULL,
  hackathon_title TEXT NOT NULL,
  role TEXT NOT NULL,
  skills TEXT[] NOT NULL DEFAULT '{}',
  looking_for TEXT[] NOT NULL DEFAULT '{}',
  pitch TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  posted_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.teammate_posts ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "Public can read teammate posts" ON public.teammate_posts FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "Users insert teammate posts" ON public.teammate_posts FOR INSERT WITH CHECK (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "Users delete own teammate posts" ON public.teammate_posts FOR DELETE USING (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- 11. PROBLEM OF THE DAY (POTD)
CREATE TABLE IF NOT EXISTS public.potd_problems (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  challenge_date DATE NOT NULL DEFAULT CURRENT_DATE,
  difficulty TEXT NOT NULL DEFAULT 'Medium',
  tags TEXT[] NOT NULL DEFAULT '{}',
  description TEXT NOT NULL,
  examples JSONB NOT NULL DEFAULT '[]'::jsonb,
  starter_code JSONB NOT NULL DEFAULT '{}'::jsonb,
  test_cases JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.potd_problems ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "Public can view POTD" ON public.potd_problems FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- 12. USER POTD SUBMISSIONS
CREATE TABLE IF NOT EXISTS public.potd_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  problem_id TEXT REFERENCES public.potd_problems(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  user_code TEXT NOT NULL,
  solved BOOLEAN NOT NULL DEFAULT true,
  solved_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(problem_id, user_id)
);

ALTER TABLE public.potd_submissions ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "Users view own POTD submissions" ON public.potd_submissions FOR SELECT USING (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "Users insert own POTD submissions" ON public.potd_submissions FOR INSERT WITH CHECK (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- 13. CAMPUS AMBASSADOR PROFILES
CREATE TABLE IF NOT EXISTS public.ambassador_profiles (
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE PRIMARY KEY,
  referral_code TEXT UNIQUE NOT NULL,
  total_clicks INTEGER NOT NULL DEFAULT 0,
  joined_peers INTEGER NOT NULL DEFAULT 0,
  tier TEXT NOT NULL DEFAULT 'Campus Partner',
  points_earned INTEGER NOT NULL DEFAULT 0,
  campus_rank INTEGER NOT NULL DEFAULT 1,
  campus_name TEXT NOT NULL DEFAULT 'IIT Delhi',
  unlocked_perks TEXT[] NOT NULL DEFAULT '{}',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.ambassador_profiles ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "Public can view ambassador leaderboard" ON public.ambassador_profiles FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "Users manage own ambassador profile" ON public.ambassador_profiles FOR ALL USING (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- 14. ATS RESUMES
CREATE TABLE IF NOT EXISTS public.ats_resumes (
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE PRIMARY KEY,
  target_role TEXT NOT NULL DEFAULT 'Full Stack Software Engineer',
  full_name TEXT,
  email TEXT,
  phone TEXT,
  github_url TEXT,
  linkedin_url TEXT,
  summary TEXT,
  skills TEXT[] NOT NULL DEFAULT '{}',
  projects JSONB NOT NULL DEFAULT '[]'::jsonb,
  work_experience JSONB NOT NULL DEFAULT '[]'::jsonb,
  education JSONB NOT NULL DEFAULT '{}'::jsonb,
  ats_score INTEGER NOT NULL DEFAULT 88,
  action_verbs_score INTEGER NOT NULL DEFAULT 85,
  keyword_match_score INTEGER NOT NULL DEFAULT 92,
  missing_keywords TEXT[] NOT NULL DEFAULT '{}',
  suggestions TEXT[] NOT NULL DEFAULT '{}',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.ats_resumes ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "Users manage own ATS resume" ON public.ats_resumes FOR ALL USING (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN null; END $$;
