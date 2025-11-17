import { Card } from "@/components/ui/card";
import { TrendingUp, Award, CheckCircle2 } from "lucide-react";

const MarketValidation = () => {
  const validations = [
    {
      name: "Centrifuge",
      amount: "$500M+",
      description: "tokenized assets",
      color: "text-accent",
    },
    {
      name: "Goldfinch",
      amount: "$100M+",
      description: "emerging markets",
      color: "text-accent",
    },
    {
      name: "Maple Finance",
      amount: "$2B+",
      description: "crypto credit",
      color: "text-accent",
    },
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-sans font-semibold text-primary mb-4">
            Market Validation
          </h2>
          <p className="text-lg text-muted-foreground">
            The model works — proven by similar platforms globally
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {validations.map((validation, index) => (
              <Card
                key={index}
                className="p-8 bg-card border border-border text-center shadow-card transition-all hover:shadow-lg hover:border-accent/30"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Award className={`w-12 h-12 ${validation.color} mx-auto mb-4`} />
                <h3 className="text-xl font-medium text-foreground mb-2">
                  {validation.name}
                </h3>
                <div className={`text-3xl font-bold mb-2 tabular-nums ${validation.color}`}>
                  {validation.amount}
                </div>
                <p className="text-sm text-muted-foreground">
                  {validation.description}
                </p>
              </Card>
            ))}
          </div>

          <Card className="p-8 bg-card border-l-4 border-l-accent border-t border-r border-b border-border text-center shadow-lg">
            <div className="flex items-center justify-center gap-3 mb-4">
              <CheckCircle2 className="w-8 h-8 text-accent" />
              <h3 className="text-2xl font-semibold text-foreground">First-Mover Opportunity</h3>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Nobody's focused on Georgia. We have the chance to be the first to unlock this market and set the standard for emerging economy SME financing.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default MarketValidation;
