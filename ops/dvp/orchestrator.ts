import { readFileSync } from "fs";

export interface SubscriptionRequest { investor: string; amount: bigint; }
export interface SettlementEvent { type: "subscribed" | "funded" | "settled" | "refunded"; timestamp: Date; payload: Record<string, unknown>; }

export class DvPOrchestrator {
  private events: SettlementEvent[] = [];
  subscribe(req: SubscriptionRequest): void { this.record("subscribed", { investor: req.investor, amount: req.amount.toString() }); }
  fund(referenceId: string): void { this.record("funded", { referenceId }); }
  settle(txHash: string): void { this.record("settled", { txHash }); }
  refund(reason: string): void { this.record("refunded", { reason }); }
  history(): SettlementEvent[] { return this.events; }
  private record(type: SettlementEvent["type"], payload: Record<string, unknown>): void { this.events.push({ type, payload, timestamp: new Date() }); }
}
export function loadOpenApiSpec(path = new URL("./openapi.yaml", import.meta.url)): string { return readFileSync(path).toString("utf-8"); }
