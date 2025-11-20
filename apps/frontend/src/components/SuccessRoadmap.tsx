import { Card } from "@/components/ui/card";
import { ShieldCheck, Share2, Globe2 } from "lucide-react";

const SuccessRoadmap = () => {
  return (
    <section id="roadmap" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-sans font-semibold text-primary mb-4">
            Roadmap: From pilot to macro rail
          </h2>
          <p className="text-lg text-muted-foreground">
            How KBB evolves inside Georgia's financial architecture and what it signals to supervisors, DFIs, and regional issuers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-8 bg-card border border-border shadow-card transition-all hover:shadow-lg hover:border-primary/30">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-md bg-primary/5 border border-primary/20 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Phase 1: Institutional lab</h3>
            </div>
            <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              <p>Georgian-law SME notes on ERC-3643; one host bank/broker; professional investors only.</p>
              <p>DLT as operational mirror, registrar DB as Official Register; fiat-only settlement.</p>
              <p>Goal: evidence on safety, transparency use, and AML/CFT efficacy inside existing perimeters.</p>
            </div>
          </Card>

          <Card className="p-8 bg-card border border-accent/20 shadow-card transition-all hover:shadow-lg hover:border-accent/40">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-md bg-accent/10 border border-accent/30 flex items-center justify-center">
                <Share2 className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Phase 2: Rail and pools</h3>
            </div>
            <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              <p>Multi-host issuance on a common ERC-3643/dematerialised rail; pooled SME exposure via funds/SPVs.</p>
              <p>Capital-market deepening, originate-and-distribute for banks, cleaner DFI allocation into SME credit pools.</p>
              <p>Wrappers for diaspora/foreign qualified investors keep retail protection in the wrapper's home regime.</p>
            </div>
          </Card>

          <Card className="p-8 bg-card border border-border shadow-card transition-all hover:shadow-lg hover:border-primary/30">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-md bg-primary/5 border border-primary/20 flex items-center justify-center">
                <Globe2 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Phase 3: Signal and scale</h3>
            </div>
            <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              <p>DLT register recognition under NBG criteria plus VA carve-out for tokenised financial instruments.</p>
              <p>Digital Lari for DvP; unified-ledger style settlement with programmable money and assets.</p>
              <p>Regional issuers on Georgian-law rails; external signal: regulated tokenised finance, not a crypto playground.</p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SuccessRoadmap;
