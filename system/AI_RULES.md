# AI_RULES.md

Mandatory repository rules for all AI-assisted updates.

## Core Rules

- main-only source-of-truth workflow.
- /content-first architecture.
- No duplication of canonical content in apps.
- No branch creation without explicit user request.

## Update Rules

When changing files:

1. Update only the relevant scope.
2. Keep architecture stable.
3. Keep links and references consistent.
4. Keep commands environment-agnostic.

## Validation Rules

Before completion:

- If web changed: run build in apps/web.
- If docs/content changed: run node scripts/sync-content.mjs and mkdocs build -f config/mkdocs.yml.
- Confirm no broken internal links/paths introduced.

## Safety Rules

- Never introduce placeholder links in production docs/pages.
- Never create duplicate copies of canonical files.
- Never silently switch branch strategy.
- Never force destructive git actions unless user requested.
