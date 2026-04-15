# Guide Priority System

Agents MUST prioritize guide improvements using this system.

## Priority Levels

### P0 (Highest)
Improve first.

- Foundational concepts (core mental models)
- Core system guides (reliable patterns used across projects)
- High-impact topics (commonly reused, high failure cost)

### P1
Improve after all eligible P0 work.

- Frequently used supporting guides
- Common implementation patterns and operational runbooks

### P2
Improve last.

- Niche topics
- Deep dives that are useful but not broadly blocking

## Improvement Order (within a priority)

1. Improve incomplete guides first
2. Improve unclear or weak guides
3. Improve formatting and structure
4. Add advanced insights last

## Metadata Support (Optional but Recommended)

Guides MAY include these frontmatter fields:

- `priority`: `P0` | `P1` | `P2`
- `status`: `complete` | `incomplete`

If present, agents MUST use these fields when ranking guides.

## Ranking Rules

1. Agents MUST scan all guides in `/content/guides` before choosing what to edit.
2. Agents MUST NOT randomly pick guides.
3. If `priority` exists, use it. Otherwise infer priority from topic impact:
   - Default to `P1` when unsure
   - Promote to `P0` if it is foundational/core/high-failure-cost
   - Demote to `P2` if it is clearly niche
4. If `status: incomplete`, treat it as higher urgency than `complete` within the same priority.
5. If multiple guides tie, pick the one with the largest clarity/structure gap first.

## Rule

Agents MUST follow priority order.
❌ Do NOT improve guides randomly.
