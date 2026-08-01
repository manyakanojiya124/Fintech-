import { cn } from "@/lib/utils";

type PreviewTone = "orange" | "navy" | "slate";

const toneMap: Record<PreviewTone, { a: string; b: string; grid: string }> = {
  orange: { a: "#FF5A1F", b: "#E44A11", grid: "rgba(255,90,31,0.18)" },
  navy: { a: "#5B7BFF", b: "#3A56C4", grid: "rgba(91,123,255,0.18)" },
  slate: { a: "#94A3B8", b: "#64748B", grid: "rgba(148,163,184,0.18)" },
};

function seedFrom(text: string) {
  let h = 0;
  for (let i = 0; i < text.length; i++) h = (h * 31 + text.charCodeAt(i)) >>> 0;
  return h;
}

function rngSeries(seed: number, count: number, min: number, max: number) {
  let s = seed;
  const values: number[] = [];
  for (let i = 0; i < count; i++) {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    const r = (s % 1000) / 1000;
    values.push(min + r * (max - min));
  }
  return values;
}

export function DashboardPreview({
  tone,
  kind,
  seed,
  className,
}: {
  tone: PreviewTone;
  kind: "bars" | "lines" | "donut" | "mixed";
  seed: string;
  className?: string;
}) {
  const colors = toneMap[tone];
  const n = seedFrom(seed);
  const bars = rngSeries(n, 8, 18, 90);
  const line = rngSeries(n + 7, 10, 20, 85);

  return (
    <div className={cn("relative w-full overflow-hidden rounded-t-xl2 bg-[#0B1226]", className)}>
      <svg viewBox="0 0 400 220" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id={`fill-${seed}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={colors.a} stopOpacity="0.5" />
            <stop offset="100%" stopColor={colors.a} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* grid */}
        {Array.from({ length: 5 }).map((_, i) => (
          <line
            key={i}
            x1="0"
            x2="400"
            y1={40 * (i + 1)}
            y2={40 * (i + 1)}
            stroke={colors.grid}
            strokeWidth="1"
          />
        ))}

        {/* header stat strip */}
        <rect x="20" y="16" width="70" height="8" rx="4" fill={colors.a} opacity="0.9" />
        <rect x="100" y="16" width="46" height="8" rx="4" fill="#94A3B8" opacity="0.4" />

        {kind === "bars" && (
          <>
            {bars.map((v, i) => (
              <rect
                key={i}
                x={24 + i * 46}
                y={200 - v}
                width="26"
                height={v}
                rx="4"
                fill={i % 3 === 0 ? colors.a : colors.b}
                opacity={0.85}
              />
            ))}
          </>
        )}

        {kind === "lines" && (
          <>
            <polyline
              points={line.map((v, i) => `${20 + i * 40},${200 - v}`).join(" ")}
              fill="none"
              stroke={colors.a}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <polygon
              points={`20,200 ${line.map((v, i) => `${20 + i * 40},${200 - v}`).join(" ")} ${20 + (line.length - 1) * 40},200`}
              fill={`url(#fill-${seed})`}
            />
            {line.map((v, i) => (
              <circle key={i} cx={20 + i * 40} cy={200 - v} r="3.5" fill={colors.a} />
            ))}
          </>
        )}

        {kind === "donut" && (
          <>
            <circle cx="120" cy="120" r="60" fill="none" stroke="#1C2740" strokeWidth="24" />
            <circle
              cx="120"
              cy="120"
              r="60"
              fill="none"
              stroke={colors.a}
              strokeWidth="24"
              strokeDasharray={`${(bars[0] / 100) * 377} 377`}
              strokeLinecap="round"
              transform="rotate(-90 120 120)"
            />
            <circle
              cx="120"
              cy="120"
              r="60"
              fill="none"
              stroke={colors.b}
              strokeWidth="24"
              strokeDasharray={`${(bars[1] / 160) * 150} 377`}
              strokeDashoffset={`-${(bars[0] / 100) * 377}`}
              strokeLinecap="round"
              transform="rotate(-90 120 120)"
              opacity="0.75"
            />
            {bars.slice(2, 6).map((v, i) => (
              <rect key={i} x="210" y={60 + i * 30} width={Math.min(v, 140)} height="10" rx="5" fill={i % 2 ? colors.b : colors.a} opacity="0.8" />
            ))}
          </>
        )}

        {kind === "mixed" && (
          <>
            {bars.slice(0, 6).map((v, i) => (
              <rect
                key={i}
                x={30 + i * 58}
                y={200 - v * 0.7}
                width="30"
                height={v * 0.7}
                rx="4"
                fill={colors.b}
                opacity="0.55"
              />
            ))}
            <polyline
              points={line.slice(0, 6).map((v, i) => `${45 + i * 58},${200 - v}`).join(" ")}
              fill="none"
              stroke={colors.a}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {line.slice(0, 6).map((v, i) => (
              <circle key={i} cx={45 + i * 58} cy={200 - v} r="3.5" fill={colors.a} />
            ))}
          </>
        )}
      </svg>
    </div>
  );
}
