import { useEffect } from "react";
import { useLocation } from "react-router-dom";
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
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      return;
    }

    const targetId = location.hash.replace("#", "");
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [location.hash]);

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
