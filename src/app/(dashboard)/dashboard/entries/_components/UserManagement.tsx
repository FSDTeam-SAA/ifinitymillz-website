"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

type CampaignStatus = "Active" | "Ended" | "Pending" | "Approved" | "Rejected" | "Suspended";

interface CampaignDetail {
  _id: string;
  title: string;
  status?: CampaignStatus;
}

interface EntryTicket {
  _id: string;
  ticketNumber: string;
}

interface ApiEntry {
  _id: string;
  userId: string;
  campaignId?: CampaignDetail;
  quantity: number;
  tickets: EntryTicket[];
  entryType: "FREE" | "PAID";
  amount: number;
  paymentStatus?: string;
  transactionId?: string;
  createdAt: string;
}

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalData: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface ApiResponse {
  status: boolean;
  message: string;
  data: {
    entries: ApiEntry[];
    paginationInfo: PaginationInfo;
  };
}

const PAGE_SIZE = 10;

function StatusBadge({ status }: { status?: CampaignStatus }) {
  const s = status || "Pending";

  const styles: Record<CampaignStatus, string> = {
    Active:    "bg-[#1a3a2a] text-[#3dba6f] border border-[#2a5a3a]",
    Approved:  "bg-[#1a3a2a] text-[#3dba6f] border border-[#2a5a3a]",
    Ended:     "bg-[#2a2a3a] text-[#8888cc] border border-[#3a3a5a]",
    Pending:   "bg-[#3a3010] text-[#c9a84c] border border-[#5a4a20]",
    Rejected:  "bg-[#3a1a1a] text-[#e05555] border border-[#5a2a2a]",
    Suspended: "bg-[#3a1a1a] text-[#e05555] border border-[#5a2a2a]",
  };

  return (
    <Badge className={`${styles[s]} hover:opacity-90 text-xs font-semibold px-3 py-1 rounded-full cursor-default`}>
      {s}
    </Badge>
  );
}

function UserManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const session = useSession();
  const TOKEN = session?.data?.user?.accessToken;

  const { data: apiData, isLoading } = useQuery<ApiResponse>({
    queryKey: ["user-data", currentPage],
    enabled: !!TOKEN,
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/entries/my?page=${currentPage}&limit=${PAGE_SIZE}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
      const json = await res.json();
      if (!res.ok || !json?.status) {
        throw new Error(json?.message || "Failed to fetch entries");
      }
      return json;
    },
  });

  const entries: ApiEntry[] = apiData?.data?.entries ?? [];
  const totalPages = Math.max(1, Number(apiData?.data?.paginationInfo?.totalPages || 1));
  const totalData = Number(apiData?.data?.paginationInfo?.totalData || 0);
  const shouldShowPagination = totalData > PAGE_SIZE;

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= Math.min(totalPages, 3); i++) pages.push(i);
    return pages;
  };

  return (
    <div className="min-h-screen">
      <div className="">
        {/* Title */}
        <h1 className="text-white text-[24px] font-bold mb-10 leading-[120%]">
          User Management
        </h1>

        {/* Table Container */}
        <div className="rounded-xl overflow-hidden border border-[#2a2a2a]">
          <Table>
            {/* Header */}
            <TableHeader>
              <TableRow className="bg-[#e8b84b] hover:bg-[#e8b84b] border-0">
                {["Campaign", "Tickets", "Entry Type", "Amount", "Payment Status", "Date", "Status"].map(
                  (col) => (
                    <TableHead
                      key={col}
                      className="text-[#1F1F1F] text-base text-center py-4 font-medium whitespace-nowrap"
                    >
                      {col}
                    </TableHead>
                  )
                )}
              </TableRow>
            </TableHeader>

            {/* Body */}
            <TableBody>
              {isLoading
                ? Array.from({ length: 6 }).map((_, index) => (
                    <TableRow
                      key={`skeleton-${index}`}
                      className={`border-b border-[#222222] hover:bg-[#1e1e1e] transition-colors ${
                        index % 2 === 0 ? "bg-[#161616]" : "bg-[#131313]"
                      }`}
                    >
                      <TableCell className="text-center py-5"><Skeleton className="h-5 w-32 mx-auto bg-[#2a2a2a]" /></TableCell>
                      <TableCell className="text-center py-5"><Skeleton className="h-5 w-24 mx-auto bg-[#2a2a2a]" /></TableCell>
                      <TableCell className="text-center py-5"><Skeleton className="h-6 w-16 mx-auto rounded-full bg-[#2a2a2a]" /></TableCell>
                      <TableCell className="text-center py-5"><Skeleton className="h-5 w-14 mx-auto bg-[#2a2a2a]" /></TableCell>
                      <TableCell className="text-center py-5"><Skeleton className="h-5 w-20 mx-auto bg-[#2a2a2a]" /></TableCell>
                      <TableCell className="text-center py-5"><Skeleton className="h-5 w-24 mx-auto bg-[#2a2a2a]" /></TableCell>
                      <TableCell className="text-center py-4"><Skeleton className="h-6 w-20 rounded-full mx-auto bg-[#2a2a2a]" /></TableCell>
                    </TableRow>
                  ))
                : entries.map((entry, index) => (
                    <TableRow
                      key={entry._id}
                      className={`border-b border-[#222222] hover:bg-[#1e1e1e] transition-colors ${
                        index % 2 === 0 ? "bg-[#161616]" : "bg-[#131313]"
                      }`}
                    >
                      {/* Campaign */}
                      <TableCell className="text-[#C9C9C9] text-base font-medium text-center py-5 leading-[120%] whitespace-nowrap">
                        {entry.campaignId?.title || "-"}
                      </TableCell>

                      {/* Tickets */}
                      <TableCell className="text-[#aaaaaa] text-base text-center py-5 leading-[120%]">
                        {entry.quantity} Tickets
                      </TableCell>

                      {/* Entry Type */}
                      <TableCell className="text-center py-5">
                        {entry.entryType === "FREE" ? (
                          <Badge className="bg-[#1a3a2a] hover:bg-[#1a3a2a] text-[#3dba6f] text-xs font-semibold px-3 py-1 rounded-full border border-[#2a5a3a] cursor-default">
                            Free
                          </Badge>
                        ) : (
                          <Badge className="bg-[#3a2a10] hover:bg-[#3a2a10] text-[#c9a84c] text-xs font-semibold px-3 py-1 rounded-full border border-[#5a4a20] cursor-default">
                            Paid
                          </Badge>
                        )}
                      </TableCell>

                      {/* Amount */}
                      <TableCell className="text-[#aaaaaa] text-base text-center py-5 leading-[120%]">
                        {entry.entryType === "FREE" ? "—" : `$${entry.amount}`}
                      </TableCell>

                      {/* Payment Status */}
                      <TableCell className="text-center py-5">
                        <span
                          className={`text-sm font-medium ${
                            entry.paymentStatus === "Paid"
                              ? "text-[#3dba6f]"
                              : "text-[#aaaaaa]"
                          }`}
                        >
                          {entry.paymentStatus || "-"}
                        </span>
                      </TableCell>

                      {/* Date */}
                      <TableCell className="text-[#aaaaaa] text-base text-center py-5 leading-[120%] whitespace-nowrap">
                        {entry.createdAt
                          ? new Date(entry.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "2-digit",
                              year: "numeric",
                            })
                          : "-"}
                      </TableCell>

                      {/* Status */}
                      <TableCell className="text-center py-4">
                        <div className="flex justify-center">
                          <StatusBadge status={entry.campaignId?.status} />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}

              {!isLoading && entries.length === 0 && (
                <TableRow className="bg-[#161616]">
                  <TableCell colSpan={7} className="text-center py-10 text-[#888]">
                    No entries found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {shouldShowPagination && (
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
      </div>
    </div>
  );
}

export default UserManagement;
