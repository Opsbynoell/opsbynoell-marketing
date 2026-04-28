-- 0008_book_requests.sql
--
-- Working-call request inbox. Backs the form on /book that replaced the
-- iframe scheduler. Inserted by the /api/book-request route handler using
-- the service-role key (RLS off; insert path is server-only).
--
-- Idempotent. Safe to re-run.

create table if not exists public.book_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  business text not null,
  phone text not null,
  email text not null,
  booking_system text not null,
  leak_description text not null
);

create index if not exists book_requests_created_at_idx
  on public.book_requests (created_at desc);

-- The /api/book-request route writes via the service-role key, so RLS does
-- not need a permissive insert policy. We still enable RLS to deny direct
-- anonymous inserts via the public anon key.
alter table public.book_requests enable row level security;
