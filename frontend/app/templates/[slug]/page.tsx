import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, Cpu, Briefcase, CalendarCheck } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TemplateCard } from "@/components/templates/TemplateCard";
import { categoryTone } from "@/lib/category-tone";
import { templates, getTemplateBySlug } from "@/lib/templates-data";

export function generateStaticParams() {
  return templates.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const template = getTemplateBySlug(slug);
  if (!template) return {};
  return {
    title: template.title,
    description: template.description,
  };
}

export default async function TemplateDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const template = getTemplateBySlug(slug);
  if (!template) notFound();

  const related = templates
    .filter((t) => t.category === template.category && t.slug !== template.slug)
    .slice(0, 3);

  return (
    <>
      <Navbar />
      <main id="main-content" className="pb-28 pt-36">
        <div className="container">
          <Link
            href="/templates"
            className="inline-flex items-center gap-2 text-sm font-medium text-mist transition-colors hover:text-orange focus-ring rounded-md"
          >
            <ArrowLeft className="h-4 w-4" /> Back to templates
          </Link>

          <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <div className="overflow-hidden rounded-xl2 border border-line bg-white shadow-[0_20px_50px_-35px_rgba(20,22,31,0.25)]">
                <div className="flex items-center gap-2 border-b border-line px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#F2555F]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-navy" />
                  <span className="h-2.5 w-2.5 rounded-full bg-orange" />
                  <span className="ml-3 text-xs font-medium text-mist">
                    {template.title} — Live Preview
                  </span>
                </div>
                <div className="relative aspect-[16/9] overflow-hidden bg-subtle">
                  <Image
                    src={template.image}
                    alt={`${template.title} — Power BI dashboard preview`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover object-top"
                  />
                </div>
              </div>

              <div className="mt-10">
                <h2 className="font-display text-xl text-ink">About this dashboard</h2>
                <p className="mt-3 leading-relaxed text-mist">
                  {template.longDescription}
                </p>
              </div>

              <div className="mt-10">
                <h2 className="font-display text-xl text-ink">Key features</h2>
                <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {template.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2.5 rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-orange" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10">
                <h2 className="flex items-center gap-2 font-display text-xl text-ink">
                  <Briefcase className="h-4.5 w-4.5 text-navy" /> Business use case
                </h2>
                <p className="mt-3 leading-relaxed text-mist">{template.useCase}</p>
              </div>
            </div>

            <aside className="h-max lg:sticky lg:top-28">
              <div className="rounded-xl2 border border-line bg-white p-7 shadow-[0_20px_50px_-35px_rgba(20,22,31,0.2)]">
                <Badge tone={categoryTone(template.category)}>{template.category}</Badge>
                <h1 className="mt-4 font-display text-2xl text-ink">
                  {template.title}
                </h1>
                <p className="mt-3 text-sm leading-relaxed text-mist">
                  {template.description}
                </p>

                <div className="mt-6 border-t border-line pt-6">
                  <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-mist">
                    <Cpu className="h-3.5 w-3.5" /> Technologies used
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {template.technologies.map((t) => (
                      <Badge key={t} tone="neutral">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button className="mt-8 w-full" size="lg" asChild>
                  <a href="mailto:hello@fintechservices.example.com?subject=Book%20a%20Demo">
                    <CalendarCheck className="h-4 w-4" /> Book a Demo
                  </a>
                </Button>
              </div>
            </aside>
          </div>

          {related.length > 0 && (
            <div className="mt-24">
              <h2 className="font-display text-2xl text-ink">
                More {template.category} dashboards
              </h2>
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((t, i) => (
                  <TemplateCard key={t.slug} template={t} index={i} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
