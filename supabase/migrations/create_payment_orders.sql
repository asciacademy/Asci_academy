-- Payment Orders table — replaces DynamoDB for payment order storage
-- Run this migration in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS payment_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id TEXT UNIQUE NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  user_email TEXT NOT NULL DEFAULT '',
  plan TEXT NOT NULL CHECK (plan IN ('pro', 'mentorship')),
  billing_cycle TEXT NOT NULL CHECK (billing_cycle IN ('monthly', 'annual')),
  amount_inr INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'awaiting_verification', 'verified', 'rejected')),
  upi_id TEXT NOT NULL DEFAULT '',
  utr_number TEXT,
  verified_by TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for fast lookups by user
CREATE INDEX IF NOT EXISTS idx_payment_orders_user_id ON payment_orders(user_id);

-- Index for admin filtering by status
CREATE INDEX IF NOT EXISTS idx_payment_orders_status ON payment_orders(status);

-- Enable RLS
ALTER TABLE payment_orders ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own payment orders
CREATE POLICY "Users can read own payment orders"
  ON payment_orders FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Authenticated users can insert their own orders
CREATE POLICY "Users can create own payment orders"
  ON payment_orders FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own pending orders (for UTR submission)
CREATE POLICY "Users can update own pending orders"
  ON payment_orders FOR UPDATE
  USING (auth.uid() = user_id AND status = 'pending');

-- Policy: Admins can read all orders
-- (admin role check via profiles table)
CREATE POLICY "Admins can read all payment orders"
  ON payment_orders FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Policy: Admins can update any order (for verification)
CREATE POLICY "Admins can update any payment order"
  ON payment_orders FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Auto-update updated_at on changes
CREATE OR REPLACE FUNCTION update_payment_orders_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER payment_orders_updated_at
  BEFORE UPDATE ON payment_orders
  FOR EACH ROW
  EXECUTE FUNCTION update_payment_orders_updated_at();
