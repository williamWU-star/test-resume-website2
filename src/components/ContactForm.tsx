/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ThemeType } from '../types';
import { Mail, Send, CheckCircle2, AlertCircle, Info, ExternalLink, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ContactFormProps {
  activeTheme: ThemeType;
  developerEmail: string;
}

export default function ContactForm({ activeTheme, developerEmail }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    serviceType: 'collab',
    message: ''
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showIntegrationGuide, setShowIntegrationGuide] = useState(false);

  const getThemeStyles = () => {
    switch (activeTheme) {
      case 'cosmic':
        return {
          cardBg: 'bg-slate-900/30 border border-slate-800/80',
          input: 'bg-slate-900/50 border border-slate-800 text-slate-100 focus:border-cyan-500/50',
          accentText: 'text-cyan-400',
          button: 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold',
          badge: 'bg-cyan-950/40 text-cyan-400 border border-cyan-900/50',
          guideBg: 'bg-slate-900/60 border border-cyan-950/30 text-slate-300'
        };
      case 'warm':
        return {
          cardBg: 'bg-white border border-amber-900/10 shadow-sm',
          input: 'bg-amber-100/15 border border-amber-900/10 text-amber-950 focus:border-amber-800/40',
          accentText: 'text-amber-800',
          button: 'bg-amber-800 hover:bg-amber-700 text-white font-semibold',
          badge: 'bg-amber-100 text-amber-900 border border-amber-200/50',
          guideBg: 'bg-amber-50 border border-amber-900/5 text-amber-950/80'
        };
      case 'monochrome':
        return {
          cardBg: 'bg-neutral-900/40 border border-neutral-800',
          input: 'bg-neutral-950 border border-neutral-800 text-white focus:border-white',
          accentText: 'text-white',
          button: 'bg-white hover:bg-neutral-200 text-black font-semibold',
          badge: 'bg-neutral-900 text-white border border-neutral-800',
          guideBg: 'bg-neutral-950 border border-neutral-800 text-neutral-400'
        };
      case 'nordic':
      default:
        return {
          cardBg: 'bg-transparent border border-gray-100 shadow-none rounded-xl',
          input: 'bg-gray-50/40 border border-gray-100 text-[#1a1a1a] focus:border-gray-300 rounded-lg placeholder-gray-400',
          accentText: 'text-[#1a1a1a]',
          button: 'bg-[#1a1a1a] hover:bg-[#2b2b2b] text-white font-medium rounded-lg',
          badge: 'bg-gray-50 text-gray-400 border border-gray-100 uppercase tracking-widest text-[9px] font-mono',
          guideBg: 'bg-gray-50/60 border border-gray-100 text-gray-500'
        };
    }
  };

  const s = getThemeStyles();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'Please provide your name';
    if (!formData.email.trim()) {
      errors.email = 'Please provide your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errors.message = 'Please input a note of at least 10 characters';
    }
    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);

    // Dynamic simulated network wait
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({
        name: '',
        email: '',
        serviceType: 'collab',
        message: ''
      });
    }, 1200);
  };

  return (
    <div id="contact-section-container" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Narrative Section Left */}
      <div id="contact-lhs" className="lg:col-span-5 space-y-4">
        <div id="contact-header">
          <h2 id="contact-title" className={`text-2xl font-bold tracking-tight flex items-center gap-2 ${s.accentText}`}>
            <Mail className="w-5 h-5" />
            <span>Engage & Connect</span>
          </h2>
          <p id="contact-subtitle" className="text-xs opacity-60 mt-1">
            Let's discuss opportunities, collaborations, or custom commissions.
          </p>
        </div>

        <p className="text-sm leading-relaxed opacity-75">
          Have an exciting project idea, looking for technical coaching, or simply want to chat about user interfaces? Submit your information and I will respond to your inquiry within 48 hours.
        </p>

        {/* Actionable tutorial toggle box to assist with backend-less static deployment */}
        <div id="contact-deployment-guide" className={`p-4 rounded-xl space-y-3 transition-all ${s.guideBg}`}>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider">
              <Info className="w-4 h-4 text-amber-500" />
              <span>Deploying to GitHub Pages?</span>
            </span>
            <button
              id="toggle-guide-btn"
              onClick={() => setShowIntegrationGuide(!showIntegrationGuide)}
              className="text-[10px] font-bold uppercase underline cursor-pointer opacity-80 hover:opacity-100 flex items-center gap-0.5"
            >
              {showIntegrationGuide ? 'Collapse' : 'Explain'}
              <HelpCircle className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-xs opacity-80 leading-relaxed">
            Since this page is a static site without a proprietary backend, you can hook the form up in 1 minute using a free forms processor.
          </p>

          <AnimatePresence>
            {showIntegrationGuide && (
              <motion.div
                id="integration-guide-content"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-[11px] space-y-2 border-t border-slate-500/10 pt-2 opacity-90 leading-relaxed overflow-hidden"
              >
                <div>
                  <span className="font-bold">Step 1: </span>
                  Sign up for a free account at{' '}
                  <a href="https://formspree.io" target="_blank" rel="noreferrer" className="underline inline-flex items-center gap-0.5 font-semibold text-sky-500">
                    Formspree.io <ExternalLink className="w-3 h-3" />
                  </a>{' '}
                  or{' '}
                  <a href="https://web3forms.com" target="_blank" rel="noreferrer" className="underline inline-flex items-center gap-0.5 font-semibold text-emerald-500">
                    Web3Forms <ExternalLink className="w-3 h-3" />
                  </a>.
                </div>
                <div>
                  <span className="font-bold">Step 2: </span>
                  Acquire your dedicated Form ID URL (e.g., <code className="font-mono bg-slate-500/10 px-1 rounded">https://formspree.io/f/xoqpqlyd</code>).
                </div>
                <div>
                  <span className="font-bold">Step 3: </span>
                  Replace the local handler action in the JSX code, switching the state's dummy handler to submit an HTTP POST directly to their URL. It handles spam filters, auto-notifies your inbox, and guarantees seamless offline collection!
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Actual Form Section Right */}
      <div id="contact-rhs" className="lg:col-span-7">
        <form 
          id="active-contact-form"
          onSubmit={handleSubmit} 
          className={`p-6 rounded-2xl space-y-4 relative ${s.cardBg}`}
        >
          {isSuccess && (
            <motion.div
              id="form-success-banner"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 bg-white/95 dark:bg-slate-950/95 flex flex-col items-center justify-center text-center p-6 rounded-2xl z-20 space-y-3"
            >
              <CheckCircle2 className="w-12 h-12 text-emerald-500 animate-bounce" />
              <div>
                <h3 className="text-base font-bold">Message Transmitted!</h3>
                <p className="text-xs opacity-75 mt-1 max-w-xs mx-auto">
                  Your inquiry simulation completed perfectly. If configured with an actual Form ID, it would be resting in your email inbox right now.
                </p>
              </div>
              <button
                id="reset-form-btn"
                type="button"
                onClick={() => setIsSuccess(false)}
                className={`px-4 py-2 mt-2 rounded-xl text-xs font-semibold cursor-pointer ${s.button}`}
              >
                Draft Another Note
              </button>
            </motion.div>
          )}

          {/* Form Fields Block */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider opacity-60">Your Name</label>
              <input
                id="input-contact-name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Alex Morgan"
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs focus:outline-none transition-all ${s.input}`}
              />
              {formErrors.name && (
                <p className="text-[10px] text-rose-500 font-semibold flex items-center gap-1 mt-0.5">
                  <AlertCircle className="w-3 h-3" />
                  {formErrors.name}
                </p>
              )}
            </div>

            <div className="space-y-1.5 bg-transparent">
              <label className="text-[11px] font-bold uppercase tracking-wider opacity-60">Your Email Address</label>
              <input
                id="input-contact-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="alex@example.com"
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs focus:outline-none transition-all ${s.input}`}
              />
              {formErrors.email && (
                <p className="text-[10px] text-rose-500 font-semibold flex items-center gap-1 mt-0.5">
                  <AlertCircle className="w-3 h-3" />
                  {formErrors.email}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider opacity-60">Inquiry Direction</label>
            <select
              id="select-contact-intent"
              name="serviceType"
              value={formData.serviceType}
              onChange={handleInputChange}
              className={`w-full px-3.5 py-2.5 rounded-xl text-xs focus:outline-none transition-all cursor-pointer ${s.input}`}
            >
              <option value="collab">Partnered Collaboration / Open Source</option>
              <option value="freelance">Freelance Retainer Project</option>
              <option value="contract">Full-Time / Part-Time Employment</option>
              <option value="hello">Just Saying Hello!</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider opacity-60">Detailed Message Note</label>
            <textarea
              id="textarea-contact-message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleInputChange}
              placeholder="What are you designing, building, or seeking to accomplish?"
              className={`w-full px-3.5 py-2.5 rounded-xl text-xs focus:outline-none transition-all ${s.input}`}
            />
            {formErrors.message && (
              <p className="text-[10px] text-rose-500 font-semibold flex items-center gap-1 mt-0.5">
                <AlertCircle className="w-3 h-3" />
                {formErrors.message}
              </p>
            )}
          </div>

          {/* Transmitter Submit Button */}
          <button
            id="submit-contact-btn"
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 rounded-xl text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${s.button} ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isSubmitting ? 'Transmitting Inbound...' : 'Transmit Inbound'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
