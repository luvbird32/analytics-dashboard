
import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ProjectCardProps } from '@/types/project';

/**
 * Reusable project card component with proper TypeScript interface
 * Demonstrates single responsibility principle and clean design
 */
export const ProjectCard: React.FC<ProjectCardProps> = ({ project, className }) => {
  return (
    <Card className={`group hover:shadow-lg transition-shadow duration-300 ${className || ''}`}>
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {project.featured && (
            <Badge className="absolute top-3 right-3" variant="secondary">
              Featured
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
        <p className="text-muted-foreground mb-4 line-clamp-3">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Badge key={tech} variant="outline" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0 flex gap-2">
        {project.demoUrl && (
          <Button variant="outline" size="sm" className="flex-1" asChild>
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink size={16} className="mr-2" />
              Demo
            </a>
          </Button>
        )}
        
        {project.githubUrl && (
          <Button variant="outline" size="sm" className="flex-1" asChild>
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <Github size={16} className="mr-2" />
              Code
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
