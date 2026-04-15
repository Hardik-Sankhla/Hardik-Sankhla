# Developer Setup

This repository uses a centralized content model:

- Source content lives in `/content`
- Web and docs views are generated from the same source using `scripts/sync-content.mjs`

## Required Tools

- Node.js 20+ and npm
- Python 3.11+ (or compatible)
- MkDocs and Material theme (`mkdocs`, `mkdocs-material`)

## First-Time Setup

From repository root:

```bash
node scripts/sync-content.mjs
```

Web dependencies:

```bash
cd apps/web
npm install
```

Docs dependencies (if not already available globally or in your venv):

```bash
python -m ensurepip --upgrade
python -m pip install --upgrade pip
python -m pip install mkdocs mkdocs-material
```

## Run Web

From repository root:

```bash
node scripts/sync-content.mjs
cd apps/web
npm run dev
```

Web app routes:

- `/`
- `/projects`

## Run Docs

From repository root:

```bash
node scripts/sync-content.mjs
mkdocs serve -f config/mkdocs.yml
```

## Build Checks

Web production build:

```bash
cd apps/web
npm run build
```

Docs build:

```bash
mkdocs build -f config/mkdocs.yml
```

## Common Errors And Fixes

### 1) `pip` missing in a virtual environment

Symptoms:

- `No module named pip`

Fix:

```bash
python -m ensurepip --upgrade
python -m pip install --upgrade pip
```

If environment is badly broken, recreate it:

```bash
python -m venv .venv
.venv\Scripts\activate
python -m pip install --upgrade pip
python -m pip install mkdocs mkdocs-material
```

### 2) Content sync fails with missing collection errors

Symptoms:

- `Required collection is missing`
- `No markdown files found`

Fix:

- Ensure these folders exist with at least one `.md` file each:
  - `/content/projects`
  - `/content/guides`
  - `/content/courses`

### 3) Content sync fails with malformed file errors

Symptoms:

- `title missing (frontmatter or # heading required)`

Fix:

- Add either:
  - `title:` in YAML frontmatter, or
  - a first-level markdown heading (for example `# My Title`)

### 4) Next.js dependency or audit warnings

Fix:

```bash
cd apps/web
npm install next@latest
npm audit fix
```

If a future major upgrade breaks locally, pin temporarily and re-test:

```bash
npm install next@<known-good-version>
npm run build
```
