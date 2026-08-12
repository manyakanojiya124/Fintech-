"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BarChart3,
  FileSpreadsheet,
  Users,
  Settings,
  LifeBuoy,
  X,
} from "lucide-react";
import { BrandLockup } from "@/components/brand/Logo";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Reports", href: "/dashboard/reports", icon: BarChart3 },
  { label: "Datasets", href: "/dashboard/datasets", icon: FileSpreadsheet },
  { label: "Team", href: "/dashboard/team", icon: Users },
];

const bottom = [
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
  { label: "Support", href: "#", icon: LifeBuoy },
];

export function DashboardSidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-[1px] lg:hidden"
          onClick={onClose}
          aria-hidden
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-line bg-white transition-transform duration-300 lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-line px-5">
          <Link href="/dashboard" aria-label="Dashboard home">
            <BrandLockup size="sm" />
          </Link>
          <button
            onClick={onClose}
            aria-label="Close sidebar"
            className="rounded-lg p-1.5 text-mist hover:bg-subtle lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          <p className="px-3 pb-2 pt-2 text-[11px] font-semibold uppercase tracking-wider text-mist">
            Workspace
          </p>
          {nav.map((item) => {
            const active =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-blue-50 text-blue"
                    : "text-mist hover:bg-subtle hover:text-ink"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-line p-3">
          {bottom.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-mist transition-colors hover:bg-subtle hover:text-ink"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
          <div className="mt-3 flex items-center gap-3 rounded-lg border border-line bg-subtle p-3">
            <div className="grid h-8 w-8 place-items-center rounded-full bg-blue text-xs font-semibold text-white">
              JR
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-ink">
                Jordan Rivera
              </p>
              <p className="truncate text-xs text-mist">jordan@acme.com</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
