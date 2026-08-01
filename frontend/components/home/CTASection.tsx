"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const ease = [0.16, 1, 0.3, 1] as const;

export function CTASection() {
  return (
    <section id="cta" className="relative py-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease }}
          className="relative overflow-hidden rounded-xl2 bg-navy px-8 py-16 text-center shadow-[0_40px_90px_-40px_rgba(27,36,55,0.55)] sm:px-16"
        >
          <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,black,transparent)]" />
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-orange/25 blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-orange/15 blur-[100px]" />

          <div className="relative">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
              className="font-display text-3xl font-medium text-white sm:text-4xl"
            >
              Ready to see your data differently?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease }}
              className="mx-auto mt-4 max-w-md text-white/70"
            >
              Book a 30-minute demo and we&apos;ll put together a Power BI
              concept tailored to your reporting stack.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease }}
              className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Button size="lg" asChild>
                <a href="mailto:hello@fintechservices.example.com?subject=Book%20a%20Demo">
                  <CalendarCheck className="h-4 w-4" /> Book a Demo
                </a>
              </Button>
              <Button size="lg" variant="outlineInvert" asChild>
                <Link href="/templates">
                  Browse Templates <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
