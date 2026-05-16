"use client"

import { X, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

interface ProjectSidebarProps {
  isOpen?: boolean
  onClose?: () => void
  className?: string
}

export function ProjectSidebar({
  isOpen = false,
  onClose,
  className,
}: ProjectSidebarProps) {
  return (
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
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <p>No projects yet</p>
          </div>
        </TabsContent>

        {/* Shared Tab */}
        <TabsContent value="shared" className="flex-1 px-4 py-4">
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <p>No shared projects</p>
          </div>
        </TabsContent>

        {/* New Project Button */}
        <div className="p-4 border-t">
          <Button className="w-full" variant="default">
            <Plus className="size-4 mr-2" />
            New Project
          </Button>
        </div>
      </Tabs>
    </aside>
  )
}
