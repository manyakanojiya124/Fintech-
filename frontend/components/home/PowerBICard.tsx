"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  BarChart3,
  FileSpreadsheet,
  Gauge,
  LineChart,
  Calculator,
  Boxes,
  ArrowUpRight,
  CalendarCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const capabilities = [
  { icon: BarChart3, label: "Interactive Power BI Dashboards" },
  { icon: FileSpreadsheet, label: "Financial Reporting" },
  { icon: Gauge, label: "Executive KPI Dashboards" },
  { icon: LineChart, label: "Sales Analytics" },
  { icon: Calculator, label: "Accounting Analytics" },
  { icon: Boxes, label: "Business Intelligence Solutions" },
];

const ease = [0.16, 1, 0.3, 1] as const;

export function PowerBICard() {
  return (
    <section id="services" className="relative py-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange">
            What we build
          </p>
          <h2 className="mt-3 font-display text-3xl font-medium text-ink sm:text-4xl">
            One discipline, mastered end to end.
          </h2>
          <p className="mt-4 text-mist">
            Every engagement centers on one thing: Power BI dashboards that
            finance and operations teams actually use.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease }}
          whileHover={{ y: -3 }}
          className="relative mx-auto max-w-4xl overflow-hidden rounded-xl2 border border-line bg-gradient-to-br from-subtle to-white p-8 shadow-[0_30px_70px_-45px_rgba(20,22,31,0.25)] transition-shadow duration-500 hover:shadow-[0_40px_90px_-40px_rgba(255,90,31,0.22)] sm:p-12"
        >
          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-orange/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-navy/8 blur-3xl" />

          <div className="relative flex flex-col gap-10 md:flex-row md:items-center">
            <div className="md:w-1/2">
              <Badge tone="navy">Featured Service</Badge>
              <h3 className="mt-4 font-display text-2xl text-ink sm:text-3xl">
                Power BI Dashboard &amp; Analytics Solutions
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-mist sm:text-base">
                From first data model to boardroom-ready report, we design
                and build Power BI solutions that make financial performance
                visible, explorable, and easy to act on.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/templates">
                    Learn More <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="secondary" asChild>
                  <Link href="/#cta">
                    <CalendarCheck className="h-4 w-4" /> Book a Demo
                  </Link>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:w-1/2">
              {capabilities.map((c, i) => (
                <motion.div
                  key={c.label}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease }}
                  className="flex items-center gap-3 rounded-xl border border-line bg-white px-4 py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-orange/30 hover:bg-orange-soft hover:shadow-[0_10px_24px_-12px_rgba(255,90,31,0.3)]"
                >
                  <c.icon className="h-4.5 w-4.5 shrink-0 text-orange" />
                  <span className="text-sm font-medium text-ink">{c.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
