import fs from "node:fs";
import path from "node:path";

export type ContentItem = {
  slug: string;
  title: string;
  summary: string;
  status?: string;
  stack: string[];
};

export type ContentDocument = ContentItem & {
  raw: string;
};

const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---/;

function readFileSafe(filePath: string): string {
  return fs.readFileSync(filePath, "utf-8");
}

export function getContentFilePath(collection: "projects" | "guides" | "courses", slug: string): string {
  return path.resolve(process.cwd(), `../../content/${collection}/${slug}.md`);
}

export function readContentRaw(collection: "projects" | "guides" | "courses", slug: string): string {
  const filePath = getContentFilePath(collection, slug);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing content file: ${collection}/${slug}`);
  }
  return readFileSafe(filePath);
}

export function readContentDocument(collection: "projects" | "guides" | "courses", slug: string): ContentDocument {
  const raw = readContentRaw(collection, slug);
  const frontmatter = parseFrontmatter(raw);

  return {
    slug,
    title: String(frontmatter.title ?? slug),
    status: typeof frontmatter.status === "string" ? frontmatter.status : undefined,
    stack: Array.isArray(frontmatter.stack) ? frontmatter.stack : [],
    summary: parseSummary(raw),
    raw
  };
}

function parseFrontmatter(raw: string): Record<string, string | string[]> {
  const frontmatter = FRONTMATTER_RE.exec(raw)?.[1] ?? "";
  const lines = frontmatter.split(/\r?\n/);
  const data: Record<string, string | string[]> = {};
  let inStack = false;
  const stack: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      continue;
    }

    if (trimmed.startsWith("stack:")) {
      inStack = true;
      continue;
    }

    if (inStack && trimmed.startsWith("- ")) {
      stack.push(trimmed.replace(/^-\s*/, "").trim());
      continue;
    }

    if (inStack && !trimmed.startsWith("- ")) {
      inStack = false;
    }

    const keyValue = /^([a-zA-Z_]+):\s*(.+)$/.exec(trimmed);
    if (keyValue) {
      data[keyValue[1]] = keyValue[2].trim();
    }
  }

  if (stack.length > 0) {
    data.stack = stack;
  }

  return data;
}

function parseSummary(raw: string): string {
  const frontmatter = parseFrontmatter(raw);
  if (typeof frontmatter.summary === "string" && frontmatter.summary.trim().length > 0) {
    return frontmatter.summary.trim();
  }

  const withoutFrontmatter = raw.replace(FRONTMATTER_RE, "").trim();
  const firstLine = withoutFrontmatter
    .split(/\r?\n/)
    .find((line) => line.trim().length > 0 && !line.trim().startsWith("#")) ?? "";
  return firstLine.trim();
}

export function readContentCollection(collection: "projects" | "guides" | "courses"): ContentItem[] {
  const sourceDir = path.resolve(process.cwd(), `../../content/${collection}`);
  if (!fs.existsSync(sourceDir)) {
    return [];
  }

  return fs
    .readdirSync(sourceDir)
    .filter((name) => name.endsWith(".md") && name.toLowerCase() !== "readme.md")
    .sort()
    .map((name) => {
      const filePath = path.join(sourceDir, name);
      const raw = readFileSafe(filePath);
      const frontmatter = parseFrontmatter(raw);

      return {
        slug: name.replace(/\.md$/, ""),
        title: String(frontmatter.title ?? name.replace(/\.md$/, "")),
        status: typeof frontmatter.status === "string" ? frontmatter.status : undefined,
        stack: Array.isArray(frontmatter.stack) ? frontmatter.stack : [],
        summary: parseSummary(raw)
      };
    });
}
