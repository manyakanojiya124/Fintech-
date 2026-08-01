import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://fintechservices.example.com"),
  title: {
    default: "Fintech Services (FSR) — Power BI Dashboards & Financial Analytics",
    template: "%s | Fintech Services",
  },
  description:
    "Fintech Services (FSR) designs and builds interactive Power BI dashboards, financial reporting, and analytics solutions for modern finance teams.",
  keywords: [
    "Power BI dashboards",
    "financial analytics",
    "fintech",
    "business intelligence",
    "executive KPI dashboards",
    "Fintech Services",
    "FSR",
  ],
  openGraph: {
    title: "Fintech Services (FSR) — Power BI Dashboards & Financial Analytics",
    description:
      "Interactive Power BI dashboards and financial analytics solutions, designed for clarity and built for decisions.",
    type: "website",
    siteName: "Fintech Services",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fintech Services (FSR)",
    description:
      "Interactive Power BI dashboards and financial analytics solutions.",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="grain antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-orange focus:px-4 focus:py-2 focus:text-white focus:font-semibold"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
