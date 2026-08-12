import Link from "next/link";
import {
  Linkedin,
  Twitter,
  Github,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { BrandLockup } from "@/components/brand/Logo";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Templates", href: "/templates" },
      { label: "Dashboard", href: "/dashboard" },
      { label: "Sales dashboards", href: "/templates?category=Sales" },
      { label: "Accounting", href: "/templates?category=Accounting" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Features", href: "/#features" },
      { label: "How it works", href: "/#how" },
      { label: "Pricing", href: "/#pricing" },
      { label: "Book a demo", href: "/#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Sign in", href: "/login" },
      { label: "Create account", href: "/signup" },
      { label: "Documentation", href: "#" },
      { label: "Status", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-subtle">
      <div className="container-page py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-12">
          <div className="col-span-2 md:col-span-4">
            <BrandLockup size="md" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-mist">
              Interactive Power BI dashboards and financial analytics, designed
              for clarity and built for decisions.
            </p>
            <div className="mt-6 flex gap-2">
              {[Linkedin, Twitter, Github, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-white text-mist transition-all hover:-translate-y-0.5 hover:border-blue/30 hover:text-blue"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
            <div className="mt-6 inline-flex items-center gap-2 rounded-lg border border-line bg-white px-3 py-2 text-xs text-mist">
              <ShieldCheck className="h-3.5 w-3.5 text-blue" />
              SOC 2 aligned · Row-level security
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title} className="md:col-span-2 lg:col-span-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-mist">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-ink/80 transition-colors hover:text-blue"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-line pt-8 text-xs text-mist md:flex-row md:items-center">
          <p>
            © {new Date().getFullYear()} Fintech Services. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-ink">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-ink">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-ink">
              Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
