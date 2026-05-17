'use client'

import { useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DialogPattern } from './dialog-pattern'

interface CreateProjectDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  name: string
  onNameChange: (name: string) => void
  slug: string
  onCreate: () => void
  isCreating: boolean
}

export function CreateProjectDialog({
  open,
  onOpenChange,
  name,
  onNameChange,
  slug,
  onCreate,
  isCreating,
}: CreateProjectDialogProps) {
  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open) onNameChange('')
      onOpenChange(open)
    },
    [onOpenChange, onNameChange],
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && name.trim() && slug) onCreate()
    },
    [name, slug, onCreate],
  )

  return (
    <DialogPattern
      open={open}
      onOpenChange={handleOpenChange}
      title="Create Project"
      description="Enter a name for your new architecture workspace."
      footer={
        <>
          <Button variant="outline" onClick={() => handleOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={onCreate}
            disabled={!name.trim() || !slug || isCreating}
          >
            {isCreating ? 'Creating...' : 'Create'}
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-primary mb-1.5 block">
            Project name
          </label>
          <Input
            placeholder="My architecture project"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-1.5 block">
            Room ID
          </label>
          <div className="rounded-lg border border-border bg-elevated px-3 py-2 text-sm text-muted-foreground font-mono">
            {slug || 'project-room-id'}
          </div>
        </div>
      </div>
    </DialogPattern>
  )
}
