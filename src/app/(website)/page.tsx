import ActiveCampaigns from "./_components/Addcampaign";
import FAQ from "./_components/Faq";
import Footer from "./_components/Footer";
import HomeHero from "./_components/HomeHeor";
import HowItWorks from "./_components/HowItWorks";
import RecentVictories from "./_components/RecentVictories";
import TheProcess from "./_components/TheProcess";
import WhyWholeheart from "./_components/WhyWholeheart";

export default function Home() {
  return (
    <div>
      <p>
        <HomeHero />
        <ActiveCampaigns />
        <TheProcess />
        <WhyWholeheart />
        <RecentVictories />
        <HowItWorks />
        <FAQ />
        <Footer />
      </p>
    </div>
  );
}
