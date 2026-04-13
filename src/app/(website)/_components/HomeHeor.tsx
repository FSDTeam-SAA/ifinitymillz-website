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
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/campaigns/public?status=featured`);
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
    <section className="relative w-full h-screen flex items-center overflow-hidden bg-[#111111]">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/heroimage.png')" }}
      />

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
              href="/signin"
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

          {isLoading ? (
            <div className="animate-pulse">
              <div className="h-8 bg-[#2a2a2a] rounded w-48 mb-2" />
              <div className="h-4 bg-[#2a2a2a] rounded w-32 mb-8" />
            </div>
          ) : (
            <>
              <p className="text-white text-2xl font-bold mb-1">
                {campaign?.title ?? "—"}
              </p>
              <p className="text-[#555555] text-xs mb-8">
                {campaign?.description ?? "—"}
              </p>
            </>
          )}

          <p className="text-[#666666] text-[10px] tracking-[0.2em] uppercase mb-4">
            Closing In
          </p>
          <div className="flex items-end gap-3 mb-6">
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

          {/* Ticket progress */}
          {campaign && (
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-[#666666] text-[10px] tracking-[0.15em] uppercase">
                  Tickets Sold
                </span>
                <span className="text-[#c9a84c] text-[10px] font-bold">
                  {campaign.soldTickets}/{campaign.totalTickets} ({soldPct}%)
                </span>
              </div>
              <div className="w-full h-1 bg-[#2a2a2a] rounded-full">
                <div
                  className="h-1 bg-[#c9a84c] rounded-full transition-all duration-500"
                  style={{ width: `${soldPct}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default HomeHero;