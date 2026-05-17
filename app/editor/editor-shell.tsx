'use client'

import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useProjectActions } from '@/hooks/use-project-actions'
import { CreateProjectDialog } from '@/components/editor/create-project-dialog'
import { RenameProjectDialog } from '@/components/editor/rename-project-dialog'
import { DeleteProjectDialog } from '@/components/editor/delete-project-dialog'
import { ProjectSidebar } from '@/components/editor/project-sidebar'
import { useEditor } from '@/components/editor/editor-context'
import type { Project } from '@/types/project'

interface EditorShellProps {
  projects: Project[]
  userId: string
}

export function EditorShell({ projects: initialProjects, userId }: EditorShellProps) {
  const { isSidebarOpen, closeSidebar } = useEditor()

  const {
    activeDialog,
    selectedProject,
    createName,
    setCreateName,
    createSlug,
    isSubmitting,
    openCreate,
    openRename,
    openDelete,
    closeDialog,
    handleCreate,
    handleRename,
    handleDelete,
    projects,
  } = useProjectActions(initialProjects, userId)

  return (
    <>
      <div className="flex items-center justify-center h-[calc(100vh-3.5rem)]">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-primary mb-2">
            Create a project or open an existing one
          </h1>
          <p className="text-sm text-muted-foreground mb-6">
            Start a new architecture workspace, or choose a project from the
            sidebar.
          </p>
          <Button onClick={openCreate}>
            <Plus className="size-4 mr-2" />
            New Project
          </Button>
        </div>
      </div>

      <ProjectSidebar
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
        projects={projects}
        userId={userId}
        onRename={openRename}
        onDelete={openDelete}
        onCreate={openCreate}
      />

      <CreateProjectDialog
        open={activeDialog === 'create'}
        onOpenChange={(open) => !open && closeDialog()}
        name={createName}
        onNameChange={setCreateName}
        slug={createSlug}
        onCreate={handleCreate}
        isCreating={isSubmitting}
      />

      <RenameProjectDialog
        open={activeDialog === 'rename'}
        onOpenChange={(open) => !open && closeDialog()}
        project={selectedProject}
        onRename={handleRename}
        isCreating={isSubmitting}
      />

      <DeleteProjectDialog
        open={activeDialog === 'delete'}
        onOpenChange={(open) => !open && closeDialog()}
        project={selectedProject}
        onDelete={handleDelete}
        isCreating={isSubmitting}
      />
    </>
  )
}
