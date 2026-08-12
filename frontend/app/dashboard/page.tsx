import type { Metadata } from "next";
import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  FileSpreadsheet,
  Users,
  Download,
} from "lucide-react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { StatCard } from "@/components/dashboard/StatCard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { RecentReports } from "@/components/dashboard/RecentReports";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = { title: "Dashboard — Fintech Services" };

const stats = [
  { label: "Total revenue", value: "$4.82M", delta: "+12.4%", up: true, series: [32, 40, 38, 52, 49, 61, 58, 72, 80, 91] },
  { label: "Active reports", value: "128", delta: "+6", up: true, accent: "red" as const, series: [40, 42, 48, 45, 52, 56, 58, 60, 62, 64] },
  { label: "Viewers (30d)", value: "24,391", delta: "+8.1%", up: true, series: [12, 18, 16, 22, 28, 24, 30, 34, 38, 42] },
  { label: "Refresh failures", value: "0.4%", delta: "-0.2pt", up: false, series: [3, 2.4, 2.8, 2, 1.6, 1.2, 1, 0.8, 0.6, 0.4] },
];

const activity = [
  { who: "Aisha Khan", what: "published", target: "Q3 Revenue vs Budget", when: "1h ago", tone: "blue" as const },
  { who: "System", what: "refreshed", target: "Executive KPI", when: "2m ago", tone: "neutral" as const },
  { who: "Marco Chen", what: "commented on", target: "Debtor Aging", when: "5h ago", tone: "red" as const },
];

export default function DashboardPage() {
  return (
    <DashboardShell>
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-ink">
                Overview
              </h1>
              <Badge tone="blue">
                <Activity className="h-3 w-3" /> Live
              </Badge>
            </div>
            <p className="mt-1 text-sm text-mist">
              Welcome back, Jordan. Here&apos;s how your workspace is performing.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4" /> Export
            </Button>
            <Button asChild>
              <Link href="/templates">
                <FileSpreadsheet className="h-4 w-4" /> Browse templates
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>

        {/* Chart + side */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <RevenueChart />
          </div>
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-ink">Activity</h3>
              <Users className="h-4 w-4 text-mist" />
            </div>
            <ul className="mt-5 space-y-5">
              {activity.map((a, i) => (
                <li key={i} className="flex gap-3">
                  <span
                    className={
                      "mt-1.5 h-2 w-2 shrink-0 rounded-full " +
                      (a.tone === "blue"
                        ? "bg-blue"
                        : a.tone === "red"
                        ? "bg-red"
                        : "bg-line")
                    }
                  />
                  <div className="min-w-0">
                    <p className="text-sm text-ink">
                      <span className="font-medium">{a.who}</span> {a.what}{" "}
                      <span className="font-medium">{a.target}</span>
                    </p>
                    <p className="text-xs text-mist">{a.when}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Link
              href="#"
              className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-blue hover:text-blue-700"
            >
              View audit log <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Table */}
        <RecentReports />
      </div>
    </DashboardShell>
  );
}
