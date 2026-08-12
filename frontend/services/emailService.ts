/**
 * Frontend email service — the ONLY place the browser talks to the
 * server-side /api/book-demo route.
 *
 * No Gmail credentials, no SMTP, no Nodemailer run in the browser.
 * The Gmail user + app password live server-side (see app/api/book-demo/route.ts).
 *
 * Exposes a single reusable function: sendDemoRequest(data).
 */

import type {
  DemoRequestFormData,
  DemoRequestPayload,
  SendDemoRequestResult,
} from "@/types/email";

const ENDPOINT = "/api/book-demo";

/**
 * Send a "Book a Demo" request to the server route.
 *
 * Returns a structured result instead of throwing so UI code stays clean.
 * Uses async/await throughout and has proper error handling.
 */
export async function sendDemoRequest(
  data: DemoRequestFormData
): Promise<SendDemoRequestResult> {
  if (typeof window === "undefined") {
    return { ok: false, error: "Not available on the server." };
  }

  const payload: DemoRequestPayload = {
    name: data.name.trim(),
    email: data.email.trim(),
    company: data.company.trim(),
    phone: data.phone.trim(),
    message: data.message.trim(),
    page_url: window.location.href,
    page_title: document.title,
    user_agent: navigator.userAgent,
  };

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    let body: { error?: string } | null = null;
    try {
      body = (await res.clone().json()) as { error?: string };
    } catch {
      // Route may return non-JSON on unexpected errors; fall back to text.
      const text = await res.text().catch(() => "");
      body = text ? { error: text } : null;
    }

    if (res.ok) {
      return { ok: true };
    }

    return {
      ok: false,
      error:
        body?.error ||
        `Request failed with status ${res.status}. Please try again.`,
    };
  } catch (err) {
    // Network failure / route not reachable.
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.error("[emailService] sendDemoRequest failed:", err);
    }
    return {
      ok: false,
      error:
        "We couldn't reach the server. Please check your connection and try again.",
    };
  }
}
