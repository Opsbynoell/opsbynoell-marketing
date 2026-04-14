# Noell System Foundation

A templatable, multi-agent foundation for the Noell product system. Three
agents cover the full client lifecycle for a service business:

- **Noell Support** — new-prospect intake (website chat, qualification, handoff)
- **Noell Front Desk** — operations (calls, scheduling, reminders, reviews, reactivation)
- **Noell Care** — existing-client support (rebooking, account, quick how-tos)

All three share one runtime. Per-agent behavior is config, not code.

---

## Architecture

```
src/lib/noell-system/
├── types.ts                  # All types (AgentConfig, ClientConfig, VerticalConfig,
│                             #   AwaitingSlot, IntentCompletion, WorkflowKey,
│                             #   LocationInfo, KnowledgeBaseEntry,
│                             #   MissedCallTextbackConfig, ReviewCaptureConfig,
│                             #   ReactivationConfig, NoellLookups)
├── core.ts                   # Runtime: intent matching, multi-slot capture,
│                             #   escalation, token interpolation, step() reducer
├── agents/
│   ├── index.ts              # Registry of all agents
│   ├── support.ts            # Noell Support config (3 multi-turn intents)
│   ├── front-desk.ts         # Noell Front Desk config (6 operational workflows)
│   └── care.ts               # Noell Care config (5 existing-client intents)
├── clients/
│   └── default.ts            # Default client with every operational field populated
├── verticals/
│   └── presets.ts            # Vertical defaults + dormancy thresholds + review platforms
├── __tests__/
│   └── flows.test.ts         # Pure-function turn-by-turn flow tests (5 scenarios)
└── README.md

src/components/
├── noell-chat.tsx            # Generic agent-agnostic chat widget
└── nova-chat.tsx             # Thin wrapper that mounts Support+defaultClient
```

### Composition model

```
+----------------------+
|   AgentRuntime       |
|                      |
|  agent    : Support  |  <- agent-specific identity, intents, scope, follow-ups
|  client   : Acme     |  <- tenant data (business name, booking URL, team, webhooks)
|  vertical : massage  |  <- defaults for the business type
+----------------------+
          |
          v
+----------------------+
|  core.step(...)      |  <- deterministic reducer, UI-agnostic
+----------------------+
          |
          v
+----------------------+
|  <NoellChat/> view    |  <- mounts any agent; zero business logic inside
+----------------------+
```

The UI never hardcodes an agent's name, color, intents, or scripts. Swap
`agent={supportAgent}` for `agent={frontDeskAgent}` and you have a
different assistant running the same widget.

---

## What is shared (the "foundation")

- **Conversation primitives** (`Message`, `Stage`, `MessageFrom`)
- **Intent matcher** (`core.matchIntent`) — deterministic v1, swap for LLM later
- **Escalation evaluator** (`core.evaluateEscalation`)
- **Capture parser** (`core.parseCapture`) — extracts name/phone/email
- **Token interpolation** (`{{businessName}}`, `{{bookingUrl}}`, captured fields)
- **State machine** (`core.step`) — stage transitions, turn counting
- **Follow-up rule schema** — SMS/email cadences keyed to conversation events
- **Knowledge source schema**
- **Routing targets** (`booking_link` / `human` / `workflow` / `knowledge_base`)
- **UI chrome** (launcher, panel, bubbles, typing indicator, input)

## What is agent-specific

Each `AgentConfig` declares:

