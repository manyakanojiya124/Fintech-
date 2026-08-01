"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, CalendarCheck, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CountUp } from "@/components/home/CountUp";
import gsap from "gsap";

const stats = [
  { label: "Dashboards shipped", to: 180, suffix: "+" },
  { label: "Client industries", to: 12, suffix: "" },
  { label: "Avg. build time", to: 3.5, decimals: 1, suffix: " wks" },
];

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      video.pause();
    } else {
      video.play().catch(() => {
        /* autoplay can be blocked before user interaction; safe to ignore */
      });
    }
  }, []);

  useEffect(() => {
    const path = pathRef.current;
    const dot = dotRef.current;
    if (!path || !dot) return;

    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.8 });
    tl.to(path, {
      strokeDashoffset: 0,
      duration: 3.4,
      ease: "power2.inOut",
    });

    // Manual point-follow (no MotionPathPlugin dependency): sample path each tick
    const proxy = { d: 0 };
    const dotTween = gsap.to(proxy, {
      d: 1,
      duration: 3.4,
      repeat: -1,
      repeatDelay: 0.8,
      ease: "power2.inOut",
      onUpdate: () => {
        const pt = path.getPointAtLength(proxy.d * length);
        dot.setAttribute("cx", String(pt.x));
        dot.setAttribute("cy", String(pt.y));
      },
    });

    return () => {
      tl.kill();
      dotTween.kill();
    };
  }, []);

  return (
    <section className="relative isolate overflow-hidden pb-24 pt-40 md:pt-48">
      {/* Looping background video, softened through a white overlay */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src="/videos/hero-b.mp4"
          poster="/videos/hero-bg-poste.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        {/* White wash so the footage reads as texture, not a distraction */}
        <div className="absolute inset-0 bg-white/82" />
        {/* Fade the video out completely toward the bottom so it blends into the page */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/60 to-white" />
      </div>

      <div className="pointer-events-none absolute inset-0 z-[1] grid-canvas [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[560px] bg-radial-glow" />

      <div className="container relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          
            

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="mt-6 font-display text-4xl font-medium leading-[1.08] text-ink sm:text-6xl"
          >
            Financial data, told as a{" "}
            <span className="text-gradient italic">story worth acting on.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.22, ease }}
            className="mx-auto mt-6 max-w-xl text-balance text-base leading-relaxed text-mist sm:text-lg"
          >
            Fintech Services (FSR) designs and builds interactive Power BI
            dashboards, executive reporting, and analytics solutions that turn
            raw financial data into decisions your team can trust.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.34, ease }}
            className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button size="lg" asChild>
              <Link href="/#cta">
                <CalendarCheck className="h-4 w-4" /> Book a Demo
              </Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/templates">
                Browse Templates <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Animated dashboard canvas */}
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.42, ease }}
          whileHover={{ y: -4 }}
          className="glass relative mx-auto mt-20 max-w-5xl overflow-hidden rounded-xl2 p-2 shadow-[0_40px_90px_-40px_rgba(20,22,31,0.35)] transition-shadow duration-500 hover:shadow-[0_50px_110px_-40px_rgba(255,90,31,0.28)]"
        >
          <div className="flex items-center gap-2 border-b border-line px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#F2555F]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#F2B705]" />
            <span className="h-2.5 w-2.5 rounded-full bg-orange" />
            <span className="ml-3 text-xs font-medium text-mist">
              FSR Executive KPI Dashboard — Live Preview
            </span>
          </div>

          <div className="grid grid-cols-1 gap-px bg-line md:grid-cols-3">
            {[
              { label: "Total Revenue", value: "$4.82M", delta: "+12.4%" },
              { label: "Gross Margin", value: "38.6%", delta: "+2.1pt" },
              { label: "Open Pipeline", value: "$1.14M", delta: "+8.9%" },
            ].map((s) => (
              <div key={s.label} className="bg-white px-6 py-5">
                <p className="text-xs uppercase tracking-wider text-mist">{s.label}</p>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="font-display text-2xl text-ink">{s.value}</span>
                  <span className="text-xs font-semibold text-orange">{s.delta}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-6">
            <svg viewBox="0 0 800 220" className="h-[220px] w-full">
              <defs>
                <linearGradient id="hero-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FF5A1F" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#FF5A1F" stopOpacity="0" />
                </linearGradient>
              </defs>
              {Array.from({ length: 6 }).map((_, i) => (
                <line
                  key={i}
                  x1="0"
                  x2="800"
                  y1={36 * i + 10}
                  y2={36 * i + 10}
                  stroke="rgba(20,22,31,0.06)"
                />
              ))}
              <path
                ref={pathRef}
                d="M10,150 C80,140 120,60 200,80 C280,100 320,180 400,140 C480,100 520,40 600,60 C680,80 720,130 790,90"
                fill="none"
                stroke="#FF5A1F"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <path
                d="M10,150 C80,140 120,60 200,80 C280,100 320,180 400,140 C480,100 520,40 600,60 C680,80 720,130 790,90 L790,220 L10,220 Z"
                fill="url(#hero-fill)"
              />
              <circle ref={dotRef} r="6" fill="#1B2437" stroke="#ffffff" strokeWidth="2" />
            </svg>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
          className="mx-auto mt-14 grid max-w-2xl grid-cols-3 gap-6 text-center"
        >
          {stats.map((s) => (
            <div key={s.label}>
              <p className="font-display text-2xl text-ink sm:text-3xl">
                <CountUp to={s.to} suffix={s.suffix} decimals={s.decimals ?? 0} />
              </p>
              <p className="mt-1 text-xs text-mist sm:text-sm">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
