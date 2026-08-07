"use client";

import Link from "next/link";
import { Menu, Search, Bell, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { openBookDemo } from "@/components/forms/BookDemoModal";

export function DashboardTopbar({ onMenu }: { onMenu: () => void }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-line bg-white/85 px-4 backdrop-blur-md sm:px-6">
      <button
        onClick={onMenu}
        aria-label="Open sidebar"
        className="grid h-9 w-9 place-items-center rounded-lg text-mist hover:bg-subtle lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="relative hidden flex-1 max-w-md sm:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-mist" />
        <input
          type="search"
          placeholder="Search reports, datasets…"
          aria-label="Search"
          className="h-9 w-full rounded-lg border border-line bg-subtle pl-9 pr-3 text-sm text-ink placeholder:text-mist outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue/10"
        />
      </div>

      <div className="flex flex-1 items-center justify-end gap-2 sm:flex-none">
        <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
          <Bell className="h-4.5 w-4.5" />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-red ring-2 ring-white" />
        </Button>
        <Button variant="outline" size="sm" asChild className="hidden sm:inline-flex">
          <Link href="/">View site</Link>
        </Button>
        <Button size="sm" onClick={openBookDemo}>
          <Plus className="h-4 w-4" /> New report
        </Button>
      </div>
    </header>
  );
}
