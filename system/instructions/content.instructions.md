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

## Allowed Actions

- Add or update markdown files under /content/projects, /content/guides, /content/courses, /content/blogs.
- Improve wording, structure, and metadata clarity.
- Add links to source files when useful.

## Forbidden Actions

- Do not copy content into /apps/web or /apps/docs as a second source.
- Do not change folder architecture.
- Do not introduce branch-specific content logic.

## Validation Checklist

- File names are stable and slug-like.
- Required metadata is present.
- node scripts/sync-content.mjs passes.
- mkdocs build -f config/mkdocs.yml passes for docs-facing content updates.

## Failure Handling

- If metadata is missing or malformed:
	- stop and report exact file and field
	- fix only the affected canonical file
- If sync-content fails:
	- report failing collection/file
	- apply minimal schema-compliant fix and rerun
