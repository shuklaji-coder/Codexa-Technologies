"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Heart,
  Calendar,
  MapPin,
  Clock,
  Volume2,
  VolumeX,
  Share2,
  CheckCircle2,
  Sparkles,
  Send,
  ArrowRight,
  Smartphone,
  Gift,
  ShieldCheck,
  Check,
  X,
  Radio,
  ExternalLink,
  MessageCircle,
  Copy,
  Users,
} from "lucide-react";
import { sounds } from "@/utils/soundEffects";

interface WeddingInviteShowcaseProps {
  onOpenQuoteModal: () => void;
}

// 5 Art-Directed Signature Wedding Themes
type ThemeKey = "rajputana" | "traditional" | "nikah" | "anandKaraj" | "minimalModern";

interface WeddingThemeConfig {
  id: ThemeKey;
  name: string;
  tagline: string;
  bgGradient: string;
  cardBg: string;
  accentGold: string;
  accentBorder: string;
  primaryText: string;
  subText: string;
  pillBg: string;
  motifName: string;
  shlokaOrBlessing: string;
  shlokaSource: string;
  swatchColor: string;
  envelopeColor: string;
}

const WEDDING_THEMES: Record<ThemeKey, WeddingThemeConfig> = {
  rajputana: {
    id: "rajputana",
    name: "Royal Rajputana",
    tagline: "Maroon & Palace Gold • Jharokha Heritage Reveal",
    bgGradient: "from-[#2C070E] via-[#1E0409] to-[#0E0204]",
    cardBg: "bg-[#3D0A14]/90",
    accentGold: "from-[#FFDF73] via-[#D4AF37] to-[#996515]",
    accentBorder: "border-[#D4AF37]/40",
    primaryText: "text-[#FFF8EE]",
    subText: "text-[#E6C9A2]",
    pillBg: "bg-[#D4AF37]/15 text-[#FFDF73] border-[#D4AF37]/35",
    motifName: "Jharokha Arch",
    shlokaOrBlessing: "॥ मङ्गलम् भगवान विष्णुः मङ्गलम् गरुडध्वजः ॥",
    shlokaSource: "Royal Vedic Blessings",
    swatchColor: "#670C1B",
    envelopeColor: "#4E0914",
  },
  traditional: {
    id: "traditional",
    name: "Hindu Traditional",
    tagline: "Kumkum Red & Marigold • Auspicious Ganesha Shloka",
    bgGradient: "from-[#380808] via-[#240404] to-[#120101]",
    cardBg: "bg-[#480C0C]/90",
    accentGold: "from-[#FFE27A] via-[#E58E26] to-[#C0392B]",
    accentBorder: "border-[#E58E26]/40",
    primaryText: "text-[#FFFDF7]",
    subText: "text-[#FCD6A5]",
    pillBg: "bg-[#E58E26]/15 text-[#FFA834] border-[#E58E26]/40",
    motifName: "Lord Ganesha",
    shlokaOrBlessing: "॥ वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ॥",
    shlokaSource: "Shri Ganesh Vandana",
    swatchColor: "#931717",
    envelopeColor: "#590909",
  },
  nikah: {
    id: "nikah",
    name: "Nikah Elegance",
    tagline: "Emerald Velvet & Champagne Gold • Arabesque Crescent",
    bgGradient: "from-[#062419] via-[#031710] to-[#010B07]",
    cardBg: "bg-[#093525]/90",
    accentGold: "from-[#F9E8B2] via-[#E2C98A] to-[#A38644]",
    accentBorder: "border-[#E2C98A]/40",
    primaryText: "text-[#F8FAF5]",
    subText: "text-[#C2DBCB]",
    pillBg: "bg-[#E2C98A]/15 text-[#F9E8B2] border-[#E2C98A]/35",
    motifName: "Crescent & Arabesque",
    shlokaOrBlessing: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ • And We created you in pairs",
    shlokaSource: "Surah An-Naba (78:8)",
    swatchColor: "#0D4D36",
    envelopeColor: "#062A1D",
  },
  anandKaraj: {
    id: "anandKaraj",
    name: "Anand Karaj",
    tagline: "Sacred Saffron & Royal Navy • Phulkari & Ik Onkar",
    bgGradient: "from-[#291305] via-[#1A0B02] to-[#0A1024]",
    cardBg: "bg-[#381B08]/90",
    accentGold: "from-[#FED7AA] via-[#F97316] to-[#C2410C]",
    accentBorder: "border-[#F97316]/40",
    primaryText: "text-[#FFFBF5]",
    subText: "text-[#FED7AA]",
    pillBg: "bg-[#F97316]/15 text-[#FDBA74] border-[#F97316]/35",
    motifName: "Ik Onkar Blessing",
    shlokaOrBlessing: "ੴ ਸਤਿਗੁਰ ਪ੍ਰਸਾਦਿ • Joined in Sacred Harmony",
    shlokaSource: "Sri Guru Granth Sahib Ji",
    swatchColor: "#C25E09",
    envelopeColor: "#421C04",
  },
  minimalModern: {
    id: "minimalModern",
    name: "Minimal Modern",
    tagline: "Silk Ivory & Botanical Sage • Wax Seal Envelope",
    bgGradient: "from-[#1C1F1D] via-[#121413] to-[#090A09]",
    cardBg: "bg-[#252A27]/90",
    accentGold: "from-[#E5E9E6] via-[#B8C5BD] to-[#7A8E83]",
    accentBorder: "border-[#8CA094]/40",
    primaryText: "text-[#F7FAF8]",
    subText: "text-[#B6C7BE]",
    pillBg: "bg-emerald-500/15 text-[#A7C2B2] border-[#8CA094]/30",
    motifName: "Monogram Seal",
    shlokaOrBlessing: "Two lives, one journey, infinite memories together.",
    shlokaSource: "Bespoke Contemporary Union",
    swatchColor: "#45534B",
    envelopeColor: "#1B221E",
  },
};

