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

function parseFrontmatter(raw) {
  const block = extractFrontmatter(raw);
  const lines = block.split(/\r?\n/);
  const data = {};
  let activeList = null;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      continue;
    }

    const listItem = /^-\s+(.+)$/.exec(trimmed);
    if (activeList && listItem) {
      data[activeList].push(listItem[1].trim());
      continue;
    }

    const keyValue = /^([a-zA-Z_]+):\s*(.*)$/.exec(trimmed);
    if (!keyValue) {
      activeList = null;
      continue;
    }

    const key = keyValue[1];
    const value = keyValue[2].trim();

    if (value === "") {
      activeList = key;
      data[key] = [];
      continue;
    }

    activeList = null;
    data[key] = value;
  }

  return data;
}

function parseSummary(raw) {
  const frontmatter = parseFrontmatter(raw);
  if (typeof frontmatter.summary === "string" && frontmatter.summary.trim().length > 0) {
    return frontmatter.summary.trim();
  }

  const withoutFrontmatter = raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, "").trim();
  const lines = withoutFrontmatter.split(/\r?\n/);
  const firstParagraph = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed && firstParagraph.length > 0) {
      break;
    }
    if (trimmed) {
      if (firstParagraph.length === 0 && trimmed.startsWith("#")) {
        continue;
      }
      firstParagraph.push(trimmed);
    }
  }

  return firstParagraph.join(" ");
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
    const frontmatter = parseFrontmatter(raw);
    const title = parseTitle(raw, "").trim();
    const summary = parseSummary(raw);
    if (!title) {
      fail(`Malformed content/${collection}/${name}: title missing (frontmatter or # heading required)`);
    }
    if (!summary) {
      fail(`Malformed content/${collection}/${name}: summary paragraph missing`);
    }

    const stack = Array.isArray(frontmatter.stack) ? frontmatter.stack : [];
    const status = typeof frontmatter.status === "string" ? frontmatter.status : undefined;
    return { slug, title, summary, stack, status };
  });
}

function writeWebData(projects) {
  const outDir = path.join(root, "apps", "web", "generated");
  fs.mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, "projects.json");
  // Keep output deterministic so CI can detect real content drift.
  fs.writeFileSync(outFile, JSON.stringify({ projects }, null, 2));
}

function markdownCollection(items, folder) {
  if (items.length === 0) {
    fail(`Collection content/${folder} has no entries`);
  }

  return items
    .map((item) => {
      const stack = item.stack.length > 0 ? `\n- **Stack:** ${item.stack.join(", ")}` : "";
      const status = item.status ? `\n- **Status:** ${item.status}` : "";
      const sourcePath = `/content/${folder}/${item.slug}.md`;
      const sourceUrl = `https://github.com/Hardik-Sankhla/Hardik-Sankhla/blob/main/content/${folder}/${item.slug}.md`;
      return `### ${item.title}\n\n${item.summary}${status}${stack}\n- **Source:** \`${sourcePath}\`\n- **GitHub:** [Open source file](${sourceUrl})`;
    })
    .join("\n\n");
}

function writeDocsIndexes(projects, guides, courses) {
  const docsDir = path.join(root, "apps", "docs", "docs");
  fs.mkdirSync(docsDir, { recursive: true });

  fs.writeFileSync(
    path.join(docsDir, "projects.md"),
    `# Projects\n\nCanonical source: \`/content/projects\`.\n\n[Back to Portfolio](https://hardik-sankhla.github.io)\n\n${markdownCollection(projects, "projects")}\n`
  );
  fs.writeFileSync(
    path.join(docsDir, "guides.md"),
    `# Guides\n\nCanonical source: \`/content/guides\`.\n\n[Back to Portfolio](https://hardik-sankhla.github.io)\n\n${markdownCollection(guides, "guides")}\n`
  );
  fs.writeFileSync(
    path.join(docsDir, "courses.md"),
    `# Courses\n\nCanonical source: \`/content/courses\`.\n\n[Back to Portfolio](https://hardik-sankhla.github.io)\n\n${markdownCollection(courses, "courses")}\n`
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
