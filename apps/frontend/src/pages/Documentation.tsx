import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FileText, Shield, Database, Workflow, CheckCircle2 } from "lucide-react";

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
              <h1 className="text-4xl font-serif text-foreground">Implementation Guide</h1>
            </div>
            <p className="text-muted-foreground text-lg">
              Post-approval integration requirements and operational procedures for NBG-regulated issuance.
            </p>
            <Separator className="mt-6" />
          </div>

          {/* Status Notice */}
          <Card className="p-6 mb-8 border-warning/20 bg-warning/5">
            <div className="flex gap-3">
              <Shield className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground mb-1">Regulatory Status</p>
                <p className="text-sm text-muted-foreground">
                  This documentation describes the implementation pathway subject to National Bank of Georgia 
                  approval. Current deployment is a technical demonstration only and does not constitute 
                  regulated activity.
                </p>
              </div>
            </div>
          </Card>

          {/* Section 1: Approval Pathway */}
          <section className="mb-12">
            <h2 className="text-2xl font-serif text-foreground mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-brand-700" />
              1. Regulatory Approval Pathway
            </h2>
            
            <div className="space-y-4 text-foreground">
              <p>
                Kartvelian Business Bonds operates under Georgian securities law as a private debt 
                placement platform. Full deployment requires:
              </p>
              
              <div className="ml-6 space-y-2">
                <div className="flex gap-2">
                  <span className="text-brand-700 font-mono">1.1</span>
                  <span>NBG sandbox approval for token-registered instruments</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-brand-700 font-mono">1.2</span>
                  <span>Custodian partnership for fiat settlement rails</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-brand-700 font-mono">1.3</span>
                  <span>Legal opinion on DvP structure and beneficial ownership registry</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-brand-700 font-mono">1.4</span>
                  <span>Compliance audit covering AML/KYC, transfer restrictions, and audit logs</span>
                </div>
              </div>

              <p className="mt-4">
                Estimated timeline: 6–12 months from initial submission to pilot authorization.
              </p>
            </div>
          </section>

          <Separator className="my-8" />

          {/* Section 2: Technical Integration */}
          <section className="mb-12">
            <h2 className="text-2xl font-serif text-foreground mb-4 flex items-center gap-2">
              <Database className="w-6 h-6 text-brand-700" />
              2. Technical Integration Requirements
            </h2>
            
            <div className="space-y-6 text-foreground">
              <div>
                <h3 className="text-lg font-medium text-foreground mb-3">2.1 Issuer Onboarding</h3>
                <div className="bg-muted p-4 rounded font-mono text-sm space-y-1 text-foreground">
                  <div>Required documentation:</div>
                  <div className="ml-4">• Certificate of incorporation (GE registry extract)</div>
                  <div className="ml-4">• Three years of audited financials (IFRS)</div>
                  <div className="ml-4">• Board resolution authorizing debt issuance</div>
                  <div className="ml-4">• Beneficial ownership declaration (UBO registry)</div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground mb-3">2.2 Token Standard Compliance</h3>
                <p className="mb-2">
                  All instruments implement ERC-3643 (T-REX) for permissioned transfers:
                </p>
                <div className="bg-muted p-4 rounded font-mono text-sm space-y-1 text-foreground">
                  <div>contract KBBInstrument is IERC3643 &#123;</div>
                  <div className="ml-4">function transfer(address _to, uint256 _amount)</div>
                  <div className="ml-8">returns (bool) &#123;</div>
                  <div className="ml-12">require(identityRegistry.isVerified(_to));</div>
                  <div className="ml-12">require(complianceModule.canTransfer(_to));</div>
                  <div className="ml-12">// Execute transfer with DvP lock</div>
                  <div className="ml-8">&#125;</div>
                  <div>&#125;</div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground mb-3">2.3 Fiat Settlement Integration</h3>
                <p className="mb-2">
                  Payment confirmation via ISO 20022-compliant messages from custodian:
                </p>
                <div className="bg-muted p-4 rounded space-y-2 text-sm text-foreground">
                  <div className="flex justify-between">
                    <span className="font-medium">Format:</span>
                    <span className="font-mono">pain.001 (payment initiation)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Confirmation:</span>
                    <span className="font-mono">camt.054 (credit notification)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Reconciliation:</span>
                    <span className="font-mono">Daily MT940 statement match</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <Separator className="my-8" />

          {/* Section 3: Compliance Framework */}
          <section className="mb-12">
            <h2 className="text-2xl font-serif text-foreground mb-4 flex items-center gap-2">
              <Shield className="w-6 h-6 text-brand-700" />
              3. Compliance & Monitoring
            </h2>
            
            <div className="space-y-6 text-foreground">
              <div>
                <h3 className="text-lg font-medium text-foreground mb-3">3.1 Investor Eligibility</h3>
                <p className="mb-2">All participants must satisfy one of:</p>
                <div className="ml-6 space-y-2">
                  <div>• Professional investor certification per NBG guidelines</div>
                  <div>• Qualified institutional buyer status (foreign entities)</div>
                  <div>• Net worth ≥ GEL 500,000 with attestation</div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground mb-3">3.2 Transfer Restrictions</h3>
                <p className="mb-2">Smart contract enforces:</p>
                <div className="bg-muted p-4 rounded text-sm space-y-2 text-foreground">
                  <div className="flex items-start gap-2">
                    <span className="text-brand-700 font-mono w-8">R1.</span>
                    <span>12-month lock-up from issuance date</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-brand-700 font-mono w-8">R2.</span>
                    <span>Secondary transfers require issuer consent (first 24 months)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-brand-700 font-mono w-8">R3.</span>
                    <span>Maximum 99 holders per instrument (private placement limit)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-brand-700 font-mono w-8">R4.</span>
                    <span>No fragmentation below GEL 10,000 minimum denomination</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground mb-3">3.3 Audit Trail Requirements</h3>
                <p>
                  All state transitions logged immutably with cryptographic attestation. 
                  NBG retains read access to verify:
                </p>
                <div className="ml-6 mt-2 space-y-1">
                  <div>• Holder registry at T+0 for each transaction</div>
                  <div>• Payment confirmation hashes matched to bank records</div>
                  <div>• Compliance module decisions (approved/rejected transfers)</div>
                  <div>• Coupon calculation audit (interest accrual × days × rate)</div>
                </div>
              </div>
            </div>
          </section>

          <Separator className="my-8" />

          {/* Section 4: Operational Procedures */}
          <section className="mb-12">
            <h2 className="text-2xl font-serif text-foreground mb-4 flex items-center gap-2">
              <Workflow className="w-6 h-6 text-brand-700" />
              4. Operational Procedures
            </h2>
            
            <div className="space-y-6 text-foreground">
              <div>
                <h3 className="text-lg font-medium text-foreground mb-3">4.1 Issuance Workflow</h3>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <span className="text-brand-700 font-mono font-medium w-16">Step 1:</span>
                    <span>Issuer submits term sheet via platform (rate, maturity, amount, covenants)</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-brand-700 font-mono font-medium w-16">Step 2:</span>
                    <span>KBB compliance reviews documentation, confirms NBG filing if required</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-brand-700 font-mono font-medium w-16">Step 3:</span>
                    <span>Smart contract deployed with parameters, ISIN assigned by registry</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-brand-700 font-mono font-medium w-16">Step 4:</span>
                    <span>Subscription window opens (minimum 5 business days)</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-brand-700 font-mono font-medium w-16">Step 5:</span>
                    <span>At closing: tokens minted on payment confirmation, custodian holds principal</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground mb-3">4.2 Coupon Payment Process</h3>
                <div className="bg-muted p-4 rounded text-sm space-y-2 text-foreground">
                  <div className="flex justify-between border-b border-border pb-2">
                    <span className="font-medium">T-5 days</span>
                    <span>System generates holder snapshot, calculates entitlements</span>
                  </div>
                  <div className="flex justify-between border-b border-border pb-2">
                    <span className="font-medium">T-3 days</span>
                    <span>Issuer funds escrow account (bank confirmation required)</span>
                  </div>
                  <div className="flex justify-between border-b border-border pb-2">
                    <span className="font-medium">T-1 day</span>
                    <span>Custodian pre-validates payment file (holder IBANs)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">T day</span>
                    <span>Batch transfer executed, on-chain merkle root updated</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground mb-3">4.3 Default Management</h3>
                <p className="mb-2">
                  If issuer misses payment by T+3 grace period:
                </p>
                <div className="ml-6 space-y-2">
                  <div>1. Contract emits <code className="bg-muted px-2 py-0.5 rounded text-xs font-mono text-foreground">DefaultEvent</code></div>
                  <div>2. Secondary trading suspended automatically</div>
                  <div>3. Noteholders may appoint administrator per Georgian insolvency law</div>
                  <div>4. Platform provides recovery claim evidence (immutable holder registry)</div>
                </div>
              </div>
            </div>
          </section>

          <Separator className="my-8" />

          {/* Footer Note */}
          <Card className="p-6 bg-muted/30">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Document Status:</strong> Draft v0.2 | Last updated: November 2025<br />
              <strong className="text-foreground">Contact:</strong> For regulatory inquiries, contact compliance@kbb.ge<br />
              <strong className="text-foreground">Disclaimer:</strong> This documentation is illustrative. Final implementation 
              subject to NBG approval and legal counsel review.
            </p>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Documentation;
