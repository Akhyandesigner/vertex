# Implementation Prompt: Make Studio Environment References Static

## Goal

Ensure Sanity Studio production builds can statically replace project and
dataset environment references.

## Skills and documentation reviewed

- `sanity-best-practices`
- `.agents/skills/sanity-best-practices/references/project-structure.md`

## Existing code inspected

- `studio/sanity.env.ts` uses `process.env[name]` inside `requiredEnv`, which
  prevents static replacement of the environment variables used by Sanity.
- Project and dataset settings prefer `SANITY_STUDIO_*` values, then
  `NEXT_PUBLIC_*` fallbacks, trim whitespace, and throw a named missing-setting
  error if neither is configured.
- The API version uses explicit environment references and has its existing
  public-variable fallback and default.
- The worktree already contains unrelated, uncommitted lesson type changes in
  `sanity/lib/data.ts` and prompt files; leave them untouched.

## Decision

Pass explicit `process.env` values into the resolver instead of passing
environment-variable names. Trim each candidate and select the first non-empty
value to retain current project/dataset precedence and errors.

## Expected files to touch

- `studio/sanity.env.ts`
- `prompts/fix-studio-env-static-references.md`

## Requirements and security

- Reference each `SANITY_STUDIO_*` and `NEXT_PUBLIC_*` setting with a literal
  `process.env.NAME` expression.
- Preserve trimming, Studio-over-public fallback precedence, and current
  project/dataset missing-setting error messages.
- Keep the API-version references and fallback behavior unchanged.
- Do not print or alter environment values, change credentials, or touch the
  unrelated pending type edits.

## Acceptance criteria

- No computed/dynamic `process.env` access remains in `studio/sanity.env.ts`.
- Project ID and dataset resolve as before, including whitespace-only values.
- Studio type-check and diff whitespace check pass.

## Checks

- `npm --prefix studio run typecheck`
- `git diff --check`

## Manual test steps

1. Run the Studio type-check.
2. Inspect the build configuration to confirm all required environment lookups
   are literal `process.env` references.
3. With configured project settings, run the Studio build and verify it starts
   without a missing-setting error.
