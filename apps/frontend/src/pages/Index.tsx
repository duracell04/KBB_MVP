import { useEffect } from "react";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Disconnect from "@/components/Disconnect";
import InkSection from "@/components/InkSection";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Mechanism from "@/components/Mechanism";
import MarketValidation from "@/components/MarketValidation";
import SuccessRoadmap from "@/components/SuccessRoadmap";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  const { asPath } = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const [, hash] = asPath.split("#");
    if (!hash) {
      return;
    }

    const targetElement = document.getElementById(hash);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [asPath]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <Hero />
        <Disconnect />
        <InkSection />
        <div id="vision">
          <Features />
        </div>
        <div id="sakartvelo">
          <HowItWorks />
        </div>
        <div id="mechanism">
          <Mechanism />
        </div>
        <MarketValidation />
        <div id="roadmap">
          <SuccessRoadmap />
        </div>
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
