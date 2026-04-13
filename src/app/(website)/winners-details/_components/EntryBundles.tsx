"use client";

import React, { useState } from "react";

interface Bundle {
  tier: string;
  title: string;
  entries: string;
  price: number;
  originalPrice?: number;
  popular?: boolean;
}

const BUNDLES: Bundle[] = [
  {
    tier: "Essential",
    title: "Free Entry",
    entries: "1 Entry",
    price: 0,
    popular: false,
  },
  {
    tier: "Advantage",
    title: "5 Entries",
    entries: "5 Entries",
    price: 20,
    originalPrice: 25,
    popular: true,
  },
  {
    tier: "Philanthropist",
    title: "15 Entries",
    entries: "15 Entries",
    price: 50,
    originalPrice: 75,
    popular: false,
  },
];

function EntryBundles() {
  const [selected, setSelected] = useState<number>(1);

  return (
    <section className="w-full bg-[#0d0d0d] py-16 px-8">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
        {BUNDLES.map((bundle, i) => {
          const isSelected = selected === i;
          return (
            <div
              key={bundle.tier}
              className={`relative flex flex-col gap-6 p-7 border transition-all duration-300 cursor-pointer ${
                isSelected
                  ? "border-[#c9a84c] bg-[#141200]"
                  : "border-[#1e1e1e] bg-[#111111] hover:border-[#333333]"
              }`}
              onClick={() => setSelected(i)}
            >
              {/* Most Popular badge */}
              {bundle.popular && (
                <div className="absolute -top-px left-1/2 -translate-x-1/2">
                  <span className="bg-[#c9a84c] text-black text-[8px] font-black tracking-[0.2em] uppercase px-3 py-1">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Tier */}
              <div>
                <p className="text-[#555555] text-[9px] tracking-[0.25em] uppercase mb-2">
                  {bundle.tier}
                </p>
                <h3 className="text-white text-3xl font-bold">{bundle.title}</h3>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2">
                <span className="text-[#c9a84c] text-3xl font-bold">
                  ${bundle.price}
                </span>
                {bundle.originalPrice && (
                  <span className="text-[#444444] text-base line-through">
                    ${bundle.originalPrice}
                  </span>
                )}
              </div>

              {/* Button */}
              <button
                className={`w-full text-[10px] font-bold tracking-[0.2em] uppercase py-3.5 transition-all duration-300 ${
                  isSelected
                    ? "bg-[#c9a84c] text-black"
                    : "bg-[#1a1a1a] border border-[#2a2a2a] text-white hover:border-[#c9a84c] hover:text-[#c9a84c]"
                }`}
              >
                Select Bundle
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default EntryBundles;