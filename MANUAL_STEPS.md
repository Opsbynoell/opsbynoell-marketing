# Manual Steps — Ops by Noell Marketing Site

Everything in this repo deploys automatically via Vercel + GitHub push.  
The items below require manual action in external dashboards.

---

## Step 1 — Supabase: Apply the agents schema migration

**Project:** `clipzfkbzupjctherijz`  
**Dashboard:** https://supabase.com/dashboard/project/clipzfkbzupjctherijz/sql/new

Open the SQL editor and run the contents of:

```
supabase/migrations/0001_agents_schema.sql
```

This is idempotent (uses `IF NOT EXISTS` and `IF NOT EXISTS` column adds).  
Safe to re-run if you're unsure whether it has been applied.

**Verify:**
```sql
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_name IN (
    'front_desk_sessions', 'front_desk_messages', 'appointments',
    'care_sessions', 'care_messages', 'knowledge_base', 'client_contacts'
  );
```
Should return 7 rows.

---

## Step 2 — Supabase: Seed Santa's client record + knowledge base

After Step 1 is confirmed, run:

```
supabase/seeds/santa_seed.sql
```

Before running, fill in the placeholders at the top of the file:

| Placeholder | Replace with |
|---|---|
| `PHONE_PLACEHOLDER` | Santa's real phone number |
| `EMAIL_PLACEHOLDER` | Santa's real email |
| `BOOKING_URL_PLACEHOLDER` | GHL calendar booking URL for Santa |
| `REVIEW_URL_PLACEHOLDER` | Google Business review link |
| `TELEGRAM_CHAT_ID_PLACEHOLDER` | Santa's Telegram chat ID for alert routing |

**Verify:**
```sql
SELECT brand_name, vertical, phone, email FROM clients WHERE id = 'santa';
SELECT category, count(*) FROM knowledge_base WHERE client_id = 'santa' GROUP BY category;
```
Should return 1 client row and 5 category rows (services 8, faq 8, location 3, policies 3, team 3 = 25 total).

---

## Step 3 — Vercel: Set environment variables

**Project:** `opsbynoell-marketing-preview` (or production project — whichever is deploying the marketing site)  
**Dashboard:** https://vercel.com/dashboard → project → Settings → Environment Variables

Add all of these. Set scope to **Production + Preview + Development** unless noted.

| Variable | Value | Notes |
|---|---|---|
| `SUPABASE_URL` | `https://clipzfkbzupjctherijz.supabase.co` | |
| `SUPABASE_SERVICE_ROLE_KEY` | *(from Supabase dashboard → Settings → API)* | Service role key, not anon key |
| `ANTHROPIC_API_KEY` | *(your Anthropic API key)* | |
| `CRON_SECRET` | `8e419828aaed5017675155c4320e7b31967dbd397096a18c502a54ba4eb15b01` | Used to authenticate cron job calls |
| `ADMIN_PASSWORD` | *(choose a strong password)* | Used to log into /admin |
| `ADMIN_SECRET` | *(choose a random 32+ char secret)* | Used to sign admin session tokens |
| `GHL_API_KEY` | *(GoHighLevel API key)* | Used for GHL integration routes |

---

## Step 4 — Redeploy

After setting env vars, trigger a redeploy:

1. Go to Vercel dashboard → project → Deployments
2. Click the three dots on the latest deployment → Redeploy
3. Wait for build to complete (usually 1-2 minutes)

Or push any commit to trigger an automatic deploy.

---

## Step 5 — Smoke test the admin dashboard

After deploy, navigate to:

```
https://www.opsbynoell.com/admin/login
```

1. Enter the `ADMIN_PASSWORD` you set → should redirect to `/admin`
2. `/admin` should load the inbox (may be empty if no sessions yet)
3. Filter tabs (All / Noell Support / Front Desk / Care) should all be clickable
4. Logout → should redirect back to `/admin/login`

