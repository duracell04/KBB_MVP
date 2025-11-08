#!/usr/bin/env ts-node
import fs from "fs";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const ajv = new Ajv2020({ allErrors: true, strict: false });
addFormats(ajv);

const reportSchema = JSON.parse(
  fs.readFileSync("docs/specs/recon.report.schema.json", "utf8")
);
const breakSchema = JSON.parse(
  fs.readFileSync("docs/specs/recon.breaks.schema.json", "utf8")
);
const data = JSON.parse(
  fs.readFileSync("out/recon.report.json", "utf8")
);

const validateReport = ajv.compile(reportSchema);
const reportValid = validateReport(data);
const reportErrors = JSON.parse(
  JSON.stringify(validateReport.errors ?? [])
);

const validateBreak = ajv.compile(breakSchema);
const breaks = [...(data.breaks ?? [])];
const breakErrors = breaks.flatMap((entry, index) => {
  if (validateBreak(entry)) {
    return [];
  }

  const copied = JSON.parse(JSON.stringify(validateBreak.errors ?? []));
  return [{ index, errors: copied }];
});

fs.mkdirSync("out", { recursive: true });
fs.writeFileSync(
  "out/recon.validation.json",
  JSON.stringify({ valid: reportValid, errors: reportErrors }, null, 2)
);
fs.writeFileSync(
  "out/recon.breaks.validation.json",
  JSON.stringify({ errors: breakErrors }, null, 2)
);

if (!reportValid) {
  console.error("❌ recon report invalid");
  process.exit(1);
}

if (breakErrors.length) {
  console.error("❌ recon breaks invalid");
  process.exit(1);
}

console.log("✅ recon report valid");
console.log("✅ recon breaks valid");
