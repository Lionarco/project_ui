import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import AppShowcaseSection from "@/components/sections/AppShowcaseSection";
import GamificationSection from "@/components/sections/GamificationSection";
import AIBuddySection from "@/components/sections/AIBuddySection";
import AnalyticsDashboardSection from "@/components/sections/AnalyticsDashboardSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import PricingSection from "@/components/sections/PricingSection";
import FAQSection from "@/components/sections/FAQSection";
import FinalCTASection from "@/components/sections/FinalCTASection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <AppShowcaseSection />
        <GamificationSection />
        <AIBuddySection />
        <AnalyticsDashboardSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <PricingSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
    </>
  );
}
