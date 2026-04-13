"use client";

import React from "react";
import { ShieldCheck } from "lucide-react";

const TRANSPARENCY_STEPS = [
  {
    num: "01.",
    title: "The Closing Phase",
    description:
      "Once the timer reaches zero, all entries are cryptographically hashed and sealed using a private blockchain protocol to ensure zero tampering.",
  },
  {
    num: "02.",
    title: "Independent Selection",
    description:
      "We employ a third-party, licensed adjudicator to oversee the randomized selection process using NIST-compliant random number generators.",
  },
  {
    num: "03.",
    title: "Live Verification",
    description:
      "The winner is announced via a secure live-stream, followed by a formal concierge delivery within 14 business days globally.",
  },
];

function MissionTransparency() {
  return (
    <section className="w-full bg-[#0a0a0a] py-20 px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16">
        {/* Left — Mission */}
        <div className="flex-1 flex flex-col gap-6">
          <h2 className="text-white text-4xl font-serif font-bold leading-tight">
            The Mission
          </h2>
          <p className="text-[#666666] text-sm leading-[1.85]">
            At Wholeheart Campaigns, we believe that luxury and legacy should
            go hand-in-hand. This campaign isnt just about the $500,000 SUV
            parked in your driveway — its about the millions of lives
            transformed through the Wholeheart Foundation.
          </p>
          <p className="text-[#666666] text-sm leading-[1.85]">
            100% of net proceeds from this campaign are directed towards
            sustainable clean water infrastructure in sub-Saharan Africa. Your
            entry fuels the construction of solar-powered wells and filtration
            systems that serve over 50,000 people daily.
          </p>
        </div>

        {/* Right — Transparency */}
        <div className="flex-1 border border-[#1e1e1e] bg-[#111111] p-8 flex flex-col gap-8">
          {/* Header */}
          <div className="flex items-center gap-3">
            <ShieldCheck size={20} strokeWidth={1.5} className="text-[#c9a84c]" />
            <h3 className="text-white text-2xl font-serif italic font-normal">
              Transparency First
            </h3>
          </div>

          {/* Steps */}
          <div className="flex flex-col gap-7">
            {TRANSPARENCY_STEPS.map((step) => (
              <div key={step.num} className="flex gap-5">
                <span className="text-[#c9a84c] text-sm font-bold shrink-0 mt-0.5">
                  {step.num}
                </span>
                <div className="flex flex-col gap-1.5">
                  <h4 className="text-white text-sm font-semibold">
                    {step.title}
                  </h4>
                  <p className="text-[#666666] text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default MissionTransparency;