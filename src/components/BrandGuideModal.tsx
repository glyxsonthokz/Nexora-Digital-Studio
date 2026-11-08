import React from 'react';
import { Sparkles, Palette, Type, Layers, Check, X, Download } from 'lucide-react';

interface BrandGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrandGuideModal: React.FC<BrandGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md">
      <div className="bg-[#0B1220] border border-slate-700 rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl p-6 sm:p-8">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
              <Sparkles className="w-4 h-4" />
              <span>NEXORA BRAND ARCHITECTURE</span>
            </div>
            <h3 className="text-2xl font-bold text-white font-sans mt-1">
              Visual Identity & Design System
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-8 space-y-10 text-xs text-slate-300">
          {/* 1. Logos (Primary & Secondary) */}
          <div>
            <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              <span>1. Brand Logos & Mark Lockups</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Primary Logo */}
              <div className="p-6 rounded-xl bg-[#060B14] border border-slate-800 flex flex-col justify-between">
                <span className="text-[10px] font-mono text-slate-400 block mb-4 uppercase">
                  Official Primary Logo & Insignia
                </span>
                <div className="flex items-center gap-4 py-4">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-xl shadow-blue-500/25 ring-1 ring-blue-500/40 bg-[#060B14] shrink-0">
                    <img
                      src="/assets/aistudio/WhatsApp_Image_2026-11-08_at_14.14.15_e2f0f05e.jpeg"
                      alt="Nexora Digital Studio official logo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-2xl font-extrabold tracking-tight text-white font-sans uppercase">
                      NEXORA
                    </span>
                    <span className="text-[10px] tracking-widest text-slate-400 font-mono block -mt-1 uppercase">
                      DIGITAL STUDIO
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                  <span className="text-[11px] text-slate-400">
                    Usage: Top navigation, contracts, and presentations.
                  </span>
                  <a
                    href="/assets/aistudio/WhatsApp_Image_2026-11-08_at_14.14.15_e2f0f05e.jpeg"
                    download="nexora-official-logo.jpeg"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] font-mono text-indigo-400 hover:text-indigo-300 underline"
                  >
                    Download Master Asset
                  </a>
                </div>
              </div>

              {/* Secondary Minimal Wordmark & Favicon */}
              <div className="p-6 rounded-xl bg-[#060B14] border border-slate-800 flex flex-col justify-between">
                <span className="text-[10px] font-mono text-slate-400 block mb-4 uppercase">
                  App Icon & Favicon Variant
                </span>
                <div className="flex items-center gap-6 py-4">
                  {/* Monogram Icon */}
                  <div className="w-12 h-12 rounded-xl overflow-hidden shadow-md shadow-blue-500/20 ring-1 ring-blue-500/30">
                    <img
                      src="/assets/aistudio/WhatsApp_Image_2026-11-08_at_14.14.15_e2f0f05e.jpeg"
                      alt="Nexora Favicon"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-xl font-bold tracking-tight text-white font-sans">
                    NEXORA
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 mt-2 block">
                  Usage: Browser favicons, mobile homescreen PWA, social avatars.
                </span>
              </div>
            </div>
          </div>

          {/* 2. Color Palette */}
          <div>
            <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider mb-4 flex items-center gap-2">
              <Palette className="w-4 h-4 text-indigo-400" />
              <span>2. 60-30-10 Color System</span>
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-[#060B14] border border-slate-800">
                <div className="w-full h-12 rounded bg-[#060B14] border border-slate-700 mb-2" />
                <span className="font-bold text-white block">Deep Obsidian</span>
                <span className="font-mono text-[10px] text-slate-400">#060B14 · 60% Canvas</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <div className="w-full h-12 rounded bg-[#0B1220] border border-slate-700 mb-2" />
                <span className="font-bold text-white block">Deep Slate</span>
                <span className="font-mono text-[10px] text-slate-400">#0B1220 · 30% Structural</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <div className="w-full h-12 rounded bg-indigo-600 mb-2" />
                <span className="font-bold text-white block">Electric Indigo</span>
                <span className="font-mono text-[10px] text-indigo-400">#4F46E5 · 10% Action Accent</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <div className="w-full h-12 rounded bg-cyan-400 mb-2" />
                <span className="font-bold text-white block">Cyan Radiance</span>
                <span className="font-mono text-[10px] text-cyan-400">#22D3EE · Highlight Accent</span>
              </div>
            </div>
          </div>

          {/* 3. Typography Hierarchy */}
          <div>
            <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider mb-4 flex items-center gap-2">
              <Type className="w-4 h-4 text-indigo-400" />
              <span>3. Brand Typography Pairing</span>
            </h4>

            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
              <div>
                <span className="font-mono text-[10px] text-indigo-400 uppercase block">
                  Display & Brand Face: Plus Jakarta Sans
                </span>
                <p className="text-lg font-extrabold text-white font-sans mt-0.5">
                  The Quick Brown Fox Jumps Over The Lazy Dog — 1234567890
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800">
                <span className="font-mono text-[10px] text-cyan-400 uppercase block">
                  Code & Telemetry Face: JetBrains Mono (Tabular Numerals)
                </span>
                <p className="text-xs font-mono text-slate-300 mt-0.5">
                  LATENCY: 42ms · PROGRESS: 78.4% · REF: NEX-2026-ENG
                </p>
              </div>
            </div>
          </div>

          {/* 4. Button & Interaction Styles */}
          <div>
            <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider mb-4">
              4. Button & Interactive Affordances
            </h4>

            <div className="flex flex-wrap gap-4 items-center p-5 rounded-xl bg-slate-900 border border-slate-800">
              <button className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-semibold text-xs shadow-md shadow-indigo-600/30">
                Primary CTA Button
              </button>
              <button className="px-5 py-2.5 bg-slate-800 text-slate-200 border border-slate-700 rounded-lg font-medium text-xs">
                Secondary Outline
              </button>
              <button className="px-5 py-2.5 bg-emerald-600 text-white rounded-lg font-semibold text-xs">
                Success / WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
