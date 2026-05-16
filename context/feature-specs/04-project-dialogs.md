# Editor Home Screen & Project Dialogs

## Editor Home

Reuse the existing editor layout. Do not modify the navbar or sidebar behavior.

In the center of the page, add:

- Heading: `Create a project or open an existing one`
- Description: `Start a new architecture workspace, or choose a project from the sidebar.`
- `New Project` button with a **Plus** icon

Keep the layout minimal. Do not wrap this content in cards.

Clicking **New Project** opens the **Create Project** dialog.

## Create Project Dialog

- Project name input field
- Live slug preview based on the entered name
- Preview updates as the user types

## Rename Project Dialog

- Prefilled project name input
- Current project name shown in the description
- Input auto-focuses when dialog opens
- Pressing **Enter** submits the rename

## Delete Project Dialog

- Destructive confirmation only (no input fields)
- Confirm button uses destructive styling (e.g., red background/color)

# Editor Home Screen & Project Dialogs

## Editor Home

Reuse the existing editor layout. Do not modify the navbar or sidebar behavior.

In the center of the page, add:

- Heading: `Create a project or open an existing one`
- Description: `Start a new architecture workspace, or choose a project from the sidebar.`
- `New Project` button with a **Plus** icon

Keep the layout minimal. Do not wrap this content in cards.

Clicking **New Project** opens the **Create Project** dialog.

## Create Project Dialog

- Project name input field
- Live slug preview based on the entered name
- Preview updates as the user types

## Rename Project Dialog

- Prefilled project name input
- Current project name shown in the description
- Input auto-focuses when dialog opens
- Pressing **Enter** submits the rename

## Delete Project Dialog

- Destructive confirmation only (no input fields)
- Confirm button uses destructive styling (e.g., red background/color)

## Sidebar

- Add project item actions: **rename** and **delete**
- Show actions **only for owned projects** (hide for shared/collaborator projects)
- On mobile:
  - Tapping outside the sidebar closes it
  - Add a backdrop scrim

## Implementation

Create a dedicated hook to manage:

- Dialog state
- Form state
- Loading state

Wire the following:

- Editor home `New Project` → Create dialog
- Sidebar create action → Create dialog
- Sidebar rename action → Rename dialog
- Sidebar delete action → Delete dialog

Use **mock project data only**. Do not add API calls or persistence.

## Check When Done

- Sidebar actions are wired
- Slug preview works
- No TypeScript errors
- No lint errors
