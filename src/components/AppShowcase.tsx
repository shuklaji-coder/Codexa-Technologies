"use client";

import { useState } from "react";
import {
  Smartphone,
  Sparkles,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Star,
  Zap,
  Download,
  CheckCircle2,
  Share2,
  Check,
  Radio,
  Layers,
} from "lucide-react";
import { motion } from "framer-motion";
import SpotlightCard from "./animations/SpotlightCard";
import BorderBeam from "./animations/BorderBeam";
import TextScramble from "./animations/TextScramble";
import MagneticButton from "./animations/MagneticButton";
import { sounds } from "@/utils/soundEffects";

interface AppShowcaseProps {
  onOpenQuoteModal: () => void;
}

interface MobileAppItem {
  id: string;
  name: string;
  roleTag: string;
  headline: string;
  category: string;
  storeUrl: string;
  packageId?: string;
  rating: string;
  downloads: string;
  iconBg: string;
  accentColor: string;
  spotlightColor: string;
  badgeText: string;
  description: string;
  features: string[];
  techStack: string[];
}

const appsData: MobileAppItem[] = [
  {
    id: "chaloji-user",
    name: "ChaloJi User App",
    roleTag: "Passenger & Rider App",
    headline: "Zero-Surge Cab Booking & Live GPS Travel",
    category: "Travel & Daily Mobility",
    storeUrl:
      "https://play.google.com/store/apps/details?id=com.rohan3543.chaloji&pcampaignid=web_share",
    packageId: "com.rohan3543.chaloji",
    rating: "4.9 ★",
    downloads: "1,420+ Rides",
    iconBg: "from-emerald-500 to-teal-600",
    accentColor: "emerald",
    spotlightColor: "rgba(16, 185, 129, 0.22)",
    badgeText: "Google Play Verified",
    description:
      "Engineered by Codexa Technologies for instant, zero-surge city cabs, outstation rides, bike taxis, and wedding convoys across Uttar Pradesh.",
    features: [
      "Zero surge pricing algorithm with transparent flat fares",
      "Real-time vehicle GPS tracking & live driver ETA",
      "Instant UPI one-tap payment & digital receipt generator",
      "Emergency SOS, verified drivers & 24/7 customer support",
    ],
    techStack: ["React Native", "Android SDK", "Google Maps API", "Socket.io", "Razorpay"],
  },
  {
    id: "chaloji-driver",
    name: "ChaloJi Driver App",
    roleTag: "Driver Partner & Fleet App",
    headline: "Real-Time Trip Radar & Instant Daily Payouts",
    category: "Logistics & Driver Partner",
    storeUrl:
      "https://play.google.com/store/apps/details?id=com.chaloji.driver&pcampaignid=web_share",
    packageId: "com.chaloji.driver",
    rating: "Partner App",
    downloads: "Active Fleet",
    iconBg: "from-cyan-500 to-blue-600",
    accentColor: "cyan",
    spotlightColor: "rgba(6, 182, 212, 0.22)",
    badgeText: "Partner Ecosystem",
    description:
      "Complete driver management operating system powering incoming trip requests, smart shortest-path routing, and direct automated bank settlements.",
    features: [
      "Sub-2-second automated nearest ride assignment",
      "Turn-by-turn voice navigation straight to customer pickup",
      "Automated daily UPI payout cycle directly to driver account",
      "Digital KYC, license verification & vehicle documentation",
    ],
    techStack: ["Android Native", "Background Geolocation", "WebSockets", "Node.js", "UPI Autopay"],
  },
  {
    id: "mits-sadhana",
    name: "MITS Sadhana App",
    roleTag: "Vedic Spiritual & AI Platform",
    headline: "24/7 AI Spiritual Guide & Puja Services",
    category: "Spiritual Tech & AI Lifestyle",
    storeUrl: "https://play.google.com/store/search?q=mits+sadhana&c=apps",
    rating: "4.9 ★",
    downloads: "10k+ Devotees",
    iconBg: "from-amber-500 via-rose-500 to-purple-600",
    accentColor: "amber",
    spotlightColor: "rgba(245, 158, 11, 0.22)",
    badgeText: "Live on Play Store",
    description:
      "Sacred Vedic ecosystem built to connect devotees with certified Purohits, 24/7 intelligent scriptural guidance, and pure puja samagri at the doorstep.",
    features: [
      "24/7 AI Spiritual Guide answering scripture & life queries",
      "Certified Pandit bookings for Havans, Griha Pravesh & Pujas",
      "Doorstep pure Samagri kits with live dispatch tracking",
      "Daily personalized Sadhana routines, muhurats & shlokas",
    ],
    techStack: ["React 19", "AI Spiritual Model", "Node.js", "MongoDB", "Razorpay / UPI"],
  },
];

