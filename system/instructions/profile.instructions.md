# profile.instructions.md

## Scope

Applies to profile content and related branding references:

- /profile/README.md
- root /README.md mirror behavior for GitHub special repository rendering

## Update Rules

- Keep profile claims professional and verifiable.
- Keep contact and social links consistent.
- Keep references to governance pointing to /system files.
- Avoid decorative clutter that hurts readability.

## Allowed Actions

- Update professional summary, links, and profile sections.
- Improve readability and consistency in profile markdown.
- Mirror profile content to root README when profile display behavior is required.

## Forbidden Actions

- Do not introduce unverifiable claims.
- Do not break profile-visible links or badges.
- Do not replace profile source with app-specific duplicated content.

## Validation Checklist

- Markdown renders without broken links.
- Governance references resolve to /system/*.
- Profile links to web/docs remain current.
- No duplicated profile content across unrelated files.

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

- If mirrored root README diverges from profile intent:
	- treat /profile/README.md as source
	- resync root README from profile source
- If link validation fails:
	- replace with stable canonical URLs
