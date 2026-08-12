"use client";

import { motion } from "framer-motion";
import { CalendarCheck, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { openBookDemo } from "@/components/forms/BookDemoModal";

const ease = [0.16, 1, 0.3, 1] as const;

export function CTASection() {
  return (
    <section id="cta" className="bg-white py-24">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
          className="relative overflow-hidden rounded-2xl bg-ink px-8 py-16 text-center sm:px-16"
        >
          {/* Restrained red accent, used sparingly per brand guidance */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-red/20 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-blue/30 blur-3xl"
          />
          <div className="relative mx-auto max-w-xl">
            <h2 className="text-display-2 font-bold tracking-tight text-white">
              Ready to see your data differently?
            </h2>
            <p className="mt-4 text-white/70">
              Book a 30-minute demo and we&apos;ll put together a Power BI
              concept tailored to your reporting stack.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                size="lg"
                variant="primary"
                onClick={openBookDemo}
                className="bg-blue hover:bg-blue-700"
                aria-haspopup="dialog"
              >
                <CalendarCheck className="h-4 w-4" /> Book a demo
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                <Link href="/templates">
                  Browse templates <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
