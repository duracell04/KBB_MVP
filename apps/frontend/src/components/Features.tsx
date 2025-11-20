import { Card } from "@/components/ui/card";
import { Shield, Scale, Globe, Lock, Zap, Database } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Shield,
      title: "DvP by design",
      description: "Tokens move only after verified funds. Delivery-versus-Payment is enforced at the protocol seam.",
      color: "text-accent",
    },
    {
      icon: Database,
      title: "Audit-ready",
      description: "Register events carry bank references (ISO 20022/MsgId) for deterministic matching to settlement evidence.",
      color: "text-primary",
    },
    {
      icon: Lock,
      title: "Permissioned transfers",
      description: "Professional-only, whitelisted addresses. ERC-3643 with eligibility, lockups, caps, and rectification powers.",
      color: "text-accent",
    },
    {
      icon: Scale,
      title: "Registrar-led",
      description: "Official Register stays with the licensed registrar/CSD; the token is a mirrored audit trail with reconciliation and anchoring.",
      color: "text-primary",
    },
    {
      icon: Globe,
      title: "Prudent reach",
      description: "Phase 1: institutional investors only. Phase 2: wrappers/diaspora via their home regimes; multi-host rail for banks/brokers.",
      color: "text-accent",
    },
    {
      icon: Zap,
      title: "Regulated rails",
      description: "Cash settles on licensed banks. Digital Lari DvP is a Phase 3 option once supervisors are comfortable.",
      color: "text-primary",
    },
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-sans font-semibold text-[#0D232D] mb-4">
            The vision
          </h2>
          <p className="text-lg text-[#4B5563]">
            Build a supervised rail that lets Georgian SMEs access professional capital with ERC-3643 controls and bank-settled cash.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <Card className="p-8 bg-card border border-border">
            <h3 className="text-2xl font-medium text-foreground mb-6 text-center">
              State-aligned SME credit rail
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 rounded-md bg-primary/5 border border-primary/20 mx-auto mb-4 flex items-center justify-center transition-all hover:bg-primary/10 hover:border-primary/30">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h4 className="font-medium text-foreground mb-2">Standardised</h4>
                <p className="text-sm text-muted-foreground">
                  Dematerialised SME notes with ERC-3643 eligibility and exposure caps
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-md bg-accent/10 border border-accent/30 mx-auto mb-4 flex items-center justify-center transition-all hover:bg-accent/20 hover:border-accent/50">
                  <Zap className="w-8 h-8 text-accent" />
                </div>
                <h4 className="font-medium text-foreground mb-2">Transparent</h4>
                <p className="text-sm text-muted-foreground">
                  On-chain positions mirror the Official Register with bank references for deterministic recon
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-md bg-primary/5 border border-primary/20 mx-auto mb-4 flex items-center justify-center transition-all hover:bg-primary/10 hover:border-primary/30">
                  <Globe className="w-8 h-8 text-primary" />
                </div>
                <h4 className="font-medium text-foreground mb-2">Prudent reach</h4>
                <p className="text-sm text-muted-foreground">
                  Phase 1: professional only; Phase 2: wrappers/diaspora; Phase 3: Digital Lari DvP + regional issuers
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-card border border-border text-center shadow-card">
            <p className="text-lg text-muted-foreground leading-relaxed">
              <strong className="text-foreground font-semibold">Not replacing existing systems</strong> - building where legacy rails don't reach while keeping prudential control. The innovation is the supervised access layer, not speculative assets.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Features;
