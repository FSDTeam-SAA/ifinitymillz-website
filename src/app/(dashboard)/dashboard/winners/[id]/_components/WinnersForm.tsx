"use client";

import { useMutation } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { Eye } from "lucide-react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface WithdrawalFormData {
  campaignId: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  routingCode: string;
  method: string;
  notes: string;
}

function WinnersForm() {
  const [campaignName, setCampaignName] = useState("");
  const [formData, setFormData] = useState<WithdrawalFormData>({
    campaignId: "",
    bankName: "",
    accountName: "",
    accountNumber: "",
    routingCode: "",
    method: "Bank Transfer",
    notes: "",
  });
  const session = useSession();
  const TOKEN = session?.data?.user?.accessToken;

  const params = useParams();
  const campaignId = params?.id as string;

  useEffect(() => {
    if (campaignId) {
      setFormData((prev) => ({ ...prev, campaignId }));
    }
  }, [campaignId]);

  const withdrawalMutation = useMutation({
    mutationFn: async (data: WithdrawalFormData) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/withdrawals`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN}`,
          },
          body: JSON.stringify(data),
        },
      );
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          errorData?.error || errorData?.message || "Request failed",
        );
      }
      return res.json();
    },
    onSuccess: () => {
      toast.success("Withdrawal request submitted successfully!");
      setFormData({
        campaignId,
        bankName: "",
        accountName: "",
        accountNumber: "",
        routingCode: "",
        method: "Bank Transfer",
        notes: "",
      });
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    if (!campaignId) {
      toast.error("Campaign ID is missing");
      return;
    }

    if (
      !formData.accountName.trim() ||
      !formData.routingCode.trim() ||
      !formData.bankName.trim() ||
      !formData.accountNumber.trim() ||
      !formData.method.trim()
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    withdrawalMutation.mutate({
      campaignId,
      bankName: formData.bankName.trim(),
      accountName: formData.accountName.trim(),
      accountNumber: formData.accountNumber.trim(),
      routingCode: formData.routingCode.trim(),
      method: formData.method,
      notes: formData.notes.trim(),
    });
  };

  const inputClass =
    "w-full bg-transparent border border-zinc-700 rounded-md px-4 py-2.5 text-white placeholder:text-zinc-500 focus:outline-none focus:border-yellow-500 transition-colors";

  return (
    <div className="min-h-screen  font-sans p-6">
      {/* Withdraw History Button */}
      <div className="flex justify-end mb-4">
        <button className="flex items-center gap-2 border border-yellow-500 text-yellow-400 px-4 py-2 rounded-md hover:bg-yellow-500/10 transition-colors">
          <Eye size={16} />
          Withdraw History
        </button>
      </div>

      {/* Form Card */}
      <div className="bg-[#1c1c1c] rounded-xl p-8 max-w-5xl mx-auto">
        <h2 className="text-white text-xl font-semibold mb-6">
          Request Withdrawal
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name / Account Name */}
          <div>
            <label className="text-zinc-300 text-sm mb-1 block">
              Full Name*
            </label>
            <input
              name="accountName"
              value={formData.accountName}
              onChange={handleChange}
              placeholder="John Martinez.."
              className={inputClass}
            />
          </div>

          {/* Campaign Name */}
          <div>
            <label className="text-zinc-300 text-sm mb-1 block">
              Campaign name*
            </label>
            <input
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
              placeholder="Enter campaign name.."
              className={inputClass}
            />
          </div>

          {/* Routing Code */}
          <div>
            <label className="text-zinc-300 text-sm mb-1 block">
              Routing Code*
            </label>
            <input
              name="routingCode"
              value={formData.routingCode}
              onChange={handleChange}
              placeholder="SWIFT123"
              className={inputClass}
            />
          </div>

          {/* Bank Name */}
          <div>
            <label className="text-zinc-300 text-sm mb-1 block">
              Bank Name*
            </label>
            <input
              name="bankName"
              value={formData.bankName}
              onChange={handleChange}
              placeholder="Prime Bank"
              className={inputClass}
            />
          </div>

          {/* Method */}
          <div>
            <label className="text-zinc-300 text-sm mb-1 block">Method</label>
            <Select
              value={formData.method}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, method: value }))
              }
            >
              <SelectTrigger className={`${inputClass} h-[46px]`}>
                <SelectValue placeholder="Select method" />
              </SelectTrigger>
              <SelectContent className="border-zinc-700 bg-[#1c1c1c] text-white">
                <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                <SelectItem value="Mobile Banking">Mobile Banking</SelectItem>
                <SelectItem value="Cash">Cash</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Account Number */}
          <div>
            <label className="text-zinc-300 text-sm mb-1 block">
              Bank Account Number*
            </label>
            <input
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              placeholder="64565465"
              className={inputClass}
            />
          </div>
        </div>

        {/* Notes */}
        <div className="mt-6">
          <label className="text-zinc-300 text-sm mb-1 block">Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Please process ASAP"
            rows={3}
            className={`${inputClass} resize-none`}
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-8">
          <button
            onClick={handleSubmit}
            disabled={withdrawalMutation.isPending}
            className="bg-yellow-500 hover:bg-yellow-400 disabled:opacity-50 text-black font-semibold px-6 py-2.5 rounded-md transition-colors"
          >
            {withdrawalMutation.isPending ? "Submitting..." : "Submit Request"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default WinnersForm;
