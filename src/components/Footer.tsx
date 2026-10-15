"use client";

import Logo from "./Logo";
import { ArrowUp, Github, Linkedin, Twitter, Instagram, ShieldCheck, Heart, Mail } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#05050A] text-white pt-20 pb-12 border-t border-white/[0.08] overflow-hidden">
      {/* Subtle Bottom Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-violet-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Brand Info (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-start space-y-6">
            <Logo size="lg" glow={true} />

            <p className="text-sm text-[#A1A1B5] leading-relaxed max-w-sm">
              Codexa Technologies is an elite web and mobile app development agency based in India. We design and engineer digital flagships for ambitious businesses worldwide.
            </p>

            {/* Live Operational Status */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>All Systems Operational • Taking New Projects</span>
            </div>

            {/* Direct Phone / WhatsApp Pill */}
            <a
              href="https://wa.me/919580849709?text=Hello%20Codexa%20Technologies,%20I%20would%20like%20to%20discuss%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/[0.03] hover:bg-emerald-950/40 border border-white/10 hover:border-emerald-500/40 text-zinc-300 hover:text-emerald-300 text-xs font-mono transition-all"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>WhatsApp / Call: +91 95808 49709</span>
            </a>

            {/* Direct Email Pill */}
            <a
              href="mailto:codexatechnologiesint@gmail.com"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/[0.03] hover:bg-violet-950/40 border border-white/10 hover:border-violet-500/40 text-zinc-300 hover:text-white text-xs font-mono transition-all"
            >
              <Mail className="w-3.5 h-3.5 text-[#8B6CFF]" />
              <span>codexatechnologiesint@gmail.com</span>
            </a>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-2">
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
                  className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-zinc-400 hover:text-white hover:border-violet-500 hover:bg-violet-500/10 transition-all"
                  aria-label={s.name}
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links: Services (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="font-heading text-xs font-semibold uppercase tracking-wider text-white mb-5">
              Services
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-[#A1A1B5]">
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Website Development
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  E-Commerce Platforms
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Custom Web Applications
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  iOS & Android Mobile Apps
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  UI/UX & Product Design
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Performance & Maintenance
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links: Navigation (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="font-heading text-xs font-semibold uppercase tracking-wider text-white mb-5">
              Explore
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-[#A1A1B5]">
              <li>
                <a href="#why-us" className="hover:text-white transition-colors">
                  Why Choose Us
                </a>
              </li>
              <li>
                <a href="#work" className="hover:text-white transition-colors">
                  Featured Work
                </a>
              </li>
              <li>
                <a href="#apps" className="hover:text-white transition-colors">
                  Client Mobile Apps
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-white transition-colors">
                  Our Process
                </a>
              </li>
              <li>
                <a href="#tech-stack" className="hover:text-white transition-colors">
                  Tech Stack
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white transition-colors">
                  Pricing Plans
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-white transition-colors">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links: Trust & Legal (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="font-heading text-xs font-semibold uppercase tracking-wider text-white mb-5">
              Trust & Legal
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-[#A1A1B5]">
              <li className="flex items-center gap-1.5 text-zinc-400">
                <ShieldCheck className="w-3.5 h-3.5 text-[#8B6CFF]" />
                <span>100% Code Handover</span>
              </li>
              <li className="flex items-center gap-1.5 text-zinc-400">
                <ShieldCheck className="w-3.5 h-3.5 text-[#8B6CFF]" />
                <span>NDA Protected</span>
              </li>
              <li className="flex items-center gap-1.5 text-zinc-400">
                <ShieldCheck className="w-3.5 h-3.5 text-[#8B6CFF]" />
                <span>Milestone Billing</span>
              </li>
              <li className="pt-2 text-[11px] text-zinc-500 font-mono">
                GST Registered Agency
              </li>
              <li className="pt-1">
                <a
                  href="tel:+919580849709"
                  className="text-xs font-mono text-zinc-400 hover:text-white transition-colors"
                >
                  Direct: +91 95808 49709
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400 font-mono">
          <div>
            © 2026 Codexa Technologies. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#8B6CFF]" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
