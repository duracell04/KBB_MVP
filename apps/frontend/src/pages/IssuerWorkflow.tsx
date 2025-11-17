import { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Building2, 
  FileCheck, 
  Shield, 
  Coins, 
  CheckCircle2,
  Circle,
  ArrowRight,
  ArrowLeft,
  Upload,
  Database
} from "lucide-react";

const IssuerWorkflow = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      id: 0,
      title: "Eligibility Check",
      duration: "15-30 min",
      icon: Shield,
      status: "current",
      fields: [
        { label: "Entity Type", placeholder: "LLC (შპს) or JSC (სას)", required: true },
        { label: "Target Raise Amount", placeholder: "USD 500,000 - 10,000,000", required: true },
        { label: "Tenor (months)", placeholder: "12-36 months", required: true },
        { label: "Operating Duration", placeholder: "Minimum 12 months", required: true }
      ]
    },
    {
      id: 1,
      title: "NAPR Registration Details",
      duration: "1-2 days",
      icon: Building2,
      status: "pending",
      fields: [
        { label: "Legal Name (EN)", placeholder: "Company legal name in English", required: true },
        { label: "Legal Name (KA)", placeholder: "სრული სახელი ქართულად", required: true },
        { label: "Registration Number", placeholder: "NAPR registration number", required: true },
        { label: "Registered Address", placeholder: "Legal entity address", required: true }
      ],
      documents: ["NAPR Registry Extract", "UBO Chart", "Directors KYC"]
    },
    {
      id: 2,
      title: "Tax & Banking",
      duration: "1-2 days",
      icon: Database,
      status: "pending",
      fields: [
        { label: "Tax ID Number", placeholder: "Revenue Service tax ID", required: true },
        { label: "Bank Name", placeholder: "Primary banking institution", required: true },
        { label: "Operating IBAN", placeholder: "GExxxxxxxxxxxxxxxxxxxx", required: true },
        { label: "Escrow IBAN", placeholder: "Subscription account IBAN", required: true }
      ],
      documents: ["Tax ID Certificate", "Bank Account Confirmation", "Bank Reference Letter"]
    },
    {
      id: 3,
      title: "GCSD Issuer Account",
      duration: "2-4 weeks",
      icon: Shield,
      status: "pending",
      fields: [
        { label: "GCSD Account Number", placeholder: "Central depository account", required: false },
        { label: "Existing ISIN", placeholder: "If previously issued securities", required: false }
      ],
      documents: ["GCSD Account Confirmation", "GCSD Fee Receipt"],
      note: "For new issuers: Allow 2-4 weeks for GCSD account setup"
    },
    {
      id: 4,
      title: "Raise Parameters",
      duration: "1 day",
      icon: Coins,
      status: "pending",
      fields: [
        { label: "Target Amount", placeholder: "USD 2,000,000", required: true },
        { label: "Currency", placeholder: "USD / EUR / GEL", required: true },
        { label: "Tenor", placeholder: "24 months", required: true },
        { label: "Coupon (bps)", placeholder: "850", required: true },
        { label: "Day Count", placeholder: "ACT/360 or 30/360", required: true },
        { label: "Payment Frequency", placeholder: "Quarterly / Semi-annual", required: true },
        { label: "Min Denomination", placeholder: "USD 100,000", required: true }
      ]
    },
    {
      id: 5,
      title: "Credit Review",
      duration: "5-7 days",
      icon: FileCheck,
      status: "pending",
      documents: [
        "2-3 Years Audited Financials",
        "Latest Management Accounts",
        "Cash Flow Model (12-month)",
        "Tax Compliance Certificate"
      ],
      note: "Independent reviewer from KBB panel will assess and provide risk grade"
    },
    {
      id: 6,
      title: "Legal Documentation",
      duration: "3-5 days",
      icon: FileCheck,
      status: "pending",
      documents: [
        "Subscription Agreement (EN)",
        "Information Memorandum (EN)",
        "Terms Supplement (DvP, CSD mirror)",
        "Paying Agent Mandate",
        "Escrow Agreement (ISO 20022)",
        "Tax Withholding Annex"
      ]
    },
    {
      id: 7,
      title: "Tech Setup & Go-Live",
      duration: "2-3 days",
      icon: CheckCircle2,
      status: "pending",
      tasks: [
        "Issuer admin account created",
        "Admin keys provisioned (MPC/multisig)",
        "DvP orchestration wired to escrow bank",
        "Events schema enabled",
        "CovenantManager IDs primed",
        "Sample camt.054 validated"
      ]
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <div className="mb-8">
            <Link to="/">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Homepage
              </Button>
            </Link>
          </div>

          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-sans font-semibold text-foreground mb-4">
              Issuer Onboarding Workflow
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Complete 8-phase process from eligibility check to go-live. Professional-only placement on regulated rails.
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <button
                    onClick={() => setCurrentStep(index)}
                    className={`flex flex-col items-center ${
                      index <= currentStep ? "opacity-100" : "opacity-40"
                    }`}
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
                      {index < currentStep ? (
                        <CheckCircle2 className="w-6 h-6" />
                      ) : (
                        <step.icon className="w-6 h-6" />
                      )}
                    </div>
                    <span className="text-xs mt-2 font-medium hidden md:block">
                      Phase {index + 1}
                    </span>
                  </button>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-8 md:w-16 h-0.5 mx-2 ${
                        index < currentStep ? "bg-success" : "bg-border"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Current Step Content */}
          <Card className="p-8 bg-card border border-border mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-md bg-primary/10 border border-primary flex items-center justify-center">
                  <currentStepData.icon className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-medium text-foreground mb-1">
                    {currentStepData.title}
                  </h2>
                  <Badge variant="secondary" className="text-xs">
                    {currentStepData.duration}
                  </Badge>
                </div>
              </div>
              <Badge
                variant={currentStep === steps.length - 1 ? "default" : "outline"}
                className="text-sm"
              >
                Step {currentStep + 1} of {steps.length}
              </Badge>
            </div>

            {/* Fields */}
            {currentStepData.fields && (
              <div className="space-y-4 mb-6">
                <h3 className="text-sm font-medium text-muted-foreground mb-3">
                  Required Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentStepData.fields.map((field, index) => (
                    <div key={index}>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        {field.label}
                        {field.required && <span className="text-destructive ml-1">*</span>}
                      </label>
                      <Input
                        placeholder={field.placeholder}
                        className="w-full"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Documents */}
            {currentStepData.documents && (
              <div className="space-y-4 mb-6">
                <h3 className="text-sm font-medium text-muted-foreground mb-3">
                  Required Documents
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {currentStepData.documents.map((doc, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-secondary/50 rounded-md border border-border"
                    >
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

            {/* Tasks */}
            {currentStepData.tasks && (
              <div className="space-y-4 mb-6">
                <h3 className="text-sm font-medium text-muted-foreground mb-3">
                  Setup Tasks
                </h3>
                <div className="space-y-2">
                  {currentStepData.tasks.map((task, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-secondary/50 rounded-md border border-border"
                    >
                      <Circle className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">{task}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Note */}
            {currentStepData.note && (
              <div className="p-4 bg-accent/5 border border-accent/20 rounded-md">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Note:</strong> {currentStepData.note}
                </p>
              </div>
            )}
          </Card>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              Previous
            </Button>
            <div className="text-sm text-muted-foreground">
              Timeline: {steps.reduce((acc, step) => {
                const duration = step.duration.match(/\d+/)?.[0] || "0";
                return acc + parseInt(duration);
              }, 0)} days total (existing GCSD account)
            </div>
            <Button
              onClick={handleNext}
              disabled={currentStep === steps.length - 1}
            >
              Next Step
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Completion Message */}
          {currentStep === steps.length - 1 && (
            <Card className="mt-8 p-6 bg-success/5 border border-success/20">
              <div className="flex items-center gap-4">
                <CheckCircle2 className="w-12 h-12 text-success" />
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-1">
                    Ready for Placement
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    All onboarding phases complete. Teaser/IM can now be distributed to professional investors for bookbuild.
                  </p>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default IssuerWorkflow;
