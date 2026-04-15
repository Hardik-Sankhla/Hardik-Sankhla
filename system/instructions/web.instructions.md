# web.instructions.md

## Scope

Applies to web application files under /apps/web.

## Update Rules

- Keep functionality compatible with existing content pipeline.
- Consume canonical content from /content via existing readers/generated data.
- Keep responsive, semantic, and accessible markup.
- Do not hardcode localhost or environment-specific URLs.

## Allowed Actions

- Update UI layout, typography, spacing, and interaction polish.
- Improve metadata, semantic structure, and link quality.
- Refactor web-only code for readability without changing architecture.

## Forbidden Actions

- Do not add new frameworks or redesign architecture.
- Do not duplicate canonical content under /apps/web.
- Do not break / and /projects routing behavior.

## Validation Checklist

- npm run build passes in /apps/web.
- Internal links and CTA paths are valid.
- No content duplication introduced in /apps/web.
- Visual updates preserve layout consistency across sections.

## Failure Handling

- If build fails:
	- report exact error and file
	- apply minimal fix and rerun npm run build
- If data path/import fails:
	- restore canonical /content-driven read flow
	- avoid introducing fallback duplicates
