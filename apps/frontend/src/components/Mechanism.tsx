import { ArrowRight, Coins, Shield, Building2 } from "lucide-react";

const Mechanism = () => {
  return (
    <section className="bg-[#0D232D] text-white py-20 border-y border-[#0A1B24]">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-sans font-semibold text-white">
              How the rail works (Phase 1 posture)
            </h2>
            <p className="text-white/80 text-lg leading-relaxed">
              Cash stays on bank rails; the token is the registered mirror with ERC-3643 controls.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border-l-4 border-l-[#F59E0B] pl-6 space-y-3">
              <div className="w-12 h-12 rounded-md bg-[#F59E0B]/10 border border-[#F59E0B]/30 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-[#F59E0B]" />
              </div>
              <h3 className="text-xl font-medium text-white">
                SME notes issued
              </h3>
              <p className="text-white/70 text-base leading-relaxed">
                Georgian-law dematerialised SME notes; Official Register in the registrar/CSD system.
              </p>
            </div>

            <div className="border-l-4 border-l-[#F59E0B] pl-6 space-y-3">
              <div className="w-12 h-12 rounded-md bg-[#F59E0B]/10 border border-[#F59E0B]/30 flex items-center justify-center">
                <Coins className="w-6 h-6 text-[#F59E0B]" />
              </div>
              <h3 className="text-xl font-medium text-white">
                Funds via bank rails
              </h3>
              <p className="text-white/70 text-base leading-relaxed">
                Investors wire fiat; settlement references are matched; mint/transfer happens only after confirmed funds.
              </p>
            </div>

            <div className="border-l-4 border-l-[#F59E0B] pl-6 space-y-3">
              <div className="w-12 h-12 rounded-md bg-[#F59E0B]/10 border border-[#F59E0B]/30 flex items-center justify-center">
                <Shield className="w-6 h-6 text-[#F59E0B]" />
              </div>
              <h3 className="text-xl font-medium text-white">
                Token as mirror
              </h3>
              <p className="text-white/70 text-base leading-relaxed">
                ERC-3643 enforces whitelist, caps, and rectification rights; DLT state is reconciled and hashed against the Official Register.
              </p>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-center gap-3">
            <p className="text-white/90 text-lg text-center leading-relaxed">
              Same economics as traditional SME debt. The innovation is the supervised, transparent access rail.
            </p>
            <ArrowRight className="w-6 h-6 text-[#F59E0B]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mechanism;
