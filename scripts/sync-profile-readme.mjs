import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = path.join(root, "profile", "README.md");
const dest = path.join(root, "README.md");

if (!fs.existsSync(src)) {
  throw new Error(`Missing profile source: ${src}`);
}

fs.copyFileSync(src, dest);
console.log("Synchronized profile/README.md -> README.md");
