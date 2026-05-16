"use client"

import { EditorNavbar } from "./editor-navbar"
import { useEditor } from "./editor-context"

interface EditorLayoutProps {
  children: React.ReactNode
}

export function EditorLayout({ children }: EditorLayoutProps) {
  const { isSidebarOpen, toggleSidebar } = useEditor()

  return (
    <>
      <EditorNavbar
        isSidebarOpen={isSidebarOpen}
        onSidebarToggle={toggleSidebar}
      />
      <main className="pt-14">{children}</main>
    </>
  )
}
