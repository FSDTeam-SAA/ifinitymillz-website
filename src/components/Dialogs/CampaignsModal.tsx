"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eye, X } from "lucide-react";
import Image from "next/image";

interface CampaignDetails {
  campaignName: string;
  description: string;
  prizeImage: string;
  ticketPrice: number;
  totalTickets: number;
  totalTicketSold: number;
  totalTicketRemaining: number;
  status: "Active" | "Ended" | "Closed";
  participants: number;
  totalEntries: number;
  revenue: number;
}

const dummyCampaign: CampaignDetails = {
  campaignName: "Mayfair Estates Draw",
  description:
    "We're giving away the ultimate Iphone 15 pro max to one lucky entrant! Entering is fast, easy, and could change your entire year. Don't sit on the sidelines while someone else takes the trophy.",
  prizeImage: "",
  ticketPrice: 50,
  totalTickets: 500,
  totalTicketSold: 200,
  totalTicketRemaining: 300,
  status: "Ended",
  participants: 170,
  totalEntries: 420,
  revenue: 2100,
};

// Placeholder image when no real image is available
function PrizeImagePlaceholder() {
  return (
    <div
      className="rounded-xl overflow-hidden flex items-center justify-center"
      style={{
        width: 190,
        height: 140,
        background: "linear-gradient(135deg, #2a2010 0%, #1a1400 100%)",
        border: "1px solid #3a3020",
      }}
    >
      {/* Simulated phone image using CSS */}
      <div className="flex flex-col items-center gap-1">
        <div
          className="rounded-2xl flex items-center justify-center"
          style={{
            width: 60,
            height: 100,
            background:
              "linear-gradient(160deg, #c0c0c0 0%, #888 50%, #aaa 100%)",
            border: "2px solid #666",
            position: "relative",
          }}
        >
          {/* Screen */}
          <div
            style={{
              width: 48,
              height: 78,
              background: "#111",
              borderRadius: 10,
            }}
          />
          {/* Camera bump */}
          <div
            style={{
              position: "absolute",
              top: 8,
              left: 4,
              width: 18,
              height: 28,
              background: "#555",
              borderRadius: 6,
            }}
          />
        </div>
      </div>
    </div>
  );
}

interface CampaignDetailsModalProps {
  campaign?: CampaignDetails;
}

export function CampaignDetailsModal({
  campaign = dummyCampaign,
}: CampaignDetailsModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="w-8 h-8 rounded-md bg-[#2a2010] border border-[#4a3a20] flex items-center justify-center hover:bg-[#3a2a10] transition-colors group"
          title="View"
        >
          <Eye
            size={15}
            className="text-[#c9a84c] group-hover:text-[#e8b84b]"
          />
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-[620px] p-0 gap-0 border border-[#2a2a2a] rounded-2xl overflow-hidden bg-[#1c1c1c] shadow-2xl">
        {/* Hide default shadcn close */}
        <style>{`[data-radix-dialog-close]{display:none!important}`}</style>

        {/* Header */}
        <DialogHeader className="px-7 pt-7 pb-5 border-b border-[#2a2a2a] flex flex-row items-start justify-between">
          <div>
            <DialogTitle className="text-white text-xl font-bold leading-none mb-3">
              Campaign Details
            </DialogTitle>
            <p className="text-[#c9a84c] text-sm font-semibold leading-none">
              {campaign.campaignName}
            </p>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="text-[#666] hover:text-white transition-colors mt-1 flex-shrink-0"
          >
            <X size={20} />
          </button>
        </DialogHeader>

        {/* Body */}
        <div className="px-7 py-6 flex flex-col gap-6">
          {/* Description */}
          <p className="text-[#aaaaaa] text-sm leading-[170%]">
            {campaign.description}
          </p>

          {/* Prize Image + Stats Row */}
          <div className="flex gap-8 items-start">
            {/* Left — Image + ticket info */}
            <div className="flex flex-col gap-4">
              <p className="text-[#888] text-sm font-medium">
                Prize Image<span className="text-[#e05555]">*</span>
              </p>

              {/* Image */}
              {campaign.prizeImage ? (
                <div className="rounded-xl overflow-hidden w-[190px] h-[140px]">
                  <Image
                    width={400}
                    height={300}
                    src={campaign.prizeImage}
                    alt="Prize"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <PrizeImagePlaceholder />
              )}

              {/* Ticket details */}
              <div className="flex flex-col gap-2 mt-1">
                {[
                  ["Ticket Price", `$${campaign.ticketPrice}`],
                  ["Total Ticket", campaign.totalTickets],
                  ["Total Ticket sold", campaign.totalTicketSold],
                  ["Total Ticket remaining", campaign.totalTicketRemaining],
                ].map(([label, value]) => (
                  <p
                    key={label as string}
                    className="text-[#C9C9C9] text-sm leading-[160%]"
                  >
                    <span className="text-[#888]">{label} : </span>
                    {value}
                  </p>
                ))}
              </div>

              {/* Status */}
              <p className="text-[#C9C9C9] text-sm mt-1">
                <span className="text-[#888]">Status : </span>
                {campaign.status}
              </p>
            </div>

            {/* Divider */}
            <div className="w-px self-stretch bg-[#2a2a2a]" />

            {/* Right — Entry Statistics */}
            <div className="flex-1 flex flex-col gap-4 pt-8">
              <h3 className="text-white text-lg font-bold leading-none">
                Entry Statistics
              </h3>

              <div className="flex flex-col gap-3 mt-1">
                {[
                  ["Participants", campaign.participants],
                  ["Total Entries", campaign.totalEntries],
                  ["Revenue", `$${campaign.revenue.toLocaleString()}`],
                ].map(([label, value]) => (
                  <p
                    key={label as string}
                    className="text-[#C9C9C9] text-sm leading-[160%]"
                  >
                    <span className="text-[#888]">{label} : </span>
                    {value}
                  </p>
                ))}
              </div>

              {/* Visual revenue bar */}
              <div className="mt-4 flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-[#555] text-xs">Tickets Sold</span>
                  <span className="text-[#c9a84c] text-xs font-semibold">
                    {Math.round(
                      (campaign.totalTicketSold / campaign.totalTickets) * 100,
                    )}
                    %
                  </span>
                </div>
                <div className="h-2 rounded-full bg-[#2a2a2a] overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${(campaign.totalTicketSold / campaign.totalTickets) * 100}%`,
                      background: "linear-gradient(90deg, #8a6820, #e8b84b)",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CampaignDetailsModal;
