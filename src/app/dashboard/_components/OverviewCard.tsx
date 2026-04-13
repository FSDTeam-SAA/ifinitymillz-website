"use client";

import React from "react";
import { Users, Megaphone, Trophy } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

interface StatCardProps {
  icon: React.ReactNode;
  value: number | string;
  label: string;
}

function StatCard({ icon, value, label }: StatCardProps) {
  return (
    <div className="flex flex-col gap-3 !rounded-[8px] bg-[#181715] border border-[#2a2a2a] p-5 border-[#c9a84c]/40 shadow-[4px_8px_25px_0px_#00000014]">
      <div className="text-[#c9a84c] w-7 h-7 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <span className="text-white text-3xl font-bold leading-none tracking-tight">
        {value}
      </span>
      <span className="text-[#E5E2E1] text-[24px] font-normal">{label}</span>
    </div>
  );
}

interface StatsData {
  totalUsers: number;
  totalCampaigns: number;
  totalWinners: number;
  totalEntries: number;
  totalWithdrawals: number;
  pendingVerifications: number;
}

interface ApiResponse {
  status: boolean;
  message: string;
  data: StatsData;
}

function OverviewCard() {
  const session = useSession();
  const TOKEN = session?.data?.user?.accessToken;

  const { data: overviewData, isLoading } = useQuery<ApiResponse>({
    queryKey: ["overview"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users/admin/stats`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch stats");
      return res.json();
    },
  });

  const stats = overviewData?.data;

  const statCards: StatCardProps[] = [
    {
      icon: <Users size={28} strokeWidth={1.5} />,
      value: isLoading ? "..." : (stats?.totalUsers ?? 0),
      label: "Total Users",
    },
    {
      icon: <Megaphone size={28} strokeWidth={1.5} />,
      value: isLoading ? "..." : (stats?.totalCampaigns ?? 0),
      label: "Campaigns",
    },
    {
      icon: <Trophy size={28} strokeWidth={1.5} />,
      value: isLoading ? "..." : (stats?.totalWinners ?? 0),
      label: "Total Winners",
    },
  ];

  return (
    <div className="">
      <div className="">
        <h2 className="text-white text-[24px] font-bold mb-6 leading-[120%]">
          Dashboard Overview
        </h2>
        <div className="grid grid-cols-3 gap-6">
          {statCards.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default OverviewCard;