"use client";

import { MessageSquare } from "lucide-react";
import { useState } from "react";

export default function FloatingWhatsApp() {
  const [hovered, setHovered] = useState(false);

  return (
    <aside
      aria-label="Quick contact"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center gap-2.5 sm:gap-3"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Tooltip prompt on desktop */}
      <div
        className={`hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D0D18]/90 border border-violet-500/30 text-white text-xs font-mono shadow-xl transition-all duration-300 backdrop-blur-md ${
          hovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2 pointer-events-none"
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span>Chat with Lead Architect</span>
      </div>

      {/* Button badge */}
      <a
        href="https://wa.me/919580849709?text=Hello%20Codexa%20Technologies,%20I%20would%20like%20to%20discuss%20a%20project%20for%20my%20business."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Codexa Technologies on WhatsApp"
        className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-[#20ba59] to-[#2af074] text-white shadow-[0_0_25px_rgba(37,211,102,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 group cursor-pointer border border-white/20"
      >
        {/* Pulsing ring */}
        <span className="absolute -inset-1 rounded-2xl bg-[#25D366] opacity-30 blur-sm group-hover:opacity-60 transition-opacity animate-pulse" />

        {/* Unread badge ping */}
        <span className="absolute -top-1 -right-1 flex h-3 w-3 sm:h-3.5 sm:w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 sm:h-3.5 sm:w-3.5 bg-emerald-500 border-2 border-black" />
        </span>

        <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7 relative z-10 text-white fill-white" />
      </a>
    </aside>
  );
}
