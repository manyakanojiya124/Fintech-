import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { templates } from "@/lib/templates-data";

export function FeaturedTemplates() {
  const featured = templates.slice(0, 3);
  return (
    <section className="bg-white py-24">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <span className="eyebrow">Templates</span>
            <h2 className="mt-4 text-display-2 font-bold tracking-tight text-ink">
              Start from a dashboard that already works
            </h2>
            <p className="mt-4 text-mist">
              Browse a growing library of production-grade Power BI patterns
              across sales, accounting, operations, and more.
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/templates">
              View all templates <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {featured.map((t) => (
            <Link
              key={t.slug}
              href={`/templates/${t.slug}`}
              className="group flex flex-col overflow-hidden rounded-xl3 border border-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-subtle">
                <Image
                  src={t.image}
                  alt={`${t.title} preview`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <Badge tone="blue">{t.category}</Badge>
                <h3 className="mt-3 text-base font-semibold tracking-tight text-ink">
                  {t.title}
                </h3>
                <p className="mt-1.5 line-clamp-2 flex-1 text-sm leading-relaxed text-mist">
                  {t.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-blue">
                  View template
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
