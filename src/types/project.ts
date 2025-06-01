
/**
 * Type definitions for project-related data structures
 * Ensures type safety across the application
 */

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  createdAt: string;
}

export interface ProjectCardProps {
  project: Project;
  className?: string;
}

export interface ProjectFilters {
  technology?: string;
  featured?: boolean;
}
