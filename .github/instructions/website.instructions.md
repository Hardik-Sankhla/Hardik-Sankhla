---
applyTo: "index.html,assets/css/**/*.css,assets/js/**/*.js"
description: "Use when editing portfolio website UI, content, links, and static behavior in this repository."
---

# Website Update Instructions

## Scope

These instructions apply to the static portfolio website files.

## Rules

- Keep `index.html` as top-level entry file.
- Keep asset references under `assets/` only.
- Ensure no `href="#"` remains in production.
- Prefer semantic HTML and accessible labels.
- Preserve responsive behavior for mobile and desktop.

## Required Checks

1. Hero and navigation load correctly.
2. Project cards have real destination links.
3. Contact links are valid.
4. No console-breaking script changes.

## Update Consistency

When website content changes, verify whether matching profile updates are needed in `README.md`.
