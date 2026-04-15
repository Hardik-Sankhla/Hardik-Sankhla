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
