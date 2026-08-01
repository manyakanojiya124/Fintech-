"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Zap, LayoutTemplate, Repeat } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const features = [
  {
    icon: LayoutTemplate,
    title: "Built on proven templates",
    body: "Start from a library of pre-built dashboard patterns instead of a blank canvas, cutting design time significantly.",
  },
  {
    icon: Zap,
    title: "Fast, iterative delivery",
    body: "Weekly review cycles keep stakeholders aligned, so the final dashboard matches how your team actually works.",
  },
  {
    icon: ShieldCheck,
    title: "Governed & secure by design",
    body: "Row-level security, refresh schedules, and access controls are configured from day one, not bolted on later.",
  },
  {
    icon: Repeat,
    title: "Built to evolve",
    body: "Clean semantic models and documented DAX mean new metrics and pages can be added without a rebuild.",
  },
];

export function Features() {
  return (
    <section className="relative border-y border-line bg-subtle/60 py-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease }}
          className="mx-auto mb-14 max-w-xl text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-navy">
            How we work
          </p>
          <h2 className="mt-3 font-display text-3xl font-medium text-ink sm:text-4xl">
            A process built for finance teams.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: i * 0.08, ease }}
              className="group rounded-xl2 border border-line bg-white p-7 shadow-[0_20px_45px_-35px_rgba(20,22,31,0.2)] transition-all duration-500 hover:-translate-y-1.5 hover:border-orange/30 hover:shadow-[0_25px_55px_-30px_rgba(255,90,31,0.28)]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-soft text-orange transition-colors group-hover:bg-orange group-hover:text-white">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-lg text-ink">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mist">{f.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
