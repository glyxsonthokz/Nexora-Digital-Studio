import React from 'react';
import { AgencySettings } from '../types';
import { MessageSquare, Mail, Phone, Lock, ShieldCheck, Sparkles, ArrowUp } from 'lucide-react';

interface FooterProps {
  agencySettings: AgencySettings;
  onOpenClientPortal: () => void;
  onOpenAgencyCms: () => void;
  onOpenBrandGuide: () => void;
  onStartProject: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  agencySettings,
  onOpenClientPortal,
  onOpenAgencyCms,
  onOpenBrandGuide,
  onStartProject,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappUrl = `https://wa.me/${agencySettings.whatsappNumber}?text=${encodeURIComponent(
    `Hello Nexora Studio, I would like to inquire about agency availability.`
  )}`;

  return (
    <footer className="bg-[#040810] border-t border-slate-800 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1: Brand & Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-blue-500/20 ring-1 ring-blue-500/30 shrink-0 bg-[#060B14]">
                <img
                  src={agencySettings.logoUrl || '/assets/aistudio/WhatsApp_Image_2026-11-08_at_14.14.15_e2f0f05e.jpeg'}
                  alt="NEXORA DIGITAL STUDIO"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-base font-bold text-white tracking-tight font-sans uppercase">
                  {agencySettings.agencyName}
                </span>
                <span className="block text-[10px] font-mono text-slate-500 uppercase -mt-0.5">
                  Five-Member Digital Engineering Studio
                </span>
              </div>
            </div>

            <p className="text-slate-300 font-medium text-xs leading-relaxed max-w-sm">
              "{agencySettings.tagline}"
            </p>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              {agencySettings.brandStatement}
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-700/80 text-emerald-300 hover:text-white transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Direct: {agencySettings.whatsappDisplay}</span>
              </a>
            </div>
          </div>

          {/* Column 2: Specialized Services */}
          <div>
            <h4 className="font-mono text-xs text-white font-semibold uppercase tracking-wider mb-4">
              Core Capabilities
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Business Website Development
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  E-commerce Flagships
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Restaurant & Café Websites
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Corporate Infrastructure
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  High-Converting Landing Pages
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Custom Web Applications
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Speed & Core Web Vitals
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: The Five Disciplines */}
          <div>
            <h4 className="font-mono text-xs text-white font-semibold uppercase tracking-wider mb-4">
              Five Disciplines
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <span className="text-slate-200">01. CEO & Business Dev:</span>
                <span className="block text-[11px] text-slate-500">Commercial Strategy & PM</span>
              </li>
              <li>
                <span className="text-slate-200">02. Lead UI/UX:</span>
                <span className="block text-[11px] text-slate-500">Design Systems & Prototyping</span>
              </li>
              <li>
                <span className="text-slate-200">03. Frontend Lead:</span>
                <span className="block text-[11px] text-slate-500">React & Performance Math</span>
              </li>
              <li>
                <span className="text-slate-200">04. Full-Stack Lead:</span>
                <span className="block text-[11px] text-slate-500">APIs, Databases & Gateways</span>
              </li>
              <li>
                <span className="text-slate-200">05. Client Relations:</span>
                <span className="block text-[11px] text-slate-500">Marketing & Milestone Care</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Portal & Studio Governance */}
          <div>
            <h4 className="font-mono text-xs text-white font-semibold uppercase tracking-wider mb-4">
              Studio Portals
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onOpenClientPortal}
                  className="hover:text-white transition-colors flex items-center gap-1.5 text-left"
                >
                  <Lock className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Client Milestone Portal</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAgencyCms}
                  className="hover:text-white transition-colors flex items-center gap-1.5 text-left"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Agency Management CMS</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenBrandGuide}
                  className="hover:text-white transition-colors flex items-center gap-1.5 text-left"
                >
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Brand Architecture Guide</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onStartProject}
                  className="hover:text-white transition-colors text-indigo-400 font-semibold"
                >
                  Start Project Inquiry →
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <span>© {new Date().getFullYear()} NEXORA DIGITAL STUDIO. All rights reserved.</span>
            <span className="mx-2">·</span>
            <span>Bespoke Digital Agency</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px] text-slate-500">
              Stack: React 19 · TypeScript · Tailwind CSS
            </span>
            <button
              onClick={scrollToTop}
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white"
              aria-label="Scroll to top of page"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
