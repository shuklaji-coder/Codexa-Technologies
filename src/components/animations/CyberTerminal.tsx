"use client";

import { useState, useEffect } from "react";
import { Terminal, Play, RotateCcw, Copy, Check, Sparkles, Shield, Cpu, Zap } from "lucide-react";
import { sounds } from "@/utils/soundEffects";

interface TerminalTab {
  id: "deploy" | "mobile" | "security";
  label: string;
  icon: typeof Terminal;
  command: string;
  lines: { text: string; color: string; delay: number }[];
}

const TABS: TerminalTab[] = [
  {
    id: "deploy",
    label: "deploy.sh",
    icon: Terminal,
    command: "techlifa deploy --target edge-production --optimize=all",
    lines: [
      { text: "> techlifa deploy --target edge-production --optimize=all", color: "text-[#8B6CFF] font-bold", delay: 100 },
      { text: "✔ Parsing AST & compiling Next.js 14 App Router... [140ms]", color: "text-emerald-400", delay: 350 },
      { text: "✔ Bundling Three.js WebGL & Framer Motion pipelines... [80ms]", color: "text-emerald-400", delay: 650 },
      { text: "✔ Optimizing asset CDN payloads & SVG vector sprites... [35ms]", color: "text-emerald-400", delay: 950 },
      { text: "✔ Running Google Core Web Vitals audit:", color: "text-white font-semibold", delay: 1250 },
      { text: "   • First Contentful Paint (FCP): 240ms ⚡ [99/100]", color: "text-[#00F5FF]", delay: 1450 },
      { text: "   • Largest Contentful Paint (LCP): 380ms ⚡ [98/100]", color: "text-[#00F5FF]", delay: 1650 },
      { text: "   • Cumulative Layout Shift (CLS): 0.000 (Zero Shift)", color: "text-[#00F5FF]", delay: 1850 },
      { text: "🚀 Deployed to 320 Edge CDN locations. Platform Unstoppable.", color: "text-emerald-300 font-bold", delay: 2150 },
    ],
  },
  {
    id: "mobile",
    label: "mobile-ecosystem.dart",
    icon: Cpu,
    command: "flutter build appbundle --release --obfuscate",
    lines: [
      { text: "> flutter build appbundle --release --obfuscate", color: "text-[#8B6CFF] font-bold", delay: 100 },
      { text: "✔ Compiling Android Native ARM64 & iOS binaries... [1.1s]", color: "text-emerald-400", delay: 350 },
      { text: "✔ Initializing Google Maps Live GPS Telemetry Sockets... [OK]", color: "text-emerald-400", delay: 650 },
      { text: "✔ Razorpay UPI Autopay & one-tap payment gateway... [ACTIVE]", color: "text-emerald-400", delay: 950 },
      { text: "✔ Sub-450ms driver match dispatch algorithm verified", color: "text-[#00F5FF]", delay: 1250 },
      { text: "📱 Published to Google Play Store (ChaloJi & MITS Sadhana)", color: "text-emerald-300 font-bold", delay: 1600 },
    ],
  },
  {
    id: "security",
    label: "security-audit.json",
    icon: Shield,
    command: "techlifa-audit --deep --strict --verify-ip",
    lines: [
      { text: "> techlifa-audit --deep --strict --verify-ip", color: "text-[#8B6CFF] font-bold", delay: 100 },
      { text: "✔ 256-bit End-to-End SSL/TLS 1.3 encryption handshake... [PASSED]", color: "text-emerald-400", delay: 350 },
      { text: "✔ OWASP Top 10 vulnerability scan: 0 vulnerabilities found", color: "text-emerald-400", delay: 650 },
      { text: "✔ Database connection pooling: sub-10ms response latency", color: "text-[#00F5FF]", delay: 950 },
      { text: "✔ Full GitHub source repository handover & NDA verified", color: "text-emerald-400", delay: 1250 },
      { text: "🛡️ Bank-grade enterprise security verified. Zero lock-in.", color: "text-emerald-300 font-bold", delay: 1550 },
    ],
  },
];

