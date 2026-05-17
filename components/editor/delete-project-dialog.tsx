'use client'

import { Button } from '@/components/ui/button'
import { DialogPattern } from './dialog-pattern'
import type { Project } from '@/types/project'

interface DeleteProjectDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  project: Project | null
  onDelete: () => Promise<void>
  isCreating: boolean
}

export function DeleteProjectDialog({
  open,
  onOpenChange,
  project,
  onDelete,
  isCreating,
}: DeleteProjectDialogProps) {
  return (
    <DialogPattern
      open={open}
      onOpenChange={onOpenChange}
      title="Delete Project"
      description={
        project
          ? `Are you sure you want to delete "${project.name}"? This action cannot be undone.`
          : undefined
      }
      footer={
        <>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onDelete}
            disabled={isCreating}
          >
            {isCreating ? 'Deleting...' : 'Delete'}
          </Button>
        </>
      }
    />
  )
}
