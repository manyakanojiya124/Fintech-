"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  FileSpreadsheet,
  Gauge,
  LineChart,
  Calculator,
  Boxes,
} from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const capabilities = [
  { icon: BarChart3, label: "Interactive Power BI Dashboards" },
  { icon: FileSpreadsheet, label: "Financial Reporting" },
  { icon: Gauge, label: "Executive KPI Dashboards" },
  { icon: LineChart, label: "Sales Analytics" },
  { icon: Calculator, label: "Accounting Analytics" },
  { icon: Boxes, label: "Business Intelligence" },
];

export function PowerBICard() {
  return (
    <section id="services" className="bg-white py-24">
      <div className="container-page">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease }}
          >
            <span className="eyebrow">Featured service</span>
            <h2 className="mt-4 text-display-2 font-bold tracking-tight text-ink">
              Power BI dashboard &amp; analytics solutions
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-mist">
              From first data model to boardroom-ready report, we design and
              build Power BI solutions that make financial performance visible,
              explorable, and easy to act on.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {capabilities.map((c) => (
                <div
                  key={c.label}
                  className="flex items-center gap-3 rounded-xl border border-line bg-white px-4 py-3 transition-colors hover:border-blue/30 hover:bg-blue-50/40"
                >
                  <c.icon className="h-4.5 w-4.5 shrink-0 text-blue" />
                  <span className="text-sm font-medium text-ink">
                    {c.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="relative"
          >
            <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-blue/5 to-transparent blur-2xl" />
            <div className="card overflow-hidden">
              <div className="border-b border-line bg-subtle/60 px-5 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  <span className="ml-3 text-xs font-medium text-mist">
                    financial-summary.pbix
                  </span>
                </div>
              </div>
              <div className="space-y-4 p-5">
                <div className="grid grid-cols-3 gap-3">
                  {["Revenue", "EBIT", "Margin"].map((label, i) => (
                    <div
                      key={label}
                      className="rounded-xl border border-line p-3"
                    >
                      <p className="text-[10px] uppercase tracking-wider text-mist">
                        {label}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-ink">
                        {["$4.82M", "$1.24M", "38.6%"][i]}
                      </p>
                      <div className="mt-2 h-1.5 rounded-full bg-subtle">
                        <div
                          className="h-1.5 rounded-full bg-blue"
                          style={{ width: ["78%", "62%", "54%"][i] }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="rounded-xl border border-line p-4">
                  <div className="mb-3 flex items-center justify-between text-xs">
                    <span className="font-medium text-ink">
                      Revenue vs budget
                    </span>
                    <span className="text-mist">Last 8 months</span>
                  </div>
                  <div className="flex items-end gap-2" style={{ height: 120 }}>
                    {[46, 62, 54, 78, 70, 88, 82, 96].map((h, i) => (
                      <div key={i} className="flex flex-1 flex-col gap-1">
                        <div
                          className="w-full rounded-t bg-blue"
                          style={{ height: `${h}%` }}
                        />
                        <div
                          className="w-full rounded-b bg-line"
                          style={{ height: `${100 - h}%` }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-subtle px-4 py-3 text-xs text-mist">
                  <span>Refreshed 2 minutes ago</span>
                  <span className="font-semibold text-emerald-600">
                    ● Connected
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
