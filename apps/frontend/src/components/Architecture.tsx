import { Card } from "@/components/ui/card";
import { Database, Shield, Zap, FileText } from "lucide-react";

const Architecture = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-sans font-semibold text-primary mb-4">
            Architecture at a Glance
          </h2>
          <p className="text-lg text-muted-foreground">
            Modular components designed for transparency and compliance
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="p-6 bg-card border border-border text-center">
              <Database className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="font-medium text-foreground mb-2">Escrow / Rails</h3>
              <p className="text-sm text-muted-foreground">
                Regulated institution or whitelisted stablecoin
              </p>
            </Card>

            <Card className="p-6 bg-card border border-border text-center">
              <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-medium text-foreground mb-2">Settlement Adapter</h3>
              <p className="text-sm text-muted-foreground">
                Verify and attest settlement evidence
              </p>
            </Card>

            <Card className="p-6 bg-card border border-border text-center">
              <Zap className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="font-medium text-foreground mb-2">DvP Orchestrator</h3>
              <p className="text-sm text-muted-foreground">
                Coordinate mint/transfer upon funding
              </p>
            </Card>

            <Card className="p-6 bg-card border border-border text-center">
              <FileText className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-medium text-foreground mb-2">FixedIncomeNote</h3>
              <p className="text-sm text-muted-foreground">
                Permissioned token with lifecycle events
              </p>
            </Card>
          </div>

          <Card className="p-8 bg-card border border-border">
            <h3 className="text-xl font-medium text-foreground mb-6 flex items-center gap-2">
              <FileText className="w-6 h-6 text-accent" />
              Flow Diagram
            </h3>
            
            <div className="relative">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex flex-col items-center text-center space-y-2 flex-1">
                  <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">I</span>
                  </div>
                  <p className="text-sm font-medium text-foreground">Investor</p>
                  <p className="text-xs text-muted-foreground">(eligible)</p>
                </div>

                <div className="flex items-center">
                  <div className="w-px h-12 md:w-12 md:h-px bg-border"></div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 md:relative md:left-0 md:transform-none">
                    <div className="bg-accent text-accent-foreground px-3 py-1 rounded text-xs font-medium whitespace-nowrap">
                      Subscribe
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center text-center space-y-2 flex-1">
                  <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center">
                    <Database className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-sm font-medium text-foreground">Escrow</p>
                  <p className="text-xs text-muted-foreground">Regulated Rail</p>
                </div>

                <div className="flex items-center">
                  <div className="w-px h-12 md:w-12 md:h-px bg-border"></div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 md:relative md:left-0 md:transform-none">
                    <div className="bg-accent text-accent-foreground px-3 py-1 rounded text-xs font-medium whitespace-nowrap">
                      Verify
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center text-center space-y-2 flex-1">
                  <div className="w-16 h-16 rounded-full bg-accent/10 border-2 border-accent flex items-center justify-center">
                    <Shield className="w-8 h-8 text-accent" />
                  </div>
                  <p className="text-sm font-medium text-foreground">Adapter</p>
                  <p className="text-xs text-muted-foreground">Settlement</p>
                </div>

                <div className="flex items-center">
                  <div className="w-px h-12 md:w-12 md:h-px bg-border"></div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 md:relative md:left-0 md:transform-none">
                    <div className="bg-accent text-accent-foreground px-3 py-1 rounded text-xs font-medium whitespace-nowrap">
                      Attest
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center text-center space-y-2 flex-1">
                  <div className="w-16 h-16 rounded-full bg-success/10 border-2 border-success flex items-center justify-center">
                    <Zap className="w-8 h-8 text-success" />
                  </div>
                  <p className="text-sm font-medium text-foreground">Orchestrator</p>
                  <p className="text-xs text-muted-foreground">DvP</p>
                </div>

                <div className="flex items-center">
                  <div className="w-px h-12 md:w-12 md:h-px bg-border"></div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 md:relative md:left-0 md:transform-none">
                    <div className="bg-success text-success-foreground px-3 py-1 rounded text-xs font-medium whitespace-nowrap">
                      Settle
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center text-center space-y-2 flex-1">
                  <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center">
                    <FileText className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-sm font-medium text-foreground">Token</p>
                  <p className="text-xs text-muted-foreground">FixedIncomeNote</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-secondary/50 rounded-lg border border-border">
              <p className="text-sm font-serif text-muted-foreground">
                <strong className="text-foreground font-display">Core flows:</strong> Primary (DvP) for subscriptions, Servicing for coupons/redemptions—all with on-chain events containing <code className="text-accent font-mono">settlementRef</code> and <code className="text-accent font-mono">settlementNetwork</code> for deterministic reconciliation.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Architecture;
