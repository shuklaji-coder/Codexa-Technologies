"use client";

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  colorFrom?: string;
  colorTo?: string;
}

export default function BorderBeam({
  className = "",
  size = 200,
  duration = 8,
  colorFrom = "#6C4CF5",
  colorTo = "#FFFFFF",
}: BorderBeamProps) {
  return (
    <div
      style={
        {
          "--size": `${size}px`,
          "--duration": `${duration}s`,
          "--color-from": colorFrom,
          "--color-to": colorTo,
        } as React.CSSProperties
      }
      className={`pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)] ${className}`}
    >
      <div
        className="absolute aspect-square w-[var(--size)] bg-gradient-to-l from-[var(--color-from)] via-[var(--color-to)] to-transparent"
        style={{
          offsetAnchor: "100% 50%",
          offsetPath: "rect(0 auto auto 0 round 24px)",
          animation: `border-beam var(--duration) infinite linear`,
        }}
      />
      <style jsx>{`
        @keyframes border-beam {
          0% {
            offset-distance: 0%;
          }
          100% {
            offset-distance: 100%;
          }
        }
      `}</style>
    </div>
  );
}
