"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface StatCard {
  number: string;
  label: string;
  description?: string;
}

const stats: StatCard[] = [
  {
    number: "5,000+",
    label: "Children educated",
  },
  {
    number: "10,000+",
    label: "Meals provided",
  },
  {
    number: "150+",
    label: "Community empowered",
  },
];

export function ImpactSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-background">
      <div className="mx-auto container px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-[30px] sm:text-[38px] lg:text-[48px] font-medium text-foreground">
            Our Impact
          </h2>

          <p className="mt-4 text-base sm:text-lg text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            See how your contributions have made a difference. Meet the people
            whose lives have been transformed by your generosity.
          </p>
        </div>

        {/* Donor Avatar */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <div className="flex -space-x-3">
            <Avatar className="h-12 w-12 border-2 border-background">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar className="h-12 w-12 border-2 border-background">
              <AvatarImage src="https://github.com/maxleiter.png" />
              <AvatarFallback>LR</AvatarFallback>
            </Avatar>
            <Avatar className="h-12 w-12 border-2 border-background">
              <AvatarImage src="https://github.com/evilrabbit.png" />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
          </div>

          <span className="text-sm font-medium text-foreground/70">
            +215,458 donated
          </span>
        </div>

        {/* Stats */}
        <div className="grid gap-8 sm:gap-6 lg:grid-cols-3 text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="lg:text-[64px] sm:text-[50px] text-[45px] font-medium text-[#131313]">
                {stat.number}
              </div>
              <p className="mt-2 text-base sm:text-lg font-medium text-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
