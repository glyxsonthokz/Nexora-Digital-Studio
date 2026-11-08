import React, { useState } from 'react';
import { Menu, X, ArrowUpRight, ShieldCheck, Lock, Sparkles, BookOpen } from 'lucide-react';

interface HeaderProps {
  logoUrl?: string;
  onOpenContact: (prefill?: { service?: string; packageTier?: string }) => void;
  onOpenClientPortal: () => void;
  onOpenAgencyCms: () => void;
  onOpenBrandGuide: () => void;
  onOpenDocs: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  logoUrl = '/assets/aistudio/WhatsApp_Image_2026-11-08_at_14.14.15_e2f0f05e.jpeg',
  onOpenContact,
  onOpenClientPortal,
  onOpenAgencyCms,
  onOpenBrandGuide,
  onOpenDocs,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#060B14]/85 border-b border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          {/* Zone 1: Brand Wordmark (Strict single-line text element with official logo) */}
          <a
            href="#"
            className="flex items-center gap-3 text-slate-100 hover:text-white transition-opacity whitespace-nowrap shrink-0 group"
          >
            <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-blue-500/20 ring-1 ring-blue-500/30 group-hover:ring-blue-400/60 transition-all shrink-0 bg-[#060B14]">
              <img
                src={logoUrl}
                alt="NEXORA DIGITAL STUDIO official emblem logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-white font-sans uppercase">
                NEXORA
              </span>
              <span className="text-[10px] tracking-widest text-slate-400 font-mono -mt-1 uppercase">
                DIGITAL STUDIO
              </span>
            </div>
          </a>

          {/* Zone 2: Primary Nav Links (Single-line, unboxed, subtle hover states) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a
              href="#services"
              className="hover:text-white transition-colors whitespace-nowrap shrink-0 py-1"
            >
              Services
            </a>
            <a
              href="#portfolio"
              className="hover:text-white transition-colors whitespace-nowrap shrink-0 py-1"
            >
              Our Work
            </a>
            <a
              href="#about"
              className="hover:text-white transition-colors whitespace-nowrap shrink-0 py-1"
            >
              About Us
            </a>
            <a
              href="#process"
              className="hover:text-white transition-colors whitespace-nowrap shrink-0 py-1"
            >
              Process
            </a>
            <a
              href="#pricing"
              className="hover:text-white transition-colors whitespace-nowrap shrink-0 py-1"
            >
              Pricing
            </a>
            <a
              href="#contact"
              className="hover:text-white transition-colors whitespace-nowrap shrink-0 py-1"
            >
              Contact
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action + Quick Utility Menu */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            {/* Client Portal Link */}
            <button
              onClick={onOpenClientPortal}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors whitespace-nowrap shrink-0"
              title="Track project milestones & review deliverables"
            >
              <Lock className="w-3.5 h-3.5 text-indigo-400" />
              <span>Client Portal</span>
            </button>

            {/* Team CMS Link */}
            <button
              onClick={onOpenAgencyCms}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors whitespace-nowrap shrink-0"
              title="Agency Inquiries & Team Management"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Team CMS</span>
            </button>

            {/* Primary Action Button */}
            <button
              onClick={() => onOpenContact()}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-sm shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap shrink-0"
            >
              <span>Start Your Project</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => onOpenContact()}
              className="px-3 py-1.5 text-xs font-medium text-white bg-indigo-600 rounded-md"
            >
              Start
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-[#060B14]/95 px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2 text-sm font-medium text-slate-300">
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-white"
            >
              Services (10 Specialized Solutions)
            </a>
            <a
              href="#portfolio"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-white"
            >
              Our Work (Demonstration Projects)
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-white"
            >
              About Us (Five Founding Specialists)
            </a>
            <a
              href="#process"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-white"
            >
              Our Process (7-Stage Workflow)
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-white"
            >
              Pricing & Packages
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-white"
            >
              Contact Us
            </a>
          </nav>

          <div className="pt-3 border-t border-slate-800 grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenClientPortal();
              }}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-slate-900 border border-slate-700 rounded-lg text-slate-300"
            >
              <Lock className="w-3.5 h-3.5 text-indigo-400" />
              Client Portal
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAgencyCms();
              }}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-slate-900 border border-slate-700 rounded-lg text-slate-300"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Team CMS
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBrandGuide();
              }}
              className="flex items-center justify-center gap-1.5 py-2 px-3 bg-slate-900 border border-slate-800 rounded-lg text-slate-400"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Brand System
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDocs();
              }}
              className="flex items-center justify-center gap-1.5 py-2 px-3 bg-slate-900 border border-slate-800 rounded-lg text-slate-400"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              Team Docs
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
