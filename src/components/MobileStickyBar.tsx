"use client";

import { MessageSquare, Sparkles } from "lucide-react";
import { sounds } from "@/utils/soundEffects";

interface MobileStickyBarProps {
  onOpenQuoteModal: () => void;
}

export default function MobileStickyBar({ onOpenQuoteModal }: MobileStickyBarProps) {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-[#070712]/92 backdrop-blur-xl border-t border-white/[0.08] shadow-[0_-8px_30px_rgba(0,0,0,0.85)] px-3 pt-2.5 pb-[calc(0.6rem+env(safe-area-inset-bottom,0px))] transition-all">
      {/* Top subtle neon glowing divider line */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#8B6CFF]/70 via-[#25D366]/70 to-transparent" />

      <div className="flex items-center gap-2.5 max-w-md mx-auto">
        {/* WhatsApp Direct Chat Button */}
        <a
          href="https://wa.me/919580849709?text=Hi%20Techlifa%20Technologies!%20I%20am%20on%20your%20website%20and%20want%20to%20discuss%20a%20project%20kickoff."
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            try {
              sounds.playClick();
            } catch {}
          }}
          className="flex-1 py-3 px-3 rounded-xl bg-[#25D366]/15 active:bg-[#25D366]/30 border border-[#25D366]/40 text-[#25D366] flex items-center justify-center gap-2 font-heading text-xs uppercase tracking-wider font-bold shadow-[0_0_15px_rgba(37,211,102,0.2)] transition-all cursor-pointer"
        >
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25D366]"></span>
          </span>
          <MessageSquare className="w-4 h-4 fill-[#25D366] shrink-0" />
          <span className="truncate">WhatsApp Chat</span>
        </a>

        {/* Instant Quote Wizard Button */}
        <button
          type="button"
          onClick={() => {
            try {
              sounds.playClick();
            } catch {}
            onOpenQuoteModal();
          }}
          className="flex-1 py-3 px-3 rounded-xl violet-glow-btn btn-shimmer text-white flex items-center justify-center gap-2 font-heading text-xs uppercase tracking-wider font-bold shadow-[0_0_20px_rgba(108,76,245,0.45)] transition-all cursor-pointer"
        >
          <Sparkles className="w-4 h-4 shrink-0 text-white animate-pulse" />
          <span className="truncate">Instant Quote</span>
        </button>
      </div>
    </div>
  );
}

