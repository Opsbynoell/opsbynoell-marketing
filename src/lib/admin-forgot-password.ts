/**
 * Core forgot-password logic, separated from the route handler so
 * it can be exercised directly from the node:test runner.
 *
 * Behavior:
 *   - Always resolves as `{ ok: true }` so the caller can return
 *     a neutral response to prevent email enumeration.
 *   - Silently no-ops when the email doesn't match an admin user.
 *   - On match: creates a SHA-256-hashed reset token (1h TTL) and
 *     emails a link containing the raw token.
 */

import { sbInsert, sbSelect } from "./agents/supabase";
import {
  RESET_TOKEN_TTL_MS,
  generateResetToken,
  hashResetToken,
  sendResetEmail,
} from "./admin-password-reset";

interface AdminUserRow {
  id: string;
  email: string;
}

export async function handleForgotPassword(
  rawEmail: string
): Promise<{ ok: true }> {
  const email = rawEmail.trim().toLowerCase();
  if (!email) return { ok: true };

  let user: AdminUserRow | null = null;
  try {
    const rows = await sbSelect<AdminUserRow>(
      "admin_users",
      { email: `eq.${email}` },
      { select: "id,email", limit: 1 }
    );
    user = rows[0] ?? null;
  } catch (err) {
    console.error("[forgot-password] lookup failed:", err);
    return { ok: true };
  }

  if (!user) return { ok: true };

  const rawToken = generateResetToken();
  const tokenHash = await hashResetToken(rawToken);
  const expiresAt = new Date(Date.now() + RESET_TOKEN_TTL_MS).toISOString();

  try {
    await sbInsert("admin_password_resets", {
      user_id: user.id,
      token_hash: tokenHash,
      expires_at: expiresAt,
    });
  } catch (err) {
    console.error("[forgot-password] token insert failed:", err);
    return { ok: true };
  }

  await sendResetEmail({ toEmail: user.email, rawToken });
  return { ok: true };
}
