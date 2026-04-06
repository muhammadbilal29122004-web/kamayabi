import Hero from "@/components/Hero/Hero";
import Services from "@/components/Services/Services";
import Tabarrukat from "@/components/Tabarrukat/Tabarrukat";
import Offers from "@/components/Offers/Offers";
import HowItWorks from "@/components/HowItWorks/HowItWorks";
import TrustSection from "@/components/TrustSection/TrustSection";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 w-full bg-white">
      <main className="flex flex-1 w-full flex-col">
        <Hero />
        <Services />
        <Tabarrukat />
        <Offers />
        <TrustSection />
        <HowItWorks />
      </main>
    </div>
  );
}
