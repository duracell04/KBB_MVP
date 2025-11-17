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
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <Hero />
        <Disconnect />
        <InkSection />
        <div id="features">
          <Features />
        </div>
        <div id="how-it-works">
          <HowItWorks />
        </div>
        <Mechanism />
        <MarketValidation />
        <SuccessRoadmap />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
