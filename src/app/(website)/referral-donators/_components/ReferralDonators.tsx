"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { RefferralDonatorModal } from "./RefferralDonatorModal";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface CampaignItem {
  _id: string;
  campaignId: string;
  campaignTitle: string;
  totalDonors: number;
  totalRaised: number;
}

interface Pagination {
  currentPage: number;
  totalPages: number;
  totalData: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface ApiData {
  pagination: Pagination;
  campaigns: CampaignItem[];
}

// ─── Constants ────────────────────────────────────────────────────────────────

const ITEMS_PER_PAGE = 8;

// ─── Component ────────────────────────────────────────────────────────────────

export default function ReferralDonators() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  // ── GET my campaign donations ────────────────────────────────────────────
  const { data, isLoading } = useQuery<ApiData>({
    queryKey: ["referralDonators", currentPage],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/campaign/my-donations?page=${currentPage}&limit=${ITEMS_PER_PAGE}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const json = await res.json();
      return json?.data as ApiData;
    },
    enabled: !!token,
  });

  const campaigns: CampaignItem[] = data?.campaigns ?? [];
  const totalResults: number = data?.pagination?.totalData ?? 0;
  const totalPages: number = data?.pagination?.totalPages ?? 1;

  const getPageNumbers = (): (number | "...")[] => {
    if (totalPages <= 6) return Array.from({ length: totalPages }, (_, i) => i + 1);
    return [1, 2, 3, "...", totalPages];
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* ── Top Bar ──────────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="p-1 hover:bg-gray-200 rounded transition"
            aria-label="Go back"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>

          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Profile</h1>

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Referral donators
            </button>
            <button className="flex items-center gap-1.5 bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-2 rounded transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
              </svg>
              Log out
            </button>
          </div>
        </div>

        {/* ── Table Card ───────────────────────────────────────────────────── */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left px-6 py-4 text-gray-700 font-semibold">Campaign Title</th>
                <th className="text-center px-4 py-4 text-gray-700 font-semibold">Total Donors</th>
                <th className="text-center px-4 py-4 text-gray-700 font-semibold">Total Raised</th>
                <th className="text-center px-4 py-4 text-gray-700 font-semibold">Action</th>
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-gray-400">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600" />
                    </div>
                  </td>
                </tr>
              ) : campaigns.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-gray-400 text-sm">
                    No campaigns found.
                  </td>
                </tr>
              ) : (
                campaigns.map((campaign) => (
                  <tr
                    key={campaign._id}
                    className="border-b border-gray-100 last:border-none hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-gray-700">{campaign.campaignTitle}</td>
                    <td className="px-4 py-4 text-center text-gray-600">{campaign.totalDonors}</td>
                    <td className="px-4 py-4 text-center text-gray-600">${campaign.totalRaised}</td>
                    <td className="px-4 py-4 text-center">
                      <RefferralDonatorModal id={campaign.campaignId} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* ── Pagination footer ─────────────────────────────────────────── */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Showing {totalResults === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
              {Math.min(currentPage * ITEMS_PER_PAGE, totalResults)} of {totalResults} results
            </p>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                <ChevronLeft className="w-4 h-4 text-gray-600" />
              </button>

              {getPageNumbers().map((page, idx) =>
                page === "..." ? (
                  <span
                    key={`dots-${idx}`}
                    className="w-8 h-8 flex items-center justify-center text-sm text-gray-500"
                  >
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page as number)}
                    className={cn(
                      "w-8 h-8 flex items-center justify-center rounded text-sm font-medium border transition",
                      currentPage === page
                        ? "bg-blue-600 text-white border-blue-600"
                        : "border-gray-300 text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                <ChevronRight className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}