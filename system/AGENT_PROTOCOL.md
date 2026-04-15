# AGENT_PROTOCOL.md

This is the single entry point for all automated updates in this repository.

## Command Contract

When a user says: "read system protocol and do updates", every agent must do the following in order:

1. Read this file.
2. Read system governance files:
   - /system/AGENTS.md
   - /system/AI_RULES.md
   - /system/OPERATIONS.md
3. Read the matching scope instruction in /system/instructions.
4. Apply minimal, reversible updates in scope.
5. Run validation checks for changed surfaces.
6. Return changed files and validation status.

## Core Operating Model

- Main-only source control model: main is the single source of truth.
- Content-first architecture: /content is canonical for projects, guides, and courses.
- Multi-surface rendering model:
  - apps/web reads content
  - apps/docs reads generated docs content from canonical sources
  - profile/README.md is profile source

## Mandatory Enforcement

- No duplication of canonical content across app folders.
- No branch creation from agents unless explicitly requested by user.
- No branch-specific logic in governance.
- No structural rewrites unless explicitly requested.
- No introduction of new frameworks for routine updates.

## Scope Mapping

- Content work: /system/instructions/content.instructions.md
- Web work: /system/instructions/web.instructions.md
- Docs work: /system/instructions/docs.instructions.md
- Profile work: /system/instructions/profile.instructions.md

## Validation Baseline

- Links and paths resolve.
- apps/web build succeeds when web is touched.
- mkdocs build succeeds when docs/content are touched.
- sync-content script succeeds when content/docs are touched.
- No orphan or duplicated canonical content outside /content.
