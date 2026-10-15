"use client";

import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl" | "hero";
  showText?: boolean;
  withLink?: boolean;
  className?: string;
  glow?: boolean;
}

export default function Logo({
  size = "md",
  showText = true,
  withLink = true,
  className = "",
  glow = true,
}: LogoProps) {
  const sizeMap = {
    sm: { img: 32, box: "w-8 h-8", text: "text-base tracking-wider", sub: "text-[9px]" },
    md: { img: 40, box: "w-10 h-10", text: "text-lg tracking-wider", sub: "text-[10px]" },
    lg: { img: 56, box: "w-14 h-14", text: "text-2xl tracking-wider", sub: "text-xs" },
    xl: { img: 80, box: "w-20 h-20", text: "text-3xl tracking-wider", sub: "text-sm" },
    hero: { img: 140, box: "w-32 h-32 md:w-36 md:h-36", text: "text-4xl", sub: "text-sm" },
  };

  const current = sizeMap[size];

  const content = (
    <div className={`inline-flex items-center gap-3 group select-none ${className}`}>
      {/* Logo Icon with glowing violet aura */}
      <div className="relative flex items-center justify-center">
        {glow && (
          <div
            className="absolute inset-0 bg-violet-600/40 rounded-2xl blur-md -z-10 group-hover:bg-violet-500/60 transition-all duration-300"
            style={{ transform: "scale(1.15)" }}
          />
        )}
        <div
          className={`${current.box} relative rounded-xl overflow-hidden border border-violet-500/30 group-hover:border-violet-400/70 transition-all duration-300 shadow-[0_0_15px_rgba(108,76,245,0.35)] bg-black`}
        >
          <Image
            src="/logo.png"
            alt="Codexa Technologies Logo"
            width={current.img}
            height={current.img}
            priority
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1 font-heading font-bold uppercase leading-none">
            <span className="text-metallic">{`CODEXA`}</span>
          </div>
          <span
            className={`font-heading font-medium tracking-[0.25em] text-[#8B6CFF] uppercase ${current.sub} mt-0.5`}
          >
            TECHNOLOGIES
          </span>
        </div>
      )}
    </div>
  );

  if (withLink) {
    return (
      <Link href="/" className="focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded-lg">
        {content}
      </Link>
    );
  }

  return content;
}
