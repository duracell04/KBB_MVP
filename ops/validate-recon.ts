#!/usr/bin/env ts-node
import fs from "node:fs";
import Ajv from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const schemaPath = "docs/specs/recon.report.schema.json";
const reportPath = process.argv[2] ?? "out/recon.report.json";

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);

const schema = JSON.parse(fs.readFileSync(schemaPath, "utf8"));
const data = JSON.parse(fs.readFileSync(reportPath, "utf8"));

const validate = ajv.compile(schema);
const ok = validate(data);

fs.mkdirSync("out", { recursive: true });
fs.writeFileSync(
  "out/recon.validation.json",
  JSON.stringify({ valid: ok, errors: validate.errors ?? [] }, null, 2)
);

if (!ok) {
  console.error("❌ recon invalid");
  process.exit(1);
}

console.log("✅ recon valid");
