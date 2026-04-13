"use client";

import React, { useEffect, useState } from "react";
import { Clock } from "lucide-react";

function CampaignHero() {
  const [time, setTime] = useState({ d: 12, h: 4, m: 55, s: 18 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => {
        let { d, h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 23; d--; }
        if (d < 0) { d = 0; h = 0; m = 0; s = 0; }
        return { d, h, m, s };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section className="relative w-full min-h-[520px] flex items-end overflow-hidden bg-[#0a0a0a]">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1563720223185-11003d516935?w=1400&q=80')",
        }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full px-10 pb-12 pt-20 max-w-7xl mx-auto">
        {/* Badge + timer */}
        <div className="flex items-center gap-4 mb-5">
          <span className="border border-[#555555] text-[#aaaaaa] text-[9px] tracking-[0.2em] uppercase px-3 py-1">
            Active Campaign
          </span>
          <div className="flex items-center gap-1.5 text-[#c9a84c]">
            <Clock size={12} />
            <span className="text-[11px] font-mono tracking-widest">
              ENDS IN&nbsp;&nbsp;{pad(time.d)}:{pad(time.h)}:{pad(time.m)}:{pad(time.s)}
            </span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-white text-6xl md:text-7xl font-serif italic font-bold leading-none mb-3">
          The Obsidian{" "}
          <span className="text-[#c9a84c]">Legacy</span>
        </h1>

        {/* Subtitle */}
        <p className="text-[#888888] text-[11px] tracking-[0.28em] uppercase mb-4">
          $500,000 Luxury SUV &amp; Concierge Package
        </p>

        {/* Description */}
        <p className="text-[#777777] text-sm leading-relaxed max-w-xs">
          Enter our live campaign for a chance to win a featured cash prize
          while supporting selected campaign partners.
        </p>
      </div>
    </section>
  );
}

export default CampaignHero;