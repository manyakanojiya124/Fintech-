"use client";

import { AnimatePresence } from "framer-motion";
import { SearchX } from "lucide-react";
import { TemplateCard } from "@/components/templates/TemplateCard";
import type { DashboardTemplate } from "@/lib/templates-data";

export function TemplateGrid({ items }: { items: DashboardTemplate[] }) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl2 border border-dashed border-line py-24 text-center">
        <SearchX className="h-8 w-8 text-mist" />
        <p className="mt-4 font-display text-lg text-ink">No templates found</p>
        <p className="mt-1 max-w-xs text-sm text-mist">
          Try a different search term or clear a filter to see more dashboard
          templates.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      <AnimatePresence mode="popLayout">
        {items.map((t, i) => (
          <TemplateCard key={t.slug} template={t} index={i} />
        ))}
      </AnimatePresence>
    </div>
  );
}
