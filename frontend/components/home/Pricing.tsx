"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { openBookDemo } from "@/components/forms/BookDemoModal";

const ease = [0.16, 1, 0.3, 1] as const;

const plans = [
  {
    name: "Starter",
    price: "$2,400",
    cadence: "per dashboard",
    blurb: "For teams shipping their first production Power BI report.",
    features: [
      "1 production dashboard",
      "Up to 3 data sources",
      "Standard DAX measures",
      "2 rounds of revisions",
      "Email support",
    ],
    cta: "Book a demo",
    highlighted: false,
  },
  {
    name: "Growth",
    price: "$6,800",
    cadence: "per month",
    blurb: "For finance teams scaling analytics across the business.",
    features: [
      "Up to 6 dashboards",
      "Unlimited data sources",
      "Row-level security",
      "Semantic model + documentation",
      "Weekly review cycles",
      "Priority support",
    ],
    cta: "Book a demo",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    cadence: "annual",
    blurb: "For organizations with governance and scale requirements.",
    features: [
      "Unlimited dashboards",
      "Center of Excellence enablement",
      "SSO + deployment pipelines",
      "Dedicated success lead",
      "SLA & on-site workshops",
    ],
    cta: "Talk to sales",
    highlighted: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="bg-subtle py-24">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="eyebrow">Pricing</span>
          <h2 className="mt-4 text-display-2 font-bold tracking-tight text-ink">
            Simple pricing that scales with you
          </h2>
          <p className="mt-4 text-mist">
            Transparent engagements, no hidden fees. Every plan includes
            production-grade data modeling and documentation.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={
                "relative flex flex-col rounded-2xl border bg-white p-7 " +
                (p.highlighted
                  ? "border-blue shadow-pop ring-1 ring-blue/20"
                  : "border-line shadow-card")
              }
            >
              {p.highlighted && (
                <Badge tone="red" className="absolute -top-3 left-7">
                  Most popular
                </Badge>
              )}
              <h3 className="text-base font-semibold tracking-tight text-ink">
                {p.name}
              </h3>
              <p className="mt-1 text-sm text-mist">{p.blurb}</p>
              <div className="mt-5 flex items-baseline gap-2">
                <span className="text-3xl font-bold tracking-tight text-ink">
                  {p.price}
                </span>
                <span className="text-sm text-mist">{p.cadence}</span>
              </div>
              <ul className="mt-6 flex-1 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-blue" />
                    <span className="text-ink/80">{f}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant={p.highlighted ? "primary" : "outline"}
                size="lg"
                className="mt-7 w-full"
                onClick={openBookDemo}
              >
                {p.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
