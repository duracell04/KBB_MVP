import { Card } from "@/components/ui/card";
import { CheckCircle2, TrendingUp, Target, Info } from "lucide-react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const HowItWorks = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-sans font-semibold text-primary mb-4">
            Why Georgia, why now
          </h2>
          <p className="text-lg text-muted-foreground">
            A small open economy can prove supervised tokenised debt faster than large markets.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-8 bg-card border border-border">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-md bg-accent/10 border border-accent/30 flex items-center justify-center flex-shrink-0 transition-all hover:bg-accent/20 hover:border-accent/50">
                  <CheckCircle2 className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    Supervisory ownership
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    NBG can run a contained lab: professional investors, one host bank/broker, fiat-only settlement, DLT as mirror.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-md bg-primary/5 border border-primary/20 flex items-center justify-center flex-shrink-0 transition-all hover:bg-primary/10 hover:border-primary/30">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-medium text-foreground">
                      Growth needs infra
                    </h3>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link href="/resources#georgia-economy" className="text-accent hover:text-accent/80 transition-colors">
                            <Info className="w-4 h-4" />
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">Source: Geostat 2024-2025</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    High growth and shallow capital markets make transparent SME credit rails macro-relevant.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-md bg-accent/10 border border-accent/30 flex items-center justify-center flex-shrink-0 transition-all hover:bg-accent/20 hover:border-accent/50">
                  <Target className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-medium text-foreground">
                      Right scale to prove
                    </h3>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link href="/resources#georgia-economy" className="text-accent hover:text-accent/80 transition-colors">
                            <Info className="w-4 h-4" />
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">Source: World Bank & Geostat</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Small enough to run a tight pilot; large enough for results to matter (regional signal, DFIs, diaspora).
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-primary text-primary-foreground border border-primary/80 shadow-lg">
            <div className="flex items-center gap-2 mb-6">
              <h3 className="text-2xl font-semibold">Impact in plain terms</h3>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href="/resources#georgia-sme-finance" className="text-accent hover:text-accent/80 transition-colors">
                      <Info className="w-4 h-4" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Source: World Bank FSAP & IFC</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="space-y-6">
              <div>
                <div className="text-4xl font-bold text-accent mb-2 tabular-nums">1%</div>
                <p className="text-primary-foreground/90 text-sm">
                  Just 1% more foreign capital into SME notes
                </p>
              </div>
              <div className="text-3xl font-bold text-primary-foreground/40">=</div>
              <div>
                <div className="text-4xl font-bold text-accent mb-2 tabular-nums">$300M</div>
                <p className="text-primary-foreground/90 text-sm">
                  Potential financing capacity via a transparent, supervised rail
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
