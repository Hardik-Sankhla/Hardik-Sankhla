# Hardik Sankhla Repository Ecosystem

Production-grade monorepo for Hardik Sankhla's personal AI systems ecosystem.

## System Surfaces

- Profile surface: `profile/README.md`
- Portfolio app: `apps/web`
- Docs and academy app: `apps/docs`
- Shared source-of-truth content: `content/*`

## Architecture

```text
/apps
  /web
  /docs

/content
  /projects
  /blogs
  /guides
  /courses

/profile
  README.md

/config
/scripts
```

## Branch Strategy (Strict)

- `main` -> source of truth, no direct deployment
- `dev` -> active development integration
- `web` -> portfolio deployment branch (Vercel)
- `docs` -> documentation deployment branch (GitHub Pages)
- `profile` -> GitHub profile presentation branch

Allowed short-lived branches only:

- `feat/<scope>`
- `fix/<scope>`
- `refactor/<scope>`

## Platforms

- Portfolio: deploy from `web`
- Docs: deploy from `docs`
- Profile: render from `profile` (root `README.md` in that branch)

## Profile Branch Note

On the `profile` branch, run `scripts/sync-profile-readme.ts` before push so root `README.md` mirrors `profile/README.md` for GitHub profile rendering.

## Mandatory Agent Governance Files

- `AGENTS.md`
- `AI_RULES.md`
- `.github/copilot-instructions.md`
- `.github/instructions/profile-readme.instructions.md`
- `.github/instructions/website.instructions.md`

## Mandatory Operational Rule

All projects, blogs, guides, and courses must be created under `content/` only.
Apps must consume content and must not duplicate content.
