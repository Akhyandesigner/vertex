# Implementation Prompt: Vertex Sanity Content Model and Read Data Layer

## Goal

Implement Vertex's Sanity content model and authoring Studio for courses, embedded modules, lessons, instructors, and categories, plus a typed server-only Sanity read client and data helpers for the Next.js app.

## Skills and documentation reviewed

- `sanity-best-practices`
- `.agents/skills/sanity-best-practices/references/schema.md`
- `.agents/skills/sanity-best-practices/references/nextjs.md`
- `.agents/skills/sanity-best-practices/references/project-structure.md`
- `.agents/skills/sanity-best-practices/references/groq.md`
- `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md`
- `node_modules/next/dist/docs/01-app/01-getting-started/06-fetching-data.md`

## Existing code and configuration inspected

- `sanity/schemaTypes/index.ts` is currently empty.
- `sanity/lib/client.ts` uses a public-configured client without a read token; `sanity/lib/live.ts` enables `defineLive` without server/browser token configuration.
- `sanity/env.ts`, `sanity/lib/image.ts`, `sanity/structure.ts`, `sanity.config.ts`, and `sanity.cli.ts` form an uncommitted embedded-Studio scaffold.
- `app/studio/[[...tool]]/page.tsx` mounts the Studio inside Next.js.
- `package.json` and `package-lock.json` contain uncommitted Sanity dependency changes; `HEAD:package.json` has only the Next.js application dependencies.
- The root Next.js app uses the repository root as its web workspace; no `studio/` workspace currently exists.
- `.env.local` was not opened or values disclosed. Its variable names were inspected: Clerk's public/secret keys and Sanity's public project ID and dataset are configured, but `SANITY_API_READ_TOKEN` is not present.
- The existing prompt `prompts/fix-sanity-create-command.md` is unrelated and must remain untouched.

## Decisions and assumptions

- Follow the repository's architecture: create a standalone Vite-based `studio/` workspace alongside the existing root Next.js app; do not relocate or otherwise restructure the web app.
- Migrate the uncommitted embedded Studio scaffold into `studio/` and remove its embedded route/configuration from the root app. Keep the web-specific Sanity client, environment handling, image helper, and query/data layer in root `sanity/`.
- Use the configured `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, and `NEXT_PUBLIC_SANITY_API_VERSION` for non-secret configuration. Keep reads private with `SANITY_API_READ_TOKEN` in a server-only module; do not expose it to browser code or use browser-token/live configuration.
- Add the required read-token setting to `.env.example` with a placeholder only. Do not inspect, change, or copy values from `.env.local`.
- Model `module` as an embedded object on `course`, not a standalone document. Include `category` because the repository's fixed content model requires the course's category reference.
- Define reusable, typed GROQ queries and server data helpers for listing courses and reading course, lesson, instructor, and category content. Lesson-to-course relationships are derived through reverse references; module and lesson numbering is not persisted.
- Use the existing installed Sanity/Next-Sanity dependencies where they belong, and isolate Studio-only dependencies and commands in `studio/package.json`. Update package manifests with the relevant package manager rather than hand-editing the lockfile.
- Do not create content, deploy the Studio/schema, or claim a live Sanity project has been verified. Project ID and dataset stay environment-configured.

## Expected files to touch

- New `studio/` workspace: `package.json`, `sanity.config.ts`, `sanity.cli.ts`, `schemaTypes/index.ts`, document schemas, embedded-object schemas, and Studio structure as needed.
- Root `sanity/`: retain/refactor environment and image helpers; implement a server-only read client and typed GROQ queries/data helpers; retire unused live client wiring if it could permit browser reads.
- Root `app/studio/[[...tool]]/page.tsx`, root `sanity.config.ts`, and root `sanity.cli.ts`: remove the embedded Studio wiring as part of migration.
- Root `package.json` and `package-lock.json`: isolate Studio-specific dependencies and expose clear root scripts only if they fit existing conventions.
- `.env.example`: document client-safe Sanity configuration and the server-only read token (plus existing app environment keys, using placeholders only).
- `prompts/vertex-sanity-model-data-layer.md`: this approved implementation prompt.

Do not alter `.env.local`, unrelated UI/pages, the Clerk setup, or the existing prompt file.

## Requirements

### Sanity Studio and schemas

- Configure a deployable standalone Sanity Studio using the project's configured project ID, dataset, and API version, without hardcoding credentials.
- Create document schemas for `course`, `lesson`, `instructor`, and `category`.
- Create an embedded `module` object with title, summary, and ordered references to lessons. Do not store module/lesson display numbers or add a standalone module document.
- Course fields: title, slug, summary, cover image, level, price, optional popular flag, display student count, learning outcomes (icon/title/description), instructor reference, category reference, and ordered modules.
- Lesson fields: title, slug, video URL, poster/thumbnail, duration, free-preview flag, display student count, Portable Text notes, key points, optional pro tip, and typed resources (type/title/description/URL).
- Instructor fields: name, slug, photo, expertise, and bio.
- Category fields: title, slug, and description.
- Add appropriate required-field and range validation, useful Studio previews/order, and schema options following existing Sanity conventions. Keep documents content-focused rather than presentation-layout-specific.

### Web server read data layer

- Mark the Sanity read client/data module server-only and require a private `SANITY_API_READ_TOKEN` at runtime with a clear configuration error if absent.
- Use parameterized GROQ via `defineQuery`, project only fields needed by the data layer, and provide typed read helpers for courses, course by slug, lesson by slug, instructor by slug, and categories as appropriate.
- Expand references deliberately; use a reverse reference to resolve the course from a lesson rather than adding a parent-course field to the lesson schema.
- Do not return a whole transcript or introduce video-document ingestion in this task.
- Do not configure a browser token or expose the read token in client imports, public environment variables, logs, or generated code.
- Keep image URL construction available to the web layer without moving the read token into client code.

## Security considerations

- Sanity read credentials stay in a server-only module and server environment variable.
- Public Sanity project ID, dataset, and API version are configuration, not credentials; do not add a token to any `NEXT_PUBLIC_*` variable.
- Keep `.env.local` untouched and do not print secret values.
- Ensure the Studio configuration contains no API token and does not use public dataset assumptions.
- Do not add a client-callable data layer that can fetch private content using credentials.

## Acceptance criteria

- A standalone Studio starts independently from the Next.js app, and Studio-only dependencies are isolated.
- The Studio schema contains the four requested document types and embedded module object, with the course/category relationship and lesson resource/rich-text fields defined.
- The embedded `/studio` route and its root-level config are no longer required to use the Studio.
- Root web data reads require the server-only token; no browser-token wiring remains.
- Typed query helpers return course, lesson, instructor, and category data, including reverse course lookup from lesson.
- `npm run lint`, TypeScript type-check, root production build, and the Studio type-check/build pass where defined.
- Changes do not overwrite pre-existing uncommitted files outside the stated scope.

## Checks

- Root web: run the lint script, `npx tsc --noEmit`, and production build.
- Studio: run its available type-check and production build commands.
- Do not run deploy/import operations or claim live project checks without explicit authorization and configured Sanity credentials.

## Manual test steps

1. From `studio/`, install dependencies if needed and run the Studio development command.
2. Confirm the Studio loads at its local URL and the course, lesson, instructor, and category document types are available.
3. Configure `SANITY_API_READ_TOKEN` in the local server environment, then use a server-side page or a small local invocation of the data helpers to read an existing document; confirm the browser bundle does not contain the token.
4. Unset the read token and verify a data read fails with a clear configuration error instead of silently using an unauthenticated/public client.
5. From the repository root, run lint, type-check, and production build.
