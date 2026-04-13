"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

function HomeHero() {
  const [timeLeft, setTimeLeft] = useState({
    days: 12,
    hours: 4,
    mins: 29,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, mins } = prev;
        mins--;
        if (mins < 0) { mins = 59; hours--; }
        if (hours < 0) { hours = 23; days--; }
        if (days < 0) { days = 0; hours = 0; mins = 0; }
        return { days, hours, mins };
      });
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section className="relative w-full h-screen flex items-center overflow-hidden bg-[#111111]">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/images/heroimage.png')",
        }}
      />
      {/* Dark overlay */}
      {/* <div className="absolute inset-0 bg-black/70" /> */}

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-8 py-16 flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left */}
        <div className="flex-1 max-w-xl">
          <p className="text-[#c9a84c] text-xs tracking-[0.2em] uppercase mb-4">
            Limited Edition Opportunity
          </p>
          <h1 className="text-white text-5xl md:text-6xl font-serif font-bold leading-[1.1] mb-2">
            Win Big.
            <br />
            Support Real
          </h1>
          <h1 className="text-[#c9a84c] text-5xl md:text-6xl font-serif font-bold leading-[1.1] mb-6">
            Campaigns.
          </h1>
          <p className="text-[#999999] text-sm leading-relaxed mb-8 max-w-sm">
            Enter our live campaign for a chance to win a featured cash prize
            while supporting selected campaign partners.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/campaigns"
              className="bg-[#c9a84c] text-black text-xs font-bold tracking-[0.15em] uppercase px-7 py-3 hover:bg-[#b8963f] transition-colors"
            >
              Enter Now
            </Link>
            <Link
              href="/how-it-works"
              className="text-white text-xs font-semibold tracking-[0.1em] uppercase px-4 py-3 hover:text-[#c9a84c] transition-colors"
            >
              How It Works
            </Link>
          </div>
        </div>

        {/* Right — Prize & Countdown */}
        <div className="bg-black/50 border border-[#2a2a2a] backdrop-blur-sm p-8 min-w-[460px]">
          <p className="text-[#666666] text-[10px] tracking-[0.2em] uppercase mb-2">
            Current Grand Prize
          </p>
          <p className="text-[#c9a84c] text-4xl font-bold mb-1">$1,000,000</p>
          <p className="text-[#555555] text-xs mb-8">Lump Sum Cash Prize</p>

          <p className="text-[#666666] text-[10px] tracking-[0.2em] uppercase mb-4">
            Closing In
          </p>
          <div className="flex items-end gap-3">
            {[
              { value: pad(timeLeft.days), label: "Days" },
              { value: pad(timeLeft.hours), label: "Hours" },
              { value: pad(timeLeft.mins), label: "Mins" },
            ].map((item, i) => (
              <React.Fragment key={item.label}>
                {i > 0 && (
                  <span className="text-[#c9a84c] text-2xl font-bold mb-3">:</span>
                )}
                <div className="flex flex-col items-center">
                  <span className="text-white text-3xl font-bold leading-none">
                    {item.value}
                  </span>
                  <span className="text-[#444444] text-[9px] tracking-widest uppercase mt-1">
                    {item.label}
                  </span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeHero;