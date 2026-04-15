# Guide Quality Standard

Every guide under `/content/guides` must meet this standard.

## Required Frontmatter

- `title`: human-readable title
- `status`: `active` | `complete` | `incomplete`
- `stack`: topic tags (strings)

## Optional Frontmatter (Recommended)

- `priority`: `P0` | `P1` | `P2` (see /system/GUIDE_PRIORITY.md)

## Required Sections (H2)

Each guide MUST include these sections in this order.

## Why This Matters
- Explain where this shows up in real projects
- Explain what breaks if ignored

## Core Concepts
- Definitions and mental models
- Clarify key terms

## Implementation Checklist
- Concrete steps
- What to measure
- What “good” looks like

## Common Failure Modes
- Symptoms
- Root causes
- Mitigations

## Examples
- Short examples (pseudo-code is OK)
- Prefer realistic constraints over toy demos

## Key Takeaway
- One paragraph summary

## Tone and Style

- Professional, clear, technical
- Prefer concrete, production-oriented guidance
- Avoid hype, vague claims, and marketing tone
- Use short paragraphs and checklists where helpful

## Anti-Duplication Rule

- Do not create multiple guides for the same topic.
- If overlap is detected, consolidate into one guide and remove redundant content.
