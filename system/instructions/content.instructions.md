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

## Validation Checklist

- File names are stable and slug-like.
- Required metadata is present.
- node scripts/sync-content.mjs passes.
- mkdocs build -f config/mkdocs.yml passes for docs-facing content updates.
