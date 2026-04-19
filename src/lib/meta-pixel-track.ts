/**
 * Helpers to fire Meta Pixel custom events from anywhere in the app.
 *
 * Usage:
 *   import { trackMetaEvent } from "@/lib/meta-pixel-track";
 *   trackMetaEvent("Contact");                      // when user clicks /book CTA
 *   trackMetaEvent("Lead", { content_name: "Contact form" });
 *
 * These all no-op safely if the pixel hasn't loaded or is missing.
 */

type StandardEvent =
  | "PageView"
  | "Lead"
  | "Contact"
  | "Schedule"
  | "CompleteRegistration"
  | "Subscribe"
  | "ViewContent"
  | "InitiateCheckout"
  | "Purchase";

export function trackMetaEvent(
  eventName: StandardEvent,
  params?: Record<string, unknown>,
) {
  if (typeof window === "undefined") return;
  if (typeof window.fbq !== "function") return;
  try {
    if (params) {
      window.fbq("track", eventName, params);
    } else {
      window.fbq("track", eventName);
    }
  } catch {
    // swallow — pixel should never break the UI
  }
}

export function trackMetaCustomEvent(
  eventName: string,
  params?: Record<string, unknown>,
) {
  if (typeof window === "undefined") return;
  if (typeof window.fbq !== "function") return;
  try {
    if (params) {
      window.fbq("trackCustom", eventName, params);
    } else {
      window.fbq("trackCustom", eventName);
    }
  } catch {
    // swallow
  }
}
