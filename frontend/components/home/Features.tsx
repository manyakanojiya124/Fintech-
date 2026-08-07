"use client";

import { motion } from "framer-motion";
import {
  LayoutTemplate,
  Zap,
  ShieldCheck,
  Repeat,
  BarChart3,
  Lock,
} from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const features = [
  {
    icon: LayoutTemplate,
    title: "Proven templates",
    body: "Start from a library of battle-tested dashboard patterns instead of a blank canvas, cutting design time in half.",
  },
  {
    icon: Zap,
    title: "Iterative delivery",
    body: "Weekly review cycles keep stakeholders aligned, so the final dashboard matches how your team actually works.",
  },
  {
    icon: ShieldCheck,
    title: "Secure by design",
    body: "Row-level security, refresh schedules, and access controls are configured from day one, not bolted on later.",
  },
  {
    icon: Repeat,
    title: "Built to evolve",
    body: "Clean semantic models and documented DAX mean new metrics and pages can be added without a rebuild.",
  },
  {
    icon: BarChart3,
    title: "Executive-ready",
    body: "Board-grade visual hierarchy and typography make every report feel considered, not exported.",
  },
  {
    icon: Lock,
    title: "Governed data",
    body: "Single source of truth, certified datasets, and audit-ready lineage across every report you publish.",
  },
];

export function Features() {
  return (
    <section id="features" className="bg-white py-24">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <span className="eyebrow">Why teams choose us</span>
          <h2 className="mt-4 text-display-2 font-bold tracking-tight text-ink">
            One discipline, engineered end to end
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-mist">
            Every engagement centers on Power BI dashboards that finance and
            operations teams actually use — designed for clarity, built for
            decisions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06, ease }}
              className="group rounded-xl3 border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-blue transition-colors group-hover:bg-blue group-hover:text-white">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-base font-semibold tracking-tight text-ink">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-mist">{f.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
