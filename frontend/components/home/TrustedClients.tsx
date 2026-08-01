"use client";

import { motion } from "framer-motion";

const clients = [
  "Northbridge Capital",
  "Meridian Bank",
  "Halcyon Retail Group",
  "Vantage Logistics",
  "Cascade Partners",
  "Ledgerline Accounting",
  "Summit & Cole",
  "Riverton Holdings",
];

export function TrustedClients() {
  const looped = [...clients, ...clients];

  return (
    <section id="clients" className="py-24">
      <div className="container">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-mist"
        >
          Trusted by finance &amp; operations teams at
        </motion.p>
      </div>

      <div className="relative mt-10 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />
        <div className="flex w-max animate-marquee gap-16 py-2">
          {looped.map((name, i) => (
            <span
              key={i}
              className="whitespace-nowrap font-display text-xl text-mist/70 transition-colors duration-300 hover:text-ink"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
