import { AboutSection } from "@/components/home/AboutSection";
import { CampaignsSection } from "@/components/home/CampaignsSection";
import { DonationMattersSection } from "@/components/home/DonationMattersSection";
import { FAQSection } from "@/components/home/FAQSection";
import { Footer } from "@/components/home/Footer";
import { Header } from "@/components/home/Header";
import { HeroSection } from "@/components/home/HeroSection";
import { ImpactSection } from "@/components/home/ImpactSection";


export default function Home() {
  return (
    <div >
      <Header />
      <main >
        <HeroSection />
        <DonationMattersSection />
        <CampaignsSection />
        <ImpactSection />
        <AboutSection/>
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
