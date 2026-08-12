"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, Filter, FileBarChart, Plus } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/components/dashboard/EmptyState";

type Status = "Live" | "Draft" | "Scheduled";
interface Report {
  id: string;
  name: string;
  category: string;
  owner: string;
  views: number;
  status: Status;
  updated: string;
}

const ALL: Report[] = [
  { id: "1", name: "Executive KPI Dashboard", category: "Accounting", owner: "J. Rivera", views: 4820, status: "Live", updated: "2m ago" },
  { id: "2", name: "Q3 Revenue vs Budget", category: "Accounting", owner: "A. Khan", views: 2310, status: "Live", updated: "1h ago" },
  { id: "3", name: "Sales Pipeline Funnel", category: "Sales", owner: "S. Patel", views: 1840, status: "Draft", updated: "Yesterday" },
  { id: "4", name: "Debtor Aging Report", category: "Accounting", owner: "M. Chen", views: 960, status: "Scheduled", updated: "3h ago" },
  { id: "5", name: "Marketing Channel Mix", category: "Marketing", owner: "L. Novak", views: 1205, status: "Live", updated: "2d ago" },
  { id: "6", name: "Logistics Control Tower", category: "Operations", owner: "R. Gomez", views: 540, status: "Draft", updated: "4d ago" },
];

const statusTone: Record<Status, "blue" | "neutral" | "warning"> = {
  Live: "blue",
  Draft: "neutral",
  Scheduled: "warning",
};

const filters = ["All", "Live", "Draft", "Scheduled"] as const;

export default function ReportsPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");

  const rows = useMemo(() => {
    return ALL.filter((r) => {
      const matchesFilter = filter === "All" || r.status === filter;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        r.name.toLowerCase().includes(q) ||
        r.owner.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q);
      return matchesFilter && matchesQuery;
    });
  }, [query, filter]);

  return (
    <DashboardShell>
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-ink">
              Reports
            </h1>
            <p className="mt-1 text-sm text-mist">
              Manage and publish dashboards across your workspace.
            </p>
          </div>
          <Button>
            <Plus className="h-4 w-4" /> New report
          </Button>
        </div>

        <div className="card overflow-hidden">
          {/* Toolbar: search + filters */}
          <div className="flex flex-col gap-3 border-b border-line p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-xs">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-mist" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search reports…"
                className="pl-9"
                aria-label="Search reports"
              />
            </div>
            <div className="flex items-center gap-1 rounded-lg border border-line bg-subtle p-0.5">
              <Filter className="ml-2 mr-1 h-3.5 w-3.5 text-mist" />
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={
                    "rounded-md px-3 py-1 text-xs font-semibold transition-colors " +
                    (filter === f
                      ? "bg-white text-ink shadow-sm"
                      : "text-mist hover:text-ink")
                  }
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {rows.length === 0 ? (
            <div className="p-6">
              <EmptyState
                title="No reports match your filters"
                description="Try adjusting your search or clearing filters to see more reports."
                actionLabel="Clear filters"
                onAction={() => {
                  setQuery("");
                  setFilter("All");
                }}
              />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-line text-left text-xs uppercase tracking-wider text-mist">
                    <th className="px-5 py-3 font-semibold">Report</th>
                    <th className="px-5 py-3 font-semibold">Category</th>
                    <th className="px-5 py-3 font-semibold">Owner</th>
                    <th className="px-5 py-3 font-semibold">Views</th>
                    <th className="px-5 py-3 font-semibold">Status</th>
                    <th className="px-5 py-3 font-semibold">Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr
                      key={r.id}
                      className="border-b border-line last:border-0 hover:bg-subtle/50"
                    >
                      <td className="px-5 py-3.5">
                        <Link
                          href={`/templates/${r.id}`}
                          className="flex items-center gap-2.5 font-medium text-ink hover:text-blue"
                        >
                          <FileBarChart className="h-4 w-4 text-blue" />
                          {r.name}
                        </Link>
                      </td>
                      <td className="px-5 py-3.5 text-mist">{r.category}</td>
                      <td className="px-5 py-3.5 text-mist">{r.owner}</td>
                      <td className="px-5 py-3.5 tabular-nums text-mist">
                        {r.views.toLocaleString()}
                      </td>
                      <td className="px-5 py-3.5">
                        <Badge tone={statusTone[r.status]}>{r.status}</Badge>
                      </td>
                      <td className="px-5 py-3.5 text-mist">{r.updated}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </DashboardShell>
  );
}
