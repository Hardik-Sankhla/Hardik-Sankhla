import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const projectsDir = path.join(root, "content", "projects");
const outDir = path.join(root, "apps", "web", "generated");
const outFile = path.join(outDir, "projects.json");

fs.mkdirSync(outDir, { recursive: true });

const projects = fs
  .readdirSync(projectsDir)
  .filter((name) => name.endsWith(".md"))
  .sort();

fs.writeFileSync(outFile, JSON.stringify({ generatedAt: new Date().toISOString(), projects }, null, 2));
console.log(`Synced ${projects.length} project entries to ${outFile}`);
