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
                Use case: Georgian SMEs
              </div>

              <h2 className="text-4xl md:text-5xl font-sans font-semibold text-primary">
                The KBB story
              </h2>

              <p className="text-base text-muted-foreground leading-relaxed">
                <strong className="text-foreground font-medium">KBB = Kartvelian Business Bonds.</strong> A state-aligned SME credit rail: dematerialised Georgian-law notes, ERC-3643 controls, and bank-settled cash.
              </p>

              <p className="text-base text-muted-foreground leading-relaxed">
                Phase 1 proves safety and transparency with professional investors only. Phase 2 opens multi-host issuance and pooled SME credit; diaspora/foreign HNW access via wrappers under their home regimes.
              </p>

              <p className="text-base text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Lower cost of capital:</strong> More professional investors with clean data and DvP discipline; banks can originate-and-distribute while keeping prudential guardrails.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <Card className="p-4 bg-card border border-border">
                  <TrendingUp className="w-8 h-8 text-accent mb-2" />
                  <p className="text-sm font-medium text-foreground">Transparent SME rail</p>
                  <p className="text-xs text-muted-foreground mt-1">Priceable, auditable flows</p>
                </Card>

                <Card className="p-4 bg-card border border-border">
                  <Users className="w-8 h-8 text-success mb-2" />
                  <p className="text-sm font-medium text-foreground">Diaspora via wrappers</p>
                  <p className="text-xs text-muted-foreground mt-1">Home-regime investor protection</p>
                </Card>
              </div>
            </div>

            <div className="space-y-6 animate-fade-in" style={{ animationDelay: "200ms" }}>
              <Card className="p-8 bg-card border border-border">
                <h3 className="text-xl font-medium text-foreground mb-6">Who benefits</h3>

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
                        Access professional capital at competitive rates through standardised note structures.
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
                      <h4 className="font-medium text-foreground mb-1">Professional investors</h4>
                      <p className="text-sm text-muted-foreground">
                        Transparent exposure to SME credit with ERC-3643 controls, DvP discipline, and audit-ready events.
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
                      <h4 className="font-medium text-foreground mb-1">Operators & registrars</h4>
                      <p className="text-sm text-muted-foreground">
                        Clear DvP and reconciliation flows; Official Register in DB, DLT as mirror; rectification powers preserved.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="p-6 bg-slate-50 border border-slate-200 rounded-md">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong className="text-foreground font-medium">Design principle:</strong> Cash settles on regulated rails. Tokens register ownership, gate eligibility/lockups/caps, and emit machine-readable lifecycle events keyed to banking references. Digital Lari DvP comes later, once supervisors are ready.
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
