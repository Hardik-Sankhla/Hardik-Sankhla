# AGENTS.md

This is the canonical operating guide for AI agents and contributors working in this repository.

## Repository Purpose

This repo serves two production surfaces:

1. GitHub profile presentation (`README.md` in default branch).
2. Portfolio website deployed via GitHub Pages from `gh-pages`.

## Branch Strategy

Use this branch model:

- `gh-pages`: production website + profile assets.
- `main`: stable source mirror and review branch.
- `develop`: active integration branch for non-trivial updates.
- `feature/<name>`: short-lived implementation branches.
- `hotfix/<name>`: urgent production fixes.

Do not create ad-hoc long-lived branches.

## Mandatory Update Protocol

For any meaningful change:

1. Update the target file(s).
2. Update related references and links.
3. Validate local preview.
4. Validate branch strategy and commit hygiene.
5. Push with clear commit message.

## Compulsory Files to Check

- `README.md` (profile content + maintainer links)
- `index.html` (portfolio entry page)
- `assets/css/style.css`
- `assets/js/script.js`
- `assets/images/*`
- `AGENTS.md`
- `.github/copilot-instructions.md`
- `.github/instructions/*.instructions.md`

## Content Quality Rules

- No placeholder links like `href="#"`.
- Keep external links valid and meaningful.
- Keep contact links consistent across profile and site.
- Maintain professional tone and clear visual hierarchy.

## Validation Before Push

1. Confirm no broken internal asset paths.
2. Run local static preview from repo root.
3. Smoke check key sections: hero, projects, experience, contact.
4. Confirm no unexpected file deletions.

## Local Preview

Use one of:

```powershell
python -m http.server 8000
```

or

```powershell
npx serve .
```

Then open `http://127.0.0.1:8000`.

## Commit Standards

Use concise prefixes:

- `feat:` new feature
- `fix:` bug fix
- `refactor:` structure cleanup
- `docs:` guidance or profile text updates
- `chore:` maintenance

## Branch Cleanup Policy

Delete stale remote branches after merge or replacement.
Keep only strategy branches and currently active work branches.

## Agent Command Contract

When user says: `Read respective guide and do updates`, agent must:

1. Read `AGENTS.md` and `.github/copilot-instructions.md` first.
2. Apply mandatory update protocol.
3. Run local validation.
4. Provide changed files and outcomes clearly.
