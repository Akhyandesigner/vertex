# Implementation Prompt: Expose Root Sanity Settings to Studio

## Goal

Fix standalone Studio startup so project and dataset settings loaded from the root `.env.local` are made available under Sanity's `SANITY_STUDIO_*` environment prefix in the Studio browser bundle.

## Skills and documentation reviewed

- `sanity-best-practices`
- Existing repository guidance in `AGENTS.md`

## Existing code and configuration inspected

- `studio/package.json` runs `dotenv -e ../.env.local -- sanity dev/build`.
- `studio/sanity.env.ts` reads `SANITY_STUDIO_PROJECT_ID` / `SANITY_STUDIO_DATASET`, then falls back to `NEXT_PUBLIC_SANITY_PROJECT_ID` / `NEXT_PUBLIC_SANITY_DATASET`.
- The root `.env.local` contains only the `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` Sanity setting names; its values were not displayed.
- Sanity's Vite-based Studio expects browser-exposed environment values to use the `SANITY_STUDIO_` prefix. Loading `.env.local` into the CLI process alone does not rename `NEXT_PUBLIC_*` values for the Studio bundle.
- The Sanity CLI is available at `studio/node_modules/sanity/bin/sanity`.

## Decisions and assumptions

- Keep `.env.local` unchanged and do not print or copy its values.
- Add a small Studio-local Node wrapper that maps `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, and optional `NEXT_PUBLIC_SANITY_API_VERSION` to the corresponding `SANITY_STUDIO_*` variables before invoking the Sanity CLI.
- Preserve explicitly supplied `SANITY_STUDIO_*` overrides.
- Route only the Studio `dev` and `build` scripts through the wrapper; keep `typecheck` unchanged.
- Do not modify the separate ecommerce example Studio or unrelated dirty worktree changes.

## Expected files to touch

- `studio/package.json`
- New `studio/scripts/sanity-cli.mjs`
- `prompts/fix-studio-env-bundle.md`

## Requirements and security considerations

- The wrapper forwards only Sanity project configuration to the Studio CLI and does not log environment values.
- Keep all unrelated secrets out of the Studio bundle. Never copy the Clerk secret, Sanity read token, or other private settings.
- Return the Sanity CLI's exit status so build and development failures remain visible.
- Keep the existing root `.env.local` ignored and unmodified.

## Acceptance criteria

- Running `npm run dev --prefix studio` loads the root `.env.local` and the Studio page no longer errors because Sanity project settings are missing.
- Running `npm run build --prefix studio` succeeds using the same configuration bridge.
- The wrapper preserves caller-supplied `SANITY_STUDIO_*` overrides.
- Studio typecheck and `git diff --check` pass.

## Checks

- Run Studio typecheck.
- Start the normal Studio dev script and verify HTTP readiness.
- Run the Studio production build.
- Do not print environment values.

## Manual test steps

1. From the repository root run `npm run dev --prefix studio`.
2. Load the local Studio and confirm it renders without the missing Studio setting error.
3. Stop the server and run `npm run build --prefix studio`.
