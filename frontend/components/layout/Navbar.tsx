"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/#services", label: "Services" },
  { href: "/#clients", label: "Clients" },
  { href: "/templates", label: "Templates" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-3" : "py-5"
      )}
    >
      <div className="container">
        <div
          className={cn(
            "flex items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300",
            scrolled ? "glass shadow-[0_8px_30px_-15px_rgba(20,22,31,0.18)]" : "bg-transparent"
          )}
        >
          <Link href="/" className="flex items-center gap-2 focus-ring rounded-md" aria-label="Fintech Services home">
            <Image src="/logo.svg" alt="Fintech Services (FSR)" width={130} height={34} priority />
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-mist transition-colors hover:text-ink focus-ring rounded-md"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/templates">Browse Templates</Link>
            </Button>
            <Button variant="primary" size="sm" asChild>
              <Link href="/#cta">
                Book a Demo <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>

          <button
            className="flex items-center justify-center rounded-full p-2 text-ink focus-ring md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {open && (
          <div className="glass mt-2 flex flex-col gap-1 rounded-2xl p-4 md:hidden">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-mist hover:bg-subtle hover:text-ink"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/#cta"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-lg bg-orange px-3 py-2.5 text-center text-sm font-semibold text-white"
            >
              Book a Demo
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
