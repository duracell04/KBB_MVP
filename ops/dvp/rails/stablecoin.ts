import { createPublicClient, decodeEventLog, http, parseAbiItem } from "viem";

type Hex = `0x${string}`;

export interface StablecoinVerificationInput {
  txHash: Hex;
  expectedAmount?: bigint;
  from: Hex;
  to?: Hex;
  token: Hex;
  rpcUrl?: string;
}

export interface StablecoinVerificationResult {
  ok: boolean;
  reason?: string;
}

const transferAbi = parseAbiItem(
  "event Transfer(address indexed from,address indexed to,uint256 value)"
);

export async function verifyUSDCTransfer({
  txHash,
  expectedAmount,
  from,
  to,
  token,
  rpcUrl
}: StablecoinVerificationInput): Promise<StablecoinVerificationResult> {
  const client = createPublicClient({
    transport: http(rpcUrl ?? process.env.RPC_URL ?? "http://127.0.0.1:8545")
  });

  try {
    const receipt = await client.getTransactionReceipt({ hash: txHash });
    if (!receipt) {
      return { ok: false, reason: "RECEIPT_NOT_FOUND" };
    }

    const matches = receipt.logs
      .filter((log) => log.address.toLowerCase() === token.toLowerCase())
      .map((log) =>
        decodeEventLog({
          abi: [transferAbi],
          data: log.data,
          topics: log.topics
        })
      )
      .filter((decoded) => decoded.eventName === "Transfer")
      .map((decoded) => decoded.args as { from: string; to: string; value: bigint });

    const transfer = matches.find((item) => {
      const fromOk = item.from.toLowerCase() === from.toLowerCase();
      const toOk = to ? item.to.toLowerCase() === to.toLowerCase() : true;
      const amountOk = typeof expectedAmount === "bigint" ? item.value === expectedAmount : true;
      return fromOk && toOk && amountOk;
    });

    if (!transfer) {
      return { ok: false, reason: "NO_MATCHING_TRANSFER" };
    }

    return { ok: true };
  } catch (error) {
    return { ok: false, reason: (error as Error).message };
  }
}
