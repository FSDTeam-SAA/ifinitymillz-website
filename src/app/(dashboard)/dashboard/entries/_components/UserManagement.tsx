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
import { ChevronLeft, ChevronRight, Ban } from "lucide-react";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useSession } from "next-auth/react";

type UserStatus = "Pending" | "Approved" | "Rejected" | "Suspended";

interface CampaignDetail {
  _id: string;
  title: string;
  status?: string;
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
  status?: UserStatus;
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

function ActionButtons({
  status,
  isLoading,
  onAccept,
  onReject,
  onSuspend,
}: {
  status: UserStatus;
  isLoading: boolean;
  onAccept: () => void;
  onReject: () => void;
  onSuspend: () => void;
}) {
  if (status === "Suspended") {
    return (
      <Badge className="bg-[#e05555] hover:bg-[#c94444] text-white text-[14px] font-semibold px-4 py-1.5 rounded-full flex items-center gap-1 cursor-default border-0 opacity-80">
        <Ban size={12} />
        Suspended
      </Badge>
    );
  }

  if (status === "Approved") {
    return (
      <Badge
        onClick={onSuspend}
        className={`bg-[#e05555] hover:bg-[#c94444] text-white text-[14px] font-semibold px-4 py-1.5 rounded-full flex items-center gap-1 cursor-pointer border-0 transition-colors ${
          isLoading ? "pointer-events-none opacity-60" : ""
        }`}
      >
        <Ban size={12} />
        Suspend
      </Badge>
    );
  }

  if (status === "Rejected") {
    return (
      <Badge className="bg-[#e05555] hover:bg-[#c94444] text-white text-[14px] font-semibold px-4 py-1.5 rounded-full cursor-default border-0 opacity-60">
        Rejected
      </Badge>
    );
  }

  // Pending — show Accept / Reject
  return (
    <div className="flex items-center gap-2">
      <Badge
        onClick={onAccept}
        className={`bg-[#3dba6f] hover:bg-[#34a561] text-white text-[14px] font-semibold px-4 py-1.5 rounded-full cursor-pointer border-0 transition-colors ${
          isLoading ? "pointer-events-none opacity-60" : ""
        }`}
      >
        Accept
      </Badge>
      <Badge
        onClick={onReject}
        className={`bg-[#e05555] hover:bg-[#c94444] text-white text-[14px] font-semibold px-4 py-1.5 rounded-full cursor-pointer border-0 transition-colors ${
          isLoading ? "pointer-events-none opacity-60" : ""
        }`}
      >
        Reject
      </Badge>
    </div>
  );
}

function UserManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeRowId, setActiveRowId] = useState<string | null>(null);
  const queryClient = useQueryClient();
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

  const updateStatus = useMutation({
    mutationFn: async ({
      entryId,
      status,
    }: {
      entryId: string;
      status: UserStatus;
    }) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/entries/${entryId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN}`,
          },
          body: JSON.stringify({ status }),
        }
      );
      const json = await res.json();
      if (!res.ok || !json?.status) {
        throw new Error(json?.message || "Failed to update status");
      }
      return json;
    },
    onMutate: ({ entryId }) => {
      setActiveRowId(entryId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-data"] });
    },
    onSettled: () => {
      setActiveRowId(null);
    },
  });

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
                {["Campaign", "Tickets", "Entry Type", "Amount", "Payment Status", "Date", "Actions"].map(
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
                      <TableCell className="text-center py-4"><Skeleton className="h-8 w-24 rounded-full mx-auto bg-[#2a2a2a]" /></TableCell>
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

                      {/* Actions */}
                      <TableCell className="text-center py-4">
                        <div className="flex justify-center">
                          <ActionButtons
                            status={entry.status || "Pending"}
                            isLoading={updateStatus.isPending && activeRowId === entry._id}
                            onAccept={() =>
                              updateStatus.mutate({ entryId: entry._id, status: "Approved" })
                            }
                            onReject={() =>
                              updateStatus.mutate({ entryId: entry._id, status: "Rejected" })
                            }
                            onSuspend={() =>
                              updateStatus.mutate({ entryId: entry._id, status: "Suspended" })
                            }
                          />
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