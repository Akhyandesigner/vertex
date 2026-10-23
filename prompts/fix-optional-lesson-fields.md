# Implementation Prompt: Make Optional Lesson Arrays Nullable

## Goal

Align the lesson detail type with optional Sanity arrays and their GROQ
projections.

## Skills and documentation reviewed

- `sanity-best-practices`
- `.agents/skills/sanity-best-practices/references/groq.md`
- `node_modules/next/dist/docs/01-app/01-getting-started/06-fetching-data.md`
- `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md`

## Existing code inspected

- `sanity/lib/data.ts` defines `Lesson.keyPoints` and `Lesson.resources` as
  required arrays.
- `studio/schemaTypes/documents/lesson.ts` defines both fields as optional
  arrays without required validation.
- `sanity/lib/queries.ts` projects each array directly.
- The working tree already contains the prior `LessonSummary` refactor in
  `sanity/lib/data.ts` and its approved prompt; preserve those changes.

## Decision

Mark `keyPoints` and `resources` optional and nullable, preserving their current
array element types.

## Expected files to touch

- `sanity/lib/data.ts`
- `prompts/fix-optional-lesson-fields.md`

## Requirements and security

- Type `keyPoints` as `Array<{ _key: string; title: string }> | null` and make
  the property optional.
- Type `resources` as the same existing object array unioned with `null` and
  make the property optional.
- Leave all other fields, queries, runtime behavior, and credentials unchanged.

## Acceptance criteria

- Missing or null lesson arrays are representable by the `Lesson` interface.
- Existing element field types remain unchanged.
- Type-check, focused lint, and whitespace checks pass.

## Checks

- `npx tsc --noEmit`
- `npx eslint sanity/lib/data.ts`
- `git diff --check`

## Manual test steps

1. Run the root TypeScript check.
2. Confirm `Lesson` accepts omitted or null `keyPoints` and `resources`.
3. Confirm existing key-point and resource element shapes remain unchanged.
