"use client"

import { X, Plus, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import type { Project } from "@/types/project"

interface ProjectSidebarProps {
  isOpen?: boolean
  onClose?: () => void
  className?: string
  projects?: Project[]
  onRename?: (project: Project) => void
  onDelete?: (project: Project) => void
  onCreate?: () => void
}

export function ProjectSidebar({
  isOpen = false,
  onClose,
  className,
  projects = [],
  onRename,
  onDelete,
  onCreate,
}: ProjectSidebarProps) {
  const ownedProjects = projects.filter((p) => p.isOwned)
  const sharedProjects = projects.filter((p) => !p.isOwned)

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed top-14 left-0 bottom-0 w-80 bg-card border-r transform transition-transform duration-300 ease-in-out z-40",
          isOpen ? "translate-x-0" : "-translate-x-full pointer-events-none",
          className
        )}
        aria-hidden={!isOpen}
        inert={!isOpen ? true : undefined}
        tabIndex={isOpen ? 0 : -1}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h2 className="text-lg font-semibold">Projects</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X className="size-4" />
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="my-projects" className="flex flex-col h-full">
          <div className="px-4 pt-4">
            <TabsList className="w-full">
              <TabsTrigger value="my-projects">My Projects</TabsTrigger>
              <TabsTrigger value="shared">Shared</TabsTrigger>
            </TabsList>
          </div>

          {/* My Projects Tab */}
          <TabsContent value="my-projects" className="flex-1 px-4 py-4">
            {ownedProjects.length === 0 ? (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <p>No projects yet</p>
              </div>
            ) : (
              <div className="space-y-1">
                {ownedProjects.map((project) => (
                  <ProjectItem
                    key={project.id}
                    project={project}
                    showActions
                    onRename={onRename}
                    onDelete={onDelete}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          {/* Shared Tab */}
          <TabsContent value="shared" className="flex-1 px-4 py-4">
            {sharedProjects.length === 0 ? (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <p>No shared projects</p>
              </div>
            ) : (
              <div className="space-y-1">
                {sharedProjects.map((project) => (
                  <ProjectItem
                    key={project.id}
                    project={project}
                    showActions={false}
                    onRename={onRename}
                    onDelete={onDelete}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          {/* New Project Button */}
          <div className="p-4 border-t">
            <Button className="w-full" variant="default" onClick={onCreate}>
              <Plus className="size-4 mr-2" />
              New Project
            </Button>
          </div>
        </Tabs>
      </aside>
    </>
  )
}

interface ProjectItemProps {
  project: Project
  showActions: boolean
  onRename?: (project: Project) => void
  onDelete?: (project: Project) => void
}

function ProjectItem({
  project,
  showActions,
  onRename,
  onDelete,
}: ProjectItemProps) {
  return (
    <div className="group flex items-center justify-between px-3 py-2 rounded-lg hover:bg-muted/50">
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-primary truncate">
          {project.name}
        </p>
        <p className="text-xs text-muted-foreground truncate font-mono">
          {project.slug}
        </p>
      </div>
      {showActions && (
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={() => onRename?.(project)}
            aria-label="Rename project"
          >
            <Pencil className="size-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={() => onDelete?.(project)}
            aria-label="Delete project"
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="size-3.5" />
          </Button>
        </div>
      )}
    </div>
  )
}
