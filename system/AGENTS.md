# AGENTS.md

Canonical operating guide for human contributors and any AI coding agent.

## System Purpose

This repository is an agent-orchestrated personal platform with three surfaces and one canonical content layer:

- Profile source: /profile/README.md
- Portfolio app: /apps/web
- Documentation app: /apps/docs
- Canonical content: /content

## Architecture Contract

- /content is the single source of truth for content.
- Applications consume content; they do not duplicate content.
- Governance is centralized in /system.

## Source Control Contract

- main is the only source-of-truth branch for development.
- Deployment targets are environment configuration concerns, not branch concerns.
- Agents must not create branches unless explicitly requested by the user.

## Agent Workflow

1. Read /system/AGENT_PROTOCOL.md.
2. Read scope instruction in /system/instructions.
3. Apply in-scope updates only.
4. Validate touched surfaces.
5. Report changed files and checks.

## Reusable Task Prompts

For consistent behavior across tools and models, use /system/TASK_TEMPLATES.md.

## Safety Rules

- Do not duplicate content across folders.
- Do not add branch-specific governance.
- Do not recreate legacy structures.
- Do not overwrite unrelated files.

## Required Governance Files

- /system/AGENT_PROTOCOL.md
- /system/AGENTS.md
- /system/AI_RULES.md
- /system/OPERATIONS.md
- /system/copilot-instructions.md
- /system/instructions/content.instructions.md
- /system/instructions/web.instructions.md
- /system/instructions/docs.instructions.md
- /system/instructions/profile.instructions.md
