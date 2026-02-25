"use client";

import Link from "next/link";
import { CampaignCard } from "./CampaignCard";

const campaigns = [
  {
    id: 1,
    title: "Bringing health to those who need it most",
    description:
      "Access to healthcare should be a right, not a privilege. Read more about our efforts to help communities get the care they need.",
    image: "/images/damoImage.jpg",
    raised: 20256,
    goal: 100000,
    daysLeft: "Expired in 7days",
  },
  {
    id: 2,
    title: "Bringing health to those who need it most",
    description:
      "Access to healthcare should be a right, not a privilege. Read more about our efforts to help communities get the care they need.",
    image: "/images/damoImage.jpg",
    raised: 24256,
    goal: 100000,
    daysLeft: "Expired in 7days",
  },
  {
    id: 3,
    title: "Bringing health to those who need it most",
    description:
      "Access to healthcare should be a right, not a privilege. Read more about our efforts to help communities get the care they need.",
    image: "/images/damoImage.jpg",
    raised: 53256,
    goal: 100000,
    daysLeft: "Expired in 7days",
  },
];

export function CampaignsSection() {
  return (
    <section id="campaigns" className="py-12 sm:py-16 lg:py-24 bg-background my-3">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-[30px] sm:text-[38px] lg:text-[48px] font-medium text-foreground">
            Current Campaigns
          </h2>

          <p className="mt-4 text-base sm:text-lg text-foreground/70">
            From emergency relief to long-term development projects, your help
            can make a crucial difference.
          </p>
        </div>

        <div className="flex justify-end items-center mt-10">
          <Link
            href="/all-campaigns"
            className="text-gray-900 px-6 rounded-md font-medium hover:bg-gray-50 transition-colors text-center whitespace-nowrap "
          >
            See All
          </Link>
        </div>

        {/* Campaign Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {campaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      </div>
    </section>
  );
}
