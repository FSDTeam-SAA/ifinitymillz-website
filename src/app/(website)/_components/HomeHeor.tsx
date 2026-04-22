"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

interface CampaignData {
  title: string;
  description: string;
  totalTickets: number;
  soldTickets: number;
  remainingTickets: number;
  endDate: string;
  prizeImage: string;
  status: string;
  campaignPrice: string;
}

interface ApiResponse {
  status: boolean;
  message: string;
  data: CampaignData;
}

function HomeHero() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    mins: 0,
  });

  const { data: heroData, isLoading } = useQuery<ApiResponse>({
    queryKey: ["hero"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/campaigns/public?status=featured`,
      );
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });

  const campaign = heroData?.data;

  useEffect(() => {
    if (!campaign?.endDate) return;

    const calculateTimeLeft = () => {
      const end = new Date(campaign.endDate);
      const now = new Date();
      let diff = Math.max(0, end.getTime() - now.getTime());

      const days = Math.floor(diff / 86400000);
      diff -= days * 86400000;
      const hours = Math.floor(diff / 3600000);
      diff -= hours * 3600000;
      const mins = Math.floor(diff / 60000);

      setTimeLeft({ days, hours, mins });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000);
    return () => clearInterval(timer);
  }, [campaign?.endDate]);

  const pad = (n: number) => String(n).padStart(2, "0");

  const soldPct = campaign
    ? Math.round((campaign.soldTickets / campaign.totalTickets) * 100)
    : 0;

  return (
    <section className="relative w-full min-h-screen flex flex-col bg-[#0a0a0a] text-white overflow-hidden md:py-4">
      {/* BACKGROUND & OVERLAY */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/bg-ifi.svg')" }}
      >
        {/* Dark Gradient Overlay for text readability */}
        {/* <div className="absolute inset-0 bg-black/60 md:bg-gradient-to-r md:from-black/80 md:to-black/30" /> */}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full mt-20">
        {/* TOP HEADING SECTION (Full Width) */}
        <div className="">
          <h1 className="text-4xl md:text-5xl font-serif font-bold leading-tight">
            {/* Gold Gradient Text Part */}
            <span className="bg-gradient-to-b from-[#E2C275] via-[#C9A84C] to-[#A67C37] bg-clip-text text-transparent">
              Win $10,000 Cash
            </span>

            {/* Sub-text with subtle gold/gray color */}
            <span className="text-[#C9A84C]/80 font-light italic ml-4">
              — <span className="text-[#E5E2E1]">Zoey</span> Featured Campaign
            </span>
          </h1>
        </div>

        {/* BOTTOM FLEX SECTION */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-12">
          {/* LEFT CONTENT */}
          <div className="flex-1 max-w-xl">
            <div className="space-y-6 text-gray-300">
              <p className="text-lg md:text-xl">
                Enter this campaign for a chance to WIN $10,000.
              </p>
              <p className="text-sm md:text-base text-gray-400">
                Choose a free entry or paid entry before the campaign ends.{" "}
                <br />
                Zoey is the featured participant in this promotional campaign.
              </p>
              <div className="flex flex-wrap gap-6 text-[10px] uppercase tracking-[0.2em] font-semibold text-gray-500">
                <span className="flex items-center gap-2">
                  <span className="text-[#c9a84c]">✔</span> 100% Legal & Secure
                </span>
                <span className="flex items-center gap-2">
                  <span className="text-[#c9a84c]">✔</span> Fair Sweepstakes
                  Campaign
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-6 mt-10">
              <Link
                href="/signin"
                className="bg-gradient-to-b from-[#e0bc5a] to-[#b8963f] text-black px-10 py-4 text-sm font-black tracking-widest uppercase shadow-2xl hover:scale-105 transition-transform"
              >
                Apply For Campaign
              </Link>
              <Link
                href="/how-it-works"
                className="flex items-center text-sm font-bold tracking-widest uppercase border-b-2 border-[#c9a84c] pb-1 hover:text-[#c9a84c]"
              >
                Creators: Click here to Apply!
              </Link>
            </div>
          </div>

          {/* GRADIENT BORDER BOX WRAPPER */}
          <div className="w-full md:max-w-[440px] mt-20 relative overflow-hidden gradient-border p-4 shadow-[0_0_60px_rgba(0,0,0,0.9)]">
            {/* INNER BOX */}
            <div className="w-full h-full p-8 md:p-10 rounded-[inherit] relative overflow-hidden flex flex-col justify-center">
              {/* Subtle glow inside */}
              {/* <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#c9a84c]/10 blur-3xl rounded-full" /> */}

              <p className="text-[10px] tracking-[0.3em] text-gray-500 uppercase mb-4 font-bold">
                Current Grand Prize
              </p>

              {isLoading ? (
                <div className="animate-pulse space-y-3 mb-10">
                  <div className="h-14 bg-white/5 rounded w-3/4" />
                  <div className="h-4 bg-white/5 rounded w-full" />
                </div>
              ) : (
                <div className="mb-10">
                  <h2 className="text-6xl md:text-7xl font-bold text-white mb-2 tracking-tighter">
                    {campaign?.campaignPrice || "$10,000"}
                  </h2>
                  <p className="text-[#c9a84c] text-sm font-bold tracking-widest uppercase">
                    Cash Prize
                  </p>
                </div>
              )}

              {/* Divider Line */}
              <hr className="border-t border-white/10 mb-10" />

              {/* COUNTDOWN */}
              <div className="grid grid-cols-2 gap-6 mb-10">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-[#c9a84c]">
                    {pad(timeLeft.days)}
                  </span>
                  <span className="text-gray-500 text-xs uppercase tracking-widest font-medium">
                    Days
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-white">
                    {pad(timeLeft.hours)}
                  </span>
                  <span className="text-gray-500 text-xs uppercase tracking-widest font-medium">
                    Hours
                  </span>
                </div>
              </div>

              {/* PROGRESS SECTION */}
              <div className="space-y-6">
                <div className="bg-[#c9a84c]/10 border border-[#c9a84c]/30 py-4 rounded-lg text-center shadow-inner">
                  <span className="text-[#c9a84c] text-[10px] font-black uppercase tracking-[0.2em]">
                    Duration Controlled
                  </span>
                </div>

                {campaign && (
                  <div className="space-y-3">
                    <div className="flex justify-between text-[10px] uppercase tracking-widest font-black text-gray-500">
                      <span>Progress</span>
                      <span className="text-[#c9a84c]">{soldPct}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#b8963f] via-[#e0bc5a] to-[#b8963f] transition-all duration-1000 shadow-[0_0_15px_#c9a84c44]"
                        style={{ width: `${soldPct}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeHero;
