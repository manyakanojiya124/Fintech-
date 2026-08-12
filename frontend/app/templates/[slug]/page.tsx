import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Check,
  Cpu,
  Briefcase,
  ArrowUpRight,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { BookDemoButton } from "@/components/forms/BookDemoButton";
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
  return { title: template.title, description: template.description };
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
      <main id="main-content" className="bg-subtle pb-24 pt-28">
        <div className="container-page">
          <Link
            href="/templates"
            className="inline-flex items-center gap-2 rounded-lg px-2 py-1 text-sm font-medium text-mist transition-colors hover:bg-white hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" /> Back to templates
          </Link>

          <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <div className="card overflow-hidden">
                <div className="flex items-center gap-2 border-b border-line bg-subtle/60 px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-red/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  <span className="ml-3 text-xs font-medium text-mist">
                    {template.title} — Live Preview
                  </span>
                </div>
                <div className="relative aspect-[16/9] bg-subtle">
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

              <section className="mt-10">
                <h2 className="text-lg font-semibold tracking-tight text-ink">
                  About this dashboard
                </h2>
                <p className="mt-3 leading-relaxed text-mist">
                  {template.longDescription}
                </p>
              </section>

              <section className="mt-10">
                <h2 className="text-lg font-semibold tracking-tight text-ink">
                  Key features
                </h2>
                <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {template.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2.5 rounded-xl border border-line bg-white p-4 text-sm text-ink"
                    >
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-blue-50 text-blue">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="mt-10">
                <h2 className="flex items-center gap-2 text-lg font-semibold tracking-tight text-ink">
                  <Briefcase className="h-4 w-4 text-blue" /> Business use case
                </h2>
                <p className="mt-3 leading-relaxed text-mist">
                  {template.useCase}
                </p>
              </section>
            </div>

            <aside className="h-max lg:sticky lg:top-24">
              <div className="card p-6">
                <Badge tone={categoryTone(template.category)}>
                  {template.category}
                </Badge>
                <h1 className="mt-4 text-xl font-bold tracking-tight text-ink">
                  {template.title}
                </h1>
                <p className="mt-2 text-sm leading-relaxed text-mist">
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

                <BookDemoButton fullWidth className="mt-7" />
                <Link
                  href="/templates"
                  className="mt-3 inline-flex w-full items-center justify-center gap-1.5 text-sm font-semibold text-mist hover:text-ink"
                >
                  Browse more templates
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </aside>
          </div>

          {related.length > 0 && (
            <section className="mt-20">
              <h2 className="text-xl font-bold tracking-tight text-ink">
                More {template.category} dashboards
              </h2>
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((t, i) => (
                  <TemplateCard key={t.slug} template={t} index={i} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
