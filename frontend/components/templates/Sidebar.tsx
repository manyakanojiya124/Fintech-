"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { categories as allCategories, type Category } from "@/lib/templates-data";
import { SlidersHorizontal, Lock } from "lucide-react";

// Verticals we're actively building out next — shown for context on how far
// the filter set will grow, disabled until templates are published for them.
const upcomingCategories = ["Healthcare", "Manufacturing", "Government"];

export function Sidebar({
  active,
  onToggle,
  counts,
}: {
  active: Category[];
  onToggle: (category: Category) => void;
  counts: Record<Category, number>;
}) {
  return (
    <aside className="sticky top-28 h-max w-full shrink-0 rounded-xl2 border border-line bg-white p-6 shadow-[0_16px_40px_-32px_rgba(20,22,31,0.2)] lg:w-72">
      <div className="flex items-center gap-2 text-ink">
        <SlidersHorizontal className="h-4 w-4 text-orange" />
        <h2 className="font-display text-base">Filters</h2>
      </div>

      <div className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-mist">
          Category
        </p>
        <ul className="mt-3 space-y-3">
          {allCategories.map((c) => (
            <li key={c} className="flex items-center justify-between gap-3">
              <label
                htmlFor={`cat-${c}`}
                className="flex flex-1 items-center gap-3 text-sm text-ink"
              >
                <Checkbox
                  id={`cat-${c}`}
                  checked={active.includes(c)}
                  onCheckedChange={() => onToggle(c)}
                  aria-label={`Filter by ${c}`}
                />
                {c}
              </label>
              <span className="text-xs text-mist">{counts[c] ?? 0}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 border-t border-line pt-6">
        <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-mist">
          <Lock className="h-3 w-3" /> Coming soon
        </p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {upcomingCategories.map((c) => (
            <Badge key={c} tone="neutral" className="cursor-not-allowed opacity-60">
              {c}
            </Badge>
          ))}
        </ul>
      </div>
    </aside>
  );
}
