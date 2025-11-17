import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  ShieldCheck,
  UserCheck,
  Wallet,
  Banknote,
  FileCheck,
  CheckCircle2,
  Circle,
  ArrowLeft,
  ArrowRight,
  Upload,
  ClipboardList
} from "lucide-react";

const InvestorWorkflow = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = useMemo(
    () => [
      {
      id: 0,
      title: "Request Access",
      duration: "10 min",
      estimateDays: 0,
      icon: ShieldCheck,
      fields: [
        { label: "Investor Type", placeholder: "Family office / Asset manager / Bank desk", required: true },
        { label: "Jurisdiction", placeholder: "EU / UK / GCC / US / Other", required: true },
        { label: "Entity Name", placeholder: "Legal entity or trading vehicle", required: true },
        { label: "Compliance Contact Email", placeholder: "compliance@firm.com", required: true }
      ],
      note: "Professional / qualified investors only. Retail access is not available."
    },
    {
      id: 1,
      title: "Eligibility & Certification",
      duration: "1-2 days",
      estimateDays: 2,
      icon: UserCheck,
      fields: [
        { label: "Regulator / License Reference", placeholder: "FCA FRN / MiFID classification / etc.", required: true },
        { label: "Investment Mandate", placeholder: "Private credit / EM debt / SMA", required: true },
        { label: "Assets Under Management", placeholder: "USD 100M+", required: false }
      ],
      documents: [
        "Professional investor certification",
        "Signed investment policy",
        "Board / mandate approval"
      ],
      note: "We whitelist principals and their appointed intermediaries per jurisdiction."
    },
    {
      id: 2,
      title: "KYC / AML Package",
      duration: "2-3 days",
      estimateDays: 3,
      icon: FileCheck,
      fields: [
        { label: "Authorized Signatories", placeholder: "Names + IDs", required: true },
        { label: "Beneficial Owners", placeholder: "25%+ ownership disclosure", required: true },
        { label: "Screening Provider", placeholder: "World-Check / Refinitiv / etc.", required: false }
      ],
      documents: [
        "Certificate of incorporation",
        "Register of directors / UBOs",
        "Proof of address (< 3 months)",
        "Sanctions / PEP screening evidence"
      ]
    },
    {
      id: 3,
      title: "Wallet & Custody Setup",
      duration: "1 day",
      estimateDays: 1,
      icon: Wallet,
      fields: [
        { label: "Settlement Wallet", placeholder: "0xABC... (self) or custodian", required: true },
        { label: "Custody Model", placeholder: "Self, MPC partner, or bank sub-custody", required: true }
      ],
      tasks: [
        "MPC / multisig keys provisioned",
        "Wallet added to whitelist registry",
        "Cold path validated (test transfer)"
      ],
      note: "Tokens are securities records; transfers are only allowed between whitelisted professional wallets."
    },
    {
      id: 4,
      title: "Cash Rails & Funding",
      duration: "Same day",
      estimateDays: 1,
      icon: Banknote,
      fields: [
        { label: "Settlement Currency", placeholder: "USD / EUR / GEL", required: true },
        { label: "Funding Bank", placeholder: "Bank name + branch", required: true },
        { label: "Payment Reference", placeholder: "MT103 / camt.054 memo", required: true }
      ],
      documents: [
        "Bank letter confirming origin of funds",
        "Sample MT103 or camt.053",
        "Escrow acknowledgement"
      ],
      tasks: [
        "DvP instructions shared with paying agent",
        "Escrow standing settlement instructions pinned",
        "Proof-of-funds workflow enabled"
      ]
    },
    {
      id: 5,
      title: "Subscription & Allocation",
      duration: "1 day",
      estimateDays: 1,
      icon: ClipboardList,
      fields: [
        { label: "Order Size", placeholder: "USD 500,000", required: true },
        { label: "Settlement Date", placeholder: "T+2", required: true },
        { label: "Internal Reference", placeholder: "Desk ticket / investor code", required: false }
      ],
      documents: [
        "Executed subscription agreement",
        "Final trade confirmation",
        "Fee & withholding acknowledgement"
      ],
      tasks: [
        "Subscription recorded on workflow ledger",
        "Cash receipt matched to order",
        "Tokens transferred + CSD mirror updated"
      ]
    },
      {
        id: 6,
        title: "Servicing & Lifecycle",
        duration: "Ongoing",
        estimateDays: 0,
        icon: CheckCircle2,
        tasks: [
          "Coupon notices + payment receipts",
          "Corporate actions + covenant alerts",
          "Secondary transfer whitelisting"
        ],
        note: "Investors receive statements (PDF + JSON) and webhook events for reconciliation."
      }
    ],
    []
  );

  const insightCards = [
    {
      title: "Cash rails mirrored to tokens",
      detail: "SWIFT MT103, SEPA Instant, and GEL RTGS all reconcile to on-chain events through camt.054 payloads."
    },
    {
      title: "Investor workspace",
      detail: "Single dashboard for orders, docs, and audit events. Export-ready package keeps compliance, ops, and PM desks aligned."
    },
    {
      title: "Servicing autopilot",
      detail: "Coupons, redemptions, and corporate actions trigger simultaneous fiat + token updates and notify your custodian."
    }
  ];

  const supportItems = [
    "Coverage for EEA, UK, GCC, and US professional investors",
    "Prime brokers and private banks can act as omnibus intermediaries",
    "Webhook + SFTP delivery for confirmations and camt.054 statements",
    "24/5 support desk across Tbilisi and London"
  ];

  const currentStepData = steps[currentStep];

  const timelineDays = useMemo(
    () =>
      steps.reduce((acc, step) => {
        if (typeof step.estimateDays === "number") {
          return acc + step.estimateDays;
        }

        const parsed = step.duration.match(/\d+/)?.[0];
        return acc + (parsed ? parseInt(parsed, 10) : 0);
      }, 0),
    [steps]
  );

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Link to="/">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Homepage
              </Button>
            </Link>
            <Badge variant="outline" className="text-xs">
              All flows supervised / professional investors only
            </Badge>
          </div>

          <div className="mb-12 text-center">
            <h1 className="text-4xl font-sans font-semibold text-foreground mb-4">
              Investor Demo Workspace
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              End-to-end workflow that mirrors the proof-of-concept on <span className="font-medium text-foreground">notex.aka labs</span> &mdash; request access, clear compliance, fund, and receive programmable notes with synchronized cash settlement.
            </p>
          </div>

          <div className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            {insightCards.map((card) => (
              <Card key={card.title} className="p-5 border border-border bg-card/80">
                <h3 className="text-base font-semibold text-foreground mb-2">{card.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{card.detail}</p>
              </Card>
            ))}
          </div>

          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <button
                    onClick={() => setCurrentStep(index)}
                    className={`flex flex-col items-center ${index <= currentStep ? "opacity-100" : "opacity-40"}`}
                    aria-label={`Go to step ${index + 1}`}
                  >
                    <div
                      className={`w-12 h-12 rounded-md flex items-center justify-center border-2 transition-colors ${
                        index === currentStep
                          ? "bg-primary border-primary text-white"
                          : index < currentStep
                          ? "bg-success border-success text-white"
                          : "bg-background border-border text-muted-foreground"
                      }`}
                    >
                      {index < currentStep ? <CheckCircle2 className="w-6 h-6" /> : <step.icon className="w-6 h-6" />}
                    </div>
                    <span className="text-xs mt-2 font-medium hidden md:block">Stage {index + 1}</span>
                  </button>
                  {index < steps.length - 1 && (
                    <div className={`w-8 md:w-16 h-0.5 mx-2 ${index < currentStep ? "bg-success" : "bg-border"}`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <Card className="p-8 bg-card border border-border mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-md bg-primary/10 border border-primary flex items-center justify-center">
                  <currentStepData.icon className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-medium text-foreground mb-1">{currentStepData.title}</h2>
                  <Badge variant="secondary" className="text-xs">
                    {currentStepData.duration}
                  </Badge>
                </div>
              </div>
              <Badge variant={currentStep === steps.length - 1 ? "default" : "outline"} className="text-sm">
                Step {currentStep + 1} of {steps.length}
              </Badge>
            </div>

            {currentStepData.fields && (
              <div className="space-y-4 mb-6">
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Required Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentStepData.fields.map((field, index) => (
                    <div key={index}>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        {field.label}
                        {field.required && <span className="text-destructive ml-1">*</span>}
                      </label>
                      <Input placeholder={field.placeholder} className="w-full" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentStepData.documents && (
              <div className="space-y-4 mb-6">
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Required Documents</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {currentStepData.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-secondary/50 rounded-md border border-border">
                      <div className="flex items-center gap-3">
                        <FileCheck className="w-4 h-4 text-accent" />
                        <span className="text-sm text-foreground">{doc}</span>
                      </div>
                      <Button size="sm" variant="ghost">
                        <Upload className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentStepData.tasks && (
              <div className="space-y-4 mb-6">
                <h3 className="text-sm font-medium text-muted-foreground mb-3">
                  Workflow Tasks
                </h3>
                <div className="space-y-2">
                  {currentStepData.tasks.map((task, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-secondary/50 rounded-md border border-border">
                      <Circle className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">{task}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentStepData.note && (
              <div className="p-4 bg-accent/5 border border-accent/20 rounded-md">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Note:</strong> {currentStepData.note}
                </p>
              </div>
            )}
          </Card>

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <Button variant="outline" onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} disabled={currentStep === 0}>
              Previous
            </Button>
            <div className="text-sm text-muted-foreground text-center md:text-left">
              Typical onboarding timeline: {timelineDays} business days (wallet + rails tested)
            </div>
            <Button onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))} disabled={currentStep === steps.length - 1}>
              Next Step
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {currentStep === steps.length - 1 && (
            <Card className="mt-8 p-6 bg-success/5 border border-success/20">
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <CheckCircle2 className="w-12 h-12 text-success" />
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-1">Investor ready</h3>
                  <p className="text-sm text-muted-foreground">
                    Allocation, settlement, and lifecycle servicing stay synchronized across fiat rails, token registry, and CSD mirror. Investor statements plus webhook payloads are generated automatically.
                  </p>
                </div>
              </div>
            </Card>
          )}

          <Card className="mt-8 p-6 bg-muted/30 border border-border">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="max-w-2xl">
                <h3 className="text-xl font-semibold text-foreground mb-2">Workflow Support</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  The investor demo mirrors production governance: approvals live in the console, and every upload or status change is timestamped for regulators.
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  {supportItems.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Circle className="w-3 h-3 text-primary mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full md:w-60 p-4 rounded-md border border-dashed border-border/70 bg-background">
                <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Need discovery?</p>
                <p className="text-sm text-foreground mb-4">
                  Book a joint issuer + investor dry-run to review exact documentation flows.
                </p>
                <Button className="w-full" asChild>
                  <Link to="/documentation">View Playbook</Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InvestorWorkflow;
