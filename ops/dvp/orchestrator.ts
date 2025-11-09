import {
  checkCompliance,
  loadComplianceConfig,
  type ComplianceConfig,
  type ComplianceDecision,
  type EligibilityProfile,
  type SettlementInstruction
} from "./middleware/compliance.js";
import {
  verifyUSDCTransfer,
  type StablecoinVerificationInput,
  type StablecoinVerificationResult
} from "./rails/stablecoin.js";
import type { IFixedIncomeNote } from "../../types/IFixedIncomeNote";

export interface SettlementRequest extends SettlementInstruction {
  settlementNetwork: "ISO20022" | "SWIFT" | "SEPA" | "ACH" | "FPS" | "ONCHAIN_STABLECOIN";
  stablecoinTx?: StablecoinVerificationInput;
}

export interface SettlementContext {
  eligibility: EligibilityProfile;
  exposure?: { outstanding: number };
  noteStatus?: IFixedIncomeNote.NoteStatusStructOutput;
  config?: ComplianceConfig;
}

export interface SettlementResponse {
  status: "APPROVED" | "DENIED";
  compliance: ComplianceDecision;
  stablecoinCheck?: StablecoinVerificationResult;
}

export async function settleSubscription(request: SettlementRequest, context: SettlementContext): Promise<SettlementResponse> {
  const config = context.config ?? loadComplianceConfig();
  const exposure =
    context.exposure ??
    (context.noteStatus
      ? { outstanding: Number(context.noteStatus.amount) }
      : undefined);
  const compliance = checkCompliance({
    config,
    eligibility: context.eligibility,
    settlement: request,
    exposure
  });

  if (!compliance.ok) {
    return { status: "DENIED", compliance };
  }

  if (request.settlementNetwork === "ONCHAIN_STABLECOIN") {
    if (!request.stablecoinTx) {
      return {
        status: "DENIED",
        compliance,
        stablecoinCheck: { ok: false, reason: "STABLECOIN_TX_REQUIRED" }
      };
    }

    const stablecoinCheck = await verifyUSDCTransfer({
      ...request.stablecoinTx,
      expectedAmount:
        typeof request.stablecoinTx.expectedAmount === "bigint"
          ? request.stablecoinTx.expectedAmount
          : BigInt(request.amount)
    });

    if (!stablecoinCheck.ok) {
      return { status: "DENIED", compliance, stablecoinCheck };
    }

    return { status: "APPROVED", compliance, stablecoinCheck };
  }

  return { status: "APPROVED", compliance };
}

export function exposureFromNoteStatus(status: IFixedIncomeNote.NoteStatusStructOutput): number {
  return Number(status.amount);
}
