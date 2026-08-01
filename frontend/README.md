# Fintech Services (FSR) — Marketing Website

A modern, animated marketing site for **Fintech Services (FSR)**, showcasing
Power BI dashboard design and financial analytics services. Design language is
inspired by the premium, interactive feel of ZoomCharts.com — original layout,
copy, and components, no reused assets or code.

## Tech stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS** for styling, with custom design tokens
- **Framer Motion** for scroll reveals and micro-interactions
- **GSAP** for the animated hero dashboard line chart
- **Shadcn-style UI primitives** (Button, Badge, Input, Checkbox) built with
  `class-variance-authority` + `@radix-ui/react-slot`
- **Lucide React** for icons

## Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

To build for production:

```bash
npm run build
npm run start
```

## Project structure

```
frontend/
├── app/
│   ├── layout.tsx              # Root layout, fonts, metadata
│   ├── globals.css             # Design tokens & base styles
│   ├── page.tsx                # Homepage
│   ├── not-found.tsx           # 404 page
│   ├── sitemap.ts              # Auto-generated sitemap
│   ├── robots.ts               # robots.txt
│   └── templates/
│       ├── page.tsx            # Dashboard template gallery
│       └── [slug]/page.tsx     # Individual dashboard detail page
├── components/
│   ├── layout/                 # Navbar, Footer
│   ├── home/                   # Hero, PowerBICard, Features, TrustedClients, CTASection
│   ├── templates/              # Sidebar, SearchBar, SortDropdown, TemplateGrid,
│   │                             TemplateCard, DashboardPreview, TemplatesExplorer
│   └── ui/                     # Button, Badge, Input, Checkbox
├── lib/
│   ├── templates-data.ts       # 20 dummy Power BI dashboard templates
│   └── utils.ts                # `cn` class-merge helper
└── public/
    ├── logo.svg                # FSR logo
    └── favicon.svg
```

## Pages & features

### Homepage (`/`)
- Sticky glassmorphism navbar with mobile menu
- Animated hero with a GSAP-drawn line chart and live KPI strip
- Single featured **Power BI** service card (Interactive Dashboards,
  Financial Reporting, Executive KPI Dashboards, Sales Analytics, Accounting
  Analytics, Business Intelligence Solutions) with a **Learn More** button
  linking to `/templates`
- Process/features grid
- Auto-scrolling trusted-clients marquee
- Closing CTA section

### Template gallery (`/templates`)
- Left sidebar filters for **Sales** and **Accounting** (structured so more
  categories — Finance, HR, Marketing, Inventory, Operations — can be added
  by extending one array)
- Live search across title, description, and category
- Sort by featured / name / category
- Responsive card grid of **20 dummy dashboard templates**, each with a
  generated SVG preview chart, a **Preview** hover action, and a
  **View Details** link
- Empty state when a search/filter combination has no matches

### Template detail (`/templates/[slug]`)
- Large preview, description, feature list, business use case, technologies
  used, and a **Book a Demo** call to action
- Related dashboards from the same category

## Hero background video

The hero section loops a muted background video (`public/videos/hero-bg.mp4`,
~1.1MB, re-encoded/compressed for the web) behind a white overlay so it reads
as subtle motion texture rather than a distraction. Notes:

- `public/videos/hero-bg-poster.jpg` is shown instantly while the video loads.
- Playback respects `prefers-reduced-motion` — it's paused for people who have
  that OS setting enabled.
- To swap in your own footage, replace `hero-bg.mp4` (ideally re-encode to
  ~1080p/720p, no audio, `-movflags +faststart` for fast start) and regenerate
  the poster with:
  ```bash
  ffmpeg -i your-video.mp4 -frames:v 1 -q:v 3 public/videos/hero-bg-poster.jpg
  ```
- Overlay strength is controlled in `components/home/Hero.tsx` via the
  `bg-white/82` and gradient classes on the layers above the `<video>` — turn
  the opacity down for more video, up for more white wash.

## Fonts

The project ships with a robust **system font stack** (serif display /
sans-serif body / monospace) defined in `app/globals.css`, so it builds and
runs with zero network dependency. To use custom Google Fonts (e.g. Fraunces
for headings, Inter for body text — the original design intent) once you have
normal internet access:

```tsx
// app/layout.tsx
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-display", weight: ["400","500","600","700"] });
const inter = Inter({ subsets: ["latin"], variable: "--font-body", weight: ["400","500","600","700"] });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], variable: "--font-mono", weight: ["400","500"] });

// then add `${fraunces.variable} ${inter.variable} ${plexMono.variable}` to the <html> className
```

## Dashboard preview images

Each of the 20 templates uses a real dashboard screenshot stored in
`public/templates/` (JPEG, resized/compressed for the web) and referenced via
the `image` field on each entry in `lib/templates-data.ts`. Both the gallery
cards and the detail page render these through `next/image`, so they're
automatically optimized, lazily loaded, and served at the right size per
breakpoint.

To swap in your own screenshots: drop a new image into `public/templates/`,
then update (or add) the matching `image: "/templates/your-file.jpg"` entry
in `lib/templates-data.ts`.

## Customization

- **Brand colors & type** — edit the token list in `tailwind.config.ts`
  (`orange`, `navy`, `slate`, `ink`, `surface`, `panel`, `subtle`, fonts). The
  palette is a warm ivory surface with a rust-orange accent and deep navy
  secondary — deliberately avoiding the flat white + candy-orange look common
  to templated AI-generated sites. A subtle grain texture (`.grain` in
  `globals.css`, applied to `<body>`) adds tactility to flat color fields.
- **Categories** — categories are derived automatically from whatever's in
  `lib/templates-data.ts` (see the exported `categories` array), so the
  sidebar filter list, counts, and URL-based filtering
  (`/templates?category=Marketing`) all update themselves when you add a
  template in a new category. Badge colors per category are set in
  `lib/category-tone.ts`.
- **Add a template category** — just use a new `Category` value on a
  template entry in `lib/templates-data.ts` (extend the `Category` type first
  if it's a brand-new one) and add its tone in `lib/category-tone.ts` — the
  sidebar and counts pick it up automatically.
- **Add a dashboard template** — append an object to the `templates` array in
  `lib/templates-data.ts`; the gallery and detail page pick it up
  automatically.

## Deployment

The project is ready to deploy to **Vercel** with zero additional
configuration — connect the `frontend` folder as the project root and deploy.
