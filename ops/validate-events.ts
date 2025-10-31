#!/usr/bin/env -S node --loader ts-node/esm
import fs from "fs";
import path from "path";
import Ajv from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const eventsPath = process.argv[2] ?? "out/events.sample.json";
const schemaPath = "docs/specs/events.schema.json";

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);

const schema = JSON.parse(fs.readFileSync(schemaPath, "utf-8"));
const validate = ajv.compile(schema);
const data = JSON.parse(fs.readFileSync(eventsPath, "utf-8"));

const ok = validate(data);
const report = {
  file: path.resolve(eventsPath),
  valid: !!ok,
  errors: validate.errors ?? []
};

fs.mkdirSync("out", { recursive: true });
fs.writeFileSync("out/events.validation.json", JSON.stringify(report, null, 2));

if (!ok) {
  console.error("❌ events invalid. See out/events.validation.json");
  process.exit(1);
}
console.log("✅ events valid. Report → out/events.validation.json");
