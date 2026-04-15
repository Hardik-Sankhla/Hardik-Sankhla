# web.instructions.md

## Scope

Applies to web application files under /apps/web.

## Update Rules

- Keep functionality compatible with existing content pipeline.
- Consume canonical content from /content via existing readers/generated data.
- Keep responsive, semantic, and accessible markup.
- Do not hardcode localhost or environment-specific URLs.

## Allowed Actions

- Update UI layout, typography, spacing, and interaction polish.
- Improve metadata, semantic structure, and link quality.
- Refactor web-only code for readability without changing architecture.

## Forbidden Actions

- Do not add new frameworks or redesign architecture.
- Do not duplicate canonical content under /apps/web.
- Do not break / and /projects routing behavior.

## Validation Checklist

- npm run build passes in /apps/web.
- Internal links and CTA paths are valid.
- No content duplication introduced in /apps/web.
- Visual updates preserve layout consistency across sections.

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

- If build fails:
	- report exact error and file
	- apply minimal fix and rerun npm run build
- If data path/import fails:
	- restore canonical /content-driven read flow
	- avoid introducing fallback duplicates
