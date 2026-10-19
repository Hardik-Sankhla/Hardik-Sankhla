# Initial Audit Report — Hardik-Sankhla/Hardik-Sankhla

**Date:** 2026-10-19  
**Auditor:** Hermes Agent  
**Repository:** https://github.com/Hardik-Sankhla/Hardik-Sankhla  
**Local Workspace:** /mnt/Storage/github/Hardik-Sankhla-repo (symlinked to /mnt/Storage/Hardik-Sankhla)

---

## 1. Filesystem & Environment Verification

| Check | Status | Details |
|-------|--------|---------|
| `/mnt/Storage/` exists | ✅ | 148G total, 68G available (54% used) |
| `/mnt/Storage/Hardik-Sankhla` | ✅ | Symlink to `/mnt/Storage/github/Hardik-Sankhla-repo` |
| Git version | ✅ | 2.53.0 |
| GitHub CLI (gh) | ✅ | 2.54.0, authenticated |
| Node.js / npm | ✅ | Available (Next.js 16.2.3 builds successfully) |
| Python / mkdocs | ✅ | Installed via pip (mkdocs 1.6.1, mkdocs-material 9.7.7) |

---

## 2. Repository State

| Property | Value |
|----------|-------|
| **Remote** | `https://github.com/Hardik-Sankhla/Hardik-Sankhla.git` (fetch/push) |
| **Default branch** | `main` |
| **Local branch** | `main` (tracking `origin/main`) |
| **Local HEAD** | `b197e0b` — "Improve web responsiveness and home logo navigation" |
| **Remote HEAD** | 2 commits ahead of local |
| **Git status** | Clean working tree (no untracked files) |
| **Local modifications** | Line-ending differences only (CRLF vs LF) in `.github/workflows/vercel-deploy.yml` and `README.md` |

### Divergence from Remote
- **Remote has extra file:** `.github/workflows/main.yml` (Pac-Man contribution graph generator, scheduled daily)
- **Local has:** CRLF line endings in 2 files (cosmetic, no functional difference)
- **Risk:** The remote Pac-Man workflow may be the cause of the latest failed CI run (2026-08-20)

---

## 3. Architecture Inventory

### Directory Structure
```
/mnt/Storage/github/Hardik-Sankhla-repo/
├── AGENTS.md                    → Redirects to /system/AGENTS.md
├── AI_RULES.md                  → Redirects to /system/AI_RULES.md
├── README.md                    ← Mirror of profile/README.md (via sync script)
├── profile/
│   └── README.md                ← **Authoritative GitHub profile source**
├── apps/
│   ├── web/                     ← Next.js 16 portfolio (Vercel deployment)
│   │   ├── app/                 ← App Router pages (/, /about, /guides, /projects)
│   │   ├── components/          ← React components
│   │   ├── lib/content.ts       ← Reads canonical content from /content
│   │   └── generated/           ← Generated projects.json (from sync-content.mjs)
│   └── docs/                    ← MkDocs Material site (GitHub Pages)
│       ├── docs/                ← Generated indexes (projects.md, guides.md, courses.md)
│       └── requirements.txt     ← mkdocs, mkdocs-material
├── content/                     ← **Canonical content source**
│   ├── projects/ (5 files)      ← Project case studies with frontmatter
│   ├── guides/ (4 files)        ← Implementation guides
│   ├── courses/ (2 files)       ← Learning roadmaps
│   ├── blogs/ (README only)     ← Placeholder
│   └── about.md                 ← About page content
├── config/
│   ├── mkdocs.yml               ← MkDocs config (site: hardik-sankhla.github.io)
│   ├── site-config.ts           ← Site configuration
│   └── OPERATIONS.md            → Redirects to /system/OPERATIONS.md
├── scripts/
│   ├── sync-content.mjs         ← Reads /content → writes apps/web/generated + apps/docs/docs
│   ├── sync-profile-readme.mjs  ← Copies profile/README.md → README.md
│   └── deploy.sh                ← Informational only
├── system/                      ← **Governance & agent instructions**
│   ├── AGENT_PROTOCOL.md        ← Single entry point for agents
│   ├── AGENTS.md                ← Agent governance
│   ├── AI_RULES.md              ← AI behavior rules
│   ├── OPERATIONS.md            ← Human operating guide
│   ├── REPOSITORY_GUIDE.md      ← Architecture overview
│   ├── copilot-instructions.md  ← Copilot guidance
│   ├── blocks/pre-push-validation.md
│   ├── instructions/            ← Scope-specific instructions
│   │   ├── content.instructions.md
│   │   ├── web.instructions.md
│   │   ├── docs.instructions.md
│   │   └── profile.instructions.md
│   ├── prompts/                 ← Content generation prompts
│   └── GUIDE_*.md               ← Guide standards
├── archive/                     ← Legacy artifacts (preserved)
│   ├── legacy-root/             ← Old Jekyll-style site
│   └── markdown-resources/      ← Old profile assets
├── .github/
│   └── workflows/
│       └── vercel-deploy.yml    ← CI/CD: quality gate + Vercel preview/production
└── .gitignore                   ← Standard (node_modules, .env, .next, dist, site, .vercel)
```

