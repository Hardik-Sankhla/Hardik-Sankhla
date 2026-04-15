# guides.instructions.md

## Scope

Applies to guide maintenance and improvements for:

- /content/guides

## Objective

Maintain a continuously improving, agent-managed guide library:

- consistent structure
- no duplicate topics
- practical, production-grade clarity

## Source of Truth

- All guides MUST exist only in /content/guides.
- Agents MUST NOT create guides in /apps, /config/site, /archive, or any other folder.
- If a new topic overlaps an existing guide, update the existing guide instead of creating a duplicate.

## Quality Standard

- Every guide MUST comply with /system/GUIDE_STANDARD.md.

## Priority Enforcement

- Agents MUST follow /system/GUIDE_PRIORITY.md before improving guides.
- Agents MUST NOT pick guides randomly.
- Agents MUST scan and rank guides, then improve highest-impact work first.

## Improvement Workflow

When asked to improve guides:

1. Read /system/GUIDE_PRIORITY.md.
2. Scan all guides in /content/guides.
3. Rank guides using priority rules (P0 → P1 → P2; incomplete first).
2. Identify issues:
	- missing required sections
	- unclear intro or weak explanations
	- inconsistent tone/structure
	- outdated or non-actionable content
	- duplicated topic coverage across multiple files
4. Choose the minimal fix:
	- prefer editing existing files
	- merge/redirect content by updating one guide and trimming duplication from the other (do not create new duplicates)
5. Apply the improvement prompts:
	- /system/prompts/guide.prompt.md (structure baseline)
	- /system/prompts/guide-improvement.prompt.md (upgrade engine)

## Consistency Rules

- Use stable, slug-like filenames.
- Maintain consistent frontmatter across guides:
	- title
	- status
	- stack (topics)
- Keep headings as H2 for the required sections.

See: /system/blocks/pre-push-validation.md

## Pre-Push Local Preview (REQUIRED)

Before any push, agent MUST:

### Web (Vercel)
- Run: npm run build
- Optionally: npm run dev for UI validation

### Docs (GitHub Pages)
- Run: node scripts/sync-content.mjs
- Run: mkdocs build -f config/mkdocs.yml
- Optionally: mkdocs serve -f config/mkdocs.yml

### Profile (GitHub README)
- Verify markdown renders correctly
- Verify all links resolve
- If dependent on web/docs, ensure those builds pass

### Global Validation
- No broken links
- No missing content
- No inconsistent structure

❌ DO NOT push if any check fails

## Failure Handling

- If a guide is missing required sections:
	- add them and reorganize content minimally
- If two guides cover the same topic:
	- consolidate into the best existing guide
	- keep the other guide focused on a distinct angle (or trim overlap)
- If validation fails:
	- report exact failing command and file
	- apply minimal fix and re-run validation
