# docs.instructions.md

## Scope

Applies to docs files under /apps/docs and docs configuration under /config/mkdocs.yml.

## Update Rules

- Keep MkDocs configuration in /config/mkdocs.yml.
- Keep docs pages aligned to canonical /content sources.
- Prefer generated listings from sync pipeline over manual duplication.
- Keep headings and navigation structured and readable.

## Allowed Actions

- Improve navigation labels, docs landing clarity, and section structure.
- Update docs presentation while preserving content-source model.
- Update generated docs via sync-content pipeline.

## Forbidden Actions

- Do not move MkDocs config out of /config/mkdocs.yml.
- Do not manually duplicate canonical content into docs pages as separate sources.
- Do not add branch-specific deployment guidance.

## Validation Checklist

- node scripts/sync-content.mjs passes.
- mkdocs build -f config/mkdocs.yml passes.
- Navigation links resolve without broken targets.
- Docs include links back to web surface where appropriate.

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

- If sync-content fails:
	- report exact collection/file issue
	- fix canonical source and regenerate
- If mkdocs build fails:
	- report failing file and reason
	- apply minimal docs/config fix and rerun build
