# Implementation Prompt: Extract Lesson Summary Types

## Goal

Make lesson list fields reusable and ensure standalone lesson data includes the
complete lesson summary shape.

## Skills and documentation reviewed

- `sanity-best-practices`
- `.agents/skills/sanity-best-practices/references/groq.md`
- `node_modules/next/dist/docs/01-app/01-getting-started/06-fetching-data.md`
- `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md`

## Existing code inspected

- `sanity/lib/data.ts` currently defines lesson fields inline in
  `CourseModule.lessons` as nullable array elements.
- `Lesson` currently extends `Omit<CourseModule['lessons'][number], '_id'>`,
  which derives from the nullable element and omits summary fields such as
  `duration`, `freePreview`, and `thumbnail`.
- `sanity/lib/queries.ts` projects those fields for course module lessons and
  standalone lessons.
- The working tree is clean before this change.

## Decision

Extract the non-nullable `LessonSummary` interface and use it as the shared
shape for module entries and `Lesson`.

## Expected files to touch

- `sanity/lib/data.ts`
- `prompts/fix-lesson-summary-types.md`

## Requirements and security

- Define `LessonSummary` with `_id`, `title`, `slug`, optional nullable
  `duration`, `freePreview`, and `thumbnail`.
- Set `CourseModule.lessons` to `Array<LessonSummary | null>`.
- Make `Lesson` extend `LessonSummary`; retain its existing additional fields.
- Do not change queries, runtime behavior, credentials, or other data types.

## Acceptance criteria

- Lesson summaries are represented by one exported, non-nullable interface.
- Module lesson references may remain null as currently modeled.
- `Lesson` statically retains all fields in the summary contract.
- Type-check, focused lint, and whitespace checks pass.

## Checks

- `npx tsc --noEmit`
- `npx eslint sanity/lib/data.ts`
- `git diff --check`

## Manual test steps

1. Run the root TypeScript check.
2. Confirm `CourseModule.lessons` accepts either a summary or `null`.
3. Confirm `Lesson` exposes `duration`, `freePreview`, and `thumbnail` along
   with its existing detail fields.
