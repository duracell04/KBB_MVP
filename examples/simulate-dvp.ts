import { DvPOrchestrator, loadOpenApiSpec } from "../ops/dvp/orchestrator";

async function main() {
  const orchestrator = new DvPOrchestrator();
  orchestrator.subscribe({ investor: "0xInvestor", amount: 1_000_000n });
  orchestrator.fund("SUB-001");
  orchestrator.settle("0xsettletx");
  orchestrator.refund("N/A");

  console.log("DvP history", orchestrator.history());
  console.log("OpenAPI spec loaded", loadOpenApiSpec().length, "bytes");
}

void main();