// Authentic Official Google Play Store Vector Icon
function GooglePlayLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M3.609 1.814L13.793 12 3.61 22.186A1.854 1.854 0 0 1 3 20.875V3.125c0-.528.223-.998.609-1.311z"
        fill="#00E5FF"
      />
      <path
        d="M17.185 8.608L5.034.453C4.526.113 3.966.02 3.609 1.814L13.793 12l3.392-3.392z"
        fill="#00E676"
      />
      <path
        d="M17.185 15.392L13.793 12 3.61 22.186c.357 1.794.917 1.701 1.425 1.361l12.15-8.155z"
        fill="#FF1744"
      />
      <path
        d="M21.56 10.428l-4.375-2.82-3.392 3.392 3.392 3.392 4.375-2.82c1.026-.662 1.026-1.482 0-2.144z"
        fill="#FFEA00"
      />
    </svg>
  );
}

export default function AppShowcase({ onOpenQuoteModal }: AppShowcaseProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      sounds.playClick();
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  return (
    <section id="apps" className="relative py-20 sm:py-28 bg-[#040408] overflow-hidden border-t border-white/[0.06]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-violet-600/12 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] sm:text-xs font-mono tracking-wider uppercase mb-3 sm:mb-4 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
          >
            <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
            <span>Mobile App Engineering & Publishing</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4 sm:mb-5"
          >
            <TextScramble text="Native Android &" />{" "}
            <span className="text-silver-violet">Client Apps Ecosystem</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-sm sm:text-lg text-[#A1A1B5] leading-relaxed max-w-2xl px-2"
          >
            Codexa Technologies architects and ships end-to-end mobile applications to the Google Play Store—featuring real-time geolocation telemetry, automated payment gateways, and sub-second socket backends.
          </motion.p>
        </div>

        {/* 3 Mobile App Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {appsData.map((app, index) => {
            return (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="h-full flex"
              >
                <SpotlightCard
                  spotlightColor={app.spotlightColor}
                  spotlightSize={400}
                  className="w-full rounded-2xl sm:rounded-3xl bg-[#080814]/90 border border-white/10 hover:border-violet-500/40 p-6 sm:p-7 flex flex-col justify-between backdrop-blur-xl transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.5)] group"
                >
                  <div>
                    {/* Top Status & Badge Row */}
                    <div className="flex items-center justify-between gap-2 mb-5">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold bg-white/[0.04] text-zinc-300 border border-white/[0.08]">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        <span>{app.badgeText}</span>
                      </span>

                      <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-md bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
                        {app.rating}
                      </span>
                    </div>

                    {/* App Identity Banner */}
                    <div className="flex items-start gap-4 mb-5">
                      <div
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${app.iconBg} p-0.5 shadow-lg flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}
                      >
                        <div className="w-full h-full rounded-[14px] bg-[#090A14] flex items-center justify-center">
                          <Smartphone className="w-7 h-7 text-white" />
                        </div>
                      </div>

                      <div className="min-w-0">
                        <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">
                          {app.roleTag}
                        </span>
                        <h3 className="font-heading text-xl font-bold text-white group-hover:text-silver-violet transition-colors truncate">
                          {app.name}
                        </h3>
                        <span className="text-xs text-zinc-400 block truncate">
                          {app.category}
                        </span>
                      </div>
                    </div>

                    {/* Headline & Description */}
                    <h4 className="font-heading text-sm font-semibold text-zinc-200 mb-2 leading-snug">
                      {app.headline}
                    </h4>

                    <p className="text-xs text-[#A1A1B5] leading-relaxed mb-5">
                      {app.description}
                    </p>

                    {/* Key Architecture Features */}
                    <div className="space-y-2 mb-6 pt-3 border-t border-white/[0.06]">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-2">
                        Production Features
                      </div>
                      {app.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="text-[11px] leading-tight">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Badges */}
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-1.5">
                        {app.techStack.map((tech, i) => (
                          <span
                            key={i}
                            className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/[0.03] text-zinc-400 border border-white/[0.06]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions & Official Store CTA */}
                  <div className="pt-4 border-t border-white/[0.08] space-y-2.5">
                    <MagneticButton strength={0.15} className="w-full">
                      <a
                        href={app.storeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => sounds.playClick()}
                        className="w-full py-3 px-4 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 hover:border-emerald-500/50 flex items-center justify-between text-white transition-all group/btn shadow-[0_0_20px_rgba(0,0,0,0.4)] cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <GooglePlayLogo className="w-5 h-5 shrink-0" />
                          <div className="text-left">
                            <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider block leading-none">
                              GET IT ON
                            </span>
                            <span className="text-xs font-heading font-bold text-white tracking-wide">
                              Google Play
                            </span>
                          </div>
                        </div>

                        <ExternalLink className="w-4 h-4 text-emerald-400 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </a>
                    </MagneticButton>

                    {/* Package ID / Copy badge */}
                    {app.packageId && (
                      <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 px-1">
                        <span className="truncate max-w-[200px]">ID: {app.packageId}</span>
                        <button
                          onClick={() => handleCopy(app.id, app.storeUrl)}
                          className="text-zinc-400 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                          title="Copy Play Store Link"
                        >
                          {copiedId === app.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">Copied Link!</span>
                            </>
                          ) : (
                            <>
                              <Share2 className="w-3 h-3" />
                              <span>Share Link</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Banner: Custom Mobile App Engineering Callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-14 sm:mt-16 rounded-2xl sm:rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-violet-950/40 via-[#0A0A18] to-emerald-950/40 border border-violet-500/30 backdrop-blur-2xl relative overflow-hidden shadow-[0_0_50px_rgba(108,76,245,0.2)]"
        >
          <BorderBeam size={220} duration={8} colorFrom="#10B981" colorTo="#8B6CFF" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
            <div className="lg:col-span-8 space-y-2">
              <div className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-emerald-400">
                <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
                <span>Full-Cycle Android & iOS Publishing</span>
              </div>
              <h3 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-white">
                Have a Mobile Application Idea?
              </h3>
              <p className="text-xs sm:text-sm text-[#A1A1B5] leading-relaxed max-w-2xl">
                We design UI/UX, engineer rock-solid native & cross-platform code, integrate backend APIs, configure Play Store/App Store developer consoles, and handle full publishing approval on your behalf.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-2.5 sm:gap-3">
              <MagneticButton strength={0.15} className="w-full">
                <button
                  onClick={() => {
                    sounds.playClick();
                    onOpenQuoteModal();
                  }}
                  className="w-full violet-glow-btn btn-shimmer py-3.5 rounded-xl font-heading text-xs uppercase tracking-wider font-semibold text-white flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(108,76,245,0.4)]"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Build Your Mobile App</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </MagneticButton>

              <a
                href="https://wa.me/919580849709?text=Hello%20Codexa%20Technologies,%20I%20saw%20your%20published%20apps%20(ChaloJi%20&%20MITS%20Sadhana)%20on%20Play%20Store%20and%20want%20to%20build%20a%20custom%20mobile%20app."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sounds.playClick()}
                className="w-full py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-emerald-500/40 text-[11px] sm:text-xs font-heading font-semibold uppercase tracking-wider text-zinc-300 hover:text-white transition-all text-center block"
              >
                Discuss App on WhatsApp →
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
