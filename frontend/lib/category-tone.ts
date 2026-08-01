import type { Category } from "@/lib/templates-data";

const toneMap: Record<Category, "orange" | "navy" | "slate"> = {
  Sales: "orange",
  Marketing: "orange",
  HR: "orange",
  Accounting: "navy",
  Banking: "navy",
  Operations: "slate",
  Retail: "slate",
  Media: "slate",
};

export function categoryTone(category: Category) {
  return toneMap[category] ?? "neutral";
}
