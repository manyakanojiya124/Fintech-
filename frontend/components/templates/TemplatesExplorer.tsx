"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Sidebar } from "@/components/templates/Sidebar";
import { SearchBar } from "@/components/templates/SearchBar";
import { SortDropdown, type SortOption } from "@/components/templates/SortDropdown";
import { TemplateGrid } from "@/components/templates/TemplateGrid";
import { templates, categories as allCategories, type Category } from "@/lib/templates-data";

export function TemplatesExplorer() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") as Category | null;

  const [active, setActive] = useState<Category[]>(
    initialCategory && allCategories.includes(initialCategory)
      ? [initialCategory]
      : []
  );
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortOption>("featured");

  const counts = useMemo(() => {
    const result = {} as Record<Category, number>;
    for (const c of allCategories) {
      result[c] = templates.filter((t) => t.category === c).length;
    }
    return result;
  }, []);

  const filtered = useMemo(() => {
    let list = templates;

    if (active.length > 0) {
      list = list.filter((t) => active.includes(t.category));
    }

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q)
      );
    }

    const sorted = [...list];
    if (sort === "az") sorted.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "za") sorted.sort((a, b) => b.title.localeCompare(a.title));
    if (sort === "category")
      sorted.sort((a, b) => a.category.localeCompare(b.category));

    return sorted;
  }, [active, query, sort]);

  function toggleCategory(category: Category) {
    setActive((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  }

  return (
    <div className="flex flex-col gap-8 lg:flex-row">
      <Sidebar active={active} onToggle={toggleCategory} counts={counts} />

      <div className="flex-1">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-3 sm:flex-row"
        >
          <SearchBar value={query} onChange={setQuery} />
          <SortDropdown value={sort} onChange={setSort} />
        </motion.div>

        <p className="mt-5 text-sm text-mist">
          Showing <span className="text-ink">{filtered.length}</span> of{" "}
          {templates.length} templates
        </p>

        <div className="mt-6">
          <TemplateGrid items={filtered} />
        </div>
      </div>
    </div>
  );
}
