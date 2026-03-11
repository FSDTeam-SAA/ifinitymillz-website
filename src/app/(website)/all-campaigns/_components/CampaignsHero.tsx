import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

function CampaignsHero() {
  return (
    <section
      className="relative bg-secondary bg-cover bg-center min-h-[500px] flex items-center"
      style={{ backgroundImage: "url('/images/caphero.jpg')" }}
    >
      {/* #E4F3FF overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{ backgroundColor: "#F8F8F8", opacity: 0.7 }}
      />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10 w-full py-12 sm:py-16 lg:py-24">
        <div className="text-center">
          <h2 className="lg:text-[48px] sm:text-[35px] text-[30px] font-medium text-black leading-[118%] mb-7 max-w-2xl mx-auto">
            Say goodbye to old-school discount cards.
          </h2>

          <p className="font-serif text-base sm:text-lg text-black leading-loose text-justify [text-align-last:center]">
            Lorem ipsum dolor sit amet consectetur. Aliquam pellentesque urna et
            sed ultricies est dolor varius. Elementum aliquam tristique nunc
            condimentum mauris. Nec leo molestie gravida viverra sed posuere
            hendrerit vestibulum in. Eu nulla duis tortor urna volutpat enim
            magna sed. Vestibulum mattis praesent pharetra euismod in. Ac tellus
            donec in porta pretium. Nascetur semper enim urna sapien vel est nam
            posuere. Dignissim enim nam phasellus purus ut consequat
            suspendisse. Vitae ac ac urna et tortor libero donec. Eget sit
            bibendum pulvinar tellus nunc volutpat nunc. Urna consequat elit
            aliquam interdum feugiat.
          </p>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          
          <Link href="/how-it-works">
            <Button
              size="lg"
              className="bg-[#003E59] hover:bg-[#003E59]/90 gap-3 rounded-full px-6 h-[51px] text-white text-base font-semibold"
            >
              Get started
              <span className="flex items-center justify-center w-6 h-6 bg-white/20 rounded-full">
                <ArrowRight className="h-4 w-4" />
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CampaignsHero;
