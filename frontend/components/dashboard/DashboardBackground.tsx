"use client";

import { useEffect, useState } from "react";

/**
 * DashboardBackground
 * -------------------
 * A premium, extremely low-opacity "data intelligence canvas" that sits behind
 * the entire dashboard. It uses inline SVG only — no dependencies, no images —
 * so it stays crisp at every resolution and adds virtually no weight.
 *
 * Hierarchy (lowest -> highest):
 *   1. this canvas           (decorative, aria-hidden, pointer-events-none)
 *   2. sidebar / topbar      (opaque surfaces)
 *   3. dashboard cards       (the real content)
 *
 * The motifs — faint grid, area/line chart, bars, donut outline, scatter dots
 * connected by thin lines, tiny axis ticks — are drawn in dark navy with a
 * single sparing use of brand red. Opacities are intentionally very low so
 * text and real charts always win.
 *
 * Animation is limited to a slow line-draw and a couple of drifting data
 * points, and is fully disabled under prefers-reduced-motion.
 */

const NAVY = "#1E2A3A";
const RED = "#C62828";

export function DashboardBackground() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-subtle"
    >
      {/* Base wash so the canvas reads as white, not gray */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-subtle to-white" />

      {/* SVG canvas. One large viewBox; motifs are placed by percentage so the
          composition scales across mobile -> ultrawide without re-rendering. */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <defs>
          {/* Soft radial mask so motifs fade out toward the edges / behind content */}
          <radialGradient id="db-vignette" cx="62%" cy="42%" r="75%">
            <stop offset="0%" stopColor="#fff" stopOpacity="1" />
            <stop offset="55%" stopColor="#fff" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0.92" />
          </radialGradient>

          <linearGradient id="db-area-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={NAVY} stopOpacity="0.05" />
            <stop offset="100%" stopColor={NAVY} stopOpacity="0" />
          </linearGradient>


        </defs>

        {/* ── 1. Faint analytics grid (dotted, confined to center column) ── */}
        <g
          opacity="0.5"
          style={{ color: NAVY }}
          stroke="currentColor"
          strokeWidth="1"
        >
          {Array.from({ length: 13 }).map((_, i) => (
            <line
              key={`v${i}`}
              x1={120 + i * 100}
              y1="40"
              x2={120 + i * 100}
              y2="860"
              stroke={NAVY}
              strokeOpacity="0.04"
              strokeDasharray="1 6"
            />
          ))}
          {Array.from({ length: 9 }).map((_, i) => (
            <line
              key={`h${i}`}
              x1="120"
              y1={90 + i * 90}
              x2="1320"
              y2={90 + i * 90}
              stroke={NAVY}
              strokeOpacity="0.045"
              strokeDasharray="1 6"
            />
          ))}
        </g>

        {/* ── 2. Faint axis frame, lower-left (under what's usually empty space) ── */}
        <g
          stroke={NAVY}
          strokeOpacity="0.16"
          strokeWidth="1.2"
          strokeLinecap="round"
        >
          {/* Y axis */}
          <line x1="150" y1="560" x2="150" y2="800" />
          {/* X axis */}
          <line x1="150" y1="800" x2="470" y2="800" />
          {/* Y ticks */}
          {[620, 680, 740].map((y) => (
            <line key={y} x1="146" y1={y} x2="150" y2={y} />
          ))}
          {/* X ticks */}
          {[230, 310, 390].map((x) => (
            <line key={x} x1={x} y1="800" x2={x} y2="804" />
          ))}
        </g>

        {/* ── 3. Bar chart, lower-left ── */}
        <g>
          {[
            { x: 178, h: 54 },
            { x: 214, h: 92 },
            { x: 250, h: 70 },
            { x: 286, h: 128 },
            { x: 322, h: 104 },
            { x: 358, h: 150 },
            { x: 394, h: 88 },
            { x: 430, h: 116 },
          ].map((b, i) => (
            <rect
              key={b.x}
              x={b.x}
              y={800 - b.h}
              width="22"
              height={b.h}
              rx="3"
              fill={NAVY}
              fillOpacity={i === 5 ? 0.12 : 0.06}
            />
          ))}
          {/* One brand-red bar, used sparingly */}
          <rect
            x="286"
            y={800 - 128 - 150 - 6}
            width="22"
            height="3"
            rx="1.5"
            fill={RED}
            fillOpacity="0.5"
          />
        </g>

        {/* ── 4. Area + line chart, upper-right (classic analytics silhouette) ── */}
        <g>
          <path
            d="M860,260 L930,232 L1000,250 L1070,196 L1140,218 L1210,168 L1280,196 L1350,150 L1350,340 L860,340 Z"
            fill="url(#db-area-fill)"
          />
          <path
            d="M860,260 L930,232 L1000,250 L1070,196 L1140,218 L1210,168 L1280,196 L1350,150"
            fill="none"
            stroke={NAVY}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity="0.3"
          >
            {!reduced && (
              <animate
                attributeName="stroke-dasharray"
                from="0 1200"
                to="1200 0"
                dur="14s"
                repeatCount="indefinite"
              />
            )}
          </path>
          {/* Nodes on the line */}
          {[
            [860, 260],
            [1000, 250],
            [1070, 196],
            [1210, 168],
            [1350, 150],
          ].map(([cx, cy], i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r="3"
              fill="#fff"
              stroke={NAVY}
              strokeOpacity="0.4"
              strokeWidth="1.4"
            />
          ))}
          {/* A single red highlighted data point */}
          <circle cx="1210" cy="168" r="4" fill={RED} fillOpacity="0.55" />
        </g>

        {/* ── 5. Donut outline, upper-left ── */}
        <g transform="translate(260,200)">
          <circle
            r="62"
            fill="none"
            stroke={NAVY}
            strokeOpacity="0.08"
            strokeWidth="14"
          />
          <circle
            r="62"
            fill="none"
            stroke={NAVY}
            strokeOpacity="0.28"
            strokeWidth="14"
            strokeLinecap="round"
            strokeDasharray="240 390"
            transform="rotate(-90)"
          />
          <circle
            r="62"
            fill="none"
            stroke={RED}
            strokeOpacity="0.5"
            strokeWidth="14"
            strokeLinecap="round"
            strokeDasharray="56 390"
            strokeDashoffset="-240"
            transform="rotate(-90)"
          />
        </g>

        {/* ── 6. Scatter plot + connecting trend line, middle-right ── */}
        <g stroke={NAVY} strokeOpacity="0.16" strokeWidth="1">
          <line
            x1="820"
            y1="640"
            x2="1290"
            y2="430"
            strokeDasharray="2 5"
          />
        </g>
        <g>
          {[
            [860, 600, 3, 0],
            [920, 560, 2.4, 1],
            [980, 590, 3.4, 2],
            [1040, 520, 2.6, 3],
            [1100, 540, 3, 4],
            [1160, 470, 2.4, 5],
            [1220, 490, 3.2, 6],
            [1270, 440, 2.6, 7],
          ].map(([cx, cy, r, i], idx) => (
            <circle
              key={idx}
              cx={cx}
              cy={cy}
              r={r}
              fill={NAVY}
              fillOpacity={idx % 3 === 0 ? 0.38 : 0.2}
            >
              {!reduced && (
                <animate
                  attributeName="fill-opacity"
                  values="0.16;0.38;0.16"
                  dur="6s"
                  begin={`${i * 0.7}s`}
                  repeatCount="indefinite"
                />
              )}
            </circle>
          ))}
          {/* Brand-red outlier point */}
          <circle cx="1100" cy="540" r="3.4" fill={RED} fillOpacity="0.5" />
        </g>

        {/* ── 7. Tiny KPI sparkline, mid-left gap ── */}
        <g>
          <path
            d="M540,430 L590,414 L640,426 L690,392 L740,404 L790,372"
            fill="none"
            stroke={NAVY}
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity="0.22"
          />
          <path
            d="M540,430 L590,414 L640,426 L690,392 L740,404 L790,372 L790,430 L540,430 Z"
            fill={NAVY}
            fillOpacity="0.03"
          />
        </g>

        {/* ── 8. Drifting data points (very slow, almost imperceptible) ── */}
        {!reduced && (
          <g fill={NAVY} fillOpacity="0.25">
            <circle cx="600" cy="700" r="2">
              <animate
                attributeName="cy"
                values="700;690;700"
                dur="11s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="1180" cy="320" r="2">
              <animate
                attributeName="cy"
                values="320;332;320"
                dur="13s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="760" cy="260" r="2">
              <animate
                attributeName="cx"
                values="760;772;760"
                dur="15s"
                repeatCount="indefinite"
              />
            </circle>
          </g>
        )}

        {/* Edge fade so motifs dissolve into white behind cards/edges */}
        <rect width="1440" height="900" fill="url(#db-vignette)" />
      </svg>

      {/* A subtle top sheen bridging the topbar into the canvas */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white to-transparent" />
    </div>
  );
}
