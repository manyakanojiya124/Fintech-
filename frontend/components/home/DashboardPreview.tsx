import { ArrowUpRight, TrendingUp, BarChart3 } from "lucide-react";
import { Sparkline } from "@/components/charts/Sparkline";

const kpis = [
  { label: "Total Revenue", value: "$4.82M", delta: "+12.4%", up: true },
  { label: "Gross Margin", value: "38.6%", delta: "+2.1pt", up: true },
  { label: "Open Pipeline", value: "$1.14M", delta: "+8.9%", up: true },
  { label: "Net Cash", value: "$2.36M", delta: "-1.2%", up: false },
];

const revenue = [32, 40, 38, 52, 49, 61, 58, 72, 68, 80, 76, 91];
const bars = [42, 58, 50, 70, 64, 82, 76, 90];

const rows = [
  { name: "Northbridge Capital", amount: "$284,200", status: "Closed" },
  { name: "Meridian Bank", amount: "$198,750", status: "Review" },
  { name: "Halcyon Retail", amount: "$156,400", status: "Closed" },
  { name: "Vantage Logistics", amount: "$92,100", status: "Pending" },
];

const statusTone: Record<string, string> = {
  Closed: "bg-blue-50 text-blue-700 border-blue-100",
  Review: "bg-amber-50 text-amber-700 border-amber-100",
  Pending: "bg-subtle text-mist border-line",
};

export function DashboardPreview() {
  return (
    <div className="card overflow-hidden">
      {/* Window chrome */}
      <div className="flex items-center gap-2 border-b border-line bg-subtle/60 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-red/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
        <span className="ml-3 text-xs font-medium text-mist">
          FSR Executive KPI Dashboard — Live Preview
        </span>
      </div>

      <div className="p-5 sm:p-6">
        {/* KPI row */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {kpis.map((k) => (
            <div
              key={k.label}
              className="rounded-xl border border-line bg-white p-4"
            >
              <p className="text-[11px] font-medium uppercase tracking-wider text-mist">
                {k.label}
              </p>
              <div className="mt-1.5 flex items-end justify-between gap-2">
                <span className="text-lg font-semibold tracking-tight text-ink">
                  {k.value}
                </span>
                <span
                  className={
                    "inline-flex items-center gap-0.5 text-xs font-semibold " +
                    (k.up ? "text-emerald-600" : "text-red")
                  }
                >
                  {k.up ? (
                    <ArrowUpRight className="h-3 w-3" />
                  ) : (
                    <TrendingUp className="h-3 w-3" />
                  )}
                  {k.delta}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Chart + side panel */}
        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="rounded-xl border border-line bg-white p-5 lg:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-ink">
                  Revenue overview
                </p>
                <p className="text-xs text-mist">Last 12 months</p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                <BarChart3 className="h-3 w-3" /> +18.2% YoY
              </span>
            </div>
            <div className="mt-4">
              <Sparkline
                data={revenue}
                width={560}
                height={150}
                stroke="#1565C0"
              />
            </div>
          </div>

          <div className="rounded-xl border border-line bg-white p-5">
            <p className="text-sm font-semibold text-ink">Deal source</p>
            <p className="text-xs text-mist">By channel</p>
            <div className="mt-4 space-y-4">
              {[
                { label: "Outbound", pct: 72, color: "#1565C0" },
                { label: "Inbound", pct: 54, color: "#C62828" },
                { label: "Partner", pct: 38, color: "#94A3B8" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="mb-1.5 flex justify-between text-xs">
                    <span className="text-mist">{s.label}</span>
                    <span className="font-semibold text-ink">{s.pct}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-subtle">
                    <div
                      className="h-2 rounded-full"
                      style={{ width: `${s.pct}%`, background: s.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 border-t border-line pt-4">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-2xl font-semibold tracking-tight text-ink">
                    $4.82M
                  </p>
                  <p className="text-xs text-mist">Total closed</p>
                </div>
                <Sparkline
                  data={bars}
                  width={84}
                  height={32}
                  stroke="#C62828"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="mt-4 overflow-hidden rounded-xl border border-line">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line bg-subtle/50 text-left text-xs uppercase tracking-wider text-mist">
                <th className="px-5 py-3 font-semibold">Account</th>
                <th className="px-5 py-3 font-semibold">Amount</th>
                <th className="px-5 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr
                  key={r.name}
                  className="border-b border-line last:border-0 hover:bg-subtle/40"
                >
                  <td className="px-5 py-3 font-medium text-ink">{r.name}</td>
                  <td className="px-5 py-3 text-mist">{r.amount}</td>
                  <td className="px-5 py-3">
                    <span
                      className={
                        "inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold " +
                        statusTone[r.status]
                      }
                    >
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
