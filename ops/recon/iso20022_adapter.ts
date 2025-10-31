import { readFileSync } from "fs";
import { parseStringPromise } from "xml2js";

export interface StatementEntry {
  reference: string;
  amount: number;
  currency: string;
}

export async function parseCamt(path: string): Promise<StatementEntry[]> {
  const xml = readFileSync(path, "utf-8");
  const parsed = await parseStringPromise(xml);
  const entries = parsed.Document?.BkToCstmrStmt?.[0]?.Stmt?.[0]?.Ntry ?? [];
  return entries.map((entry: any) => ({
    reference: entry.NtryRef?.[0] ?? "",
    amount: parseFloat(entry.Amt?.[0]?._ ?? "0"),
    currency: entry.Amt?.[0]?.$.Ccy ?? "USD",
  }));
}
