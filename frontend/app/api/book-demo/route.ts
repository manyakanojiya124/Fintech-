/**
 * /api/book-demo — server-side email handler (Nodemailer + Gmail SMTP).
 *
 * This is the ONLY place Gmail credentials exist. They are read from
 * server-only env vars (NO NEXT_PUBLIC_ prefix) so they never reach the
 * browser bundle. No EmailJS, no third-party email service.
 *
 * Required server env vars:
 *   GMAIL_USER        — the Gmail address that SENDS the notification
 *                       (e.g. youraddress@gmail.com)
 *   GMAIL_APP_PASSWORD — 16-char Gmail App Password (no spaces)
 *   DEMO_NOTIFY_EMAIL  — (optional) inbox that RECEIVES the demo request.
 *                       Defaults to GMAIL_USER if not set.
 */

import { NextResponse } from "next/server";
import nodemailer, { type Transporter } from "nodemailer";
import type { DemoRequestPayload } from "@/types/email";

export const runtime = "nodejs"; // Nodemailer needs Node APIs

const GMAIL_USER = process.env.GMAIL_USER ?? "";
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD ?? "";
const NOTIFY_EMAIL = process.env.DEMO_NOTIFY_EMAIL || GMAIL_USER;

// Reuse the transporter across warm invocations (Vercel serverless).
let cachedTransporter: Transporter | null = null;

function getTransporter(): Transporter {
  if (cachedTransporter) return cachedTransporter;

  cachedTransporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // TLS / SSL on 465
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_APP_PASSWORD,
    },
  });

  return cachedTransporter;
}

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

// Same validation rules as the client — defense in depth.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+]?[\d\s().-]{7,}$/;

interface ValidationError {
  field: keyof DemoRequestPayload;
  message: string;
}

