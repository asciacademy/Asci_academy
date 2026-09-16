-- Migration: Add Certificates Table for Gravit x ASCI Verification
-- File: add_certificates_table.sql

CREATE TABLE IF NOT EXISTS public.certificates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  certificate_id TEXT UNIQUE NOT NULL, -- e.g. "GRV-ASCI-2026-X89F2A1B"
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  recipient_name TEXT NOT NULL,
  recipient_email TEXT,
  course_id TEXT NOT NULL,
  course_title TEXT NOT NULL,
  course_slug TEXT,
  issuer_name TEXT DEFAULT 'Gravit & ASCI Academy' NOT NULL,
  issued_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  verification_code TEXT NOT NULL,
  grade TEXT DEFAULT 'Mastery with Distinction',
  skills TEXT[] DEFAULT '{}',
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Index on certificate_id for fast QR lookups
CREATE INDEX IF NOT EXISTS idx_certificates_certificate_id ON public.certificates(certificate_id);
CREATE INDEX IF NOT EXISTS idx_certificates_user_id ON public.certificates(user_id);
CREATE INDEX IF NOT EXISTS idx_certificates_course_id ON public.certificates(course_id);

-- Enable Row Level Security
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

-- Clean up existing policies if any
DROP POLICY IF EXISTS "Public can verify certificates by certificate_id" ON public.certificates;
DROP POLICY IF EXISTS "Users can view their own certificates" ON public.certificates;
DROP POLICY IF EXISTS "Users can insert their own certificates" ON public.certificates;
DROP POLICY IF EXISTS "Admins can manage all certificates" ON public.certificates;

-- Policy 1: Anyone (even unauthenticated) can verify any certificate
CREATE POLICY "Public can verify certificates by certificate_id"
  ON public.certificates FOR SELECT
  USING (true);

-- Policy 2: Authenticated users can insert their own certificate
CREATE POLICY "Users can insert their own certificates"
  ON public.certificates FOR INSERT
  WITH CHECK (auth.uid() = user_id OR auth.uid() IS NOT NULL);

-- Policy 3: Authenticated users can update their own certificates
CREATE POLICY "Users can update their own certificates"
  ON public.certificates FOR UPDATE
  USING (auth.uid() = user_id);

-- Policy 4: Admins can manage all certificates
CREATE POLICY "Admins can manage all certificates"
  ON public.certificates FOR ALL
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
  );
