"use client";

import React from "react";

const STATS = [
  { value: "140+", label: "Wells Built" },
  { value: "22M+", label: "Donated" },
];

function CampaignHost() {
  return (
    <section className="w-full bg-[#0d0d0d] py-16 px-8">
      <div className="max-w-5xl mx-auto border border-[#1e1e1e] bg-[#111111] p-10 flex flex-col md:flex-row items-center gap-10">
        {/* Photo */}
        <div className="shrink-0">
          <div className="w-44 h-52 border border-[#c9a84c]/30 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80"
              alt="Julian Vane"
              className="w-full h-full object-cover grayscale"
            />
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col gap-5 flex-1">
          <p className="text-[#555555] text-[9px] tracking-[0.28em] uppercase">
            Your Campaign Host
          </p>

          <h2 className="text-white text-4xl font-serif italic font-bold leading-none">
            Julian Vane
          </h2>

          <p className="text-[#777777] text-sm leading-[1.85] max-w-lg">
            Wholeheart Campaigns was founded to bridge the gap between those
            who have achieved financial freedom and the communities that deserve
            the same opportunity. Our winners dont just receive prizes —
            theyre becoming beacons of possibility for their community
          </p>

          {/* Stats */}
          <div className="flex items-center gap-10 pt-2">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <span className="text-white text-2xl font-bold">
                  {stat.value}
                </span>
                <span className="text-[#555555] text-[9px] tracking-[0.2em] uppercase">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CampaignHost;