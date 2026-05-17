# Progress Tracker

Update this file after every meaningful implementation
change.

## Current Phase

- In progress

## Current Goal

- Editor page and chrome components

## Completed

- Design system with shadcn/ui components (Button, Card, Dialog, Input, Tabs, Textarea, ScrollArea)
- lib/utils.ts with cn() helper
- lucide-react installation
- shadcn/ui initialization and configuration
- Editor Navbar component (components/editor/editor-navbar.tsx): fixed-height top navbar with left/center/right sections, sidebar toggle using PanelLeftOpen/PanelLeftClose icons
- Project Sidebar component (components/editor/project-sidebar.tsx): floating sidebar with Projects header, My Projects/Shared tabs with empty placeholders, full-width New Project button with Plus icon
- Dialog Pattern component (components/editor/dialog-pattern.tsx): reusable dialog with title, description, footer actions using existing color tokens
- Editor Layout component (components/editor/editor-layout.tsx): wraps editor chrome with navbar, sidebar, and main content area
- Editor page (app/editor/page.tsx): canvas placeholder route protected by auth redirect from home page
- Clerk authentication integration:
  - Installed @clerk/ui package
  - Wrapped root layout with ClerkProvider using dark theme
  - Created sign-in page with two-panel layout using Clerk components
  - Created sign-up page with two-panel layout using Clerk components
  - Created proxy.ts at project root for route protection
  - Updated / page to redirect authenticated users to /editor, unauthenticated to /sign-in
  - Added UserButton to editor navbar right section
- Redesigned home page (`/`): landing page with hero section, feature cards, and CTA buttons for unauthenticated users; authenticated users still redirect to /editor
- Redesigned auth pages: compact left-panel branding with smaller typography, Clerk appearance variables mapped to app CSS custom properties, tighter layout per feature spec
- Redesigned sign-in/sign-up pages to match reference design: left panel with logo, hero heading "Design systems at the speed of thought", feature list with icons (AI Architecture Generation, Real-time Collaboration, Instant Spec Generation); right panel with customized Clerk form (social buttons, email input, cyan continue button, rounded card styling)
- Fixed Clerk routing: added routing="path", path, and cross-link URLs (signUpUrl/signInUrl) to both Clerk components so Sign Up/Sign In links navigate correctly
- Fixed pre-existing type error in components/editor/project-sidebar.tsx (inert prop type)
- Editor Home Screen & Project Dialogs (feature-specs/04-project-dialogs.md):
  - Editor home: centered heading, description, and New Project button (no card wrapper)
  - Create Project dialog: name input with live slug preview that updates as user types
  - Rename Project dialog: prefilled name, current name in description, auto-focus, Enter submits
  - Delete Project dialog: destructive confirmation with red-styled confirm button
  - Sidebar: project items with rename/delete actions (only for owned projects), mobile backdrop scrim
  - useProjectDialogs hook: manages dialog state, form state, and loading state
  - EditorContext: shared sidebar open/close state between navbar and page
  - Mock project data only, no API calls

## In Progress

- None

## Next Up

- [Next feature unit to build]

## Open Questions

- None

## Architecture Decisions

- Used Clerk for authentication as specified in architecture.md
- Used proxy.ts instead of middleware.ts for Clerk integration as specified in feature spec
- Auth pages use CSS variables with no hardcoded colors as specified
- Prisma client branches by DATABASE_URL: `prisma+postgres://` uses Accelerate (no adapter), otherwise uses `@prisma/adapter-pg`
- Schema split into `prisma/schema.prisma` (generator + datasource) and `prisma/models/project.prisma` (models) via `source` directive
- PrismaClient cached on `globalThis` in development to survive hot reloads

## Session Notes

- Clerk integration completed per feature-specs/03-auth.md
- All routes protected except /sign-in and /sign-up via proxy.ts
- User authentication redirects implemented on home page
- Prisma setup completed per feature-specs/05-prisma.md:
  - Project and ProjectCollaborator models with indexes and relations
  - lib/prisma.ts singleton with adapter-pg
  - Migration created and applied
