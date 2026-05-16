"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DialogPattern } from "./dialog-pattern"
import type { Project } from "@/types/project"

interface RenameProjectDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  project: Project | null
  onRename: (id: string, name: string) => void
  isCreating: boolean
}

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

export function RenameProjectDialog({
  open,
  onOpenChange,
  project,
  onRename,
  isCreating,
}: RenameProjectDialogProps) {
  const [name, setName] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open && project) {
      setName(project.name)
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open, project])

  const slug = generateSlug(name)

  const handleRename = useCallback(() => {
    if (!project || !name.trim() || !slug) return
    onRename(project.id, name.trim())
  }, [project, name, slug, onRename])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && name.trim() && slug) {
        handleRename()
      }
    },
    [handleRename, name]
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
            disabled={!name.trim() || !slug || isCreating}
          >
            {isCreating ? "Saving..." : "Save"}
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
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-1.5 block">
            Slug
          </label>
          <div className="rounded-lg border border-border bg-elevated px-3 py-2 text-sm text-muted-foreground font-mono">
            {slug || "project-slug"}
          </div>
        </div>
      </div>
    </DialogPattern>
  )
}
