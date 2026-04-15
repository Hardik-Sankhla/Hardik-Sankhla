# Copilot Instructions (Canonical)

Read /system/AGENT_PROTOCOL.md before making changes.

## Always Do

1. Keep changes in scope and architecture-safe.
2. Keep main as the single source of truth.
3. Preserve content-first behavior (/content is canonical).
4. Run validation commands for touched surfaces.
5. Return changed files and validation status.

## Scope Selection

Use /system/instructions:

- content.instructions.md
- web.instructions.md
- docs.instructions.md
- profile.instructions.md

## Never Do

- Do not duplicate canonical content in app folders.
- Do not create new branches unless explicitly asked.
- Do not introduce branch-specific governance logic.
- Do not introduce new frameworks for routine updates.
