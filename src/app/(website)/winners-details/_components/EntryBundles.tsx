"use client";

import React, { useState } from "react";

interface Package {
  _id: string;
  name: string;
  ticketQuantity: number;
  price: number;
}

interface EntryBundlesProps {
  packages: Package[];
  maxFreeEntries: number;
}

function EntryBundles({ packages, maxFreeEntries }: EntryBundlesProps) {
  const [selected, setSelected] = useState<number>(1);

  const bundles = [
    {
      tier: "Essential",
      title: `${maxFreeEntries} Entry`,
      entries: `${maxFreeEntries} Entry`,
      price: 0,
      popular: false,
    },
    ...packages.map((pkg, i) => ({
      tier: pkg.name,
      title: `${pkg.ticketQuantity} Entries`,
      entries: `${pkg.ticketQuantity} Entries`,
      price: pkg.price,
      popular: i === 0,
    })),
  ];

  return (
    <section className="w-full bg-[#0d0d0d] py-16 px-8">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
        {bundles.map((bundle, i) => {
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
