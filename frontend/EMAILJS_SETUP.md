# EmailJS Setup Guide

The "Book a Demo" form sends emails entirely from the browser using
[@emailjs/browser](https://www.npmjs.com/package/@emailjs/browser) —
**no backend, API routes, SMTP, Nodemailer, or serverless functions**.

---

## 1. Create an EmailJS account

1. Go to https://www.emailjs.com/ and sign up (free tier: 200 emails/month).
2. Confirm your email and log in to the dashboard.

## 2. Add an Email Service

1. Open **Email Services** → **Add New Service**.
2. Choose your provider (Gmail, Outlook, Yahoo, or custom SMTP).
3. Connect the account that should **receive** the demo requests.
4. After connecting, copy the **Service ID** (e.g. `service_a1b2c3d`).

## 3. Create the Email Template

1. Open **Email Templates** → **Create New Template**.
2. Set a **Template Name** such as `New Book a Demo Request`.
3. Set **To Email** to the inbox that should receive notifications.
4. Set **From Name** to `Fintech Services — Book a Demo`.
5. Use the **Subject** below, then paste the **Content** block.
6. Save and copy the **Template ID** (e.g. `template_x9y8z7w`).

### Subject

```
New Demo Request from {{name}} ({{company}})
```

### Content (HTML / plain text)

```
A new "Book a Demo" request was submitted on the Fintech Services website.

────────────────────────────────────────
CONTACT DETAILS
────────────────────────────────────────
Name:     {{name}}
Email:    {{email}}
Company:  {{company}}
Phone:    {{phone}}

Message:
{{message}}

────────────────────────────────────────
REQUEST CONTEXT
────────────────────────────────────────
Date:           {{date}}
Timestamp:      {{timestamp}}
Page URL:       {{page_url}}
Page Title:     {{page_title}}
Browser / UA:   {{user_agent}}
```

> The variables in `{{...}}` must match the keys sent from
> `services/emailService.ts` exactly. The code sends:
> `name, email, company, phone, message, date, timestamp, page_url, page_title, user_agent`.

## 4. Get your Public Key

1. Open **Account** → **General** (or **API Keys**).
2. Copy the **Public Key** (e.g. `aBcD1234EfGh5678`).

## 5. Configure environment variables

In the `frontend/` folder create `.env.local` (already git-ignored):

```bash
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_a1b2c3d
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_x9y8z7w
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=aBcD1234EfGh5678
```

On **Vercel** (the live host):
1. Project → **Settings** → **Environment Variables**.
2. Add each of the three `NEXT_PUBLIC_EMAILJS_*` variables for
   **Production**, **Preview**, and **Development**.
3. **Redeploy** — `NEXT_PUBLIC_*` vars are inlined at build time, so a
   redeploy is required after adding or changing them.

## 6. Restrict usage (recommended)

In the EmailJS dashboard under **Account** → **Security**:

- Enable **Allowlist Domains** and add:
  - `fintech-one-tau.vercel.app`
  - `localhost` (for local development)
- Keep **Use Private Key** disabled — the public key is designed for
  browser use and is safe to expose when the domain allowlist is on.

## 7. Test

1. `npm run dev`
2. Click any **Book a Demo** button (hero, navbar, CTA section, service card, template detail).
3. Fill in the form and submit.
4. Confirm:
   - Button changes `Book a Demo → Sending... → Booked Successfully`.
   - Green toast appears: "Thank you! We'll contact you shortly."
   - Form resets and modal closes.
   - The email arrives in your inbox with every field populated.

---

## Troubleshooting

| Problem | Fix |
| --- | --- |
| "Email service is not configured" toast | All three env vars are missing or not exposed. Restart the dev server / redeploy. |
| `The user ID is required` | `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` is not set. |
| `The service ID is invalid` | `NEXT_PUBLIC_EMAILJS_SERVICE_ID` is wrong or the service is disconnected. |
| `The template ID is invalid` | `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` is wrong. |
| 403 / `Origin is not allowed` | Add the site's domain to the EmailJS domain allowlist. |
| Variables show up blank in email | Template variable names must match the keys exactly (`{{name}}`, `{{page_url}}`, etc.). |
