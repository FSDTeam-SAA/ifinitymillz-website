"use client";

import React, { useState } from "react";
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

const ALL_CAMPAIGNS: Campaign[] = [
  {
    id: 1,
    title: "The Vanguard Timepiece",
    subtitle: "Limited Edition Horology",
    image:
      "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=800&q=80",
    entry: 2,
    endsIn: "05d : 11h",
    progress: 62,
  },
  {
    id: 2,
    title: "Creator Suite 2024",
    subtitle: "Ultimate Creative Workstation",
    image:
      "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80",
    entry: 8,
    endsIn: "03d : 08h",
    progress: 48,
  },
  {
    id: 3,
    title: "Gala Night in Paris",
    subtitle: "VIP Invitation & Luxury Stay",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    entry: 15,
    endsIn: "12d : 19h",
    progress: 78,
  },
  {
    id: 4,
    title: "Alpine Ski Getaway",
    subtitle: "Premium Mountain Experience",
    image:
      "https://images.unsplash.com/photo-1520209759809-a9bcb6cb3241?w=800&q=80",
    entry: 5,
    endsIn: "07d : 04h",
    progress: 35,
  },
  {
    id: 5,
    title: "Grand Piano Edition",
    subtitle: "Concert Grade Instrument",
    image:
      "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&q=80",
    entry: 10,
    endsIn: "09d : 22h",
    progress: 55,
  },
  {
    id: 6,
    title: "Riviera Yacht Weekend",
    subtitle: "Exclusive Maritime Escape",
    image:
      "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80",
    entry: 20,
    endsIn: "14d : 06h",
    progress: 90,
  },
  {
    id: 7,
    title: "Michelin Star Dining",
    subtitle: "Chef's Table for Two",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    entry: 3,
    endsIn: "02d : 15h",
    progress: 70,
  },
  {
    id: 8,
    title: "Tesla Model 3 Performance",
    subtitle: "Zero Emission. Full Luxury.",
    image:
      "https://images.unsplash.com/photo-1536700503339-1e4b06520771?w=800&q=80",
    entry: 25,
    endsIn: "20d : 11h",
    progress: 42,
  },
  {
    id: 9,
    title: "Safari Adventure Kenya",
    subtitle: "7 Night Wildlife Expedition",
    image:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
    entry: 12,
    endsIn: "18d : 03h",
    progress: 28,
  },
];

const PAGE_SIZE = 6;

function CampaignCard({ campaign }: { campaign: Campaign }) {
  return (
    <div className="flex flex-col bg-[#111111] border border-[#1e1e1e] overflow-hidden group">
      {/* Image */}
      <div className="relative h-64 overflow-hidden shrink-0">
        <Image
          width={400}
          height={400}
          src={campaign.image}
          alt={campaign.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#11111140] to-transparent" />
      </div>

      {/* Body */}
      <div className="flex flex-col gap-5 p-6 flex-1">
        {/* Title */}
        <div className="flex flex-col gap-1">
          <h3 className="text-white text-2xl font-bold leading-tight">
            {campaign.title}
          </h3>
          <p className="text-[#555555] text-[10px] tracking-[0.18em] uppercase">
            {campaign.subtitle}
          </p>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Entry / Ends in */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[#555555] text-[9px] tracking-[0.2em] uppercase mb-1">
              Entry
            </p>
            <p className="text-[#c9a84c] text-2xl font-bold leading-none">
              ${campaign.entry}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[#555555] text-[9px] tracking-[0.2em] uppercase mb-1">
              Ends In
            </p>
            <p className="text-white text-sm font-semibold">
              {campaign.endsIn}
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-[2px] bg-[#1e1e1e]">
          <div
            className="h-full bg-[#c9a84c]"
            style={{ width: `${campaign.progress}%` }}
          />
        </div>

        {/* Button */}
        <Link
          href={`/winners-details/${campaign.id}`}
          className="w-full bg-[#1a1a1a] border border-[#2a2a2a] text-white text-[10px] font-bold tracking-[0.2em] uppercase text-center py-4 hover:bg-[#c9a84c] hover:text-black hover:border-[#c9a84c] transition-all duration-300"
        >
          Enter Now
        </Link>
      </div>
    </div>
  );
}

function CampaignGrid() {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const total = ALL_CAMPAIGNS.length;
  const shown = ALL_CAMPAIGNS.slice(0, visibleCount);
  const hasMore = visibleCount < total;

  return (
    <section className="w-full bg-[#0d0d0d] py-16 px-8">
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {shown.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>

        {/* Viewing indicator + Load more */}
        <div className="flex flex-col items-center gap-5">
          <p className="text-[#444444] text-[10px] tracking-[0.25em] uppercase">
            Viewing {Math.min(visibleCount, total)} of {total} Campaigns
          </p>

          {hasMore && (
            <button
              onClick={() =>
                setVisibleCount((c) => Math.min(c + PAGE_SIZE, total))
              }
              className="border border-[#2a2a2a] bg-[#111111] text-white text-[10px] font-bold tracking-[0.2em] uppercase px-10 py-4 hover:bg-[#c9a84c] hover:text-black hover:border-[#c9a84c] transition-all duration-300"
            >
              Load More
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export default CampaignGrid;
