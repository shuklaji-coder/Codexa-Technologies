"use client";

import { useState, useEffect } from "react";
import Logo from "./Logo";
import { Menu, X, ArrowUpRight, Sparkles, Mail } from "lucide-react";
import MagneticButton from "./animations/MagneticButton";
import { sounds } from "@/utils/soundEffects";

interface NavbarProps {
  onOpenQuoteModal: () => void;
}

export default function Navbar({ onOpenQuoteModal }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Why Us", href: "#why-us" },
    { name: "Work", href: "#work" },
    { name: "Apps", href: "#apps" },
    { name: "Process", href: "#process" },
    { name: "Founder", href: "#founder" },
    { name: "Pricing", href: "#pricing" },
    { name: "Reviews", href: "#testimonials" },
    { name: "FAQ", href: "#faq" },
    { name: "Contact", href: "#contact" },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "glass-nav py-3 sm:py-3.5 shadow-[0_4px_30px_rgba(0,0,0,0.8)]"
          : "bg-transparent py-4 sm:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo Left */}
          <div className="flex items-center">
            <Logo size="md" glow={true} />
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[13px] font-medium text-[#A1A1B5] hover:text-white px-3 py-1.5 rounded-full transition-colors duration-200 hover:bg-white/[0.05]"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Button on Desktop with Magnetic Pull & Sound */}
          <div className="hidden sm:flex items-center gap-3">
            <MagneticButton strength={0.25}>
              <button
                onClick={() => {
                  sounds.playClick();
                  onOpenQuoteModal();
                }}
                onMouseEnter={() => sounds.playHover()}
                className="violet-glow-btn btn-shimmer group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-heading text-xs uppercase tracking-wider font-semibold text-white cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-white/90 group-hover:rotate-12 transition-transform duration-300" />
                <span>Get a Free Quote</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </MagneticButton>
          </div>

          {/* Mobile Actions: Quote Pill + Hamburger */}
          <div className="flex items-center gap-2 sm:hidden">
            <button
              onClick={onOpenQuoteModal}
              className="text-[11px] font-heading font-semibold px-3 py-1.5 rounded-lg bg-violet-600 text-white shadow-[0_0_15px_rgba(108,76,245,0.4)]"
            >
              Quote
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/[0.05] border border-white/10 text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sliding Drawer with full height & smooth scroll */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[60px] bottom-0 bg-[#05050A]/98 backdrop-blur-3xl border-b border-white/10 px-6 py-6 transition-all duration-300 shadow-2xl overflow-y-auto flex flex-col justify-between">
          <div className="flex flex-col space-y-1.5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={handleLinkClick}
                className="text-base font-medium text-[#A1A1B5] hover:text-white hover:bg-white/5 px-4 py-3 rounded-xl transition-all flex items-center justify-between"
              >
                <span>{link.name}</span>
                <span className="text-zinc-600 text-sm">→</span>
              </a>
            ))}
          </div>

          <div className="pt-6 pb-4 border-t border-white/10 mt-6 space-y-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuoteModal();
              }}
              className="w-full violet-glow-btn btn-shimmer py-3.5 rounded-xl font-heading text-xs font-semibold uppercase tracking-wider text-white text-center flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Get a Free Quote</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <a
              href="https://wa.me/919580849709?text=Hello%20Codexa%20Technologies,%20I%20would%20like%20to%20discuss%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl bg-emerald-600/15 hover:bg-emerald-600/25 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-semibold text-center flex items-center justify-center gap-2 transition-all"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>WhatsApp: +91 95808 49709</span>
            </a>

            <a
              href="mailto:codexatechnologiesint@gmail.com"
              className="w-full py-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-zinc-300 hover:text-white font-mono text-[11px] text-center flex items-center justify-center gap-2 transition-all"
            >
              <Mail className="w-3.5 h-3.5 text-[#8B6CFF]" />
              <span>codexatechnologiesint@gmail.com</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
