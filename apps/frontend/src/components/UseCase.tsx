import { Card } from "@/components/ui/card";
import { Building2, TrendingUp, Users, Globe2 } from "lucide-react";

const UseCase = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <div className="inline-block px-4 py-2 bg-accent/10 border border-accent/20 rounded-md text-accent text-sm font-medium">
                Use Case: Georgian SMEs
              </div>
              
              <h2 className="text-4xl md:text-5xl font-sans font-semibold text-primary">
                The KBB Story
              </h2>
              
              <p className="text-base text-muted-foreground leading-relaxed">
                <strong className="text-foreground font-medium">KBB = Kartvelian Business Bonds.</strong> A path for Georgian SMEs to access professional private debt financing.
              </p>

              <p className="text-base text-muted-foreground leading-relaxed">
                Standardized notes, predictable servicing, and cross-border professional capital. Diaspora professionals can participate via familiar rails.
              </p>

              <p className="text-base text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Lower cost of capital:</strong> More professional investors can participate with confidence (strong controls and clean data). More competition → better pricing for Georgian issuers.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <Card className="p-4 bg-card border border-border">
                  <TrendingUp className="w-8 h-8 text-accent mb-2" />
                  <p className="text-sm font-medium text-foreground">Lower Cost of Capital</p>
                  <p className="text-xs text-muted-foreground mt-1">More investors, better pricing</p>
                </Card>
                
                <Card className="p-4 bg-card border border-border">
                  <Users className="w-8 h-8 text-success mb-2" />
                  <p className="text-sm font-medium text-foreground">Diaspora Channel</p>
                  <p className="text-xs text-muted-foreground mt-1">Georgians abroad can invest</p>
                </Card>
              </div>
            </div>

            <div className="space-y-6 animate-fade-in" style={{ animationDelay: '200ms' }}>
              <Card className="p-8 bg-card border border-border">
                <h3 className="text-xl font-medium text-foreground mb-6">Who Benefits</h3>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-accent/10 border-2 border-accent flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-accent" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Georgian SMEs</h4>
                      <p className="text-sm text-muted-foreground">
                        Access to professional capital at competitive rates through standardized note structures.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-md bg-success/10 border border-success flex items-center justify-center">
                        <Users className="w-6 h-6 text-success" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Professional Investors</h4>
                      <p className="text-sm text-muted-foreground">
                        Qualified investors want predictable coupons, disciplined DvP, and clean audit trails.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-md bg-accent/10 border border-accent flex items-center justify-center">
                        <Globe2 className="w-6 h-6 text-accent" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Operators & Transfer Agents</h4>
                      <p className="text-sm text-muted-foreground">
                        Issuers who need DvP discipline and clean reconciliations for compliance.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="p-6 bg-slate-50 border border-slate-200 rounded-md">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong className="text-foreground font-medium">Design principle:</strong> Cash settles on regulated rails. Tokens exist to register ownership, gate eligibility/lockups, and emit machine-readable lifecycle events keyed to the same references used by banking or stablecoin rails.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseCase;
