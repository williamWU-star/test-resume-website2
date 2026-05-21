/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PortfolioData, ThemeType } from '../types';
import { Github, Linkedin, Twitter, Mail, CheckCircle, Flame, GraduationCap, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface HeroSectionProps {
  data: PortfolioData;
  activeTheme: ThemeType;
}

export default function HeroSection({ data, activeTheme }: HeroSectionProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const getThemeStyles = () => {
    switch (activeTheme) {
      case 'cosmic':
        return {
          title: 'font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent',
          secondaryText: 'text-slate-400',
          badge: 'bg-cyan-950/40 text-cyan-400 border border-cyan-900/50',
          socialHover: 'hover:text-cyan-400 hover:bg-slate-800/80',
          initialsBg: 'bg-gradient-to-tr from-cyan-500/10 to-indigo-500/10 border border-slate-800'
        };
      case 'warm':
        return {
          title: 'font-bold tracking-tight text-amber-950',
          secondaryText: 'text-amber-900/75',
          badge: 'bg-amber-100/90 text-amber-900 border border-amber-200',
          socialHover: 'hover:text-amber-800 hover:bg-amber-500/10',
          initialsBg: 'bg-amber-100/40 border border-amber-900/10'
        };
      case 'monochrome':
        return {
          title: 'font-semibold tracking-wide text-white font-mono uppercase tracking-wider',
          secondaryText: 'text-neutral-400',
          badge: 'bg-neutral-900 text-white border border-neutral-800',
          socialHover: 'hover:text-white hover:bg-neutral-800/80',
          initialsBg: 'bg-neutral-900 border border-neutral-800'
        };
      case 'nordic':
      default:
        return {
          title: 'font-light tracking-tighter leading-tight text-[#1a1a1a]',
          secondaryText: 'text-gray-500 font-normal leading-relaxed',
          badge: 'bg-gray-50/50 text-gray-400 border border-gray-100 uppercase tracking-widest text-[9px] font-mono',
          socialHover: 'hover:text-black hover:border-gray-300 hover:bg-gray-50/50',
          initialsBg: 'bg-gray-50/50 border border-gray-100'
        };
    }
  };

  const s = getThemeStyles();

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => {
      setCopiedIndex(null);
    }, 2000);
  };

  // Select appropriate icon based on link platform
  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'github':
        return <Github className="w-5 h-5" />;
      case 'linkedin':
        return <Linkedin className="w-5 h-5" />;
      case 'twitter':
        return <Twitter className="w-5 h-5" />;
      case 'email':
      case 'mailto':
        return <Mail className="w-5 h-5" />;
      default:
        return <Mail className="w-5 h-5" />;
    }
  };

  const getStatusIndicator = () => {
    switch (data.statusType) {
      case 'busy':
        return <Flame className="w-4 h-4 text-rose-500 animate-pulse" />;
      case 'learning':
        return <GraduationCap className="w-4 h-4 text-emerald-500" />;
      case 'available':
      default:
        return <CheckCircle className="w-4 h-4 text-emerald-500" />;
    }
  };

  // Helper to extract clean initials
  const initials = data.fullName
    .split(' ')
    .map(n => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'ME';

  return (
    <div id="hero-section-panel" className="flex flex-col md:flex-row gap-8 items-start justify-between py-6">
      <div id="hero-main-content" className="flex-1 space-y-5">
        {/* Availability Badge */}
        <div id="hero-status-container" className="inline-flex items-center">
          <span className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium tracking-tight ${s.badge}`}>
            {getStatusIndicator()}
            <span>{data.statusText}</span>
          </span>
        </div>

        {/* Name and Professional Title */}
        <div id="hero-title-container" className="space-y-4">
          <h1 id="hero-fullname" className={`text-4xl md:text-5xl lg:text-6xl ${s.title}`}>
            {data.fullName}
          </h1>
          <p id="hero-title" className={`text-lg md:text-xl font-medium tracking-wide ${s.secondaryText}`}>
            {data.title}
          </p>
        </div>

        {/* Detailed Tagline & Bio Statement */}
        <div id="hero-bio-container" className="space-y-4 max-w-2xl">
          <p id="hero-tagline" className={`text-lg leading-relaxed font-normal opacity-90 ${s.secondaryText}`}>
            {data.tagline}
          </p>
          <p id="hero-aboutme" className={`text-sm leading-relaxed opacity-75 ${s.secondaryText}`}>
            {data.aboutMe}
          </p>
        </div>

        {/* Social Interactive Channels */}
        <div id="hero-socials-list" className="flex flex-wrap items-center gap-3 pt-2">
          {data.socialLinks.map((link, idx) => {
            const isCopied = copiedIndex === idx;
            const isEmail = link.platform === 'email' || link.url.startsWith('mailto:');
            
            return (
              <div key={idx} className="relative group">
                <a
                  id={`social-link-${link.platform}`}
                  href={link.url}
                  target={isEmail ? '_self' : '_blank'}
                  rel="noreferrer"
                  className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-slate-500/10 text-xs font-semibold tracking-wide transition-all ${s.socialHover}`}
                >
                  {getSocialIcon(link.platform)}
                  <span>{link.label}</span>
                </a>
                
                {isEmail && (
                  <button
                    id={`copy-social-btn-${idx}`}
                    onClick={() => handleCopy(link.url.replace('mailto:', ''), idx)}
                    className="absolute -top-2.5 -right-2.5 p-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:scale-105"
                    title="Copy Email"
                  >
                    {isCopied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3 text-slate-400" />}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Decorative Graphical Monogram or Portrait Avatar */}
      <div id="hero-avatar-wrapper" className="shrink-0 mx-auto md:mx-0">
        <div className={`w-32 h-32 md:w-36 md:h-36 rounded-2xl flex items-center justify-center transition-all shadow-sm ${s.initialsBg}`}>
          {data.avatarUrl ? (
            <img
              id="hero-avatar-image"
              src={data.avatarUrl}
              alt={data.fullName}
              className="w-full h-full object-cover rounded-2xl"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div id="hero-avatar-initials" className="text-center">
              <span className={`text-4xl md:text-5xl font-black tracking-tighter ${s.title}`}>
                {initials}
              </span>
              <p className={`text-[9px] font-mono tracking-widest mt-1 uppercase opacity-55 ${s.secondaryText}`}>
                EST. 2026
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