---

## 4. Source-of-Truth Map

| Surface | Authoritative Source | Sync Mechanism |
|---------|---------------------|----------------|
| **GitHub Profile README** | `profile/README.md` | `scripts/sync-profile-readme.mjs` → `README.md` |
| **Portfolio (Web)** | `content/projects/*.md`, `content/guides/*.md`, `content/courses/*.md` | `scripts/sync-content.mjs` → `apps/web/generated/projects.json` + `apps/docs/docs/*.md` |
| **Documentation Site** | Same as above | `mkdocs build -f config/mkdocs.yml` reads `apps/docs/docs/` |
| **Vercel Deployment** | `apps/web/` + generated content | GitHub Actions: `.github/workflows/vercel-deploy.yml` |

### Key Architecture Principles (from system/AGENT_PROTOCOL.md)
- `main` is the single source-of-truth branch
- `/content` is canonical for projects, guides, courses
- `/apps/web` and `/apps/docs` **consume** canonical content (no duplication)
- `/profile/README.md` is the profile source
- **No canonical content duplication outside `/content`**
- **No branch creation by agents unless explicitly requested**

---

## 5. Content Inventory

### Projects (5) — All `status: active`
| Slug | Title | Stack | Summary Quality |
|------|-------|-------|-----------------|
| ai-powered-chatbot | AI-Powered Chatbot | Python, LangChain, OpenAI, FastAPI | ✅ Detailed: problem, approach, architecture, results, learnings |
| computer-vision-system | Computer Vision System | Python, YOLOv8, OpenCV, TensorFlow | ✅ Detailed |
| llm-evaluation-observability-pipeline | LLM Evaluation & Observability Pipeline | Python, FastAPI, OpenTelemetry, PostgreSQL | ✅ Detailed |
| ml-recommendation-api-platform | ML Recommendation API Platform | Python, Scikit-learn, FastAPI, Redis | ✅ Detailed |
| predictive-maintenance-mlops-system | Predictive Maintenance MLOps System | Python, XGBoost, Airflow, Docker | ✅ Detailed |

### Guides (4) — All `status: active`
- From ML Model to Real Product
- How to Build AI Systems in Production
- System Design for AI Engineers
- Guides Hub (index)

### Courses (2) — All `status: active`
- AI Systems Engineering Roadmap
- Courses Hub (index)

---

## 6. CI/CD & Automation Status

| Workflow | Status | Notes |
|----------|--------|-------|
| **Vercel Deploy** (`.github/workflows/vercel-deploy.yml`) | ⚠️ Last run failed (2026-08-20) | Quality gate: sync-content + npm run build. Latest local builds **pass**. |
| **Pac-Man Generator** (`.github/workflows/main.yml` — remote only) | ❓ Unknown | Scheduled daily, writes to `output` branch. May conflict with Vercel workflow. |
| **GitHub Pages (Docs)** | Not configured as workflow | Manual: `mkdocs build -f config/mkdocs.yml` → `config/site/` |

### GitHub Secrets (Verified Present)
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID` = `team_iKtGW0KINN5FkyjGeQrqvkL3`
- `VERCEL_PROJECT_ID` = `prj_KT51pawQj9rOakW7fd2cAKsAQ3zQ`

### Vercel Project Config (from OPERATIONS.md)
- Framework: Next.js
- Root Directory: `apps/web`
- No `vercel.json` at repository root (intentional)

---

## 7. Validation Results (Local)

| Check | Command | Result |
|-------|---------|--------|
| **Content Sync** | `node scripts/sync-content.mjs` | ✅ PASS — 5 projects, 4 guides, 2 courses |
| **MkDocs Build** | `mkdocs build -f config/mkdocs.yml` | ✅ PASS — Built to `config/site/` in 0.38s |
| **Next.js Build** | `npm run build` (in `apps/web`) | ✅ PASS — 14 static/SSG pages generated |
| **Profile Sync** | `node scripts/sync-profile-readme.mjs` | ✅ PASS — profile/README.md → README.md |
| **Secrets Scan** | `grep -r` for tokens/passwords | ✅ CLEAN — No secrets in tracked files |
| **Link Check (key URLs)** | `curl -I` | ✅ Portfolio, LinkedIn, Vercel, GitHub all return 200 |

---

## 8. Profile README Assessment

### Current State (from `profile/README.md`)
- **Banner:** LinkedIn background image (hosted in repo at `apps/web/public/assets/images/`)
- **Headline:** "Data Scientist | AI Engineer" with typing animation
- **About Me:** Python class representation (creative but readable)
- **Current Focus:** AI Intern at Gyan Netra, Agentic AI, LLMs/RAG, Final year B.Tech
- **Tech Stack:** 24 badges across Languages, AI/ML, Web, Cloud/DevOps
- **Featured Projects:** 2 projects (Dog Breed Predictor, Agentic AI Explorer) — **links point to user root, not specific repos**
- **Experience:** 3 roles (AI Intern, AWS Cloud Intern, Frontend Intern)
- **GitHub Stats:** 4 widget panels (stats, top langs, streak, trophies, activity graph)
- **Education:** B.Tech Data Science @ JIET (2022–2025)
- **Contact:** LinkedIn, GitHub, X, Portfolio (Wix), Email, PeerList, YouTube

### Issues Identified
1. **Featured project links** → `https://github.com/Hardik-Sankhla` (user root) instead of specific project repositories
2. **Dog Breed Predictor** and **Agentic AI Explorer** — not in `/content/projects/`; may be separate repos or placeholder projects
3. **GitHub stats widgets** — 5 external services; decorative, may impact load/privacy
4. **Typing SVG animation** — external dependency (readme-typing-svg.herokuapp.com)
5. **Wix portfolio** (`dataxhardik.wixsite.com`) — external, not the Vercel-deployed portfolio
6. **Education end date** shows 2025 (may be outdated if current year is 2026)
7. **Role** shows "AI Intern @ Gyan Netra" — verify if still current

