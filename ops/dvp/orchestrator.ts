import { readFileSync } from "fs";
export interface SubscriptionRequest { investor: string; amount: bigint; }
export interface SettlementEvent { type: "subscribed"|"funded"|"settled"|"refunded"; timestamp: Date; payload: Record<string, unknown>; }
export class DvPOrchestrator {
  private events: SettlementEvent[] = [];
  subscribe(r: SubscriptionRequest){ this.rec("subscribed", { investor: r.investor, amount: r.amount.toString() }); }
  fund(ref: string){ this.rec("funded", { ref }); }
  settle(tx: string){ this.rec("settled", { tx }); }
  refund(reason: string){ this.rec("refunded", { reason }); }
  history(){ return this.events; }
  private rec(t: SettlementEvent["type"], p: Record<string, unknown>){ this.events.push({ type: t, payload: p, timestamp: new Date() }); }
}
export function loadOpenApiSpec(path = new URL("./openapi.yaml", import.meta.url)): string { return readFileSync(path).toString("utf-8"); }
