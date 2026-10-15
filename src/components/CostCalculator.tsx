"use client";

import { useState } from "react";
import {
  Calculator,
  Sparkles,
  Check,
  MessageSquare,
  Clock,
  ArrowRight,
  ShieldCheck,
  HelpCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import BorderBeam from "./animations/BorderBeam";

interface Addon {
  id: string;
  name: string;
  price: number;
  timeDays: number;
}

export default function CostCalculator() {
  const [projectType, setProjectType] = useState<"website" | "ecommerce" | "mobile" | "saas">("website");
  const [pageScope, setPageScope] = useState<"starter" | "standard" | "pro" | "custom">("standard");
  const [selectedAddons, setSelectedAddons] = useState<string[]>(["seo", "payment"]);

  const basePricing = {
    website: {
      starter: { price: 6000, days: 6, label: "1 - 3 Pages (Landing Page)" },
      standard: { price: 10000, days: 12, label: "4 - 8 Pages (Complete Website)" },
      pro: { price: 15000, days: 18, label: "9 - 15 Pages (Corporate Flagship)" },
      custom: { price: 25000, days: 25, label: "15+ Pages / Custom Portal" },
    },
    ecommerce: {
      starter: { price: 10000, days: 10, label: "Up to 15 Products" },
      standard: { price: 16000, days: 16, label: "Up to 50 Products + UPI Gateway" },
      pro: { price: 24000, days: 22, label: "Unlimited Catalog + Multi-currency" },
      custom: { price: 38000, days: 30, label: "Headless Shopify / Custom Store" },
    },
    mobile: {
      starter: { price: 20000, days: 15, label: "Single Platform MVP (Flutter)" },
      standard: { price: 35000, days: 24, label: "Android & iOS Native Apps" },
      pro: { price: 55000, days: 35, label: "Complete App + Admin Dashboard" },
      custom: { price: 85000, days: 45, label: "Enterprise Mobile Architecture" },
    },
    saas: {
      starter: { price: 25000, days: 18, label: "MVP Dashboard + Auth" },
      standard: { price: 45000, days: 28, label: "Multi-tenant SaaS + Stripe/UPI" },
      pro: { price: 75000, days: 40, label: "Full Fullstack Platform + Analytics" },
      custom: { price: 120000, days: 60, label: "Complex Distributed Architecture" },
    },
  };

  const addonsList: Addon[] = [
    { id: "payment", name: "Razorpay / UPI Payment Gateway", price: 2500, timeDays: 2 },
    { id: "cms", name: "Admin CMS & Blog Dashboard", price: 2000, timeDays: 2 },
    { id: "3d", name: "3D Animations & Three.js WebGL", price: 3500, timeDays: 3 },
    { id: "seo", name: "Advanced SEO & Speed 95+ Audit", price: 1500, timeDays: 1 },
    { id: "chat", name: "AI Chatbot / WhatsApp Widget", price: 2000, timeDays: 2 },
    { id: "sla", name: "60 Days Extended Bug Warranty", price: 2500, timeDays: 0 },
  ];

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const currentBase = basePricing[projectType][pageScope];
  const addonsTotal = selectedAddons.reduce((sum, id) => {
    const found = addonsList.find((a) => a.id === id);
    return sum + (found ? found.price : 0);
  }, 0);

  const addonsDays = selectedAddons.reduce((sum, id) => {
    const found = addonsList.find((a) => a.id === id);
    return sum + (found ? found.timeDays : 0);
  }, 0);

  const totalPrice = currentBase.price + addonsTotal;
  const totalDays = currentBase.days + addonsDays;

  const projectTypeName = {
    website: "Custom Website",
    ecommerce: "E-Commerce Store",
    mobile: "Android & iOS Mobile App",
    saas: "Custom Web App / SaaS",
  }[projectType];

  const waMessage = `Hi Codexa Technologies! I just calculated my project estimate on your website:
• Project Type: ${projectTypeName}
• Scope: ${currentBase.label}
• Estimated Cost: ₹${totalPrice.toLocaleString("en-IN")} (+ GST)
• Estimated Delivery: ~${totalDays} Days
Can we discuss this?`;

  const waUrl = `https://wa.me/919580849709?text=${encodeURIComponent(waMessage)}`;

  return (
    <section id="estimator" className="relative py-20 sm:py-28 bg-[#05050A] border-t border-white/[0.06] overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-violet-600/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-[#8B6CFF] text-[11px] sm:text-xs font-mono tracking-wider uppercase mb-3.5 sm:mb-4">
            <Calculator className="w-3.5 h-3.5 text-[#8B6CFF]" />
            <span>Interactive Cost Calculator</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-3 sm:mb-5">
            Estimate Your Project in{" "}
            <span className="text-silver-violet">30 Seconds.</span>
          </h2>

          <p className="text-sm sm:text-lg text-[#A1A1B5] leading-relaxed max-w-2xl px-2">
            No guessing games or delayed quotes. Select your project parameters below to get instant, transparent pricing and delivery timelines.
          </p>
        </div>

        {/* Calculator Card Container */}
        <div className="relative rounded-2xl sm:rounded-3xl bg-[#090916] border border-violet-500/40 p-5 sm:p-10 lg:p-12 shadow-[0_0_60px_rgba(108,76,245,0.25)] backdrop-blur-2xl">
          <BorderBeam size={260} duration={7} colorFrom="#8B6CFF" colorTo="#FFFFFF" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Interactive Selectors (7 cols) */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
              {/* Step 1: Project Type */}
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-3">
                  Step 1 • Select What You Want To Build
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: "website", label: "Website", icon: "🌐" },
                    { id: "ecommerce", label: "E-Commerce", icon: "🛍️" },
                    { id: "mobile", label: "Mobile App", icon: "📱" },
                    { id: "saas", label: "SaaS / Web App", icon: "⚡" },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setProjectType(t.id as any)}
                      className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                        projectType === t.id
                          ? "bg-violet-600/30 border-violet-500 text-white shadow-[0_0_20px_rgba(108,76,245,0.4)]"
                          : "bg-white/[0.02] border-white/10 text-zinc-400 hover:text-white hover:bg-white/[0.05]"
                      }`}
                    >
                      <span className="text-xl">{t.icon}</span>
                      <span className="font-heading text-xs font-semibold">{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Scope / Pages */}
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-3">
                  Step 2 • Select Scope & Screen Volume
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {(["starter", "standard", "pro", "custom"] as const).map((key) => {
                    const option = basePricing[projectType][key];
                    const active = pageScope === key;

                    return (
                      <button
                        key={key}
                        onClick={() => setPageScope(key)}
                        className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                          active
                            ? "bg-violet-600/20 border-violet-500 text-white shadow-[0_0_15px_rgba(108,76,245,0.3)]"
                            : "bg-white/[0.02] border-white/10 text-zinc-400 hover:text-white hover:bg-white/[0.05]"
                        }`}
                      >
                        <div>
                          <div className="font-heading text-xs font-bold capitalize text-white">
                            {key} Scope
                          </div>
                          <div className="text-[11px] text-zinc-400 font-mono mt-0.5">
                            {option.label}
                          </div>
                        </div>
                        <span className="font-mono text-xs font-semibold text-[#8B6CFF]">
                          ₹{option.price.toLocaleString("en-IN")}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Add-ons */}
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-3">
                  Step 3 • Add Optional Modules & Features
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {addonsList.map((addon) => {
                    const isSelected = selectedAddons.includes(addon.id);

                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between select-none ${
                          isSelected
                            ? "bg-violet-500/15 border-violet-500/70 text-white"
                            : "bg-white/[0.02] border-white/10 text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-4 h-4 rounded-md flex items-center justify-center border transition-all ${
                              isSelected
                                ? "bg-violet-600 border-violet-400 text-white"
                                : "border-white/20 bg-black/40"
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3" />}
                          </div>
                          <span className="text-xs font-medium">{addon.name}</span>
                        </div>
                        <span className="text-[11px] font-mono text-zinc-400 shrink-0 ml-2">
                          +₹{addon.price.toLocaleString("en-IN")}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Live Output & WhatsApp Action (5 cols) */}
            <div className="lg:col-span-5 w-full">
              <div className="p-6 sm:p-8 rounded-2xl bg-[#0F0F24] border border-violet-500/50 shadow-[0_0_40px_rgba(108,76,245,0.35)] flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                      Live Estimate Summary
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      Instant Calculation
                    </span>
                  </div>

                  {/* Big Calculated Price */}
                  <div className="py-6">
                    <span className="text-xs text-zinc-400 block mb-1">
                      Estimated Project Investment:
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-heading text-4xl sm:text-5xl font-extrabold text-white">
                        ₹{totalPrice.toLocaleString("en-IN")}
                      </span>
                      <span className="text-xs font-mono text-zinc-400">+ 18% GST</span>
                    </div>

                    <div className="flex items-center gap-2 mt-3 text-xs text-[#8B6CFF] font-mono">
                      <Clock className="w-4 h-4 shrink-0" />
                      <span>Estimated Timeline: ~{totalDays} Business Days</span>
                    </div>
                  </div>

                  {/* Summary Bullets */}
                  <div className="space-y-2 pt-4 border-t border-white/[0.08] text-xs text-zinc-300">
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Project Type:</span>
                      <span className="font-medium text-white">{projectTypeName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Selected Scope:</span>
                      <span className="font-medium text-white capitalize">{pageScope} Tier</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Add-on Modules:</span>
                      <span className="font-medium text-white">{selectedAddons.length} Selected</span>
                    </div>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="space-y-3 pt-2">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full violet-glow-btn btn-shimmer py-4 rounded-xl font-heading text-xs uppercase tracking-wider font-semibold text-white flex items-center justify-center gap-2 cursor-pointer text-center"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Lock This Quote on WhatsApp</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono text-zinc-400 pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Fixed Milestone Guarantee • No hidden fees</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
