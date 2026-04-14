# Portfolio Repository Operations

This document is the human-facing companion to `AGENTS.md`.

## Update Types and Required Touchpoints

### 1. Profile Content Update

When editing personal branding/content:

- Update `README.md`
- Check `index.md` consistency
- Verify social/contact links

### 2. Website UI Update

When editing website layout/behavior:

- Update `index.html`
- Update `assets/css/style.css` and/or `assets/js/script.js`
- Validate links and responsive behavior

### 3. Asset Update

When adding images/files:

- Place under `assets/images/`
- Update any references in `README.md`, `index.md`, or `index.html`

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

This repository is deployed via GitHub Pages from `gh-pages`.
Keep `index.html` at repository root and include `.nojekyll` for static-only publishing.
