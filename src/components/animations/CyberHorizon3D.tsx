"use client";

export default function CyberHorizon3D() {
  return (
    <div className="absolute inset-x-0 bottom-0 h-[380px] overflow-hidden pointer-events-none z-0 [perspective:800px]">
      {/* 3D Tilted Grid Floor */}
      <div
        className="absolute inset-x-[-50%] bottom-[-50%] h-[200%] w-[200%] origin-bottom"
        style={{
          transform: "rotateX(72deg) translateZ(0)",
          backgroundImage: `
            linear-gradient(to right, rgba(108, 76, 245, 0.25) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(108, 76, 245, 0.25) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage: "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 40%, transparent 80%)",
          WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 40%, transparent 80%)",
          animation: "grid-travel 18s linear infinite",
        }}
      />

      {/* Horizon Neon Glow Line */}
      <div className="absolute bottom-[160px] inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#8B6CFF]/80 to-transparent shadow-[0_0_25px_#8B6CFF]" />

      <style jsx>{`
        @keyframes grid-travel {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 0 1200px;
          }
        }
      `}</style>
    </div>
  );
}
