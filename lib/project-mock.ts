import type { Project } from "@/types/project"

export const mockProjects: Project[] = [
  {
    id: "1",
    name: "E-Commerce Platform",
    slug: "e-commerce-platform",
    ownerId: "user-123",
    isOwned: true,
  },
  {
    id: "2",
    name: "Analytics Dashboard",
    slug: "analytics-dashboard",
    ownerId: "user-456",
    isOwned: false,
  },
  {
    id: "3",
    name: "User Auth Service",
    slug: "user-auth-service",
    ownerId: "user-123",
    isOwned: true,
  },
]
