---
applyTo: "apps/web/**"
description: "Use when editing portfolio web app files, UI, links, and web deployment behavior."
---

# Website Update Instructions

## Scope

These instructions apply to portfolio web app files in `apps/web`.

## Rules

- Keep web files inside `apps/web` only.
- Keep asset references under `apps/web/assets/`.
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
