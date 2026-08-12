import { cn } from "@/lib/utils";

/**
 * Lightweight, dependency-free SVG sparkline / area chart.
 * Values are normalized to fit the viewBox.
 */
export function Sparkline({
  data,
  width = 120,
  height = 36,
  stroke = "#1565C0",
  fill = "rgba(21,101,192,0.12)",
  strokeWidth = 2,
  className,
}: {
  data: number[];
  width?: number;
  height?: number;
  stroke?: string;
  fill?: string;
  strokeWidth?: number;
  className?: string;
}) {
  if (data.length === 0) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pad = 2;
  const stepX = (width - pad * 2) / (data.length - 1 || 1);

  const points = data.map((v, i) => {
    const x = pad + i * stepX;
    const y = height - pad - ((v - min) / range) * (height - pad * 2);
    return [x, y] as const;
  });

  const line = points
    .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`)
    .join(" ");
  const area = `${line} L${points[points.length - 1][0].toFixed(
    1
  )},${height} L${points[0][0].toFixed(1)},${height} Z`;
  const gid = `spark-${stroke.replace(/[^a-z0-9]/gi, "")}`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      className={cn("overflow-visible", className)}
      aria-hidden
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.18" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gid})`} />
      <path
        d={line}
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {fill === "none" ? null : null}
    </svg>
  );
}

/**
 * Vertical bar chart used in dashboards / marketing preview.
 */
export function BarChart({
  data,
  height = 160,
  color = "#1565C0",
  className,
}: {
  data: number[];
  height?: number;
  color?: string;
  className?: string;
}) {
  const max = Math.max(...data, 1);
  return (
    <svg
      viewBox={`0 0 ${data.length * 28} ${height}`}
      width="100%"
      height={height}
      preserveAspectRatio="none"
      className={className}
      aria-hidden
    >
      {data.map((v, i) => {
        const h = (v / max) * (height - 8);
        return (
          <rect
            key={i}
            x={i * 28 + 6}
            y={height - h}
            width="16"
            height={h}
            rx="4"
            fill={color}
            opacity={0.85}
          />
        );
      })}
    </svg>
  );
}
