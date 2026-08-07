import Link from "next/link";
import { MoreHorizontal, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Status = "Live" | "Draft" | "Scheduled";

const reports: {
  name: string;
  owner: string;
  updated: string;
  status: Status;
}[] = [
  { name: "Executive KPI Dashboard", owner: "J. Rivera", updated: "2m ago", status: "Live" },
  { name: "Q3 Revenue vs Budget", owner: "A. Khan", updated: "1h ago", status: "Live" },
  { name: "Debtor Aging Report", owner: "M. Chen", updated: "3h ago", status: "Scheduled" },
  { name: "Sales Pipeline Funnel", owner: "S. Patel", updated: "Yesterday", status: "Draft" },
  { name: "Marketing Channel Mix", owner: "L. Novak", updated: "2 days ago", status: "Live" },
];

const tone: Record<Status, "blue" | "neutral" | "warning"> = {
  Live: "blue",
  Draft: "neutral",
  Scheduled: "warning",
};

export function RecentReports() {
  return (
    <div className="card">
      <div className="flex items-center justify-between border-b border-line p-5">
        <div>
          <h3 className="text-sm font-semibold text-ink">Recent reports</h3>
          <p className="text-xs text-mist">Updated across your workspace</p>
        </div>
        <Link
          href="/dashboard/reports"
          className="inline-flex items-center gap-1 text-sm font-semibold text-blue hover:text-blue-700"
        >
          View all <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line text-left text-xs uppercase tracking-wider text-mist">
              <th className="px-5 py-2.5 font-semibold">Report</th>
              <th className="px-5 py-2.5 font-semibold">Owner</th>
              <th className="px-5 py-2.5 font-semibold">Updated</th>
              <th className="px-5 py-2.5 font-semibold">Status</th>
              <th className="px-5 py-2.5" aria-label="actions" />
            </tr>
          </thead>
          <tbody>
            {reports.map((r) => (
              <tr
                key={r.name}
                className="border-b border-line last:border-0 hover:bg-subtle/50"
              >
                <td className="px-5 py-3.5 font-medium text-ink">{r.name}</td>
                <td className="px-5 py-3.5 text-mist">{r.owner}</td>
                <td className="px-5 py-3.5 text-mist">{r.updated}</td>
                <td className="px-5 py-3.5">
                  <Badge tone={tone[r.status]}>{r.status}</Badge>
                </td>
                <td className="px-5 py-3.5 text-right">
                  <button
                    aria-label="More options"
                    className="rounded-md p-1 text-mist hover:bg-white hover:text-ink"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