**If you see a 500 on `/admin/login`:** env vars are likely not picked up — confirm they're set and redeploy.

---

## Step 6 — GHL wiring for Santa (Healing Hands by Santa)

**GHL location ID:** `vdWqRPcn6jIx8AK0DlHF`

### 6a. Missed Call Text-Back workflow
1. In Santa's GHL sub-account → Automation → New Workflow
2. Trigger: **Missed Call**
3. Action: **Send SMS** with this template (update `BOOKING_URL` first):
   ```
   Hi {{contact.first_name}}, this is Santa at Healing Hands. Sorry I missed your call — I was with a client. I'd love to get you on my calendar. Here are my next two open sessions: [SLOT_1] and [SLOT_2]. Book here: BOOKING_URL
   ```
4. Delay: 0 minutes (immediate)
5. Enable workflow

### 6b. Appointment reminder workflow
1. Trigger: **Appointment Scheduled**
2. Action: **Wait** → 24 hours before appointment → **Send SMS** (confirmation reminder)
3. Action: **Wait** → 2 hours before appointment → **Send SMS** (same-day reminder)
4. Reminder copy:
   ```
   Hi {{contact.first_name}}, just a reminder you have a session with Santa tomorrow at {{appointment.start_time}}. Reply CONFIRM to confirm or call/text PHONE_PLACEHOLDER to reschedule.
   ```

### 6c. Review request workflow
1. Trigger: **Appointment Status Changed to Completed**
2. Action: **Wait** → 2 hours
3. Action: **Send SMS**:
   ```
   Hi {{contact.first_name}}, thank you for coming in today. If you have a moment, a Google review means a lot to a small practice like mine: GOOGLE_REVIEW_PLACEHOLDER. — Santa
   ```

### 6d. Reactivation workflow
1. Trigger: **Tag Added** → tag: `reactivation-candidate`  
   *(Or use a date-based trigger: last appointment > 75 days ago)*
2. Action: **Send SMS**:
   ```
   Hi {{contact.first_name}}, it's been a while and I'd love to see you back on my table. I have openings next week — book here: BOOKING_URL
   ```

---

## What is already done (no action required)

- **Task 1 — Widget site-wide:** `AgentRouter` component in `src/app/layout.tsx` already renders the correct widget on every page. No changes needed.
- **Task 2 — Admin dashboard:** All files are written and deployed. Routes: `/admin/login`, `/admin` (inbox), `/admin/sessions/[id]` (conversation detail). API routes under `/api/admin/`.
- **Task 3 — UX fixes:**
  - FAQ accordion now allows multiple items open simultaneously
  - Verticals navbar item now has a hover/click dropdown with all 6 vertical links
- **Task 4 — Santa SQL:** Written at `supabase/seeds/santa_seed.sql` (run manually per Step 2)

---

## File reference

| File | Purpose |
|---|---|
| `supabase/migrations/0001_agents_schema.sql` | Main schema migration (run once) |
| `supabase/seeds/santa_seed.sql` | Santa client + knowledge base seed |
| `src/lib/admin-auth.ts` | Admin token creation/verification |
| `src/middleware.ts` | Protects `/admin/*` routes |
| `src/app/admin/login/page.tsx` | Login page |
| `src/app/admin/page.tsx` | Inbox (all 3 agents, 2s polling) |
| `src/app/admin/sessions/[id]/page.tsx` | Conversation detail + operator reply |
| `src/app/api/admin/sessions/route.ts` | GET sessions (all 3 tables normalized) |
| `src/app/api/admin/sessions/[id]/route.ts` | GET single session + messages |
| `src/app/api/admin/sessions/[id]/takeover/route.ts` | POST take over session |
| `src/app/api/admin/sessions/[id]/message/route.ts` | POST operator message |
| `src/components/faq.tsx` | Multi-open FAQ accordion (fixed) |
| `src/components/navbar.tsx` | Navbar with verticals dropdown (added) |
