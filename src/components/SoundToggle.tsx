"use client";

import { useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { sounds } from "@/utils/soundEffects";

export default function SoundToggle() {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    setEnabled(sounds.enabled);
  }, []);

  const toggleSound = () => {
    const nextState = !enabled;
    setEnabled(nextState);
    sounds.setEnabled(nextState);
  };

  return (
    <div className="fixed bottom-4 left-3.5 sm:bottom-6 sm:left-6 z-40 select-none">
      <button
        onClick={toggleSound}
        className="flex items-center gap-2 p-2.5 sm:px-3.5 sm:py-2 rounded-full bg-[#080811]/90 hover:bg-[#0E0E1F] border border-white/10 hover:border-violet-500/50 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.6)] text-xs font-mono transition-all duration-300 group cursor-pointer"
        aria-label="Toggle Sound Effects"
        title="Toggle Sci-Fi Sound Effects"
      >
        {enabled ? (
          <>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <Volume2 className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span className="text-zinc-300 group-hover:text-white hidden sm:inline">Audio FX: ON</span>
          </>
        ) : (
          <>
            <span className="w-2 h-2 rounded-full bg-zinc-600"></span>
            <VolumeX className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-400 transition-colors" />
            <span className="text-zinc-500 group-hover:text-zinc-300 hidden sm:inline">Audio FX: OFF</span>
          </>
        )}
      </button>
    </div>
  );
}
