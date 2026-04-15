# Guide Improvement Prompt

You are improving an existing technical guide that already exists in `/content/guides`.

## Objective
Upgrade the guide to be:
- clearer
- more structured
- more practical
- more authoritative

## Requirements
1. Preserve the original topic intent and scope.
2. Improve clarity and logical flow.
3. Ensure the guide follows `/system/GUIDE_STANDARD.md` exactly.
4. Strengthen explanations with concrete, production-oriented details.
5. Add missing sections if needed (do not delete useful content).
6. Ensure frontmatter is present and consistent:
   - `title`
   - `status`
   - `stack` (topics)
   - (optional) `priority` (`P0`/`P1`/`P2`) when it is clear
7. Ensure formatting is clean:
   - consistent headings
   - short paragraphs
   - bullets/checklists where helpful

## Do Not
- Do not create a new guide file.
- Do not duplicate an existing topic under a new slug.
- Do not move guides outside `/content/guides`.
- Do not add marketing fluff or unverifiable claims.

## Output
Return the full updated markdown for the same file, including frontmatter.
