import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Info } from "lucide-react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#0D232D] border-b border-[#0A1B24]">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white text-sm font-medium">
            <Shield className="w-4 h-4" />
            Kartvelian Business Bonds
          </div>

          <h1 className="text-5xl md:text-6xl font-sans font-semibold text-white leading-tight">
            Token-registered, bank-settled SME credit for supervised investors
          </h1>

          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Bridging Georgian SMEs with institutional capital on regulated rails. State-aligned modernization: keep prudential control, add programmable transparency where legacy pipes stop.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button size="lg" variant="default" asChild className="bg-[#F59E0B] text-white hover:bg-[#D97706]">
              <Link href="/issuer-workflow">
                Issuer Demo
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="secondary" asChild className="text-[#0D232D] bg-white hover:bg-white/90">
              <Link href="/investor-workflow">
                Investor Demo
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
            <div className="text-center p-6 rounded-lg bg-white/5 border border-white/10 shadow-sm transition-all hover:shadow-md hover:bg-white/10">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="text-5xl font-bold text-[#F59E0B] tabular-nums">$50B+</div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href="/resources#global-msme" className="text-[#F59E0B] hover:text-[#D97706] transition-colors">
                        <Info className="w-4 h-4" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Source: IFC MSME Finance Gap</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <p className="text-white text-base font-medium mb-1">Global capital seeking EM yields</p>
              <p className="text-white/70 text-sm">Institutional investors looking for transparent RWA exposure</p>
            </div>

            <div className="text-center p-6 rounded-lg bg-white/5 border border-white/10 shadow-sm transition-all hover:shadow-md hover:bg-white/10">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="text-5xl font-bold text-[#F59E0B] tabular-nums">500+</div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href="/resources#georgia-sme-finance" className="text-[#F59E0B] hover:text-[#D97706] transition-colors">
                        <Info className="w-4 h-4" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Source: World Bank FSAP</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <p className="text-white text-base font-medium mb-1">Georgian SMEs need term credit</p>
              <p className="text-white/70 text-sm">Ready businesses, thin capital-market pipes</p>
            </div>

            <div className="text-center p-6 rounded-lg bg-white/5 border border-white/10 shadow-sm transition-all hover:shadow-md hover:bg-white/10">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="text-5xl font-bold text-[#F59E0B] tabular-nums">9.4%</div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href="/resources#georgia-economy" className="text-[#F59E0B] hover:text-[#D97706] transition-colors">
                        <Info className="w-4 h-4" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Source: Geostat 2024</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <p className="text-white text-base font-medium mb-1">Growth demands infra</p>
              <p className="text-white/70 text-sm">A bank-dominated economy needs a transparent SME credit rail</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
