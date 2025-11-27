import { LucideIcon } from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  isButton?: boolean;
}

export interface Feature {
  title: string;
  description: string;
  image: string;
  icon?: LucideIcon;
  link?: string;
}

export interface Testimonial {
  name: string;
  role: string;
  content: string;
}