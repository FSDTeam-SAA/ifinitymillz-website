"use client";

import React from "react";
import { Zap, ShieldCheck, Eye, Award } from "lucide-react";

const FEATURES = [
  {
    icon: <Zap size={24} strokeWidth={1.5} />,
    title: "Instant Generation",
    description:
      "No waiting for verification. Your entries are live the second you checkout.",
  },
  {
    icon: <ShieldCheck size={24} strokeWidth={1.5} />,
    title: "Secure Payment",
    description:
      "Encrypted processing ensuring your data and funds are protected at all times.",
  },
  {
    icon: <Eye size={24} strokeWidth={1.5} />,
    title: "Transparent Draw",
    description:
      "Independently audited draws conducted with absolute fairness and visibility.",
  },
  {
    icon: <Award size={24} strokeWidth={1.5} />,
    title: "Real Winners",
    description:
      "A growing community of verified winners who have transformed their lives.",
  },
];

function WhyWholeheart() {
  return (
    <section className="w-full bg-[#0f0f0f] py-20 px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start gap-16">
        {/* Left */}
        <div className="md:w-64 shrink-0">
          <h2 className="text-white text-5xl font-serif font-bold leading-tight mb-6">
            Why
            <br />
            Wholeheart?
          </h2>
          <p className="text-[#666666] text-sm leading-relaxed">
            We combine the thrill of winning with the integrity of a premium
            financial institution.
          </p>
        </div>

        {/* Right — 2x2 grid */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#1e1e1e]">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="bg-[#141414] p-8 flex flex-col gap-4"
            >
              <span className="text-[#c9a84c]">{feature.icon}</span>
              <h3 className="text-white text-base font-semibold">
                {feature.title}
              </h3>
              <p className="text-[#666666] text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyWholeheart;