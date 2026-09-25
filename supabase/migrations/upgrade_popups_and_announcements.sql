-- ============================================================
-- ASCI Admin: Upgraded Pop-ups, Posters & Announcements Migration
-- Adds rich ad/poster popup capabilities & dynamic color adaptation
-- Run this in your Supabase SQL Editor
-- ============================================================

-- Ensure announcements table exists
CREATE TABLE IF NOT EXISTS public.announcements (
    id                  uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    title               text NOT NULL,
    content             text NOT NULL,
    type                text NOT NULL DEFAULT 'promo'
                        CHECK (type IN ('info', 'warning', 'success', 'promo')),
    is_active           boolean NOT NULL DEFAULT true,
    created_at          timestamptz DEFAULT now() NOT NULL,
    updated_at          timestamptz DEFAULT now() NOT NULL
);

-- Add rich pop-up and poster/ad columns if they do not exist
ALTER TABLE public.announcements
    ADD COLUMN IF NOT EXISTS is_popup boolean NOT NULL DEFAULT true,
    ADD COLUMN IF NOT EXISTS image_url text,
    ADD COLUMN IF NOT EXISTS badge_text text DEFAULT 'SPECIAL AD',
    ADD COLUMN IF NOT EXISTS cta_text text DEFAULT 'Explore Now',
    ADD COLUMN IF NOT EXISTS cta_url text DEFAULT '/live-classes',
    ADD COLUMN IF NOT EXISTS secondary_cta_text text DEFAULT 'Dismiss',
    ADD COLUMN IF NOT EXISTS secondary_cta_url text,
    ADD COLUMN IF NOT EXISTS target_audience text DEFAULT 'all',
    ADD COLUMN IF NOT EXISTS display_placement text DEFAULT 'all',
    ADD COLUMN IF NOT EXISTS frequency text DEFAULT 'once_per_session',
    ADD COLUMN IF NOT EXISTS priority integer DEFAULT 10,
    ADD COLUMN IF NOT EXISTS accent_color text DEFAULT 'auto';

-- Sample High-Conversion Poster / Pop-up Ad with Adaptive Poster Theme
INSERT INTO public.announcements (
    title,
    content,
    type,
    is_active,
    is_popup,
    image_url,
    badge_text,
    cta_text,
    cta_url,
    secondary_cta_text,
    target_audience,
    display_placement,
    frequency,
    priority,
    accent_color
) VALUES (
    'Live Zoom Masterclass: Distributed Systems & Low-Latency Architecture',
    'Join Principal Architect Arjun Mehta this weekend for an exclusive interactive Zoom workshop. Build fault-tolerant real-time clusters with WebSockets & Redis. Limited seats available for enrolled students.',
    'promo',
    true,
    true,
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop',
    'EXCLUSIVE LIVE EVENT',
    'Join Live Class Now',
    '/live-classes',
    'Learn More',
    'all',
    'all',
    'once_per_session',
    100,
    '#2563eb'
)
ON CONFLICT (id) DO NOTHING;
