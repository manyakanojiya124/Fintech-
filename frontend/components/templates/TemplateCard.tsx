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
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{
        duration: 0.4,
        delay: Math.min(index * 0.04, 0.3),
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group flex flex-col overflow-hidden rounded-xl3 border border-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
    >
      <Link
        href={`/templates/${template.slug}`}
        className="relative block aspect-[16/10] overflow-hidden bg-subtle"
      >
        <Image
          src={template.image}
          alt={`${template.title} — Power BI dashboard preview`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-ink/0 opacity-0 transition-all duration-300 group-hover:bg-ink/40 group-hover:opacity-100">
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3.5 py-2 text-xs font-semibold text-ink shadow-sm">
            <Eye className="h-3.5 w-3.5" /> Preview
          </span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <Badge tone={categoryTone(template.category)}>
          {template.category}
        </Badge>
        <h3 className="mt-3 text-base font-semibold tracking-tight text-ink">
          {template.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 flex-1 text-sm leading-relaxed text-mist">
          {template.description}
        </p>
        <Link
          href={`/templates/${template.slug}`}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-blue transition-colors hover:text-blue-700"
        >
          View details
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </motion.div>
  );
}
