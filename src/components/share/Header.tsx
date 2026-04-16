"use client";

import { useSession } from "next-auth/react";

export default function Header() {
    const session = useSession();
    console.log(session);
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex h-[80px] items-center justify-between px-6 bg-[#181715]">
      <div className="flex items-center space-x-2">
        <h1 className="text-[#E9C349] text-3xl font-bold leading-tight tracking-[0.4px]">
          Wholeheart<br />Campaigns
        </h1>
      </div>

      <div className="relative flex items-center space-x-3"></div>
    </div>
  );
}
