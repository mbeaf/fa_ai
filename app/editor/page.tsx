import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { EditorShell } from './editor-shell'
import type { Project } from '@/types/project'

export default async function EditorPage() {
  const { userId } = await auth()

  const dbProjects = userId
    ? await prisma.project.findMany({
        where: { ownerId: userId },
        orderBy: { createdAt: 'desc' },
      })
    : []

  const projects: Project[] = dbProjects.map((p) => ({
    id: p.id,
    name: p.name,
    ownerId: p.ownerId,
    description: p.description,
    status: p.status as Project['status'],
    canvasJsonPath: p.canvasJsonPath,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  }))

  return <EditorShell projects={projects} userId={userId ?? ''} />
}
