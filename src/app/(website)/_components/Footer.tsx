"use client";

import React from "react";
import Link from "next/link";

const PLATFORM_LINKS = ["About", "T&C", "Privacy"];
const SUPPORT_LINKS = ["Contact", "FAQ", "Responsible Participation"];

function Footer() {
  return (
    <footer className="w-full bg-[#080808] border-t border-[#141414] py-16 px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand */}
        <div className="flex flex-col gap-5">
          <h3 className="text-[#c9a84c] text-lg font-semibold">
            Wholeheart Campaigns
          </h3>
          <p className="text-[#555555] text-sm leading-relaxed max-w-xs">
            Curating high-stakes opportunities with editorial precision and a
            heart for global impact.
          </p>
        </div>

        {/* Platform */}
        <div className="flex flex-col gap-5">
          <p className="text-[#444444] text-[10px] tracking-[0.25em] uppercase">
            Platform
          </p>
          <ul className="flex flex-col gap-4">
            {PLATFORM_LINKS.map((link) => (
              <li key={link}>
                <Link
                  href={`/${link.toLowerCase().replace(/[&\s]+/g, "-")}`}
                  className="text-[#666666] text-sm hover:text-[#c9a84c] transition-colors"
                >
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div className="flex flex-col gap-5">
          <p className="text-[#444444] text-[10px] tracking-[0.25em] uppercase">
            Support
          </p>
          <ul className="flex flex-col gap-4">
            {SUPPORT_LINKS.map((link) => (
              <li key={link}>
                <Link
                  href={`/${link.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-[#666666] text-sm hover:text-[#c9a84c] transition-colors"
                >
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-6xl mx-auto mt-14 pt-6 border-t border-[#111111]">
        <p className="text-[#333333] text-xs text-center">
          © {new Date().getFullYear()} Wholeheart Campaigns. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;