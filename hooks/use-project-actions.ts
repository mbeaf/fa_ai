'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import type { Project } from '@/types/project'
import { slugify, generateRoomSuffix } from '@/lib/slug'

type DialogType = 'create' | 'rename' | 'delete' | null

interface UseProjectActionsReturn {
  activeDialog: DialogType
  selectedProject: Project | null
  createName: string
  setCreateName: (name: string) => void
  createSlug: string
  isSubmitting: boolean
  openCreate: () => void
  openRename: (project: Project) => void
  openDelete: (project: Project) => void
  closeDialog: () => void
  handleCreate: () => Promise<void>
  handleRename: (name: string) => Promise<void>
  handleDelete: () => Promise<void>
  projects: Project[]
}

export function useProjectActions(
  initialProjects: Project[],
  userId: string,
): UseProjectActionsReturn {
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [activeDialog, setActiveDialog] = useState<DialogType>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [createName, setCreateName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const createSlug = `${slugify(createName)}-${generateRoomSuffix()}`
    .replace(/^-/, '')

  const openCreate = useCallback(() => {
    setCreateName('')
    setSelectedProject(null)
    setActiveDialog('create')
  }, [])

  const openRename = useCallback((project: Project) => {
    setSelectedProject(project)
    setActiveDialog('rename')
  }, [])

  const openDelete = useCallback((project: Project) => {
    setSelectedProject(project)
    setActiveDialog('delete')
  }, [])

  const closeDialog = useCallback(() => {
    setActiveDialog(null)
    setSelectedProject(null)
  }, [])

  const handleCreate = useCallback(async () => {
    const name = createName.trim()
    if (!name) return
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      })
      if (!res.ok) return
      const project: Project = await res.json()
      setProjects((prev) => [project, ...prev])
      closeDialog()
      router.push(`/editor/${project.id}`)
    } finally {
      setIsSubmitting(false)
    }
  }, [createName, closeDialog, router])

  const handleRename = useCallback(
    async (name: string) => {
      if (!selectedProject || !name.trim()) return
      setIsSubmitting(true)
      try {
        const res = await fetch(`/api/projects/${selectedProject.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: name.trim() }),
        })
        if (!res.ok) return
        const updated: Project = await res.json()
        setProjects((prev) =>
          prev.map((p) => (p.id === updated.id ? updated : p)),
        )
        closeDialog()
      } finally {
        setIsSubmitting(false)
      }
    },
    [selectedProject, closeDialog],
  )

  const handleDelete = useCallback(async () => {
    if (!selectedProject) return
    setIsSubmitting(true)
    try {
      const res = await fetch(`/api/projects/${selectedProject.id}`, {
        method: 'DELETE',
      })
      if (!res.ok) return
      setProjects((prev) => prev.filter((p) => p.id !== selectedProject.id))
      closeDialog()
      router.refresh()
    } finally {
      setIsSubmitting(false)
    }
  }, [selectedProject, closeDialog, router])

  return {
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
  }
}
