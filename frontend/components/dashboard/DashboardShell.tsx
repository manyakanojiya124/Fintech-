"use client";

import { useState } from "react";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardTopbar } from "@/components/dashboard/DashboardTopbar";
import { DashboardBackground } from "@/components/dashboard/DashboardBackground";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative min-h-screen">
      {/* Subtle data-viz canvas — sits behind everything, fixed, aria-hidden */}
      <DashboardBackground />

      <DashboardSidebar open={open} onClose={() => setOpen(false)} />
      <div className="lg:pl-64">
        <DashboardTopbar onMenu={() => setOpen(true)} />
        <main className="relative p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
