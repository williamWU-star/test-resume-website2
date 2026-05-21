/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Experience, ThemeType } from '../types';
import { Briefcase, GraduationCap, History, Globe, Calendar } from 'lucide-react';
import { motion } from 'motion/react';

interface TimelineSectionProps {
  experiences: Experience[];
  activeTheme: ThemeType;
}

export default function TimelineSection({ experiences, activeTheme }: TimelineSectionProps) {
  const getThemeStyles = () => {
    switch (activeTheme) {
      case 'cosmic':
        return {
          iconBg: 'bg-cyan-950/40 text-cyan-400 border border-cyan-500/40',
          line: 'bg-gradient-to-b from-cyan-500/50 to-indigo-500/10',
          card: 'bg-slate-900/30 border border-slate-800/80 hover:bg-slate-900/40',
          accentText: 'text-cyan-400',
          tagBg: 'bg-slate-900 text-slate-400 border border-slate-800'
        };
      case 'warm':
        return {
          iconBg: 'bg-amber-100 text-amber-900 border border-amber-900/15',
          line: 'bg-gradient-to-b from-amber-700/30 to-amber-100/10',
          card: 'bg-white border border-amber-900/5 hover:border-amber-900/10',
          accentText: 'text-amber-800',
          tagBg: 'bg-amber-100/40 text-amber-900 border border-amber-900/10'
        };
      case 'monochrome':
        return {
          iconBg: 'bg-neutral-900 text-white border border-neutral-800',
          line: 'bg-neutral-800',
          card: 'bg-neutral-900/40 border border-neutral-800 hover:bg-neutral-900/60',
          accentText: 'text-white',
          tagBg: 'bg-neutral-900 text-neutral-400 border border-neutral-800'
        };
      case 'nordic':
      default:
        return {
          iconBg: 'bg-gray-50 text-[#1a1a1a] border border-gray-100/80 shadow-none',
          line: 'bg-gray-100',
          card: 'bg-transparent border border-gray-100 hover:bg-gray-50/30 hover:border-gray-200 rounded-xl shadow-none',
          accentText: 'text-[#1a1a1a]',
          tagBg: 'bg-gray-50 text-gray-500 border border-gray-100/60'
        };
    }
  };

  const s = getThemeStyles();

  const getTimelineIcon = (type: Experience['type']) => {
    switch (type) {
      case 'work':
        return <Briefcase className="w-4 h-4" />;
      case 'education':
        return <GraduationCap className="w-4 h-4" />;
      case 'milestone':
      default:
        return <Globe className="w-4 h-4" />;
    }
  };

  const sortedExperiences = [...experiences]; // Already ordered by default, but customizable later!

  return (
    <div id="timeline-section-container" className="space-y-6">
      {/* Title block */}
      <div id="timeline-header">
        <h2 id="timeline-title" className={`text-2xl font-bold tracking-tight flex items-center gap-2 ${s.accentText}`}>
          <History className="w-5 h-5" />
          <span>Professional Chronology</span>
        </h2>
        <p id="timeline-subtitle" className="text-xs opacity-60 mt-1">
          Milestones, contributions, and formative educational pathways.
        </p>
      </div>

      {/* Vertical Connected List */}
      <div id="timeline-vertical-structure" className="relative pl-6 space-y-6">
        {/* Dynamic connecting line */}
        <div 
          id="timeline-indicator-line" 
          className={`absolute left-[11px] top-4 bottom-4 w-[2px] rounded-full ${s.line}`} 
        />

        {sortedExperiences.length === 0 ? (
          <div id="timeline-empty-view" className="py-8 text-center text-xs opacity-50">
            No dynamic chronology loaded. Use Sandbox to append entries.
          </div>
        ) : (
          sortedExperiences.map((exp, index) => (
            <motion.div
              id={`timeline-node-${exp.id}`}
              key={exp.id}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
              className="relative flex gap-5 md:gap-6 items-start"
            >
              {/* Outer icon indicator node */}
              <div 
                id={`timeline-node-icon-${exp.id}`}
                className={`absolute left-[-21px] flex items-center justify-center w-8 h-8 rounded-full z-10 p-1 bg-white dark:bg-black font-semibold shadow-sm ${s.iconBg}`}
              >
                {getTimelineIcon(exp.type)}
              </div>

              {/* Dynamic Information Card details */}
              <div 
                id={`timeline-card-${exp.id}`}
                className={`w-full p-4 md:p-5 rounded-2xl transition-all ${s.card}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-base font-bold tracking-tight">
                      {exp.role}
                    </h3>
                    <p className={`text-xs font-semibold ${s.accentText}`}>
                      {exp.company}
                    </p>
                  </div>

                  {/* Status Period Tag */}
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-semibold tracking-wide self-start sm:self-center ${s.tagBg}`}>
                    <Calendar className="w-3 h-3 opacity-60" />
                    <span>{exp.period}</span>
                  </span>
                </div>

                <p className="text-xs opacity-75 mt-3 leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
