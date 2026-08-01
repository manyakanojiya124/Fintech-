import Link from "next/link";
import Image from "next/image";
import { Linkedin, Twitter, Github, Mail } from "lucide-react";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Templates gallery", href: "/templates" },
      { label: "Sales dashboards", href: "/templates?category=Sales" },
      { label: "Accounting dashboards", href: "/templates?category=Accounting" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Services", href: "/#services" },
      { label: "Clients", href: "/#clients" },
      { label: "Book a Demo", href: "/#cta" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "#" },
      { label: "Support", href: "#" },
      { label: "Status", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-subtle">
      <div className="container py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2">
            <Image src="/logo.svg" alt="Fintech Services (FSR)" width={130} height={34} />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-mist">
              Interactive Power BI dashboards and financial analytics, designed
              for clarity and built for decisions.
            </p>
            <div className="mt-6 flex gap-3">
              {[Linkedin, Twitter, Github, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white text-mist transition-all duration-300 hover:-translate-y-0.5 hover:border-orange/40 hover:text-orange focus-ring"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-ink">{col.title}</h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-mist transition-colors hover:text-orange"
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
          <p>&copy; {new Date().getFullYear()} Fintech Services (FSR). All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-ink">Privacy Policy</Link>
            <Link href="#" className="hover:text-ink">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
