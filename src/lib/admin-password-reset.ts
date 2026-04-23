/**
 * Password-reset token helpers for admin_users.
 *
 * The raw token is generated here, emailed to the user, and never
 * stored — the DB only holds a SHA-256 hex digest of it. When a
 * reset link is opened we hash the incoming value and look it up.
 *
 * Node.js runtime only — imported from API routes that talk to
 * Supabase and Resend. Never imported from the Edge-Runtime proxy.
 */

import { Resend } from "resend";
import { env } from "./agents/env";

export const RESET_TOKEN_TTL_MS = 60 * 60 * 1000; // 1 hour

function toBase64url(buf: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(buf)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

function bytesToHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** 32 random bytes → url-safe base64 (43 chars). */
export function generateResetToken(): string {
  const buf = new ArrayBuffer(32);
  crypto.getRandomValues(new Uint8Array(buf));
  return toBase64url(buf);
}

/** SHA-256 hex digest of the raw token — this is what we store. */
export async function hashResetToken(rawToken: string): Promise<string> {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(rawToken)
  );
  return bytesToHex(digest);
}

function siteBaseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://www.opsbynoell.com"
  );
}

export function buildResetUrl(rawToken: string): string {
  return `${siteBaseUrl()}/admin/reset-password?token=${encodeURIComponent(rawToken)}`;
}

/**
 * Branded HTML email — cream background, deep wine CTA, Playfair
 * heading. Kept inline so the template lives next to the sender;
 * no separate MJML/JSX email rendering pipeline.
 */
function renderResetEmailHtml(resetUrl: string): string {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Password reset</title>
  </head>
  <body style="margin:0;padding:0;background:#FAF5F0;font-family:'Inter','Helvetica Neue',Arial,sans-serif;color:#3D2430;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#FAF5F0;padding:40px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:520px;background:#ffffff;border:1px solid #E7DFD6;border-radius:20px;padding:40px 32px;">
            <tr>
              <td style="text-align:center;padding-bottom:8px;">
                <p style="margin:0;font-family:'Courier New',monospace;font-size:10px;letter-spacing:0.28em;text-transform:uppercase;color:rgba(61,36,48,0.5);">
                  Ops by Noell
                </p>
              </td>
            </tr>
            <tr>
              <td style="text-align:center;padding-bottom:24px;">
                <h1 style="margin:0;font-family:'Playfair Display',Georgia,'Times New Roman',serif;font-size:28px;font-weight:600;color:#3D2430;">
                  Password reset
                </h1>
              </td>
            </tr>
            <tr>
              <td style="font-size:15px;line-height:1.6;color:#3D2430;padding-bottom:24px;">
                Someone requested a password reset for your Ops by Noell admin account. Click the button below to choose a new password.
              </td>
            </tr>
            <tr>
              <td align="center" style="padding-bottom:28px;">
                <a href="${resetUrl}" style="display:inline-block;background:#6A2C3E;color:#FAF5F0;text-decoration:none;font-size:15px;font-weight:500;padding:14px 28px;border-radius:12px;">
                  Reset password
                </a>
              </td>
            </tr>
            <tr>
              <td style="font-size:13px;line-height:1.6;color:rgba(61,36,48,0.7);padding-bottom:16px;">
                This link expires in 1 hour. If you didn&rsquo;t request a reset, you can ignore this email &mdash; your password stays the same.
              </td>
            </tr>
            <tr>
              <td style="font-size:12px;line-height:1.5;color:rgba(61,36,48,0.5);word-break:break-all;border-top:1px solid #E7DFD6;padding-top:16px;">
                If the button doesn&rsquo;t work, paste this into your browser:<br />
                <span style="color:#6A2C3E;">${resetUrl}</span>
              </td>
            </tr>
          </table>
          <p style="margin:24px 0 0;font-family:'Courier New',monospace;font-size:10px;color:rgba(61,36,48,0.35);">
            three agents &middot; one inbox
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function renderResetEmailText(resetUrl: string): string {
  return [
    "Password reset — Ops by Noell",
    "",
    "Someone requested a password reset for your admin account.",
    "Open this link to choose a new password (expires in 1 hour):",
    "",
    resetUrl,
    "",
    "If you didn't request a reset, you can ignore this email.",
  ].join("\n");
}

export async function sendResetEmail(params: {
  toEmail: string;
  rawToken: string;
}): Promise<{ ok: boolean; error?: string }> {
  const apiKey = env.resendApiKey();
  if (!apiKey) {
    console.warn("[password-reset] Resend not configured — email skipped");
    return { ok: false, error: "resend_not_configured" };
  }

  const resend = new Resend(apiKey);
  const resetUrl = buildResetUrl(params.rawToken);

  try {
    await resend.emails.send({
      from: env.resendFromEmail(),
      to: params.toEmail,
      subject: "Reset your Ops by Noell admin password",
      html: renderResetEmailHtml(resetUrl),
      text: renderResetEmailText(resetUrl),
    });
    return { ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "unknown";
    console.error("[password-reset] send failed:", message);
    return { ok: false, error: message };
  }
}