---

## 9. Security & Hygiene Findings

| Area | Finding | Severity |
|------|---------|----------|
| **Tracked secrets** | None found | ✅ |
| **.env.local** | Contains `VERCEL_OIDC_TOKEN="***"` (masked) | ✅ In `.gitignore` |
| **.gitignore** | Covers node_modules, .env, .next, dist, site, .vercel | ✅ |
| **Large files** | No large binaries in Git history (verified via clean status) | ✅ |
| **Dependencies** | Next.js 16.2.3, React 18.3.1 — current | ✅ |
| **Workflow permissions** | Vercel workflow: `contents: read`, `pull-requests: write` | ✅ Minimal |

---

## 10. Risks & Blockers

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| **Remote Pac-Man workflow** | May cause CI failures, writes to `output` branch | High (already failed once) | Review/remove if not needed |
| **Local/remote line-ending drift** | Cosmetic only | Medium | Normalize to LF via `.gitattributes` |
| **Profile project links broken** | Visitors can't reach actual project repos | High | Update links to specific repos or remove if placeholder |
| **Wix portfolio vs Vercel portfolio** | Confusing dual presence | Medium | Decide on single portfolio URL |
| **Education date (2025)** | May appear outdated | Low | Verify and update if graduated |
| **No automated link checking** | Broken links may persist | Medium | Add link validator to CI |
| **MkDocs 2.0 warning** | Future breaking changes | Low | Monitor, no immediate action |

---

## 11. Recommended Priorities

### Phase 0 — Immediate (Pre-implementation)
1. **Investigate Pac-Man workflow failure** — Check if it should be removed or fixed
2. **Normalize line endings** — Add `.gitattributes` to enforce LF
3. **Verify current role/education status** — Confirm AI Intern at Gyan Netra and graduation date

### Phase 1 — Profile Professionalization
1. **Fix featured project links** — Point to actual repositories or replace with canonical projects from `/content/projects/`
2. **Consolidate portfolio URL** — Use `https://hardik-sankhla.vercel.app` (verified working) instead of Wix
3. **Audit GitHub stats widgets** — Keep only high-value ones (consider removing trophies/activity graph)
4. **Verify all external links** — LinkedIn, X, PeerList, YouTube, Email

### Phase 2 — Architecture & Maintainability
1. **Add `.gitattributes`** — Enforce LF line endings
2. **Document sync procedures** — Already in `/system/OPERATIONS.md` but could be more explicit
3. **Add link validation to CI** — Prevent broken links in profile/content
4. **Review Pac-Man workflow** — Remove if not providing value

### Phase 3 — Content Enhancement
1. **Feature canonical projects** — Replace placeholder projects with the 5 well-documented projects from `/content/projects/`
2. **Add project repository links** — Each project in `/content/projects/` should link to its source repo (if separate) or GitHub file
3. **Consider adding blog content** — `/content/blogs/` exists but empty

---

## 12. Next Steps

1. **Create architecture audit report** (`.maintenance/reports/architecture-audit.md`) — Detailed component inventory
2. **Fix line endings** — Add `.gitattributes` and normalize
3. **Investigate/remove Pac-Man workflow** — Check GitHub Actions logs for failure details
4. **Update profile README** — Fix project links, consolidate portfolio URL, verify professional info
5. **Run full validation suite** — Document in `.maintenance/reports/validation-report.md`
6. **Prepare publication proposal** — For user approval before any pushes

---

## 13. Approval Requirements

**No remote changes have been made.** All work so far is read-only inspection and local validation. The following will require explicit approval before execution:
- Pushing `.gitattributes` or line-ending fixes
- Modifying `profile/README.md` (and syncing to root `README.md`)
- Removing/updating `.github/workflows/main.yml` (Pac-Man workflow)
- Any Vercel/GitHub Pages deployment triggers
- GitHub Actions secret modifications

---

**End of Initial Audit Report**