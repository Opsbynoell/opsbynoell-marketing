# Environment Variables

Vercel-scoped environment variables used by the Ops by Noell marketing site
and its agent backend. Set each in the Vercel project for the listed scopes
(Production / Preview / Development) unless a section says otherwise.

The canonical reader for these is `src/lib/agents/env.ts` — any new variable
should be plumbed through there rather than read from `process.env` directly.

## Twilio (Ops by Noell SMS)

Required in Vercel for the opsbynoell client's SMS to work:

- TWILIO_ACCOUNT_SID — from https://console.twilio.com (Account SID, starts with "AC")
- TWILIO_AUTH_TOKEN  — from https://console.twilio.com (Auth Token, rotate if leaked)
- TWILIO_FROM_NUMBER — your purchased A2P-registered number in E.164 format, e.g. "+19499991234"

Scope: Production, Preview, Development.

After setting these, also update in Supabase:
- `clients.phone` for slug=opsbynoell → set to TWILIO_FROM_NUMBER
- `clients.locations[0].phone` → same
- `clients.escalation_rules.qualifiedLead.smsTo` → Nikki's personal cell in E.164

### Twilio inbound webhooks (optional)

Set these only if you wire a client's inbound SMS directly to Twilio
(instead of going through a GHL workflow). Used to validate the
`X-Twilio-Signature` header — the URL must match exactly what is
configured in the Twilio Messaging Service "A message comes in" field.

- `TWILIO_INBOUND_PUBLIC_URL` — owner-reply route public URL, e.g.
  `https://www.opsbynoell.com/api/twilio/inbound-sms`
- `TWILIO_INBOUND_VISITOR_PUBLIC_URL` — visitor inbound route public
  URL, e.g.
  `https://www.opsbynoell.com/api/twilio/inbound-visitor-sms`.
  Falls back to `TWILIO_INBOUND_PUBLIC_URL` if unset (single-URL installs).

See [`docs/inbound-visitor-sms.md`](./inbound-visitor-sms.md) for the
full setup (Messaging Service → Integration webhook).
