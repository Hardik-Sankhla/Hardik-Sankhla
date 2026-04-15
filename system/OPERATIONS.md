# OPERATIONS.md

Human-facing operating guide for maintenance and release readiness.

## Surfaces

- Profile: /profile/README.md
- Web: /apps/web
- Docs: /apps/docs
- Canonical content: /content

## Standard Update Flow

1. Read /system/AGENT_PROTOCOL.md.
2. Make minimal in-scope changes.
3. Run required validation.
4. Summarize changed files and checks.

## Common Commands

From repository root:

- node scripts/sync-content.mjs
- mkdocs build -f config/mkdocs.yml

From /apps/web:

- npm run build

## Pre-Push Checklist

- No duplicated content outside /content.
- No branch-specific assumptions in docs/governance.
- No broken links/paths in touched files.
- Validation commands pass for touched surfaces.

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
