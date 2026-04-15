import type { ContentItem } from "./content";

const STOPWORDS = new Set([
  "a",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "but",
  "by",
  "for",
  "from",
  "how",
  "i",
  "in",
  "into",
  "is",
  "it",
  "many",
  "not",
  "of",
  "on",
  "or",
  "that",
  "the",
  "their",
  "this",
  "to",
  "with",
  "you",
  "your"
]);

function tokenize(value: string): string[] {
  return value
    .toLowerCase()
    .split(/[^a-z0-9]+/g)
    .map((t) => t.trim())
    .filter((t) => t.length >= 2 && !STOPWORDS.has(t));
}

function tokensForItem(item: ContentItem): Set<string> {
  const tokens = new Set<string>();
  for (const token of tokenize(item.title)) {
    tokens.add(token);
  }
  for (const token of tokenize(item.summary)) {
    tokens.add(token);
  }
  for (const stack of item.stack) {
    for (const token of tokenize(stack)) {
      tokens.add(token);
    }
  }
  return tokens;
}

export function relatedItems(target: ContentItem, candidates: ContentItem[], limit: number): ContentItem[] {
  const targetTokens = tokensForItem(target);

  const scored = candidates
    .filter((candidate) => candidate.slug !== target.slug)
    .map((candidate) => {
      const candidateTokens = tokensForItem(candidate);
      let score = 0;
      for (const token of targetTokens) {
        if (candidateTokens.has(token)) {
          score += 1;
        }
      }
      return { candidate, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.candidate.title.localeCompare(b.candidate.title));

  return scored.slice(0, limit).map((item) => item.candidate);
}
