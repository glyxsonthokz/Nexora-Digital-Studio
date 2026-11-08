import React from 'react';
import { ServicePackage, AgencySettings } from '../types';
import { packagesData } from '../data/initialData';
import { Check, ArrowUpRight, HelpCircle, Sparkles, Shield, Clock } from 'lucide-react';

interface PricingSectionProps {
  agencySettings: AgencySettings;
  onSelectPackage: (packageName: string) => void;
  onOpenAgencyCms: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  agencySettings,
  onSelectPackage,
  onOpenAgencyCms,
}) => {
  // Map dynamic editable pricing from settings
  const getPackagePrice = (pkgId: string) => {
    switch (pkgId) {
      case 'starter':
        return agencySettings.starterStartingPrice;
      case 'business':
        return agencySettings.businessStartingPrice;
      case 'enterprise':
        return agencySettings.enterpriseStartingPrice;
      default:
        return 'Custom Quote';
    }
  };

  return (
    <section id="pricing" className="py-24 bg-[#080E1A] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 uppercase tracking-wider">
              <span>Transparent Investment</span>
              <span aria-hidden="true">·</span>
              <span>Predictable Scopes</span>
            </div>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-white font-sans">
              Three Tailored Service Packages
            </h2>
            <p className="mt-3 text-base text-slate-300 max-w-2xl leading-relaxed">
              Every package includes dedicated architecture from our five specialists,
              transparent delivery milestones, and post-launch technical warranty.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Rates editable via</span>
            <button
              onClick={onOpenAgencyCms}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-mono underline underline-offset-4"
            >
              CMS Price Editor
            </button>
          </div>
        </div>

        {/* 3 Package Cards Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {packagesData.map((pkg) => {
            const currentPrice = getPackagePrice(pkg.id);
            const isFeatured = pkg.isPopular;

            return (
              <div
                key={pkg.id}
                className={`relative rounded-2xl flex flex-col justify-between transition-all ${
                  isFeatured
                    ? 'bg-[#0B1220] border-2 border-indigo-500 shadow-2xl shadow-indigo-950/60 p-8'
                    : 'bg-[#0B1220]/60 border border-slate-800 p-8 hover:border-slate-700'
                }`}
              >
                {/* Popular ribbon */}
                {isFeatured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-3.5 py-0.5 rounded-full text-[11px] font-mono font-semibold uppercase tracking-wider shadow-md">
                    Most Requested
                  </div>
                )}

                <div>
                  {/* Title & Audience */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white font-sans">{pkg.name}</h3>
                    <span className="text-xs font-mono text-slate-400">{pkg.subtitle}</span>
                  </div>

                  <p className="mt-3 text-xs text-slate-300 leading-relaxed min-h-[38px]">
                    {pkg.targetAudience}
                  </p>

                  {/* Pricing Display */}
                  <div className="mt-6 pt-6 border-t border-slate-800">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                      Starting Investment
                    </span>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="text-3xl font-extrabold text-white font-mono tabular-nums">
                        {currentPrice}
                      </span>
                      <span className="text-xs text-slate-400">/ project</span>
                    </div>
                    <span className="mt-1 text-xs text-indigo-400 font-mono block">
                      {pkg.estimatedTimeline}
                    </span>
                  </div>

                  {/* Estimated Scope Box */}
                  <div className="mt-4 p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 text-xs text-slate-300">
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">
                      Estimated Project Scope:
                    </span>
                    <span className="font-medium text-slate-100 mt-0.5 block">
                      {pkg.projectScope}
                    </span>
                  </div>

                  {/* Key Features Included */}
                  <div className="mt-6">
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-3">
                      Features & Capabilities
                    </span>
                    <ul className="space-y-2.5 text-xs text-slate-300">
                      {pkg.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Deliverables */}
                  <div className="mt-6 pt-6 border-t border-slate-800/80">
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2">
                      Core Deliverables
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-400">
                      {pkg.deliverables.map((deliv, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-slate-600" />
                          <span>{deliv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Package CTA */}
                <div className="mt-8 pt-6 border-t border-slate-800">
                  <button
                    onClick={() => onSelectPackage(pkg.name)}
                    className={`w-full py-3 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                      isFeatured
                        ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30'
                        : 'bg-slate-900 hover:bg-slate-800 text-white border border-slate-700'
                    }`}
                  >
                    <span>Choose {pkg.name} Package</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                  <p className="text-[11px] text-slate-500 text-center mt-2 font-mono">
                    Includes initial 60-min discovery session
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
