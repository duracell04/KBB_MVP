import { Shield, TrendingUp } from "lucide-react";

const InkSection = () => {
  return (
    <section className="bg-[#0D232D] text-white py-20 border-y border-[#0A1B24]">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-8 h-8 text-white" />
            <h2 className="text-3xl md:text-4xl font-sans font-semibold">
              Built for supervised rails, not speculation
            </h2>
          </div>
          
          <p className="text-white/80 text-lg max-w-3xl leading-relaxed">
            KBB keeps cash on regulated banking rails. Blockchain is used as a tamper-evident register 
            so more Georgian SMEs can issue familiar notes to global investors.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
            <div className="border-l-4 border-l-[#F59E0B] pl-6">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-[#F59E0B] font-bold text-4xl tabular-nums">+$200M</span>
              </div>
              <p className="text-white/90 text-base">
                Potential foreign capital from just 1% more cross-border investment
              </p>
            </div>

            <div className="border-l-4 border-l-white/20 pl-6">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-6 h-6 text-white/60" />
                <span className="text-white font-semibold text-xl">Real-economy impact</span>
              </div>
              <p className="text-white/80 text-base">
                Every bond finances actual Georgian businesses: factories, exporters, service companies
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10">
            <p className="text-white/60 text-sm font-mono">
              Cash settlement: SWIFT · SEPA · ACH · Licensed stablecoins
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InkSection;
