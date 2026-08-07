import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ui/toast";
import { BookDemoModal } from "@/components/forms/BookDemoModal";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fintech-one-tau.vercel.app"),
  title: {
    default: "Fintech Services — Power BI Dashboards & Financial Analytics",
    template: "%s | Fintech Services",
  },
  description:
    "Fintech Services designs and builds interactive Power BI dashboards, financial reporting, and analytics solutions for modern finance teams.",
  keywords: [
    "Power BI dashboards",
    "financial analytics",
    "fintech",
    "business intelligence",
    "executive KPI dashboards",
    "Fintech Services",
    "FSR",
  ],
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Fintech Services — Power BI Dashboards & Financial Analytics",
    description:
      "Interactive Power BI dashboards and financial analytics, designed for clarity and built for decisions.",
    type: "website",
    siteName: "Fintech Services",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fintech Services",
    description:
      "Interactive Power BI dashboards and financial analytics solutions.",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-white text-ink antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-blue focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <ToastProvider>
          {children}
          <BookDemoModal />
        </ToastProvider>
      </body>
    </html>
  );
}
