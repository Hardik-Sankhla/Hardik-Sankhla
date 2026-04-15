## Pre-Push Local Preview (REQUIRED)

Before any push, agent MUST:

### Web (Vercel)
- Run: npm run build
- Optionally: npm run dev for UI validation

### Docs (GitHub Pages)
- Run: node scripts/sync-content.mjs
- Run: mkdocs build -f config/mkdocs.yml
- Optionally: mkdocs serve -f config/mkdocs.yml

### Profile (GitHub README)
- Verify markdown renders correctly
- Verify all links resolve
- If dependent on web/docs, ensure those builds pass

### Global Validation
- No broken links
- No missing content
- No inconsistent structure

❌ DO NOT push if any check fails