function validate(payload: Partial<DemoRequestPayload>): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!isNonEmptyString(payload.name) || payload.name.trim().length < 2) {
    errors.push({ field: "name", message: "Please enter a valid name." });
  }
  if (!isNonEmptyString(payload.email) || !EMAIL_RE.test(payload.email.trim())) {
    errors.push({ field: "email", message: "Please enter a valid email." });
  }
  if (!isNonEmptyString(payload.company)) {
    errors.push({ field: "company", message: "Please enter your company." });
  }
  if (!isNonEmptyString(payload.phone) || !PHONE_RE.test(payload.phone.trim())) {
    errors.push({ field: "phone", message: "Please enter a valid phone." });
  }
  if (!isNonEmptyString(payload.message) || payload.message.trim().length < 10) {
    errors.push({ field: "message", message: "Please enter a longer message." });
  }

  return errors;
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildHtmlEmail(
  data: Required<
    Pick<DemoRequestPayload, "name" | "email" | "company" | "phone" | "message">
  > & { date: string; timestamp: string; page_url?: string; page_title?: string; user_agent?: string }
): string {
  return `<!doctype html>
<html>
  <body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1C1917;background:#FBFAF6;margin:0;padding:24px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid rgba(28,25,23,0.1);border-radius:12px;overflow:hidden;">
      <tr>
        <td style="background:#1E2A3A;padding:24px 28px;">
          <div style="font-size:13px;letter-spacing:0.2em;text-transform:uppercase;color:#D9481A;font-weight:700;">New Demo Request</div>
          <div style="margin-top:6px;font-size:20px;color:#ffffff;font-weight:600;">Book a Demo — Fintech Services</div>
        </td>
      </tr>
      <tr>
        <td style="padding:28px;">
          <p style="margin:0 0 20px;color:#726C62;font-size:14px;">A new request was submitted on the website.</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:14px;">
            <tr><td style="padding:8px 0;color:#726C62;width:130px;vertical-align:top;">Name</td><td style="padding:8px 0;color:#1C1917;font-weight:600;">${escapeHtml(data.name)}</td></tr>
            <tr><td style="padding:8px 0;color:#726C62;vertical-align:top;">Email</td><td style="padding:8px 0;"><a href="mailto:${encodeURIComponent(data.email)}" style="color:#D9481A;text-decoration:none;font-weight:600;">${escapeHtml(data.email)}</a></td></tr>
            <tr><td style="padding:8px 0;color:#726C62;vertical-align:top;">Company</td><td style="padding:8px 0;color:#1C1917;font-weight:600;">${escapeHtml(data.company)}</td></tr>
            <tr><td style="padding:8px 0;color:#726C62;vertical-align:top;">Phone</td><td style="padding:8px 0;color:#1C1917;font-weight:600;">${escapeHtml(data.phone)}</td></tr>
          </table>
          <div style="margin-top:20px;padding:16px;background:#F2EEE6;border-radius:8px;">
            <div style="font-size:12px;letter-spacing:0.1em;text-transform:uppercase;color:#726C62;margin-bottom:8px;">Message</div>
            <div style="color:#1C1917;font-size:14px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(data.message)}</div>
          </div>
          <hr style="border:none;border-top:1px solid rgba(28,25,23,0.1);margin:24px 0;" />
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:12px;color:#726C62;">
            <tr><td style="padding:4px 0;width:130px;">Date</td><td style="padding:4px 0;">${escapeHtml(data.date)}</td></tr>
            <tr><td style="padding:4px 0;">Timestamp (UTC)</td><td style="padding:4px 0;">${escapeHtml(data.timestamp)}</td></tr>
            <tr><td style="padding:4px 0;">Page URL</td><td style="padding:4px 0;word-break:break-all;">${data.page_url ? `<a href="${escapeHtml(data.page_url)}" style="color:#D9481A;">${escapeHtml(data.page_url)}</a>` : "—"}</td></tr>
            <tr><td style="padding:4px 0;">Page Title</td><td style="padding:4px 0;">${data.page_title ? escapeHtml(data.page_title) : "—"}</td></tr>
            <tr><td style="padding:4px 0;vertical-align:top;">Browser / UA</td><td style="padding:4px 0;word-break:break-all;">${data.user_agent ? escapeHtml(data.user_agent) : "—"}</td></tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function buildTextEmail(data: {
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
  date: string;
  timestamp: string;
  page_url?: string;
  page_title?: string;
  user_agent?: string;
}): string {
  return `New Book a Demo Request — Fintech Services

Name:     ${data.name}
Email:    ${data.email}
Company:  ${data.company}
Phone:    ${data.phone}

Message:
${data.message}

────────────────────────────────
Date:         ${data.date}
Timestamp:    ${data.timestamp} (UTC)
Page URL:     ${data.page_url ?? "—"}
Page Title:   ${data.page_title ?? "—"}
Browser/UA:   ${data.user_agent ?? "—"}
`;
}

export async function POST(request: Request) {
  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    // eslint-disable-next-line no-console
    console.error(
      "[api/book-demo] Missing GMAIL_USER / GMAIL_APP_PASSWORD env vars."
    );
    return NextResponse.json(
      { ok: false, error: "Email service is not configured." },
      { status: 500 }
    );
  }

  let payload: Partial<DemoRequestPayload>;
  try {
    payload = (await request.json()) as Partial<DemoRequestPayload>;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  const errors = validate(payload);
  if (errors.length > 0) {
    return NextResponse.json(
      { ok: false, error: "Validation failed.", errors },
      { status: 422 }
    );
  }

  const now = new Date();
  const date = now.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const timestamp = now.toISOString();

  const data = {
    name: payload.name!.trim(),
    email: payload.email!.trim(),
    company: payload.company!.trim(),
    phone: payload.phone!.trim(),
    message: payload.message!.trim(),
    date,
    timestamp,
    page_url: payload.page_url,
    page_title: payload.page_title,
    user_agent: payload.user_agent,
  };

  try {
    const transporter = getTransporter();

    await transporter.sendMail({
      from: `"Fintech Services Website" <${GMAIL_USER}>`,
      to: NOTIFY_EMAIL,
      replyTo: data.email, // so hitting "Reply" goes to the lead
      subject: `New Demo Request from ${data.name} (${data.company})`,
      text: buildTextEmail(data),
      html: buildHtmlEmail(data),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[api/book-demo] Failed to send email:", err);
    return NextResponse.json(
      { ok: false, error: "Unable to send. Please try again." },
      { status: 502 }
    );
  }
}
