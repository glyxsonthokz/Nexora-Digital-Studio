import React from 'react';
import { ShieldCheck, Sparkles, CheckCircle2, ArrowUpRight } from 'lucide-react';

interface TestimonialsSectionProps {
  onStartProject: () => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ onStartProject }) => {
  return (
    <section className="py-20 bg-[#060B14] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-800 bg-[#0B1220] p-8 sm:p-12 relative overflow-hidden">
          {/* Subtle glow */}
          <div
            className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Authenticity & Client Trust Policy</span>
            </div>

            <h3 className="mt-3 text-2xl sm:text-3xl font-bold text-white font-sans">
              Verified Client Reviews & Transparency Guarantee
            </h3>

            <p className="mt-4 text-sm text-slate-300 leading-relaxed">
              At NEXORA DIGITAL STUDIO, integrity is our primary operating principle.
              In accordance with our strict ethical standards, we never fabricate placeholder reviews,
              invent fake five-star quotes, or display unauthorized client logos.
            </p>

            <div className="mt-6 p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 space-y-2">
              <div className="font-semibold text-slate-100 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Current Founding Partner Cohort Status</span>
              </div>
              <p className="text-slate-400 leading-normal">
                We are currently accepting selective pilot partners for Q4 2026 and Q1 2027.
                Founding cohort clients receive direct personal architect access to all five specialists,
                waived revision limits, and guaranteed post-launch spotlight case study features.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={onStartProject}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-sm transition-all"
              >
                <span>Apply as a Founding Client Partner</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              <span className="text-xs text-slate-400 font-mono">
                Direct founder review within 24 hours
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
