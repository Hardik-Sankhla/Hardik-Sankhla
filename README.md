# Hardik Sankhla Repository Ecosystem

Production-grade, content-first monorepo for portfolio, docs, and profile surfaces.

## Final Architecture

```text
/apps
  /web
  /docs

/content
  /projects
  /guides
  /courses

/profile

/system
  AGENT_PROTOCOL.md
  AGENTS.md
  AI_RULES.md
  OPERATIONS.md
  copilot-instructions.md
  /instructions
    content.instructions.md
    web.instructions.md
    docs.instructions.md
    profile.instructions.md

/scripts
/config
/archive
```

## Source Model

- main is the single source of truth for development.
- Deployment targets are configured by platform tooling, not by branch specialization.
- /content is canonical for projects, guides, and courses.

## Agent Workflow

Entry command contract:

- read system protocol and do updates

Agent flow:

1. Read /system/AGENT_PROTOCOL.md.
2. Read matching instruction file under /system/instructions.
3. Apply in-scope changes only.
4. Validate touched surfaces.
5. Report changed files and validation output.

## Triggering Agents

Use explicit scope language in prompts, for example:

- Update content using /system/instructions/content.instructions.md
- Update web using /system/instructions/web.instructions.md
- Update docs using /system/instructions/docs.instructions.md
- Update profile using /system/instructions/profile.instructions.md

## Deployment Model

- Web app deploy target: /apps/web (Vercel)
- Docs deploy source: /config/mkdocs.yml (GitHub Pages pipeline)
- Profile source: /profile/README.md

## Non-Negotiable Rules

- No canonical content duplication outside /content.
- No branch creation by agents unless explicitly requested.
- No branch-specific governance logic.
- No framework changes for routine updates.
