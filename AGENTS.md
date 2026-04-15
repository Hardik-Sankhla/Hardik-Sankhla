# AGENTS.md

This is the canonical operating system for all AI agents and contributors working in this repository.

---

# 🧠 SYSTEM PURPOSE

This repository is a **multi-surface personal ecosystem**, not a single website.

It powers:

1. GitHub Profile (`/profile/README.md`)
2. Portfolio Website (Next.js → Vercel)
3. Documentation / Academy (MkDocs → GitHub Pages)
4. Central Knowledge System (`/content`)

---

# ⚠️ CORE PRINCIPLE (NON-NEGOTIABLE)

> **Single Source of Truth = `/content`**

All:

* projects
* blogs
* guides
* courses

MUST live in `/content`.

Apps only READ from content.
Apps MUST NOT duplicate content.

---

# 🧱 REPOSITORY ARCHITECTURE

/apps
/web        → Next.js portfolio (Vercel)
/docs       → MkDocs documentation (GitHub Pages)

/content
/projects
/blogs
/guides
/courses

/profile
README.md   → GitHub profile

/config
/scripts

---

# 🌿 BRANCH STRATEGY (STRICT)

Allowed branches ONLY:

* `main` → source of truth
* `dev` → active development
* `web` → deployment (Vercel)
* `docs` → deployment (GitHub Pages)
* `profile` → GitHub profile rendering

Feature branches:

* `feat/<scope>`
* `fix/<scope>`
* `refactor/<scope>`

❌ NEVER create:

* random branch names
* long-lived experimental branches
* old branches like `develop`, `gh-pages`, `portfolio`

---

# 🔁 AGENT OPERATING RULES

## 1. Before Doing Anything

Agent MUST read:

* `AGENTS.md`
* `.github/copilot-instructions.md`

---

## 2. When Making Changes

Agent MUST:

1. Identify affected surface:

   * profile / web / docs / content

2. Update ALL dependent references:

   * links
   * navigation
   * README

3. NEVER:

   * duplicate content across folders
   * recreate deleted branches
   * introduce legacy structure (like root `index.html` unless explicitly required)

---

## 3. Content Handling Rules

* Content lives ONLY in `/content`
* Use structured formats (MD / MDX)
* Keep naming consistent

Example:

/content/projects/ai-agent-platform.md

---

## 4. App Responsibilities

### `/apps/web`

* Renders portfolio
* Uses content dynamically

### `/apps/docs`

* Renders guides / academy
* Uses MkDocs

### `/profile`

* Minimal, clean, high-signal branding

---

# 🚀 DEPLOYMENT RULES

* `web` branch → Vercel deploy
* `docs` branch → GitHub Pages
* `profile` branch → GitHub profile

`main` NEVER directly deploys

---

# 🧪 VALIDATION BEFORE PUSH

Agent MUST verify:

1. No broken links
2. No duplicated content
3. Correct branch usage
4. Navigation consistency
5. No orphan files

---

# 🧾 COMMIT STANDARD

Use:

* `feat:` new capability
* `fix:` bug fix
* `refactor:` structural change
* `docs:` content or documentation
* `chore:` maintenance

---

# 🧹 BRANCH HYGIENE

* Delete merged branches
* Do NOT keep stale branches
* Do NOT recreate removed branches

---

# 🤖 AI SAFETY RULES (CRITICAL)

Agents MUST NOT:

* recreate deleted folders or branches
* generate duplicate versions of same content
* assume old repo structure
* create placeholder or dummy links
* overwrite unrelated files

---

# 📣 AGENT COMMAND CONTRACT

When user says:

"Read respective guide and do updates"

Agent MUST:

1. Read AGENTS.md + copilot instructions
2. Identify scope (web/docs/profile/content)
3. Apply changes respecting architecture
4. Update all dependencies
5. Validate system integrity
6. Return:

   * changed files
   * summary of impact
   * next recommendations

---

# ✅ REQUIRED CONTROL FILES

Agent must ensure these remain synchronized after branch or architecture changes:

* `README.md`
* `AI_RULES.md`
* `.github/copilot-instructions.md`
* `.github/instructions/website.instructions.md`
* `.github/instructions/profile-readme.instructions.md`
