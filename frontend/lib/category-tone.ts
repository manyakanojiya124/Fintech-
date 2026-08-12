import type { Category } from "@/lib/templates-data";

type Tone = "blue" | "red" | "neutral";

const toneMap: Record<Category, Tone> = {
  Sales: "blue",
  Marketing: "red",
  HR: "neutral",
  Accounting: "blue",
  Banking: "blue",
  Operations: "neutral",
  Retail: "red",
  Media: "neutral",
};

export function categoryTone(category: Category): Tone {
  return toneMap[category] ?? "neutral";
}