const WEDDING_EVENTS = [
  {
    name: "Mehendi & Sangeet Gala",
    date: "Friday, 11 Dec 2026",
    time: "06:30 PM Onwards",
    venue: "The Royal Lotus Courtyard, Udaipur",
    dressCode: "Festive Indian & Vibrant Pastels",
    icon: "🪕",
  },
  {
    name: "Haldi & Phoolon Ki Holi",
    date: "Saturday, 12 Dec 2026",
    time: "10:30 AM",
    venue: "Poolside Sunken Deck, Oberoi Udaivilas",
    dressCode: "Sunny Yellows & Traditional Khadi",
    icon: "🌼",
  },
  {
    name: "Shubh Vivaah (Varmala & Pheras)",
    date: "Saturday, 12 Dec 2026",
    time: "07:00 PM (Baraat) • 08:30 PM (Pheras)",
    venue: "Palace Lakefront Mandap",
    dressCode: "Royal Ethnic / Sherwani & Lehengas",
    icon: "🔥",
  },
  {
    name: "The Royal Grand Reception",
    date: "Sunday, 13 Dec 2026",
    time: "08:00 PM Dinner & Cocktails",
    venue: "Grand Crystal Ballroom, Udaipur",
    dressCode: "Black Tie / Regal Evening Glam",
    icon: "🥂",
  },
];

