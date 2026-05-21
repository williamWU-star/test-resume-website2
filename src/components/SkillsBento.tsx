/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SkillCategory, ThemeType } from '../types';
import { Layers, Lightbulb } from 'lucide-react';
import { motion } from 'motion/react';

interface SkillsBentoProps {
  categories: SkillCategory[];
  activeTheme: ThemeType;
}

export default function SkillsBento({ categories, activeTheme }: SkillsBentoProps) {
  const getThemeStyles = () => {
    switch (activeTheme) {
      case 'cosmic':
        return {
          cardBg: 'bg-slate-900/30 border border-slate-800/80',
          skillBarBg: 'bg-slate-800',
          skillBarFill: 'bg-gradient-to-r from-cyan-500 to-indigo-500',
          accentText: 'text-cyan-400',
          tag: 'bg-cyan-950/40 text-cyan-400'
        };
      case 'warm':
        return {
          cardBg: 'bg-white border border-amber-900/10 shadow-sm',
          skillBarBg: 'bg-amber-100',
          skillBarFill: 'bg-gradient-to-r from-amber-700 to-amber-900',
          accentText: 'text-amber-800',
          tag: 'bg-amber-100 text-amber-900'
        };
      case 'monochrome':
        return {
          cardBg: 'bg-neutral-900/40 border border-neutral-800',
          skillBarBg: 'bg-neutral-800',
          skillBarFill: 'bg-white',
          accentText: 'text-white',
          tag: 'bg-neutral-900 text-white border border-neutral-800'
        };
      case 'nordic':
      default:
        return {
          cardBg: 'bg-transparent border border-gray-100 shadow-none rounded-xl',
          skillBarBg: 'bg-gray-100/60',
          skillBarFill: 'bg-[#1a1a1a]',
          accentText: 'text-[#1a1a1a]',
          tag: 'bg-gray-100/50 text-[#1a1a1a]'
        };
    }
  };

  const s = getThemeStyles();

  return (
    <div id="skills-section-container" className="space-y-6">
      {/* Dynamic Header */}
      <div id="skills-header">
        <h2 id="skills-title" className={`text-2xl font-bold tracking-tight flex items-center gap-2 ${s.accentText}`}>
          <Layers className="w-5 h-5" />
          <span>Capability Matrix</span>
        </h2>
        <p id="skills-subtitle" className="text-xs opacity-60 mt-1">
          Specialties, runtime frameworks, and workflows.
        </p>
      </div>

      {/* Grid bento boards */}
      <div id="skills-bento-grid" className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((cat, catIdx) => (
          <div 
            id={`skills-category-card-${cat.id || catIdx}`}
            key={cat.id || catIdx}
            className={`p-5 rounded-2xl space-y-4 ${s.cardBg}`}
          >
            <div className="flex items-center gap-1.5 opacity-85">
              <Lightbulb className={`w-4 h-4 ${s.accentText}`} />
              <h3 className="text-sm font-bold uppercase tracking-wider">
                {cat.name}
              </h3>
            </div>

            {/* List of skills with bar animation */}
            <div className="space-y-3 pt-1">
              {cat.skills.map((skill, sIdx) => (
                <div key={sIdx} className="space-y-1.5 group">
                  <div className="flex items-center justify-between text-xs font-semibold leading-none">
                    <span className="opacity-80 group-hover:opacity-100 transition-opacity">
                      {skill.name}
                    </span>
                    <span className={`font-mono text-[10px] ${s.accentText}`}>
                      {skill.proficiency}%
                    </span>
                  </div>

                  {/* Horizontal visual indicator bar */}
                  <div className={`w-full h-1.5 rounded-full overflow-hidden ${s.skillBarBg}`}>
                    <motion.div
                      id={`skill-fill-${cat.id}-${sIdx}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.proficiency}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.1, ease: 'easeOut' }}
                      className={`h-full rounded-full ${s.skillBarFill}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
