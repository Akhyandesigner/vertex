# Implementation Prompt: Home Page Content Width

## Goal

Expand the Vertex home-page main content container to approximately 1440px on wide screens.

## Skills and documentation reviewed

- No domain-specific skills are needed for this small styling adjustment.
- The existing implementation uses the Next.js App Router and global CSS.

## Existing code inspected

- `app/globals.css` defines `.home-page` with `max-width: 1210px` and outer canvas gutters.
- `app/page.tsx` renders the home page within `.home-page`.
- The previous home-page implementation and build checks establish responsive behavior and the existing design.

## Decisions and assumptions

- “Main content” refers to the `.home-page` container, not individual course cards or typography.
- Change the desktop maximum container width from 1210px to 1440px.
- Preserve current outer gutters, interior padding, responsive breakpoints, and card layout.

## Expected files to touch

- `app/globals.css` — update `.home-page` maximum width.

## Requirements

- On wide screens, `.home-page` must be able to occupy approximately 1440px.
- Below the max width, the page must remain fluid and retain existing gutters and responsiveness.

## Security considerations

- Presentation-only CSS change; no data, secrets, network requests, or behavior changes.

## Acceptance criteria

- `.home-page` has a 1440px maximum width.
- TypeScript, lint, and production build checks remain valid.

## Checks

- `npx tsc --noEmit`
- `npm run lint`
- `npm run build`

## Manual test steps

1. Open `/` at a wide desktop viewport and verify the main page can reach 1440px width.
2. Resize below 1440px and verify the content remains fluid with no horizontal overflow.
