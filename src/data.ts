/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PortfolioData } from './types';

export const defaultPortfolioData: PortfolioData = {
  fullName: "Alex Chen",
  title: "Creative Technologist & UI Engineer",
  tagline: "Building lightweight, beautiful interactive experiences at the intersection of design, code, and systems.",
  aboutMe: "I enjoy designing and building high-performance web applications with pristine typography, clean animations, and robust code. Over the years, I've worked with startups and product teams to translate complex requirements into fluid, highly accessible client-side interfaces.",
  statusText: "Open to select freelance work & collaborations",
  statusType: "available",
  avatarUrl: "", // Optional, uses beautiful SVG initials if empty
  socialLinks: [
    {
      platform: "github",
      url: "https://github.com",
      label: "GitHub"
    },
    {
      platform: "linkedin",
      url: "https://linkedin.com",
      label: "LinkedIn"
    },
    {
      platform: "twitter",
      url: "https://twitter.com",
      label: "@alexchen_dev"
    },
    {
      platform: "email",
      url: "mailto:alex@example.com",
      label: "alex@example.com"
    }
  ],
  projects: [
    {
      id: "proj-1",
      title: "Vivid Interactive Canvas",
      description: "A hardware-accelerated fluid simulation running cleanly in sandboxed environments.",
      longDescription: "A physics-based interactive playground where users generate customizable particle currents. Built with pure WebGL and canvas to maximize mobile responsiveness and ensure 60fps renders even under high particle density.",
      category: "development",
      techStack: ["TypeScript", "WebGL", "Vite", "TailwindCSS"],
      featured: true,
      demoUrl: "https://example.com/vivid",
      githubUrl: "https://github.com/example/vivid"
    },
    {
      id: "proj-2",
      title: "Aura Typography Journal",
      description: "A focused, minimal writing workspace featuring soundscapes and circadian palettes.",
      longDescription: "A pure frontend typography editor designed to foster deep-focus writing. Integrates HTML5 Audio engine for ambient focus loops and automatically synchronizes interfaces with your surrounding local time.",
      category: "design",
      techStack: ["React 19", "Motion", "Local Storage", "Audio API"],
      featured: true,
      demoUrl: "https://example.com/aura",
      githubUrl: "https://github.com/example/aura"
    },
    {
      id: "proj-3",
      title: "Chronos Scheduler",
      description: "An elegant, keyboard-driven calendar assistant that manages schedules entirely client-side.",
      longDescription: "A productivity scheduler designed for speed. Features robust natural language event parsing, extensive keyboard shortcuts, and full offline synchronization synced securely across browser contexts.",
      category: "development",
      techStack: ["React", "TypeScript", "Tailwind CSS", "IndexedDB"],
      featured: true,
      demoUrl: "https://example.com/chronos",
      githubUrl: "https://github.com/example/chronos"
    },
    {
      id: "proj-4",
      title: "Sora Iconography",
      description: "A beautifully curated vector library of minimalist icons optimized for high-density screens.",
      longDescription: "A custom designed toolkit of over 120 vector items structured for tech and creative brands. Downloadable in SVG, PDF, and React components formats directly from the frontend.",
      category: "creative",
      techStack: ["Figma", "SVG Engine", "Tailwind CSS"],
      featured: false,
      demoUrl: "https://example.com/sora",
      githubUrl: "https://github.com/example/sora"
    }
  ],
  experiences: [
    {
      id: "exp-1",
      role: "Lead UI Engineer",
      company: "Prism Lab Studio",
      period: "2024 - Present",
      description: "Driving interface development for next-generation system dashboards. Managed the architectural migration to light-weight, accessibility-compliant React components.",
      type: "work"
    },
    {
      id: "exp-2",
      role: "Frontend Specialist",
      company: "Aether Systems",
      period: "2022 - 2024",
      description: "Spearheaded UI design and motion design systems for three flagship SaaS products, reducing asset weight by 42% and enhancing loading performances.",
      type: "work"
    },
    {
      id: "exp-3",
      role: "B.S. in Computer Science & Interface Design",
      company: "Design Institute of Technology",
      period: "2018 - 2022",
      description: "Specialized in Human-Computer Interaction, typography architectures, and performant web graphics pipelines.",
      type: "education"
    }
  ],
  skills: [
    {
      id: "skill-cat-1",
      name: "Engineering & Logic",
      skills: [
        { name: "TypeScript", proficiency: 95 },
        { name: "React / Vite", proficiency: 90 },
        { name: "Tailwind CSS", proficiency: 95 },
        { name: "WebGL & Canvas", proficiency: 75 }
      ]
    },
    {
      id: "skill-cat-2",
      name: "Product & Direction",
      skills: [
        { name: "Typography Systematics", proficiency: 90 },
        { name: "Interactive Prototyping", proficiency: 95 },
        { name: "Motion Choreography", proficiency: 85 },
        { name: "Responsive Layouts", proficiency: 95 }
      ]
    }
  ]
};
