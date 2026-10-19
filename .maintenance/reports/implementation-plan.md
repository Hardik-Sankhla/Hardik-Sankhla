# Prioritized Implementation Plan — Hardik-Sankhla/Hardik-Sankhla

**Date:** 2026-10-19  
**Based on:** Initial Audit + Architecture Audit  
**Status:** Planning — Awaiting User Approval for Remote Changes

---

## Phase 0: Environment & Safety Fixes (No User-Facing Changes)

### P0-1: Add `.gitattributes` for Line Ending Normalization
- **Risk:** Low | **Effort:** 5 min | **Approval:** Required for push
- Create `.gitattributes` enforcing LF for all text files
- Normalize existing CRLF files in one commit

### P0-2: Remove Pac-Man Workflow from Remote
- **Risk:** Medium | **Effort:** 10 min | **Approval:** Required
- Delete `.github/workflows/main.yml` from GitHub (remote only)
- Workflow causes CI failures, writes to `output` branch, broad permissions
- No local copy exists — already removed or never synced

### P0-3: Verify Current Professional Status
- **Risk:** Low | **Effort:** 5 min | **Approval:** Info only
- Confirm: AI Intern at Gyan Netra (current?)
- Confirm: B.Tech graduation (2025 or 2026?)
- Update profile if changed

---

## Phase 1: Profile Professionalization (High User Impact)

### P1-1: Replace Featured Projects with Canonical Projects
- **Risk:** Low | **Effort:** 30 min | **Approval:** Required
- Current: 2 placeholder projects (Dog Breed Predictor, Agentic AI Explorer) linking to user root
- New: Feature 2-3 projects from `content/projects/` with real GitHub links
- Each project in `content/projects/` needs a `repo_url` or `github_url` frontmatter field added

### P1-2: Consolidate Portfolio URL
- **Risk:** Low | **Effort:** 5 min | **Approval:** Required
- Replace Wix badge (`dataxhardik.wixsite.com`) with Vercel URL (`hardik-sankhla.vercel.app`)
- Verified: Vercel deployment returns HTTP 200

### P1-3: Audit & Streamline GitHub Stats Widgets
- **Risk:** Low | **Effort:** 10 min | **Approval:** Required
- Current: 5 widget panels (stats, top langs, streak, trophies, activity graph)
- Recommendation: Keep stats + top langs; remove streak, trophies, activity graph
- Rationale: Reduce external dependencies, load time, privacy exposure

### P1-4: Verify All External Links
- **Risk:** Low | **Effort:** 10 min | **Approval:** Required
- LinkedIn ✅, GitHub ✅, X (AIDrivenHardik), PeerList, YouTube, Email
- Test each and fix/remove broken ones

### P1-5: Update Education Date if Needed
- **Risk:** Low | **Effort:** 2 min | **Approval:** Required
- Current: "(2022–2025)" — verify if graduated or currently 2026

---

## Phase 2: Architecture & CI Improvements

### P2-1: Add Repository Link Field to Project Frontmatter
- **Risk:** Low | **Effort:** 15 min | **Approval:** Required
- Add `repo_url` or `github_url` to each `content/projects/*.md`
- Update `sync-content.mjs` to propagate to generated outputs
- Update web/components to display project links

### P2-2: Add Automated Link Validation to CI
- **Risk:** Low | **Effort:** 30 min | **Approval:** Required
- Add `markdown-link-check` or similar to Vercel workflow quality gate
- Validate profile README, content files, generated docs

### P2-3: Add MkDocs Deployment Workflow
- **Risk:** Low | **Effort:** 20 min | **Approval:** Required
- Create `.github/workflows/docs-deploy.yml` for GitHub Pages
- Trigger on `content/**`, `config/mkdocs.yml`, `apps/docs/**` changes
- Use `ghp-import` to push `config/site/` to `gh-pages` branch

### P2-4: Document Maintenance Procedures
- **Risk:** Low | **Effort:** 20 min | **Approval:** Not required (local docs)
- Create `.maintenance/procedures/maintenance-cycle.md`
- Document: verification steps, update flows, validation commands

---

## Phase 3: Content Enhancement

### P3-1: Add Blog Content (Optional)
- **Risk:** Low | **Effort:** Variable | **Approval:** Optional
- Populate `content/blogs/` with technical posts
- Integrate into web app and docs site

### P3-2: Enhance Project Pages with Repository Links
- **Risk:** Low | **Effort:** 30 min | **Approval:** Required
- Each project page (`/projects/[slug]`) should link to source repo
- Requires P2-1 first

---

## Dependency Graph

```
P0-1 (.gitattributes) ──────────────────────────────┐
P0-2 (Remove Pac-Man) ─────────────────────────────┤  Independent, can run in parallel
P0-3 (Verify Status) ──────────────────────────────┘
                                                      │
                                                      ▼
P1-2 (Portfolio URL) ◄── P1-3 (Stats Widgets) ◄── P1-4 (Link Audit) ── P1-5 (Education Date)
       │                    │                       │
       └────────────────────┴───────────────────────┘
                              │
                              ▼
P1-1 (Canonical Projects) ◄── P2-1 (Add repo_url to frontmatter)
       │
       ▼
P3-2 (Enhance Project Pages)
                              │
                              ▼
P2-2 (Link Validation CI) ◄── P2-3 (MkDocs Deploy Workflow)
                              │
                              ▼
P2-4 (Maintenance Docs)
```

---

## Approval Gates

| Gate | Requires Approval | Description |
|------|-------------------|-------------|
| **Gate 0** | ✅ Yes | Push `.gitattributes` + normalize line endings |
| **Gate 1** | ✅ Yes | Delete remote Pac-Man workflow |
| **Gate 2** | ✅ Yes | Profile README changes (P1-1 through P1-5) |
| **Gate 3** | ✅ Yes | Frontmatter schema change + sync script update (P2-1) |
| **Gate 4** | ✅ Yes | CI/CD workflow additions (P2-2, P2-3) |

---

## Validation Checklist (Pre-Push for Each Gate)

- [ ] `node scripts/sync-content.mjs` — passes
- [ ] `mkdocs build -f config/mkdocs.yml` — passes
- [ ] `npm run build` (in `apps/web`) — passes
- [ ] `node scripts/sync-profile-readme.mjs` — passes
- [ ] `git diff --exit-code` — no unintended changes
- [ ] All external links in modified files return 200/301
- [ ] No secrets in diff

---

## Rollback Strategy

| Change | Rollback Method |
|--------|-----------------|
| `.gitattributes` | `git revert <commit>` |
| Pac-Man workflow deletion | Re-add from GitHub UI or `git restore` |
| Profile README | `git revert <commit>` + re-sync |
| Frontmatter schema | `git revert <commit>` (backward compatible) |
| CI workflows | `git revert <commit>` or disable in GitHub UI |

---

## Success Criteria

1. **Clean CI:** All GitHub Actions pass on `main`
2. **Accurate Profile:** Professional info verified, links working, canonical projects featured
3. **Single Portfolio:** Vercel URL only, no Wix
4. **Maintainable:** `.gitattributes` prevents drift, link validation catches broken URLs
5. **Documented:** Maintenance procedures captured for future sessions

---

**Next Action:** Request user approval for Gate 0 (P0-1, P0-2) and Gate 2 (P1-1 through P1-5) to proceed with implementation.