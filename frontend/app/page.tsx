import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { LogoCloud } from "@/components/home/LogoCloud";
import { PowerBICard } from "@/components/home/PowerBICard";
import { Features } from "@/components/home/Features";
import { HowItWorks } from "@/components/home/HowItWorks";
import { FeaturedTemplates } from "@/components/home/FeaturedTemplates";
import { Pricing } from "@/components/home/Pricing";
import { CTASection } from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <LogoCloud />
        <PowerBICard />
        <Features />
        <HowItWorks />
        <FeaturedTemplates />
        <Pricing />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
