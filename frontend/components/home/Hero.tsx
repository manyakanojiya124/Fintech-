"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  CalendarCheck,
  Sparkles,
  Play,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { CountUp } from "@/components/home/CountUp";
import { DashboardPreview } from "@/components/home/DashboardPreview";
import { HeroBackgroundSlideshow } from "@/components/home/HeroBackgroundSlideshow";
import { openBookDemo } from "@/components/forms/BookDemoModal";

const ease = [0.16, 1, 0.3, 1] as const;

const stats = [
  { label: "Dashboards shipped", to: 180, suffix: "+" },
  { label: "Client industries", to: 12, suffix: "" },
  { label: "Avg. build time", to: 3.5, decimals: 1, suffix: " wks" },
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#dff1ff] text-white">
      {/* =====================================================
          BACKGROUND SLIDESHOW
          ===================================================== */}
      <HeroBackgroundSlideshow />

      {/* =====================================================
          VERY LIGHT TOP FADE
          ===================================================== */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-20 h-28 bg-gradient-to-b from-[#dff1ff]/35 to-transparent"
      />

      {/* =====================================================
          BOTTOM TRANSITION
          ===================================================== */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-40 bg-gradient-to-b from-transparent via-[#eaf6ff]/60 to-white"
      />

      {/* =====================================================
          HERO CONTENT
          ===================================================== */}
      <div className="container-page relative z-30">
        <div className="mx-auto max-w-4xl pt-36 text-center sm:pt-44 lg:pt-52">

          {/* =================================================
              GLASS CONTENT PANEL
              ================================================= */}
        
            {/* Soft glow behind content */}
            <div
              aria-hidden
              className="
                pointer-events-none
                absolute
                -inset-8
                -z-10
                rounded-[3rem]
                bg-blue-400/20
                blur-3xl
              "
            />

            {/* =================================================
                BADGE
                ================================================= */}
            

            {/* =================================================
                HEADING
                ================================================= */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.06, ease }}
              className="
                mt-7
                text-balance
                text-display-1
                font-bold
                tracking-tight
                text-white
                [text-shadow:0_4px_20px_rgba(0,0,0,0.45)]
              "
            >
              Financial data, told as a{" "}
              <span
                className="
                  relative
                  whitespace-nowrap
                  text-[#8ec5ff]
                  [text-shadow:0_3px_16px_rgba(0,0,0,0.35)]
                "
              >
                story worth acting on

                <svg
                  aria-hidden
                  viewBox="0 0 318 12"
                  className="absolute -bottom-1 left-0 h-2.5 w-full text-[#8ec5ff]/70"
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

            {/* =================================================
                DESCRIPTION
                ================================================= */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.14, ease }}
              className="
                mx-auto
                mt-7
                max-w-2xl
                text-balance
                text-lg
                leading-relaxed
                text-white/90
                [text-shadow:0_2px_12px_rgba(0,0,0,0.35)]
              "
            >
              Fintech Services designs and builds interactive Power BI
              dashboards and analytics solutions that turn raw financial data
              into decisions your team can trust.
            </motion.p>

            {/* =================================================
                CTA BUTTONS
                ================================================= */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.22, ease }}
              className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
            >
              <Button
                size="lg"
                onClick={openBookDemo}
                aria-haspopup="dialog"
                className="
                  border border-blue-400/40
                  bg-blue-600
                  px-6
                  text-white
                  shadow-[0_12px_30px_-8px_rgba(37,99,235,0.75)]
                  transition-all
                  hover:-translate-y-0.5
                  hover:bg-blue-700
                  hover:shadow-[0_16px_35px_-8px_rgba(37,99,235,0.85)]
                "
              >
                <CalendarCheck className="h-4 w-4" />

                Book a demo

                <ArrowUpRight className="h-4 w-4" />
              </Button>

              <Button
                size="lg"
                asChild
                className="
                  border
                  border-white/40
                  bg-white/15
                  px-6
                  text-white
                  shadow-[0_8px_25px_rgba(0,0,0,0.12)]
                  backdrop-blur-md
                  transition-all
                  hover:-translate-y-0.5
                  hover:border-white/60
                  hover:bg-white/25
                "
              >
                <Link href="/templates">
                  <Play className="h-4 w-4" />

                  Browse templates
                </Link>
              </Button>
            </motion.div>

            {/* =================================================
                TRUST LINE
                ================================================= */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.32 }}
              className="
                mt-5
                text-xs
                text-white/70
                [text-shadow:0_2px_8px_rgba(0,0,0,0.3)]
              "
            >
              No credit card required · 30-minute tailored walkthrough
            </motion.p>
     
        </div>

        {/* =====================================================
            DASHBOARD PREVIEW
            ===================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.28, ease }}
          className="relative mx-auto mt-16 max-w-5xl pb-20"
        >
          {/* Blue glow */}
          <div
            aria-hidden
            className="
              absolute
              -inset-x-10
              -top-10
              -bottom-6
              -z-10
              rounded-[3rem]
              bg-blue-500/25
              blur-3xl
            "
          />

          {/* Dashboard frame */}
          <div
            className="
              overflow-hidden
              rounded-2xl
              border
              border-white/70
              bg-white
              p-2
              shadow-[0_40px_100px_-30px_rgba(7,30,61,0.55)]
            "
          >
            <DashboardPreview />
          </div>
        </motion.div>

        {/* =====================================================
            STATS
            ===================================================== */}
        <motion.dl
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
          className="
            relative
            z-40
            mx-auto
            -mt-4
            grid
            max-w-2xl
            grid-cols-3
            divide-x
            divide-line
            rounded-2xl
            border
            border-line
            bg-white
            shadow-[0_20px_50px_-20px_rgba(7,30,61,0.25)]
          "
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="px-4 py-6 text-center"
            >
              <dt className="text-xs text-mist sm:text-sm">
                {s.label}
              </dt>

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