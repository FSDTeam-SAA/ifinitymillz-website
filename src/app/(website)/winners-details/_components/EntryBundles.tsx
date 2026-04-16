"use client";

import React, { useState } from "react";
import { toast } from "sonner";

interface Package {
  _id: string;
  name: string;
  ticketQuantity: number;
  price: number;
}

interface EntryBundlesProps {
  packages: Package[];
  maxFreeEntries: number;
  campaignId?: string;
  token?: string;
}

function EntryBundles({ packages, maxFreeEntries, campaignId, token }: EntryBundlesProps) {
  const [selected, setSelected] = useState<number>(1);
  const [loading, setLoading] = useState(false);

  const bundles = [
    {
      tier: "Essential",
      title: `${maxFreeEntries} Entry`,
      entries: `${maxFreeEntries} Entry`,
      price: 0,
      popular: false,
      packageId: null as string | null,
    },
    ...packages.map((pkg, i) => ({
      tier: pkg.name,
      title: `${pkg.ticketQuantity} Entries`,
      entries: `${pkg.ticketQuantity} Entries`,
      price: pkg.price,
      popular: i === 0,
      packageId: pkg._id,
    })),
  ];

  const handleSelectBundle = async (bundle: typeof bundles[0]) => {
    if (!campaignId) return;
    setLoading(true);
    try {
      const url = bundle.packageId === null ? "/entries/free" : "/entries/paid";
      const body = bundle.packageId === null
        ? { campaignId }
        : { campaignId, packageId: bundle.packageId };

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (json.status) {
        if (json.data?.url) {
          window.location.href = json.data.url;
        } else {
          toast.success(json.message);
        }
      } else {
        toast.error(json.message);
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
                disabled={loading && isSelected}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectBundle(bundle);
                }}
                className={`w-full text-[10px] font-bold tracking-[0.2em] uppercase py-3.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                  isSelected
                    ? "bg-[#c9a84c] text-black"
                    : "bg-[#1a1a1a] border border-[#2a2a2a] text-white hover:border-[#c9a84c] hover:text-[#c9a84c]"
                }`}
              >
                {loading && isSelected ? "Processing..." : "Select Bundle"}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default EntryBundles;
