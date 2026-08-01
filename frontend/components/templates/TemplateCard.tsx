"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Eye, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { categoryTone } from "@/lib/category-tone";
import type { DashboardTemplate } from "@/lib/templates-data";

export function TemplateCard({
  template,
  index,
}: {
  template: DashboardTemplate;
  index: number;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.35), ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col overflow-hidden rounded-xl2 border border-line bg-white shadow-[0_16px_40px_-32px_rgba(20,22,31,0.25)] transition-all duration-500 hover:-translate-y-1.5 hover:border-orange/30 hover:shadow-[0_28px_60px_-28px_rgba(255,90,31,0.28)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-subtle">
        <Image
          src={template.image}
          alt={`${template.title} — Power BI dashboard preview`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 flex items-center justify-center gap-3 bg-ink/0 opacity-0 backdrop-blur-0 transition-all duration-300 group-hover:bg-ink/45 group-hover:opacity-100 group-hover:backdrop-blur-[1px]">
          <Link
            href={`/templates/${template.slug}`}
            className="flex items-center gap-1.5 rounded-full bg-white/95 px-4 py-2 text-xs font-semibold text-ink transition-transform hover:scale-105"
          >
            <Eye className="h-3.5 w-3.5" /> Preview
          </Link>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center justify-between gap-2">
          <Badge tone={categoryTone(template.category)}>{template.category}</Badge>
        </div>
        <h3 className="font-display text-lg leading-snug text-ink">
          {template.title}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-mist">
          {template.description}
        </p>

        <Link
          href={`/templates/${template.slug}`}
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-orange transition-colors hover:text-orange-dim focus-ring rounded-md"
        >
          View Details <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </motion.div>
  );
}
