-- ============================================================
-- ASCI Admin: Live Classes & Zoom Meetings Table Migration
-- Run this in your Supabase SQL Editor
-- ============================================================

CREATE TABLE IF NOT EXISTS public.live_classes (
    id                  uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    title               text NOT NULL,
    description         text NOT NULL,
    topic               text NOT NULL DEFAULT 'Engineering Masterclass',
    instructor_name     text NOT NULL,
    instructor_role     text NOT NULL DEFAULT 'Senior Engineering Lead',
    instructor_avatar   text,
    start_time          timestamptz NOT NULL,
    duration_minutes    integer NOT NULL DEFAULT 60,
    status              text NOT NULL DEFAULT 'upcoming'
                        CHECK (status IN ('upcoming', 'live', 'completed', 'cancelled')),
    zoom_meeting_url    text NOT NULL,
    zoom_meeting_id     text,
    zoom_passcode       text,
    recording_url       text,
    banner_image        text,
    max_attendees       integer DEFAULT 250,
    attendees_count     integer DEFAULT 0,
    tags                text[] DEFAULT '{}',
    is_featured         boolean DEFAULT false,
    created_at          timestamptz DEFAULT now() NOT NULL,
    updated_at          timestamptz DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.live_classes ENABLE ROW LEVEL SECURITY;

-- Admins have full CRUD permissions
CREATE POLICY "admins_full_access_live_classes"
ON public.live_classes
FOR ALL
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.profiles
        WHERE profiles.id = auth.uid()
        AND profiles.role IN ('admin', 'super_admin')
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.profiles
        WHERE profiles.id = auth.uid()
        AND profiles.role IN ('admin', 'super_admin')
    )
);

-- Everyone (students and public visitors) can read live classes
CREATE POLICY "public_read_live_classes"
ON public.live_classes
FOR SELECT
USING (true);

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_live_classes_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_live_classes_updated_at ON public.live_classes;
CREATE TRIGGER update_live_classes_updated_at
BEFORE UPDATE ON public.live_classes
FOR EACH ROW EXECUTE FUNCTION public.update_live_classes_timestamp();

-- Sample Live Classes & Zoom Meetings
INSERT INTO public.live_classes (
    title,
    description,
    topic,
    instructor_name,
    instructor_role,
    instructor_avatar,
    start_time,
    duration_minutes,
    status,
    zoom_meeting_url,
    zoom_meeting_id,
    zoom_passcode,
    recording_url,
    banner_image,
    max_attendees,
    attendees_count,
    tags,
    is_featured
) VALUES
(
    'High-Throughput Distributed Systems & WebSockets with Redis',
    'Interactive live deep-dive into building fault-tolerant, horizontally scalable realtime architectures. Live coding with Go and Redis Pub/Sub, benchmark analysis, and production failover simulations.',
    'System Design & Architecture',
    'Arjun Mehta',
    'Principal Distributed Systems Architect @ Ex-Stripe',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
    now() + interval '2 hours',
    90,
    'upcoming',
    'https://zoom.us/j/84920394821?pwd=asci-systems-live',
    '849 2039 4821',
    'ASCI2026',
    NULL,
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop',
    300,
    148,
    ARRAY['System Design', 'WebSockets', 'Distributed Systems', 'Redis'],
    true
),
(
    'DSA Live Sprint: Cracking Dynamic Programming & Graph Hard Problems',
    'Intensive algorithmic problem-solving sprint covering Memoization vs Tabulation, Tree DP, and shortest-path graph algorithms with direct interactive Q&A and code walkthroughs.',
    'DSA & Algorithmic Problem Solving',
    'Priya Sharma',
    'Senior SWE & ICPC Regional Finalist',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
    now() + interval '1 day',
    120,
    'upcoming',
    'https://zoom.us/j/91283746501?pwd=asci-dsa-masterclass',
    '912 8374 6501',
    'DPGRAPH26',
    NULL,
    'https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=1200&auto=format&fit=crop',
    250,
    215,
    ARRAY['Dynamic Programming', 'Graphs', 'A2Z Sheet', 'Interview Prep'],
    true
),
(
    'React 19 & Next.js Fullstack Architecture Masterclass',
    'Explore React 19 Server Components, Server Actions lifecycle, micro-frontends, edge caching, and database pooling with Supabase and Postgres.',
    'Full-Stack & Web Engineering',
    'Rohan Varma',
    'Lead Frontend Architect',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
    now() - interval '2 days',
    75,
    'completed',
    'https://zoom.us/j/88392019482',
    '883 9201 9482',
    'REACT19',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1200&auto=format&fit=crop',
    200,
    189,
    ARRAY['React 19', 'Next.js', 'SSR', 'TypeScript'],
    false
);
