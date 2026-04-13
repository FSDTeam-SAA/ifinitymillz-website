"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const VICTORIES = [
  {
    id: 1,
    name: "Sarah M. won $10,000 Cash",
    campaign: "Campaign: Community Relief Fund",
    quote:
      '"I couldn\'t believe my eyes when the notification came through. Wholeheart is the real deal."',
    image:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80",
  },
  {
    id: 2,
    name: "David K. won Tesla Model S",
    campaign: "Campaign: Green Energy Initiative",
    quote:
      '"The process was so transparent. I could follow every step of the draw from my dashboard."',
    image:
      "https://images.unsplash.com/photo-1536700503339-1e4b06520771?w=600&q=80",
  },
  {
    id: 3,
    name: "James & Lisa won $50,000",
    campaign: "Campaign: Global Education Drive",
    quote:
      '"Entering was so simple, and knowing we were supporting education made the win even sweeter."',
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80",
  },
  {
    id: 4,
    name: "Maria T. won Dream Vacation",
    campaign: "Campaign: Wellness & Travel Fund",
    quote:
      '"I never thought I\'d win anything. Wholeheart changed everything for my family."',
    image:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=600&q=80",
  },
];

function RecentVictories() {
  const [startIndex, setStartIndex] = useState(0);
  const visible = 3;

  const prev = () => setStartIndex((i) => Math.max(0, i - 1));
  const next = () =>
    setStartIndex((i) => Math.min(VICTORIES.length - visible, i + 1));

  const shown = VICTORIES.slice(startIndex, startIndex + visible);


  // const { data: resultsData, isLoading } = useQuery<ResultEntry[]>({
  //   queryKey: ["winners"],
  //   enabled: !!TOKEN,
  //   queryFn: async () => {
  //     const res = await fetch(
  //       `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/entries/results`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${TOKEN}`,
  //         },
  //       }
  //     );
  //     const json = await res.json();
  //     if (!res.ok || !json?.status) {
  //       throw new Error(json?.message || "Failed to fetch results");
  //     }
  //     return json.data;
  //   },
  // });

  return (
    <section className="w-full bg-[#0a0a0a] py-20 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-white text-4xl font-serif italic font-normal">
            Recent Victories
          </h2>
          <div className="flex gap-2">
            <button
              onClick={prev}
              disabled={startIndex === 0}
              className="w-10 h-10 border border-[#2a2a2a] bg-[#141414] flex items-center justify-center text-white hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={next}
              disabled={startIndex >= VICTORIES.length - visible}
              className="w-10 h-10 border border-[#2a2a2a] bg-[#141414] flex items-center justify-center text-white hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {shown.map((v) => (
            <div
              key={v.id}
              className="bg-[#131313] border border-[#1e1e1e] overflow-hidden flex flex-col"
            >
              {/* Image */}
              <div className="h-52 overflow-hidden">
                <Image
                  height={400}
                  width={400}
                  src={v.image}
                  alt={v.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Body */}
              <div className="p-6 flex flex-col gap-2">
                <h3 className="text-[#c9a84c] text-lg font-bold leading-tight">
                  {v.name}
                </h3>
                <p className="text-[#555555] text-[10px] tracking-[0.15em] uppercase">
                  {v.campaign}
                </p>
                <p className="text-[#888888] text-sm leading-relaxed mt-2">
                  {v.quote}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default RecentVictories;
