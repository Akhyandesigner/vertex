# Implementation Prompt: Set Up Clerk

## Goal

Set up Clerk authentication in the existing Vertex Next.js app using the Clerk CLI and the dashboard-selected application `app_3KyEJcMB8ghWsLLx5hEQwYoJwnx`. Add working sign-in, sign-up, and signed-in user controls to the existing header, then start the app.

## Skills and documentation reviewed

- `clerk-setup` for CLI setup, existing application safety, controls, and verification.
- Existing Clerk project skills are available in `.agents/skills`; skip any global skill installation during CLI setup.
- Installed Next.js 16 Proxy documentation at `node_modules/next/dist/docs/01-app/01-getting-started/16-proxy.md`.

## Existing code inspected

- `package.json`: Next.js 16.4.2, React 19.3.0, npm scripts for dev, build, and lint.
- `app/layout.tsx`: root App Router layout; currently no provider.
- `app/page.tsx`: home page with a static profile avatar in its header.
- `app/globals.css`: existing header and avatar styling.
- `app/`: only home and design-system routes; no sign-in or sign-up routes.
- Searched app code and dependencies for Clerk and other auth/session providers; none found.
- Did not inspect environment files.

## Decisions and assumptions

- Use the selected existing Clerk application; do not create or switch applications.
- Run `npx -y clerk@latest init --app app_3KyEJcMB8ghWsLLx5hEQwYoJwnx --no-skills` from the repository root. If the CLI requires account authentication, stop and ask the user to run `npx -y clerk@latest auth login` in their host terminal before continuing.
- If `doctor` reports missing development keys, run `npx -y clerk@latest env pull` for the already-linked development instance; never display or inspect the key values.
- Preserve public browsing. Do not introduce protected routes or backend authorization policies that the current app does not need.
- Use the Clerk SDK generation and Next.js 16 conventions provided by the CLI; Next.js 16 calls its request interception file `proxy.ts`.
- Replace the decorative static avatar with Clerk's signed-in user control; show sign-in and sign-up controls when signed out.
- Keep Clerk's request-dependent header controls and generated sign-in/sign-up forms behind React Suspense boundaries so they work with the existing Next.js Cache Components setting.
- Never read or print environment files or expose the Clerk secret key. Keep any CLI-generated development keys in their intended local environment file.

## Expected files to touch

- CLI-managed dependency/config files, including `package.json` and `package-lock.json`.
- CLI-generated Clerk integration files, expected to include `proxy.ts` and any needed sign-in/sign-up routes.
- `app/layout.tsx` for `ClerkProvider`, if not handled by the CLI.
- `app/page.tsx`, `app/globals.css`, and generated auth routes for the header controls and Suspense boundaries.
- The CLI may write local development keys to an environment file; do not inspect or include those values in output.

## Requirements

1. Initialize Clerk against the selected application without creating a replacement application.
2. Preserve existing page behavior and visual structure while replacing only the placeholder profile control with Clerk's appropriate signed-in/signed-out controls.
3. Keep browsing public; use Clerk Proxy integration as generated/configured for the app without guarding unrelated routes.
4. Keep `CLERK_SECRET_KEY` server-only. Use the publishable key only where the Clerk SDK requires a browser-visible value.
5. Follow current Next.js/Clerk package conventions and do not upgrade unrelated dependencies.
6. Run Clerk's doctor check, type check, lint, and production build; start the development app and confirm it responds.

## Security considerations

- Do not read, print, commit, or expose environment secrets.
- Do not run `init` without the selected app ID or create another Clerk application.
- Do not add client-side authorization as a substitute for server-side checks; no private feature is being added here.
- Do not create test users in the existing application without separate user approval.

## Acceptance criteria

- The repo uses Clerk's Next.js integration connected to the dashboard-selected app.
- The home header renders sign-in and sign-up controls when signed out and the user control when signed in.
- The home route remains statically prerenderable with the request-dependent auth controls streamed behind Suspense.
- The Clerk secret remains server-only, and public catalog browsing remains available.
- `npx -y clerk@latest doctor`, `npx tsc --noEmit`, `npm run lint`, and `npm run build` complete successfully.
- The development server starts and serves the app.

## Checks

- `npx -y clerk@latest doctor`
- `npx tsc --noEmit`
- `npm run lint`
- `npm run build`

## Manual test steps

1. Start the app with `npm run dev` and open `http://localhost:3000`.
2. While signed out, confirm both sign-in and sign-up controls appear and the course catalog remains visible.
3. Use sign-in or sign-up with an account authorized for the selected Clerk application; confirm the profile control appears after authentication.
4. Open the profile control and confirm Clerk's user menu works; sign out and verify the signed-out controls return.
5. Confirm no secret key appears in browser-visible source or client output.
