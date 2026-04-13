"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useSession } from "next-auth/react";

interface ResultEntry {
  campaignTitle: string;
  prizeImage: string;
  yourTickets: string[];
  winnerTicket: string;
  winnerName: string;
  result: string;
  isWinner: boolean;
}

const PAGE_SIZE = 7;

function PrizeThumbnail({ image, title }: { image: string; title: string }) {
  return (
    <div
      className="w-9 h-9 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #3a3020 0%, #1a1400 100%)",
        border: "1px solid #3a3020",
      }}
    >
      {image ? (
        <Image
          width={400}
          height={400}
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="text-[#c9a84c] text-sm">🏆</span>
      )}
    </div>
  );
}

function WinnersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const session = useSession();
  const TOKEN = session?.data?.user?.accessToken;

  const { data: resultsData, isLoading } = useQuery<ResultEntry[]>({
    queryKey: ["winners"],
    enabled: !!TOKEN,
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/entries/results`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN}`,
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

  const allResults: ResultEntry[] = resultsData ?? [];
  const totalPages = Math.max(1, Math.ceil(allResults.length / PAGE_SIZE));
  const paginated = allResults.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const getPageNumbers = () => {
    const pages: number[] = [];
    for (let i = 1; i <= Math.min(totalPages, 3); i++) pages.push(i);
    return pages;
  };

  return (
    <div className="min-h-screen">
      {/* Title */}
      <h1 className="text-white text-[24px] font-bold mb-8 leading-[120%]">
        Winners / Draw Results
      </h1>

      {isLoading ? (
        <div className="flex items-center justify-center h-48">
          <p className="text-[#888] text-sm">Loading results...</p>
        </div>
      ) : (
        <>
          {/* Table */}
          <div className="rounded-xl overflow-hidden border border-[#2a2a2a]">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#e8b84b] hover:bg-[#e8b84b] border-0">
                  {[
                    "Campaign",
                    "Your Tickets",
                    "Winning Ticket",
                    "Winner Name",
                    "Result",
                  ].map((col) => (
                    <TableHead
                      key={col}
                      className="text-[#1F1F1F] text-base text-center py-4 font-medium whitespace-nowrap"
                    >
                      {col}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>

              <TableBody>
                {paginated.map((entry, index) => (
                  <TableRow
                    key={`${entry.campaignTitle}-${index}`}
                    className={`border-b border-[#222222] hover:bg-[#1e1e1e] transition-colors ${
                      index % 2 === 0 ? "bg-[#161616]" : "bg-[#131313]"
                    }`}
                  >
                    {/* Campaign */}
                    <TableCell className="py-4 text-center">
                      <div className="flex items-center gap-3 justify-center">
                        <PrizeThumbnail
                          image={entry.prizeImage}
                          title={entry.campaignTitle}
                        />
                        <span className="text-[#C9C9C9] text-base font-medium whitespace-nowrap">
                          {entry.campaignTitle}
                        </span>
                      </div>
                    </TableCell>

                    {/* Your Tickets */}
                    <TableCell className="text-center py-4">
                      <div className="flex flex-wrap gap-1 justify-center max-w-[200px] mx-auto">
                        {(entry.yourTickets || []).map((ticket) => (
                          <span
                            key={ticket}
                            className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                              ticket === entry.winnerTicket
                                ? "bg-[#1a3a2a] text-[#3dba6f] border border-[#2a5a3a]"
                                : "bg-[#2a2a2a] text-[#888]"
                            }`}
                          >
                            {ticket}
                          </span>
                        ))}
                      </div>
                    </TableCell>

                    {/* Winning Ticket */}
                    <TableCell className="text-center py-4">
                      <span className="text-[#c9a84c] text-base font-semibold">
                        {entry.winnerTicket}
                      </span>
                    </TableCell>

                    {/* Winner Name */}
                    <TableCell className="text-[#aaaaaa] text-base text-center py-4 whitespace-nowrap">
                      {entry.winnerName || "—"}
                    </TableCell>

                    {/* Result */}
                    <TableCell className="text-center py-4">
                      <span
                        className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold border ${
                          entry.isWinner
                            ? "bg-[#1a3a2a] text-[#3dba6f] border-[#2a5a3a]"
                            : "bg-[#2a1a1a] text-[#e05555] border-[#4a2a2a]"
                        }`}
                      >
                        {entry.result}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}

                {paginated.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center text-[#555] py-12 text-sm"
                    >
                      No results found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {allResults.length > PAGE_SIZE && (
            <div className="flex justify-end items-center gap-1 mt-5">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-9 h-9 rounded-md bg-[#1a1a1a] border-[#2e2e2e] text-[#888] hover:bg-[#252525] hover:text-white disabled:opacity-30"
              >
                <ChevronLeft size={14} />
              </Button>

              {getPageNumbers().map((page) => (
                <Button
                  key={page}
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(page)}
                  className={`w-9 h-9 rounded-md text-sm font-semibold border transition-colors ${
                    currentPage === page
                      ? "bg-[#e8b84b] border-[#e8b84b] text-[#111111] hover:bg-[#d4a73e]"
                      : "bg-[#1a1a1a] border-[#2e2e2e] text-[#888] hover:bg-[#252525] hover:text-white"
                  }`}
                >
                  {page}
                </Button>
              ))}

              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="w-9 h-9 rounded-md bg-[#1a1a1a] border-[#2e2e2e] text-[#888] hover:bg-[#252525] hover:text-white disabled:opacity-30"
              >
                <ChevronRight size={14} />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default WinnersPage;