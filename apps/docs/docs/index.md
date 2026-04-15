# Hardik Sankhla Docs

This documentation surface is powered by MkDocs and reads canonical content from `/content`.

Use this app for guides, system docs, and knowledge hub pages.

## Navigation

- [Projects](projects.md)
- [Guides](guides.md)
- [Courses](courses.md)

## Content Flow

1. Add or edit canonical markdown under `/content/*`.
2. Run content sync script from repo root:
	- `node scripts/sync-content.mjs`
3. Run docs locally with config file:
	- `uv run mkdocs serve -f config/mkdocs.yml`
