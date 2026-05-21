/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { defaultPortfolioData } from './data';
import { PortfolioData, ThemeType } from './types';
import ThemeSelector from './components/ThemeSelector';
import HeroSection from './components/HeroSection';
import ProjectsGrid from './components/ProjectsGrid';
import TimelineSection from './components/TimelineSection';
import SkillsBento from './components/SkillsBento';
import ContactForm from './components/ContactForm';
import PortfolioSandbox from './components/PortfolioSandbox';
import { Sparkles, Terminal, Code2, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(defaultPortfolioData);
  const [activeTheme, setActiveTheme] = useState<ThemeType>('nordic');
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  // Real-time dynamic clock to give the personal landing page a premium, live quality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getThemeClass = () => {
    switch (activeTheme) {
      case 'cosmic':
        return {
          wrapper: 'bg-[#0B0F19] text-slate-100 min-h-screen selection:bg-cyan-900/50 selection:text-white transition-colors duration-500',
          container: 'bg-slate-900/50 border border-slate-800/80 backdrop-blur-md shadow-2xl p-6 md:p-10 rounded-3xl space-y-12 md:space-y-16',
          clockText: 'text-cyan-400 font-mono',
          footerText: 'text-slate-500',
          hr: 'border-slate-800'
        };
      case 'warm':
        return {
          wrapper: 'bg-[#FAF7F2] text-amber-950 min-h-screen selection:bg-amber-100 selection:text-amber-900 transition-colors duration-500',
          container: 'bg-white border border-amber-900/10 shadow-lg p-6 md:p-10 rounded-3xl space-y-12 md:space-y-16',
          clockText: 'text-amber-800 font-mono',
          footerText: 'text-amber-900/60',
          hr: 'border-amber-900/5'
        };
      case 'monochrome':
        return {
          wrapper: 'bg-black text-white min-h-screen selection:bg-neutral-800 selection:text-white transition-colors duration-500',
          container: 'bg-neutral-900/40 border border-neutral-800 shadow-xl p-6 md:p-10 rounded-3xl space-y-12 md:space-y-16',
          clockText: 'text-white font-mono',
          footerText: 'text-neutral-500',
          hr: 'border-neutral-800'
        };
      case 'nordic':
      default:
        return {
          wrapper: 'bg-[#fdfdfd] text-[#1a1a1a] min-h-screen selection:bg-gray-100 selection:text-black transition-colors duration-500 font-sans antialiased',
          container: 'bg-[#fdfdfd] shadow-none border-none p-0 md:p-2 space-y-20 md:space-y-28',
          clockText: 'text-gray-400 font-mono text-[10px] tracking-widest',
          footerText: 'text-gray-400 uppercase tracking-widest text-[10px]',
          hr: 'border-gray-100'
        };
    }
  };

  const styleSet = getThemeClass();

  // Helper calculation for initials logo icon
  const brandInitials = portfolioData.fullName
    .split(' ')
    .map(name => name[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'AC';

  return (
    <div id="app-wrapper" className={styleSet.wrapper}>
      {/* Visual Top Decorative Ribbon bar */}
      <div id="top-accent-bar" className={`h-1 w-full bg-gradient-to-r ${
        activeTheme === 'cosmic' ? 'from-cyan-500 via-indigo-500 to-purple-500' :
        activeTheme === 'warm' ? 'from-amber-600 to-amber-900' :
        activeTheme === 'monochrome' ? 'from-neutral-700 via-white to-neutral-700' :
        'from-[#fdfdfd] to-[#fdfdfd]'
      }`} />

      <main id="app-main-layout" className="max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-12 space-y-8">
        
        {/* Navigation / Header Grid block */}
        <header id="app-header" className={`flex flex-col sm:flex-row items-center justify-between gap-4 pb-5 border-b ${
          activeTheme === 'nordic' ? 'border-gray-100' : 'border-slate-500/10'
        }`}>
          
          {/* Logo identity */}
          <div id="header-brand" className="flex items-center gap-2.5">
            <span className={`w-9 h-9 rounded-xl flex items-center justify-center font-semibold tracking-tighter text-sm border cursor-alias ${
              activeTheme === 'cosmic' ? 'bg-slate-900 border-slate-800 shadow-sm text-cyan-400' :
              activeTheme === 'warm' ? 'bg-amber-100 border-amber-200 shadow-sm text-amber-900' :
              activeTheme === 'monochrome' ? 'bg-neutral-900 border-neutral-800 shadow-sm text-white' :
              'bg-gray-50 border-gray-100 shadow-none text-black'
            }`}>
              {brandInitials}
            </span>
            <div>
              <p className="text-xs font-bold leading-none tracking-tight uppercase opacity-90">{portfolioData.fullName}</p>
              <p className="text-[9px] font-mono tracking-widest opacity-50 mt-1 uppercase">Creative Manifest</p>
            </div>
          </div>

          {/* Dynamic real-time ticking clock & location badge */}
          <div id="header-telemetry" className="flex items-center gap-3.5 text-[10px] uppercase font-bold tracking-wider opacity-65">
            <span className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5" />
              <span>UTC TIME</span>
            </span>
            <span className={styleSet.clockText}>
              {currentTime.toUTCString().slice(17, 25)}
            </span>
          </div>
        </header>

        {/* Dynamic theme switcher component banner */}
        <section id="theme-selector-section">
          <ThemeSelector 
            currentTheme={activeTheme} 
            onChangeTheme={setActiveTheme} 
          />
        </section>

        {/* Major Portfolio Card Frame */}
        <div id="portfolio-container-card" className={styleSet.container}>
          
          {/* A. Hero Overview Profile (Bio, socials, availability stats) */}
          <section id="hero-section" className="transition-all">
            <HeroSection 
              data={portfolioData} 
              activeTheme={activeTheme} 
            />
          </section>

          <hr className={styleSet.hr} />

          {/* B. Capabilities Bento Board (Skills categorized) */}
          <section id="skills-section">
            <SkillsBento 
              categories={portfolioData.skills} 
              activeTheme={activeTheme} 
            />
          </section>

          <hr className={styleSet.hr} />

          {/* C. Projects Matrix (Categorized portfolio showcase list) */}
          <section id="projects-section">
            <ProjectsGrid 
              projects={portfolioData.projects} 
              activeTheme={activeTheme} 
            />
          </section>

          <hr className={styleSet.hr} />

          {/* D. Experiences Chronology (Timeline list) */}
          <section id="experience-section">
            <TimelineSection 
              experiences={portfolioData.experiences} 
              activeTheme={activeTheme} 
            />
          </section>

          <hr className={styleSet.hr} />

          {/* E. Engage and Connect Form (Inbound submission portal) */}
          <section id="contact-section">
            <ContactForm 
              activeTheme={activeTheme} 
              developerEmail="alex@example.com"
            />
          </section>
        </div>

        {/* Footer info */}
        <footer id="app-footer" className="text-center py-6 space-y-2">
          <p className={`text-[10px] uppercase font-bold tracking-wider ${styleSet.footerText}`}>
            Made with React & Tailwind • Zero-Weight Architecture
          </p>
          <p className="text-[9px] opacity-45 leading-relaxed max-w-sm mx-auto">
            Interactive, offline-first personal portfolio template. Live customization state updates are fully client side.
          </p>
        </footer>

        {/* Sandbox customization studio panel drawer controls */}
        <PortfolioSandbox 
          data={portfolioData} 
          onUpdateData={setPortfolioData} 
          activeTheme={activeTheme} 
        />

      </main>
    </div>
  );
}
