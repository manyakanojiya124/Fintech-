"use client";

import { useState } from "react";
import { Sparkline } from "@/components/charts/Sparkline";
import { cn } from "@/lib/utils";

const data = [
  { m: "Jan", a: 32, b: 28 },
  { m: "Feb", a: 40, b: 34 },
  { m: "Mar", a: 38, b: 36 },
  { m: "Apr", a: 52, b: 44 },
  { m: "May", a: 49, b: 46 },
  { m: "Jun", a: 61, b: 52 },
  { m: "Jul", a: 58, b: 55 },
  { m: "Aug", a: 72, b: 60 },
  { m: "Sep", a: 68, b: 63 },
  { m: "Oct", a: 80, b: 68 },
  { m: "Nov", a: 76, b: 71 },
  { m: "Dec", a: 91, b: 76 },
];

const ranges = ["7D", "30D", "12M", "YTD"] as const;

export function RevenueChart() {
  const [range, setRange] = useState<(typeof ranges)[number]>("12M");
  const current = data.map((d) => d.a);
  const previous = data.map((d) => d.b);

  return (
    <div className="card p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-sm font-semibold text-ink">Revenue</h3>
          <p className="text-xs text-mist">Compared to previous period</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-semibold tracking-tight text-ink">
              $4.82M
            </span>
            <span className="text-xs font-semibold text-emerald-600">
              +12.4%
            </span>
          </div>
        </div>
        <div className="inline-flex rounded-lg border border-line bg-subtle p-0.5">
          {ranges.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={cn(
                "rounded-md px-3 py-1 text-xs font-semibold transition-colors",
                range === r
                  ? "bg-white text-ink shadow-sm"
                  : "text-mist hover:text-ink"
              )}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center gap-5 text-xs text-mist">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-blue" /> Current
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-line" /> Previous
        </span>
      </div>

      <div className="mt-4">
        <div className="relative">
          <Sparkline
            data={previous}
            width={720}
            height={180}
            stroke="#CBD5E1"
            strokeWidth={2}
            className="w-full"
          />
          <div className="absolute inset-0">
            <Sparkline
              data={current}
              width={720}
              height={180}
              stroke="#1565C0"
              strokeWidth={2.5}
              className="w-full"
            />
          </div>
        </div>
        <div className="mt-2 flex justify-between text-[11px] text-mist">
          {data.map((d) => (
            <span key={d.m}>{d.m[0]}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
