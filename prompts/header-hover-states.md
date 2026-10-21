# Implementation Prompt: Add Header Hover Feedback

## Goal

Make the notification bell and “My Learning” header item visibly respond to pointer hover, so the header has clear visual feedback.

## Skills and documentation reviewed

- No specialized skill is required for this CSS-only interaction-state update.
- Next.js docs are not needed because this change does not touch routing or server/client behavior.

## Existing code inspected

- `app/page.tsx`: header bell is a presentational `span`; “My Learning” is a `span` marked `aria-disabled="true"`.
- `app/globals.css`: hover styling currently covers navigation anchors and the course-list link, but not the bell or disabled navigation span.
- Existing architecture notes state that the notifications bell and My Learning are presentational-only surfaces.

## Decisions and assumptions

- Add hover-only visual feedback; do not add a notifications menu, route, data, or click behavior.
- Keep the bell and My Learning non-interactive, preserving their current semantics and public-page behavior.
- Match existing header hover color (`#d94c24`) and add a short color/background transition for the bell only if it fits the existing styles.

## Expected files to touch

- `app/globals.css` — add focused hover selectors for the notification bell and My Learning label.

## Requirements

1. Hovering the bell visibly changes its icon appearance.
2. Hovering “My Learning” visibly changes its text appearance.
3. Preserve the bell's and My Learning's current non-interactive behavior and accessibility semantics.
4. Do not change unrelated hover styles or layout.

## Security considerations

- This is a CSS-only presentation change; add no data access, navigation, or external dependencies.

## Acceptance criteria

- Both elements show clear, consistent hover feedback on desktop.
- Mouse leave restores their original appearance.
- No click behavior, dropdown, or new route is introduced.
- ESLint and TypeScript checks pass.

## Checks

- `npx tsc --noEmit`
- `npm run lint`

## Manual test steps

1. Open the home page at `http://localhost:3000`.
2. Move the pointer over the notification bell and confirm it visibly changes.
3. Move the pointer over “My Learning” and confirm its text visibly changes.
4. Move the pointer away and confirm both return to their original appearance.
5. Confirm neither item unexpectedly navigates or opens a panel.
