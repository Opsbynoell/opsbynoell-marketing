-- ============================================================
-- 0006_admin_password_resets.sql
--
-- One-time password-reset tokens for admin_users. The forgot-
-- password flow inserts a row here when a known email is submitted,
-- emails the corresponding link, and consumes the row on reset.
--
-- Token storage: SHA-256 hex digest of the raw token. The raw token
-- only ever lives in the emailed URL — the DB never sees it.
--
-- Run AFTER: 0003_admin_users_table.sql
-- Idempotent — safe to re-run.
-- ============================================================

CREATE TABLE IF NOT EXISTS public.admin_password_resets (
  id            uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       uuid        NOT NULL REFERENCES public.admin_users(id) ON DELETE CASCADE,
  token_hash    text        NOT NULL,
  expires_at    timestamptz NOT NULL,
  used_at       timestamptz,
  created_at    timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS admin_password_resets_token_hash_unique
  ON public.admin_password_resets (token_hash);

CREATE INDEX IF NOT EXISTS admin_password_resets_user_id_idx
  ON public.admin_password_resets (user_id);

CREATE INDEX IF NOT EXISTS admin_password_resets_expires_at_idx
  ON public.admin_password_resets (expires_at);
