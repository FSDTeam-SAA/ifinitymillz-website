"use client"

import React, { useState } from "react"
import { Eye, Users, LogOut, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

// ─── Dummy Data ───────────────────────────────────────────────────────────────

const DUMMY_CAMPAIGNS = Array.from({ length: 12 }, (_, i) => ({
  _id: String(i + 1),
  title: "Bringing health to those who need it most",
  totalDonators: 500,
  totalDonations: 500,
}))

const ITEMS_PER_PAGE = 10

// ─── Root Export ──────────────────────────────────────────────────────────────

export default function PersonalDonationInfo() {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)

  const totalResults = DUMMY_CAMPAIGNS.length
  const totalPages = Math.ceil(totalResults / ITEMS_PER_PAGE)

  const paginated = DUMMY_CAMPAIGNS.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const getPageNumbers = (): (number | "...")[] => {
    if (totalPages <= 6) return Array.from({ length: totalPages }, (_, i) => i + 1)
    return [1, 2, 3, "...", totalPages]
  }

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
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>

          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Profile</h1>

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded transition">
              <Users className="w-4 h-4" />
              Referral donators
            </button>
            <button className="flex items-center gap-1.5 bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-2 rounded transition">
              <LogOut className="w-4 h-4" />
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
                <th className="text-center px-4 py-4 text-gray-700 font-semibold">Total Donators</th>
                <th className="text-center px-4 py-4 text-gray-700 font-semibold">Total Donations</th>
                <th className="text-center px-4 py-4 text-gray-700 font-semibold">Action</th>
              </tr>
            </thead>

            <tbody>
              {paginated.map((campaign) => (
                <tr
                  key={campaign._id}
                  className="border-b border-gray-100 last:border-none hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 text-gray-700">{campaign.title}</td>
                  <td className="px-4 py-4 text-center text-gray-600">{campaign.totalDonators}</td>
                  <td className="px-4 py-4 text-center text-gray-600">{campaign.totalDonations}$</td>
                  <td className="px-4 py-4 text-center">
                    <button
                      className="inline-flex items-center justify-center w-8 h-8 border border-gray-300 rounded hover:bg-gray-100 transition"
                      aria-label="View campaign"
                    >
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* ── Pagination footer ─────────────────────────────────────────── */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
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
                  <span key={`dots-${idx}`} className="w-8 h-8 flex items-center justify-center text-sm text-gray-500">
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
  )
}