import { ArrowRight, DollarSign, Shield, Coins } from "lucide-react";

const Mechanism = () => {
  return (
    <section className="bg-[#0D232D] text-white py-20 border-y border-[#0A1B24]">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-sans font-semibold text-white">
              The Mechanism
            </h2>
            <p className="text-white/80 text-lg leading-relaxed">
              How capital flows from investors to Georgian businesses
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border-l-4 border-l-[#F59E0B] pl-6 space-y-3">
              <div className="w-12 h-12 rounded-md bg-[#F59E0B]/10 border border-[#F59E0B]/30 flex items-center justify-center">
                <Coins className="w-6 h-6 text-[#F59E0B]" />
              </div>
              <h3 className="text-xl font-medium text-white">
                Businesses Offer Bonds
              </h3>
              <p className="text-white/70 text-base leading-relaxed">
                Revenue-sharing bonds with standardized terms and transparent servicing
              </p>
            </div>

            <div className="border-l-4 border-l-[#F59E0B] pl-6 space-y-3">
              <div className="w-12 h-12 rounded-md bg-[#F59E0B]/10 border border-[#F59E0B]/30 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-[#F59E0B]" />
              </div>
              <h3 className="text-xl font-medium text-white">
                Investors Buy Globally
              </h3>
              <p className="text-white/70 text-base leading-relaxed">
                Professional investors worldwide purchase through familiar rails
              </p>
            </div>

            <div className="border-l-4 border-l-[#F59E0B] pl-6 space-y-3">
              <div className="w-12 h-12 rounded-md bg-[#F59E0B]/10 border border-[#F59E0B]/30 flex items-center justify-center">
                <Shield className="w-6 h-6 text-[#F59E0B]" />
              </div>
              <h3 className="text-xl font-medium text-white">
                Blockchain Handles Settlement
              </h3>
              <p className="text-white/70 text-base leading-relaxed">
                Automated, transparent settlement with instant record-keeping and compliance
              </p>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8">
            <p className="text-white/90 text-lg text-center leading-relaxed max-w-3xl mx-auto">
              <strong className="text-white font-semibold">Same economics as traditional revenue bonds.</strong> Revolutionary distribution and liquidity. The innovation isn't the instrument — it's the access.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mechanism;
