"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/brand/Logo";
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

  // Over-hero transparent state only applies on the homepage at the top.
  const isHome = pathname === "/";
  const overDark = isHome && !scrolled;

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
          scrolled || !isHome
            ? "border-b border-line bg-white/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <div className="container-page flex h-16 items-center justify-between">
          {/* Logo lockup — wordmark inverts over dark hero */}
          <Link
            href="/"
            aria-label="Fintech Services — home"
            className="inline-flex items-center gap-2.5 rounded-md"
          >
            <LogoMark height={30} priority />
            <span
              className={cn(
                "text-[17px] font-semibold tracking-tight leading-none transition-colors",
                overDark ? "text-white" : "text-ink"
              )}
            >
              Fintech
              <span className={overDark ? "text-[#5B9BEE]" : "text-blue"}>
                Services
              </span>
            </span>
          </Link>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-1 md:flex"
          >
            {links.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  overDark
                    ? "text-slate-200 hover:bg-white/10 hover:text-white"
                    : "text-mist hover:bg-subtle hover:text-ink"
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className={
                overDark
                  ? "text-slate-200 hover:bg-white/10 hover:text-white"
                  : undefined
              }
            >
              <Link href="/login">Sign in</Link>
            </Button>
            <Button
              size="sm"
              asChild
              variant="secondary"
              className={
                overDark
                  ? "border-white/20 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white"
                  : undefined
              }
            >
              <Link href="/dashboard">
                <LayoutDashboard className="h-3.5 w-3.5" /> Dashboard
              </Link>
            </Button>
            <Button
              size="sm"
              onClick={openBookDemo}
              aria-haspopup="dialog"
              className={
                overDark
                  ? "bg-white text-ink hover:bg-slate-100"
                  : undefined
              }
            >
              Book a demo
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Button>
          </div>

          <button
            className={cn(
              "grid h-10 w-10 place-items-center rounded-lg md:hidden",
              overDark
                ? "text-white hover:bg-white/10"
                : "text-ink hover:bg-subtle"
            )}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu — always light, for readability */}
      {open && (
        <div className="border-b border-line bg-white shadow-card md:hidden">
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
