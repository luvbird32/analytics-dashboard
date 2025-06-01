
import React from 'react';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { Project } from '@/types/project';

/**
 * Sample project data for demonstration
 */
const featuredProjects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with React, Node.js, and PostgreSQL. Features include user authentication, payment processing, and admin dashboard.',
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Stripe'],
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
    demoUrl: 'https://demo.example.com',
    githubUrl: 'https://github.com/example/ecommerce',
    featured: true,
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'Collaborative project management tool with real-time updates, drag-and-drop functionality, and team collaboration features.',
    technologies: ['React', 'Firebase', 'Material-UI', 'Socket.io'],
    imageUrl: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
    demoUrl: 'https://taskapp.example.com',
    githubUrl: 'https://github.com/example/taskapp',
    featured: true,
    createdAt: '2024-02-20',
  },
  {
    id: '3',
    title: 'Weather Dashboard',
    description: 'Beautiful weather application with location-based forecasts, interactive maps, and detailed weather analytics.',
    technologies: ['Vue.js', 'Chart.js', 'OpenWeather API', 'Tailwind CSS'],
    imageUrl: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop',
    demoUrl: 'https://weather.example.com',
    githubUrl: 'https://github.com/example/weather',
    featured: true,
    createdAt: '2024-03-10',
  },
];

/**
 * Featured projects section showcasing best work
 */
export const FeaturedProjects: React.FC = () => {
  return (
    <section id="projects" className="py-20 bg-secondary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A collection of my best work showcasing different technologies and approaches to problem-solving.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};
