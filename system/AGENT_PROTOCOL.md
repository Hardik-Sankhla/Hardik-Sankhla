# AGENT_PROTOCOL.md

Single entry point for any AI model or coding agent working in this repository.

## Command Contract

Trigger phrase:

- read system protocol and do updates

Required execution order:

1. Read this file.
2. Read /system/AGENTS.md, /system/AI_RULES.md, and /system/OPERATIONS.md.
3. Read one or more scope files under /system/instructions.
4. Apply minimal, reversible changes inside scope.
5. Run required validations.
6. Report changed files, validations, and unresolved risks.

## System Model

- main is the source-of-truth branch.
- /content is canonical for projects, guides, and courses.
- /apps/web and /apps/docs consume canonical content.
- /profile/README.md is the profile source.

## Hard Constraints

- No canonical content duplication outside /content.
- No branch creation unless explicitly requested by user.
- No branch-specific governance logic.
- No architecture rewrites unless explicitly requested.
- No framework additions for routine updates.

## Scope Files

- /system/instructions/content.instructions.md
- /system/instructions/web.instructions.md
- /system/instructions/docs.instructions.md
- /system/instructions/profile.instructions.md

## Validation Baseline

- For content/docs changes:
  - node scripts/sync-content.mjs
  - mkdocs build -f config/mkdocs.yml
- For web changes:
  - npm run build in /apps/web
- For profile/readme changes:
  - Markdown links resolve and render correctly

## Failure Handling

- Missing content or metadata:
  - stop and report exact missing file/field
  - propose minimal fix in canonical /content path
- Build failure:
  - report root cause and impacted files
  - apply minimal fix and re-run validation
- Conflict with existing unrelated changes:
  - do not revert unrelated edits
  - continue only within requested scope and report assumptions
