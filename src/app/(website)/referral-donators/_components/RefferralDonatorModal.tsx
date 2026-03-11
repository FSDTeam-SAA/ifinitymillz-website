"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eye } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Donor {
  name: string;
  email: string;
  mobile: string;
  country: string;
  city: string;
}

interface Donation {
  _id: string;
  studentId: string;
  donor: Donor;
  amount: number;
  createdAt: string;
}

interface Student {
  studentId: string;
  name: string;
  email: string;
  others: Record<string, string>;
  raisedAmount: number;
}

interface CreatedBy {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface Campaign {
  _id: string;
  name: string;
  description: string;
  totalRaised: number;
  raiseGoal: string;
  createdBy: CreatedBy;
  students: Student[];
  donations: Donation[];
}

interface Props {
  id: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function RefferralDonatorModal({ id }: Props) {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  const [open, setOpen] = useState(false);

  // ── GET single campaign ──────────────────────────────────────────────────
  const { data: campaign, isLoading } = useQuery<Campaign>({
    queryKey: ["singleCampaign", id],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/campaign/${id}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const json = await res.json();
      return json?.data as Campaign;
    },
    enabled: !!token && !!id && open,
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="inline-flex items-center justify-center w-8 h-8 border border-gray-300 rounded hover:bg-gray-100 transition"
          aria-label="View campaign"
        >
          <Eye className="w-4 h-4 text-gray-600" />
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl p-0 rounded-xl overflow-hidden border border-gray-200 shadow-xl">
        <div className="px-7 py-6 space-y-5 max-h-[80vh] overflow-y-auto">

          {/* Header */}
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-gray-900">
              {campaign?.name ?? "Campaign Details"}
            </DialogTitle>
          </DialogHeader>

          {/* Loading */}
          {isLoading && (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
            </div>
          )}

          {campaign && (
            <>
              {/* Campaign Info */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-400">Campaign Name</p>
                  <p className="font-medium text-gray-800">{campaign.name}</p>
                </div>
                <div>
                  <p className="text-gray-400">Total Raised</p>
                  <p className="font-medium text-gray-800">${campaign.totalRaised}</p>
                </div>
                <div>
                  <p className="text-gray-400">Raise Goal</p>
                  <p className="font-medium text-gray-800">${campaign.raiseGoal}</p>
                </div>
                <div>
                  <p className="text-gray-400">Created By</p>
                  <p className="font-medium text-gray-800">{campaign.createdBy?.name}</p>
                </div>
                {campaign.description && (
                  <div className="col-span-2">
                    <p className="text-gray-400">Description</p>
                    <p className="font-medium text-gray-800">{campaign.description}</p>
                  </div>
                )}
              </div>

              {/* Donations Table */}
              {campaign.donations?.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Donations</h3>
                  <div className="rounded-lg border border-gray-200 overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                          <th className="text-left px-4 py-2 text-gray-600 font-medium">Donor</th>
                          <th className="text-left px-4 py-2 text-gray-600 font-medium">Email</th>
                          <th className="text-left px-4 py-2 text-gray-600 font-medium">Country</th>
                          <th className="text-center px-4 py-2 text-gray-600 font-medium">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {campaign.donations.map((donation) => (
                          <tr
                            key={donation._id}
                            className="border-b border-gray-100 last:border-none hover:bg-gray-50"
                          >
                            <td className="px-4 py-2 text-gray-700">{donation.donor?.name}</td>
                            <td className="px-4 py-2 text-gray-600">{donation.donor?.email}</td>
                            <td className="px-4 py-2 text-gray-600">{donation.donor?.country}</td>
                            <td className="px-4 py-2 text-center font-medium text-blue-600">
                              ${donation.amount}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Students Table */}
              {campaign.students?.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Students</h3>
                  <div className="rounded-lg border border-gray-200 overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                          <th className="text-left px-4 py-2 text-gray-600 font-medium">Student ID</th>
                          <th className="text-left px-4 py-2 text-gray-600 font-medium">Name</th>
                          <th className="text-left px-4 py-2 text-gray-600 font-medium">Email</th>
                          <th className="text-center px-4 py-2 text-gray-600 font-medium">Raised</th>
                        </tr>
                      </thead>
                      <tbody>
                        {campaign.students.map((student) => (
                          <tr
                            key={student.studentId}
                            className="border-b border-gray-100 last:border-none hover:bg-gray-50"
                          >
                            <td className="px-4 py-2 text-gray-700 font-mono">{student.studentId}</td>
                            <td className="px-4 py-2 text-gray-700">{student.name}</td>
                            <td className="px-4 py-2 text-gray-600">{student.email}</td>
                            <td className="px-4 py-2 text-center font-medium text-blue-600">
                              ${student.raisedAmount}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}

        </div>
      </DialogContent>
    </Dialog>
  );
}