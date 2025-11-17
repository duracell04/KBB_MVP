import { TrendingUp, Building2, AlertCircle, Info } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Disconnect = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-sans font-semibold text-primary mb-6">
            The Disconnect
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed flex items-center justify-center gap-2 flex-wrap">
            <span>High-growth economies like Georgia (9.4% GDP growth in 2024) have hundreds of profitable SMEs that cannot access international capital. Current systems block natural capital flow.</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to="/resources#georgia-economy" className="text-accent hover:text-accent/80 transition-colors inline-flex">
                    <Info className="w-4 h-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Source: Geostat 2024</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-8 bg-card border border-border text-center shadow-card transition-all hover:shadow-lg hover:border-accent/30">
            <TrendingUp className="w-16 h-16 text-accent mx-auto mb-4" />
            <div className="text-4xl font-bold text-accent mb-3 tabular-nums">$50B+</div>
            <p className="text-lg font-medium text-foreground mb-2">
              Global Capital Seeking Returns
            </p>
            <p className="text-sm text-muted-foreground">
              Institutional investors looking for emerging market yields with proper infrastructure
            </p>
          </Card>

          <Card className="p-8 bg-card border border-border text-center shadow-card transition-all hover:shadow-lg hover:border-accent/30">
            <Building2 className="w-16 h-16 text-accent mx-auto mb-4" />
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="text-4xl font-bold text-accent tabular-nums">500+</div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link to="/resources#georgia-sme-finance" className="text-accent hover:text-accent/80 transition-colors">
                      <Info className="w-4 h-4" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Source: World Bank FSAP</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <p className="text-lg font-medium text-foreground mb-2">
              Georgian SMEs Need Growth Capital
            </p>
            <p className="text-sm text-muted-foreground">
              Proven profitable businesses unable to tap into international capital markets
            </p>
          </Card>
        </div>

        <div className="max-w-3xl mx-auto mt-12">
          <Card className="p-6 bg-card border-l-4 border-l-warning border-t border-r border-b border-border">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-warning flex-shrink-0 mt-1" />
              <div>
                <p className="text-base text-foreground font-medium mb-2">
                  The Problem
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Current systems weren't built for this scale. Traditional cross-border debt infrastructure is too expensive and complex for SMEs, while local markets lack the depth to meet demand.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Disconnect;
