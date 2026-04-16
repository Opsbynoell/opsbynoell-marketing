-- ============================================================
-- 0003_admin_users_table.sql
--
-- Creates a dedicated admin_users table completely separate from
-- Supabase Auth (auth.users / public.users). This keeps our
-- PBKDF2 + custom-token admin auth self-contained.
--
-- Also recreates user_clients with a FK to admin_users(id)
-- instead of the earlier users(id) reference.
--
-- Run AFTER: 0002_multi_tenant_admin.sql
-- Idempotent — safe to re-run.
-- ============================================================


-- ============================================================
-- 1. admin_users
-- ============================================================

CREATE TABLE IF NOT EXISTS public.admin_users (
  id             uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  email          text        NOT NULL,
  password_hash  text        NOT NULL,
  is_super_admin boolean     NOT NULL DEFAULT false,
  created_at     timestamptz NOT NULL DEFAULT now(),
  updated_at     timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS admin_users_email_unique
  ON public.admin_users (email);

DROP TRIGGER IF EXISTS admin_users_set_updated_at ON public.admin_users;
CREATE TRIGGER admin_users_set_updated_at
  BEFORE UPDATE ON public.admin_users
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


-- ============================================================
-- 2. Recreate user_clients pointing to admin_users
-- ============================================================
-- The version created in 0002 referenced public.users (Supabase Auth).
-- Drop and recreate clean against admin_users. The table was empty
-- (seed never ran successfully) so no data is lost.

DROP TABLE IF EXISTS public.user_clients;

CREATE TABLE public.user_clients (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    uuid NOT NULL REFERENCES public.admin_users(id) ON DELETE CASCADE,
  client_id  text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, client_id)
);

CREATE INDEX IF NOT EXISTS user_clients_user_id_idx   ON public.user_clients (user_id);
CREATE INDEX IF NOT EXISTS user_clients_client_id_idx ON public.user_clients (client_id);
