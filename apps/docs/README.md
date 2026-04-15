# apps/docs

MkDocs documentation surface.

## Local Run

From repository root:

```bash
node scripts/sync-content.mjs
uv run mkdocs serve -f config/mkdocs.yml
```

This app consumes canonical content from `/content`.
