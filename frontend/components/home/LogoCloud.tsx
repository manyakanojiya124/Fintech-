"use client";

import { motion } from "framer-motion";

const clients = [
  "Northbridge Capital",
  "Meridian Bank",
  "Halcyon Retail Group",
  "Vantage Logistics",
  "Cascade Partners",
  "Ledgerline",
  "Summit & Cole",
  "Riverton Holdings",
];

export function LogoCloud() {
  const looped = [...clients, ...clients];
  return (
    <section id="clients" className="border-y border-line bg-white py-16">
      <div className="container-page">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-mist"
        >
          Trusted by finance &amp; operations teams at
        </motion.p>
      </div>
      <div className="relative mt-8 overflow-hidden mask-fade-x">
        <div className="flex w-max animate-marquee gap-12 px-6">
          {looped.map((name, i) => (
            <span
              key={i}
              className="whitespace-nowrap text-lg font-semibold tracking-tight text-mist/70"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
