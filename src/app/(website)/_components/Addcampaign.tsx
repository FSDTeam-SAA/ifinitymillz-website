"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";

interface Package {
  name: string;
  ticketQuantity: number;
  price: number;
  _id: string;
}

interface Campaign {
  _id: string;
  id: string;
  title: string;
  description: string;
  prizeImage: string;
  totalTickets: number;
  soldTickets: number;
  remainingTickets: number;
  packages: Package[];
  startDate: string;
  endDate: string;
  status: string;
  isFeatured: boolean;
}

interface ApiResponse {
  status: boolean;
  message: string;
  data: Campaign[];
}

function getEndsIn(endDate: string): string {
  const end = new Date(endDate);
  const now = new Date();
  let diff = Math.max(0, end.getTime() - now.getTime());
  const days = Math.floor(diff / 86400000);
  diff -= days * 86400000;
  const hours = Math.floor(diff / 3600000);
  return `${String(days).padStart(2, "0")}d : ${String(hours).padStart(2, "0")}h`;
}

function getMinPrice(packages: Package[]): number {
  if (!packages?.length) return 0;
  return Math.min(...packages.map((p) => p.price));
}

function CampaignCard({ campaign }: { campaign: Campaign }) {
  const soldPct = Math.round((campaign.soldTickets / campaign.totalTickets) * 100);
  const minPrice = getMinPrice(campaign.packages);

  return (
    <div className="relative flex flex-col bg-[#111111] border border-[#222222] overflow-hidden group">
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <Image
          width={400}
          height={400}
          src={campaign.prizeImage}
          alt={campaign.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />
      </div>

      {/* Body */}
      <div className="flex flex-col gap-3 p-5 flex-1">
        <div>
          <h3 className="text-white text-xl font-bold leading-tight mb-1">
            {campaign.title}
          </h3>
          <p className="text-[#666666] text-[10px] tracking-[0.15em] uppercase">
            {campaign.description}
          </p>
        </div>

        {/* Entry / Ends In */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[#555555] text-[9px] tracking-widest uppercase mb-1">
              Entry From
            </p>
            <p className="text-[#c9a84c] text-xl font-bold">${minPrice}</p>
          </div>
          <div className="text-right">
            <p className="text-[#555555] text-[9px] tracking-widest uppercase mb-1">
              Ends In
            </p>
            <p className="text-white text-sm font-semibold">
              {getEndsIn(campaign.endDate)}
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-[2px] bg-[#222222] rounded-full">
          <div
            className="h-full bg-[#c9a84c] rounded-full"
            style={{ width: `${soldPct}%` }}
          />
        </div>
        <p className="text-[#555555] text-[9px] tracking-widest uppercase">
          {campaign.soldTickets}/{campaign.totalTickets} tickets sold
        </p>

        {/* Button */}
        <Link
          href={`/campaigns/${campaign.id}`}
          className="mt-1 w-full bg-[#1a1a1a] border border-[#2a2a2a] text-white text-[10px] font-bold tracking-[0.2em] uppercase text-center py-3 hover:bg-[#c9a84c] hover:text-black hover:border-[#c9a84c] transition-all duration-300"
        >
          Enter Now
        </Link>
      </div>
    </div>
  );
}

function ActiveCampaigns() {
  const { data: activeData, isLoading } = useQuery<ApiResponse>({
    queryKey: ["active"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/campaigns/public?status=Active`
      );
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });

  const campaigns = activeData?.data.slice(0,3) ?? [];

  return (
    <section className="w-full bg-[#0d0d0d] py-16 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[#c9a84c] text-[10px] tracking-[0.2em] uppercase mb-2">
              Editor&apos;s Choice
            </p>
            <h2 className="text-white text-4xl font-serif font-bold">
              Active Campaigns
            </h2>
          </div>
          <Link
            href="/campaigns"
            className="text-[#666666] text-xs hover:text-[#c9a84c] transition-colors"
          >
            View all {campaigns.length} active campaigns
          </Link>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-[420px] bg-[#111111] border border-[#222222] animate-pulse"
              />
            ))}
          </div>
        ) : campaigns.length === 0 ? (
          <p className="text-[#555555] text-sm text-center py-16">
            No active campaigns at the moment.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {campaigns.map((campaign) => (
              <CampaignCard key={campaign._id} campaign={campaign} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default ActiveCampaigns;