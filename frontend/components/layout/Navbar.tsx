"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoLink } from "@/components/brand/Logo";
import { openBookDemo } from "@/components/forms/BookDemoModal";
import { cn } from "@/lib/utils";

const links = [
  { href: "/#features", label: "Features" },
  { href: "/#how", label: "How it works" },
  { href: "/templates", label: "Templates" },
  { href: "/#pricing", label: "Pricing" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "transition-all duration-300",
          scrolled
            ? "border-b border-line bg-white/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <div className="container-page flex h-16 items-center justify-between">
          <LogoLink size="md" priority />

          <nav
            aria-label="Primary"
            className="hidden items-center gap-1 md:flex"
          >
            {links.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-mist transition-colors hover:bg-subtle hover:text-ink"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            
            <Button size="sm" onClick={openBookDemo} aria-haspopup="dialog">
              Book a demo
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Button>
          </div>

          <button
            className="grid h-10 w-10 place-items-center rounded-lg text-ink hover:bg-subtle md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-b border-line bg-white md:hidden">
          <nav className="container-page flex flex-col gap-1 py-4">
            {links.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink hover:bg-subtle"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-2 grid grid-cols-2 gap-2">
              <Button variant="outline" asChild>
                <Link href="/login">Sign in</Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            </div>
            <Button className="mt-2" onClick={openBookDemo}>
              Book a demo
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
