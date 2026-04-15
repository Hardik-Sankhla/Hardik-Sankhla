# TASK_TEMPLATES.md

Reusable prompt templates for any AI agent working in this repository.

## How To Use

1. Start with: read system protocol and do updates.
2. Select a template below.
3. Replace placeholder values.
4. Require validation output in the final response.

## Template: Add New Project

Task:

- Read system protocol and do updates.
- Read /system/instructions/content.instructions.md.
- Add one new file at /content/projects/<project-slug>.md.
- Include metadata: title, summary, status, stack.
- Include sections: Problem, Approach, Architecture, Tech Stack, Results, Learnings.
- Run: node scripts/sync-content.mjs and mkdocs build -f config/mkdocs.yml.
- Return changed files and validation results.

## Template: Improve UI

Task:

- Read system protocol and do updates.
- Read /system/instructions/web.instructions.md.
- Improve spacing, hierarchy, and readability in the requested page.
- Do not change architecture or add frameworks.
- Run: npm run build in /apps/web.
- Return changed files and validation results.

## Template: Update Docs

Task:

- Read system protocol and do updates.
- Read /system/instructions/docs.instructions.md.
- Improve docs navigation or page structure in scope.
- Keep /config/mkdocs.yml as source for docs configuration.
- Run: node scripts/sync-content.mjs and mkdocs build -f config/mkdocs.yml.
- Return changed files and validation results.

## Template: Fix Issue

Task:

- Read system protocol and do updates.
- Identify impacted scope and read matching instruction file.
- Apply minimal fix only.
- Run only required validations for touched surfaces.
- Return root cause, changed files, and validation results.

## Template: Add Guide

Task:

- Read system protocol and do updates.
- Read /system/instructions/content.instructions.md.
- Add one guide at /content/guides/<guide-slug>.md.
- Include metadata: title, summary, status, stack.
- Keep structure clear and implementation-focused.
- Run: node scripts/sync-content.mjs and mkdocs build -f config/mkdocs.yml.
- Return changed files and validation results.
