import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Sparkline } from "@/components/charts/Sparkline";

export function StatCard({
  label,
  value,
  delta,
  up = true,
  series,
  accent = "blue",
}: {
  label: string;
  value: string;
  delta: string;
  up?: boolean;
  series?: number[];
  accent?: "blue" | "red";
}) {
  const color = accent === "red" ? "#C62828" : "#1565C0";
  return (
    <div className="card p-5">
      <div className="flex items-start justify-between">
        <p className="text-xs font-medium uppercase tracking-wider text-mist">
          {label}
        </p>
        <span
          className={
            "inline-flex items-center gap-0.5 text-xs font-semibold " +
            (up ? "text-emerald-600" : "text-red")
          }
        >
          {up ? (
            <ArrowUpRight className="h-3 w-3" />
          ) : (
            <ArrowDownRight className="h-3 w-3" />
          )}
          {delta}
        </span>
      </div>
      <div className="mt-2 flex items-end justify-between gap-3">
        <span className="text-2xl font-semibold tracking-tight text-ink">
          {value}
        </span>
        {series && (
          <Sparkline
            data={series}
            width={88}
            height={32}
            stroke={color}
          />
        )}
      </div>
    </div>
  );
}
