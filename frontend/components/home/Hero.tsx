"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, CalendarCheck, Sparkles, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CountUp } from "@/components/home/CountUp";
import { DashboardPreview } from "@/components/home/DashboardPreview";
import { openBookDemo } from "@/components/forms/BookDemoModal";

const ease = [0.16, 1, 0.3, 1] as const;

const stats = [
  { label: "Dashboards shipped", to: 180, suffix: "+" },
  { label: "Client industries", to: 12, suffix: "" },
  { label: "Avg. build time", to: 3.5, decimals: 1, suffix: " wks" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 lg:pt-44">
      {/* Subtle background: soft grid + two low-key tints (no generic gradients) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-subtle"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[640px] bg-[radial-gradient(60%_50%_at_50%_0%,rgba(21,101,192,0.08),transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.5] [background-image:linear-gradient(to_right,rgba(17,24,39,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(17,24,39,0.04)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_0%,black,transparent)]"
      />

      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="flex justify-center"
          >
            <span className="eyebrow">
              <Sparkles className="h-3.5 w-3.5" />
              Power BI dashboards for finance teams
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.06, ease }}
            className="mt-6 text-balance text-display-1 font-bold tracking-tight text-ink"
          >
            Financial data, told as a{" "}
            <span className="relative whitespace-nowrap text-blue">
              story worth acting on
              <svg
                aria-hidden
                viewBox="0 0 318 12"
                className="absolute -bottom-1 left-0 h-2.5 w-full text-blue/25"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 9C80 3 238 3 316 7"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            .
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.14, ease }}
            className="mx-auto mt-6 max-w-xl text-balance text-lg leading-relaxed text-mist"
          >
            Fintech Services designs and builds interactive Power BI dashboards
            and analytics solutions that turn raw financial data into decisions
            your team can trust.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22, ease }}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button size="lg" onClick={openBookDemo} aria-haspopup="dialog">
              <CalendarCheck className="h-4 w-4" /> Book a demo
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/templates">
                <Play className="h-4 w-4" /> Browse templates
              </Link>
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.32 }}
            className="mt-4 text-xs text-mist"
          >
            No credit card required · 30-minute tailored walkthrough
          </motion.p>
        </div>

        {/* Dashboard preview */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.28, ease }}
          className="relative mx-auto mt-16 max-w-5xl"
        >
          <div className="absolute -inset-x-10 -top-8 -bottom-8 -z-10 rounded-[2rem] bg-gradient-to-b from-blue/5 to-transparent blur-2xl" />
          <div className="rounded-2xl border border-line bg-white p-2 shadow-pop">
            <DashboardPreview />
          </div>
        </motion.div>

        {/* Stats */}
        <motion.dl
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
          className="mx-auto mt-16 grid max-w-2xl grid-cols-3 divide-x divide-line rounded-2xl border border-line bg-white"
        >
          {stats.map((s) => (
            <div key={s.label} className="px-4 py-6 text-center">
              <dt className="text-xs text-mist sm:text-sm">{s.label}</dt>
              <dd className="mt-1.5 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                <CountUp
                  to={s.to}
                  suffix={s.suffix}
                  decimals={s.decimals ?? 0}
                />
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
