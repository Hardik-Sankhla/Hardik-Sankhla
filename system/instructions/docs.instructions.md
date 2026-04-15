# docs.instructions.md

## Scope

Applies to docs files under /apps/docs and docs configuration under /config/mkdocs.yml.

## Update Rules

- Keep MkDocs configuration in /config/mkdocs.yml.
- Keep docs pages aligned to canonical /content sources.
- Prefer generated listings from sync pipeline over manual duplication.
- Keep headings and navigation structured and readable.

## Validation Checklist

- node scripts/sync-content.mjs passes.
- mkdocs build -f config/mkdocs.yml passes.
- Navigation links resolve without broken targets.
- Docs include links back to web surface where appropriate.
