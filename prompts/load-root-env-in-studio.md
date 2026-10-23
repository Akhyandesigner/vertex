# Implementation Prompt: Load Root Environment in Studio Scripts

## Goal

Make the standalone Sanity Studio load the repository-root `.env.local` automatically when running its CLI-backed scripts from `studio/`.

## Skills and documentation reviewed

- `sanity-best-practices`
- Existing project instructions in `AGENTS.md`

## Existing code and configuration inspected

- `studio/package.json` currently runs `sanity dev` and `sanity build` without loading environment files.
- `studio/sanity.env.ts` accepts `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, and optional API version values as fallbacks.
- The repository-root `.env.local` exists and is ignored by Git.
- `dotenv-cli` is not currently installed in either workspace.

## Decisions and assumptions

- Use `dotenv-cli` as a Studio-local development dependency so the workspace can load `../.env.local` without changing the Next.js app's runtime configuration.
- Prefix the Studio CLI scripts that load `sanity.config.ts` (`dev` and `build`) with `dotenv -e ../.env.local --`.
- Do not add or expose secrets, copy environment values, or alter `.env.local`.
- Leave `typecheck` unchanged because it does not start the Sanity CLI or load the Studio configuration.
- Do not change the tagged Sanity Context example file; this request concerns the root `studio/` workspace.

## Expected files to touch

- `studio/package.json`
- `studio/package-lock.json`

## Requirements and security considerations

- `npm run dev` and `npm run build` from `studio/` must load the root `.env.local`.
- Keep dotenv and all secret values out of the browser bundle except configuration values Sanity Studio itself requires.
- Do not print environment variable values.
- Preserve the current standalone workspace boundary and existing user changes.

## Acceptance criteria

- The Studio package declares `dotenv-cli` and uses it in the `dev` and `build` scripts to load `../.env.local`.
- `npm run dev` from `studio/` starts without requiring manually exported project ID or dataset variables.
- Studio typecheck and production build pass.
- `.env.local` remains unchanged and ignored.

## Checks

- Install the Studio workspace dependency changes.
- Run `npm run typecheck --prefix studio`.
- Run the Studio dev server through `npm run dev --prefix studio` and confirm HTTP readiness.
- Run `npm run build --prefix studio`.
- Confirm no `.env.local` values are printed.

## Manual test steps

1. From the repository root, run `npm run dev --prefix studio`.
2. Confirm the Studio starts without manually setting `SANITY_STUDIO_PROJECT_ID` or `SANITY_STUDIO_DATASET`.
3. Stop the dev server and run `npm run build --prefix studio`.
