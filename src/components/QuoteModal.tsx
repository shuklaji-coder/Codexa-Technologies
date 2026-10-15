"use client";

import { useState, useEffect, useMemo } from "react";
import confetti from "canvas-confetti";
import {
  X,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Globe,
  ShoppingBag,
  Smartphone,
  Cpu,
  Palette,
  Wrench,
  CreditCard,
  LayoutDashboard,
  MessageSquare,
  Zap,
  ShieldCheck,
  Search,
  Check,
  Copy,
  Clock,
  Send,
} from "lucide-react";
import Logo from "./Logo";
import { sounds } from "@/utils/soundEffects";
import MagneticButton from "./animations/MagneticButton";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  presetService?: string;
  presetPlan?: string;
}

interface CategoryOption {
  id: string;
  title: string;
  subtitle: string;
  basePrice: number;
  icon: typeof Globe;
  badge: string;
}

const CATEGORIES: CategoryOption[] = [
  {
    id: "web",
    title: "High-Performance Website",
    subtitle: "Corporate, SaaS Landing Page, 60 FPS (Next.js)",
    basePrice: 9999,
    icon: Globe,
    badge: "Most Popular",
  },
  {
    id: "ecom",
    title: "E-Commerce Platform",
    subtitle: "Payment Gateway, Catalog, Cart & Inventory",
    basePrice: 19999,
    icon: ShoppingBag,
    badge: "High ROI",
  },
  {
    id: "app",
    title: "Mobile App (iOS & Android)",
    subtitle: "Flutter / React Native, Play Store Ready",
    basePrice: 29999,
    icon: Smartphone,
    badge: "Client Favorite",
  },
  {
    id: "saas",
    title: "Custom Web App / SaaS",
    subtitle: "Admin Dashboard, Scalable DB & REST/GraphQL API",
    basePrice: 34999,
    icon: Cpu,
    badge: "Full-Stack",
  },
  {
    id: "uiux",
    title: "UI/UX & 3D Interactive Web",
    subtitle: "Figma Design, Three.js 3D & Cyberpunk Dark Mode",
    basePrice: 14999,
    icon: Palette,
    badge: "Award-Winning",
  },
  {
    id: "maint",
    title: "Maintenance & Speed Audit",
    subtitle: "Bug Fixes, 99.9% Uptime & Security Hardening",
    basePrice: 7999,
    icon: Wrench,
    badge: "Zero-Downtime",
  },
];

interface FeatureOption {
  id: string;
  name: string;
  price: number;
  icon: typeof CreditCard;
}

const FEATURES: FeatureOption[] = [
  { id: "payments", name: "Razorpay / UPI / Stripe Integration", price: 3000, icon: CreditCard },
  { id: "admin", name: "Custom Admin CMS & Analytics", price: 5000, icon: LayoutDashboard },
  { id: "whatsapp", name: "WhatsApp & SMS Automation Alerts", price: 2500, icon: MessageSquare },
  { id: "threejs", name: "Three.js 3D Canvas & Audio Effects", price: 4000, icon: Sparkles },
  { id: "playstore", name: "Google Play Store / App Store Publish", price: 4500, icon: Smartphone },
  { id: "speed", name: "Sub-Second 60 FPS Speed Optimization", price: 2000, icon: Zap },
  { id: "security", name: "Enterprise Security & NDA Hardening", price: 2500, icon: ShieldCheck },
  { id: "seo", name: "Technical SEO & Schema Metadata", price: 2000, icon: Search },
];

interface TimelineOption {
  id: string;
  name: string;
  badge: string;
  multiplier: number;
}

const TIMELINES: TimelineOption[] = [
  { id: "urgent", name: "Express Sprint (< 7 Days)", badge: "⚡ 24/7 Dedicated", multiplier: 1.2 },
  { id: "standard", name: "Standard Velocity (2 Weeks)", badge: "🚀 Recommended", multiplier: 1.0 },
  { id: "flexible", name: "Comprehensive Build (1 Month+)", badge: "🗓️ Deep Product", multiplier: 0.95 },
];

