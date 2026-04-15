# Portfolio Repository Operations

This document is the human-facing companion to `AGENTS.md`.

## Update Types and Required Touchpoints

### 1. Profile Content Update

When editing personal branding/content:

- Update `profile/README.md`
- Update root `README.md` platform links if needed
- Verify social/contact links

### 2. Website UI Update

When editing website layout/behavior:

- Update files under `apps/web`
- Keep public assets in `apps/web/public/assets`
- Validate links and responsive behavior

### 3. Asset Update

When adding images/files:

- Place under `apps/web/public/assets/images/`
- Update any references in `profile/README.md` and `apps/web`

### 4. Structure/Policy Update

When changing repo workflow:

- Update `AGENTS.md`
- Update `.github/copilot-instructions.md`
- Update relevant `.github/instructions/*.instructions.md`

## Pre-Push Checklist

- [ ] No placeholder links (`href="#"`).
- [ ] No broken image/script/style paths.
- [ ] Profile links are current and valid.
- [ ] Local preview runs and key sections render.
- [ ] Branch name follows strategy in `AGENTS.md`.

## Deployment Notes

Deployment is branch-based by surface:

- `web` branch -> Vercel (`apps/web`)
- `docs` branch -> GitHub Pages (`apps/docs`)
- `profile` branch -> GitHub profile rendering
