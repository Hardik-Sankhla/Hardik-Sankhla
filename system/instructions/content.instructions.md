# content.instructions.md

## Scope

Applies to canonical content under:

- /content/projects
- /content/guides
- /content/courses
- /content/blogs

## Update Rules

- Keep content canonical in /content only.
- Preserve frontmatter consistency (title, summary, status, stack when applicable).
- Keep markdown clean and readable.
- Do not mirror content into /apps/web or /apps/docs manually.

## Guides Source of Truth

- All guides MUST exist only in /content/guides.
- Agents MUST NOT create guides anywhere else.
- Agents MUST update existing guides instead of duplicating topics.
- All guides MUST comply with /system/GUIDE_STANDARD.md.

## Allowed Actions

- Add or update markdown files under /content/projects, /content/guides, /content/courses, /content/blogs.
- Improve wording, structure, and metadata clarity.
- Add links to source files when useful.

## Forbidden Actions

- Do not copy content into /apps/web or /apps/docs as a second source.
- Do not change folder architecture.
- Do not introduce branch-specific content logic.

## Validation Checklist

- File names are stable and slug-like.
- Required metadata is present.
- node scripts/sync-content.mjs passes.
- mkdocs build -f config/mkdocs.yml passes for docs-facing content updates.

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

- If metadata is missing or malformed:
	- stop and report exact file and field
	- fix only the affected canonical file
- If sync-content fails:
	- report failing collection/file
	- apply minimal schema-compliant fix and rerun
