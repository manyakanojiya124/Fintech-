/**
 * Shared types for the "Book a Demo" request flow.
 *
 * The browser posts a DemoRequestFormData to /api/book-demo, where the
 * server-side Nodemailer transport adds diagnostic context (page URL,
 * user agent, timestamp, etc.) and sends the email with Gmail.
 */

export interface DemoRequestFormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
}

export type DemoRequestField = keyof DemoRequestFormData;

export type DemoRequestErrors = Partial<Record<DemoRequestField, string>>;

export interface SendDemoRequestResult {
  ok: boolean;
  error?: string;
}

/**
 * What the server route accepts. The extra fields are populated on the
 * client from window/navigator and forwarded so the notification email
 * includes request context.
 */
export interface DemoRequestPayload extends DemoRequestFormData {
  page_url?: string;
  page_title?: string;
  user_agent?: string;
}
