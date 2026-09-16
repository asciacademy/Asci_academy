-- ==============================================================================
-- SSVEMHS / ASCI Gamification Schema: Badges, Daily Tasks & XP Transactions
-- ==============================================================================

-- 1. USER BADGES TABLE
CREATE TABLE IF NOT EXISTS public.user_badges (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  badge_id TEXT NOT NULL,
  tier TEXT NOT NULL DEFAULT 'bronze',
  unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  CONSTRAINT unique_user_badge UNIQUE (user_id, badge_id)
);

ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view user badges"
  ON public.user_badges FOR SELECT USING (true);

CREATE POLICY "Users can insert own badges"
  ON public.user_badges FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 2. USER DAILY TASKS TABLE
CREATE TABLE IF NOT EXISTS public.user_daily_tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  task_date DATE NOT NULL DEFAULT CURRENT_DATE,
  task_id TEXT NOT NULL,
  completed BOOLEAN DEFAULT false NOT NULL,
  claimed BOOLEAN DEFAULT false NOT NULL,
  xp_awarded INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  CONSTRAINT unique_user_daily_task UNIQUE (user_id, task_date, task_id)
);

ALTER TABLE public.user_daily_tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own daily tasks"
  ON public.user_daily_tasks FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users manage own daily tasks"
  ON public.user_daily_tasks FOR ALL USING (auth.uid() = user_id);

-- 3. XP HISTORY AUDIT TABLE
CREATE TABLE IF NOT EXISTS public.xp_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  amount INTEGER NOT NULL,
  reason TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.xp_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own xp history"
  ON public.xp_history FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users insert own xp history"
  ON public.xp_history FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 4. ATOMIC RPC FUNCTION TO AWARD USER XP
CREATE OR REPLACE FUNCTION public.award_user_xp(
  p_user_id UUID,
  p_amount INTEGER,
  p_reason TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_new_xp INTEGER;
BEGIN
  -- Update user profile XP and last active date
  UPDATE public.profiles
  SET 
    xp = xp + p_amount,
    last_active_date = CURRENT_DATE,
    updated_at = NOW()
  WHERE id = p_user_id
  RETURNING xp INTO v_new_xp;

  -- Record audit trail in xp_history
  INSERT INTO public.xp_history (user_id, amount, reason)
  VALUES (p_user_id, p_amount, p_reason);

  RETURN jsonb_build_object(
    'success', true,
    'new_total_xp', v_new_xp,
    'awarded_amount', p_amount
  );
EXCEPTION WHEN OTHERS THEN
  RETURN jsonb_build_object('success', false, 'error', SQLERRM);
END;
$$;
