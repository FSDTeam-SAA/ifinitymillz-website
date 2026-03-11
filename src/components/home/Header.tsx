"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "All campaigns", href: "/all-campaigns" },
  { label: "How it works", href: "/how-it-works" },
  { label: "FAQs", href: "/faq" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeHref, setActiveHref] = useState(navLinks[0]?.href ?? "#");

  const { data: session, status } = useSession();
  const TOKEN = session?.user?.accessToken;

  const { data: me } = useQuery({
    queryKey: ["me"],
    enabled: !!TOKEN,
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/me`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        },
      );

      const data = await res.json();
      return data?.data;
    },
  });

  const profileImage = me?.profileImage || "/images/no-image.jpg";

  useEffect(() => {
    const setFromHash = () => {
      const hash = window.location.hash || "#";
      const next = navLinks.some((link) => link.href === hash) ? hash : "#";
      setActiveHref(next);
    };

    setFromHash();
    window.addEventListener("hashchange", setFromHash);
    return () => window.removeEventListener("hashchange", setFromHash);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-[#E4F3FF]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-[90px] items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-[50px] w-[50px] items-center justify-center rounded-lg bg-primary">
              <span className="text-sm font-bold text-primary-foreground">
                D
              </span>
            </div>
            <span className="hidden font-semibold sm:inline-block">LOGO</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setActiveHref(link.href)}
                className={cn(
                  "text-base font-normal text-[#131313] hover:text-foreground transition-colors border-b-2 border-transparent pb-1",
                  activeHref === link.href && "text-[#0024DA] border-[#0024DA]",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            {status === "authenticated" ? (
              <Link href="/profile">
                <div className="flex items-center justify-center h-12 w-12 rounded-full overflow-hidden">
                  <Image
                    src={profileImage}
                    alt="profile"
                    width={200}
                    height={200}
                    className="h-full w-full object-cover"
                  />
                </div>
              </Link>
            ) : (
              <Link href="/signin">
                <button className="text-base font-normal leading-[150%]">
                  Sign in
                </button>
              </Link>
            )}

            <Link href="/all-campaigns">
              <Button
                size="sm"
                className="bg-[#0024DA] hover:bg-[#0024DA]/90 text-base font-normal leading-[150%] h-[48px]"
              >
                Start fundraising
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[300px]">
              <nav className="flex flex-col gap-4 mt-8 text-base font-normal leading-[150%]">
                {navLinks.map((link) => (
                  <SheetClose key={link.label} asChild>
                    <Link
                      href={link.href}
                      onClick={() => setActiveHref(link.href)}
                      className={cn(
                        "text-base font-medium text-foreground hover:text-primary transition-colors border-b-2 border-transparent pb-1",
                        activeHref === link.href &&
                          "text-[#0024DA] border-[#0024DA]",
                      )}
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}

                <div className="mt-6 flex flex-col gap-3 border-t pt-6">
                  {status === "authenticated" ? (
                    <Link href="/profile">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full overflow-hidden">
                          <Image
                            src={profileImage}
                            alt="profile"
                            width={200}
                            height={200}
                            className="h-full w-full object-cover"
                          />
                        </div>

                        <span>{me?.name}</span>
                      </div>
                    </Link>
                  ) : (
                    <Link href="/signin">
                      <button className="w-full">Sign in</button>
                    </Link>
                  )}

                  <Link href="/all-campaigns">
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      Start fundraising
                    </Button>
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
