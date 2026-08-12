import Link from "next/link";
import { BrandLockup } from "@/components/brand/Logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen grid-cols-1 bg-white lg:grid-cols-2">
      {/* Form column */}
      <div className="flex flex-col px-6 py-8 sm:px-12">
        <Link
          href="/"
          aria-label="Fintech Services — home"
          className="w-fit rounded-md focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2"
        >
          <BrandLockup size="md" />
        </Link>
        <div className="flex flex-1 items-center justify-center py-12">
          <div className="w-full max-w-sm">{children}</div>
        </div>
        <p className="text-center text-xs text-mist">
          © {new Date().getFullYear()} Fintech Services. All rights reserved.
        </p>
      </div>

      {/* Brand panel */}
      <div className="relative hidden overflow-hidden bg-ink lg:block">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue/30 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-red/20 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:40px_40px]"
        />
        <div className="relative flex h-full flex-col justify-between p-12 text-white">
          <div className="flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-mark.png" alt="" className="h-9 w-auto brightness-0 invert" />
            <span className="text-lg font-semibold tracking-tight">
              Fintech<span className="text-blue-300">Services</span>
            </span>
          </div>

          <blockquote>
            <p className="text-2xl font-semibold leading-snug tracking-tight">
              “We replaced twelve spreadsheets with a single source of truth.
              Board meetings start with the dashboard now, not a PDF.”
            </p>
            <footer className="mt-6 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-sm font-semibold">
                JR
              </div>
              <div>
                <p className="text-sm font-medium">Jordan Rivera</p>
                <p className="text-sm text-white/60">CFO, Northbridge Capital</p>
              </div>
            </footer>
          </blockquote>

          <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
            {[
              { v: "180+", l: "Dashboards" },
              { v: "12", l: "Industries" },
              { v: "3.5 wks", l: "Avg. delivery" },
            ].map((s) => (
              <div key={s.l}>
                <p className="text-2xl font-semibold">{s.v}</p>
                <p className="text-sm text-white/60">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