export default function QuoteModal({
  isOpen,
  onClose,
  presetService = "",
  presetPlan = "",
}: QuoteModalProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("web");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(["payments", "speed"]);
  const [selectedTimeline, setSelectedTimeline] = useState<string>("standard");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  const [quoteId, setQuoteId] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // Sync presets from external triggers
  useEffect(() => {
    if (presetService) {
      const lower = presetService.toLowerCase();
      if (lower.includes("e-com") || lower.includes("store")) setSelectedCategory("ecom");
      else if (lower.includes("app") || lower.includes("mobile") || lower.includes("chaloji")) setSelectedCategory("app");
      else if (lower.includes("saas") || lower.includes("custom")) setSelectedCategory("saas");
      else if (lower.includes("ui") || lower.includes("design")) setSelectedCategory("uiux");
      else if (lower.includes("maint") || lower.includes("support")) setSelectedCategory("maint");
      else setSelectedCategory("web");
    }
  }, [presetService]);

  useEffect(() => {
    if (presetPlan) {
      const lower = presetPlan.toLowerCase();
      if (lower.includes("app") || lower.includes("saas")) setSelectedCategory("app");
      else if (lower.includes("growth") || lower.includes("e-com")) setSelectedCategory("ecom");
      else if (lower.includes("custom")) setSelectedCategory("saas");
      setFormData((prev) => ({
        ...prev,
        notes: `Selected Package: ${presetPlan}. ` + (prev.notes || ""),
      }));
    }
  }, [presetPlan]);

  // Handle Escape key & lock scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Calculate dynamic price range
  const calculation = useMemo(() => {
    const cat = CATEGORIES.find((c) => c.id === selectedCategory) || CATEGORIES[0];
    const featCost = selectedFeatures.reduce((acc, featId) => {
      const f = FEATURES.find((item) => item.id === featId);
      return acc + (f ? f.price : 0);
    }, 0);
    const timeOpt = TIMELINES.find((t) => t.id === selectedTimeline) || TIMELINES[1];

    const baseSubtotal = Math.round((cat.basePrice + featCost) * timeOpt.multiplier);
    const minPrice = Math.floor(baseSubtotal / 1000) * 1000;
    const maxPrice = Math.ceil((baseSubtotal * 1.35) / 1000) * 1000;

    return {
      category: cat,
      minPrice,
      maxPrice,
      timeline: timeOpt,
      formattedRange: `₹${minPrice.toLocaleString("en-IN")} - ₹${maxPrice.toLocaleString("en-IN")}`,
    };
  }, [selectedCategory, selectedFeatures, selectedTimeline]);

  if (!isOpen) return null;

  const handleToggleFeature = (id: string) => {
    sounds.playClick();
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleNextStep = () => {
    sounds.playRobot();
    setStep((prev) => (Math.min(3, prev + 1) as 1 | 2 | 3));
  };

  const handlePrevStep = () => {
    sounds.playClick();
    setStep((prev) => (Math.max(1, prev - 1) as 1 | 2 | 3));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const generatedId = `CDX-${Math.floor(1000 + Math.random() * 9000)}`;
    setQuoteId(generatedId);

    setTimeout(() => {
      setLoading(false);
      setStep(4);
      sounds.playSuccess();

      try {
        confetti({
          particleCount: 90,
          spread: 75,
          origin: { y: 0.5 },
          colors: ["#6C4CF5", "#00F5FF", "#10B981", "#FFFFFF"],
        });
      } catch {}
    }, 600);
  };

  // WhatsApp Message Formatter
  const getWhatsAppMessage = () => {
    const selectedFeatureNames = selectedFeatures
      .map((fid) => FEATURES.find((f) => f.id === fid)?.name)
      .filter(Boolean)
      .join(", ");

    return encodeURIComponent(
      `*New Project Quote Scope (${quoteId || "#CDX-ONLINE"})*\n\n` +
        `• *Client Name:* ${formData.name || "Client"}\n` +
        `• *WhatsApp:* ${formData.phone || "Not provided"}\n` +
        `• *Email:* ${formData.email || "Not provided"}\n\n` +
        `*Project Configuration:*\n` +
        `• *Service:* ${calculation.category.title}\n` +
        `• *Key Features:* ${selectedFeatureNames || "Standard Core Features"}\n` +
        `• *Timeline:* ${calculation.timeline.name}\n` +
        `• *Estimated Scope:* ${calculation.formattedRange} (+ GST)\n\n` +
        (formData.notes ? `*Client Notes:* ${formData.notes}\n\n` : "") +
        `Hi Founder, I would like to lock this quote estimate and schedule a quick kickoff call!`
    );
  };

  const handleCopyQuote = () => {
    const text = decodeURIComponent(getWhatsAppMessage());
    navigator.clipboard.writeText(text);
    setCopied(true);
    sounds.playClick();
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-2xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#080813] border border-violet-500/40 rounded-2xl sm:rounded-3xl shadow-[0_0_80px_rgba(108,76,245,0.35)] max-h-[94vh] flex flex-col overflow-hidden">
        {/* Subtle Ambient Background Plasma */}
        <div className="absolute top-0 right-1/4 w-[350px] h-[200px] bg-violet-600/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[300px] h-[180px] bg-cyan-500/10 rounded-full blur-[90px] pointer-events-none" />

        {/* Modal Top Bar: Header & Direct WhatsApp Shortcut */}
        <div className="relative z-10 px-5 sm:px-7 pt-5 sm:pt-6 pb-4 border-b border-white/[0.08] flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <Logo size="sm" showText={false} glow={true} />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading text-base sm:text-xl font-bold text-white tracking-wide">
                  Milestone Project Configurator
                </h3>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-violet-500/15 border border-violet-500/30 text-[10px] font-mono text-[#8B6CFF] font-semibold">
                  LIVE ESTIMATOR
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-[#A1A1B5]">
                Configure scope, calculate investment, and lock kickoff roadmap.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick WhatsApp Tap */}
            <a
              href="https://wa.me/919580849709?text=Hi%20Codexa%20Technologies,%20I%20want%20to%20quickly%20discuss%20a%20new%20project%20scope."
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 text-[#25D366] text-xs font-mono transition-all"
              title="Skip form & talk immediately on WhatsApp"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Direct WhatsApp: +91 95808 49709</span>
            </a>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/[0.05] border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 3-Step Wizard Indicator */}
        {step < 4 && (
          <div className="relative z-10 px-5 sm:px-7 py-3 bg-[#0B0B1A]/80 border-b border-white/[0.06] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2 sm:gap-4 font-mono text-[11px] sm:text-xs">
              <button
                onClick={() => setStep(1)}
                className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                  step === 1 ? "text-white font-semibold" : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                    step === 1 ? "bg-[#8B6CFF] text-white" : "bg-white/10 text-zinc-400"
                  }`}
                >
                  1
                </span>
                <span>Category</span>
              </button>

              <span className="text-zinc-700">/</span>

              <button
                onClick={() => setStep(2)}
                className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                  step === 2 ? "text-white font-semibold" : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                    step === 2 ? "bg-[#8B6CFF] text-white" : "bg-white/10 text-zinc-400"
                  }`}
                >
                  2
                </span>
                <span>Features & Velocity</span>
              </button>

              <span className="text-zinc-700">/</span>

              <button
                onClick={() => setStep(3)}
                className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                  step === 3 ? "text-white font-semibold" : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                    step === 3 ? "bg-[#8B6CFF] text-white" : "bg-white/10 text-zinc-400"
                  }`}
                >
                  3
                </span>
                <span>Receipt & Launch</span>
              </button>
            </div>

            {/* Dynamic Estimated Scope Tag */}
            <div className="hidden sm:flex items-center gap-1.5 font-mono text-xs">
              <span className="text-zinc-400">Estimate:</span>
              <span className="text-[#00F5FF] font-semibold">{calculation.formattedRange}</span>
            </div>
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="relative z-10 p-5 sm:p-7 overflow-y-auto flex-1">
          {/* ================= STEP 1: CATEGORY SELECTION ================= */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h4 className="text-sm sm:text-base font-semibold text-white">
                  Step 1: Select your project category
                </h4>
                <span className="text-[11px] font-mono text-zinc-400">
                  Select 1 option to calibrate base architecture
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                {CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  const isSelected = selectedCategory === cat.id;

                  return (
                    <div
                      key={cat.id}
                      onClick={() => {
                        sounds.playClick();
                        setSelectedCategory(cat.id);
                      }}
                      className={`relative p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between group ${
                        isSelected
                          ? "bg-violet-950/40 border-[#8B6CFF] shadow-[0_0_25px_rgba(108,76,245,0.35)]"
                          : "bg-white/[0.02] border-white/10 hover:border-violet-500/40 hover:bg-white/[0.04]"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-2.5 rounded-xl border transition-transform group-hover:scale-105 ${
                              isSelected
                                ? "bg-violet-600 text-white border-violet-400"
                                : "bg-white/5 text-zinc-400 border-white/10"
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-white">
                              {cat.title}
                            </div>
                            <div className="text-[11px] text-[#A1A1B5] mt-0.5 leading-snug">
                              {cat.subtitle}
                            </div>
                          </div>
                        </div>

                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-[#8B6CFF] text-white flex items-center justify-center shrink-0">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        )}
                      </div>

                      <div className="mt-3.5 pt-2.5 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono">
                        <span className="text-zinc-400">From ₹{cat.basePrice.toLocaleString("en-IN")}</span>
                        <span className="text-[#8B6CFF] font-medium">{cat.badge}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Step 1 Footer */}
              <div className="pt-4 flex items-center justify-between border-t border-white/[0.08]">
                <div className="text-xs font-mono text-zinc-400 hidden sm:block">
                  Need custom architecture? Choose Custom Web App / SaaS.
                </div>
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="w-full sm:w-auto ml-auto violet-glow-btn px-6 py-3 rounded-xl font-heading text-xs font-semibold uppercase tracking-wider text-white inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Continue to Features</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 2: FEATURES & VELOCITY ================= */}
          {step === 2 && (
            <div className="space-y-6">
              {/* Feature Chips */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm sm:text-base font-semibold text-white">
                    Step 2: Choose required features & integrations
                  </h4>
                  <span className="text-[11px] font-mono text-zinc-400">
                    Tap to toggle features
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {FEATURES.map((feat) => {
                    const Icon = feat.icon;
                    const isChecked = selectedFeatures.includes(feat.id);

                    return (
                      <div
                        key={feat.id}
                        onClick={() => handleToggleFeature(feat.id)}
                        className={`p-3 sm:p-3.5 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 ${
                          isChecked
                            ? "bg-violet-950/40 border-[#8B6CFF] shadow-[0_0_15px_rgba(108,76,245,0.25)]"
                            : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`p-2 rounded-lg ${
                              isChecked
                                ? "bg-violet-600 text-white"
                                : "bg-white/5 text-zinc-400"
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-xs font-medium text-white block">
                              {feat.name}
                            </span>
                            <span className="text-[10px] font-mono text-zinc-400">
                              +₹{feat.price.toLocaleString("en-IN")} scope
                            </span>
                          </div>
                        </div>

                        <div
                          className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                            isChecked
                              ? "bg-[#8B6CFF] border-[#8B6CFF] text-white"
                              : "border-white/20 bg-black/40"
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Delivery Velocity Selector */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm sm:text-base font-semibold text-white flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#8B6CFF]" />
                    <span>Target Delivery Velocity</span>
                  </h4>
                  <span className="text-[11px] font-mono text-zinc-400">Sprint Timeline</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {TIMELINES.map((time) => {
                    const isSelected = selectedTimeline === time.id;

                    return (
                      <div
                        key={time.id}
                        onClick={() => {
                          sounds.playClick();
                          setSelectedTimeline(time.id);
                        }}
                        className={`p-3.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? "bg-emerald-950/40 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.25)]"
                            : "bg-white/[0.02] border-white/10 hover:border-white/20"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-semibold text-white">
                            {time.name}
                          </span>
                          {isSelected && (
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                          )}
                        </div>
                        <span className="text-[10px] font-mono text-emerald-400">
                          {time.badge}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 2 Footer */}
              <div className="pt-4 flex items-center justify-between border-t border-white/[0.08]">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-semibold text-zinc-300 hover:text-white inline-flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={handleNextStep}
                  className="violet-glow-btn px-6 py-3 rounded-xl font-heading text-xs font-semibold uppercase tracking-wider text-white inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>Review Receipt & Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 3: CONTACT & RECEIPT ================= */}
          {step === 3 && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Column: Client Contact Information (7 cols) */}
                <div className="lg:col-span-7 space-y-4">
                  <h4 className="text-sm sm:text-base font-semibold text-white">
                    Step 3: Where should we dispatch the architectural proposal?
                  </h4>

                  <div className="space-y-3.5">
                    <div>
                      <label className="block text-[10px] sm:text-[11px] font-mono text-zinc-300 uppercase mb-1">
                        Your Name / Company *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Aman Sharma / Fintech Startup"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500 text-sm transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] sm:text-[11px] font-mono text-zinc-300 uppercase mb-1">
                          WhatsApp / Phone *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 95808 49709"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500 text-sm transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] sm:text-[11px] font-mono text-zinc-300 uppercase mb-1">
                          Work Email *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="aman@domain.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500 text-sm transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] sm:text-[11px] font-mono text-zinc-300 uppercase mb-1">
                        Specific Requirements / Reference Links
                      </label>
                      <textarea
                        rows={3}
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="Share competitors, design inspirations, or custom backend requirements..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500 text-sm resize-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Right Column: Live Glassmorphic Quote Receipt (5 cols) */}
                <div className="lg:col-span-5 p-4 sm:p-5 rounded-2xl bg-[#0F0F24]/90 border border-violet-500/30 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
                      <div className="text-xs font-mono font-semibold text-white tracking-wider">
                        CONFIGURED SCOPE
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                        ESTIMATE READY
                      </span>
                    </div>

                    <div className="space-y-2.5 text-xs">
                      <div className="flex justify-between">
                        <span className="text-zinc-400">Core Architecture:</span>
                        <span className="text-white font-medium text-right truncate max-w-[150px]">
                          {calculation.category.title}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-zinc-400">Selected Features:</span>
                        <span className="text-[#8B6CFF] font-medium font-mono">
                          {selectedFeatures.length} Add-ons
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-zinc-400">Sprint Velocity:</span>
                        <span className="text-emerald-400 font-medium">
                          {calculation.timeline.name.split("(")[0]}
                        </span>
                      </div>

                      <div className="pt-3 border-t border-white/10 flex items-baseline justify-between">
                        <span className="text-zinc-400 font-mono text-xs">Estimated Scope:</span>
                        <span className="text-base sm:text-lg font-mono font-bold text-white drop-shadow-[0_0_15px_rgba(139,108,255,0.4)]">
                          {calculation.formattedRange}
                        </span>
                      </div>
                      <p className="text-[10px] font-mono text-zinc-400 text-right">
                        *Milestone based billing • Zero upfront full payment
                      </p>
                    </div>

                    {/* Guarantee Badges */}
                    <div className="mt-4 pt-3 border-t border-white/10 space-y-1.5 text-[11px] text-zinc-400">
                      <div className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>100% Code Ownership & GitHub Handover</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-[#00F5FF]" />
                        <span>30-Day Free Post-Launch Warranty</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10 text-[10px] font-mono text-zinc-400">
                    Official email dispatch: <span className="text-zinc-300">codexatechnologiesint@gmail.com</span>
                  </div>
                </div>
              </div>

              {/* Step 3 Action Buttons */}
              <div className="pt-4 flex items-center justify-between border-t border-white/[0.08]">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-semibold text-zinc-300 hover:text-white inline-flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="violet-glow-btn btn-shimmer px-8 py-3.5 rounded-xl font-heading text-xs font-semibold uppercase tracking-wider text-white inline-flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <span>Compiling Scope...</span>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Lock Scope & Generate Quote</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* ================= STEP 4: SUCCESS & WHATSAPP DISPATCH ================= */}
          {step === 4 && (
            <div className="py-6 sm:py-8 flex flex-col items-center text-center max-w-xl mx-auto space-y-5">
              <div className="w-16 h-16 rounded-3xl bg-emerald-600/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 shadow-[0_0_35px_rgba(16,185,129,0.4)] animate-bounce">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="font-mono text-xs text-[#8B6CFF] tracking-widest uppercase">
                  OFFICIAL QUOTE REFERENCE: #{quoteId}
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mt-1">
                  Project Scope Confirmed!
                </h3>
                <p className="text-xs sm:text-sm text-[#A1A1B5] mt-2 max-w-md mx-auto">
                  Our engineering team has generated your architectural blueprint for{" "}
                  <strong className="text-white">{calculation.category.title}</strong>.
                </p>
              </div>

              {/* Digital Receipt Card */}
              <div className="w-full p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 text-left font-mono text-xs space-y-2">
                <div className="flex justify-between border-b border-white/10 pb-2 text-zinc-400">
                  <span>Configuration ID: #{quoteId}</span>
                  <span className="text-emerald-400">● Live on System</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-zinc-400">Client:</span>
                  <span className="text-white font-medium">{formData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Target Velocity:</span>
                  <span className="text-zinc-200">{calculation.timeline.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Estimated Scope:</span>
                  <span className="text-[#00F5FF] font-bold text-sm">
                    {calculation.formattedRange}
                  </span>
                </div>
              </div>

              {/* Primary Action: 1-Tap WhatsApp to Founder */}
              <div className="w-full space-y-2.5 pt-2">
                <a
                  href={`https://wa.me/919580849709?text=${getWhatsAppMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sounds.playClick()}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#20ba59] to-[#2af074] hover:opacity-95 text-white font-heading font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-[0_0_30px_rgba(37,211,102,0.4)] transition-all transform hover:scale-[1.02] cursor-pointer"
                >
                  <MessageSquare className="w-5 h-5 fill-white" />
                  <span>Send Official Quote to WhatsApp (+91 95808 49709)</span>
                </a>

                <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full">
                  <button
                    type="button"
                    onClick={handleCopyQuote}
                    className="w-full sm:w-1/2 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-mono font-medium text-zinc-300 hover:text-white flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-400">Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-zinc-400" />
                        <span>Copy Quote Summary</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setStep(1);
                      onClose();
                    }}
                    className="w-full sm:w-1/2 py-3 rounded-xl bg-violet-600/20 hover:bg-violet-600/30 border border-violet-500/40 text-xs font-heading uppercase tracking-wider font-semibold text-white flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <span>Done & Return to Site</span>
                  </button>
                </div>
              </div>

              <p className="text-[11px] font-mono text-zinc-400">
                Official inquiry dispatch confirmed: <span className="text-zinc-300">codexatechnologiesint@gmail.com</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
