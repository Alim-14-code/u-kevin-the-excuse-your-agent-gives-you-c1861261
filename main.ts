// The Excuse Your Agent Gives You — R1 entry.
// Reads the single-line excuse from entry.txt next to this file,
// validates it against the competition gate (1–200 chars, not
// only whitespace), and writes it to $MAKEFUN_OUTPUT_DIR/entry.txt.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const sourcePath = join(here, "entry.txt");
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";

const raw = readFileSync(sourcePath, "utf8");
const line = raw.replace(/\r\n/g, "\n").trim();

if (line.length < 1 || line.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${line.length}`);
}
if (line.includes("\n")) {
  throw new Error("entry must be a single line");
}

mkdirSync(outDir, { recursive: true });
const outText = line + "\n";
writeFileSync(join(outDir, "entry.txt"), outText, "utf8");
console.log(`Entry delivered: ${line.length} characters, one line, no excuses left in the tank.`);
