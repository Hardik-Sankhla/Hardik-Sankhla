import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const REQUIRED_COLLECTIONS = ["projects", "guides", "courses"];

function fail(message) {
  throw new Error(`[sync-content] ${message}`);
}

function extractFrontmatter(raw) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(raw);
  return match?.[1] ?? "";
}

function parseHeadingTitle(raw) {
  return /^#\s+(.+)$/m.exec(raw)?.[1]?.trim() ?? "";
}

function parseTitle(raw, fallback) {
  const fromFrontmatter = /(?:^|\n)title:\s*(.+)/.exec(extractFrontmatter(raw))?.[1]?.trim();
  const fromHeading = parseHeadingTitle(raw);
  const resolved = fromFrontmatter || fromHeading || fallback;
  return resolved;
}

function readCollection(collection) {
  const dir = path.join(root, "content", collection);
  if (!fs.existsSync(dir)) {
    fail(`Missing collection directory: content/${collection}`);
  }

  const files = fs
    .readdirSync(dir)
    .filter((name) => name.endsWith(".md"))
    .sort();

  if (files.length === 0) {
    fail(`No markdown files found in content/${collection}`);
  }

  return files.map((name) => {
    const slug = name.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(dir, name), "utf-8");
    const title = parseTitle(raw, "").trim();
    if (!title) {
      fail(`Malformed content/${collection}/${name}: title missing (frontmatter or # heading required)`);
    }
    return { slug, title };
  });
}

function writeWebData(projects) {
  const outDir = path.join(root, "apps", "web", "generated");
  fs.mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, "projects.json");
  fs.writeFileSync(outFile, JSON.stringify({ generatedAt: new Date().toISOString(), projects }, null, 2));
}

function markdownList(items, folder) {
  if (items.length === 0) {
    fail(`Collection content/${folder} has no entries`);
  }

  return items.map((item) => `- **${item.title}** (source: \`/content/${folder}/${item.slug}.md\`)`).join("\n");
}

function writeDocsIndexes(projects, guides, courses) {
  const docsDir = path.join(root, "apps", "docs", "docs");
  fs.mkdirSync(docsDir, { recursive: true });

  fs.writeFileSync(
    path.join(docsDir, "projects.md"),
    `# Projects\n\nGenerated from \`/content/projects\`.\n\n${markdownList(projects, "projects")}\n`
  );
  fs.writeFileSync(
    path.join(docsDir, "guides.md"),
    `# Guides\n\nGenerated from \`/content/guides\`.\n\n${markdownList(guides, "guides")}\n`
  );
  fs.writeFileSync(
    path.join(docsDir, "courses.md"),
    `# Courses\n\nGenerated from \`/content/courses\`.\n\n${markdownList(courses, "courses")}\n`
  );
}

try {
  for (const collection of REQUIRED_COLLECTIONS) {
    if (!fs.existsSync(path.join(root, "content", collection))) {
      fail(`Required collection is missing: content/${collection}`);
    }
  }

  const projects = readCollection("projects");
  const guides = readCollection("guides");
  const courses = readCollection("courses");

  writeWebData(projects);
  writeDocsIndexes(projects, guides, courses);

  console.log(`Synced content: projects=${projects.length}, guides=${guides.length}, courses=${courses.length}`);
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
