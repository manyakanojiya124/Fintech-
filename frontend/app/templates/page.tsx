import { Suspense } from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TemplatesExplorer } from "@/components/templates/TemplatesExplorer";
import { Spinner } from "@/components/ui/spinner";

export const metadata: Metadata = {
  title: "Power BI Dashboard Templates",
  description:
    "Browse Fintech Services' gallery of interactive Power BI dashboard templates for finance, sales and operations teams.",
};

export default function TemplatesPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="bg-subtle pb-24 pt-32">
        <div className="container-page">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="eyebrow">Template library</span>
            <h1 className="mt-4 text-display-2 font-bold tracking-tight text-ink">
              Power BI dashboard templates
            </h1>
            <p className="mt-4 text-mist">
              Explore production-grade report examples across finance, sales and
              operations. Filter by category or search to find the right starting
              point.
            </p>
          </div>
          <Suspense
            fallback={
              <div className="flex justify-center py-24 text-mist">
                <Spinner />
              </div>
            }
          >
            <TemplatesExplorer />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
