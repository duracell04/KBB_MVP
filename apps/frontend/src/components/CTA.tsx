import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Github, FileText, Code2, Users } from "lucide-react";
import Link from "next/link";

const CTA = () => {
  return (
    <section id="build" className="py-24 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden border-t border-border">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-sans font-semibold text-[#0D232D]">
            Build the supervised SME credit rail
          </h2>
          <p className="text-lg text-[#4B5563] max-w-2xl mx-auto">
            Help bring institutional capital into Georgian SMEs without breaking prudential guardrails.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
            <Card className="p-6 bg-card border border-border text-center shadow-card transition-all hover:shadow-lg hover:border-primary/30">
              <Code2 className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">Contribute a slice</h3>
              <p className="text-sm text-muted-foreground">Small PR plus one test. Keep the rail tight and auditable.</p>
            </Card>

            <Card className="p-6 bg-card border border-accent/20 text-center shadow-card transition-all hover:shadow-lg hover:border-accent/40">
              <FileText className="w-10 h-10 text-accent mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">Add a rail adapter</h3>
              <p className="text-sm text-muted-foreground">Parse evidence and produce settlement attestations tied to banking references.</p>
            </Card>

            <Card className="p-6 bg-card border border-border text-center shadow-card transition-all hover:shadow-lg hover:border-primary/30">
              <Users className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">Challenge mechanics</h3>
              <p className="text-sm text-muted-foreground">Invariants, rounding, record dates, failure paths—Phase 1 lab posture.</p>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button
              size="lg"
              variant="default"
              asChild
              className="bg-[#0D232D] text-white hover:bg-[#0A1B24]"
            >
              <a href="https://github.com/duracell04/KBB_MVP" target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5 mr-2" />
                View on GitHub
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-[#0D232D] text-[#0D232D] bg-white hover:bg-neutral-100"
            >
              <Link href="/documentation">
                <FileText className="w-5 h-5 mr-2" />
                Read documentation
              </Link>
            </Button>
          </div>

          <div className="pt-8 space-y-2">
            <p className="text-sm text-muted-foreground">
              Kartvelian Business Bonds | State-aligned SME credit rail | Contact: compliance@kbb.ge
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
