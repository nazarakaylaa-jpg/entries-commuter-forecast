import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One-line weather forecast for a city that does not exist.
// Gloomsbury: grey drizzle, a 90% chance of rain by nine, and a bus
// shelter already full of people pretending they are dry.
const ENTRY =
  "Gloomsbury: grey drizzle all morning, 90% chance of rain by nine, and the bus shelter is already full of people pretending they're dry.";

const MAX_CHARS = 140;

if (ENTRY.length < 1 || ENTRY.length > MAX_CHARS) {
  throw new Error(
    `entry must be 1 to ${MAX_CHARS} characters, got ${ENTRY.length}`,
  );
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (ENTRY.trim() !== ENTRY) {
  throw new Error("entry must not start or end with whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");
// Read back and verify the written file is byte-identical to the entry.
const written = readFileSync(outPath, "utf8");
if (written !== ENTRY) {
  throw new Error("entry.txt round-trip mismatch");
}
console.log(`wrote entry.txt (${ENTRY.length} characters)`);
