"use client";

import { useState } from "react";
import confetti from "canvas-confetti";
import {
  Mail,
  MapPin,
  MessageSquare,
  Send,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Github,
  Linkedin,
  Twitter,
  Instagram,
} from "lucide-react";
import { sounds } from "@/utils/soundEffects";

interface ContactProps {
  initialService?: string;
  initialPlan?: string;
}

export default function Contact({
  initialService = "Website Development",
  initialPlan = "",
}: ContactProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: initialService,
    budget: "₹10,000 - ₹25,000",
    message: initialPlan ? `Inquiring about ${initialPlan}. ` : "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      sounds.playSuccess();

      try {
        confetti({
          particleCount: 75,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#6C4CF5", "#8B6CFF", "#FFFFFF", "#C4B5FD"],
        });
      } catch (err) {
        // safe
      }
    }, 850);
  };

  return (
    <section id="contact" className="relative py-20 sm:py-28 bg-[#07070E] border-t border-white/[0.05]">
      {/* Background glow spot */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-[#8B6CFF] text-[11px] sm:text-xs font-mono tracking-wider uppercase mb-3 sm:mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#8B6CFF]" />
            <span>Direct Inquiries</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-3 sm:mb-5">
            Let’s Build Your Next{" "}
            <span className="text-silver-violet">Competitive Advantage.</span>
          </h2>

          <p className="text-sm sm:text-lg text-[#A1A1B5] leading-relaxed max-w-2xl px-2">
            Fill out the project scope form below, or reach out directly via WhatsApp for an immediate response from our engineering lead.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
          {/* Left Column: Direct Channels & Company Info */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 sm:space-y-8">
            <div className="space-y-5 sm:space-y-6">
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-white">
                Get in touch with senior developers.
              </h3>
              <p className="text-xs sm:text-sm text-[#A1A1B5] leading-relaxed">
                We review every project request and respond within 2 to 4 business hours with an initial architectural roadmap and fixed milestone estimate.
              </p>

              {/* Direct Channel Cards */}
              <div className="space-y-3 sm:space-y-4 pt-1 sm:pt-2">
                {/* WhatsApp */}
                <a
                  href="https://wa.me/919580849709?text=Hi%20Codexa%20Technologies,%20I%20would%20like%20to%20discuss%20a%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-[#25D366]/50 hover:bg-[#25D366]/5 transition-all flex items-center gap-3.5 sm:gap-4 group"
                >
                  <div className="p-3 rounded-xl bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20 group-hover:scale-105 transition-transform shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] sm:text-xs font-mono text-zinc-400">Direct WhatsApp</div>
                    <div className="text-sm font-semibold text-white group-hover:text-[#25D366] transition-colors">
                      +91 95808 49709
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-emerald-400 font-mono mt-0.5">
                      ● Active Now • Instant Reply
                    </div>
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:codexatechnologiesint@gmail.com"
                  className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-violet-500/50 hover:bg-violet-500/5 transition-all flex items-center gap-3.5 sm:gap-4 group"
                >
                  <div className="p-3 rounded-xl bg-violet-500/10 text-[#8B6CFF] border border-violet-500/20 group-hover:scale-105 transition-transform shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] sm:text-xs font-mono text-zinc-400">Official Inquiries</div>
                    <div className="text-sm font-semibold text-white group-hover:text-[#8B6CFF] transition-colors break-all">
                      codexatechnologiesint@gmail.com
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-zinc-400 font-mono mt-0.5">
                      RFP & Project Proposals
                    </div>
                  </div>
                </a>

                {/* Location */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex items-center gap-3.5 sm:gap-4">
                  <div className="p-3 rounded-xl bg-white/[0.05] text-silver border border-white/10 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] sm:text-xs font-mono text-zinc-400">Engineering HQ</div>
                    <div className="text-sm font-semibold text-white">
                      Bengaluru & Pan-India Remote
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-zinc-400 font-mono mt-0.5">
                      Global Client Delivery
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Icons */}
            <div className="pt-4 sm:pt-6 border-t border-white/[0.08]">
              <span className="text-[11px] sm:text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2.5">
                Follow Codexa Technologies
              </span>
              <div className="flex items-center gap-2.5">
                {[
                  { name: "GitHub", icon: Github, href: "https://github.com" },
                  { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/rohan-shukla-0b8889321/" },
                  { name: "Twitter/X", icon: Twitter, href: "https://twitter.com" },
                  { name: "Instagram", icon: Instagram, href: "https://instagram.com" },
                ].map((s, idx) => (
                  <a
                    key={idx}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 sm:p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-zinc-300 hover:text-white hover:border-violet-500/60 hover:bg-violet-500/10 transition-all"
                    aria-label={s.name}
                  >
                    <s.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: High-Conversion Form */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 border border-white/[0.08] shadow-[0_10px_40px_rgba(0,0,0,0.7)]">
              {submitted ? (
                <div className="py-8 sm:py-12 flex flex-col items-center text-center">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-violet-600/20 border-2 border-violet-500 flex items-center justify-center text-[#8B6CFF] mb-5 shadow-[0_0_30px_rgba(108,76,245,0.4)]">
                    <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8" />
                  </div>
                  <h3 className="font-heading text-xl sm:text-3xl font-bold text-white mb-2">
                    Message Received!
                  </h3>
                  <p className="text-xs sm:text-sm text-[#A1A1B5] max-w-md mb-6 sm:mb-8 px-2">
                    Thank you for reaching out to Codexa Technologies. Our lead engineer is reviewing your brief and will connect with you within 2 hours.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
                    <a
                      href={`https://wa.me/919580849709?text=${encodeURIComponent(
                        `Hi Codexa Technologies! I just submitted an inquiry on your website:\n• Name: ${formData.name || "Client"}\n• Service: ${formData.service}\n• Budget: ${formData.budget}\nCan we discuss my project kickoff?`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#25D366] font-semibold text-xs uppercase tracking-wider transition-all"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Continue on WhatsApp (+91 95808 49709)</span>
                    </a>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: "",
                          email: "",
                          phone: "",
                          service: "Website Development",
                          budget: "₹10,000 - ₹25,000",
                          message: "",
                        });
                      }}
                      className="w-full sm:w-auto violet-glow-btn px-6 py-3 rounded-xl font-heading text-xs uppercase tracking-wider font-semibold text-white cursor-pointer"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {/* Full Name */}
                    <div>
                      <label className="block text-[11px] sm:text-xs font-mono text-zinc-300 mb-1.5 uppercase tracking-wider">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Sharma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 text-base sm:text-sm transition-all"
                      />
                    </div>

                    {/* Work Email */}
                    <div>
                      <label className="block text-[11px] sm:text-xs font-mono text-zinc-300 mb-1.5 uppercase tracking-wider">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. rahul@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 text-base sm:text-sm transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {/* Phone Number */}
                    <div>
                      <label className="block text-[11px] sm:text-xs font-mono text-zinc-300 mb-1.5 uppercase tracking-wider">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 95808 49709"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 text-base sm:text-sm transition-all"
                      />
                    </div>

                    {/* Service Dropdown */}
                    <div>
                      <label className="block text-[11px] sm:text-xs font-mono text-zinc-300 mb-1.5 uppercase tracking-wider">
                        Service Required *
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-3.5 py-3 rounded-xl bg-[#090912] border border-white/10 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 text-base sm:text-sm transition-all"
                      >
                        <option value="Website Development">Website Development</option>
                        <option value="E-commerce Development">E-commerce Development</option>
                        <option value="Custom Web Apps">Custom Web Apps / SaaS</option>
                        <option value="Android and iOS App Development">Android & iOS App Development</option>
                        <option value="UI/UX Design">UI/UX & Product Design</option>
                        <option value="Maintenance and Support">Maintenance and Support</option>
                        <option value="Starter Package (₹6,000)">Starter Package (₹6,000)</option>
                        <option value="Standard Package (₹10,000)">Standard Package (₹10,000)</option>
                        <option value="Pro Scale Package (₹15,000)">Pro Scale Package (₹15,000)</option>
                      </select>
                    </div>
                  </div>

                  {/* Budget Dropdown */}
                  <div>
                    <label className="block text-[11px] sm:text-xs font-mono text-zinc-300 mb-1.5 uppercase tracking-wider">
                      Target Budget Range (INR)
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-3.5 py-3 rounded-xl bg-[#090912] border border-white/10 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 text-base sm:text-sm transition-all"
                    >
                      <option value="₹6,000 - ₹10,000">₹6,000 – ₹10,000 (Website / Landing Page)</option>
                      <option value="₹10,000 - ₹25,000">₹10,000 – ₹25,000 (Standard Corporate / Store)</option>
                      <option value="₹25,000 - ₹50,000">₹25,000 – ₹50,000 (E-Commerce / Custom App)</option>
                      <option value="₹50,000 - ₹1,00,000">₹50,000 – ₹1,00,000 (Full SaaS / Mobile App)</option>
                      <option value="₹1,00,000+">₹1,00,000+ (Enterprise Multi-Platform Suite)</option>
                    </select>
                  </div>

                  {/* Project Details Message */}
                  <div>
                    <label className="block text-[11px] sm:text-xs font-mono text-zinc-300 mb-1.5 uppercase tracking-wider">
                      Tell us about your project *
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Share your requirements, expected launch timeline, reference websites..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 text-base sm:text-sm transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full violet-glow-btn btn-shimmer py-3.5 sm:py-4 rounded-xl font-heading text-xs uppercase tracking-wider font-semibold text-white flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <span>Sending Your Request...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Project Request</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-[10px] sm:text-[11px] text-zinc-500 text-center font-mono">
                    🔒 Strict NDA standard • 100% Confidential
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
