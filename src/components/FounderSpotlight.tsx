"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Code2,
  Terminal,
  Cpu,
  Zap,
  ShieldCheck,
  CheckCircle2,
  Github,
  Linkedin,
  Twitter,
  MessageSquare,
  Sparkles,
  ArrowRight,
  Clock,
  Flame,
  Award,
  Layers,
  Check,
} from "lucide-react";
import { motion } from "framer-motion";
import BorderBeam from "./animations/BorderBeam";
import TextScramble from "./animations/TextScramble";
import MagneticButton from "./animations/MagneticButton";
import SpotlightCard from "./animations/SpotlightCard";
import { sounds } from "@/utils/soundEffects";

export default function FounderSpotlight() {
  const [imageLoaded, setImageLoaded] = useState(true);

  const advantages = [
    {
      icon: Terminal,
      title: "Direct Engineer Access",
      desc: "Zero sales reps or junior interns. You talk directly with the lead engineer writing your code on WhatsApp and Slack.",
    },
    {
      icon: Zap,
      title: "10x Sprint Velocity",
      desc: "No bureaucratic agency red tape. Decisions, revisions, and deployments happen in hours, not weeks.",
    },
    {
      icon: ShieldCheck,
      title: "100% Code Ownership",
      desc: "Clean, documented, scalable GitHub repository handed over to you on Day 1. Zero vendor lock-in.",
    },
  ];

  const whatsappMessage = encodeURIComponent(
    "Hi, I saw your Codexa profile and want to speak directly with the founder regarding a new project build."
  );

  return (
    <section id="founder" className="relative py-20 sm:py-28 bg-[#05050A] border-t border-white/[0.06] overflow-hidden">
      {/* Background Glow Orbs */}
      <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-violet-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-[#8B6CFF] text-[11px] sm:text-xs font-mono tracking-wider uppercase mb-3.5 sm:mb-4 shadow-[0_0_20px_rgba(108,76,245,0.2)]"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#8B6CFF]" />
            <span>Engineering Leadership</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4 sm:mb-5"
          >
            <TextScramble text="Meet the Founder &" />{" "}
            <span className="text-silver-violet">Lead Software Architect.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg text-[#A1A1B5] leading-relaxed max-w-2xl px-2"
          >
            Direct craftsmanship with zero middlemen. Every product at Codexa is personally architected and engineered to international standards.
          </motion.p>
        </div>

        {/* Main Founder Card with Dynamic Mouse Spotlight */}
        <SpotlightCard
          spotlightColor="rgba(139, 108, 255, 0.16)"
          spotlightSize={450}
          className="rounded-3xl bg-[#090914] border border-white/10 p-6 sm:p-10 lg:p-12 shadow-2xl backdrop-blur-xl"
        >
          <BorderBeam size={320} duration={12} colorFrom="#8B6CFF" colorTo="#6C4CF5" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Avatar & Quick Info */}
            <div className="lg:col-span-5 flex flex-col items-center text-center">
              {/* Profile Avatar Frame with Left-to-Right Entrance Animation */}
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ scale: 1.04 }}
                className="relative w-44 h-44 sm:w-52 sm:h-52 md:w-60 md:h-60 mb-6 group cursor-pointer"
              >
                {/* Rotating Neon Border Aura */}
                <div className="absolute -inset-2.5 rounded-full bg-gradient-to-tr from-[#6C4CF5] via-[#8B6CFF] to-transparent opacity-75 blur-md animate-pulse" />
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-violet-600 via-indigo-500 to-purple-600 opacity-60" />

                {/* Avatar Container */}
                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/20 bg-[#0c0c1a] flex items-center justify-center shadow-2xl">
                  {imageLoaded ? (
                    <Image
                      src="/founder.png"
                      alt="Codexa Technologies Founder"
                      width={280}
                      height={280}
                      className="w-full h-full object-cover object-center"
                      onError={() => setImageLoaded(false)}
                      priority
                    />
                  ) : (
                    // Futuristic Cyber Dev Avatar Fallback if custom image is not yet uploaded
                    <div className="w-full h-full bg-gradient-to-b from-[#18182e] to-[#0a0a14] flex flex-col items-center justify-center p-4">
                      <div className="relative mb-2">
                        <Terminal className="w-14 h-14 sm:w-16 sm:h-16 text-[#8B6CFF]" />
                        <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#090914]" />
                      </div>
                      <span className="font-heading font-bold text-white text-base sm:text-lg">
                        Lead Architect
                      </span>
                      <span className="text-[11px] font-mono text-[#8B6CFF] mt-0.5">
                        Codexa Technologies
                      </span>
                    </div>
                  )}
                </div>

                {/* Status Pill Badge */}
                <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#080811]/95 border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.3)] backdrop-blur-md flex items-center gap-1.5 whitespace-nowrap">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-[10px] sm:text-xs font-mono font-medium text-emerald-300">
                    Active • Building for Founders
                  </span>
                </div>
              </motion.div>

              {/* Title & Role with Staggered Left-to-Right Entrance */}
              <motion.div
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.8,
                  delay: 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex flex-col items-center"
              >
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-1">
                  Rohan Shukla
                </h3>
                <p className="text-xs sm:text-sm font-mono text-[#8B6CFF] font-semibold mb-3">
                  Founder & Lead Software Architect • Codexa Technologies
                </p>

                {/* Core Stack Badges */}
                <div className="flex flex-wrap items-center justify-center gap-1.5 mb-4">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] sm:text-[11px] font-mono">
                    ⚡ MERN Stack
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-[10px] sm:text-[11px] font-mono">
                    ☕ Java Full Stack
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-[#8B6CFF] text-[10px] sm:text-[11px] font-mono">
                    🌐 Next.js & 3D
                  </span>
                </div>
              </motion.div>

              {/* Quick Tagline */}
              <p className="text-xs sm:text-sm text-[#A1A1B5] leading-relaxed max-w-sm mb-6">
                Directly handling system architecture, client engineering, and product velocity at Codexa Technologies.
              </p>

              {/* Social Channels */}
              <div className="flex items-center gap-2.5 mb-6">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-zinc-300 hover:text-white hover:border-violet-500/60 hover:bg-violet-500/10 transition-all cursor-pointer"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="https://www.linkedin.com/in/rohan-shukla-0b8889321/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-[#0077B5]/15 border border-[#0077B5]/40 text-[#0077B5] hover:text-white hover:bg-[#0077B5] transition-all cursor-pointer shadow-[0_0_15px_rgba(0,119,181,0.2)]"
                  aria-label="Rohan Shukla on LinkedIn"
                  title="Rohan Shukla on LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-zinc-300 hover:text-white hover:border-violet-500/60 hover:bg-violet-500/10 transition-all cursor-pointer"
                  aria-label="Twitter/X Profile"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href={`https://wa.me/919580849709?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 transition-all cursor-pointer"
                  aria-label="WhatsApp Direct"
                >
                  <MessageSquare className="w-4 h-4" />
                </a>
              </div>

              {/* Direct Founder Actions: WhatsApp + LinkedIn */}
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                <MagneticButton strength={0.28} className="w-full sm:w-auto">
                  <a
                    href={`https://wa.me/919580849709?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => sounds.playHover()}
                    onClick={() => sounds.playClick()}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] group cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                    <span>WhatsApp Rohan</span>
                  </a>
                </MagneticButton>

                <a
                  href="https://www.linkedin.com/in/rohan-shukla-0b8889321/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0077B5]/15 hover:bg-[#0077B5]/25 border border-[#0077B5]/40 text-white text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-[0_0_20px_rgba(0,119,181,0.2)] group cursor-pointer"
                >
                  <Linkedin className="w-4 h-4 text-[#0077B5] group-hover:text-white transition-colors" />
                  <span>LinkedIn Profile</span>
                </a>
              </div>
            </div>

            {/* Right Column: Founder's Manifesto & Technical Arsenal */}
            <div className="lg:col-span-7 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-white/10 pt-8 lg:pt-0 lg:pl-10">
              {/* Personal Manifesto Quote */}
              <div className="relative mb-8 pl-5 border-l-2 border-[#8B6CFF]">
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-zinc-400 block mb-2">
                  The Studio Manifesto
                </span>
                <p className="text-sm sm:text-base md:text-lg text-white font-medium leading-relaxed italic">
                  &ldquo;I started Codexa Technologies to do away with the typical agency nonsense — bloated WordPress templates, junior handoffs, and weeks of radio silence. When you trust us with your brand, you work directly with me. I personally write the code, optimize performance, and ensure your site converts.&rdquo;
                </p>
              </div>

              {/* Key Highlights Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center">
                  <div className="font-heading text-xl sm:text-2xl font-bold text-white mb-0.5">
                    100%
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-mono text-zinc-400">
                    Solo Code Ownership
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center">
                  <div className="font-heading text-xl sm:text-2xl font-bold text-[#8B6CFF] mb-0.5">
                    &lt;15m
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-mono text-zinc-400">
                    WhatsApp Response
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center">
                  <div className="font-heading text-xl sm:text-2xl font-bold text-white mb-0.5">
                    50+
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-mono text-zinc-400">
                    Shipped Projects
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center">
                  <div className="font-heading text-xl sm:text-2xl font-bold text-emerald-400 mb-0.5">
                    99.9%
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-mono text-zinc-400">
                    Client Satisfaction
                  </div>
                </div>
              </div>

              {/* Technical Arsenal & Certified Stacks */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3.5">
                  <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-[#8B6CFF]" />
                    <span>Technical Arsenal & Certified Stacks</span>
                  </span>
                  <span className="text-[10px] font-mono text-[#8B6CFF] bg-violet-500/10 px-2.5 py-0.5 rounded-full border border-violet-500/20 hidden sm:inline-block">
                    MERN • Java Enterprise • 3D Web
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* 1. MERN Stack Box */}
                  <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-emerald-500/30 hover:border-emerald-500/50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-xs font-heading font-bold text-white">MERN Stack</span>
                      </div>
                      <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-wider">Web Apps</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {["MongoDB", "Express.js", "React 19 / Redux", "Node.js", "REST & GraphQL"].map((s, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[10px] sm:text-[11px] font-mono text-emerald-300">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 2. Java Full Stack Box */}
                  <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-orange-500/30 hover:border-orange-500/50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
                        <span className="text-xs font-heading font-bold text-white">Java Full Stack</span>
                      </div>
                      <span className="text-[9px] font-mono text-orange-400 uppercase tracking-wider">Enterprise</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {["Java 21", "Spring Boot", "Microservices", "Hibernate / JPA", "MySQL / Postgres"].map((s, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded-lg bg-orange-500/10 border border-orange-500/20 text-[10px] sm:text-[11px] font-mono text-orange-300">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 3. Next.js & 3D WebGL Box */}
                  <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-violet-500/30 hover:border-violet-500/50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#8B6CFF] animate-pulse" />
                        <span className="text-xs font-heading font-bold text-white">Next.js & 3D WebGL</span>
                      </div>
                      <span className="text-[9px] font-mono text-[#8B6CFF] uppercase tracking-wider">High Speed</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {["Next.js 14", "Three.js 3D", "TypeScript", "Tailwind CSS", "Framer Motion"].map((s, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded-lg bg-violet-500/10 border border-violet-500/20 text-[10px] sm:text-[11px] font-mono text-violet-300">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 4. Mobile & Cloud DevOps Box */}
                  <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-cyan-500/30 hover:border-cyan-500/50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                        <span className="text-xs font-heading font-bold text-white">Mobile & Cloud DevOps</span>
                      </div>
                      <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-wider">Infra</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {["Flutter (iOS/Android)", "Docker", "Redis Cache", "Razorpay / UPI", "AWS Cloud"].map((s, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-[10px] sm:text-[11px] font-mono text-cyan-300">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 3 Pillars of Working With Founder Directly */}
              <div className="space-y-3">
                {advantages.map((adv, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05]"
                  >
                    <div className="p-2 rounded-lg bg-violet-500/10 text-[#8B6CFF] shrink-0 mt-0.5">
                      <adv.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-semibold text-white">
                        {adv.title}
                      </h4>
                      <p className="text-[11px] sm:text-xs text-[#A1A1B5] leading-relaxed mt-0.5">
                        {adv.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SpotlightCard>
      </div>
    </section>
  );
}
