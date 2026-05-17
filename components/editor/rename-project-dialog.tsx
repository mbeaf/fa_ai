'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DialogPattern } from './dialog-pattern'
import type { Project } from '@/types/project'

interface RenameProjectDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  project: Project | null
  onRename: (name: string) => Promise<void>
  isCreating: boolean
}

export function RenameProjectDialog({
  open,
  onOpenChange,
  project,
  onRename,
  isCreating,
}: RenameProjectDialogProps) {
  const [name, setName] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open && project) {
      setName(project.name)
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open, project])

  const handleRename = useCallback(() => {
    if (!name.trim()) return
    onRename(name.trim())
  }, [name, onRename])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && name.trim()) handleRename()
    },
    [handleRename, name],
  )

  return (
    <DialogPattern
      open={open}
      onOpenChange={onOpenChange}
      title="Rename Project"
      description={`Current name: ${project?.name}`}
      footer={
        <>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleRename}
            disabled={!name.trim() || isCreating}
          >
            {isCreating ? 'Saving...' : 'Save'}
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
            ref={inputRef}
            placeholder="Project name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
    </DialogPattern>
  )
}