export default function CyberTerminal() {
  const [activeTab, setActiveTab] = useState<"deploy" | "mobile" | "security">("deploy");
  const [visibleLineCount, setVisibleLineCount] = useState<number>(0);
  const [isCompiling, setIsCompiling] = useState<boolean>(false);
  const [copied, setCopied] = useState(false);

  const currentTab = TABS.find((t) => t.id === activeTab) || TABS[0];

  const runCompilation = (tab = currentTab) => {
    setIsCompiling(true);
    setVisibleLineCount(0);

    try {
      sounds.playClick();
    } catch {}

    tab.lines.forEach((line, index) => {
      setTimeout(() => {
        setVisibleLineCount(index + 1);
        if (index === tab.lines.length - 1) {
          setIsCompiling(false);
          try {
            sounds.playSuccess();
          } catch {}
        }
      }, line.delay);
    });
  };

  useEffect(() => {
    runCompilation(currentTab);
  }, [activeTab]);

  const handleCopy = () => {
    try {
      sounds.playClick();
    } catch {}
    const textToCopy = currentTab.lines.map((l) => l.text).join("\n");
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-2xl sm:rounded-3xl bg-[#070712]/95 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden backdrop-blur-xl group">
      {/* Top Window Bar (macOS / Cyber style) */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-3.5 bg-white/[0.03] border-b border-white/[0.08]">
        {/* Left window control dots */}
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#FF5F56]/80 hover:bg-[#FF5F56] transition-colors" />
          <span className="w-3 h-3 rounded-full bg-[#FFBD2E]/80 hover:bg-[#FFBD2E] transition-colors" />
          <span className="w-3 h-3 rounded-full bg-[#27C93F]/80 hover:bg-[#27C93F] transition-colors" />
          <span className="hidden sm:inline-block ml-3 font-mono text-[11px] text-zinc-400">
            techlifa@cloud-edge: ~/production
          </span>
        </div>

        {/* Live Compilation Status Badge */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono">
            <span className={`w-1.5 h-1.5 rounded-full bg-emerald-400 ${isCompiling ? "animate-ping" : "animate-pulse"}`} />
            <span>{isCompiling ? "COMPILING..." : "LIVE EDGE COMPILER"}</span>
          </div>

          {/* Copy Button */}
          <button
            type="button"
            onClick={handleCopy}
            className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-zinc-400 hover:text-white transition-colors cursor-pointer"
            title="Copy terminal output"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="flex items-center gap-1 sm:gap-2 px-3 sm:px-6 pt-2.5 pb-1 border-b border-white/[0.06] bg-[#05050A]/70 overflow-x-auto select-none">
        {TABS.map((tab) => {
          const isActive = tab.id === activeTab;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
              }}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl font-mono text-xs transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? "bg-violet-600/20 text-white border border-violet-500/40 shadow-[0_0_15px_rgba(108,76,245,0.3)]"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.03]"
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#8B6CFF]" : "text-zinc-500"}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Terminal Screen Body */}
      <div className="p-4 sm:p-6 md:p-8 font-mono text-xs sm:text-[13px] leading-relaxed min-h-[260px] sm:min-h-[290px] flex flex-col justify-between overflow-x-auto bg-[#04040A]">
        <div className="space-y-2">
          {currentTab.lines.slice(0, visibleLineCount).map((line, idx) => (
            <div key={idx} className={`${line.color} flex items-start gap-2 animate-fadeIn`}>
              <span className="text-zinc-600 select-none">❯</span>
              <span className="whitespace-pre-wrap">{line.text}</span>
            </div>
          ))}

          {/* Glowing Cursor caret */}
          {isCompiling && (
            <span className="inline-block w-2 h-4 bg-emerald-400 animate-pulse ml-1 align-middle" />
          )}
        </div>

        {/* Bottom Interactive Trigger Bar */}
        <div className="mt-6 pt-4 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-400">
          <div className="flex items-center gap-2 font-mono text-[10px] sm:text-xs text-zinc-400">
            <span className="text-[#8B6CFF]">●</span>
            <span>Vercel Edge Global Network • Cloudflare Enterprise • Sub-second Latency</span>
          </div>

          <button
            type="button"
            onClick={() => runCompilation()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-violet-600/20 border border-white/10 hover:border-violet-500/40 text-white text-xs font-mono font-medium transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#8B6CFF]" />
            <span>Re-run Build</span>
          </button>
        </div>
      </div>
    </div>
  );
}

