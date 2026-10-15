"use client";

import { servicesData, ServiceItem } from "@/data/agencyData";
import {
  Globe,
  ShoppingCart,
  Code2,
  Smartphone,
  Palette,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Layers,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import TiltCard from "./animations/TiltCard";
import SpotlightCard from "./animations/SpotlightCard";
import TextScramble from "./animations/TextScramble";
import { sounds } from "@/utils/soundEffects";

interface ServicesProps {
  onSelectService: (serviceName: string) => void;
}

export default function Services({ onSelectService }: ServicesProps) {
  const getIcon = (name: string) => {
    switch (name) {
      case "Globe":
        return <Globe className="w-6 h-6 text-[#8B6CFF]" />;
      case "ShoppingCart":
        return <ShoppingCart className="w-6 h-6 text-[#8B6CFF]" />;
      case "Code2":
        return <Code2 className="w-6 h-6 text-[#8B6CFF]" />;
      case "Smartphone":
        return <Smartphone className="w-6 h-6 text-[#8B6CFF]" />;
      case "Palette":
        return <Palette className="w-6 h-6 text-[#8B6CFF]" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-6 h-6 text-[#8B6CFF]" />;
      default:
        return <Layers className="w-6 h-6 text-[#8B6CFF]" />;
    }
  };

  return (
    <section id="services" className="relative py-28 bg-[#05050A]">
      {/* Background glow spot */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-violet-900/15 rounded-full blur-[160px] pointer-events-none animate-pulse-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-[#8B6CFF] text-xs font-mono tracking-wider uppercase mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#8B6CFF]" />
            <span>Specialized Capabilities</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-5"
          >
            <TextScramble text="Full-Spectrum Digital Engineering Built for" />{" "}
            <span className="text-silver-violet">Maximum Impact.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-[#A1A1B5] leading-relaxed"
          >
            We don’t do generic templates. Every website, application, and interface is custom-engineered with precision, speed, and clean code that outpaces your competition.
          </motion.p>
        </div>

        {/* 6 Glass Cards Grid with 3D Tilt, Specular Glare & Dynamic Mouse Spotlight */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {servicesData.map((service: ServiceItem, index: number) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="h-full"
            >
              <SpotlightCard
                spotlightColor="rgba(139, 108, 255, 0.18)"
                spotlightSize={320}
                className="h-full rounded-2xl"
              >
                <TiltCard maxTilt={8} glare={true} className="h-full">
                  <div
                    onMouseEnter={() => sounds.playHover()}
                    className="glass-card rounded-2xl p-7 sm:p-8 flex flex-col justify-between h-full group relative overflow-hidden border border-white/[0.08] hover:border-violet-500/50"
                  >
                    {/* Subtle top border highlight */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-violet-400/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div>
                      {/* Top Row: Icon and Badge */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="p-3.5 rounded-xl bg-violet-500/10 border border-violet-500/20 group-hover:border-violet-500/60 group-hover:bg-violet-500/25 group-hover:scale-110 transition-all duration-300 shadow-[0_0_15px_rgba(108,76,245,0.2)]">
                          {getIcon(service.iconName)}
                        </div>
                        <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 bg-white/[0.04] px-2.5 py-1 rounded-full border border-white/[0.08]">
                          {service.badge}
                        </span>
                      </div>

                      {/* Service Title */}
                      <h3 className="font-heading text-xl sm:text-2xl font-bold text-white group-hover:text-silver-light transition-colors mb-3">
                        {service.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-[#A1A1B5] leading-relaxed mb-6 font-normal">
                        {service.description}
                      </p>

                      {/* Deliverables List */}
                      <div className="space-y-2.5 mb-8 pt-4 border-t border-white/[0.06]">
                        {service.deliverables.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2.5 text-xs text-zinc-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#8B6CFF] shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Card Action */}
                    <button
                      onClick={() => {
                        sounds.playClick();
                        onSelectService(service.title);
                      }}
                      className="inline-flex items-center justify-between w-full pt-4 border-t border-white/[0.06] text-xs font-heading font-semibold uppercase tracking-wider text-[#8B6CFF] group-hover:text-white transition-colors cursor-pointer"
                    >
                      <span>Get a quote for this</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
                    </button>
                  </div>
                </TiltCard>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
