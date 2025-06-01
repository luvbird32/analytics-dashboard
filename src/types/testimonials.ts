
/**
 * TypeScript interfaces for testimonials functionality
 */
export interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
}

export interface TestimonialsSectionProps {
  testimonials?: Testimonial[];
  className?: string;
}
