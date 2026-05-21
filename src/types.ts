/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  category: 'development' | 'design' | 'creative';
  techStack: string[];
  imageUrl?: string;
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  type: 'work' | 'education' | 'milestone';
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: { name: string; proficiency: number }[];
}

export interface SocialLink {
  platform: 'github' | 'linkedin' | 'twitter' | 'email' | 'portfolio' | 'custom';
  url: string;
  label: string;
}

export interface PortfolioData {
  fullName: string;
  title: string;
  tagline: string;
  aboutMe: string;
  avatarUrl?: string;
  statusText: string;
  statusType: 'available' | 'busy' | 'learning';
  socialLinks: SocialLink[];
  projects: Project[];
  experiences: Experience[];
  skills: SkillCategory[];
}

export type ThemeType = 'nordic' | 'cosmic' | 'warm' | 'monochrome';
