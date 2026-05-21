/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ThemeType } from '../types';
import { Monitor, Sun, Moon, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface ThemeSelectorProps {
  currentTheme: ThemeType;
  onChangeTheme: (theme: ThemeType) => void;
}

export default function ThemeSelector({ currentTheme, onChangeTheme }: ThemeSelectorProps) {
  const themesList: { id: ThemeType; name: string; icon: React.ReactNode; desc: string; colors: string[] }[] = [
    {
      id: 'nordic',
      name: 'Clean Minimalism',
      icon: <Sun id="theme-icon-nordic" className="w-4 h-4" />,
      desc: 'Pristine Swiss Slate, spacious off-white',
      colors: ['bg-[#fdfdfd]', 'bg-white', 'bg-[#1a1a1a]']
    },
    {
      id: 'cosmic',
      name: 'Cosmic Dusk',
      icon: <Sparkles id="theme-icon-cosmic" className="w-4 h-4" />,
      desc: 'Deep universe dark with stellar cyan highlights',
      colors: ['bg-[#0B0F19]', 'bg-slate-900', 'bg-cyan-500']
    },
    {
      id: 'warm',
      name: 'Warm Linen',
      icon: <Monitor id="theme-icon-warm" className="w-4 h-4" />,
      desc: 'Cozy cream, organic textures, terracotta feel',
      colors: ['bg-[#FAF7F2]', 'bg-white', 'bg-amber-800']
    },
    {
      id: 'monochrome',
      name: 'Cyber Stark',
      icon: <Moon id="theme-icon-monochrome" className="w-4 h-4" />,
      desc: 'High-contrast monochrome, ultra-modern bold aesthetic',
      colors: ['bg-black', 'bg-neutral-900', 'bg-white']
    }
  ];

  return (
    <div id="theme-selector-container" className="flex flex-col gap-2 p-2 rounded-2xl bg-slate-500/5 backdrop-blur-sm border border-slate-500/10">
      <div id="theme-selector-header" className="flex items-center gap-1.5 px-2 py-1 text-xs font-semibold uppercase tracking-wider opacity-60">
        <Sparkles className="w-3.5 h-3.5" />
        <span>Canvas Aesthetics</span>
      </div>
      <div id="theme-options-grid" className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        {themesList.map((theme) => {
          const isActive = currentTheme === theme.id;
          return (
            <button
              id={`theme-btn-${theme.id}`}
              key={theme.id}
              onClick={() => onChangeTheme(theme.id)}
              className={`relative flex flex-col items-start gap-1 p-3 rounded-xl text-left transition-all overflow-hidden cursor-pointer group ${
                isActive
                  ? 'bg-white dark:bg-slate-900 shadow-md ring-1 ring-slate-900/10 scale-[1.02] z-10'
                  : 'hover:bg-slate-500/5'
              }`}
            >
              {isActive && (
                <motion.div
                  id={`theme-active-indicator-${theme.id}`}
                  layoutId="activeThemeHighlight"
                  className="absolute inset-0 bg-slate-50/20 pointer-events-none rounded-xl"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <div className="flex items-center justify-between w-full">
                <span className={`p-1.5 rounded-lg ${isActive ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white' : 'text-slate-500'}`}>
                  {theme.icon}
                </span>
                
                {/* Micro colors dot preview */}
                <div className="flex -space-x-1">
                  {theme.colors.map((c, idx) => (
                    <span 
                      key={idx} 
                      className={`w-3 h-3 rounded-full border border-slate-200 dark:border-slate-800 ${c}`}
                    />
                  ))}
                </div>
              </div>
              <div className="mt-1">
                <p className="text-sm font-semibold tracking-tight leading-none">
                  {theme.name}
                </p>
                <p className="text-[10px] mt-0.5 opacity-60 leading-normal line-clamp-1">
                  {theme.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
