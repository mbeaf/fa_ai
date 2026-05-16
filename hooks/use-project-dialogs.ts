import { useState, useCallback } from "react"
import type { Project } from "@/types/project"

type DialogType = "create" | "rename" | "delete" | null

interface UseProjectDialogsReturn {
  activeDialog: DialogType
  selectedProject: Project | null
  isCreating: boolean
  openCreate: () => void
  openRename: (project: Project) => void
  openDelete: (project: Project) => void
  closeDialog: () => void
  setCreating: (loading: boolean) => void
}

export function useProjectDialogs(): UseProjectDialogsReturn {
  const [activeDialog, setActiveDialog] = useState<DialogType>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isCreating, setIsCreating] = useState(false)

  const openCreate = useCallback(() => {
    setSelectedProject(null)
    setActiveDialog("create")
  }, [])

  const openRename = useCallback((project: Project) => {
    setSelectedProject(project)
    setActiveDialog("rename")
  }, [])

  const openDelete = useCallback((project: Project) => {
    setSelectedProject(project)
    setActiveDialog("delete")
  }, [])

  const closeDialog = useCallback(() => {
    setActiveDialog(null)
    setSelectedProject(null)
  }, [])

  return {
    activeDialog,
    selectedProject,
    isCreating,
    openCreate,
    openRename,
    openDelete,
    closeDialog,
    setCreating: setIsCreating,
  }
}
