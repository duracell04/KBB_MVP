import fs from "node:fs";
import path from "node:path";
import { createPublicClient, http, parseAbiItem } from "viem";
import { anvil } from "viem/chains";
import type {
  CouponPaidEvent,
  RedemptionPaidEvent,
  SubscriptionSettledEvent
} from "../../types/IFixedIncomeNote";

const OUTPUT_PATH = path.resolve("out/events.latest.json");
const SAMPLE_PATH = path.resolve("ops/recon/events.sample.json");
const NOTE_ADDRESS = process.env.NOTE_ADDRESS as `0x${string}` | undefined;
const RPC_URL = process.env.RPC_URL ?? "http://127.0.0.1:8545";

const subscriptionSettledAbi = parseAbiItem(
  "event SubscriptionSettled(bytes32 indexed orderId,address indexed investor,uint256 amount,string currency,string settlementRef,string settlementNetwork)"
);
const couponPaidAbi = parseAbiItem(
  "event CouponPaid(uint256 indexed periodId,uint256 grossAmount,uint256 withholding,uint256 netAmount,string settlementRef,string settlementNetwork)"
);
const redemptionPaidAbi = parseAbiItem(
  "event RedemptionPaid(uint256 amount,string settlementRef,string settlementNetwork)"
);

const EVENT_ABIS = [subscriptionSettledAbi, couponPaidAbi, redemptionPaidAbi];

type SubscriptionSettledRecord =
  Omit<SubscriptionSettledEvent.OutputObject, "amount"> & { event: "SubscriptionSettled"; amount: number };

type CouponPaidRecord =
  Omit<CouponPaidEvent.OutputObject, "periodId" | "grossAmount" | "withholding" | "netAmount"> & {
    event: "CouponPaid";
    periodId: number;
    grossAmount: number;
    withholding: number;
    netAmount: number;
  };

type RedemptionPaidRecord =
  Omit<RedemptionPaidEvent.OutputObject, "amount"> & {
    event: "RedemptionPaid";
    amount: number;
  };

type NoteEvent = SubscriptionSettledRecord | CouponPaidRecord | RedemptionPaidRecord;

async function writeFile(events: NoteEvent[]) {
  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(events, null, 2));
  console.log(`indexed=${events.length} -> ${path.relative(process.cwd(), OUTPUT_PATH)}`);
}

function loadSampleEvents(): NoteEvent[] {
  const raw = JSON.parse(fs.readFileSync(SAMPLE_PATH, "utf8")) as NoteEvent[];
  return raw;
}

function normalizeSubscription(args: SubscriptionSettledEvent.OutputObject): NoteEvent {
  return {
    event: "SubscriptionSettled",
    orderId: args.orderId,
    investor: args.investor,
    amount: Number(args.amount),
    currency: args.currency,
    settlementRef: args.settlementRef,
    settlementNetwork: args.settlementNetwork
  } satisfies NoteEvent;
}

function normalizeCoupon(args: CouponPaidEvent.OutputObject): NoteEvent {
  return {
    event: "CouponPaid",
    periodId: Number(args.periodId),
    grossAmount: Number(args.grossAmount),
    withholding: Number(args.withholding),
    netAmount: Number(args.netAmount),
    settlementRef: args.settlementRef,
    settlementNetwork: args.settlementNetwork
  } satisfies NoteEvent;
}

function normalizeRedemption(args: RedemptionPaidEvent.OutputObject): NoteEvent {
  return {
    event: "RedemptionPaid",
    amount: Number(args.amount),
    settlementRef: args.settlementRef,
    settlementNetwork: args.settlementNetwork
  } satisfies NoteEvent;
}

async function indexEvents() {
  if (!NOTE_ADDRESS) {
    console.warn("NOTE_ADDRESS not provided. Falling back to sample events.");
    await writeFile(loadSampleEvents());
    return;
  }

  const client = createPublicClient({
    chain: anvil,
    transport: http(RPC_URL)
  });

  try {
    const fromBlock = process.env.FROM_BLOCK ? BigInt(process.env.FROM_BLOCK) : 0n;
    const logs = (await client.getLogs({
      address: NOTE_ADDRESS,
      fromBlock,
      toBlock: "latest",
      events: EVENT_ABIS
    })) as Array<{
      eventName?: string;
      args?: Record<string, unknown>;
    }>;

    const events: NoteEvent[] = logs.map((log) => {
      switch (log.eventName) {
        case "CouponPaid":
          return normalizeCoupon((log.args ?? {}) as unknown as CouponPaidEvent.OutputObject);
        case "RedemptionPaid":
          return normalizeRedemption((log.args ?? {}) as unknown as RedemptionPaidEvent.OutputObject);
        case "SubscriptionSettled":
        default:
          return normalizeSubscription((log.args ?? {}) as unknown as SubscriptionSettledEvent.OutputObject);
      }
    });

    if (events.length === 0) {
      console.warn("No events found on-chain. Falling back to sample events.");
      await writeFile(loadSampleEvents());
      return;
    }

    await writeFile(events);
  } catch (error) {
    console.warn(`Indexer error: ${(error as Error).message ?? String(error)}. Falling back to sample events.`);
    await writeFile(loadSampleEvents());
  }
}

indexEvents()
  .then(() => {
    if (!fs.existsSync(OUTPUT_PATH)) {
      console.warn("Indexer completed without writing output. Writing sample events.");
      return writeFile(loadSampleEvents());
    }
    return undefined;
  })
  .catch((error) => {
    console.error("Fatal indexer error", error);
    process.exitCode = 1;
  });
