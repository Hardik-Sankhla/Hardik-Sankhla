# OPERATIONS.md

Human-facing operating guide for maintenance and release readiness.

## Surfaces

- Profile: /profile/README.md
- Web: /apps/web
- Docs: /apps/docs
- Canonical content: /content

## Standard Update Flow

1. Read /system/AGENT_PROTOCOL.md.
2. Make minimal in-scope changes.
3. Run required validation.
4. Summarize changed files and checks.

## Common Commands

From repository root:

- node scripts/sync-content.mjs
- mkdocs build -f config/mkdocs.yml

From /apps/web:

- npm run build

## Pre-Push Checklist

- No duplicated content outside /content.
- No branch-specific assumptions in docs/governance.
- No broken links/paths in touched files.
- Validation commands pass for touched surfaces.

See: /system/blocks/pre-push-validation.md

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

## Automated Vercel Deployment (GitHub Actions)

Workflow: `.github/workflows/vercel-deploy.yml`

Behavior:

- Pull requests to `main` that touch web/content files trigger a preview deployment.
- Pushes to `main` trigger a production deployment.
- Manual trigger (`workflow_dispatch`) runs quality gate + production deployment.
- Every deployment must pass the web quality gate (`sync-content` + `npm run build`) first.
- Quality gate fails if generated content is stale after sync (prevents drift between source and generated artifacts).
- Preview deployments automatically comment the preview URL on the PR.
- Runs are queued (not auto-cancelled) to avoid false "cancelled" check noise.

Required GitHub Secrets:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

Required Vercel values (current):

- Team ID (`VERCEL_ORG_ID`): `team_iKtGW0KINN5FkyjGeQrqvkL3`
- Project ID (`VERCEL_PROJECT_ID`): `prj_KT51pawQj9rOakW7fd2cAKsAQ3zQ`
- Framework: `nextjs` (project setting)
- Root Directory: `apps/web`
- Keep repository root free of `vercel.json` to avoid root-directory config conflicts.

## Agent Quickstart: Vercel Setup (Do This Exactly Once)

1. Create Vercel token in Account Settings > Tokens.
2. Set GitHub secrets by name (never use token value as secret name):

   - `gh secret set VERCEL_TOKEN --repo Hardik-Sankhla/Hardik-Sankhla`
   - `gh secret set VERCEL_ORG_ID --repo Hardik-Sankhla/Hardik-Sankhla --body "team_iKtGW0KINN5FkyjGeQrqvkL3"`
   - `gh secret set VERCEL_PROJECT_ID --repo Hardik-Sankhla/Hardik-Sankhla --body "prj_KT51pawQj9rOakW7fd2cAKsAQ3zQ"`

3. Confirm secrets are present:

   - `gh secret list --repo Hardik-Sankhla/Hardik-Sankhla`

4. Trigger and verify pipeline:

   - `gh workflow run "Vercel Deploy" --repo Hardik-Sankhla/Hardik-Sankhla --ref main`
   - `gh run list --repo Hardik-Sankhla/Hardik-Sankhla --workflow "Vercel Deploy" --limit 3`

## Agent Runbook: Fast Failure Diagnosis

If deploy fails, follow in order:

1. Check latest run:

   - `gh run list --repo Hardik-Sankhla/Hardik-Sankhla --workflow "Vercel Deploy" --limit 5`

2. Inspect failed logs:

   - `gh run view <run-id> --repo Hardik-Sankhla/Hardik-Sankhla --log-failed`

3. If error contains `No existing credentials found`:

   - `VERCEL_TOKEN` is missing/wrong. Reset with `gh secret set VERCEL_TOKEN ...`.

4. If error contains project not found/team mismatch:

   - Re-set `VERCEL_PROJECT_ID` and `VERCEL_ORG_ID` from Vercel Settings.

5. Re-run workflow after any secret fix.

## Public Access Checklist (Avoid 404/401 After Successful Deploy)

If CI is green but site is not publicly visible, verify in Vercel UI:

1. Domain assignment:

   - In Project > Settings > Domains, attach `hardik-sankhla.vercel.app` to this project.
   - Set it as Production and Primary.
   - If Vercel says domain already in use, remove it from old/stale project first.

2. Deployment protection:

   - In Project > Settings > Deployment Protection, disable auth gate for Production if site must be public.
   - A `401` with Vercel authentication page means protection is still enabled.

3. Confirm active production deployment:

   - Ensure latest `main` commit is marked Current in Vercel Deployments.
   - If marked Stale, promote/redeploy latest successful deployment.

4. Verify URLs:

   - `hardik-sankhla.vercel.app` should return `200`.
   - Project-generated deployment URLs may return `401` when protection is enabled.

## Common Mistakes To Avoid

- Do not paste token value as the secret NAME.
- Do not store tokens in markdown/docs/commits.
- If token is ever pasted in chat/terminal history, rotate it immediately.
- Keep Vercel project root as `apps/web` and framework as Next.js.
- Keep production deployment path through GitHub Actions (single source of truth).

Recommended hardening:

- Enable branch protection on `main`.
- Require status checks for the Vercel workflow before merge.
- Keep `production` environment protection enabled for manual approvals if needed.
