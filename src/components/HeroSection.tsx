import React, { useState } from 'react';
import { ArrowUpRight, Monitor, Tablet, Smartphone, CheckCircle2, ChevronRight, Layers, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onStartProject: () => void;
  onExploreWork: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartProject,
  onExploreWork,
}) => {
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  return (
    <section className="relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32 bg-[#060B14]">
      {/* Subtle atmospheric ambient glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-indigo-900/30 via-blue-900/20 to-cyan-900/10 rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Subtle Kicker - Editorial Unboxed metadata */}
        <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-indigo-400 mb-6 uppercase">
          <span>Five-Member Founding Agency</span>
          <span aria-hidden="true">·</span>
          <span>Bespoke Web Engineering</span>
          <span aria-hidden="true">·</span>
          <span>Production Ready</span>
        </div>

        {/* Main Headline & Supporting Value Proposition */}
        <div className="max-w-4xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-sans leading-[1.1] text-balance">
            Your Business Deserves a Powerful Digital Presence.
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-3xl">
            We design and develop modern websites that help businesses establish
            credibility, connect with customers and grow online.
          </p>

          {/* Call to Actions */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={onStartProject}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-lg shadow-indigo-600/25 transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap shrink-0"
            >
              <span>Start Your Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              onClick={onExploreWork}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-200 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <span>Explore Our Work</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Five Core Pillars Proof Banner (Unboxed, clean typographic structure) */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-xs text-slate-400 font-medium">
          <div>
            <span className="block text-slate-100 text-sm font-bold font-sans">100% Bespoke Code</span>
            <span className="mt-0.5 block text-slate-400">Zero generic bloated themes</span>
          </div>
          <div>
            <span className="block text-slate-100 text-sm font-bold font-sans">5 Founding Specialists</span>
            <span className="mt-0.5 block text-slate-400">Direct senior talent access</span>
          </div>
          <div>
            <span className="block text-slate-100 text-sm font-bold font-sans">Sub-Second Speed</span>
            <span className="mt-0.5 block text-slate-400">Core Web Vitals 95+ certified</span>
          </div>
          <div>
            <span className="block text-slate-100 text-sm font-bold font-sans">Complete Ownership</span>
            <span className="mt-0.5 block text-slate-400">Full source code & IP handover</span>
          </div>
        </div>

        {/* Interactive Visual Hero Showcase Frame */}
        <div className="mt-12 rounded-2xl border border-slate-800 bg-[#0B1220]/90 p-3 sm:p-5 shadow-2xl relative">
          {/* Top Window Bar with Viewport Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-3 border-b border-slate-800/80 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="ml-3 font-mono text-slate-400 hidden sm:inline">
                nexora-studio-live-environment.staging
              </span>
            </div>

            {/* Interactive device responsive simulator controls */}
            <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-lg border border-slate-800">
              <button
                onClick={() => setDeviceMode('desktop')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-medium transition-colors ${
                  deviceMode === 'desktop'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
                aria-label="Desktop Preview"
              >
                <Monitor className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Desktop</span>
              </button>
              <button
                onClick={() => setDeviceMode('tablet')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-medium transition-colors ${
                  deviceMode === 'tablet'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
                aria-label="Tablet Preview"
              >
                <Tablet className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Tablet</span>
              </button>
              <button
                onClick={() => setDeviceMode('mobile')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-medium transition-colors ${
                  deviceMode === 'mobile'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
                aria-label="Mobile Preview"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Mobile</span>
              </button>
            </div>
          </div>

          {/* Dynamic Mockup Viewport */}
          <div className="flex justify-center items-center bg-[#060B14] rounded-xl overflow-hidden min-h-[360px] sm:min-h-[480px] p-2 transition-all">
            <div
              className={`transition-all duration-300 ease-out relative w-full overflow-hidden rounded-lg shadow-xl ${
                deviceMode === 'desktop'
                  ? 'max-w-full'
                  : deviceMode === 'tablet'
                  ? 'max-w-2xl border-4 border-slate-800'
                  : 'max-w-xs border-8 border-slate-900 rounded-[2rem]'
              }`}
            >
              <img
                src="/src/assets/images/hero_nexora_digital_1794127317177.jpg"
                alt="Nexora Digital Studio engineering studio workspace with multi-monitor workstation showcasing modern responsive websites"
                className="w-full h-auto object-cover max-h-[520px]"
                loading="eager"
                referrerPolicy="no-referrer"
              />

              {/* In-viewport contextual overlay badge */}
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-[#060B14]/90 backdrop-blur-md border border-slate-800 p-3 rounded-lg text-xs max-w-md">
                <div className="font-semibold text-white flex items-center gap-2.5">
                  <img
                    src="/assets/aistudio/WhatsApp_Image_2026-11-08_at_14.14.15_e2f0f05e.jpeg"
                    alt="Nexora emblem"
                    className="w-5 h-5 rounded-md object-cover shadow-sm ring-1 ring-blue-500/40"
                  />
                  <span>Nexora Studio Engineering Environment</span>
                </div>
                <p className="mt-1 text-slate-400 text-[11px] leading-tight">
                  Modern design systems, accessible components, and production-ready architectures built for commercial scale.
                </p>
              </div>
            </div>
          </div>

          {/* Target Audience Coverage Strip */}
          <div className="mt-4 pt-4 border-t border-slate-800/60 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
            <span className="font-semibold text-slate-300">Solutions Tailored For:</span>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span>Retail & Boutiques</span>
              <span aria-hidden="true">·</span>
              <span>Restaurants & Cafés</span>
              <span aria-hidden="true">·</span>
              <span>Fashion Brands</span>
              <span aria-hidden="true">·</span>
              <span>SMEs & Services</span>
              <span aria-hidden="true">·</span>
              <span>Startups & Enterprises</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
