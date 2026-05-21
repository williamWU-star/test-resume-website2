/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PortfolioData, Project, Experience, SkillCategory, ThemeType } from '../types';
import { 
  Settings, User, Code, History, Layers, Copy, Check, Download, 
  HelpCircle, ChevronDown, ChevronUp, Plus, Trash2, ArrowLeftRight, HelpCircle as HelpIcon, Sparkles, Terminal
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PortfolioSandboxProps {
  data: PortfolioData;
  onUpdateData: (newData: PortfolioData) => void;
  activeTheme: ThemeType;
}

export default function PortfolioSandbox({ data, onUpdateData, activeTheme }: PortfolioSandboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'projects' | 'timeline' | 'skills' | 'export'>('profile');
  const [copiedCode, setCopiedCode] = useState(false);

  // Accordions for multi-item managers
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const getThemeStyles = () => {
    switch (activeTheme) {
      case 'cosmic':
        return {
          panelBg: 'bg-slate-900 border-l border-slate-800 text-slate-100',
          input: 'bg-slate-950/60 border border-slate-800 focus:border-cyan-500/50 text-slate-100 text-xs',
          activeTab: 'bg-cyan-500 text-slate-950 font-bold',
          inactiveTab: 'bg-slate-950/40 text-slate-400 hover:text-white',
          button: 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs',
          outlineBtn: 'bg-transparent border border-slate-800 text-slate-300 hover:bg-slate-900',
          indicator: 'bg-cyan-400'
        };
      case 'warm':
        return {
          panelBg: 'bg-[#FAF7F2] border-l border-amber-900/20 text-amber-950',
          input: 'bg-white border border-amber-900/10 focus:border-amber-800/40 text-amber-950 text-xs',
          activeTab: 'bg-amber-800 text-white font-semibold',
          inactiveTab: 'bg-amber-100/50 text-amber-900/70 hover:bg-amber-100',
          button: 'bg-amber-800 hover:bg-amber-700 text-white font-semibold text-xs',
          outlineBtn: 'bg-transparent border border-amber-900/15 text-amber-900 hover:bg-amber-100/50',
          indicator: 'bg-amber-800'
        };
      case 'monochrome':
        return {
          panelBg: 'bg-[#121212] border-l border-neutral-800 text-white',
          input: 'bg-black border border-neutral-800 focus:border-white text-white text-xs font-mono',
          activeTab: 'bg-white text-black font-semibold',
          inactiveTab: 'bg-neutral-900 text-neutral-400 hover:bg-neutral-800 border border-neutral-800',
          button: 'bg-white hover:bg-neutral-200 text-black font-semibold text-xs',
          outlineBtn: 'bg-transparent border border-neutral-800 text-neutral-300 hover:bg-neutral-900',
          indicator: 'bg-white'
        };
      case 'nordic':
      default:
        return {
          panelBg: 'bg-[#fdfdfd] border-l border-gray-100 text-[#1a1a1a]',
          input: 'bg-gray-50/40 border border-gray-100 focus:border-gray-300 text-[#1a1a1a] text-xs rounded-lg',
          activeTab: 'bg-[#1a1a1a] text-white font-medium',
          inactiveTab: 'bg-gray-50 text-gray-500 hover:bg-gray-100/50',
          button: 'bg-[#1a1a1a] hover:bg-[#2b2b2b] text-white font-medium text-xs rounded-lg',
          outlineBtn: 'bg-transparent border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg',
          indicator: 'bg-[#1a1a1a]'
        };
    }
  };

  const s = getThemeStyles();

  // Handle high-level visual state changes
  const updateField = (key: keyof PortfolioData, value: any) => {
    onUpdateData({
      ...data,
      [key]: value
    });
  };

  // Profile status switcher helper
  const handleStatusChange = (statusType: PortfolioData['statusType']) => {
    let statusText = '';
    if (statusType === 'available') statusText = 'Open to select freelance work & collaborations';
    if (statusType === 'busy') statusText = 'Fully booked on enterprise contract work';
    if (statusType === 'learning') statusText = 'Acquiring dynamic visual systems heuristics';

    onUpdateData({
      ...data,
      statusType,
      statusText
    });
  };

  // Projects Managers
  const handleProjectUpdate = (index: number, key: keyof Project, value: any) => {
    const updatedProjects = [...data.projects];
    updatedProjects[index] = { ...updatedProjects[index], [key]: value };
    updateField('projects', updatedProjects);
  };

  const handleProjectTechChange = (index: number, techString: string) => {
    const updated = [...data.projects];
    updated[index].techStack = techString.split(',').map(s => s.trim()).filter(Boolean);
    updateField('projects', updated);
  };

  const addProject = () => {
    const defaultProj: Project = {
      id: `new-proj-${Date.now()}`,
      title: 'New Creative Prototype',
      description: 'A brief 1-sentence descriptor of my latest experiment.',
      longDescription: 'An expansion detailing dependencies, performance thresholds, and layout constraints.',
      category: 'development',
      techStack: ['React', 'TypeScript', 'TailwindCSS'],
      featured: false
    };
    const updated = [defaultProj, ...data.projects];
    updateField('projects', updated);
    setOpenAccordion(defaultProj.id);
  };

  const deleteProject = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = data.projects.filter(p => p.id !== id);
    updateField('projects', updated);
  };

  // Timeline Managers
  const handleExperienceUpdate = (index: number, key: keyof Experience, value: any) => {
    const updated = [...data.experiences];
    updated[index] = { ...updated[index], [key]: value };
    updateField('experiences', updated);
  };

  const addExperience = () => {
    const defaultExp: Experience = {
      id: `new-exp-${Date.now()}`,
      role: 'Creative Developer Intern',
      company: 'Global Systems Lab',
      period: '2025 - Present',
      description: 'Assisting core product teams with micro-interaction optimization and custom graphic interfaces.',
      type: 'work'
    };
    const updated = [defaultExp, ...data.experiences];
    updateField('experiences', updated);
    setOpenAccordion(defaultExp.id);
  };

  const deleteExperience = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = data.experiences.filter(exp => exp.id !== id);
    updateField('experiences', updated);
  };

  // Skills Manager
  const handleSkillChange = (catIdx: number, skillIdx: number, key: 'name' | 'proficiency', value: any) => {
    const updated = [...data.skills];
    const category = { ...updated[catIdx] };
    const skills = [...category.skills];
    
    if (key === 'proficiency') {
      skills[skillIdx] = { ...skills[skillIdx], proficiency: Math.min(100, Math.max(0, Number(value))) };
    } else {
      skills[skillIdx] = { ...skills[skillIdx], name: value };
    }
    
    category.skills = skills;
    updated[catIdx] = category;
    updateField('skills', updated);
  };

  const addSkillToCategory = (catIdx: number) => {
    const updated = [...data.skills];
    const category = { ...updated[catIdx] };
    category.skills = [...category.skills, { name: 'Novel skill', proficiency: 80 }];
    updated[catIdx] = category;
    updateField('skills', updated);
  };

  const removeSkillFromCategory = (catIdx: number, skillIdx: number) => {
    const updated = [...data.skills];
    const category = { ...updated[catIdx] };
    category.skills = category.skills.filter((_, idx) => idx !== skillIdx);
    updated[catIdx] = category;
    updateField('skills', updated);
  };

  // Generate copyable JSON config representation of custom state!
  const generateDataCode = () => {
    return `/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * PERSONAL CUSTOMIZED CONFIGURATION
 * Generated using Interactive Sandbox on ${new Date().toISOString().slice(0, 10)}
 */

import { PortfolioData } from './types';

export const defaultPortfolioData: PortfolioData = ${JSON.stringify(data, null, 2)};
`;
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generateDataCode());
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <>
      {/* Floating Toggle Activator */}
      <button
        id="sandbox-toggle-floating-btn"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-[18px] right-[18px] z-40 p-3 rounded-full bg-slate-900 border border-slate-800 text-white hover:bg-slate-800 shadow-xl flex items-center gap-2 hover:scale-105 active:scale-95 transition-all text-xs font-bold uppercase tracking-wider cursor-pointer"
        title="Portfolio Configuration Studio"
      >
        <Settings className="w-4 h-4 animate-spin-slow" />
        <span>Customize Site</span>
      </button>

      {/* Slide-out Customization Panel Canvas */}
      <AnimatePresence>
        {isOpen && (
          <div id="sandbox-drawer-overlay" className="fixed inset-0 z-40 flex justify-end bg-slate-950/25 pointer-events-none">
            {/* Catch clicks outside to close */}
            <div className="absolute inset-0 pointer-events-auto" onClick={() => setIsOpen(false)} />

            {/* Sidebar Form */}
            <motion.div
              id="sandbox-drawer-panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className={`w-full max-w-md sm:max-w-lg h-full relative z-15 flex flex-col pointer-events-auto shadow-2xl ${s.panelBg}`}
            >
              {/* Header */}
              <div id="sandbox-header" className="p-4.5 border-b border-slate-500/10 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold flex items-center gap-1.5 uppercase tracking-wider">
                    <Terminal className="w-4 h-4 text-emerald-500" />
                    <span>Sandbox Studio</span>
                  </h2>
                  <p className="text-[10px] opacity-60 mt-0.5 leading-none">
                    Tailor biography, milestones, and work modules dynamically.
                  </p>
                </div>
                <button
                  id="sandbox-close-panel-btn"
                  onClick={() => setIsOpen(false)}
                  className="px-2.5 py-1 text-[10px] font-bold uppercase hover:bg-slate-500/10 rounded-lg cursor-pointer"
                >
                  Hide Studio
                </button>
              </div>

              {/* Sub navigation Tabs */}
              <div id="sandbox-tabs-bar" className="grid grid-cols-5 gap-1 p-2 bg-slate-500/5 border-b border-slate-500/10">
                {(['profile', 'projects', 'timeline', 'skills', 'export'] as const).map((tab) => {
                  const isActive = activeTab === tab;
                  return (
                    <button
                      id={`sandbox-tab-btn-${tab}`}
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-1.5 rounded-lg text-[9px] font-bold uppercase text-center transition-all cursor-pointer ${
                        isActive ? s.activeTab : s.inactiveTab
                      }`}
                    >
                      {tab}
                    </button>
                  );
                })}
              </div>

              {/* Scrollable Form Content */}
              <div id="sandbox-forms-scrollable-box" className="flex-1 overflow-y-auto p-4.5 space-y-5">
                
                {/* 1. Profile and Core Meta tab */}
                {activeTab === 'profile' && (
                  <div id="sandbox-tab-profile-fields" className="space-y-4">
                    <div className="flex gap-2 items-center text-xs font-bold opacity-70 uppercase tracking-widest pb-1 border-b border-slate-500/5">
                      <User className="w-3.5 h-3.5" />
                      <span>Identity Credentials</span>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider opacity-60">Full Name</label>
                      <input
                        id="sandbox-input-name"
                        type="text"
                        value={data.fullName}
                        onChange={(e) => updateField('fullName', e.target.value)}
                        className={`w-full p-2.5 rounded-lg ${s.input}`}
                        placeholder="Alex Chen"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider opacity-60">Professional Title</label>
                      <input
                        id="sandbox-input-title"
                        type="text"
                        value={data.title}
                        onChange={(e) => updateField('title', e.target.value)}
                        className={`w-full p-2.5 rounded-lg ${s.input}`}
                        placeholder="Full Stack Developer"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider opacity-60">Headline Tagline</label>
                      <textarea
                        id="sandbox-input-tagline"
                        rows={2}
                        value={data.tagline}
                        onChange={(e) => updateField('tagline', e.target.value)}
                        className={`w-full p-2.5 rounded-lg ${s.input}`}
                        placeholder="Building systems..."
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider opacity-60">Complete About Me Biography Statement</label>
                      <textarea
                        id="sandbox-input-aboutme"
                        rows={3}
                        value={data.aboutMe}
                        onChange={(e) => updateField('aboutMe', e.target.value)}
                        className={`w-full p-2.5 rounded-lg ${s.input}`}
                        placeholder="Detailed background..."
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider opacity-60">Availability Status</label>
                      <div className="grid grid-cols-3 gap-2">
                        {(['available', 'busy', 'learning'] as const).map((status) => (
                          <button
                            id={`sandbox-status-opt-${status}`}
                            key={status}
                            type="button"
                            onClick={() => handleStatusChange(status)}
                            className={`p-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all border cursor-pointer ${
                              data.statusType === status
                                ? 'bg-slate-900 border-slate-900 text-white dark:bg-white dark:text-black dark:border-white'
                                : 'bg-transparent border-slate-500/20 opacity-70 hover:opacity-100'
                            }`}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                      <input
                        id="sandbox-input-statustext"
                        type="text"
                        value={data.statusText}
                        onChange={(e) => updateField('statusText', e.target.value)}
                        className={`w-full p-2.5 rounded-lg mt-1 opacity-80 ${s.input}`}
                      />
                    </div>
                  </div>
                )}

                {/* 2. Projects tab */}
                {activeTab === 'projects' && (
                  <div id="sandbox-tab-projects-fields" className="space-y-4">
                    <div className="flex items-center justify-between pb-1 border-b border-slate-500/5">
                      <div className="flex gap-2 items-center text-xs font-bold opacity-70 uppercase tracking-widest">
                        <Code className="w-3.5 h-3.5" />
                        <span>Featured works list</span>
                      </div>
                      <button
                        id="sandbox-add-project-btn"
                        onClick={addProject}
                        className={`px-2 py-1 rounded-lg flex items-center gap-1 cursor-pointer transition-all ${s.button}`}
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Project</span>
                      </button>
                    </div>

                    <div className="space-y-2.5">
                      {data.projects.map((proj, idx) => {
                        const isExpanded = openAccordion === proj.id;
                        return (
                          <div 
                            id={`sandbox-project-node-${proj.id}`}
                            key={proj.id} 
                            className="border border-slate-500/10 rounded-xl overflow-hidden"
                          >
                            {/* Accordion header trigger */}
                            <div
                              id={`sandbox-project-header-trigger-${proj.id}`}
                              onClick={() => toggleAccordion(proj.id)}
                              className="p-3 bg-slate-500/5 flex items-center justify-between cursor-pointer hover:bg-slate-500/10"
                            >
                              <div className="flex items-center gap-2">
                                <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${s.inactiveTab}`}>
                                  {proj.category}
                                </span>
                                <span className="text-xs font-bold tracking-tight line-clamp-1 max-w-[150px]">
                                  {proj.title}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  id={`sandbox-delete-project-btn-${proj.id}`}
                                  onClick={(e) => deleteProject(proj.id, e)}
                                  className="p-1 hover:text-rose-500 rounded-md transition-colors"
                                  title="Delete Project placeholder"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                              </div>
                            </div>

                            {/* Accordion body forms */}
                            {isExpanded && (
                              <div id={`sandbox-project-body-${proj.id}`} className="p-3 bg-transparent space-y-3 border-t border-slate-500/10">
                                <div className="space-y-1">
                                  <label className="text-[9px] uppercase font-bold opacity-60">Title</label>
                                  <input
                                    id={`sandbox-proj-title-${idx}`}
                                    type="text"
                                    value={proj.title}
                                    onChange={(e) => handleProjectUpdate(idx, 'title', e.target.value)}
                                    className={`w-full p-2.5 rounded-lg ${s.input}`}
                                  />
                                </div>

                                <div className="grid grid-cols-2 gap-2">
                                  <div className="space-y-1">
                                    <label className="text-[9px] uppercase font-bold opacity-60">Classification</label>
                                    <select
                                      id={`sandbox-proj-category-${idx}`}
                                      value={proj.category}
                                      onChange={(e) => handleProjectUpdate(idx, 'category', e.target.value)}
                                      className={`w-full p-2.5 rounded-lg ${s.input}`}
                                    >
                                      <option value="development">Development</option>
                                      <option value="design">Product Design</option>
                                      <option value="creative">Creative Art</option>
                                    </select>
                                  </div>

                                  <div className="space-y-2 flex items-center justify-start pt-4.5">
                                    <input
                                      id={`sandbox-proj-featured-${idx}`}
                                      type="checkbox"
                                      checked={proj.featured}
                                      onChange={(e) => handleProjectUpdate(idx, 'featured', e.target.checked)}
                                      className="rounded border-slate-500/20 text-slate-900 focus:ring-slate-900 w-4 h-4 cursor-pointer"
                                    />
                                    <label className="text-[10px] font-bold uppercase tracking-wider ml-1.5 opacity-70">
                                      Star Spotlight
                                    </label>
                                  </div>
                                </div>

                                <div className="space-y-1">
                                  <label className="text-[9px] uppercase font-bold opacity-60">Short Abstract</label>
                                  <input
                                    id={`sandbox-proj-desc-${idx}`}
                                    type="text"
                                    value={proj.description}
                                    onChange={(e) => handleProjectUpdate(idx, 'description', e.target.value)}
                                    className={`w-full p-2.5 rounded-lg ${s.input}`}
                                  />
                                </div>

                                <div className="space-y-1">
                                  <label className="text-[9px] uppercase font-bold opacity-60">In-Depth Description (Modal details)</label>
                                  <textarea
                                    id={`sandbox-proj-longdesc-${idx}`}
                                    rows={2}
                                    value={proj.longDescription || ''}
                                    onChange={(e) => handleProjectUpdate(idx, 'longDescription', e.target.value)}
                                    className={`w-full p-2.5 rounded-lg ${s.input}`}
                                  />
                                </div>

                                <div className="space-y-1">
                                  <label className="text-[9px] uppercase font-bold opacity-60">Tech Specs (comma separated)</label>
                                  <input
                                    id={`sandbox-proj-tech-${idx}`}
                                    type="text"
                                    value={proj.techStack.join(', ')}
                                    onChange={(e) => handleProjectTechChange(idx, e.target.value)}
                                    className={`w-full p-2.5 rounded-lg ${s.input}`}
                                    placeholder="React, Direct3D, UI Layout"
                                  />
                                </div>

                                <div className="grid grid-cols-2 gap-2">
                                  <div className="space-y-1">
                                    <label className="text-[9px] uppercase font-bold opacity-60">Demo URL</label>
                                    <input
                                      id={`sandbox-proj-demo-${idx}`}
                                      type="text"
                                      value={proj.demoUrl || ''}
                                      onChange={(e) => handleProjectUpdate(idx, 'demoUrl', e.target.value)}
                                      className={`w-full p-2.5 rounded-lg ${s.input}`}
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[9px] uppercase font-bold opacity-60">GitHub Code URL</label>
                                    <input
                                      id={`sandbox-proj-github-${idx}`}
                                      type="text"
                                      value={proj.githubUrl || ''}
                                      onChange={(e) => handleProjectUpdate(idx, 'githubUrl', e.target.value)}
                                      className={`w-full p-2.5 rounded-lg ${s.input}`}
                                    />
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 3. Experience tab */}
                {activeTab === 'timeline' && (
                  <div id="sandbox-tab-timeline-fields" className="space-y-4">
                    <div className="flex items-center justify-between pb-1 border-b border-slate-500/5">
                      <div className="flex gap-2 items-center text-xs font-bold opacity-70 uppercase tracking-widest">
                        <History className="w-3.5 h-3.5" />
                        <span>Professional Chronology</span>
                      </div>
                      <button
                        id="sandbox-add-experience-btn"
                        onClick={addExperience}
                        className={`px-2 py-1 rounded-lg flex items-center gap-1 cursor-pointer transition-all ${s.button}`}
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Step</span>
                      </button>
                    </div>

                    <div className="space-y-2.5">
                      {data.experiences.map((exp, idx) => {
                        const isExpanded = openAccordion === exp.id;
                        return (
                          <div id={`sandbox-exp-node-${exp.id}`} key={exp.id} className="border border-slate-500/10 rounded-xl overflow-hidden">
                            {/* Accordion Trigger */}
                            <div
                              id={`sandbox-exp-header-trigger-${exp.id}`}
                              onClick={() => toggleAccordion(exp.id)}
                              className="p-3 bg-slate-500/5 flex items-center justify-between cursor-pointer hover:bg-slate-500/10"
                            >
                              <div className="flex items-center gap-2">
                                <span className={`text-[9px] uppercase font-bold px-1.5 py-0.5 rounded ${s.inactiveTab}`}>
                                  {exp.type}
                                </span>
                                <span className="text-xs font-bold tracking-tight line-clamp-1 max-w-[150px]">
                                  {exp.role} @ {exp.company}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  id={`sandbox-delete-experience-btn-${exp.id}`}
                                  onClick={(e) => deleteExperience(exp.id, e)}
                                  className="p-1 hover:text-rose-500 rounded-md transition-colors"
                                  title="Delete Step"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                              </div>
                            </div>

                            {/* Accordion form */}
                            {isExpanded && (
                              <div id={`sandbox-exp-body-${exp.id}`} className="p-3 bg-transparent space-y-3 border-t border-slate-500/10">
                                <div className="grid grid-cols-2 gap-2">
                                  <div className="space-y-1">
                                    <label className="text-[9px] uppercase font-bold opacity-60">Company / Inst</label>
                                    <input
                                      id={`sandbox-exp-company-${idx}`}
                                      type="text"
                                      value={exp.company}
                                      onChange={(e) => handleExperienceUpdate(idx, 'company', e.target.value)}
                                      className={`w-full p-2.5 rounded-lg ${s.input}`}
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[9px] uppercase font-bold opacity-60">Role / Cert</label>
                                    <input
                                      id={`sandbox-exp-role-${idx}`}
                                      type="text"
                                      value={exp.role}
                                      onChange={(e) => handleExperienceUpdate(idx, 'role', e.target.value)}
                                      className={`w-full p-2.5 rounded-lg ${s.input}`}
                                    />
                                  </div>
                                </div>

                                <div className="grid grid-cols-2 gap-2">
                                  <div className="space-y-1">
                                    <label className="text-[9px] uppercase font-bold opacity-60">Timeline Calendar Period</label>
                                    <input
                                      id={`sandbox-exp-period-${idx}`}
                                      type="text"
                                      value={exp.period}
                                      onChange={(e) => handleExperienceUpdate(idx, 'period', e.target.value)}
                                      className={`w-full p-2.5 rounded-lg ${s.input}`}
                                      placeholder="2023 - Present"
                                    />
                                  </div>

                                  <div className="space-y-1">
                                    <label className="text-[9px] uppercase font-bold opacity-60">Type Category</label>
                                    <select
                                      id={`sandbox-exp-type-${idx}`}
                                      value={exp.type}
                                      onChange={(e) => handleExperienceUpdate(idx, 'type', e.target.value)}
                                      className={`w-full p-2.5 rounded-lg ${s.input}`}
                                    >
                                      <option value="work">Business Employment</option>
                                      <option value="education">Scholastic / Academic</option>
                                      <option value="milestone">Key Milestone / Award</option>
                                    </select>
                                  </div>
                                </div>

                                <div className="space-y-1">
                                  <label className="text-[9px] uppercase font-bold opacity-60">Contributions / Summary Abstract</label>
                                  <textarea
                                    id={`sandbox-exp-desc-${idx}`}
                                    rows={2}
                                    value={exp.description}
                                    onChange={(e) => handleExperienceUpdate(idx, 'description', e.target.value)}
                                    className={`w-full p-2.5 rounded-lg ${s.input}`}
                                    placeholder="What was designed or written during this milestone?"
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 4. Skills tab */}
                {activeTab === 'skills' && (
                  <div id="sandbox-tab-skills-fields" className="space-y-5">
                    <div className="flex gap-2 items-center text-xs font-bold opacity-70 uppercase tracking-widest pb-1 border-b border-slate-500/5">
                      <Layers className="w-3.5 h-3.5" />
                      <span>Skill Metrics Editor</span>
                    </div>

                    {data.skills.map((cat, catIdx) => (
                      <div 
                        id={`sandbox-skill-cat-row-${catIdx}`}
                        key={cat.id || catIdx} 
                        className="p-3 border border-slate-500/10 rounded-xl space-y-3 bg-slate-500/5"
                      >
                        <div className="flex items-center justify-between">
                          <input
                            id={`sandbox-skill-catname-${catIdx}`}
                            type="text"
                            value={cat.name}
                            onChange={(e) => {
                              const updated = [...data.skills];
                              updated[catIdx].name = e.target.value;
                              updateField('skills', updated);
                            }}
                            className="bg-transparent font-bold text-xs border-b border-dashed border-slate-500/30 focus:border-slate-500 focus:outline-none w-1/2"
                          />
                          <button
                            id={`sandbox-add-skill-to-cat-btn-${catIdx}`}
                            onClick={() => addSkillToCategory(catIdx)}
                            className={`px-1.5 py-0.5 rounded text-[9px] flex items-center gap-0.5 cursor-pointer hover:opacity-90 ${s.button}`}
                          >
                            <Plus className="w-3 h-3" />
                            <span>Add</span>
                          </button>
                        </div>

                        {/* List items inside the category */}
                        <div className="space-y-2">
                          {cat.skills.map((skill, skillIdx) => (
                            <div key={skillIdx} className="flex gap-2 items-center">
                              <input
                                id={`sandbox-skill-name-${catIdx}-${skillIdx}`}
                                type="text"
                                value={skill.name}
                                onChange={(e) => handleSkillChange(catIdx, skillIdx, 'name', e.target.value)}
                                className={`flex-1 p-1.5 rounded text-xs ${s.input}`}
                              />
                              <input
                                id={`sandbox-skill-prof-${catIdx}-${skillIdx}`}
                                type="number"
                                min={0}
                                max={100}
                                value={skill.proficiency}
                                onChange={(e) => handleSkillChange(catIdx, skillIdx, 'proficiency', e.target.value)}
                                className={`w-14 p-1.5 rounded text-xs font-mono text-center ${s.input}`}
                              />
                              <span className="text-[10px]">%</span>
                              <button
                                id={`sandbox-delete-skill-item-btn-${catIdx}-${skillIdx}`}
                                onClick={() => removeSkillFromCategory(catIdx, skillIdx)}
                                className="p-1 hover:text-rose-500 cursor-pointer"
                                title="Remove skill item"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* 5. Code Exporter and GitHub Instructions */}
                {activeTab === 'export' && (
                  <div id="sandbox-tab-export-fields" className="space-y-4">
                    <div className="flex gap-2 items-center text-xs font-bold opacity-70 uppercase tracking-widest pb-1 border-b border-slate-500/5">
                      <Download className="w-3.5 h-3.5" />
                      <span>Release & Distribute code</span>
                    </div>

                    <p className="text-xs leading-relaxed opacity-85">
                      Your visual changes have recalculated the underlying TSX state. Deploy of your portfolio to your local workspace or GitHub is simple.
                    </p>

                    {/* Step-by-step guideline card */}
                    <div id="sandbox-github-steps" className="p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-xl space-y-2 text-xs">
                      <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                        <span>GitHub Pages 2-Minute Setup</span>
                      </span>
                      <ol className="list-decimal list-inside space-y-1.5 text-xs opacity-90 leading-relaxed">
                        <li>
                          Copy the customized configurations below.
                        </li>
                        <li>
                          Paste inside your workspace project file at <code className="font-mono bg-slate-500/10 px-1 rounded text-[10px]">/src/data.ts</code>.
                        </li>
                        <li>
                          Commit code and push to a fresh repository on your GitHub account.
                        </li>
                        <li>
                          Under repository <span className="font-semibold">Settings</span> → <span className="font-semibold">Pages</span>, chose deploy from branch and select standard automated actions. Your personal website registers completely live!
                        </li>
                      </ol>
                    </div>

                    {/* Code copying preview blocks container */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[10px] uppercase font-bold opacity-60">
                        <span>/src/data.ts Code blocks</span>
                        <button
                          id="sandbox-copy-code-btn"
                          onClick={handleCopyCode}
                          className="flex items-center gap-1 text-[9px] hover:underline cursor-pointer transition-colors"
                        >
                          {copiedCode ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-500" />
                              <span className="text-emerald-500">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy Block</span>
                            </>
                          )}
                        </button>
                      </div>

                      <pre className="p-3 bg-black text-slate-300 rounded-xl font-mono text-[9px] overflow-x-auto max-h-[180px] border border-neutral-800 leading-normal scrollbar-none">
                        {generateDataCode()}
                      </pre>
                    </div>
                  </div>
                )}

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
