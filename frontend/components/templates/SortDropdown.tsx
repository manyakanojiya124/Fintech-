"use client";

import { ChevronDown } from "lucide-react";

export type SortOption = "featured" | "az" | "za" | "category";

const options: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "az", label: "Name: A to Z" },
  { value: "za", label: "Name: Z to A" },
  { value: "category", label: "Category" },
];

export function SortDropdown({
  value,
  onChange,
}: {
  value: SortOption;
  onChange: (v: SortOption) => void;
}) {
  return (
    <div className="relative shrink-0">
      <label htmlFor="sort" className="sr-only">
        Sort templates
      </label>
      <select
        id="sort"
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="h-11 w-full appearance-none rounded-xl border border-line bg-white pl-3.5 pr-9 text-sm text-ink outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue/10 sm:w-48"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            Sort: {o.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-mist" />
    </div>
  );
}
