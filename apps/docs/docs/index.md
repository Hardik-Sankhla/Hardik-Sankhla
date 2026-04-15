# Hardik Sankhla Docs

This documentation platform is powered by MkDocs and sourced from canonical content in `/content`.

It is designed to document how AI systems are built, shipped, and improved in production.

## Platform Areas

- **Guides**: practical write-ups for production AI and ML engineering workflows.
- **Projects**: implementation-focused case studies with problem, approach, stack, and outcomes.
- **Courses**: structured learning tracks and roadmaps.

## Quick Navigation

- [Open Guides](guides.md)
- [Open Projects](projects.md)
- [Open Courses](courses.md)
- [Back to Portfolio](https://hardik-sankhla.github.io)

## Content Flow

1. Add or update canonical markdown under `/content/*`.
2. Sync generated docs pages from source content:
   - `node scripts/sync-content.mjs`
3. Run docs locally from repository root:
   - `mkdocs serve -f config/mkdocs.yml`
