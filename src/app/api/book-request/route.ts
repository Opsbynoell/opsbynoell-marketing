import { NextResponse } from "next/server";
import { sbInsert } from "@/lib/agents/supabase";
import { sendAgentEmailAlert } from "@/lib/agents/email-alert";

const ALLOWED_BOOKING_SYSTEMS = new Set([
  "Boulevard",
  "Mangomint",
  "Vagaro",
  "Mindbody",
  "Square Appointments",
  "Acuity",
  "Jane",
  "Dentrix",
  "Eaglesoft",
  "Open Dental",
  "Curve",
  "Other",
]);

interface BookRequestRow {
  id: string;
  created_at: string;
  name: string;
  business: string;
  phone: string;
  email: string;
  booking_system: string;
  leak_description: string;
}

function clean(value: unknown, max = 500): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Bad JSON." },
      { status: 400 }
    );
  }

  const name = clean(body.name, 120);
  const business = clean(body.business, 200);
  const phone = clean(body.phone, 60);
  const email = clean(body.email, 200);
  const bookingSystem = clean(body.booking_system, 60);
  const leakDescription = clean(body.leak_description, 500);

  if (
    !name ||
    !business ||
    !phone ||
    !email ||
    !bookingSystem ||
    !leakDescription
  ) {
    return NextResponse.json(
      { ok: false, error: "Missing field." },
      { status: 400 }
    );
  }
  if (!isEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "Invalid email." },
      { status: 400 }
    );
  }
  if (!ALLOWED_BOOKING_SYSTEMS.has(bookingSystem)) {
    return NextResponse.json(
      { ok: false, error: "Invalid booking system." },
      { status: 400 }
    );
  }

  // 1. Persist to Supabase. Source of truth for working-call requests.
  let inserted: BookRequestRow | null = null;
  try {
    inserted = await sbInsert<BookRequestRow>("book_requests", {
      name,
      business,
      phone,
      email,
      booking_system: bookingSystem,
      leak_description: leakDescription,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "unknown";
    console.error("[book-request] supabase insert failed:", message);
    return NextResponse.json(
      { ok: false, error: "store_failed" },
      { status: 500 }
    );
  }

  // 2. Notify the operator inbox. Fire-and-flag if Resend is unconfigured.
  const subject = `New working-call request from ${business}`;
  const text = [
    `New working-call request from the /book page.`,
    ``,
    `Name: ${name}`,
    `Business: ${business}`,
    `Phone: ${phone}`,
    `Email: ${email}`,
    `Booking system: ${bookingSystem}`,
    ``,
    `What is leaking right now:`,
    leakDescription,
    ``,
    inserted?.id ? `Supabase row id: ${inserted.id}` : ``,
  ]
    .filter(Boolean)
    .join("\n");

  const alert = await sendAgentEmailAlert({
    subject,
    text,
    toEmail: process.env.BOOK_REQUEST_TO_EMAIL ?? undefined,
  });
  if (!alert.ok) {
    console.warn("[book-request] email alert skipped:", alert.error);
  }

  return NextResponse.json({ ok: true, id: inserted?.id ?? null });
}
