"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

interface Campaign {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  entry: number;
  endsIn: string;
  progress: number;
}

const DUMMY_CAMPAIGNS: Campaign[] = [
  {
    id: 1,
    title: "The Vanguard Timepiece",
    subtitle: "Limited Edition Horology",
    image:
      "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=600&q=80",
    entry: 2,
    endsIn: "05d : 11h",
    progress: 65,
  },
  {
    id: 2,
    title: "Creator Suite 2024",
    subtitle: "Ultimate Creative Workstation",
    image:
      "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80",
    entry: 8,
    endsIn: "03d : 08h",
    progress: 45,
  },
  {
    id: 3,
    title: "Gala Night in Paris",
    subtitle: "VIP Invitation & Luxury Stay",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
    entry: 15,
    endsIn: "12d : 19h",
    progress: 80,
  },
];

function CampaignCard({ campaign }: { campaign: Campaign }) {
  return (
    <div className="relative flex flex-col bg-[#111111] border border-[#222222] overflow-hidden group">
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <Image
        width={400}
        height={400}
          src={campaign.image}
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
            {campaign.subtitle}
          </p>
        </div>

        {/* Entry / Ends In */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[#555555] text-[9px] tracking-widest uppercase mb-1">
              Entry
            </p>
            <p className="text-[#c9a84c] text-xl font-bold">${campaign.entry}</p>
          </div>
          <div className="text-right">
            <p className="text-[#555555] text-[9px] tracking-widest uppercase mb-1">
              Ends In
            </p>
            <p className="text-white text-sm font-semibold">{campaign.endsIn}</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-[2px] bg-[#222222] rounded-full">
          <div
            className="h-full bg-[#c9a84c] rounded-full"
            style={{ width: `${campaign.progress}%` }}
          />
        </div>

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
            View all 12 active campaigns
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DUMMY_CAMPAIGNS.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ActiveCampaigns;