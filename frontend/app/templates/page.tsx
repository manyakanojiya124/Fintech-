import { Suspense } from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TemplatesExplorer } from "@/components/templates/TemplatesExplorer";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Power BI Dashboard Templates",
  description:
    "Browse Fintech Services' gallery of interactive Power BI dashboard templates for Sales and Accounting teams.",
};

export default function TemplatesPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="pt-36 pb-24">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            
            <h1 className="mt-4 font-display text-4xl font-medium text-ink sm:text-5xl">
              Power BI dashboard templates
            </h1>
            <p className="mt-4 text-mist">
              Explore interactive report examples for sales and accounting
              teams. Filter by category or search to find the right starting
              point for your next dashboard.
            </p>
          </div>

          <Suspense fallback={<div className="text-center text-mist">Loading templates…</div>}>
            <TemplatesExplorer />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
