import Navbar from "@/components/Navbar";
import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      <main className="">{children}</main>
    </div>
  );
}