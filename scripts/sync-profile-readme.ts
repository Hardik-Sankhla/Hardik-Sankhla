import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const src = path.join(root, "profile", "README.md");
const dest = path.join(root, "README.md");

if (!fs.existsSync(src)) {
  throw new Error(`Missing profile source: ${src}`);
}

fs.copyFileSync(src, dest);
console.log("Synchronized profile/README.md -> README.md");
