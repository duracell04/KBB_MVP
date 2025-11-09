import fs from "node:fs";
import path from "node:path";

export type ComplianceFailureReason =
  | "INVESTOR_NOT_ALLOWLISTED"
  | "KYC_FAILED"
  | "LOCKUP_ACTIVE"
  | "JURISDICTION_BLOCKED"
  | "CURRENCY_UNSUPPORTED"
  | "NETWORK_BLOCKED"
  | "EXPOSURE_LIMIT"
  | "AMOUNT_TOO_SMALL";

export interface EligibilityProfile {
  investor: string;
  jurisdiction: string;
  kycApproved: boolean;
  lockupEndsAt?: number;
  allowListed?: boolean;
}

export interface SettlementInstruction {
  amount: number;
  currency: string;
  settlementRef: string;
  settlementNetwork: string;
  valueDate?: string;
}

export interface ComplianceConfig {
  investorAllowlist: string[];
  allowedJurisdictions: string[];
  allowedSettlementNetworks: string[];
  supportedCurrencies: string[];
  minimumAmount: number;
  exposureLimits: Record<string, number>;
}

export interface ExposureSnapshot {
  outstanding: number;
}

export interface ComplianceDecision {
  ok: boolean;
  reasons: ComplianceFailureReason[];
}

export interface ComplianceContext {
  config: ComplianceConfig;
  eligibility: EligibilityProfile;
  settlement: SettlementInstruction;
  exposure?: ExposureSnapshot;
}

export function loadComplianceConfig(configPath = "ops/dvp/middleware/config.sample.json"): ComplianceConfig {
  const resolved = path.resolve(configPath);
  const raw = fs.readFileSync(resolved, "utf8");
  return JSON.parse(raw) as ComplianceConfig;
}

export function checkCompliance(context: ComplianceContext): ComplianceDecision {
  const { config, eligibility, settlement, exposure } = context;
  const reasons: ComplianceFailureReason[] = [];

  if (!config.investorAllowlist.some((addr) => addr.toLowerCase() === eligibility.investor.toLowerCase())) {
    reasons.push("INVESTOR_NOT_ALLOWLISTED");
  }

  if (!eligibility.kycApproved) {
    reasons.push("KYC_FAILED");
  }

  if (
    typeof eligibility.lockupEndsAt === "number" &&
    eligibility.lockupEndsAt > 0 &&
    Math.floor(Date.now() / 1000) < eligibility.lockupEndsAt
  ) {
    reasons.push("LOCKUP_ACTIVE");
  }

  if (config.allowedJurisdictions.length > 0 && !config.allowedJurisdictions.includes(eligibility.jurisdiction)) {
    reasons.push("JURISDICTION_BLOCKED");
  }

  if (!config.supportedCurrencies.includes(settlement.currency)) {
    reasons.push("CURRENCY_UNSUPPORTED");
  }

  if (!config.allowedSettlementNetworks.includes(settlement.settlementNetwork)) {
    reasons.push("NETWORK_BLOCKED");
  }

  if (settlement.amount < config.minimumAmount) {
    reasons.push("AMOUNT_TOO_SMALL");
  }

  const limit = config.exposureLimits[eligibility.investor.toLowerCase()];
  if (typeof limit === "number" && exposure) {
    const projected = exposure.outstanding + settlement.amount;
    if (projected > limit) {
      reasons.push("EXPOSURE_LIMIT");
    }
  }

  return { ok: reasons.length === 0, reasons };
}

export function assertCompliant(context: ComplianceContext): void {
  const decision = checkCompliance(context);
  if (!decision.ok) {
    const error = new Error(`Compliance check failed: ${decision.reasons.join(",")}`);
    (error as Error & { reasons?: ComplianceFailureReason[] }).reasons = decision.reasons;
    throw error;
  }
}
