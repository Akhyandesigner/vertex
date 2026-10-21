# Implementation Prompt: Vertex Home Page

## Goal

Implement the supplied Vertex home-page design at `/` using the existing Next.js App Router and Tailwind project.

## Skills and documentation reviewed

- No Sanity or authentication skills are needed for this presentational home-page task.
- Reviewed the installed Next.js guides for CSS and App Router layouts/pages under `node_modules/next/dist/docs/`.

## Existing code and assets inspected

- `app/page.tsx` currently contains the Vertex Design System showcase.
- `app/globals.css` contains the existing shared style tokens and the showcase styling.
- `app/layout.tsx` contains the root metadata and Geist font setup.
- `package.json` confirms Next.js 16, React 19, TypeScript strict mode, Tailwind CSS 4, and available lint/build scripts.
- `design/vertex-home.png` and the attached reference show the target home page.
- `AGENTS.md` requires matching the supplied UI, responsive behavior, implementation prompt approval, and project checks.

## Decisions and assumptions

- `/` becomes the home page shown in the reference.
- Preserve the existing Design System page by relocating the same showcase to `/design-system`.
- Keep the home page presentational and server-rendered: use static course examples matching the design because no content API/backend is configured.
- Link the hero CTA and “View all courses” to the course section. Do not invent unavailable course-detail, search, auth, or profile routes.
- Build the profile avatar and course marks from inline SVG/CSS where no dedicated assets exist. Do not add packages or external requests.
- Match the desktop reference and make navigation, search control, and cards usable at mobile widths.

## Expected files to touch

- `app/page.tsx` — replace the root showcase with the designed home page.
- `app/design-system/page.tsx` — retain the existing showcase at a dedicated route.
- `app/globals.css` — add home-page styling while keeping design-system styles functional.
- `app/layout.tsx` — update metadata for the Vertex learning platform.

## Requirements

- Reproduce the reference structure: top navigation, centered intelligent-learning hero, primary CTA, search field with keyboard hint, three course cards, and the “new courses and lessons added every week” footer treatment.
- Match the reference palette, serif hero/section headings, spacing, panel borders, subtle page-edge pattern, warm background, and orange action accents.
- Add the exact course samples: Next.js for Production, Docker Essentials, and TypeScript Deep Dive; include descriptions and level, duration, and module metadata.
- Provide responsive layout behavior: collapse navigation gracefully, stack cards on narrow screens, keep search usable, and avoid page-level horizontal overflow.
- Use semantic landmarks/headings, accessible labels, meaningful link targets, and visible keyboard focus.
- Keep interactions honest and bounded to available UI; do not add service calls or non-existent route dependencies.

## Security considerations

- No secrets, network calls, user data, or mutations are needed.
- Search remains a labeled, presentational input until a search route exists.
- Use only inline/local assets and existing dependencies.

## Acceptance criteria

- `/` renders the complete home-page composition from the supplied design.
- The previous design-system showcase remains accessible at `/design-system`.
- Course details and metadata match the reference copy.
- The layout remains legible and usable on desktop, tablet, and mobile, with no document-level horizontal overflow.
- Strict TypeScript, ESLint, and production build pass.

## Checks

- `npx tsc --noEmit`
- `npm run lint`
- `npm run build`

## Manual test steps

1. Run `npm run dev` and open `http://localhost:3000`.
2. Compare the hero, navigation, search input, course cards, and footer accent against `design/vertex-home.png`.
3. Verify hero and view-all links move to the courses section; tab through controls and confirm focus visibility.
4. Resize to tablet and mobile widths, confirm card stacking and usable navigation/search, and verify the document does not horizontally scroll.
5. Open `http://localhost:3000/design-system` and confirm the existing showcase remains available.