- **Identity** (displayName, persona, eyebrow, launcher color, avatar initial)
- **Scope** (explicit `does` and `doesNot` — used for honesty guardrails + product pages)
- **Greeting message**
- **Starter chips**
- **Intents** (matchers, scripted responses, next stage, routing decision)
- **Capture response** (what to say once contact info is collected)
- **Fallback response** (no-intent-match path)
- **Escalation rules** (when + how to escalate, with agent-appropriate copy)
- **Knowledge sources** (what the agent can answer from)
- **Follow-up rules** (SMS/email templates keyed to `capture` / `resolved` / `escalated`)
- **Allowed stages** (Support doesn't use `resolved`; Care does)

## What changes per client (tenant)

`ClientConfig` holds every piece of operational state an agent needs:

- Business name + identifiers (`clientId`, `businessName`)
- Vertical key (`massage`, `med_spa`, `salon`, `dental`, `esthetics`, `generic`)
- Booking URL (the link the agents hand off to)
- Phone, email, hours, services, team members
- `locations[]` — physical addresses + parking + arrival instructions (Care uses these)
- `knowledgeBase[]` — per-client FAQ/policy entries (Care routes here)
- `missedCallTextback` — template + SLA seconds (Front Desk)
- `reviewCapture` — minimum public rating + platform + post-visit template (Front Desk)
- `reactivation` — dormancy threshold + re-engagement template (Front Desk)
- `reminderCadence` override
- `brandOverrides` for accent colors
- `webhooks` — `onCapture`, `onEscalate`, `onResolved`, `onWorkflow`

## What changes per vertical

`VerticalConfig` provides defaults a business type usually needs:

- Common services
- Qualifying questions tuned to that vertical
- Starter chip presets per agent (`support` / `care`; Front Desk is operator-facing)
- Reminder cadence
- Dormancy threshold days (for Reactivation)
- Preferred review platform

A vertical's presets *override* the agent's default starter chips when
present. The runtime also falls back to the vertical's `reminderCadence` /
`dormancyThresholdDays` / `reviewPlatform` via `{{token}}` interpolation
when the client didn't set its own.

## What still depends on external systems

The runtime is deterministic and fully testable today, but for real
client installs these integrations must be wired:

| Dependency              | Used by        | Current state                                               |
| ----------------------- | -------------- | ----------------------------------------------------------- |
| Phone / SMS provider    | All agents     | Webhook placeholders in `ClientConfig.webhooks`             |
| Inbound call routing    | Front Desk     | Intent "missed_call_textback" exists; no provider wired yet |
| Scheduling platform     | Support, Front Desk, Care | Booking URL + routing target exist; no API calls wired     |
| Review platform         | Front Desk     | `review_capture` intent exists; no Google API wired         |
| CRM / contact store     | All agents     | `capture` side-effect exists; no destination wired          |
| Reactivation job queue  | Front Desk     | `reactivation` intent exists; no job runner wired           |
| LLM / classifier        | All agents     | `matchIntent` is keyword-based today; designed for swap     |
| Analytics               | All agents     | `onResolved` webhook placeholder exists                     |

---

## What is ready now

- ✅ Three agents as **real multi-turn v1 flows**, not one-turn acknowledgements:
  - **Support**: 3 intents, each a 2–3 turn flow (intent → qualification → contact → route)
  - **Front Desk**: 6 operational workflows with real slot collection
    (missed_call_textback, reschedule, send_confirmations, reminders_run,
    review_capture, reactivation)
  - **Care**: 5 intents including a 3-slot change_appointment flow, a
    location-aware directions intent, and knowledge-base-routed service
    questions
- ✅ Multi-slot capture primitive (`AwaitingSlot[]` + `IntentCompletion`) in
  the runtime — turns any intent into a controlled N-turn flow without
  special-casing
- ✅ Client + vertical token interpolation (`{{reminderCadence}}`,
  `{{primaryLocationParking}}`, `{{dormancyThresholdDays}}`, etc.) so
  responses automatically adapt per tenant and per business type
- ✅ Five verticals with dormancy thresholds + review platform + reminder
  cadence defaults
- ✅ Default client with every operational field populated (locations,
  knowledgeBase, missedCallTextback, reviewCapture, reactivation)
- ✅ Workflow routing (`WorkflowKey` enum) — every operational intent emits
  a typed side-effect for the host app to execute
- ✅ `NoellLookups` contract — declared interface for external lookups
  (lastVisit, findAppointment, countReactivationCohort, upcomingAppointments)
- ✅ Pure-function test harness in `__tests__/flows.test.ts` — 5 scenarios
  verified turn-by-turn (booking_new, missed_call_textback, reschedule,
  change_appointment, directions). Passes today.
- ✅ Marketing site still builds, Support still the live agent at `/`.

## What still needs to be built for full production use

1. **Phone/SMS integration** — Twilio or equivalent. The `missed_call_textback`
   intent emits the workflow target + template; the host must send the SMS.
2. **Scheduler integration** — Calendly / Acuity / Vagaro clients, per client's tool.
3. **`NoellLookups` implementations** — the contracts are declared; real
   implementations (reading from GHL / Supabase) are still needed.
4. **CRM write path** — Wire `onCapture` / `onWorkflow` webhooks to the
   client's contact store (GHL `chatLeads`, Supabase, etc.).
5. **Escalation delivery** — Slack / Telegram / email so `onEscalate`
   reaches a human.
6. **Review platform integration** — Google Business Profile API for the
   4-star-and-up route.
7. **LLM classifier** — Replace `matchIntent` with an intent classifier +
   entity extractor. Interface stays the same.
8. **Richer knowledge retrieval** — today the KB is array lookup + token
   templates. Upgrade path: embedding search over per-client docs.
9. **Reactivation job runner** — Cron that calls `countReactivationCohort`
   and fires the campaign via the `onWorkflow` webhook.
10. **Tenant-aware routing** — Multi-client deployment needs a tenant
    resolver (subdomain or `clientId` cookie) to pick the right
    `ClientConfig` per request.
11. **Admin UI** — Non-code edit path for operators: tweak starter chips,
    edit templates, adjust escalation keywords per client.
12. **Observability** — Conversation logs, capture success rate,
    escalation rate per agent per client.
13. **Test runner wiring** — The flow tests are pure functions; adding
    Vitest gives them a proper CI check on every push.

---

## How this can be reused for future clients

To install the Noell system at a new client:

1. **Add a `ClientConfig`** in `src/lib/noell-system/clients/<client-id>.ts`:
   ```ts
   export const acmeMassage: ClientConfig = {
     clientId: "acme-massage",
     businessName: "Acme Massage",
     vertical: "massage",
     bookingUrl: "https://acme-massage.com/book",
     phone: "+1-555-0100",
     email: "hello@acme.com",
     hours: "Tue–Sat, 10am–7pm",
     services: ["Deep tissue", "Swedish", "Prenatal"],
     team: [{ name: "Jess", role: "LMT" }],
     webhooks: {
       onCapture: "https://hooks.noell.dev/acme/capture",
       onEscalate: "https://hooks.noell.dev/acme/escalate",
     },
   };
   ```

2. **(Optional) Add a vertical preset** in `src/lib/noell-system/verticals/presets.ts`
   if the client's business type doesn't exist yet.

3. **Mount any of the three agents** against that client:
   ```tsx
   <NoellChat
     agent={supportAgent}
     client={acmeMassage}
     vertical={getVertical(acmeMassage.vertical)}
   />
   ```

4. **Wire webhooks + external integrations** per the "Production use" checklist
   above. The chat surface is ready; the backend is what varies per install.

### Zero-code client overrides
Most day-to-day tuning — booking URL, business name, team roster, hours —
is config-only. Copy tuning (starter chips, capture response, escalation
wording) is also config, and is the next candidate for a non-code admin UI.

### Per-vertical overrides
If every med spa client needs the same starter chips, set them on the
vertical preset. The runtime prefers vertical presets over agent defaults,
so clients inherit them automatically.

### Per-agent extension
Adding a fourth agent (e.g. "Noell Revenue" for upsell flows) is a single
file in `src/lib/noell-system/agents/` plus a registry entry. No runtime
or UI changes are required.
