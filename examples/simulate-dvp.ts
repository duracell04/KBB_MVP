import { DvPOrchestrator } from "../ops/dvp/orchestrator";

async function main() {
  const orchestrator = new DvPOrchestrator();
  orchestrator.subscribe({ investor: "0xInvestor", amount: 1_000n * 10n ** 6n });
  orchestrator.fund("SUB123");
  orchestrator.settle("0xdeadbeef");
  console.log("Settlement history:", orchestrator.history());
}
main().catch((e) => { console.error(e); process.exit(1); });
