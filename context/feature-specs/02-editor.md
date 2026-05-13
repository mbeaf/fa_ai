# Editor Navbar Component Requirements

We need the base chrome components that frame every editor screen — the top navbar and the left sidebar shell. These will be reused and extended in every chapter that follows.

## Editor Navbar

Create `components/editor/editor-navbar.tsx`.

### Requirements:

- fixed-height top navbar
- left, center, and right sections
- left section contains sidebar toggle button
- use `PanelLeftOpen` / `PanelLeftClose` icons based on sidebar state
- right section stays empty for now
- dark background with subtle bottom border

## Project Sidebar

**File:** `components/editor/project-sidebar.tsx`

- Sidebar floats above the editor canvas (does not push page content).
- Slides in from the left.
- Accepts an `isOpen` prop.
- Header contains:
  - `Projects` title
  - Close button
- Uses shadcn `Tabs`:
  - **My Projects**
  - **Shared**
- Both tabs show an empty placeholder state.
- Full‑width **New Project** button at the bottom with a `Plus` icon.

## Dialog Pattern

- Use existing color tokens from `globals.css`.
- Support:
  - Title
  - Description
  - Footer actions
- No actual dialogs to be built yet – just the pattern support.

## Check when done

- New components compile without TypeScript errors.
- No lint errors.
- Dialog pattern is ready for future use.
