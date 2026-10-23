# Implementation Prompt: Default Course Learning Outcomes

## Goal

Ensure `getCourseBySlug()` returns an array for `learningOutcomes` when a
Sanity course document omits that field.

## Skills and documentation reviewed

- `sanity-best-practices`
- `.agents/skills/sanity-best-practices/references/groq.md`
- `node_modules/next/dist/docs/01-app/01-getting-started/06-fetching-data.md`
- `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md`

## Existing code inspected

- `sanity/lib/queries.ts` defines `courseBySlugQuery`; its learning-outcomes
  projection currently uses `learningOutcomes[]{...}` without a fallback.
- `sanity/lib/data.ts` defines `Course.learningOutcomes` as a non-optional
  array and `getCourseBySlug()` returns the query result as `Course | null`.
- The working tree was clean before this change.

## Decision and assumption

Use `coalesce(learningOutcomes, [])[]` for this projection only. Preserve its
existing selected fields and leave all other query projections unchanged.

## Expected files to touch

- `sanity/lib/queries.ts`
- `prompts/fix-course-learning-outcomes-projection.md`

## Requirements and security

- Keep the query parameterized and server-side data access unchanged.
- Do not add dependencies, change schemas, alter other projections, or inspect
  secrets.
- The fallback must make absent or null `learningOutcomes` return an empty
  array, preserving the `Course` interface contract.

## Acceptance criteria

- `courseBySlugQuery` uses `coalesce(learningOutcomes, [])[]` while retaining
  `_key`, `icon`, `title`, and `description`.
- No other query fields or behavior are changed.
- Type-check and focused lint pass.

## Checks

- `npx tsc --noEmit`
- `npx eslint sanity/lib/queries.ts`
- `git diff --check`

## Manual test steps

1. Run a course-by-slug read for a course document with `learningOutcomes`
   absent or null.
2. Confirm the returned object has `learningOutcomes: []`.
3. Run the same read for a course with outcomes and confirm all projected
   entries and fields remain unchanged.
