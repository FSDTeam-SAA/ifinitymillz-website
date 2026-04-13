"use client";

import React from "react";
import Link from "next/link";

const STEPS = [
  {
    number: "01",
    title: "Choose a campaign",
    description:
      "Select from our curated list of high-stakes sweepstakes, each tied to a meaningful cause or campaign goal.",
  },
  {
    number: "02",
    title: "Enter for free or paid",
    description:
      "Choose your entry level. All participants have a fair chance, with paid entries increasing your overall probability.",
  },
  {
    number: "03",
    title: "Receive ticket numbers",
    description:
      "Your digital tickets are generated instantly and delivered to your secure dashboard with real-time verification.",
  },
];

function TheProcess() {
  return (
    <section className="w-full bg-[#0a0a0a]">
      {/* Steps */}
      <div className="max-w-6xl mx-auto px-8 py-20">
        <div className="text-center mb-16">
          <p className="text-[#555555] text-[10px] tracking-[0.25em] uppercase mb-4">
            The Process
          </p>
          <h2 className="text-white text-4xl md:text-5xl font-serif italic font-normal leading-tight">
            How the Wholeheart Journey Unfolds
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {STEPS.map((step) => (
            <div key={step.number} className="flex flex-col gap-4">
              {/* Large number */}
              <span className="text-[#1e1e1e] text-8xl font-bold leading-none select-none">
                {step.number}
              </span>
              <h3 className="text-white text-xl font-semibold -mt-4">
                {step.title}
              </h3>
              <p className="text-[#666666] text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Banner */}
      <div className="w-full bg-[#141414] border-t border-[#1e1e1e] py-12 px-8 text-center">
        <h3 className="text-white text-lg font-semibold mb-3">
          Want to be featured in a Whole heart Campaign?
        </h3>
        <p className="text-[#666666] text-sm mb-7 max-w-xl mx-auto">
          Apply for consideration and let your audience support your campaign
          while giving participants a chance to win.
        </p>
        <Link
          href="/apply"
          className="inline-block bg-[#c9a84c] text-black text-xs font-bold tracking-[0.15em] uppercase px-10 py-4 hover:bg-[#b8963f] transition-colors"
        >
          Apply For Campaign
        </Link>
      </div>
    </section>
  );
}

export default TheProcess;