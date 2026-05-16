"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useProjectDialogs } from "@/hooks/use-project-dialogs"
import { mockProjects } from "@/lib/project-mock"
import { CreateProjectDialog } from "@/components/editor/create-project-dialog"
import { RenameProjectDialog } from "@/components/editor/rename-project-dialog"
import { DeleteProjectDialog } from "@/components/editor/delete-project-dialog"
import { ProjectSidebar } from "@/components/editor/project-sidebar"
import { useEditor } from "@/components/editor/editor-context"
import { useState, useCallback } from "react"
import type { Project } from "@/types/project"

export default function EditorPage() {
  const { isSidebarOpen, closeSidebar } = useEditor()
  const [projects, setProjects] = useState<Project[]>(mockProjects)
  const {
    activeDialog,
    selectedProject,
    isCreating,
    openCreate,
    openRename,
    openDelete,
    closeDialog,
    setCreating,
  } = useProjectDialogs()

  const handleCreate = useCallback(
    (name: string, slug: string) => {
      setCreating(true)
      setTimeout(() => {
        setProjects((prev) => [
          ...prev,
          {
            id: String(Date.now()),
            name,
            slug,
            ownerId: "user-123",
            isOwned: true,
          },
        ])
        setCreating(false)
        closeDialog()
      }, 500)
    },
    [closeDialog, setCreating]
  )

  const handleRename = useCallback(
    (id: string, name: string) => {
      setCreating(true)
      setTimeout(() => {
        setProjects((prev) =>
          prev.map((p) =>
            p.id === id
              ? { ...p, name, slug: name.toLowerCase().replace(/\s+/g, "-") }
              : p
          )
        )
        setCreating(false)
        closeDialog()
      }, 500)
    },
    [closeDialog, setCreating]
  )

  const handleDelete = useCallback(
    (id: string) => {
      setCreating(true)
      setTimeout(() => {
        setProjects((prev) => prev.filter((p) => p.id !== id))
        setCreating(false)
        closeDialog()
      }, 500)
    },
    [closeDialog, setCreating]
  )

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
        onRename={openRename}
        onDelete={openDelete}
        onCreate={openCreate}
      />

      <CreateProjectDialog
        open={activeDialog === "create"}
        onOpenChange={(open) => !open && closeDialog()}
        onCreate={handleCreate}
        isCreating={isCreating}
      />

      <RenameProjectDialog
        open={activeDialog === "rename"}
        onOpenChange={(open) => !open && closeDialog()}
        project={selectedProject}
        onRename={handleRename}
        isCreating={isCreating}
      />

      <DeleteProjectDialog
        open={activeDialog === "delete"}
        onOpenChange={(open) => !open && closeDialog()}
        project={selectedProject}
        onDelete={handleDelete}
        isCreating={isCreating}
      />
    </>
  )
}
