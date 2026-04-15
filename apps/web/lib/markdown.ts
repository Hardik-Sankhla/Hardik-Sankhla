export type MarkdownBlock =
  | { type: "heading"; level: 1 | 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "code"; language?: string; code: string };

export type MarkdownSection = {
  heading: string;
  blocks: MarkdownBlock[];
};

const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

export function stripFrontmatter(raw: string): string {
  return raw.replace(FRONTMATTER_RE, "").trim();
}

function flushParagraph(lines: string[], blocks: MarkdownBlock[]) {
  const text = lines.join(" ").trim();
  if (text.length > 0) {
    blocks.push({ type: "paragraph", text });
  }
  lines.length = 0;
}

export function parseMarkdownBlocks(raw: string): MarkdownBlock[] {
  const input = stripFrontmatter(raw);
  const lines = input.split(/\r?\n/);

  const blocks: MarkdownBlock[] = [];
  let paragraphLines: string[] = [];

  let inCode = false;
  let codeLang: string | undefined;
  let codeLines: string[] = [];

  let listMode: { ordered: boolean; items: string[] } | null = null;

  const flushList = () => {
    if (listMode && listMode.items.length > 0) {
      blocks.push({ type: "list", ordered: listMode.ordered, items: listMode.items });
    }
    listMode = null;
  };

  for (const line of lines) {
    const trimmed = line.trimEnd();

    const fence = /^```\s*([\w+-]+)?\s*$/.exec(trimmed.trim());
    if (fence) {
      flushParagraph(paragraphLines, blocks);
      flushList();

      if (!inCode) {
        inCode = true;
        codeLang = fence[1];
        codeLines = [];
      } else {
        inCode = false;
        blocks.push({ type: "code", language: codeLang, code: codeLines.join("\n") });
        codeLang = undefined;
        codeLines = [];
      }
      continue;
    }

    if (inCode) {
      codeLines.push(line);
      continue;
    }

    const heading = /^(#{1,3})\s+(.+)$/.exec(trimmed.trim());
    if (heading) {
      flushParagraph(paragraphLines, blocks);
      flushList();

      const level = heading[1].length as 1 | 2 | 3;
      blocks.push({ type: "heading", level, text: heading[2].trim() });
      continue;
    }

    const orderedItem = /^(\d+)\.\s+(.+)$/.exec(trimmed.trim());
    if (orderedItem) {
      flushParagraph(paragraphLines, blocks);
      if (!listMode || listMode.ordered !== true) {
        flushList();
        listMode = { ordered: true, items: [] };
      }
      listMode.items.push(orderedItem[2].trim());
      continue;
    }

    const bulletItem = /^[-*+]\s+(.+)$/.exec(trimmed.trim());
    if (bulletItem) {
      flushParagraph(paragraphLines, blocks);
      if (!listMode || listMode.ordered !== false) {
        flushList();
        listMode = { ordered: false, items: [] };
      }
      listMode.items.push(bulletItem[1].trim());
      continue;
    }

    if (trimmed.trim().length === 0) {
      flushParagraph(paragraphLines, blocks);
      flushList();
      continue;
    }

    if (listMode) {
      flushList();
    }

    paragraphLines.push(trimmed.trim());
  }

  flushParagraph(paragraphLines, blocks);
  flushList();

  if (inCode) {
    blocks.push({ type: "code", language: codeLang, code: codeLines.join("\n") });
  }

  return blocks;
}

export function splitByH2Sections(raw: string): { intro: MarkdownBlock[]; sections: MarkdownSection[] } {
  const blocks = parseMarkdownBlocks(raw);

  const intro: MarkdownBlock[] = [];
  const sections: MarkdownSection[] = [];

  let current: MarkdownSection | null = null;

  for (const block of blocks) {
    if (block.type === "heading" && block.level === 2) {
      if (current) {
        sections.push(current);
      }
      current = { heading: block.text, blocks: [] };
      continue;
    }

    if (!current) {
      intro.push(block);
    } else {
      current.blocks.push(block);
    }
  }

  if (current) {
    sections.push(current);
  }

  return { intro, sections };
}

export function normalizeHeadingKey(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}
