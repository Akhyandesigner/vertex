# Implementation Prompt: Vertex Design System

## Goal

Implement the Vertex Design System reference as the app's home page. Reproduce the supplied design-system board as a polished, responsive page using the existing Next.js App Router and Tailwind setup.

## Skills and documentation reviewed

- No Sanity skills are needed for this presentational UI task.
- Reviewed the installed Next.js guides for CSS, layouts and pages, and fonts under `node_modules/next/dist/docs/`.

## Existing code inspected

- `app/page.tsx` currently contains the starter page.
- `app/globals.css` currently defines the starter light/dark theme and Tailwind import.
- `app/layout.tsx` currently defines the root layout, Geist fonts, and starter metadata.
- `package.json`, `tsconfig.json`, and `eslint.config.mjs` confirm Next.js 16, React 19, TypeScript strict mode, Tailwind CSS 4, and available lint/build scripts.
- `AGENTS.md` specifies matching the provided UI reference, responsive adaptation for mobile, and checks before completion.
- The supplied design-system image is the visual source of truth.

## Decisions and assumptions

- The root route is a visual reference page for the Vertex learning-platform design system, not a functional course catalog.
- Use the screenshot's warm off-white canvas, white bordered cards, orange primary accent, dark neutral typography, compact uppercase section labels, and dense grid layout.
- Keep the page as a server-rendered React component. Use native semantic controls for the illustrated buttons, search input, select, and pagination; do not add backend behavior or client-side state.
- Use existing dependencies only. Avoid new icon packages; render small inline SVG icons where needed.
- Preserve a coherent mobile experience by stacking the panels and allowing dense token/card rows to wrap or scroll without clipping.

## Expected files to touch

- `app/page.tsx` — replace starter content with the complete design-system showcase.
- `app/globals.css` — implement design tokens, typography, panel layouts, control states, and responsive styling.
- `app/layout.tsx` — update page title/description and font setup if needed to match the design.

## Requirements

Render all reference sections:

1. Brand introduction and color pale
2. Typography samples and type scale.
3. Spacing tokens, corner radii, and shadow examples.
4. Outline and filled icon samples.
5. Primary, secondary, tertiary, and text button styles in default, hover, and disabled states, plus button specifications.
6. Search/text input, select, and field specifications.
7. Badges/tags, status indicators, and progress bar.
8. Course, lesson/video, lesson/text, and resource cards.
9. Navigation, breadcrumbs, pagination, and the four design principles.

Use meaningful HTML landmarks and headings, accessible labels for controls, visible keyboard focus, sufficient contrast, and responsive layouts. Match the desktop composition and compact visual hierarchy closely while adapting the multi-column layout at narrow widths. Do not introduce unrelated product features, external services, or new dependencies.

## Security considerations

- This is static presentational UI; do not add secrets, network calls, data mutations, or external image/font requests.
- Keep inputs and buttons non-submitting unless they have an explicit local presentational purpose.

## Acceptance criteria

- The `/` page presents all fourteen numbered design-system areas from the reference image.
- Desktop uses the reference's card-grid composition, typography hierarchy, warm canvas, orange accent, neutral palette, and compact spacing.
- At tablet and mobile widths, content remains readable, controls remain usable, and no panel or content is unintentionally clipped.
- The implementation uses existing dependencies and passes strict TypeScript, ESLint, and a production build.

## Checks

- `npx tsc --noEmit`
- `npm run lint`
- `npm run build`

## Manual test steps

1. Run `npm run dev` and open `http://localhost:3000`.
2. Compare the desktop page with the supplied design reference, checking that all numbered sections and sample states are present.
3. Resize to tablet and mobile widths and verify the layout reflows, all text and controls remain accessible, and horizontal overflow is limited to intentionally dense samples if any.
4. Tab through the page and verify controls have visible focus and labels.
