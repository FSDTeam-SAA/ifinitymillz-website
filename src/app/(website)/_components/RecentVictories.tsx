"use client";

import React from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface Winner {
  _id: string;
  name: string;
}

interface Campaign {
  _id: string;
  title: string;
  description: string;
  prizeImage: string;
  winnerId: Winner;
  winningTicket: string;
  status: string;
  isResultPublished: boolean;
}

function RecentVictories() {
  const router = useRouter();

  const { data: resultsData, isLoading } = useQuery<Campaign[]>({
    queryKey: ["winners"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/campaigns/public?status=ended`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const json = await res.json();
      if (!res.ok || !json?.status) {
        throw new Error(json?.message || "Failed to fetch results");
      }
      return json.data;
    },
  });

  const victories = (resultsData ?? []).filter((c) => c.isResultPublished).slice(0, 3);

  return (
    <section className="w-full bg-[#0a0a0a] py-20 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-white text-4xl font-serif italic font-normal">
            Recent Victories
          </h2>
          <button
            onClick={() => router.push("/winners")}
            className="text-[#c9a84c] text-sm tracking-[0.15em] uppercase border border-[#c9a84c] px-5 py-2 hover:bg-[#c9a84c] hover:text-black transition-colors"
          >
            See All
          </button>
        </div>

        {/* Loading */}
        {isLoading && (
          <p className="text-[#555555] text-sm">Loading...</p>
        )}

        {/* Cards */}
        {!isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {victories.map((v) => (
              <div
                key={v._id}
                className="bg-[#131313] border border-[#1e1e1e] overflow-hidden flex flex-col"
              >
                {/* Image */}
                <div className="h-52 overflow-hidden">
                  <Image
                    height={400}
                    width={400}
                    src={v.prizeImage}
                    alt={v.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Body */}
                <div className="p-6 flex flex-col gap-2">
                  <h3 className="text-[#c9a84c] text-lg font-bold leading-tight">
                    {v.winnerId?.name} won {v.title}
                  </h3>
                  <p className="text-[#555555] text-[10px] tracking-[0.15em] uppercase">
                    Winning Ticket: {v.winningTicket}
                  </p>
                  <p className="text-[#888888] text-sm leading-relaxed mt-2">
                    {v.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default RecentVictories;