"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DialogPattern } from "./dialog-pattern";

interface CreateProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (name: string, slug: string) => void;
  isCreating: boolean;
}

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function CreateProjectDialog({
  open,
  onOpenChange,
  onCreate,
  isCreating,
}: CreateProjectDialogProps) {
  const [name, setName] = useState("");
  const slug = generateSlug(name);

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        setName("");
      }
      onOpenChange(open);
    },
    [onOpenChange],
  );

  const handleCreate = useCallback(() => {
    if (!name.trim() || !slug) return;
    onCreate(name.trim(), slug);
  }, [name, slug, onCreate]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && name.trim() && slug) {
        handleCreate();
      }
    },
    [handleCreate, name],
  );

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
          <Button onClick={handleCreate} disabled={!name.trim() || !slug || isCreating}>
            {isCreating ? "Creating..." : "Create"}
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
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
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
  );
}
