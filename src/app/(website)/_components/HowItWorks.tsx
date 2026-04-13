"use client";

import React, { useState } from "react";
import { LogIn, Ticket, Timer, Play } from "lucide-react";

const STEPS = [
  {
    id: 1,
    icon: <LogIn size={28} strokeWidth={1.5} />,
    title: "Enter",
    description: "Free or Paid Entry",
  },
  {
    id: 2,
    icon: <Ticket size={28} strokeWidth={1.5} />,
    title: "Get Tickets",
    description: "Tickets are issued immediately after entry",
  },
  {
    id: 3,
    icon: <Timer size={28} strokeWidth={1.5} />,
    title: "Countdown",
    description: "Entries close when sold out or timer ends",
  },
  {
    id: 4,
    icon: <Play size={28} strokeWidth={1.5} />,
    title: "Live Draw",
    description: "One lucky winner receives $10,000",
  },
];

function HowItWorks() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="w-full bg-[#0d0d0d] py-20 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-[#c9a84c] text-[10px] tracking-[0.25em] uppercase mb-3">
            The Process
          </p>
          <h2 className="text-white text-4xl md:text-5xl font-bold">
            How It Works
          </h2>
        </div>

        {/* Step cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STEPS.map((step) => {
            const isActive = active === step.id;
            return (
              <div
                key={step.id}
                onMouseEnter={() => setActive(step.id)}
                onMouseLeave={() => setActive(null)}
                className={`flex flex-col items-center text-center gap-8 py-14 px-6 border transition-colors duration-300 cursor-default ${
                  isActive
                    ? "border-[#c9a84c] bg-[#141200]"
                    : "border-[#1e1e1e] bg-[#111111]"
                }`}
              >
                {/* Icon box */}
                <div
                  className={`w-16 h-16 flex items-center justify-center border transition-colors duration-300 ${
                    isActive
                      ? "bg-[#1e1800] border-[#c9a84c] text-[#c9a84c]"
                      : "bg-[#1a1a1a] border-[#2a2a2a] text-[#c9a84c]"
                  }`}
                >
                  {step.icon}
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="text-white text-xl font-semibold">
                    {step.title}
                  </h3>
                  <p className="text-[#666666] text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;