import fs from "fs";
import path from "path";

const sourcePath = path.resolve("ops/recon/events.sample.json");
const outDir = path.resolve("out");
const destPath = path.join(outDir, "events.sample.json");

fs.mkdirSync(outDir, { recursive: true });
fs.copyFileSync(sourcePath, destPath);

console.log(`Demo DvP simulation complete. Events copied to ${destPath}`);
