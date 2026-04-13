"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CircleUserRound, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Campaigns", href: "/campaigns" },
  { label: "Terms & Comditions", href: "/terms" },
  { label: "Winners", href: "/winners" },
  { label: "Apply For Campaign", href: "/apply-campaign" },
  { label: "Login", href: "/signin" },
];

function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="w-full bg-[#111111] border-b border-[#1e1e1e] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
        {/* Logo */}
        <Link
          href="/"
          className="text-[#c9a84c] text-lg font-serif italic whitespace-nowrap shrink-0"
        >
          Wholeheart Campaigns
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[11px] font-semibold tracking-[0.12em] uppercase transition-colors whitespace-nowrap ${
                  isActive
                    ? "text-white border-b-2 border-[#c9a84c] pb-[2px]"
                    : "text-[#888888] hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <Link
            href="/campaigns"
            className="bg-[#c9a84c] text-black text-[11px] font-bold tracking-[0.15em] uppercase px-5 py-2.5 hover:bg-[#b8963f] transition-colors whitespace-nowrap"
          >
            Enter Now
          </Link>
          <Link
            href="/profile"
            className="text-[#888888] hover:text-[#c9a84c] transition-colors"
          >
            <CircleUserRound size={26} strokeWidth={1.5} />
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileOpen((o) => !o)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#111111] border-t border-[#1e1e1e] px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`text-[11px] font-semibold tracking-[0.12em] uppercase py-2 border-b border-[#1a1a1a] transition-colors ${
                  isActive ? "text-[#c9a84c]" : "text-[#888888] hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/campaigns"
            onClick={() => setMobileOpen(false)}
            className="bg-[#c9a84c] text-black text-[11px] font-bold tracking-[0.15em] uppercase text-center py-3 mt-2 hover:bg-[#b8963f] transition-colors"
          >
            Enter Now
          </Link>
        </div>
      )}
    </header>
  );
}

export default Navbar;