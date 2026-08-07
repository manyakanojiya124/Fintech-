# Gmail + Nodemailer Setup Guide

The "Book a Demo" form is sent through a **Next.js route handler**
(`app/api/book-demo/route.ts`) that uses **Nodemailer + Gmail SMTP**.

- ✅ Gmail App Password (the one you already generated)
- ✅ No EmailJS, no Resend, no third-party email service
- ✅ No separate backend / Express / Render — just one Vercel serverless route
- ✅ Credentials stay **server-side only** (no `NEXT_PUBLIC_` prefix)

---

## 1. Generate a Gmail App Password

1. Enable **2-Step Verification** on the sending Google account:
   https://myaccount.google.com/security
2. Go to https://myaccount.google.com/apppasswords
3. Create a new app password — name it e.g. `Fintech Book Demo`.
4. Google shows a **16-character code** like `abcd efgh ijkl mnop`.
   Copy it (you can keep or remove the spaces).

> A normal Gmail password will **not** work for SMTP since 2022.
> You must use an App Password.

## 2. Add environment variables

The App Password is a **secret**. It must live server-side.

### Local development

In `frontend/`, create `.env.local` (already in `.gitignore`):

```bash
GMAIL_USER=youraddress@gmail.com
GMAIL_APP_PASSWORD=abcdefghijklmnop
DEMO_NOTIFY_EMAIL=leads@yourdomain.com   # optional; defaults to GMAIL_USER
```

- `GMAIL_USER` — the Gmail account that **sends** the notification.
- `GMAIL_APP_PASSWORD` — the 16-char app password (no spaces).
- `DEMO_NOTIFY_EMAIL` — the inbox that **receives** leads. Can be the same as
  `GMAIL_USER`, or any other address (team inbox, CRM forwarder, etc.).

### On Vercel (the live host)

1. Project → **Settings** → **Environment Variables**.
2. Add each of the three for **Production**, **Preview**, and **Development**:
   - `GMAIL_USER`
   - `GMAIL_APP_PASSWORD`
   - `DEMO_NOTIFY_EMAIL`
3. **Redeploy** the project so the new variables take effect.

> Do **not** use the `NEXT_PUBLIC_` prefix — these variables would otherwise
> be inlined into the browser and expose your Gmail credentials.

## 3. Test locally

```bash
npm install
npm run dev
```

1. Open http://localhost:3000
2. Click any **Book a Demo** button (hero, navbar, CTA, service card,
   template detail page).
3. Fill in the form and submit.
4. Confirm:
   - Button goes `Book a Demo → Sending... → Booked Successfully`
   - Green toast: **"Thank you! We'll contact you shortly."**
   - The email arrives in `DEMO_NOTIFY_EMAIL` (or `GMAIL_USER`)
   - Hitting **Reply** on that email addresses the lead, not yourself
     (the route sets `Reply-To` to the submitter's email)

## 4. What the email contains

The server renders both HTML and plain-text versions with:

- Name
- Email
- Company
- Phone
- Message
- Date
- Timestamp (UTC ISO)
- Current Page URL
- Page Title
- Browser User Agent

---

## 5. Production notes / Gmail limits

- Gmail SMTP sending limit: **~500 emails/day** for consumer Gmail,
  **2,000/day** for Google Workspace — plenty for demo requests.
- If you expect high volume, switch the transport host to a provider
  like SendGrid/Postmark later; the UI code stays unchanged.
- Vercel serverless functions support outbound SMTP on port 465.
  If a deployment cannot reach `smtp.gmail.com:465`, switch the route to
  port `587` with `secure: false`.

## 6. Troubleshooting

| Symptom | Fix |
| --- | --- |
| `Invalid login: Application-specific password required` | Use a Gmail App Password, not your regular password. |
| `Invalid login: 534-5.7.9` / "less secure apps" | 2-Step Verification must be ON; generate a fresh App Password. |
| `Email service is not configured` | `GMAIL_USER` or `GMAIL_APP_PASSWORD` missing on the server. Restart `next dev` / redeploy. |
| `422 Validation failed` | Client and server both validate — one of the fields is invalid. |
| `502 Unable to send` | Check server logs in Vercel; usually wrong credentials or Gmail lockout. |
| Gmail sends a "sign-in blocked" security alert | Allow the app password / recent activity at https://support.google.com/mail/answer/78754 |
| Works locally but not on Vercel | Verify env vars are added to the **Production** scope and redeployed. |
