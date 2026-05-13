"use client"

import { PanelLeftClose, PanelLeftOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface EditorNavbarProps {
  isSidebarOpen?: boolean
  onSidebarToggle?: () => void
  className?: string
}

export function EditorNavbar({
  isSidebarOpen = false,
  onSidebarToggle,
  className,
}: EditorNavbarProps) {
  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 h-14 flex items-center border-b bg-card",
        className
      )}
    >
      {/* Left section */}
      <div className="flex items-center gap-2 px-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onSidebarToggle}
          aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          {isSidebarOpen ? (
            <PanelLeftClose className="size-4" />
          ) : (
            <PanelLeftOpen className="size-4" />
          )}
        </Button>
      </div>

      {/* Center section */}
      <div className="flex-1" />

      {/* Right section */}
      <div className="flex items-center px-4" />
    </nav>
  )
}
