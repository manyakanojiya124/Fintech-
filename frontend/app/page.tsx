import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { PowerBICard } from "@/components/home/PowerBICard";
import { Features } from "@/components/home/Features";
import { TrustedClients } from "@/components/home/TrustedClients";
import { CTASection } from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <PowerBICard />
        <Features />
        <TrustedClients />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