export default function WeddingInviteShowcase({
  onOpenQuoteModal,
}: WeddingInviteShowcaseProps) {
  const [selectedTheme, setSelectedTheme] = useState<ThemeKey>("rajputana");
  const [guestName, setGuestName] = useState("Sharma Parivar");
  const [isSealOpened, setIsSealOpened] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);
  const [rsvpAttending, setRsvpAttending] = useState<"yes" | "no" | "maybe" | null>("yes");
  const [rsvpGuestCount, setRsvpGuestCount] = useState(2);
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const theme = useMemo(() => WEDDING_THEMES[selectedTheme], [selectedTheme]);

  const handleOpenSeal = () => {
    sounds.playClick();
    setIsSealOpened(true);
    setIsPlayingMusic(true);

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.65 },
        colors: ["#FFDF73", "#D4AF37", "#FFFFFF", "#C0392B"],
      });
    } catch {}
  };

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playSuccess();
    setRsvpSubmitted(true);

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.7 },
        colors: ["#FFDF73", "#D4AF37", "#00F5FF", "#10B981"],
      });
    } catch {}

    setTimeout(() => {
      setIsRsvpOpen(false);
      setRsvpSubmitted(false);
    }, 2800);
  };

  const handleCopyInviteLink = () => {
    sounds.playClick();
    const demoLink = `https://techlifa.in/i/aman-weds-riya?guest=${encodeURIComponent(guestName)}`;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(demoLink);
    }
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2400);
  };

  return (
    <section
      id="weddings"
      className="relative py-20 sm:py-32 bg-[#05050A] border-t border-white/[0.06] overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/10 w-[550px] h-[550px] bg-amber-600/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-[500px] h-[500px] bg-rose-600/10 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ================= SECTION HEADER ================= */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/15 to-rose-500/15 border border-amber-500/35 text-[#FFDF73] text-[11px] sm:text-xs font-mono tracking-widest uppercase mb-3.5 sm:mb-4 shadow-[0_0_25px_rgba(212,175,55,0.25)]">
            <Sparkles className="w-3.5 h-3.5 text-[#FFDF73]" />
            <span>BESPOKE DIGITAL WEDDING SUITE</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-4 sm:mb-5">
            The ₹1,00,000 Bespoke Invite Film —{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFDF73] via-[#F6C85F] to-[#E58E26]">
              Reimagined as a 60 FPS Web App.
            </span>
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-[#A1A1B5] leading-relaxed max-w-2xl px-2">
            Say goodbye to blurry PDFs and boring cardboard cards. Empower your guests with a cinematic, mobile-first invitation delivered on WhatsApp with 1-tap Google Maps, calendar sync & live RSVP.
          </p>
        </div>

        {/* ================= MAIN DUAL INTERACTIVE WORKSPACE ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* ================= LEFT COLUMN: THEME SWITCHER & CONTROLS ================= */}
          <div className="lg:col-span-6 space-y-7">
            {/* Theme Selector Palette */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FFDF73]" />
                  <span>Choose Art-Directed Theme</span>
                </span>
                <span className="text-[11px] font-mono text-[#FFDF73]">
                  {theme.name}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {(Object.keys(WEDDING_THEMES) as ThemeKey[]).map((key) => {
                  const t = WEDDING_THEMES[key];
                  const isSelected = selectedTheme === key;

                  return (
                    <button
                      key={key}
                      onClick={() => {
                        sounds.playClick();
                        setSelectedTheme(key);
                      }}
                      className={`p-3.5 rounded-2xl border text-left transition-all duration-300 flex items-center gap-3 cursor-pointer ${
                        isSelected
                          ? "bg-white/[0.08] border-[#FFDF73] shadow-[0_0_20px_rgba(212,175,55,0.3)] scale-[1.02]"
                          : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]"
                      }`}
                    >
                      <span
                        className="w-5 h-5 rounded-full shrink-0 border border-white/30 shadow-md"
                        style={{ backgroundColor: t.swatchColor }}
                      />
                      <div className="min-w-0">
                        <div className="font-heading text-xs sm:text-sm font-bold text-white truncate">
                          {t.name}
                        </div>
                        <div className="text-[10px] font-mono text-zinc-400 truncate">
                          {t.motifName}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Live Personalization Input Simulator */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                Simulate Personalized Guest Link
              </label>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Enter guest name (e.g. Verma Family)"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs sm:text-sm font-mono focus:border-[#FFDF73] focus:outline-none transition-colors"
                  />
                </div>
                <button
                  onClick={handleCopyInviteLink}
                  className="px-3.5 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] border border-white/15 text-white font-mono text-xs flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                  title="Copy Personalized WhatsApp Invite Link"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5 text-[#FFDF73]" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-[11px] font-mono text-zinc-400 mt-2">
                💡 Each guest receives a unique URL on WhatsApp: <code className="text-[#FFDF73]">/i/aman-weds-riya?guest={guestName.replace(/\s+/g, "+")}</code>
              </p>
            </div>

            {/* Feature Proof Highlights */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <div className="flex items-center gap-2 text-white text-xs sm:text-sm font-bold">
                  <span className="text-[#FFDF73]">⚡</span>
                  <span>4G Mobile Optimized</span>
                </div>
                <div className="text-[11px] font-mono text-zinc-400 mt-1">
                  Sub-1.8s load on Moto G & Jio 4G phones
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <div className="flex items-center gap-2 text-white text-xs sm:text-sm font-bold">
                  <span className="text-emerald-400">📊</span>
                  <span>Real-Time RSVP Tracker</span>
                </div>
                <div className="text-[11px] font-mono text-zinc-400 mt-1">
                  Instant guest headcount & meal preferences
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <div className="flex items-center gap-2 text-white text-xs sm:text-sm font-bold">
                  <span className="text-rose-400">🗺️</span>
                  <span>1-Tap Google Maps</span>
                </div>
                <div className="text-[11px] font-mono text-zinc-400 mt-1">
                  Zero lost guests on the wedding day
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <div className="flex items-center gap-2 text-white text-xs sm:text-sm font-bold">
                  <span className="text-purple-400">🎶</span>
                  <span>Audio & Sitar Player</span>
                </div>
                <div className="text-[11px] font-mono text-zinc-400 mt-1">
                  Autoplay-safe soothing traditional music
                </div>
              </div>
            </div>

            {/* Action CTA Row */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3">
              <button
                onClick={() => {
                  sounds.playClick();
                  onOpenQuoteModal();
                }}
                className="violet-glow-btn px-6 sm:px-8 py-4 rounded-xl font-heading text-xs sm:text-sm uppercase tracking-wider font-semibold text-white flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_30px_rgba(212,175,55,0.4)]"
                style={{
                  background: "linear-gradient(135deg, #B8860B 0%, #D4AF37 50%, #996515 100%)",
                }}
              >
                <span>Order Bespoke Wedding Card</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`https://wa.me/919935272670?text=${encodeURIComponent(
                  `Hi Techlifa! I saw your Digital Wedding Invite platform on the website and want to build a bespoke invite for our wedding (${theme.name} theme).`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sounds.playClick()}
                className="px-5 py-4 rounded-xl bg-emerald-600/15 hover:bg-emerald-600/25 border border-emerald-500/40 text-emerald-400 font-mono text-xs uppercase tracking-wider font-semibold inline-flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: INTERACTIVE PHONE SIMULATOR ================= */}
          <div className="lg:col-span-6 flex justify-center">
            {/* Phone Bezel Container */}
            <div className="relative w-full max-w-[340px] sm:max-w-[370px] aspect-[9/18.5] rounded-[48px] p-3.5 bg-gradient-to-b from-[#252538] via-[#121220] to-[#0A0A12] border-[3.5px] border-white/20 shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden">
              {/* Dynamic Island / Speaker Notch */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-4.5 bg-black rounded-full z-40 flex items-center justify-between px-3">
                <span className="w-2.5 h-2.5 rounded-full bg-black/80 border border-white/10" />
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              {/* Inside Screen Container with Live Selected Theme Styling */}
              <div
                className={`relative w-full h-full rounded-[38px] overflow-y-auto scrollbar-none transition-colors duration-500 select-none bg-gradient-to-b ${theme.bgGradient} text-white flex flex-col justify-between`}
                style={{ scrollbarWidth: "none" }}
              >
                {/* Simulated Web Address Bar */}
                <div className="pt-8 px-4 pb-2 border-b border-white/[0.08] bg-black/30 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between text-[10px] font-mono text-zinc-300">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="text-emerald-400">🔒</span>
                    <span className="truncate">techlifa.in/i/aman-weds-riya</span>
                  </div>

                  <button
                    onClick={() => {
                      sounds.playClick();
                      setIsPlayingMusic(!isPlayingMusic);
                    }}
                    className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-[#FFDF73] transition-colors shrink-0"
                    title="Toggle Music"
                  >
                    {isPlayingMusic ? (
                      <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                    ) : (
                      <VolumeX className="w-3.5 h-3.5 text-zinc-400" />
                    )}
                  </button>
                </div>

                {/* ================= SCREEN CONTENT ================= */}
                {!isSealOpened ? (
                  /* ================= 1. WAX SEAL / PALACE ENVELOPE OPENING REVEAL ================= */
                  <div className="flex flex-col items-center justify-center p-6 my-auto text-center relative z-20">
                    {/* Floating Motif Aura */}
                    <div className="w-20 h-20 rounded-full bg-[#D4AF37]/20 blur-xl pointer-events-none absolute" />

                    {/* Auspicious Shloka / Blessing Top */}
                    <p className="font-serif text-[11px] text-[#FFDF73] tracking-widest uppercase mb-4 opacity-90">
                      {theme.shlokaOrBlessing}
                    </p>

                    {/* Interactive Royal Wax Seal Button */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleOpenSeal}
                      className="cursor-pointer my-6 group relative"
                    >
                      <div
                        className="w-24 h-24 rounded-full border-2 shadow-[0_0_35px_rgba(212,175,55,0.6)] flex flex-col items-center justify-center text-center transition-all group-hover:scale-105"
                        style={{
                          backgroundColor: theme.envelopeColor,
                          borderColor: "#D4AF37",
                        }}
                      >
                        <span className="font-serif text-2xl font-bold tracking-widest text-[#FFDF73]">
                          A & R
                        </span>
                        <span className="text-[8px] font-mono uppercase tracking-widest text-[#E6C9A2] mt-0.5">
                          TAP TO OPEN
                        </span>
                      </div>
                      <div className="absolute inset-0 rounded-full border border-dashed border-[#FFDF73]/50 animate-spin-slow pointer-events-none" />
                    </motion.div>

                    <h3 className="font-serif text-2xl font-bold text-white tracking-wide">
                      Aman & Riya
                    </h3>
                    <p className="text-xs font-mono text-[#FFDF73] mt-1">
                      December 12, 2026 • Udaipur
                    </p>

                    {/* Personalized Guest Badge */}
                    <div className="mt-6 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-mono text-zinc-200">
                      Amantran for: <span className="text-[#FFDF73] font-bold">{guestName}</span>
                    </div>

                    <button
                      onClick={handleOpenSeal}
                      className="mt-6 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FFDF73] to-[#D4AF37] text-black font-heading text-xs font-bold uppercase tracking-wider shadow-lg hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                    >
                      Open Invitation ✉️
                    </button>
                  </div>
                ) : (
                  /* ================= 2. CINEMATIC INVITE SCROLL CONTENT ================= */
                  <div className="p-4 space-y-6 pb-20">
                    {/* Top Callout & Reset Affordance */}
                    <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 pb-2 border-b border-white/[0.08]">
                      <span>{theme.name} Showcase</span>
                      <button
                        onClick={() => {
                          sounds.playClick();
                          setIsSealOpened(false);
                        }}
                        className="text-[#FFDF73] hover:underline"
                      >
                        [ Re-seal Envelope ]
                      </button>
                    </div>

                    {/* Personalized Welcome Card */}
                    <div className={`p-4 rounded-2xl ${theme.cardBg} border ${theme.accentBorder} text-center space-y-1.5 shadow-xl`}>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#FFDF73]">
                        {theme.shlokaSource}
                      </span>
                      <h4 className="font-serif text-base font-bold text-white">
                        {guestName}
                      </h4>
                      <p className="text-[11px] leading-relaxed text-zinc-300">
                        Aapki upasthiti hamare parivaar ke is pavitra utsav ko anmol banayegi.
                      </p>
                    </div>

                    {/* Couple Names Hero */}
                    <div className="text-center py-2 space-y-1">
                      <p className="text-[10px] font-mono tracking-widest text-[#FFDF73] uppercase">
                        Together with their families
                      </p>
                      <h3 className="font-serif text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FFDF73] to-white">
                        Aman & Riya
                      </h3>
                      <p className="text-xs text-zinc-300 font-serif italic">
                        Cordially invite you to celebrate their wedding
                      </p>
                    </div>

                    {/* Live Flip Countdown Simulator */}
                    <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 text-center">
                      <span className="text-[9px] font-mono text-[#FFDF73] uppercase tracking-wider block mb-2">
                        ⏳ Countdown to the Vows
                      </span>
                      <div className="grid grid-cols-4 gap-1.5 font-mono text-center">
                        <div className="p-1.5 rounded-lg bg-white/[0.04]">
                          <div className="text-base font-black text-white">218</div>
                          <div className="text-[8px] text-zinc-400">DAYS</div>
                        </div>
                        <div className="p-1.5 rounded-lg bg-white/[0.04]">
                          <div className="text-base font-black text-white">14</div>
                          <div className="text-[8px] text-zinc-400">HOURS</div>
                        </div>
                        <div className="p-1.5 rounded-lg bg-white/[0.04]">
                          <div className="text-base font-black text-white">38</div>
                          <div className="text-[8px] text-zinc-400">MINS</div>
                        </div>
                        <div className="p-1.5 rounded-lg bg-white/[0.04]">
                          <div className="text-base font-black text-[#FFDF73] animate-pulse">42</div>
                          <div className="text-[8px] text-zinc-400">SECS</div>
                        </div>
                      </div>
                    </div>

                    {/* Wedding Events Timeline */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono text-[#FFDF73]">
                        <span className="font-bold uppercase tracking-wider">Pavitra Karyakram</span>
                        <span className="text-[10px] text-zinc-400">4 Celebrations</span>
                      </div>

                      {WEDDING_EVENTS.map((event, idx) => (
                        <div
                          key={idx}
                          className={`p-3.5 rounded-2xl ${theme.cardBg} border border-white/10 hover:${theme.accentBorder} transition-colors space-y-2`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-lg">{event.icon}</span>
                            <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-[#FFDF73] border border-white/10">
                              {event.date}
                            </span>
                          </div>

                          <div>
                            <h5 className="font-serif text-sm font-bold text-white">
                              {event.name}
                            </h5>
                            <div className="text-[10px] font-mono text-zinc-300 flex items-center gap-1 mt-0.5">
                              <Clock className="w-3 h-3 text-[#FFDF73]" />
                              <span>{event.time}</span>
                            </div>
                            <div className="text-[10px] font-mono text-zinc-400 flex items-center gap-1 mt-0.5">
                              <MapPin className="w-3 h-3 text-rose-400" />
                              <span className="truncate">{event.venue}</span>
                            </div>
                          </div>

                          <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between text-[10px] font-mono">
                            <span className="text-zinc-400 truncate max-w-[170px]">
                              👗 {event.dressCode}
                            </span>
                            <a
                              href="https://maps.google.com"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#FFDF73] flex items-center gap-1 hover:underline shrink-0"
                            >
                              <span>Map</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Shagun & Digital Blessings */}
                    <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 text-center space-y-2">
                      <div className="flex items-center justify-center gap-1.5 text-xs font-mono text-[#FFDF73]">
                        <Gift className="w-3.5 h-3.5" />
                        <span>Aashirwad & Digital Shagun</span>
                      </div>
                      <p className="text-[10px] text-zinc-400 font-mono">
                        Your love & presence is the greatest gift. UPI Shagun QR enabled for family.
                      </p>
                      <div className="w-24 h-24 mx-auto rounded-xl bg-white p-1.5 flex items-center justify-center shadow-md">
                        <div className="w-full h-full bg-[#1A1A24] rounded-lg flex flex-col items-center justify-center text-white text-[8px] font-mono text-center">
                          <span className="text-base">💳</span>
                          <span>UPI QR CODE</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ================= STICKY BOTTOM RSVP BAR ================= */}
                {isSealOpened && (
                  <div className="p-3 bg-[#0A0A14]/95 border-t border-white/10 backdrop-blur-md sticky bottom-0 z-30 flex items-center justify-between gap-2">
                    <div className="text-[10px] font-mono text-zinc-300 truncate">
                      RSVP for <span className="text-[#FFDF73] font-bold">{guestName}</span>
                    </div>

                    <button
                      onClick={() => {
                        sounds.playClick();
                        setIsRsvpOpen(true);
                      }}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#FFDF73] to-[#D4AF37] text-black font-heading text-xs font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(212,175,55,0.4)] hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0"
                    >
                      RSVP Now ✍️
                    </button>
                  </div>
                )}
              </div>

              {/* ================= INTERACTIVE RSVP BOTTOM SHEET MODAL ================= */}
              <AnimatePresence>
                {isRsvpOpen && (
                  <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/80 backdrop-blur-sm p-2">
                    <motion.div
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "100%" }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="w-full rounded-3xl bg-[#121222] border border-[#FFDF73]/40 p-4 text-white shadow-2xl space-y-4"
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-white/10">
                        <div>
                          <h4 className="font-serif text-sm font-bold text-white">
                            RSVP Response
                          </h4>
                          <p className="text-[10px] font-mono text-[#FFDF73]">
                            For: {guestName}
                          </p>
                        </div>
                        <button
                          onClick={() => setIsRsvpOpen(false)}
                          className="p-1 rounded-full bg-white/10 text-zinc-400 hover:text-white"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      {rsvpSubmitted ? (
                        <div className="text-center py-6 space-y-2">
                          <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                            <CheckCircle2 className="w-6 h-6" />
                          </div>
                          <h5 className="font-serif text-base font-bold text-white">
                            Dhanyawaad, {guestName}!
                          </h5>
                          <p className="text-xs text-zinc-300">
                            Aapka RSVP save ho gaya hai. Hum aapka intezaar karenge!
                          </p>
                        </div>
                      ) : (
                        <form onSubmit={handleRsvpSubmit} className="space-y-3">
                          {/* Attendance Choice */}
                          <div>
                            <label className="block text-[10px] font-mono uppercase text-zinc-400 mb-1.5">
                              Will You Attend?
                            </label>
                            <div className="grid grid-cols-3 gap-1.5 text-[11px] font-mono">
                              <button
                                type="button"
                                onClick={() => setRsvpAttending("yes")}
                                className={`py-2 px-1 rounded-xl border text-center transition-all ${
                                  rsvpAttending === "yes"
                                    ? "bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold"
                                    : "bg-white/[0.04] border-white/10 text-zinc-400"
                                }`}
                              >
                                ✅ Aaunga
                              </button>
                              <button
                                type="button"
                                onClick={() => setRsvpAttending("maybe")}
                                className={`py-2 px-1 rounded-xl border text-center transition-all ${
                                  rsvpAttending === "maybe"
                                    ? "bg-amber-500/20 border-amber-500 text-amber-300 font-bold"
                                    : "bg-white/[0.04] border-white/10 text-zinc-400"
                                }`}
                              >
                                🤔 Shayad
                              </button>
                              <button
                                type="button"
                                onClick={() => setRsvpAttending("no")}
                                className={`py-2 px-1 rounded-xl border text-center transition-all ${
                                  rsvpAttending === "no"
                                    ? "bg-rose-500/20 border-rose-500 text-rose-300 font-bold"
                                    : "bg-white/[0.04] border-white/10 text-zinc-400"
                                }`}
                              >
                                ❌ Nahi
                              </button>
                            </div>
                          </div>

                          {/* Guest Count */}
                          {rsvpAttending === "yes" && (
                            <div>
                              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 mb-1">
                                <span>Guest Headcount:</span>
                                <span className="text-[#FFDF73] font-bold">
                                  {rsvpGuestCount} Persons
                                </span>
                              </div>
                              <input
                                type="range"
                                min={1}
                                max={6}
                                value={rsvpGuestCount}
                                onChange={(e) => setRsvpGuestCount(Number(e.target.value))}
                                className="w-full accent-[#FFDF73] cursor-pointer"
                              />
                            </div>
                          )}

                          <button
                            type="submit"
                            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#FFDF73] to-[#D4AF37] text-black font-heading text-xs font-bold uppercase tracking-wider shadow-lg hover:brightness-110 cursor-pointer"
                          >
                            Submit RSVP Response
                          </button>
                        </form>
                      )}
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

