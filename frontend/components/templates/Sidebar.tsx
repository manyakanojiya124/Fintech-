"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { categories as allCategories, type Category } from "@/lib/templates-data";
import { SlidersHorizontal, Lock } from "lucide-react";

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
    <aside className="w-full shrink-0 lg:w-64">
      <div className="rounded-xl3 border border-line bg-white p-5">
        <div className="flex items-center gap-2 text-ink">
          <SlidersHorizontal className="h-4 w-4 text-blue" />
          <h2 className="text-sm font-semibold">Filters</h2>
        </div>

        <div className="mt-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-mist">
            Category
          </p>
          <ul className="mt-3 space-y-1">
            {allCategories.map((c) => (
              <li key={c}>
                <label
                  htmlFor={`cat-${c}`}
                  className="flex cursor-pointer items-center justify-between gap-3 rounded-lg px-2 py-2 text-sm text-ink transition-colors hover:bg-subtle"
                >
                  <span className="flex items-center gap-2.5">
                    <Checkbox
                      id={`cat-${c}`}
                      checked={active.includes(c)}
                      onCheckedChange={() => onToggle(c)}
                      aria-label={`Filter by ${c}`}
                    />
                    {c}
                  </span>
                  <span className="text-xs text-mist">{counts[c] ?? 0}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-5 border-t border-line pt-5">
          <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-mist">
            <Lock className="h-3 w-3" /> Coming soon
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {upcomingCategories.map((c) => (
              <Badge
                key={c}
                tone="neutral"
                className="cursor-not-allowed opacity-60"
              >
                {c}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
