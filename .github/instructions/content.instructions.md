---
applyTo: "content/**"
description: "Use when adding or editing centralized content consumed by web/docs/profile surfaces."
---

# Content Instructions

## Core Rule

`/content` is the single source of truth.

## Allowed Changes

- Add or update projects in `content/projects`
- Add or update blogs in `content/blogs`
- Add or update guides in `content/guides`
- Add or update courses in `content/courses`

## Forbidden Patterns

- Duplicating content into `apps/web` or `apps/docs`
- Adding disconnected content copies under archive folders
- Creating inconsistent naming styles

## Validation

- Ensure markdown frontmatter is present for content items.
- Ensure slug-style filenames and stable naming.
- Ensure linked references from app surfaces remain valid.
