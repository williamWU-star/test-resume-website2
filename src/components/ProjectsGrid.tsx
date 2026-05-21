/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Project, ThemeType } from '../types';
import { Folder, ExternalLink, Github, Code, Sparkles, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProjectsGridProps {
  projects: Project[];
  activeTheme: ThemeType;
}

export default function ProjectsGrid({ projects, activeTheme }: ProjectsGridProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'development' | 'design' | 'creative'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = [
    { id: 'all', label: 'All Artifacts' },
    { id: 'development', label: 'Development' },
    { id: 'design', label: 'UX / Product Design' },
    { id: 'creative', label: 'Artistic & Other' }
  ] as const;

  const filteredProjects = projects.filter(
    (proj) => activeFilter === 'all' || proj.category === activeFilter
  );

  const getThemeStyles = () => {
    switch (activeTheme) {
      case 'cosmic':
        return {
          cardBg: 'bg-slate-900/40 border border-slate-800 hover:border-cyan-500/40',
          badge: 'bg-cyan-950/40 text-cyan-400 border border-cyan-900/50',
          filterActive: 'bg-cyan-500 text-slate-950',
          filterInactive: 'bg-slate-900/60 text-slate-400 hover:text-white',
          accentText: 'text-cyan-400',
          modalBg: 'bg-[#0D1222]/95 border border-slate-800'
        };
      case 'warm':
        return {
          cardBg: 'bg-white border border-amber-900/10 hover:border-amber-800/40 shadow-sm',
          badge: 'bg-amber-100/80 text-amber-900',
          filterActive: 'bg-amber-800 text-white',
          filterInactive: 'bg-white text-amber-900/70 hover:bg-amber-500/5 border border-amber-900/10',
          accentText: 'text-amber-800',
          modalBg: 'bg-[#FAF7F2] border border-amber-900/20'
        };
      case 'monochrome':
        return {
          cardBg: 'bg-neutral-900/60 border border-neutral-800 hover:border-neutral-500',
          badge: 'bg-neutral-800 text-neutral-200 border border-neutral-700',
          filterActive: 'bg-white text-black',
          filterInactive: 'bg-neutral-900 text-neutral-400 border border-neutral-800 hover:bg-neutral-800',
          accentText: 'text-white',
          modalBg: 'bg-[#121212] border border-neutral-800'
        };
      case 'nordic':
      default:
        return {
          cardBg: 'bg-transparent border border-gray-100 hover:border-gray-200 shadow-none rounded-xl transition-all duration-300',
          badge: 'bg-gray-50/50 text-gray-400 border border-gray-100 uppercase tracking-widest text-[9px] font-mono',
          filterActive: 'border-b-2 border-black text-black font-medium tracking-wide rounded-none pb-1 px-1',
          filterInactive: 'text-gray-400 hover:text-black font-normal transition-colors rounded-none pb-1 px-1',
          accentText: 'text-[#1a1a1a]',
          modalBg: 'bg-[#fdfdfd] border border-gray-100 shadow-none'
        };
    }
  };

  const s = getThemeStyles();

  return (
    <div id="projects-section-container" className="space-y-6">
      {/* Dynamic Header */}
      <div id="projects-header" className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 id="projects-title" className={`text-2xl font-bold tracking-tight flex items-center gap-2 ${s.accentText}`}>
            <Folder className="w-5 h-5" />
            <span>Featured Works</span>
          </h2>
          <p id="projects-subtitle" className="text-xs opacity-60 mt-1">
            Carefully curated client work and passionate open source endeavors.
          </p>
        </div>

        {/* Categories Tab Pill Controls */}
        <div id="projects-filter-bar" className="flex flex-wrap gap-1.5">
          {categories.map((cat) => {
            const isSelected = activeFilter === cat.id;
            return (
              <button
                id={`filter-btn-${cat.id}`}
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  activeTheme === 'nordic' ? 'px-1.5 py-1' : 'px-3 py-1.5 rounded-lg'
                } ${
                  isSelected ? s.filterActive : s.filterInactive
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid Canvas */}
      <div id="projects-grid" className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((proj) => (
            <motion.div
              id={`project-card-container-${proj.id}`}
              key={proj.id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className={`p-5 rounded-2xl flex flex-col justify-between transition-all group cursor-pointer ${s.cardBg}`}
              onClick={() => setSelectedProject(proj)}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase rounded-md ${s.badge}`}>
                    {proj.category}
                  </span>
                  {proj.featured && (
                    <span className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-widest text-amber-500">
                      <Sparkles className="w-3 h-3 fill-amber-500" />
                      <span>Featured</span>
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-base font-bold tracking-tight group-hover:underline flex items-center justify-between">
                    <span>{proj.title}</span>
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-4px] group-hover:translate-x-0 transition-transform" />
                  </h3>
                  <p className="text-xs opacity-75 mt-1.5 line-clamp-2 leading-relaxed">
                    {proj.description}
                  </p>
                </div>
              </div>

              {/* Badges Footer & Quick Specs */}
              <div className="mt-5 pt-3 border-t border-slate-500/10 flex flex-wrap gap-1.5 items-center">
                {proj.techStack.slice(0, 3).map((tag, i) => (
                  <span key={i} className="text-[10px] font-mono opacity-60">
                    #{tag}
                  </span>
                ))}
                {proj.techStack.length > 3 && (
                  <span className="text-[9px] font-mono opacity-40">
                    +{proj.techStack.length - 3} more
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredProjects.length === 0 && (
          <div id="projects-empty-state" className="col-span-1 md:col-span-2 py-10 text-center rounded-2xl bg-slate-500/5 border border-dashed border-slate-500/10">
            <Code className="w-8 h-8 mx-auto opacity-30 animate-pulse" />
            <p className="text-xs font-semibold opacity-60 mt-2">No projects matching guidelines found.</p>
            <p className="text-[10px] opacity-40 mt-1">Try selecting a different filter above.</p>
          </div>
        )}
      </div>

      {/* Exquisite Details Modal Context Portal */}
      <AnimatePresence>
        {selectedProject && (
          <div id="project-modal-backdrop" className="fixed inset-0 bg-slate-950/50 backdrop-blur-md flex items-center justify-center p-4 z-50">
            <motion.div
              id="project-modal-card"
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className={`w-full max-w-xl rounded-2xl p-6 relative overflow-hidden shadow-2xl ${s.modalBg}`}
            >
              <button
                id="close-project-modal-btn"
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-1.5 rounded-xl hover:bg-slate-500/10 transition-colors opacity-70 hover:opacity-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase rounded-md ${s.badge}`}>
                    {selectedProject.category}
                  </span>
                  {selectedProject.featured && (
                    <span className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-widest text-amber-500">
                      <Sparkles className="w-3 h-3 fill-amber-500" />
                      <span>Featured</span>
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <h3 id="modal-project-title" className="text-xl font-extrabold tracking-tight">
                    {selectedProject.title}
                  </h3>
                  <p id="modal-project-long-desc" className="text-sm opacity-80 leading-relaxed">
                    {selectedProject.longDescription || selectedProject.description}
                  </p>
                </div>

                {/* Tech specifications fully itemized */}
                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase font-bold tracking-widest opacity-50">Core Stack</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.techStack.map((tech, idx) => (
                      <span key={idx} className={`px-2.5 py-1 rounded-md text-[11px] font-mono ${s.badge}`}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project Links CTA */}
                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-500/10">
                  {selectedProject.demoUrl && (
                    <a
                      id="modal-project-url-demo"
                      href={selectedProject.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 text-white dark:bg-white dark:text-black rounded-xl text-xs font-semibold tracking-wide hover:opacity-90 transition-all cursor-pointer shadow-sm"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Launch Prototype</span>
                    </a>
                  )}
                  {selectedProject.githubUrl && (
                    <a
                      id="modal-project-url-git"
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-4 py-2 border border-slate-500/10 hover:bg-slate-500/5 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer"
                    >
                      <Github className="w-4 h-4" />
                      <span>Inspect Repository</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
