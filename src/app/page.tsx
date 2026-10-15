"use client";

import { useState } from "react";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import ParticleCanvas from "@/components/animations/ParticleCanvas";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import Portfolio from "@/components/Portfolio";
import AppShowcase from "@/components/AppShowcase";
import Process from "@/components/Process";
import TechStack from "@/components/TechStack";
import FounderSpotlight from "@/components/FounderSpotlight";
import AgencyComparison from "@/components/AgencyComparison";
import CostCalculator from "@/components/CostCalculator";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CtaBanner from "@/components/CtaBanner";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import QuoteModal from "@/components/QuoteModal";
import ScrollProgressLaser from "@/components/animations/ScrollProgressLaser";
import SoundToggle from "@/components/SoundToggle";

export default function Home() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedPlan, setSelectedPlan] = useState<string>("");

  const handleOpenQuoteModal = () => {
    setSelectedService("");
    setSelectedPlan("");
    setQuoteModalOpen(true);
  };

  const handleSelectService = (serviceName: string) => {
    setSelectedService(serviceName);
    setSelectedPlan("");
    setQuoteModalOpen(true);
  };

  const handleSelectPlan = (planName: string) => {
    setSelectedPlan(planName);
    setQuoteModalOpen(true);
  };

  const handleSelectProject = (projectTitle: string) => {
    setSelectedService(`Project Build: ${projectTitle}`);
    setQuoteModalOpen(true);
  };

  return (
    <main className="relative min-h-screen bg-[#05050A] text-white selection:bg-[#6C4CF5] selection:text-white">
      {/* Top Neon Scroll Progress Laser with Glowing Comet Head */}
      <ScrollProgressLaser />

      {/* Cinematic Intro Preloader */}
      <Preloader />

      {/* Interactive Cursor Spotlight */}
      <CustomCursor />

      {/* Interactive Cyber Particle Network (60fps Canvas) */}
      <ParticleCanvas />

      {/* 1. Sticky Navbar */}
      <Navbar onOpenQuoteModal={handleOpenQuoteModal} />

      {/* 2. Hero Section */}
      <Hero onOpenQuoteModal={handleOpenQuoteModal} />

      {/* 3. Services Section (6 Glass Cards with 3D Tilt) */}
      <Services onSelectService={handleSelectService} />

      {/* 4. Why Choose Us Section (Animated Rolling Counters + 3D Tilt Cards) */}
      <WhyUs />

      {/* 5. Agency Comparison Matrix (Typical Agency vs Codexa) */}
      <AgencyComparison />

      {/* 6. Portfolio / Work Section (Featured Client Builds Showcase) */}
      <Portfolio onSelectProject={handleSelectProject} />

      {/* 6.1 Shipped Mobile Applications & Google Play Store Ecosystem */}
      <AppShowcase onOpenQuoteModal={handleOpenQuoteModal} />

      {/* 7. Process Section (Horizontal Timeline with Traveling Laser Beam) */}
      <Process />

      {/* 8. Tech Stack (Scrolling Dual-Track Marquee) */}
      <TechStack />

      {/* 9. Founder & Solo Software Architect Spotlight */}
      <FounderSpotlight />

      {/* 10. Interactive Project Cost Calculator */}
      <CostCalculator />

      {/* 10. Pricing Section (3 Packages with BorderBeam on Most Popular) */}
      <Pricing onSelectPlan={handleSelectPlan} />

      {/* 9. Testimonials (Interactive Carousel) */}
      <Testimonials />

      {/* 10. FAQ (Smooth Accordion) */}
      <FAQ />

      {/* 11. CTA Banner Section (Neon Border Beam + Cyber Gradient) */}
      <CtaBanner onOpenQuoteModal={handleOpenQuoteModal} />

      {/* 12. Contact Section (Form + WhatsApp + Direct Channels) */}
      <Contact initialService={selectedService} initialPlan={selectedPlan} />

      {/* 13. Footer */}
      <Footer />

      {/* Floating WhatsApp Quick Action Button */}
      <FloatingWhatsApp />

      {/* Interactive Quote Modal */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        presetService={selectedService}
        presetPlan={selectedPlan}
      />
      {/* Floating Audio FX Mute / Unmute Toggle */}
      <SoundToggle />
    </main>
  );
}
