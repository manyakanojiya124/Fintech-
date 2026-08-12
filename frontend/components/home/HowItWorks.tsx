"use client";

import { motion } from "framer-motion";
import {
  Search,
  PenLine,
  Gauge,
  Rocket,
} from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Discover",
    body: "We map your reporting stack, KPIs, and the decisions each dashboard needs to support.",
  },
  {
    icon: PenLine,
    step: "02",
    title: "Design",
    body: "Wireframes and a data model reviewed weekly, so stakeholders shape the final product.",
  },
  {
    icon: Gauge,
    step: "03",
    title: "Build",
    body: "Certified datasets, DAX measures, and row-level security implemented to production standard.",
  },
  {
    icon: Rocket,
    step: "04",
    title: "Launch",
    body: "Training, documentation, and a refresh schedule — then iteration based on real usage.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="bg-subtle py-24">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">How it works</span>
          <h2 className="mt-4 text-display-2 font-bold tracking-tight text-ink">
            From first call to boardroom report
          </h2>
          <p className="mt-4 text-mist">
            A predictable, four-step process that keeps finance, IT, and
            operations aligned from day one.
          </p>
        </div>

        <div className="relative mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease }}
              className="relative rounded-xl3 border border-line bg-white p-6"
            >
              <div className="flex items-center justify-between">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-blue">
                  <s.icon className="h-5 w-5" />
                </div>
                <span className="font-mono text-sm font-semibold text-line">
                  {s.step}
                </span>
              </div>
              <h3 className="mt-5 text-base font-semibold tracking-tight text-ink">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-mist">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
