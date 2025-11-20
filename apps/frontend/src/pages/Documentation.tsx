import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FileText, ShieldCheck, Database, Workflow, CheckCircle2, Activity, Globe2 } from "lucide-react";

const Documentation = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-8 h-8 text-brand-700" />
              <h1 className="text-4xl font-serif text-foreground">Implementation Guide (Regulatory-aligned)</h1>
            </div>
            <p className="text-muted-foreground text-lg">
              How the demo maps to the supervised Phase 1 configuration (sandbox lab) and sets up Phase 2 and Phase 3 without breaking prudential guardrails.
            </p>
            <Separator className="mt-6" />
          </div>

          {/* Status Notice */}
          <Card className="p-6 mb-8 border-warning/20 bg-warning/5">
            <div className="flex gap-3">
              <ShieldCheck className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground mb-1">Regulatory status</p>
                <p className="text-sm text-muted-foreground">
                  This is a technical demonstration. Production requires NBG admission (sandbox/controlled perimeter), a licensed bank/broker as issuer/placement agent and registrar, fiat-only settlement, and the registrar database as the Official Register with the DLT ledger as a mirrored audit trail.
                </p>
              </div>
            </div>
          </Card>

          {/* Section 1: Approval Pathway */}
          <section className="mb-12">
            <h2 className="text-2xl font-serif text-foreground mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-brand-700" />
              1. Regulatory and institutional pathway (Phase 1)
            </h2>

            <div className="space-y-3 text-foreground">
              <p>Phase 1 is a supervised lab inside the system: professional investors only, one host bank/broker, fiat settlement, and DLT as operational infra (not the legal register).</p>
              <div className="ml-6 space-y-2 text-sm">
                <div className="flex gap-2">
                  <span className="text-brand-700 font-mono">1.1</span>
                  <span>NBG sandbox admission with issuance/investor caps and a standardised reporting template (positions, flows, incidents, AML flags).</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-brand-700 font-mono">1.2</span>
                  <span>Licensed bank/broker acts as issuer/placement agent and registrar (or appoints a licensed registrar); all KYC/AML and investor categorisation done by supervised entities.</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-brand-700 font-mono">1.3</span>
                  <span>Legal opinion: each instrument is a Georgian-law dematerialised SME note/bond; DLT is an audit mirror; Official Register prevails.</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-brand-700 font-mono">1.4</span>
                  <span>Operating playbook filed with NBG (whitelist controls, exposure caps, rectification powers, reconciliation/anchoring cadence).</span>
                </div>
              </div>
            </div>
          </section>

          <Separator className="my-8" />

          {/* Section 2: Technical Integration */}
          <section className="mb-12">
            <h2 className="text-2xl font-serif text-foreground mb-4 flex items-center gap-2">
              <Database className="w-6 h-6 text-brand-700" />
              2. Technical integration (Phase 1 posture)
            </h2>

            <div className="space-y-6 text-foreground">
              <div>
                <h3 className="text-lg font-medium text-foreground mb-3">2.1 Token and identity controls</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  ERC-3643 (T-REX) gates every transfer; registrar/controller retains rectification powers bounded by law.
                </p>
                <div className="bg-muted p-4 rounded font-mono text-sm space-y-1 text-foreground">
                  <div>require(whitelist.isProfessional(investor));</div>
                  <div>require(exposureCaps.withinIssuerLimit(investor, amount));</div>
                  <div>require(compliance.canTransfer(from, to, amount));</div>
                  <div>// registrar can execute court-ordered rectification/forced transfer</div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground mb-3">2.2 Register architecture</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>Official Register: registrar/CSD-linked database (prevails on dispute).</p>
                  <p>DLT mirror: ERC-3643 state + periodic hashes anchoring the register; reconciliations logged.</p>
                  <p>On discrepancy: rectify per statutory process, then resync DLT state.</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground mb-3">2.3 Settlement flow (fiat only in Phase 1)</h3>
                <div className="bg-muted p-4 rounded space-y-2 text-sm text-foreground">
                  <div className="flex justify-between">
                    <span className="font-medium">Initiation:</span>
                    <span className="font-mono">pain.001 / bank payment file</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Confirmation:</span>
                    <span className="font-mono">camt.054 or MT910 (credit advice)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Reconciliation:</span>
                    <span className="font-mono">Match settlementRef/MsgId; anchor hash on-chain</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">DvP:</span>
                    <span className="font-mono">Mint/transfer only after confirmed funds</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <Separator className="my-8" />

          {/* Section 3: Compliance Framework */}
          <section className="mb-12">
            <h2 className="text-2xl font-serif text-foreground mb-4 flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-brand-700" />
              3. Compliance and monitoring
            </h2>

            <div className="space-y-6 text-foreground">
              <div>
                <h3 className="text-lg font-medium text-foreground mb-3">3.1 Investor eligibility</h3>
                <div className="ml-6 space-y-2 text-sm">
                  <div>Professional / sophisticated investors per NBG criteria (whitelisted on-chain).</div>
                  <div>Qualified institutional buyers (foreign) via host bank/broker checks.</div>
                  <div>Diaspora or foreign HNW access only via wrappers issued under their home regime (Phase 2+).</div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground mb-3">3.2 Transfer controls</h3>
                <div className="bg-muted p-4 rounded text-sm space-y-2 text-foreground">
                  <div className="flex items-start gap-2">
                    <span className="text-brand-700 font-mono w-8">R1.</span>
                    <span>Whitelist-only transfers; hard block to non-eligible addresses.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-brand-700 font-mono w-8">R2.</span>
                    <span>Per-issuer and per-investor exposure caps enforced on-chain.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-brand-700 font-mono w-8">R3.</span>
                    <span>Optional lockups and consent layers configurable per issuance.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-brand-700 font-mono w-8">R4.</span>
                    <span>Registrar/controller can execute rectification per court order/regulation.</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground mb-3">3.3 Audit trail</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  State changes, compliance decisions, and reconciliation hashes are logged for supervisory read access.
                </p>
                <div className="ml-6 mt-2 space-y-1 text-sm">
                  <div>Holder registry T+0 per transaction (Official Register + hash on-chain).</div>
                  <div>Payment confirmations matched to settlementRef/MsgId/UETR.</div>
                  <div>Compliance module decisions (approved/rejected transfers) with reason codes.</div>
                  <div>Accrual and coupon calculations reproducible from on-chain events.</div>
                </div>
              </div>
            </div>
          </section>

          <Separator className="my-8" />

          {/* Section 4: Operational Procedures */}
          <section className="mb-12">
            <h2 className="text-2xl font-serif text-foreground mb-4 flex items-center gap-2">
              <Workflow className="w-6 h-6 text-brand-700" />
              4. Operational procedures (Phase 1)
            </h2>

            <div className="space-y-6 text-foreground">
              <div>
                <h3 className="text-lg font-medium text-foreground mb-3">4.1 Issuance workflow</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex gap-3">
                    <span className="text-brand-700 font-mono font-medium w-16">Step 1:</span>
                    <span>Issuer submits term sheet (rate, maturity, amount, covenants) to host bank/broker.</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-brand-700 font-mono font-medium w-16">Step 2:</span>
                    <span>KYC/AML and eligibility checks; whitelist and exposure caps configured.</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-brand-700 font-mono font-medium w-16">Step 3:</span>
                    <span>Smart contract deployed with ERC-3643 controls; Official Register entry created.</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-brand-700 font-mono font-medium w-16">Step 4:</span>
                    <span>Subscription window; funds land via bank rails with settlementRef/MsgId.</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-brand-700 font-mono font-medium w-16">Step 5:</span>
                    <span>DvP: mint/transfer on confirmed funds; hash of register state anchored on-chain.</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground mb-3">4.2 Coupon/redemption flow</h3>
                <div className="bg-muted p-4 rounded text-sm space-y-2 text-foreground">
                  <div className="flex justify-between border-b border-border pb-2">
                    <span className="font-medium">T-5 days</span>
                    <span>Snapshot holders; calculate entitlements.</span>
                  </div>
                  <div className="flex justify-between border-b border-border pb-2">
                    <span className="font-medium">T-3 days</span>
                    <span>Issuer funds escrow; bank pre-validates file.</span>
                  </div>
                  <div className="flex justify-between border-b border-border pb-2">
                    <span className="font-medium">T-1 day</span>
                    <span>Reconcile pay file to register; stage settlementRef.</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">T day</span>
                    <span>Execute payments; emit on-chain events with matching references; anchor hash.</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground mb-3">4.3 Default management</h3>
                <p className="text-sm text-muted-foreground mb-2">If issuer misses payment after grace:</p>
                <div className="ml-6 space-y-2 text-sm">
                  <div>1. Emit <code className="bg-muted px-2 py-0.5 rounded text-xs font-mono text-foreground">DefaultEvent</code>; suspend secondary transfers.</div>
                  <div>2. Registrar freezes register per instruction; Official Register is source of truth.</div>
                  <div>3. Noteholders may appoint administrator per Georgian insolvency law.</div>
                  <div>4. Platform provides evidentiary holder registry and payment logs for recovery.</div>
                </div>
              </div>
            </div>
          </section>

          <Separator className="my-8" />

          {/* Section 5: External orientation */}
          <section className="mb-12">
            <h2 className="text-2xl font-serif text-foreground mb-4 flex items-center gap-2">
              <Activity className="w-6 h-6 text-brand-700" />
              5. Signals to external stakeholders (Phase 2/3 outlook)
            </h2>
            <div className="space-y-3 text-sm text-foreground">
              <div className="flex items-start gap-3">
                <Globe2 className="w-5 h-5 text-brand-700 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">For DFIs and regional issuers</p>
                  <p className="text-muted-foreground">Standardised SME credit rail (ERC-3643 + Official Register mirror) with clear prudential perimeter; enables anchored allocations into pools in Phase 2 and regional issuance in Phase 3.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-brand-700 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">For supervisors (NBG/BIS peers)</p>
                  <p className="text-muted-foreground">Evidence on how a small open economy can run tokenised debt under securities law, with DLT as infra first, and optional Digital Lari DvP and DLT register recognition later.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Footer Note */}
          <Card className="p-6 bg-muted/30">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Document status:</strong> Demo copy | Updated: November 2025<br />
              <strong className="text-foreground">Contact:</strong> compliance@kbb.ge<br />
              <strong className="text-foreground">Disclaimer:</strong> Illustrative only. Production requires NBG approval, licensed bank/broker participation, and final legal counsel review.
            </p>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Documentation;
