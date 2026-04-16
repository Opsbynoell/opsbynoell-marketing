/**
 * GET /api/admin/sessions
 *
 * Returns sessions from all three agents in a unified format,
 * sorted by last activity descending. Caller can pass ?agent=support|frontDesk|care
 * to filter.
 *
 * The Support agent uses camelCase column names (legacy Noell Support schema).
 * Front Desk and Care use snake_case (new agent schema).
 * This route normalizes everything to snake_case.
 */

import { NextRequest, NextResponse } from "next/server";
import { verifyToken, COOKIE_NAME } from "@/lib/admin-auth";
import { env } from "@/lib/agents/env";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type AgentFilter = "all" | "support" | "frontDesk" | "care";

interface NormalizedSession {
  id: string;
  agent: "support" | "frontDesk" | "care";
  visitor_name: string | null;
  visitor_phone: string | null;
  visitor_email: string | null;
  last_message: string | null;
  unread_count: number;
  human_takeover: boolean;
  resolved_at: string | null;
  intent: string | null;
  trigger_type: string | null;
  created_at: string;
  updated_at: string;
}

function supabaseHeaders() {
  const key = env.supabaseServiceKey();
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
  };
}

function restUrl(path: string) {
  return `${env.supabaseUrl()}/rest/v1/${path}`;
}

async function fetchSessions(
  table: string,
  agent: "support" | "frontDesk" | "care",
  messagesTable: string
): Promise<NormalizedSession[]> {
  // Fetch sessions
  const sessRes = await fetch(
    `${restUrl(table)}?select=*&order=updated_at.desc,updatedAt.desc&limit=200`,
    { headers: supabaseHeaders(), cache: "no-store" }
  );
  if (!sessRes.ok) return [];
  const sessions = (await sessRes.json()) as Record<string, unknown>[];

  if (!sessions.length) return [];

  // Fetch latest message per session (one batch query using OR filter)
  const ids = sessions.map((s) => s.id as string).join(",");
  const msgRes = await fetch(
    `${restUrl(messagesTable)}?select=session_id,sessionId,content,role,created_at,createdAt&order=created_at.desc,createdAt.desc&limit=400`,
    { headers: supabaseHeaders(), cache: "no-store" }
  );
  const allMessages = msgRes.ok
    ? ((await msgRes.json()) as Record<string, unknown>[])
    : [];

  // Build last-message map
  const lastMsg: Record<string, string> = {};
  for (const m of allMessages) {
    const sid = (m.session_id ?? m.sessionId) as string;
    if (!lastMsg[sid] && (m.role === "visitor" || m.role === "bot")) {
      lastMsg[sid] = m.content as string;
    }
  }

  return sessions.map((s) => ({
    id: s.id as string,
    agent,
    visitor_name: ((s.visitor_name ?? s.visitorName) as string) ?? null,
    visitor_phone: ((s.visitor_phone ?? s.visitorPhone) as string) ?? null,
    visitor_email: ((s.visitor_email ?? s.visitorEmail) as string) ?? null,
    last_message: lastMsg[s.id as string] ?? null,
    unread_count: ((s.unread_count ?? s.unreadCount) as number) ?? 0,
    human_takeover:
      ((s.human_takeover ?? s.humanTakeover) as boolean) ?? false,
    resolved_at:
      ((s.resolved_at ?? s.resolvedAt) as string) ?? null,
    intent: (s.intent as string) ?? null,
    trigger_type: (s.trigger_type as string) ?? null,
    created_at:
      ((s.created_at ?? s.createdAt) as string) ?? new Date().toISOString(),
    updated_at:
      ((s.updated_at ?? s.updatedAt) as string) ?? new Date().toISOString(),
  }));
}

export async function GET(req: NextRequest): Promise<Response> {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!(await verifyToken(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const filter = (req.nextUrl.searchParams.get("agent") ?? "all") as AgentFilter;

  try {
    const [support, frontDesk, care] = await Promise.all([
      filter === "all" || filter === "support"
        ? fetchSessions("chatSessions", "support", "chatMessages")
        : Promise.resolve([]),
      filter === "all" || filter === "frontDesk"
        ? fetchSessions("front_desk_sessions", "frontDesk", "front_desk_messages")
        : Promise.resolve([]),
      filter === "all" || filter === "care"
        ? fetchSessions("care_sessions", "care", "care_messages")
        : Promise.resolve([]),
    ]);

    const all = [...support, ...frontDesk, ...care].sort(
      (a, b) =>
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    );

    return NextResponse.json({ sessions: all });
  } catch (e) {
    return NextResponse.json(
      { error: (e as Error).message },
      { status: 500 }
    );
  }
}
