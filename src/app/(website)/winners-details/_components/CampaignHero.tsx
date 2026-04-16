"use client";

import React, { useEffect, useState } from "react";
import { Clock } from "lucide-react";

interface CampaignHeroProps {
  title?: string;
  description?: string;
  prizeImage?: string;
  endDate?: string;
  status?: string;
}

function CampaignHero({ title, description, prizeImage, endDate, status }: CampaignHeroProps) {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const calculateTime = () => {
      const end = endDate ? new Date(endDate).getTime() : 0;
      const diff = Math.max(0, end - Date.now());
      setTime({
        d: Math.floor(diff / (1000 * 60 * 60 * 24)),
        h: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        m: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        s: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };
    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [endDate]);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section className="relative w-full min-h-[520px] flex items-center overflow-hidden bg-[#0a0a0a]">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${prizeImage || "https://images.unsplash.com/photo-1563720223185-11003d516935?w=1400&q=80"}')`,
        }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full px-10 max-w-7xl mx-auto">
        {/* Badge + timer */}
        <div className="flex items-center gap-4 mb-5">
          <span className="border border-[#555555] text-[#aaaaaa] text-[9px] tracking-[0.2em] uppercase px-3 py-1">
            {status ?? "Active Campaign"}
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
          {title ?? "The Obsidian"}{" "}
          <span className="text-[#c9a84c]">Legacy</span>
        </h1>

        {/* Description */}
        <p className="text-[#777777] text-sm leading-relaxed max-w-xs">
          {description ?? "Enter our live campaign for a chance to win a featured cash prize while supporting selected campaign partners."}
        </p>
      </div>
    </section>
  );
}

export default CampaignHero;
