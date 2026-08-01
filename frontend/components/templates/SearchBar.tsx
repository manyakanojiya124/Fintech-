"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";

export function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative flex-1">
      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-mist" />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search templates (e.g. Sales Dashboard, KPI Dashboard, Profit Analysis)"
        aria-label="Search dashboard templates"
        className="pl-11 pr-10"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-mist hover:text-ink focus-ring rounded-full"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
