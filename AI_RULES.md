# AI_RULES.md

Mandatory rules for all AI agents and automation in this repository.

## Branch Rules

- Allowed long-lived branches only: `main`, `dev`, `web`, `docs`, `profile`.
- Allowed short-lived branch prefixes only:
  - `feat/<scope>`
  - `fix/<scope>`
  - `refactor/<scope>`
- Never recreate deleted legacy branches (`gh-pages`, `develop`, `portfolio`, etc.).

## Architecture Rules

- Single source of truth: `/content`.
- Applications only consume content:
  - `/apps/web`
  - `/apps/docs`
- Profile source: `/profile/README.md`.
- Never duplicate projects/blogs/guides/courses across app folders.

## Update Rules

When changing files, always update dependent references:

1. Root `README.md`
2. `AGENTS.md`
3. `.github/copilot-instructions.md`
4. Relevant `.github/instructions/*.instructions.md`

## Safety Rules

- Never create placeholder links in production output.
- Never silently change branch strategy.
- Never overwrite unrelated files.
- Never restore legacy root static structure unless explicitly requested.

## Validation Rules

Before push:

- Confirm branch naming compliance.
- Confirm no broken internal links and paths.
- Confirm no content duplication outside `/content`.
- Confirm profile/web/docs instructions are synchronized.
