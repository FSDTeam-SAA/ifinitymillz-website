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

type StatusType = "Paid" | "Approved" | "Rejected" | "Pending";

interface CampaignDetail {
  _id: string;
  title: string;
  prizeImage?: string;
  remainingTickets?: number | null;
}

interface WithdrawalItem {
  _id: string;
  userId: string;
  campaignId?: CampaignDetail;
  amount: number;
  bankName: string;
  accountName: string;
  accountNumber: string;
  routingCode?: string;
  method: string;
  notes?: string;
  status: StatusType;
  createdAt: string;
}

const STATUS_STYLES: Record<StatusType, { bg: string; text: string; border: string }> = {
  Paid:     { bg: "#1a3a2a", text: "#3dba6f", border: "#2a5a3a" },
  Approved: { bg: "#1a3a2a", text: "#3dba6f", border: "#2a5a3a" },
  Rejected: { bg: "#3a1a1a", text: "#e05555", border: "#5a2a2a" },
  Pending:  { bg: "#2a2510", text: "#c9a84c", border: "#4a4020" },
};

const PAGE_SIZE = 7;

function CampaignThumbnail({ image, title }: { image?: string; title: string }) {
  return (
    <div
      className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden"
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

function StatusBadge({ status }: { status: StatusType }) {
  const styles = STATUS_STYLES[status] ?? STATUS_STYLES["Pending"];
  return (
    <span
      className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold"
      style={{
        background: styles.bg,
        color: styles.text,
        border: `1px solid ${styles.border}`,
      }}
    >
      {status}
    </span>
  );
}

function WithdrawalRequest() {
  const [currentPage, setCurrentPage] = useState(1);
  const session = useSession();
  const TOKEN = session?.data?.user?.accessToken;

  const { data: withdrawalData, isLoading } = useQuery<WithdrawalItem[]>({
    queryKey: ["withdrawals"],
    enabled: !!TOKEN,
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/withdrawals/my`,
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
        throw new Error(json?.message || "Failed to fetch withdrawals");
      }
      return json.data;
    },
  });

  const allWithdrawals: WithdrawalItem[] = withdrawalData ?? [];
  const totalPages = Math.max(1, Math.ceil(allWithdrawals.length / PAGE_SIZE));
  const paginated = allWithdrawals.slice(
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
        Withdrawal Request
      </h1>

      {isLoading ? (
        <div className="flex items-center justify-center h-48">
          <p className="text-[#888] text-sm">Loading withdrawals...</p>
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
                    "Amount",
                    "Bank Name",
                    "Account Name",
                    "Acc. No.",
                    "Method",
                    "Date",
                    "Status",
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
                {paginated.map((item, index) => (
                  <TableRow
                    key={item._id}
                    className={`border-b border-[#222222] hover:bg-[#1e1e1e] transition-colors ${
                      index % 2 === 0 ? "bg-[#161616]" : "bg-[#131313]"
                    }`}
                  >
                    {/* Campaign */}
                    <TableCell className="py-4 text-center">
                      <div className="flex items-center gap-3 justify-center">
                        <CampaignThumbnail
                          image={item.campaignId?.prizeImage}
                          title={item.campaignId?.title ?? ""}
                        />
                        <span className="text-[#C9C9C9] text-sm font-semibold whitespace-nowrap">
                          {item.campaignId?.title ?? "—"}
                        </span>
                      </div>
                    </TableCell>

                    {/* Amount */}
                    <TableCell className="text-[#aaaaaa] text-base text-center py-4">
                      ${item.amount}
                    </TableCell>

                    {/* Bank Name */}
                    <TableCell className="text-[#aaaaaa] text-base text-center py-4 whitespace-nowrap">
                      {item.bankName}
                    </TableCell>

                    {/* Account Name */}
                    <TableCell className="text-[#aaaaaa] text-base text-center py-4 whitespace-nowrap">
                      {item.accountName}
                    </TableCell>

                    {/* Account Number */}
                    <TableCell className="text-[#aaaaaa] text-base text-center py-4">
                      {item.accountNumber}
                    </TableCell>

                    {/* Method */}
                    <TableCell className="text-[#aaaaaa] text-base text-center py-4 whitespace-nowrap">
                      {item.method}
                    </TableCell>

                    {/* Date */}
                    <TableCell className="text-[#aaaaaa] text-base text-center py-4 whitespace-nowrap">
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleDateString("en-GB")
                        : "—"}
                    </TableCell>

                    {/* Status */}
                    <TableCell className="text-center py-4">
                      <div className="flex justify-center">
                        <StatusBadge status={item.status} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}

                {paginated.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="text-center text-[#555] py-12 text-sm"
                    >
                      No withdrawal requests found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {allWithdrawals.length > PAGE_SIZE && (
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

export default WithdrawalRequest;